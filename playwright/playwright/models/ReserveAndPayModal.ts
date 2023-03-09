import { errors, Page } from "@playwright/test";
import { AccommodationDetails, CustomerDetails } from "../data/bookings";
import { DataSetup } from "../data/datasetup";
import { TestDirectory } from "../data/directory";
import { MembershipFee, StaffName, TestingEnvironment, 
    MembershipErrorOnGroupReservation, MembershipErrorOnIndividualReservation } from "../data/users";
import { Common } from "./Common";
import { DiscountModal } from "./DiscountModal";
import { PaymentBookingModal } from "./PaymentBookingModal";

export class ReserveAndPayModal extends Common{
    // Set object variables.
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
    //Modal.
    public modal_ReserveAndPay = "#gr-reserve-modal-container";
    public modal_ConfirmBooking = "//div[@class='modal-body modal-pending']//h3[contains(.,'Confirming Booking')]";

    //Button.
    public btn_ReserveNow = "#reserve-now";
    public btn_PayNow = "//*[@id='gr-reserve-modal-container']//*[@id='pay-now']";
    public btn_SkipAndPayLater = "//*[@class='skip-cta secondary-cta']";
    public btn_ManualPayment = "//*[@id='gr-reserve-modal-container']//button[text()='Manual Payment']";
    public btn_CancelMembership = "//*[@id='gr-reserve-modal-container']//*[@id='cancel-membership']";
    public btn_CancelReserve = "//*[@id='gr-reserve-modal-container']//*[@class='gr-cancel-cta']/button";
    public btn_AddDiscount = "//*[@id='gr-reserve-modal-container']//div[contains(@class, 'booking-entry')]/div[1]/div[2]/button";

    //Label.
    public lbl_DateRange = "//*[@id='gr-reserve-modal-container']//*[@class='gr-date-range']";
    public lbl_GuestCount = "//*[@id='gr-reserve-modal-container']//*[@class='gr-guest']";
    public lbl_ContactName = "//*[@id='gr-reserve-modal-container']//span[contains(@id, 'reserve-booking-contact-name')]";
    public lbl_AccommodationName = "//*[@id='gr-reserve-modal-container']//*[@class='payment-booking-details']//div[contains(@class, 'booking-entry')]//label/p[1]";
    public lbl_AssignedRoom = "//*[@id='gr-reserve-modal-container']//span[contains(@id, 'reserve-booking-contact-name')]/following::span[2]";
    public lbl_GuestQuotePrice = "//*[@id='gr-reserve-modal-container']//*[@class='payment-booking-details']/div[contains(@class, 'booking-entry')]/div[1]/div[2]/p";
    public lbl_MemberQuotePrice = "//*[@id='gr-reserve-modal-container']//*[@class='payment-booking-details']//div[contains(@class, 'booking-entry')]/div[1]/div[3]/p";
    public lbl_StrikedGuestPrice = "//*[@id='gr-reserve-modal-container']//*[@class='payment-booking-details']//div[contains(@class, 'booking-entry')]/div[1]/div[2]/sup";
    public lbl_BalanceDue = "//*[@id='gr-reserve-modal-container']//*[@class='balance-due']";
    public lbl_BookingReserved = "//*[@id='gr-reserve-modal-container']//div[contains(@class, 'success-popup gr-status-message-popup')]/span";
    public lbl_GuestErrorReserved = "//*[@id='gr-reserve-modal-container']//div[contains(@class, 'error-popup gr-status-message-popup')]/p";
    public lbl_MemberErrorReserved = "//div[contains(@class, 'error-member-popup gr-status-message-popup')]/p[contains(@class, 'error-explanation')]";
    public lbl_DiscountTag = "//*[@class='booking-discount edit-discount-cta']/span[2]";
    public lbl_MembershipFee = "//*[@id='gr-reserve-modal-container']//div[contains(text(),'Membership fee')]/following-sibling::div/span";

    // Temporary Dev elements
    public lbl_DevBalanceDue = "//*[@id='gr-reserve-modal-container']//*[@class='amount total-booking-price']";

    //Dropdown.
    public drp_ReservationType = "#ReservationTypeId";
    public drp_BookingSource = "#BookingSourceId";

    // Text area/field.
    public txt_BookingNote = "//*[@class='gr-booking-notes']/textarea";

    // Checkbox
    public chk_TermsAndConditions = "#terms-checkbox";

