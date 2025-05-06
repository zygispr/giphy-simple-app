export const devLoggerMiddleware = (store: any) => (next: any) => (action: any) => {
  console.group(action.type);
  console.info("dispatching", action);
  console.log("previous state", store.getState());
  const result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};
