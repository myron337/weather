import { BASE_PATH } from "@/constants/basePath";

/** Prefixes a path from /public with the app's basePath (needed for GitHub Pages). */
export const asset = (path: string): string =>
  path.startsWith("/") && !path.startsWith(BASE_PATH + "/") ? BASE_PATH + path : path;
