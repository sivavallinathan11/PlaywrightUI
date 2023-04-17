import { test } from "@playwright/test";
import { LoginPage } from "../models/LoginPage";
import { BookingDashboardPage } from "../models/BookingDashboardPage";
import { ManageBookingPage } from "../models/ManageBookingPage";
import { BaseSteps } from "../models/BaseSteps";

test('Search reservation via membership number then filter date range', async ({page, request}) => {
    // Set basesteps object.
    const baseSteps = new BaseSteps(); 
     
    // Initialize Test
    var testDetails = await baseSteps.InitializeTestResultDirectory("PW-2814-search-reservation-via-membership-number-then-filter-date-range");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const dashboard = new BookingDashboardPage(page, request, testDetails);
    const managebooking = new ManageBookingPage(page, testDetails);


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

    // Select random reservation (Table option: Upcoming, Arrival : Member Type: Member, Non Member)
    await dashboard.SelectReservationWithMembership("Arrival");

    // Get guest details (Options: mobile, email & mmebership number)
    var guestMembershipNumber = await managebooking.GetGuestDetails("Membership Number");

    // return back to Arrival Dashboard
    await dashboard.returnToDashboard();

    // Navigate to Search Dashboard
    await dashboard.ClickSearchTab();
    
    // Select criteria (Options: given, surname, mobile, email, reservationIds, MembershipNumber)
    await dashboard.selectCriteria("MembershipNumber");

    // Input value in search field
    await dashboard.inputSearchField(guestMembershipNumber);

    // this will click confirm search CTA
    await dashboard.clickConfirmSearchCTA();

    // Get random booking dates
    var initialbookingDates = await dashboard.GetValueFromDashboardTable("Search","Booking dates");
    var bookingDates = initialbookingDates.split("|")[0]

    // this will filter the date range
    var date = await dashboard.FilterDateRange(bookingDates.split(" - ")[0], bookingDates.split(" - ")[1]);

    // this would check if there is reservation displayed.
    await dashboard.VerifySearch();

    // this will select random reservation from search result and get booking dates.
    await dashboard.SelectRandomReservation("Search")

    // this will verify if the reservation does have the search value and within date range.
    await managebooking.VerifyCustomerDetails(guestMembershipNumber, date.split(" - ")[0], date.split(" - ")[1], "MembershipNumber");
})