import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

console.log('Generating Prisma client...');
try {
  execSync('npx prisma generate', {
    cwd: projectRoot,
    stdio: 'inherit'
  });
  console.log('✓ Prisma client generated successfully');
} catch (error) {
  console.error('✗ Error generating Prisma client:', error.message);
  process.exit(1);
}