    // Step: This will verify if the Reserve and Pay modal is displayed.
    async VerifyReserveAndPayModal(accomDetails: AccommodationDetails, guestDetails: CustomerDetails){
        try{
            // Do wait based on the number of booking
            if(accomDetails.bookingCount > 1){
                await this.Sleep(30000);
            }
            else{
                await this.Sleep(5000);
            }

            // Wait for the Reserve and Pay Modal to be displayed.
            await this.WaitForElement(this.modal_ReserveAndPay, "Reserve and Pay modal");
            
            // Check if reservation date matched.
            var expectedDate = accomDetails.CheckInDate[0] + " - " + accomDetails.CheckOutDate[accomDetails.BookingCount-1];
            var actualDate = await this.GetElementText(this.lbl_DateRange, "Reserve and Pay Date");
            if(actualDate!=expectedDate){
                throw new Error("Expected Reservation Date in Reserve and Pay Modal did NOT matched.\nExpected: " + expectedDate +
                "\nActual: " + actualDate);
            }

            // Capture the Initial Reserve and Pay Modal.
            await this.ScreenShot("Reserve and Pay Modal");

            // Get the total guest count.
            var totalAdult = 0;
            var totalChild = 0;
            var totalInfant = 0;
            for(var i = 0; i < accomDetails.BookingCount; i++){
                totalAdult = totalAdult + parseInt(accomDetails.Adult[i]);
                totalChild = totalChild + parseInt(accomDetails.Child[i]);
                totalInfant = totalInfant + parseInt(accomDetails.Infant[i]);
            }

            // Check if booking guests matched.
            var adult = totalAdult + " Adult";
            var child = "";
            var infant = "";
            if(totalAdult > 1){
                var adult = totalAdult + " Adults";
            }
            if(totalChild==1){
                child = ", " + totalChild + " Child";
            }
            else if(totalChild > 1){
                var child = ", " + totalChild + " Children";
            }
            if(totalInfant==1){
                infant = ", " + totalInfant + " Infant";
            }
            else if(totalInfant > 1){
                var infant = ", " + totalInfant + " Infants";
            }
            var expectedGuestCount = adult + child + infant;
            var actualGuestCount = await this.GetElementText(this.lbl_GuestCount, "Reserve and Pay Guest Count");
            if(actualGuestCount!=expectedGuestCount){
                throw new Error("Expected Guest Count in Reserve and Pay Modal did NOT matched.\nExpected: " + expectedGuestCount + 
                "\nActual: " + actualGuestCount);
            }

            // Check Reserve and Pay details.
            var accommodationNames = await this.FindElements(this.lbl_AccommodationName, "Reserve and Pay Accommodation Name");
            var actualAssignedRooms = await this.FindElements(this.lbl_AssignedRoom, "Assigned Room");
            var actualContactNames = await this.FindElements(this.lbl_ContactName, "Reserve and Pay Contact Name");
            var initialPrices: any;
            var totalBalanceDue = "0.00";
            var isUpsell: boolean[] = [];
            var multiplier = 0;
            for(var i = 0; i < accomDetails.BookingCount; i++){
                if(guestDetails.IsUpsell[i]){
                    isUpsell.push(true);
                    multiplier++;
                }
                else{
                    isUpsell.push(false);
                }
                
                // **SUBJECT FOR CHANGE** Get the initial price.
                if(guestDetails.isMember[i]){
                    if(TestingEnvironment.toLowerCase().trim()=="test"){
                        initialPrices = await this.FindElements(this.lbl_GuestQuotePrice, 
                            "Reserve and Play Member Quote Price", "All");
                    }
                    else{
                        initialPrices = await this.FindElements(this.lbl_GuestQuotePrice, 
                            "Reserve and Play Member Quote Price", "All");
                    }
                }
                else{
                    initialPrices = await this.FindElements(this.lbl_GuestQuotePrice, 
                        "Reserve and Play Guest Quote Price", "All");
                }
                
                // Check if Accommodation matched.
                var actualAccommodation = await this.GetLiveElementText(accommodationNames[i], "Reserve and Pay Accommodation Name");
                if(actualAccommodation!=accomDetails.AccommodationName[i]){
                    throw new Error("Expected Accommodation Name in Reserve and Pay Modal did NOT matched.\nExpected: " + 
                    accomDetails.AccommodationName[i] + "\nActual: " + actualAccommodation);
                }
    
                // Check if Assigned Room matched.
                var actualAssignedRoom = await this.GetLiveElementText(actualAssignedRooms[i], "Assigned Room");
                if(actualAssignedRoom!=accomDetails.AssignedRoom[i]){
                    throw new Error("Expected Assigned Room in Reserve and Pay Modal did NOT matched.\nExpected: " + 
                    accomDetails.AssignedRoom[i] + "\nActual: " + actualAssignedRoom);
                }
                
                // Check if Guest Contact matched.
                var actualContactName = await this.GetLiveElementText(actualContactNames[i], "Reserve and Pay Contact Name");
                if(actualContactName!=guestDetails.FirstName[i]){
                    throw new Error("Expected guest contact in Reserve and Pay Modal did NOT matched.\nExpected: " + 
                    guestDetails.FirstName[i] + "\nActual: " + actualContactName);
                }
                
                // Check if Quoted Price matched.
                var initialPrice: any;
                initialPrice = await this.GetLiveElementText(initialPrices[i], "Reserve and Pay Quote Price");
                var actualPrice = initialPrice.replace('$','').replace(',','').trim();
                if(actualPrice!=accomDetails.Price[i]){
                    throw new Error("Expected Quote Price in Reserve and Pay Modal did NOT matched.\nExpected: " + accomDetails.Price[i] + 
                    "\nActual: " + actualPrice);
                }
    
                // Get total balance due.
                totalBalanceDue = (parseFloat(totalBalanceDue) + parseFloat(actualPrice)).toFixed(2);
            }
            
            // Get total balance due with Membership fee is upsell was made.
            var membershipFee = 0.00;
            if(multiplier > 0){
                membershipFee = parseFloat(MembershipFee) * multiplier;
                //totalBalanceDue = (parseFloat(totalBalanceDue) + membershipFee).toFixed(2);

                var initialMembershipFee = await this.GetElementText(this.lbl_MembershipFee, "Membership Fee");
                var actualMembershipFee = parseFloat(initialMembershipFee.replace('$','').replace(',','').trim());
                if(actualMembershipFee!=membershipFee){
                    throw new Error("Expected membership fee in Reserve and Pay modal did NOT matched." + 
                    "\nExpected: " + membershipFee + "\nActual: " + actualMembershipFee);
                }
            }
            // Get the expected Total Balance due. Add membership fee is upsell was made.
            var expectedTotalBalanceDue = accomDetails.TotalBalance;

            // **SUBJECT FOR CHANGE**
            // Get the actual balance due. 
            var initialBalance = "";
            if(TestingEnvironment.toLowerCase().trim()=="test"){
                initialBalance = await this.GetElementText(this.lbl_DevBalanceDue, "Reserve and Play Balance Due");
            }
            else{
                initialBalance = await this.GetElementText(this.lbl_DevBalanceDue, "Reserve and Play Balance Due");
            }
            var actualBalance = initialBalance.replace('$','').replace(",","").trim();


            // Verify Total Balance due.
            if(actualBalance!=expectedTotalBalanceDue){
                throw new Error("Expected Balance Due in Reserve and Pay Modal did NOT matched.\nExpected: " + expectedTotalBalanceDue + 
                "\nActual: " + actualBalance);
            }

            // Verify Reserve now button is disabled.
            // Get the Reserve now buton attribute.
            var element = await this.FindElement(this.btn_ReserveNow, "Reserve Now button");
            var value = await this.GetElementValueByAttribute(element, "class", "Reserve Now button");

            // Verify if the confirm booking button is disabled and check the hover message.
            if(!value.includes("disabled")){
                throw new Error("Reserve Now button was NOT disabled.");
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

    // Step:  This will fill up Reserve and Pay fields
    async FillUpReserveAndPayFields(customerDetails: any){
        try{
            // Select Reservation Type.
            await this.SelectReservationType(customerDetails.reserveType);
        
            // Select Booking Source.
            await this.SelectBookingSource(customerDetails.bookingSource);
        
            // Enter Booking Notes.
            await this.EnterBookingNotes(customerDetails.bookingNotes);

            // Check Terms and Conditions.
            await this.CheckTermsAndConditions();

            // Capture the Filled Up Reserve and Pay Modal.
            await this.ScreenShot("Filled Up Reserve and Pay Modal");
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

    // This will select Reservation Type.
    async SelectReservationType(reserveType: string){
        try{
            await this.SelectFromDropdown(this.drp_ReservationType, "Text", reserveType, "Reservation Type");
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

    // This will select Booking Source.
    async SelectBookingSource(bookingSource: string){
        try{
            await this.SelectFromDropdown(this.drp_BookingSource, "Text", bookingSource, "Booking Source");
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

    // This will enter Booking Notes.
    async EnterBookingNotes(bookingNotes: string){
        try{
            await this.EnterValue(this.txt_BookingNote, bookingNotes, "Booking Notes");
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

    // This will click Terms and Conditions checkbox.
    async CheckTermsAndConditions(){
        try{
            await this.Click(this.chk_TermsAndConditions, "Terms and Conditions checkbox");
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

    // Step:  This will click Reserve Now button.
    async ClickReserveNow(){
        try{
            // Click Reserve Now button.
            await this.Click(this.btn_ReserveNow, "Reserve Now button");

            // Wait for Confirming Booking modal to disappear.
            if(await this.ElementExist(this.modal_ConfirmBooking, 5000)){
                await this.WaitForElementToBeHidden(this.modal_ConfirmBooking, 90000);
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

    // Step:  This will verify if Booking is Reserved Succesfully.
    async VerifySuccessfulBookingReservation(){
        try{
            await this.WaitForElement(this.lbl_BookingReserved, 
                "Booking Reservation Confirmation Message", 160000);
            var actualMessage = await this.GetElementText(this.lbl_BookingReserved, "Booking Reservation Confirmation Message");
            if(actualMessage.toUpperCase()!="BOOKING RESERVED"){
                throw new Error("Booking was NOT successfully reserved");
            }

            // Capture Successful Booking Reservation.
            await this.ScreenShot("Successful Booking Reservation");
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

    // Step:  This will verify if Booking is Reserved Succesfully.
    async VerifyReservedBookingDetails(accomDetails: AccommodationDetails, guestDetails: CustomerDetails){
        try{
            // Get all reserved accommodation details.
            var actualAccommodations = await this.FindElements(this.lbl_AccommodationName, "Reserved Booking Accommodation Name");
            var actualAssignedRooms = await this.FindElements(this.lbl_AssignedRoom, "Reserved Booking Assigned Room");
            var actualContactNames = await this.FindElements(this.lbl_ContactName, "Reserved Booking Contact Name");
            var initialPrices: any;
            var totalBalance = "0.00";

            // Check if upsell/velocity is available.
            var isUpsell: boolean[] = [];
            var isVelocity: boolean[] = [];
            var multiplier = 0;
            for(var i = 0; i < accomDetails.BookingCount; i++){
                if(guestDetails.IsUpsell[i]){
                    isUpsell.push(true);
                    multiplier++;
                }
                else{
                    isUpsell.push(false);
                }

                if(guestDetails.IsVelocity[i]){
                    isVelocity.push(true);
                }
                else{
                    isVelocity.push(false);
                }
            }

            // Verify reserved accommodation details.
            for(var i  = 0; i < accomDetails.BookingCount; i++){
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

                // Check if Accommodation matched.
                var actualAccommodation = await this.GetLiveElementText(actualAccommodations[i], "Reserved Booking Accommodation Name");
                if(actualAccommodation!=accomDetails.AccommodationName[i]){
                    throw new Error("Expected Accommodation Name after Reservation did NOT matched.\nExpected: " + 
                    accomDetails.AccommodationName + "\nActual: " + actualAccommodation);
                }
    
                // Check if Assigned Room matched.
                var actualAssignedRoom = await this.GetLiveElementText(actualAssignedRooms[i], "Reserved Booking Assigned Room");
                if(actualAssignedRoom!=accomDetails.AssignedRoom[i]){
                    throw new Error("Expected Assigned Room after Reservation did NOT matched.\nExpected: " + 
                    accomDetails.AssignedRoom[i] + "\nActual: " + actualAssignedRoom);
                }
                
                // Check if Guest Contact matched.
                var actualContactName = await this.GetLiveElementText(actualContactNames[i], "Reserved Booking Contact Name");
                if(actualContactName!=guestDetails.FirstName[i]){
                    throw new Error("Expected guest contact after Reservation did NOT matched.\nExpected: " + 
                    guestDetails.FirstName[i] + "\nActual: " + actualContactName);
                }
                
                // Check if Quoted Price matched.
                var initialPrice: any;
                initialPrice = await this.GetLiveElementText(initialPrices[i], "Reserved Booking Quote Price");
                var actualPrice = initialPrice.replace('$','').replace(',','').trim();
                if(actualPrice!=accomDetails.Price[i]){
                    throw new Error("Expected Quote Price after Reservation did NOT matched.\nExpected: " + accomDetails.Price[i] + 
                    "\nActual: " + actualPrice);
                }

                // Get the expected total balance.
                totalBalance = (parseFloat(totalBalance) + parseFloat(actualPrice)).toFixed(2);
            }
            
            // Get the total balance.
            if(multiplier > 0){
                var membershipFee = parseFloat(MembershipFee) * multiplier;
                totalBalance = (parseFloat(totalBalance) + membershipFee).toFixed(2);
            }

            // **SUBJECT FOR CHANGE**
            // Get the actual balance due and verify against expected balance due. Add membership fee is upsell was made.
            var initialBalance = "";
            if(TestingEnvironment.toLowerCase().trim()=="test"){
                initialBalance = await this.GetElementText(this.lbl_DevBalanceDue, "Reserved Booking Balance Due");
            }
            else{
                initialBalance = await this.GetElementText(this.lbl_DevBalanceDue, "Reserved Booking Balance Due");
            }
            var actualBalance = initialBalance.replace('$','').replace(',','').trim();
            if(actualBalance!=totalBalance){
                throw new Error("Expected Balance Due after Reservation did NOT matched the total of quoted price.\nExpected: " + totalBalance + 
                "\nActual: " + actualBalance);
            }

            // Verify expected balance due matched the actual balance due.
            if(actualBalance!=accomDetails.TotalBalance){
                throw new Error("Expected Balance Due after Reservation did NOT matched.\nExpected: " + actualBalance + 
                "\nActual: " + accomDetails.Price);
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

    // Step:  This will process payment based on payment type.
    async ManagePayment(accomDetails: AccommodationDetails, guestDetails: CustomerDetails, 
        paymentType: string, percentage: string = "100%"){
        try{
            // Set payment modal object.
            var payment = new PaymentBookingModal(this.page, this.dir);
            var paymentDetails: any;
            
            // Check if upsell is available.
            var isUpsell = false;
            for(var i = 0; i < accomDetails.BookingCount; i++){
                if(guestDetails.IsUpsell[i]){
                    isUpsell = true;
                }
            }
            
            // This wil click the pay now button for non-skip scenario.
            if(paymentType.toLowerCase().trim()!="skip"){
                await this.Click(this.btn_PayNow, "Pay Now button");

                // This will check if the payment modal is displayed.
                await payment.VerifyPaymentModal();
            }

            // Process payment based on assigned scenario.
            switch(paymentType.toLowerCase().trim()){
                case "skip":
                    if(isUpsell){
                        // Click Skip and pay later button.
                        if(await this.ElementExist(this.btn_SkipAndPayLater, 5000)){
                            throw new Error("Skip And Pay Later button was DISPLAYED");
                        }
                        else{
                            console.log("Skip and Pay Later is not available for Guest with Upsell.");
                        }

                        // Capture no Skip and Pay Later button was NOT displayed.
                        await this.ScreenShot("No Skip and Pay Later button in Upsell");
                    }
                    else{
                        paymentDetails = await this.ClickSkipAndPayLater();
                    }
                    break;
                default:
                    // Set payment details.
                    paymentDetails = await payment.SetPaymentForReservation(paymentType, percentage, accomDetails, guestDetails);

                    // Click Process Payment button based on the percentage input.
                    if(isUpsell){
                        // Verify if amount input is less than or greater than $50 for guest with upsell.
                        if(percentage.includes('%') || percentage.toLowerCase().trim()=="random"){
                            await payment.ClickProcessPayment();
                        }
                        else if(parseFloat(percentage) >= parseFloat(MembershipFee)){
                            await payment.ClickProcessPayment();
                        }
                        else if(parseFloat(percentage) < parseFloat(MembershipFee)){
                            // Process Payment button should be disabled if the payment is less than $50.
                            await payment.ClickProcessPayment(false);
                        }
                        else{
                            await payment.ClickProcessPayment();
                        }
                    }
                    else{
                        // Process Payment.
                        await payment.ClickProcessPayment();
                    }
            }
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

    // This will click Skip and pay later button.
    async ClickSkipAndPayLater(){
        try{
            // **SUBJECT FOR CHANGE**
            var initialBalance = "";
            if(TestingEnvironment.toLowerCase().trim()=="test"){
                initialBalance = await this.GetElementText(this.lbl_DevBalanceDue, "Reserved Booking Balance Due");
            }
            else{
                initialBalance = await this.GetElementText(this.lbl_DevBalanceDue, "Reserved Booking Balance Due");
            }
            var balanceDue = initialBalance.replace('$','').replace(',','').trim();
    
            // Click Skip and pay later button.
            await this.Click(this.btn_SkipAndPayLater, "Skip and pay later button");
    
            // Wait for Confirming Booking modal to disappear.
            if(await this.ElementExist(this.modal_ConfirmBooking, 5000)){
                await this.WaitForElementToBeHidden(this.modal_ConfirmBooking, 20000);
            }
    
            // Set payment details
            var paymentDetails = ["Skip", "0.00", "0.00", balanceDue, "0.00", ""];
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

    // Step: This will verify if Booking Reserved Error.
    async VerifyBookingReservationError(guest: CustomerDetails){
        try{
            // **SUBJECT FOR CHANGE**.
            // Verify Confirmation Error.
            var actualMessage = "";
            if(guest.IsMember[0]==true){
                await this.WaitForElement(this.lbl_MemberErrorReserved, "Member Reservation Confirmation Error");
                var initialActualMessage = await this.GetElementText(this.lbl_MemberErrorReserved, 
                    "Member Reservation Confirmation Error");
                actualMessage = initialActualMessage.replace(/[\u2018\u2019]/g, "'");

                if(guest.BookingCount > 1){
                    if(!actualMessage.includes(MembershipErrorOnGroupReservation)){
                        throw new Error("Expected reservervation error was not included in actual error.\nExpected: " + 
                        MembershipErrorOnGroupReservation + 
                        "\nActual: " + actualMessage);
                    }
                }
                else{
                    if(!actualMessage.includes(MembershipErrorOnIndividualReservation)){
                        throw new Error("Expected reservervation error was not included in actual error.\nExpected: " + 
                        MembershipErrorOnGroupReservation + 
                        "\nActual: " + actualMessage);
                    }
                }
            }
            else{
                await this.WaitForElement(this.lbl_GuestErrorReserved, "Guest Reservation Confirmation Error");
                var initialActualMessage = await this.GetElementText(this.lbl_GuestErrorReserved, 
                    "Guest Reservation Confirmation Error");
                    actualMessage = initialActualMessage.replace(/[\u2018\u2019]/g, "'");
            }

            // **SUBJECT FOR CHANGE**
            if(!await this.ElementExist(this.btn_ManualPayment, 500)){
                throw new Error("Manual Payment button was displayed.");
            }
            if(!await this.ElementExist(this.btn_CancelMembership, 500)){
                throw new Error("Cancel Membership button was displayed.");
            }

            // Capture Successful Booking Reservation.
            await this.ScreenShot("Booking Reservation Error");
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

    // This will select and apply discounts.
    async AddDiscountAndVerifyPaymentDetails(accomDetails: AccommodationDetails, guestDetails: CustomerDetails, 
        discountType: string="", discountRange:string=""){
        try{
            // Set object for add discount.
            const discount = new DiscountModal(this.page, this.dir);
            
            // Set variables to assign updated details for accommodation.
            var accommodationName:any[] = [], checkInDate:any[] = [], checkOutDate:any[] = [];
            var adult:any[] = [], child:any[] = [], infant:any[] = [], price:any[] = [];
            var assignedRoom:any[] = [], night:any[] = [], tier:any[] = []; 
            var bookingDetails: any;

            // Set variables to assign discount details.
            var setDiscountPrice: any[] = [];
            
            // Get available add discount button based on the number of booked accommodation.
            var button = await this.FindElements(this.btn_AddDiscount, "Add Discount button");

            // Set variables for discount and membership fee.
            var totalDiscountedPrice = "0.00";
            var multiplier = 0;
            for(var i=0; i<accomDetails.BookingCount; i++){
                // get the total multiplier for membership fee.
                if(guestDetails.IsUpsell[i]){
                    multiplier++;
                }

                // Click add discount button.
                await this.ClickElement(button[i], "Add Discount button");
    
                // Select and apply discount.
                await discount.SelectAndApplyDiscount(discountType);
    
                // Fill up details and confirm discounts.
                await discount.FillUpAndConfirmDiscountDetails(StaffName);
    
                // Verify applied discount.
                var discountPrices = await this.FindElements(this.lbl_DiscountTag, "Discounts");
                var initialDiscount = await this.GetLiveElementText(discountPrices[i], "Discount Price");
                var actualDiscountPrice = initialDiscount.split('(')[1].replace('-$','').replace(')','').trim();

                // Get the original guest quoted price.
                var elementGuestPrice = await this.FindElements(this.lbl_StrikedGuestPrice, "Original Guest Quoted Price");
                var initialGuestPrice = await this.GetLiveElementText(elementGuestPrice[i], "Original Guest Quoted Price");
                var originalGuestPrice = initialGuestPrice.replace('$','').replace(',','').trim();

                // Get the discounted guest quoted price.
                var elementDiscountedPrice = await this.FindElements(this.lbl_GuestQuotePrice, "Discounted Guest Quoted Price");
                var initialDiscountedPrice = await this.GetLiveElementText(elementDiscountedPrice[i], "Discounted Guest Quoted Price");
                var discountedPrice = initialDiscountedPrice.replace('$','').replace(',','').trim();

                // Verify the expected discount price.
                var expectedDiscount = (parseFloat(originalGuestPrice) - parseFloat(discountedPrice)).toFixed(2);
                if(expectedDiscount!=actualDiscountPrice){
                    throw new Error("Expected discounted guest price did NOT matched.\nExpected: " + expectedDiscount +
                    "\Actual: " + actualDiscountPrice);
                }

                // Get total discount.
                totalDiscountedPrice = (parseFloat(totalDiscountedPrice) + parseFloat(discountedPrice)).toFixed(2);

                // Set discount data.
                setDiscountPrice.push(actualDiscountPrice);

                // Set accommodation data.
                accommodationName.push(accomDetails.AccommodationName[i]);
                checkInDate.push(accomDetails.CheckInDate[i]);
                checkOutDate.push(accomDetails.CheckOutDate[i]);
                adult.push(accomDetails.Adult[i]);
                child.push(accomDetails.Child[i]);
                infant.push(accomDetails.Infant[i]);
                price.push(discountedPrice);
                night.push(accomDetails.Night[i]);
                assignedRoom.push(accomDetails.AssignedRoom[i]);
                tier.push(accomDetails.RewardsTier[i]);

                // Capture Discount Details.
                await this.ScreenShot("Discount Details");
            }

            // This will verify if the total membership fee matched the expected computed membership fee.
            var membershipFee = "0.00";
            if(multiplier > 0){
                membershipFee = (parseFloat(MembershipFee) * multiplier).toFixed(2);

                var initialMembershipFee = await this.GetElementText(this.lbl_MembershipFee, "Membership Fee");
                var actualMembershipFee = (parseFloat(initialMembershipFee.replace('$','').replace(',','').trim())).toFixed(2);
                if(actualMembershipFee!=membershipFee){
                    throw new Error("Expected membership fee in Reserve and Pay modal did NOT matched." + 
                    "\nExpected: " + membershipFee + "\nActual: " + actualMembershipFee);
                }
            }
            else{
                var isMembershipFeeExist = await this.ElementExist(this.lbl_MembershipFee, 3000);
                if(isMembershipFeeExist){
                    throw new Error("Membership fee is displayed.");
                }
            }

            // Get expected Balance due.
            var expectedBalanceDue = (parseFloat(totalDiscountedPrice) + parseFloat(membershipFee)).toFixed(2);
        
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

            if(actualBalanceDue!=expectedBalanceDue){
                throw new Error("Expected Balance Due did NOT matched.\nExpected: " + expectedBalanceDue +
                "\nActual: " + actualBalanceDue);
            }

            // Set new accommodation details.
            var newAccommodationDetails = [accomDetails.BookingCount, accommodationName, checkInDate, checkOutDate,
                adult, child, infant, price, night, assignedRoom, totalDiscountedPrice, tier];
            bookingDetails =  await this.dataSetup.SetBookingsDataAfterOffersWereMade(newAccommodationDetails);

            // Set discount details.
            var setDiscountDetails = [setDiscountPrice]
            var discountDetails = await this.dataSetup.SetDiscountDetails(setDiscountDetails);

            // Return all details.
            return [bookingDetails, discountDetails];
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

    // This will remove the added discount.
    async RemoveDiscountandVerifyPaymentDetails(accomDetails: AccommodationDetails, guestDetails: CustomerDetails){
        try{
            // Set object for add discount.
            const discount = new DiscountModal(this.page, this.dir);

            // Set variables for discount and membership fee.
            var multiplier = 0;

            // This will remove each discount tag based on number of accommodations.
            var totalQuotedPrice = "0.00";
            for(var i=0; i<accomDetails.bookingCount; i++){
                
                // Get all discount tags.
                var discountTags = await this.FindElements(this.lbl_DiscountTag, "Discount Tag");

                // Click selected discount tag.
                await this.ClickElement(discountTags[0], "Discount Tag");

                // Clear discount.
                await discount.ClearAndUpdateDiscount();

                // Wait for the discount tag to disappear.
                await this.WaitForLiveElementToBeHidden(discountTags[0], "Discount Tag");

                // Get updated price.
                var price = await this.FindElements(this.lbl_GuestQuotePrice, "Guest Quoted Price");
                var intialQuotedPrice = await this.GetLiveElementText(price[i], "Guest Quoted Price");
                var actualQuotedPrice = intialQuotedPrice.replace('$','').trim();

                // Verify if the actual quoted price matched the expected quoted price.
                if(accomDetails.Price[i]!=actualQuotedPrice){
                    throw new Error("Expected quoted price did NOT matched.\nExpected: " + accomDetails.Price[i] +
                    "actual: " + actualQuotedPrice);
                }

                // Get total quoted price.
                totalQuotedPrice = (parseFloat(totalQuotedPrice) + parseFloat(actualQuotedPrice)).toFixed(2);

                // Capture Apply Discount modal.
                await this.ScreenShot("Removed Discount Tag");
            }

            // This will verify if the total membership fee matched the expected computed membership fee.
            var membershipFee = "0.00";
            if(multiplier > 0){
                membershipFee = (parseFloat(MembershipFee) * multiplier).toFixed(2);

                var initialMembershipFee = await this.GetElementText(this.lbl_MembershipFee, "Membership Fee");
                var actualMembershipFee = (parseFloat(initialMembershipFee.replace('$','').replace(',','').trim())).toFixed(2);
                if(actualMembershipFee!=membershipFee){
                    throw new Error("Expected membership fee in Reserve and Pay modal did NOT matched." + 
                    "\nExpected: " + membershipFee + "\nActual: " + actualMembershipFee);
                }
            }
            else{
                var isMembershipFeeExist = await this.ElementExist(this.lbl_MembershipFee, 3000);
                if(isMembershipFeeExist){
                    throw new Error("Membership fee is displayed.");
                }
            }

            // Get expected Balance due.
            var expectedBalanceDue = (parseFloat(totalQuotedPrice) + parseFloat(membershipFee)).toFixed(2);
        
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

            if(actualBalanceDue!=expectedBalanceDue){
                throw new Error("Expected Balance Due did NOT matched.\nExpected: " + expectedBalanceDue +
                "\nActual: " + actualBalanceDue);
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

    // This will remove the added discount.
    async UpdateDiscountAndVerifyPaymentDetails(accomDetails: AccommodationDetails, guestDetails: CustomerDetails, 
        discountType: string="", discountRange: string=""){
        try{
            // Set object for add discount.
            const discount = new DiscountModal(this.page, this.dir);

            // Set variables for discount and membership fee.
            var multiplier = 0;
                
            // This will update each discount tag based on number of accommodations.
            var totalDiscountedPrice = "0.00";
            for(var i=0; i<accomDetails.BookingCount; i++){
                // get the total multiplier for membership fee.
                if(guestDetails.IsUpsell[i]){
                    multiplier++;
                }

                // Get all discount tags.
                var discountTags = await this.FindElements(this.lbl_DiscountTag, "Discount Tag");

                // Click selected discount tag.
                await this.ClickElement(discountTags[0], "Discount Tag");

                // Change and update discount.
                await discount.ChangeAndUpdateDiscount(discountType);

                // Fill up details and confirm discounts.
                await discount.FillUpAndConfirmDiscountDetails(StaffName);

                // Verify applied discount.
                var discountPrices = await this.FindElements(this.lbl_DiscountTag, "Discounts");
                var initialDiscount = await this.GetLiveElementText(discountPrices[i], "Discount Price");
                var actualDiscountPrice = initialDiscount.split('(')[1].replace('-$','').replace(')','').trim();

                // Get the original guest quoted price.
                var elementGuestPrice = await this.FindElements(this.lbl_StrikedGuestPrice, "Original Guest Quoted Price");
                var initialGuestPrice = await this.GetLiveElementText(elementGuestPrice[i], "Original Guest Quoted Price");
                var originalGuestPrice = initialGuestPrice.replace('$','');

                // Get the discounted guest quoted price.
                var elementDiscountedPrice = await this.FindElements(this.lbl_GuestQuotePrice, "Discounted Guest Quoted Price");
                var initialDiscountedPrice = await this.GetLiveElementText(elementDiscountedPrice[i], "Discounted Guest Quoted Price");
                var discountedPrice = initialDiscountedPrice.replace('$','');

                // Verify the expected discount price.
                var expectedDiscount = (parseFloat(originalGuestPrice) - parseFloat(discountedPrice)).toFixed(2);
                if(expectedDiscount!=actualDiscountPrice){
                    throw new Error("Expected discounted guest price did NOT matched.\nExpected: " + expectedDiscount +
                    "\Actual: " + actualDiscountPrice);
                }

                // Get total discount.
                totalDiscountedPrice = (parseFloat(totalDiscountedPrice) + parseFloat(discountedPrice)).toFixed(2);

                // Capture Discount Details.
                await this.ScreenShot("Updated Discount Details");
            }

            // This will verify if the total membership fee matched the expected computed membership fee.
            var membershipFee = "0.00";
            if(multiplier > 0){
                membershipFee = (parseFloat(MembershipFee) * multiplier).toFixed(2);

                var initialMembershipFee = await this.GetElementText(this.lbl_MembershipFee, "Membership Fee");
                var actualMembershipFee = (parseFloat(initialMembershipFee.replace('$','').replace(',','').trim())).toFixed(2);
                if(actualMembershipFee!=membershipFee){
                    throw new Error("Expected membership fee in Reserve and Pay modal did NOT matched." + 
                    "\nExpected: " + membershipFee + "\nActual: " + actualMembershipFee);
                }
            }
            else{
                var isMembershipFeeExist = await this.ElementExist(this.lbl_MembershipFee, 3000);
                if(isMembershipFeeExist){
                    throw new Error("Membership fee is displayed.");
                }
            }

            // Get expected Balance due.
            var expectedBalanceDue = (parseFloat(totalDiscountedPrice) + parseFloat(membershipFee)).toFixed(2);
        
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

            if(actualBalanceDue!=expectedBalanceDue){
                throw new Error("Expected Balance Due did NOT matched.\nExpected: " + expectedBalanceDue +
                "\nActual: " + actualBalanceDue);
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

    // This will cancel reservation
    async CancelReservation(){
        try{
            await this.Click(this.btn_CancelReserve, "Cancel Reservation button");
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