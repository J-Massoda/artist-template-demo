#!/usr/bin/env python3
"""Capture the four public reference pages and their public assets.
Run on a computer that can access the reference site: python capture_reference.py
No login, proxy, CAPTCHA bypass, third-party libraries or browser profile required.
"""
from html.parser import HTMLParser
from urllib.request import Request,urlopen
from urllib.parse import urljoin,urlsplit,unquote
from pathlib import Path
import json,re,time,zipfile
BASE='https://yamsy.fr/'
PAGES=['','contenu/','dates/','rider/']
ALLOWED={'yamsy.fr','media.yamsy.fr'}
OUT=Path.cwd()/'reference-snapshot'
MAX_FILE=60*1024*1024
MAX_TOTAL=300*1024*1024
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.refs=set()
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  for k in ['src','poster']:
   if a.get(k):self.refs.add(a[k])
  if tag=='link' and a.get('href') and a.get('rel','') in ['stylesheet','preload','icon','apple-touch-icon']:self.refs.add(a['href'])
  if a.get('srcset'):
   for x in a['srcset'].split(','):self.refs.add(x.strip().split(' ')[0])
seen=set();manifest=[];total=0
# Follow only public assets explicitly found in these pages or their stylesheets.
def capture(url,page=False):
 global total
 p=urlsplit(url)
 if p.scheme!='https' or p.hostname not in ALLOWED or url in seen:return
 seen.add(url)
 rel=Path('media' if p.hostname=='media.yamsy.fr' else 'site')/unquote(p.path.lstrip('/'))
 if page or p.path.endswith('/'):rel=rel/'index.html'
 if '..' in rel.parts:return
 try:
  req=Request(url,headers={'User-Agent':'ReferenceSnapshot/1.0'})
  with urlopen(req,timeout=30) as response:
   if urlsplit(response.url).hostname not in ALLOWED:raise ValueError('Redirect left the allowed reference domains')
   size=int(response.headers.get('Content-Length','0'))
   if size>MAX_FILE:raise ValueError('Asset exceeds 60 MiB limit')
   data=response.read(MAX_FILE+1)
   if len(data)>MAX_FILE or total+len(data)>MAX_TOTAL:raise ValueError('Capture size limit reached')
   kind=response.headers.get_content_type()
  dest=OUT/rel;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(data);total+=len(data)
  manifest.append({'url':url,'path':str(rel),'bytes':len(data),'status':'saved'})
  print('Saved',rel)
  if page or kind in ['text/html','text/css']:
   text=data.decode('utf-8',errors='replace');refs=set()
   if kind=='text/html' or page:
    parser=Parser();parser.feed(text);refs.update(parser.refs)
   refs.update(re.findall(r'url\(\s*[\'"]?([^\s)\'\"]+)',text))
   for ref in sorted(refs):
    target=urljoin(url,ref)
    if target.startswith('data:'):continue
    capture(target)
 except Exception as exc:
  manifest.append({'url':url,'status':'unavailable','error':str(exc)})
  print('Unavailable:',url,'—',exc)
for path in PAGES:capture(urljoin(BASE,path),page=True)
OUT.mkdir(exist_ok=True)
(OUT/'capture-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
archive=OUT.with_suffix('.zip')
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
 for f in OUT.rglob('*'):
  if f.is_file():z.write(f,f.relative_to(OUT))
print('\nCreated:',archive)
print('Saved files:',sum(x['status']=='saved' for x in manifest))
print('This tool records unavailable items; it does not bypass access restrictions.')
