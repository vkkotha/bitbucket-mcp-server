#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building project...');
execSync('npm run build', { stdio: 'inherit' });

console.log('\nCreating package...');
execSync('npm pack', { stdio: 'inherit' });

// Find and rename the generated tarball
const files = fs.readdirSync('.');
const tarball = files.find(f => f.startsWith('vkkotha-bitbucket-mcp-server') && f.endsWith('.tgz'));

if (tarball) {
  const newName = tarball.replace('vkkotha-', '');
  fs.renameSync(tarball, newName);
  console.log(`\n✓ Package created: ${newName}`);
} else {
  console.log('\n✓ Package created');
}
