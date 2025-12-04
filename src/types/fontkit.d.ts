declare module "fontkit" {
  interface FontInfo {
    postscriptName?: string;
  }

  export function create(buffer: Buffer | Uint8Array): FontInfo;
}
