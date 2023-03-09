import { errors, Page } from "@playwright/test";
import { AccommodationDetails, CustomerDetails, OfferDetails } from "../data/bookings";
import { DataSetup } from "../data/datasetup";
import { TestDirectory } from "../data/directory";
import { HigherOfferMessage, HigherOfferTitle, MembershipDiscount, MembershipFee, NewMemberTier, RewardNonDiscountMessage, RewardsBenefits, RewardsDiscountMessage, StaffName } from "../data/users";
import { Common } from "./Common";

export class EditBookingModal extends Common{
    // Set page object variable.
    readonly page: Page;
    public dataSetup = new DataSetup();

    // Set a sub routine that will access the functions from parent and sibling class.
    constructor(page: Page, dir: TestDirectory){
        super(page, dir);
        this.page = page;
    }

    // Set XPaths, Element IDs and other attributes.
    // Modal.
    public modal_EditBooking = "#update-booking-form";
    public modal_AddCustomerModal = "//*[@id='guest-form']";
    public modal_MemberJoin = "//*[@id='membership-join-modal']//div[@class='modal-content']";
    public modal_DeleteBooking = "//*[@id='delete-booking-modal' and contains(@style, 'display: block;')]//*[@class='modal-body']";
    public modal_ExistingRecord = "//div[@id='existing-record-modal']/div/div[@class='modal-content']";
    public modal_PromoRates = "//*[@id='toast-offer-check-modal']//div[@class='modal-content']";
    
    // Banner. 
    public banner_BookingUpdated = "//*[@id='status-success-modal']//span[@class='icon']/following-sibling::span[@id='error-message']";
    public banner_BookingDeleted = "//*[@id='status-success-modal']//span[@class='icon']/following-sibling::span[@id='error-message' and text()='Booking removed successfully']";

    // Section/Header.
    public section_BookingDetails = "//div[@id='edit-booking-container']//div[contains(@class, 'booking-detail')]";
    public section_CustomerCard = "#gr-contact-card";
    public section_RewardsCard = "//div[@id='edit-booking-container']//*[@class='row edit-gday-card']";
    public section_SuccessfulJoin = "//*[@class='row success-gday-card']/*[@class='success-state']";

    // Label.
    public lbl_ReservationDate = "//div[@id='edit-booking-container']//p[@class='title' and text()='Booking Duration']/following-sibling::p/span[2]";
    public lbl_GuestCount = "//div[@id='edit-booking-container']//p[@class='title' and text()='Booking Guests']/following-sibling::p/span[2]";
    public lbl_AccommodationName = "//a[@id='select-accommodation-dropdown']//p[@class='cabin-type']";
    public lbl_GuestPrice = "//a[@id='select-accommodation-dropdown']//p[@class='available-accommodation-price']";
    public lbl_MemberPrice = "//a[@id='select-accommodation-dropdown']//p[@class='available-accommodation-member-price']";
    public lbl_AssignedRoom = "//*[@id='room-select-result']/input";
    public lbl_CustomerName = "//*[@id='gr-contact-card']//*[@class='gr-guest-name']/h3";
    public lbl_CustomerEmail = "//*[@id='gr-contact-card']//*[@class='gr-guest-email']";
    public lbl_CustomerContactNumber = "//*[@id='gr-contact-card']//*[@class='gr-guest-phone']";
    public lbl_RewardsTitle = "//*[@id='gr-contact-card']//*[@class='gr-rewards-title']";
    public lbl_RewardsTier = "//*[@id='gr-contact-card']//*[@class='gr-rewards-tier']";
    public lbl_RewardsMembershipFee = "//*[@class='row edit-gday-card']//h3/span";
    public lbl_RewardsMessage = "//*[@class='row edit-gday-card']//h3";
    public lbl_MembershipBenefits = "//*[@class='row edit-gday-card']//ul/li";
    public lbl_PromoWarningMessageTitle = "//*[@id='toast-offer-check-modal']//div[@class='modal-content']//span[2]";
    public lbl_PromoWarningMessageDetails = "//*[@id='toast-offer-check-modal']//div[@class='modal-content']//span[@id='offer-alert']";

    // Button.
    public btn_DeleteBooking = "#delete-booking";
    public btn_SaveAddCustomer = "//*[@id='guest-form']//*[@id='save' and not(boolean(@disabled))]";
    public btn_CancelAddCustomer = "//*[@id='guest-form']//*[@id='cancel' and not(boolean(@disabled))]";
    public btn_EditGuest = "//*[@id='gr-contact-card']//*[@id='edit-guest']";
    public btn_UpdateBooking = "#update-booking";
    public btn_CancelEditBooking = "#cancel-cta";
    public btn_Join = "#membership-join-cta";
    public btn_JoinConfirm = "//*[@id='membership-join-modal']//button[@id='confirm-membership-cta']";
    public btn_JoinCancel = "//*[@id='membership-join-modal']//button[@class='confirm-membership-cancel-cta']";
    public btn_ConfirmDelete = "//*[@id='delete-booking-modal' and contains(@style, 'display: block;')]//*[@id='confirm-delete']";
    public btn_CancelDelete = "//*[@id='delete-booking-modal' and contains(@style, 'display: block;')]//*[@id='cancel-delete']";
    public btn_YesToLoadExistingRecord = "//div[@id='existing-record-modal']//*[@id='yes-cta']";
    public btn_NotLoadExitingRecord = "//div[@id='existing-record-modal']//*[@id='no-cta']";

    // Dropdown field.
    public drp_Accommodation = "//a[@id='select-accommodation-dropdown']";
    public drp_State = "//*[@id='guest-form']//*[@id='gr-state-au']";
    public drp_Country = "//*[@id='guest-form']//*[@id='gr-country']";
    public drp_RoomType = "#room-dropdown";
    public drp_SelectedState = "//*[@id='gr-state-au']/option[@selected='selected']";

