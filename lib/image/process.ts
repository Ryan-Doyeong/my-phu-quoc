import sharp from 'sharp'

export interface ProcessedImage {
  buffer: Buffer;
  suffix: string;
  contentType: string;
}

export async function processUpload(fileBuffer: Buffer): Promise<ProcessedImage[]> {
  // auto-rotate based on EXIF, strip metadata
  const base = sharp(fileBuffer).rotate();
  
  // We don't want to upscale. We can use withoutEnlargement
  const makeSize = async (width: number, suffix: string, quality: number): Promise<ProcessedImage> => {
    const buffer = await base.clone()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();
      
    return {
      buffer,
      suffix,
      contentType: 'image/webp'
    };
  }

  const thumb = await makeSize(480, '-thumb.webp', 72);
  const card = await makeSize(960, '-card.webp', 76);
  const full = await makeSize(1600, '-full.webp', 80);

  return [thumb, card, full];
}
