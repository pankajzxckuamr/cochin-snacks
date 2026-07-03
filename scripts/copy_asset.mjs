import fs from 'fs';

const source = 'C:\\Users\\panka\\.gemini\\antigravity-ide\\brain\\0e3325a6-53ab-4ee9-9008-0dff3de404f9\\product_family_1782396871806.png';
const dest = 'd:\\CochinSnacks\\cochin-snacks\\public\\product-family.png';

try {
  console.log('Reading source file...');
  const buffer = fs.readFileSync(source);
  console.log(`Read ${buffer.length} bytes. Writing to destination...`);
  fs.writeFileSync(dest, buffer);
  console.log('✅ Successfully copied product-family image!');
} catch (err) {
  console.error('❌ Error copying product-family image:', err);
}
