import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://test-auth-gday-fd.azurefd.net/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DCMSK12%26redirect_uri%3Dhttps%253A%252F%252Ftest.gdaynetwork.com.au%26response_type%3Dcode%2520id_token%26scope%3Dopenid%2520profile%26state%3DOpenIdConnect.AuthenticationProperties%253DH4W198f3eF-oxBUfL32tQ7ACy7TRsuqOoTxcrAIKTjog3QjrVkT7_RXvT8VJPg7-8-cjmry24bDVJ44uBDdh2srJAa70YtnUuEAdPYby9Lut-OpP4o9uWV9z-Vt_GQUBYI2HytMoJCQkP--VNmClbKzTp3bbhJy-gkllCwuDJBcSFpVAVfvYOuvMfAl-PWbCV2BmE-E9GDxm1tmuzZV0NIjhNJ09SI8iA5XPH9qbcYw%26response_mode%3Dform_post%26nonce%3D638183180085325139.ZWJkMmU5YzUtNGVhOC00MjJjLWI1MGItNTA2MDg0ZmRiOWE5NDBhMjcwOGYtMDkxNS00MTFmLThmYzMtNDZiY2QwNjA0YWQ0%26x-client-SKU%3DID_NET461%26x-client-ver%3D6.6.0.0');
  page.click("[data-title='r1c0']");
  let rightCalendar1 = page.locator(".drp-calendar.right").getByRole('cell', {name: '6', exact:true}).first();
  let rightCalendar = page.locator(".drp-calendar.right").getByRole('cell', {name: '30', exact:true}).first();
  page.locator("[date-title='r1c0']");
});