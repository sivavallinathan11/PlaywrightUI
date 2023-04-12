import { errors, Page } from "@playwright/test"
import { TestDirectory } from "../data/directory";
import { DiscountReason, StaffName } from "../data/users";
import { Common } from "./Common"

export class DiscountModal extends Common{
    // Set object variables.
    readonly page: Page;
    readonly dir: TestDirectory;

    // Set a sub routine that will access the functions from parent and sibling class.
    constructor(page: Page, dir: TestDirectory){
        super(page, dir);
        this.page = page;
        this.dir = dir;
    }

    // Set XPaths, Element IDs and other attributes.
    // Modal
    public modal_Discounts = "//*[@class='modal-content discount-content']//span[@class='modal-title']";
    public modal_ApplyDiscount = "//*[@id='apply-discount-modal']";

    // Button
    public btn_ApplyDiscount = "//*[@id='apply-discount-cta']";
    public btn_ConfirmDiscount = "//*[@id='confirm-discount']";
    public btn_ClearDiscount = "#clear-discount-cta";
    public btn_UpdateDiscount = "#update-discount-cta"

    // Label
    public lbl_DiscountName = "//*[@id='discount-results']/tr/td[contains(@class, 'sorting')]";
    public lbl_UncheckedDiscountName = "//*[@id='discount-results']/tr/td/input[not(boolean(@checked))]/../following-sibling::td[contains(@class, 'sorting')]";

    // Textbox
    public txt_SearchDiscount = "//input[@id='discount-search']";
    public txt_StaffName = "#discount-staff-name";
    public txt_DiscountReason = "#discount-reason";

    // Radiobutton
    public rdo_Discount = "//*[@id='discount-results']/tr/td/input";
    public rdo_UncheckedDiscount = "//*[@id='discount-results']/tr/td/input[not(boolean(@checked))]";

