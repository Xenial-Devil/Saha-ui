#!/usr/bin/env node

/**
 * Quick test to verify Button component lookup works
 */

import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class QuickTest {
  constructor() {
    this.messageId = 0;
    this.pendingRequests = new Map();
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
              if (message.id && this.pendingRequests.has(message.id)) {
                const { resolve } = this.pendingRequests.get(message.id);
                this.pendingRequests.delete(message.id);
                resolve(message);
              }
            } catch (e) {
              // Ignore
            }
          }
        });
      });

      this.server.stderr.on('data', (data) => {
        if (data.toString().includes('running on stdio')) {
          resolve();
        }
      });

      setTimeout(() => resolve(), 1000);
    });
  }

  async callTool(name, args) {
    const id = ++this.messageId;
    const request = {
      jsonrpc: '2.0',
      id,
      method: 'tools/call',
      params: { name, arguments: args },
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

  stop() {
    if (this.server) {
      this.server.kill();
    }
  }
}

async function test() {
  console.log('🧪 Testing Button component lookup...\n');

  const client = new QuickTest();

  try {
    console.log('Starting server...');
    await client.start();
    console.log('✓ Server started\n');

    // Test 1: Exact case
    console.log('Test 1: "Button" (exact case)');
    let response = await client.callTool('get_component', { name: 'Button' });
    let text = response.result?.content?.[0]?.text || '';
    console.log(text.includes('# Button Component') ? '✓ PASS' : '✗ FAIL');
    console.log('Response preview:', text.substring(0, 200));
    console.log('');

    // Test 2: Lowercase
    console.log('Test 2: "button" (lowercase)');
    response = await client.callTool('get_component', { name: 'button' });
    text = response.result?.content?.[0]?.text || '';
    console.log(text.includes('# Button Component') ? '✓ PASS' : '✗ FAIL');
    console.log('Response preview:', text.substring(0, 200));
    console.log('');

    // Test 3: Typo
    console.log('Test 3: "Buton" (typo)');
    response = await client.callTool('get_component', { name: 'Buton' });
    text = response.result?.content?.[0]?.text || '';
    console.log(text.includes('# Button Component') ? '✓ PASS' : '✗ FAIL');
    console.log('Response preview:', text.substring(0, 200));
    console.log('');

    // Test 4: Card component
    console.log('Test 4: "Card"');
    response = await client.callTool('get_component', { name: 'Card' });
    text = response.result?.content?.[0]?.text || '';
    console.log(text.includes('# Card Component') ? '✓ PASS' : '✗ FAIL');
    console.log('Response preview:', text.substring(0, 200));
    console.log('Full response length:', text.length);
    console.log('');

    console.log('🎉 All tests complete!');

  } catch (error) {
    console.error('✗ Error:', error.message);
  } finally {
    client.stop();
  }
}

test();
