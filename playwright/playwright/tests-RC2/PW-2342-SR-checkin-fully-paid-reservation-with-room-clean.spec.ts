import { test } from "@playwright/test";
import { LoginPage } from "../models/LoginPage";
import { BookingDashboardPage } from "../models/BookingDashboardPage";
import { EditBookingPage } from "../models/EditBookingPage";
import { CheckInPage } from "../models/CheckInPage";
import { APIHelper } from "../models/APIHelper";
import { BaseSteps } from "../models/BaseSteps";

test('Select fully paid and clean reservation then checkin', async ({page, request}) => {
    // Set basesteps object.
    const baseSteps = new BaseSteps(); 

    // Initialize Test
    var testDetails = await baseSteps.InitializeTestResultDirectory("PW-2342-SR-checkin-fully-paid-reservation-with-room-clean");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const dashboard = new BookingDashboardPage(page, request, testDetails);
    const editBooking = new EditBookingPage(page, testDetails);
    const checkin = new CheckInPage(page, testDetails);
    const apiHelper = new APIHelper(page, request, testDetails);

    //#region Start test
    // This will create a reservation.
    const bookingNumber = await apiHelper.CreateReservation("Non-Member");
    
    // This will create multiple payments for reservation created above
    await apiHelper.CreateSingleOrMultiplePayments(bookingNumber, "eftpos", 1);

    // Search Payment(s)
    var paymentDetails = await apiHelper.SearchTransactions(bookingNumber);
    
    // Navigate to Parkhub login page.
    await login.Open();

    // Login to parkhub using valid credentials.
    await login.EnterCredentials();
    await login.ClickLogin();

    // Navigate to Booking dashboard page.
    await dashboard.Open();

    // Verify booking reservations from the arrivals pane.
    await dashboard.VerifyArrivals();
    
    // Select a reservation based on reservation number
    var dashboardData = await dashboard.SelectSpecificReservation("Reservation Number", bookingNumber);


    // Verify customer name and reservation number from manage booking.
    await managebooking.VerifyCustomerNameAndReservationNumber(dashboardData.firstName, dashboardData.lastName, 
        dashboardData.reservationNumber);

    // Get accommodation details.
    var accomodationDetails = await managebooking.VerifyAccommodationDetails(dashboardData);

    // Get stay cost breakdown.
    var stayCostDetails = await managebooking.VerifyTotalStayCostBreakdown(dashboardData);

    // Get payment details.
    var paymentDetails = await managebooking.VerifyPaymentDetails(dashboardData);

    // Set all details.
    var mbData = await managebooking.SetManageBookingDetails(accomodationDetails +"|"+ 
    stayCostDetails +"|"+ paymentDetails, dashboardData);

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
    await checkin.VerifyPaymentDetails(mbData);

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
    await dashboard.VerifyReservationDetailsFromInHouse(mbData);

    // This will checkout the reservation from the in-house.
    await apiHelper.CheckoutReservation(mbData.reservationNumber);
    
    //#endregion*/
})