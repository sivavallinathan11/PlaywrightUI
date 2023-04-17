import { test } from "@playwright/test";
import { LoginPage } from "../models/LoginPage";
import { BookingDashboardPage } from "../models/BookingDashboardPage";
import { ManageBookingPage } from "../models/ManageBookingPage";
import { CheckInPage } from "../models/CheckInPage";
import { APIHelper } from "../models/APIHelper";
import { BaseSteps } from "../models/BaseSteps";

test('Partially pay reservation using eftpos in MB then pay remaining using cc in checkin', async ({page, request}) => {
    // Set basesteps object.
    const baseSteps = new BaseSteps(); 

    // Initialize Test
    var testDetails = await baseSteps.InitializeTestResultDirectory("PW-2371-SR-partially-pay-reservation-using-eftpos-in-MB-then-pay-remaining-using-cc-in-checkin");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const dashboard = new BookingDashboardPage(page, request, testDetails);
    const managebooking = new ManageBookingPage(page, testDetails);
    const checkin = new CheckInPage(page, testDetails);
    const apiHelper = new APIHelper(page, request, testDetails);

    //#region Start test.
    //Create a reservation for non-member.
    var reservationNumber = await apiHelper.CreateReservation("Partial", "Booking Number");

    // Navigate to Parkhub login page.
    await login.Open();

    // Login to parkhub using valid credentials.
    await login.EnterCredentials();
    await login.ClickLogin();

    // Navigate to Booking dashboard page.
    await dashboard.Open();

    // Verify booking reservations from the arrivals pane.
    await dashboard.VerifyArrivals();
    
    // Select an unpaid single reservation for a guest with vacant dirty room (list: Vacant Dirty, Occupied, Vacant Dirty).
    var dashboardData = await dashboard.SelectSpecificReservation("Reservation Number", reservationNumber);

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
    var paymentData = await managebooking.SelectPaymentMethodandPercentage("EFTPOS", mbData.totalBalance, "50");

    // Click process payment.
    await managebooking.ClickProcessPayment();

    // Verify payment made.
    await managebooking.VerifyPaymentMadeInManageBooking(paymentData, "EFTPOS");

    // Check check in.
    await managebooking.ClickCheckInButton();

    // Verify name and reservation number.
    await checkin.VerifyNameAndReservationNumber(mbData);

    // Check disabled Complete CheckIn button.
    await checkin.VerifyDisabledCompleteCheckInButton();

    // Verify reservation details.
    await checkin.VerifyReservationDetails(mbData);

    // Verify Stay Cost breakdown.
    await checkin.VerifyStayCostBreakdown(mbData);

    // Verify payment made.
    await checkin.VerifyLatestPaymentMade(paymentData);

    // Click Make a Payment button.
    await checkin.MakeAPayment();

    // Select payment method and percentage.
    var newPaymentData = await checkin.SelectPaymentMethodandPercentage("Credit Card", paymentData.balance, "100");

    // Click process payment.
    await checkin.ClickProcessPayment();

    // Verify payment made.
    await checkin.VerifyLatestPaymentMade(newPaymentData, "Credit Card");

    // Check Complete Covid Declaration.
    await checkin.CompleteCovidDeclaration();

    // Check terms and conditions.
    await checkin.ClickTermsAndConditions();

    // Click Complete Checkin
    await checkin.ClickCompleteCheckIn();

    // Verify checkin complete confirmation.
    await checkin.ProceedCheckInBasedOnRoomStatus(mbData);

    // Click Booking Dashboard.
    await checkin.ClickBookingDashboard();

    // Verify if Dashboard page is displayed.
    await dashboard.VerifyArrivals();

    // Click IN HOUSE tab.
    await dashboard.ClickInHouseTab();

    // Verify In House list is displayed.
    await dashboard.VerifyInhouse();

    // Search specific reservation.
    await dashboard.FindABooking("Reservation Number", mbData.reservationNumber, "In House");

    // Verify reservation details in the In House tab.
    await dashboard.VerifyPaidReservationFromInHouse(mbData, newPaymentData);

    // This will checkout the reservation from the in-house.
    await apiHelper.CheckoutReservation(mbData.reservationNumber);
    
    //#endregion
})