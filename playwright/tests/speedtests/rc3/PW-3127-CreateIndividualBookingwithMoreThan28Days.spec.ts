import {test,  expect } from '../../../fixtures';

// fixture.ts does the login
test('Cannot book for more than 28 days', async({page}) =>{
    await page.goto('/Booking/NewReservation')
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
    await page.screenshot({ path: 'screenshot/pw-3127-28dayerror.png', fullPage: true });
});