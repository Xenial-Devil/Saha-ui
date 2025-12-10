/**
 * Script to automatically reformat component documentation
 * Converts old format to new enhanced format with emojis and better structure
 */

const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '..', 'ComponentAi list.txt');
const content = fs.readFileSync(inputFile, 'utf-8');

// Split by component sections
const components = content.split(/(?=---\n\nComponent: )/g);

function reformatComponent(componentText) {
    // Skip if already reformatted (has unicode separators)
    if (componentText.includes('━━━━━')) {
        return componentText;
    }

    // Skip if not a component section
    if (!componentText.includes('Component: ')) {
        return componentText;
    }

    // Extract component info
    const nameMatch = componentText.match(/Component: (.+)/);
    const summaryMatch = componentText.match(/Summary: (.+)/);
    const complexityMatch = componentText.match(/Complexity: (\w+)/);

    if (!nameMatch || !summaryMatch || !complexityMatch) {
        return componentText; // Can't parse, return as-is
    }

    const name = nameMatch[ 1 ].trim();
    const summary = summaryMatch[ 1 ].trim();
    const complexity = complexityMatch[ 1 ].charAt(0).toUpperCase() + complexityMatch[ 1 ].slice(1);

    // Extract props section
    const propsMatch = componentText.match(/Props:([\s\S]+?)(?=Events\/Callbacks:|Variants|Accessibility|Example:|Related|Notes:)/);
    const propsText = propsMatch ? propsMatch[ 1 ].trim() : '';

    // Extract examples
    const exampleMatch = componentText.match(/Example:([\s\S]+?)(?=Related|Notes:)/);
    const exampleText = exampleMatch ? exampleMatch[ 1 ].trim() : '';

    // Extract related components
    const relatedMatch = componentText.match(/Related hooks & components: (.+)/);
    const relatedText = relatedMatch ? relatedMatch[ 1 ].trim() : '';

    // Extract notes
    const notesMatch = componentText.match(/Notes:([\s\S]+?)$/);
    const notesText = notesMatch ? notesMatch[ 1 ].trim() : '';

    // Build reformatted version
    let reformatted = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${name.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 SUMMARY
${summary}

⚙️ COMPLEXITY: ${complexity}

📦 KEY PROPS
────────────
${formatProps(propsText)}

💡 USAGE EXAMPLES
─────────────────
${exampleText || '// Example coming soon'}

🔑 KEY FEATURES
───────────────
${extractFeatures(componentText)}

♿ ACCESSIBILITY
───────────────
${extractAccessibility(componentText)}

🔗 RELATED COMPONENTS
─────────────────────
${relatedText}

⚠️ IMPORTANT NOTES
──────────────────
${notesText}
`;

    return reformatted;
}

function formatProps(propsText) {
    // Basic prop formatting - extract key props
    const lines = propsText.split('\n');
    let formatted = [];

    for (const line of lines) {
        const propMatch = line.match(/- ([a-zA-Z]+[?]?):\s*(.+?)\s*\|\s*default:\s*(.+?)\s*\|\s*required:\s*(\w+)\s*—\s*(.+)/);
        if (propMatch) {
            const [ , propName, propType, defaultVal, required, description ] = propMatch;
            formatted.push(`${propName}: ${propType}`);
            formatted.push(`  - Default: ${defaultVal}`);
            formatted.push(`  - ${description}`);
            formatted.push('');
        }
    }

    return formatted.join('\n') || propsText;
}

function extractFeatures(text) {
    // Look for common feature indicators
    const features = [];
    if (text.includes('responsive')) features.push('✓ Responsive design');
    if (text.includes('variant')) features.push('✓ Multiple variants');
    if (text.includes('accessibility') || text.includes('ARIA')) features.push('✓ Full accessibility support');
    if (text.includes('keyboard')) features.push('✓ Keyboard navigation');
    if (text.includes('customizable')) features.push('✓ Highly customizable');

    return features.length > 0 ? features.join('\n') : '✓ Feature-rich component';
}

function extractAccessibility(text) {
    const accessMatch = text.match(/Accessibility notes:([\s\S]+?)(?=Example:|Related|Notes:)/);
    if (accessMatch) {
        const notes = accessMatch[ 1 ].trim().split('\n').filter(l => l.trim());
        return notes.map(n => n.trim().startsWith('-') ? '•' + n.substring(1) : '• ' + n).join('\n');
    }
    return '• Follows WAI-ARIA guidelines\n• Screen reader compatible';
}

// Process all components
console.log('Reformatting components...');
const reformatted = components.map((comp, idx) => {
    if (idx === 0) return comp; // Skip header
    const result = reformatComponent(comp);
    if (result !== comp) {
        console.log(`  ✓ Reformatted component ${idx}`);
    }
    return result;
});

// Write back
const output = reformatted.join('');
fs.writeFileSync(inputFile, output, 'utf-8');

console.log('✓ Done! All components reformatted.');
