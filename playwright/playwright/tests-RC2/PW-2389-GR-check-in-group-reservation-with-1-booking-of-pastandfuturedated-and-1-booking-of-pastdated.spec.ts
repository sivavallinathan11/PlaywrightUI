import { test } from "@playwright/test";
import { LoginPage } from "../models/LoginPage";
import { BookingDashboardPage } from "../models/BookingDashboardPage";
import { APIHelper } from "../models/APIHelper";
import { ManageGroupBookingPage } from "../models/ManageGroupBookingPage";
import { GroupCheckInPage } from "../models/GroupCheckInPage";
import { ManageBookingPage } from "../models/ManageBookingPage";
import { BaseSteps } from "../models/BaseSteps";
import { SmokeSteps } from "../models/SmokeSteps";
test("Checkin group reservation with 1 booking of past and future dated amd 1 booking of past dated", async ({page, request}) => {
    // Set basesteps object.
    const baseSteps = new BaseSteps(); 

    // Initialize Test
    var testDetails = await baseSteps.InitializeTestResultDirectory("PW-2389-GR-check-in-group-reservation-with-1-booking-of-pastandfuturedated-and-1-booking-of-pastdated");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const dashboard = new BookingDashboardPage(page, request, testDetails);
    const manageGroup = new ManageGroupBookingPage(page, testDetails);
    const managebooking = new ManageBookingPage(page, testDetails);
    const checkinGroup = new GroupCheckInPage(page, testDetails);
    const apiHelper = new APIHelper(page, request, testDetails);
    const smokeSteps = new SmokeSteps(page, testDetails);
    
    // This will create group reservation depends on checkin and checkout date
    // Last 4 parameters (Checkin1, Checkout1, Checkin2, Checkout2)
    const groupBookingNumber = await apiHelper.CreateGroupReservation("non member", "booking number", "-1", "1", "-2", "-1");
    const dateSets = await apiHelper.GetMultipleReservationDates(groupBookingNumber.split(';'));
    const groupDetails = await apiHelper.GetGroupReservationDetails(groupBookingNumber.split(';'));
    const groupMasterDetails = await apiHelper.GetGroupMasterDetails(groupBookingNumber.split(';')[0]);

    //#region Start test
    // Navigate to Parkhub login page.
    await login.Open();

    // Login to parkhub using valid credentials.
    await login.EnterCredentials();
    await login.ClickLogin();

    // Navigate to Booking dashboard page.
    await dashboard.Open();

    // Verify booking reservations from the arrivals pane.
    await dashboard.VerifyArrivals();

    // Navigate to Search Dashboard
    await dashboard.ClickSearchTab();
    
    // Select a reservation based on reservation number
    const dashboardData = await dashboard.SelectSpecificGroupUsingReservationNumberInSearchTab(groupBookingNumber, 
        groupDetails);

    // Verify the group member details from the dashboard and inputs.
    await manageGroup.VerifyGroupMemberDetails(dashboardData);

    // Verify group owner details.
    var grpOwnerDetails = await manageGroup.VerifyGroupOwnerDetails(groupMasterDetails, dashboardData);

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

    // This will click the Group Chekcin CTA
    await manageGroup.ClickGroupCheckIn();

    // Verify group reservation details.
    await checkinGroup.VerifyGroupOwnerReservationDetails(groupMasterDetails, dashboardData);

    // Verify stay cost and payment breakdown.
    await checkinGroup.VerifyUnpaidStayCostAndPaymentDetails(dashboardData);

    // This will check the Covid Declaration checkbox
    await checkinGroup.UpdateCovidDeclaration();

    // This will check the terms & condition checkbox
    await checkinGroup.UpdateTermsAndConditions();

    // Verify on-hover message was not displayed.
    await checkinGroup.VerifyOnHoverMessage(false);

    // This will click / hover the Complete Group Check In CTA
    await checkinGroup.CompleteGroupCheckIn();

    // Verify group checkin modal.
    await checkinGroup.ProceedGroupCheckInBasedOnRoomStatus(dashboardData, grpOwnerDetails[0]);

    // This will return to Manage Group Booking Page with parameters of Group Master ID
    await checkinGroup.ClickReturnToBooking();

    // Verify reservation is in arrived status after a succesful checkin.
    await manageGroup.VerifyUnpaidGroupReservationDetailsAfterCheckin(dashboardData);

    // Verify group checkout button is displayed.
    await manageGroup.VerifyDisabledGroupCheckOut(false);

    // Cancel booking reservation.
    await apiHelper.CancelReservation(groupBookingNumber.split(';')[0]);

    //#endregion end test*/
}   )
