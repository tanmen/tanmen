export const postPickCountDescOrder = (a: PostCount, b: PostCount) => {
  if (a.count < b.count) {
    return 1;
  } else if (a.count > b.count) {
    return -1;
  }
  return 0;
};
