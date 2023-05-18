import {test,  expect, request } from '../../fixtures/login';
import { LoginPage } from "../../models/LoginPageV2";
import { BookingPageV2 } from "../../models/BookingPageV2";
import { UpsellGuestData } from "../../data/users";
import { Common } from '../../models/Common';
import { MemberPage } from '../../models/MemberPage.spec';

// mocks
import { accoms } from "../../mocks/SearchLotsOfAccommodations";
import { addbooking } from "../../mocks/AddBooking";

import { injectAxe, checkA11y, getViolations, reportViolations } from 'axe-playwright';

test.describe.serial('Member Validations in ParkWeb @membership', () => {
   
    let member

        test('create a new member', async ({ page }) => {
            test.slow();
            const Member = new MemberPage(page);
            await Member.CreateMember();
            await expect(page.getByRole('heading', { name: 'Success!' })).toBeVisible();
            member = await page.locator('#NewMembershipModal_GeneratedMemberNumber').textContent();
          
           });    

           test('Search for a member @membership', async ({ page }) => {
            test.slow();
            await page.goto('/Membership/SearchMembers', { waitUntil: 'networkidle' });
            await page.locator('#searchText').fill(member);
            await page.getByRole('button').nth(1).click({ force: true });
            await page.getByText('Robot', { exact: true }).isVisible();
           });


           test('Redeem a Benefit @membership', async ({ page ,isMobile}) => {
            test.slow();
            await page.goto('/Membership/SearchMembers', { waitUntil: 'networkidle' });
            await page.locator('#searchText').fill(member);
            
           if(isMobile){
            await page.getByRole('button', { name: 'Search' }).click();
           }
           else{
            await page.getByRole('button', { name: 'Lookup' }).click();
           }
           // await page.locator('//*[@id="search-simple"]/div/div[1]/form/div/div/button').click();
            
            await page.getByText('Robot', { exact: true }).isVisible();
            await page.getByRole('button', { name: 'Select' }).nth(0).click();
            await page.getByRole('button', { name: 'Claim' }).nth(0).click();
            await page.locator('#ReservationNumber').fill("12345");
            await page.locator('#claimBenefit').click();
           }); 
        });
    