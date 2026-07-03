import fs from 'fs';

const filePath = 'd:\\CochinSnacks\\cochin-snacks\\app\\HomeClient.tsx';

try {
  console.log(`Reading ${filePath}...`);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Replace imports from 'framer-motion'
  // Matches e.g. import { motion, AnimatePresence } from 'framer-motion'
  content = content.replace(/import\s+\{\s*motion/g, 'import { m');

  // 2. Replace opening JSX tags: <motion.xxx -> <m.xxx
  content = content.replace(/<motion\.([a-zA-Z0-9]+)/g, '<m.$1');

  // 3. Replace closing JSX tags: </motion.xxx> -> </m.xxx>
  content = content.replace(/<\/motion\.([a-zA-Z0-9]+)>/g, '</m.$1>');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Successfully refactored ${filePath} to use lightweight m components!`);
} catch (err) {
  console.error(`❌ Error refactoring ${filePath}:`, err);
}
