module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
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
};
