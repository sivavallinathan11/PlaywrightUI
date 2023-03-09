import { errors, Page } from "@playwright/test";
import { AccommodationDetails, CustomerDetails, OfferDetails } from "../data/bookings";
import { DataSetup } from "../data/datasetup";
import { TestDirectory } from "../data/directory";
import { MembershipDiscount, MembershipFee } from "../data/users";
import { Common } from "./Common";

export class OffersModal extends Common{
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

    // This section will be used to set XPaths
    // Modal
    public modal_ViewOffers = "#offers-content";
    public modal_CancelOffer = "//div[@class='wrapper']//div[@id='status-cancel-modal']/div/*[@class='modal-content']";
    public modal_PriceWarning = "//div[@id='gday-pricing-modal']//ul[@class='listed-price']";

    // Radio button
    public rdo_ActiveOffer = "//*[contains(@id,'booking-content') and (contains(@class, 'active'))]//td/input[@class='offer-radio']";

    // Label
    public lbl_OfferName = "//*[contains(@id,'booking-content') and (contains(@class, 'active'))]//td[contains(@class,'offer-name')]/span";
    public lbl_Requirement = "//*[contains(@id,'booking-content') and (contains(@class, 'active'))]//td[contains(@class,'requirement')]/span";
    public lbl_DiscountDays = "//*[contains(@id,'booking-content') and (contains(@class, 'active'))]//td[contains(@class,'discount-days')]/span";
    public lbl_Rate = "//*[contains(@id,'booking-content') and (contains(@class, 'active'))]//td/span[contains(@class, 'booking-rate')]";
    public lbl_Discount = "//*[contains(@id,'booking-content') and (contains(@class, 'active'))]//td/span[contains(@class, 'booking-rate')]/following-sibling::span[contains(@class, 'tag-layout')]";
    public lbl_AccommodationName = "//*[contains(@id,'booking-tab')]//*[@class='accommodation-room']";
    public lbl_BookingPrice = "//*[contains(@id,'booking-tab')]//*[contains(@class, 'booking-price')]";

    // Button
    public btn_Cancel = "//*[@id='offers-content']//*[@class='modal-footer']/button[text()='Cancel']";
    public btn_SkipOffers = "//*[@id='offers-content']//*[@class='modal-footer']/button[text()='Skip Offers']";
    public btn_AcceptOffer = "#accept-offer-cta";
    public btn_ProceedCancel = "//div[@class='wrapper']//div[@id='status-cancel-modal']//*[@id='proceed']";
    public btn_CancelCancel = "//div[@class='wrapper']//div[@id='status-cancel-modal']//*[@id='cancel']";
    public btn_KeepOffer = "#keepOffer";
    public btn_ApplyGdayPricing = "#applyOffer";

