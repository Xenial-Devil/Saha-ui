"""
Auto-formatter for ComponentAi list.txt
Converts old component format to new AI-friendly format with emojis and clear sections
"""

import re
import sys

def format_component(match):
    """Convert old component format to new format"""
    
    # Extract component details
    full_match = match.group(0)
    name = match.group(1)
    summary = match.group(2)
    complexity = match.group(3)
    
    # Find props section
    props_match = re.search(r'Props:(.*?)(?=Events/Callbacks:|Variants|Accessibility|Example:|Related|Notes:|\n---|\Z)', full_match, re.DOTALL)
    props_text = props_match.group(1).strip() if props_match else ""
    
    # Find example
    example_match = re.search(r'Example:\s*(.*?)(?=Related|Notes:|\n---|\Z)', full_match, re.DOTALL)
    example_text = example_match.group(1).strip() if example_match else ""
    
    # Find related components
    related_match = re.search(r'Related hooks & components:\s*(.*?)(?=Notes:|\n---|\Z)', full_match, re.DOTALL)
    related_text = related_match.group(1).strip() if related_match else ""
    
    # Find notes
    notes_match = re.search(r'Notes:\s*(.*?)(?=\n---|\Z)', full_match, re.DOTALL)
    notes_text = notes_match.group(1).strip() if notes_match else ""
    
    # Find accessibility
    access_match = re.search(r'Accessibility notes:\s*(.*?)(?=Example:|Related|Notes:|\n---|\Z)', full_match, re.DOTALL)
    access_text = access_match.group(1).strip() if access_match else ""
    
    # Parse props into structured format
    prop_lines = []
    for line in props_text.split('\n'):
        line = line.strip()
        if line.startswith('- '):
            # Extract prop name and details
            prop_match = re.match(r'- ([^:]+):\s*(.+)', line)
            if prop_match:
                prop_name = prop_match.group(1).strip()
                prop_details = prop_match.group(2).strip()
                
                # Parse default and description
                default_match = re.search(r'\|\s*default:\s*([^|]+)', prop_details)
                required_match = re.search(r'\|\s*required:\s*(\w+)', prop_details)
                desc_match = re.search(r'—\s*(.+)$', prop_details)
                
                type_part = re.split(r'\s*\|\s*default:', prop_details)[0].strip()
                default_val = default_match.group(1).strip() if default_match else "undefined"
                required = required_match.group(1).strip() if required_match else "no"
                description = desc_match.group(1).strip() if desc_match else ""
                
                prop_lines.append(f"{prop_name}: {type_part}")
                prop_lines.append(f"  - Default: {default_val}")
                if required == "yes":
                    prop_lines.append(f"  - Required: ✓ yes")
                prop_lines.append(f"  - {description}")
                prop_lines.append("")
    
    props_formatted = '\n'.join(prop_lines) if prop_lines else "  (See original documentation)"
    
    # Build new format
    separator = "━" * 77
    new_format = f"""{separator}
{name.upper()}
{separator}

📝 SUMMARY
{summary}

⚙️ COMPLEXITY: {complexity.capitalize()}

📦 KEY PROPS
────────────
{props_formatted}

💡 USAGE EXAMPLE
────────────────
{example_text if example_text else "  (See related components for examples)"}

🔑 KEY FEATURES
───────────────
✓ {summary[:60]}...
(Extract from props and description)

♿ ACCESSIBILITY
───────────────
{access_text if access_text else "• Follow standard accessibility practices\n• Ensure keyboard navigation\n• Provide appropriate ARIA labels"}

🔗 RELATED COMPONENTS
─────────────────────
{related_text if related_text else "See component documentation"}

⚠️ IMPORTANT NOTES
──────────────────
{notes_text if notes_text else "• Review component props carefully\n• Check examples for usage patterns"}
"""
    
    return new_format

def main():
    input_file = sys.argv[1] if len(sys.argv) > 1 else "ComponentAi list.txt"
    output_file = sys.argv[2] if len(sys.argv) > 2 else "ComponentAi_list_formatted.txt"
    
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to match old component format
    pattern = r'---\s*\n\nComponent:\s*([^\n]+)\nSummary:\s*([^\n]+)\nComplexity:\s*([^\n]+)\n(.*?)(?=\n---\s*\n\nComponent:|\Z)'
    
    # Replace all components
    formatted = re.sub(pattern, format_component, content, flags=re.DOTALL)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(formatted)
    
    print(f"✓ Formatted components written to {output_file}")
    print(f"  Review the output and replace the original file if satisfied")

if __name__ == "__main__":
    main()
