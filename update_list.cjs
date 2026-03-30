
const fs = require('fs');
let content = fs.readFileSync('COMPONENTS_LIST.txt', 'utf8');

const missing = [
  'ChatBubble', 'CountdownTimer', 'DateRangePicker', 'DateTimePicker',
  'GanttChart', 'ImageCropper', 'ImageGallery', 'InfiniteScroll',
  'KanbanBoard', 'MultiSelect', 'NotificationCenter', 'PasswordInput',
  'PhoneInput', 'QRCode', 'SearchInput', 'Sidebar', 'SplitButton',
  'TimePicker', 'VirtualList'
];

let addition = '\nPhase 5 - Complex & Utility Components\n--------------------------------------------------------------------------------\n';
missing.forEach(c => {
  addition += '  • ' + c.padEnd(17, ' ') + ' - Additional component\n';
});
addition += '\n';

content = content.replace(/(\n=+\n\s*END OF LIST\s*\n=+)/, addition + '');
content = content.replace(/Total Components: \d+/, 'Total Components: 126');
// get today's date
const date = new Date().toISOString().split('T')[0];
content = content.replace(/Last Updated: \d{4}-\d{2}-\d{2}/, 'Last Updated: ' + date);

fs.writeFileSync('COMPONENTS_LIST.txt', content);
console.log('Appended components to COMPONENTS_LIST.txt');

