# Phone Catalog

## Overview

Phone Catalog is a frontend application for browsing phones, tablets, and accessories. Users can explore the catalog, change the order of products, navigate through pages, view product information, and add items to their cart or favorites.

The interface follows the [Original Figma design](<https://www.figma.com/file/T5ttF21UnT6RRmCQQaZc6L/Phone-catalog-(V2)-Original>). The application is built with React and TypeScript, with SCSS Modules used to organize component styles.

Product information is loaded from local JSON files using the Fetch API. Images, fonts, and product data are included in the project, so no separate backend setup is required.

## Demo

[Open the live catalog](https://vadym-fe.github.io/phone-catalog/)

## Key Features

- **Product Categories:** Browse separate catalog pages for phones, tablets, and accessories. Each category displays the corresponding products.

- **Sorting and Pagination:** Change the product order using the sorting dropdown, choose how many products to display, and navigate between catalog pages.

- **Product Cards:** View product images, names, prices, and key information. Open the details page or add a product to the cart or favorites.

- **Product Details:** Open a dedicated page for a selected product and explore its information before adding it to the cart.

- **Shopping Cart:** Add products while browsing and review selected items on a separate cart page.

- **Favorites:** Mark products as favorites and access them together on the favorites page.

- **Client-Side Navigation:** Move between application pages using React Router. Hash-based routing supports navigation when the application is hosted on GitHub Pages.

- **Loading Feedback:** A reusable loading component provides feedback while product data is being retrieved.

- **Not Found Page:** A dedicated fallback page handles unsupported application routes.

- **Responsive Layout:** The interface adapts to desktop and mobile screen sizes.

## Development Challenges

### Shared Application State

Different pages and components need access to common application data. The project uses React Context, a `ProductsProvider`, and a custom `useProductsContext` hook to provide access to shared state.

### Reusable Components and Feature Organization

The application is organized into page modules and shared components. Product cards, product lists, sliders, navigation, and loading indicators can be reused across the interface.

This structure separates page-specific functionality from common UI elements and makes the project easier to maintain.

### TypeScript and SCSS Modules

Component styles are isolated with SCSS Modules. TypeScript is configured with Vite client types so stylesheet imports are recognized during development and type checking.

### Deployment and Asset Paths

The application is hosted under the `/phone-catalog/` path on GitHub Pages. Vite's base path and public asset references are configured for this location.

Font and dropdown icon paths were adjusted to work in the production build. Hash-based routing allows application pages to be opened and refreshed on static hosting.

## Installation & Setup

### Requirements

- Node.js
- npm

The project was verified locally using Node.js 24.12.0.

### Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Vadym-fe/phone-catalog.git
   ```

2. Navigate to the project directory:

   ```bash
   cd phone-catalog
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open the local URL displayed in the terminal.

### Available Commands

| Command | Description |
| --- | --- |
| `npm start` | Start the local development server |
| `npx tsc --noEmit` | Check TypeScript types without generating files |
| `npm run lint` | Format source files and run JavaScript, TypeScript, and SCSS linters |
| `npm run build` | Generate a production build in `dist` |
| `npm run deploy` | Build and publish the application to GitHub Pages |

## Technologies Used

| Technology | Purpose |
| --- | --- |
| React | Component-based user interface |
| TypeScript | Type checking for components, data, and application logic |
| React Router | Client-side navigation using `HashRouter` |
| React Context API | Shared application state |
| SCSS and CSS Modules | Component styling and scoped class names |
| Fetch API | Loading product information from JSON files |
| Vite | Development server and production builds |
| ESLint | JavaScript and TypeScript linting |
| Stylelint | SCSS linting |
| Prettier | Source code formatting |
| npm | Dependency management and project scripts |
| GitHub Pages | Hosting the deployed application |

## Project Structure

- `src/api` — functions for loading product data
- `src/context` — context definitions and providers
- `src/hook` — custom React hooks
- `src/modules` — application pages and shared UI components
- `src/types` — TypeScript data types
- `src/utils` — utility functions
- `public/api` — product datasets in JSON format
- `public/img` — product images and interface assets
- `public/fonts` — locally hosted Mont fonts
