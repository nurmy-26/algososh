import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // добавляем базовый URL, чтобы не писать его везде перед pathname
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
