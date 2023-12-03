import { mod } from "./deps.ts";

mod.setup({
  handlers: {
    console: new mod.handlers.ConsoleHandler("DEBUG"),
  },

  loggers: {
    default: {
      level: "INFO",
      handlers: ["console"],
    },
  },
});

export const logger = mod.getLogger();
