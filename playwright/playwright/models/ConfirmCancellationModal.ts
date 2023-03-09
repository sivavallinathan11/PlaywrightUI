import { errors, Page } from "@playwright/test";
import { TestDirectory } from "../data/directory";
import { Common } from "./Common";
import { StaffName } from "../data/users";

export class ConfirmCancellationModal extends Common{
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
    // Dropdown.
    drp_CancellationReason = ".select-reason";
    drp_ReasonOptions = "//select[@id='cancellation-reason-dropdown']/option";

    // Text Field
    txt_EmployeeName = "#employee-name";

    // Button
    btn_Confirm = "//div[@id='cancel-confirmation-modal']//div[@class='row']//button[@id='confirm']";
    btn_Cancel = "//div[@id='cancel-confirmation-modal']//div[@class='row']//button[@id='cancel']";

    // Modal
    mdl_CancelConfirmationModal = "//div[@id='cancel-confirmation-modal']//div[@id='booking-modal-container']";

    // **Function Starts Here**

    // Verify Cancel Confirmation Modal
    async VerifyCancelConfirmationModal(){
        try{
            await this.WaitForElement(this.mdl_CancelConfirmationModal, "Cancel Confirmation Modal");
            await this.ScreenShot("Selects Candellation Reason");
        }catch(e){
            await this.ScreenShot("Failed", false, e.stack);
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }
            else{
                throw new Error(e.stack);
            }
        }
    }

    // Select Cancellation Reason
    async SelectRandomCancellationReason(){
        try{
            var numberOfOptions = await this.FindElements(this.drp_ReasonOptions, "Cancellation Reason Option", "all");
            var value = "0";
            do{
                value = (Math.ceil(Math.random() * numberOfOptions.length-1)).toString();
                await this.SelectFromDropdown(this.drp_CancellationReason, "value", value, "Cancellation Reason Dropdown");
            }while(parseInt(value) == 0)
        }catch(e){
            await this.ScreenShot("Failed", false, e.stack);
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }
            else{
                throw new Error(e.stack);
            }
        }
    }

    // Enter Employee Name
    async EnterEmployeeName(staffName: string){
        try{
            await this.EnterValue(this.txt_EmployeeName, staffName, "Employee Name Field");
            await this.ScreenShot("Enters employees name")
        }catch(e){
            await this.ScreenShot("Failed", false, e.stack);
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }
            else{
                throw new Error(e.stack);
            }
        }
    }

    // Click Confirm
    async ClickConfirm(){
        try{
            await this.Click(this.btn_Confirm, "Confirm Button");
        }catch(e){
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