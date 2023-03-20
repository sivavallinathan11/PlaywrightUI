import { errors, Page } from "@playwright/test";
import { AccommodationDetails, CustomerDetails } from "../data/bookings";
import { DataSetup } from "../data/datasetup";
import { TestDirectory } from "../data/directory";
import { CCSurcharge, MembershipFee, TestingEnvironment, URL } from "../data/users";
import { Common } from "./Common";

export class PaymentBookingModal extends Common{
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
    public lbl_CashBalanceRemaining = "#cash-balance-remaining";
    public lbl_CardBalanceRemaining = "#card-balance-remaining"
    public lbl_EFTPOSBalanceRemaining = "#eftpos-balance-remaining";
    public lbl_CardSurcharge = "//*[@id='gr-reserve-modal-container']//*[@id='card-surcharge']";
    public lbl_AccommodationName = "//form[@id='payment-modal-form']//div[@class='payment-booking-details']//label//p[1]";
    //"//*[@id='gr-reserve-modal-container']//div[contains(@class, 'booking-entry')]//label/p[1]";
    public lbl_ContactName = "//form[@id='payment-modal-form']//div[@class='payment-booking-details']//label//p[2]/span[2]";
    //"//*[@id='gr-reserve-modal-container']//span[contains(@id, 'reserve-booking-contact-name')]";
    public lbl_GuestQuotePrice = "//form[@id='payment-modal-form']//div[@class='payment-booking-details']//div/div[2]//p";
    //"//*[@id='gr-reserve-modal-container']//*[@class='payment-booking-details']/div[contains(@class, 'booking-entry')]/div[1]/div[2]/p";
    public lbl_MemberQuotePrice = "//*[@id='gr-reserve-modal-container']//*[@class='payment-booking-details']//div[contains(@class, 'booking-entry')]/div[1]/div[3]/p";
    public lbl_PaymentSurcharge = "//span[@id='card-surcharge']"
    //"//*[@id='gr-reserve-modal-container']//*[@id='reserve-surcharge-amount']";
    public lbl_BalanceDue = "#card-balance-remaining"
    //"//*[@id='gr-reserve-modal-container']//*[@class='balance-due']";

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
                var randomIndex = Math.floor(Math.random() * paymentSet.length);
                paymentType = paymentSet[randomIndex];
            }
            console.log("Selected payment method: " + paymentType);
    
            // Set random percentage.
            var electedPercentage = percentage;
            if(electedPercentage.toLowerCase().trim()=="random"){
                var percentSet = ['25%', '50%', '75%'];
                var randomIndex = Math.floor(Math.random() * percentSet.length);
                electedPercentage = percentSet[randomIndex];
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
        var accommodationNames = await this.FindElements(this.lbl_AccommodationName, "Accommodation Name");
        var contactNames = await this.FindElements(this.lbl_ContactName, "Contact Name");
        var initialPrices: any;

        // Verify reservation details.
        for(var i =0; i < accomDetails.BookingCount; i++){

            // **SUBJECT FOR CHANGE** Get the quoted price.
            if(guestDetails.IsMember[i]){
                if(TestingEnvironment.toLowerCase().trim()=="test"){
                    initialPrices = await this.FindElements(this.lbl_GuestQuotePrice, 
                        "Reserved Booking Member Quote Price", "All");
                }
                else{
                    initialPrices = await this.FindElements(this.lbl_GuestQuotePrice, 
                        "Reserved Booking Member Quote Price", "All");
                }
            }
            else{
                initialPrices = await this.FindElements(this.lbl_GuestQuotePrice, 
                    "Reserved Booking Guest Quote Price", "All");
            }
    
            // Check if accommodation name matched.
            var initialAccommodationName = await this.GetLiveElementText(accommodationNames[i], "Accommodation Name");
            var accommodationName = initialAccommodationName.split("-")[1];
            if(accommodationName.includes("TEST 2")){
                accommodationName = accommodationName.split("TEST")[0];
            }
            if(!accomDetails.AccommodationName[i].includes(accommodationName)){
                throw new Error("Expected accommodation name did NOT matched in Payment Modal");
            }
    
            // Check if contact name matched.
            var contactName = await this.GetLiveElementText(contactNames[i], "Contact Name");
            if(contactName!=guestDetails.FirstName[i]){
                throw new Error("Expected contact name did NOT matched in Payment Modal");
            }

            // Check if Quoted Price matched.
            var initialPrice: any;
            initialPrice = await this.GetLiveElementText(initialPrices[i], "Reserved Booking Quote Price");
            var actualPrice = initialPrice.replace('$','').replace(',','').trim();
            if(actualPrice!=accomDetails.Price[i]){
                throw new Error("Expected Quote Price after Reservation did NOT matched.\nExpected: " + accomDetails.Price[i] + 
                "\nActual: " + actualPrice);
            }
        }
    }

    // This will select payment method based on inputs.
    async SelectPaymentMethod(accomDetails: AccommodationDetails, guestDetails: CustomerDetails, 
        paymentType: string, percentage: string = "100%"){
        try{
            // Set variable.
            var paymentDetails: any = [];
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
        
                        // Set payment details.
                        paymentDetails = ["Cash", actualPayableAmount, "0.00", actualBalanceRemaining, "0.00", percentage];
                    }
                    else{
                        // Get actual payment details
                        var actualPayableAmount = await this.GetElementTextviaHTML(this.txt_CashPayableAmount, "Cash Amount Payable");
                        var initialBalanceRemaining = await this.GetElementText(this.lbl_CashBalanceRemaining, "Cash Balance Remaining");
                        var actualBalanceRemaining = initialBalanceRemaining.replace('$', '').replace(",", "").trim();
    
                        // Enter amount.
                        var amount = percentage;
                        await this.EnterValue(this.txt_CashPayableAmount, amount, "Cash Payable Field");
        
                        // Set payment details.
                        paymentDetails = ["Cash", amount, "0.00", actualBalanceRemaining, "0.00", percentage];
    
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
                        
                        // Set payment details.
                        paymentDetails = ["Credit Card", actualPayableAmount, actualSurcharge, actualBalanceRemaining, "0.00", percentage];
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
        
                        // Set payment details.
                        paymentDetails = ["EFTPOS", actualPayableAmount, "0.00", actualBalanceRemaining, "0.00", percentage];
                    }
                    else{
                        // Get actual payment details
                        var actualPayableAmount = await this.GetElementTextviaHTML(this.txt_CashPayableAmount, "Cash Amount Payable");
                        var initialBalanceRemaining = await this.GetElementText(this.lbl_CashBalanceRemaining, "Cash Balance Remaining");
                        var actualBalanceRemaining = initialBalanceRemaining.replace('$', '').replace(",", "").trim();
    
                        // Enter amount.
                        var amount = percentage;
                        await this.EnterValue(this.txt_CashPayableAmount, amount, "Cash Payable Field");
        
                        // Set payment details.
                        paymentDetails = ["Cash", amount, "0.00", actualBalanceRemaining, "0.00", percentage];
    
                    }
                    
                    break;
            }
            await this.ScreenShot("Payment Input");
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
}