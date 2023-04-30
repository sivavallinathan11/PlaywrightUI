import {test,  expect } from '../../fixtures/login';

import { APIHelper } from "../../models/APIHelperV2";

import { BookingPageV2 } from "../../models/BookingPageV2";

import { ReserveAndPayModal } from "../../models/ReserveAndPayModalV2";


let adults: number;
let child: number;
let infant: number;
let numberOfNights: number;


test.describe.parallel('Booking failure with membership added', () => {  
    
    
    test.beforeEach(async ({ page }, testInfo) => {
        // console.log(`Running ${testInfo.title}`);
        await page.goto('/Booking/NewReservation');

        // set some booking values
        adults = 2;
        child = 1;
        infant = 1;    
        numberOfNights = 1;
        
    });

    test('PW-3407 - Add Membership to Individual Booking then force a booking failure', async({page, request}) =>{
        test.slow();

        const bookingv2 = new BookingPageV2(page);
        bookingv2.numberOfNights = numberOfNights;
        // fill out the search details    
        // checkin days from now, check out days
        await bookingv2.SearchAccommodation(adults, child, infant);
        // select the number of accoms to add to the booking. More than 1 is a group booking.
        // this will add the accoms first
        const numberOfBookings = 1;
        await bookingv2.SelectAccommodations(numberOfBookings);
        
        // add a guest to each of the accomms
        // assign a guest and upsell to the first booking
        const firstBooking = 0;
        await bookingv2.AddGuestUpgradeToMember(firstBooking);
        await page.screenshot({ path: 'screenshot/PW-3407 - Group booking with member.png'});

        await bookingv2.confirmBooking();
        
        // Verify Reserve and Pay Modal.
        const verifyAndPay = new ReserveAndPayModal(page);
        await verifyAndPay.VerifyReserveAndPayModal();

        await page.screenshot({ path: 'screenshot/PW-3407 - Verify and Pay Modal.png'});
        
        // Cancel Reservation.
        const apiHelper = new APIHelper(page, request);
        await apiHelper.CancelMultipleReservation(bookingv2.reservationNumber);
        // Create new pencil booking using cancelled reservation.
        await apiHelper.CreateNewPencilBookingfromCancelledReservation(bookingv2.reservationNumber);

        // attempt to pay
        await verifyAndPay.ReserveNowButton();

        await expect(page.locator('.error-member-popup')).toBeVisible({timeout: 10000});
        await expect.soft(page.locator('.error-message')).toHaveText('Your booking has not been reserved.', {timeout: 10000});
        await expect.soft(page.locator('.error-explanation')).toContainText('The G’Day rewards memberships has been processed.', {timeout: 10000});
        
        await page.screenshot({ path: 'screenshot/PW-3407 - Payment Error With Memberships.png'});
    })

    test('PW-3408 - Add Membership to Any Child Booking then force a booking failure', async({page, request}) =>{
        test.slow();
        const bookingv2 = new BookingPageV2(page);
        bookingv2.numberOfNights = numberOfNights;
        // fill out the search details    
        // checkin days from now, check out days
        await bookingv2.SearchAccommodation(adults, child, infant);
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

        await bookingv2.confirmBooking();
        
        // Verify Reserve and Pay Modal.
        const verifyAndPay = new ReserveAndPayModal(page);
        await verifyAndPay.VerifyReserveAndPayModal();
        
        // Cancel Reservation.
        const apiHelper = new APIHelper(page, request);
        await apiHelper.CancelMultipleReservation(bookingv2.reservationNumber);
        // Create new pencil booking using cancelled reservation.
        await apiHelper.CreateNewPencilBookingfromCancelledReservation(bookingv2.reservationNumber);

        // attempt to pay
        await verifyAndPay.ReserveNowButton();

        await expect.soft(page.locator('.error-message')).toHaveText('Your bookings has not been reserved.',{timeout: 10000});
        await expect.soft(page.locator('.error-explanation')).toContainText('The G’Day rewards memberships against the booking have been processed.',{timeout: 10000});

        await page.screenshot({ path: 'screenshot/PW-3408 - Payment Error With Memberships.png'});
    })

    test('PW-3409 - Add Membership to All Child Bookings then force a booking failure', async({page, request}) =>{
        test.slow();
        const bookingv2 = new BookingPageV2(page);
        bookingv2.numberOfNights = numberOfNights;
        // fill out the search details    
        // checkin days from now, check out days
        await bookingv2.SearchAccommodation(adults, child, infant);
        const numberOfBookings = 2;
        await bookingv2.SelectAccommodations(numberOfBookings);
        
        // add a guest to each of the accomms
        // assign a guest to the first booking
        const firstBooking = 0;
        const secondBooking = 1;
        await bookingv2.AddGuestUpgradeToMember(firstBooking);

        // assign a guest and upsell them to a member
        await bookingv2.AddGuestUpgradeToMember(secondBooking);
        
        await page.screenshot({ path: 'screenshot/PW-3409 - Group booking with member.png'});

        await bookingv2.confirmBooking();
        

        // // Verify Reserve and Pay Modal.
        const verifyAndPay = new ReserveAndPayModal(page);
        await verifyAndPay.VerifyReserveAndPayModal();
        
        // Cancel Reservation.
        const apiHelper = new APIHelper(page, request);
        await apiHelper.CancelMultipleReservation(bookingv2.reservationNumber);
        // Create new pencil booking using cancelled reservation.
        await apiHelper.CreateNewPencilBookingfromCancelledReservation(bookingv2.reservationNumber);

        // attempt to pay
        await verifyAndPay.ReserveNowButton();

        await expect.soft(page.locator('.error-message')).toHaveText('Your bookings has not been reserved.',{timeout: 10000});
        await expect.soft(page.locator('.error-explanation')).toContainText('The G’Day rewards memberships against the booking have been processed.',{timeout: 10000});

        await page.screenshot({ path: 'screenshot/PW-3409 - Payment Error With Memberships.png'});
    })
})
