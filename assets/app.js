
(function(){
  var b=document.querySelector('.page');
  function setLang(l){b.setAttribute('data-lang',l);document.documentElement.lang=l;
    document.querySelectorAll('.lang button').forEach(function(x){x.setAttribute('aria-pressed',x.dataset.l===l?'true':'false')});
    try{localStorage.setItem('artist-demo-lang',l)}catch(e){}}
  var saved=null;try{saved=localStorage.getItem('artist-demo-lang')}catch(e){}
  if(!saved){saved=(navigator.language||'fr').slice(0,2)==='fr'?'fr':'en'}
  setLang(saved);
  document.querySelectorAll('.lang button').forEach(function(x){x.addEventListener('click',function(){setLang(x.dataset.l)})});
  document.querySelectorAll('.copy').forEach(function(btn){btn.addEventListener('click',function(){
    var t=btn.dataset.t,orig=btn.innerHTML,fr=b.getAttribute('data-lang')==='fr';
    function done(){btn.textContent=fr?'Copié':'Copied';setTimeout(function(){btn.innerHTML=orig},1600)}
    function fallback(){var dd=btn.previousElementSibling,r=document.createRange();r.selectNodeContents(dd);var s=getSelection();s.removeAllRanges();s.addRange(r)}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,fallback)}else{fallback()}
  })});
})();

(function(){
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var vh=window.innerHeight;
  var sel='.s-head,.bio figure,.bio-txt,.genres,.links,.city,.city li,.agency,.gallery figure,.rk,.c-row,.stat,.note';
  var els=[].slice.call(document.querySelectorAll(sel));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.remove('pre');io.unobserve(e.target)}})},{rootMargin:'0px'});
    els.forEach(function(el){
      var r=el.getBoundingClientRect();
      if(r.top>vh*0.92){
        var p=el.parentElement,i=p?[].indexOf.call(p.children,el):0;
        el.style.transitionDelay=Math.min(i,6)*40+'ms';
        el.classList.add('pre');el.classList.add('rv');io.observe(el);
      }
    });
    var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;cio.unobserve(e.target);
      var el=e.target,to=+el.dataset.to,t0=null;
      function step(t){if(!t0)t0=t;var k=Math.min(1,(t-t0)/1400),v=1-Math.pow(1-k,3);el.textContent=Math.round(to*v);if(k<1)requestAnimationFrame(step)}
      el.textContent='0';requestAnimationFrame(step);})},{threshold:.6});
    document.querySelectorAll('.cu').forEach(function(el){cio.observe(el)});
  }
  var media=[].slice.call(document.querySelectorAll('.hero img,.hero-vid')),img=media[0],logo=document.querySelector('.hero .logo'),bar=document.getElementById('prog');
  var ticking=false;
  function frame(){ticking=false;var y=window.scrollY||0,H=document.documentElement.scrollHeight-vh;
    if(y<vh*1.2){media.forEach(function(m){m.style.transform='translateY('+(y*0.35)+'px) scale('+(1.06+y*0.0002)+')'})}
    if(logo&&y<vh){logo.style.transform='translateY('+(-y*0.18)+'px)';logo.style.opacity=Math.max(0,1-y/(vh*0.7))}
    if(bar)bar.style.transform='scaleX('+(H>0?y/H:0)+')';
  }
  window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(frame)}},{passive:true});
  window.addEventListener('resize',function(){vh=window.innerHeight;frame()});
  frame();
})();

