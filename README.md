# JavaScript calculator app 

## Description
This is a modern calculator built with HTML, CSS, and JavaScript. It features an adaptive design that responds to system color scheme preferences and provides a seamless user experience with enhanced accessibility and performance optimizations. The calculator is a multi-platform application. <br>
It includes:  
- Web version (`main` branch)  
- PWA version (`pwa` branch)  

[//]: # (- Electron desktop app &#40;`electron` branch&#41;.)

## Features
- Supports basic arithmetic operations: addition (+), subtraction (-), multiplication (*), and division (/)
- Advanced mathematical functions:
  - Square root (√)
  - Exponentiation (with visual num^exponent notation)
  - Percentage calculations (%)
- Memory functions:
  - Add to memory (M+)
  - Subtract from memory (M-)
  - Recall memory (MR)
  - Clear memory (MC)
  - Visual memory value display
- Smart system theme integration:
  - Automatically adapts to system color scheme preferences
  - Manual theme toggle with smooth transitions
  - Persistent theme selection
- Enhanced user experience:
  - Input field with autofocus
  - Support for both Enter and NumpadEnter keys
  - Escape key support for clearing input
  - Responsive design with fluid typography
  - Clear visual feedback on button interactions
  - Comprehensive error handling with modal dialogs
- Accessibility features:
  - Semantic HTML structure
  - Proper ARIA attributes
  - Keyboard navigation support
  - High contrast color scheme
  - Screen reader friendly headings
- Performance optimizations:
  - Preloaded stylesheets
  - Optimized font loading with WOFF2 format
  - Fallback font strategies
  - Efficient CSS reset
  - Modern CSS features utilization

## Technologies Used

The application utilizes the following technologies:

- **HTML5 with semantic markup**: Structure of the web application.
- **CSS3/SCSS**: Styling and responsive design
  - Custom mixins and variables
  - Modular architecture
  - Modern CSS features.
- **JavaScript (ES6+)**: Core logic for the calculator
  - Event Delegation
  - Modern DOM APIs
  - Error Handling
  - Regular Expressions.
- **Node.js**: Development environment and build tools.
- **npm**: Dependency management and script execution.
- **Progressive Web App (PWA)**: Add offline capabilities, app-like behavior, and installable features.
- **Service Workers**: Enable caching and offline functionality.
- **Web App Manifest**: Define metadata for the PWA, such as icons and theme colors.
- **Sharp**: Image optimization for faster loading times.
- **SVGO**: Optimizes SVG files for performance.
- **BrowserSync**: Development server with hot reload.
- **ESLint**: JavaScript code linting.
- **Stylelint**: SCSS code linting.
- **HTML Minifier**: Minifies HTML files for optimized builds.
- **ESBuild**: Bundler for main JavaScript and Service Worker files.

## Project Structure
```
.
├── assets/                             # Static assets
│   ├── manifest.webmanifest            # Web App Manifest for PWA configuration.
│   ├── fonts/                          # Web fonts in WOFF2 format
│   └── img/                            # Images and icons
│       ├── favicon.ico                 # Basic favicon for legacy browsers
│       ├── favicon.svg                 # Vector favicon for modern browsers
│       ├── favicon-16x16.png           # Classic favicon for legacy compatibility
│       ├── favicon-32x32.png           # Enhanced favicon for high-DPI displays
│       ├── favicon-48x48.png           # Windows pinned site tile
│       ├── apple-touch-icon.png        # iOS home screen icon (180x180)
│       ├── icon-192.png                # PWA icon for Android devices
│       ├── icon-512.png                # PWA splash screen icon
│       ├── icon-mask.png               # Adaptive PWA icon with safe zone (512x512)
│       ├── color-palette.svg           # Theme toggle icon
│       ├── screenshot-desktop.png      # Screenshot of the app in desktop view.
│       ├── screenshot-mobile.png       # Screenshot of the app in mobile view (dark theme).
│       ├── screenshot-mobile-light.png # Screenshot of the app in mobile view (light theme).
│       └── screenshot-tablet.png       # Screenshot of the app in tablet view.
├── src/                   
│   ├── styles/            
│   │   ├── core/                       # Core SCSS modules
│   │   │   ├── _mixins.scss            # Reusable mixins (e.g., flex-text, visually-hidden)
│   │   │   ├── _variables.scss         # Global variables (e.g., colors, fonts)
│   │   │   └── _index.scss             # Core modules entry point
│   │   ├── _custom.scss                # Custom styles and components
│   │   ├── _fonts.scss                 # Font-face declarations
│   │   └── main.scss                   # Main SCSS entry point
│   ├── index.html                      # Main HTML file
│   ├── 404.html                        # Custom 404 error page.
│   ├── no-data-error.html              # Error page for handling "no data" scenarios.
│   ├── manifest.webmanifest            # PWA manifest file
│   ├── service-worker.js               # Service Worker for PWA offline support.
│   └── main.js                         # JavaScript logic
├── open-incognito-chromium.zsh         # Script to open Chromium in incognito mode with BrowserSync.
├── open-incognito-firefox.zsh          # Script to open Firefox developer edition in incognito mode with BrowserSync.
├── .stylelintrc.json                   # Stylelint configuration for SCSS linting.
├── eslint.config.js                    # ESLint configuration for JavaScript linting.
├── build.config.js                     # Build configuration for bundling and optimization.
├── build.js                            # Main build script.
├── watch.js                            # File watcher script for development.
├── package.json                        # Project configuration and dependencies
├── package-lock.json                   # Lock file for consistent dependency versions.
├── LICENSE                             # License file for the project.
└── README.md                           # Project documentation
```

## Development

### Prerequisites

- Node.js v23.4.0
- npm v11.1.0
- Development Dependencies:
  - @stylistic/stylelint-plugin v3.1.2
  - browser-sync v3.0.3
  - esbuild v0.25.0
  - eslint v9.22.0
  - fs-extra v11.3.0
  - globals v16.0.0
  - html-minifier-terser v7.2.0
  - sharp v0.34.1
  - svgo v3.3.2
  - postcss-scss v4.0.9
  - sass v1.85.1
  - stylelint v16.16.0

### Available Scripts
- `npm run BUILD` - Create production build
- `npm run WATCH` - Start development server with hot reload
- `npm run CLEAN` - Clean dist directory
- `npm run STYLELINT:FIX` - Fix SCSS styling issues
- `npm run ESLINT:FIX` - Fix JS issues
- `npm run deploy` - Deploy the application
- `npm run predeploy` - Prepare the application for deployment

## Live Demo
Try the calculator here: [Live Demo](https://theevilgrinch.github.io/js-calculator-app/)

## ⚖️ License

MIT Licensed - See [LICENSE](LICENSE) for details.

---

⚡ Maintained by [@theEvilGrinch](https://github.com/theEvilGrinch)