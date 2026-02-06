# Globe stroke PNG – frame and stroke spec

Use this when you provide a **stroke PNG** (or a full globe image that includes the stroke) instead of the code-drawn outline.

---

## 1. Frame dimensions (image size)

The globe texture is **equirectangular**: the image is wrapped around the sphere like a world map.

| Rule | Value |
|------|--------|
| **Aspect ratio** | **2 : 1** (width = 2 × height) |
| **Recommended sizes** | **4096 × 2048 px** or **2048 × 1024 px** (or **8192 × 4096** for high-DPI) |

So:

- **Width** = **2 × height**
- Examples: **4096×2048**, **2048×1024**, **8192×4096**

The app does not enforce a specific resolution; it will use whatever PNG you provide. Higher resolution = sharper stroke and detail.

---

## 2. Coordinate system (where things go on the image)

- **Horizontal (X)**  
  - Left edge = **−180° longitude** (or 180° W)  
  - Right edge = **+180° longitude** (180° E)  
  - Left and right edges meet on the sphere (Pacific).

- **Vertical (Y)**  
  - **Top** of image = **North Pole** (+90° latitude)  
  - **Bottom** of image = **South Pole** (−90° latitude)

- **Centre of image** = (0° longitude, 0° latitude).

---

## 3. Stroke (outline) guidelines

If you draw the stroke **in the PNG** (e.g. outline of land, or a circular limb):

| Item | Recommendation |
|------|----------------|
| **Stroke width (in pixels)** | About **4–8 px** at **4096×2048**; or **2–4 px** at **2048×1024**. Scale with resolution so the line stays crisp but visible. |
| **Rule of thumb** | **~0.1–0.2% of image height** (e.g. 2–4 px per 1024 px height). |
| **Colour** | Match the current code stroke if needed: **#76797F** at ~50% opacity, or your design. |
| **Format** | **PNG**; use **transparency** where there is no stroke/globe so the rest of the scene shows through. |

If the stroke is **only** the visible circle (limb) when the globe is viewed from one angle, note that this limb moves as the camera rotates. A single static PNG can only show one such circle; for a rotating globe, the code-drawn outline (current behaviour) follows the limb. So:

- **Static stroke in PNG**: use for things that are fixed on the sphere (e.g. continent outlines, graticule, or a decorative ring at a fixed latitude).
- **Moving “edge” stroke**: keep using the current code outline, or combine code outline + your PNG for extra detail.

---

## 4. Summary checklist

When you export your stroke (or full globe) PNG:

1. **Frame**: **2 : 1** aspect ratio, e.g. **4096 × 2048** or **2048 × 1024**.
2. **Orientation**: Top = North, bottom = South; left/right = ±180° longitude.
3. **Stroke**: ~**4–8 px** at 4096×2048 (or ~0.1–0.2% of height) so it stays visible and sharp.
4. **File**: **PNG** with transparency where you want nothing drawn.

Place the file in `public/globe/` and point `getUrl` (e.g. in `main.ts`) to it (e.g. `/globe/YourStrokeImage.png`).
