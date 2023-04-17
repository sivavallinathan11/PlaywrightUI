import { errors, Page } from "@playwright/test";
import { Payment } from "../data/API";
import { DataSetup } from "../data/datasetup";
import { TestDirectory } from "../data/directory";
import { DashboardDetails, StayCostDetails } from "../data/managebookings";
import { paymentMethod, sectionType, totalAmountPaidIn, transactionType } from "../data/users";
import { Common } from "./Common";

export class ProcessRefundModal extends Common{
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
    public lbl_ProcessRefundModal = "//div[@id='process-refund']//div[@class='modal-content']";
    public lbl_FinanceRefundAmount = "#finance-refund-amount";
    public lbl_ParkRefundAmount = "#refund-amount";
    public lbl_RefundReasonRequiredError = "#RefundReason-error";
    public lbl_InvalidEmailAddressError = "#StaffEmail-error";
    public lbl_PaymentMethod = "xpath=child::span/a/label";

    // Text
    public txt_StaffEmailAddress = "#StaffEmail";
    public txt_PaymentDetails = "#PaymentDetails";
    public txt_RefundReason = "#RefundReason";
    public txt_Customername = "xpath=child::td[2]/input";
    public txt_ReservationNumber = "xpath=child::td[2]/input";
    public txt_OriginalAmountPaid = "xpath=child::td[2]/input";
    public txt_RefundAmountRequested = "xpath=child::td[2]/input";
    public txt_PaymentList = "tr[8]/td[2]//li";

    // Span
    public span_RefundRequestPaymentsDetails = "xpath=child::td[2]/div/ul/li/span";

    // Div
    public div_ParkRefundAmountSection = "//div[@class='park-refund-amount ']//li";

    // li
    public li_PaymentMethod = "xpath=child::li";
    
    // Table
    public tbl_RefundRequest = "//div[@class='refund-request-form']//table/tbody/tr";
    public tbl_ParkRefund = "//div[@class='park-refund-amount ']//table[@id='payments-table']/tbody/tr";

    // TD
    public td_RefundRequestPaymentDetails = "xpath=child::td[2]/div/ul/li/span";
    public td_ParkRefundPaymentDetails = "xpath=child::td";

    // Button
    public btn_Process = "//div[@id='process-refund']//div[@class='row']//button[@id='process']";

    // Section
    public sec_ParkRefundAmount = "//div[@class='park-refund-amount ']";
    public sec_RefundRequestAmount = "//div[@class='refund-request-amount ']";

    // Radio Button
    public rdo_Eftpos = "//span[@id='eftpos-tooltip']/a";

    // **Function Starts Here**

