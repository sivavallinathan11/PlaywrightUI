import { errors, Page } from "@playwright/test";
import { DataSetup } from "../data/datasetup";
import { TestDirectory } from "../data/directory";
import { DashboardDetails } from "../data/managebookings";
import { CancellationPercentage, loyaltyTier, NoPaymentMessage, MembershipDiscount, MembershipFee, 
    refundMethod, paymentMethod, transactionType, description } from "../data/users";
import { Common } from "./Common";

export class ReimbursementReviewModal extends Common{
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
    // Modal.
    modal_ReimbursementReview = "//*[@id='reimbursement-review-modal']//div[@id='reimbursement-modal-container']";

    // Textfield.
    txt_CancellationFee = "#rr-cancellation-fee-price";

    // Label.
    lbl_TotalStay = "#rr-total-stay-cost";
    lbl_GdayMembership = "//div[@id='payment-line-items']/p[2]/span[2]/span[2]";
    lbl_Discounts = "//span[text()='Discounts']/following-sibling::span/span[2]";
    lbl_TotalPaid = "//span[text()='Total paid']/following-sibling::span/span[2]";
    lbl_CancellationFee = "#rr-stay-cancellation-fee";
    lbl_NoPayment = "//*[@class='no-payments']/span";
    lbl_AmountDue = "#rr-stay-total-refund";
    lbl_NoPaymentsMade = "//div[@class='payments']/div/div/span";
    lbl_RefundRequestAmount = "#rr-stay-refund-request";
    lbl_ParkRefundAmount = "#rr-stay-park-refund";
    lbl_CardSurcharge = "//span[text()='Card Surcharge ']/following-sibling::span/span[2]";

    // Button.
    btn_Continue = "#reimbursement-continue-cta";
    btn_Cancel = "#reimbursement-cancel-cta";

    // Table
    tbl_Payments = "//div[@id='reimbursement-modal-container']//table/tbody/tr";
    td_Payments = "xpath=child::td";
    td_RefundMethod = "xpath=child::td[4]"

    // **Function Starts Here**

