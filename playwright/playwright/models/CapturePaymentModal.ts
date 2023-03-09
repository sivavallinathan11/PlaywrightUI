import { errors, Page } from "@playwright/test";
import { DataSetup } from "../data/datasetup";
import { TestDirectory } from "../data/directory";
import { Common } from "./Common";
import { hundred, CCSurcharge } from "../data/users";
import { StayCostDetails } from "../data/managebookings";

export class CapturePaymentModal extends Common{
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
    modal_CapturePayment = "//*[@id='capture-payment-modal']//div[@class='modal-body']";

    // Button
    btn_CashPayment = "//div[@id='process-refund']//a[@href='#cash']/..";
    btn_CCPayment = "//div[@id='process-refund']//a[@href='#card']/..";
    btn_Process = "#process";
    btn_SplitPayment = "//ul[@class='tab-container']/li[@id='split-payment-option']";
    btn_Cancel = "//*[@id='cancel-capture-payment']";

    // Checkbox
    chx_ProcessCardManually = "//input[@id='process-card-manually']";

    // Label
    lbl_TotalPaid = "//*[@id='capture-payment-modal']//*[@class='stay-cost-breakdown']//*[@id='total-paid']";
    lbl_CancellationFee = "//*[@id='capture-payment-modal']//*[@class='stay-cost-breakdown']//*[@id='cancellation-fee']";
    lbl_Amount = "//*[@id='capture-payment-modal']//*[@id='total-balance']//*[@id='amount-due']";
    lbl_CCFee = "#surcharge-amount"

    // Textfield
    txt_CashDue = "#cash-payable-amount";
    txt_CCSurcharge = "#card-surcharge";

    // **Function Starts Here**
    async VerifyCapturePaymentModal(){
        try{
            await this.WaitForElement(this.modal_CapturePayment, "Capture Payment modal");
            await this.ScreenShot("Capture Payment Modal");
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

    // This will check capture payment modal details.
    async VerifyCapturePaymentModalDetails(stayCostDetails: StayCostDetails){
        try{
            // Check active payment method.
            var totalPaid = stayCostDetails.TotalPaid[0];
            var expectedCancellationFee = stayCostDetails.CancellatiomFee[0];
            var amountDue = stayCostDetails.AmountDue[0];
            await this.CheckActivePaymentMethod();
            await this.FindElement(this.lbl_TotalPaid, "Total Paid");
            await this.FindElement(this.lbl_CancellationFee, "Cancellation fee");
            var actualAmountDue = await this.GetElementText(this.lbl_Amount, "Amount Due");
            var actualCancellationFee = await this.GetElementText(this.lbl_CancellationFee, "Cancellation Fee");
            var actualTotalPaid = await this.GetElementText(this.lbl_TotalPaid, "Total Paid");
            var cashDueElement = await this.FindElement(this.txt_CashDue, "Cash Due")
            var cashDue = await this.GetElementValueByAttribute(cashDueElement, "value", "Cash Due");

            if(actualAmountDue!=amountDue.replace("$","")){
                throw new Error("Expected amount due did NOT matched.\nExpected: " + amountDue +
                                "\nActual: " + actualAmountDue);
            }

            if(actualCancellationFee!=expectedCancellationFee.replace("$","")){
                throw new Error("Expected cancellation fee did NOT matched.\nExpected: " + actualCancellationFee +
                "\nActual: " + actualCancellationFee);
            }

            if(actualTotalPaid!=totalPaid.replace("$","")){
                throw new Error("Expected total paid did NOT matched.\nExpected: " + actualTotalPaid +
                "\nActual: " + totalPaid);
            }

            if(cashDue!=amountDue.replace("$","")){
                throw new Error("Expected cash due did NOT matched.\nExpected: " + cashDue +
                "\nActual: " + amountDue);
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

    // Check active payment method.
    async CheckActivePaymentMethod(payMethod: string=""){
        try{
            await this.Sleep(3000);
            var activePaymentMethod: any;
            switch(payMethod.toLowerCase().trim()){
                case "cash":
                    activePaymentMethod = await this.FindElement(this.btn_CashPayment, "Cash Payment");
                    if(!(await this.GetElementValueByAttribute(activePaymentMethod, "class", "Cash Payment")).includes("active")){
                        throw new Error("Cash payment method was NOT active");
                    }
                    break;
                case "credit card":
                    activePaymentMethod = await this.FindElement(this.btn_CCPayment, "Credit Card Payment");
                    if(!(await this.GetElementValueByAttribute(activePaymentMethod, "class", "Credit Card Payment")).includes("active")){
                        throw new Error("Credit Card payment method was NOT active");
                    }
                    break;
                default:
                    activePaymentMethod = await this.FindElement(this.btn_CashPayment, "Default Cash Payment");
                    if(!(await this.GetElementValueByAttribute(activePaymentMethod, "class", "Default Cash Payment")).includes("active")){
                        throw new Error("Default cash payment method was NOT active");
                    }
                    break;
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

    // Select payment method.
    async SelectPaymentMethod(payMethod: string, stayCostDetails: StayCostDetails){
        try{
            switch(payMethod.toLowerCase().trim()){
                case "cash": 
                    break;
                case "credit card":
                    await this.Click(this.btn_CCPayment, "Credit Card payment method");
                    await this.CheckActivePaymentMethod(payMethod);
                    var ccFee = await this.GetElementText(this.lbl_CCFee, "Credit Card Fee");
                    var surchargeFeeElement = await this.FindElement(this.txt_CCSurcharge, "Credit Card Surcharge");
                    var surchargeFee = await this.GetElementValueByAttribute(surchargeFeeElement, "value", "Surcharge Fee");
                    var initialSurcharge= (parseFloat(stayCostDetails.AmountDue[0]) * CCSurcharge);
                    var expectedSurcharge = (Math.round(initialSurcharge * hundred) / hundred).toString();

                    await this.WaitForElement(this.lbl_CancellationFee, "Credit Card Fee");
                    await this.WaitForElement(this.txt_CCSurcharge, "Surcharge");

                    // Validate CC details.
                    if(expectedSurcharge!=ccFee.replace("+$ ","")){
                        throw new Error("Actual and Expected credit card fee did NOT matched. \nExpected: " +
                        expectedSurcharge+ "\nActual: "+ccFee);
                    }
                
                    if(expectedSurcharge!=surchargeFee){
                        throw new Error("Actual and Expected surcharge did NOT matched. \nExpected: " +
                        expectedSurcharge+ "\nActual: "+surchargeFee);
                    }

                    // Validate new Amount Due
                    var actualAmountDue = await this.GetElementText(this.lbl_Amount, "Amount Due");
                    var expectedAmountDue = parseFloat(stayCostDetails.AmountDue[0]) + parseFloat(expectedSurcharge);

                    if(actualAmountDue!=expectedAmountDue.toString()){
                        throw new Error("Actual and Expected amount due did NOT matched. \nExpected: " +
                        expectedAmountDue+ "\nActual: "+actualAmountDue);
                    }
                    break;
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

    // Click process card manually
    async ClickProcessCardManually(){
        try{
            await this.Click(this.chx_ProcessCardManually, "Process Card Manually checkbox");
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

    // Verify Split Payment
    async CheckCashDueField(){
        try{
            if(!await this.ElementEnabled(this.txt_CashDue)){
                throw new Error("Cash Due was NOT disabled");
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

    // Click Process
    async ClickProcess(){
        try{
            await this.Click(this.btn_Process, "Process Button");
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