;
(function(){
var tr=document.getElementById('vtrack');if(!tr)return;var items=[].slice.call(tr.children),dots=[].slice.call(document.querySelectorAll('#vdots span')),pv=document.getElementById('vprev'),nx=document.getElementById('vnext');
function step(){var a=items[0],b=items[1];return b?b.offsetLeft-a.offsetLeft:tr.clientWidth}
function idx(){return Math.round(tr.scrollLeft/step())}
function upd(){var i=idx(),max=tr.scrollWidth-tr.clientWidth;dots.forEach(function(d,k){d.classList.toggle('on',k===i)});pv.disabled=tr.scrollLeft<=4;nx.disabled=tr.scrollLeft>=max-4;var nav=pv.parentElement;nav.hidden=max<=4}
pv.addEventListener('click',function(){tr.scrollBy({left:-step(),behavior:'smooth'})});
nx.addEventListener('click',function(){tr.scrollBy({left:step(),behavior:'smooth'})});
tr.addEventListener('scroll',function(){requestAnimationFrame(upd)},{passive:true});window.addEventListener('resize',upd);
items.forEach(function(f){var v=f.querySelector('video');v.addEventListener('play',function(){items.forEach(function(g){var o=g.querySelector('video');if(o!==v)o.pause()})})});
upd();})();
;
(function(){
if(!('IntersectionObserver' in window))return;
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.intersectionRatio<0.5&&!e.target.paused)e.target.pause()})},{threshold:[0,0.5,1]});
document.querySelectorAll('.vtrack video').forEach(function(v){io.observe(v)});
})();
;
(function(){var h=document.querySelector('.hero-vid');if(!h)return;function on(){h.classList.add('on');var p=h.play();if(p&&p.catch)p.catch(function(){})}if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches){h.removeAttribute('autoplay');return}h.addEventListener('canplay',on,{once:true});if(h.readyState>2)on()})();
;

(function(){
  var t=new Date(),k=t.getFullYear()+'-'+('0'+(t.getMonth()+1)).slice(-2)+'-'+('0'+t.getDate()).slice(-2);
  [].forEach.call(document.querySelectorAll('.shows'),function(list){
    var rows=[].slice.call(list.querySelectorAll('.show')),first=true,n=0,lim=+list.getAttribute('data-limit')||0;
    rows.forEach(function(r){var d=r.getAttribute('data-date');
      if(d<k){r.classList.add('past')}else{if(first){r.classList.add('next');first=false} if(!lim||n<lim){r.classList.add('up')} n++}});
    if(lim&&n===0){list.parentNode.classList.add('none')}
  });
  var first=null;[].forEach.call(document.querySelectorAll('.month'),function(m){
    if(!m.querySelector('.show:not(.past)')){m.classList.add('archive');if(!first)first=m}});
  if(first){var h=document.createElement('div');h.className='eyebrow arch';h.innerHTML='<span lang="fr">Archives</span><span lang="en">Past shows</span>';first.parentNode.insertBefore(h,first)}
})();

;

