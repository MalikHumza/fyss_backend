export function isObject(obj: object | any) {
  return typeof obj === "object" && !Array.isArray(obj) && obj !== null;
}
