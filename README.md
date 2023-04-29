# Introduction
[Playwright](https://playwright.dev/)
Playwright is an end-to-end testing framework written in typescript.
This test suite covers the ParkWeb/Bolt UI.
##Dependencies
[Node](https://nodejs.org/en/download)

## Visual Studio Code Setup
This isn't essential but can be very helpful. Install the Playwright Test for VS Code Extension:
[Playwright Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
## Setup
Navigate to the playwright folder:
```
cd playwright
```
install node dependencies defined in the package.json filer
```
npm install
```
install playwright
```
npx playwright install
```
#Run Tests in Chrome
The following environment files have been created in the env folder for these tests:
dev.env
test.env

Usernames and passwords will eventually be extracted there so they can be setup as secrets on the piplines.

###To switch between environments
Update the playwright.config.ts

```
dotenv.config({ path: path.resolve(__dirname, './env', 'dev.env') });
```


```
npx playwright test
```
or to see the run in the browser
```
npx playwright test --headed
```

# Authentication
Each test requires a login. This is achieved via the fixture fixture.ts
To make use of it tests need to import the fixture rather than playwright:
```
import {test,  expect } from '../../../../../playwright/fixtures';
```