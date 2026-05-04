import fs from 'fs';
import { execSync } from 'child_process';

// ✅ Ensure you are on master
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
if (branch !== 'master') {
  console.error(`🚫 You are on branch "${branch}". Switch to 'master' before releasing.`);
  process.exit(1);
}

// 🔧 Bump type
const type = process.argv[2];
if (!['patch', 'minor', 'major'].includes(type)) {
  console.error('Usage: ts-node scripts/release.ts [patch|minor|major]');
  process.exit(1);
}

// 📦 Version logic
const pkgPath = './package.json';
const changelogPath = './CHANGELOG.md';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
const [major, minor, patch] = pkg.version.split('.').map(Number);

let newVersion = '';
if (type === 'patch') newVersion = `${major}.${minor}.${patch + 1}`;
if (type === 'minor') newVersion = `${major}.${minor + 1}.0`;
if (type === 'major') newVersion = `${major + 1}.0.0`;

pkg.version = newVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

// 🔍 Get previous tag
let previousTag = '';
try {
  previousTag = execSync('git describe --tags --abbrev=0').toString().trim();
} catch {
  console.log('ℹ️ No previous tag found. Using all commits.');
}

// 📝 Generate changelog from commits
let log = '';
try {
  const range = previousTag ? `${previousTag}..HEAD` : '';
  log = execSync(`git log ${range} --pretty=format:"- %s"`).toString();
} catch {
  log = '- No commit messages found';
}

const now = new Date().toISOString().split('T')[0];
const entry = `\n## [v${newVersion}] - ${now}\n${log || '- No changes'}\n`;

let existing = '';
if (fs.existsSync(changelogPath)) {
  existing = fs.readFileSync(changelogPath, 'utf-8');
}
fs.writeFileSync(changelogPath, entry + '\n' + existing);

// ✅ Commit, tag, and push
execSync('git add package.json CHANGELOG.md', { stdio: 'inherit' });
execSync(`git commit -m "Release v${newVersion}"`, { stdio: 'inherit' });
execSync(`git tag v${newVersion}`, { stdio: 'inherit' });
execSync(`git push origin master --tags`, { stdio: 'inherit' });

console.log(`✅ Released v${newVersion} on branch "${branch}" with changelog.`);
