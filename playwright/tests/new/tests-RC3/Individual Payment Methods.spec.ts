import {test,  expect, request, Locator } from '../../fixtures/login';
import { APIHelper } from "../../models/APIHelperV2";
import { BookingPageV2 } from "../../models/BookingPageV2";
import { ReserveAndPayModal } from "../../models/ReserveAndPayModalV2";
import { MakePaymentModal } from '../../models/MakePaymentModalV2';


let adults: number;
let child: number;
let infant: number;
let numberOfNights: number;

test.describe.parallel('Different payment methods', () => {  
    
    
    
    test.beforeEach(async ({ page }, testInfo) => {
        // console.log(`Running ${testInfo.title}`);
        await page.goto('/Booking/NewReservation');

        adults = 2;
        child = 1;
        infant = 1;    
        numberOfNights = 1;
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
        await bookingv2.AddGuest(firstBooking);
        

        await bookingv2.confirmBooking();
        // Verify Reserve and Pay Modal.
        const verifyAndPay = new ReserveAndPayModal(page);
        await verifyAndPay.VerifyReserveAndPayModal();
        // attempt to pay
        await verifyAndPay.ReserveNowButton();
        // Test the verify and Pay modal here

        await page.getByRole('button', {name: 'Pay Now'}).click();
        
        
    });

    test('PW-3109 - Create and pay an individual booking using cash @payment @refactored', async({page}) =>{
        test.slow();
        // validate the pay modal
        const paymentModal = new MakePaymentModal(page);
        await paymentModal.PayTotalWithCash();
        
        // check we got the succes page

        await expect(paymentModal.bookingComplete).toBeVisible();
          
        
        await page.screenshot({ path: 'screenshot/PW-3109 - Booking Complete.png'});
        
        
    });

    test('PW-3110 - Create and pay an individual booking using credit card @payment @refactored', async({page}) =>{
        test.slow();
        // validate the pay modal
        const paymentModal = new MakePaymentModal(page);
        await paymentModal.PayTotalWithCc();
        
        // check we got the succes page
        await expect(paymentModal.bookingComplete).toBeVisible();
        await page.screenshot({ path: 'screenshot/PW-3110 - Booking Complete.png'});
    })

    test.afterEach(async ({ page, request }) => {
        // lets clean up after these tests
        var reservation: any[] = [];
        var bookingId = await page.getByText('Booking ID:').allTextContents();
        for (let i=0; i < bookingId.length; i++) {
            reservation.push(bookingId[i].replace('Booking ID: ', ''));
        }
        const apiHelper = new APIHelper(page, request);
        await apiHelper.CancelMultipleReservation(reservation);

    })

})