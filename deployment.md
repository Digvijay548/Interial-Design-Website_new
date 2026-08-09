# Deploying "Aurum Interiors" on Netlify

This site is **pure static** (HTML + CSS + JS + `config.json`). It needs **no build step**.
You can deploy it two ways — both take about 2 minutes. Option 2 is recommended if you
want the site to update automatically whenever you push to GitHub.

---

## Option 1 — Drag & Drop (fastest, for a quick test)

1. Open **https://app.netlify.com/drop** in your browser.
2. If you're not signed in: create an account — or better, click **"Sign in with GitHub"**
   and authorize it.
3. Drag the whole folder **`C:\GitHub\Interial Design Website`** onto the drop area
   ("Drag and drop your site output folder here").
4. Netlify uploads and deploys it in ~30 seconds. You get a URL like
   `https://random-name-12345.netlify.app`.
5. (Optional) Change the site name: **Site settings → General → Change site name**
   (e.g. `aurum-interiors` → live at `https://aurum-interiors.netlify.app`).

That's it — your site is live.

---

## Option 2 — Connect GitHub (recommended, auto-deploy on every push)

### Step 1 — Make sure the code is on GitHub
Your repo is already pushed: `https://github.com/Digvijay548/Interial-Design-Website_new`
(branch `main`). If you made any changes since then, commit & push first:
```
git add -A
git commit -m "update"
git push origin main
```

### Step 2 — Import the repo into Netlify
1. Go to **https://app.netlify.com** and sign in (recommend **"Sign in with GitHub"**).
2. Click **Add new site → Import an existing project**.
3. Pick **GitHub** as the provider → click **Connect to GitHub** and authorize
   Netlify when GitHub asks.
4. Netlify shows your repositories. Select **`Interial-Design-Website_new`**.

### Step 3 — Build settings (already handled by `netlify.toml`)
The repo contains a `netlify.toml` file, so Netlify already knows:
- **Build command:** *(empty — nothing to build)*
- **Publish directory:** `.` (the repo root)

If you ever see a screen asking for these, leave build command empty and type **`.`**
(a single dot) for publish directory.

### Step 4 — Deploy
Click **Deploy site**. Wait ~30–60 seconds. Your site is live at:
```
https://<your-site-name>.netlify.app
```
(Click "Deploys" → the latest deploy → "Preview" or "Open live" to open it.)

---

## Updating the site later

- **Option 2 setup:** just change `config.json` (or images) on your computer,
  then push:
  ```
  git add -A
  git commit -m "updated contact details"
  git push origin main
  ```
  Netlify detects the push and auto-redeploys in about a minute. No manual steps.
- **Drag & drop setup:** drag the folder into https://app.netlify.com/drop again.

> Everything on the site (name, phone, email, address, Google Map, social links,
> enquiry options, portfolio images) is controlled by **`config.json`** in the repo root.
> Images live in `assets/images/` — keep the same file names if you replace them.

---

## (Optional) Custom domain

1. In Netlify: **Site settings → Domain management → Add custom domain**.
2. Enter your domain (e.g. `auruminteriors.com`), follow the DNS instructions
   (usually point an `A` record to `75.2.60.5` or add a `CNAME`).
3. Netlify issues a free SSL certificate automatically.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Site opens but old images/text still show | Hard refresh: `Ctrl + F5` (browser cache) |
| Changes to `config.json` not appearing | Netlify auto-deploy may take ~1 min; also do a hard refresh |
| Google Map is blank | In `config.json`, `contact.mapEmbedUrl` must use the **embed** URL (ends with `output=embed`). Get it: Google Maps → Share → Embed a map → copy the iframe `src`. |
| Site shows "Deploy failed" | Check Deploys tab → error log. This repo has no build step, so failure usually means publish directory wrong (should be `.`) |
| `404` on refresh of a section link | Already handled by `netlify.toml` redirects (all unknown paths → `index.html`) |
| Enquiry button does nothing on mobile | It opens your email app (mailto). Works on any device with an email app installed. |
