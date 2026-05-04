export const isBrowser = typeof window !== 'undefined';

export const getWindow = () => {
  if (!isBrowser) {
    return {
      innerHeight: 0,
      innerWidth: 0,
      addEventListener: () => {},
      removeEventListener: () => {},
    };
  }
  return window;
};

export const getDocument = () => {
  if (!isBrowser) {
    return {
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    };
  }
  return document;
}; 