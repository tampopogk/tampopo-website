# Tampopo Holding Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Auto-select `superpowers:subagent-driven-development` or `superpowers:executing-plans` based on task coupling, subagent availability, and whether execution should stay in the current session. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Japanese-first bilingual static holding site for タンポポ合同会社 / Tampopo LLC that shows the company logo, links to Kanna, and provides a lightly obfuscated email contact.

**Architecture:** Use plain static assets so the site can run directly from the filesystem or GitHub Pages without a build step. Keep content in `index.html`, visual styling in `styles.css`, and email assembly in `script.js`.

**Tech Stack:** HTML, CSS, vanilla JavaScript, GitHub Pages.

---

## File Structure

- Create `index.html`: semantic page structure, Japanese-first bilingual copy, Kanna link, and contact controls without the full email address in the HTML.
- Create `styles.css`: responsive corporate holding-site layout, typography, buttons, and mobile behavior.
- Create `script.js`: assemble the contact email from pieces and wire the contact controls to `mailto:`.
- Create `assets/tampopo-logo.jpg`: local copy of the company logo.
- Create `README.md`: short deployment notes for GitHub Pages.

### Task 1: Static HTML Skeleton

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create the semantic page**

Create `index.html` with this complete content:

```html
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>タンポポ合同会社 / Tampopo LLC</title>
    <meta
      name="description"
      content="タンポポ合同会社 / Tampopo LLC is a small company building focused software products, including Kanna."
    >
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <main class="site-shell">
      <header class="hero" aria-labelledby="site-title">
        <p class="eyebrow">Tampopo LLC</p>
        <h1 id="site-title">タンポポ合同会社</h1>
        <p class="lead-ja">小さく、実用的なソフトウェアをつくる会社です。</p>
        <p class="lead-en">We build focused, practical software products.</p>
      </header>

      <section class="panel" aria-labelledby="products-title">
        <div>
          <p class="section-label">Product</p>
          <h2 id="products-title">プロダクト</h2>
        </div>
        <div class="section-copy">
          <p>ビルドプロダクト Kanna は、専用サイトでご案内しています。</p>
          <p class="secondary">Our build product, Kanna, has its own product site.</p>
          <a class="button button-primary" href="https://kanna.build" rel="noopener">kanna.build</a>
        </div>
      </section>

      <section class="panel" aria-labelledby="contact-title">
        <div>
          <p class="section-label">Contact</p>
          <h2 id="contact-title">お問い合わせ</h2>
        </div>
        <div class="section-copy">
          <p>ご連絡はメールでお願いいたします。</p>
          <p class="secondary">For company inquiries, please contact us by email.</p>
          <button class="button button-secondary" type="button" data-contact-button>
            メールを作成 / Email us
          </button>
          <p class="contact-note" data-contact-status aria-live="polite">
            メールアドレスはクリック時に生成されます。
          </p>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>&copy; <span data-year></span> タンポポ合同会社 / Tampopo LLC</p>
    </footer>

    <script src="script.js"></script>
  </body>
</html>
```

- [ ] **Step 2: Verify the full email is absent from HTML**

Run:

```bash
rg -n "admin@tampopomyoko\\.com" index.html
```

Expected: no output and exit code `1`.

- [ ] **Step 3: Commit the HTML skeleton**

Run:

```bash
git add index.html
git commit -m "Add Tampopo holding site HTML"
```

Expected: commit succeeds.

### Task 2: Responsive Styling

**Files:**
- Create: `styles.css`

- [ ] **Step 1: Add complete CSS**

Create `styles.css` with this complete content:

```css
:root {
  color-scheme: light;
  --bg: #f7f4ef;
  --surface: #ffffff;
  --ink: #20201d;
  --muted: #66645f;
  --line: #ded7cb;
  --accent: #2f6f5e;
  --accent-dark: #1e4d41;
  --warm: #c4512d;
  font-family: "Hiragino Sans", "Yu Gothic", "YuGothic", "Noto Sans JP", system-ui, sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  min-height: 100%;
  background: var(--bg);
}

body {
  margin: 0;
  min-height: 100%;
  color: var(--ink);
  background:
    linear-gradient(135deg, rgba(47, 111, 94, 0.12), transparent 42%),
    linear-gradient(315deg, rgba(196, 81, 45, 0.1), transparent 36%),
    var(--bg);
  line-height: 1.6;
}

a {
  color: inherit;
}

.site-shell {
  width: min(960px, calc(100% - 40px));
  margin: 0 auto;
  padding: 72px 0 40px;
}

.hero {
  padding: 32px 0 48px;
}

.eyebrow,
.section-label {
  margin: 0 0 10px;
  color: var(--warm);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

h1,
h2,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 18px;
  font-size: clamp(2.7rem, 7vw, 5.7rem);
  line-height: 1.05;
  font-weight: 750;
}

h2 {
  margin-bottom: 0;
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  line-height: 1.2;
}

.lead-ja {
  margin-bottom: 6px;
  max-width: 680px;
  font-size: clamp(1.2rem, 2.5vw, 1.7rem);
}

.lead-en,
.secondary,
.contact-note,
.footer {
  color: var(--muted);
}

.lead-en {
  max-width: 620px;
  font-size: 1.05rem;
}

.panel {
  display: grid;
  grid-template-columns: minmax(180px, 260px) minmax(0, 1fr);
  gap: 32px;
  align-items: start;
  padding: 30px 0;
  border-top: 1px solid var(--line);
}

.section-copy p {
  margin-bottom: 8px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  margin-top: 18px;
  padding: 0 18px;
  border: 1px solid transparent;
  border-radius: 6px;
  font: inherit;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease;
}

.button-primary {
  color: #ffffff;
  background: var(--accent);
}

.button-primary:hover,
.button-primary:focus-visible {
  background: var(--accent-dark);
}

.button-secondary {
  color: var(--accent-dark);
  background: var(--surface);
  border-color: var(--line);
}

.button-secondary:hover,
.button-secondary:focus-visible {
  border-color: var(--accent);
}

.button:focus-visible {
  outline: 3px solid rgba(47, 111, 94, 0.28);
  outline-offset: 2px;
}

.contact-note {
  margin: 12px 0 0;
  font-size: 0.9rem;
}

.footer {
  width: min(960px, calc(100% - 40px));
  margin: 0 auto;
  padding: 20px 0 36px;
  border-top: 1px solid var(--line);
  font-size: 0.9rem;
}

.footer p {
  margin: 0;
}

@media (max-width: 680px) {
  .site-shell {
    width: min(100% - 28px, 960px);
    padding-top: 44px;
  }

  .hero {
    padding-bottom: 34px;
  }

  .panel {
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 24px 0;
  }

  .button {
    width: 100%;
  }

  .footer {
    width: min(100% - 28px, 960px);
  }
}
```

