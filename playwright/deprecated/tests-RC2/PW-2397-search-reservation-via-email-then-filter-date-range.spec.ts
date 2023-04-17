import { test } from "@playwright/test";
import { LoginPage } from "../models/LoginPage";
import { BookingDashboardPage } from "../models/BookingDashboardPage";
import { ManageBookingPage } from "../models/ManageBookingPage";
import { APIHelper } from "../models/APIHelper";
import { BaseSteps } from "../models/BaseSteps";

test('Search reservation via email then filter date range', async ({page, request}) => {
    // Set basesteps object.
    const baseSteps = new BaseSteps(); 
     
    // Initialize Test
    var testDetails = await baseSteps.InitializeTestResultDirectory("PW-2397-search-reservation-via-email-then-filter-date-range");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const dashboard = new BookingDashboardPage(page, request, testDetails);
    const managebooking = new ManageBookingPage(page, testDetails);
    const apiHelper = new APIHelper(page, request, testDetails);

    //#region Start test
    // This will get the available first name from the API.
    var dashboardData = await apiHelper.GetSpecificValueFromArriving("Email");

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
    await dashboard.selectCriteria("email");

    // Input value in search field
    await dashboard.inputSearchField(dashboardData.email);

    // this will click confirm search CTA
    await dashboard.clickConfirmSearchCTA();

    // this will filter the date range
    var date = await dashboard.FilterDateRange();

    // this would check if there is reservation displayed.
    await dashboard.VerifySearch();

    // this will select random reservation from search result and get booking dates.
    var dashboardDetails = await dashboard.SelectRandomReservation("Search")
    
    // Set All Details
    var dbDetails = await dashboard.SetDashboardWithDateDetails(dashboardDetails);
    
    // this will verify if the reservation does have the search value and within date range.
    await managebooking.VerifyCustomerDetails(dashboardData.email, date.split(" - ")[0], date.split(" - ")[1], "email");
})
