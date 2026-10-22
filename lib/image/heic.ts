// @ts-ignore
import convert from 'heic-convert';

export async function convertHeicToJpeg(buffer: Buffer): Promise<Buffer> {
  try {
    const jpegBuffer = await convert({
      buffer,
      format: 'JPEG',
      quality: 1
    });
    // heic-convert returns ArrayBuffer or Buffer depending on version, ensure Buffer
    return Buffer.from(jpegBuffer as any);
  } catch (err: any) {
    throw new Error('Unable to process HEIC file. Please upload a standard JPG/PNG or try another photo.');
  }
}
