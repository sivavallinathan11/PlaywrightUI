import test from "@playwright/test";
import { UpsellGuestData } from "../data/users";
import { APIHelper } from "../models/APIHelper";
import { BaseSteps } from "../models/BaseSteps";
import { BookingPage } from "../models/BookingPage";
import { LoginPage } from "../models/LoginPage";
import { ReserveAndPayModal } from "../models/ReserveAndPayModal";

test('Add Membership to Individual Booking then force a booking failure', async({page, request}) =>{
    // Set base object.
    const baseSteps = new BaseSteps();

    // Initialize directory for test.
    const testDetails = await baseSteps.InitializeTestResultDirectory("PW-3407-AddMembershiptoIndividualBookingthenForceBookingFailure");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const booking = new BookingPage(page, testDetails);
    const reservepay = new ReserveAndPayModal(page, testDetails)
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

    // Edit guest booking details.
    var guestDetails = await booking.SetCustomerDetails(customerDetails, bookingDetails);
    var bookingDetails = await booking.EditSelectedBookingReservation(bookingDetails, guestDetails);

    // Verify Updated Booking Overview.
    await booking.VerifyUpdatedBookingOverview(guestDetails, bookingDetails);

    // Get hidden reservation number.
    var reservationNumber = await booking.GetHiddenReservationNumber(guestDetails);

    // Click Confirm Booking button.
    await booking.ClickConfirmBooking();

    // Verify Reserve and Pay Modal.
    await reservepay.VerifyReserveAndPayModal(bookingDetails, guestDetails);

    // Cancel Reservation.
    await apiHelper.CancelMultipleReservation(reservationNumber);

    // Fill up Reserve and Pay Modal fields.
    await reservepay.FillUpReserveAndPayFields(customerDetails);

    // Create new pencil booking using cancelled reservation.
    await apiHelper.CreateNewPencilBookingfromCancelledReservation(reservationNumber);

    // Click Reserve Now button.
    await reservepay.ClickReserveNow();

    // Verify Successful Booking Rerervation.
    await reservepay.VerifyBookingReservationError(guestDetails);

    //#endregion*/
});