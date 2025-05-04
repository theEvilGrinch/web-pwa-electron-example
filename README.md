# JavaScript Calculator App - Electron

## Table of Contents

- [Description](#description)
- [Live Demo](#live-demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Available Scripts](#available-scripts)
  - [Build and Installation](#build-and-installation)
    - [1. Clone the Repository](#1-clone-the-repository)
    - [2. Install Dependencies](#2-install-dependencies)
    - [3. Build the Application](#3-build-the-application)
    - [4. Install the Application](#4-install-the-application)
- [License](#license)

## Description

This is a modern calculator built with HTML, CSS, JavaScript, and now extended with Electron for desktop application support. It features an adaptive design that responds to system color scheme preferences and provides a seamless user experience with enhanced accessibility.

It includes:
- Web version (available in the `main` branch).
- PWA version (available in the `PWA` branch).
- **Electron Desktop App** (this branch).

## Features

- Supports basic arithmetic operations: addition (+), subtraction (-), multiplication (*), and division (/).
- Advanced mathematical functions:
  - Square root (2√).
  - Exponentiation (^exponent).
  - Percentage calculations (%).
- Memory functions:
  - Add to memory (M+).
  - Subtract from memory (M-).
  - Recall memory (MR).
  - Clear memory (MC).
  - Visual memory value display.
- Smart system theme integration:
  - Automatically adapts to system color scheme preferences.
  - Manual theme toggle with smooth transitions.
  - Persistent theme selection.
- Enhanced user experience:
  - Input field with autofocus.
  - Support for both Enter and NumpadEnter keys.
  - Escape key support for clearing input.
  - Responsive design with fluid typography.
  - Clear visual feedback on button interactions.
  - Comprehensive error handling with modal dialogs.
- Accessibility features:
  - Semantic HTML structure.
  - Proper ARIA attributes.
  - Keyboard navigation support.
  - High contrast color scheme.
  - Screen reader friendly headings.
- Performance optimizations:
  - Preloaded stylesheets.
  - Modern CSS features utilization.

## Technologies Used

The application utilizes the following technologies:

- **HTML5 with semantic markup**: Structure of the application.
- **CSS3/SCSS**: Styling and responsive design.
  - Custom mixins and variables.
  - Modular architecture.
  - Modern CSS features.
- **JavaScript (ES6+)**: Core logic for the calculator.
  - Event Delegation.
  - Modern DOM APIs.
  - Error Handling.
  - Regular Expressions.
- **Node.js**: Development environment and build tools.
- **npm**: Dependency management and script execution.
- **Electron**: Desktop application framework.
- **Electron Builder**: Cross-platform build and packaging for Electron apps.
- **ESBuild**: Bundler for JavaScript files.

## Project Structure

```
calculator-web-pwa-electron/
├── assets/                             # Static assets
│   ├── color-palette.svg               # Theme toggle icon
│   └── fonts/                          # Web fonts in WOFF2 format
├── build/                              # Build artifacts and configuration files
│   ├── calculator.desktop              # Desktop entry file for Linux
│   ├── icon-{sizes}.png                # Various icon sizes for Electron
│   ├── icon.ico                        # Windows icon
│   ├── icon.icns                       # macOS icon
│   └── other electron specific files
├── src/                                # Source code for the application
│   ├── main.electron.js                # Electron main process file
│   ├── main.js                         # Main JavaScript logic for the application
│   ├── styles/                         # SCSS stylesheets for the application
│   └── index.html                      # HTML entry point for the application
├── LICENSE                             # License file
├── build.config.js                     # Build configuration file for the web version
├── build.js                            # Build script for the web version
├── package.json                        # Project metadata and dependencies
├── README.md                           # Project documentation
└── watch.js                            # File watcher script for development
```

## Development

### Prerequisites

- Node.js v23.4.0
- npm v11.1.0
- Development Dependencies:
  - `@stylistic/stylelint-plugin`: v3.1.2
  - `concurrently`: v9.1.2
  - `del`: v8.0.0
  - `electron`: v31.0.0
  - `electron-builder`: v26.0.12
  - `electronmon`: v2.0.3
  - `esbuild`: v0.25.0
  - `eslint`: v9.22.0
  - `fs-extra`: v11.3.0
  - `globals`: v16.0.0
  - `html-minifier-terser`: v7.2.0
  - `png2icons`: v2.0.1
  - `postcss-scss`: v4.0.9
  - `sass`: v1.85.1
  - `sharp`: v0.34.1
  - `stylelint`: v16.16.0

### Available Scripts

- `build`: Builds the project using `build.js`.
- `build:electron`: Builds the Electron application for the current operating system.
- `build:electron-cross-platform`: Builds the Electron application for Windows, macOS, and Linux.
- `icons`: Generates icons for macOS, Windows, and Linux platforms using `generate-icons.js`.
- `start:electron`: Starts the application with live reload using `electronmon`.
- `watch`: Watches for changes in the source files.
- `clean:build`: Cleans the build directory except essential files.
- `clean:dist`: Cleans the `dist/` directory.
- `clean:local_cache`: Removes the local Electron cache.
- `stylelint:fix`: Fixes SCSS styling issues.
- `eslint:fix`: Fixes JavaScript issues.

### Build and Installation

To build and install the application, follow these steps based on your operating system:

#### 1. Clone the Repository
First, clone the repository to your local machine:
```bash
git clone https://github.com/theEvilGrinch/calculator-web-pwa-electron.git
cd calculator-web-pwa-electron
```

#### 2. Install Dependencies
Before building, ensure all dependencies are installed:
```bash
npm install
```

> **Note**: Additional system dependencies may be required for building the application on specific platforms:
> - On **Linux**:
>   - `gtk3` for graphical components.
>   - `libxcrypt-compat` for building `.deb` packages.
> - On **Linux** (for cross-platform builds targeting Windows):
>   - `wine` is required to build `.exe` files for Windows.

#### 3. Build the Application
- **Single-Platform Build**: To build the application for the operating system you are currently using, run:
  ```bash
  npm run build:electron
  ```
  This will generate a platform-specific build (e.g., an `.exe` for Windows, a `.zip` for macOS, or a `.deb` for Linux) in the `build/` directory.

- **Cross-Platform Build**: To create builds for all supported platforms (Windows, macOS, and Linux), run:
  ```bash
  npm run build:electron-cross-platform
  ```
  This will produce the following files in the `build/` directory:
  - **Windows**: `calculator Setup <version>.exe` (installer).
  - **macOS**: `calculator-<version>-mac.zip` (archive).
  - **Linux**:
    - `.deb` package for Debian-based distributions.
    - `.AppImage` for universal Linux usage.

#### 4. Install the Application
After building, follow the instructions below to install the application depending on your operating system:

**Linux (`AppImage` or `.deb`)**
1. **For `.AppImage`**:
   - Copy the following files from the `build/` directory:
     - `calculator.desktop` to `~/.local/share/applications/` (or any other directory where your system stores application shortcuts).
     - `icon-256x256.png` to your preferred location for icons.
     - `calculator-<version>.AppImage` to your desired application directory.
   - Edit the `calculator.desktop` file and replace the placeholders:
     - Replace `<PATH_TO_ICON>` with the full path to the copied `icon-256x256.png`.
     - Replace `<PATH_TO_APPIMAGE>` with the full path to `calculator-<version>.AppImage`.
   - Refresh your desktop environment to register the new application.
   - Make the `.AppImage` file executable:
     ```bash
     chmod +x calculator-<version>.AppImage
     ```
   - Run the file to launch the application:
     ```bash
     ./calculator-<version>.AppImage
     ```
2. **For `.deb`**:
   - Install the package:
     ```bash
     sudo dpkg -i calculator-<version>.deb
     ```

**Windows (`.exe`)** <br>
Double-click the `.exe` installer in the `build/` directory and follow the on-screen instructions to complete the installation.

**macOS (`.zip`)**<br>
Extract the `.zip` file and move the application to your `Applications` folder.

**Note:** Replace `<version>` with the actual version number of the generated files.

## Live Demo

Try the calculator here: [Live PWA Demo](https://theevilgrinch.github.io/calculator-web-pwa-electron/).

## License

MIT Licensed - See [LICENSE](LICENSE) for details.

---

⚡ Maintained by [@theEvilGrinch](https://github.com/theEvilGrinch).
