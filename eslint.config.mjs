// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [...compat.extends("next/core-web-vitals")];

// export default eslintConfig;


// 

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FlatCompat is used for compatibility with the older ESLint configurations
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Extending Next.js recommended ESLint configuration
const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    parser: "@babel/eslint-parser", // Setting the parser to Babel's ESLint parser
    parserOptions: {
      requireConfigFile: false, // For projects without a Babel config file
      babelOptions: {
        presets: ["@babel/preset-react"], // React preset for JSX parsing
      },
    },
    env: {
      browser: true,
      node: true,
      es2021: true, // ECMAScript 2021 support
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
    ],
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
  },
];

export default eslintConfig;
