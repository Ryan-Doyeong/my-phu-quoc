#!/usr/bin/env node
/**
 * scripts/convert_to_webp.mjs
 * Claude 6차 지시서 - 상시 WebP 변환 스크립트 (Ryan 지시)
 *
 * 사용법:
 *   node scripts/convert_to_webp.mjs --hero <원본이미지경로> <출력폴더>
 *   node scripts/convert_to_webp.mjs --dir <폴더경로>
 *   node scripts/convert_to_webp.mjs <입력파일> <출력파일.webp>
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

async function convertFile(inputPath, outputPath, options = {}) {
  const { width = null, quality = 82 } = options;
  const origStats = fs.statSync(inputPath);
  
  let pipeline = sharp(inputPath);
  if (width) {
    pipeline = pipeline.resize({ width, withoutEnlargement: true });
  }
  
  pipeline = pipeline.webp({ quality, effort: 6 });
  
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  await pipeline.toFile(outputPath);
  
  const newStats = fs.statSync(outputPath);
  const reduction = (((origStats.size - newStats.size) / origStats.size) * 100).toFixed(1);
  
  console.log(`[WebP] ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
  console.log(`       ${formatBytes(origStats.size)} -> ${formatBytes(newStats.size)} (-${reduction}%)`);
  return {
    originalFile: path.basename(inputPath),
    originalSize: origStats.size,
    outputFile: path.basename(outputPath),
    outputSize: newStats.size,
    reduction: `${reduction}%`
  };
}

async function convertHero(inputPath, outputDir) {
  const baseName = path.basename(inputPath, path.extname(inputPath));
  const sizes = [
    { width: 640, suffix: '_640' },
    { width: 1280, suffix: '_1280' },
    { width: 1920, suffix: '_1920' },
  ];
  
  const results = [];
  for (const s of sizes) {
    const outName = `${baseName}${s.suffix}.webp`;
    const outPath = path.join(outputDir, outName);
    const res = await convertFile(inputPath, outPath, { width: s.width, quality: 82 });
    results.push(res);
  }
  return results;
}

async function convertDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  const results = [];
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const inputPath = path.join(dirPath, file);
      const outPath = path.join(dirPath, `${path.basename(file, ext)}.webp`);
      const res = await convertFile(inputPath, outPath, { quality: 82 });
      results.push(res);
    }
  }
  return results;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log("사용법: node scripts/convert_to_webp.mjs [--hero|--dir] <경로> [출력경로]");
    process.exit(1);
  }

  if (args[0] === '--hero') {
    const input = args[1];
    const outDir = args[2] || 'public/hero';
    console.log(`=== 히어로 3종 WebP 변환: ${input} ===`);
    const res = await convertHero(input, outDir);
    console.table(res);
  } else if (args[0] === '--dir') {
    const dir = args[1];
    console.log(`=== 디렉토리 내 이미지 WebP 변환: ${dir} ===`);
    const res = await convertDirectory(dir);
    console.table(res);
  } else {
    const input = args[0];
    const output = args[1] || `${path.basename(input, path.extname(input))}.webp`;
    const res = await convertFile(input, output);
    console.table([res]);
  }
}

main().catch(err => {
  console.error("변환 실패:", err);
  process.exit(1);
});