    // This will verify if reimbursement modal pops up
    async VerifyReimbursementModal(){
        try{
            await this.WaitForElement(this.modal_ReimbursementReview, "Reimbursement Modal");
            await this.WaitForElement(this.btn_Continue, "Continue button");
            await this.WaitForElement(this.btn_Cancel, "Cancel button");
            await this.ScreenShot("Reimbursement Modal");
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

    // Verify Staycost Breakdown.
    async VerifyStayCostBreakdown(dashboard: DashboardDetails, paymentDetails: any [] = [], memberType: string = ""){
        try{
            // Get displayed stay cost breakdown
            var stayCostDetails: any [] = [];
            var totalStayCostSet: any [] = [], gdayMembershipSet: any [] = [], discountsSet: any [] = [];
            var totalPaidSet: any [] = [], cancellationFeeSet: any [] = [], cardSurchargeSet: any [] = [];
            var parkRefundSet: any [] = [], requestRefundSet: any [] = [], amountDueSet: any [] = [];
            var requestRefundDetailsSet: any [] = [], parkRefundDetailsSet: any [] = [];
            var totalStay = await this.GetElementText(this.lbl_TotalStay, "Total Stay");
            var discount = await this.GetElementText(this.lbl_Discounts, "Discounts");
            var totalPaid = await this.GetElementText(this.lbl_TotalPaid, "Total Paid");
            var cancellationFee = await this.GetElementText(this.lbl_CancellationFee, "Cancellation Fee");
            var amountDue = await this.GetElementText(this.lbl_AmountDue, "Amount Due");
            if(totalStay.replace("$","")!=dashboard.TotalStayCost[0].replace("$","")){
                throw new Error("Expected total stay cost did NOT matched.\nExpected: " + dashboard.TotalStayCost[0] +
                                "\nActual: " + totalStay);
            }else{
                totalStayCostSet.push(totalStay.replace("$",""))
            }

            // Set variables
            var gdayMembership;
            var gdayMembershipFee;
            var expectedDiscount = 0.00;
            var totalDiscount = parseFloat(dashboard.TotalStayCost[0]) * MembershipDiscount;

            // Calculate the discount and if newly join member, it should have a membership fee of 50.00
            if(dashboard.RewardsTier[0].length > 0){
                if(memberType.toLowerCase().trim() == "newmember"){
                    gdayMembership = parseFloat(await this.GetElementText(this.lbl_GdayMembership, "Gday Membership Fee"));
                    gdayMembershipFee = parseFloat(MembershipFee);
                    if(totalDiscount > parseFloat(MembershipFee)){
                        expectedDiscount = parseFloat(MembershipFee);
                    }else{
                        expectedDiscount = totalDiscount;
                    }
                }else{
                    if(dashboard.RewardsTier[0] == loyaltyTier.greatMate || dashboard.RewardsTier[0] == loyaltyTier.mate){
                        if(totalDiscount > parseFloat(MembershipFee)){
                            expectedDiscount = parseFloat(MembershipFee);
                        }else{
                            expectedDiscount = totalDiscount;
                        }
                    }else{
                        expectedDiscount = parseFloat(dashboard.TotalStayCost[0]) * MembershipDiscount;
                    }
                }

                if(gdayMembershipFee != gdayMembership){
                    throw new Error("Expected Gday Membership Fee did NOT matched.\nExpected: " + gdayMembershipFee +
                                    "\nActual: " + gdayMembership);
                }else{
                    gdayMembershipSet.push(gdayMembership);
                }
            }

            if(parseFloat(discount) != expectedDiscount){
                throw new Error("Expected discount did NOT matched.\nExpected: " + totalDiscount +
                            "\nActual: " + discount);
            }else{
                discountsSet.push(discount);
            }

            if(totalPaid.replace("$","")!=dashboard.DepositAmount[0]){
                throw new Error("Expected total paid did NOT matched.\nExpected: " + dashboard.DepositAmount[0] +
                                "\nActual: " + totalPaid);
            }else{
                totalPaidSet.push(totalPaid);
            }

            // Calculate the expected cancellation fee.
            var expectedCancellationFee: any;
            var firstInitialFee = dashboard.TotalStayCost[0] * CancellationPercentage;
            var secondInitialFee = dashboard.TotalStayCost[0] / dashboard.Night[0];
            if(dashboard.DateCountFromToday[0] < 14){
                if(firstInitialFee > secondInitialFee){
                    expectedCancellationFee = firstInitialFee.toFixed(2); //(firstInitialFee * dashboard.Night[0]).toFixed(2);
                }else{
                    expectedCancellationFee = secondInitialFee.toFixed(2);
                }
            }else{
                expectedCancellationFee = secondInitialFee.toFixed(2);
            }
            if(cancellationFee.replace("$","")!=expectedCancellationFee){
                throw new Error("Expected cancellation fee did NOT matched.\nExpected: " + expectedCancellationFee +
                                "\nActual: " + cancellationFee);
            }else{
                cancellationFeeSet.push(expectedCancellationFee);
            }

            var expectedCardSurcharge = 0.00;
            var flag = "false";
            for(var i = 0; i<paymentDetails.length; i++){
                if(paymentDetails[i]['description'] == description.ccFee && 
                paymentDetails[i]['transactionType'] == transactionType.charge){
                    expectedCardSurcharge = expectedCardSurcharge + paymentDetails[i]['amount'];
                    flag = "true";
                }
            }

            if(flag == "true"){
                var actualCardSurcharge = await this.GetElementText(this.lbl_CardSurcharge, "Card Surcharge");
                if(expectedCardSurcharge.toString() != actualCardSurcharge){
                    throw new Error("Expected Card Surcharge did NOT matched.\nExpected: " + expectedCardSurcharge +
                                "\nActual: " + actualCardSurcharge);
                }else{
                    cardSurchargeSet.push(expectedCardSurcharge);
                }
            }

            // No payment message should be displayed if no deposit was made.
            if(parseFloat(dashboard.DepositAmount[0]) <= 0){
                var noPayment = await this.GetElementText(this.lbl_NoPayment, "No Payment message");
                if(noPayment!=NoPaymentMessage){
                    throw new Error("Expected no payment message did NOT matched.\nExpected: " + NoPaymentMessage +
                                "\nActual: " + noPayment);
                }
            }else{
                var table = await this.FindElements(this.tbl_Payments, "Payments Table");
                var requestRefund = 0;
                var parkRefund = 0;
                for(var i = 0; i<table.length; i++){
                    var refundMethodElement = await this.FindSubElementOnElement(table[i], this.td_RefundMethod, "Refund Method");
                    var refundMethodText = await this.GetLiveElementText(refundMethodElement, "Refund Methd");
                    var tableDetails = await this.FindSubElementsOnElement(table[i], this.td_Payments, "Payment Details");
                    if(refundMethodText == refundMethod.requestRefund){
                        requestRefund++;
                        for(var x=0; x<tableDetails.length; x++){
                            var details = await this.GetLiveElementText(tableDetails[x], "Table Details");
                            requestRefundDetailsSet.push(details);
                        }
                    }else{
                        for(var y=0; y<tableDetails.length; y++){
                            var details = await this.GetLiveElementText(tableDetails[y], "Table Details");
                            parkRefundDetailsSet.push(details);
                        }
                        parkRefund++;
                    }
                }
                if(requestRefund > 0){
                    var requestRefundAmount = await this.GetElementText(this.lbl_RefundRequestAmount, "Refund Request Amount");
                    requestRefundSet.push(requestRefundAmount.replace("$",""));
                }
                if(parkRefund > 0){
                    var parkRefundAmount = await this.GetElementText(this.lbl_ParkRefundAmount, "Park Refund Amount");
                    parkRefundSet.push(parkRefundAmount.replace("$",""));
                }
            }

            // Calculate expected amount due.
            var expectedAmountDue: any;
            var fees = (parseFloat(expectedCancellationFee)).toFixed(2);
            if(parseFloat(fees) > parseFloat(dashboard.DepositAmount[0])){
                expectedAmountDue = ((parseFloat(fees) - parseFloat(dashboard.DepositAmount[0])) - expectedCardSurcharge).toFixed(2);
            }else{
                expectedAmountDue = ((parseFloat(dashboard.DepositAmount[0]) - parseFloat(fees)) - expectedCardSurcharge).toFixed(2);
            }

            if(amountDue.replace("$","")!=expectedAmountDue){
                throw new Error("Expected amount due did NOT matched.\nExpected: " + expectedAmountDue +
                                "\nActual: " + amountDue);
            }else{
                amountDueSet.push(amountDue.replace("$",""));
            }

            stayCostDetails = [totalStayCostSet, gdayMembershipSet, discountsSet, totalPaidSet,
                cancellationFeeSet, cardSurchargeSet, parkRefundSet, requestRefundSet, amountDueSet, requestRefundDetailsSet, parkRefundDetailsSet];
            
            return await this.dataSetup.SetStayCostDetails(stayCostDetails);
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

    // Verify Cancellation fee
    async VerifyCancellationFee(dashboard: DashboardDetails){
        try{
            // Get the actual cancellation fee.
            var CFElement = await this.FindElement(this.txt_CancellationFee, "Cancellation Fee textfield");
            var CancellationFee = await this.GetElementValueByAttribute(CFElement, "value", "Cancellation Fee textfield");

            // Calculate the expected cancellation fee.
            var expectedCancellationFee: any;
            if(dashboard.DateCountFromToday[0] < 14){
                var intialFee = dashboard.TotalStayCost[0] * CancellationPercentage;
                expectedCancellationFee = (intialFee * dashboard.Night[0]).toFixed(2);
            }

            // Verify cancellation fee.
            if(CancellationFee!=expectedCancellationFee){
                throw new Error("Expected cancellation fee was NOT displayed.\nExpected: " + expectedCancellationFee +
                "\nActual: " + CancellationFee);
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

    // Click Continue.
    async ClickContinue(){
        try{
            await this.Click(this.btn_Continue, "Continue button");
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