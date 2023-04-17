import test from "@playwright/test";
import { GuestDatawithMoreThan28Days, MoreThan28DaysMessage } from "../data/users";
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
    await login.Open();

    // Login to parkweb using valid credentials.
    await login.EnterCredentials();
    await login.ClickLogin();
    
    // Navigate to create new booking page.
    await booking.Open();

    // Verify new reservation page.
    await booking.VerifyNewReservationPage();
    
    // Set date range.
    await booking.SetReservationDateRange(customerDetails.arrival, customerDetails.departure);

    // Verify expected error message.
    await booking.VerifyDateRangeErrorMessage(MoreThan28DaysMessage);

    //#endregion*/
});