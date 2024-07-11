import { LogLevel } from "./logger";

export const APP_ENV =
  process.env.REACT_APP_APP_ENV === "production" ? "production" : "development"

export const LOG_LEVEL = APP_ENV === "production" ? "warn" : "log"