(function(){
var bar=document.querySelector('.tabs');if(!bar)return;
var links=[].slice.call(bar.querySelectorAll('a'));
var ind=document.createElement('span');ind.className='tab-ind';
var lens=document.createElement('span');lens.className='tab-lens';
var clone=document.createElement('span');clone.className='tab-clone';
var cls=links.map(function(l){var s=document.createElement('span');s.className='tab-cl';s.innerHTML=l.innerHTML;clone.appendChild(s);
  l.setAttribute('draggable','false');l.addEventListener('dragstart',function(e){e.preventDefault()});l.addEventListener('click',function(e){e.preventDefault()});return s});
lens.appendChild(clone);ind.appendChild(lens);bar.insertBefore(ind,bar.firstChild);
var cur=links.findIndex(function(a){return a.getAttribute('aria-current')==='page'});if(cur<0)cur=0;var ICIMG=links.map(function(l){var s=l.querySelector('.ti svg');if(!s)return null;var c=s.cloneNode(true);c.setAttribute('stroke','#fff');c.setAttribute('xmlns','http://www.w3.org/2000/svg');c.setAttribute('width','96');c.setAttribute('height','96');var im=new Image();im.onload=function(){if(typeof layout==='function'){layout();if(typeof apply==='function'&&x!==undefined)apply()}};im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(c.outerHTML);return im});
var PAD=24,DPR=Math.min(window.devicePixelRatio||1,3);
/* ---------- WebGL lens ---------- */
var cv=document.createElement('canvas');cv.className='tab-gl';bar.appendChild(cv);
var gl=null,prog,uL,uM,uOn,uRes,tex,src=document.createElement('canvas'),sctx=src.getContext('2d');
try{gl=cv.getContext('webgl',{premultipliedAlpha:true,alpha:true,antialias:true})}catch(e){}
var FS='precision highp float;uniform sampler2D t;uniform vec2 res;uniform vec4 L;uniform float mag,on;'+
'float sd(vec2 p,vec2 c,vec2 h){float r=h.y;vec2 q=abs(p-c)-vec2(max(h.x-r,0.),0.);return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}'+
'vec4 S(vec2 q){return texture2D(t,clamp(q/res,0.,1.));}'+
'void main(){vec2 p=vec2(gl_FragCoord.x,res.y-gl_FragCoord.y);vec2 c=L.xy+L.zw*.5,h=L.zw*.5;float d=sd(p,c,h);'+
'if(d>1.){gl_FragColor=vec4(0.);return;}float r=h.y;'+
'vec2 n=normalize(vec2(sd(p+vec2(1.,0.),c,h)-sd(p-vec2(1.,0.),c,h),sd(p+vec2(0.,1.),c,h)-sd(p-vec2(0.,1.),c,h))+1e-5);'+
'float e=clamp(-d/(r*.55),0.,1.);float b=pow(1.-e,2.6);vec2 base=c+(p-c)/mag;float k=b*r*.75;'+
'vec4 cr=S(base+n*k*.86),cg=S(base+n*k),cb=S(base+n*k*1.16);'+
'vec3 col=vec3(cr.r,cg.g,cb.b);float a=max(max(cr.a,cg.a),cb.a);'+
'float rim=smoothstep(2.,0.,abs(d+1.))*(.12+.3*max(-n.y,0.));'+
'float ang=atan(n.y,n.x);vec3 rb=.5+.5*cos(ang*2.+vec3(0.,2.1,4.2));float fr=smoothstep(r*.35,0.,-d)*.09;'+
'vec3 o=col+rb*fr+vec3(rim);float oa=clamp(a+rim+fr*.6,0.,1.);gl_FragColor=vec4(o*on,oa*on);}';
var VS='attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
function sh(type,s){var o=gl.createShader(type);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw gl.getShaderInfoLog(o);return o}
if(gl){try{prog=gl.createProgram();gl.attachShader(prog,sh(gl.VERTEX_SHADER,VS));gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(prog);gl.useProgram(prog);
  var bf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,bf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  var ap=gl.getAttribLocation(prog,'p');gl.enableVertexAttribArray(ap);gl.vertexAttribPointer(ap,2,gl.FLOAT,false,0,0);
  uL=gl.getUniformLocation(prog,'L');uM=gl.getUniformLocation(prog,'mag');uOn=gl.getUniformLocation(prog,'on');uRes=gl.getUniformLocation(prog,'res');
  tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
  document.documentElement.classList.add('gl-ok')}catch(err){gl=null}}
function layout(){var W=bar.clientWidth,H=bar.clientHeight+PAD*2;
  clone.style.width=W+'px';clone.style.height=bar.clientHeight+'px';clone.style.top=(-ind.offsetTop)+'px';
  links.forEach(function(l,i){var s=cls[i],cs=getComputedStyle(l);s.style.left=l.offsetLeft+'px';s.style.top=l.offsetTop+'px';s.style.width=l.offsetWidth+'px';s.style.height=l.offsetHeight+'px';s.style.font=cs.font;s.style.letterSpacing=cs.letterSpacing;s.style.textTransform=cs.textTransform});
  if(!gl)return;cv.style.width=W+'px';cv.style.height=H+'px';cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR);gl.viewport(0,0,cv.width,cv.height);
  src.width=cv.width;src.height=cv.height;sctx.setTransform(DPR,0,0,DPR,0,0);sctx.clearRect(0,0,W,H);sctx.fillStyle='#fff';sctx.textAlign='center';sctx.textBaseline='middle';
  links.forEach(function(l){var cs=getComputedStyle(l);sctx.font=cs.fontWeight+' '+cs.fontSize+' '+cs.fontFamily;try{sctx.letterSpacing=cs.letterSpacing}catch(_){}
    var t=l.textContent.trim();var span=l.querySelector('[lang]');if(span){var lang=document.querySelector('.page')?document.querySelector('.page').getAttribute('data-lang'):'fr';var sp=l.querySelector('[lang="'+lang+'"]');t=(sp||span).textContent}
    if(cs.textTransform==='uppercase')t=t.toUpperCase();var lb=l.querySelector('.tl')||l;var ox=lb===l?0:l.offsetLeft,oy=lb===l?0:l.offsetTop;sctx.fillText(t,ox+lb.offsetLeft+lb.offsetWidth/2,oy+lb.offsetTop+lb.offsetHeight/2+PAD);var ic=l.querySelector('.ti'),im=ICIMG[links.indexOf(l)];if(ic&&im&&im.complete&&im.naturalWidth)sctx.drawImage(im,l.offsetLeft+ic.offsetLeft,l.offsetTop+ic.offsetTop+PAD,ic.offsetWidth,ic.offsetHeight)});
  gl.bindTexture(gl.TEXTURE_2D,tex);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,src);gl.uniform2f(uRes,cv.width,cv.height)}
