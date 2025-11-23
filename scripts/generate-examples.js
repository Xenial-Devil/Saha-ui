const fs = require('fs');
const path = require('path');

const componentsDir = path.resolve(__dirname, '../src/components');
const examplesDir = path.resolve(__dirname, '../src/examples');

function isDir(p) {
    try {
        return fs.statSync(p).isDirectory();
    } catch (e) {
        return false;
    }
}

function main() {
    if (!isDir(componentsDir)) {
        console.error('components dir not found:', componentsDir);
        process.exit(1);
    }
    if (!isDir(examplesDir)) {
        fs.mkdirSync(examplesDir, { recursive: true });
    }

    const components = fs.readdirSync(componentsDir).filter(name => {
        const p = path.join(componentsDir, name);
        return isDir(p) && (fs.existsSync(path.join(p, 'index.tsx')) || fs.existsSync(path.join(p, 'index.ts')));
    });

    const existingExamples = new Set(
        fs.readdirSync(examplesDir)
            .filter(f => f.endsWith('.tsx'))
            .map(f => f.replace(/Example\.tsx$/, ''))
    );

    let created = 0;

    components.forEach(name => {
        if (existingExamples.has(name)) return;

        const examplePath = path.join(examplesDir, `${name}Example.tsx`);
        const importPath = '../';
        const content = `import React from 'react';
import { ${name} } from '${importPath}';

export default function ${name}Example() {
  return (
    <div style={{ padding: 16 }}>
      {/* Basic usage example for ${name} */}
      <${name} />
    </div>
  );
}
`;

        fs.writeFileSync(examplePath, content, { encoding: 'utf8' });
        console.log('Created example:', examplePath);
        created++;
    });

    console.log(`Done. Examples created: ${created}`);
}

main();
