// eslint-disable-next-line eqeqeq
export const isEmpty = (data: unknown): boolean => {
  if (typeof data === 'object') {
    return Object.keys(data || {}).length === 0;
  } else {
    return !data;
  }
};
