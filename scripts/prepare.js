const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');

function prepare() {
  const envPath = path.resolve(ROOT, '.env');
  const envLocalPath = path.resolve(ROOT, '.env.local');

  if (!fs.existsSync(envLocalPath)) {
    return;
  }

  if (fs.existsSync(envPath)) {
    return;
  }

  fs.cpSync(envLocalPath, envPath);
}

function husky() {
  spawnSync('pnpx', ['husky']);
}

prepare();
husky();
