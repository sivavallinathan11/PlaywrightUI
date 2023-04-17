import test from "@playwright/test";
import { APIHelper } from "../models/APIHelper";
import { BaseSteps } from "../models/BaseSteps";
import { BookingDashboardPage } from "../models/BookingDashboardPage";
import { LoginPage } from "../models/LoginPage";
import { ReimbursementReviewModal } from "../models/ReimbursementReviewModal";
import { ConfirmCancellationModal } from "../models/ConfirmCancellationModal";
import { BookingCancelledModal } from "../models/BookingCancelledModal";
import { CancelBookingModal } from "../models/CancelBookingModal";
import { CheckInPage } from "../models/CheckInPage";
import { SelectReimbursementTypeModal } from "../models/SelectReimbursementTypeModal";
import { ProcessRefundModal } from "../models/ProcessRefundModal";
import { EditBookingPage } from "../models/EditBookingPage";

test('Cancel a booking that has multiple payments with same type (Refund Request)', async({page, request}) =>{
    // Set base object.
    const baseSteps = new BaseSteps();

    // Initialize directory for test.
    const testDetails = await baseSteps.InitializeTestResultDirectory("PW-4119-CancelSingleBookingwithNoPayment");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const dashboard = new BookingDashboardPage(page, request, testDetails);
    const editBooking = new EditBookingPage(page, testDetails);
    const apiHelper = new APIHelper(page, request, testDetails);
    const checkIn = new CheckInPage(page, testDetails);
    const reimbursement = new ReimbursementReviewModal(page, testDetails);
    const cancelBooking = new CancelBookingModal(page, testDetails);
    const reimbursementType = new SelectReimbursementTypeModal(page, testDetails);
    const processRefund = new ProcessRefundModal(page, testDetails);
    const confirmCancellation = new ConfirmCancellationModal(page, testDetails);
    const confirmation = new BookingCancelledModal(page, testDetails)

    // This will create a reservation with discount.
    const bookingNumber = await apiHelper.CreateReservation("Non-Member");
    
    // This will create multiple payments for reservation created above
    await apiHelper.CreateSingleOrMultiplePayments(bookingNumber, "cash", 3, 100);

    var paymentDetails = await apiHelper.SearchTransactions(bookingNumber);

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
    await dashboard.SearchReservationFromSearchTab(bookingNumber, "reservation number");

    // Manage search booking reservation.
    var bookingDetails = await dashboard.ManageBookingOfSearchedReservation(bookingNumber);

    // Verify Manage Booking Page.
    await editBooking.VerifyManageBookingPage(bookingDetails);

    // Verify Payments
    await editBooking.VerifyPayments(paymentDetails);

    // Click Check In
    await editBooking.ClickManageBookingCheckInButton();

    // Verify Check In Page
    await checkIn.VerifyCheckInPage(bookingDetails);

    // Verify Payments
    await checkIn.VerifyPayments(paymentDetails);
    
    // This will click Cancel Booking
    await checkIn.ClickCancelBooking();

    // Verify Cancel Booking Modal
    await cancelBooking.VerifyCancelBookingModal();

    // Click Confirm on Cancel Booking Modal
    await cancelBooking.ClickContinueOnCancelBookingModal();

    // Verify Select Reimbursement Type Modal
    await reimbursementType.VerifySelectReimbursementTypeModal();

    // Click Refund
    await reimbursementType.SelectReimbursementType("refund");

    // Click Continue
    await reimbursementType.ClickContinue();

    // Verify Reimbursement Modal
    await reimbursement.VerifyReimbursementModal();

    // Verify Reimbursement Details
    const stayCostDetails = await reimbursement.VerifyStayCostBreakdown(bookingDetails, paymentDetails);

    // Click Continue Button
    await reimbursement.ClickContinue();

    // Verify process refund section
    await processRefund.VerifyProcessRefundSection("cash");

    // Verify Park Refund Details
    await processRefund.VerifyRefundRequestDetails(stayCostDetails, bookingDetails, paymentDetails);

    // Populate field
    await processRefund.InputStaffEmailAddress("Test@gmail.com");

    // Populate field
    await processRefund.InputRefundReason("Test");

    // Click Process Button
    await processRefund.ClickProcessBtn();

    // Verify Modal
    await confirmCancellation.VerifyCancelConfirmationModal();

    // Random Selection of Cancellation Reason
    await confirmCancellation.SelectRandomCancellationReason();

    // Enter Employees name
    await confirmCancellation.EnterEmployeeName("Test");

    // Click Confirm Button
    await confirmCancellation.ClickConfirm();

    // Verify Booking Cancelled Modal
    await confirmation.VerifyBookingCancelledModal();

    // Verify Booking Cancelled Details
    await confirmation.VerifyBookingCancelledDetails(bookingDetails, stayCostDetails);

    // Click Return to dashboard Button
    await confirmation.ClickReturnToDashboard();

    // Verify Arrivals Dashboard
    await dashboard.VerifyArrivals();

    //#endregion*/
});