    /* Functions starts here */
    // This will verify View Offers modal and buttons.
    async VerifyViewOffersModal(){
        try{
            // Wait for View Offers Modal to be displayed.
            await this.WaitForElement(this.modal_ViewOffers, "View Offers modal");

            // Capture View Offers modal.
            await this.ScreenShot("View Offers Modal");

            // Check for buttons.
            await this.FindElement(this.btn_Cancel, "Cancel button");
            await this.FindElement(this.btn_SkipOffers, "Skip Offer button");
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

    // This will verify accomdation details.
    async VerifyAccommodationDetails(accomDetails: AccommodationDetails, index: number){
        try{
            // Get accommodation details.
            var accommodationNames = await this.FindElements(this.lbl_AccommodationName, "Accommodation Names");
            var accommodationName = await this.GetLiveElementText(accommodationNames[index], "Accommodation Name");
            var quotedPrices = await this.FindElements(this.lbl_BookingPrice, "Booking Quoted Price");
            var initialQuotedPrice = await this.GetLiveElementText(quotedPrices[index], "Booking Quoted Price");
            var quotedPrice = initialQuotedPrice.replace('$', '').replace(',','').trim();

            // Verify details.
            if(accommodationName!=accomDetails.AccommodationName[index]){
                throw new Error("Expected accommodation name did NOT matched.\nExpected: " + 
                accomDetails.AccommodationName[index] + "\nActual: " + accommodationName);
            }
            if(quotedPrice!=accomDetails.Price[index]){
                throw new Error("Expected accommodation price did NOT matched.\nExpected: " + 
                accomDetails.Price[index] + "\nActual: " + quotedPrice);
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

    // Select offer.
    async SelectActiveOffer(offerType: string){
        // Get all active radio button.
        var selectedIndex = 0;
        var setIndex: number[] = [];
        var radioButtons = await this.FindElements(this.rdo_ActiveOffer, "Radio button");
        for(var i = 0; i < radioButtons.length; i++){
            var isElementExist = await this.CheckElementAttributeExist(radioButtons[i], "checked", "Active Offer Radiobutton");
            if(!isElementExist){
                setIndex.push(i);
            }
        }

        // Select offer based on offer type.
        if(offerType.toLowerCase().trim()==""){
            selectedIndex = setIndex[0];
        }
        else if(offerType.toLowerCase().trim()=="random"){
            // Set offerName.
            var offerName = "";
            var selectedOffer = false;
            var offerNames = await this.FindElements(this.lbl_OfferName, "Offer Name");

            // Get random offer that is not standard rate.
            for(var rand1=0; rand1<5; rand1++){
                var randomIndex = Math.floor(Math.random() * setIndex.length);
                selectedIndex = setIndex[randomIndex];
                offerName = await this.GetLiveElementText(offerNames[selectedIndex], "Offer Name");

                if(!offerName.toLowerCase().trim().includes('standard')){
                    selectedOffer = true;
                    break;
                }
            }

            // Verify if the inputted offer was selected.
            if(!selectedOffer){
                throw new Error("Non-Standard offer was NOT available.");
            }
        }
        else if(offerType.toLowerCase().trim()=="standard"){
            var selectedOffer = false;
            var offerNames = await this.FindElements(this.lbl_OfferName, "Offer Name");
            for(var x=0; x<setIndex.length; x++){
                var offerName = await this.GetLiveElementText(offerNames[setIndex[x]], "Offer Name");
                if(offerName.toLowerCase().trim().includes('standard')){
                    selectedIndex = setIndex[x];
                    selectedOffer = true;
                    break;
                }
            }

            // Verify if the inputted offer was selected.
            if(!selectedOffer){
                throw new Error(offerType + " was NOT available.");
            }
        }
        else{
            var selectedOffer = false;
            var offerNames = await this.FindElements(this.lbl_OfferName, "Offer Name");
            for(var x=0; x<setIndex.length; x++){
                var offerName = await this.GetLiveElementText(offerNames[setIndex[x]], "Offer Name");
                if(offerName.toLowerCase().trim().includes(offerType.toLowerCase().trim())){
                    selectedIndex = setIndex[x];
                    selectedOffer = true;
                    break;
                }
            }

            // Verify if the inputted offer was selected.
            if(!selectedOffer){
                throw new Error(offerType + " was NOT available.");
            }
        }

        // Click selected offer.
        await this.ClickElement(radioButtons[selectedIndex], "Selected Offer");
        return selectedIndex;
    }

    // Step: This will select any offers from the view offers modal.
    async SelectAndProcessOfferFromViewOffersModal(accomDetails: AccommodationDetails,
        guestDetails: CustomerDetails, processType: string, offers: string = "", offerRange: string = ""){
        try{
            // Set variable for offer type.
            var setOffers: string[] = [];
            var setOfferRange: string[] = [];
            if(offers.includes('|')){
                setOffers = offers.split('|');
                setOfferRange = offerRange.split('|');
            }
            else{
                if(accomDetails.BookingCount > 1){
                    for(var x1=0; x1<accomDetails.BookingCount; x1++){
                        setOffers.push(offers);
                        setOfferRange.push(offerRange);
                    }
                }
                else{
                    setOffers.push(offers);
                    setOfferRange.push(offerRange);
                }
            }

            // Set variables to assign details for offer.
            var setOfferName: any[] = [];
            var setRequirement: any[] = [];
            var setDiscountDay: any[] = [];
            var setRate: any[] = [];
            var isOfferLess: any[] = [];
            var processTypes: any[] = [];
            var offerName="", requirement="", discountDay="", rate="";
            var offerDetails: any;
            
            // Set variables to assign updated details for accommodation.
            var accommodationName:any[] = [], checkInDate:any[] = [], checkOutDate:any[] = [];
            var adult:any[] = [], child:any[] = [], infant:any[] = [], price:any[] = [];
            var assignedRoom:any[] = [], night:any[] = [], tier:any[] = [], originalRate: any[] = []; 
            var totalBalance = "0.00";
            var bookingDetails: any;
            var multiplier = 0;
            for(var i = 0; i < accomDetails.BookingCount; i++){
                if(guestDetails.IsUpsell[i]){
                    multiplier++;
                }
            }

            for(var i=0;i<accomDetails.BookingCount; i++){
                // Verify accommodation details.
                await this.VerifyAccommodationDetails(accomDetails, i);

                // Get the offer details.
                var offerNames = await this.FindElements(this.lbl_OfferName, "Offer Names");
                var requirements = await this.FindElements(this.lbl_Requirement, "Requirements");
                var discountDays = await this.FindElements(this.lbl_DiscountDays, "Discount Days", "All");
                var rates = await this.FindElements(this.lbl_Rate, "Rates");

                // Select available active offer.
                var selectedIndex = await this.SelectActiveOffer(setOffers[i]);

                // Capture Selected offer
                await this.ScreenShot("Selected Offer");

                // Get offer details.
                var offerName = await this.GetLiveElementText(offerNames[selectedIndex], "Selected Offer Name");
                var requirement = await this.GetLiveElementText(requirements[selectedIndex], "Selected Requirement");
                var discountDay = await this.GetLiveElementText(discountDays[selectedIndex], "Selected Discount Day");
                var initialRate = await this.GetLiveElementText(rates[selectedIndex], "Selected Rate");
                var rate = initialRate.replace('$','').replace(',','').trim();

                // Add the process type.
                processTypes.push(processType);

                // This will click Accept Offer if the offer type is 'Accept Offer'.
                if(processType.toLowerCase().trim()=="accept offers"){
                    await this.ClickAcceptOffers();

                    // Verify if promo rate is less than membership discount.
                    if(setOfferRange[i].toLowerCase().trim()=="better"){
                        isOfferLess.push(false);
                    }
                    else{
                        isOfferLess.push(true);
                    }

                    // Set offer data.
                    setOfferName.push(offerName);
                    setRequirement.push(requirement);
                    setDiscountDay.push(discountDay);
                    setRate.push(rate);

                    // Set accommodation data.
                    accommodationName.push(accomDetails.AccommodationName[i]);
                    checkInDate.push(accomDetails.CheckInDate[i]);
                    checkOutDate.push(accomDetails.CheckOutDate[i]);
                    adult.push(accomDetails.Adult[i]);
                    child.push(accomDetails.Child[i]);
                    infant.push(accomDetails.Infant[i]);
                    price.push(rate);
                    night.push(accomDetails.Night[i]);
                    assignedRoom.push(accomDetails.AssignedRoom[i]);
                    tier.push(accomDetails.RewardsTier[i]);
                    originalRate.push(accomDetails.Price[i]);
                    totalBalance = (parseFloat(totalBalance) + parseFloat(rate)).toFixed(2);
                }
                else if(processType.toLowerCase().trim()=="skip offers"){
                    // Click Skip Offers.
                    await this.ClickSkipOffers();

                    // Set accommodation data.
                    accommodationName.push(accomDetails.AccommodationName[i]);
                    checkInDate.push(accomDetails.CheckInDate[i]);
                    checkOutDate.push(accomDetails.CheckOutDate[i]);
                    adult.push(accomDetails.Adult[i]);
                    child.push(accomDetails.Child[i]);
                    infant.push(accomDetails.Infant[i]);
                    price.push(accomDetails.Price[i]);
                    night.push(accomDetails.Night[i]);
                    assignedRoom.push(accomDetails.AssignedRoom[i]);
                    tier.push(accomDetails.RewardsTier[i]);
                    originalRate.push(accomDetails.Price[i]);
                    totalBalance = (parseFloat(totalBalance) + parseFloat(accomDetails.Price[i])).toFixed(2);
                }
            }

            if(processType.toLowerCase().trim()!="cancel"){
                // Set offer details.
                var setOffersDetails = [setOfferName, setRequirement, setDiscountDay, setRate, isOfferLess, processTypes];
                offerDetails = await this.dataSetup.SetOfferDetails(setOffersDetails);
                
                // Add membership to total balance.
                if(multiplier > 0){
                    var membershipFee = parseFloat(MembershipFee) * multiplier;
                    totalBalance = (parseFloat(totalBalance) + membershipFee).toFixed(2);
                }

                // Set new accommodation details.
                var newAccommodationDetails = [accomDetails.BookingCount, accommodationName, checkInDate, checkOutDate,
                    adult, child, infant, price, night, assignedRoom, totalBalance, tier, originalRate];
                bookingDetails = await this.dataSetup.SetBookingsDataAfterOffersWereMade(newAccommodationDetails);
            }
            else{
                // Set offer data.
                setOfferName.push("");
                setRequirement.push("");
                setDiscountDay.push("");
                setRate.push("");
                isOfferLess.push(false);
                
                // Click Cancel Offers.
                await this.ClickCancelOffers();
                
                // Set the same accommodationDetails.
                bookingDetails = accomDetails;

                // Set offer details.
                var setOffersDetails = [setOfferName, setRequirement, setDiscountDay, setRate, isOfferLess, processTypes];
                offerDetails = await this.dataSetup.SetOfferDetails(setOffersDetails);
            }

            // Add wait time to reload new quote before validating.
            await this.Sleep(5000);
            return [offerDetails, bookingDetails];
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

    // This will click Accept Offers
    async ClickAcceptOffers(){
        try{
            // Check Accept Offers is enabled.
            var acceptButton = await this.FindElement(this.btn_AcceptOffer, "Accept Offers button");
            var attribute = await this.GetElementValueByAttribute(acceptButton, "class", "Accept Offers button");
            var value = attribute.toString();
            if(value.includes("disabled")){
                throw new Error("Accept Offers button was disabled");
            }

            // Click Accept Offers.
            await this.ClickElement(acceptButton, "Accept Offers button");
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

    // This will click Cancel Offers.
    async ClickCancelOffers(){
        try{
            // Click Cancel Offers.
            await this.Click(this.btn_Cancel, "Cancel button");
    
            // Wait for cancel modal to be displayed.
            await this.WaitForElement(this.modal_CancelOffer, "Cancel Offer modal");
    
            // Capture Cancel Offer prompt.
            await this.ScreenShot("Cancel Offer Prompt");
    
            // Click Proceed button.
            await this.Click(this.btn_ProceedCancel, "Proceed Cancel button");
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

    // This will click Cancel Offers.
    async ClickSkipOffers(){
        try{
            // Click Cancel Offers.
            await this.Click(this.btn_SkipOffers, "Skip Offers button");
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

    // Step: This will select any offers from the view offers modal.
    async SelectAndProcessOfferFromViewOffersModalAfterGuestIsAssigned(accomDetails: AccommodationDetails,
    guestDetails: CustomerDetails, processType: string, offerType: string = "", processAcceptOfferType: string=""){
        try{
            // Set variable for offer type.
            var typeofOffer: string[] = [];
            var setProcessOfferType: string[] = [];
            if(offerType.includes('|')){
                typeofOffer = offerType.split('|');
                setProcessOfferType = processAcceptOfferType.split('|');
            }
            else{
                if(accomDetails.BookingCount > 1){
                    for(var x1=0; x1<accomDetails.BookingCount; x1++){
                        typeofOffer.push(offerType);
                        setProcessOfferType.push(processAcceptOfferType);
                    }
                }
                else{
                    typeofOffer.push(offerType);
                    setProcessOfferType.push(processAcceptOfferType);
                }
            }

            // Set variables to assign details for offer.
            var setOfferName: any[] = [];
            var setRequirement: any[] = [];
            var setDiscountDay: any[] = [];
            var setRate: any[] = [];
            var isOfferLess: any[] = [];
            var processTypes: any[] = [];
            var offerName="", requirement="", discountDay="", rate="";
            var offerDetails: any;
            
            // Set variables to assign updated details for accommodation.
            var accommodationName:any[] = [], checkInDate:any[] = [], checkOutDate:any[] = [];
            var adult:any[] = [], child:any[] = [], infant:any[] = [], price:any[] = [];
            var assignedRoom:any[] = [], night:any[] = [], tier:any[] = [], setOriginalRate: any[] = [];  
            var totalBalance = "0.00";
            var bookingDetails: any;
            var multiplier = 0;
            for(var i = 0; i < accomDetails.BookingCount; i++){
                if(guestDetails.IsUpsell[i]){
                    multiplier++;
                }
            }

            for(var i=0;i<accomDetails.BookingCount; i++){
                // Verify accommodation details.
                await this.VerifyAccommodationDetails(accomDetails, i);

                // Get the original quoted price.
                var originalRate = accomDetails.Price[i];

                // Get the offer details.
                var offerNames = await this.FindElements(this.lbl_OfferName, "Offer Names");
                var requirements = await this.FindElements(this.lbl_Requirement, "Requirements");
                var discountDays = await this.FindElements(this.lbl_DiscountDays, "Discount Days", "All");
                var rates = await this.FindElements(this.lbl_Rate, "Rates");

                // Get all process types.
                processTypes.push(processType);

                // Select available active offer.
                var selectedIndex = await this.SelectActiveOffer(typeofOffer[i]);

                // Capture Selected offer
                await this.ScreenShot("Selected Offer");

                // Get offer details.
                var offerName = await this.GetLiveElementText(offerNames[selectedIndex], "Selected Offer Name");
                var requirement = await this.GetLiveElementText(requirements[selectedIndex], "Selected Requirement");
                var discountDay = await this.GetLiveElementText(discountDays[selectedIndex], "Selected Discount Day");
                var initialRate = await this.GetLiveElementText(rates[selectedIndex], "Selected Rate");
                var rate = initialRate.replace('$','').replace(',','').trim();

                // Get the discount price.
                var discountPrice = (parseFloat(originalRate) - parseFloat(rate)).toFixed(2);

                // This will click Accept Offer if the offer type is 'Accept Offer'.
                if(processType.toLowerCase().trim()=="accept offers"){
                    await this.ClickAcceptOffers();

                    // Verify Price Warning modal.
                    await this.WaitForElement(this.modal_PriceWarning, "Price Warning Modal");

                    // Capture Price Warning Modal.
                    await this.ScreenShot("Price Warning Modal");

                    // Verify if promo rate is less than membership discount.
                    if(parseFloat(discountPrice) < parseFloat(originalRate)){
                        isOfferLess.push(false);

                        // Click keep/apply offer.
                        if(setProcessOfferType[i].toLowerCase().trim()=="keep"){
                            await this.Click(this.btn_KeepOffer, "Keep Offer button");

                            // Set offer data.
                            setOfferName.push(offerName);
                            setRequirement.push(requirement);
                            setDiscountDay.push(discountDay);
                            setRate.push(rate);
                        }
                        else{
                            await this.Click(this.btn_ApplyGdayPricing, "Apply GDay Pricing button");
                            offerName = "";
                            requirement = "";
                            discountDay = "";
                            rate = accomDetails.Price[i];

                            // Set offer data.
                            setOfferName.push("");
                            setRequirement.push("");
                            setDiscountDay.push("");
                            setRate.push("");
                        }

                        // Set accommodation data.
                        accommodationName.push(accomDetails.AccommodationName[i]);
                        checkInDate.push(accomDetails.CheckInDate[i]);
                        checkOutDate.push(accomDetails.CheckOutDate[i]);
                        adult.push(accomDetails.Adult[i]);
                        child.push(accomDetails.Child[i]);
                        infant.push(accomDetails.Infant[i]);
                        price.push(rate);
                        night.push(accomDetails.Night[i]);
                        assignedRoom.push(accomDetails.AssignedRoom[i]);
                        tier.push(accomDetails.RewardsTier[i]);
                        totalBalance = (parseFloat(totalBalance) + parseFloat(rate)).toFixed(2);
                        setOriginalRate.push(originalRate);
                    }
                    else{
                        throw new Error("Selected offer " + offerName + " amount is better than GDay Pricing.");
                    }
                }
                else if(processType.toLowerCase().trim()=="skip offers"){
                    // Click Skip Offers.
                    await this.ClickSkipOffers();

                    // Set offer data.
                    setOfferName.push("");
                    setRequirement.push("");
                    setDiscountDay.push("");
                    setRate.push("");
                    isOfferLess.push(false);

                    // Set accommodation data.
                    accommodationName.push(accomDetails.AccommodationName[i]);
                    checkInDate.push(accomDetails.CheckInDate[i]);
                    checkOutDate.push(accomDetails.CheckOutDate[i]);
                    adult.push(accomDetails.Adult[i]);
                    child.push(accomDetails.Child[i]);
                    infant.push(accomDetails.Infant[i]);
                    price.push(accomDetails.Price[i]);
                    night.push(accomDetails.Night[i]);
                    assignedRoom.push(accomDetails.AssignedRoom[i]);
                    tier.push(accomDetails.RewardsTier[i]);
                    totalBalance = (parseFloat(totalBalance) + parseFloat(accomDetails.Price[i])).toFixed(2);
                }
            }

            if(processType.toLowerCase().trim()!="cancel"){
                // Set offer details.
                var setOffers = [setOfferName, setRequirement, setDiscountDay, setRate, isOfferLess, processTypes];
                offerDetails = await this.dataSetup.SetOfferDetails(setOffers);
                
                // Add membership to total balance.
                if(multiplier > 0){
                    var membershipFee = parseFloat(MembershipFee) * multiplier;
                    totalBalance = (parseFloat(totalBalance) + membershipFee).toFixed(2);
                }

                // Set new accommodation details.
                var newAccommodationDetails = [accomDetails.BookingCount, accommodationName, checkInDate, checkOutDate,
                    adult, child, infant, price, night, assignedRoom, totalBalance, tier, setOriginalRate];
                bookingDetails = await this.dataSetup.SetBookingsDataAfterOffersWereMade(newAccommodationDetails);
            }
            else{
                // Set offer data.
                setOfferName.push("");
                setRequirement.push("");
                setDiscountDay.push("");
                setRate.push("");
                isOfferLess.push(false);
                
                // Click Cancel Offers.
                await this.ClickCancelOffers();
                
                // Set the same accommodationDetails.
                bookingDetails = accomDetails;

                // Set offer details.
                var setOffers = [setOfferName, setRequirement, setDiscountDay, setRate, isOfferLess, processTypes];
                offerDetails = await this.dataSetup.SetOfferDetails(setOffers);
            }

            // Add wait time to reload new quote before validating.
            await this.Sleep(5000);
            return [offerDetails, bookingDetails];
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