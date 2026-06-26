import fs from 'fs';

const assets = [
  {
    src: 'C:\\Users\\panka\\.gemini\\antigravity-ide\\brain\\0e3325a6-53ab-4ee9-9008-0dff3de404f9\\og_image_1782378168096.png',
    dest: 'd:\\CochinSnacks\\cochin-snacks\\public\\og-image.png'
  },
  {
    src: 'C:\\Users\\panka\\.gemini\\antigravity-ide\\brain\\0e3325a6-53ab-4ee9-9008-0dff3de404f9\\default_snack_1782386778448.png',
    dest: 'd:\\CochinSnacks\\cochin-snacks\\public\\default-snack.png'
  }
];

for (const asset of assets) {
  try {
    console.log(`Copying from ${asset.src} to ${asset.dest}...`);
    const buffer = fs.readFileSync(asset.src);
    fs.writeFileSync(asset.dest, buffer);
    console.log(`✅ Successfully copied ${asset.dest}`);
  } catch (err) {
    console.error(`❌ Error copying asset:`, err);
  }
}
