import { Page } from "@playwright/test";
import { BDMCredentials } from "../data/users";


// dumb this down, don't inherit from anything
// just make stand alone
export class LoginPage{
    // Set page object variable.
    page: Page;
    
    // Set a sub routine that will access the functions from parent and sibling class.
    constructor(page: Page){
        this.page = page;        
    }
   
    // This is much faster. There's no need to abstract it down further when everything you need to login is in one place.
    // If the login screen changes then it's much more obvious how this works
    // this is almost twice as quick as the old way
    async Login() {
        var email = BDMCredentials.email;
        var password = BDMCredentials.password;
        await this.page.locator('#Username').fill(email, { timeout: 3000 })
        await this.page.getByLabel('Password').fill(password, { timeout: 3000 })
        await this.page.getByRole('button', { name: 'Login' }).click()

    }
}