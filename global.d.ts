declare module "*.mp3" {
  const src: number; // Metro resolves to asset ID
  export default src;
}

declare module "*.png" {
  const src: number;
  export default src;
}