/* ---------- ressort ---------- */
var x,w,vx=0,vw=0,tx,tw,p=0,vp=0,tp=0,raf=0,onDone=null,travel=false;
function tgt(i){tx=links[i].offsetLeft;tw=links[i].offsetWidth}
function hl(i){links.forEach(function(l,k){l.classList.toggle('on',k===i)})}
function apply(){var sp=Math.abs(vx),st=Math.min(sp/30,.45),sx=1+p*.28+st*.5,sy=1+p*.42-st*.12,on=Math.min(1,Math.max(p*1.15,travel?1:0));
  ind.style.width=w+'px';ind.style.transform='translateX('+x+'px) scale('+sx+','+sy+')';ind.classList.toggle('lens',on>.3);
  var m=1+.28*Math.max(p,on*.8);
  clone.style.transformOrigin=(x+w/2)+'px '+(ind.offsetTop+lens.offsetHeight/2)+'px';clone.style.transform='translateX('+(-x)+'px) scale('+(m/sx)+','+(m/sy)+')';
  var hh=ind.offsetHeight,L=x+w/2-w*sx/2,R=x+w/2+w*sx/2;
  links.forEach(function(l){var o=l.offsetLeft,a1=L+2-o,b1=R-2-o,v=on>.3?'linear-gradient(90deg,#000 '+a1+'px,transparent '+a1+'px,transparent '+b1+'px,#000 '+b1+'px)':'none';l.style.webkitMaskImage=v;l.style.maskImage=v});
  if(gl){var cx=(x+w/2)*DPR,cy=(ind.offsetTop+hh/2+PAD)*DPR,W2=w*sx*DPR,H2=hh*sy*DPR;gl.uniform4f(uL,cx-W2/2,cy-H2/2,W2,H2);gl.uniform1f(uM,m);gl.uniform1f(uOn,on);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);if(on>.01)gl.drawArrays(gl.TRIANGLE_STRIP,0,4)}}
function loop(){var k=.26,d=.5;if(travel&&Math.abs(tx-x)<4){travel=false;tp=0}vx=(vx+(tx-x)*k)*d;x+=vx;vw=(vw+(tw-w)*k)*d;w+=vw;vp=(vp+(tp-p)*.36)*.5;p+=vp;apply();
  if(Math.abs(tx-x)<.3&&Math.abs(vx)<.2&&Math.abs(tw-w)<.3&&Math.abs(tp-p)<.01&&Math.abs(vp)<.01&&!travel){x=tx;w=tw;p=tp;vx=vw=vp=0;apply();raf=0;if(onDone){var f=onDone;onDone=null;f()}return}
  raf=requestAnimationFrame(loop)}
