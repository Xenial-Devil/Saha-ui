#!/usr/bin/env node

/**
 * Interactive Test Client for Saha UI MCP Server v2.0
 *
 * This client allows you to test the MCP server interactively
 * by sending JSON-RPC requests and receiving responses.
 */

import { spawn } from 'child_process';
import { createInterface } from 'readline';
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

class MCPTestClient {
  constructor() {
    this.messageId = 0;
    this.pendingRequests = new Map();
    this.server = null;
  }

  start() {
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
          log('\n✓ MCP Server started successfully!', 'green');
          resolve();
        }
      });

      this.server.on('error', (error) => {
        log(`\n✗ Server error: ${error.message}`, 'red');
        reject(error);
      });

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

      // Timeout after 10 seconds
      setTimeout(() => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id);
          reject(new Error('Request timeout'));
        }
      }, 10000);
    });
  }

  async callTool(name, args = {}) {
    return this.sendRequest('tools/call', { name, arguments: args });
  }

  async listTools() {
    return this.sendRequest('tools/list');
  }

  async listResources() {
    return this.sendRequest('resources/list');
  }

  async readResource(uri) {
    return this.sendRequest('resources/read', { uri });
  }

  stop() {
    if (this.server) {
      this.server.kill();
    }
  }
}

// Interactive commands
const commands = {
  help: {
    description: 'Show available commands',
    action: () => {
      log('\n📚 Available Commands:', 'cyan');
      console.log('');
      Object.entries(commands).forEach(([name, cmd]) => {
        log(`  ${name.padEnd(20)} - ${cmd.description}`, 'dim');
      });
      console.log('');
    },
  },

  tools: {
    description: 'List all available tools',
    action: async (client) => {
      try {
        const response = await client.listTools();
        if (response.result?.tools) {
          log('\n🔧 Available Tools:', 'cyan');
          response.result.tools.forEach((tool) => {
            log(`\n  ${tool.name}`, 'green');
            log(`  ${tool.description}`, 'dim');
          });
          console.log('');
        }
      } catch (error) {
        log(`\n✗ Error: ${error.message}`, 'red');
      }
    },
  },

  resources: {
    description: 'List all available resources',
    action: async (client) => {
      try {
        const response = await client.listResources();
        if (response.result?.resources) {
          log('\n📦 Available Resources:', 'cyan');
          response.result.resources.forEach((resource) => {
            log(`\n  ${resource.uri}`, 'green');
            log(`  ${resource.description}`, 'dim');
          });
          console.log('');
        }
      } catch (error) {
        log(`\n✗ Error: ${error.message}`, 'red');
      }
    },
  },

  component: {
    description: 'Get component info (usage: component <name>)',
    action: async (client, args) => {
      if (!args[0]) {
        log('\n⚠️  Usage: component <name>', 'yellow');
        return;
      }

      try {
        log(`\n🔍 Getting component: ${args[0]}`, 'cyan');
        const response = await client.callTool('get_component', {
          name: args[0],
        });

        if (response.result?.content?.[0]?.text) {
          log('\n📄 Response:', 'green');
          console.log(response.result.content[0].text);
        }
      } catch (error) {
        log(`\n✗ Error: ${error.message}`, 'red');
      }
    },
  },

  hook: {
    description: 'Get hook info (usage: hook <name>)',
    action: async (client, args) => {
      if (!args[0]) {
        log('\n⚠️  Usage: hook <name>', 'yellow');
        return;
      }

      try {
        log(`\n🔍 Getting hook: ${args[0]}`, 'cyan');
        const response = await client.callTool('get_hook', {
          name: args[0],
        });

        if (response.result?.content?.[0]?.text) {
          log('\n📄 Response:', 'green');
          console.log(response.result.content[0].text);
        }
      } catch (error) {
        log(`\n✗ Error: ${error.message}`, 'red');
      }
    },
  },

  ask: {
    description: 'Ask a natural language question',
    action: async (client, args) => {
      const question = args.join(' ');
      if (!question) {
        log('\n⚠️  Usage: ask <your question>', 'yellow');
        return;
      }

      try {
        log(`\n💬 Asking: "${question}"`, 'cyan');
        const response = await client.callTool('ask_question', {
          question,
        });

        if (response.result?.content?.[0]?.text) {
          log('\n📄 Response:', 'green');
          console.log(response.result.content[0].text);
        }
      } catch (error) {
        log(`\n✗ Error: ${error.message}`, 'red');
      }
    },
  },

  recommend: {
    description: 'Get recommendations (usage: recommend <scenario>)',
    action: async (client, args) => {
      const scenario = args.join(' ');
      if (!scenario) {
        log('\n⚠️  Usage: recommend <scenario>', 'yellow');
        log('   Examples: dashboard, form, landing page', 'dim');
        return;
      }

      try {
        log(`\n🎯 Getting recommendations for: ${scenario}`, 'cyan');
        const response = await client.callTool('get_recommendations', {
          scenario,
        });

        if (response.result?.content?.[0]?.text) {
          log('\n📄 Response:', 'green');
          console.log(response.result.content[0].text);
        }
      } catch (error) {
        log(`\n✗ Error: ${error.message}`, 'red');
      }
    },
  },

  list: {
    description: 'List components by category/complexity/tags',
    action: async (client, args) => {
      try {
        const params = {};
        args.forEach((arg) => {
          if (arg.startsWith('complexity=')) {
            params.complexity = arg.split('=')[1];
          } else if (arg.startsWith('category=')) {
            params.category = arg.split('=')[1];
          } else if (arg.startsWith('tags=')) {
            params.tags = arg.split('=')[1];
          }
        });

        log('\n📋 Listing components...', 'cyan');
        const response = await client.callTool('list_components_by_category', params);

        if (response.result?.content?.[0]?.text) {
          log('\n📄 Response:', 'green');
          console.log(response.result.content[0].text);
        }
      } catch (error) {
        log(`\n✗ Error: ${error.message}`, 'red');
      }
    },
  },

  search: {
    description: 'Search code (usage: search <pattern>)',
    action: async (client, args) => {
      const pattern = args.join(' ');
      if (!pattern) {
        log('\n⚠️  Usage: search <pattern>', 'yellow');
        return;
      }

      try {
        log(`\n🔍 Searching for: ${pattern}`, 'cyan');
        const response = await client.callTool('search_code', {
          pattern,
        });

        if (response.result?.content?.[0]?.text) {
          log('\n📄 Response:', 'green');
          console.log(response.result.content[0].text.substring(0, 1000) + '...');
        }
      } catch (error) {
        log(`\n✗ Error: ${error.message}`, 'red');
      }
    },
  },

  theme: {
    description: 'Get theme config (usage: theme [colors|spacing|typography|all])',
    action: async (client, args) => {
      try {
        const aspect = args[0] || 'all';
        log(`\n🎨 Getting theme config: ${aspect}`, 'cyan');
        const response = await client.callTool('get_theme_config', {
          aspect,
        });

        if (response.result?.content?.[0]?.text) {
          log('\n📄 Response:', 'green');
          console.log(response.result.content[0].text.substring(0, 1000) + '...');
        }
      } catch (error) {
        log(`\n✗ Error: ${error.message}`, 'red');
      }
    },
  },

  context: {
    description: 'View current session context',
    action: async (client) => {
      try {
        log('\n📊 Getting session context...', 'cyan');
        const response = await client.readResource('saha-ui://session/context');

        if (response.result?.contents?.[0]?.text) {
          log('\n📄 Session Context:', 'green');
          const context = JSON.parse(response.result.contents[0].text);
          console.log(JSON.stringify(context, null, 2));
        }
      } catch (error) {
        log(`\n✗ Error: ${error.message}`, 'red');
      }
    },
  },

  examples: {
    description: 'Show example commands',
    action: () => {
      log('\n💡 Example Commands:', 'cyan');
      console.log('');
      log('  component Button              ', 'dim');
      log('  hook useDebounce              ', 'dim');
      log('  ask How do I install Saha UI?', 'dim');
      log('  recommend dashboard           ', 'dim');
      log('  list complexity=simple        ', 'dim');
      log('  search useState               ', 'dim');
      log('  theme colors                  ', 'dim');
      log('  context                       ', 'dim');
      console.log('');
    },
  },

  exit: {
    description: 'Exit the test client',
    action: () => {
      log('\n👋 Goodbye!', 'cyan');
      process.exit(0);
    },
  },
};

