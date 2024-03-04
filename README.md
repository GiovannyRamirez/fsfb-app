# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# How to use

1. First of all you need to create an **_.env_** file and configure enviroment variables:

   - VITE_BACKEND_API = https://fsfb-server.up.railway.app/

2. After that, you have to install dependendecies with `npm install`.

3. Finally, you have to run server with `npm run dev` if you want to make changes and see it.

4. Open browser with local host address shown in console.

# Dependencies used

- **_mui_**: To use components already designed
- **_axios_**: To make HTTP request and intercept responses
- **_react-router-dom_**: Used to navigate between pages
- **_zod_**: Used to validate reguster/login users and product forms

# Comments

- App was developed to support responsive design.

# Demo
![FSFBDemo](https://github.com/GiovannyRamirez/fsfb-app/assets/62915328/aeb9bf59-06c4-4e71-9c00-c23061e894ca)


