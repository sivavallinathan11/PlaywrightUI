import test, { expect } from "@playwright/test";
import { LoginPage } from "../../../models/LoginPageV2";

test('Create and pay an individual booking with more than 28 days', async({page}) =>{
    // Set base object.
    

    // Set page objects.
    const login = new LoginPage(page);
  
    await page.goto('/Booking/NewReservation');
    await login.Login();
    // await page.screenshot({ path: 'screenshots/screenshot.png', fullPage: true });

    // Verify new reservation page.
    // await booking.VerifyNewReservationPage();
    var dateWidget = "#gr-search-date-input";
    var locator = page.locator(dateWidget)
    await locator.click()
    // as long as the first calendar contains the current month, 
    //then we only need to from 1 to 1 on the right calendar
    await page.getByRole('cell', { name: '1', exact: true }).nth(2).click()
    await page.getByRole('cell', { name: '1', exact: true }).nth(3).click()
    

    await page.getByRole('button', { name: 'Confirm', exact: true }).click()
    //get the text display from the calendar
    var textValue = await page.$eval<string, HTMLSelectElement>(dateWidget, ele => ele.value); 
    
    await expect(textValue).toBe('Cannot select more than 28 nights')


});