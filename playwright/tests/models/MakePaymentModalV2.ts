import { errors, Page, expect, Locator } from "@playwright/test";
import { Payment } from "../data/API";
import { AccommodationDetails, CustomerDetails, PaymentDetails } from "../data/bookings";
import { DataSetup } from "../data/datasetup";
import { TestDirectory } from "../data/directory";
import { DashboardDetails } from "../data/managebookings";
import { CCSurcharge, dateInput, MembershipFee, paymentMethod, TestingEnvironment, URL } from "../data/users";
import { Common } from "./Common";
import exp from "constants";

export class MakePaymentModal{
    // Set page object.
    readonly page: Page;
    // public dataSetup = new DataSetup();
    private cardPayment: Locator;
    private albertDevice: Locator;
    private oneHundredPercent: Locator;
    private returnButton: Locator;
    private cash: Locator;
    private surcharge: Locator;
    private processPayment: Locator;
    private cashTendered: Locator;
    private changeDue: Locator;
    private manualPayment: Locator;
    
    // Booking Complete
    public bookingComplete: Locator;
    
    

    // Set a sub routine that will access the functions from parent and sibling class.
    constructor(page: Page){

        this.page = page;
        // setup POM for this modal
        this.returnButton = page.getByRole('button', { name: '← Return' });
        this.cardPayment = page.locator('#card-payment');
        this.albertDevice = page.locator('#card-albert-device');

        this.manualPayment = page.getByRole('checkbox', {name: 'Manual Payment'});
        this.cashTendered = page.locator('#cash-amount-received');

        this.oneHundredPercent = page.getByRole('link', { name: '100%' });
        this.cash = page.locator('#accordion-cash');
        this.surcharge = page.getByText('Surcharge', { exact: true });
        this.processPayment = page.getByRole('button', {name: 'Process Payment'});
        this.changeDue = page.locator('#cash-change-due');

        // booking complete
        this.bookingComplete = page.getByRole('heading', { name: 'Booking Complete!' });


    }

    async PayTotalWithCash() {   
        await this.ValidateInitialPaymentState();  
        await this.cash.click();
        // this.page.getByRole('link', { name: '100%' });
        await this.processPayment.click();

    }

    async PayTotalWithCc() {   
 
        await this.manualPayment.check();
        // this.page.getByRole('link', { name: '100%' });
        await this.processPayment.click();

    }


    async ValidateInitialPaymentState() {
        await expect.soft(this.returnButton).toBeVisible();
        await expect.soft(this.surcharge).toBeVisible();
        await expect.soft(this.processPayment).toBeEnabled();
        await this.page.screenshot({ path: 'screenshot/Make Payment Modal - Default.png'});
    }


}