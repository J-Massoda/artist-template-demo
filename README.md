# ARTIST — Multi-page demo v1.0.0

Plain HTML, CSS and JavaScript. No framework, package installation, build step, CDN, tracking or backend is required.

## Open the demo

Extract the ZIP, open `index.html`, and use the four navigation tabs. All paths are relative so the pages also open from disk. For the most reliable video, clipboard and page-transition behavior, serve the repository root with a local server:

```sh
python -m http.server 8080 
```

Then open http://localhost:8080. Upload the extracted contents at your GitHub repository root. Then enable GitHub Pages from main / (root). See DEPLOY-GITHUB.md. This package has not yet been published on GitHub.

## Pages

| Page | File | Included behavior |
| --- | --- | --- |
| Home | `index.html` | Animated background, parallax, scroll reveals, counters, marquee, live media, booking |
| Content | `contenu/index.html` | Photos/videos, local filters, photo viewer, media downloads, swipe carousel |
| Agenda | `dates/index.html` | Month groups, city filter, next-show indicator, collapsible archives |
| Rider | `rider/index.html` | Equipment cards, booth schematic, downloads, print/PDF layout |

All pages include French/English selection, persistent language preference, responsive glass navigation, spring/refraction interaction from the supplied source, contact copying and a local booking preview. The booking form sends nothing. `booking@example.com` and `@votre.artiste` are intentional placeholders. Dates, figures, locations, biographies and equipment are illustrative and need client validation.

## Fidelity and what remains unverified

This is a working four-page demonstration, **not a verified exact clone of the entire live website**.

| Element | Source and status |
| --- | --- |
| Black/white palette | Preserved from supplied CSS: #000000, #0E0E0E, #F4F4F2, #8C8C8C; white borders at 13% opacity |
| Shared styling | Actual CSS from uploaded homepage retained, including final cascading overrides |
| Glass navigation and WebGL lens | Actual navigation code retained; identity references removed; reduced-motion navigation improved |
| Scroll reveals, counts, parallax, marquee, carousel | Actual supplied code and timings retained |
| Home layout | Based on supplied homepage HTML and screenshot; neutral content replaces artist identity |
| Content / Agenda / Rider layouts | Reconstructed using components found in homepage source; standalone live page source unavailable |
| Fonts | Local Liberation Sans stand-in plus an original hand-drawn demo font; original Inter Tight and Hand font files were not attached |
| Photography | Brand-free stage crops taken from the user-supplied screenshot; no browser chrome or personal browser tabs included |
| Hero / media videos | Six-second silent animated still, not original live footage; all media slots work locally |
| Booking / extra filters / lightbox | Demo additions, not claimed as verified features of the reference |
| Entire-site coverage | Four routes evidenced by uploaded navigation; additional live pages could not be discovered or ruled out |

Browser access and a separate direct HTTP request were both denied by the current environment. Web search returned no indexed interior-page results. No network-control bypass was used.

The reference homepage has many successive CSS design revisions. The final active design uses **Inter Tight + Hand**, not earlier Archivo Black or Instrument Serif declarations. Keeping the original cascade preserves that final layout and behavior.

## Getting the remaining source in one pass

`tools/capture_reference.py` is an optional standard-library Python script that you can run from a computer with normal access to the reference site. It captures the four known public pages and assets they explicitly reference, including inline CSS font URLs, posters and video sources. It respects domain boundaries, records unavailable files, stops at size limits, and does not bypass login or access restrictions.

```sh
python tools/capture_reference.py
```

Upload the resulting `reference-snapshot.zip` to finish matching the interior pages, real fonts and footage against actual source. The script is syntax-checked; live capture could not be verified in this restricted environment. Alternatively, save the four pages using Chrome's “Webpage, Complete” option and ZIP their HTML files with accompanying folders.

## Customize

Edit the four HTML files directly. Shared layout/colors are in `assets/styles.css`; behavior is in `assets/app.js`. Replace files in `assets/` with your client's photos/video. Replace the demo font-face URLs with the original or client-approved font files when supplied. There are no live reference-artist account links, analytics tokens or booking recipients left in the website files.

Preserve the font license in `licenses/` when redistributing the bundled Liberation Sans stand-ins. Reference-source and screenshot reuse follows the user's supplied material; ownership of that original material is not claimed by this demo.
