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
```
npx playwright test
```
or to see the run in the browser
```
npx playwright test --headed
```
Running a specific test for a single browser
```
npx playwright test tests/tests-RC3/PW-3127-CreateIndividualBookingwithMoreThan28Days.spec.ts --project=chromium
```