import { test, expect }  from "@playwright/test";
import { GuestData } from "../data/users";
import { APIHelper } from "../models/APIHelper";
import { BaseSteps } from "../models/BaseSteps";
import { BookingPage } from "../models/BookingPage";
import { LoginPage } from "../models/LoginPage";
import { accom } from "../mocks/accommodations";

// test.beforeEach(async ({ context }) => {
//     // Block any css requests for each test in this file.
//     // await context.route(/.css$/, route => route.abort());
//   });

test('Check price sorting and accommodation filter', async({page, request}) =>{
    // Set base object.
    // mocking example
    // await page.route('**/Booking/SearchAccommodation', route => route.fulfill({
    //     status: 200,
    //     body: accom.body,
    //   }));
    const baseSteps = new BaseSteps();

    // Initialize directory for test.
    const testDetails = await baseSteps.InitializeTestResultDirectory("PW-3126-CheckPriceSortingAndAccommodationFilter");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const booking = new BookingPage(page, testDetails);
    const apiHelper = new APIHelper(page, request, testDetails);
    const customerDetails = GuestData;

    //#region Start Test.

    // Navigate to Parkweb login page.
    await login.Open();

    // Login to parkweb using valid credentials.
    await login.EnterCredentials();
    await login.ClickLogin();
    
    // Navigate to create new booking page.
    await booking.Open();

    // Verify new reservation page.
    await booking.VerifyNewReservationPage();
    
    // Set date range.
    await booking.SetReservationDateRange(customerDetails.arrival, customerDetails.departure);

    // Select number of guest for a specific reservation.
    await booking.SetNumberOfGuests(customerDetails.adults, customerDetails.child, customerDetails.infant);

    // Click search.
    await booking.ClickSearch();

    // Verify search accommodation result.
    await booking.VerifySearchResult();

    // Verify that the default sorting of price is set to 'Low to High'.
    await booking.VerifyPriceSortingBasedOnSortType("Low to High");

    // Verify correct price sort when sort type is change to 'High to Low'.
    await booking.VerifyPriceSortingBasedOnSortType("High to Low");

    // Get Park Details.
    var parkDetails = await apiHelper.GetParkDetails();

    // Filter accommodation for Cabins only.
    await booking.SelectFilters("Cabins");

    // Click search.
    await booking.ClickSearch();

    // Verify search accommodation result.
    await booking.VerifySearchResult();

    // Verify if the search results displays only cabins.
    await booking.VerifySearchResultBasedOnFilter("Cabins", parkDetails);

    // Filter accommodation for Sites only.
    await booking.SelectFilters("Sites");

    // Click search.
    await booking.ClickSearch();

    // Verify search accommodation result.
    await booking.VerifySearchResult();

    // Verify if the search results displays only sites.
    await booking.VerifySearchResultBasedOnFilter("Sites", parkDetails);

    // Filter accommodation for Cabins and Sites only.
    await booking.SelectFilters("Cabins-Sites");

    // Click search.
    await booking.ClickSearch();

    // Verify search accommodation result.
    await booking.VerifySearchResult();

    // Verify if the search results displays only cabins or sites.
    await booking.VerifySearchResultBasedOnFilter("Cabins-Sites", parkDetails);

    // Filter accommodation for Pet friendly.
    await booking.SelectFilters("Petfriendly");

    // Click search.
    await booking.ClickSearch();

    // Verify search accommodation result.
    await booking.VerifySearchResult();

    // Verify if the search results displays only pet friendly.
    await booking.VerifySearchResultBasedOnFilter("Petfriendly", parkDetails);


    //#endregion*/
});