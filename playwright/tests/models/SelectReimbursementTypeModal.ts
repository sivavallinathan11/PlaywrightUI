import { errors, Page } from "@playwright/test";
import { DataSetup } from "../data/datasetup";
import { TestDirectory } from "../data/directory";
import { Common } from "./Common";

export class SelectReimbursementTypeModal extends Common{
    // Set object variable.
    readonly page: Page;
    readonly dir: TestDirectory;
    public dataSetup = new DataSetup();

    // Set a sub routine that will access the functions from parent and sibling class.
    constructor(page: Page, dir: TestDirectory){
        super(page, dir);
        this.page = page;
        this.dir = dir;
    }

    // Set XPaths, Element IDs and other attributes.
    // Modal
    public mdl_SelectReimbursementType = "//div[@id='reimbursement-booking-modal']//div[@id='booking-modal-container']";

    // Radio Button
    public rdo_Refund = "#refund-selection";

    // Button
    public btn_Continue = "#credit-refund-tooltip";

    // **Function Starts Here**

    // This verifies if select reimbursement type modal pops up
    async VerifySelectReimbursementTypeModal(){
        try{
            await this.WaitForElement(this.mdl_SelectReimbursementType, "Select Reimbursement Type Modal")
            await this.ScreenShot("Select Reimbursement Type Modal");
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

    // This click refund type
    async SelectReimbursementType(type: string){
        try{
            switch(type.trim().toLocaleLowerCase()){
                case "refund":
                    await this.Click(this.rdo_Refund, "Refund Radio Button");
                    break;
                case "credit":
                    break;
            }
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

    // This clicks continue button
    async ClickContinue(){
        try{
            await this.Click(this.btn_Continue, "Continue Button");
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