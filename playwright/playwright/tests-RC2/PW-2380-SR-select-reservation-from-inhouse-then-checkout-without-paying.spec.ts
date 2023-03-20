import { test } from "@playwright/test";
import { LoginPage } from "../models/LoginPage";
import { BookingDashboardPage } from "../models/BookingDashboardPage";
import { ManageBookingPage } from "../models/ManageBookingPage";
import { APIHelper } from "../models/APIHelper";
import { CheckOutPage } from "../models/CheckoutPage";
import { BaseSteps } from "../models/BaseSteps";

test('Select a reservation from in-house then checkout without paying', async ({page, request}) => {
    // Set baseSteps object.
    const baseSteps = new BaseSteps(); 

    // Initialize Test
    var testDetails = await baseSteps.InitializeTestResultDirectory("PW-2380-SR-select-reservation-from-inhouse-then-checkout-without-paying");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const dashboard = new BookingDashboardPage(page, request, testDetails);
    const managebooking = new ManageBookingPage(page, testDetails);
    const checkout = new CheckOutPage(page, testDetails);
    const apiHelper = new APIHelper(page, request, testDetails);

    //#region Start test.
    //Create a reservation for non-member.
    var reservationNumber = await apiHelper.CreateReservation("Checkin", "Booking Number");

    // Checkin reservation.
    await apiHelper.CheckinReservation(reservationNumber);

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
    await dashboard.ClickInHouseTab();

    // Verify Inhouse tab displayed.
    await dashboard.VerifyInhouse();
    
    // Select an unpaid single reservation for a guest with vacant dirty room (list: Vacant Dirty, Occupied, Vacant Dirty).
    var dashboardData = await dashboard.SelectSpecificReservation("Reservation Number", reservationNumber, "In House");

    // Verify customer name and reservation number from manage booking.
    await managebooking.VerifyCustomerNameAndReservationNumber(dashboardData.firstName, 
        dashboardData.lastName, dashboardData.reservationNumber);

    // Get accommodation details.
    var accomodationDetails = await managebooking.VerifyAccommodationDetails(dashboardData);

    // Get stay cost breakdown.
    var stayCostDetails = await managebooking.VerifyTotalStayCostBreakdown(dashboardData);

    // Get payment details.
    var paymentDetails = await managebooking.VerifyPaymentDetails(dashboardData);

    // Set all details.
    var mbData = await managebooking.SetManageBookingDetails(accomodationDetails + "|" + 
    stayCostDetails + "|" + paymentDetails, dashboardData);

    // Click Checkout button
    await checkout.ClickCheckoutCTA();

    // Verify checkout modal.
    await checkout.ConfirmCheckoutModal(mbData, mbData.totalBalance, mbData.paymentType);

    // Click Confirm button.
    await checkout.ClickConfirmButton();

    // Verify confirmation modal.
    await checkout.VerifyConfirmationDetails(mbData);

    // Verify go to dashboard.
    await checkout.ClickReturnToDashboard();

    // Verify if Dashboard page is displayed.
    await dashboard.VerifyArrivals();

    // Click IN HOUSE tab.
    await dashboard.ClickInHouseTab();

    // Verify In-house tab.
    await dashboard.VerifyInhouse();

    // Search specific reservation.
    await dashboard.FindABooking("Reservation Number", mbData.reservationNumber, "In House", false);
    
    //#endregion
})