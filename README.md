# AeroBMSCE Website

A single-page React + TypeScript website for the AeroBMSCE aerospace student organization at BMS College of Engineering. The site includes an interactive Three.js aircraft hero, an interactive fabrication workbench, a team-photo section, a technical gallery, engineering projects, ecosystem tooling and collaboration information.

> **Source-integrity note:** The aircraft in the hero and the aircraft structures in the fabrication workbench are procedural visual models. They are not source CAD files, real-time flight telemetry, certification evidence or validation results. Content should be checked against AeroBMSCE's approved records before public release.

## Requirements

- **Node.js 24 LTS is recommended.** Vite 8 requires Node.js 20.19+ or 22.12+; Node 24 LTS satisfies that requirement. See the [official Node.js download page](https://nodejs.org/en/download) and [Vite 8 compatibility notes](https://vite.dev/blog/announcing-vite8.html).
- npm, included with the Node.js installer.
- A modern browser with WebGL enabled for the interactive 3D scenes. The fabrication workbench offers a 2D blueprint fallback if WebGL cannot initialize.
- Visual Studio Code is optional but recommended for editing.

You do **not** need to install React, Vite, Three.js, TypeScript or the icon library globally. `npm install` installs the versions declared by the project.

## Download and run on Windows

1. Download the project ZIP and use **Extract All…** in File Explorer.
2. Open the extracted project folder in VS Code. Open the folder that contains `package.json` (not just the `src` folder).
3. In VS Code, choose **Terminal → New Terminal**.
4. Check Node.js and npm are available:

   ```powershell
   node --version
   npm --version
   ```

5. Install the project's dependencies:

   ```powershell
   npm.cmd install
   ```

6. Start the development server:

   ```powershell
   npm.cmd run dev
   ```

7. Open **http://localhost:3000/** in your browser. Keep the terminal open while using the development site; press `Ctrl+C` in that terminal to stop the server.

`npm.cmd` is used in these Windows examples because PowerShell can block the `npm.ps1` script depending on the machine's execution policy. You do not need to change the PowerShell execution policy just to run the project.

## Useful commands

| Command | Purpose |
|---|---|
| `npm.cmd install` | Installs project dependencies and creates an npm lockfile if one is not present. |
| `npm.cmd run dev` | Runs the Vite development server at port 3000. |
| `npm.cmd run lint` | Runs `tsc --noEmit` as a TypeScript type-check. The script is named `lint` in the current `package.json`; it is not an ESLint run. |
| `npm.cmd run build` | Creates the production build in `dist/`. |
| `npm.cmd run preview` | Serves the production build locally for a final check (run `npm.cmd run build` first). |
| `node scripts/generate-assets.js` | Regenerates certain generated SVG/PNG/JPEG assets using `sharp`. **Do not run this casually**: it rewrites the technical archive images `photo1.jpg`–`photo8.jpg` and `bg.jpg`. Supplied logos are deliberately skipped by the generator. |

On macOS or Linux, use `npm` in place of `npm.cmd`.

## Environment variables

The current page and its workbench do not read `GEMINI_API_KEY` or `APP_URL`; `.env.example` is inherited configuration documentation from the AI Studio starter. No `.env.local` file is needed to run this website as currently implemented. Do not put private API keys into client-side code or commit secrets to the repository.

## Project layout

```text
.
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
├── .env.example
├── public/
│   └── images/               # Logos, team photos, archive images and schematics
├── scripts/
│   └── generate-assets.js    # Optional asset generator; see warning above
└── src/
    ├── App.tsx               # Page composition and delegated card interactions
    ├── index.css             # Global theme, gradients, floating-card and viewport CSS
    ├── main.tsx              # React entry point
    ├── data/aerobmsceData.ts # Content records and five workbench stages
    └── components/           # Site sections and isolated Three.js scenes
```

Important components:

- `ScrollStorySection.tsx` — the scroll-responsive five-panel story sequence with the winding path; panel text and the featured competition result come from the project's existing data model.
- `ThreeHeroCanvas.tsx` — the existing hero aircraft, camera presets, component inspection and flight-path simulation.
- `AboutSection.tsx` — blueprint-led organizational introduction, focus-area strip, interactive selector for the four existing specialist teams, and the existing vision statement.
- `CardboardWorkbenchSection.tsx` — the five-stage Digital Hangar experience. On larger screens with motion enabled, scrolling through the workbench runway advances the selected fabrication stage while the section remains pinned; selecting a stage directly also jumps to its scroll marker.
- `Workbench3DViewport.tsx` — the stage-linked procedural 3D structure, eased camera transitions, hotspot picking, orbit/zoom, exploded and cutaway views, aileron deflection, 2D blueprint mode and illustrative flight profiles.
- `TeamSection.tsx` — the six supplied team photographs, kept separate from the existing technical archive.
- `CapabilitiesEcosystemSection.tsx` — software tools, component resources and research-organization logos, with copy clarifying that logo display alone does not establish partnership.

## Fabrication workbench controls

1. On larger screens with motion enabled, scroll through the pinned workbench to advance between the five stages. You can also select a stage in the sequence rail to jump directly to it. On smaller screens or with reduced motion enabled, the workbench becomes a normal flowing section.
2. Drag within the viewport to orbit; use the mouse wheel or trackpad to zoom.
3. Click a visible component hotspot to update the inspected-component callout.
4. Use **EXPLODE** to spread selected structural elements and **CUTAWAY** to reveal more of the underlying frame.
5. Use **2D BLUEPRINT** to return to the supplied technical blueprint. Hotspots remain selectable in that view.
6. In Step 5, select **FLIGHT TEST** to open the trajectory controls. Choose **CRUISE CIRCUIT**, **CLIMB OUT**, **S-TURN** or **CONTROL TEST**; each profile uses a different illustrative path and attitude response. Start, pause/resume, reset, change the speed (0.5×/1.0×/1.5×), show/hide the path, toggle loop behaviour or enable camera follow.
7. In the same Flight Test dock, move **AILERON DEFLECTION** or choose −15°, 0° or +15° to visibly rotate the control surface around its hinge. In **CONTROL TEST**, the selected angle also affects the model's illustrative roll. These are visual interactions, not validated aerodynamic behaviour or real flight data.
8. Select **RESET** to restore the 3D camera framing; **RESET FLIGHT** returns the moving model to its starting point and clears flight progress.

The workbench is built from procedural Three.js geometry, not imported CAD. Geometry and component positions are illustrative and should not be presented as an exact AeroBMSCE airframe drawing. The main aircraft hero uses its separate existing component and scene.

## Troubleshooting

### `node` or `npm` is not recognized
Install Node.js 24 LTS from the official download page, complete the installer, restart VS Code, then retry `node --version` and `npm --version`.

### PowerShell says `npm.ps1` cannot run
Use `npm.cmd install` and `npm.cmd run dev` as shown above. Do not change system execution policy solely for this app.

### Dependency resolution fails
First confirm `node --version` is compatible with Vite 8. Run `npm.cmd install` from the folder containing `package.json` and check the full error. Do not use `--force` or `--legacy-peer-deps` without understanding the specific conflict. The project declares `esbuild` 0.28-compatible versions to satisfy the Vite 8 peer requirement.

### Port 3000 is already in use
Stop the other process using that port, or adjust the `dev` command in `package.json` and then use the URL reported by Vite.

### The 3D workbench is blank
Check that WebGL is enabled and that your browser and graphics driver are up to date. Use **2D BLUEPRINT** as a fallback. Open the browser developer console if the scene fails, and keep the exact error for diagnosis.

### Images are missing
Confirm the asset exists under `public/images/` with the same filename and capitalization as the path in the component/data. Vite serves files from `public/` at the root URL, so `public/images/logo.png` is referenced as `/images/logo.png`.

### Vite warns about `__dirname` in `vite.config.ts`
This warning was noted in the earlier project handoff. Check whether the dev server/build actually fails before changing the config; do not make unrelated configuration edits solely to silence a warning.

### `npm.cmd run build` or `npm.cmd run lint` fails
Copy the first meaningful error from the terminal, including the file and line number. Avoid unrelated dependency or configuration edits before identifying the failure.

## Verification status for this handoff

The updated TypeScript source passes `npm run lint` in the available environment. A production build and in-browser visual review remain to be completed on a machine where Vite/Rolldown’s matching platform-native optional dependency is installed. Do not interpret the TypeScript check as proof that every runtime interaction has been verified.
