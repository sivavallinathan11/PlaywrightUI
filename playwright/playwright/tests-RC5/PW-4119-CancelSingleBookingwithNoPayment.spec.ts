import test from "@playwright/test";
import { APIHelper } from "../models/APIHelper";
import { BaseSteps } from "../models/BaseSteps";
import { BookingDashboardPage } from "../models/BookingDashboardPage";
import { LoginPage } from "../models/LoginPage";
import { ManageBookingPage } from "../models/ManageBookingPage";
import { ReimbursementReviewModal } from "../models/ReimbursementReviewModal";
import { CapturePaymentModal } from "../models/CapturePaymentModal";
import { ConfirmCancellationModal } from "../models/ConfirmCancellationModal";
import { BookingCancelledModal } from "../models/BookingCancelledModal";
import { CancelBookingModal } from "../models/CancelBookingModal";

test('Cancel a single booking with no payment', async({page, request}) =>{
    // Set base object.
    const baseSteps = new BaseSteps();

    // Initialize directory for test.
    const testDetails = await baseSteps.InitializeTestResultDirectory("PW-4119-CancelSingleBookingwithNoPayment");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const dashboard = new BookingDashboardPage(page, testDetails);
    const manageBooking = new ManageBookingPage(page, testDetails);
    const apiHelper = new APIHelper(page, request, testDetails);
    const reimbursement = new ReimbursementReviewModal(page, testDetails);
    const capturePayment = new CapturePaymentModal(page, testDetails);
    const cancelBooking = new CancelBookingModal(page, testDetails);
    const cancelConfirm = new ConfirmCancellationModal(page, testDetails);
    const confirmation = new BookingCancelledModal(page, testDetails)

    // This will create a reservation with no payment.
    const bookingNumber = await apiHelper.CreateReservation("Non-Member");
    await apiHelper.GetReservationDetails(bookingNumber);
    
    // Navigate to Parkweb login page.
    await login.Open();

    // Login to parkweb using valid credentials.
    await login.EnterCredentials();
    await login.ClickLogin();

    // Go to Booking Dashboard.
    await dashboard.Open();

    // Verify Arrivals Tab.
    await dashboard.VerifyArrivals();

    // This will search reservation from search tab.
    await dashboard.SearchReservationFromSearchTab(bookingNumber);

    // Manage search booking reservation.
    var bookingDetails = await dashboard.ManageBookingOfSearchedReservation(bookingNumber);

    // Verify Manage Booking Page.
    await manageBooking.VerifyManageBookingPage(bookingDetails);

    // Click Cancel Booking
    await manageBooking.ClickCancelBooking();
    
    // Verify Cancel Booking Modal
    await cancelBooking.VerifyCancelBookingModal();

    // Click Confirm on Cancel Booking Modal
    await cancelBooking.ClickContinueOnCancelBookingModal();

    // Verify Reimbursement Modal
    await reimbursement.VerifyReimbursementModal();

    // Verify Verify Reimbursement Details
    const stayCostDetails = await reimbursement.VerifyStayCostBreakdown(bookingDetails);

    // Click Continue Button
    await reimbursement.ClickContinue();

    // Verify Capture Payment Modal
    await capturePayment.VerifyCapturePaymentModal();

    // Verify Capture Payment Modal Details
    await capturePayment.VerifyCapturePaymentModalDetails(stayCostDetails);

    // Select Payment Method
    await capturePayment.SelectPaymentMethod("credit card", stayCostDetails);

    // Check EFTPOS Manually
    await capturePayment.ClickProcessCardManually();

    // Click Process Button
    await capturePayment.ClickProcess();

    // Verify Cancel Confirmation Modal
    await cancelConfirm.VerifyCancelConfirmationModal();

    // Select Reason
    await cancelConfirm.SelectRandomCancellationReason();

    // Input Employee/Staff Name
    await cancelConfirm.EnterEmployeeName("Testing 101");

    // Click Confirm Button
    await cancelConfirm.ClickConfirm();

    // Verify Booking Cancelled Modal
    await confirmation.VerifyBookingCancelledModal();

    // Verify Booking Cancelled Details
    await confirmation.VerifyBookingCancelledDetails(bookingDetails, stayCostDetails);

    // Click Return To Dashboard Button
    await confirmation.ClickReturnToDashboard();

    // Verify if navigated to Dashboard
    await dashboard.VerifyArrivals();

    //#endregion*/
});