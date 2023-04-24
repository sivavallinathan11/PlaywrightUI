import { test } from "@playwright/test";
import { LoginPage } from "../../models/LoginPageV2";
import { BookingPageV2 } from "../../models/BookingPageV2";
import { UpsellGuestData } from "../../data/users";
import { accoms } from "../../mocks/SearchLotsOfAccommodations";



test.describe.parallel('Visual Checks and Screenshots', () => {  
    
    test.beforeEach(async ({ page }) => {  
        const login = new LoginPage(page);
        await page.goto('');
        await login.Login();


        // lets not get any images and see how fast we can go
        // await page.route('**/*', (route) => {
        //     return route.request().resourceType() === 'image' ? route.abort() : route.continue();
        //   });

    });
    
    // quicker to login once and just traverse the links I need
    test('New Reservation', async({page}) =>{      
    
        await page.route('**/Booking/SearchAccommodation', route => route.fulfill({
            status: 200,
            body: accoms.body,
            }));
        
        await page.goto('/Booking/NewReservation', { waitUntil: 'networkidle' });

        const booking = new BookingPageV2(page);
        const customerDetails = UpsellGuestData;
        // await booking.VerifyNewReservationPage();
        booking.SearchAccommodation(1, 2, customerDetails.adults, customerDetails.child, customerDetails.infant);

        await page.getByRole('button', { name: '+ Add Booking' }).nth(0).click();
        await page.screenshot({ path: 'screenshot/ipad/lotsOfAccommodations.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/lotsOfAccommodations.png', fullPage: true});
    });

    test('Booking Dashboard', async({page}) =>{      
        await page.goto('/Booking', { waitUntil: 'networkidle' });        
        await page.screenshot({ path: 'screenshot/ipad/BookingDashboard.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/BookingDashboard.png', fullPage: true});
    });

    test('Finance', async({page}) =>{      
        await page.goto('/Finance', { waitUntil: 'networkidle' });        
        await page.screenshot({ path: 'screenshot/ipad/Finance.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/Finance.png', fullPage: true});
    });

    test('Search Members', async({page}) =>{      
        await page.goto('/Membership/SearchMembers', { waitUntil: 'networkidle' });        
        await page.screenshot({ path: 'screenshot/ipad/SearchMembers.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/SearchMembers.png', fullPage: true});
    });

    test('New Membership', async({page}) =>{      
        await page.goto('/Membership/New', { waitUntil: 'networkidle' });        
        await page.screenshot({ path: 'screenshot/ipad/NewMembership.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/NewMembership.png', fullPage: true});
    });

    test('Lost Booking Claims', async({page}) =>{      
        await page.goto('/lostbooking/claims?type=open', { waitUntil: 'networkidle' });        
        await page.screenshot({ path: 'screenshot/ipad/LostBookingClaims.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/LostBookingClaims.png', fullPage: true});
    });

    test('Experience Oz', async({page}) =>{      
        await page.goto('/ExperienceOz', { waitUntil: 'networkidle' });        
        await page.screenshot({ path: 'screenshot/ipad/ExperienceOz.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/ExperienceOz.png', fullPage: true});

    });

    test('Partner Rewards', async({page}) =>{      
        await page.goto('/Booking/Reward', { waitUntil: 'networkidle' });        
        await page.screenshot({ path: 'screenshot/ipad/PartnerReward.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/PartnerReward.png', fullPage: true});
    });

    test('Leader Board', async({page}) =>{      
        await page.goto('/Leaderboard', { waitUntil: 'networkidle' });        
        await page.screenshot({ path: 'screenshot/ipad/LeaderBoard.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/LeaderBoard.png', fullPage: true});
    });

    test('Help Memberships', async({page}) =>{      
        await page.goto('/Help', { waitUntil: 'networkidle' });        
        await page.screenshot({ path: 'screenshot/ipad/HelpMemberships.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/HelpMemberships.png', fullPage: true});
    });

    test('Help Bookings', async({page}) =>{      
        await page.goto('/Help/Bookings', { waitUntil: 'networkidle' });        
        await page.screenshot({ path: 'screenshot/ipad/HelpBookings.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/HelpBookings.png', fullPage: true});
    });

    test('Park', async({page}) =>{      
        await page.goto('/Park', { waitUntil: 'networkidle' });        
        await page.screenshot({ path: 'screenshot/ipad/Park.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/Park.png', fullPage: true});
    });

});



