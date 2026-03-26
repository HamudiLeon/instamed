export const preloadImage = (src?: string) => {
  if (!src) return;
  const image = new Image();
  image.src = src;
};