function kick(){if(!raf)raf=requestAnimationFrame(loop)}
function init(){layout();tgt(cur);x=tx;w=tw;hl(cur);apply()}
init();if(document.fonts&&document.fonts.ready)document.fonts.ready.then(init);addEventListener('load',init);addEventListener('resize',init);
document.querySelectorAll('.lang button').forEach(function(b){b.addEventListener('click',function(){setTimeout(init,30)})});
function nearest(cx){var b=0,d=1e9;links.forEach(function(a,k){var r=a.getBoundingClientRect(),dd=Math.abs(r.left+r.width/2-cx);if(dd<d){d=dd;b=k}});return b}
function go(i){if(matchMedia('(prefers-reduced-motion: reduce)').matches){location.href=links[i].href;return}tgt(i);hl(i);if(Math.abs(tx-x)>2.5){travel=true;tp=1}else{tp=0}kick();if(i===cur)return;var nav=function(){location.href=links[i].href};onDone=nav;setTimeout(function(){if(onDone===nav){onDone=null;nav()}},800)}
var down=false,moved=false,sx0=0,hover=cur,TOUCH='ontouchstart' in window;
bar.addEventListener('pointerdown',function(e){if(e.pointerType==='touch'&&TOUCH)return;down=true;moved=false;sx0=e.clientX;bar.classList.add('press');hover=nearest(e.clientX);travel=false;tgt(hover);hl(hover);tp=1;onDone=null;kick();try{bar.setPointerCapture(e.pointerId)}catch(_){}});
bar.addEventListener('pointermove',function(e){if(e.pointerType==='touch'&&TOUCH)return;if(!down)return;if(!moved&&Math.abs(e.clientX-sx0)>6)moved=true;if(!moved)return;
  var r=bar.getBoundingClientRect(),sc=r.width/bar.offsetWidth;hover=nearest(e.clientX);tw=links[hover].offsetWidth;tx=Math.max(4,Math.min((e.clientX-r.left)/sc-tw/2,bar.clientWidth-tw-4));hl(hover);kick()});
function end(e){if(e&&e.pointerType==='touch'&&TOUCH)return;if(!down)return;down=false;bar.classList.remove('press');go(moved?hover:nearest(e.clientX))}
bar.addEventListener('pointerup',end);bar.addEventListener('lostpointercapture',function(e){if(down)end(e)});
bar.addEventListener('pointercancel',function(e){if(e.pointerType==='touch'&&TOUCH)return;if(!down)return;down=false;bar.classList.remove('press');tgt(cur);hl(cur);tp=0;kick()});
if(TOUCH){
  var tid=null;
  function tx0(e){for(var i=0;i<e.changedTouches.length;i++)if(e.changedTouches[i].identifier===tid)return e.changedTouches[i];return null}
  bar.addEventListener('touchstart',function(e){if(tid!==null)return;var t=e.changedTouches[0];tid=t.identifier;e.preventDefault();
    down=true;moved=false;sx0=t.clientX;bar.classList.add('press');hover=nearest(t.clientX);travel=false;tgt(hover);hl(hover);tp=1;onDone=null;kick()},{passive:false});
  bar.addEventListener('touchmove',function(e){var t=tx0(e);if(!t||!down)return;e.preventDefault();if(!moved&&Math.abs(t.clientX-sx0)>6)moved=true;if(!moved)return;
    var r=bar.getBoundingClientRect(),sc=r.width/bar.offsetWidth;hover=nearest(t.clientX);tw=links[hover].offsetWidth;tx=Math.max(4,Math.min((t.clientX-r.left)/sc-tw/2,bar.clientWidth-tw-4));hl(hover);kick()},{passive:false});
  function tend(e){var t=tx0(e);if(!t)return;e.preventDefault();tid=null;if(!down)return;down=false;bar.classList.remove('press');go(moved?hover:nearest(t.clientX))}
  bar.addEventListener('touchend',tend,{passive:false});bar.addEventListener('touchcancel',tend,{passive:false});
}
bar.addEventListener('contextmenu',function(e){e.preventDefault()});
bar.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.tagName==='A'){e.preventDefault();go(links.indexOf(e.target))}});
})();

