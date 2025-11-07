#!/usr/bin/env node

/**
 * Test script for Saha UI MCP Server v2.0 Dynamic Features
 *
 * Tests:
 * - Fuzzy matching
 * - Context awareness
 * - Intent detection
 * - Smart suggestions
 * - Natural language queries
 */

import { spawn } from 'child_process';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'bright');
  console.log('='.repeat(60) + '\n');
}

// Test suite
const tests = [
  {
    name: 'Fuzzy Matching - Component with Typo',
    tool: 'get_component',
    args: { name: 'Buton' }, // Typo: should match "Button"
    expect: (result) => {
      const text = JSON.stringify(result);
      return text.includes('Button') &&
             (text.includes('Did you mean') || text.includes('button') || text.toLowerCase().includes('button'));
    },
  },
  {
    name: 'Fuzzy Matching - Hook with Typo',
    tool: 'get_hook',
    args: { name: 'useDebonc' }, // Typo: should match "useDebounce"
    expect: (result) => {
      const text = JSON.stringify(result);
      return text.includes('useDebounce') || text.includes('Did you mean');
    },
  },
  {
    name: 'List Components - Filter by Complexity',
    tool: 'list_components_by_category',
    args: { complexity: 'simple' },
    expect: (result) => {
      const text = JSON.stringify(result);
      return text.includes('simple') && text.includes('Component');
    },
  },
  {
    name: 'List Components - Filter by Tags',
    tool: 'list_components_by_category',
    args: { tags: 'form,input' },
    expect: (result) => {
      const text = JSON.stringify(result);
      return text.includes('form') || text.includes('input');
    },
  },
  {
    name: 'Get Component - Full Detail',
    tool: 'get_component',
    args: { name: 'Button', detail_level: 'full' },
    expect: (result) => {
      const text = JSON.stringify(result);
      return text.includes('Button') &&
             (text.includes('Props') || text.includes('Implementation') || text.includes('Category'));
    },
  },
  {
    name: 'Get Hook - With Example',
    tool: 'get_hook',
    args: { name: 'useDebounce', include_example: true },
    expect: (result) => {
      const text = JSON.stringify(result);
      return text.includes('useDebounce');
    },
  },
  {
    name: 'Natural Language Query - Installation',
    tool: 'ask_question',
    args: { question: 'How do I install Saha UI?' },
    expect: (result) => {
      const text = JSON.stringify(result);
      return text.includes('npm') || text.includes('install') || text.includes('saha-ui');
    },
  },
  {
    name: 'Natural Language Query - Component Discovery',
    tool: 'ask_question',
    args: { question: 'What components should I use for a form?' },
    expect: (result) => {
      const text = JSON.stringify(result);
      return text.includes('Input') || text.includes('Button') || text.includes('form');
    },
  },
  {
    name: 'Recommendations - Dashboard',
    tool: 'get_recommendations',
    args: { scenario: 'dashboard' },
    expect: (result) => {
      const text = JSON.stringify(result);
      return text.includes('Card') || text.includes('dashboard') || text.includes('Suggested');
    },
  },
  {
    name: 'Recommendations - Form',
    tool: 'get_recommendations',
    args: { scenario: 'contact form' },
    expect: (result) => {
      const text = JSON.stringify(result);
      return text.includes('Input') || text.includes('Button') || text.includes('form');
    },
  },
  {
    name: 'Search Code - Pattern Matching',
    tool: 'search_code',
    args: { pattern: 'export.*function', directory: 'src' },
    expect: (result) => {
      const text = JSON.stringify(result);
      return text.includes('export') || text.includes('function') || text.includes('Search Results');
    },
  },
  {
    name: 'Get Theme Config - Colors Only',
    tool: 'get_theme_config',
    args: { aspect: 'colors' },
    expect: (result) => {
      const text = JSON.stringify(result);
      return text.includes('color') || text.includes('theme') || text.includes('Tailwind');
    },
  },
  {
    name: 'Session Context Resource',
    resource: 'saha-ui://session/context',
    expect: (result) => {
      const text = JSON.stringify(result);
      return text.includes('recentComponents') ||
             text.includes('recentHooks') ||
             text.includes('sessionContext') ||
             text.includes('queryCount');
    },
  },
];

// MCP client simulator
class MCPClient {
  constructor() {
    this.messageId = 0;
    this.responses = new Map();
  }

