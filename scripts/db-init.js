const { execSync } = require('child_process');
const path = require('path');

async function initDatabase() {
  try {
    console.log('[v0] Initializing database...');
    
    // Generate Prisma client
    console.log('[v0] Generating Prisma client...');
    try {
      execSync('npx prisma generate', { cwd: path.dirname(__dirname), stdio: 'inherit' });
      console.log('[v0] ✓ Prisma client generated');
    } catch (err) {
      console.warn('[v0] Could not generate Prisma client:', err.message);
    }

    // Run migrations
    console.log('[v0] Running database migrations...');
    try {
      execSync('npx prisma migrate deploy', { cwd: path.dirname(__dirname), stdio: 'inherit' });
      console.log('[v0] ✓ Database migrations applied');
    } catch (err) {
      // Migration might fail if already applied or database not ready
      console.warn('[v0] Could not apply migrations:', err.message);
      console.log('[v0] Attempting to push schema...');
      try {
        execSync('npx prisma db push --skip-generate', { cwd: path.dirname(__dirname), stdio: 'inherit' });
        console.log('[v0] ✓ Database schema pushed');
      } catch (err2) {
        console.error('[v0] Could not initialize database:', err2.message);
      }
    }
  } catch (error) {
    console.error('[v0] Database initialization error:', error);
  }
}

initDatabase();
