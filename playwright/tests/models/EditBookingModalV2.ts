import { errors, Page } from "@playwright/test";
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';
import {v4 as uuidv4} from 'uuid';

const config: Config = {
  dictionaries: [names]
}

import { Common } from "./Common";

export class EditBookingModal {
    readonly page: Page;

    constructor(page: Page){        
        this.page = page;
    }
    
    // fills the guest details modal with random names and email that resolves to a controlled inbox
    // tests need to use the addGuest or convertToMember methods to get to this
    private async guestDetails() {
        const firstname: string = uniqueNamesGenerator(config);
        const lastname: string = uniqueNamesGenerator(config);
        const email = "dhprobot+" + uuidv4() + "@gmail.com";

        // search for a guest and add a new one
        await this.page.getByPlaceholder('Search or create a customer').fill('Robot Customer');
        await this.page.getByRole('button', { name: '+ Create a new customer'}).click();

        // this is the new member modal
        await this.page.getByPlaceholder('John').fill(firstname);
        await this.page.getByPlaceholder('Discovery').fill(lastname);
        await this.page.getByPlaceholder('example@hotmail.com').fill(email);
        await this.page.getByPlaceholder('0412 345 678').fill('0401217010');
        // Click 'Enter Manually' link on the address.
        // this isn't an exhaustive test on inputs - don't really care, it just has to get through
        // create a specific test if you want form validation
        await this.page.getByRole('button', { name: 'Enter Manually' }).click();        
        await this.page.locator('#gr-street').fill('60 Light Square');
        await this.page.locator('#gr-town').fill('Adelaide');
        await this.page.locator('#gr-state-au').selectOption('SA');
        await this.page.locator('#gr-postcode').fill('5000');
        await this.page.locator('#gr-country').selectOption('Australia');
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    // add a guest
    async addGuest(){
        await this.guestDetails();
        await this.page.locator('#update-booking').click();

    }

    // add a guest then upsell them to a member
    async convertToMember() {
        await this.guestDetails();
        // join
        await this.page.getByRole('button', { name: 'Join' }).click();
        // staff details
        await this.page.locator('#staff-name').fill('Test Robot');
        await this.page.locator('#confirm-membership-cta').click();
        await this.page.locator('#update-booking').click();        
    }

}