// ==UserScript==
// @name         Checkpoint Preview Reworked
// @namespace    https://discord.com/users/1065604516399026176
// @version      1.0.0
// @description  Checkpoint avatar preview and PNG exporter for Discord. Adds a button to the user panel (or press Ctrl+Shift+S).
// @author       ItzMeShadow999
// @icon         https://i.ibb.co/N24YY0PM/daba65d6-1fc5-45a4-b22e-d4d29cbbcf35.png
// @homepageURL  https://github.com/ItzMeShadow999/CheckpointPreview-Reworked
// @supportURL   https://github.com/ItzMeShadow999/CheckpointPreview-Reworked/issues
// @updateURL    https://raw.githubusercontent.com/ItzMeShadow999/CheckpointPreview-Reworked/main/checkpoint-preview.user.js
// @downloadURL  https://raw.githubusercontent.com/ItzMeShadow999/CheckpointPreview-Reworked/main/checkpoint-preview.user.js
// @match        https://discord.com/*
// @match        https://*.discord.com/*
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      i.ibb.co
// @run-at       document-idle
// @noframes
// ==/UserScript==

(() => {
    "use strict";
    const W = typeof unsafeWindow !== "undefined" ? unsafeWindow : window;
    const KEY = "__CHECKPOINT_PREVIEW__";

    const run = async (interactive) => {
    window[KEY]?.destroy?.();

    const D = {
        "base": [[31, 16, 63, 102, 63, 102, 0.5, 7.0, 0], [168, 16, 64, 102, 64, 102, 0.5, 7.0, 0], [305, 16, 64, 102, 64, 102, 0.5, 7.0, 0], [442, 16, 65, 102, 65, 102, 0.0, 7.0, 0], [580, 16, 64, 102, 64, 102, 0.5, 7.0, 0], [717, 16, 65, 102, 65, 102, 0.5, 7.0, 0], [855, 16, 63, 102, 63, 102, 0.5, 7.0, 0], [992, 16, 64, 102, 64, 102, 0.5, 7.0, 0], [1130, 16, 63, 102, 63, 102, 0.5, 7.0, 0], [1266, 16, 65, 102, 65, 102, 0.5, 7.0, 0], [1404, 16, 64, 102, 64, 102, 0.5, 7.0, 0], [1541, 16, 65, 102, 65, 102, 1.0, 7.0, 0], [1679, 16, 64, 102, 64, 102, 0.5, 7.0, 0], [1816, 16, 64, 102, 64, 102, 0.5, 7.0, 0], [1954, 16, 63, 102, 63, 102, 0.5, 7.0, 0]],
        "hat": [[28, 132, 69, 40, 69, 40, 0.5, -13.5, 0], [156, 144, 65, 57, 65, 57, 0.0, 7.5, 0], [276, 125, 73, 36, 73, 36, 6.5, -22.0, 0], [407, 141, 69, 32, 69, 32, -0.5, -8.0, 0], [547, 125, 31, 26, 31, 26, 5.5, -27.0, 0], [660, 125, 57, 25, 57, 25, 8.5, -28.5, 0], [781, 136, 65, 27, 65, 27, 20.5, -15.0, 0], [903, 131, 71, 39, 71, 39, 10.5, -15.0, 0], [1043, 142, 42, 17, 42, 17, 4.5, -14.0, 0], [1153, 125, 71, 46, 71, 46, 8.5, -19.0, 0], [1278, 126, 47, 35, 47, 35, 6.0, -21.5, 0], [1416, 125, 27, 29, 27, 29, 3.0, -26.0, 0], [1548, 134, 31, 21, 31, 21, 1.5, -20.5, 0], [1657, 142, 67, 23, 67, 23, -1.0, -11.5, 0]],
        "face": [[50, 286, 35, 33, 35, 33, 6.5, 7.0, 0], [180, 286, 39, 20, 39, 20, 10.5, 0.5, 0], [305, 288, 39, 20, 39, 20, -10.5, 3.0, 0], [428, 276, 43, 43, 43, 43, 3.0, 3.0, 0], [555, 290, 39, 21, 39, 21, -10.5, 5.5, 0], [677, 281, 44, 31, 44, 31, 10.5, 2.0, 0], [802, 280, 45, 31, 45, 31, -9.5, 2.0, 0], [931, 285, 37, 27, 37, 27, 8.0, 3.5, 0], [1049, 279, 56, 32, 56, 32, -4.5, 0.0, 0], [1177, 272, 41, 41, 41, 41, 9.0, -2.0, 0], [1306, 285, 42, 32, 42, 32, 12.0, 6.0, 0], [1425, 277, 64, 36, 64, 36, 2.0, 0.0, 0], [1557, 284, 38, 24, 38, 24, -10.0, 1.0, 0], [1680, 284, 42, 28, 42, 28, 10.5, 2.5, 0], [1804, 279, 44, 38, 44, 38, 9.0, 3.5, 0]],
        "outfit": [[39, 444, 48, 45, 48, 45, 1.0, -6.0, 0], [170, 444, 55, 46, 55, 46, 1.0, -6.0, 0], [314, 445, 46, 46, 46, 46, 0.5, -4.5, 0], [451, 446, 63, 42, 63, 42, 7.5, -5.5, 0], [588, 448, 50, 39, 50, 39, 1.5, -5.0, 0], [725, 446, 51, 41, 51, 41, 2.0, -6.0, 0], [864, 447, 46, 41, 46, 41, 0.5, -5.0, 0], [1000, 448, 49, 39, 49, 39, 1.5, -5.0, 0], [1137, 448, 50, 39, 50, 39, 1.0, -5.0, 0], [1275, 448, 49, 39, 49, 39, 1.0, -5.0, 0], [1406, 436, 56, 52, 56, 52, -1.5, -10.0, 0], [1549, 444, 50, 46, 50, 46, 2.0, -6.0, 0], [1686, 448, 49, 40, 49, 40, 0.0, -5.0, 0], [1825, 447, 51, 40, 51, 40, 0.5, -5.5, 0], [1962, 447, 46, 41, 46, 41, 0.5, -5.0, 0], [40, 572, 46, 42, 46, 42, 1.0, -4.5, 0], [176, 572, 47, 40, 47, 40, 0.5, -5.5, 0], [314, 572, 46, 41, 46, 41, 0.0, -5.0, 0], [451, 569, 49, 46, 49, 46, 1.0, -6.0, 0], [588, 569, 49, 45, 49, 45, 1.0, -6.0, 0], [725, 571, 51, 41, 51, 41, 2.0, -6.0, 0], [865, 573, 44, 39, 44, 39, 1.0, -5.5, 0], [1001, 572, 45, 42, 45, 42, 0.5, -4.5, 0], [1138, 571, 62, 42, 62, 42, 8.0, -5.5, 0], [1276, 573, 45, 39, 45, 39, 0.0, -5.5, 0], [1406, 562, 56, 51, 56, 51, -1.5, -10.0, 0], [1551, 573, 45, 39, 45, 39, 1.0, -5.5, 0], [1686, 573, 49, 40, 49, 40, 0.0, -5.0, 0], [1825, 572, 47, 40, 47, 40, 0.5, -5.5, 0], [1962, 572, 46, 42, 46, 42, 0.5, -4.5, 0], [39, 695, 48, 44, 48, 44, 0.5, -6.0, 0], [173, 690, 53, 49, 53, 49, 0.5, -8.0, 0], [315, 698, 44, 39, 44, 39, 0.0, -5.0, 0], [450, 697, 49, 42, 49, 42, 0.0, -4.0, 0], [591, 698, 45, 40, 45, 40, 2.0, -4.5, 0], [728, 698, 46, 40, 46, 40, 2.5, -4.5, 0], [862, 698, 48, 40, 48, 40, 0.0, -4.5, 0], [1001, 697, 62, 41, 62, 41, 8.5, -5.0, 0], [1138, 697, 51, 41, 51, 41, 0.0, -4.5, 0], [1274, 698, 48, 40, 48, 40, -0.5, -4.5, 0], [1412, 695, 48, 44, 48, 44, 0.5, -6.0, 0], [1549, 697, 51, 41, 51, 41, 2.0, -5.0, 0], [1688, 697, 61, 41, 61, 41, 8.5, -5.0, 0], [1826, 696, 45, 45, 45, 45, 1.0, -4.0, 0], [1962, 698, 46, 41, 46, 41, 0.0, -4.5, 0], [38, 823, 49, 41, 49, 41, 0.5, -4.0, 0], [177, 823, 45, 42, 45, 42, 0.0, -4.0, 0], [312, 823, 50, 41, 50, 41, 0.5, -4.0, 0], [452, 823, 45, 41, 45, 41, 0.0, -4.0, 0], [591, 824, 45, 39, 45, 39, 2.0, -4.0, 0], [726, 820, 48, 44, 48, 44, 1.0, -5.5, 0], [863, 822, 50, 41, 50, 41, 2.0, -5.0, 0], [1003, 824, 45, 39, 45, 39, 2.0, -4.0, 0], [1138, 821, 46, 46, 46, 46, 0.5, -3.5, 0], [1274, 823, 49, 41, 49, 41, 0.0, -4.0, 0], [1413, 822, 62, 42, 62, 42, 8.5, -5.0, 0], [1550, 820, 48, 44, 48, 44, 1.0, -5.5, 0], [1688, 821, 46, 46, 46, 46, 1.5, -3.5, 0], [1818, 812, 56, 52, 56, 52, -2.0, -9.5, 0], [1961, 823, 49, 41, 49, 41, 0.5, -4.0, 0], [39, 948, 49, 40, 49, 40, 1.5, -4.0, 0], [175, 949, 48, 39, 48, 39, -0.5, -4.0, 0], [315, 948, 44, 39, 44, 39, 0.0, -4.5, 0], [451, 948, 47, 40, 47, 40, 0.0, -4.5, 0], [588, 945, 48, 44, 48, 44, 0.5, -5.5, 0], [728, 949, 46, 39, 46, 39, 2.5, -4.0, 0], [857, 937, 56, 52, 56, 52, -1.0, -9.5, 0], [1001, 948, 45, 42, 45, 42, 0.5, -4.0, 0], [1138, 946, 46, 46, 46, 46, 0.5, -3.5, 0], [1274, 947, 51, 41, 51, 41, 1.0, -5.0, 0]],
        "shoes": [[43, 1109, 40, 14, 40, 14, 0.5, 6.0, 0], [167, 1109, 42, 12, 42, 12, -1.5, 4.5, 0], [294, 1107, 38, 14, 38, 14, 11.0, 4.5, 0], [417, 1110, 41, 11, 41, 11, 11.5, 5.5, 0], [542, 1108, 41, 13, 41, 13, 11.5, 4.5, 0], [668, 1110, 40, 11, 40, 11, -9.0, 5.5, 0], [792, 1110, 42, 10, 42, 10, 12.0, 5.0, 0], [919, 1109, 39, 13, 39, 13, 9.5, 5.5, 0], [1044, 1109, 40, 12, 40, 12, 12.0, 5.0, 0], [1167, 1104, 43, 16, 43, 16, -13.5, 2.0, 0], [1293, 1107, 42, 13, 42, 13, -10.0, 3.5, 0], [1418, 1109, 40, 11, 40, 11, 10.0, 4.5, 0], [1543, 1110, 41, 11, 41, 11, 11.5, 5.5, 0], [1665, 1107, 47, 14, 47, 14, 12.5, 4.0, 0]],
        "wearable": [[26, 1220, 25, 26, 25, 26, 0.5, 40.5, 0], [159, 1220, 19, 26, 19, 26, 1.0, 41.0, 0], [277, 1207, 32, 24, 32, 24, 7.5, 27.0, 0], [410, 1222, 18, 19, 18, 19, 0.0, 38.5, 0], [535, 1220, 19, 22, 19, 22, 0.5, 38.5, 0], [631, 1177, 46, 52, 46, 52, 5.0, 11.5, 0], [768, 1181, 37, 54, 37, 54, 5.0, 17.5, 0], [902, 1194, 26, 43, 26, 43, 5.0, 23.0, 0], [1062, 1196, 42, 38, 42, 38, -12.9, 22.7, 0], [1138, 1197, 102, 28, 102, 28, 0.0, 18.0, 1], [1266, 1188, 95, 30, 95, 30, 29.8, 10.0, 1], [1383, 1159, 112, 79, 112, 79, -1.0, 6.0, 1], [1504, 1137, 120, 109, 120, 109, -0.5, -0.5, 1], [1657, 1143, 64, 51, 64, 51, -27.0, -24.5, 0]],
        "aura": [[13, 1360, 98, 16, 98, 16, 4.0, 3.0, 0], [128, 1249, 118, 127, 118, 127, -21.0, -2.5, 0], [250, 1251, 126, 121, 126, 121, 15.5, -2.0, 0], [379, 1251, 118, 110, 118, 110, -30.0, -0.5, 0], [503, 1251, 119, 119, 119, 119, 17.0, -1.5, 0], [632, 1294, 117, 80, 117, 80, -2.5, 10.0, 0], [760, 1251, 106, 118, 106, 118, 2.5, 0.0, 0], [900, 1300, 92, 76, 92, 76, 11.0, 12.0, 0], [1001, 1251, 124, 125, 124, 125, -29.0, 9.0, 0], [1128, 1265, 121, 103, 121, 103, 15.5, 4.0, 0], [1254, 1258, 119, 110, 119, 110, -5.5, 2.5, 0], [1386, 1316, 109, 60, 109, 60, 13.5, 41.0, 0], [1506, 1317, 116, 59, 116, 59, -2.0, 34.5, 0], [1627, 1307, 124, 68, 124, 68, -26.0, 28.0, 0]]
    };

    const CATS = ["base", "face", "outfit", "hat", "shoes", "wearable", "aura"];
    const LABEL = {
        base: "Base",
        face: "Face",
        outfit: "Outfit",
        hat: "Head",
        shoes: "Shoes",
        wearable: "Accessory",
        aura: "Aura"
    };
    const OPTIONAL = new Set(["hat", "outfit", "shoes", "wearable", "aura"]);
    const DEFAULT = {base: 14, face: 4, outfit: 55, hat: 7, shoes: 0, wearable: 11, aura: null};
    const DEFAULT_ADJ = {
        "wearable:6": {x: 36.9, y: 0.6, s: 1, r: 32},
        "wearable:2": {x: -0.1, y: 0, s: 1, r: 0}
    };
    const ANCHOR = {
        hat: [31.5, 31],
        face: [31.5, 28],
        outfit: [31, 78],
        shoes: [31.5, 88.6],
        wearable: [31.2, 43.2],
        aura: [31.2, 43.2]
    };
    const CENTERED = new Set(["hat", "face", "shoes", "aura"]);
    const VIEW = {x: -50.25, y: -32, s: 164};
    const AURA_ALPHA = 1;
    const REFERENCE = {width: 2048, height: 1376};
    const ORIGINAL = {width: 8380, height: 5632};
    const CREDIT_NAME = "literally.shadow";
    const CREDIT_URL = "https://discord.com/users/1065604516399026176";
    const CREDIT = "by " + CREDIT_NAME;
    const CREDIT_LINK = `by <a data-t="${CREDIT_NAME}" href="${CREDIT_URL}" target="_blank" rel="noopener noreferrer" title="Open ${CREDIT_NAME} on Discord">${CREDIT_NAME}</a>`;
    const pageTheme = () => {
        const cl = document.documentElement.classList, bl = document.body?.classList;
        const has = (n) => cl.contains(n) || bl?.contains(n);
        if (has("theme-light")) return "light";
        if (has("theme-dark") || has("theme-darker") || has("theme-midnight")) return "dark";
        return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
    };
    const BGS = {
        transparent: null, escuro: "#313338", claro: "#f2f3f5", blurple: "#5865f2",
        onyx: "#1e1f22", midnight: "#0b0d14", black: "#000000", white: "#ffffff", grey: "#4e5058",
        green: "#23a55a", teal: "#1abc9c", yellow: "#f0b232", red: "#da373c", fuchsia: "#eb459f",
        sunset: {angle: 160, grad: ["#ff512f", "#dd2476"]},
        ocean: {angle: 160, grad: ["#2193b0", "#6dd5ed"]},
        aurora: {angle: 150, grad: ["#00c9ff", "#92fe9d"]},
        candy: {angle: 135, grad: ["#f093fb", "#f5576c"]},
        ember: {angle: 160, grad: ["#f12711", "#f5af19"]},
        twilight: {angle: 160, grad: ["#232526", "#5865f2"]},
        custom: null,
        customgrad: null
    };
    const BG_MENU = [
        ["Basic", [["transparent", "Transparent"], ["escuro", "Dark"], ["claro", "Light"], ["blurple", "Blurple"]]],
        ["Colors", [["onyx", "Onyx"], ["midnight", "Midnight"], ["black", "Black"], ["white", "White"], ["grey", "Grey"], ["green", "Green"], ["teal", "Teal"], ["yellow", "Yellow"], ["red", "Red"], ["fuchsia", "Fuchsia"]]],
        ["Gradients", [["sunset", "Sunset"], ["ocean", "Ocean"], ["aurora", "Aurora"], ["candy", "Candy"], ["ember", "Ember"], ["twilight", "Twilight"]]]
    ];
    const BG_LABEL = {custom: "Custom color", customgrad: "Custom gradient", image: "Image"};
    for (const [, items] of BG_MENU) for (const [k, l] of items) BG_LABEL[k] = l;

    function paintBackground(cx, size, bg) {
        if (!bg) return;
        if (typeof bg === "string") {
            cx.fillStyle = bg;
            cx.fillRect(0, 0, size, size);
        } else if (bg.grad) {
            const a = bg.angle * Math.PI / 180, dx = Math.sin(a), dy = -Math.cos(a);
            const half = (Math.abs(size * dx) + Math.abs(size * dy)) / 2, m = size / 2;
            const g = cx.createLinearGradient(m - dx * half, m - dy * half, m + dx * half, m + dy * half);
            bg.grad.forEach((c, i) => g.addColorStop(i / (bg.grad.length - 1), c));
            cx.fillStyle = g;
            cx.fillRect(0, 0, size, size);
        } else if (bg.img) {
            const w = bg.img.width, h = bg.img.height;
            if (!w || !h) return;
            cx.imageSmoothingEnabled = true;
            cx.imageSmoothingQuality = "high";
            if (bg.fit === "stretch") cx.drawImage(bg.img, 0, 0, size, size);
            else {
                const k = bg.fit === "contain" ? Math.min(size / w, size / h) : Math.max(size / w, size / h);
                cx.drawImage(bg.img, (size - w * k) / 2, (size - h * k) / 2, w * k, h * k);
            }
        }
    }

    const HAT_FIX = {3: [0, -9], 4: [0, 9], 6: [0, 16], 8: [0, 2], 10: [0, -7], 11: [-8.9, -7.9]};
    const HAND = [13.3, 78.9];
    const WEAR = {
        0: {t: "hand", g: [0.5, 0.05]},
        1: {t: "hand", g: [0.5, 0.45]},
        2: {t: "hand", g: [0.537, 0.615]},
        3: {t: "hand", g: [0.5, 0.04]},
        4: {t: "hand", g: [0.5, 0.04]},
        5: {t: "hand", g: [0.835, 0.856]},
        6: {t: "hand", g: [0.712, 0.73]},
        7: {t: "hand", g: [0.606, 0.648]},
        8: {t: "tail", g: [0.06, 0.82], at: [29, 85]},
        9: {t: "wing", at: [31.7, 60]},
        10: {t: "wing", at: [31.7, 60]},
        11: {t: "wing", at: [31.7, 54]},
        12: {t: "wing", at: [31.7, 50]},
        13: {t: "front", at: [31.7, 46]},
    };
    const isBack = (c, i) => c === "wearable" && (WEAR[i].t === "wing" || WEAR[i].t === "tail");

    const originalPlace = (c, i, s) => {
        const m = D[c][i];
        if (c === "base") return {u: m[4] / 2, v: m[5] / 2, px: 0, py: 0};
        if (c === "wearable") {
            const w = WEAR[i];
            if (w.t === "hand" || w.t === "tail") {
                const p = w.t === "hand" ? HAND : w.at, px = (w.g[0] - 0.5) * m[4], py = (w.g[1] - 0.5) * m[5];
                return {u: p[0] - px, v: p[1] - py, px, py};
            }
            return {u: w.at[0], v: w.at[1], px: 0, py: 0};
        }
        if (c === "shoes") {
            const bt = srcData(c, i).bb, floor = D.base[s.base][5] + 0.2;
            return {u: 31.5, v: floor - (bt - 0.5) * m[5], px: 0, py: 0};
        }
        if (c === "hat") {
            const f = HAT_FIX[i] || [0, 0];
            return {u: 31.5 + f[0], v: ANCHOR.hat[1] + m[7] + f[1], px: 0, py: 0};
        }
        const a = ANCHOR[c], ox = CENTERED.has(c) ? 0 : m[6];
        return {u: a[0] + ox, v: a[1] + m[7], px: 0, py: 0};
    };
    const CALIBRATION = {
        "face:5": {"x": 1.9, "y": 0, "s": 1, "r": 0},
        "outfit:30": {"x": 2.3, "y": 4.4, "s": 1, "r": 0},
        "hat:11": {"x": 0, "y": 5.8, "s": 1, "r": 0},
        "hat:0": {"x": 2.3, "y": -6.2, "s": 1, "r": 0},
        "shoes:2": {"x": 2, "y": 1.3, "s": 1, "r": 0},
        "shoes:5": {"x": 2, "y": 1.3, "s": 1, "r": 0},
        "wearable:4": {"x": 2.3, "y": 1.2, "s": 1, "r": 0},
        "wearable:6": {"x": 1.5, "y": 0.6, "s": 1, "r": 0}
    };
    const REFERENCE_ITEM = {face: 5, outfit: 30, hat: 0, shoes: 2, wearable: 4};
    const shift = (p, a) => ({...p, u: p.u + a.x, v: p.v + a.y});

    function sourceCenter(c, i) {
        const sprite = srcData(c, i), m = D[c][i], [x, y] = cellBounds(c, i);
        return {
            u: (m[0] - x + sprite.w / 2) / SOURCE_SCALE.x,
            v: (m[1] - y + sprite.h / 2) / SOURCE_SCALE.y
        };
    }

    function referenceOrigin(c, s) {
        const id = REFERENCE_ITEM[c], center = sourceCenter(c, id);
        const target = shift(originalPlace(c, id, s), CALIBRATION[c + ":" + id]);
        return {u: target.u - center.u, v: target.v - center.v};
    }

    const place = (c, i, s) => {
        srcData(c, i);
        if (c === "shoes") srcData("base", s.base);
        const p = originalPlace(c, i, s), exact = CALIBRATION[c + ":" + i];
        if (exact) return shift(p, exact);
        if (c === "base") return p;
        if (c === "hat" || c === "outfit" || c === "aura") {
            const origin = referenceOrigin(c === "aura" ? "outfit" : c, s), center = sourceCenter(c, i);
            return {...p, u: origin.u + center.u, v: origin.v + center.v};
        }
        if (c === "wearable" && WEAR[i].t !== "hand") {
            const origin = referenceOrigin("outfit", s), center = sourceCenter("base", s.base);
            const base = originalPlace("base", s.base, s);
            return shift(p, {x: origin.u - (base.u - center.u), y: origin.v - (base.v - center.v)});
        }
        return shift(p, CALIBRATION[c + ":" + REFERENCE_ITEM[c]]);
    };

    const NOADJ = {x: 0, y: 0, s: 1, r: 0};
    const ADJ = JSON.parse(JSON.stringify(DEFAULT_ADJ));
    const getAdj = (c, id) => ADJ[c + ":" + id] || NOADJ;

    const ATLAS_DATA_URI = "";
    const ATLAS_URL = "https://i.ibb.co/YFMcML2D/Checkpoint-Assets.png";

    const loadImg = (src) => new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Image blocked or failed to load"));
        img.src = src;
    });

    const gmBlob = (url) => new Promise((resolve, reject) => {
        if (typeof GM_xmlhttpRequest !== "function") return reject(new Error("GM_xmlhttpRequest unavailable"));
        GM_xmlhttpRequest({
            method: "GET", url, responseType: "blob", timeout: 60000,
            onload: (r) => (r.status >= 200 && r.status < 400 && r.response ? resolve(r.response) : reject(new Error("HTTP " + r.status))),
            onerror: () => reject(new Error("GM request failed")),
            ontimeout: () => reject(new Error("GM request timed out"))
        });
    });

    async function fetchBitmap(src) {
        if (src.startsWith("data:")) return createImageBitmap(await loadImg(src));
        try {
            return await createImageBitmap(await gmBlob(src));
        } catch (e) {
            console.warn("[Checkpoint Preview Reworked] GM fetch failed, trying page fetch:", e);
        }
        try {
            const res = await fetch(src, {mode: "cors"});
            if (!res.ok) throw new Error("HTTP " + res.status);
            return await createImageBitmap(await res.blob());
        } catch (e) {
            return createImageBitmap(await loadImg(src));
        }
    }

    async function loadAtlas() {
        const bitmap = await fetchBitmap(ATLAS_DATA_URI || ATLAS_URL);
        if (bitmap.width !== ORIGINAL.width || bitmap.height !== ORIGINAL.height) {
            const {width, height} = bitmap;
            bitmap.close();
            throw new Error(`Expected ${ORIGINAL.width} × ${ORIGINAL.height}, got ${width} × ${height}`);
        }
        return bitmap;
    }

    async function tryCspOverride() {
        try {
            const csp = W.VencordNative?.csp;
            if (!csp?.requestAddOverride) return null;
            return await csp.requestAddOverride("https://i.ibb.co/", ["connect-src", "img-src"], "Checkpoint Preview Reworked");
        } catch (e) {
            return null;
        }
    }

    async function decodeAtlas(file) {
        const header = await file.slice(0, 24).arrayBuffer();
        const signature = new Uint8Array(header), png = [137, 80, 78, 71, 13, 10, 26, 10];
        if (signature.length < 24 || png.some((v, i) => signature[i] !== v) ||
            signature[12] !== 73 || signature[13] !== 72 || signature[14] !== 68 || signature[15] !== 82) {
            throw new Error("Select the original Checkpoint PNG file.");
        }
        const view = new DataView(header), width = view.getUint32(16), height = view.getUint32(20);
        if (width !== ORIGINAL.width || height !== ORIGINAL.height) {
            throw new Error(`Expected the original ${ORIGINAL.width} × ${ORIGINAL.height} PNG. Selected: ${width} × ${height} px. Choose the full-size file from your computer.`);
        }
        const bitmap = await createImageBitmap(file);
        if (bitmap.width !== width || bitmap.height !== height) {
            bitmap.close();
            throw new Error("The PNG could not be decoded at its original dimensions.");
        }
        return bitmap;
    }

    function chooseAtlas(note) {
        return new Promise((resolve) => {
            const loader = document.createElement("div");
            loader.style.cssText = "position:fixed;inset:0;z-index:2147483000";
            const ui = loader.attachShadow({mode: "open"});
            loader.setAttribute("data-theme", pageTheme());
            ui.innerHTML = `
<style>
:host{all:initial}
*{box-sizing:border-box}
.overlay{position:fixed;inset:0;display:grid;place-items:center;background:rgba(0,0,0,.7);font:14px var(--font-primary,"gg sans",Arial,sans-serif);color:#dbdee1}
.dialog{width:min(440px,calc(100vw - 32px));padding:24px;border-radius:8px;background:var(--modal-background,var(--background-primary,#313338));box-shadow:0 8px 32px #0006}
h2{margin:0 0 12px;font-size:20px;color:#f2f3f5}
p{margin:0 0 16px;line-height:1.5}
.status{min-height:22px;color:#b5bac1;overflow-wrap:anywhere}
.status.error{color:#ff8b94}
.actions{display:flex;justify-content:flex-end;gap:8px}
button{all:unset;cursor:pointer;padding:9px 16px;border-radius:4px;background:#4e5058;color:#fff;font-weight:500}
button.primary{background:#5865f2}
button:disabled{opacity:.55;cursor:wait}
button:focus-visible{outline:2px solid #fff;outline-offset:3px}
input{display:none}
:host([data-theme="light"]) .overlay{color:#313338}
:host([data-theme="light"]) .dialog{background:var(--modal-background,var(--background-primary,#fff));box-shadow:0 8px 32px #00000033}
:host([data-theme="light"]) h2{color:#060607}
:host([data-theme="light"]) .status{color:#4e5058}
:host([data-theme="light"]) .status.error{color:#d12d3a}
:host([data-theme="light"]) button:focus-visible{outline-color:#5865f2}
</style>
<div class="overlay"><section class="dialog" role="dialog" aria-modal="true" aria-labelledby="checkpoint-load-title">
  <h2 id="checkpoint-load-title">Checkpoint Asset · Open PNG</h2>
  <p>Select the original <strong>Checkpoint Asset PNG</strong> file, at ${ORIGINAL.width} × ${ORIGINAL.height} px.</p>
  <p class="status" role="status">The image stays on your computer. Items keep their original size.</p>
  <input type="file" accept=".png,image/png">
  <div class="actions"><button class="cancel">Cancel</button><button class="primary">Select PNG</button></div>
</section></div>`;
            const input = ui.querySelector("input"), select = ui.querySelector(".primary"), status = ui.querySelector(".status");
            let settled = false, reading = false;
            if (note) {
                status.classList.add("error");
                status.textContent = note;
            }
            const finish = (bitmap) => {
                if (settled) {
                    bitmap?.close();
                    return;
                }
                settled = true;
                window.removeEventListener("keydown", onKey, true);
                loader.remove();
                if (window[KEY] === pending) delete window[KEY];
                resolve(bitmap);
            };
            const onKey = (e) => {
                if (e.key === "Escape") {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    finish(null);
                }
            };
            const pending = {destroy: () => finish(null)};
            window[KEY] = pending;
            select.addEventListener("click", () => input.click());
            ui.querySelector(".cancel").addEventListener("click", () => finish(null));
            ui.querySelector(".overlay").addEventListener("click", (e) => {
                if (e.target === e.currentTarget) finish(null);
            });
            input.addEventListener("change", async () => {
                const file = input.files?.[0];
                input.value = "";
                if (!file || settled || reading) return;
                reading = true;
                select.disabled = true;
                status.classList.remove("error");
                status.textContent = "Opening PNG…";
                try {
                    finish(await decodeAtlas(file));
                } catch (e) {
                    if (!settled) {
                        status.classList.add("error");
                        status.textContent = e.message || "Could not open this PNG. Please select the original file.";
                    }
                } finally {
                    reading = false;
                    if (!settled) select.disabled = false;
                }
            });
            for (const event of ["keydown", "keyup", "keypress"]) ui.addEventListener(event, (e) => e.stopPropagation());
            window.addEventListener("keydown", onKey, true);
            document.body.appendChild(loader);
            select.focus();
        });
    }

    let atlas = null, cspResult = null;
    try {
        atlas = await loadAtlas();
    } catch (e) {
        console.warn("[Checkpoint Preview Reworked] Auto-load failed (likely Discord CSP):", e);
        cspResult = await tryCspOverride();
    }
    if (!atlas && interactive) {
        atlas = await chooseAtlas(cspResult === "ok"
            ? "i.ibb.co was whitelisted. Reload Discord and run the script again, or select the PNG manually now."
            : "Couldn't auto-load the image (Discord's CSP blocks i.ibb.co). Select the PNG manually instead.");
    }
    if (!atlas) return;
    const SOURCE_SCALE = {x: atlas.width / REFERENCE.width, y: atlas.height / REFERENCE.height};
    const PREVIEW = Math.ceil(VIEW.s * Math.max(SOURCE_SCALE.x, SOURCE_SCALE.y));
    let destroyed = false;
    const yieldUI = () => new Promise((r) => setTimeout(r));
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

    const srcCache = new Map();
    const scan = new OffscreenCanvas(1, 1), scanContext = scan.getContext("2d", {willReadFrequently: true});
    const CELL = ORIGINAL.height / 11;
    const SPACED_STRIDE = (ORIGINAL.width - CELL) / 14;
    const ROWS = {base: 0, hat: 1, face: 2, shoes: 8, wearable: 9, aura: 10};

    function cellBounds(c, i) {
        const column = c === "outfit" ? i % 15 : i;
        const row = c === "outfit" ? 3 + Math.floor(i / 15) : ROWS[c];
        const stride = c === "base" || c === "outfit" ? SPACED_STRIDE : CELL;
        return [column * stride, row * CELL, CELL, CELL];
    }

    const srcData = (c, i) => {
        const key = c + ":" + i;
        let hit = srcCache.get(key);
        if (hit) return hit;
        const [sx, sy, sw, sh] = cellBounds(c, i);
        if (scan.width !== sw) scan.width = sw;
        if (scan.height !== sh) scan.height = sh;
        scanContext.clearRect(0, 0, sw, sh);
        scanContext.imageSmoothingEnabled = false;
        scanContext.drawImage(atlas, sx, sy, sw, sh, 0, 0, sw, sh);
        const pixels = scanContext.getImageData(0, 0, sw, sh).data;
        let left = sw, top = sh, right = -1, bottom = -1, sole = -1;
        for (let y = 0; y < sh; y++) {
            for (let x = 0; x < sw; x++) {
                const alpha = pixels[(y * sw + x) * 4 + 3];
                if (!alpha) continue;
                if (x < left) left = x;
                if (x > right) right = x;
                if (y < top) top = y;
                if (y > bottom) bottom = y;
                if (alpha > 60) sole = y;
            }
        }
        if (right < left || bottom < top) throw new Error(`Item ${LABEL[c]} ${i + 1} is missing. Use the original Checkpoint sheet.`);
        const x = sx + left, y = sy + top, w = right - left + 1, h = bottom - top + 1;
        const cv = new OffscreenCanvas(w, h), cx = cv.getContext("2d");
        cx.imageSmoothingEnabled = false;
        cx.drawImage(atlas, x, y, w, h, 0, 0, w, h);
        const m = D[c][i];
        m[0] = x;
        m[1] = y;
        m[2] = w;
        m[3] = h;
        m[4] = w / SOURCE_SCALE.x;
        m[5] = h / SOURCE_SCALE.y;
        hit = {cv, w, h, bb: sole >= top ? (sole - top + 1) / h : 1};
        srcCache.set(key, hit);
        return hit;
    };

    async function compose(sel, {bg = null, isStale = () => false} = {}) {
        const size = PREVIEW;
        sel = {...sel};
        if (destroyed || isStale()) return null;
        const back = sel.wearable != null && isBack("wearable", sel.wearable);
        const order = [["aura", sel.aura], ...(back ? [["wearable", sel.wearable]] : []), ["base", sel.base], ["outfit", sel.outfit], ["face", sel.face], ["hat", sel.hat], ["shoes", sel.shoes], ...(!back ? [["wearable", sel.wearable]] : [])].filter(([, id]) => id != null);
        const parts = [];
        for (const [c, id] of order) {
            await yieldUI();
            if (destroyed || isStale()) return null;
            parts.push([c, id, srcData(c, id)]);
        }
        const cv = new OffscreenCanvas(size, size), cx = cv.getContext("2d");
        cx.imageSmoothingEnabled = true;
        cx.imageSmoothingQuality = "high";
        paintBackground(cx, size, bg);
        for (const [c, id, s] of parts) {
            const p = place(c, id, sel), a = getAdj(c, id);
            const fx = (p.u + a.x - VIEW.x) * SOURCE_SCALE.x, fy = (p.v + a.y - VIEW.y) * SOURCE_SCALE.y;
            cx.globalAlpha = c === "aura" ? AURA_ALPHA : 1;
            if (!a.r) cx.drawImage(s.cv, Math.round(fx) - Math.round(s.w / 2), Math.round(fy) - Math.round(s.h / 2)); else {
                const qx = p.px * SOURCE_SCALE.x, qy = p.py * SOURCE_SCALE.y;
                cx.save();
                cx.translate(fx + qx, fy + qy);
                cx.rotate(a.r * Math.PI / 180);
                cx.drawImage(s.cv, -s.w / 2 - qx, -s.h / 2 - qy);
                cx.restore();
            }
        }
        cx.globalAlpha = 1;
        return cv;
    }

    const sel = {...DEFAULT};
    const S = {cat: "outfit", bg: "transparent", bgColor: "#5865f2", gradA: "#ff512f", gradB: "#dd2476", gradAngle: 160, bgImg: null, bgThumb: "", bgFit: "cover"};
    function bgSpec() {
        if (S.bg === "custom") return S.bgColor;
        if (S.bg === "customgrad") return {angle: S.gradAngle, grad: [S.gradA, S.gradB]};
        if (S.bg === "image") return S.bgImg ? {img: S.bgImg, fit: S.bgFit} : null;
        return BGS[S.bg] ?? null;
    }
    const rnd = (c) => Math.floor(Math.random() * D[c].length);
    const maybe = (c, p) => (Math.random() < p ? null : rnd(c));
    const randomize = () => Object.assign(sel, {
        base: rnd("base"),
        face: rnd("face"),
        outfit: rnd("outfit"),
        hat: maybe("hat", 0.25),
        shoes: maybe("shoes", 0.12),
        wearable: maybe("wearable", 0.35),
        aura: maybe("aura", 0.55)
    });

    const host = document.createElement("div");
    host.style.cssText = "position:fixed;inset:0;z-index:2147483000;pointer-events:none";
    const root = host.attachShadow({mode: "open"});
    root.innerHTML = `
<style>
:host{all:initial}
*{box-sizing:border-box}
.wrap{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.7);pointer-events:auto;
  font-family:var(--font-primary,"gg sans","Noto Sans","Helvetica Neue",Arial,sans-serif);color:var(--text-default,var(--text-normal,#dbdee1));animation:in .12s ease-out}
@keyframes in{from{opacity:0;transform:scale(.97)}}
.modal{position:relative;width:min(1040px,96vw);height:min(700px,94vh);display:flex;flex-direction:column;overflow:hidden;border-radius:8px;
  background:var(--modal-background,var(--background-surface-high,var(--background-primary,#313338)));box-shadow:0 8px 32px rgba(0,0,0,.5)}
header{display:flex;align-items:center;gap:12px;padding:16px 20px;border-bottom:1px solid var(--border-subtle,var(--background-modifier-accent,#3f4147))}
header h1{font-size:20px;font-weight:700;margin:0;flex:1;color:var(--header-primary,#f2f3f5)}
.by a{color:inherit;text-decoration:none;cursor:pointer;transition:color .2s ease}
.by a:hover{color:var(--brand-500,var(--brand-experiment,#5865f2));text-decoration:underline}
.by a{position:relative;text-decoration:underline;text-decoration-color:transparent;transition:color .4s ease,text-decoration-color .4s ease}
.by a::after{content:attr(data-t);position:absolute;left:0;top:0;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .4s ease;
  background:linear-gradient(90deg,#6e0000,#a80f1f,#d12a35,#a80f1f,#6e0000) 0 0/200% 100%;-webkit-background-clip:text;background-clip:text;
  color:transparent;-webkit-text-fill-color:transparent;animation:crimsonflow 2.4s linear infinite}
.by a:hover{color:transparent;text-decoration-color:#a80f1f}
.by a:hover::after{opacity:1}
@keyframes crimsonflow{to{background-position:200% 0}}
@media(prefers-reduced-motion:reduce){.by a::after{animation:none}}
.by{font:600 12px var(--font-primary,sans-serif);color:var(--text-muted,#949ba4);opacity:.9;white-space:nowrap}
kbd{font:600 11px var(--font-primary,sans-serif);padding:3px 7px;border-radius:4px;color:var(--text-muted,#949ba4);background:var(--background-modifier-hover,rgba(78,80,88,.3))}
.x{all:unset;cursor:pointer;width:32px;height:32px;display:grid;place-items:center;border-radius:4px;color:var(--interactive-normal,#b5bac1);font-size:20px}
.x:hover{color:var(--interactive-hover,#dbdee1);background:var(--background-modifier-hover,rgba(78,80,88,.3))}
main{flex:1;min-height:0;display:grid;grid-template-columns:minmax(300px,42%) 1fr}
.stage{display:flex;flex-direction:column;gap:12px;padding:16px 20px;min-height:0;border-right:1px solid var(--border-subtle,var(--background-modifier-accent,#3f4147))}
.view{position:relative;flex:1;min-height:0;border-radius:8px;overflow:hidden;display:grid;place-items:center;
  background:repeating-conic-gradient(rgba(128,128,128,.16) 0 25%,transparent 0 50%) 0 0/20px 20px,var(--background-base-lowest,var(--background-tertiary,#1e1f22))}
canvas.pv{display:block;width:${PREVIEW}px;height:${PREVIEW}px;aspect-ratio:1;flex:none}
.busy{position:absolute;right:10px;top:10px;font-size:12px;padding:3px 8px;border-radius:10px;background:rgba(0,0,0,.6);color:#fff;opacity:0;transition:opacity .15s}
.busy.on{opacity:1}
.right{overflow-x:clip;display:flex;flex-direction:column;min-height:0;padding:16px 20px;gap:12px}
.tabs{position:relative;z-index:0;display:flex;flex-wrap:wrap;gap:6px}
.tab{all:unset;display:block;cursor:pointer;padding:7px 14px;border-radius:8px;font-size:14px;font-weight:500;background:var(--background-modifier-hover,rgba(78,80,88,.3));color:var(--interactive-normal,#b5bac1);transition:background-color .2s ease}
.tab:hover{background-color:var(--background-modifier-selected,rgba(78,80,88,.55))}
.tab span{position:relative;z-index:3;display:block;transition:color .25s ease}
.tab:hover span{color:var(--interactive-hover,#dbdee1)}
.tab.on span{color:#fff}
.tab-ind{position:absolute;left:0;top:0;z-index:2;width:0;height:0;border-radius:8px;pointer-events:none;background:var(--brand-500,var(--brand-experiment,#5865f2));
  transition:transform .38s cubic-bezier(.4,0,.2,1),width .38s cubic-bezier(.4,0,.2,1),height .38s cubic-bezier(.4,0,.2,1)}
.tab-ind.nt{transition:none}
.grid{flex:1;min-height:0;overflow-x:hidden;overflow-y:auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(136px,1fr));gap:8px;align-content:start;padding:2px;transition:opacity .14s ease,transform .14s ease}
.grid.out{opacity:0;transform:translateX(calc(var(--dir,1) * -14px))}
.it.enter{animation:itIn .36s cubic-bezier(.2,.7,.2,1) backwards}
@keyframes itIn{from{opacity:0;transform:translateX(calc(var(--dir,1) * 18px)) scale(.96)}to{opacity:1;transform:none}}
@media(prefers-reduced-motion:reduce){.tab-ind{transition:none}.grid{transition:none}.it.enter{animation:none}}
.it{all:unset;cursor:pointer;box-sizing:border-box;height:152px;border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;
  background:var(--background-base-lower,var(--background-secondary,#2b2d31));border:2px solid transparent;position:relative}
.it:hover{background:var(--background-modifier-hover,rgba(78,80,88,.3))}
.it.on{border-color:var(--brand-500,var(--brand-experiment,#5865f2))}
.it canvas{display:block;flex:none}
.it small{font-size:11px;color:var(--text-muted,#949ba4)}
.it.none b{font-size:26px;color:var(--text-muted,#949ba4)}
footer{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;padding:14px 20px;background:var(--background-base-lower,var(--background-secondary,#2b2d31))}
footer .sp{flex:1}
label,.lab{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:600;text-transform:none;color:var(--text-muted,#949ba4)}
select{all:unset;cursor:pointer;padding:6px 26px 6px 10px;border-radius:4px;font-size:14px;text-transform:none;font-weight:500;color:var(--text-default,#dbdee1);
  background:var(--input-background,var(--background-base-lowest,#1e1f22)) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23949ba4'/%3E%3C/svg%3E") right 9px center no-repeat}
select option{background:#1e1f22;color:#dbdee1}
.bgd{position:relative}
.bgbtn{all:unset;cursor:pointer;display:flex;align-items:center;gap:8px;padding:6px 30px 6px 8px;border-radius:8px;font-size:14px;font-weight:500;text-transform:none;color:var(--text-default,#dbdee1);
  background:rgba(255,255,255,.06) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 6l5-6 5 6z' fill='%23949ba4'/%3E%3C/svg%3E") right 10px center/10px 6px no-repeat;
  border:1px solid rgba(255,255,255,.1);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);transition:background-color .15s,border-color .15s}
.bgbtn:hover,.bgd.open .bgbtn{background-color:rgba(255,255,255,.12);border-color:rgba(255,255,255,.22)}
.bgbtn:focus-visible,.bgo:focus-visible,.bgfit button:focus-visible{outline:2px solid var(--brand-500,#5865f2);outline-offset:1px}
.bgmenu{position:absolute;left:0;bottom:calc(100% + 8px);z-index:30;width:240px;max-height:min(360px,56vh);overflow:auto;padding:6px;border-radius:12px;
  background:rgba(20,21,24,.55);border:1px solid rgba(255,255,255,.12);box-shadow:0 12px 40px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.07);
  -webkit-backdrop-filter:blur(20px) saturate(1.6);backdrop-filter:blur(20px) saturate(1.6);
  text-transform:none;font-weight:500;font-size:14px;color:#dbdee1;
  opacity:0;visibility:hidden;pointer-events:none;transform:translateY(8px) scale(.97);transform-origin:bottom left;transition:opacity .14s ease,transform .14s ease,visibility 0s .14s}
.bgd.open .bgmenu{opacity:1;visibility:visible;pointer-events:auto;transform:none;transition:opacity .14s ease,transform .14s ease}
.bgg{padding:8px 8px 4px;font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:none;color:#949ba4}
.bgg:first-child{padding-top:4px}
.bgo{all:unset;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;gap:10px;width:100%;padding:7px 8px;border-radius:8px;transition:background-color .12s}
.bgo:hover{background:rgba(255,255,255,.1)}
.bgo.on{background:rgba(88,101,242,.38)}
.bgo.on::after{content:"✓";margin-left:auto;font-size:13px}
.bgsw{flex:none;display:block;width:20px;height:20px;border-radius:6px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.22)}
.bgsw.chk{background:repeating-conic-gradient(#8a8d93 0 25%,#c9cbd0 0 50%) 0 0/8px 8px}
.bgic{flex:none;width:20px;text-align:center;font-style:normal}
.bgfit{display:flex;gap:4px;padding:6px 4px 2px}
.bgfit button{all:unset;cursor:pointer;flex:1;text-align:center;padding:5px 0;border-radius:6px;font-size:12px;background:rgba(255,255,255,.08)}
.bgfit button:hover{background:rgba(255,255,255,.16)}
.bgfit button.on{background:var(--brand-500,#5865f2);color:#fff}
.bgcolor{position:absolute;left:0;bottom:0;width:1px;height:1px;opacity:0;pointer-events:none;border:0;padding:0}
.view.drop{outline:2px dashed var(--brand-500,#5865f2);outline-offset:-6px}
@media(prefers-reduced-motion:reduce){.bgmenu{transition:none}}
input[type=range]{width:90px;accent-color:var(--brand-500,var(--brand-experiment,#5865f2))}
*::-webkit-scrollbar{width:12px;height:12px}
*::-webkit-scrollbar-track{background:transparent}
*::-webkit-scrollbar-thumb{border:3px solid transparent;border-radius:99px;background:rgba(255,255,255,.22) padding-box}
*::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,.36) padding-box}
*::-webkit-scrollbar-thumb:active{background:rgba(255,255,255,.48) padding-box}
*::-webkit-scrollbar-corner{background:transparent}
@supports not selector(::-webkit-scrollbar){*{scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.3) transparent}}
.btn{all:unset;cursor:pointer;padding:8px 14px;border-radius:4px;font-size:14px;font-weight:500;color:#fff;background:var(--button-secondary-background,#4e5058);white-space:nowrap}
.btn:hover{filter:brightness(1.12)}
.btn .ic{display:inline-block;vertical-align:-3px;margin-right:6px}
.btn.p{background:var(--brand-500,var(--brand-experiment,#5865f2))}
.btn.g{background:var(--button-positive-background,#248046)}
.row{display:flex;gap:8px}
.toast{position:absolute;left:50%;bottom:74px;transform:translateX(-50%) translateY(8px);padding:10px 16px;border-radius:6px;font-size:14px;color:#fff;
  background:var(--background-floating,#111214);box-shadow:0 4px 12px rgba(0,0,0,.4);opacity:0;pointer-events:none;transition:.2s;z-index:10}
.toast.on{opacity:1;transform:translateX(-50%)}
.tip{position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;opacity:0;transition:opacity .1s ease;max-width:260px;
  font-family:var(--font-primary,"gg sans","Noto Sans","Helvetica Neue",Arial,sans-serif)}
.tip.on{opacity:1}
.tip{--tip-bg:#111214;--tip-bd:#2e2f34;--tip-fg:#dbdee1;--tip-sh:rgba(0,0,0,.24)}
:host([data-theme="light"]) .tip{--tip-bg:#ffffff;--tip-bd:#d4d7dc;--tip-fg:#313338;--tip-sh:rgba(0,0,0,.16)}
.tip .tt{display:block;position:relative;padding:8px 12px;border-radius:8px;font-size:14px;line-height:18px;font-weight:500;color:var(--tip-fg);
  background:var(--tip-bg);border:1px solid var(--tip-bd);box-shadow:0 8px 16px var(--tip-sh);
  overflow-wrap:anywhere;white-space:pre-line}
.tip .ta{position:absolute;left:var(--ax,50%);bottom:-5px;width:10px;height:10px;margin-left:-5px;transform:rotate(45deg);border-radius:0 0 3px 0;
  background:var(--tip-bg);border:solid var(--tip-bd);border-width:0 1px 1px 0}
.tip.below .ta{bottom:auto;top:-5px;border-radius:3px 0 0 0;border-width:1px 0 0 1px}
:host([data-theme="light"]) .wrap{color:var(--text-default,var(--text-normal,#313338))}
:host([data-theme="light"]) .modal,:host([data-theme="light"]) .dlg .box{background:var(--modal-background,var(--background-surface-high,var(--background-primary,#ffffff)))}
:host([data-theme="light"]) header h1,:host([data-theme="light"]) .adj h4 b,:host([data-theme="light"]) .dlg h3{color:var(--header-primary,#060607)}
:host([data-theme="light"]) .by,:host([data-theme="light"]) kbd,:host([data-theme="light"]) label,:host([data-theme="light"]) .lab,:host([data-theme="light"]) .it small,:host([data-theme="light"]) .adj h4,:host([data-theme="light"]) .dlg p{color:var(--text-muted,#5c5e66)}
:host([data-theme="light"]) footer,:host([data-theme="light"]) .it,:host([data-theme="light"]) .adj{background:var(--background-base-lower,var(--background-secondary,#f2f3f5))}
:host([data-theme="light"]) .view{background:repeating-conic-gradient(rgba(128,128,128,.16) 0 25%,transparent 0 50%) 0 0/20px 20px,var(--background-base-lowest,var(--background-tertiary,#e3e5e8))}
:host([data-theme="light"]) select,:host([data-theme="light"]) .adj output{color:var(--text-default,#313338)}
:host([data-theme="light"]) select{background-color:var(--input-background,var(--background-base-lowest,#e3e5e8))}
:host([data-theme="light"]) select option{background:#ffffff;color:#313338}
:host([data-theme="light"]) .bgbtn{background-color:rgba(0,0,0,.05);border-color:rgba(0,0,0,.12);color:#313338}
:host([data-theme="light"]) .bgbtn:hover,:host([data-theme="light"]) .bgd.open .bgbtn{background-color:rgba(0,0,0,.1);border-color:rgba(0,0,0,.2)}
:host([data-theme="light"]) .bgmenu{background:rgba(255,255,255,.8);border-color:rgba(0,0,0,.1);box-shadow:0 12px 40px rgba(0,0,0,.18),inset 0 1px 0 rgba(255,255,255,.6);color:#313338}
:host([data-theme="light"]) .bgg{color:#5c5e66}
:host([data-theme="light"]) .bgo:hover{background:rgba(0,0,0,.07)}
:host([data-theme="light"]) .bgo.on{background:rgba(88,101,242,.2)}
:host([data-theme="light"]) .bgsw,:host([data-theme="light"]) .gedit .gprev,:host([data-theme="light"]) .gedit input[type=color]{box-shadow:inset 0 0 0 1px rgba(0,0,0,.22)}
:host([data-theme="light"]) .bgfit button{background:rgba(0,0,0,.07)}
:host([data-theme="light"]) .bgfit button:hover{background:rgba(0,0,0,.13)}
:host([data-theme="light"]) .bgfit button.on{background:var(--brand-500,#5865f2);color:#fff}
:host([data-theme="light"]) *::-webkit-scrollbar-thumb{background:rgba(0,0,0,.25) padding-box}
:host([data-theme="light"]) *::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.4) padding-box}
:host([data-theme="light"]) *::-webkit-scrollbar-thumb:active{background:rgba(0,0,0,.5) padding-box}
:host([data-theme="light"]) .toast{background:#ffffff;color:#313338;border:1px solid #d4d7dc;box-shadow:0 4px 12px rgba(0,0,0,.16)}
@media(max-width:760px){main{grid-template-columns:1fr;overflow:auto}.stage{border:0;height:360px;flex:none}}
canvas.pv{cursor:grab;touch-action:none}canvas.pv.drag{cursor:grabbing}
.adj{display:grid;grid-template-columns:1fr 1fr;gap:6px 18px;padding:10px 12px;border-radius:8px;background:var(--background-base-lower,var(--background-secondary,#2b2d31))}
.adj.off label,.adj.off h4 span{opacity:.45;pointer-events:none}
.adj h4{grid-column:1/-1;margin:0;display:flex;flex-wrap:wrap;align-items:center;gap:8px;font-size:12px;font-weight:700;text-transform:none;color:var(--text-muted,#949ba4)}
.adj h4 span{flex:1 1 140px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.adj h4 b{color:var(--header-primary,#f2f3f5)}
.adj label{justify-content:space-between;text-transform:none;font-size:12px;font-weight:600}
.adj input[type=range]{--lo:50%;--hi:50%;--f:min(10px,calc((var(--hi) - var(--lo)) / 2));flex:1;width:auto;min-width:60px;height:24px;margin:0;background:transparent;cursor:pointer;-webkit-appearance:none;appearance:none;outline:none}
.adj input[type=range]::-webkit-slider-runnable-track{height:10px;border-radius:99px;background:linear-gradient(180deg,rgba(255,255,255,.22),rgba(255,255,255,0) 50%,rgba(0,0,0,.28)),linear-gradient(90deg,#0f1119 0 var(--lo),transparent calc(var(--lo) + var(--f)) calc(var(--hi) - var(--f)),#0f1119 var(--hi) 100%),linear-gradient(90deg,#5a3fcc,#4a31b5,#5c45bf,#4a31b5,#5a3fcc);background-size:100% 100%,100% 100%,300% 100%;animation:flowtrack 10s linear infinite;
  box-shadow:inset 0 2px 4px rgba(0,0,0,.8),inset 0 -1px 1px rgba(255,255,255,.07),0 1px 0 rgba(255,255,255,.06)}
.adj input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;margin-top:-2px;width:14px;height:14px;border-radius:50%;border:0;background:radial-gradient(circle at 38% 30%,#5c45bf 0,#5a3fcc 55%,#4a31b5 100%);
  box-shadow:0 2px 5px rgba(0,0,0,.6),inset 0 1px 1px rgba(255,255,255,.22),inset 0 -2px 3px rgba(25,12,80,.5);transition:transform .15s}
.adj input[type=range]:hover::-webkit-slider-thumb{transform:scale(1.12)}
.adj input[type=range]:active::-webkit-slider-thumb{transform:scale(1.2)}
.adj input[type=range]::-moz-range-track{height:10px;border-radius:99px;background:linear-gradient(180deg,rgba(255,255,255,.22),rgba(255,255,255,0) 50%,rgba(0,0,0,.28)),linear-gradient(90deg,#0f1119 0 var(--lo),transparent calc(var(--lo) + var(--f)) calc(var(--hi) - var(--f)),#0f1119 var(--hi) 100%),linear-gradient(90deg,#5a3fcc,#4a31b5,#5c45bf,#4a31b5,#5a3fcc);background-size:100% 100%,100% 100%,300% 100%;animation:flowtrack 10s linear infinite;
  box-shadow:inset 0 2px 4px rgba(0,0,0,.8),inset 0 -1px 1px rgba(255,255,255,.07),0 1px 0 rgba(255,255,255,.06)}
.adj input[type=range]::-moz-range-thumb{box-sizing:border-box;width:14px;height:14px;border-radius:50%;border:0;background:radial-gradient(circle at 38% 30%,#5c45bf 0,#5a3fcc 55%,#4a31b5 100%);
  box-shadow:0 2px 5px rgba(0,0,0,.6),inset 0 1px 1px rgba(255,255,255,.22),inset 0 -2px 3px rgba(25,12,80,.5);transition:transform .15s}
.adj input[type=range]:hover::-moz-range-thumb{transform:scale(1.12)}
.adj input[type=range]:active::-moz-range-thumb{transform:scale(1.2)}
@keyframes flowtrack{from{background-position:0 0,0 0,0 0}to{background-position:0 0,0 0,300% 0}}
@media(prefers-reduced-motion:reduce){.adj input[type=range]::-webkit-slider-runnable-track,.adj input[type=range]::-moz-range-track{animation:none}}
.adj output{min-width:40px;text-align:right;font-variant-numeric:tabular-nums;color:var(--text-default,#dbdee1)}
.adj input[type=range]{--f:min(22px,calc((var(--hi) - var(--lo)) / 2));--acc:color-mix(in srgb,var(--brand-500,var(--brand-experiment,#5865f2)) 78%,transparent);--acc-mid:color-mix(in srgb,var(--brand-500,var(--brand-experiment,#5865f2)) 34%,transparent);--trk:rgba(255,255,255,.07);--edge:rgba(255,255,255,.1);--well:rgba(0,0,0,.32);--knob:rgba(255,255,255,.34);--knob-edge:rgba(255,255,255,.7);--knob-sh:rgba(0,0,0,.3)}
:host([data-theme="light"]) .adj input[type=range]{--trk:rgba(0,0,0,.06);--edge:rgba(0,0,0,.09);--well:rgba(0,0,0,.14);--knob:rgba(255,255,255,.78);--knob-edge:rgba(0,0,0,.2);--knob-sh:rgba(0,0,0,.2)}
.adj input[type=range]::-webkit-slider-runnable-track{height:6px;border-radius:3px;animation:none;background:linear-gradient(90deg,transparent var(--lo),var(--acc-mid) calc(var(--lo) + var(--f) * .5),var(--acc) calc(var(--lo) + var(--f)),var(--acc) calc(var(--hi) - var(--f)),var(--acc-mid) calc(var(--hi) - var(--f) * .5),transparent var(--hi)),var(--trk);
  border:1px solid var(--edge);box-shadow:inset 0 1px 2px var(--well)}
.adj input[type=range]::-moz-range-track{height:6px;border-radius:3px;animation:none;background:linear-gradient(90deg,transparent var(--lo),var(--acc-mid) calc(var(--lo) + var(--f) * .5),var(--acc) calc(var(--lo) + var(--f)),var(--acc) calc(var(--hi) - var(--f)),var(--acc-mid) calc(var(--hi) - var(--f) * .5),transparent var(--hi)),var(--trk);
  border:1px solid var(--edge);box-shadow:inset 0 1px 2px var(--well)}
.adj input[type=range]::-webkit-slider-thumb{margin-top:-5px;width:14px;height:14px;border-radius:50%;background:var(--knob);border:1px solid var(--knob-edge);
  -webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);box-shadow:0 1px 2px var(--knob-sh),inset 0 1px 0 rgba(255,255,255,.45)}
.adj input[type=range]::-moz-range-thumb{width:14px;height:14px;border-radius:50%;background:var(--knob);border:1px solid var(--knob-edge);box-shadow:0 1px 2px var(--knob-sh),inset 0 1px 0 rgba(255,255,255,.45)}
.adj input[type=range]:focus-visible::-webkit-slider-thumb{outline:2px solid var(--brand-500,#5865f2);outline-offset:2px}
.adj input[type=range]:focus-visible::-moz-range-thumb{outline:2px solid var(--brand-500,#5865f2);outline-offset:2px}
.btn.s{padding:4px 10px;font-size:12px}
.dlg{position:absolute;inset:0;z-index:5;display:grid;place-items:center;background:rgba(0,0,0,.6)}
.dlg[hidden]{display:none}
.dlg .box{width:min(520px,90%);display:flex;flex-direction:column;gap:10px;padding:18px 20px;border-radius:8px;
  background:var(--modal-background,var(--background-surface-high,var(--background-primary,#313338)));box-shadow:0 8px 32px rgba(0,0,0,.5)}
.dlg h3{margin:0;font-size:16px;font-weight:700;color:var(--header-primary,#f2f3f5)}
.dlg p{margin:0;font-size:13px;color:var(--text-muted,#949ba4)}
.dlg textarea{all:unset;box-sizing:border-box;width:100%;height:140px;padding:10px;border-radius:4px;overflow:auto;white-space:pre-wrap;word-break:break-all;
  font:12px ui-monospace,Consolas,monospace;color:var(--text-default,#dbdee1);background:var(--input-background,var(--background-base-lowest,#1e1f22))}
.dlg .dr{display:flex;justify-content:flex-end;gap:8px}
.dlg textarea[hidden],.dlg [data-a=dlgpaste][hidden]{display:none}
.gedit{display:grid;grid-template-columns:1fr 1fr auto;align-items:center;gap:10px 12px;font-size:13px;color:var(--text-default,#dbdee1)}
.gedit[hidden]{display:none}
.gedit .gprev{grid-column:1/-1;height:64px;border-radius:8px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.22)}
.gedit label{display:flex;align-items:center;gap:8px}
.gedit input[type=color]{all:unset;box-sizing:border-box;width:36px;height:26px;border-radius:6px;cursor:pointer;box-shadow:inset 0 0 0 1px rgba(255,255,255,.3)}
.gedit .gang{grid-column:1/-1}
.gedit .gang input{flex:1;accent-color:#5865f2}
.gedit .gang output{min-width:38px;text-align:right}
</style>
<div class="wrap"><div class="modal" role="dialog" aria-label="Checkpoint Preview Reworked">
  <header><h1>Checkpoint Preview Reworked</h1><kbd>Ctrl + Shift + S</kbd><span class="by">${CREDIT_LINK}</span><button class="x" data-a="close" title="Close (Esc)">✕</button></header>
  <main>
    <section class="stage">
      <div class="view"><canvas class="pv" width="${PREVIEW}" height="${PREVIEW}"></canvas><span class="busy">Rendering…</span></div>
      <div class="row"><button class="btn p" data-a="rand" style="flex:1;text-align:center">🎲 Randomize</button><button class="btn" data-a="reset" style="flex:1;text-align:center">↺ Reset</button></div>
    </section>
    <section class="right"><div class="tabs"></div><div class="grid"></div>
      <div class="adj off">
        <h4><span>Position · <b class="an">select an item</b></span><button class="btn s" data-a="undo" title="Undo last change (Ctrl+Z)">↶ Undo</button><button class="btn s" data-a="copy" title="Copy the whole preset (outfit + adjustments) as JSON to share">⧉ Copy preset</button><button class="btn s" data-a="import" title="Import a preset someone shared with you (JSON)">⇩ Import preset</button></h4>
        <label>X <input type="range" min="-40" max="40" step="0.1" value="0" data-j="x"><output></output></label>
        <label>Y <input type="range" min="-40" max="40" step="0.1" value="0" data-j="y"><output></output></label>
        <label>Rotation <input type="range" min="-180" max="180" step="1" value="0" data-j="r"><output></output></label>
      </div></section>
  </main>
  <footer>
    <div class="lab">Background
      <div class="bgd"><button type="button" class="bgbtn" aria-haspopup="listbox" aria-expanded="false"></button><div class="bgmenu" role="listbox"></div>
        <input type="color" class="bgcolor" tabindex="-1" value="#5865f2"><input type="file" class="bgfile" accept="image/*" hidden></div>
    </div>
    <label>PNG <span>${PREVIEW} × ${PREVIEW} px · Native items</span></label>
    <span class="sp"></span>
    <span class="by">${CREDIT_LINK}</span>
    <button class="btn" data-a="save">⬇ Download PNG</button>
    <button class="btn" data-a="copyimg" title="Copy the PNG to your clipboard"><svg class="ic" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy image</button>
    <button class="btn g" data-a="attach">➤ Attach to chat</button>
    <button class="btn g" data-a="send" title="Attach the image and send it to the current chat right away">✉ Send to chat</button>
  </footer>
  <div class="toast"></div>
  <div class="dlg" hidden><div class="box"><h3 class="dt"></h3><p class="dd"></p><textarea spellcheck="false"></textarea>
    <div class="gedit" hidden>
      <div class="gprev"></div>
      <label>Color 1 <input type="color" data-g="a"></label>
      <label>Color 2 <input type="color" data-g="b"></label>
      <button type="button" class="btn s" data-a="gswap" title="Swap the two colors">⇄ Swap</button>
      <label class="gang">Angle <input type="range" min="0" max="360" step="1" data-g="angle"><output></output></label>
    </div>
    <div class="dr"><button class="btn" data-a="dlgpaste" title="Paste from your clipboard" style="margin-right:auto">📋 Paste</button><button class="btn" data-a="dlgclose">Cancel</button><button class="btn g" data-a="dlgok"></button></div></div></div>
</div></div>
<div class="tip" role="tooltip"><span class="tt"></span><i class="ta"></i></div>`;
    document.body.appendChild(host);

    const applyTheme = () => host.setAttribute("data-theme", pageTheme());
    applyTheme();
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, {attributes: true, attributeFilter: ["class"]});
    themeObserver.observe(document.body, {attributes: true, attributeFilter: ["class"]});

    const $ = (s) => root.querySelector(s);
    const wrap = $(".wrap"), pv = $("canvas.pv"), pctx = pv.getContext("2d"), busy = $(".busy"), grid = $(".grid");
    const view = $(".view");
    const fitPreview = () => {
        const side = Math.floor(Math.min(PREVIEW, view.clientWidth, view.clientHeight));
        if (side > 0) {
            pv.style.width = side + "px";
            pv.style.height = side + "px";
        }
    };
    const previewObserver = new ResizeObserver(fitPreview);
    previewObserver.observe(view);
    fitPreview();
    pv.title = `${PREVIEW} × ${PREVIEW} px PNG · Original ${atlas.width} × ${atlas.height} px source`;
    let toastT, visible = interactive;
    const toast = (t) => {
        const e = $(".toast");
        e.textContent = t;
        e.classList.add("on");
        clearTimeout(toastT);
        toastT = setTimeout(() => e.classList.remove("on"), 2600);
    };
    const tip = $(".tip"), tipText = tip.querySelector(".tt");
    let tipEl = null, tipFollow = false;
    const tipHide = () => {
        tipEl = null;
        tipFollow = false;
        tip.classList.remove("on");
    };
    const tipPlace = (e) => {
        if (!tipEl) return;
        let r = tipEl.getBoundingClientRect();
        if (tipFollow) r = {left: e.clientX, right: e.clientX, top: e.clientY - 6, bottom: e.clientY + 14, width: 0, height: 20};
        const w = tip.offsetWidth, h = tip.offsetHeight, vw = window.innerWidth, gap = 10;
        const cx = r.left + (r.right - r.left) / 2;
        const left = Math.max(8, Math.min(vw - w - 8, cx - w / 2));
        const below = r.top - h - gap < 8;
        tip.classList.toggle("below", below);
        tip.style.left = Math.round(left) + "px";
        tip.style.top = Math.round(below ? r.bottom + gap : r.top - h - gap) + "px";
        tip.style.setProperty("--ax", Math.round(Math.max(14, Math.min(w - 14, cx - left))) + "px");
    };
    root.addEventListener("mouseover", (e) => {
        const el = e.target.closest?.("[title],[data-tip]");
        if (!el) return tipHide();
        if (el.matches("canvas.pv")) {
            el.removeAttribute("title");
            return tipHide();
        }
        if (el.hasAttribute("title")) {
            const t = el.getAttribute("title");
            el.removeAttribute("title");
            if (t) el.dataset.tip = t;
        }
        const text = el.dataset.tip;
        if (!text) return tipHide();
        if (el === tipEl) return;
        tipEl = el;
        const b = el.getBoundingClientRect();
        tipFollow = b.width > 320 || b.height > 220;
        tipText.textContent = text;
        tipPlace(e);
        tip.classList.add("on");
    });
    root.addEventListener("mousemove", (e) => {
        if (tipEl && tipFollow) tipPlace(e);
    });
    root.addEventListener("mouseleave", tipHide);
    for (const ev of ["pointerdown", "wheel", "click"]) root.addEventListener(ev, tipHide, true);
    window.addEventListener("blur", tipHide);

    const setVisible = (v) => {
        visible = v;
        wrap.style.display = v ? "flex" : "none";
        if (v) firstRender();
    };

    const NAV_MARK = "data-checkpoint-preview-btn";
    const NAV_SVG = '<svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true" style="display:block"><path fill="currentColor" d="M8.5 2 3 4.2a2 2 0 0 0-1.2 1.4L1 9.2a1 1 0 0 0 .8 1.2L5 11v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9l3.2-.6a1 1 0 0 0 .8-1.2l-.8-3.6A2 2 0 0 0 21 4.2L15.5 2a1 1 0 0 0-1 .3 3.5 3.5 0 0 1-5 0A1 1 0 0 0 8.5 2z"/></svg>';
    let navBtn = null, navQueued = false;
    const navStyle = document.createElement("style");
    navStyle.setAttribute(NAV_MARK + "-style", "");
    navStyle.textContent = `
@keyframes cp-nav-wiggle{
  0%{transform:rotate(0) scale(1)}
  25%{transform:rotate(-14deg) scale(1.12)}
  55%{transform:rotate(10deg) scale(1.12)}
  80%{transform:rotate(-5deg) scale(1.05)}
  100%{transform:rotate(0) scale(1)}
}
[${NAV_MARK}]:hover svg path{
  transform-box:fill-box !important;transform-origin:center !important;
  animation:cp-nav-wiggle .48s cubic-bezier(.3,.7,.4,1) 1 !important}`;
    document.head.appendChild(navStyle);

    const isButtonBox = (el) => !!el && el.nodeType === 1 && !el.closest('[role="dialog"]')
        && el.querySelectorAll(':scope > button:not([' + NAV_MARK + '])').length >= 1
        && el.querySelectorAll('button[role="switch"]').length >= 2;

    function findPanelButtons() {
        const acct = document.querySelector('[class*="accountPopoutButtonWrapper"]');
        if (acct?.parentElement) {
            const box = [...acct.parentElement.children].find(isButtonBox);
            if (box) return box;
        }
        for (const sw of document.querySelectorAll('button[role="switch"]')) {
            let el = sw.parentElement;
            for (let i = 0; el && i < 4; i++, el = el.parentElement) if (isButtonBox(el)) return el;
        }
        return null;
    }

    function ensureNavButton() {
        if (destroyed) return;
        if (navBtn?.isConnected) return;
        for (const old of document.querySelectorAll("[" + NAV_MARK + "]")) old.remove();
        const box = findPanelButtons();
        if (!box) return;
        const tpl = [...box.children].filter((c) => c.tagName === "BUTTON" && !c.hasAttribute(NAV_MARK)).pop();
        if (!tpl) return;
        const b = tpl.cloneNode(true);
        b.removeAttribute("data-migration-pending");
        b.removeAttribute("id");
        b.removeAttribute("aria-expanded");
        b.removeAttribute("aria-checked");
        b.removeAttribute("role");
        b.setAttribute(NAV_MARK, "");
        b.setAttribute("type", "button");
        b.setAttribute("aria-label", "Checkpoint Preview");
        b.removeAttribute("title");
        b.addEventListener("mouseenter", () => {
            tipEl = b;
            tipFollow = false;
            tipText.textContent = "Checkpoint Preview";
            tipPlace({});
            tip.classList.add("on");
        });
        b.addEventListener("mouseleave", () => {
            if (tipEl === b) tipHide();
        });
        const inner = b.querySelector('[class*="contents"]') || b;
        const holder = inner.querySelector('[class*="lottieIcon"]') || inner.firstElementChild;
        if (holder) {
            holder.innerHTML = NAV_SVG;
            holder.style.display = "flex";
        } else {
            inner.innerHTML = '<div style="display:flex;width:20px;height:20px">' + NAV_SVG + "</div>";
        }
        b.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            tipHide();
            setVisible(!visible);
        });
        box.insertBefore(b, tpl);
        navBtn = b;
    }

    const queueNav = () => {
        if (navQueued || destroyed || navBtn?.isConnected) return;
        navQueued = true;
        requestAnimationFrame(() => {
            navQueued = false;
            ensureNavButton();
        });
    };
    const navObserver = new MutationObserver(queueNav);
    navObserver.observe(document.body, {childList: true, subtree: true});
    const navTimer = setInterval(ensureNavButton, 3000);
    ensureNavButton();

    const thumbCache = new Map();

    async function thumb(c, id) {
        const key = c + ":" + id;
        let cv = thumbCache.get(key);
        if (cv) return cv;
        await yieldUI();
        if (destroyed) return null;
        const src = srcData(c, id);
        cv = document.createElement("canvas");
        cv.width = src.w;
        cv.height = src.h;
        const displayScale = Math.min(1, 120 / src.w, 120 / src.h);
        cv.style.cssText = `width:${src.w * displayScale}px;height:${src.h * displayScale}px`;
        cv.title = `${src.w} × ${src.h} px`;
        cv.getContext("2d").drawImage(src.cv, 0, 0);
        thumbCache.set(key, cv);
        return cv;
    }

    let gridSeq = 0;

    async function renderGrid() {
        syncAdj();
        const my = ++gridSeq, c = S.cat;
        root.querySelectorAll(".tab").forEach((b) => b.classList.toggle("on", b.dataset.cat === c));
        moveInd();
        const anim = animateNext;
        let n = 0;
        grid.textContent = "";
        const add = (id, node, label) => {
            const b = document.createElement("button");
            b.className = "it" + (sel[c] === id ? " on" : "") + (id == null ? " none" : "");
            b.dataset.id = id ?? "";
            const s = document.createElement("small");
            s.textContent = label;
            b.append(node, s);
            if (anim) {
                b.classList.add("enter");
                b.style.animationDelay = Math.min(n++, 14) * 22 + "ms";
            }
            grid.append(b);
            return b;
        };
        if (OPTIONAL.has(c)) {
            const x = document.createElement("b");
            x.textContent = "×";
            add(null, x, "None");
        }
        const items = D[c].map((_, i) => add(i, document.createElement("span"), String(i + 1).padStart(2, "0")));
        items.find((b) => b.classList.contains("on"))?.scrollIntoView({block: "nearest"});
        for (let i = 0; i < items.length; i++) {
            if (destroyed || my !== gridSeq) return;
            const cv = await thumb(c, i);
            if (!cv || destroyed || my !== gridSeq) return;
            items[i].firstChild.replaceWith(cv);
        }
    }

    let seq = 0;

    async function refresh() {
        const my = ++seq;
        busy.classList.add("on");
        try {
            const cv = await compose(sel, {bg: bgSpec(), isStale: () => my !== seq});
            if (!cv || my !== seq) return;
            pctx.clearRect(0, 0, PREVIEW, PREVIEW);
            pctx.drawImage(cv, 0, 0);
        } finally {
            if (my === seq) busy.classList.remove("on");
        }
    }

    async function exportBlob() {
        busy.textContent = `Rendering ${PREVIEW}px…`;
        busy.classList.add("on");
        try {
            const cv = await compose(sel, {bg: bgSpec()});
            if (!cv) throw new Error("Preview closed");
            return await cv.convertToBlob({type: "image/png"});
        } finally {
            busy.textContent = "Rendering…";
            busy.classList.remove("on");
        }
    }

    const fileName = () => `checkpoint-avatar-${PREVIEW}.png`;
    console.log("%cCheckpoint Preview Reworked " + CREDIT + " · " + CREDIT_URL, "font-weight:bold;color:#5865f2");

    async function waitForAttachment(timeout = 6000) {
        const sel = '[class*="attachedFiles"],[class*="channelAttachmentArea"],[class*="attachmentArea"]';
        const t0 = Date.now();
        while (Date.now() - t0 < timeout) {
            if (destroyed) return false;
            if (document.querySelector(sel)) {
                await new Promise((r) => setTimeout(r, 450));
                return true;
            }
            await new Promise((r) => setTimeout(r, 100));
        }
        return false;
    }

    function pressEnter(box) {
        const init = {key: "Enter", code: "Enter", keyCode: 13, which: 13, bubbles: true, cancelable: true, composed: true};
        box.focus();
        box.dispatchEvent(new KeyboardEvent("keydown", init));
        box.dispatchEvent(new KeyboardEvent("keypress", init));
        box.dispatchEvent(new KeyboardEvent("keyup", init));
    }

    const CREDIT_ID = CREDIT_URL.split("/").pop();

    function discordRequire() {
        try {
            const chunk = W.webpackChunkdiscord_app;
            if (!chunk) return null;
            let req = null;
            chunk.push([[Symbol("checkpoint-preview")], {}, (r) => { req = r; }]);
            chunk.pop();
            return req;
        } catch {
            return null;
        }
    }

    function findDiscordFn(name) {
        const req = discordRequire();
        if (!req?.c) return null;
        for (const id in req.c) {
            const ex = req.c[id]?.exports;
            if (!ex || ex === window || typeof ex !== "object" && typeof ex !== "function") continue;
            try {
                if (typeof ex[name] === "function") return ex[name].bind(ex);
                for (const k in ex) {
                    const v = ex[k];
                    if (v && typeof v === "object" && typeof v[name] === "function") return v[name].bind(v);
                }
            } catch {
            }
        }
        return null;
    }

    async function openCreditProfile() {
        const id = CREDIT_ID;
        setVisible(false);
        try {
            const getUser = W.Vencord?.Webpack?.Common?.UserUtils?.getUser;
            if (getUser) await getUser(id).catch(() => {
            });
        } catch {
        }
        try {
            const open = findDiscordFn("openUserProfileModal");
            if (open) {
                open({userId: id, analyticsLocation: {page: "Guild Channel", section: "Profile Popout"}});
                return;
            }
        } catch (e) {
            console.warn("[Checkpoint Preview Reworked] openUserProfileModal failed:", e);
        }
        try {
            window.history.pushState(window.history.state, "", "/users/" + id);
            window.dispatchEvent(new PopStateEvent("popstate", {state: window.history.state}));
        } catch (e) {
            console.warn("[Checkpoint Preview Reworked] Router fallback failed:", e);
            setVisible(true);
            toast("Couldn't open the profile here");
        }
    }

    async function act(a) {
        if (a === "close") return setVisible(false);
        if (a === "open") return setVisible(true);
        if (a === "undo") return undo();
        if (a === "rand") {
            pushHistory();
            randomize();
            renderGrid();
            return refresh();
        }
        if (a === "reset") {
            pushHistory();
            Object.assign(sel, DEFAULT);
            for (const k in ADJ) delete ADJ[k];
            Object.assign(ADJ, JSON.parse(JSON.stringify(DEFAULT_ADJ)));
            renderGrid();
            return refresh();
        }
        if (a === "copy") {
            const txt = presetJSON();
            if (await copyText(txt)) toast("Preset copied: share it with anyone ✔");
            else openDlg("export", txt);
            return;
        }
        if (a === "import") return openDlg("import");
        if (a === "dlgclose") return closeDlg();
        if (a === "gswap") {
            [S.gradA, S.gradB] = [S.gradB, S.gradA];
            S.bg = "customgrad";
            syncGrad();
            updateDD();
            return refresh();
        }
        if (a === "dlgpaste") {
            try {
                const txt = await navigator.clipboard.readText();
                if (!txt) return toast("Clipboard is empty");
                dlgText.value = txt.trim();
                dlgText.focus();
            } catch {
                toast("Clipboard blocked here: click the box and press Ctrl+V");
            }
            return;
        }
        if (a === "dlgok") {
            if (dlgMode === "gradient") {
                gradSnap = null;
                return closeDlg();
            }
            if (dlgMode === "import") {
                try {
                    applyPreset(dlgText.value);
                    closeDlg();
                    toast("Preset imported ✔");
                } catch (e) {
                    toast(e.message || "Couldn't import preset");
                }
            } else if (dlgMode === "export") {
                toast((await copyText(dlgText.value)) ? "Preset copied ✔" : "Press Ctrl+C to copy");
            }
            return;
        }
        try {
            const blob = await exportBlob();
            if (a === "save") {
                const url = URL.createObjectURL(blob), l = document.createElement("a");
                l.href = url;
                l.download = fileName();
                root.append(l);
                l.click();
                l.remove();
                setTimeout(() => URL.revokeObjectURL(url), 4000);
                toast("PNG downloaded ✔");
            } else if (a === "copyimg") {
                await navigator.clipboard.write([new ClipboardItem({"image/png": blob})]);
                toast("Image copied: paste it anywhere with Ctrl+V ✔");
            } else if (a === "attach") {
                const box = document.querySelector('div[role="textbox"][contenteditable="true"]');
                if (!box) {
                    await navigator.clipboard.write([new ClipboardItem({"image/png": blob})]);
                    return toast("Open a chat and paste with Ctrl+V (image already copied)");
                }
                setVisible(false);
                box.focus();
                const dt = new DataTransfer();
                dt.items.add(new File([blob], fileName(), {type: "image/png"}));
                box.dispatchEvent(new ClipboardEvent("paste", {clipboardData: dt, bubbles: true, cancelable: true}));
            } else if (a === "send") {
                const box = document.querySelector('div[role="textbox"][contenteditable="true"]');
                if (!box) {
                    await navigator.clipboard.write([new ClipboardItem({"image/png": blob})]);
                    return toast("Open a chat first (image already copied)");
                }
                setVisible(false);
                box.focus();
                const dt = new DataTransfer();
                dt.items.add(new File([blob], fileName(), {type: "image/png"}));
                box.dispatchEvent(new ClipboardEvent("paste", {clipboardData: dt, bubbles: true, cancelable: true}));
                if (await waitForAttachment()) {
                    pressEnter(box);
                    toast("Sent to chat ✔");
                } else {
                    toast("Attached. Press Enter to send");
                }
            }
        } catch (e) {
            console.error(e);
            toast("Failed: " + (e.message || e));
        }
    }

    const adjKey = () => (sel[S.cat] == null ? null : S.cat + ":" + sel[S.cat]);
    const fmtAdj = {
        x: (v) => v.toFixed(1), y: (v) => v.toFixed(1), s: (v) => v.toFixed(2) + "×", r: (v) => Math.round(v) + "°"
    };

    function syncAdj() {
        const box = $(".adj"), k = adjKey(), a = k ? ADJ[k] || NOADJ : NOADJ;
        box.classList.toggle("off", !k);
        $(".an").textContent = k ? `${LABEL[S.cat]} ${String(sel[S.cat] + 1).padStart(2, "0")}` : "select an item";
        box.querySelectorAll("input[data-j]").forEach((i) => {
            i.value = a[i.dataset.j];
            i.nextElementSibling.textContent = fmtAdj[i.dataset.j](a[i.dataset.j]);
            const mn = +i.min, mx = +i.max, pc = (v) => `calc(${(v - mn) / (mx - mn)} * (100% - 14px) + 7px)`;
            i.style.setProperty("--lo", pc(Math.min(+i.value, 0)));
            i.style.setProperty("--hi", pc(Math.max(+i.value, 0)));
        });
    }

    function setAdj(prop, val) {
        const k = adjKey();
        if (!k || !["x", "y", "r"].includes(prop) || !Number.isFinite(val)) return;
        pushNudge();
        const a = ADJ[k] || (ADJ[k] = {...NOADJ});
        a[prop] = val;
        syncAdj();
        refresh();
    }

    const adjJSON = () => JSON.stringify(Object.fromEntries(Object.entries(ADJ)
        .filter(([, a]) => a.x || a.y || a.s !== 1 || a.r)
        .map(([k, a]) => [k, {x: +a.x.toFixed(2), y: +a.y.toFixed(2), s: +a.s.toFixed(3), r: +a.r.toFixed(1)}])));

    const undoStack = [];
    const snapshot = () => ({sel: {...sel}, adj: JSON.parse(JSON.stringify(ADJ))});
    let lastNudge = 0;

    function pushHistory() {
        const snap = snapshot(), last = undoStack[undoStack.length - 1];
        if (last && JSON.stringify(last) === JSON.stringify(snap)) return;
        undoStack.push(snap);
        if (undoStack.length > 100) undoStack.shift();
    }

    function pushNudge() {
        const now = Date.now();
        if (now - lastNudge > 700) pushHistory();
        lastNudge = now;
    }

    function undo() {
        const h = undoStack.pop();
        if (!h) return toast("Nothing to undo");
        Object.assign(sel, h.sel);
        for (const k in ADJ) delete ADJ[k];
        Object.assign(ADJ, h.adj);
        lastNudge = 0;
        renderGrid();
        refresh();
        toast("Undone ↶");
    }

    const presetJSON = () => JSON.stringify({
        checkpointPreset: 1,
        selection: {...sel},
        adjustments: JSON.parse(adjJSON()),
        ...(S.bg === "image" ? {} : {background: S.bg}),
        ...(S.bg === "custom" ? {backgroundColor: S.bgColor} : {}),
        ...(S.bg === "customgrad" ? {backgroundGradient: {angle: S.gradAngle, colors: [S.gradA, S.gradB]}} : {})
    });

    function parsePreset(text) {
        let o;
        try {
            o = JSON.parse(String(text).trim());
        } catch {
            throw new Error("That isn't valid JSON");
        }
        if (!o || typeof o !== "object" || Array.isArray(o)) throw new Error("Not a Checkpoint preset");
        const legacy = !("selection" in o) && !("checkpointPreset" in o);
        if (legacy && !Object.keys(o).length) throw new Error("Not a Checkpoint preset");
        const rawSel = legacy ? null : o.selection, rawAdj = legacy ? o : (o.adjustments || {});

        const nextSel = {...sel};
        if (rawSel) {
            if (typeof rawSel !== "object") throw new Error("Preset outfit is invalid");
            for (const c of CATS) {
                if (!(c in rawSel)) continue;
                const v = rawSel[c];
                if (v == null) {
                    if (!OPTIONAL.has(c)) throw new Error(`${LABEL[c]} can't be empty`);
                    nextSel[c] = null;
                } else if (Number.isInteger(v) && v >= 0 && v < D[c].length) nextSel[c] = v;
                else throw new Error(`${LABEL[c]} ${v} doesn't exist`);
            }
        }

        const nextAdj = {}, num = (v, lo, hi) => (Number.isFinite(v) ? clamp(v, lo, hi) : 0);
        for (const [k, v] of Object.entries(rawAdj)) {
            const m = /^([a-z]+):(\d+)$/.exec(k);
            if (!m || !CATS.includes(m[1]) || +m[2] >= D[m[1]].length || !v || typeof v !== "object") continue;
            nextAdj[k] = {x: num(v.x, -40, 40), y: num(v.y, -40, 40), s: 1, r: num(v.r, -180, 180)};
        }
        if (legacy && !Object.keys(nextAdj).length) throw new Error("Not a Checkpoint preset");

        const bg = typeof o.background === "string" && Object.hasOwn(BGS, o.background) ? o.background : null;
        const color = typeof o.backgroundColor === "string" && /^#[0-9a-f]{6}$/i.test(o.backgroundColor) ? o.backgroundColor : null;
        const hex = (v) => typeof v === "string" && /^#[0-9a-f]{6}$/i.test(v);
        const bgg = o.backgroundGradient;
        const grad = bgg && Array.isArray(bgg.colors) && bgg.colors.length >= 2 && hex(bgg.colors[0]) && hex(bgg.colors[1]) && Number.isFinite(bgg.angle)
            ? {angle: clamp(bgg.angle, 0, 360), a: bgg.colors[0], b: bgg.colors[1]} : null;
        return {sel: nextSel, adj: nextAdj, bg: (bg === "custom" && !color) || (bg === "customgrad" && !grad) ? null : bg, color, grad};
    }

    function applyPreset(text) {
        const p = parsePreset(text);
        pushHistory();
        Object.assign(sel, p.sel);
        for (const k in ADJ) delete ADJ[k];
        Object.assign(ADJ, p.adj);
        if (p.bg) {
            if (p.color) S.bgColor = p.color;
            if (p.grad) {
                S.gradA = p.grad.a;
                S.gradB = p.grad.b;
                S.gradAngle = p.grad.angle;
            }
            S.bg = p.bg;
            updateDD();
        }
        renderGrid();
        refresh();
    }

    async function copyText(txt) {
        try {
            await navigator.clipboard.writeText(txt);
            return true;
        } catch {
        }
        try {
            const ta = document.createElement("textarea");
            ta.value = txt;
            ta.style.cssText = "position:fixed;opacity:0";
            root.append(ta);
            ta.select();
            const ok = document.execCommand("copy");
            ta.remove();
            return ok;
        } catch {
            return false;
        }
    }

    const dlg = $(".dlg"), dlgText = dlg.querySelector("textarea"), dlgOk = dlg.querySelector('[data-a="dlgok"]');
    let dlgMode = null, gradSnap = null;
    const gedit = $(".gedit"), dlgPaste = dlg.querySelector('[data-a="dlgpaste"]');
    const gradCssNow = () => `linear-gradient(${S.gradAngle}deg,${S.gradA},${S.gradB})`;
    function syncGrad() {
        gedit.querySelector('[data-g="a"]').value = S.gradA;
        gedit.querySelector('[data-g="b"]').value = S.gradB;
        gedit.querySelector('[data-g="angle"]').value = S.gradAngle;
        gedit.querySelector("output").textContent = S.gradAngle + "\u00b0";
        gedit.querySelector(".gprev").style.background = gradCssNow();
    }

    function openDlg(mode, text = "") {
        dlgMode = mode;
        const imp = mode === "import", gr = mode === "gradient";
        gradSnap = gr ? {bg: S.bg, a: S.gradA, b: S.gradB, angle: S.gradAngle} : null;
        gedit.hidden = !gr;
        dlgText.hidden = gr;
        dlgPaste.hidden = !imp;
        if (gr) {
            S.bg = "customgrad";
            syncGrad();
            updateDD();
            refresh();
        }
        $(".dt").textContent = gr ? "Custom gradient" : imp ? "Import preset" : "Share preset";
        $(".dd").textContent = gr ? "Pick two colors and an angle. The preview updates live; Cancel restores your previous background." : imp ? "Paste the preset JSON someone shared with you. It replaces your current outfit and adjustments (you can undo it)."
            : "Clipboard access is blocked here. Copy this JSON (Ctrl+C) and send it to anyone.";
        dlgText.value = text;
        dlgText.readOnly = !imp;
        dlgOk.textContent = gr ? "Done" : imp ? "Import" : "Copy";
        dlg.hidden = false;
        if (gr) return;
        dlgText.focus();
        if (!imp) dlgText.select();
    }

    function closeDlg() {
        if (dlgMode === "gradient" && gradSnap) {
            S.bg = gradSnap.bg;
            S.gradA = gradSnap.a;
            S.gradB = gradSnap.b;
            S.gradAngle = gradSnap.angle;
            updateDD();
            refresh();
        }
        gradSnap = null;
        dlg.hidden = true;
        dlgText.hidden = false;
        gedit.hidden = true;
        dlgMode = null;
    }

    const bgDD = $(".bgd"), bgBtn = $(".bgbtn"), bgMenu = $(".bgmenu"), bgColorIn = $(".bgcolor"), bgFile = $(".bgfile");
    const bgCss = (k) => {
        const v = BGS[k];
        return typeof v === "string" ? v : v && v.grad ? `linear-gradient(${v.angle}deg,${v.grad.join(",")})` : "";
    };
    const sw = (css, chk) => `<i class="bgsw${chk ? " chk" : ""}"${css ? ` style="background:${css}"` : ""}></i>`;
    const curSw = () => S.bg === "transparent" ? sw("", true)
        : S.bg === "custom" ? sw(S.bgColor)
        : S.bg === "customgrad" ? sw(gradCssNow())
        : S.bg === "image" ? sw(`url(${S.bgThumb}) center/cover`)
        : sw(bgCss(S.bg));

    function updateDD() {
        bgBtn.innerHTML = `${curSw()}<span>${BG_LABEL[S.bg]}</span>`;
        const st = bgMenu.scrollTop;
        const opt = (k, label, swatch) => `<button type="button" class="bgo${S.bg === k ? " on" : ""}" role="option" aria-selected="${S.bg === k}" data-bg="${k}">${swatch}<span>${label}</span></button>`;
        let h = "";
        for (const [g, items] of BG_MENU) h += `<div class="bgg">${g}</div>` + items.map(([k, l]) => opt(k, l, sw(bgCss(k), k === "transparent"))).join("");
        h += `<div class="bgg">Custom</div>` + opt("custom", "Custom color\u2026", sw(S.bgColor));
        h += opt("customgrad", "Custom gradient\u2026", sw(gradCssNow()));
        h += `<button type="button" class="bgo" data-bgact="file"><i class="bgic">\u{1F5BC}</i><span>Image from file\u2026</span></button>`;
        if (S.bgImg) {
            h += opt("image", "Current image", sw(`url(${S.bgThumb}) center/cover`));
            h += `<div class="bgfit">` + ["cover", "contain", "stretch"].map((f) => `<button type="button" data-fit="${f}" class="${S.bgFit === f ? "on" : ""}">${f[0].toUpperCase() + f.slice(1)}</button>`).join("") + `</div>`;
        }
        bgMenu.innerHTML = h;
        bgMenu.scrollTop = st;
    }

    function closeDD() {
        bgDD.classList.remove("open");
        bgBtn.setAttribute("aria-expanded", "false");
    }

    function toggleDD() {
        const open = !bgDD.classList.contains("open");
        bgDD.classList.toggle("open", open);
        bgBtn.setAttribute("aria-expanded", String(open));
        if (open) bgMenu.querySelector(".bgo.on")?.scrollIntoView({block: "nearest"});
    }

    function setBgImage(bmp) {
        S.bgImg?.close?.();
        S.bgImg = bmp;
        const t = document.createElement("canvas");
        t.width = t.height = 48;
        paintBackground(t.getContext("2d"), 48, {img: bmp, fit: "cover"});
        S.bgThumb = t.toDataURL();
        S.bg = "image";
        updateDD();
        refresh();
    }

    async function loadBgFile(f) {
        try {
            if (!f || !f.type.startsWith("image/")) throw new Error("That isn't an image file");
            setBgImage(await createImageBitmap(f));
            toast("Background set \u2714");
        } catch (e) {
            toast(e.message || "Couldn't read that image");
        }
    }

    bgFile.addEventListener("change", () => {
        const f = bgFile.files[0];
        bgFile.value = "";
        loadBgFile(f);
    });
    view.addEventListener("dragover", (e) => {
        if ([...(e.dataTransfer?.types || [])].includes("Files")) {
            e.preventDefault();
            view.classList.add("drop");
        }
    });
    view.addEventListener("dragleave", () => view.classList.remove("drop"));
    view.addEventListener("drop", (e) => {
        view.classList.remove("drop");
        const f = e.dataTransfer?.files?.[0];
        if (!f || !f.type.startsWith("image/")) return;
        e.preventDefault();
        loadBgFile(f);
    });
    updateDD();

    let drag = null;
    pv.addEventListener("pointerdown", (e) => {
        if (!adjKey() || e.button > 0) return;
        drag = {x: e.clientX, y: e.clientY};
        pv.setPointerCapture(e.pointerId);
        pv.classList.add("drag");
    });
    pv.addEventListener("pointermove", (e) => {
        if (!drag) return;
        const k = adjKey(), u = VIEW.s / pv.getBoundingClientRect().width;
        if (!k) return;
        if (!drag.pushed) {
            pushHistory();
            drag.pushed = true;
        }
        const a = ADJ[k] || (ADJ[k] = {...NOADJ});
        a.x = clamp(a.x + (e.clientX - drag.x) * u, -40, 40);
        a.y = clamp(a.y + (e.clientY - drag.y) * u, -40, 40);
        drag.x = e.clientX;
        drag.y = e.clientY;
        syncAdj();
        refresh();
    });
    const endDrag = () => {
        drag = null;
        pv.classList.remove("drag");
    };
    pv.addEventListener("pointerup", endDrag);
    pv.addEventListener("pointercancel", endDrag);

    $(".tabs").innerHTML = `<div class="tab-ind nt"></div>` + CATS.map((c) => `<button class="tab" data-cat="${c}"><span>${LABEL[c]}</span></button>`).join("");
    const tabInd = $(".tab-ind");
    const moveInd = (instant) => {
        const on = root.querySelector(".tab.on");
        if (!on || !on.offsetWidth) return;
        tabInd.classList.toggle("nt", !!instant);
        tabInd.style.width = on.offsetWidth + "px";
        tabInd.style.height = on.offsetHeight + "px";
        tabInd.style.transform = `translate(${on.offsetLeft}px,${on.offsetTop}px)`;
        if (instant) {
            void tabInd.offsetWidth;
            tabInd.classList.remove("nt");
        }
    };
    const tabsObserver = new ResizeObserver(() => moveInd(true));
    tabsObserver.observe($(".tabs"));
    let tabSwitchT = 0, tabSwitchSeq = 0, animateNext = false;
    const switchTab = (next) => {
        if (next === S.cat) return;
        const dir = CATS.indexOf(next) > CATS.indexOf(S.cat) ? 1 : -1;
        S.cat = next;
        const my = ++tabSwitchSeq;
        grid.style.setProperty("--dir", dir);
        root.querySelectorAll(".tab").forEach((b) => b.classList.toggle("on", b.dataset.cat === next));
        moveInd();
        grid.classList.add("out");
        clearTimeout(tabSwitchT);
        tabSwitchT = setTimeout(() => {
            if (destroyed || my !== tabSwitchSeq) return;
            animateNext = true;
            grid.scrollTop = 0;
            renderGrid();
            animateNext = false;
            grid.style.transition = "none";
            grid.classList.remove("out");
            void grid.offsetWidth;
            grid.style.transition = "";
        }, 140);
    };
    root.addEventListener("click", (e) => {
        const t = e.target;
        if (t === dlg) return closeDlg();
        if (t === wrap) return setVisible(false);
        if (!t.closest(".bgd")) closeDD();
        if (t.closest(".bgbtn")) return toggleDD();
        const bo = t.closest(".bgo");
        if (bo) {
            const act2 = bo.dataset.bgact;
            closeDD();
            if (act2 === "file") return bgFile.click();
            if (bo.dataset.bg === "customgrad") return openDlg("gradient");
            S.bg = bo.dataset.bg;
            updateDD();
            refresh();
            if (S.bg === "custom") {
                bgColorIn.value = S.bgColor;
                bgColorIn.click();
            }
            return;
        }
        const fb = t.closest("[data-fit]");
        if (fb) {
            S.bgFit = fb.dataset.fit;
            updateDD();
            return refresh();
        }
        const credit = t.closest("a[data-t]");
        if (credit && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
            e.preventDefault();
            e.stopPropagation();
            return openCreditProfile();
        }
        const btn = t.closest("[data-a]");
        if (btn) return act(btn.dataset.a);
        const tab = t.closest(".tab");
        if (tab) {
            return switchTab(tab.dataset.cat);
        }
        const it = t.closest(".it");
        if (it) {
            const v = it.dataset.id;
            pushHistory();
            sel[S.cat] = v === "" ? null : +v;
            grid.querySelectorAll(".it").forEach((b) => b.classList.toggle("on", b === it));
            syncAdj();
            refresh();
        }
    });
    root.addEventListener("input", (e) => {
        const j = e.target.dataset?.j;
        if (j) {
            setAdj(j, +e.target.value);
            return;
        }
        const g = e.target.dataset?.g;
        if (g) {
            if (g === "angle") S.gradAngle = +e.target.value;
            else if (g === "a") S.gradA = e.target.value;
            else S.gradB = e.target.value;
            S.bg = "customgrad";
            syncGrad();
            updateDD();
            refresh();
            return;
        }
        if (e.target === bgColorIn) {
            S.bgColor = e.target.value;
            S.bg = "custom";
            updateDD();
            refresh();
        }
    });
    for (const ev of ["keydown", "keyup", "keypress"]) root.addEventListener(ev, (e) => e.stopPropagation());

    const onKey = (e) => {
        if (e.ctrlKey && e.shiftKey && !e.altKey && !e.metaKey && e.code === "KeyS") {
            e.preventDefault();
            e.stopImmediatePropagation();
            setVisible(!visible);
        } else if (e.key === "Escape" && visible) {
            e.stopPropagation();
            if (!dlg.hidden) closeDlg(); else if (bgDD.classList.contains("open")) closeDD(); else setVisible(false);
        } else if (visible && dlg.hidden && (e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey && e.code === "KeyZ") {
            e.preventDefault();
            e.stopImmediatePropagation();
            undo();
        }
    };
    window.addEventListener("keydown", onKey, true);
    const onPaste = (e) => {
        if (dlg.hidden || dlgText.hidden || dlgText.readOnly || !e.composedPath().includes(dlgText)) return;
        const txt = e.clipboardData?.getData("text/plain");
        if (txt == null) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        dlgText.setRangeText(txt, dlgText.selectionStart, dlgText.selectionEnd, "end");
    };
    window.addEventListener("paste", onPaste, true);

    function destroy() {
        if (destroyed) return;
        destroyed = true;
        seq++;
        gridSeq++;
        clearTimeout(toastT);
        previewObserver.disconnect();
        tabsObserver.disconnect();
        themeObserver.disconnect();
        navObserver.disconnect();
        clearInterval(navTimer);
        for (const n of document.querySelectorAll("[" + NAV_MARK + "]")) n.remove();
        navStyle.remove();
        clearTimeout(tabSwitchT);
        scan.width = scan.height = 1;
        window.removeEventListener("keydown", onKey, true);
        window.removeEventListener("paste", onPaste, true);
        host.remove();
        thumbCache.clear();
        srcCache.clear();
        atlas.close?.();
        S.bgImg?.close?.();
        delete window[KEY];
    }

    window[KEY] = {
        destroy, toggle: () => setVisible(!visible), selection: () => ({...sel}), set: (o) => {
            pushHistory();
            Object.assign(sel, o);
            renderGrid();
            return refresh();
        }, export: exportBlob, adjust: () => JSON.parse(adjJSON()), undo, preset: presetJSON, importPreset: applyPreset, setAdjust: (o) => {
            pushHistory();
            for (const k in ADJ) delete ADJ[k];
            for (const [k, v] of Object.entries(o || {})) ADJ[k] = {
                x: Number.isFinite(v?.x) ? clamp(v.x, -40, 40) : 0,
                y: Number.isFinite(v?.y) ? clamp(v.y, -40, 40) : 0,
                s: 1,
                r: Number.isFinite(v?.r) ? clamp(v.r, -180, 180) : 0
            };
            syncAdj();
            return refresh();
        }
    };

    const firstRender = () => {
        if (rendered) return;
        rendered = true;
        renderGrid();
        refresh();
    };
    let rendered = false;
    wrap.style.display = visible ? "flex" : "none";
    if (visible) firstRender();
    return true;
    };

    let starting = true;
    const start = async (interactive) => {
        try {
            return !!(await run(interactive));
        } catch (e) {
            console.error("[Checkpoint Preview Reworked]", e);
            return false;
        }
    };
    (async () => {
        for (const wait of [0, 5000, 15000]) {
            if (wait) await new Promise((r) => setTimeout(r, wait));
            if (window[KEY]) break;
            if (await start(false)) break;
        }
        starting = false;
    })();
    window.addEventListener("keydown", (e) => {
        if (starting || window[KEY] || !(e.ctrlKey && e.shiftKey && !e.altKey && !e.metaKey && e.code === "KeyS")) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        starting = true;
        start(true).finally(() => {
            starting = false;
        });
    }, true);
})();
