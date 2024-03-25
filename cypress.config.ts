import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // добавляем базовый URL, чтобы не писать его везде перед pathname
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1440,
    viewportHeight: 900,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
