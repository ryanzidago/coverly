export function debounce(func, delayInMs = 1000) {
  let timeoutId;
  return function (...params) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...params);
    }, delayInMs);
  };
}
