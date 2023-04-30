import {test,  expect, request } from '../../fixtures/login';
import { LoginPage } from "../../models/LoginPageV2";
import { BookingPageV2 } from "../../models/BookingPageV2";
import { UpsellGuestData } from "../../data/users";

// mocks
import { accoms } from "../../mocks/SearchLotsOfAccommodations";
import { addbooking } from "../../mocks/AddBooking";

import { injectAxe, checkA11y, getViolations, reportViolations } from 'axe-playwright';



test.describe.parallel('Accessibility Checks and Screenshots', () => {  
    
    test.beforeEach(async ({ page }, testInfo) => {  
        // const login = new LoginPage(page);        
        // await login.Login('');
        // // a lot of lost booking claim against this park, it runs a little slow
        // // whole thing should be done in about 3o seconds on a pipeline
        // testInfo.setTimeout(testInfo.timeout + 30000);
    });
    
    // quicker to login once and just traverse the links I need
    // test('New Reservation', async({page}) =>{      
        
    //     // mock these
    //     await page.route('**/Booking/SearchAccommodation', route => route.fulfill({
    //         status: 200,
    //         body: accoms.body,
    //         }));

    //         // setup a mock for adding a booking
    //     await page.route('**/Booking/AddBooking', route => route.fulfill({
    //         status: 200,
    //         body: addbooking.body,
    //         }));
            
    //     await page.goto('/Booking/NewReservation', { waitUntil: 'networkidle' });
    //     await injectAxe(page);

    //     const booking = new BookingPageV2(page);
        
    //     booking.numberOfNights = 1;
    //     booking.adults = 2;
    //     booking.child = 1;
    //     booking.infant = 1;

    //     const customerDetails = UpsellGuestData;
    //     // await booking.VerifyNewReservationPage();
    //     booking.SearchAccommodation();

    //     await page.getByRole('button', { name: '+ Add Booking' }).nth(0).click();
    //     await page.getByRole('button', { name: '+ Add Booking' }).nth(1).click();
    //     await page.getByRole('button', { name: '+ Add Booking' }).nth(2).click();
    //     await page.getByRole('button', { name: '+ Add Booking' }).nth(3).click();
    //     await page.getByRole('button', { name: '+ Add Booking' }).nth(4).click();
    //     await page.screenshot({ path: 'screenshot/ipad/lotsOfAccommodations.png'});
    //     await page.screenshot({ path: 'screenshot/ipad/full/lotsOfAccommodations.png', fullPage: true});

    //     await checkA11y(page, undefined, {
    //         detailedReport: true,            
    //         axeOptions: {
    //           runOnly: {
    //             type: 'tag',
    //             values: ['wcag2a'],
    //           },
    //         },
    //       })
    // });

    test('Booking Dashboard', async({page}) =>{      
        await page.goto('/Booking', { waitUntil: 'networkidle' });     
        await injectAxe(page);   
        await page.screenshot({ path: 'screenshot/ipad/BookingDashboard.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/BookingDashboard.png', fullPage: true});
        await checkA11y(page, undefined, {
            detailedReport: true,            
            axeOptions: {
              runOnly: {
                type: 'tag',
                values: ['wcag2a'],
              },
            },
          })
    });

    test('Finance', async({page}) =>{      
        await page.goto('/Finance', { waitUntil: 'networkidle' });        
        await injectAxe(page);
        await page.screenshot({ path: 'screenshot/ipad/Finance.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/Finance.png', fullPage: true});
        await checkA11y(page, undefined, {
            detailedReport: true,            
            axeOptions: {
              runOnly: {
                type: 'tag',
                values: ['wcag2a'],
              },
            },
          })
    });

    test('Search Members', async({page}) =>{      
        await page.goto('/Membership/SearchMembers', { waitUntil: 'networkidle' });     
        await injectAxe(page);   
        await page.screenshot({ path: 'screenshot/ipad/SearchMembers.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/SearchMembers.png', fullPage: true});
        await checkA11y(page, undefined, {
            detailedReport: true,            
            axeOptions: {
              runOnly: {
                type: 'tag',
                values: ['wcag2a'],
              },
            },
          })
    });

    test('New Membership', async({page}) =>{      
        await page.goto('/Membership/New', { waitUntil: 'networkidle' });       
        await injectAxe(page); 
        await page.screenshot({ path: 'screenshot/ipad/NewMembership.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/NewMembership.png', fullPage: true});
        await checkA11y(page, undefined, {
          detailedReport: false,            
          axeOptions: {
            runOnly: {
              type: 'tag',
              values: ['wcag2a'],
            },
          },
        })
    });

    test('Lost Booking Claims', async({page}) =>{      
        await page.goto('/lostbooking/claims?type=open', { waitUntil: 'networkidle' });      
        await injectAxe(page);  
        await page.screenshot({ path: 'screenshot/ipad/LostBookingClaims.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/LostBookingClaims.png', fullPage: true});
        await checkA11y(page, undefined, {
            detailedReport: true,            
            axeOptions: {
              runOnly: {
                type: 'tag',
                values: ['wcag2a'],
              },
            },
          })
    });

    test('Experience Oz', async({page}) =>{      
        await page.goto('/ExperienceOz', { waitUntil: 'networkidle' });      
        await injectAxe(page);  
        await page.screenshot({ path: 'screenshot/ipad/ExperienceOz.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/ExperienceOz.png', fullPage: true});
        await checkA11y(page, undefined, {
            detailedReport: true,            
            axeOptions: {
              runOnly: {
                type: 'tag',
                values: ['wcag2a'],
              },
            },
          })

    });

    test('Partner Rewards', async({page}) =>{      
        await page.goto('/Booking/Reward', { waitUntil: 'networkidle' });      
        await injectAxe(page);  
        await page.screenshot({ path: 'screenshot/ipad/PartnerReward.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/PartnerReward.png', fullPage: true});
        await checkA11y(page, undefined, {
            detailedReport: true,            
            axeOptions: {
              runOnly: {
                type: 'tag',
                values: ['wcag2a'],
              },
            },
          })
    });

    test('Leader Board', async({page}) =>{      
        await page.goto('/Leaderboard', { waitUntil: 'networkidle' });
        await injectAxe(page);       
        await page.screenshot({ path: 'screenshot/ipad/LeaderBoard.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/LeaderBoard.png', fullPage: true});
        await checkA11y(page, undefined, {
            detailedReport: true,            
            axeOptions: {
              runOnly: {
                type: 'tag',
                values: ['wcag2a'],
              },
            },
          })
    });

    test('Help Memberships', async({page}) =>{      
        await page.goto('/Help', { waitUntil: 'networkidle' });        
        await injectAxe(page);
        await page.screenshot({ path: 'screenshot/ipad/HelpMemberships.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/HelpMemberships.png', fullPage: true});
        await checkA11y(page, undefined, {
            detailedReport: true,            
            axeOptions: {
              runOnly: {
                type: 'tag',
                values: ['wcag2a'],
              },
            },
          })
    });

    test('Help Bookings', async({page}) =>{      
        await page.goto('/Help/Bookings', { waitUntil: 'networkidle' });        
        await injectAxe(page);
        await page.screenshot({ path: 'screenshot/ipad/HelpBookings.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/HelpBookings.png', fullPage: true});
        await checkA11y(page, undefined, {
            detailedReport: true,            
            axeOptions: {
              runOnly: {
                type: 'tag',
                values: ['wcag2a'],
              },
            },
          })
    });

    test('check a11y for Park page and wcag2a', async({page}) =>{      
        await page.goto('/Park', { waitUntil: 'networkidle' });        
        await injectAxe(page);
        await page.screenshot({ path: 'screenshot/ipad/Park.png'});
        await page.screenshot({ path: 'screenshot/ipad/full/Park.png', fullPage: true});

        await checkA11y(page, undefined, {
            detailedReport: true,            
            axeOptions: {
              runOnly: {
                type: 'tag',
                values: ['wcag2a'],
              },
            },
          })
    });

});



