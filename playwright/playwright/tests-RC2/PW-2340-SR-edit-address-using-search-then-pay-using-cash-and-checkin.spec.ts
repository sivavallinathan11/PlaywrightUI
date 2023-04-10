import { test } from "@playwright/test";
import { LoginPage } from "../models/LoginPage";
import { BookingDashboardPage } from "../models/BookingDashboardPage";
import { BaseSteps } from "../models/BaseSteps";
import { CheckInPage } from "../models/CheckInPage";
import { APIHelper } from "../models/APIHelper";
import { MakePaymentModal } from "../models/MakePaymentModal";
import { EditBookingPage } from "../models/EditBookingPage";
import { editGuestDetails } from "../data/users";

test('Edit guest address using search and pay cash then checkin single reservation', async ({page, request}) => {
    // Set basesteps object.
    const baseSteps = new BaseSteps(); 

    // Initialize Test
    var testDetails = await baseSteps.InitializeTestResultDirectory("PW-2340-SR-edit-address-using-search-then-pay-using-cash-and-checkin");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const dashboard = new BookingDashboardPage(page, request, testDetails);
    const editBooking = new EditBookingPage(page, testDetails);
    const checkin = new CheckInPage(page, testDetails);
    const apiHelper = new APIHelper(page, request, testDetails);
    const paymentModal = new MakePaymentModal(page, testDetails);
    const editDetails = editGuestDetails;

    //#region Start test
    //Create a reservation for non-member.
    var reservationNumber = await apiHelper.CreateReservation("Edit details");

    // Navigate to Parkhub login page.
    await login.Open();

    // Login to parkhub using valid credentials.
    await login.EnterCredentials();
    await login.ClickLogin();

    // Navigate to Booking dashboard page.
    await dashboard.Open();

    // Verify booking reservations from the arrivals pane.
    await dashboard.VerifyArrivals();
    
    // Select a partial paid or unpaid single reservation for a guest with vacant clean room 
    //(list: Vacant Clean, Occupied, Vacant Dirty).
    var bookingDetails = await dashboard.SelectSpecificReservation("Reservation Number", reservationNumber);
    var accomDetails = await dashboard.SetBookingDetails(bookingDetails);
    var guestDetails = await dashboard.SetCustomerDetails(bookingDetails, editDetails);

    // Verify Edit Booking Page.
    var currentDetails = await editBooking.VerifyManageBookingPage(bookingDetails);

    // Edit random guest detail
    await editBooking.EditGuestDetails(editDetails, "search address");

    // Verify if edit successful
    await editBooking.VerifyToastMessage();

    // Verify editted details
    await editBooking.VerifyEditedGuestDetails(currentDetails, guestDetails, bookingDetails, "address");

    // Click Make Payment CTA
    await editBooking.ClickMakePayment();

    // Verify if payment modal exist
    await paymentModal.VerifyPaymentModal();

    // Process payment
    var paymentDetails = await paymentModal.MakePaymentInEditBooking(accomDetails, guestDetails, "cash");

    // Verify payment
    await editBooking.VerifyPayments(paymentDetails);

    // Verify if disabled
    await editBooking.VerifyCTA();

    // Click Check In
    await editBooking.ClickManageBookingCheckInButton();

    // Verify Check In Page
    await checkin.VerifyCheckInPage(bookingDetails);

    // Verify Payments in Check In Page
    await checkin.VerifyPayments(paymentDetails);

    // Verify complete check in is disabled
    await checkin.VerifyCTA();

    // Reservation Check In
    await checkin.ProceedToCheckIn(accomDetails, guestDetails);

    // Verify Arrivals Dashborad
    await dashboard.VerifyArrivals();

    // Verify booking in inhouse dashboard
    await dashboard.VerifyBookingInhouseDashboard(accomDetails);
    
    //#endregion
})