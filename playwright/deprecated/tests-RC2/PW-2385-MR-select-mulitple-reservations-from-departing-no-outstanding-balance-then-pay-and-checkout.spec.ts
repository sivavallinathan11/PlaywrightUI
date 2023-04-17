import { test } from "@playwright/test";
import { LoginPage } from "../models/LoginPage";
import { BookingDashboardPage } from "../models/BookingDashboardPage";
import { APIHelper } from "../models/APIHelper";
import { BaseSteps } from "../models/BaseSteps";

test('Select multiple reservation from departing with at least 1 outstanding balance then pay and checkout', async ({page, request}) => {
    // Set basesteps object.
    const baseSteps = new BaseSteps(); 

    // Initialize Test
    var testDetails = await baseSteps.InitializeTestResultDirectory("PW-2385-MR-select-mulitple-reservations-from-departing-no-outstanding-balance-then-pay-and-checkout");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const dashboard = new BookingDashboardPage(page, request, testDetails);
    const apiHelper = new APIHelper(page, request, testDetails);

    //#region Start test.
    //Create a multiple departing reservations for non-member with at least 1 outstanding balance.
    var reservations = await apiHelper.CreateMultipleReservations("Multiple Departing No Balance", 
    "Booking Number", 2, 2);
    await apiHelper.CheckinMulpleReservations(reservations);

    // Navigate to Parkhub login page.
    await login.Open();

    // Login to parkhub using valid credentials.
    await login.EnterCredentials();
    await login.ClickLogin();

    // Navigate to Booking dashboard page.
    await dashboard.Open();

    // Verify booking reservations from the arrivals pane.
    await dashboard.VerifyArrivals();

    // Navigate to In-house dashboard.
    await dashboard.ClickDepartingTab();

    // Verify Inhouse tab displayed.
    await dashboard.VerifyDeparting();
    
    // Select multiple reservations based on reservation number.
    await dashboard.SelectMultipleReservationsViaReservationNumber(reservations, "Departing");

    // Click Checkout Selected button.
    await dashboard.ClickCheckOutSelected();

    // Verify if the Confirm Checkout modal is displayed with outstanding balance.
    await dashboard.VerifyConfirmCheckoutModal(reservations.length);

    // Click Confirm button from the Confirm Checkout modal.
    await dashboard.ClickConfirmCheckout();

    // Verify if the checkout confirmation modal is displayed with correct message.
    await dashboard.VerifyCheckoutConfirmation(reservations.length);
    
    // Click Return to Dashboard.
    await dashboard.ClickReturnToDashboard();

    // Verify Inhouse Dashboard.
    await dashboard.VerifyDepartingDashboard();
    //#endregion*/
})