import { test } from "@playwright/test";
import { LoginPage } from "../models/LoginPage";
import { BookingDashboardPage } from "../models/BookingDashboardPage";
import { EditBookingPage } from "../models/EditBookingPage";
import { CheckInPage } from "../models/CheckInPage";
import { APIHelper } from "../models/APIHelper";
import { BaseSteps } from "../models/BaseSteps";
import { SmokeSteps } from "../models/SmokeSteps";

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
    
    // Search the reservation
    await dashboard.SearchReservationFromSearchTab(reservationNumber, "reservation number");

    // Manage search booking reservation.
    var bookingDetails = await dashboard.ManageBookingOfSearchedReservation(reservationNumber);

    // Verify Manage Booking Page.
    await editBooking.VerifyManageBookingPage(bookingDetails);

    //#endregion */


})