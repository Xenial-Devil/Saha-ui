#!/usr/bin/env node

/**
 * Saha UI MCP Server v2.0 - Quick Demo
 *
 * This script demonstrates the dynamic features of the MCP server
 * by running several example queries and showing the responses.
 */

import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '═'.repeat(70));
  log(`  ${title}`, 'bright');
  console.log('═'.repeat(70) + '\n');
}

class MCPClient {
  constructor() {
    this.messageId = 0;
    this.pendingRequests = new Map();
    this.server = null;
  }

  async start() {
    return new Promise((resolve, reject) => {
      const serverPath = join(__dirname, 'dist', 'mcp', 'server.js');

      this.server = spawn('node', [serverPath], {
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      let buffer = '';

      this.server.stdout.on('data', (data) => {
        buffer += data.toString();
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        lines.forEach((line) => {
          if (line.trim()) {
            try {
              const message = JSON.parse(line);
              this.handleResponse(message);
            } catch (e) {
              // Ignore non-JSON lines
            }
          }
        });
      });

      this.server.stderr.on('data', (data) => {
        const message = data.toString();
        if (message.includes('running on stdio')) {
          resolve();
        }
      });

      this.server.on('error', reject);

      setTimeout(() => resolve(), 1000);
    });
  }

  handleResponse(message) {
    if (message.id && this.pendingRequests.has(message.id)) {
      const { resolve } = this.pendingRequests.get(message.id);
      this.pendingRequests.delete(message.id);
      resolve(message);
    }
  }

  async sendRequest(method, params = {}) {
    const id = ++this.messageId;
    const request = {
      jsonrpc: '2.0',
      id,
      method,
      params,
    };

    return new Promise((resolve, reject) => {
      this.pendingRequests.set(id, { resolve, reject });
      this.server.stdin.write(JSON.stringify(request) + '\n');

      setTimeout(() => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id);
          reject(new Error('Timeout'));
        }
      }, 5000);
    });
  }

  async callTool(name, args = {}) {
    return this.sendRequest('tools/call', { name, arguments: args });
  }

  stop() {
    if (this.server) {
      this.server.kill();
    }
  }
}

// Demo queries
const demos = [
  {
    title: '🔍 Fuzzy Matching Demo (Typo: "Buton")',
    tool: 'get_component',
    args: { name: 'Buton' },
    explanation: 'The server handles typos gracefully using fuzzy matching',
  },
  {
    title: '💬 Natural Language Query',
    tool: 'ask_question',
    args: { question: 'How do I change the primary color?' },
    explanation: 'Ask questions in plain English - the server understands!',
  },
  {
    title: '🎯 Smart Recommendations',
    tool: 'get_recommendations',
    args: { scenario: 'dashboard' },
    explanation: 'Get personalized component suggestions based on your use case',
  },
  {
    title: '📊 Filtered Component List',
    tool: 'list_components_by_category',
    args: { complexity: 'simple' },
    explanation: 'Filter components by complexity, category, or tags',
  },
  {
    title: '🎨 Theme Configuration',
    tool: 'get_theme_config',
    args: { aspect: 'colors' },
    explanation: 'Get focused information about theme customization',
  },
];

async function runDemo() {
  logSection('🚀 Saha UI MCP Server v2.0 - Live Demo');

  log('Starting MCP server...', 'dim');
  const client = new MCPClient();

  try {
    await client.start();
    log('✓ Server started successfully!\n', 'green');

    await new Promise(resolve => setTimeout(resolve, 500));

    for (const demo of demos) {
      logSection(demo.title);
      log(demo.explanation, 'dim');
      console.log('');
      log(`📤 Calling: ${demo.tool}`, 'cyan');
      log(`   Args: ${JSON.stringify(demo.args, null, 2).split('\n').join('\n         ')}`, 'dim');
      console.log('');

      try {
        const response = await client.callTool(demo.tool, demo.args);

        if (response.result?.content?.[0]?.text) {
          const text = response.result.content[0].text;
          const preview = text.length > 800 ? text.substring(0, 800) + '\n\n...(truncated)' : text;

          log('📥 Response:', 'green');
          console.log(preview);
        } else {
          log('⚠️  No content in response', 'yellow');
        }
      } catch (error) {
        log(`✗ Error: ${error.message}`, 'red');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    logSection('✨ Demo Complete!');
    log('Key Features Demonstrated:', 'cyan');
    log('  ✓ Fuzzy matching (typo tolerance)', 'green');
    log('  ✓ Natural language understanding', 'green');
    log('  ✓ Smart recommendations', 'green');
    log('  ✓ Advanced filtering', 'green');
    log('  ✓ Context-aware responses', 'green');
    console.log('');
    log('Try it yourself with the interactive client:', 'cyan');
    log('  node test-client.js', 'bright');
    console.log('');

  } catch (error) {
    log(`\n✗ Demo failed: ${error.message}`, 'red');
  } finally {
    client.stop();
  }
}

// Run demo
runDemo().catch((error) => {
  log(`\n✗ Fatal error: ${error.message}`, 'red');
  process.exit(1);
});
