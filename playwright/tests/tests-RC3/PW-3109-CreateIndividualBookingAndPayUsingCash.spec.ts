import test from "@playwright/test";
import { Accommodation, GuestData } from "../data/users";
import { APIHelper } from "../models/APIHelper";
import { BaseSteps } from "../models/BaseSteps";
import { BookingConfirmationModal } from "../models/BookingConfirmationModal";
import { BookingPage } from "../models/BookingPage";
import { LoginPage } from "../models/LoginPage";
import { ReserveAndPayModal } from "../models/ReserveAndPayModal";

test('Create and pay an individual booking using cash', async({page, request}) =>{
    // Set base object.
    const baseSteps = new BaseSteps();

    // Initialize directory for test.
    const testDetails = await baseSteps.InitializeTestResultDirectory("PW-3109-CreateIndividualBookingAndPayUsingCash");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const booking = new BookingPage(page, testDetails);
    const reservepay = new ReserveAndPayModal(page, testDetails)
    const confirm = new BookingConfirmationModal(page, testDetails);
    const apiHelper = new APIHelper(page, request, testDetails);
    const customerDetails = GuestData;

    await page.goto('/Booking/NewReservation', {timeout: 90000});
    await login.JustLoginFFS();

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

    // Click Confirm Booking button.
    await booking.ClickConfirmBooking();

    // Verify Reserve and Pay Modal.
    await reservepay.VerifyReserveAndPayModal(bookingDetails, guestDetails);

    // Fill up Reserve and Pay Modal fields.
    await reservepay.FillUpReserveAndPayFields(customerDetails);

    // Click Reserve Now button.
    await reservepay.ClickReserveNow();

    // Verify Successful Booking Rerervation.
    await reservepay.VerifySuccessfulBookingReservation();

    // Verify Reserved Booking Details.
    await reservepay.VerifyReservedBookingDetails(bookingDetails, guestDetails);

    // Process payment.
    var paymentDetails = await reservepay.ManagePayment(bookingDetails, guestDetails, "Cash");

    // Verify displayed confirmation modal.
    await confirm.VerifyBookingConfirmationModal();

    // Verify Confirmation Details.
    await confirm.VerifyConfirmationDetails(paymentDetails, customerDetails);

    // Verify Reservation Details.
    await confirm.VerifyReservationDetails(bookingDetails, paymentDetails);

    //#endregion*/
});