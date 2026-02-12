# Personal Portfolio Website

A modern, responsive one-page portfolio built with **HTML**, **CSS**, and **JavaScript** only (no frameworks). Suited for software engineers and data professionals.

## Features

- **Responsive**: Mobile-first design; works on phones, tablets, and desktops
- **Sections**: Home, About, Education, Work Experience, Skills & Tools, Projects, Testimonials, Services, Certifications, Contact
- **UI**: Sticky nav, smooth scrolling, hamburger menu on mobile, sliding testimonial carousel, scroll-reveal animations, skill bars
- **Contact**: Form with client-side validation (name, email, message)
- **Theme**: Main color `#5A7863`, light `#EBF4DD`, secondary `#3B4953` and `#90AB8B`

## File Structure

```
├── index.html          # Single-page structure and content
├── css/
│   └── styles.css      # Layout, theme, responsive styles
├── js/
│   └── main.js         # Nav, menu, smooth scroll, carousel, form validation, reveal
├── assets/
│   ├── images/         # Add: profile.jpg, project images, client photos, cert images
│   │   ├── profile-placeholder.svg
│   │   ├── avatar-placeholder.svg
│   │   └── cert-placeholder.svg
│   └── icons/          # SVG icons (download, chevrons, email, etc.)
└── README.md
```

## Setup

1. **Replace content** in `index.html`: name, title, descriptions, job history, education, skills, projects, services, testimonials, certifications, and contact links (email, phone, WhatsApp, Telegram, GitHub).
2. **Add your assets**:
   - `assets/images/profile.jpg` – your photo (or keep using the placeholder)
   - `assets/cv.pdf` – your CV for the “Download CV” button
   - Optional: project images, client avatars, certificate images (placeholders used if missing)
3. **Update contact form**: Form currently shows an alert on submit; connect it to your backend or a form service if needed.
4. Open `index.html` in a browser or serve the folder with any static server.

## Running Locally

- Double-click `index.html`, or
- Use a local server, e.g.:
  - `npx serve .`
  - `python -m http.server 8000` (then open `http://localhost:8000`)

## Browser Support

Works in modern browsers (Chrome, Firefox, Safari, Edge). Smooth scroll and CSS variables are widely supported.

## Customization

- **Colors**: Edit the `:root` variables in `css/styles.css` (e.g. `--color-main`, `--color-light`).
- **Fonts**: The layout uses Google Fonts (DM Sans, Playfair Display); change the `<link>` in `index.html` and the font variables in CSS if you prefer others.
