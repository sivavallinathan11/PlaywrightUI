import {test,  expect } from '../../fixtures/login';
import { UpsellGuestData } from "../../data/users";
import { APIHelper } from "../../models/APIHelperV2";
import { BaseSteps } from "../../models/BaseSteps";
import { BookingPage } from "../../models/BookingPage";
import { BookingPageV2 } from "../../models/BookingPageV2";
import { LoginPage } from "../../models/LoginPageV2";
import { ReserveAndPayModal } from "../../models/ReserveAndPayModal";
// mocks
import { accoms } from "../../mocks/SearchAccommodation";
import { addbooking } from "../../mocks/AddBooking";
import { editbooking } from "../../mocks/EditBooking";
import { addnewguest} from "../../mocks/AddNewGuest";
import { reservebookingfailure } from "../../mocks/ReserveBookingFailure";
import { confirmbooking } from "../../mocks/ConfirmBooking";
import { openconfirmmembership } from "../../mocks/OpenConfirmMembership";
import { updatebookingnewreservation } from "../../mocks/UpdateBookingNewReservation";
import { confirmmembership } from "../../mocks/ConfirmMembership";

export const UpsellGuestData1 = {
    arrivalDayOfMonth: 6,
    departureDayOfMonth: 7,
    adults: 2,
    child: 1,
    infant: 1,
    searchText: 'xyz123',
    firstName: 'RCATSMember',
    lastName: 'RCATSMemberTest',
    email: '',
    mobile: '0412345678',
    street: 'Light Square',
    town: 'Adelaide',
    state: 'SA',
    postcode: '5000',
    country: 'Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    isVelocity: false,
    isUpsell: true,
    isMember: false
}

test('Add Membership to Any Child Booking then force a booking failure', async({page, request}) =>{
    test.setTimeout(120000);
    // Set base object.

    // const baseSteps = new BaseSteps();

    // setup mock for search
    // await page.route('**/Booking/SearchAccommodation', route => route.fulfill({
    //     status: 200,
    //     body: accoms.body,
    //     }));

    // // setup a mock for adding a booking
    // await page.route('**/Booking/AddBooking', route => route.fulfill({
    //     status: 200,
    //     body: addbooking.body,
    //     }));
    
    // // setup mock for editing a booking
    // await page.route('**/Booking/EditBooking', route => route.fulfill({
    //     status: 200,
    //     body: editbooking.body,
    //     }));

    // // mock for adding guest
    // await page.route('**/Booking/AddNewGuest', route => route.fulfill({
    //     status: 200,
    //     body: addnewguest.body,
    //     }));


    // await page.route('**/Booking/OpenConfirmMembership', route => route.fulfill({
    //     status: 200,
    //     body: openconfirmmembership.body,
    //     }));

    // await page.route('**/Booking/ConfirmMembership', route => route.fulfill({
    //     status: 200,
    //     body: confirmmembership.body,
    //     }));   

    // await page.route('**/Booking/ValidateRewardsProgram', route => route.fulfill({
    //     status: 200,
    //     body: '',
    //     }));

    // await page.route('**/Booking/UpdateBookingNewReservation', route => route.fulfill({
    //     status: 200,
    //     body: updatebookingnewreservation.body,
    //     })); 

    const bookingv2 = new BookingPageV2(page);
    bookingv2.numberOfNights = 2;
    // set some booking values
    bookingv2.adults = 2;
    bookingv2.child = 1;
    bookingv2.infant = 1;    
    
    await page.goto('/Booking/NewReservation');
    
    // fill out the search details    
    // checkin days from now, check out days
    await bookingv2.SearchAccommodation();
    
    // select the number of accoms to add to the booking. More than 1 is a group booking.
    // this will add the accoms first
    const numberOfBookings = 2;
    await bookingv2.SelectAccommodations(numberOfBookings);
    
    // add a guest to each of the accomms
    // assign a guest to the first booking
    const firstBooking = 0;
    const secondBooking = 1;
    await bookingv2.AddGuest(firstBooking);

    // assign a guest and upsell them to a member
    await bookingv2.AddGuestUpgradeToMember(secondBooking);
    
    await page.screenshot({ path: 'screenshot/PW-3408 - Group booking with member.png'});

    
    // // Verify Updated Booking Overview.
    // await booking.VerifyUpdatedBookingOverview(guestDetails, bookingDetails);

    // // Get hidden reservation number.
    // this is added 
    // var reservationNumber = await bookingv2.GetHiddenReservationNumber();

    // Click Confirm Booking button.
    // save reservation numbers
    await bookingv2.confirmBooking();
    

    // // Verify Reserve and Pay Modal.
    // await reservepay.VerifyReserveAndPayModal(bookingDetails, guestDetails);
    await page.locator('#ReservationTypeId').selectOption('07. Tourist - Group');
    await page.locator('#BookingSourceId').selectOption('1. Walk in');
    await page.getByPlaceholder('Start typing a note here...').fill('Just a note by the test bot');
    await page.getByRole('checkbox').check();
    await page.screenshot({ path: 'screenshot/PW-3408 - Verify and Pay Modal.png'});
    
    // Cancel Reservation.
    const apiHelper = new APIHelper(page, request);
    await apiHelper.CancelMultipleReservation(bookingv2.reservationNumber);



    
    // // Fill up Reserve and Pay Modal fields.
    // await reservepay.FillUpReserveAndPayFields(customerDetails);

    // // Create new pencil booking using cancelled reservation.
    await apiHelper.CreateNewPencilBookingfromCancelledReservation(bookingv2.reservationNumber);

    await page.getByRole('button', {name: 'Reserve Now'}).click();

    await expect(page.locator('.error-message')).toHaveText('Your bookings has not been reserved.');
    await expect(page.locator('.error-explanation')).toContainText('The G’Day rewards memberships against the booking have been processed.');


    await page.screenshot({ path: 'screenshot/PW-3408 - Payment Error With Memberships.png'});

    // // Click Reserve Now button.
    // await reservepay.ClickReserveNow();

    // // Verify Successful Booking Rerervation.
    // await reservepay.VerifyBookingReservationError(guestDetails);

    //#endregion*/
    // await context.close();
});
