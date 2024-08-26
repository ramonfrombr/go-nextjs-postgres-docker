export const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
export const oneWeekFromNow = new Date(
  new Date().setDate(new Date().getDate() + 7)
);