    // Text field.
    public txt_SearchContact = "#gr-searchtext";
    public txt_FirstName = "//*[@id='guest-form']//*[@id='gr-firstname']";
    public txt_LastName = "//*[@id='guest-form']//*[@id='gr-surname']";
    public txt_Email = "//*[@id='guest-form']//*[@id='gr-email']";
    public txt_Mobile = "//*[@id='guest-form']//*[@id='gr-mobile']";
    public txt_Street = "//*[@id='guest-form']//*[@id='gr-street']"
    public txt_Town = "//*[@id='guest-form']//*[@id='gr-town']";
    public txt_Postcode = "//*[@id='guest-form']//*[@id='gr-postcode']";
    public txt_StaffName = "//*[@id='membership-join-modal']//input[@id='staff-name']";
    public txt_RewardsVelocity = "#velocity-rewards";

    // Link.
    public link_CreateNewCustomer = "//div[@id='search-text-wrapper-edit']//button[@class='gr-new-customer']";
    public link_EnterManualAddress = "//*[@id='guest-form']//*[@id='gr-manual-address-button']";

    // List.
    public list_MemberSearchResult = "//div[@id='search-text-wrapper-edit']//div[@class='customer-detail']";
    public list_Accommodations = "//*[@class='container-fluid edit-booking-dropdown']//dd/ul/li/a";
    public list_RoomTypes = "//*[@id='room-select-result']/select/option";
    public list_ExistingGuest = "//*[@id='search-text-wrapper-edit']/ul[not(contains(@style, 'display: none;'))]//div[@class='customer-detail']";

    // Banner.
    public banner_CRMError = "//div[@id='toast-message-modal']//span[@id='error-message']";

