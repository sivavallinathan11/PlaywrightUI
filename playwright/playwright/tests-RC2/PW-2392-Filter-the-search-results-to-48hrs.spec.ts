import { test } from "@playwright/test";
import { LoginPage } from "../models/LoginPage";
import { BookingDashboardPage } from "../models/BookingDashboardPage";
import { BaseSteps } from "../models/BaseSteps";

test('Filter the search results to 48hrs', async ({page, request}) => {
    // Set basesteps object.
    const baseSteps = new BaseSteps(); 

    // Initialize Test
    var testDetails = await baseSteps.InitializeTestResultDirectory("PW-2392-Filter-the-search-results-to-48hrs");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const dashboard = new BookingDashboardPage(page, request, testDetails);

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

    // Go to upcoming dashboard
    await dashboard.ClickUpcomingTab();

    // Verify booking reservations from the upcoming pane.
    await dashboard.VerifyUpcoming();

    // Filter to 48 hrs and verify if loading icon were displayed
    await dashboard.ClickUpcomingFilterTabAndVerifyLoadingIcon("48");

    // Wait for loading icon of filter to disappear
    await dashboard.waitForLoadingIconToDisappear("48");

    // This will verify the records in the list
    await dashboard.verifyFilteredAccommodation("48");


})