export const safeJsonParse = <T>(json: string): T => {
  try {
    return JSON.stringify(json) as T;
  } catch (e) {
    throw new Error('[safeJsonParse] : ' + JSON.stringify(e));
  }
};