    // This will verify if the edit booking modal is displayed.
    async VerifyEditBookingModal(){
        try{
            await this.WaitForElement(this.section_BookingDetails, "Edit Booking Modal");
            await this.WaitForElement(this.btn_DeleteBooking, "Delete Booking button");
    
            // Check if Cancel button is displayed.
            if(!await this.ElementExist(this.btn_CancelEditBooking, 2000)){
                throw new Error("Cancel Edit Booking button was NOT displayed.");
            }
    
            // Check if Save button is disabled. 
            if(!await this.ElementExist(this.btn_UpdateBooking, 2000)){
                throw new Error("Update Booking button was NOT displayed.");
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

    // Verify Booking Duration.
    async VerifyEditBookingDuration(details: AccommodationDetails, index: number){
        try{
            // Check if reservation date matched.
            var expectedDate = details.CheckInDate[index] + " - " + details.CheckOutDate[index];
            var actualDate = await this.GetElementText(this.lbl_ReservationDate, "Edit Booking Reservation Date");
            if(actualDate!=expectedDate){
                throw new Error("Expected reservation date in EDIT BOOKING MODAL did NOT matched.\nExpected: " + expectedDate +
                "\nActual: " + actualDate);
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

    // Verify Edit Booking Guest Count.
    async VerifyEditBookingGuestCount(details: AccommodationDetails, index: number){
        try{
            // Check if booking guests matched.
            var adult = details.Adult[index] + " Adult";
            var child = "";
            var infant = "";
            if(parseInt(details.Adult[index]) > 1){
                var adult = details.Adult[index] + " Adults";
            }
            if(parseInt(details.child[index])==1){
                child = ", " + details.Child[index] + " Child";
            }
            else if(parseInt(details.Child[index]) > 1){
                var child = ", " + details.Child[index] + " Children";
            }
            if(parseInt(details.Infant[index])==1){
                infant = ", " + details.Infant[index] + " Infant";
            }
            else if(parseInt(details.Infant[index]) > 1){
                var infant = ", " + details.Infant[index] + " Infants";
            }
            var expectedGuestCount = adult + child + infant;
            var actualGuestCount = await this.GetElementText(this.lbl_GuestCount, "Edit Booking Guest Count");
            if(actualGuestCount!=expectedGuestCount){
                throw new Error("Expected guest count in Edit Booking Modal did NOT matched.\nExpected: " + expectedGuestCount + 
                "\nActual: " + actualGuestCount);
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

    // This will verify the details under the accommodation section in edit booking modal.
    async VerifyEditBookingAccommodationDetails(details: AccommodationDetails, isMember: boolean, index: number){
        try{
            // Get actual accommodation details.
            var acccommodationName = await this.GetElementText(this.lbl_AccommodationName, "Edit Booking Accommodation");
            var price: any;
            if(!isMember){
                var initialPrice = await this.GetElementText(this.lbl_GuestPrice, "Guest Price");
                price = initialPrice.replace('$', '').replace('total', '').trim();
                price = parseFloat(price).toFixed(2);
    
                // Check if actual price matched the expected.
                if(price!=details.Price[index]){
                    throw new Error("Expected price did NOT matched.\nExpected: " + details.Price[index] + 
                    "\nActual: " + price);
                }
                
            }
            else{
                // Get rewards tier.
                var tier = await this.GetElementText(this.lbl_RewardsTier, "Rewards Tier");

                // Get the actual discounted member price.
                initialPrice = await this.GetElementText(this.lbl_MemberPrice, "Member Price");
                price = initialPrice.replace('$', '').replace('total', '').trim();
                price = parseFloat(price).toFixed(2);

                // Check for expected member discount.
                var initialMemberDiscount = parseFloat(details.Price[index]) * MembershipDiscount;
                var memberDiscount = (Math.round((initialMemberDiscount + Number.EPSILON) * 1000) / 1000);

                // Discount should be capped at 50.
                var expectedMemberPrice: any;
                var initialMemberPrice: any;
                if(memberDiscount > 50 && tier.toLowerCase().trim()!="best mate"){
                    initialMemberPrice = (parseFloat(details.Price[index]) - 50);
                    expectedMemberPrice =  (Math.round((initialMemberPrice + Number.EPSILON) * 100) / 100);
                }
                else{
                    initialMemberPrice = (parseFloat(details.Price[index]) - memberDiscount);
                    expectedMemberPrice =  (Math.round((initialMemberPrice + Number.EPSILON) * 100) / 100);
    
                    /* SUBJECT FOR CHANGE */
                    /*var expectedPriceDiff: any;
                    if(parseFloat(expectedMemberPrice) > parseFloat(price)){
                        expectedPriceDiff = (parseFloat(expectedMemberPrice) - parseFloat(price)).toFixed(2);
                        if(expectedPriceDiff < 0.00 || expectedPriceDiff > 0.01){
                            throw new Error("Expected bestmate discount did NOT matched\nExpected: " + expectedMemberPrice + 
                        "\nActual: " + price);
                        }
                    }
                    else{
                        expectedPriceDiff = (parseFloat(price) - parseFloat(expectedMemberPrice)).toFixed(2);
                        if(expectedPriceDiff < 0.00 || expectedPriceDiff > 0.01){
                            throw new Error("Expected bestmate discount did NOT matched\nExpected: " + expectedMemberPrice + 
                        "\nActual: " + price);
                        }
                    }*/
                }

                /* SUBJECT FOR CHANGE
                // Check if actual price matched the expected.
                if(price!=expectedMemberPrice.toFixed(2)){
                    console.log("Expected Member Price: " + expectedMemberPrice);
                    if(tier.toLowerCase().trim()=="best mate"){
                        throw new Error("Expected best mate member price did NOT matched for non-capped value.\nExpected: " + expectedMemberPrice + 
                        "\nActual: " + price);
                    }
                    else{
                        throw new Error("Expected member price did NOT matched.\nExpected: " + expectedMemberPrice + 
                        "\nActual: " + price);
                    }
                }*/
            } 
    
            // Check if actual accommodation name matched the expected.
            if(acccommodationName!=details.AccommodationName[index]){
                throw new Error("Expected accommodation name did NOT matched.\nExpected: " + details.AccommodationName[index] + 
                "\nActual: " + acccommodationName);
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

    // This will verify the details under the accommodation section in edit booking modal.
    async GetUpdatedBookingAccommodationDetails(isMember: boolean){
        try{
            // Get updated dates.
            var actualDate = await this.GetElementText(this.lbl_ReservationDate, "Updated Booking Reservation Date");
            var checkInDate = actualDate.split('-')[0].trim();
            var checkOutDate = actualDate.split('-')[1].trim();
    
            // Get updated guest count.
            var actualGuestCount = await this.GetElementText(this.lbl_GuestCount, "Updated Booking Guest Counts");
            var adult = "0";
            var child = "0";
            var infant = "0";
            var guests: any = [];
            if(actualGuestCount.includes(', ')){
                guests = actualGuestCount.split(', ');
            }
            else if(actualGuestCount.includes(',')){
                guests = actualGuestCount.split(',');
            }
            else{
                guests = actualGuestCount;
    
            }
            if(guests.length == 3){
                adult = guests[0].split(' ')[0].trim();
                child = guests[1].split(' ')[0].trim();
                infant = guests[2].split(' ')[0].trim();
            }
            else if(guests.length == 2){
                adult = guests[0].split(' ')[0].trim();
                child = guests[1].split(' ')[0].trim();
            }
            else{
                adult = guests[0].split(' ')[0].trim();
            }
    
            // Get updated accommodation details.
            var acccommodationName = await this.GetElementText(this.lbl_AccommodationName, "Updated Booking Accommodation Names");
    
            // Get updated price.
            var initialPrice: any;
            if(!isMember){
                initialPrice = await this.GetElementText(this.lbl_GuestPrice, "Guest Price");
            }
            else{
                initialPrice = await this.GetElementText(this.lbl_MemberPrice, "Member Price");
            }
            var price = initialPrice.replace('$', '').replace('total', '').trim();
            price = parseFloat(price).toFixed(2);
    
            // Get Assigned Room.
            var room = await this.FindElement(this.lbl_AssignedRoom, "Assigned Rooms", "Hidden");
            var initialRoomValue = await this.GetElementValueByAttribute(room, "value", "Assigned Room");
            var assignedRoom = initialRoomValue.replace('  ', ' ');
    
            // Get rewards tier.
            var tier = await this.GetElementText(this.lbl_RewardsTier, "Rewards Tier");
    
            // Set updated accommodation details.
            var updatedDetails = [acccommodationName, checkInDate, checkOutDate, adult, 
                child, infant, price, assignedRoom, tier];
    
            // Return setup data.
            return updatedDetails;
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

    // This will create new customer.
    async CreateNewCustomer(details: CustomerDetails, index: number){
        try{
            // Enter search name in the search contact field.
            await this.EnterValue(this.txt_SearchContact, details.SearchName[index], "Search Contact");
    
            // Click 'Create New Customer' link.
            await this.Click(this.link_CreateNewCustomer, "Create New Customer link");
    
            // Verify Add customer details modal.
            await this.WaitForElement(this.modal_AddCustomerModal, "Add Customer Modal");
    
            // Capture blank add new customer details modal.
            await this.ScreenShot("Blank Add Customer Details Modal");
    
            // Verify disabled Save Customer details button.
            await this.VerifyAddCustomerDetailsButtons();
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

    // This will verify if the Save button is disabled.
    async VerifyAddCustomerDetailsButtons(){
        try{
            // Check if Cancel button is enabled.
            if(!await this.ElementExist(this.btn_CancelAddCustomer, 3000)){
                throw new Error("Cancel Add Customer Details button is DISABLED.");
            }
    
            // Check if Save button is disabled. 
            if(await this.ElementExist(this.btn_SaveAddCustomer, 3000)){
                throw new Error("Save Add Customer Details button is already ENABLED.");
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

    // This will fill up new customer details.
    async FillNewCustomerDetails(details: CustomerDetails, index: number){
        try{
            // Check names for upsell.
            if(details.IsUpsell[index]){
                if(!details.FirstName[index].toLowerCase().includes("member")){
                    details.FirstName[index] = details.FirstName[index].replace("RCATSNew", "RCATSMember");
                }
                if(!details.LastName[index].toLowerCase().includes("member")){
                    details.LastName[index] = details.LastName[index].replace("RCATSNewTest", "RCATSMemberTest");
                }
            }
            // Enter Firstname.
            await this.EnterValue(this.txt_FirstName, details.FirstName[index], "Firstname field");
    
            // Enter Fastname.
            await this.EnterValue(this.txt_LastName, details.LastName[index], "Lastname field");
    
            // Enter Email.
            await this.EnterValue(this.txt_Email, details.Email[index], "Email field");
    
            // Enter Contact number.
            await this.EnterValue(this.txt_Mobile, details.Mobile[index], "Mobile field");
    
            // Click 'Enter Manually' link.
            await this.Click(this.link_EnterManualAddress, "Enter Manually link");
    
            // Enter Street.
            await this.EnterValue(this.txt_Street, details.Street[index], "Street field");
    
            // Enter Town.
            await this.EnterValue(this.txt_Town, details.Town[index], "Town field");
    
            // Select State.
            await this.SelectFromDropdown(this.drp_State, "text", details.State[index], "State dropdown field");
    
            // Enter Postcode.
            await this.EnterValue(this.txt_Postcode, details.Postcode[index], "Postcode field");
    
            // Select Country.
            await this.SelectFromDropdown(this.drp_Country, "text", details.Country[index], "Country dropdown field");

            return [details.FirstName[index], details.LastName[index]];
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

    // Click Save button.
    async ClickSaveCustomerDetails(existingRecord: boolean = false){
        try{
            // Check if Save button is disabled. 
            if(!await this.ElementExist(this.btn_SaveAddCustomer)){
                throw new Error("Save Add Customer Details button was DISABLED.");
            }
            if(!await this.ElementEnabled(this.btn_SaveAddCustomer)){
                throw new Error("Save Add Customer Details button was DISABLED.");
            }

            // Get the add customer modal.
            var modal = await this.FindElement(this.modal_AddCustomerModal, "Add Customer Modal");
    
            // Click save button.
            await this.Click(this.btn_SaveAddCustomer, "Edit Customer Save buton");
            
            if(!existingRecord){
                // Wait for the add new customer modal to be hidden.
                await this.WaitForLiveElementToBeHidden(modal, "Add Customer Modal");
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

    // Step: Verify New Customer Details is displayed.
    async VerifyCustomerCardAndRewardsEligibility(details: CustomerDetails, 
        isMember: boolean, index: number){
        try{
            // Wait for customer card details to be displayed.
            await this.WaitForElement(this.section_CustomerCard, "Customer Card");
    
            // Capture Customer Details.
            await this.ScreenShot("Customer Card Details");
    
            // Get customer card details.
            var customerName = await this.GetElementText(this.lbl_CustomerName, "Customer Name");
            var customerEmail = await this.GetElementText(this.lbl_CustomerEmail, "Customer Email");
            var customerContact = await this.GetElementText(this.lbl_CustomerContactNumber, "Customer Contact Number");
    
            // Set expected customer card.
            var expectedCustomerName = details.FirstName[index] + " " + details.LastName[index];
            var expectedCustomerContact: any;
            expectedCustomerContact = details.Mobile[index];
            if(expectedCustomerContact.includes('04')){
                expectedCustomerContact = details.Mobile[index].replace('04', '+614');
            }
    
            // Verify if customer name is matched.
            if(customerName!=expectedCustomerName){
                throw new Error("Expected Customer Name did NOT matched.\nExpected: " + expectedCustomerName + 
                "\nActual: " + customerName);
            }
    
            // Verify if customer email is matched.
            if(customerEmail!=details.Email[index]){
                throw new Error("Expected Customer Email did NOT matched.\nExpected: " + details.Email[index] + 
                "\nActual: " + customerEmail);
            }
    
            // Verify if customer contact number is matched.
            if(customerContact!=expectedCustomerContact){
                throw new Error("Expected Customer Contact Number did NOT matched.\nExpected: " + expectedCustomerContact + 
                "\nActual: " + customerContact);
            }
    
            // Verify if edit button is displayed.
            await this.WaitForElement(this.btn_EditGuest, "Edit Guest Details button", 3000);

            // Get rewards tier.
            var tier = await this.GetElementText(this.lbl_RewardsTier, "Rewards Tier");
    
            // Verify Rewards Eligibility for new customer.
            if(!isMember){
                await this.WaitForElement(this.section_RewardsCard, "Rewards Eligibility Card", 5000);

                // Eligibility message.
                var eligibilityMessage = await this.GetElementText(this.lbl_RewardsMessage, "Rewards Elegibility Message.");
                var actualEligibilityMessage = eligibilityMessage.replace(/[\u2018\u2019]/g, "'");

                // Verify if the price still matched.
                var initialPrice = await this.GetElementText(this.lbl_GuestPrice, "Guest Price");
                var price = parseFloat(initialPrice.replace('$', '').replace('total', '').trim()).toFixed(2);

                // Verify rewards tier.
                if(tier!="None"){
                    throw new Error("Rewards tier did NOT matched.\nExpected: None\nActual: " + tier);
                }

                // Check for the discounted price offer and eligibility message.
                if(parseFloat(price) < 500){
                    var initialDiscountPrice = await this.GetElementText(this.lbl_RewardsMembershipFee, "Discounted Total Price");
                    var discountedPrice = parseFloat(initialDiscountPrice.replace('$', '').trim()).toFixed(2);

                    var percent = (10 / 100);
                    var discount = parseFloat(price) * percent;
                    var intialDiscountedPrice = (parseFloat(MembershipFee) - discount).toString();
                    if(intialDiscountedPrice.toString().includes('.')){
                        var decimals = intialDiscountedPrice.split('.');
                        if(decimals[1].length >= 3){
                            intialDiscountedPrice = parseFloat(intialDiscountedPrice).toFixed(3);
                        }
                    }
                    var expectedDiscountOffer = (Math.round((parseFloat(intialDiscountedPrice) + Number.EPSILON) * 100) / 100).toFixed(2);

                    //** SUBJECT FOR CHANGE */
                    // This will get the price difference.
                    var priceDiff: any;
                    if(parseFloat(expectedDiscountOffer) > parseFloat(discountedPrice)){
                        priceDiff = parseFloat(expectedDiscountOffer) - parseFloat(discountedPrice);
                    }
                    else{
                        priceDiff = parseFloat(discountedPrice) - parseFloat(expectedDiscountOffer);
                    }

                    // This will verify the price difference.
                    if(priceDiff < 0 || priceDiff > 0.01){
                        throw new Error("Expected discount price offer did NOT matched.\nExpected: " + expectedDiscountOffer + 
                        "\nActual: " + discountedPrice);
                    }

                    // Check if eligibilty message matched.
                    var expectedEligibilityMessage = RewardsDiscountMessage + initialDiscountPrice;
                    if(!actualEligibilityMessage.includes(expectedEligibilityMessage)){
                        throw new Error("Expected eligibility message did NOT matched.\nExpected: " + expectedEligibilityMessage + 
                        "\nActual: " + eligibilityMessage);
                    }
                }
                else{
                    // Check if eligibilty message matched.
                    if(!actualEligibilityMessage.includes(RewardNonDiscountMessage)){
                        throw new Error("Expected eligibility message did NOT matched.\nExpected: " + RewardNonDiscountMessage + 
                        "\nActual: " + actualEligibilityMessage);
                    }
                }

                // Validate membership benefits.
                var rewardsBenefits = await this.FindElements(this.lbl_MembershipBenefits, "Rewards Membership Benefits");
                var benefitDiscount = await this.GetLiveElementText(rewardsBenefits[0], "Discount Benefit on Future Bookings");
                var fuelSavings = await this.GetLiveElementText(rewardsBenefits[1], "Fuel Save Benefit");
                var partnerOffer = await this.GetLiveElementText(rewardsBenefits[2], "Great Partner Offer benefit");
                if(benefitDiscount!=RewardsBenefits[0]){
                    throw new Error("Expected benefit did NOT matched.\nExpected: " + benefitDiscount + "\nActual: " +
                    RewardsBenefits[0]);
                }
                if(fuelSavings!=RewardsBenefits[1]){
                    throw new Error("Expected benefit did NOT matched.\nExpected: " + fuelSavings + "\nActual: " +
                    RewardsBenefits[1]);
                }
                if(partnerOffer!=RewardsBenefits[2]){
                    throw new Error("Expected benefit did NOT matched.\nExpected: " + partnerOffer + "\nActual: " +
                    RewardsBenefits[2]);
                }
            }
            else{
                // Verify rewards tier.
                if(tier=="None"){
                    throw new Error("Rewards tier did NOT matched.\nExpected: Mate/Greatmate/Bestmate\nActual: " + tier);
                }
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

    // Step: Click Update Booking Button.
    async ClickUpdateBooking(){
        try{
            await this.WaitForElement(this.btn_UpdateBooking, "Update Booking button");
            await this.Click(this.btn_UpdateBooking, "Update Booking button");

            // Wait for the booking updated banner to be displayed.
            if(await this.ElementExist(this.banner_BookingUpdated, 5000)){
                await this.WaitForElementToBeHidden(this.banner_BookingUpdated, 20000);
            }

            // Wait for for the edit booking modal to be hidden.
            if(await this.ElementExist(this.section_BookingDetails, 2000)){
                await this.WaitForElementToBeHidden(this.section_BookingDetails);
            }

            // Wait for Edit Booking modal to be closed.
            if(!await this.WaitForElementToBeHidden(this.modal_EditBooking, 160000)){
                throw new Error("Edit Booking was modal was NOT closed after click Update Booking");
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

    // This will do join membership.
    async AddNewMember(){
        try{
            // Click Join button.
            await this.Click(this.btn_Join, "Join button");
    
            // Verify Member join modal is displayed.
            await this.WaitForElement(this.modal_MemberJoin, "Member Join modal");
            
            // Capture Member Join Modal.
            await this.ScreenShot("Member Join Modal");
    
            // Check for Cancel Join member button.
            await this.WaitForElement(this.btn_JoinCancel, "Cancel Member Join button");
    
            // Verify confirm button is disabled.
            var confirm = await this.FindElement(this.btn_JoinConfirm, "Confirm Member Join button");
            var attribute = await this.GetElementValueByAttribute(confirm, "class", "Confirm Member Join button");
            if(!attribute.includes("disabled")){
                throw new Error("Confirm button was NOT disabled.");
            }
    
            // Enter staff name.
            await this.EnterValue(this.txt_StaffName, StaffName, "Staff Name");
            await this.Sleep(3000);
    
            // Verify confirm button is enabled.
            var confirm = await this.FindElement(this.btn_JoinConfirm, "Confirm Member Join button");
            var attribute = await this.GetElementValueByAttribute(confirm, "class", "Confirm Member Join button");
            if(attribute.includes("disabled")){
                throw new Error("Confirm button was NOT enabled.");
            }
    
            // Click Confirm button.
            await this.ClickElement(confirm, "Confirm Member Join button");
    
            // Verify successful member join.
            await this.WaitForElement(this.section_SuccessfulJoin, "Successful Member Join Notification");
    
            // Verify that the default member tier is Mate.
            var tier = await this.GetElementText(this.lbl_RewardsTier, "New Member Tier");
            if(tier!=NewMemberTier){
                throw new Error("Expected new member tier did NOT matched.\nExpected: " + NewMemberTier + 
                "\nActual: " + tier);
            }
            
            // Capture Succesful Member Join Modal.
            await this.ScreenShot("Successful Member Join");
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

    // This will Click and Delete selected accommodation.
    async ClickDeleteAndConfirm(isConfirm: boolean = true){
        try{
            // Click Delete Booking button.
            await this.Click(this.btn_DeleteBooking, "Delete Booking button");
    
            // This will verify if the delete booking modal is displayed.
            if(!await this.ElementExist(this.modal_DeleteBooking)){
                throw new Error("Delete Booking Modal was NOT displayed.");
            }
    
            // Capture Delete Booking modal.
            await this.ScreenShot("Delete Booking Modal");
    
            // Get the Delete booking modal button elements.
            var cancel = await this.FindElement(this.btn_CancelDelete, "Cancel Delete button");
            var confirm = await this.FindElement(this.btn_ConfirmDelete, "Confirm Delete button");
    
            // Click Cancel/Confirm based on parameter input.
            if(isConfirm){
                await this.ClickElement(confirm, "Confirm Delete button");
            }
            else{
                await this.ClickElement(cancel, "Cancel Delete button");
            }
            
            // Wait for the booking deleted banner to be displayed.
            if(await this.ElementExist(this.banner_BookingDeleted, 20000)){
                await this.WaitForElementToBeHidden(this.banner_BookingDeleted, 20000);
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

    // This will select the accommodation and room type.
    async SelectAccommodation(acccommodation: string = "Random", roomType: string = "Random"){
        try{
            // Select accommodation.
            await this.SelectAccommodationType(acccommodation);
    
            // Select Room type.
            await this.SelectRoomType(roomType);
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

    // This will select specific/random accommodation.
    async SelectAccommodationType(accommodation: string){
        try{
            // Click the accommodation dropdown.
            await this.Click(this.drp_Accommodation, "Accommodation Dropdown");
    
            // Get the list of acccommodation.
            var list = await this.FindElements(this.list_Accommodations, "List of Accommodation");
    
            // Select accommodation.
            if(accommodation.toLowerCase().trim()=="random"){
                var index = Math.floor(Math.random() * list.length);
                await this.ClickElement(list[index], "Selected Accommodation");
            }
    
            // Capture updated accommdation.
            await this.ScreenShot("Update Accommodation");

            // set 3 seconds wait time to load room type.
            await this.Sleep(3000);
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

    // This will select specific/random room type.
    async SelectRoomType(roomType: string){
        try{
            // Click Room Type dropdown.
            await this.Click(this.drp_RoomType, "Room assigned dropdown");

            // Get the list of rooms.
            var list = await this.FindElements(this.list_RoomTypes, "List of Room Types", "all");
    
            // Select room.
            if(roomType.toLowerCase().trim()=="random"){
                var index = Math.floor(Math.random() * list.length);
                await this.SelectFromDropdown(this.drp_RoomType, "Index", index.toString(), "Selected Room Type");
            }
    
            // Capture updated room assigned.
            await this.ScreenShot("Update Room Assigned");
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

    // Step: This will create new customer.
    async SearchExistingCustomer(searchName: string){
        try{
            // Enter search name in the search contact field.
            await this.EnterValue(this.txt_SearchContact, searchName, "Search Contact");
    
            // Get the search results.
            await this.WaitForElement(this.list_ExistingGuest, "Existing Guests");
            var result = await this.FindElements(this.list_ExistingGuest, "Existing Guests");

            // Get random index.
            var randomIndex = Math.floor(Math.random() * result.length);
            console.log(randomIndex + " is random index for existing guest");
    
            // Capture search result.
            await this.ScreenShot("Existing Guest Search Results");
    
            // Click the first search result.
            await this.ClickElement(result[randomIndex], "Selected Guest");
            await this.Sleep(2000);
    
            // Wait for customer card details to be displayed.
            await this.WaitForElement(this.section_CustomerCard, "Customer Card");
    
            // Capture blank add new customer details modal.
            await this.ScreenShot("Select Guest Card");
    
            // Get the member tier.
            var tier = await this.GetElementText(this.lbl_RewardsTier, "Member tier");
    
            return tier;
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

    // This will click on the edit button.
    async ClickEditGuestButton(){
        try{
            // Click Edit button on the customer card.
            await this.Click(this.btn_EditGuest, "Edit Guest button");
    
            // Verify Add customer details modal.
            await this.WaitForElement(this.modal_AddCustomerModal, "Add Customer Modal");
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

    // This will update contact details.
    async UpdateContactDetails(){
        try{
            // Set value to concatenate.
            var concatenator = "_TEST";
            var newFirstName="", newLastName="", newPhone="", newState="", newTown="";
            var newStreet="", newState="", newPostcode="", country="";
    
            // Click 'Enter Manually' link.
            await this.Click(this.link_EnterManualAddress, "Enter Manually link");
    
            // Get all the contact details
            var firstName = await this.GetElementTextviaHTML(this.txt_FirstName, "First name field");
            var lastName = await this.GetElementTextviaHTML(this.txt_LastName, "Last name field");
            var email = await this.GetElementTextviaHTML(this.txt_Email, "Email field");
            var phone = await this.GetElementTextviaHTML(this.txt_Mobile, "Mobile field");
            do{
                phone = phone.replace(" ", "");
            }while(phone.includes(" "));
            var street = await this.GetElementTextviaHTML(this.txt_Street, "Street field");
            var town = await this.GetElementTextviaHTML(this.txt_Town, "Town field");
            var state = await this.GetElementTextviaHTML(this.drp_SelectedState, "State dropdown");
            var postcode = await this.GetElementTextviaHTML(this.txt_Postcode, "Postcode field");
            var country = await this.GetElementTextviaHTML(this.drp_Country, "Country dropdown");
    
            if(!firstName.includes(concatenator)){
                newFirstName = firstName + concatenator;
            }
            else{
                newFirstName = firstName.replace(concatenator, "");
            }
            if(!lastName.includes(concatenator)){
                newLastName = lastName + concatenator;
            }
            else{
                newLastName = lastName.replace(concatenator, "");
            }
            if(!phone.includes("678")){
                newPhone = phone.replace(phone.slice(-3), "678");
            }
            else{
                newPhone = phone.replace("678", "890");
            }
            if(!street.includes(concatenator)){
                newStreet = street + concatenator;
            }
            else{
                newStreet = street.replace(concatenator, "");
            }
            if(!town.includes(concatenator)){
                newTown = town + concatenator;
            }
            else{
                newTown = town.replace(concatenator, "");
            }
            if(!state.includes("SA")){
                newState = "SA";
            }
            else{
                newState = "ACT";
            }
            if(!postcode.includes("000")){
                newPostcode = postcode.replace(postcode.slice(-3), "000");
            }
            else{
                newPostcode = postcode.replace("000", "114");
            }
    
            // Fill up customer details.
            // Enter Firstname.
            await this.EnterValue(this.txt_FirstName, newFirstName, "Firstname field");
    
            // Enter Fastname.
            await this.EnterValue(this.txt_LastName, newLastName, "Lastname field");
    
            // Enter Contact number.
            await this.EnterValue(this.txt_Mobile, newPhone, "Mobile field");
    
            // Enter Street.
            await this.EnterValue(this.txt_Street, newStreet, "Street field");
    
            // Enter Town.
            await this.EnterValue(this.txt_Town, newTown, "Town field");
    
            // Select State.
            await this.SelectFromDropdown(this.drp_State, "text", newState, "State dropdown field");
    
            // Enter Postcode.
            await this.EnterValue(this.txt_Postcode, newPostcode, "Postcode field");
    
            return [newFirstName, newLastName, email, newPhone, newStreet, newTown, newState, newPostcode, country];
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

    // Enter membership number
    async EnterMemberNumber(details: CustomerDetails, index: number){
        try{
            // Enter member number in the search contact field.
            await this.EnterValue(this.txt_SearchContact, details.MemberID[index], "Search Contact");
    
            // Click member result displayed.
            await this.Click(this.list_MemberSearchResult, "Selected Search Member");
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

    // Enter velocity number.
    async EnterVelocityNumber(details: CustomerDetails, index: number){
        try{
            // Enter velocity number in the velocity rewards field.
            await this.EnterValue(this.txt_RewardsVelocity, details.VelocityNumber[index], "Velocity Text Field");
            await this.Click(this.lbl_CustomerName, "Customer Name");
    
            // Capture input velocity.
            await this.ScreenShot("Velocity Number Input");
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

    // This will click yes/no to load existing record found through email.
    async ClickToLoadExistingRecordFound(input: string){
        try{
            // Check if Existing Record modal is displayed.
            await this.WaitForElement(this.modal_ExistingRecord, "Existing Record Modal", 10000);
    
            // Capture Existing Record Found modal.
            await this.Sleep(2000);
            await this.ScreenShot("Existing Record Found Modal");
    
            // Click yes/no to load existing record found.
            if(input.toLowerCase().trim()=="yes"){
                await this.Click(this.btn_YesToLoadExistingRecord, "Load Existing Record Found");
            }
            else{
                await this.Click(this.btn_NotLoadExitingRecord, "Do Not Load Existing Record Found");
            }
    
            // Wait for customer card details to be displayed.
            await this.WaitForElement(this.section_CustomerCard, "Customer Card");

            // Capture loaded existing customer
            await this.ScreenShot("Loaded Existing Customer Details");
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

    // This will update contact details.
    async GetLoadedGuestDetails(){
        try{
            // Verify edit customer details modal.
            await this.WaitForElement(this.modal_AddCustomerModal, "Edit Customer Details Modal");
    
            // Capture edit customer details modal.
            await this.ScreenShot("Edit Customer Details Modal");
    
            // Click 'Enter Manually' link.
            await this.Click(this.link_EnterManualAddress, "Enter Manually link");
    
            // Get all the contact details
            var firstName = await this.GetElementTextviaHTML(this.txt_FirstName, "First name field");
            var lastName = await this.GetElementTextviaHTML(this.txt_LastName, "Last name field");
            var email = await this.GetElementTextviaHTML(this.txt_Email, "Email field");
            var phone = await this.GetElementTextviaHTML(this.txt_Mobile, "Mobile field");
            do{
                phone = phone.replace(" ", "");
            }while(phone.includes(" "));
            var street = await this.GetElementTextviaHTML(this.txt_Street, "Street field");
            var town = await this.GetElementTextviaHTML(this.txt_Town, "Town field");
            var state = await this.GetElementTextviaHTML(this.drp_SelectedState, "State dropdown");
            var postcode = await this.GetElementTextviaHTML(this.txt_Postcode, "Postcode field");
            var country = await this.GetElementTextviaHTML(this.drp_Country, "Country dropdown");
    
            return [firstName, lastName, email, phone, street, town, state, postcode, country];
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

    // This will click the cancel booking.
    async ClickCancelButtonInEditCustomerDetails(){
        try{
            await this.Click(this.btn_CancelAddCustomer, "Cancel Edit Customer Details");
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

    // This will verify the Promotional Warning modal.
    async VerifyPromotionalRatesWarningModal(){
        try{
            // Wait for the Promo Rates Warning Modal to be displayed.
            await this.WaitForElement(this.modal_PromoRates, "Promo Rates Warning Modal");

            // Capture Promo Rates Warning Modal.
            await this.ScreenShot("Promo Rates Warning Modal");

            // Verify promo rates warning modal details.
            var promoTitle = await this.GetElementText(this.lbl_PromoWarningMessageTitle, "Promo Rates Warning title");
            var promoWarningMessage = await this.GetElementText(this.lbl_PromoWarningMessageDetails, "Promo Rates Warning Message");
            if(!promoTitle.includes(HigherOfferTitle)){
                throw new Error("Expected Promo Rates Warning Title did NOT matched.");
            }
            if(!promoWarningMessage.includes(HigherOfferMessage)){
                throw new Error("Expected Promo Rates Warning Message did NOT matched.");
            }

            // Click on the promo warning message.
            await this.Click(this.lbl_PromoWarningMessageDetails, "Promo Rates Warning Message");
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

    // Step: Verify New Customer Details is displayed.
    async VerifyCustomerCardAndRewardsEligibilityAfterOfferIsApplied(details: CustomerDetails, offer: OfferDetails, 
        isMember: boolean, index: number){
        try{
            // Wait for customer card details to be displayed.
            await this.WaitForElement(this.section_CustomerCard, "Customer Card");
    
            // Capture Customer Details.
            await this.ScreenShot("Customer Card Details");
    
            // Get customer card details.
            var customerName = await this.GetElementText(this.lbl_CustomerName, "Customer Name");
            var customerEmail = await this.GetElementText(this.lbl_CustomerEmail, "Customer Email");
            var customerContact = await this.GetElementText(this.lbl_CustomerContactNumber, "Customer Contact Number");
    
            // Set expected customer card.
            var expectedCustomerName = details.FirstName[index] + " " + details.LastName[index];
            var expectedCustomerContact: any;
            expectedCustomerContact = details.Mobile[index].substring(0, 2);
            if(expectedCustomerContact.includes('04')){
                expectedCustomerContact = details.Mobile[index].replace('04', '+614');
            }
    
            // Verify if customer name is matched.
            if(customerName!=expectedCustomerName){
                throw new Error("Expected Customer Name did NOT matched.\nExpected: " + expectedCustomerName + 
                "\nActual: " + customerName);
            }
    
            // Verify if customer email is matched.
            if(customerEmail!=details.Email[index]){
                throw new Error("Expected Customer Email did NOT matched.\nExpected: " + details.Email[index] + 
                "\nActual: " + customerEmail);
            }
    
            // Verify if customer contact number is matched.
            if(customerContact!=expectedCustomerContact){
                throw new Error("Expected Customer Contact Number did NOT matched.\nExpected: " + expectedCustomerContact + 
                "\nActual: " + customerContact);
            }
    
            // Verify if edit button is displayed.
            await this.WaitForElement(this.btn_EditGuest, "Edit Guest Details button", 3000);

            // Get rewards tier.
            var tier = await this.GetElementText(this.lbl_RewardsTier, "Rewards Tier");
    
            // Verify Rewards Eligibility for new customer.
            if(!isMember){
                await this.WaitForElement(this.section_RewardsCard, "Rewards Eligibility Card", 5000);

                // Eligibility message.
                var eligibilityMessage = await this.GetElementText(this.lbl_RewardsMessage, "Rewards Elegibility Message.");
                var actualEligibilityMessage = eligibilityMessage.replace(/[\u2018\u2019]/g, "'");

                // Verify if the price still matched.
                var initialPrice = await this.GetElementText(this.lbl_GuestPrice, "Guest Price");
                var price = parseFloat(initialPrice.replace('$', '').replace('total', '').trim()).toFixed(2);

                // Verify rewards tier.
                if(tier!="None"){
                    throw new Error("Rewards tier did NOT matched.\nExpected: None\nActual: " + tier);
                }

                var initialDiscountPrice = await this.GetElementText(this.lbl_RewardsMembershipFee, "Discounted Total Price");
                var discountedPrice = initialDiscountPrice.replace('$', '').trim();

                // Check for the discounted price offer and eligibility message.
                if(!offer.IsOfferLess[index]){
                    // If offer is greater than GDay Reward Pricing the membership fee should be at $50.
                    if(parseFloat(discountedPrice)!=parseFloat(MembershipFee)){
                        throw new Error("Expected discount price offer did NOT matched.\nExpected: " + MembershipFee + 
                        "\nActual: " + discountedPrice);
                    }

                    // Check if eligibilty message matched.
                    var expectedEligibilityMessage = RewardsDiscountMessage + "$"+ parseFloat(MembershipFee);
                    if(!actualEligibilityMessage.includes(expectedEligibilityMessage)){
                        throw new Error("Expected eligibility message did NOT matched.\nExpected: " + expectedEligibilityMessage + 
                        "\nActual: " + eligibilityMessage);
                    }
                }
                else{
                    // If offer is less than GDay Reward Pricing the membership fee should be calculated with discount.
                    var percent = (10 / 100);
                    var discount = parseFloat(price) * percent;
                    var intialDiscountedPrice = (parseFloat(MembershipFee) - discount).toString();
                    if(intialDiscountedPrice.toString().includes('.')){
                        var decimals = intialDiscountedPrice.split('.');
                        if(decimals[1].length >= 3){
                            intialDiscountedPrice = parseFloat(intialDiscountedPrice).toFixed(3);
                        }
                    }
                    var expectedDiscountOffer = (Math.round((parseFloat(intialDiscountedPrice) + Number.EPSILON) * 100) / 100).toFixed(2);
                    if(parseFloat(discountedPrice)!=parseFloat(expectedDiscountOffer)){
                        throw new Error("Expected discount price offer did NOT matched.\nExpected: " + expectedDiscountOffer + 
                        "\nActual: " + discountedPrice);
                    }

                    // Check if eligibilty message matched.
                    var expectedEligibilityMessage = RewardsDiscountMessage + initialDiscountPrice;
                    if(!actualEligibilityMessage.includes(expectedEligibilityMessage)){
                        throw new Error("Expected eligibility message did NOT matched.\nExpected: " + expectedEligibilityMessage + 
                        "\nActual: " + eligibilityMessage);
                    }
                }

                // Validate membership benefits.
                var rewardsBenefits = await this.FindElements(this.lbl_MembershipBenefits, "Rewards Membership Benefits");
                var benefitDiscount = await this.GetLiveElementText(rewardsBenefits[0], "Discount Benefit on Future Bookings");
                var fuelSavings = await this.GetLiveElementText(rewardsBenefits[1], "Fuel Save Benefit");
                var partnerOffer = await this.GetLiveElementText(rewardsBenefits[2], "Great Partner Offer benefit");
                if(benefitDiscount!=RewardsBenefits[0]){
                    throw new Error("Expected benefit did NOT matched.\nExpected: " + benefitDiscount + "\nActual: " +
                    RewardsBenefits[0]);
                }
                if(fuelSavings!=RewardsBenefits[1]){
                    throw new Error("Expected benefit did NOT matched.\nExpected: " + fuelSavings + "\nActual: " +
                    RewardsBenefits[1]);
                }
                if(partnerOffer!=RewardsBenefits[2]){
                    throw new Error("Expected benefit did NOT matched.\nExpected: " + partnerOffer + "\nActual: " +
                    RewardsBenefits[2]);
                }
            }
            else{
                // Verify rewards tier.
                if(tier=="None"){
                    throw new Error("Rewards tier did NOT matched.\nExpected: Mate/Greatmate/Bestmate\nActual: " + tier);
                }
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
}