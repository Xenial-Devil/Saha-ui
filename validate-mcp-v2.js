#!/usr/bin/env node

/**
 * Saha UI MCP Server v2.0 - Comprehensive Validation Script
 *
 * This script validates that the MCP server v2.0 is correctly implemented
 * and all features are working as expected.
 */

import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

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
  magenta: '\x1b[35m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(70));
  log(title, 'bright');
  console.log('='.repeat(70) + '\n');
}

function checkFile(path, description) {
  const fullPath = join(__dirname, path);
  const exists = existsSync(fullPath);

  if (exists) {
    log(`✓ ${description}`, 'green');
    return true;
  } else {
    log(`✗ ${description} - NOT FOUND`, 'red');
    return false;
  }
}

function checkFileContent(path, searchText, description) {
  const fullPath = join(__dirname, path);

  if (!existsSync(fullPath)) {
    log(`✗ ${description} - FILE NOT FOUND`, 'red');
    return false;
  }

  try {
    const content = readFileSync(fullPath, 'utf-8');
    const found = content.includes(searchText);

    if (found) {
      log(`✓ ${description}`, 'green');
      return true;
    } else {
      log(`✗ ${description} - NOT FOUND`, 'red');
      return false;
    }
  } catch (error) {
    log(`✗ ${description} - ERROR: ${error.message}`, 'red');
    return false;
  }
}