  async start() {
    return new Promise((resolve, reject) => {
      const serverPath = join(__dirname, '..', 'dist', 'mcp', 'server.js');

      this.process = spawn('node', [serverPath], {
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      let buffer = '';

      this.process.stdout.on('data', (data) => {
        buffer += data.toString();
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        lines.forEach((line) => {
          if (line.trim()) {
            try {
              const message = JSON.parse(line);
              if (message.id) {
                const resolver = this.responses.get(message.id);
                if (resolver) {
                  resolver(message);
                  this.responses.delete(message.id);
                }
              }
            } catch (e) {
              // Ignore non-JSON lines (like startup messages)
            }
          }
        });
      });

      this.process.stderr.on('data', (data) => {
        const message = data.toString();
        if (message.includes('running on stdio')) {
          resolve();
        }
      });

      this.process.on('error', reject);

      setTimeout(() => resolve(), 1000); // Fallback timeout
    });
  }

  async callTool(name, args) {
    const id = ++this.messageId;
    const request = {
      jsonrpc: '2.0',
      id,
      method: 'tools/call',
      params: {
        name,
        arguments: args || {},
      },
    };

    return new Promise((resolve, reject) => {
      this.responses.set(id, resolve);
      this.process.stdin.write(JSON.stringify(request) + '\n');
      setTimeout(() => reject(new Error('Timeout')), 5000);
    });
  }

  async readResource(uri) {
    const id = ++this.messageId;
    const request = {
      jsonrpc: '2.0',
      id,
      method: 'resources/read',
      params: { uri },
    };

    return new Promise((resolve, reject) => {
      this.responses.set(id, resolve);
      this.process.stdin.write(JSON.stringify(request) + '\n');
      setTimeout(() => reject(new Error('Timeout')), 5000);
    });
  }

  stop() {
    if (this.process) {
      this.process.kill();
    }
  }
}

// Run tests
async function runTests() {
  logSection('🧪 Saha UI MCP Server v2.0 Dynamic Features Test Suite');

  const client = new MCPClient();

  try {
    log('Starting MCP server...', 'cyan');
    await client.start();
    log('✓ Server started successfully\n', 'green');

    let passed = 0;
    let failed = 0;

    for (const test of tests) {
      process.stdout.write(`Testing: ${test.name}... `);

      try {
        let result;

        if (test.tool) {
          result = await client.callTool(test.tool, test.args);
        } else if (test.resource) {
          result = await client.readResource(test.resource);
        }

        if (test.expect(result)) {
          log('✓ PASS', 'green');
          passed++;
        } else {
          log('✗ FAIL', 'red');
          log(`  Expected condition not met`, 'yellow');
          failed++;
        }
      } catch (error) {
        log('✗ ERROR', 'red');
        log(`  ${error.message}`, 'yellow');
        failed++;
      }
    }

    logSection('📊 Test Results');
    log(`Total Tests: ${tests.length}`, 'bright');
    log(`Passed: ${passed}`, 'green');
    log(`Failed: ${failed}`, failed > 0 ? 'red' : 'green');
    log(`Success Rate: ${((passed / tests.length) * 100).toFixed(1)}%`, 'cyan');

    if (failed === 0) {
      log('\n🎉 All tests passed! Dynamic features are working correctly.', 'green');
    } else {
      log(`\n⚠️  ${failed} test(s) failed. Please review the implementation.`, 'yellow');
    }

  } catch (error) {
    log('\n❌ Test suite failed to run:', 'red');
    log(error.message, 'yellow');
    log(error.stack, 'yellow');
    process.exit(1);
  } finally {
    client.stop();
  }
}

// Feature showcase
function showFeatures() {
  logSection('✨ Saha UI MCP Server v2.0 - Dynamic Features');

  log('🧠 Intelligent Features:', 'bright');
  log('  • Context Awareness - Remembers your session', 'cyan');
  log('  • Intent Detection - Understands what you need', 'cyan');
  log('  • Fuzzy Matching - Handles typos gracefully', 'cyan');
  log('  • Smart Suggestions - Proactive recommendations', 'cyan');
  log('  • Progressive Disclosure - No information overload', 'cyan');
  log('  • Natural Language - Ask questions naturally', 'cyan');

  log('\n🎯 Key Capabilities:', 'bright');
  log('  • 73 Components with rich metadata', 'cyan');
  log('  • 40+ Hooks with usage examples', 'cyan');
  log('  • Context-aware code search', 'cyan');
  log('  • Scenario-based recommendations', 'cyan');
  log('  • Real-time session tracking', 'cyan');
  log('  • Human-like conversational responses', 'cyan');

  log('\n💡 Example Interactions:', 'bright');
  log('  "Show me the Buton component" → Fuzzy matches to Button ✓', 'yellow');
  log('  "How to customize colors?" → Detects styling intent ✓', 'yellow');
  log('  "Components for a dashboard?" → Recommends Card, Tabs, etc. ✓', 'yellow');

  console.log('');
}

// Main
if (import.meta.url === `file://${process.argv[1]}`) {
  showFeatures();
  runTests()
    .then(() => process.exit(0))
    .catch((error) => {
      log('\nUnexpected error:', 'red');
      console.error(error);
      process.exit(1);
    });
}

export { runTests, MCPClient };