// Main interactive loop
async function main() {
  log('\n╔══════════════════════════════════════════════════════════════╗', 'cyan');
  log('║  Saha UI MCP Server v2.0 - Interactive Test Client          ║', 'bright');
  log('╚══════════════════════════════════════════════════════════════╝', 'cyan');

  log('\nStarting MCP server...', 'dim');

  const client = new MCPTestClient();

  try {
    await client.start();

    log('\nType "help" for available commands or "examples" for examples', 'dim');
    log('Type "exit" to quit\n', 'dim');

    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: colors.bright + '> ' + colors.reset,
    });

    rl.prompt();

    rl.on('line', async (line) => {
      const input = line.trim();

      if (!input) {
        rl.prompt();
        return;
      }

      const parts = input.split(' ');
      const command = parts[0];
      const args = parts.slice(1);

      if (commands[command]) {
        await commands[command].action(client, args);
      } else {
        log(`\n⚠️  Unknown command: ${command}`, 'yellow');
        log('   Type "help" for available commands', 'dim');
      }

      rl.prompt();
    });

    rl.on('close', () => {
      log('\n👋 Goodbye!', 'cyan');
      client.stop();
      process.exit(0);
    });

    // Handle Ctrl+C
    process.on('SIGINT', () => {
      log('\n\n👋 Goodbye!', 'cyan');
      client.stop();
      process.exit(0);
    });
  } catch (error) {
    log(`\n✗ Failed to start: ${error.message}`, 'red');
    client.stop();
    process.exit(1);
  }
}

main().catch((error) => {
  log(`\n✗ Fatal error: ${error.message}`, 'red');
  process.exit(1);
});
