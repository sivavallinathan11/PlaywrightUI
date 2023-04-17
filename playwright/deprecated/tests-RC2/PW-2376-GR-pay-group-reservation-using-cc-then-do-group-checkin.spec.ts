import { test } from "@playwright/test";
import { LoginPage } from "../models/LoginPage";
import { BookingDashboardPage } from "../models/BookingDashboardPage";
import { APIHelper } from "../models/APIHelper";
import { ManageGroupBookingPage } from "../models/ManageGroupBookingPage";
import { BaseSteps } from "../models/BaseSteps";
import { ManageBookingPage } from "../models/ManageBookingPage";
import { GroupCheckInPage } from "../models/GroupCheckInPage";
import { SmokeSteps } from "../models/SmokeSteps";

test('Select reservation then change room and pay using cc then checkin', async ({page, request}) => {
    // Set basesteps object.
    const baseSteps = new BaseSteps(); 

    // Initialize Test
    var testDetails = await baseSteps.InitializeTestResultDirectory("PW-2376-GR-pay-group-reservation-using-cc-then-do-group-checkin");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const dashboard = new BookingDashboardPage(page, request, testDetails);
    const manageGroup = new ManageGroupBookingPage(page, testDetails);
    const managebooking = new ManageBookingPage(page, testDetails);
    const checkinGroup = new GroupCheckInPage(page, testDetails);
    const apiHelper = new APIHelper(page, request, testDetails);
    const smokeSteps = new SmokeSteps(page, testDetails);

    //#region Start test.
    // This will create group reservation depends on checkin and checkout date
    // Last 4 parameters (Checkin1, Checkout1, Checkin2, Checkout2)
    const groupBookingNumber = await apiHelper.CreateGroupReservation("non member", "booking number", "0", "1", "0", "1");
    //const groupBookingNumber = payGroupBookingUsingCreditCard.groupBookingNumber;
    const dateSets = await apiHelper.GetMultipleReservationDates(groupBookingNumber.split(';'));
    const groupDetails = await apiHelper.GetGroupReservationDetails(groupBookingNumber.split(';'));
    const groupMasterDetails = await apiHelper.GetGroupMasterDetails(groupBookingNumber.split(';')[0]);


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
    var dashboardData = await dashboard.SelectSpecificGroupUsingReservationNumber(groupBookingNumber, 
        groupDetails, dateSets);

    // Verify the group member details from the dashboard and inputs.
    await manageGroup.VerifyGroupMemberDetails(dashboardData);

    // Verify group owner details.
    var grpOwnerDetails = await manageGroup.VerifyGroupOwnerDetails(groupMasterDetails, dashboardData);
    
    // Click Make Payment button.
    await manageGroup.ClickMakePayment();

    // Verify details in the capture payment modal.
    await manageGroup.VerifyCapturePaymentDetails(groupMasterDetails, dashboardData);

    // Select payment method (CC, Cash, EFTPOS) and verify payment details.
    var paymentData = await manageGroup.SelectPaymentMethodAndVerifyPaymentDetails("Credit Card", dashboardData);

    // Click Process Payment button.
    await manageGroup.ClickProcessPayment();

    // Verify updated payment details in manage group page after payment was made.
    await manageGroup.VerifyPaymentDetailsInManageGroupAfterPayment(paymentData, dashboardData);

    /*// This will select child booking with incomplete details.
    await manageGroup.SelectIncompleteChildBookingDetails();

    // Verify manage booking page.
    await managebooking.VerifyDislayedIncompleteChildBooking();

    // Fillup incomplete child reservation details.
    await managebooking.FillUpIncompleteChildBookingDetails(groupMasterDetails);

    // Save child reservation details.
    await managebooking.ClickSaveGuestDetails();

    // Wait for loading icon to disappear.
    await smokeSteps.waitForLoadingIconToDisappear();

    // Verify changes made in incomplete child reservation.
    const newGrpDetails = await managebooking.VerifiyChangesMadeForChildReservation(groupMasterDetails, dashboardData);

    // Click manage group button.
    await managebooking.ClickManageGroupButton();*/

    // Click Group Check In CTA.
    await manageGroup.ClickGroupCheckIn();

    // Verify group reservation details.
    await checkinGroup.VerifyGroupOwnerReservationDetails(groupMasterDetails, dashboardData);

    // Verify stay cost and payment breakdown.
    await checkinGroup.VerifyStayCostAndPaymentDetails(paymentData, dashboardData, "Credit Card");

    // Complete Covid Declaration.
    await checkinGroup.UpdateCovidDeclaration();

    // Tick Terms & Conditions.
    await checkinGroup.UpdateTermsAndConditions();

    // Click Complete Group Check In
    await checkinGroup.CompleteGroupCheckIn();

    // Verify group checkin modal.
    await checkinGroup.ProceedGroupCheckInBasedOnRoomStatus(dashboardData, grpOwnerDetails[0]);

    // Return to group reservation link.
    await checkinGroup.ClickReturnToGroupReservation(dashboardData);

    // Verify reservation is in arrived status after a succesful checkin.
    await manageGroup.VerifyGroupReservationDetailsAfterCheckin(dashboardData, paymentData);

    // Verify group checkout button is displayed.
    await manageGroup.VerifyGroupCheckOut(paymentData);

    // Checkout multiple reservations.
    await apiHelper.CheckoutReservation(groupBookingNumber.split(';')[0]);

    //#endregion*/
})