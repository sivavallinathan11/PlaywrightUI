import { errors, Page } from "@playwright/test";
import { Payment } from "../data/API";
import { AccommodationDetails, CustomerDetails, PaymentDetails } from "../data/bookings";
import { DataSetup } from "../data/datasetup";
import { TestDirectory } from "../data/directory";
import { DashboardDetails } from "../data/managebookings";
import { CCSurcharge, dateInput, MembershipFee, paymentMethod, TestingEnvironment, URL } from "../data/users";
import { Common } from "./Common";

export class MakePaymentModal extends Common{
    // Set page object.
    readonly page: Page;
    public dataSetup = new DataSetup();

    // Set a sub routine that will access the functions from parent and sibling class.
    constructor(page: Page, dir: TestDirectory){
        super(page, dir);
        this.page = page;
    }

    // Set XPaths, Element IDs and other element attributes.
    // Modal.
    public modal_PaymentModal = "//*[@class='payment-selection']/*[@id='payment-booking-modal']";

    // Radio button.
    public rdo_cash = "//input[@id='cash-payment']";
    public rdo_card = "//input[@id='card-payment']";
    public rdo_eftpos = "//input[@id='eftpos-payment']";

    // Checkbox.
    public chk_CardManualPay = "#card-manual";
    public chk_EFTPOSManualPay = "#eftpos-manual";

    // Button.
    public btn_CashPercent = "//*[@id='gr-reserve-modal-container']//*[@id='cash-percent']/li/a";
    public btn_CardPercent = "//*[@id='gr-reserve-modal-container']//*[@id='card-percent']/li/a";
    public btn_EFTPOSPercent = "//*[@id='gr-reserve-modal-container']//*[@id='eftpos-percent']/li/a";
    public btn_ProcessPayment = "#process-payment-rc6";
    public btn_CancelPayment = "#cancel-payment";

    // Text Field.
    public txt_CashPayableAmount = "#cash-payable-amount";
    public txt_CardPayableAmount = "#card-payable-amount";
    public txt_EFTPOSPayableAmount = "#eftpos-payable-amount";

    // Label.
    public lbl_NumberOfBooking = "//div[@id='payment-modal']//div[@class='payment-booking-details']/div";
    public lbl_BookingGDay = "xpath=child::div";
    public lbl_CashBalanceRemaining = "#cash-balance-remaining";
    public lbl_CardBalanceRemaining = "#card-balance-remaining"
    public lbl_EFTPOSBalanceRemaining = "#eftpos-balance-remaining";
    public lbl_CardSurcharge = "//*[@id='gr-reserve-modal-container']//*[@id='card-surcharge']";
    public lbl_AccommodationName = "xpath=child::div/div/label//p[1]";
    public lbl_GDayReward = "xpath=child::div[2]//p[1]";
    public lbl_SubTotal = "#total-booking-price";
    //"//form[@id='payment-modal-form']//div[@class='payment-booking-details']//label//p[1]";
    public lbl_AssignedRoom = "xpath=child::div/div/label//p[2]//span[4]";
    public lbl_ContactName = "xpath=child::div/div/label//p[2]//span[2]";
    //"//form[@id='payment-modal-form']//div[@class='payment-booking-details']//label//p[2]/span[2]";
    public lbl_GuestQuotePrice = "xpath=child::div/div[2]/p";
    //"//form[@id='payment-modal-form']//div[@class='payment-booking-details']//div/div[2]//p";
    public lbl_MemberQuotePrice = "//*[@id='gr-reserve-modal-container']//*[@class='payment-booking-details']//div[contains(@class, 'booking-entry')]/div[1]/div[3]/p";
    public lbl_PaymentSurcharge = "//span[@id='card-surcharge']"
    public lbl_AmountPayable = "#card-amount-payable";
    public lbl_BalanceRemaining = "#card-balance-remaining";
    public lbl_BalanceDue = "#card-balance-remaining"

    // Temporary Dev elements
    public lbl_DevBalanceDue = "//form[@id='payment-modal-form']//*[@class='amount total-booking-price']";
    //"//*[@id='gr-reserve-modal-container']//*[@class='amount total-booking-price']";

