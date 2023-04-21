import {test } from "@playwright/test";
import { LoginPage } from "../../models/LoginPageV2";
import { BookingPageV2 } from "../../models/BookingPageV2";
import { UpsellGuestData } from "../../data/users";


test('Load accommodations screenshot', async({page}) =>{
    
    // Set page objects.
    const login = new LoginPage(page);
    const booking = new BookingPageV2(page);
    const customerDetails = UpsellGuestData;

    await page.goto('/Booking/NewReservation');
    await login.Login();
    // await page.screenshot({ path: 'screenshots/screenshot.png', fullPage: true });

    // Verify new reservation page.
    // await booking.VerifyNewReservationPage();
    var dateWidget = "#gr-search-date-input";
    var locator = page.locator(dateWidget)
    await locator.click()
    await page.getByRole('cell', { name: '1', exact: true }).nth(2).click()
    await page.getByRole('cell', { name: '2', exact: true }).nth(2).click()
    

    await page.getByRole('button', { name: 'Confirm', exact: true }).click()
    //get the text display from the calendar
    
    
    
    await booking.SetNumberOfGuests(customerDetails.adults, customerDetails.child, customerDetails.infant)

    // rewritten the ClickSearch in POM to use playwright test features
    await booking.ClickSearch();

    // wait for the accoms to load
    // then take the screenshot

    await page.screenshot({ path: 'screenshot/accommodation.png', fullPage: true });
});