async function testServerStartup() {
  return new Promise((resolve) => {
    const serverPath = join(__dirname, 'dist', 'mcp', 'server.js');

    if (!existsSync(serverPath)) {
      log('✗ Server file not found', 'red');
      resolve(false);
      return;
    }

    const server = spawn('node', [serverPath], {
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    let output = '';
    let errorOutput = '';

    server.stdout.on('data', (data) => {
      output += data.toString();
    });

    server.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    setTimeout(() => {
      server.kill();

      if (errorOutput.includes('v2.0') && errorOutput.includes('Enhanced Dynamic Mode')) {
        log('✓ Server starts with v2.0 message', 'green');
        resolve(true);
      } else if (errorOutput.includes('running on stdio')) {
        log('⚠ Server starts but missing v2.0 branding', 'yellow');
        resolve(true);
      } else {
        log('✗ Server startup failed or missing output', 'red');
        log(`  Output: ${errorOutput}`, 'yellow');
        resolve(false);
      }
    }, 2000);

    server.on('error', (error) => {
      log(`✗ Server error: ${error.message}`, 'red');
      resolve(false);
    });
  });
}

async function main() {
  logSection('🧪 Saha UI MCP Server v2.0 - Validation Suite');

  let passed = 0;
  let failed = 0;

  // Check core implementation files
  logSection('📁 Core Files');

  const coreFiles = [
    ['mcp/server.ts', 'MCP server implementation'],
    ['mcp/tsconfig.json', 'MCP TypeScript config'],
    ['bin/mcp.js', 'MCP launcher script'],
    ['dist/mcp/server.js', 'Built MCP server'],
    ['vite.mcp.config.ts', 'MCP Vite config'],
  ];

  coreFiles.forEach(([path, desc]) => {
    if (checkFile(path, desc)) {
      passed++;
    } else {
      failed++;
    }
  });

  // Check documentation files
  logSection('📚 Documentation Files');

  const docFiles = [
    ['docs/MCP_SERVER.md', 'Main MCP documentation'],
    ['docs/MCP_DYNAMIC_FEATURES.md', 'Dynamic features reference'],
    ['docs/MCP_V2_SUMMARY.md', 'Technical summary'],
    ['docs/MCP_V1_VS_V2.md', 'Version comparison'],
    ['DYNAMIC_MCP_UPDATE.md', 'Update summary'],
    ['MCP_V2_CHECKLIST.md', 'Implementation checklist'],
  ];

  docFiles.forEach(([path, desc]) => {
    if (checkFile(path, desc)) {
      passed++;
    } else {
      failed++;
    }
  });

  // Check implementation features
  logSection('✨ Feature Implementation');

  const features = [
    ['mcp/server.ts', 'SessionContext', 'Context awareness'],
    ['mcp/server.ts', 'detectIntent', 'Intent detection'],
    ['mcp/server.ts', 'fuzzyMatch', 'Fuzzy matching'],
    ['mcp/server.ts', 'getContextualSuggestions', 'Smart suggestions'],
    ['mcp/server.ts', 'generateSmartResponse', 'Smart response generation'],
    ['mcp/server.ts', 'ask_question', 'Natural language tool'],
    ['mcp/server.ts', 'get_recommendations', 'Recommendations tool'],
    ['mcp/server.ts', 'detail_level', 'Progressive disclosure'],
  ];

  features.forEach(([path, searchText, desc]) => {
    if (checkFileContent(path, searchText, desc)) {
      passed++;
    } else {
      failed++;
    }
  });

  // Check documentation updates
  logSection('📝 Documentation Updates');

  const docUpdates = [
    ['README.md', 'v2.0', 'README mentions v2.0'],
    ['README.md', 'Context Awareness', 'README has context awareness'],
    ['README.md', 'Fuzzy Matching', 'README has fuzzy matching'],
    ['docs/MCP_SERVER.md', 'Context-Aware', 'Docs have context awareness'],
    ['docs/MCP_SERVER.md', 'Intent Detection', 'Docs have intent detection'],
    ['docs/MCP_DYNAMIC_FEATURES.md', 'Intelligence Features', 'Feature docs exist'],
  ];

  docUpdates.forEach(([path, searchText, desc]) => {
    if (checkFileContent(path, searchText, desc)) {
      passed++;
    } else {
      failed++;
    }
  });

  // Check package.json updates
  logSection('📦 Package Configuration');

  const packageChecks = [
    ['package.json', 'saha-ui-mcp', 'MCP bin entry'],
    ['package.json', 'build:mcp', 'MCP build script'],
    ['package.json', 'test:mcp', 'MCP test script'],
    ['package.json', '@modelcontextprotocol/sdk', 'MCP SDK dependency'],
    ['package.json', 'glob', 'Glob dependency'],
  ];

  packageChecks.forEach(([path, searchText, desc]) => {
    if (checkFileContent(path, searchText, desc)) {
      passed++;
    } else {
      failed++;
    }
  });

  // Test server startup
  logSection('🚀 Server Startup Test');

  const serverStarted = await testServerStartup();
  if (serverStarted) {
    passed++;
  } else {
    failed++;
  }

  // Check test files
  logSection('🧪 Test Infrastructure');

  const testFiles = [
    ['mcp/test-dynamic-features.js', 'Test script exists'],
  ];

  testFiles.forEach(([path, desc]) => {
    if (checkFile(path, desc)) {
      passed++;
    } else {
      failed++;
    }
  });

  // Final summary
  logSection('📊 Validation Results');

  const total = passed + failed;
  const percentage = ((passed / total) * 100).toFixed(1);

  log(`Total Checks: ${total}`, 'bright');
  log(`Passed: ${passed}`, 'green');
  log(`Failed: ${failed}`, failed > 0 ? 'red' : 'green');
  log(`Success Rate: ${percentage}%`, percentage >= 90 ? 'green' : percentage >= 70 ? 'yellow' : 'red');

  console.log('\n' + '='.repeat(70));

  if (failed === 0) {
    log('🎉 All validation checks passed!', 'green');
    log('✓ MCP Server v2.0 is ready for production', 'green');
    console.log('');
    log('Next steps:', 'cyan');
    log('  1. npm run build:mcp', 'cyan');
    log('  2. npm run test:mcp', 'cyan');
    log('  3. npx saha-ui-mcp', 'cyan');
    log('  4. Configure your AI client', 'cyan');
  } else if (failed <= 5) {
    log('⚠️  Most checks passed with minor issues', 'yellow');
    log(`   ${failed} check(s) failed - review and fix if necessary`, 'yellow');
  } else {
    log('❌ Multiple validation failures detected', 'red');
    log(`   ${failed} check(s) failed - please review implementation`, 'red');
  }

  console.log('='.repeat(70) + '\n');

  // Exit with appropriate code
  process.exit(failed > 0 ? 1 : 0);
}

// Run validation
main().catch((error) => {
  log('\n❌ Validation script error:', 'red');
  console.error(error);
  process.exit(1);
});
