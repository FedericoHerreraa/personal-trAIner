module.exports = {
    extends: ["eslint:recommended", "plugin:react/recommended"],
    rules: {
      "prettier/prettier": "off", // Apaga Prettier en ESLint
      "react/react-in-jsx-scope": "off", // Para evitar errores con React Native
    },
  };