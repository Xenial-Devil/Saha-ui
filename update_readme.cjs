
const fs = require('fs');

const implemented = fs.readdirSync('src/components', {withFileTypes:true})
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)
  .filter(name => /^[A-Z]/.test(name) && name !== 'Notification')
  .sort();

let content = fs.readFileSync('README.md', 'utf8');

// Replace the count
content = content.replace(/- 🎨 \*\*\d+ Modern Components\*\*/, '- 🎨 **' + implemented.length + ' Modern Components**');

// Find where the comma-separated list is and replace it
const rx = /- 🎨 \*\*\d+ Modern Components\*\* - ([^\n]+)/;
if (rx.test(content)) {
  content = content.replace(rx, '- 🎨 **' + implemented.length + ' Modern Components** - ' + implemented.join(', '));
  fs.writeFileSync('README.md', content);
  console.log('Successfully updated README.md with ' + implemented.length + ' components.');
} else {
  console.log('Feature array not found properly in README.md');
}

