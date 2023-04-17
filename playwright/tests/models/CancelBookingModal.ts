import { errors, Page } from "@playwright/test";
import { TestDirectory } from "../data/directory";
import { Common } from "./Common";

export class CancelBookingModal extends Common{
    // Set object variable.
    readonly page: Page;
    readonly dir: TestDirectory;

    // Set a sub routine that will access the functions from parent and sibling class.
    constructor(page: Page, dir: TestDirectory){
        super(page, dir);
        this.page = page;
        this.dir = dir;
    }

    // Set XPaths, Element IDs and other attributes.
    // Modal.
    modal_CancelBooking = "//*[@id='cancel-booking-modal']//*[@id='booking-modal-container']";

    // Button.
    btn_Continue = "#cancel-confirm";
    btn_Cancel = "//*[@id='cancel-booking-modal']//*[@id='booking-modal-container']//button[@id='cancel']";


    // **Function Starts Here**

    // Verify Cancel Booking Modal is displayed.
    async VerifyCancelBookingModal(){
        try{
            await this.WaitForElement(this.modal_CancelBooking, "Cancel Booking Modal");
            await this.ScreenShot("Cancel Booking Modal");
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

    // Click Continue button.
    async ClickContinueOnCancelBookingModal(){
        try{
            await this.Click(this.btn_Continue, "Continue cancel booking");
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