import { errors, Page, test, expect } from "@playwright/test";
import { TestDirectory } from "../data/directory";
import { BDMCredentials, LoginType, TestingEnvironment, URL } from "../data/users";
import { Common } from "./Common";

export class LoginPage extends Common{
    // Set page object variable.
    readonly page: Page;
    
    // Set a sub routine that will access the functions from parent and sibling class.
    constructor(page: Page, dir: TestDirectory){
        super(page, dir);
        this.page = page;
    }

    // Set XPaths, Element IDs and other attributes.
    public txt_Email = "#Username";
    public txt_Password = "#Password";
    public btn_Login = "//button[@value='login']";

    // This is much faster. There's no need to abstract it down further when everything you need to login is in one place.
    // If the login screen changes then it's much more obvious how this works
    // this is almost twice as quick as the old way
    async JustLoginFFS() {
        var email = BDMCredentials.email;
        var password = BDMCredentials.password;
        await this.page.locator('#Username').fill(email, { timeout: 3000 })
        await this.page.getByLabel('Password').fill(password, { timeout: 3000 })
        await this.page.getByRole('button', { name: 'Login' }).click()

    }

    // Navigate to parkweb login page.
    async Open(){
        try{
            if(TestingEnvironment.toLowerCase().trim()=="dev"){
                await this.GoTo(URL.DEV_GDayAddress, "Parkweb Login Page");
            }
            else{
                await this.GoTo(URL.GDayAddress, "Parkweb Login Page");
            }
        }
        catch(e){
            await this.ScreenShot("Failed", false, e.stack);
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }
            else{
                throw new Error(e.stack);
            }
        }
    }

    // Enter credentials based on login type.
    async EnterCredentials(){
        try{
            var email = "";
            var password = "";
            
            // Identify what type of user will be logged in.
            switch(LoginType.toLowerCase().trim()){
                case "bdm":
                    email = BDMCredentials.email;
                    password = BDMCredentials.password;
                    break;
            }

            // Capture Login page.
            await this.ScreenShot("Login Page");
    
            // Enter email to email text field.
            await this.EnterValue(this.txt_Email, email, "Email field");
    
            // Enter password to password field.
            await this.EnterValue(this.txt_Password, password, "Password field");

            // Capture input credentials.
            await this.ScreenShot("Input Credentials");
        }
        catch(e){
            await this.ScreenShot("Failed", false, e.stack);
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }
            else{
                throw new Error(e.stack);
            }
        }
    }

    // This will click the login button.
    async ClickLogin(){
        try{
            await this.FindElement(this.btn_Login, "Login Button");
            await this.Click(this.btn_Login, "Login button");
            // await this.Sleep(5000);
        }
        catch(e){
            await this.ScreenShot("Failed", false, e.stack);
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }
            else{
                throw new Error(e.stack);
            }
        }
    }
}