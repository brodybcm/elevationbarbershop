# Elevation Barbershop — Official Website

Static, responsive single-page website for **Elevation Barbershop** in **Valdosta, GA**, founded by Master Barber **Jaimen Diego**.

Zero build step required — pure HTML5, Tailwind CSS CDN, custom architectural CSS, and vanilla JavaScript.

---

## Project Structure

- `index.html` — Complete landing page with Schema.org `BarberShop` JSON-LD, Open Graph tags, sticky glass header, hero showcase, 4 brand pillars, 8-service grooming menu, Founder spotlight (`Jaimen Diego`), 6-photo gallery with accessible lightbox, client reviews, location & studio hours, and contact form.
- `style-overrides.css` — Architectural shiplap slate wall patterns, brushed silver metallic typography gradients, petrol ocean teal glows, scroll reveal transitions, gallery hover shimmer, and custom scrollbar styling.
- `script.js` — Sticky header, active section highlighting, mobile drawer, scroll reveal observer, hero logo/sign toggle, live Top-`E` logo option preview switcher, fullscreen lightbox with swipe/keyboard controls, dynamic today-row highlighting in studio hours, and FormSubmit AJAX form submission.
- `images/`
  - `logo-header.svg` — Horizontal vector header lockup (`Elevation BARBERSHOP`)
  - `logo-hero.svg` — Stacked transparent master vector crest & wordmark
  - `logo-icon-e.svg` — Standalone monogram mark
  - `studio-wall-sign.jpg` — 3D architectural wall sign inspiration photo
  - `jaimen-diego.jpg` — Founder & Master Barber portrait
  - `gallery/gallery-1.jpg` .. `gallery-6.jpg` — Haircut & lineup showcase gallery
  - `logo-options/e0-original.svg` .. `e6-crossed-shears.svg` — Interactive live preview options for the Top-`E` crest
- `favicon.png` & `og-image.png` — Site icon and social preview image.
- `brand-kit/` — Full print, social, GBP, SVG, and high-DPI PNG brand kit.

---

## Locked-In Brand System

- **Primary Background (Matte Architectural Slate):** `#1F252A`
- **Deep Contrast Slate:** `#161B1F`
- **Card Surface Slate:** `#2A3238`
- **Brushed Platinum Silver:** `#E2E6EA`
- **Petrol Ocean Teal Accent:** `#179BAE` / `#33D1E3`
- **Typography:** `Outfit` (Display headings, navigation, buttons, labels) + `Plus Jakarta Sans` (Body copy)

---

## Quick Updates Before Public Launch

### 1. Permanently Locking In a New Top-`E` Logo Option
The live site currently displays a collapsible **"Preview Top-E Crest on Site"** bar in the bottom-right corner so Diego can preview `Original E` and `E-01` through `E-06` in context.

Once Diego picks his favorite option:
1. Copy the chosen SVG from `images/logo-options/eX-*.svg` over `images/logo-hero.svg` (and update `<img src="...">` if needed).
2. Remove the `#logo-preview-bar` and `#show-preview-bar-btn` HTML blocks at the bottom of `index.html` (and optionally remove the `initLogoOptionSwitcher()` call in `script.js`).

### 2. Updating the Street Address Once Lease / Buildout Is Finalized
Search `index.html` for:
- `Grand Opening Location Announcement Coming Soon`
- `maps?q=Valdosta,GA`
- `"addressLocality": "Valdosta"` inside the Schema.org JSON-LD `<script type="application/ld+json">`

Replace with the confirmed street address, ZIP code, and Google Maps embed query.

### 3. Activating the Contact Form (`FormSubmit`)
The contact form sends messages to `elevationbarbershopvaldosta@gmail.com` via `https://formsubmit.co/ajax/elevationbarbershopvaldosta@gmail.com`.
After deploying to your live HTTPS domain:
1. Submit one test message through the Contact form.
2. Check `elevationbarbershopvaldosta@gmail.com` for the one-time FormSubmit confirmation email and click **Activate Form**.

### 4. Social Media Links in Footer
When your Facebook Page and Instagram profiles go live, update the footer social buttons (`Facebook (Coming Soon)`, `Instagram (Coming Soon)`) in `index.html` with your live page URLs.

---

## Deployment

Upload the contents of `c:\Users\byron\Elevation Barbershop\` (excluding or keeping `brand-kit/` and `brand-concepts/` as desired) directly to any static host:
- **GitHub Pages:** Push to `main` branch and enable Pages from root directory (`/`).
- **Cloudflare Pages / Netlify / Vercel:** Drag-and-drop or connect repository with build command empty and output directory `/`.
