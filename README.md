# Simple JavaScript Calculator

## Description
This is a modern calculator built using HTML, CSS, and JavaScript. It features an adaptive design that responds to system color scheme preferences and provides a seamless user experience with enhanced accessibility and performance optimizations.

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
- HTML5 with semantic markup
- Sass (SCSS)
  - Custom mixins and variables
  - Modular architecture
  - Modern CSS features
- JavaScript (ES6+)
  - Event Delegation
  - Modern DOM APIs
  - Error Handling
  - Regular Expressions
- Build System
  - esbuild for JS/CSS minification
  - Sass compilation
  - HTML minification
  - Development server with hot reload

## Project Structure
```
.
├── assets/                            # Static assets
│   ├── fonts/                         # Web fonts in WOFF2 format
│   └── img/                           # Images and icons
│       ├── favicon.ico                # Basic favicon for legacy browsers
│       ├── favicon.svg                # Vector favicon for modern browsers
│       ├── favicon-16x16.png          # Classic favicon for legacy compatibility
│       ├── favicon-32x32.png          # Enhanced favicon for high-DPI displays
│       ├── favicon-48x48.png          # Windows pinned site tile
│       ├── apple-touch-icon.png       # iOS home screen icon (180x180)
│       ├── icon-192.png               # PWA icon for Android devices
│       ├── icon-512.png               # PWA splash screen icon (512x512)
│       ├── icon-mask.png              # Adaptive PWA icon with safe zone
│       └── color-palette.svg          # Theme toggle icon
├── src/
│   ├── styles/
│   │   ├── core/                      # Core SCSS modules
│   │   │   ├── _mixins.scss           # Reusable mixins (flex-text, visually-hidden)
│   │   │   ├── _variables.scss        # Global variables (colors, fonts)
│   │   │   └── _index.scss            # Core modules entry point
│   │   ├── _custom.scss               # Custom styles and components
│   │   ├── _fonts.scss                # Font-face declarations
│   │   └── main.scss                  # Main SCSS entry point
│   ├── index.html                     # Main HTML file
│   ├── manifest.webmanifest           # PWA manifest file
│   └── main.js                        # JavaScript logic
├── package.json                       # Project configuration and dependencies
└── README.md                          # Project documentation
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
  - npm-run-all v4.1.5
  - npm-watch v0.13.0
  - postcss-scss v4.0.9
  - sass v1.85.1
  - stylelint v16.16.0

### Available Scripts
- `npm run BUILD` - Create production build
- `npm run WATCH` - Start development server with hot reload
- `npm run CLEAN` - Clean dist directory
- `npm run STYLELINT:FIX` - Fix SCSS styling issues

## Live Demo
Try the calculator here: [Live Demo](https://theevilgrinch.github.io/web-pwa-electron-example/)

## ⚖️ License

MIT Licensed - See [LICENSE](LICENSE) for details.

---

⚡ Maintained by [@theEvilGrinch](https://github.com/theEvilGrinch)