    // This will verify payment modal is displayed.
    async VerifyPaymentModal(){
        if(!await this.ElementExist(this.modal_PaymentModal, 120000)){
            throw new Error("Payment modal was NOT displayed.");
        }
    }

    // This will verify reservation details and process payment using cash.
    async SetPaymentForReservation(paymentType: string, percentage: string = "100%", 
    accomDetails: AccommodationDetails, guestDetails: CustomerDetails){
        try{
            // Verify reservation details.
            await this.VerifyReservationDetails(accomDetails, guestDetails);
    
            // Set random payment type.
            if(paymentType.toLowerCase().trim()=="random"){
                var paymentSet = ['Cash', 'Credit Card', 'EFTPOS'];
                var randomPaymentIndex = Math.floor(Math.random() * paymentSet.length);
                paymentType = paymentSet[randomPaymentIndex];
            }
            console.log("Selected payment method: " + paymentType);
    
            // Set random percentage.
            var electedPercentage = percentage;
            if(electedPercentage.toLowerCase().trim()=="random"){
                var percentSet = ['25%', '50%', '75%'];
                var percentages = [.25, .50, .75];
                var randomPercentageIndex: any;
                var calculatedPrice: any;
                if(guestDetails.isUpsell){
                    do{
                        randomPercentageIndex = Math.floor(Math.random() * percentSet.length);
                        calculatedPrice = accomDetails.price[0] * percentages[randomPercentageIndex];
                    }while(calculatedPrice < 50.00)
                }else{
                    randomPercentageIndex = Math.floor(Math.random() * percentSet.length);
                }
                electedPercentage = percentSet[randomPercentageIndex];
            }
            console.log("Selected percentage: " + electedPercentage);
    
            // Select payment method.
            var paymentDetails = await this.SelectPaymentMethod(accomDetails, guestDetails, paymentType, 
                electedPercentage);
    
            return paymentDetails;
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
    
    // Verify the selected accommodation.
    async VerifyReservationDetails(accomDetails: AccommodationDetails, guestDetails: CustomerDetails){
        // Get the reservation details.
        var bookingSummary = await this.FindElements(this.lbl_NumberOfBooking, "Number of Items in Summary");
        // Verify reservation details.
        for(var i =0; i < accomDetails.bookingCount; i++){
            var accommodationNameElement = await this.FindSubElementOnElement(bookingSummary[i], this.lbl_AccommodationName, "Accommodation Name");
            var contactNameElement = await this.FindSubElementOnElement(bookingSummary[i], this.lbl_ContactName, "Contact Name");
            var assignedRoomElement = await this.FindSubElementOnElement(bookingSummary[i], this.lbl_AssignedRoom, "Assigned Room");
            var initialPriceElement = await this.FindSubElementOnElement(bookingSummary[i], this.lbl_GuestQuotePrice, "Guest Quote Price");
            var accommodationName = (await this.GetLiveElementText(accommodationNameElement, "Accommodation Name")).replace("QAIR-","");
            var contactName = await this.GetLiveElementText(contactNameElement, "Contact Name");
            var assignedRoom = await this.GetLiveElementText(assignedRoomElement, "Assigned Room");
            var initialPrice = await (await this.GetLiveElementText(initialPriceElement, "Guest Quote Price")).replace(",","");

            var initialAccommodation =accomDetails.accommodationName[i];
            var accommodationDetails = initialAccommodation.split(" - ");
            var expectedAccommodationName = accommodationDetails[0].trim();
            var expectedAssignedRoom = accommodationDetails[accommodationDetails.length-1].trim();

            if(guestDetails.isUpsell[i]){
                var booking = await this.FindSubElementsOnElement(bookingSummary[i], this.lbl_BookingGDay, "Booking with GDay");
                if(!await this.SubElementExist(booking[1], this.lbl_BookingGDay)){
                    throw new Error("Member upsell but GDay Reward Membership line item did NOT exist");
                }else{
                    var gdayRewardElement = await this.FindSubElementOnElement(booking[1], this.lbl_GDayReward, "GDay Reward Membership");
                    var gdayReward = (await this.GetLiveElementText(gdayRewardElement, "GDay Reward Membership Price")).replace("$", "");
                    if(gdayReward != MembershipFee){
                        throw new Error("GDay Membership fee did not matched"
                        +"\n Actual: "+gdayReward
                        +"\n Expected: "+MembershipFee);
                    }
                }
            }

            if(expectedAccommodationName.replace("QAIR-","") != accommodationName.replace("QAIR-","")){
                throw new Error("Accommodation Name did not matched."
                +"\n Expected Accommodation Name: "+accomDetails.accommodationName[i]
                +"\n Actual Accommodation Name: "+accommodationName);
            }
            
            if(guestDetails.firstName[i].toLowerCase().trim()!=contactName.toLowerCase().trim()){
                throw new Error("Contact Name did not matched."
                +"\n Expected Contact Name: "+guestDetails.firstName[i]
                +"\n Actual Contact Name: "+contactName);
            }

            if(expectedAssignedRoom.toLowerCase().trim() != assignedRoom.toLowerCase().trim()){
                throw new Error("Assigned Room did not matched."
                +"\n Expected Assigned Room: "+accomDetails.assignedRoom[i]
                +"\n Actual Assigned Room: "+assignedRoom);
            }

            if(accomDetails.price[i].trim()!=initialPrice.trim().replace("$","")){
                throw new Error("Reservation price did not matched."
                +"\n Expected Reservation price: "+accomDetails.price[i]
                +"\n Actual Reservation price: "+initialPrice.replace("$",""));
            }
        }
    }   

    // This will select payment method based on inputs.
    async SelectPaymentMethod(accomDetails: AccommodationDetails, guestDetails: CustomerDetails, 
        paymentType: string, percentage: string = "100%"){
        try{
            // Set variable.
            var paymentDetails: any = [], paymentTypeSet: any [] = [], totalPaymentSet: any [] = [],
             surchargeSet: any [] = [], totalBalanceSet: any [] = [], memberDiscountSet: any [] = [], 
             paymentPercentageSet: any [] = [], paymentDateSet: any [] = [], transactionTypeSet: any [] = [] ;
            var percent: any;
            var upsellAmount = "0.00";
                
            // Check if upsell is available.
            for(var i = 0; i < accomDetails.BookingCount; i++){
                if(guestDetails.IsUpsell[i]){
                    upsellAmount = (parseFloat(upsellAmount) + parseFloat(MembershipFee)).toFixed(2);
                }
            }
            console.log("Membership Fee: " + upsellAmount);
    
            // Get all payment details.
            var quotedPrice = "0.00"
            for(var i = 0; i < accomDetails.BookingCount; i++){
                quotedPrice = (parseFloat(quotedPrice) + parseFloat(accomDetails.Price[i])).toFixed(2);
            }
            switch(paymentType.toLowerCase().trim()){
                case "cash":
                    // Click on cash radio button.
                    await this.Click(this.rdo_cash, "Cash Radio button");
    
                    // Select percentage.
                    if(percentage.includes("%")){
                        percentage = percentage.replace('%', '').trim();
                        await this.SelectPercentage(percentage, this.btn_CashPercent, paymentType);
        
                        // Get the expected payment details.
                        percent = parseInt(percentage) / 100;
                        var initialAmount = (parseFloat(quotedPrice) + parseFloat(upsellAmount)).toFixed(2);
                        var discountedPrice = parseFloat(initialAmount) * percent;
                        var expectedPayableAmount = (Math.round((discountedPrice + Number.EPSILON) * 100) / 100).toFixed(2);
        
                        // Get actual payment details.
                        var actualPayableAmount = await this.GetElementTextviaHTML(this.txt_CashPayableAmount, "Cash Amount Payable");
                        var initialBalanceRemaining = await this.GetElementText(this.lbl_CashBalanceRemaining, "Cash Balance Remaining");
                        var actualBalanceRemaining = initialBalanceRemaining.replace('$', '').replace(",", "").trim();

                        //** SUBJECT FOR CHANGE */
                        // Get the price difference.
                        var priceDiff: any;
                        if(parseFloat(actualPayableAmount) > parseFloat(expectedPayableAmount)){
                            priceDiff = parseFloat(actualPayableAmount) - parseFloat(expectedPayableAmount);
                        }
                        else{
                            priceDiff = parseFloat(expectedPayableAmount) - parseFloat(actualPayableAmount)
                        }
                        // Verify price difference.
                        if(priceDiff < 0 || priceDiff > 0.01){
                            throw new Error("Expected Payable Amount did NOT matched.\nExpected: " + 
                            expectedPayableAmount + "\nActual: " + actualPayableAmount);
                        }
    
                        // Get expected balance remaining.
                        var expectedBalanceRemaining = (parseFloat(initialAmount) - parseFloat(actualPayableAmount)).toFixed(2);
        
                        // Verify if Expected remaining Balance matched.
                        if(actualBalanceRemaining!=expectedBalanceRemaining){
                            throw new Error("Expected Remaining Balance did NOT matched.\nExpected: " + 
                            expectedBalanceRemaining + "\nActual: " + actualBalanceRemaining);
                        }
        
                        // **SUBJECT FOR CHANGE** Get actual balance due.
                        var actualBalanceDue = "";
                        if(TestingEnvironment.toLowerCase().trim()=="test"){
                            var initialBalanceDue = await this.GetElementText(this.lbl_DevBalanceDue, "Balance Due");
                            actualBalanceDue = initialBalanceDue.replace('$', '').replace(',','').trim();
                        }
                        else{
                            var initialBalanceDue = await this.GetElementText(this.lbl_DevBalanceDue, "Balance Due");
                            actualBalanceDue = initialBalanceDue.replace('$', '').replace(',','').trim();
                        }
        
                        // Verify if Expected balance due matches the total payment made and balance remaining.
                        var expectedTotalBalanceDue = (parseFloat(actualPayableAmount) + parseFloat(actualBalanceRemaining)).toFixed(2);
                        if(actualBalanceDue!=expectedTotalBalanceDue){
                            throw new Error("Expected Balance due did not matched.\nExpected: " + expectedTotalBalanceDue + 
                            "\nActual: " + actualBalanceDue);
                        }
        
                        const date = new Date();
                        const dateToday = new Date().toLocaleDateString('en-GB');

                        // Set payment details.
                        paymentTypeSet.push("Cash");
                        totalPaymentSet.push(actualPayableAmount);
                        surchargeSet.push("0.00");
                        totalBalanceSet.push(actualBalanceRemaining);
                        memberDiscountSet.push("0.00");
                        paymentPercentageSet.push(percentage);
                        paymentDateSet.push(dateToday);
                        transactionTypeSet.push("");
                    }
                    else{
                        // Get actual payment details
                        var actualPayableAmount = await this.GetElementTextviaHTML(this.txt_CashPayableAmount, "Cash Amount Payable");
                        var initialBalanceRemaining = await this.GetElementText(this.lbl_CashBalanceRemaining, "Cash Balance Remaining");
                        var actualBalanceRemaining = initialBalanceRemaining.replace('$', '').replace(",", "").trim();
    
                        // Enter amount.
                        var amount = percentage;
                        await this.EnterValue(this.txt_CashPayableAmount, amount, "Cash Payable Field");

                        const date = new Date();
                        const dateToday = new Date().toLocaleDateString('en-GB');
        
                        // Set payment details.
                        paymentTypeSet.push("Cash");
                        totalPaymentSet.push(amount);
                        surchargeSet.push("0.00");
                        totalBalanceSet.push(actualBalanceRemaining);
                        memberDiscountSet.push("0.00");
                        paymentPercentageSet.push(percentage);
                        paymentDateSet.push(dateToday);
                        transactionTypeSet.push("");
                    }
                    break;
                case "credit card":
                    // Click on Manual Payment checkbox.
                    await this.Click(this.chk_CardManualPay, "Credit Card Manual Payment");
    
                    if(percentage.includes("%")){
                        // Select percentage.
                        percentage = percentage.replace('%', '').trim();
                        await this.SelectPercentage(percentage, this.btn_CardPercent, paymentType);
    
                        // Get the expected payment details.
                        percent = parseInt(percentage) / 100;
                        var initialAmount = (parseFloat(quotedPrice) + parseFloat(upsellAmount)).toFixed(2);
                        var discountedPrice = parseFloat(initialAmount) * percent;
                        var expectedPayableAmount = (Math.round((discountedPrice + Number.EPSILON) * 100) / 100).toFixed(2);
    
                        // Get Credit Card Surcharge.
                        var actualSurcharge = await this.GetElementText(this.lbl_CardSurcharge, "Credit Card Surcharge");
    
                        // Get actual payment details.
                        var actualPayableAmount = await this.GetElementTextviaHTML(this.txt_CardPayableAmount, "Credit Card Amount Payable");
    
                        //** SUBJECT FOR CHANGE */
                        // Get the price difference.
                        var priceDiff: any;
                        if(parseFloat(actualPayableAmount) > parseFloat(expectedPayableAmount)){
                            priceDiff = parseFloat(actualPayableAmount) - parseFloat(expectedPayableAmount);
                        }
                        else{
                            priceDiff = parseFloat(expectedPayableAmount) - parseFloat(actualPayableAmount)
                        }
                        // Verify price difference.
                        if(priceDiff < 0 || priceDiff > 0.01){
                            throw new Error("Expected Payable Amount did NOT matched.\nExpected: " + 
                            expectedPayableAmount + "\nActual: " + actualPayableAmount);
                        }
    
                        // Get expected balance remaining.
                        var expectedBalanceRemaining = (parseFloat(initialAmount) - parseFloat(actualPayableAmount)).toFixed(2);
                        
                        // Get Balance Remaining.
                        var initialBalanceRemaining = await this.GetElementText(this.lbl_CardBalanceRemaining, "Credit Card Balance Remaining");
                        var actualBalanceRemaining = initialBalanceRemaining.replace('$', '').replace(",", "").trim();
    
                        // Get the expected Surcharge.
                        var initialSurcharge = parseFloat(expectedPayableAmount) * CCSurcharge;
                        var initialExpectedSurcharge = (Math.round((initialSurcharge + Number.EPSILON) * 1000) / 1000);
                        var expectedSurcharge = (Math.round((initialExpectedSurcharge + Number.EPSILON) * 100) / 100).toString();
    
                        // Verify if Expected remaining Balance matched.
                        if(actualBalanceRemaining!=expectedBalanceRemaining){
                            throw new Error("Expected Remaining Balance did NOT matched.\nExpected: " + 
                            expectedBalanceRemaining + "\nActual: " + actualBalanceRemaining);
                        }
    
                        // Verify if Expected surcharge matched.
                        if(parseFloat(actualSurcharge)!=parseFloat(expectedSurcharge)){
                            throw new Error("Expected Surcharge did NOT matched.\nExpected: " + 
                            expectedSurcharge + "\nActual: " + actualSurcharge);
                        }
    
                        // **SUBJECT FOR CHANGE** Get actual balance due.
                        var actualBalanceDue = "";
                        if(TestingEnvironment.toLowerCase().trim()=="test"){
                            var initialBalanceDue = await this.GetElementText(this.lbl_DevBalanceDue, "Balance Due");
                            actualBalanceDue = initialBalanceDue.replace('$', '').replace(',','').trim();
                        }
                        else{
                            var initialBalanceDue = await this.GetElementText(this.lbl_DevBalanceDue, "Balance Due");
                            actualBalanceDue = initialBalanceDue.replace('$', '').replace(',','').trim();
                        }
    
                        // Verify if Expected balance due matches the total payment made and balance remaining.
                        var expectedTotalBalanceDue = (parseFloat(actualPayableAmount) + parseFloat(actualBalanceRemaining)).toFixed(2); 
                        //+ parseFloat(actualSurcharge)).toFixed(2);
                        if(actualBalanceDue!=expectedTotalBalanceDue){
                            throw new Error("Expected Balance due did not matched.\nExpected: " + expectedTotalBalanceDue + 
                            "\nActual: " + actualBalanceDue);
                        }

                        const date = new Date();
                        const dateToday = new Date().toLocaleDateString('en-GB');
                        
                        // Set payment details.
                        paymentTypeSet.push("Credit Card");
                        totalPaymentSet.push(actualPayableAmount);
                        surchargeSet.push(actualSurcharge);
                        totalBalanceSet.push(actualBalanceRemaining);
                        memberDiscountSet.push("0.00");
                        paymentPercentageSet.push(percentage);
                        paymentDateSet.push(dateToday);
                        transactionTypeSet.push("");
                    }
                    else{
    
                    }
                    break;
                case "eftpos":
                    // Click on cash radio button.
                    await this.Click(this.rdo_eftpos, "EFTPOS Radio button");
    
                    // Click on Manual Payment checkbox.
                    await this.Click(this.chk_EFTPOSManualPay, "EFTPOS Manual Payment");
    
                    if(percentage.includes("%")){
                        // Select percentage.
                        percentage = percentage.replace('%', '').trim();
                        await this.SelectPercentage(percentage, this.btn_EFTPOSPercent, paymentType);
        
                        // Get the expected payment details.
                        percent = parseInt(percentage) / 100;
                        var initialAmount = (parseFloat(quotedPrice) + parseFloat(upsellAmount)).toFixed(2);
                        var discountedPrice = parseFloat(initialAmount) * percent;
                        var expectedPayableAmount = (Math.round((discountedPrice + Number.EPSILON) * 100) / 100).toFixed(2);
        
                        // Get actual payment details
                        var actualPayableAmount = await this.GetElementTextviaHTML(this.txt_EFTPOSPayableAmount, "EFTPOS Amount Payable");
                        var initialBalanceRemaining = await this.GetElementText(this.lbl_EFTPOSBalanceRemaining, "EFTPOS Balance Remaining");
                        var actualBalanceRemaining = initialBalanceRemaining.replace('$', '').replace(",", "").trim();
    
                        //** SUBJECT FOR CHANGE */
                        // Get the price difference.
                        var priceDiff: any;
                        if(parseFloat(actualPayableAmount) > parseFloat(expectedPayableAmount)){
                            priceDiff = parseFloat(actualPayableAmount) - parseFloat(expectedPayableAmount);
                        }
                        else{
                            priceDiff = parseFloat(expectedPayableAmount) - parseFloat(actualPayableAmount)
                        }
                        // Verify price difference.
                        if(priceDiff < 0 || priceDiff > 0.01){
                            throw new Error("Expected Payable Amount did NOT matched.\nExpected: " + 
                            expectedPayableAmount + "\nActual: " + actualPayableAmount);
                        }
    
                        // Get expected balance remaining.
                        var expectedBalanceRemaining = (parseFloat(initialAmount) - parseFloat(actualPayableAmount)).toFixed(2);
        
                        // Verify if Expected remaining Balance matched.
                        if(actualBalanceRemaining!=expectedBalanceRemaining){
                            throw new Error("Expected Remaining Balance did NOT matched.\nExpected: " + 
                            expectedBalanceRemaining + "\nActual: " + actualBalanceRemaining);
                        }
        
                        // **SUBJECT FOR CHANGE** Get actual balance due.
                        var actualBalanceDue = "";
                        if(TestingEnvironment.toLowerCase().trim()=="test"){
                            var initialBalanceDue = await this.GetElementText(this.lbl_DevBalanceDue, "Balance Due");
                            actualBalanceDue = initialBalanceDue.replace('$', '').replace(',','').trim();
                        }
                        else{
                            var initialBalanceDue = await this.GetElementText(this.lbl_DevBalanceDue, "Balance Due");
                            actualBalanceDue = initialBalanceDue.replace('$', '').replace(',','').trim();
                        }
                        
                        // Verify if Expected balance due matches the total payment made and balance remaining.
                        var expectedBalanceDue = (parseFloat(actualPayableAmount) + parseFloat(actualBalanceRemaining)).toFixed(2);
                        if(actualBalanceDue!=expectedBalanceDue){
                            throw new Error("Expected Balance due did not matched.\nExpected: " + expectedBalanceDue + 
                            "\nActual: " + actualBalanceDue);
                        }

                        const date = new Date();
                        const dateToday = new Date().toLocaleDateString('en-GB');
        
                        // Set payment details.
                        paymentTypeSet.push("EFTPOS");
                        totalPaymentSet.push(actualPayableAmount);
                        surchargeSet.push("0.00");
                        totalBalanceSet.push(actualBalanceRemaining);
                        memberDiscountSet.push("0.00");
                        paymentPercentageSet.push(percentage);
                        paymentDateSet.push(dateToday);
                        transactionTypeSet.push("");
                    }
                    else{
                        // Get actual payment details
                        var actualPayableAmount = await this.GetElementTextviaHTML(this.txt_CashPayableAmount, "Cash Amount Payable");
                        var initialBalanceRemaining = await this.GetElementText(this.lbl_CashBalanceRemaining, "Cash Balance Remaining");
                        var actualBalanceRemaining = initialBalanceRemaining.replace('$', '').replace(",", "").trim();
    
                        // Enter amount.
                        var amount = percentage;
                        await this.EnterValue(this.txt_CashPayableAmount, amount, "Cash Payable Field");
    
                        const date = new Date();
                        const dateToday = new Date().toLocaleDateString('en-GB');

                        // Set payment details.
                        paymentTypeSet.push("Cash");
                        totalPaymentSet.push(amount);
                        surchargeSet.push("0.00");
                        totalBalanceSet.push(actualBalanceRemaining);
                        memberDiscountSet.push("0.00");
                        paymentPercentageSet.push(percentage);
                        paymentDateSet.push(dateToday);
                        transactionTypeSet.push("");
                    }
                    
                    break;
            }
            await this.ScreenShot("Payment Input");
            paymentDetails = [paymentTypeSet, totalPaymentSet, surchargeSet, totalBalanceSet,
                 memberDiscountSet, paymentPercentageSet, paymentDateSet, transactionTypeSet]
            return await this.dataSetup.SetPaymentDetails(paymentDetails);
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

    // This will get all percentages and select one based on input.
    async SelectPercentage(percentage: string, locator: string, paymentType: string){
        // select percentage.
        var value = "";
        var percents = await this.FindElements(locator, paymentType + " Percentage");
        for(var i = 0; i < percents.length; i++){
            var percentName = await this.GetLiveElementText(percents[i], paymentType + " Percentage")
            if(percentName.replace('%','').trim()==percentage){
                await this.ClickElement(percents[i], percentName);
                await this.Sleep(3000);
    
                // Get the new percentage value.
                var newPercents = await this.FindElements(locator, paymentType + " Percentage");
                value = await this.GetElementValueByAttribute(newPercents[i], "class", percentName);
                break;
            }
        }
        if(!value.includes("active")){
            throw new Error(percentage + " percent was NOT selected");
        }
    }

    // This will click the process payment button.
    async ClickProcessPayment(isEnabled: boolean = true){
        // Get element attribute.
        var processPayment = await this.FindElement(this.btn_ProcessPayment, "Process Payment button");
        var attribute = await this.GetElementValueByAttribute(processPayment, "class", "Process Payment button");

        // Verify if Process Payment button is disabled.
        if(isEnabled){
            if(attribute.includes("disabled")){
                throw new Error("Process Payment button is DISABLED");
            }

            // Click Process Payment button.
            await this.ClickElement(processPayment, "Process Payment button");
        }
        else{
            // Verify if Process Payment is disabled.
            if(!attribute.includes("disabled")){
                throw new Error("Process Payment button is DISABLED");
            }
        
            // Capture Member Join Modal.
            await this.ScreenShot("Disabled Process Payment");
        }
    }

    // Make payment in Edit Booking Page
    async MakePaymentInEditBooking(accomDetails: AccommodationDetails, guestDetails: CustomerDetails, 
        paymentType: string, percentage: string = "100%"){
        try{
            var paymentDetails: any;

            // Check if upsell is available.
            var isUpsell = false;
            for(var i = 0; i < accomDetails.BookingCount; i++){
                if(guestDetails.IsUpsell[i]){
                    isUpsell = true;
                }
            }

            await this.VerifyReservationDetails(accomDetails, guestDetails);
            paymentDetails = await this.SetPaymentForReservation(paymentType, percentage, accomDetails, guestDetails);
            if(paymentDetails != ""){
                await this.ClickProcessPayment();
            }else{
                throw new Error("No payment/s made");
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
}