;
/* une seule vidéo à la fois */
document.addEventListener('play',function(e){var v=e.target;if(!v||v.tagName!=='VIDEO'||!v.controls)return;document.querySelectorAll('video[controls]').forEach(function(o){if(o!==v&&!o.paused)o.pause()})},true);

// Demo interactions are local only; no analytics, forms, or requests to the reference.
(()=>{
 const fr=()=>document.documentElement.lang==='fr';
 document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
 document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}));
 document.querySelectorAll('[data-photo]').forEach(b=>b.addEventListener('click',()=>{const img=document.getElementById('photo-large');img.src=b.dataset.photo;img.alt=b.dataset.caption||'';document.getElementById('photo-caption').textContent=b.dataset.caption||'';document.getElementById('photo-download').href=b.dataset.photo;document.getElementById('photo-modal').showModal()}));
 document.querySelectorAll('[data-social]').forEach(b=>b.addEventListener('click',()=>{document.getElementById('social-title').textContent=b.dataset.social;document.getElementById('social-modal').showModal()}));
 document.querySelectorAll('[data-booking]').forEach(b=>b.addEventListener('click',()=>document.getElementById('booking-modal').showModal()));
 const form=document.getElementById('booking-form');form?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form),r=document.getElementById('booking-result');r.replaceChildren();const title=document.createElement('strong');title.textContent=fr()?'Aperçu de votre demande':'Your request preview';r.append(title);for(const k of ['name','email','date','venue','message']){const p=document.createElement('p');p.textContent=d.get(k);r.append(p)}const note=document.createElement('p');note.textContent=fr()?'Démonstration uniquement : rien n’a été envoyé.':'Demo only: nothing has been sent.';r.append(note);r.hidden=false;form.hidden=true});
 document.getElementById('booking-modal')?.addEventListener('close',()=>{form.hidden=false;document.getElementById('booking-result').hidden=true});
 document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{const value=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(o=>o.setAttribute('aria-pressed',String(o===b)));document.querySelectorAll('.media-section').forEach(s=>s.hidden=value!=='all'&&s.dataset.kind!==value)}));
 const city=document.getElementById('city-filter');city?.addEventListener('change',()=>{document.querySelectorAll('.show').forEach(r=>r.hidden=city.value!=='all'&&r.dataset.city!==city.value);document.querySelectorAll('.month').forEach(m=>m.hidden=!m.querySelector('.show:not([hidden])'));document.querySelector('.empty-filter').hidden=!!document.querySelector('.month:not([hidden])')});
 document.getElementById('archive-toggle')?.addEventListener('click',e=>{const x=document.getElementById('archives'),open=x.hidden;x.hidden=!open;e.currentTarget.setAttribute('aria-expanded',String(open))});
 document.querySelectorAll('[data-pause]').forEach(b=>b.addEventListener('click',()=>{const v=document.querySelector('.hero-vid');if(v.paused){v.play().catch(()=>{});b.innerHTML=fr()?'Pause':'Pause'}else{v.pause();b.innerHTML=fr()?'Reprendre':'Resume'}b.setAttribute('aria-pressed',String(v.paused))}));
 document.querySelectorAll('[data-print]').forEach(b=>b.addEventListener('click',()=>window.print()));
 document.addEventListener('play',e=>{if(e.target.tagName!=='VIDEO')return;document.querySelectorAll('video').forEach(v=>{if(v!==e.target)v.pause()})},true);
})();
