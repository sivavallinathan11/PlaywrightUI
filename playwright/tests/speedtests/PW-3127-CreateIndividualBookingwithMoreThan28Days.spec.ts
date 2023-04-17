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
    const booking = new BookingPage(page, testDetails);
    const customerDetails = GuestDatawithMoreThan28Days;

    //#region Start Test.
    // Navigate to Parkweb login page.
    var url = URL.NewReservation;
    if(TestingEnvironment.toLowerCase().trim()=="dev"){
        url = URL.DEV_NewReservation;
    }
    

    await login.JustLoginFFS();
    await page.goto(url, {timeout: 90000});
    await page.screenshot({ path: 'screenshots/screenshot.png', fullPage: true });

    // Verify new reservation page.
    // await booking.VerifyNewReservationPage();
    var dateWidget = "#gr-search-date-input";
    var locator = page.locator(dateWidget)
    await locator.click()
    await page.getByRole('cell', { name: '1', exact: true }).nth(2).click()
    await page.getByRole('cell', { name: '1', exact: true }).nth(3).click()
    

    await page.getByRole('button', { name: 'Confirm', exact: true }).click()
    
    var textValue = await page.$eval<string, HTMLSelectElement>(dateWidget, ele => ele.value); 
    
    await expect(textValue).toBe(MoreThan28DaysMessage)


    //#endregion*/
});