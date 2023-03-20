import { test } from "@playwright/test";
import { LoginPage } from "../models/LoginPage";
import { BookingDashboardPage } from "../models/BookingDashboardPage";
import { APIHelper } from "../models/APIHelper";
import { BaseSteps } from "../models/BaseSteps";

test('Search reservation via firstname then filter date range', async ({page, request}) => {
    // Set basesteps object.
    const baseSteps = new BaseSteps(); 

    // Initialize Test
    var testDetails = await baseSteps.InitializeTestResultDirectory("PW-2394-search-reservation-via-firstname-then-filter-date-range");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const dashboard = new BookingDashboardPage(page, request, testDetails);
    const apiHelper = new APIHelper(page, request, testDetails);

    //#region Start test
    // This will get the available first name from the API.
    var dashboardData = await apiHelper.GetSpecificValueFromArriving("Firstname");

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
    
    // Select criteria (Options: given(firstname), surname, mobile, email, reservationIds, MmbershipNumber)
    await dashboard.selectCriteria("given");

    // Input value in search field
    await dashboard.inputSearchField(dashboardData.firstname);

    // this will click confirm search CTA
    await dashboard.clickConfirmSearchCTA();

    // this will convert the check in / check outdate and filter the date range
    var date = await dashboard.FilterDateRange();

    // this would check if there is reservation displayed.
    await dashboard.VerifySearch();

    // this will check if the reservation dates is within filter date. (Options: given(firstname), surname, mobile, email, reservationIds, MmbershipNumber)
    await dashboard.validateSearchResult(date, dashboardData.firstname, "given");

    //#endregion*/
})