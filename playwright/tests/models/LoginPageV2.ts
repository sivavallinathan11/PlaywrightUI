import { Locator, Page } from "@playwright/test";
import { BDMCredentials } from "../data/users";


// dumb this down, don't inherit from anything
// just make stand alone
export class LoginPage{
    // Set page object variable.
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    
    // Set a sub routine that will access the functions from parent and sibling class.
    constructor(page: Page){
        this.page = page;        
        this.username = page.locator('#Username');
        this.password = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }
   
    // This is much faster. There's no need to abstract it down further when everything you need to login is in one place.
    // If the login screen changes then it's much more obvious how this works
    // this is almost twice as quick as the old way
    async Login() {
        var email = BDMCredentials.email;
        var password = BDMCredentials.password;
        await this.username.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();

    }
}