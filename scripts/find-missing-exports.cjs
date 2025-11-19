const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const componentsDir = path.join(root, 'src', 'components');
const indexFile = path.join(root, 'src', 'index.ts');

function listComponentFolders(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    return entries
        .filter((e) => e.isDirectory())
        .map((d) => d.name)
        .filter(Boolean);
}

function hasIndexFile(componentName) {
    const p = path.join(componentsDir, componentName);
    const files = fs.readdirSync(p);
    return files.some((f) => /^index\.(ts|tsx)$/.test(f));
}

function getImplementedComponents() {
    const folders = listComponentFolders(componentsDir);
    return folders.filter((f) => {
        try {
            return hasIndexFile(f);
        } catch (_) {
            return false;
        }
    });
}

function getExportedComponents() {
    const content = fs.readFileSync(indexFile, 'utf8');
    const regex = /\.\/components\/(\w+)/g;
    const set = new Set();
    let m;
    while ((m = regex.exec(content)) !== null) {
        set.add(m[ 1 ]);
    }
    return Array.from(set);
}

function main() {
    const implemented = getImplementedComponents().sort();
    const exported = getExportedComponents().sort();

    const missing = implemented.filter((c) => !exported.includes(c));

    const report = { implementedCount: implemented.length, exportedCount: exported.length, implemented, exported, missing };
    console.log(JSON.stringify(report, null, 2));
}

main();
