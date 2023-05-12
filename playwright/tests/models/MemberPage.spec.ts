import { Page, expect, ElementHandle } from "@playwright/test";
import { EditBookingModal } from "../models/EditBookingModalV2";
import { editbooking } from "../mocks/EditBooking";
import { BookingPageV2 } from "./BookingPageV2";


export class MemberPage{
    page: Page;
   
    // Set a sub routine that will access the functions from parent and sibling class.
    constructor(page: Page){
        this.page = page;     
    }

    async GenerateRandomEmail(initialName: string, domainType: string, stringType: string, stringSize: number){
        var randomString = await this.GenerateRandomString(stringType, stringSize);
        return initialName + randomString + domainType;
    }
  
    // This generate random string or alphanumeric string.
    async GenerateRandomString(stringType: string, stringSize: number){
          var result = "";
            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            var numbers = "1234567890";
            var numbersLength = numbers.length;
            var charactersLength = characters.length;
            if(stringType.toLocaleLowerCase().trim() == "string"){
                for(var i = 0; i < stringSize; i++){
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
            }
            else if(stringType.toLocaleLowerCase().trim() == "number"){
                for(var i = 0; i < stringSize; i++){
                result += numbers.charAt(Math.floor(Math.random() * numbersLength));
                }
            }
            else{
                var stringLength = (stringSize - Math.floor(stringSize/2)) + 1;
                var numberLength = Math.floor(stringSize/2) - 1;
                for(var a = 0; a < stringLength; a++){
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
        
                for(var b = 0; b < numberLength; b++){
                result += numbers.charAt(Math.floor(Math.random() * numbersLength));
                }
            }
        
            return result;
        }

    // New Member Creation
    async CreateMember(){
            const member = new MemberPage(this.page);
            const email = member.GenerateRandomEmail("test","@gmail.com","Alphanumeric",4);
            await this.page.goto('/Membership/New', { waitUntil: 'networkidle' });
            await this.page.locator('#FirstName').fill("Robot");
            await this.page.locator('#LastName').fill("Robot");
            await this.page.locator('#Email').fill(await email);
            await this.page.locator('#DateOfBirth').fill("11/11/1992");
            await this.page.locator('#Mobile').fill("0478466278");
            await this.page.getByLabel('Yes, member is a senior').check();
            await this.page.locator('#Street').fill("5000 Light square");
            await this.page.locator('#Suburb').fill("Adelaide");
            await this.page.locator('#StateAustralia').selectOption("SA");
            await this.page.locator('#Country').selectOption("Australia");
            await this.page.locator('#Street').fill("60 Light square");
            await this.page.locator('#PostCode').fill("5000")
            await this.page.getByRole('button', { name: 'Next' }).nth(1).click();
            await this.page.getByPlaceholder('Your (Staff) Full Name e.g. Fred Bloggs').fill("test");
            await this.page.getByRole('button', { name: 'Yes, create member!' }).click();
            await expect(this.page.getByRole('heading', { name: 'This will create a new membership number' })).toBeVisible();
            await this.page.getByRole('button', { name: 'Submit Request' }).click();
    }
    }
   