- [ ] **Step 2: Verify CSS exists and has no negative letter spacing**

Run:

```bash
test -s styles.css && ! rg -n "letter-spacing:\\s*-" styles.css
```

Expected: exit code `0`.

- [ ] **Step 3: Commit styling**

Run:

```bash
git add styles.css
git commit -m "Style Tampopo holding site"
```

Expected: commit succeeds.

### Task 3: Contact JavaScript

**Files:**
- Create: `script.js`

- [ ] **Step 1: Add complete JavaScript**

Create `script.js` with this complete content:

```javascript
(() => {
  const year = document.querySelector("[data-year]");
  if (year) {
    year.textContent = new Date().getFullYear().toString();
  }

  const button = document.querySelector("[data-contact-button]");
  const status = document.querySelector("[data-contact-status]");

  if (!button) {
    return;
  }

  const parts = {
    local: ["ad", "min"],
    domain: ["tampopo", "myoko"],
    tld: "com"
  };

  const buildAddress = () => {
    const local = parts.local.join("");
    const domain = parts.domain.join("");
    return `${local}@${domain}.${parts.tld}`;
  };

  button.addEventListener("click", () => {
    const address = buildAddress();
    const subject = encodeURIComponent("Tampopo LLC inquiry");
    window.location.href = `mailto:${address}?subject=${subject}`;

    if (status) {
      status.textContent = "メール作成画面を開きます。 / Opening your email client.";
    }
  });
})();
```

- [ ] **Step 2: Verify the script can assemble the contact address**

Run:

```bash
node -e "const parts={local:['ad','min'],domain:['tampopo','myoko'],tld:'com'}; const email=parts.local.join('')+'@'+parts.domain.join('')+'.'+parts.tld; if (email !== 'admin@tampopomyoko.com') process.exit(1); console.log(email)"
```

Expected output:

```text
admin@tampopomyoko.com
```

- [ ] **Step 3: Verify the full email is not present in source files**

Run:

```bash
! rg -n "admin@tampopomyoko\\.com" index.html script.js styles.css
```

Expected: exit code `0`.

- [ ] **Step 4: Commit contact behavior**

Run:

```bash
git add script.js
git commit -m "Add obfuscated email contact"
```

Expected: commit succeeds.

### Task 4: GitHub Pages README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Add README**

Create `README.md` with this complete content:

```markdown
# Tampopo Website

Static holding site for タンポポ合同会社 / Tampopo LLC.

## Local Preview

Open `index.html` in a browser, or serve the directory with any static file server.

## GitHub Pages

This site is designed to deploy from the repository root with GitHub Pages:

1. Open the repository settings on GitHub.
2. Go to Pages.
3. Set the source to the default branch and repository root.
4. Save the settings.
```

- [ ] **Step 2: Commit README**

Run:

```bash
git add README.md
git commit -m "Add GitHub Pages notes"
```

Expected: commit succeeds.

### Task 5: Final Verification

**Files:**
- Verify: `index.html`
- Verify: `styles.css`
- Verify: `script.js`
- Verify: `README.md`

- [ ] **Step 1: Verify required files exist**

Run:

```bash
test -s index.html && test -s styles.css && test -s script.js && test -s README.md
```

Expected: exit code `0`.

- [ ] **Step 2: Verify internal asset references**

Run:

```bash
rg -n 'href="styles.css"|src="script.js"|https://kanna.build' index.html
```

Expected output includes references to `styles.css`, `script.js`, and `https://kanna.build`.

- [ ] **Step 3: Verify full email is absent from static source**

Run:

```bash
! rg -n "admin@tampopomyoko\\.com" index.html script.js styles.css README.md
```

Expected: exit code `0`.

- [ ] **Step 4: Verify git status**

Run:

```bash
git status --short
```

Expected: only pre-existing untracked `.cargo/` may remain.
