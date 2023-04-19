import { test, expect } from "@playwright/test";
import { UpsellGuestData } from "../data/users";
import { APIHelper } from "../models/APIHelper";
import { BaseSteps } from "../models/BaseSteps";
import { BookingPage } from "../models/BookingPage";
import { BookingPageV2 } from "../models/BookingPageV2";
import { LoginPage } from "../models/LoginPage";
import { ReserveAndPayModal } from "../models/ReserveAndPayModal";
import { accoms } from "../mocks/SearchAccommodation";
import { addbooking } from "../mocks/AddBooking";
import { editbooking } from "../mocks/EditBooking";
import { reservebookingfailure } from "../mocks/ReserveBookingFailure";
import { confirmbooking } from "../mocks/ConfirmBooking";



test('Add Membership to Any Child Booking then force a booking failure', async({page, request}) =>{
    // Set base object.
    const baseSteps = new BaseSteps();

    // setup mock for search
    await page.route('**/Booking/SearchAccommodation', route => route.fulfill({
        status: 200,
        body: accoms.body,
        }));

    // setup a mock for adding a booking
    await page.route('**/Booking/AddBooking', route => route.fulfill({
        status: 200,
        body: addbooking.body,
        }));
    
    // setup mock for editing a booking
    await page.route('**/Booking/EditBooking', route => route.fulfill({
        status: 200,
        body: editbooking.body,
        }));

    await page.route('**/Booking/Mocked', route => route.fulfill({
        status: 400,
        body: reservebookingfailure.body,
        }));
    

    // Initialize directory for test.
    const testDetails = await baseSteps.InitializeTestResultDirectory("PW-3408-AddMembershiptoAnyChildBookingthenForceBookingFailure");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const booking = new BookingPage(page, testDetails);
    const bookingv2 = new BookingPageV2(page, testDetails);
    const reservepay = new ReserveAndPayModal(page, testDetails)
    const apiHelper = new APIHelper(page, request, testDetails);
    const customerDetails = UpsellGuestData;

    await page.goto('/Booking/NewReservation', {timeout: 90000});
    await login.JustLoginFFS();

    // Get Park Details.
    // We don't need this we are going to mock the response
    // var parkDetails = await apiHelper.GetParkDetails();

    // Select accommodation based on numbers of booking. 

    // this isn't important all we are going to do is add two bookings directly using mocks
    // so we'll do the minimum on the calendar to call the CTA.
    // var bookingDetails = await booking.CreateBookingReservation(customerDetails, 2, "Random", parkDetails);
    
    
    var dateWidget = "#gr-search-date-input";
    var locator = page.locator(dateWidget)
    await locator.click()
    await page.getByRole('cell', { name: '1', exact: true }).nth(2).click()
    await page.getByRole('cell', { name: '2', exact: true }).nth(2).click()
    await page.getByRole('button', { name: 'Confirm', exact: true }).click()


    await booking.SetNumberOfGuests(customerDetails.adults, customerDetails.child, customerDetails.infant)

    // rewritten the ClickSearch in POM to use playwright test features
    await bookingv2.ClickSearch()

    // adding two booking by clicking the first 2 CTAs. This will load the mocked bookings
    await page.getByRole('button', { name: '+ Add Booking' }).nth(0).click()
    await page.getByRole('button', { name: '+ Add Booking' }).nth(1).click()




    // // Verify added accommodation.
    // await booking.VerifyAddedAccommodationDetails(bookingDetails);

    // // Verify confirm button is disabled as no guest is added.
    // await booking.VerifyConfirmButtonIsDisabled();

    // // Edit guest booking details.
    // var guestDetails = await booking.SetCustomerDetails(customerDetails, bookingDetails, "Any");
    // var bookingDetails = await booking.EditSelectedBookingReservation(bookingDetails, guestDetails);
    //edit the first booking in the list
    await page.getByRole('button', { name: 'Edit' }).nth(0).click()

    
    // // Verify Updated Booking Overview.
    // await booking.VerifyUpdatedBookingOverview(guestDetails, bookingDetails);

    // // Get hidden reservation number.
    // var reservationNumber = await booking.GetHiddenReservationNumber(guestDetails);

    // // Click Confirm Booking button.
    // await booking.ClickConfirmBooking();

    // // Verify Reserve and Pay Modal.
    // await reservepay.VerifyReserveAndPayModal(bookingDetails, guestDetails);

    // // Cancel Reservation.
    // await apiHelper.CancelMultipleReservation(reservationNumber);

    // // Fill up Reserve and Pay Modal fields.
    // await reservepay.FillUpReserveAndPayFields(customerDetails);

    // // Create new pencil booking using cancelled reservation.
    // await apiHelper.CreateNewPencilBookingfromCancelledReservation(reservationNumber);

    // // Click Reserve Now button.
    // await reservepay.ClickReserveNow();

    // // Verify Successful Booking Rerervation.
    // await reservepay.VerifyBookingReservationError(guestDetails);

    //#endregion*/
});
