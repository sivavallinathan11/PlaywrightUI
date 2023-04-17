import test from "@playwright/test";
import { TestingEnvironment, VelocityGroupMemberData, DEV_VelocityGroupMemberData } from "../data/users";
import { APIHelper } from "../models/APIHelper";
import { BaseSteps } from "../models/BaseSteps";
import { BookingConfirmationModal } from "../models/BookingConfirmationModal";
import { BookingPage } from "../models/BookingPage";
import { LoginPage } from "../models/LoginPage";
import { ManageBookingPage } from "../models/ManageBookingPage";
import { ManageGroup } from "../models/ManageGroup";
import { ReserveAndPayModal } from "../models/ReserveAndPayModal";

test('Create group booking then add velocity and pay using any mode of payment', async({page, request}) =>{
    // Set base object.
    const baseSteps = new BaseSteps();

    // Initialize directory for test.
    const testDetails = await baseSteps.InitializeTestResultDirectory("PW-3178-CreateGroupBookingThenAddVelocityAndPayUsingAnyModeofPayment");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const booking = new BookingPage(page, testDetails);
    const reservepay = new ReserveAndPayModal(page, testDetails)
    const confirm = new BookingConfirmationModal(page, testDetails);
    const manageBooking = new ManageBookingPage(page, testDetails);
    const manageGroup = new ManageGroup(page, testDetails);
    const apiHelper = new APIHelper(page, request, testDetails);
    var customerDetails: any;
    if(TestingEnvironment.toLowerCase().trim()=="test"){
        customerDetails = VelocityGroupMemberData;
    }
    else{
        customerDetails = DEV_VelocityGroupMemberData;
    }

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
    var bookingDetails = await booking.CreateBookingReservation(customerDetails, 2, "Site", parkDetails);

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
    var paymentDetails = await reservepay.ManagePayment(bookingDetails, guestDetails, "Random");

    // Verify displayed confirmation modal.
    await confirm.VerifyBookingConfirmationModal();

    // Verify Confirmation Details.
    await confirm.VerifyConfirmationDetails(paymentDetails, customerDetails);

    // Verify Reservation Details.
    var bookingNumber = await confirm.VerifyReservationDetails(bookingDetails, paymentDetails);

    // Manage Reservation.
    await confirm.ManageReservationBooking();

    // Verify reserved group booking in manage group booking page.
    await manageGroup.VerifyBookedReservationInManageGroupBooking(bookingNumber);

    // Manage Group Master.
    var masterResNumber = await manageGroup.ManageGroupMasterBooking();

    // Verify if Manage Booking is displayed.
    await manageBooking.VerifyBookedReservationInManageBooking(masterResNumber);

    // Verify velocity number is displayed in manage booking.
    await manageBooking.VerifyVelocityNumberInManageBooking(guestDetails);

    //#endregion*/
});