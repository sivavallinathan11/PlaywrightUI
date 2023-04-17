import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import { ResultsDirectory, TestScriptDirectory, XMLResultDirectory } from './tests/data/users';

// // Set default xml result path.
// var resultPath = XMLResultDirectory.RC3;

// // Change result path based on assigned test script directory.
// if(TestScriptDirectory.Path.includes('RC2')){
//   resultPath = XMLResultDirectory.RC2;
// }
// if(TestScriptDirectory.Path.includes('RC4')){
//   resultPath = XMLResultDirectory.RC4;
// }
// if(TestScriptDirectory.Path.includes('RC5')){
//   resultPath = XMLResultDirectory.RC5;
// }
// else if(TestScriptDirectory.Path.toLowerCase().includes('temp-rc3')){
//   resultPath = XMLResultDirectory.TempRC3;
// }

// // Set result path default to RC3.
// var testResultPath = ResultsDirectory.RC3;

// // Change result path based on assigned test script directory.
// if(TestScriptDirectory.Path.includes('RC2')){
//   resultPath = ResultsDirectory.RC2;
// }
// if(TestScriptDirectory.Path.includes('RC4')){
//   testResultPath = ResultsDirectory.RC4;
// }
// if(TestScriptDirectory.Path.includes('RC5')){
//   testResultPath = ResultsDirectory.RC5;
// }
// else if(TestScriptDirectory.Path.toLowerCase().includes('temp-rc3')){
//   testResultPath = ResultsDirectory.TempRC3;
// }

const config: PlaywrightTestConfig = {
  /* Maximum time one test can run for. */
  // timeout: 900000,
  // globalTimeout: 8000000,
  reporter: [['list'], ['junit', {outputFile: 'results.xml'}]],
  testDir: './tests',
  // outputDir: testResultPath,
  workers: 2,
  //testMatch: ["PW-4332-AddBetterOfferTo1stBookingwithNonMemberAndJoinGDayAndLessOfferTo2ndBookingwithMember.spec.ts"],
  use: {
    //trace: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 2560, height: 1440 }
      },
    },

    /*{
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },*/

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
