import { errors, Page } from "@playwright/test";


// import { MakePaymentModal } from "./MakePaymentModalV2";

export class ReserveAndPayModal{
    // Set object variables.
    readonly page: Page;

    // Set a sub routine that will access the functions from parent and sibling class.
    constructor(page: Page){
        this.page = page;        
    }
    
   
    // Step: This will verify if the Reserve and Pay modal is displayed.
    async VerifyReserveAndPayModal(){
        await this.page.locator('#ReservationTypeId').selectOption('07. Tourist - Group');
        await this.page.locator('#BookingSourceId').selectOption('1. Walk in');
        await this.page.getByPlaceholder('Start typing a note here...').fill('Just a note by the test bot');
        await this.page.getByRole('checkbox').check();
        
    }

    async ReserveNowButton() {
        await this.page.getByRole('button', {name: 'Reserve Now'}).click();

    }

    
    // async PayTotalWithCash(percentage: string = "100%") {
    //     console.log('Pay total');
    //     const makePaymentModal = new MakePaymentModal(this.page);
    //     makePaymentModal.PayTotalWithCash(percentage);
    // }

    
}