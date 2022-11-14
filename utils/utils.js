export const removeStatus = (status, from) => {
  return from?.filter((e) => e !== status);
};
