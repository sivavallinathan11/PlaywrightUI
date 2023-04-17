import { test } from "@playwright/test";
import { LoginPage } from "../models/LoginPage";
import { BookingDashboardPage } from "../models/BookingDashboardPage";
import { ManageBookingPage } from "../models/ManageBookingPage";
import { CheckInPage } from "../models/CheckInPage";
import { APIHelper } from "../models/APIHelper";
import { commonData } from "../data/users";
import { BaseSteps } from "../models/BaseSteps";

test('Renew expired member within grace period then pay using cash and checkin', async ({page, request}) => {
    // Set basesteps object.
    const baseSteps = new BaseSteps(); 

    // Initialize Test
    var testDetails = await baseSteps.InitializeTestResultDirectory("PW-2367-SR-renew-expired-member-within-grace-period-then-pay-using-cash-and-checkin");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const dashboard = new BookingDashboardPage(page, request, testDetails);
    const managebooking = new ManageBookingPage(page, testDetails);
    const checkin = new CheckInPage(page, testDetails);
    const apiHelper = new APIHelper(page, request, testDetails);

    //#region Start test.
    // Create and register member.
    await apiHelper.CreateAndRegisterMember();

    // Expire existing member.
    var memberInfo = await apiHelper.SearchAndExpireMember("Month", 2);

    // Create a reservation that has an active velocity member.
    var reservationNumber = await apiHelper.CreateReservationUsingMemberFromSearchAPI(memberInfo);

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
    await managebooking.VerifyTotalStayCostBreakdown(dashboardData);

    // Get payment details.
    var paymentDetails = await managebooking.VerifyPaymentDetails(dashboardData);

    // Add membership
    await managebooking.ClickJoinButton();

    // Enter full staff name.
    await managebooking.EnterStaffName(commonData.staffName);

    // Confirm membership.
    await managebooking.ConfirmMembership();

    // Verify successful membership.
    await managebooking.VerifySuccessfulMembership();

    // Verify membership fees.
    var feesDetails = await managebooking.VerifyMembershipFees(dashboardData, dashboardData.paymentType);

    // Verify new member details.
    var memberTier = await managebooking.VerifyNewMemberDetails(dashboardData.guestType);

    // Claim all benefits.
    await managebooking.ClaimBenefits();

    // Verify Claimed Benefit Message.
    await managebooking.VerifyClaimedBenefitMessage();

    // Set all details.
    var mbData = await managebooking.SetNewMemberDetails(accomodationDetails + "|" + 
    feesDetails + "|" + paymentDetails + "|" + memberTier, dashboardData);

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
    await dashboard.VerifyPaidReservationFromInHouse(mbData, paymentData);

    // This will checkout the reservation from the in-house.
    await apiHelper.CheckoutReservation(mbData.reservationNumber);
    
    //#endregion
})