    // Step: This will add discount to reservation
    async SelectAndApplyDiscount(discountType: string = ""){
        try{
            // Wait for add discount modal to be displayed.
            await this.WaitForElement(this.modal_Discounts, "Add Discount Modal");
    
            // Verify discount title.
            var title = await this.GetElementText(this.modal_Discounts, "Add Discount Modal title");
            if(title!="Add Discount"){
                throw new Error("Add Discount Title was NOT displayed.\nActual: " + title);
            }
    
            // Verify if 'Apply Discount' button is disabled.
            var button = await this.FindElement(this.btn_ApplyDiscount, "Apply Discount button");
            var attribute = await this.GetElementValueByAttribute(button, "class", "Add Discount button");
            if(attribute!="disabled"){
                throw new Error("Apply Discount was NOT disabled as no discount was selected.");
            }
    
            // Capture Add Discount modal.
            await this.ScreenShot("Add Discount Modal");
    
            // Select first, specific or random discount.
            var discountNames = await this.FindElements(this.lbl_DiscountName, "Discount Names");
            var radioButtons = await this.FindElements(this.rdo_Discount, "Dicount radio buttons");
            if(discountType==""){
                await this.ClickElement(radioButtons[0], "Selected Discount");
            }
            else if(discountType.toLowerCase().trim()=="random"){
                var index = Math.floor(Math.random() * radioButtons.length);
                await this.ClickElement(radioButtons[index], "Selected Discount");
            }
            else{
                var selected = false;
                for(var i=0; i<discountNames.length; i++){
                    var name = await this.GetLiveElementText(discountNames[i], "Discount Name");
                    if(name.toUpperCase().trim()==discountType.toUpperCase().trim()){
                        await this.ClickElement(radioButtons[i], name);
                        selected = true;
                        break;
                    }
                }
    
                if(!selected){
                    throw new Error(discountType + " is not available in the list of discounts");
                }
            }
    
            // Verify if 'Apply Discount' button is NOT disabled.
            var button = await this.FindElement(this.btn_ApplyDiscount, "Apply Discount button");
            var attribute = await this.GetElementValueByAttribute(button, "class", "Add Discount button");
            if(attribute=="disabled"){
                throw new Error("Apply Discount was NOT enabled as discount was selected.");
            }
    
            // Click Apply Discount.
            await this.ClickElement(button, "Apply Discount button");
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

    // This will fill up details to confirm discount
    async FillUpAndConfirmDiscountDetails(staffName: string){
        // Wait for the Apply Discount modal to be displayed.
        await this.WaitForElement(this.modal_ApplyDiscount, "Apply Discount Modal");

        // Verify if 'Confirm' button is disabled.
        var button = await this.FindElement(this.btn_ConfirmDiscount, "Confirm Discount button");
        var attribute = await this.GetElementValueByAttribute(button, "class", "Confirm Discount button");
        if(!attribute.includes("disabled")){
            throw new Error("Confirm Discount button was NOT disabled as discount was selected.");
        }

        // Capture Apply Discount modal.
        await this.ScreenShot("Apply Discount Modal");

        // Enter Staff Name.
        await this.EnterValue(this.txt_StaffName, staffName, "Staff Name field");

        // Enter Discount Reason.
        await this.EnterValue(this.txt_DiscountReason, DiscountReason, "Discount Reason field");

        // Verify if 'Confirm' button is NOT disabled.
        var button = await this.FindElement(this.btn_ConfirmDiscount, "Confirm Discount button");
        var attribute = await this.GetElementValueByAttribute(button, "class", "Confirm Discount button");
        if(attribute.includes("disabled")){
            throw new Error("Confirm Discount button was NOT enabled as discount was selected.");
        }

        // Capture Add Discount modal.
        await this.ScreenShot("Filled-up Discount Details");

        // Click confirm button.
        await this.ClickElement(button, "Confirm Discount button");

        // Wait for the Apply Discount modal to be hidden.
        await this.WaitForElementToBeHidden(this.modal_ApplyDiscount, 15000);
    }

    // This will clear the applied discount.
    async ClearAndUpdateDiscount(){
        // Verify if the edit discount modal is displayed.
        await this.WaitForElement(this.modal_Discounts, "Edit Discount Modal");

        // Check discount title.
        var title = await this.GetElementText(this.modal_Discounts, "Edit Discount Modal title");
        if(title!="Edit Discount"){
            throw new Error("Edit Discount Title was NOT displayed.\nActual: " + title);
        }

        // Capture Edit Discount modal.
        await this.ScreenShot("Edit Discount Modal");

        // Click Clear Discount.
        await this.Click(this.btn_ClearDiscount, "Clear Discount button");
    }

    // This will update the applied discount.
    async ChangeAndUpdateDiscount(discountType: string = ""){
        // Verify if the edit discount modal is displayed.
        await this.WaitForElement(this.modal_Discounts, "Edit Discount Modal");

        // Check discount title.
        var title = await this.GetElementText(this.modal_Discounts, "Edit Discount Modal title");
        if(title!="Edit Discount"){
            throw new Error("Edit Discount Title was NOT displayed.\nActual: " + title);
        }

        // Capture Edit Discount modal.
        await this.ScreenShot("Edit Discount Modal");

        // Verify if 'Update' button is disabled.
        var button = await this.FindElement(this.btn_UpdateDiscount, "Update Discount button");
        var attribute = await this.GetElementValueByAttribute(button, "class", "Update Discount button");
        if(!attribute.includes("disabled")){
            throw new Error("Update Discount button was NOT disabled as discount was selected.");
        }

        // Select first, specific or random unchecked discount.
        var discountNames = await this.FindElements(this.lbl_UncheckedDiscountName, "Unchecked Discount Names");
        var radioButtons = await this.FindElements(this.rdo_UncheckedDiscount, "Unchecked Dicount radio buttons");
        if(discountType==""){
            await this.ClickElement(radioButtons[0], "Newly Selected Discount");
        }
        else if(discountType.toLowerCase().trim()=="random"){
            var index = Math.floor(Math.random() * radioButtons.length);
            await this.ClickElement(radioButtons[index], "Newly Selected Discount");
        }
        else{
            var selected = false;
            for(var i=0; i<discountNames.length; i++){
                var name = await this.GetLiveElementText(discountNames[i], "New Discount Name");
                if(name.toUpperCase().trim()==discountType.toUpperCase().trim()){
                    await this.ClickElement(radioButtons[i], name);
                    selected = true;
                    break;
                }
            }

            if(!selected){
                throw new Error(discountType + " is not available in the list of unchecked discounts");
            }
        }

        // Verify if 'Update' button is enabled.
        var button = await this.FindElement(this.btn_UpdateDiscount, "Update Discount button");
        var attribute = await this.GetElementValueByAttribute(button, "class", "Update Discount button");
        if(attribute.includes("disabled")){
            throw new Error("Update Discount button was disabled as discount was selected.");
        }

        // Click Update Discount.
        await this.ClickElement(button, "Update Discount button");
    }
}