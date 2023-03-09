import test from "@playwright/test";
import { Accommodation, UpsellGuestData } from "../data/users";
import { APIHelper } from "../models/APIHelper";
import { BaseSteps } from "../models/BaseSteps";
import { BookingPage } from "../models/BookingPage";
import { LoginPage } from "../models/LoginPage";

test('Create an individual booking the delete in the quote page', async({page, request}) =>{
    // Set base object.
    const baseSteps = new BaseSteps();

    // Initialize directory for test.
    const testDetails = await baseSteps.InitializeTestResultDirectory("PW-3130-AddIndividualBookingandDeleteInQuotePage");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const booking = new BookingPage(page, testDetails);
    const apiHelper = new APIHelper(page, request, testDetails);
    const customerDetails = UpsellGuestData;

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

    // Get Park Details.
    var parkDetails = await apiHelper.GetParkDetails();

    // Select accommodation based on numbers of booking. 
    var bookingDetails = await booking.CreateBookingReservation(customerDetails, 1, "Random", parkDetails);

    // Verify added accommodation.
    await booking.VerifyAddedAccommodationDetails(bookingDetails);

    // Verify confirm button is disabled as no guest is added.
    await booking.VerifyConfirmButtonIsDisabled();

    // Delete selected accommodation and verify it will not be displayed in the quote section.
    await booking.DeleteAccommodation(bookingDetails, "All");

    //#endregion*/
});