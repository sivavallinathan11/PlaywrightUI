import { Page, errors } from "@playwright/test";
import { AccommodationDetails, CustomerDetails, OfferDetails } from "../data/bookings";
import { DataSetup } from "../data/datasetup";
import { TestDirectory } from "../data/directory";
import { ExistingGuestSearch, MembershipDiscount, MembershipFee, TestingEnvironment, URL } from "../data/users";
import { Common } from "./Common";
import { EditBookingModal } from "./EditBookingModal";
import { EditBookingPage} from "./EditBookingPage";

export class BookingPage extends Common{
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
    // Form.
    public form_NewReservation = "#new-reservation-form";
    public form_GuestCount = "//div[@class='gr-select-guests-input-container']";
    public form_Filters = "//*[@class='gr-filter-accommodation-options']";

    // Dropdown field.
    public drp_DateRange = "#gr-search-date-input";
    public drp_Guest = "#gr-guests";
    public drp_PriceSort = "#sort-text";

    // Label.
    public lbl_LeftCalendarMonth = "//div[@class='drp-calendar left']//th[@class='month']";
    public lbl_RightCalendarMonth = "//div[@class='drp-calendar right']//th[@class='month']";
    public lbl_GuestFieldName = "//label[@for='nr-guests']";
    public lbl_BookingAdded = "//button[@class='add-booking inactive' and contains(.,'Booking Added')]";
    public lbl_AccommodationName = "//tbody[@id='available-accommodation-result-container']/tr//p[@class='title']";
    public lbl_AccommodationPrice = "//tbody[@id='available-accommodation-result-container']/tr//p[@class='cost']";
    public lbl_AccommodationNight = "//tbody[@id='available-accommodation-result-container']/tr//p[@class='nights']";
    public lbl_SelectedAccommodationName = "//div[@class='nr-booking-entry']/div[contains(@id, 'edit-booking-cta')]//p[@class='cabin']";
    public lbl_ReservationDate = "//div[@class='nr-booking-entry']//span[@class='icon-calendar']";
    public lbl_GuestQuotePrice = "//div[@class='nr-booking-entry']//*[contains(@id, 'selected-accommodation-pricing')]//span[@class='quote-price']";
    public lbl_MemberQuotePrice = "//div[@class='nr-booking-entry']//*[contains(@id, 'selected-accommodation-member-pricing')]//span[@class='quote-price']";
    public lbl_QouteTotal = "#quote-price-total";
    public lbl_AssignedGuestName = "//div[@class='nr-booking-entry']//span[contains(@class,'icon-user')]";
    public lbl_AdultCount = "#gr-adultcount";
    public lbl_ChildCount = "#gr-childcount";
    public lbl_InfantCount = "#gr-infantcount";
    public lbl_PriceSortValue = "//*[@id='sort-text']/span";
    public lbl_MembershipFee = "//*[@id='payment-breakdown']/div/div[contains(., 'Membership fee')]/following-sibling::div/span";
    public lbl_HiddenReservationID = "//*[@class='nr-booking-entry']//*[@id='reservation-id']";
    public lbl_AvailableRooms = "#cabins-available";

    // Button.
    public btn_LeftCalendarDays = "//div[@class='drp-calendar left']//td[contains(@class, 'available') and not(contains(@class, 'off'))]";
    public btn_RightCalendarDays = "//div[@class='drp-calendar right']//td[contains(@class, 'available') and not(contains(@class, 'off'))]";
    public btn_NextMonth = "//th[@class='next available']";
    public btn_ConfirmDateRange = "//div[contains(@class, 'daterangepicker ltr show-calendar opensright')]//button[text()='Confirm']";
    public btn_AddAdult = "//div[@class='gr-select-guests-section guest-adults']/div/button/i[@class='fas fa-plus']";
    public btn_AddChild = "//div[@class='gr-select-guests-section guest-children']/div/button/i[@class='fas fa-plus']";
    public btn_AddInfant = "//div[@class='gr-select-guests-section guest-infants']/div/button/i[@class='fas fa-plus']";
    public btn_LessAdult = "//div[@class='gr-select-guests-section guest-adults']/div/button/i[@class='fas fa-minus']";
    public btn_LessChild = "//div[@class='gr-select-guests-section guest-children']/div/button/i[@class='fas fa-minus']";
    public btn_LessInfant = "//div[@class='gr-select-guests-section guest-infants']/div/button/i[@class='fas fa-minus']";
    public btn_Search = "#search-accommodation";
    public btn_AddBooking = "//tbody[@id='available-accommodation-result-container']/tr//button[@class='add-booking']";
    public btn_ConfirmBooking = "#confirm-booking";
    public btn_EditBooking = "//button[contains(@id, 'edit-booking-cta')]";
    public btn_ViewOffers = "#view-offer";

    // list.
    public list_Accommodation = "//tbody[@id='available-accommodation-result-container']/tr";
    public list_SelectItems = "//div[@class='nr-booking-entry']/div[contains(@id, 'edit-booking-cta')]";
    public list_PriceSort = "//*[@id='sort-dropdown']/li/a";

    // tool tip
    public toolTip_ConfirmBooking = "//div[@class='tooltip fade top in']/div[@class='tooltip-inner']";

    // icon.
    public icon_AssignGuestWarning = "//div[@class='nr-booking-entry']//span[@class='icon-warning' and contains(.,'Assign Guest')]";
    public icon_AddAccommodationSpineer = "//i[@class='fas fa-circle-notch fa-spin inactive']";
    public icon_Holder = "//p[@class='final-price']";
    public icon_Offer = "xpath=child::span[@class='icon-offer']";
    public icon_Calendar = "//div[@class='calendar-icon']";

    // toggle.
    public toggle_Filters = "#gr-filter-accommodation";

    // checkbox.
    public chk_Cabins = "#Data_IsCabins";
    public chk_Sites = "#Data_IsSites";
    public chk_PetFriendly = "#Data_IsPetFriendly";

