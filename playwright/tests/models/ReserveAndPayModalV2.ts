import { errors, Page } from "@playwright/test";
import { AccommodationDetails, CustomerDetails } from "../data/bookings";
import { DataSetup } from "../data/datasetup";
import { TestDirectory } from "../data/directory";
import { MembershipFee, StaffName, TestingEnvironment, 
    MembershipErrorOnGroupReservation, MembershipErrorOnIndividualReservation } from "../data/users";
import { Common } from "./Common";
import { DiscountModal } from "./DiscountModal";
// import { MakePaymentModal } from "./MakePaymentModalV2";

export class ReserveAndPayModal{
    // Set object variables.
    readonly page: Page;
    readonly dir: TestDirectory;
    public dataSetup = new DataSetup();

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