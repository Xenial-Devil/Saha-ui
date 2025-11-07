#!/usr/bin/env node

/**
 * Saha UI MCP Server Launcher
 * This script launches the MCP server from the installed package
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the MCP server in dist
const serverPath = join(__dirname, '..', 'dist', 'mcp', 'server.js');

// Spawn the MCP server
const server = spawn('node', [serverPath], {
  stdio: 'inherit',
  env: process.env,
});

// Handle exit
server.on('exit', (code) => {
  process.exit(code || 0);
});

// Handle errors
server.on('error', (error) => {
  console.error('Failed to start Saha UI MCP server:', error);
  process.exit(1);
});
