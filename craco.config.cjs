const { resolve } = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@shared": resolve(__dirname, "src/shared"),
      "@features": resolve(__dirname, "src/features"),
      "@entities": resolve(__dirname, "src/entities"),
      "@app": resolve(__dirname, "src/app"),
    },
  },
  babel: {
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@": "./src",
            "@shared": "./src/shared",
            "@features": "./src/features",
            "@entities": "./src/entities",
            "@app": "./src/app",
          },
        },
      ],
    ],
  },
};
// Даня. Готово
