const { exec } = require('child_process');
const path = require('path');

async function runMigrations() {
  console.log('[v0] Starting database migrations...');
  
  return new Promise((resolve, reject) => {
    const command = 'npx prisma migrate deploy --skip-generate';
    
    exec(command, { cwd: path.resolve(__dirname, '..') }, (error, stdout, stderr) => {
      if (error) {
        // If migrate deploy fails, try db push which works for development
        console.log('[v0] Migrate deploy failed, trying db push...');
        exec('npx prisma db push --skip-generate', { cwd: path.resolve(__dirname, '..') }, (error2, stdout2, stderr2) => {
          if (error2) {
            console.error('[v0] Migration failed:', error2.message);
            reject(error2);
          } else {
            console.log('[v0] ✓ Database schema updated with db push');
            console.log(stdout2);
            resolve();
          }
        });
      } else {
        console.log('[v0] ✓ Migrations applied successfully');
        console.log(stdout);
        resolve();
      }
    });
  });
}

runMigrations()
  .then(() => {
    console.log('[v0] Database ready');
    process.exit(0);
  })
  .catch((error) => {
    console.error('[v0] Database setup failed:', error);
    process.exit(1);
  });
