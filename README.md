# Thornwake

An idle/incremental RPG — gather, cook, smith, fight, and quest around the Hollow of
Thornwake. Single-file, no-build web app (HTML/CSS/JS), styled in the **Hearthstead**
visual direction, installable as an offline PWA.

- `index.html` — the app shell and markup
- `game.js` — all game data and logic
- `manifest.webmanifest`, `sw.js`, `icons/` — PWA install + offline support
- `design_handoff_thornwake_hearthstead/` — the original design references this build
  was implemented from (not needed to play)

Progress autosaves to the browser's local storage on the device you play on. There's no
server and no account — it's private to that one browser/device.

## Play it on your iPhone

Pick whichever fits how you want to run it:

### Option A — Host it, then just open the link (recommended)

The simplest way to get a stable URL you can open anytime, install to your Home Screen,
and use offline afterwards.

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. Turn on **GitHub Pages** for the repo: Settings → Pages → Deploy from branch → pick
   `main` (or this branch) and `/` (root) → Save. GitHub gives you a URL like
   `https://<you>.github.io/<repo>/`.
3. On your iPhone, open that URL in **Safari** (must be Safari, not Chrome, for the
   install step below).
4. Tap the Share icon → **Add to Home Screen**. You now have a Thornwake app icon.
   Opening it launches full-screen with no browser chrome, and it keeps working with
   the phone offline once it's loaded once.

### Option B — Fully local, no hosting

Run a tiny local web server on a computer on the same Wi-Fi as your iPhone, no internet
required.

1. On the computer, from this folder, run:
   ```
   python3 -m http.server 8080
   ```
   (Python 3 ships on macOS/Linux; on Windows use `py -m http.server 8080`, or install
   Node and run `npx http-server -p 8080`.)
2. Find that computer's local IP address (macOS: System Settings → Wi-Fi → Details;
   Windows: `ipconfig`; Linux: `ip addr`). It looks like `192.168.1.23`.
3. On your iPhone (same Wi-Fi), open Safari and go to `http://192.168.1.23:8080/`.
4. Tap the Share icon → **Add to Home Screen** to get an app icon.

Note: because this is served over plain `http://` (not `https://`), the offline
service worker won't register — the page still runs and saves fine, but you'll need
the computer's server running each time you want to play. For real offline play,
use Option A.

## Save progress

The game saves automatically (about a second after anything changes) to the browser's
`localStorage` on that device. That means:

- Progress stays as long as you keep using the same browser on the same phone and
  don't clear Safari's site data for the page.
- It does **not** sync between devices — playing on your phone and your laptop are two
  separate save files unless they're the exact same hosted URL *and* you mean to treat
  it as one, which localStorage still won't do (it's per-device, not per-URL-account).
- If storage is ever unavailable, the game falls back to an in-memory save that only
  lasts the current tab session, and shows a toast warning you.

## Local development

No build step. Just serve the folder statically and open `index.html` (see Option B
above, or any static server / editor "Go Live" feature). Edit `game.js` for game logic
and data, `index.html` for markup/styles.
