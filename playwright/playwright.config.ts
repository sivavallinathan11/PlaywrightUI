// import type { PlaywrightTestConfig } from '@playwright/test';
import { PlaywrightTestConfig, devices } from '@playwright/test';
import { ResultsDirectory, TestScriptDirectory, XMLResultDirectory } from './tests/data/users';
import dotenv from 'dotenv';
import path from 'path';
// Alternatively, read from "../my.env" file.
dotenv.config({ path: path.resolve(__dirname, './env', 'test.env') });



const config: PlaywrightTestConfig = {

  reporter: [['list', {printSteps: true}], ['junit', {outputFile: 'results.xml'}]],
  testDir: './tests',
  outputDir: './artifacts',
  fullyParallel: true,
  retries: 3,
  workers: process.env.CI ? 2 : undefined,

  use: {

    baseURL: process.env.ENV, // === '1' ? 'https://test.gdaynetwork.com.au/' : 'https://dev.gdaynetwork.com.au/',
    screenshot: 'only-on-failure',
    
  },

  /* Configure projects for major browsers */
  projects: [    
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
       // viewport: { width: 2560, height: 1440 }
        viewport: { width: 2480, height: 1439 }
      },
      
    },
    {
      name: 'Microsoft Edge',
      use: {
        // Supported Microsoft Edge channels are: msedge, msedge-beta, msedge-dev, msedge-canary
        channel: 'msedge',
      },
    },
    {
      name: 'ipad portrait',
      use: {
        ...devices['Desktop Chrome'],
        // ipad portrait mode
        viewport: { width: 810, height: 1080 }
      },
      
    },
    
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