    // This will verify if park refund/refund request/both section pops up
    async VerifyProcessRefundSection(sectionType: string){
        try{
            switch(sectionType.trim().toLowerCase()){
                case "eftpos":
                    if(await this.ElementExist(this.sec_RefundRequestAmount)){
                        throw new Error("Refund Request Section should be HIDDEN");
                    }else{
                        await this.WaitForElement(this.sec_ParkRefundAmount, "Park Refund Section");
                    }
                    break;
                case "cash":
                    if(await this.ElementExist(this.sec_ParkRefundAmount)){
                        throw new Error("Park Refund Section should be HIDDEN");
                    }else{
                        await this.WaitForElement(this.sec_RefundRequestAmount, "Refund Request Section");
                    }
                    break;
                case "mixed":
                    await this.WaitForElement(this.sec_RefundRequestAmount, "Refund Request Section");
                    await this.WaitForElement(this.sec_ParkRefundAmount, "Park Refund Section");
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

    // This will verify Refund request details
    async VerifyParkRefundtDetails(stayCostDetails: StayCostDetails){
        try{
            // Declare variables
            var paymentsDetailsSet: any [] = [];
            var paymentMethodElements = await this.FindElements(this.div_ParkRefundAmountSection, "Payment Method");

            // Check if CC, CASH AND SPLIT PAYMENT are disabled and EFTPOS should be active
            for(var i = 0; i<paymentMethodElements.length; i++){
                var paymentMethodElement = await this.FindSubElementOnElement(paymentMethodElements[i], this.lbl_PaymentMethod, "Payment Method");
                var paymentMethod = await this.GetElementValueByAttribute(paymentMethodElements[i], "class", "Payment Method");
                var paymentType = await this.GetLiveElementText(paymentMethodElement, "Payment MEthod");
                if(i < 3){
                    if(!paymentMethod.includes("disabled")){
                        throw new Error("Payment method "+paymentType+" is NOT disabled");
                    }
                }else{
                    if(!paymentMethod.includes("active")){
                        throw new Error("Payment method "+paymentType+" is NOT active");
                    }
                }
            }

            paymentsDetailsSet = (await this.GetPaymentDetails(stayCostDetails, sectionType.parkRefund));
            await this.VerifyPaymentDetails(paymentsDetailsSet, stayCostDetails, sectionType.parkRefund);
            var actualParkRefundAmount = await this.GetElementText(this.lbl_ParkRefundAmount, "Park Refund Amount");
            if(actualParkRefundAmount.replace("$","") != stayCostDetails.ParkRefundAmount[0]){
                throw new Error("Actual and Expected Park Refund Amount did NOT matched. \nActual: "+actualParkRefundAmount
                +"\nExpected: "+stayCostDetails.RefundRequestAmount);
            }
            await this.ScreenShot("Process Refund (Refund Request)");

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

    // This will separate those payments
    async SeparatePaymentDetails(paymentDetails: any [] = [], paymentType: any){
        try{
            var cashPayment: any [] = [];
            var creditPayment: any [] = [];
            var chargePayment: any [] = [];
            var totalAmountPaidInCash = 0.00;
            var totalAmountPaidInEFTPOS = 0.00;
            var totalCreditCardFee = 0.00;
            for(var i = 0; i<paymentDetails.length; i++){
                if(paymentDetails[i]['paymentMethod'].toLowerCase().trim() == Payment.cash
                && paymentDetails[i]['transactionType'] == transactionType.receipt){
                    cashPayment.push(paymentDetails[i]);
                    totalAmountPaidInCash = totalAmountPaidInCash + paymentDetails[i]['amount'];
                }else if(paymentDetails[i]['paymentMethod'].toLowerCase().trim() == Payment.cc
                && paymentDetails[i]['transactionType'] == transactionType.receipt){
                    creditPayment.push(paymentDetails[i]);
                    totalAmountPaidInEFTPOS = totalAmountPaidInEFTPOS + paymentDetails[i]['amount'];
                }else{
                    chargePayment.push(paymentDetails[i]);
                    totalCreditCardFee = totalCreditCardFee + paymentDetails[i]['amount'];
                }
            }
            switch(paymentType){
                case paymentMethod.cash:
                    return cashPayment;
                case paymentMethod.eftpos:
                    return creditPayment;
                case totalAmountPaidIn.cash:
                    return totalAmountPaidInCash;
                case totalAmountPaidIn.eftpos:
                    return totalAmountPaidInEFTPOS;
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

    // Get Payment Details
    async GetPaymentDetails(stayCostDetails: StayCostDetails, sectionType: any){
        try{
            // Get table elements
            
            var paymentElements: any;
            var paymentDetails: any [] = [] ;
            var length = 0;
            if(sectionType == "refund request"){
                length = (stayCostDetails.RefundRequestDetails).length;
            }else{
                length = (stayCostDetails.ParkRefundDetails).length;
            }
            // This will store the payment details in text area to an array
            for(var i = 0; i<(length/4); i++){
                switch(sectionType.toLowerCase().trim()){
                    case "refund request":
                        var tableElements = await this.FindElements(this.tbl_RefundRequest, "Refund Request Table");
                        tableElements = await this.FindElements(this.tbl_RefundRequest, "Refund Request Table");
                        paymentElements = await this.FindSubElementsOnElement(tableElements[7], this.td_RefundRequestPaymentDetails, "Payment Element");
                        break;
                    case "park refund":
                        var tableElements = await this.FindElements(this.tbl_ParkRefund, "Park Refund Table");
                        tableElements = await this.FindElements(this.tbl_ParkRefund, "Park Refund Table");
                        paymentElements = await this.FindSubElementsOnElement(tableElements[i], this.td_ParkRefundPaymentDetails, "Payment Element");
                        break;
                }
                for(var x = 0; x<paymentElements.length; x++){
                    var paymentData = await this.GetLiveElementText(paymentElements[x], "Payment Details");
                    paymentDetails.push(paymentData);
                }
            }
            return paymentDetails;
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

    // Verify each details in payment details
    async VerifyPaymentDetails(paymentsDetailsSet:any []=[], stayCostDetails: StayCostDetails, sectionType:any){
        try{
            // This will verify each payment details
            var counter = 0;
            var details: any;
            if(sectionType == "park refund" ){
                details = stayCostDetails.parkRefundDetails;
            }else{
                details = stayCostDetails.refundRequestDetails;
            }
            for(var y = 0; y<paymentsDetailsSet.length; y++){
                if(y != 0){
                    if(y%3==0){
                        counter++;
                    }
                }
                console.log(paymentsDetailsSet[y]);
                console.log(details[counter]);
                if(!paymentsDetailsSet[y].includes(details[counter])){
                    throw new Error("Actual and Expected "+sectionType+" Payment Details did NOT matched. \nActual: "+paymentsDetailsSet[y]
                +"\nExpected: "+details[counter]);
                }
                counter++;
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

    // This will verify Park Refund Section
    async VerifyRefundRequestDetails(stayCostDetails: StayCostDetails, bookingDetails: DashboardDetails, paymentDetails: any [] = []){
        try{
            // Setup variable
            var paymentsDetailsSet: any [] = [];
            // Get table elements
            var tableElements = await this.FindElements(this.tbl_RefundRequest, "Refund Request Table");

            // Getting element of each text field
            var staffEmailElement = await this.FindElement(this.txt_StaffEmailAddress, "Staff Email Address");
            var refundReasonElement = await this.FindElement(this.txt_RefundReason, "Refund Reason");
            var customerNameElement = await this.FindSubElementOnElement(tableElements[2], this.txt_Customername, "Customer Name");
            var reservationNumberElement = await this.FindSubElementOnElement(tableElements[3], this.txt_ReservationNumber, "Customer Name");
            var originalAmountPaidElement = await this.FindSubElementOnElement(tableElements[5], this.txt_OriginalAmountPaid, "Reservation Number");
            var refundAmountRequestedElement = await this.FindSubElementOnElement(tableElements[6], this.txt_RefundAmountRequested, "Refund Amount Requested");

            // Check if element is required field
            await this.CheckElementAttributeExist(staffEmailElement, "data-val-required", "Staff Email Address is required");
            await this.CheckElementAttributeExist(refundReasonElement, "data-val-required", "Refund Reason is required");

            // Getting the value of the element
            var actualCustomerName = await this.GetElementValueByAttribute(customerNameElement, "value", "Customer Name");
            var actualReservationNumber = await this.GetElementValueByAttribute(reservationNumberElement, "value", "Reservation Number");
            var actualOriginalAmountPaid = await this.GetElementValueByAttribute(originalAmountPaidElement, "value", "Original Amount Paid");
            var actualRefundAmountRequested = await this.GetElementValueByAttribute(refundAmountRequestedElement, "value", "Refund Amount Requested");
            var actualFinanceRefundAmount = await this.GetElementText(this.lbl_FinanceRefundAmount, "Finance Refund Amount");

            // Data validation
            var customerFullname = bookingDetails.customerFirstName + " " + bookingDetails.customerLastName;
            if(customerFullname != actualCustomerName){
                throw new Error("Actual and Expected customer name did NOT matched. \nActual: "+actualCustomerName
                +"\nExpected: "+customerFullname);
            }

            if(bookingDetails.reservationNumber[0] != actualReservationNumber){
                throw new Error("Actual and Expected reservation number did NOT matched. \nActual: "+actualReservationNumber
                +"\nExpected: "+bookingDetails.reservationNumber);
            }

            var expectedAmountPaidInCash = await this.SeparatePaymentDetails(paymentDetails, totalAmountPaidIn.cash);
            if(expectedAmountPaidInCash != actualOriginalAmountPaid.replace("$","")){
                throw new Error("Actual and Expected amount paid did NOT matched. \nActual: "+actualOriginalAmountPaid
                +"\nExpected: "+expectedAmountPaidInCash);
            }

            if(actualRefundAmountRequested.replace("$","") != stayCostDetails.RefundRequestAmount[0]){
                throw new Error("Actual and Expected Refund Request Amount did NOT matched. \nActual: "+actualRefundAmountRequested
                +"\nExpected: "+stayCostDetails.RefundRequestAmount);
            }

            paymentsDetailsSet.push(await this.GetPaymentDetails(stayCostDetails, sectionType.refundRequest));
            await this.VerifyPaymentDetails(paymentsDetailsSet, stayCostDetails, sectionType.refundRequest);

            if(actualFinanceRefundAmount.replace("$","") != stayCostDetails.RefundRequestAmount[0]){
                throw new Error("Actual and Expected Finance Refund Amount did NOT matched. \nActual: "+actualFinanceRefundAmount
                +"\nExpected: "+stayCostDetails.RefundRequestAmount);
            }
            await this.ScreenShot("Process Refund (Refund Request)");
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

    // Input Value
    async InputStaffEmailAddress(value: any){
        try{
            await this.FillUpValue(this.txt_StaffEmailAddress, value, "Staff Email Address");
            await this.ScreenShot("Filled Up Staff Email Address");
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

    // Input Value
    async InputRefundReason(value: any){
        try{
            await this.FillUpValue(this.txt_RefundReason, value, "Refund Reasn");
            await this.ScreenShot("Filled Up Refund Reason");
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

    // Click Process Button
    async ClickProcessBtn(){
        try{
            await this.Click(this.btn_Process, "Process Button");
            if(await this.ElementExist(this.lbl_RefundReasonRequiredError, 5000) || 
            await this.ElementExist(this.lbl_InvalidEmailAddressError, 5000)){
                await this.ScreenShot("Invalid inputs on Required Fields");
                throw new Error("Invalid inputs on Required Fields (Staff Email Address/Refund Reason");
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
}