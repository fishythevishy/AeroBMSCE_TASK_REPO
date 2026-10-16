# AeroBMSCE Website

A single-page React + TypeScript website for AeroBMSCE, the aerospace student organization at BMS College of Engineering. The project includes a Three.js aircraft hero, stage-aware fabrication workbench, team photography, technical gallery, engineering projects and ecosystem resources.

> **Model and content note:** The hero aircraft and fabrication workbench structures use procedural illustrative geometry. They are not imported CAD assemblies, validated aerodynamic simulations, certification evidence or real-time flight telemetry. Confirm all organizational claims and captions against approved records before public release. Displaying an organization's logo does not, by itself, establish a formal partnership.

## Run locally on Windows

### Requirements

- Node.js 24 LTS recommended. Vite 8 requires Node.js 20.19+ or 22.12+.
- npm, included with Node.js.
- A modern browser with WebGL enabled for 3D views. The fabrication workbench includes a 2D blueprint fallback.
- VS Code is recommended but optional.

### Setup

1. Open the project folder containing `package.json` in VS Code.
2. Choose **Terminal → New Terminal**.
3. Check the installed versions:

   ```powershell
   node --version
   npm.cmd --version
   ```

4. Install the dependencies from the lockfile:

   ```powershell
   npm.cmd install
   ```

5. Start the local development server:

   ```powershell
   npm.cmd run dev
   ```

6. Open `http://localhost:3000/`. Keep the terminal open while using the site; press `Ctrl+C` in that terminal to stop the server.

Use `npm.cmd` in PowerShell because some Windows configurations block `npm.ps1`. You do not need to weaken the PowerShell execution policy for this project.

## Useful commands

| Command | Purpose |
|---|---|
| `npm.cmd install` | Installs dependencies based on `package.json` and updates the npm lockfile only if needed. |
| `npm.cmd run dev` | Starts the Vite development server on port 3000. |
| `npm.cmd run lint` | Runs `tsc --noEmit` as a TypeScript type check; despite the script name, this is not ESLint. |
| `npm.cmd run build` | Creates the production bundle in `dist/`. |
| `npm.cmd run preview` | Serves the last production build locally; run the build first. |
| `npm.cmd run clean` | Deletes the generated `dist/` folder. |

## Deploy to GitHub Pages

A GitHub Actions workflow is included at `.github/workflows/deploy.yml`. It installs from `package-lock.json`, builds the site with the repository subpath `/AeroBMSCE_TASK_REPO/`, and publishes the `dist/` folder.

1. Push the project to the `main` branch of the public `AeroBMSCE_TASK_REPO` repository.
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Open the repository's **Actions** tab and wait for **Deploy AeroBMSCE to GitHub Pages** to succeed.
5. Visit `https://fishythevishy.github.io/AeroBMSCE_TASK_REPO/` after the workflow succeeds. The URL assumes the repository owner remains `fishythevishy` and the repository remains `AeroBMSCE_TASK_REPO`.

Asset paths are resolved using Vite's `BASE_URL` so public images work both at the local root and under the GitHub Pages repository path. The Pages workflow sets `GITHUB_PAGES=true` only for the production build; local development continues to use `/` as its base.

## If you are applying this project to the original fork

This repository originally contained a plain HTML/CSS/JavaScript site. When replacing that starter with this Vite project:

- Copy the **contents** of this project into the root of the cloned repository, overwriting matching files.
- Preserve the cloned repository's hidden `.git` directory. This ZIP intentionally does not contain `.git`.
- Remove obsolete top-level files from the old static site if they remain: `journey.html`, `partners.html`, `script.js`, `style.css`, and the old top-level `images/` directory.
- **Keep `public/images/`**. It contains the logos, technical images and team photographs used by this project.
- Do not copy `node_modules/` or `dist/` into Git. They are generated locally and are ignored by `.gitignore`.
- No `.env` file or API key is required to run the current frontend.

## Main features

- Responsive single-page navigation and section layout.
- Existing hero aircraft with separate camera/flight interaction code.
- Five-stage fabrication workbench whose central viewport changes with each selected stage.
- Workbench orbit/zoom, reset, hotspots, exploded/cutaway controls and 2D blueprint fallback.
- Team photographs separate from the technical archive.
- Engineering software, component-resource and research-organization logo groups.
- Floating card effects, CSS-based specular-style highlights and slow purple atmosphere. These effects approximate glossy reflections; they are not real-time ray tracing.

## Recruitment task reflection

### 1. What needed improvement in the original website?

The supplied starter was a lightweight static HTML/CSS/JavaScript site split across multiple pages. My redesign focused on a more consistent visual hierarchy, coherent navigation and section styling, clearer presentation of images, and a richer but still navigable way to explore the club's work. I reviewed image references and links as part of the update and retained the supplied organization, project and ecosystem assets where applicable.

### 2. Design route and UI/UX decisions

I chose a dark obsidian, plum and lavender visual system to give the site a cohesive aerospace-engineering identity. The layout combines clear section headings, restrained reflective effects, real team photographs, engineering resource logos and interactive technical views. The fabrication workbench connects five left-hand stages to a changing 3D viewport and matching explanation, while retaining a 2D blueprint fallback. Procedural models are labelled as illustrative rather than exact CAD.

### 3. One problem or edge case and the workaround

During local setup on Windows, PowerShell blocked `npm.ps1` under the machine's execution policy. Instead of weakening the system policy, I used `npm.cmd` to invoke npm from PowerShell. For deployment, I also made public image URLs use Vite's base URL so the assets can load from the `/AeroBMSCE_TASK_REPO/` subpath on GitHub Pages rather than assuming the site is hosted at the domain root.

## Troubleshooting

### `git` is not recognized

Install Git for Windows from [git-scm.com](https://git-scm.com/install/windows), close and reopen VS Code, and run `git --version` in a new terminal.

### `node` or `npm.cmd` is not recognized

Install Node.js 24 LTS from [nodejs.org](https://nodejs.org/en/download), finish the installer, restart VS Code, and try `node --version` and `npm.cmd --version` again.

### PowerShell blocks `npm.ps1`

Use `npm.cmd install` and `npm.cmd run dev`; changing PowerShell execution policy is unnecessary.

### Build or deployment fails

Check the first meaningful error in the terminal or GitHub Actions log. Do not use `--force` or `--legacy-peer-deps` as a first resort. Check that the repository name matches `AeroBMSCE_TASK_REPO`, the Pages source is **GitHub Actions**, and the workflow ran on `main`.

### Images do not appear on GitHub Pages

Check that the file exists in `public/images/` and the spelling/capitalization matches the reference. Do not change the deployment base to `/` for a project-site URL.

### The 3D workbench does not initialize

Confirm WebGL is enabled and browser graphics drivers are up to date. Use **2D BLUEPRINT** as a fallback, then inspect the browser console for the first error.

## Verification status

The ZIP includes source code, assets, the GitHub Pages workflow and this README. Run `npm.cmd run lint` and `npm.cmd run build` locally before submitting. A successful GitHub Actions run and a visual check of the deployed website are required before treating the deployment as verified.
