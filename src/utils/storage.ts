export const saveToLocalStorage = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = <T>(key: string): T | null => {
  const json = localStorage.getItem(key);
  return json ? (JSON.parse(json) as T) : null;
};
