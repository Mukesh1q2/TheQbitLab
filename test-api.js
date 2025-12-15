#!/usr/bin/env node

/**
 * TheQbitlabs Platform - API Testing Script
 * Tests all API routes to ensure backend functionality
 */

const http = require('http');
const https = require('https');
const { URL } = require('url');

// Test configuration
const config = {
  baseUrl: 'http://localhost:3000',
  timeout: 5000,
  endpoints: [
    // Core API endpoints
    { path: '/api/projects', method: 'GET', expectedStatus: 200 },
    { path: '/api/contact', method: 'POST', expectedStatus: 200 },
    { path: '/api/newsletter', method: 'POST', expectedStatus: 200 },
    { path: '/api/analytics', method: 'POST', expectedStatus: 200 },
    { path: '/api/openai/chat', method: 'POST', expectedStatus: 200 },
    { path: '/api/auth/session', method: 'GET', expectedStatus: 200 },
    
    // Static endpoints
    { path: '/robots.txt', method: 'GET', expectedStatus: 200 },
    { path: '/sitemap.xml', method: 'GET', expectedStatus: 200 },
    
    // Page routes
    { path: '/', method: 'GET', expectedStatus: 200 },
    { path: '/about', method: 'GET', expectedStatus: 200 },
    { path: '/services', method: 'GET', expectedStatus: 200 },
    { path: '/projects', method: 'GET', expectedStatus: 200 },
    { path: '/blog', method: 'GET', expectedStatus: 200 },
    { path: '/contact', method: 'GET', expectedStatus: 200 },
    { path: '/marketplace', method: 'GET', expectedStatus: 200 },
    { path: '/playground', method: 'GET', expectedStatus: 200 },
    { path: '/training', method: 'GET', expectedStatus: 200 },
    { path: '/admin', method: 'GET', expectedStatus: 200 },
  ]
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Test results
const results = {
  passed: 0,
  failed: 0,
  errors: [],
  details: []
};

// Make HTTP request
function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: method,
      headers: {
        'User-Agent': 'TheQbitlabs-API-Test/1.0',
        'Accept': 'application/json',
      }
    };

    if (data && method !== 'GET') {
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(data));
    }

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: body,
          method: method,
          url: url
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.setTimeout(config.timeout, () => {
      req.destroy();
      reject(new Error(`Request timeout after ${config.timeout}ms`));
    });

    if (data && method !== 'GET') {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Test individual endpoint
async function testEndpoint(endpoint) {
  const url = `${config.baseUrl}${endpoint.path}`;
  let result;
  
  try {
    console.log(`${colors.cyan}Testing:${colors.reset} ${endpoint.method} ${endpoint.path}`);
    
    // Prepare test data for POST requests
    let testData = null;
    if (endpoint.method === 'POST') {
      switch (endpoint.path) {
        case '/api/contact':
          testData = {
            name: 'Test User',
            email: 'test@example.com',
            message: 'This is a test message'
          };
          break;
        case '/api/newsletter':
          testData = {
            email: 'newsletter@example.com'
          };
          break;
        case '/api/analytics':
          testData = {
            event: 'page_view',
            page: '/',
            timestamp: new Date().toISOString()
          };
          break;
        case '/api/openai/chat':
          testData = {
            message: 'Hello, this is a test message',
            model: 'gpt-3.5-turbo'
          };
          break;
      }
    }
    
    result = await makeRequest(url, endpoint.method, testData);
    
    const passed = result.status === endpoint.expectedStatus;
    
    if (passed) {
      console.log(`${colors.green}✓ PASSED${colors.reset} - Status: ${result.status}`);
      results.passed++;
    } else {
      console.log(`${colors.red}✗ FAILED${colors.reset} - Expected: ${endpoint.expectedStatus}, Got: ${result.status}`);
      results.failed++;
      results.errors.push(`${endpoint.method} ${endpoint.path} - Expected ${endpoint.expectedStatus}, got ${result.status}`);
    }
    
    results.details.push({
      endpoint: `${endpoint.method} ${endpoint.path}`,
      status: result.status,
      expected: endpoint.expectedStatus,
      passed: passed,
      responseTime: 'N/A' // Could add timing here
    });
    
  } catch (error) {
    console.log(`${colors.red}✗ ERROR${colors.reset} - ${error.message}`);
    results.failed++;
    results.errors.push(`${endpoint.method} ${endpoint.path} - ${error.message}`);
    
    results.details.push({
      endpoint: `${endpoint.method} ${endpoint.path}`,
      status: 'ERROR',
      expected: endpoint.expectedStatus,
      passed: false,
      error: error.message
    });
  }
}

// Main test runner
async function runTests() {
  console.log(`${colors.bright}${colors.magenta}=====================================${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}  TheQbitlabs API Testing Suite${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}=====================================${colors.reset}`);
  console.log(`${colors.cyan}Base URL:${colors.reset} ${config.baseUrl}`);
  console.log(`${colors.cyan}Timeout:${colors.reset} ${config.timeout}ms`);
  console.log(`${colors.cyan}Endpoints to test:${colors.reset} ${config.endpoints.length}`);
  console.log('');
  
  // Test each endpoint
  for (const endpoint of config.endpoints) {
    await testEndpoint(endpoint);
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Print summary
  console.log('');
  console.log(`${colors.bright}${colors.magenta}=====================================${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}           Test Summary${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}=====================================${colors.reset}`);
  
  const total = results.passed + results.failed;
  const passRate = total > 0 ? ((results.passed / total) * 100).toFixed(1) : 0;
  
  console.log(`${colors.green}Passed:${colors.reset} ${results.passed}`);
  console.log(`${colors.red}Failed:${colors.reset} ${results.failed}`);
  console.log(`${colors.yellow}Total:${colors.reset} ${total}`);
  console.log(`${colors.cyan}Success Rate:${colors.reset} ${passRate}%`);
  
  if (results.errors.length > 0) {
    console.log('');
    console.log(`${colors.red}${colors.bright}Errors:${colors.reset}`);
    results.errors.forEach(error => {
      console.log(`${colors.red}  • ${error}${colors.reset}`);
    });
  }
  
  console.log('');
  console.log(`${colors.bright}${colors.magenta}=====================================${colors.reset}`);
  
  // Exit with appropriate code
  process.exit(results.failed > 0 ? 1 : 0);
}

// Check if server is running first
async function checkServer() {
  try {
    await makeRequest(config.baseUrl);
    return true;
  } catch (error) {
    console.log(`${colors.red}Error:${colors.reset} Cannot connect to server at ${config.baseUrl}`);
    console.log(`${colors.yellow}Please ensure the Next.js development server is running:${colors.reset}`);
    console.log(`${colors.cyan}  npm run dev${colors.reset}`);
    console.log(`${colors.cyan}  or${colors.reset}`);
    console.log(`${colors.cyan}  yarn dev${colors.reset}`);
    return false;
  }
}

// Run the tests
if (require.main === module) {
  (async () => {
    const serverRunning = await checkServer();
    if (serverRunning) {
      await runTests();
    } else {
      process.exit(1);
    }
  })();
}

module.exports = { runTests, testEndpoint };