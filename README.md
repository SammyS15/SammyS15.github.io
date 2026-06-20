# Sammy Sharief — personal research website

Personal site for Sammy Sharief, working at the intersection of **astronomy, machine learning, and statistics**. Built as a fast, static site for GitHub Pages — no build step required.

🌐 Live: https://sammys15.github.io

## Structure

```
index.html         Home — animated cosmic hero, about, interests, selected papers, news
publications.html  Full publication list with topic filters + search
cv.html            CV with an animated timeline and skills
styles.css         Design system (dark/light themes, components)
assets/
  data.js          ← EDIT THIS: profile, links, publications, news, interests
  main.js          Interactivity: theme toggle, starfield, typed hero, filtering
  profile.jpg      (optional) your photo — see index.html for how to enable it
  cv.pdf           (optional) downloadable CV linked from cv.html
```

## Editing content

Almost everything lives in **`assets/data.js`**:

- `PROFILE` — your name, tagline, affiliation, location, and social links.
  Replace the `"#"` placeholders (Scholar, arXiv, LinkedIn, X) with real URLs.
- `PUBLICATIONS` — wrap your name in `**double asterisks**` to bold it; set
  `role: "first"` / `"cofirst"` for an authorship badge; add `code`/`project` links.
- `NEWS` and `INTERESTS` — short feeds shown on the home page.

To add a profile photo, drop `assets/profile.jpg` and follow the comment in `index.html`.

## Features

- 🌗 Dark / light theme toggle (remembers your choice)
- ✨ Animated starfield hero with parallax + shooting stars
- 🔍 Filterable, searchable publications
- 🕑 Scroll-animated CV timeline
- 📱 Fully responsive, accessible, and respects `prefers-reduced-motion`

## Local preview

Any static server works, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
