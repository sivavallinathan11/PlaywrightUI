import { test } from "@playwright/test";
import { LoginPage } from "../models/LoginPage";
import { BookingDashboardPage } from "../models/BookingDashboardPage";
import { ManageBookingPage } from "../models/ManageBookingPage";
import { APIHelper } from "../models/APIHelper";
import { BaseSteps } from "../models/BaseSteps";

test('Search reservation via mobile number then filter date range', async ({page, request}) => {
    // Set basesteps object.
    const baseSteps = new BaseSteps(); 
     
    // Initialize Test
    var testDetails = await baseSteps.InitializeTestResultDirectory("PW-2396-search-reservation-via-mobile-then-filter-date-range");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const dashboard = new BookingDashboardPage(page, request, testDetails);
    const managebooking = new ManageBookingPage(page, testDetails);
    const apiHelper = new APIHelper(page, request, testDetails);

    //#region Start test
    // This will create new reservation via API and get the mobile number.
    var reservationNumber = await apiHelper.CreateReservation("Search", "Booking Number");
    var result = await apiHelper.GetReservationDetails(reservationNumber);
    var mobileNumber = result["guestDetails"]["mobile"];

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
    
    // Select criteria (Options: given, surname, mobile, email, reservationIds, MmbershipNumber)
    await dashboard.selectCriteria("mobile");

    // Input value in search field
    await dashboard.inputSearchField(mobileNumber);

    // this will click confirm search CTA
    await dashboard.clickConfirmSearchCTA();

    // this will filter the date range
    var date = await dashboard.FilterDateRange();

    // this would check if there is reservation displayed.
    await dashboard.VerifySearch();

    // this will select random reservation from search result and get booking dates.
    var dashboardDetails = await dashboard.SelectRandomReservation("Search")

    // Set all details
    await dashboard.SetDashboardWithDateDetails(dashboardDetails);

    // this will verify if the reservation does have the search value and within date range.
    await managebooking.VerifyCustomerDetails(mobileNumber, date.split(" - ")[0], date.split(" - ")[1], "mobile");

    // Cancels a reservation.
    await apiHelper.CancelReservation(reservationNumber);
    
    ////#endregion End test*/
})