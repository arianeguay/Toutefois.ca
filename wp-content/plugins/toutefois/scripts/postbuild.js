/* Cross-platform postbuild: copy only PHP files from src to build */
const path = require('path');
const fs = require('fs');
const cpr = require('cpr');

const srcDir = path.resolve(__dirname, '..', 'src');
const destDir = path.resolve(__dirname, '..', 'build');

// Ensure destination exists
fs.mkdirSync(destDir, { recursive: true });

// Use a function filter to avoid shell/glob differences
// Allow directories (so traversal continues), copy only *.php files
const filter = (fullPath) => {
  try {
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) return true; // allow traversal
  } catch (_) {
    // If stat fails, default to include to avoid skipping traversal
    return true;
  }
  return /\.php$/i.test(fullPath);
};

cpr(srcDir, destDir, { overwrite: true, filter }, (err, files) => {
  if (err) {
    console.error('[postbuild] cpr failed:', err);
    process.exit(1);
  }
  // Optional log
  if (Array.isArray(files)) {
    const count = files.filter((f) => /\.php$/i.test(f)).length;
    console.log(`[postbuild] Copied ${count} PHP file(s) from src to build.`);
  } else {
    console.log('[postbuild] Copy complete.');
  }
});
