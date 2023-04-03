import { test } from "@playwright/test";
import { LoginPage } from "../models/LoginPage";
import { BookingDashboardPage } from "../models/BookingDashboardPage";
import { EditBookingPage } from "../models/EditBookingPage";
import { CheckInPage } from "../models/CheckInPage";
import { APIHelper } from "../models/APIHelper";
import { BaseSteps } from "../models/BaseSteps";
import { SmokeSteps } from "../models/SmokeSteps";
import { MakePaymentModal } from "../models/MakePaymentModal";
import { editGuestDetails } from "../data/users";

test('Edit guest details and pay cash then checkin single reservation', async ({page, request}) => {
    // Set basesteps object.
    const baseSteps = new BaseSteps(); 

    // Initialize Test
    var testDetails = await baseSteps.InitializeTestResultDirectory("PW-2338-SR-edit-guest-details-pay-using-cash-then-checkin");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const dashboard = new BookingDashboardPage(page, request, testDetails);
    const editBooking = new EditBookingPage(page, testDetails);
    const checkin = new CheckInPage(page, testDetails);
    const apiHelper = new APIHelper(page, request, testDetails);
    const smokeSteps = new SmokeSteps(page, testDetails);
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

    // Verify Edit Booking Page.
    var currentDetails = await editBooking.VerifyManageBookingPage(bookingDetails);

    // Edit random guest detail
    await editBooking.EditGuestDetails(editDetails);

    // Verify if edit successful
    await editBooking.VerifyToastMessage();

    // Verify editted details
    //await editBooking.VerifyEditedGuestDetails(currentDetails);

    // Click Make Payment CTA
    await editBooking.ClickMakePayment();

    // Verify if payment modal exist
    await paymentModal.VerifyPaymentModal();

    // Verify reservation details
    await paymentModal.VerifyReservationDetails(bookingDetails);

    await paymentModal.SelectPaymentMethod(bookingDetails, );

}) 