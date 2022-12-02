[![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-icon.svg)](https://angular.io/) [![Electron Logo](https://www.vectorlogo.zone/logos/electronjs/electronjs-icon.svg)](https://electronjs.org/)

![Maintained][maintained-badge]
[![Make a pull request][prs-badge]][prs]
[![License][license-badge]](LICENSE.md)

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]

# Introduction

Tools to provide better DX when working with @angular/localize.

![image](https://user-images.githubusercontent.com/66845464/205376314-6c950c16-881e-420c-9f2d-923c5254acc2.png)

**Currently we support only JSON file type of translations. Read more at [this link](https://angular.io/guide/i18n-common-translation-files#change-the-source-language-file-format).**

---

**Currently Features**:

1. Order translations files based on main messages file.
2. Remove unused translations files based on main messages file.
3. Show missing translations texts based on main messages file.

**Roadmap**:

1. Provide an UI for translating texts directly in the Electron application
2. Add JSON + XLFF support for better visualization of translation contexts
3. Refactor file manipulation scripts to make them more independent
4. Create a package in NPM for better integration via CLI

# Development

This section provides instructions for development workflow

*Clone this repository locally:*

``` bash
git clone https://github.com/andersonmfjr/localize-tools.git
```

## Coding Style

By default, we use [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) with Angular settings.

**We recommend using Visual Studio Code and installing the recommended extensions to ease the development process.**

## Commits pattern

Example:

```
fix(scope): ensure Range headers adhere more closely to RFC 2616

Add one new dependency, use `range-parser` (Express dependency) to compute
range. It is more well-tested in the wild.

Fixes #2310
```

Accepted types:

```
- fix: for a bug fix for the user, not a fix to a build script.
- feat: for a new feature for the user, not a new feature for build script
- docs: for changes to the documentation.
- build: for updating build configuration, development tools or other changes irrelevant to the user.
- refactor: for refactoring production code, e.g. renaming a variable.
- test: for adding missing tests, refactoring tests; no production code change.
- ci: for update ci/cd configurations.
- perf: for performance improvements.
```

## Branching naming convention

- **Feature**: Any code changes for a new module or use case should be done on a feature branch. This branch is created
  based on the `main` branch. When all changes are Done, a Pull Request/Merge Request is needed to put all of these to
  the `main` branch.
  Examples:

  ```
  feature/integrate-swagger
  feature/JIRA-1234
  feature/JIRA-1234_support-dark-theme
  ```

  **It is recommended to use all lower caps letters and hyphen (-) to separate words unless it is a specific item name
  or ID. Underscore (\_) could be used to separate the ID and description.**

- **Hotfix**: If there is a need to fix a blocker, do a temporary patch, apply a critical framework or configuration
  change that should be handled immediately, it should be created as a Hotfix. This branch is created based on
  the `main` branch. When all changes are Done, a Pull Request/Merge Request is needed to put all of these to the `main`
  branch.
  Examples:

  ```
  hotfix/disable-endpoint-zero-day-exploit
  hotfix/increase-scaling-threshold
  ```

- **Experimental**: Any new feature or idea that is not part of a release or a sprint. A branch for playing around.
  Examples:
  ```
  experimental/dark-theme-support
  ```

## Angular + Electron Application

Currently runs with:

- Angular v14.0.6
- Electron v19.0.8

With this sample, you can:

- Run your app in a local development environment with Electron & Hot reload
- Run your app in a production environment
- Package your app into an executable file for Linux, Windows & Mac

/!\ Hot reload only pertains to the renderer process. The main electron process is not able to be hot reloaded, only restarted.

/!\ Angular CLI & Electron Builder needs Node 14 or later to work correctly.

### Getting Started

*Install dependencies with npm (used by Electron renderer process):*

``` bash
npm install
```

There is an issue with `yarn` and `node_modules` when the application is built by the packager. Please use `npm` as dependencies manager.

If you want to generate Angular components with Angular-cli , you **MUST** install `@angular/cli` in npm global context.
Please follow [Angular-cli documentation](https://github.com/angular/angular-cli) if you had installed a previous version of `angular-cli`.

``` bash
npm install -g @angular/cli
```

*Install NodeJS dependencies with npm (used by Electron main process):*

``` bash
cd app/
npm install
```

Why two package.json ? This project follow [Electron Builder two package.json structure](https://www.electron.build/tutorials/two-package-structure) in order to optimize final bundle and be still able to use Angular `ng add` feature.

### To build for development

- **in a terminal window** -> npm start

Voila! You can use your Angular + Electron app in a local development environment with hot reload!

The application code is managed by `app/main.ts`. In this sample, the app runs with a simple Angular App (http://localhost:4200), and an Electron window. \
The Angular component contains an example of Electron and NodeJS native lib import. \
You can disable "Developer Tools" by commenting `win.webContents.openDevTools();` in `app/main.ts`.

### Project structure

| Folder | Description                                      |
|--------|--------------------------------------------------|
| app    | Electron main process folder (NodeJS)            |
| src    | Electron renderer process folder (Web / Angular) |

### How to import 3rd party libraries

This sample project runs in both modes (web and electron). To make this work, **you have to import your dependencies the right way**. \

There are two kind of 3rd party libraries :
- NodeJS's one - Uses NodeJS core module (crypto, fs, util...)
    - I suggest you add this kind of 3rd party library in `dependencies` of both `app/package.json` and `package.json (root folder)` in order to make it work in both Electron's Main process (app folder) and Electron's Renderer process (src folder).

Please check `providers/electron.service.ts` to watch how conditional import of libraries has to be done when using NodeJS / 3rd party libraries in renderer context (i.e. Angular).

- Web's one (like bootstrap, material, tailwind...)
    - It have to be added in `dependencies` of `package.json  (root folder)`

### Add a dependency with ng-add

You may encounter some difficulties with `ng-add` because this project doesn't use the defaults `@angular-builders`. \
For example you can find [here](HOW_TO.md) how to install Angular-Material with `ng-add`.

### Browser mode

Maybe you only want to execute the application in the browser with hot reload? Just run `npm run ng:serve:web`.

### Included Commands

| Command                  | Description                                                                                           |
|--------------------------|-------------------------------------------------------------------------------------------------------|
| `npm run ng:serve`       | Execute the app in the web browser (DEV mode)                                                         |
| `npm run web:build`      | Build the app that can be used directly in the web browser. Your built files are in the /dist folder. |
| `npm run electron:local` | Builds your application and start electron locally                                                    |
| `npm run electron:build` | Builds your application and creates an app consumable based on your operating system                  |

### You want to use a specific lib (like rxjs) in electron main thread ?

YES! You can do it! Just by importing your library in npm dependencies section of `app/package.json` with `npm install --save XXXXX`. \
It will be loaded by electron during build phase and added to your final bundle. \
Then use your library by importing it in `app/main.ts` file. Quite simple, isn't it?

### E2E Testing

E2E Test scripts can be found in `e2e` folder.

| Command       | Description               |
|---------------|---------------------------|
| `npm run e2e` | Execute end to end tests  |

Note: To make it work behind a proxy, you can add this proxy exception in your terminal  
`export {no_proxy,NO_PROXY}="127.0.0.1,localhost"`

### Debug with VsCode

[VsCode](https://code.visualstudio.com/) debug configuration is available! In order to use it, you need the extension [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome).

Then set some breakpoints in your application's source code.

Finally from VsCode press **Ctrl+Shift+D** and select **Application Debug** and press **F5**.

Please note that Hot reload is only available in Renderer process.

[maintained-badge]: https://img.shields.io/badge/maintained-yes-brightgreen
[license-badge]: https://img.shields.io/badge/license-GNU-blue.svg
[license]: https://github.com/andersonmfjr/localize-tools/blob/main/LICENSE.md
[prs-badge]: https://img.shields.io/badge/PRs-welcome-red.svg
[prs]: http://makeapullrequest.com

[github-watch-badge]: https://img.shields.io/github/watchers/andersonmfjr/localize-tools.svg?style=social
[github-watch]: https://github.com/andersonmfjr/localize-tools/watchers
[github-star-badge]: https://img.shields.io/github/stars/andersonmfjr/localize-tools.svg?style=social
[github-star]: https://github.com/andersonmfjr/localize-tools/stargazers
