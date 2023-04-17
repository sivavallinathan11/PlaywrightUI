import { test } from "@playwright/test";
import { LoginPage } from "../models/LoginPage";
import { BookingDashboardPage } from "../models/BookingDashboardPage";
import { ManageBookingPage } from "../models/ManageBookingPage";
import { APIHelper } from "../models/APIHelper";
import { CheckOutPage } from "../models/CheckoutPage";
import { BaseSteps } from "../models/BaseSteps";

test('Select a reservation from departing then pay using any mode of payment then checkout', async ({page, request}) => {
    // Set basesteps object.
    const baseSteps = new BaseSteps(); 

    // Initialize Test
    var testDetails = await baseSteps.InitializeTestResultDirectory("PW-2383-SR-select-reservation-from-departing-then-pay-using-any-mode-of-payment-and-checkout");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const dashboard = new BookingDashboardPage(page, request, testDetails);
    const managebooking = new ManageBookingPage(page, testDetails);
    const checkout = new CheckOutPage(page, testDetails);
    const apiHelper = new APIHelper(page, request, testDetails);

    //#region Start test.
    //Create a departing reservation for non-member.
    var reservationNumber = await apiHelper.CreateReservation("Departing", "Booking Number");

    // Checkin reservation.
    await apiHelper.CheckinReservation(reservationNumber);

    // Get reservation dates.
    var reserveDates = await apiHelper.GetReservationDates(reservationNumber);

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
    
    // Select reservation based on reservation number.
    var dashboardData = await dashboard.SelectSpecificReservation("Reservation Number", reservationNumber, "Departing", 
    reserveDates);

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

    // Click make a payment button.
    await managebooking.MakeAPayment();

    // Verify guest, accommodation, stay cost, and payment details.
    await managebooking.VerifyStayDetailsAtCapturePaymentModal(mbData);

    // Select payment method and percentage.
    var paymentData = await managebooking.SelectPaymentMethodandPercentage("Cash", mbData.totalBalance, "100");

    // Click process payment.
    await managebooking.ClickProcessPayment();

    // Verify payment made.
    await managebooking.VerifyPaymentMadeInManageBooking(paymentData);

    // Click Checkout button
    await checkout.ClickCheckoutCTA();

    // Verify checkout modal.
    await checkout.ConfirmCheckoutModal(mbData, paymentData.Balance, paymentData.paymentType);

    // Click Confirm button.
    await checkout.ClickConfirmButton();

    // Verify confirmation modal.
    await checkout.VerifyConfirmationDetails(mbData);

    // Verify go to dashboard.
    await checkout.ClickReturnToDashboard();

    // Verify if Dashboard page is displayed.
    await dashboard.VerifyArrivals();

    // Click IN HOUSE tab.
    await dashboard.ClickDepartingTab();

    // Verify In-house tab.
    await dashboard.VerifyDeparting();

    // Search specific reservation.
    await dashboard.FindABooking("Reservation Number", mbData.reservationNumber, "Departing", false);
    
    //#endregion
})