    // Step: Navigate to Create New Bookings page.
    async Open(){
        try{
            if(TestingEnvironment.toLowerCase().trim()=="dev"){
                await this.GoTo(URL.DEV_NewReservation, "New Reservation Page");
            }
            else{
                await this.GoTo(URL.NewReservation, "New Reservation Page");
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

    // Step: This will verify new reservation page is displayed.
    async VerifyNewReservationPage(){
        try{
            await this.WaitForElement(this.form_NewReservation, "Searc Reservation Form");

            // Capture New Reservation page.
            await this.ScreenShot("New Reservation Page");
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

    // Step: Set reservation date range.
    async SetReservationDateRange(checkInDate: number, checkOutDate: number){
        try{
            // Get the Confirm Booking attribute.
            for(var i = 0; i < 10; i++){
                var element = await this.FindElement(this.btn_Search, "Search button");
                var value = await this.GetElementValueByAttribute(element, "class", "Search Booking");
        
                // Verify if the search button is disabled.
                if(value.includes("disabled")){
                    break;
                }
                await this.Sleep(1000);
            }

            // Click Date Range.
            await this.WaitForElement(this.icon_Calendar, "Calendar Icon");
            await this.Click(this.icon_Calendar, "Calendar Icon");

            // Select Check-in Date Month and Year.
            await this.SelectMonthAndYear(checkInDate, this.lbl_LeftCalendarMonth);

            // Select Check-in date.
            await this.SelectDate(checkInDate);

            // Select Check-out Date Month and Year.
            await this.SelectMonthAndYear(checkOutDate, this.lbl_LeftCalendarMonth);

            // Select Check-out date.
            await this.SelectDate(checkOutDate);

            // Capture Selected Dates.
            await this.ScreenShot("Selected Date Range");

            // Confirm set date range.
            await this.ClickConfirmDateRange();

            // Return formatted dates.
            // CheckIn
            var bookingdate = await this.ConvertToDate(checkInDate);
            var formattedCheckIn = await this.FormatDate(bookingdate.toISOString(), "ddmmyy");

            // CheckOut
            var bookingdate = await this.ConvertToDate(checkOutDate);
            var formattedCheckOut = await this.FormatDate(bookingdate.toISOString(), "ddmmyy");

            return [formattedCheckIn, formattedCheckOut];
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

    // Select reservation month and year.
    async SelectMonthAndYear(bookingDays: number, locator: string){
        // Format booking days to get the expected month and year.
        var bookingdate = await this.ConvertToDate(bookingDays);
        var expectedMonthYear = await this.FormatDate(bookingdate.toISOString(), "Month Year");

        var monthMatched = true;
        do{
            await this.WaitForElement(locator, "Calendar Month and Year");
            var actualMonthYear = await this.GetElementText(locator, "Calendar Month and Year");
            if(expectedMonthYear!=actualMonthYear){
                await this.Click(this.btn_NextMonth, "Next Month button");
                monthMatched = false;
            }
            else{
                monthMatched = true;
            }
        }while(!monthMatched);
    }

    // Select reservation date.
    async SelectDate(bookingDays: number){
        // Select date.
        var bookingDate = await this.ConvertToDate(bookingDays);
        var expectedDay = bookingDate.getDate().toString();

        // Get list of available date in from the left calendar
        var dates = await this.FindElements(this.btn_LeftCalendarDays, "Available Dates");
        var dateCount = dates.length;

        // Select date based on expected input date.
        var select = false;
        for(var i = 0; i<dateCount; i++){
            var day = await this.GetLiveElementText(dates[i], "Selected Date");
            if(day==expectedDay){
                await this.ClickElement(dates[i], "Selected Date");
                select = true;
                break;
            }
        }

        // Return error when expected date range was not available.
        if(!select){
            var fullExpectedDate = await this.FormatDate(bookingDate.toString(), "Full Date");
            throw new Error("Unable to select date for " + fullExpectedDate);
        }
        
    }

    // Click Confirm Date Range button.
    async ClickConfirmDateRange(){
        await this.Click(this.btn_ConfirmDateRange, "Confirm date range button");
    }

    // Step: Set number of dates.
    async SetNumberOfGuests(adult: number, child: number, infant: number){
        try{
            // Click guests dropdown field.
            await this.Click(this.drp_Guest, "Guest dropdown field");

            // Get the default guest count.
            await this.WaitForElement(this.form_GuestCount, "Guest Form");
            var adultCount = await this.GetElementTextviaHTML(this.lbl_AdultCount, "Adult Count");
            var childCount = await this.GetElementTextviaHTML(this.lbl_ChildCount, "Child Count");
            var infantCount = await this.GetElementTextviaHTML(this.lbl_InfantCount, "Infant Count");
            var addAdult = 0, addChild = 0, addInfant = 0;
            var lessAdult = 0, lessChild = 0, lessInfant = 0;

            // Add or reduce adult.
            if(parseInt(adultCount) <= adult){
                addAdult = adult - parseInt(adultCount);
                for(var i=1; i<=addAdult; i++){
                    await this.Click(this.btn_AddAdult, "Add adult");
                }
            }
            else{
                if(parseInt(adultCount) > 1){
                    lessAdult = parseInt(adultCount) - adult;
                    for(var i=1; i<=lessAdult; i++){
                        await this.Click(this.btn_LessAdult, "Less adult");
                    }
                }
            }

            // Add or reduce child.
            if(parseInt(childCount) <= child){
                addChild = child - parseInt(childCount);
                for(var i=1; i<=addChild; i++){
                    await this.Click(this.btn_AddChild, "Add child");
                }
            }
            else{
                if(parseInt(childCount) > 0){
                    lessChild = parseInt(childCount) - child;
                    for(var i=1; i<=lessChild; i++){
                        await this.Click(this.btn_LessChild, "Less child");
                    }
                }
            }

            // Add or reduce infant.
            if(parseInt(infantCount) <= infant){
                var addInfant = infant - parseInt(infantCount);
                for(var i=1; i<=addInfant; i++){
                    await this.Click(this.btn_AddInfant, "Add infant");
                }
            }
            else{
                if(parseInt(infantCount) > 0){
                    lessInfant = parseInt(infantCount) - infant;
                    for(var i=1; i<=lessInfant; i++){
                        await this.Click(this.btn_LessInfant, "Less infant");
                    }
                }
            }

            // Capture entered value on guest.
            await this.ScreenShot("Input guest count");
    
            // Click on guest dropdown label to close the guest form
            await this.Click(this.lbl_GuestFieldName, "Guest field name");

            // Return guest count.
            return [adult, child, infant]; 
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

    // Step: Click Search button.
    async ClickSearch(){
        try{
            await this.WaitForElement(this.btn_Search, "Search button");
            await this.Click(this.btn_Search, "Search button");
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

    // Step: Verify Searh Result.
    async VerifySearchResult(){
        try{
            await this.ScreenShot("Search Result");
            await this.WaitForElement(this.list_Accommodation, "Accommodation list");
            await this.WaitForElement(this.btn_AddBooking, "Add Booking button");
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

    // Step: Select Specific Accommodation.
    async SelectSpecificAccommodation(accommodationType: string, parkDetails: any, accommodationName = "", 
    hasMultipleRoom: boolean = false){
        try{
            // Get list of accommodation name.
            await this.WaitForElement(this.lbl_AccommodationName, "Accommodation names");
            var list = await this.FindElements(this.lbl_AccommodationName, "Accommodation names");

            // Get the list of accommodation's number of available rooms.
            var listOfAvailableRooms = await this.FindElements(this.lbl_AvailableRooms, "Available room count");
            
            // Capture list of reservation.
            await this.ScreenShot("List of Accommodation");

            // Select specific acccommodation.
            var index = 0;
            var availablility = false;
            var actualName = "";
            var cdn_AccommodationName = "";
            for(var i = 0; i < list.length; i++){
                actualName = await this.GetLiveElementText(list[i],  "Accommodation name");
                if(accommodationName==""){
                    for(var x=0; x< parkDetails.length; x++){
                        cdn_AccommodationName = parkDetails[x]["accommodation"]["content"]["displayName"];
                        var typeId = parkDetails[x]["accommodation"]["content"]["typeId"];
                        if(actualName.trim()==cdn_AccommodationName.trim() && !actualName.toLowerCase().includes("kristy awesome")){
                            if(accommodationType.toLowerCase().trim()=="site"){
                                /*if(typeId==2){
                                    console.log("Selected Accommodation: " + actualName);
                                    availablility = true;
                                    break;
                                }*/
                                if(!hasMultipleRoom){
                                    console.log("Selected Accommodation: " + actualName);
                                    availablility = true;
                                    break;
                                }
                                else{
                                    var initialCount = await this.GetLiveElementText(listOfAvailableRooms[i], 
                                        actualName + "'s Available Room");
                                    var roomCount = initialCount.replace("Available", "").trim();
                                    console.log("S" + roomCount + "S");
                                    if(parseInt(roomCount) > 1){
                                        console.log("Selected Accommodation: " + actualName);
                                        availablility = true;
                                        break;
                                    }
                                }
                            }
                            else{
                                if(typeId==1 || typeId==0){
                                    availablility = true;
                                    break;
                                }
                            }
                        }
                    }
                }
                else{
                    if(accommodationName.trim()==actualName.trim()){
                        availablility = true;
                    }
                }
                if(availablility){
                    index = i;
                    break;
                }
            }

            if(availablility){
                // Get selected accommodation price.
                var prices = await this.FindElements(this.lbl_AccommodationPrice, "List of Accommodation Price");
                var initialPrice = await this.GetLiveElementText(prices[index], "Selected Accommodation Price");
                var price = initialPrice.replace('$', '').replace("total", "").replace(',','').trim();
    
                // Get selected accommodation night.
                var nights = await this.FindElements(this.lbl_AccommodationNight, "List of Accommodation Night");
                var initialNight = await this.GetLiveElementText(nights[index], "Selected Accommodation Night");
                var night = initialNight.split(' ')[0];
    
                // Click specific add booking button.
                var buttons = await this.FindElements(this.btn_AddBooking, "Add Booking buttons");
                await this.ClickElement(buttons[index], "Add booking button");

                // This will wait for the notification that booking is added.
                if(!await this.ElementExist(this.lbl_BookingAdded, 60000)){
                    await this.Sleep(30000);
                    await this.ClickElement(buttons[index], "Add booking button");
                    
                    await this.WaitForElement(this.lbl_BookingAdded,"Booking Added notification for " + actualName);
                    await this.WaitForElementToBeHidden(this.lbl_BookingAdded);
                }
                else{
                    await this.WaitForElementToBeHidden(this.lbl_BookingAdded);
                }
            }
            else{
                if(accommodationType.toLowerCase().trim()=="site"){
                    throw new Error("No available sites for booking.");
                }
                else{
                    throw new Error("No available cabins for booking.");
                }
            }

            return [actualName, parseFloat(price).toFixed(2), night];
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

    // Step: Select Specific Accommodation.
    async SelectRandomAccommodation(hasMultipleRoom: boolean = false){
        try{
            // Get list of accommodation name.
            await this.WaitForElement(this.lbl_AccommodationName, "Accommodation names");
            var list = await this.FindElements(this.lbl_AccommodationName, "Accommodation names");

            // Get the list of accommodation's number of available rooms.
            var listOfAvailableRooms = await this.FindElements(this.lbl_AvailableRooms, "Available room count");
            
            // Capture list of reservation.
            await this.ScreenShot("List of Accommodation");

            // Get random index from list of acccommodation.
            var index = 0;
            var actualName: any;
            if(hasMultipleRoom){
                // Get only accommodation with more than 1 available room.
                var setAccommodations: any[] = [];
                for(var i=0; i<list.length; i++){
                    actualName = await this.GetLiveElementText(list[i],  "Accommodation name");
                    var initialCount = await this.GetLiveElementText(listOfAvailableRooms[i], 
                        actualName + "'s Available Room");
                    var roomCount = initialCount.replace("Available", "").trim();
                    if(parseInt(roomCount) > 2 && !actualName.toLowerCase().includes("kristy awesome")){
                        console.log("Selected Accommodation: " + actualName);
                        setAccommodations.push(i);
                    }
                }
                var randomIndex = Math.floor(Math.random() * setAccommodations.length);
                index = setAccommodations[randomIndex];
                actualName = await this.GetLiveElementText(list[index],  "Accommodation name");

            }
            else{
                for(var i = 0; i < list.length; i++){
                    index = Math.floor(Math.random() * list.length);
                    actualName = await this.GetLiveElementText(list[index],  "Accommodation name");
                    if(!actualName.toLowerCase().includes("kristy awesome")){
                        break;
                    }
                    else{
                        index++;
                    }
                }
            }

            // Get selected accommodation price.
            var prices = await this.FindElements(this.lbl_AccommodationPrice, "List of Accommodation Price");
            var initialPrice = await this.GetLiveElementText(prices[index], "Selected Accommodation Price");
            var price = initialPrice.replace('$', '').replace("total", "").replace(',','').trim();

            // Get selected accommodation night.
            var nights = await this.FindElements(this.lbl_AccommodationNight, "List of Accommodation Night");
            var initialNight = await this.GetLiveElementText(nights[index], "Selected Accommodation Night");
            var night = initialNight.split(' ')[0];

            // Click specific add booking button.
            var buttons = await this.FindElements(this.btn_AddBooking, "Add Booking buttons");
            await this.ClickElement(buttons[index], "Add booking button");

            // This will wait for the notification that booking is added.
            if(!await this.ElementExist(this.lbl_BookingAdded, 90000)){
                await this.Sleep(60000);
                await this.ClickElement(buttons[index], "Add booking button");
                
                await this.WaitForElement(this.lbl_BookingAdded,"Booking Added notification");
                await this.WaitForElementToBeHidden(this.lbl_BookingAdded);
            }
            else{
                await this.WaitForElementToBeHidden(this.lbl_BookingAdded);
            }

            return [actualName, parseFloat(price).toFixed(2), night];
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

    // Step: Verify added accommodation.
    async VerifyAddedAccommodationDetails(details: AccommodationDetails){
        try{
            // Set variable for expected total.
            var expectedTotal = "0.00";

            // Wait for the list of added accommodation displayed.
            await this.WaitForElement(this.list_SelectItems, "List of Added Accommodation");

            // Validate list of accommodation details.
            var list = await this.FindElements(this.list_SelectItems, "List of Added Accommodations");
            var warnings = await this.FindElements(this.icon_AssignGuestWarning, "Assigned Guest Warnings");
            if(list.length!=details.BookingCount || warnings.length!= details.BookingCount){
                throw new Error("Expected booking count did NOT matched the added accommodation.");
            }
            for(var i = 0; i < list.length; i++){
                var names = await this.FindElements(this.lbl_SelectedAccommodationName, "Selected Accommodation Names")
                var name = await this.GetLiveElementText(names[i], "Selected Accommodation Name");
                var reservationDates = await this.FindElements(this.lbl_ReservationDate, "List of Reservation Dates");
                var reservationDate = await this.GetLiveElementText(reservationDates[i], "Reservation Date");
                var prices = await this.FindElements(this.lbl_GuestQuotePrice, "List of QuotedPrice")
                var initialPrice = await this.GetLiveElementText(prices[i], "Quoted Price");
                var price = initialPrice.replace(',','');

                // Check if accommodation name matched.
                if(name!=details.AccommodationName[i]){
                    throw new Error("Selected Accommodation name did NOT matched.\nExpected: " + details.AccommodationName[i] + 
                    "\nActual: " + name);
                }

                // Check if reservation date matched.
                var expectedDate = details.CheckInDate[i] + " - " + details.CheckOutDate[i];
                if(reservationDate!=expectedDate){
                    throw new Error("Reservation date did NOT matched.\nExpected: " + expectedDate + 
                    "\nActual: " + reservationDate);
                }

                // Check if reservation price matched.
                if(price!=details.Price[i]){
                    throw new Error("Reservation price did NOT matched.\nExpected: " + details.Price[i] + 
                    "\nActual: " + price);
                }

                // Get the expected total.
                expectedTotal = (parseFloat(expectedTotal) + parseFloat(details.Price[i])).toFixed(2);
            }

            // Check if quote total matched.
            var quoteTotal = await this.GetElementText(this.lbl_QouteTotal, "Quote Total");
            var quoteTotal = quoteTotal.replace(",", "");
            if(quoteTotal!=expectedTotal){
                throw new Error("Reservation quote total did NOT matched.\nExpected: " + expectedTotal + 
                "\nActual: " + quoteTotal);
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

    // Step: Verify Confirm button is disabled.
    async VerifyConfirmButtonIsDisabled(){
        try{
            // Set expected message.
            var expectedMessage = "Must assign a guest to the first booking";

            // Get the Confirm Booking attribute.
            var element = await this.FindElement(this.btn_ConfirmBooking, "Confirm Booking");
            var value = await this.GetElementValueByAttribute(element, "class", "Confirm Booking");

            // Verify if the confirm booking button is disabled and check the hover message.
            if(!value.includes("disabled")){
                throw new Error("Confirm Booking button was NOT disabled.");
            }
            else{
                await this.ElementHover(this.btn_ConfirmBooking, "Confirm Button");
                await this.ScreenShot("Confirm Booking Hover");
                var hoverMessage = await this.GetElementText(this.toolTip_ConfirmBooking, "Confirm button hover message");

                if(hoverMessage!=expectedMessage){
                    throw new Error("Expected on hover message did NOT matched.\nExpected: " + expectedMessage +
                    "\nActual: " + hoverMessage);
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

    // Step: Setup data for guest.
    async SetGuestDetails(customer: any, IsMember: boolean){
        if(!IsMember){
            var firstName = customer.firstName + await this.GenerateRandomString("Alphanumeric", 8);
            var lastName = customer.lastName + await this.GenerateRandomString("Alphanumeric", 8);
            var email = await this.GenerateRandomEmail(customer.firstName, "@gmail.com", "Alphanumeric", 8);
            var details = [customer.searchText, firstName, lastName, email, customer.mobile, 
                customer.street, customer.town, customer.state, customer.postcode, customer.country];
            return await this.dataSetup.SetCustomerData(details);
        }
        else{
            var firstName = await this.GenerateRandomString(customer.firstName, 8);
            var lastName = await this.GenerateRandomString(customer.lastName, 8);
            var email = await this.GenerateRandomEmail(customer.firstName, "@gmail.com", "Alphanumeric", 8);
            var details = [customer.searchText, firstName, lastName, email, customer.mobile, 
                customer.street, customer.town, customer.state, customer.postcode, customer.country];
            return await this.dataSetup.SetCustomerData(details);
        }
    }

    // Step: This will verify the updated booking overview.
    async VerifyUpdatedBookingOverview(details: CustomerDetails, accomDetails: AccommodationDetails){
        try{
            // Get the accommodation detalils.
            var actualAccommodationNames = await this.FindElements(this.lbl_SelectedAccommodationName, "Selected Accommodation Names")
            var reservationDates = await this.FindElements(this.lbl_ReservationDate, "List of Reservation Dates");
            var prices: any[];
                
            // Wait for the assigned guest to be displayed.
            await this.WaitForElement(this.lbl_AssignedGuestName, "Assigned Guest Name");

            // Verify accommodation details.
            var expectedQuoteTotal = "0.00";
            for(var i = 0; i < details.BookingCount; i++){

                // **SUBJECT FOR CHANGE** Get the initial price.
                if(details.isMember[i]){
                    if(TestingEnvironment.toLowerCase().trim()=="test"){
                        prices = await this.FindElements(this.lbl_GuestQuotePrice, "Member Quoted Price", "all");
                    }
                    else{
                        prices = await this.FindElements(this.lbl_GuestQuotePrice, "Member Quoted Price", "all");
                    }
                }
                else{
                    prices = await this.FindElements(this.lbl_GuestQuotePrice, "Guest Quoted Price", "all");
                }
                
                // Get assigned guest first name.
                var assignedGuestNames = await this.FindElements(this.lbl_AssignedGuestName, "Assigned Guest Names");
            
                // Capture Updated Booking Overview.
                await this.ScreenShot("Updated Booking Overview");
                
                // Verify assigned guest name.
                var assignedGuestName = await this.GetLiveElementText(assignedGuestNames[i], "Assigned Guest Name"); 
                if(assignedGuestName!=details.FirstName[i]){
                    throw new Error("Expected assigned guest name did NOT matched.\nExpected: " + details.FirstName[i] + 
                    "\nActual: " + assignedGuestName);
                }

                // Check if accommodation name matched.
                var actualAccommodationName = await this.GetLiveElementText(actualAccommodationNames[i], "Selected Accommodation Name");
                if(actualAccommodationName!=accomDetails.AccommodationName[i]){
                    throw new Error("Selected Accommodation name did NOT matched.\nExpected: " + accomDetails.AccommodationName[i] + 
                    "\nActual: " + actualAccommodationName);
                }

                // Check if reservation date matched.
                var reservationDate = await this.GetLiveElementText(reservationDates[i], "Reservation Date");
                var expectedDate = accomDetails.CheckInDate[i] + " - " + accomDetails.CheckOutDate[i];
                if(reservationDate!=expectedDate){
                    throw new Error("Reservation date did NOT matched.\nExpected: " + expectedDate + 
                    "\nActual: " + reservationDate);
                }

                // Check if reservation price matched.
                var initialPrice = await this.GetLiveElementText(prices[i], "Quoted Price");
                var price = initialPrice.replace(',','');
                var expectedPriceDiff: any;
                if(parseFloat(price) > parseFloat(accomDetails.Price[i])){
                    expectedPriceDiff = (parseFloat(price) - parseFloat(accomDetails.Price[i])).toFixed(2);
                    if(expectedPriceDiff > 0.01){
                        throw new Error("Reservation price did NOT matched.\nExpected: " + 
                        accomDetails.Price[i] + "\nActual: " + price);
                    }
                }
                else{
                    expectedPriceDiff = (parseFloat(accomDetails.Price[i]) - parseFloat(price)).toFixed(2);
                    if(expectedPriceDiff > 0.01){
                        throw new Error("Reservation price did NOT matched.\nExpected: " + 
                        accomDetails.Price[i] + "\nActual: " + price);
                    }
                }
                // Get the actual discounted price.
                accomDetails.Price[i] = price;

                // Compute expected quote total.
                expectedQuoteTotal = (parseFloat(expectedQuoteTotal) + parseFloat(price)).toFixed(2);
            }

            // Get the quote total and verify against expected.
            var actualQuoteTotal = await this.GetElementText(this.lbl_QouteTotal, "Quote Total");
            var actualQuoteTotal = actualQuoteTotal.replace(",", "").trim();
            if(actualQuoteTotal!=expectedQuoteTotal){
                throw new Error("Expected quote total did NOT matched.\nExpected: " + expectedQuoteTotal +
                "\nActual: " + actualQuoteTotal);
            }
        
            // Verify Continue Booking is not disabled.
            // Get the Confirm Booking attribute.
            var element = await this.FindElement(this.btn_ConfirmBooking, "Confirm Booking");
            var value = await this.GetElementValueByAttribute(element, "class", "Confirm Booking");
    
            // Verify if the confirm booking button is disabled and check the hover message.
            if(value.includes("disabled")){
                throw new Error("Confirm Booking button was disabled.");
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

    // Step: This will click the Confirm Booking button.
    async ClickConfirmBooking(){
        try{
            await this.Click(this.btn_ConfirmBooking, "Confirm Booking button");
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

    // Step: Create Booking based on the following parameters (Customer Details, Booking Count, Type of Accommodation).
    async CreateBookingReservation(details: any, bookingCount: number, accommType: string, parkDetails: any){
        try{
            // Get group booking details.
            var count = 0;
            var accommodationNames="", checkIn="", checkOut="", adult="", child="";
            var infant="", price="", night="";

            // Set variable for accommodation details.
            var accommodationName = "";
            var accommodationType ="";

            // Iteration for single/multiple reservation.
            for(var i = 0; i < bookingCount; i++){
                //set new iteration.
                count = i;
                
                // Select date range for a specific reservation.
                if(bookingCount > 1){
                    if(details.sameDate){
                        if(i > 0){
                            await this.Sleep(60000);
                        }
                        var reserveDates = await this.SetReservationDateRange(details.arrival, details.departure);
                    }
                    else{
                        var reserveDates = await this.SetReservationDateRange(details.arrival + count, details.departure + count);
                    }
                }
                else{
                    await this.Sleep(10000);
                    var reserveDates = await this.SetReservationDateRange(details.arrival, details.departure);
                }

                // Select number of guest for a specific reservation.
                var guestCount = await this.SetNumberOfGuests(details.adults, details.child, details.infant);

                // Click search.
                await this.ClickSearch();

                // Verify search accommodation result.
                await this.VerifySearchResult();

                // Set random/specific accommodation type.
                var accomInfo: any;
                
                // Set accommodation type.
                accommodationType = accommType;

                // Select specific reservation.
                if(bookingCount > 1){
                    if(!details.sameAccommodation){
                        if(accommType.toLowerCase().trim()=="random"){
                            accomInfo = await this.SelectRandomAccommodation(true);
                        }
                        else{
                            accomInfo = await this.SelectSpecificAccommodation(accommodationType, parkDetails, "", true);
                        }
                    }
                    else{
                        if(accommodationName!=""){
                            accomInfo = await this.SelectSpecificAccommodation(accommodationType, parkDetails, accommodationName);
                        }
                        else{
                            if(accommType.toLowerCase().trim()=="random"){
                                accomInfo = await this.SelectRandomAccommodation(true);
                                accommodationName = accomInfo[0];
                            }
                            else{
                                accomInfo = await this.SelectSpecificAccommodation(accommodationType, parkDetails, "", true);
                                accommodationName = accomInfo[0];
                            }
                        }
                    }
                }
                else{
                    if(accommType.toLowerCase().trim()=="random"){
                        accomInfo = await this.SelectRandomAccommodation();
                    }
                    else{
                        accomInfo = await this.SelectSpecificAccommodation(accommodationType, parkDetails);
                    }
                }

                // Save data information.
                if(i == bookingCount - 1){
                    accommodationNames = accommodationNames + accomInfo[0];
                    checkIn = checkIn + reserveDates[0];
                    checkOut = checkOut + reserveDates[1];
                    adult = adult + guestCount[0].toString();
                    child = child + guestCount[1].toString();
                    infant = infant + guestCount[2].toString();
                    price = price + accomInfo[1];
                    night = night + accomInfo[2];
                }
                else{
                    accommodationNames = accommodationNames + accomInfo[0] + "|";
                    checkIn = checkIn + reserveDates[0] + "|";
                    checkOut = checkOut + reserveDates[1] + "|";
                    adult = adult + guestCount[0].toString() + "|";
                    child = child + guestCount[1].toString() + "|";
                    infant = infant + guestCount[2].toString() + "|";
                    price = price + accomInfo[1] + "|";
                    night = night + accomInfo[2] + "|";
                }
            }
            
            // Setup group booking details.
            var customerDetails = [bookingCount, accommodationNames, checkIn, checkOut, adult, child, infant, price, night];
            return await this.dataSetup.SetBookingsData(customerDetails);
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

    // Step: Setup data for group.
    async SetCustomerDetails(customer: any, details: AccommodationDetails, upsellType: string= "All"){
        var firstName="", lastName="", memberId="", email="", searchText="", mobile="", street="";
        var town="", state="", postcode="", country="";
        var velocityNumber: any[] = [];
        var isVelocity: any[] = [];
        var isMember: any[] = [];
        var isUpsell: any[] = [];
        var emailExist: any[] = [];
        if(!customer.isMember){
            for(var i = 0; i < details.BookingCount; i++){
                if(i==details.BookingCount-1){
                    searchText = searchText + customer.searchText;
                    if(customer.email==""){
                        email = email + await this.GenerateRandomEmail(customer.firstName, "@gmail.com", "Alphanumeric", 8);
                        firstName = firstName + customer.firstName + await this.GenerateRandomString("Alphanumeric", 8);
                        lastName = lastName + customer.lastName + await this.GenerateRandomString("Alphanumeric", 8);
                        emailExist.push(false);
                    }
                    else{
                        if(i > 0){
                            email = email + await this.GenerateRandomEmail(customer.firstName, "@gmail.com", "Alphanumeric", 8);
                            firstName = firstName + customer.firstName + await this.GenerateRandomString("Alphanumeric", 8);
                            lastName = lastName + customer.lastName + await this.GenerateRandomString("Alphanumeric", 8);
                            emailExist.push(false);
                        }
                        else{
                            email = email + customer.email;
                            firstName = firstName + customer.firstName;
                            lastName = lastName + customer.lastName;
                            emailExist.push(true);
                        }
                    }
                    mobile = mobile + customer.mobile;
                    street = street + customer.street;
                    town = town + customer.town;
                    state = state + customer.state;
                    postcode = postcode + customer.postcode;
                    country = country + customer.country;
                    if(customer.isUpsell == false && upsellType.toLowerCase().trim()=="any" && i > 0){
                        isUpsell.push(true);
                    }
                    else{
                        isUpsell.push(customer.isUpsell);
                    }
                    isMember.push(customer.isMember);
                    isVelocity.push(false);
                    velocityNumber.push('');
                }
                else{
                    searchText = searchText + customer.searchText + "|";
                    if(customer.email==""){
                        email = email + await this.GenerateRandomEmail(customer.firstName, "@gmail.com", "Alphanumeric", 8) + "|";
                        firstName = firstName + customer.firstName + await this.GenerateRandomString("Alphanumeric", 8) + "|";
                        lastName = lastName + customer.lastName + await this.GenerateRandomString("Alphanumeric", 8) + "|";
                        emailExist.push(false);
                    }
                    else{
                        if(i > 0){
                            email = email + await this.GenerateRandomEmail(customer.firstName, "@gmail.com", "Alphanumeric", 8) + "|";
                            firstName = firstName + customer.firstName + await this.GenerateRandomString("Alphanumeric", 8) + "|";
                            lastName = lastName + customer.lastName + await this.GenerateRandomString("Alphanumeric", 8) + "|";
                            emailExist.push(false);
                        }
                        else{
                            firstName = firstName + customer.firstName + "|";
                            lastName = lastName + customer.lastName + "|";
                            email = email + customer.email + "|";
                            emailExist.push(true);
                        }
                    }
                    mobile = mobile + customer.mobile + "|";
                    street = street + customer.street + "|";
                    town = town + customer.town + "|";
                    state = state + customer.state + "|";
                    postcode = postcode + customer.postcode + "|";
                    country = country + customer.country + "|";
                    isMember.push(customer.isMember);
                    isUpsell.push(customer.isUpsell);
                    isVelocity.push(false);
                    velocityNumber.push('');
                }
            }
            var customerDetails = [details.BookingCount, searchText, firstName, lastName, email, mobile, street, 
                town, state, postcode, country, isMember, isUpsell, isVelocity, velocityNumber, emailExist];
            return await this.dataSetup.SetCustomerData(customerDetails);
        }
        else{
            for(var i = 0; i < details.BookingCount; i++){
                if(i==details.BookingCount-1){
                    if(!customer.firstName.includes('|')){
                        firstName = firstName + customer.firstName;
                        lastName = lastName + customer.lastName;
                        email = email + customer.email;
                        mobile = mobile + customer.mobile;
                        street = street + customer.street;
                        town = town + customer.town;
                        state = state + customer.state;
                        postcode = postcode + customer.postcode;
                        country = country + customer.country;
                        memberId = memberId + customer.membershipNumber;
                    }
                    else{
                        var fNames = customer.firstName.split('|');
                        var lNames = customer.lastName.split('|');
                        var emails = customer.email.split('|');
                        var mobiles = customer.mobile.split('|');
                        var streets = customer.street.split('|');
                        var towns = customer.town.split('|');
                        var states = customer.state.split('|');
                        var postcodes = customer.postcode.split('|');
                        var countries = customer.country.split('|');
                        var memId = customer.membershipNumber.split('|');

                        firstName = firstName + fNames[i];
                        lastName = lastName + lNames[i];
                        email = email + emails[i];
                        mobile = mobile + mobiles[i];
                        street = street + streets[i];
                        town = town + towns[i];
                        state = state + states[i];
                        postcode = postcode + postcodes[i];
                        country = country + countries[i];
                        memberId = memberId + memId[i];
                    }
                    if(customer.isVelocity && i==0){
                        isVelocity.push(true);
                        velocityNumber.push(customer.velocityNumber);
                    }
                    else{
                        isVelocity.push(false);
                        velocityNumber.push('');
                    }
                    isMember.push(customer.isMember);
                    isUpsell.push(customer.isUpsell);
                }
                else{
                    if(!customer.firstName.includes('|')){
                        firstName = firstName + customer.firstName + "|";
                        lastName = lastName + customer.lastName + "|";
                        email = email + customer.email + "|";
                        mobile = mobile + customer.mobile + "|";
                        street = street + customer.street + "|";
                        town = town + customer.town + "|";
                        state = state + customer.state + "|";
                        postcode = postcode + customer.postcode + "|";
                        country = country + customer.country + "|";
                        memberId = memberId + customer.membershipNumber + "|";
                    }
                    else{
                        var fNames = customer.firstName.split('|');
                        var lNames = customer.lastName.split('|');
                        var emails = customer.email.split('|');
                        var mobiles = customer.mobile.split('|');
                        var streets = customer.street.split('|');
                        var towns = customer.town.split('|');
                        var states = customer.state.split('|');
                        var postcodes = customer.postcode.split('|');
                        var countries = customer.country.split('|');
                        var memId = customer.membershipNumber.split('|');

                        firstName = firstName + fNames[i] + "|";
                        lastName = lastName + lNames[i] + "|";
                        email = email + emails[i] + "|";
                        mobile = mobile + mobiles[i] + "|";
                        street = street + streets[i] + "|";
                        town = town + towns[i] + "|";
                        state = state + states[i] + "|";
                        postcode = postcode + postcodes[i] + "|";
                        country = country + countries[i] + "|";
                        memberId = memberId + memId[i] + "|";
                    }
                    if(customer.isVelocity && i==0){
                        isVelocity.push(true);
                        velocityNumber.push(customer.velocityNumber);
                    }
                    else{
                        isVelocity.push(false);
                        velocityNumber.push('');
                    }
                    isMember.push(customer.isMember);
                    isUpsell.push(customer.isUpsell);
                }
            }
            var memberDetails = [details.BookingCount, memberId, firstName, lastName, email, mobile, street,
                town, state, postcode, country, isMember, isUpsell, isVelocity, velocityNumber];
            return await this.dataSetup.SetMemberData(memberDetails);
        }
    }

    // Step: This will assign guest with/without upsell.
    async EditSelectedBookingReservation(accomDetails: AccommodationDetails, guestDetails: 
        CustomerDetails){
        try{
            // Set variables to assign updated details.
            var accommodationName="", checkInDate="", checkOutDate="", adult="", child="", infant="";
            var price="",assignedRoom="", night="", tier=""; 

            // Set edit booking modal object.
            var edit = new EditBookingModal(this.page, this.dir);

            // Get list of edit booking button.
            var buttons = await this.FindElements(this.btn_EditBooking, "List of Edit Booking");
            if(buttons.length!=accomDetails.BookingCount){
                throw new Error("Expected number of customer to be edited was NOT matched.");
            }
            
            // Check if upsell/velocity is available.
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
            }

            // Click edit reservation for multiple/single accommodation.
            for(var i = 0; i < accomDetails.BookingCount; i++){
                // Click Selected Edit button.
                await this.WaitForElement(this.btn_EditBooking, "List of Booking");

                // Capture List of Edit Booking Modal.
                await this.ScreenShot("List of Booking");

                var buttons = await this.FindElements(this.btn_EditBooking, "List of Booking");
                await this.ClickElement(buttons[i], "Edit Booking button");

                // This will check if the edit booking modal is displayed.
                await edit.VerifyEditBookingModal();

                // Capture Edit Booking Modal.
                await this.ScreenShot("Edit Booking Modal");

                // Verify customer details ('i' is equal to index of the current customer details).
                await edit.VerifyEditBookingDuration(accomDetails, i);
                await edit.VerifyEditBookingGuestCount(accomDetails, i);

                if(!guestDetails.IsMember[i]){
                    // Verify customer details ('i' is equal to index of the current customer details).
                    await edit.VerifyEditBookingAccommodationDetails(accomDetails, guestDetails.IsMember[i], i);

                    // Create New Customer Details.
                    await edit.CreateNewCustomer(guestDetails, i);
    
                    // Fill up new customer details.
                    var newNameValues = await edit.FillNewCustomerDetails(guestDetails, i);
                    guestDetails.FirstName[i] = newNameValues[0];
                    guestDetails.LastName[i] = newNameValues[1];
            
                    // Capture filled up customer details.
                    if(accomDetails.BookingCount>1){
                        if(i==0){
                            await this.ScreenShot("Filled Up Group Master Details");
                        }
                        else{
                            await this.ScreenShot("Filled Up Child number " + i + 1 + " Details");
                        }
                    }
                    else{
                        await this.ScreenShot("Filled Up Customer Details");
                    }
            
                    // Save customer details.
                    await edit.ClickSaveCustomerDetails();

                    // This will load existing record for existing email.
                    if(guestDetails.EmailExist[i] == true){
                        await edit.ClickToLoadExistingRecordFound("yes");
                    }

                    // This will verify added customer details.
                    await edit.VerifyCustomerCardAndRewardsEligibility(guestDetails, guestDetails.IsMember[i], i);

                    // This will upsell the guest.
                    if(isUpsell[i]){
                        await edit.AddNewMember();
                        guestDetails.IsMember[i] = true;
                    
                        // Verify customer details ('i' is equal to index of the current customer details).
                        //await edit.VerifyEditBookingAccommodationDetails(accomDetails, guestDetails.IsMember[i], i);
                    }
                }
                else{
                    // Enter member number.
                    await edit.EnterMemberNumber(guestDetails, i);

                    // This will verify added customer details.
                    await edit.VerifyCustomerCardAndRewardsEligibility(guestDetails, guestDetails.IsMember[i], i);

                    // Enter velocity number.
                    if(guestDetails.IsVelocity && i==0){
                        await edit.EnterVelocityNumber(guestDetails, i);
                    }
                    
                    // Verify customer details ('i' is equal to index of the current customer details).
                    //await edit.VerifyEditBookingAccommodationDetails(accomDetails, guestDetails.IsMember[i], i);
                }

                // Get the updated accommodation details.
                var updatedDetails = await edit.GetUpdatedBookingAccommodationDetails(guestDetails.IsMember[i]);
                
                // **SUBJECT FOR CHANGE**
                // Check for expected member discount.
                var expectedMemberPrice: any;
                if(guestDetails.IsMember[i]){
                    var initialMemberDiscount = parseFloat(accomDetails.Price[i]) * MembershipDiscount;
                    var memberDiscount = (Math.round((initialMemberDiscount + Number.EPSILON) * 1000) / 1000);
    
                    // Discount should be capped at 50.
                    var initialMemberPrice: any;
                    if(memberDiscount > 50 && updatedDetails[8].toLowerCase().trim()!="best mate"){
                        initialMemberPrice = (parseFloat(accomDetails.Price[i]) - 50);
                        expectedMemberPrice =  (Math.round((initialMemberPrice + Number.EPSILON) * 100) / 100).toFixed(2);
    
                        if(expectedMemberPrice!=updatedDetails[6]){
                            throw new Error("Expected member discount did NOT matched\nExpected: " + expectedMemberPrice + 
                            "\nActual: " + updatedDetails[6]);
                        }
                    }
                    else if(memberDiscount <= 50 && updatedDetails[8].toLowerCase().trim()!="best mate"){
                        initialMemberPrice = (parseFloat(accomDetails.Price[i]) - memberDiscount);
                        expectedMemberPrice =  (Math.round((initialMemberPrice + Number.EPSILON) * 100) / 100).toFixed(2);
    
                        /*SUBJECT FOR CHANGES*/
                        /*var expectedPriceDiff: any;
                        if(parseFloat(expectedMemberPrice) > parseFloat(updatedDetails[6])){
                            expectedPriceDiff = (parseFloat(expectedMemberPrice) - parseFloat(updatedDetails[6])).toFixed(2);
                            if(expectedPriceDiff < 0.00 || expectedPriceDiff > 0.1){
                                throw new Error("Expected bestmate discount did NOT matched\nExpected: " + expectedMemberPrice + 
                            "\nActual: " + updatedDetails[6]);
                            }
                        }
                        else{
                            expectedPriceDiff = (parseFloat(updatedDetails[6]) - parseFloat(expectedMemberPrice)).toFixed(2);
                            if(expectedPriceDiff < 0.00 || expectedPriceDiff > 0.1){
                                throw new Error("Expected bestmate discount did NOT matched\nExpected: " + expectedMemberPrice + 
                            "\nActual: " + updatedDetails[6]);
                            }
                        }*/
                    }
                    else{
                        initialMemberPrice = (parseFloat(accomDetails.Price[i]) - memberDiscount);
                        expectedMemberPrice =  (Math.round((initialMemberPrice + Number.EPSILON) * 100) / 100).toFixed(2);
    
                        /*var expectedPriceDiff: any;
                        if(parseFloat(expectedMemberPrice) > parseFloat(updatedDetails[6])){
                            expectedPriceDiff = (parseFloat(expectedMemberPrice) - parseFloat(updatedDetails[6])).toFixed(2);
                            if(expectedPriceDiff < 0.00 || expectedPriceDiff > 0.01){
                                throw new Error("Expected bestmate discount did NOT matched\nExpected: " + expectedMemberPrice + 
                            "\nActual: " + updatedDetails[6]);
                            }
                        }
                        else{
                            expectedPriceDiff = (parseFloat(updatedDetails[6]) - parseFloat(expectedMemberPrice)).toFixed(2);
                            if(expectedPriceDiff < 0.00 || expectedPriceDiff > 0.01){
                                throw new Error("Expected bestmate discount did NOT matched\nExpected: " + expectedMemberPrice + 
                            "\nActual: " + updatedDetails[6]);
                            }
                        }*/
                    }//CHange ends here.
                }
                else{
                    expectedMemberPrice = updatedDetails[6];
                }

                // Set newly updated details.
                if(i == accomDetails.BookingCount-1){
                    accommodationName = accommodationName + updatedDetails[0];
                    checkInDate = checkInDate + updatedDetails[1];
                    checkOutDate = checkOutDate + updatedDetails[2];
                    adult = adult + updatedDetails[3];
                    child = child + updatedDetails[4];
                    infant = infant + updatedDetails[5];
                    price = price + expectedMemberPrice;
                    night = night + accomDetails.Night[i];
                    assignedRoom = assignedRoom + updatedDetails[7];
                    tier = tier + updatedDetails[8];

                }
                else{
                    accommodationName = accommodationName + updatedDetails[0] + "|";
                    checkInDate = checkInDate + updatedDetails[1] + "|";
                    checkOutDate = checkOutDate + updatedDetails[2] + "|";
                    adult = adult + updatedDetails[3] + "|";
                    child = child + updatedDetails[4] + "|";
                    infant = infant + updatedDetails[5] + "|";
                    price = price + expectedMemberPrice + "|";
                    night = night + accomDetails.Night[i] + "|";
                    assignedRoom = assignedRoom + updatedDetails[7] + "|";
                    tier = tier + updatedDetails[8] + "|";
                }

                // Click Update Booking.
                await edit.ClickUpdateBooking();
            }

            // Wait for the booking quote to be displayed.
            await this.WaitForElement(this.btn_EditBooking, "List of Edit Booking");

            // Get the total balance in the booking overview section.
            var totalBalance = await this.GetElementText(this.lbl_QouteTotal, "Quote Total");
            totalBalance = totalBalance.replace(",", "");
            if(multiplier > 0){
                var membershipFee = parseFloat(MembershipFee) * multiplier;
                totalBalance = (parseFloat(totalBalance) + membershipFee).toFixed(2);
            }

            // Set new accommodation details.
            var newAccommodationDetails = [accomDetails.BookingCount, accommodationName, checkInDate, checkOutDate,
                adult, child, infant, price, night, assignedRoom, totalBalance, tier];
            return await this.dataSetup.SetUpdatedBookingsData(newAccommodationDetails);
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

    // This will edit added accommodation in quote page.
    async DeleteAccommodation(accomDetails: AccommodationDetails, deleteQty: string){
        try{
            // Set edit booking modal object.
            var edit = new EditBookingModal(this.page, this.dir);

            // Get list of edit booking button.
            var buttons = await this.FindElements(this.btn_EditBooking, "List of Edit Booking");
            if(buttons.length!=accomDetails.BookingCount){
                throw new Error("Expected number of customer to be edited was NOT matched.");
            }

            // Identify number of bookings to delete.
            var deleteCount = accomDetails.BookingCount;
            var index = 0;
            if(deleteQty.toLowerCase().trim()=="any"){
                index = deleteCount - 1;
            }

            // Click edit reservation for multiple/single accommodation.
            for(var i=index; i < deleteCount; i++){
                // Click Selected Edit button.
                await this.ClickElement(buttons[i], "Edit Booking");

                // This will check if the edit booking modal is displayed.
                await edit.VerifyEditBookingModal();

                // This will capture the edit bookingmodal.
                await this.ScreenShot("Edit Booking Modal");

                // Delete selected booking accommodation.
                await edit.ClickDeleteAndConfirm();

                // Verify the deleted accommodation does NOT existing in the quote page.
                if(await this.SubElementExist(buttons[i], this.btn_EditBooking, 5000)){
                    throw new Error("Deleted Accommodation was DISPLAYED.");
                }

                // Capture deleted accommodation
                await this.ScreenShot("Delete Booking Successful");

                accomDetails.BookingCount = accomDetails.BookingCount - 1;
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

    // Step: This will edit accommodation and room type
    async EditAccommodationandRoomType(accomDetails: AccommodationDetails, guestDetails: 
        CustomerDetails){
        try{
            // Set variables to assign updated details.
            var accommodationName="", checkInDate="", checkOutDate="", adult="", child="", infant="";
            var price="",assignedRoom="", night="", tier=""; 

            // Set edit booking modal object.
            var edit = new EditBookingModal(this.page, this.dir);

            // Get list of edit booking button.
            var buttons = await this.FindElements(this.btn_EditBooking, "List of Edit Booking");
            if(buttons.length!=accomDetails.BookingCount){
                throw new Error("Expected number of customer to be edited was NOT matched.");
            }
            
            // Check if upsell is available.
            var isUpsell = false;
            for(var i = 0; i < accomDetails.BookingCount; i++){
                if(guestDetails.IsUpsell[i]){
                    isUpsell = true;
                    break;
                }
            }

            // Click edit reservation for multiple/single accommodation.
            for(var i = 0; i < accomDetails.BookingCount; i++){
                // Click Selected Edit button.
                await this.ClickElement(buttons[i], "Edit Booking");

                // This will check if the edit booking modal is displayed.
                await edit.VerifyEditBookingModal();

                // Capture Edit Booking Modal.
                await this.ScreenShot("Edit Booking Modal");

                // Verify customer details ('i' is equal to index of the current customer details).
                await edit.VerifyEditBookingDuration(accomDetails, i);
                await edit.VerifyEditBookingGuestCount(accomDetails, i);
                await edit.VerifyEditBookingAccommodationDetails(accomDetails, guestDetails.IsMember[i], i);

                // This will select accommodation and room type.
                await edit.SelectAccommodation();

                // Create New Customer Details.
                await edit.CreateNewCustomer(guestDetails, i);

                // Fill up new customer details.
                await edit.FillNewCustomerDetails(guestDetails, i);
        
                // Capture filled up customer details.
                if(accomDetails.BookingCount>1){
                    if(i==0){
                        await this.ScreenShot("Filled Up Group Master Details");
                    }
                    else{
                        await this.ScreenShot("Filled Up Child number " + i + 1 + " Details");
                    }
                }
                else{
                    await this.ScreenShot("Filled Up Customer Details");
                }
        
                // Save customer details.
                await edit.ClickSaveCustomerDetails();

                // This will verify added customer details.
                await edit.VerifyCustomerCardAndRewardsEligibility(guestDetails, guestDetails.IsMember[i], i);

                // Get the updated accommodation details.
                var updatedDetails = await edit.GetUpdatedBookingAccommodationDetails(guestDetails.IsMember[i]);

                // Set newly updated details.
                if(i == accomDetails.BookingCount-1){
                    accommodationName = accommodationName + updatedDetails[0];
                    checkInDate = checkInDate + updatedDetails[1];
                    checkOutDate = checkOutDate + updatedDetails[2];
                    adult = adult + updatedDetails[3];
                    child = child + updatedDetails[4];
                    infant = infant + updatedDetails[5];
                    price = price + updatedDetails[6];
                    night = night + accomDetails.Night[i];
                    assignedRoom = assignedRoom + updatedDetails[7];
                    tier = tier + updatedDetails[8];

                }
                else{
                    accommodationName = accommodationName + updatedDetails[0] + "|";
                    checkInDate = checkInDate + updatedDetails[1] + "|";
                    checkOutDate = checkOutDate + updatedDetails[2] + "|";
                    adult = adult + updatedDetails[3] + "|";
                    child = child + updatedDetails[4] + "|";
                    infant = infant + updatedDetails[5] + "|";
                    price = price + updatedDetails[6] + "|";
                    night = night + accomDetails.Night[i] + "|";
                    assignedRoom = assignedRoom + updatedDetails[7] + "|";
                    tier = tier + updatedDetails[8] + "|";
                }

                // Click Update Booking.
                await edit.ClickUpdateBooking();
            }

            // Get the total balance in the booking overview section.
            await this.WaitForElement(this.btn_EditBooking, "List of Edit Booking");
            var totalBalance = await this.GetElementText(this.lbl_QouteTotal, "Quote Total");
            if(isUpsell){
                totalBalance = (parseFloat(totalBalance) + parseFloat(MembershipFee)).toFixed(2);
            }


            // Set new accommodation details.
            var newAccommodationDetails = [accomDetails.BookingCount, accommodationName, checkInDate, checkOutDate,
                adult, child, infant, price, night, assignedRoom, totalBalance, tier];
            return await this.dataSetup.SetUpdatedBookingsData(newAccommodationDetails);
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

    // Step: This will edit accommodation and room type
    async EditGuestDetails(accomDetails: AccommodationDetails){
        try{
            // Set variable to get all reservation details.
            var allDetails: any[] = [];
            
            // Set variables to assign updated details.
            var accommodationName="", checkInDate="", checkOutDate="", adult="", child="", infant="";
            var price="",assignedRoom="", night="", tier=""; 

            // Set variables to assign updated guest details.
            var newFirstName="", newLastName="", newEmail="", newPhone="", newStreet="", newTown="";
            var newState="", newPostcode="", newCountry="";
            var isMemberSet: any[] = [];
            var isUpsellSet: any[] = [];

            // Set edit booking modal object.
            var edit = new EditBookingModal(this.page, this.dir);

            // Get list of edit booking button.
            var buttons = await this.FindElements(this.btn_EditBooking, "List of Edit Booking");
            if(buttons.length!=accomDetails.BookingCount){
                throw new Error("Expected number of customer to be edited was NOT matched.");
            }

            // Click edit reservation for multiple/single accommodation.
            for(var i = 0; i < accomDetails.BookingCount; i++){
                // Click Selected Edit button.
                await this.ClickElement(buttons[i], "Edit Booking");

                // This will check if the edit booking modal is displayed.
                await edit.VerifyEditBookingModal();

                // Capture Edit Booking Modal.
                await this.ScreenShot("Edit Booking Modal");

                // Verify customer details ('i' is equal to index of the current customer details).
                await edit.VerifyEditBookingDuration(accomDetails, i);
                await edit.VerifyEditBookingGuestCount(accomDetails, i);
                await edit.VerifyEditBookingAccommodationDetails(accomDetails, false, i);

                // This will search and select existing guest
                var memberTier = await edit.SearchExistingCustomer(ExistingGuestSearch);
                var isMember = false;
                var isUpsell = false;
                if(memberTier.toLowerCase().trim()!="none"){
                    isMember = true;
                }

                // This will open the edit customer details modal.
                await edit.ClickEditGuestButton();

                // Update contact details.
                var guests = await edit.UpdateContactDetails();

                // Set newly updated guest details.
                if(i == accomDetails.BookingCount-1){
                    newFirstName = newFirstName + guests[0];
                    newLastName = newLastName + guests[1];
                    newEmail = newEmail + guests[2];
                    newPhone = newPhone + guests[3];
                    newStreet = newStreet + guests[4];
                    newTown = newTown + guests[5];
                    newState = newState + guests[6];
                    newPostcode = newPostcode + guests[7];
                    newCountry = newCountry + guests[8];
                    isMemberSet.push(isMember);
                    isUpsellSet.push(isUpsell);

                }
                else{
                    newFirstName = newFirstName + guests[0] + "|";
                    newLastName = newLastName + guests[1] + "|";
                    newEmail = newEmail + guests[2] + "|";
                    newPhone = newPhone + guests[3] + "|";
                    newStreet = newStreet + guests[4] + "|";
                    newTown = newTown + guests[5] + "|";
                    newState = newState + guests[6] + "|";
                    newPostcode = newPostcode + guests[7] + "|";
                    newCountry = newCountry + guests[8] + "|";
                    isMemberSet.push(isMember);
                    isUpsellSet.push(isUpsell);
                }
        
                // Capture filled up customer details.
                if(accomDetails.BookingCount>1){
                    if(i==0){
                        await this.ScreenShot("Updated Group Master Details");
                    }
                    else{
                        await this.ScreenShot("Updated Child number " + i + 1 + " Details");
                    }
                }
                else{
                    await this.ScreenShot("Updated Customer Details");
                }
        
                // Save customer details.
                await edit.ClickSaveCustomerDetails();

                // Get the updated accommodation details.
                var updatedDetails = await edit.GetUpdatedBookingAccommodationDetails(isMember);
                
                // **SUBJECT FOR CHANGE**
                // Check for expected member discount.
                var expectedMemberPrice: any;
                var initialMemberDiscount = parseFloat(accomDetails.Price[i]) * MembershipDiscount;
                var memberDiscount = (Math.round((initialMemberDiscount + Number.EPSILON) * 1000) / 1000);

                // Discount should be capped at 50.
                var initialMemberPrice: any;
                if(isMember){
                    if(memberDiscount > 50 && updatedDetails[8].toLowerCase().trim()!="best mate"){
                        initialMemberPrice = (parseFloat(accomDetails.Price[i]) - 50);
                        expectedMemberPrice =  (Math.round((initialMemberPrice + Number.EPSILON) * 100) / 100).toFixed(2);
    
                        /* SUBJECT FOR CHANGE */
                        /*if(expectedMemberPrice!=updatedDetails[6]){
                            throw new Error("Expected member discount did NOT matched\nExpected: " + expectedMemberPrice + 
                            "\nActual: " + updatedDetails[6]);
                        }*/
                    }
                    else{
                        initialMemberPrice = (parseFloat(accomDetails.Price[i]) - memberDiscount);
                        expectedMemberPrice =  (Math.round((initialMemberPrice + Number.EPSILON) * 100) / 100).toFixed(2);
    
                        var expectedPriceDiff: any;
                        /*if(parseFloat(expectedMemberPrice) > parseFloat(updatedDetails[6])){
                            expectedPriceDiff = (parseFloat(expectedMemberPrice) - parseFloat(updatedDetails[6])).toFixed(2);
                            if(expectedPriceDiff < 0.00 || expectedPriceDiff > 0.01){
                                throw new Error("Expected bestmate discount did NOT matched\nExpected: " + expectedMemberPrice + 
                            "\nActual: " + updatedDetails[6]);
                            }
                        }
                        else{
                            expectedPriceDiff = (parseFloat(updatedDetails[6]) - parseFloat(expectedMemberPrice)).toFixed(2);
                            if(expectedPriceDiff < 0.00 || expectedPriceDiff > 0.01){
                                throw new Error("Expected bestmate discount did NOT matched\nExpected: " + expectedMemberPrice + 
                            "\nActual: " + updatedDetails[6]);
                            }
                        }*/
                    }
                }
                else{
                    expectedMemberPrice = updatedDetails[6];
                }//CHange ends here.

                // Set newly updated details.
                if(i == accomDetails.BookingCount-1){
                    accommodationName = accommodationName + updatedDetails[0];
                    checkInDate = checkInDate + updatedDetails[1];
                    checkOutDate = checkOutDate + updatedDetails[2];
                    adult = adult + updatedDetails[3];
                    child = child + updatedDetails[4];
                    infant = infant + updatedDetails[5];
                    price = price + expectedMemberPrice;
                    night = night + accomDetails.Night[i];
                    assignedRoom = assignedRoom + updatedDetails[7];
                    tier = tier + updatedDetails[8];

                }
                else{
                    accommodationName = accommodationName + updatedDetails[0] + "|";
                    checkInDate = checkInDate + updatedDetails[1] + "|";
                    checkOutDate = checkOutDate + updatedDetails[2] + "|";
                    adult = adult + updatedDetails[3] + "|";
                    child = child + updatedDetails[4] + "|";
                    infant = infant + updatedDetails[5] + "|";
                    price = price + expectedMemberPrice + "|";
                    night = night + accomDetails.Night[i] + "|";
                    assignedRoom = assignedRoom + updatedDetails[7] + "|";
                    tier = tier + updatedDetails[8] + "|";
                }

                // Click Update Booking.
                await edit.ClickUpdateBooking();
            }

            // Get the total balance in the booking overview section.
            await this.WaitForElement(this.btn_EditBooking, "List of Edit Booking");
            var totalBalance = await this.GetElementText(this.lbl_QouteTotal, "Quote Total");

            // Set new accommodation details.
            var newAccommodationDetails = [accomDetails.BookingCount, accommodationName, checkInDate, checkOutDate,
                adult, child, infant, price, night, assignedRoom, totalBalance, tier];
            var accommodationDetails = await this.dataSetup.SetUpdatedBookingsData(newAccommodationDetails);

            // Set new customer details.
            var newCustomerDetails = [accomDetails.BookingCount, ExistingGuestSearch, newFirstName, newLastName, 
                newEmail, newPhone, newStreet, newTown, newState, newPostcode, newCountry, isMemberSet, isUpsellSet];
            var customerDetails = await this.dataSetup.SetNewCustomerData(newCustomerDetails);

            // Return all class values.
            allDetails = [accommodationDetails, customerDetails];
            return allDetails;
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

    // Step: This will verify the error message displayed for date range with more than 28 days.
    async VerifyDateRangeErrorMessage(expectedMessage: string){
        try{
            // This will get the message from the date range dropdown.
            await this.Sleep(3000);
            var message = await this.GetElementTextviaHTML(this.drp_DateRange, "Date Range dropdown");
            if(message!=expectedMessage){
                throw new Error("Expected data range message did NOT matched.\nExpected: " + expectedMessage +
                "\nActual: " + message);
            }
    
            // Capture the error message.
            await this.ScreenShot("Expected Error Message");
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

    // Step: This will verify the sorting of price in the search results section.
    async VerifyPriceSortingBasedOnSortType(sortType: string){
        try{
            // Set sort type variable.
            var type = sortType.toLowerCase().trim();
            
            // Get the default sorting.
            var sortByValue = await this.GetElementText(this.lbl_PriceSortValue, "Price Sort field value");
            if(!sortByValue.toLowerCase().trim().includes(type)){
                // Click the sort dropdown field.
                await this.Click(this.drp_PriceSort, "Price Sort");

                // Select sort type based on input.
                await this.WaitForElement(this.list_PriceSort, "Price Sort list");
                var list = await this.FindElements(this.list_PriceSort, "Price Sort list");
                for(var i = 0; i < list.length; i++){
                    var sortText = await this.GetLiveElementText(list[i], "Selected Price Sort");
                    if(sortText.toLowerCase().trim().includes(type)){
                        await this.ClickElement(list[i], sortText);
                        await this.Sleep(3000);
                        break;
                    }
                }
            }

            // Get the list of prices and assign to a price set array.
            var prices = await this.GetElementTexts(this.lbl_AccommodationPrice, "Accommodation Price");
            var priceSet: any[] = [];
            for(var i=0; i<prices.length; i++){
                priceSet.push(prices[i].replace('$', '').replace("total", "").trim());
            }

            // Capture the sorting.
            await this.ScreenShot("Price Sort-" + sortType);

            // Verify if the prices were sorted correctly based on selected sort type.
            if(type=="low to high"){
                for(var i=0; i<priceSet.length; i++){
                    var priceA = priceSet[i];
                    var priceB = priceSet[i+1];
                    if(parseFloat(priceA) > parseFloat(priceB)){
                        throw new Error("Prices NOT sorted from Low to High: \nLesser Price: " + priceA +
                        "\nHigher Price: " + priceB);
                    }
                }
            }
            else{
                for(var i=0; i<priceSet.length; i++){
                    var priceA = priceSet[i];
                    var priceB = priceSet[i+1];
                    if(parseFloat(priceA) < parseFloat(priceB)){
                        throw new Error("Prices NOT sorted from High to Low: \Higher Price: " + priceA +
                        "\Lower Price: " + priceB);
                    }
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

    //Step: This will select filter on the find accommodation section.
    async SelectFilters(filterType: string){
        try{
            // Click toggle if filters is not displayed.
            if(!await this.ElementExist(this.form_Filters, 5000)){
                await this.Click(this.toggle_Filters, "Filters toggle");
            }

            // Get the checkboxes state.
            var isCabinsChecked = await this.VerifyCheckBoxState(this.chk_Cabins, "Cabins checkbox");
            var isSitesChecked = await this.VerifyCheckBoxState(this.chk_Sites, "Sites checkbox");
            var isPetFriendlyChecked = await this.VerifyCheckBoxState(this.chk_PetFriendly, "Pet Friendly checkbox");

            // Get park details.

            // Set switch case of each filter type.
            switch(filterType.toLowerCase().trim()){
                case "cabins":
                    // Only Cabins checkbox will be checked.
                    if(!isCabinsChecked){
                        await this.Click(this.chk_Cabins, "Cabins checkbox");
                    }
                    if(isSitesChecked){
                        await this.Click(this.chk_Sites, "Sites checkbox");
                    }
                    if(isPetFriendlyChecked){
                        await this.Click(this.chk_PetFriendly, "Pet Friendly checkbox");
                    }
                    break;
                case "sites":
                    // Only Cabins checkbox will be checked.
                    if(isCabinsChecked){
                        await this.Click(this.chk_Cabins, "Cabins checkbox");
                    }
                    if(!isSitesChecked){
                        await this.Click(this.chk_Sites, "Sites checkbox");
                    }
                    if(isPetFriendlyChecked){
                        await this.Click(this.chk_PetFriendly, "Pet Friendly checkbox");
                    }
                    break;
                case "cabins-sites":
                    // Only Cabins checkbox will be checked.
                    if(!isCabinsChecked){
                        await this.Click(this.chk_Cabins, "Cabins checkbox");
                    }
                    if(!isSitesChecked){
                        await this.Click(this.chk_Sites, "Sites checkbox");
                    }
                    if(isPetFriendlyChecked){
                        await this.Click(this.chk_PetFriendly, "Pet Friendly checkbox");
                    }
                    break;
                case "petfriendly":
                    // Only Cabins checkbox will be checked.
                    if(isCabinsChecked){
                        await this.Click(this.chk_Cabins, "Cabins checkbox");
                    }
                    if(isSitesChecked){
                        await this.Click(this.chk_Sites, "Sites checkbox");
                    }
                    if(!isPetFriendlyChecked){
                        await this.Click(this.chk_PetFriendly, "Pet Friendly checkbox");
                    }
                    break;
            }

            // Capture filter.
            await this.ScreenShot(filterType + " filter");
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

    // Step: This will verify search result based on filter
    async VerifySearchResultBasedOnFilter(filterType: string, parkDetails: any){
        try{
            // Get accommodation names.
            var accommodationNames = await this.GetElementTexts(this.lbl_AccommodationName, "Accommodation Names");

            // Set switch case of each filter type.
            switch(filterType.toLowerCase().trim()){
                case "cabins":
                    for(var i=0; i<accommodationNames.length; i++){
                        var name = accommodationNames[i].trim();
                        for(var x=0; x< parkDetails.length; x++){
                            var accommodations = parkDetails[x]["accommodation"]["content"]["displayName"];
                            var typeId = parkDetails[x]["accommodation"]["content"]["typeId"];
                            if(accommodations.trim()==name){
                                if(typeId==2){
                                    throw new Error("Non-Cabin accommodation is displayed.");
                                }
                            }
                        }
                    }
                    break;
                case "sites":
                    for(var i=0; i<accommodationNames.length; i++){
                        var name = accommodationNames[i].trim();
                        for(var x=0; x< parkDetails.length; x++){
                            var accommodations = parkDetails[x]["accommodation"]["content"]["displayName"];
                            var typeId = parkDetails[x]["accommodation"]["content"]["typeId"];
                            if(accommodations.trim()==name){
                                if(typeId!=2){
                                    throw new Error("Non-Site accommodation is displayed.");
                                }
                            }
                        }
                    }
                    break;
                case "cabins-sites":
                    for(var i=0; i<accommodationNames.length; i++){
                        var name = accommodationNames[i].trim();
                        for(var x=0; x< parkDetails.length; x++){
                            var accommodations = parkDetails[x]["accommodation"]["content"]["displayName"];
                            var typeId = parkDetails[x]["accommodation"]["content"]["typeId"];
                            if(accommodations.trim()==name){
                                if(typeId!=0){
                                    if(typeId!=1){
                                        if(typeId!=2){
                                            throw new Error("Non-Cabin or Non-Site accommodation is displayed.");
                                        }
                                    }
                                }
                            }
                        }
                    }
                    break;
                case "petfriendly":
                    for(var i=0; i<accommodationNames.length; i++){
                        var name = accommodationNames[i].trim();
                        for(var x=0; x< parkDetails.length; x++){
                            var accommodations = parkDetails[x]["accommodation"]["content"]["displayName"];
                            var typeId = parkDetails[x]["accommodation"]["content"]["typeId"];
                            if(accommodations.trim()==name){
                                if(typeId!=0){
                                    if(typeId!=1){
                                        if(typeId!=2){
                                            throw new Error("Non-Cabin or Non-Site accommodation is displayed.");
                                        }
                                    }
                                }
                            }
                        }
                    }
                    break;
            }

            // Capture filter.
            await this.ScreenShot(filterType + " filter result");
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

    //This will get the hidden reservation number.
    async GetHiddenReservationNumber(guestDetails: CustomerDetails){
        // Get the reservation based on the number of boookings.
        var reservationNumber: any[] = []
        var reservationElement = await this.FindElements(this.lbl_HiddenReservationID, "Hidden Reservation ID",
        "Hidden");

        for(var i = 0; i < reservationElement.length; i++){
            var resID = await this.GetElementValueByAttribute(reservationElement[i], "value", 
            "Hidden Reservation Number");
            reservationNumber.push(resID);
        }

        return reservationNumber;
    }

    // Step: This will assign guest with email with existing member.
    async EditBookingUsingEmailwithExistingMember(accomDetails: AccommodationDetails, guestDetails: 
        CustomerDetails){
        try{
            // Set variables to assign updated details.
            var accommodationName="", checkInDate="", checkOutDate="", adult="", child="", infant="";
            var price="",assignedRoom="", night="", tier=""; 

            // Set variables for loaded guest details.
            var firstName="", lastName="", email="", searchText="", mobile="", street="";
            var town="", state="", postcode="", country="";
            var velocityNumber: any[] = [];
            var isVelocity: any[] = [];
            var isMember: any[] = [];
            var isUpsell: any[] = [];
            var emailExist: any[] = [];

            // Set edit booking modal object.
            var edit = new EditBookingModal(this.page, this.dir);

            // Get list of edit booking button.
            var buttons = await this.FindElements(this.btn_EditBooking, "List of Edit Booking");
            if(buttons.length!=accomDetails.BookingCount){
                throw new Error("Expected number of customer to be edited was NOT matched.");
            }

            // Click edit reservation for multiple/single accommodation.
            for(var i = 0; i < accomDetails.BookingCount; i++){
                // Click Selected Edit button.
                await this.WaitForElement(this.btn_EditBooking, "List of Booking");

                // Capture List of Edit Booking Modal.
                await this.ScreenShot("List of Booking");

                var buttons = await this.FindElements(this.btn_EditBooking, "List of Booking");
                await this.ClickElement(buttons[i], "Edit Booking button");

                // This will check if the edit booking modal is displayed.
                await edit.VerifyEditBookingModal();

                // Capture Edit Booking Modal.
                await this.ScreenShot("Edit Booking Modal");

                // Verify customer details ('i' is equal to index of the current customer details).
                await edit.VerifyEditBookingDuration(accomDetails, i);
                await edit.VerifyEditBookingGuestCount(accomDetails, i);

                // Create New Customer Details.
                await edit.CreateNewCustomer(guestDetails, i);

                // Fill up new customer details.
                await edit.FillNewCustomerDetails(guestDetails, i);
        
                // Capture filled up customer details.
                if(accomDetails.BookingCount>1){
                    if(i==0){
                        await this.ScreenShot("Filled Up Group Master Details");
                    }
                    else{
                        var childNumber = i + 1;
                        await this.ScreenShot("Filled Up Child number " + childNumber + " Details");
                    }
                }
                else{
                    await this.ScreenShot("Filled Up Customer Details");
                }
        
                // Save customer details.
                await edit.ClickSaveCustomerDetails(true);
                
                // Load existing member.
                await edit.ClickToLoadExistingRecordFound("yes");

                // Verify customer details ('i' is equal to index of the current customer details).
                await edit.VerifyEditBookingAccommodationDetails(accomDetails, guestDetails.IsMember[i], i);

                // Click edit guest details.
                await edit.ClickEditGuestButton();
    
                // This will get the loaded guest details.
                var loadedGuestDetails = await edit.GetLoadedGuestDetails();

                // Set newly updated details.
                if(i == accomDetails.BookingCount-1){
                    searchText = searchText + guestDetails.SearchName[i];
                    firstName = firstName + loadedGuestDetails[0];
                    lastName = lastName + loadedGuestDetails[1];
                    email = email + loadedGuestDetails[2];
                    mobile = mobile + loadedGuestDetails[3];
                    street = street + loadedGuestDetails[4];
                    town = town + loadedGuestDetails[5];
                    state = state + loadedGuestDetails[6];
                    postcode = postcode + loadedGuestDetails[7];
                    country = country + loadedGuestDetails[8];
                    emailExist.push(true);
                    isUpsell.push(false);
                    isMember.push(true);
                    isVelocity.push(false);
                    velocityNumber.push('');
                }
                else{
                    searchText = searchText + guestDetails.SearchName[i] + "|";
                    firstName = firstName + loadedGuestDetails[0] + "|";
                    lastName = lastName + loadedGuestDetails[1] + "|";
                    email = email + loadedGuestDetails[2] + "|";
                    mobile = mobile + loadedGuestDetails[3] + "|";
                    street = street + loadedGuestDetails[4] + "|";
                    town = town + loadedGuestDetails[5] + "|";
                    state = state + loadedGuestDetails[6] + "|";
                    postcode = postcode + loadedGuestDetails[7] + "|";
                    country = country + loadedGuestDetails[8] + "|";
                    emailExist.push(true);
                    isUpsell.push(false);
                    isMember.push(true);
                    isVelocity.push(false);
                    velocityNumber.push('');
                }

                // Close the edit customer details modal.
                await edit.ClickCancelButtonInEditCustomerDetails();

                // Get the updated accommodation details.
                var updatedDetails = await edit.GetUpdatedBookingAccommodationDetails(guestDetails.IsMember[i]);
                
                // **SUBJECT FOR CHANGE**
                // Check for expected member discount.
                var expectedMemberPrice: any;
                if(guestDetails.IsMember[i]){
                    var initialMemberDiscount = parseFloat(accomDetails.Price[i]) * MembershipDiscount;
                    var memberDiscount = (Math.round((initialMemberDiscount + Number.EPSILON) * 1000) / 1000);
    
                    // Discount should be capped at 50.
                    var initialMemberPrice: any;
                    if(memberDiscount > 50 && updatedDetails[8].toLowerCase().trim()!="best mate"){
                        initialMemberPrice = (parseFloat(accomDetails.Price[i]) - 50);
                        expectedMemberPrice =  (Math.round((initialMemberPrice + Number.EPSILON) * 100) / 100).toFixed(2);
    
                        if(expectedMemberPrice!=updatedDetails[6]){
                            throw new Error("Expected member discount did NOT matched\nExpected: " + expectedMemberPrice + 
                            "\nActual: " + updatedDetails[6]);
                        }
                    }
                    else{
                        initialMemberPrice = (parseFloat(accomDetails.Price[i]) - memberDiscount);
                        expectedMemberPrice =  (Math.round((initialMemberPrice + Number.EPSILON) * 100) / 100).toFixed(2);
    
                        /*var expectedPriceDiff: any;
                        if(parseFloat(expectedMemberPrice) > parseFloat(updatedDetails[6])){
                            expectedPriceDiff = (parseFloat(expectedMemberPrice) - parseFloat(updatedDetails[6])).toFixed(2);
                            if(expectedPriceDiff < 0.00 || expectedPriceDiff > 0.01){
                                throw new Error("Expected bestmate discount did NOT matched\nExpected: " + expectedMemberPrice + 
                            "\nActual: " + updatedDetails[6]);
                            }
                        }
                        else{
                            expectedPriceDiff = (parseFloat(updatedDetails[6]) - parseFloat(expectedMemberPrice)).toFixed(2);
                            if(expectedPriceDiff < 0.00 || expectedPriceDiff > 0.01){
                                throw new Error("Expected bestmate discount did NOT matched\nExpected: " + expectedMemberPrice + 
                            "\nActual: " + updatedDetails[6]);
                            }
                        }*/
                    }//CHange ends here.
                }
                else{
                    expectedMemberPrice = updatedDetails[6];
                }

                // Set newly updated details.
                if(i == accomDetails.BookingCount-1){
                    accommodationName = accommodationName + updatedDetails[0];
                    checkInDate = checkInDate + updatedDetails[1];
                    checkOutDate = checkOutDate + updatedDetails[2];
                    adult = adult + updatedDetails[3];
                    child = child + updatedDetails[4];
                    infant = infant + updatedDetails[5];
                    price = price + expectedMemberPrice;
                    night = night + accomDetails.Night[i];
                    assignedRoom = assignedRoom + updatedDetails[7];
                    tier = tier + updatedDetails[8];

                }
                else{
                    accommodationName = accommodationName + updatedDetails[0] + "|";
                    checkInDate = checkInDate + updatedDetails[1] + "|";
                    checkOutDate = checkOutDate + updatedDetails[2] + "|";
                    adult = adult + updatedDetails[3] + "|";
                    child = child + updatedDetails[4] + "|";
                    infant = infant + updatedDetails[5] + "|";
                    price = price + expectedMemberPrice + "|";
                    night = night + accomDetails.Night[i] + "|";
                    assignedRoom = assignedRoom + updatedDetails[7] + "|";
                    tier = tier + updatedDetails[8] + "|";
                }

                // Click Update Booking.
                await edit.ClickUpdateBooking();
            }

            // Wait for the booking quote to be displayed.
            await this.WaitForElement(this.btn_EditBooking, "List of Edit Booking");

            // Get the total balance in the booking overview section.
            var totalBalance = await this.GetElementText(this.lbl_QouteTotal, "Quote Total");
            totalBalance = totalBalance.replace(",", "");

            // Set accommodation and updated guest details.
            var newAccommodationDetails = [accomDetails.BookingCount, accommodationName, checkInDate, checkOutDate,
                adult, child, infant, price, night, assignedRoom, totalBalance, tier];
            var customerDetails = [guestDetails.BookingCount, searchText, firstName, lastName, email, mobile, street, 
                town, state, postcode, country, isMember, isUpsell, isVelocity, velocityNumber, emailExist];
            var accommodationDetails =  await this.dataSetup.SetUpdatedBookingsData(newAccommodationDetails);
            var updateGuestDetails =  await this.dataSetup.SetCustomerData(customerDetails);

            return [accommodationDetails, updateGuestDetails];
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

    // Step: Setup data for group.
    async SetCustomerDetailsForEmailwithExistingMember(customer: any, details: AccommodationDetails){
        var firstName="", lastName="", email="", searchText="", mobile="", street="";
        var town="", state="", postcode="", country="";
        var velocityNumber: any[] = [];
        var isVelocity: any[] = [];
        var isMember: any[] = [];
        var isUpsell: any[] = [];
        var emailExist: any[] = [];
        for(var i = 0; i < details.BookingCount; i++){
            if(i==details.BookingCount-1){
                searchText = searchText + customer.searchText;
                firstName = firstName + customer.firstName + await this.GenerateRandomString("Alphanumeric", 8);
                lastName = lastName + customer.lastName + await this.GenerateRandomString("Alphanumeric", 8);
                emailExist.push(true);
                email = email + customer.email;
                mobile = mobile + customer.mobile;
                street = street + customer.street;
                town = town + customer.town;
                state = state + customer.state;
                postcode = postcode + customer.postcode;
                country = country + customer.country;
                isUpsell.push(customer.isUpsell);
                isMember.push(customer.isMember);
                isVelocity.push(false);
                velocityNumber.push('');
            }
            else{
                searchText = searchText + customer.searchText + "|";
                firstName = firstName + customer.firstName + await this.GenerateRandomString("Alphanumeric", 8) + "|";
                lastName = lastName + customer.lastName + await this.GenerateRandomString("Alphanumeric", 8) + "|";
                email = email + customer.email + "|";
                mobile = mobile + customer.mobile + "|";
                street = street + customer.street + "|";
                town = town + customer.town + "|";
                state = state + customer.state + "|";
                postcode = postcode + customer.postcode + "|";
                country = country + customer.country + "|";
                isUpsell.push(customer.isUpsell) + "|";
                isMember.push(customer.isMember) + "|";
                isVelocity.push(false) + "|";
                velocityNumber.push('') + "|";
                emailExist.push(true) + "|";
            }
        }
        var customerDetails = [details.BookingCount, searchText, firstName, lastName, email, mobile, street, 
            town, state, postcode, country, isMember, isUpsell, isVelocity, velocityNumber, emailExist];
        return await this.dataSetup.SetCustomerData(customerDetails);
    }

    // Edit Customer details using expired memeber.
    async EditReservationUsingExpiredMember(accomDetails: AccommodationDetails, guestDetails: 
        CustomerDetails){
        try{
            // Set variables to assign updated details.
            var accommodationName="", checkInDate="", checkOutDate="", adult="", child="", infant="";
            var price="",assignedRoom="", night="", tier=""; 

            // Set edit booking modal object.
            var edit = new EditBookingModal(this.page, this.dir);

            // Get list of edit booking button.
            var buttons = await this.FindElements(this.btn_EditBooking, "List of Edit Booking");
            if(buttons.length!=accomDetails.BookingCount){
                throw new Error("Expected number of customer to be edited was NOT matched.");
            }
            
            // Check if upsell/velocity is available.
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
            }

            // Click edit reservation for multiple/single accommodation.
            for(var i = 0; i < accomDetails.BookingCount; i++){
                // Click Selected Edit button.
                await this.WaitForElement(this.btn_EditBooking, "List of Booking");

                // Capture List of Edit Booking Modal.
                await this.ScreenShot("List of Booking");

                var buttons = await this.FindElements(this.btn_EditBooking, "List of Booking");
                await this.ClickElement(buttons[i], "Edit Booking button");

                // This will check if the edit booking modal is displayed.
                await edit.VerifyEditBookingModal();

                // Capture Edit Booking Modal.
                await this.ScreenShot("Edit Booking Modal");

                // Verify customer details ('i' is equal to index of the current customer details).
                await edit.VerifyEditBookingDuration(accomDetails, i);
                await edit.VerifyEditBookingGuestCount(accomDetails, i);

                // Enter member number.
                await edit.EnterMemberNumber(guestDetails, i);

                // This will verify added customer details.
                await edit.VerifyCustomerCardAndRewardsEligibility(guestDetails, guestDetails.IsMember[i], i);
                
                // Verify customer details ('i' is equal to index of the current customer details).
                await edit.VerifyEditBookingAccommodationDetails(accomDetails, guestDetails.IsMember[i], i);

                // This will upsell the guest.
                if(isUpsell[i]){
                    await edit.AddNewMember();
                    guestDetails.IsMember[i] = true;
                }

                // This will verify added customer details.
                await edit.VerifyCustomerCardAndRewardsEligibility(guestDetails, guestDetails.IsMember[i], i);

                // Get the updated accommodation details.
                var updatedDetails = await edit.GetUpdatedBookingAccommodationDetails(guestDetails.IsMember[i]);
                
                // **SUBJECT FOR CHANGE**
                // Check for expected member discount.
                var expectedMemberPrice: any;
                if(guestDetails.IsMember[i]){
                    var initialMemberDiscount = parseFloat(accomDetails.Price[i]) * MembershipDiscount;
                    var memberDiscount = (Math.round((initialMemberDiscount + Number.EPSILON) * 1000) / 1000);
    
                    // Discount should be capped at 50.
                    var initialMemberPrice: any;
                    if(memberDiscount > 50 && updatedDetails[8].toLowerCase().trim()!="best mate"){
                        initialMemberPrice = (parseFloat(accomDetails.Price[i]) - 50);
                        expectedMemberPrice =  (Math.round((initialMemberPrice + Number.EPSILON) * 100) / 100).toFixed(2);
    
                        /* SUBJECT FOR CHANGE */
                        /*if(expectedMemberPrice!=updatedDetails[6]){
                            throw new Error("Expected member discount did NOT matched\nExpected: " + expectedMemberPrice + 
                            "\nActual: " + updatedDetails[6]);
                        }*/
                    }
                    else{
                        initialMemberPrice = (parseFloat(accomDetails.Price[i]) - memberDiscount);
                        expectedMemberPrice =  (Math.round((initialMemberPrice + Number.EPSILON) * 100) / 100).toFixed(2);
    
                        /*var expectedPriceDiff: any;
                        if(parseFloat(expectedMemberPrice) > parseFloat(updatedDetails[6])){
                            expectedPriceDiff = (parseFloat(expectedMemberPrice) - parseFloat(updatedDetails[6])).toFixed(2);
                            if(expectedPriceDiff < 0.00 || expectedPriceDiff > 0.01){
                                throw new Error("Expected bestmate discount did NOT matched\nExpected: " + expectedMemberPrice + 
                            "\nActual: " + updatedDetails[6]);
                            }
                        }
                        else{
                            expectedPriceDiff = (parseFloat(updatedDetails[6]) - parseFloat(expectedMemberPrice)).toFixed(2);
                            if(expectedPriceDiff < 0.00 || expectedPriceDiff > 0.01){
                                throw new Error("Expected bestmate discount did NOT matched\nExpected: " + expectedMemberPrice + 
                            "\nActual: " + updatedDetails[6]);
                            }
                        }*/
                    }//CHange ends here.
                }
                else{
                    expectedMemberPrice = updatedDetails[6];
                }

                // Set newly updated details.
                if(i == accomDetails.BookingCount-1){
                    accommodationName = accommodationName + updatedDetails[0];
                    checkInDate = checkInDate + updatedDetails[1];
                    checkOutDate = checkOutDate + updatedDetails[2];
                    adult = adult + updatedDetails[3];
                    child = child + updatedDetails[4];
                    infant = infant + updatedDetails[5];
                    price = price + expectedMemberPrice;
                    night = night + accomDetails.Night[i];
                    assignedRoom = assignedRoom + updatedDetails[7];
                    tier = tier + updatedDetails[8];

                }
                else{
                    accommodationName = accommodationName + updatedDetails[0] + "|";
                    checkInDate = checkInDate + updatedDetails[1] + "|";
                    checkOutDate = checkOutDate + updatedDetails[2] + "|";
                    adult = adult + updatedDetails[3] + "|";
                    child = child + updatedDetails[4] + "|";
                    infant = infant + updatedDetails[5] + "|";
                    price = price + expectedMemberPrice + "|";
                    night = night + accomDetails.Night[i] + "|";
                    assignedRoom = assignedRoom + updatedDetails[7] + "|";
                    tier = tier + updatedDetails[8] + "|";
                }

                // Click Update Booking.
                await edit.ClickUpdateBooking();
            }

            // Wait for the booking quote to be displayed.
            await this.WaitForElement(this.btn_EditBooking, "List of Edit Booking");

            // Get the total balance in the booking overview section.
            var totalBalance = await this.GetElementText(this.lbl_QouteTotal, "Quote Total");
            totalBalance = totalBalance.replace(",", "");
            if(multiplier > 0){
                var membershipFee = parseFloat(MembershipFee) * multiplier;
                totalBalance = (parseFloat(totalBalance) + membershipFee).toFixed(2);
            }

            // Set new accommodation details.
            var newAccommodationDetails = [accomDetails.BookingCount, accommodationName, checkInDate, checkOutDate,
                adult, child, infant, price, night, assignedRoom, totalBalance, tier];
            return await this.dataSetup.SetUpdatedBookingsData(newAccommodationDetails);
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

    // This will open View Offers modal.
    async ClickViewOffers(){
        try{
            await this.Click(this.btn_ViewOffers, "View Offers button");
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

    // Step: This will verify the quotation price after offer was made.
    async VerifyBookingOverviewAfterOfferIsApplied(details: CustomerDetails, accomDetails: AccommodationDetails, 
        offer: OfferDetails){
        try{
            // Get the accommodation detalils.
            var actualAccommodationNames = await this.FindElements(this.lbl_SelectedAccommodationName, "Selected Accommodation Names")
            var reservationDates = await this.FindElements(this.lbl_ReservationDate, "List of Reservation Dates");
            var prices: any[];

            // Verify accommodation details.
            var expectedQuoteTotal = "0.00";
            for(var i = 0; i < details.BookingCount; i++){
                if(offer.ProcessOfferType[i].toLowerCase().trim()=="accept offers"){
                    // Check for offer tag.
                    var offerIcons = await this.FindElements(this.icon_Holder, "Price Holder");
                    if(offer.OfferName[i]!=""){
                        if(!offer.IsOfferLess){
                            await this.FindSubElementOnElement(offerIcons[i], this.icon_Offer, 
                                offer.OfferName[i] + " Offer Tag");
                        }
                    }
                }
                
                // **SUBJECT FOR CHANGE** Get the initial price.
                if(details.isMember[i]){
                    if(TestingEnvironment.toLowerCase().trim()=="test"){
                        prices = await this.FindElements(this.lbl_GuestQuotePrice, "Member Quoted Price", "all");
                    }
                    else{
                        prices = await this.FindElements(this.lbl_GuestQuotePrice, "Member Quoted Price", "all");
                    }
                }
                else{
                    prices = await this.FindElements(this.lbl_GuestQuotePrice, "Guest Quoted Price", "all");
                }
            
                // Capture Updated Booking Overview.
                await this.ScreenShot("Booking Overview After Applied Offer");

                // Check if accommodation name matched.
                var actualAccommodationName = await this.GetLiveElementText(actualAccommodationNames[i], "Selected Accommodation Name");
                if(actualAccommodationName!=accomDetails.AccommodationName[i]){
                    throw new Error("Selected Accommodation name did NOT matched.\nExpected: " + accomDetails.AccommodationName[i] + 
                    "\nActual: " + actualAccommodationName);
                }

                // Check if reservation date matched.
                var reservationDate = await this.GetLiveElementText(reservationDates[i], "Reservation Date");
                var expectedDate = accomDetails.CheckInDate[i] + " - " + accomDetails.CheckOutDate[i];
                if(reservationDate!=expectedDate){
                    throw new Error("Reservation date did NOT matched.\nExpected: " + expectedDate + 
                    "\nActual: " + reservationDate);
                }

                // Check if reservation price matched.
                var initialPrice = await this.GetLiveElementText(prices[i], "Quoted Price");
                var price = initialPrice.replace(',','');
                /* SUBEJECT FOR CHANGE */
                /*if(price!=accomDetails.Price[i]){
                    throw new Error("Reservation price did NOT matched.\nExpected: " + accomDetails.Price[i] + 
                    "\nActual: " + price);
                }*/

                // Compute expected quote total.
                expectedQuoteTotal = (parseFloat(expectedQuoteTotal) + parseFloat(price)).toFixed(2);
            }

            // Get the quote total and verify against expected.
            var actualQuoteTotal = await this.GetElementText(this.lbl_QouteTotal, "Quote Total");
            var actualQuoteTotal = actualQuoteTotal.replace(",", "").trim();
            if(actualQuoteTotal!=expectedQuoteTotal){
                throw new Error("Expected quote total did NOT matched.\nExpected: " + expectedQuoteTotal +
                "\nActual: " + actualQuoteTotal);
            }
        
            // Verify Continue Booking is not disabled.
            // Get the Confirm Booking attribute.
            var element = await this.FindElement(this.btn_ConfirmBooking, "Confirm Booking");
            var value = await this.GetElementValueByAttribute(element, "class", "Confirm Booking");
    
            // Verify if the confirm booking button is disabled and check the hover message.
            if(value.includes("!disabled")){
                throw new Error("Confirm Booking button was disabled.");
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

    // Step: Verify added accommodation.
    async VerifyAccommodationPriceAfterDiscount(accomDetails: AccommodationDetails, details: CustomerDetails){
        try{
            // Get the accommodation detalils.
            var actualAccommodationNames = await this.FindElements(this.lbl_SelectedAccommodationName, "Selected Accommodation Names")
            var reservationDates = await this.FindElements(this.lbl_ReservationDate, "List of Reservation Dates");
            var prices: any[];

            // Verify accommodation details.
            var expectedQuoteTotal = "0.00";
            for(var i = 0; i < details.BookingCount; i++){
                //Get the initial price.
                prices = await this.FindElements(this.lbl_GuestQuotePrice, "Guest Quoted Price", "all");
            
                // Capture Updated Booking Overview.
                await this.ScreenShot("Booking Overview After Applied Offer");

                // Check if accommodation name matched.
                var actualAccommodationName = await this.GetLiveElementText(actualAccommodationNames[i], "Selected Accommodation Name");
                if(actualAccommodationName!=accomDetails.AccommodationName[i]){
                    throw new Error("Selected Accommodation name did NOT matched.\nExpected: " + accomDetails.AccommodationName[i] + 
                    "\nActual: " + actualAccommodationName);
                }

                // Check if reservation date matched.
                var reservationDate = await this.GetLiveElementText(reservationDates[i], "Reservation Date");
                var expectedDate = accomDetails.CheckInDate[i] + " - " + accomDetails.CheckOutDate[i];
                if(reservationDate!=expectedDate){
                    throw new Error("Reservation date did NOT matched.\nExpected: " + expectedDate + 
                    "\nActual: " + reservationDate);
                }

                // Check if reservation price matched.
                var initialPrice = await this.GetLiveElementText(prices[i], "Quoted Price");
                var price = initialPrice.replace(',','');
                if(price!=accomDetails.Price[i]){
                    throw new Error("Reservation price did NOT matched.\nExpected: " + accomDetails.Price[i] + 
                    "\nActual: " + price);
                }

                // Compute expected quote total.
                expectedQuoteTotal = (parseFloat(expectedQuoteTotal) + parseFloat(price)).toFixed(2);
            }

            // Get the quote total and verify against expected.
            var actualQuoteTotal = await this.GetElementText(this.lbl_QouteTotal, "Quote Total");
            var actualQuoteTotal = actualQuoteTotal.replace(",", "").trim();
            if(actualQuoteTotal!=expectedQuoteTotal){
                throw new Error("Expected quote total did NOT matched.\nExpected: " + expectedQuoteTotal +
                "\nActual: " + actualQuoteTotal);
            }
        
            // Verify Continue Booking is not disabled.
            // Get the Confirm Booking attribute.
            var element = await this.FindElement(this.btn_ConfirmBooking, "Confirm Booking");
            var value = await this.GetElementValueByAttribute(element, "class", "Confirm Booking");
    
            // Verify if the confirm booking button is disabled and check the hover message.
            if(value.includes("!disabled")){
                throw new Error("Confirm Booking button was disabled.");
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

    // Step: This will assign guest with/without upsell.
    async EditSelectedBookingReservationAfterOfferWasMade(accomDetails: AccommodationDetails, guestDetails: 
        CustomerDetails, offer: OfferDetails){
        try{
            // Set variables to assign updated details.
            var accommodationName="", checkInDate="", checkOutDate="", adult="", child="", infant="";
            var price="",assignedRoom="", night="", tier=""; 

            // Set edit booking modal object.
            var edit = new EditBookingModal(this.page, this.dir);

            // Get list of edit booking button.
            var buttons = await this.FindElements(this.btn_EditBooking, "List of Edit Booking");
            if(buttons.length!=accomDetails.BookingCount){
                throw new Error("Expected number of customer to be edited was NOT matched.");
            }
            
            // Check if upsell/velocity is available.
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
            }

            // Click edit reservation for multiple/single accommodation.
            for(var i = 0; i < accomDetails.BookingCount; i++){
                // Click Selected Edit button.
                await this.WaitForElement(this.btn_EditBooking, "List of Booking");

                // Capture List of Edit Booking Modal.
                await this.ScreenShot("List of Booking");

                var buttons = await this.FindElements(this.btn_EditBooking, "List of Booking");
                await this.ClickElement(buttons[i], "Edit Booking button");

                // This will check if the edit booking modal is displayed.
                await edit.VerifyEditBookingModal();

                // Capture Edit Booking Modal.
                await this.ScreenShot("Edit Booking Modal");

                // Verify customer details ('i' is equal to index of the current customer details).
                await edit.VerifyEditBookingDuration(accomDetails, i);
                await edit.VerifyEditBookingGuestCount(accomDetails, i);

                if(!guestDetails.IsMember[i]){
                    // Create New Customer Details.
                    await edit.CreateNewCustomer(guestDetails, i);
    
                    // Fill up new customer details.
                    await edit.FillNewCustomerDetails(guestDetails, i);
            
                    // Capture filled up customer details.
                    if(accomDetails.BookingCount>1){
                        if(i==0){
                            await this.ScreenShot("Filled Up Group Master Details");
                        }
                        else{
                            await this.ScreenShot("Filled Up Child number " + i + 1 + " Details");
                        }
                    }
                    else{
                        await this.ScreenShot("Filled Up Customer Details");
                    }
            
                    // Save customer details.
                    await edit.ClickSaveCustomerDetails();

                    // This will verify added customer details.
                    await edit.VerifyCustomerCardAndRewardsEligibilityAfterOfferIsApplied(guestDetails, offer, 
                        guestDetails.IsMember[i], i);

                    // This will upsell the guest.
                    if(isUpsell[i]){
                        await edit.AddNewMember();
                        guestDetails.IsMember[i] = true;

                        // Verify Promotional rates modal.
                        await edit.VerifyPromotionalRatesWarningModal();
                    }
                }
                else{
                    // Enter member number.
                    await edit.EnterMemberNumber(guestDetails, i);
                    
                    // Verify Promotional rates modal.
                    await edit.VerifyPromotionalRatesWarningModal();

                    // This will verify added customer details.
                    await edit.VerifyCustomerCardAndRewardsEligibilityAfterOfferIsApplied(guestDetails, offer, 
                        guestDetails.IsMember[i], i);
                }

                // Get the updated accommodation details.
                var updatedDetails = await edit.GetUpdatedBookingAccommodationDetails(guestDetails.IsMember[i]);
                
                // **SUBJECT FOR CHANGE**
                // Check for expected member discount.
                var expectedMemberPrice: any;
                if(guestDetails.IsMember[i]){
                    var initialMemberDiscount = parseFloat(accomDetails.OriginalRate[i]) * MembershipDiscount;
                    var memberDiscount = (Math.round((initialMemberDiscount + Number.EPSILON) * 1000) / 1000);
    
                    // Discount should be capped at 50.
                    var initialMemberPrice: any;
                    if(memberDiscount > 50 && updatedDetails[8].toLowerCase().trim()!="best mate"){
                        initialMemberPrice = (parseFloat(accomDetails.OriginalRate[i]) - 50);
                        expectedMemberPrice =  (Math.round((initialMemberPrice + Number.EPSILON) * 100) / 100).toFixed(2);
    
                        if(expectedMemberPrice!=updatedDetails[6]){
                            throw new Error("Expected member discount did NOT matched\nExpected: " + expectedMemberPrice + 
                            "\nActual: " + updatedDetails[6]);
                        }
                    }
                    else if(memberDiscount <= 50 && updatedDetails[8].toLowerCase().trim()!="best mate"){
                        initialMemberPrice = (parseFloat(accomDetails.OriginalRate[i]) - memberDiscount);
                        expectedMemberPrice =  (Math.round((initialMemberPrice + Number.EPSILON) * 100) / 100).toFixed(2);
    
                        /*SUBJECT FOR CHANGES*/
                        /*var expectedPriceDiff: any;
                        if(parseFloat(expectedMemberPrice) > parseFloat(updatedDetails[6])){
                            expectedPriceDiff = (parseFloat(expectedMemberPrice) - parseFloat(updatedDetails[6])).toFixed(2);
                            if(expectedPriceDiff < 0.00 || expectedPriceDiff > 0.1){
                                throw new Error("Expected bestmate discount did NOT matched\nExpected: " + expectedMemberPrice + 
                            "\nActual: " + updatedDetails[6]);
                            }
                        }
                        else{
                            expectedPriceDiff = (parseFloat(updatedDetails[6]) - parseFloat(expectedMemberPrice)).toFixed(2);
                            if(expectedPriceDiff < 0.00 || expectedPriceDiff > 0.1){
                                throw new Error("Expected bestmate discount did NOT matched\nExpected: " + expectedMemberPrice + 
                            "\nActual: " + updatedDetails[6]);
                            }
                        }*/
                    }
                    else{
                        initialMemberPrice = (parseFloat(accomDetails.OriginalRate[i]) - memberDiscount);
                        expectedMemberPrice =  (Math.round((initialMemberPrice + Number.EPSILON) * 100) / 100).toFixed(2);
    
                        /*var expectedPriceDiff: any;
                        if(parseFloat(expectedMemberPrice) > parseFloat(updatedDetails[6])){
                            expectedPriceDiff = (parseFloat(expectedMemberPrice) - parseFloat(updatedDetails[6])).toFixed(2);
                            if(expectedPriceDiff < 0.00 || expectedPriceDiff > 0.01){
                                throw new Error("Expected bestmate discount did NOT matched\nExpected: " + expectedMemberPrice + 
                            "\nActual: " + updatedDetails[6]);
                            }
                        }
                        else{
                            expectedPriceDiff = (parseFloat(updatedDetails[6]) - parseFloat(expectedMemberPrice)).toFixed(2);
                            if(expectedPriceDiff < 0.00 || expectedPriceDiff > 0.01){
                                throw new Error("Expected bestmate discount did NOT matched\nExpected: " + expectedMemberPrice + 
                            "\nActual: " + updatedDetails[6]);
                            }
                        }*/
                    }//CHange ends here.
                }
                else{
                    expectedMemberPrice = updatedDetails[6];
                }

                // Verify offer discount.
                var discount = parseFloat(accomDetails.OriginalRate[i]) * MembershipDiscount;
                var initialPrice = parseFloat(accomDetails.OriginalRate[i]) - discount;
                var memberDiscountPrice = (Math.round((initialPrice + Number.EPSILON) * 100) / 100);
                if(!offer.IsOfferLess[i]){
                    if(parseFloat(accomDetails.Price[i]) > memberDiscountPrice){
                        throw new Error("Offer price was NOT better than member discount.\nMember Discount: " + memberDiscountPrice+
                        "\nOffer Price: " + accomDetails.Price[i]);
                    }
                }
                else{
                    if(memberDiscountPrice > parseFloat(accomDetails.Price[i])){
                        throw new Error("Member discount was NOT better than offer price.\nMember Discount: " + memberDiscountPrice+
                        "\nOffer Price: " + accomDetails.Price[i]);
                    }
                }

                // Set newly updated details.
                if(i == accomDetails.BookingCount-1){
                    accommodationName = accommodationName + updatedDetails[0];
                    checkInDate = checkInDate + updatedDetails[1];
                    checkOutDate = checkOutDate + updatedDetails[2];
                    adult = adult + updatedDetails[3];
                    child = child + updatedDetails[4];
                    infant = infant + updatedDetails[5];
                    if(!offer.IsOfferLess[i]){
                        price = price + accomDetails.Price[i];
                    }
                    else{
                        if(guestDetails.IsMember[i]){
                            price = price + expectedMemberPrice;
                        }
                        else{
                            price = price + accomDetails.Price[i];
                        }
                    }
                    night = night + accomDetails.Night[i];
                    assignedRoom = assignedRoom + updatedDetails[7];
                    tier = tier + updatedDetails[8];
                }
                else{
                    accommodationName = accommodationName + updatedDetails[0] + "|";
                    checkInDate = checkInDate + updatedDetails[1] + "|";
                    checkOutDate = checkOutDate + updatedDetails[2] + "|";
                    adult = adult + updatedDetails[3] + "|";
                    child = child + updatedDetails[4] + "|";
                    infant = infant + updatedDetails[5] + "|";
                    if(!offer.IsOfferLess[i]){
                        price = price + accomDetails.Price[i] + "|";
                    }
                    else{
                        if(guestDetails.IsMember[i]){
                            price = price + expectedMemberPrice + "|";
                        }
                        else{
                            price = price + accomDetails.Price[i];
                        }
                    }
                    night = night + accomDetails.Night[i] + "|";
                    assignedRoom = assignedRoom + updatedDetails[7] + "|";
                    tier = tier + updatedDetails[8] + "|";
                }

                // Click Update Booking.
                await edit.ClickUpdateBooking();
            }

            // Wait for the booking quote to be displayed.
            await this.WaitForElement(this.btn_EditBooking, "List of Edit Booking");

            // Get the total balance in the booking overview section.
            var totalBalance = await this.GetElementText(this.lbl_QouteTotal, "Quote Total");
            totalBalance = totalBalance.replace(",", "");
            if(multiplier > 0){
                var membershipFee = parseFloat(MembershipFee) * multiplier;
                totalBalance = (parseFloat(totalBalance) + membershipFee).toFixed(2);
            }

            // Set new accommodation details.
            var newAccommodationDetails = [accomDetails.BookingCount, accommodationName, checkInDate, checkOutDate,
                adult, child, infant, price, night, assignedRoom, totalBalance, tier];
            return await this.dataSetup.SetUpdatedBookingsData(newAccommodationDetails);
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

    // Step: Setup data for group booking with non-member , non-member with upsell and existing member.
    async SetSpecificCustomerDetailsForGroupBooking(customer: any[], details: AccommodationDetails){
        var firstName: any[] = [], lastName: any[] = [], memberId: any[] = [], email: any[] = []; 
        var searchText: any[] = [], mobile: any[] = [], street: any[] = [];
        var town: any[] = [], state: any[] = [], postcode: any[] = [], country: any[] = [];
        var isMember: any[] = [], isUpsell: any[] = [], isVelocity: any[] = [], velocityNumber: any[] = [];
        for(var i=0; i<details.BookingCount; i++){
            mobile.push(customer[i].mobile);
            street.push(customer[i].street);
            town.push(customer[i].town);
            state.push(customer[i].state);
            postcode.push(customer[i].postcode);
            country.push(customer[i].country);
            isMember.push(customer[i].isMember);
            if(customer[i].isMember){
                firstName.push(customer[i].firstName);
                lastName.push(customer[i].lastName);
                email.push(customer[i].email);
                memberId.push(customer[i].membershipNumber);
                searchText.push("");
            }
            else{
                var newEmail = await this.GenerateRandomEmail(customer[i].firstName, "@gmail.com", "Alphanumeric", 8);
                var newFirstName =customer[i].firstName + await this.GenerateRandomString("Alphanumeric", 8);
                var newLastName =customer[i].lastName + await this.GenerateRandomString("Alphanumeric", 8);
                firstName.push(newFirstName);
                lastName.push(newLastName);
                email.push(newEmail);
                memberId.push("");
                searchText.push(customer[i].searchText);
            }
            isUpsell.push(customer[i].isUpsell);
            isVelocity.push(customer[i].isVelocity);
            velocityNumber.push(customer[i].velocityNumber);
        }
        
        var customerDetails = [details.BookingCount, searchText, firstName, lastName, email, mobile, street, 
            town, state, postcode, country, isMember, memberId, isUpsell, isVelocity, velocityNumber];
        return await this.dataSetup.SetSpecificCustomerDetailsForGroupBooking(customerDetails);
    }
}