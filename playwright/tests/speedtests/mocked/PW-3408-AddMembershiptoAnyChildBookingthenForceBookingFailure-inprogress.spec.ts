import {test,  expect } from '../../../fixtures';
import { UpsellGuestData } from "../../data/users";
import { APIHelper } from "../../models/APIHelper";
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

test('Add Membership to Any Child Booking then force a booking failure', async({page}) =>{
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
    
    bookingv2.adults = 2;
    bookingv2.child = 1;
    bookingv2.infant = 1;

    const customerDetails = UpsellGuestData1;
    const numberOfBookings = 2;

    await page.goto('/Booking/NewReservation');

    // fill out the search details    
    // checkin days from now, check out days
    await bookingv2.SearchAccommodation();
    
    // select the number of accoms to add to the booking. More than 1 is a group booking.
    // this will add the accoms first
    await bookingv2.SelectAccommodations(numberOfBookings);
    
    // add a guest to each of the accomms
    // assign a guest to the first booking
    const firstBooking = 0;
    const secondBooking = 1;
    await bookingv2.AddGuest(firstBooking);

    // assign a guest and upsell them to a member
    await bookingv2.AddGuestUpgradeToMember(secondBooking);
    



    // // Verify added accommodation.
    // await booking.VerifyAddedAccommodationDetails(bookingDetails);

    // // Verify confirm button is disabled as no guest is added.
    // await booking.VerifyConfirmButtonIsDisabled();

    // // Edit guest booking details.
    // var guestDetails = await booking.SetCustomerDetails(customerDetails, bookingDetails, "Any");
    // var bookingDetails = await booking.EditSelectedBookingReservation(bookingDetails, guestDetails);
        
    //edit the first booking on the mocked page
    // await page.getByRole('button', { name: 'Edit' }).nth(0).click();
    // await page.getByPlaceholder('Search or create a customer').fill('Robot Customer');
    
    // // create new customer and mock a successful response
    // await page.getByRole('button', { name: '+ Create a new customer'}).click();

    // // this is the new member modal
    // await page.getByPlaceholder('John').fill('Just a Test');
    // await page.getByPlaceholder('Discovery').fill('Just a Test');
    // await page.getByPlaceholder('example@hotmail.com').fill('just@atest.com');
    // await page.getByPlaceholder('0412 345 678').fill('0401217010');
    // // Click 'Enter Manually' link.
    // await page.getByRole('button', { name: 'Enter Manually' }).click();
    
    // await page.locator('#gr-street').fill('60 Light Square');
    // await page.locator('#gr-town').fill('Adelaide');
    // await page.locator('#gr-state-au').selectOption('SA');
    // await page.locator('#gr-postcode').fill('5000');
    // await page.locator('#gr-country').selectOption('Australia');

    // await page.getByRole('button', { name: 'Save' }).click();

    // await page.getByRole('button', { name: 'Join' }).click();
    
    // // staff details
    // await page.locator('#staff-name').fill('Test Robot');
    // await page.locator('#confirm-membership-cta').click();


    // // update booking with membership
    // await page.locator('#update-booking').click();

    // // -----------------------------------------------------------------------------
    // //edit the 2nd booking on the mocked page
    // await page.getByRole('button', { name: 'Edit' }).nth(1).click();
    // await page.getByPlaceholder('Search or create a customer').fill('Robot Customer');
    
    // // create new customer and mock a successful response
    // await page.getByRole('button', { name: '+ Create a new customer'}).click();

    // // this is the new member modal
    // await page.getByPlaceholder('John').fill('Just a Test');
    // await page.getByPlaceholder('Discovery').fill('Just a Test');
    // await page.getByPlaceholder('example@hotmail.com').fill('just@atest.com');
    // await page.getByPlaceholder('0412 345 678').fill('0401217010');
    // // Click 'Enter Manually' link.
    // await page.getByRole('button', { name: 'Enter Manually' }).click();
    
    // await page.locator('#gr-street').fill('60 Light Square');
    // await page.locator('#gr-town').fill('Adelaide');
    // await page.locator('#gr-state-au').selectOption('SA');
    // await page.locator('#gr-postcode').fill('5000');
    // await page.locator('#gr-country').selectOption('Australia');

    // await page.getByRole('button', { name: 'Save' }).click();

    // await page.getByRole('button', { name: 'Join' }).click();
    
    // // staff details
    // await page.locator('#staff-name').fill('Test Robot');
    // await page.locator('#confirm-membership-cta').click();


    // // update booking with membership
    // await page.locator('#update-booking').click();
    // await page.screenshot({ path: 'screenshot/addMemberToBooking.png', fullPage: true });
    // await page.locator('#update-booking').click();
    // await page.getByRole('button', { name: 'Update Booking' }).click()
    
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
    // await context.close();
});
