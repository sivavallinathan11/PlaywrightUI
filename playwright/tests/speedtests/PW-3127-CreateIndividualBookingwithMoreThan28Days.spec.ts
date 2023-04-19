import test, { expect } from "@playwright/test";
import { GuestDatawithMoreThan28Days, MoreThan28DaysMessage, TestingEnvironment, URL } from "../data/users";
import { BaseSteps } from "../models/BaseSteps";
import { BookingPage } from "../models/BookingPage";
import { LoginPage } from "../models/LoginPage";

test('Create and pay an individual booking with more than 28 days', async({page}) =>{
    // Set base object.
    const baseSteps = new BaseSteps();

    // Initialize directory for test.
    const testDetails = await baseSteps.InitializeTestResultDirectory("PW-3127-CreateIndividualBookingwithMoreThan28Days");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
  
    await page.goto('/Booking/NewReservation', {timeout: 90000});
    await login.JustLoginFFS();
    await page.screenshot({ path: 'screenshots/screenshot.png', fullPage: true });

    // Verify new reservation page.
    // await booking.VerifyNewReservationPage();
    var dateWidget = "#gr-search-date-input";
    var locator = page.locator(dateWidget)
    await locator.click()
    await page.getByRole('cell', { name: '1', exact: true }).nth(2).click()
    await page.getByRole('cell', { name: '1', exact: true }).nth(3).click()
    

    await page.getByRole('button', { name: 'Confirm', exact: true }).click()
    //get the text display from the calendar
    var textValue = await page.$eval<string, HTMLSelectElement>(dateWidget, ele => ele.value); 
    
    await expect(textValue).toBe('Cannot select more than 28 nights')


});