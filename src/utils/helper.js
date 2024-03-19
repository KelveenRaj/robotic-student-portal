export const jsonParseFromStorage = (key) => {
  let token;
  if (!key) {
    return;
  }
  try {
    token = JSON.parse(localStorage.getItem(key));
  } catch (error) {
    //
  }
  return token;
};
