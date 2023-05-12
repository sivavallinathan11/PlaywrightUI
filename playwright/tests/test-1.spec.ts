import { test, expect, selectors } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://test-auth-gday-fd.azurefd.net/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DCMSK12%26redirect_uri%3Dhttps%253A%252F%252Ftest.gdaynetwork.com.au%26response_type%3Dcode%2520id_token%26scope%3Dopenid%2520profile%26state%3DOpenIdConnect.AuthenticationProperties%253DA19hyl9P80tAVDb03tgI28P4cMxqVAGuVrevrUKIQ_0qJYCOLRdPDLmzhhk2cCIGtyrNrWVoIET4y1Cf1Ali2DHXyI94OXWdHy7vCVrJC3SWMNpHcbnnMNcSw00JI4YFaamJFsOQQ_cFz7xljl8IfWge2TmgY405I9ei_Fo8XYrCcYB-WC31d4sQEpNaMOhOkQD-D-j11DqFDFw_sHuNVA3ytQcMPJ1eEFxDSLkr6Zs%26response_mode%3Dform_post%26nonce%3D638182933182930955.NmVjZmE0OTItZWRiZS00ZTkzLTg5NGQtZTFmMzRiMDFlNWZlN2Q4NTA3YzMtN2YyNC00ZGIyLWFmNmItNTA2ZmUwMjgwZDI4%26x-client-SKU%3DID_NET461%26x-client-ver%3D6.6.0.0');

  page.getByRole('cell', { name: '7', exact: true }).nth(1)
  page.getByRole('cell', { name: '30' }).nth(2)
  page.locator('.drp-calendar.right ')
  selectors.setTestIdAttribute('data-title');
  let rightCalendar = page.locator('.drp-calendar.right').getByTestId("r0c3").click();
  const handle = await page.$('data-title=r1c0')
  
});