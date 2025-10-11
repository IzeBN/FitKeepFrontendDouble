// telegram.d.ts

export {}; // This ensures that this file is treated as a module

declare global {
  interface Window {
    Telegram: {
      WebApp: any;
    };
  }
}
