import { test } from "@playwright/test";
import { LoginPage } from "../../models/LoginPageV2";
import { BookingPageV2 } from "../../models/BookingPageV2";
import { UpsellGuestData } from "../../data/users";
import { accoms } from "../../mocks/SearchLotsOfAccommodations";



test.describe.parallel('Visual Checks and Screenshots', () => {  
    
    test.beforeEach(async ({ page }) => {  
        const login = new LoginPage(page);
        await page.goto('/Booking/NewReservation');
        await login.Login();

        const booking = new BookingPageV2(page);
        const customerDetails = UpsellGuestData;
        // await booking.VerifyNewReservationPage();
        booking.SearchAccommodation(1, 2, customerDetails.adults, customerDetails.child, customerDetails.infant);

        // lets not get any images and see how fast we can go
        // await page.route('**/*', (route) => {
        //     return route.request().resourceType() === 'image' ? route.abort() : route.continue();
        //   });

    });

    
    
    test('Start Booking and Check CSS', async({page}) =>{
        // this will put in a pencil booking and reduce availability
        // await page.getByRole('button', { name: '+ Add Booking' }).nth(0).click();
        await page.screenshot({ path: 'screenshot/accommodation.png', fullPage: true });
    });
    
    test('Load Lots of Rooms', async({page}) =>{      
    
        await page.route('**/Booking/SearchAccommodation', route => route.fulfill({
            status: 200,
            body: accoms.body,
            }));
    
        await page.getByRole('button', { name: '+ Add Booking' }).nth(0).click();
        await page.screenshot({ path: 'screenshot/lotsOfAccommodations.png', fullPage: true });
    });


});



