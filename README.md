<div align="center">

<img src="https://i.ibb.co/N24YY0PM/daba65d6-1fc5-45a4-b22e-d4d29cbbcf35.png" alt="Checkpoint Preview icon" width="128" height="128">

# Checkpoint Preview Reworked

Build, preview and export Checkpoint avatars without leaving Discord.

[![License: MIT](https://img.shields.io/badge/License-MIT-5865f2.svg?style=for-the-badge)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-3ba55c.svg?style=for-the-badge)](checkpoint-preview.user.js)
[![Userscript](https://img.shields.io/badge/Userscript-Tampermonkey%20%7C%20Violentmonkey%20%7C%20ScriptVault-00485b.svg?style=for-the-badge)](#install-as-a-userscript)

[![Platform](https://img.shields.io/badge/Platform-Discord-5865f2.svg?style=flat&logo=discord&logoColor=white)](https://discord.com)
[![JavaScript](https://img.shields.io/badge/Vanilla-JavaScript-f7df1e.svg?style=flat&logo=javascript&logoColor=black)](checkpoint-preview.user.js)
</div>

---

## Features

▸ Pick base, face, outfit, head, shoes, accessory and aura, with a live preview<br>
▸ Nudge any item (X, Y, rotation) by sliders or by dragging the preview<br>
▸ Backgrounds: transparent, solid colors, gradients, custom color, custom gradient, or your own image<br>
▸ Export a full resolution PNG, copy it to the clipboard, or attach and send it straight to the current chat<br>
▸ Share and import presets as JSON, with undo (Ctrl+Z)<br>
▸ Button in Discord's user panel, with a hover tooltip and animation<br>
▸ Follows Discord's light and dark theme<br>
▸ Click the author credit to open the profile in place, no new tab

## ◆ Install

You only need one of the two options below.

### ▪ Install as a userscript

Runs automatically every time Discord loads. Recommended.

1. Install a userscript manager: [Tampermonkey](https://www.tampermonkey.net/), [Violentmonkey](https://violentmonkey.github.io/) or [ScriptVault](https://chromewebstore.google.com/detail/scriptvault/jlhdbkeijcbgnonpfkfkkkhfmbeejkgh?hl=en)
2. Open the raw file and confirm the install prompt:
   `https://raw.githubusercontent.com/ItzMeShadow999/CheckpointPreview-Reworked/main/checkpoint-preview.user.js`
3. Open Discord (web, or any client that runs your userscripts) and reload

The script loads the asset image through the userscript manager, so Discord's CSP does not get in the way.

### ▪ Run from the console

One off, nothing to install. It resets when you reload Discord.

1. Open DevTools on Discord (Ctrl+Shift+I). Discord web works out of the box; on desktop use Vesktop or a client that enables DevTools
2. Open the **Console** tab. If your browser blocks pasting, type `allow pasting` and press Enter first
3. Paste the whole contents of [`checkpoint-preview.console.js`](checkpoint-preview.console.js) and press Enter

If the auto-load of the asset image is blocked, a dialog asks you to select the original `Checkpoint Asset` PNG (8380 × 5632 px). The image stays on your computer.

## Usage

| Action | How |
| --- | --- |
| Open or close | Panel button (next to Settings) or `Ctrl + Shift + S` |
| Close | `Esc` or click outside the window |
| Undo | `Ctrl + Z` |
| Move an item | Select it, then drag the preview or use the sliders |
| Share a preset | **Copy preset**, send the JSON to anyone |
| Import a preset | **Import preset**, paste the JSON |
| Export | **Download PNG**, **Copy image**, **Attach to chat** or **Send to chat** |

## Troubleshooting

▸ **Nothing shows up.** Reload Discord. The panel button appears once the user panel has loaded.<br>
▸ **Asked to select a PNG.** The automatic download was blocked. Pick the original 8380 × 5632 PNG, or use the userscript version.<br>
▸ **Button looks off after a Discord update.** The script finds the panel by structure, not exact class names, so it usually survives. If it does not, open an issue.

## Files

| File | What it is |
| --- | --- |
| `checkpoint-preview.user.js` | Userscript (always on) |
| `checkpoint-preview.console.js` | Console version (one off) |
| `LICENSE` | MIT |

## ◆ Credits

Made by [ItzMeShadow](https://discord.com/users/1065604516399026176).

Base Script by [DeusDrizzyy](https://github.com/DeusDrizzyy)
## ◆ License

[MIT](LICENSE)
