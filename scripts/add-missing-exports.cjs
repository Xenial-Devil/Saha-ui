const fs = require('fs');
const path = require('path');

const missing = [
  "ChatBubble", "CountdownTimer", "DateRangePicker", "DateTimePicker", 
  "FileInput", "GanttChart", "ImageCropper", "ImageGallery", "InfiniteScroll", 
  "KanbanBoard", "MultiSelect", "NotificationCenter", "NumberInput", 
  "PasswordInput", "PhoneInput", "QRCode", "SearchInput", "Sidebar", 
  "SplitButton", "VirtualList"
];

let addedExports = '\n// New Components\n';

for (const comp of missing) {
  addedExports += `export { ${comp} } from "./components/${comp}";\n`;
  
  // Try to find the types file to export the Props
  const typesPath = path.join(__dirname, '..', 'src', 'components', comp, `${comp}.types.ts`);
  if (fs.existsSync(typesPath)) {
    addedExports += `export type { ${comp}Props } from "./components/${comp}/${comp}.types";\n`;
  }
}

fs.appendFileSync(path.join(__dirname, '..', 'src', 'index.ts'), addedExports);
console.log("Added missing exports.");
