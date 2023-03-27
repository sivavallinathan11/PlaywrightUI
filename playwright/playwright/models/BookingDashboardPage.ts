import { errors, Page } from "@playwright/test";
import { APIRequestContext } from "playwright";
import { DataSetup } from "../data/datasetup";
import { TestDirectory } from "../data/directory";
import { tbl_Arriving, tbl_Departing, tbl_InHouse, tbl_Search, tbl_Upcoming, TestingEnvironment, URL, typeOfPayment, tblArriving, tblSearch, tblUpcoming } from "../data/users";
import { APIHelper } from "./APIHelper";
import { Common } from "./Common";

export class BookingDashboardPage extends Common{
    // Set object variable.
    readonly page: Page;
    readonly request: APIRequestContext;
    readonly dir: TestDirectory;
    public dataSetup = new DataSetup();

    // Set a sub routine that will access the functions from parent and sibling class.
    constructor(page: Page, request: APIRequestContext, dir: TestDirectory){
        super(page, dir);
        this.page = page;
        this.request = request;
        this.dir = dir;
    }

    // Set Xpath values
    public tableXpath = "//*[@id='tblValue']//tbody/tr";
    public reservationXpath = "xpath=child::td[@class='reservation']/b";
    public customerFirstNameXpath = "xpath=child::td[@class='name']/span[@class='fname']";
    public customerLastNameXpath = "xpath=child::td[@class='name']/span[@class='lname']";
    public customerTypeXpath = "xpath=child::td[@class='gday']";
    public customerCountXpath = "xpath=child::td[@class='guests']";
    public accommodationXpath = "xpath=child::td[@class='accomodation']";
    public arrowBtnXpath = "xpath=child::td/button[@class='arrow']";
    public balanceXpath = "xpath=child::td[contains(@class, 'balance')]/b";
    public depositXpath = "xpath=child::td[@class='paid']";
    public roomStatusXpath = "xpath=child::td[@class='icons']/p[@class='status'][2]/span[contains(@class, 'text')]";
    public etaXpath = "xpath=child::td[@class='eta']";
    public bookingDateXpath = "xpath=child::td[@class='dates']";

    // Set XPaths, Element IDs and other attributes.
    // Label
    public lbl_ArrivingResNumber = "xpath=child::td[@class='reservation']/b";
    public lbl_FirstName = "xpath=child::td[@class='name']/span[@class='fname']";
    public lbl_LastName = "xpath=child::td[@class='name']/span[@class='lname']";
    public lbl_ResNumber = "xpath=child::td[@class='reservation']/b";
    public lbl_Deposit = "xpath=child::td[@class='paid']";
    public lbl_Balance = "xpath=child::td[contains(@class, 'balance')]/b";
    public lbl_Tier = "xpath=child::td[@class='gday']";
    public lbl_Guest = "xpath=child::td[@class='guests']";
    public lbl_Accommodation = "xpath=child::td[@class='accomodation']";
    public lbl_ETA = "xpath=child::td[@class='eta']";
    public lbl_BookingDates = "xpath=child::td[@class='dates']";
    public lbl_NightStay = "xpath=child::td[@class='nights']";
    public lbl_RoomStatus = "xpath=child::td[@class='icons']/p[2]/span[2]";
    public lbl_ResConfirmation = "xpath=child::td[@class='icons']/p[1]/span[2]";

    // Tab
    public tab_Search = "#event-search";

    // Icon
    public icon_TabLoading = "//i[@class='fas fa-circle-notch fa-spin']";

    // Dropdown
    public drp_SearchCriteria = "#search-select-dropdown";
    public dropdownXPath = "//*[@id='search-select-dropdown']";

    // Textfield
    public txt_SearchText = "//*[@class='search-searchbar form-control' and not(boolean(@disabled))]";
    public inputFieldXPath = "//input[@class='search-searchbar form-control']";
    public txt_SearchBooking = "#find-booking-input";

    // Button
    public btn_SearchTabSearch = "//*[@id='search-confirm' and not(boolean(@disabled))]";
    public btn_ManageBooking = "xpath=child::td[@class='cta']/button";
    public searchBtnXPath = "//*[@id='search-confirm']";
    public searchBtnspinnerXPath = "//*[@id='event-search']//span[@id='searchCount']/i";

    // Table
    public tbl_ResultsTable = "//*[@id='{TableType}']//tbody/tr";

    // **Function Starts Here**

    // Section for navigating to dashboard page.
    async Open(){
        try{
            if(TestingEnvironment.toLowerCase().trim()=="dev"){
                await this.GoTo(URL.DEV_BookingDashboard, "Booking Dashboard Page");
            }
            else{
                await this.GoTo(URL.BookingDashboard, "Booking Dashboard Page");
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

    // Section for Arrivals Tab functions.
    async VerifyArrivals(){
        try{
            var list = await this.FindElements(this.tbl_ResultsTable.replace("{TableType}", tbl_Arriving), "Arrival Results Table");
            if(list.length==0){
                throw new Error("No reservation was displayed in the arrivals.");
            }
            await this.ScreenShot("Arrivals Table");
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

    // Section for Arrivals Tab functions.
    async VerifyInHouse(){
        try{
            var list = await this.FindElements(this.tbl_ResultsTable.replace("{TableType}", tbl_InHouse), "In House Results Table");
            if(list.length==0){
                throw new Error("No reservation was displayed in the In House.");
            }
            await this.ScreenShot("In House Table");
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

    // Section for Arrivals Tab functions.
    async VerifyDeparting(){
        try{
            var list = await this.FindElements(this.tbl_ResultsTable.replace("{TableType}", tbl_Departing), "Departing Results Table");
            if(list.length==0){
                throw new Error("No reservation was displayed in the departing.");
            }
            await this.ScreenShot("Departing Table");
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

    // Section for Arrivals Tab functions.
    async VerifyUpcoming(){
        try{
            var list = await this.FindElements(this.tbl_ResultsTable.replace("{TableType}", tbl_Upcoming), "Upcoming Results Table");
            if(list.length==0){
                throw new Error("No reservation was displayed in the Upcoming.");
            }
            await this.ScreenShot("Upcoming Table");
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

    // Section for Search Tab functions.
    // Click Search Tab
    async ClickSearchTab() {
        try{
            // This will click the search tab.
            await this.Click(this.tab_Search, "Search Tab");

            // This will check if the loading icon.
            if(await this.ElementExist(this.icon_TabLoading, 20000)){
                await this.WaitForElementToBeHidden(this.icon_TabLoading);
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

    // Select search criteria
    async SelectSearchCriteria(criteria: string){
        try{
            // This will check if element exist.
            await this.WaitForElement(this.drp_SearchCriteria, "Search criteria dropdown field");
            switch(criteria.toLowerCase().trim()){
                case "reservation number":
                    await this.SelectFromDropdown(this.drp_SearchCriteria, "value", "reservationIds", "Reservation number");
            }

            if(!await this.ElementExist(this.txt_SearchText, 30000)){
                throw new Error("Search text field was disabled.");
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

    // Enter search value in the search field.
    async EnterSearchValue(searchValue: any){
        try{
            await this.EnterValue(this.txt_SearchText, searchValue, "Search text field");
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

    // Click Search button.
    async ClickSearchFromSearchTab(){
        try{
            await this.Click(this.btn_SearchTabSearch, "Search tab search button");

            // This will check if the loading icon.
            if(await this.ElementExist(this.icon_TabLoading, 60000)){
                await this.WaitForElementToBeHidden(this.icon_TabLoading);
            }

            // Capture search result.
            await this.ScreenShot("Search Result");

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

    // This will search booking number from the search tab.
    async SearchReservationFromSearchTab(searchValue: string, searchCriteria: string){
        // Go to Search Tab.
        await this.ClickSearchTab();

        // Search for the reservation number.
        await this.SelectSearchCriteria(searchCriteria);

        // Enter reservation number.
        await this.EnterSearchValue(searchValue);

        // Click Search.
        await this.ClickSearchFromSearchTab();

        await this.ScreenShot("Search Result");
    }

    // Manage Booking for searched reservation
    async ManageBookingOfSearchedReservation(expectedResNumber: string){
        try{

            
            // Set variables to get values.
            var reservationSet: any[] = [];
            var firstNameSet: any[] = [], lastNameSet: any[] = [], depositAmountSet: any[] = [], totalStayCostSet: any[] = [];
            var balanceSet: any[] = [], tierSet: any[] = [], adultSet: any[] = [], childSet: any[] = [];
            var infantSet: any[] = [], accommodationNameSet: any[] = [], assignedRoomSet: any[] = [];
            var etaSet: any[] = [], checkInSet: any[] = [], checkOutSet: any[] = [], nightStaySet: any[] = [];
            var arrivalFromTodaySet: any[] = [];
            var roomStatusSet: any[] = [], resConfirmationSet: any[] = [];
            var selectedIndex = 0;
            var reservationSelected = false;
            var actualResNumber = "";

            // This will get the selected reservation's index.
            var table = this.tbl_ResultsTable.replace("{TableType}", tbl_Search);
            var list = await this.FindElements(table, "Search tab results table");
            for(var i=0; i<list.length; i++){
                var resNumberElement = await this.FindSubElementOnElement(list[i], this.lbl_ResNumber, "Search tab reservation Number");
                actualResNumber = await this.GetLiveElementText(resNumberElement, "Search tab reservation Number");
                if(actualResNumber.trim()==expectedResNumber){
                    reservationSelected = true;
                    selectedIndex = i;
                    reservationSet.push(actualResNumber);
                    break;
                }
            }

            // Verify if the searched reservation is displayed.
            if(!reservationSelected){
                throw new Error("No result was displayed for " + expectedResNumber);
            }

            // Get all the details of the searched reservation.
            var firstNameElement = await this.FindSubElementOnElement(list[selectedIndex], this.lbl_FirstName, 
                "Seach tab first name");
            var firstName = await this.GetLiveElementText(firstNameElement, "Search tab first name");
            firstNameSet.push(firstName);

            var lastNameElement = await this.FindSubElementOnElement(list[selectedIndex], this.lbl_LastName, 
                "Seach tab last name");
            var lastName = await this.GetLiveElementText(lastNameElement, "Search tab last name");
            lastNameSet.push(lastName);

            var depositElement = await this.FindSubElementOnElement(list[selectedIndex], this.lbl_Deposit, 
                "Seach tab deposit amount");
            var initialDeposit = await this.GetLiveElementText(depositElement, "Search tab deposit amount");
            var depositAmount = initialDeposit.split('/')[0].replace('$', '').trim();
            depositAmountSet.push(depositAmount);
            var totalStayCost = initialDeposit.split('/')[1].replace('$', '').trim();
            totalStayCostSet.push(totalStayCost);

            var balanceElement = await this.FindSubElementOnElement(list[selectedIndex], this.lbl_Balance, 
                "Seach tab balance");
            var balance = await this.GetLiveElementText(balanceElement, "Search tab balance");
            balanceSet.push(balance);

            var tierElement = await this.FindSubElementOnElement(list[selectedIndex], this.lbl_Tier, 
                "Seach tab tier");
            var tier = await this.GetLiveElementText(tierElement, "Search tab tier");
            tierSet.push(tier);

            var guestElement = await this.FindSubElementOnElement(list[selectedIndex], this.lbl_Guest, 
                "Seach tab guest count");
            var initialGuestCount = await this.GetLiveElementText(guestElement, "Search tab guest count");
            var adult = parseInt(initialGuestCount.split(',')[0].replace("Adults", "").trim());
            adultSet.push(adult);
            var child = parseInt(initialGuestCount.split(',')[1].replace("Child", "").trim());
            childSet.push(child);
            var infant = initialGuestCount.split(',')[2].replace("infant", "").trim();
            infantSet.push(infant);

            var accommodationElement = await this.FindSubElementOnElement(list[selectedIndex], this.lbl_Accommodation, 
                "Seach tab accommodation");
            var initialAccommodation = await this.GetLiveElementText(accommodationElement, "Search tab accommodation");
            var accommodationDetails = initialAccommodation.split("\n");
            var accommodationName = accommodationDetails[0].trim();
            accommodationNameSet.push(accommodationName);
            var assignedRoom = accommodationDetails[accommodationDetails.length-1].trim();
            assignedRoomSet.push(assignedRoom);

            var ETAElement = await this.FindSubElementOnElement(list[selectedIndex], this.lbl_ETA, 
                "Seach tab ETA");
            var ETA = await this.GetLiveElementText(ETAElement, "Search tab ETA");
            etaSet.push(ETA);

            var bookingDateElement = await this.FindSubElementOnElement(list[selectedIndex], this.lbl_BookingDates, 
                "Seach tab guest count");
            var bookingDates = await this.GetLiveElementText(bookingDateElement, "Search tab guest count");
            checkInSet.push(bookingDates.split('-')[0].trim());
            checkOutSet.push(bookingDates.split('-')[1].trim());
            
            // Get date difference.
            var differenceFromToday = await this.GetDateDifference(bookingDates.split('-')[0].trim());
            arrivalFromTodaySet.push(differenceFromToday);

            var nightsElement = await this.FindSubElementOnElement(list[selectedIndex], this.lbl_NightStay, 
                "Seach tab number of nights");
            var nightStay = await this.GetLiveElementText(nightsElement, "Search tab number of nights");
            nightStaySet.push(nightStay);

            var roomStatusElement = await this.FindSubElementOnElement(list[selectedIndex], this.lbl_RoomStatus, 
                "Seach tab room status");
            var roomStatus = await this.GetLiveElementText(roomStatusElement, "Search tab room status");
            roomStatusSet.push(roomStatus);

            var resConfirmationElement = await this.FindSubElementOnElement(list[selectedIndex], this.lbl_ResConfirmation, 
                "Seach tab reservation confirmation");
            var resConfirmation = await this.GetLiveElementText(resConfirmationElement, "Search tab reservation confirmation");
            resConfirmationSet.push(resConfirmation);

            var manageButton = await this.FindSubElementOnElement(list[selectedIndex], this.btn_ManageBooking, 
                "Manage booking button");
            await this.ClickElement(manageButton, "Manage booking button");

            var dashboardDetails = [firstNameSet, lastNameSet, reservationSet, depositAmountSet, totalStayCostSet, balanceSet, 
                                    tierSet, adultSet, childSet, infantSet, accommodationNameSet, assignedRoomSet, etaSet, 
                                    checkInSet, checkOutSet, nightStaySet, roomStatusSet, resConfirmationSet,
                                    arrivalFromTodaySet];
            return await this.dataSetup.SetReservationDetailsFromDashboard(dashboardDetails);
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

    // This will select specific reservation.
    async SelectSpecificReservation(searchType: string, searchValue: string, 
        tableType: string = "Arrivals", dateInput: string[] = []){
        try{
            var apiHelper = new APIHelper(this.page, this.request, this.testDirectory);
            
            // Set variables to get values.
            var reservationSet: any[] = [];
            var firstNameSet: any[] = [], lastNameSet: any[] = [], depositAmountSet: any[] = [], totalStayCostSet: any[] = [];
            var balanceSet: any[] = [], tierSet: any[] = [], adultSet: any[] = [], childSet: any[] = [];
            var infantSet: any[] = [], accommodationNameSet: any[] = [], assignedRoomSet: any[] = [];
            var etaSet: any[] = [], checkInSet: any[] = [], checkOutSet: any[] = [], nightStaySet: any[] = [];
            var arrivalFromTodaySet: any[] = [];
            var roomStatusSet: any[] = [], resConfirmationSet: any[] = [], paymentTypeSet:any[] = [];
            var selectedIndex = 0;
            var reservationSelected = false;
            var actualResNumber = "";
            
            // This will find the reservation based on searched value.
            await this.FindABooking(searchType, searchValue, tableType);
    
            // Set variables.
            var tableValue = tbl_Arriving;
    
            // Set table type.
            switch(tableType.toLowerCase().trim()){
                case "arrivals":
                    var tableValue = tbl_Arriving;
                    break;
                case "in house":
                    var tableValue = tbl_InHouse;
                    break;
                case "departing":
                    var tableValue = tbl_Departing;
                    break;
                case "upcoming":
                    var tableValue = tbl_Upcoming;
                    break;
                case "search":
                    var tableValue = tbl_Search;
                    break;
            }
    
            
    
            // Get reservation from the result.
            var list = await this.FindElements(this.tableXpath.replace("tblValue",tableValue), "List of " + tableType);
            var selectedIndex = 0;
            if(searchType.toLowerCase().trim() != "reservation number"){
                if(list.length > 1){
                    var reserveList = list.length - 1;
                    selectedIndex = Math.floor(Math.random() * reserveList);
                }
            }
    
            // Get the customer firstname.
            var firstNameElement = await this.FindSubElementOnElement(list[selectedIndex], this.customerFirstNameXpath, 
                "Customer Firstname");
            var customerFirstname = await this.GetLiveElementText(firstNameElement, "Customer Firstname");
            firstNameSet.push(customerFirstname);
    
            // Get the customer firstname.
            var lastNameElement = await this.FindSubElementOnElement(list[selectedIndex], this.customerLastNameXpath, 
                "Customer Lastname");
            var customerLastname = await this.GetLiveElementText(lastNameElement, "Customer Lastname");
            lastNameSet.push(customerLastname);
    
            // Get the reservation number.
            var reservationElement = await this.FindSubElementOnElement(list[selectedIndex], this.reservationXpath, 
                "Reservation Number");
            var reservationNumber = await this.GetLiveElementText(reservationElement, "Reservation Number");
            reservationSet.push(reservationNumber);
    
            // Get the deposit payment.
            var depositElement = await this.FindSubElementOnElement(list[selectedIndex], this.depositXpath, "Deposit");
            var initialDeposits = await this.GetLiveElementText(depositElement, "Deposit");
            var deposit = initialDeposits.split('/')[0].replace('$','').trim();
            depositAmountSet.push(deposit);
    
            // Get the total Stay cost.
            var totalStay = initialDeposits.split('/')[1].replace('$','').trim();
            totalStayCostSet.push(totalStay);
    
            // Get the total balance.
            var balanceElement = await this.FindSubElementOnElement(list[selectedIndex], this.balanceXpath, "Balance");
            var balance = (await this.GetLiveElementText(balanceElement, "Balance")).replace('$','');
            balanceSet.push(balance);
    
            // Get the guest type.
            var customerElement = await this.FindSubElementOnElement(list[selectedIndex], this.customerTypeXpath, "Guest Type");
            var guestType = await this.GetLiveElementText(customerElement, "Guest Type");
            tierSet.push(guestType);
            
    
            // Get the guest count.
            var guestCountXpath = await this.FindSubElementOnElement(list[selectedIndex], this.customerCountXpath, "Guest Count");
            var initialGuestCount = await this.GetLiveElementText(guestCountXpath, "Guest Count");
            var adult = parseInt(initialGuestCount.split(',')[0].replace("Adults", "").trim());
            adultSet.push(adult);
            var child = parseInt(initialGuestCount.split(',')[1].replace("Child", "").trim());
            childSet.push(child);
            var infant = initialGuestCount.split(',')[2].replace("infant", "").trim();
            infantSet.push(infant);

            var nightsElement = await this.FindSubElementOnElement(list[selectedIndex], this.lbl_NightStay, 
                "Seach tab number of nights");
            var nightStay = await this.GetLiveElementText(nightsElement, "Search tab number of nights");
            nightStaySet.push(nightStay);
    
            // Get the accommodation.
            var accomodationElement = await this.FindSubElementOnElement(list[selectedIndex], this.accommodationXpath, "Accommodation");
            var initialAccommodation = await this.GetLiveElementText(accomodationElement, "Accommodation");
            var accommodationDetails = initialAccommodation.split("\n");
            var accommodationName = accommodationDetails[0].trim();
            accommodationNameSet.push(accommodationName);
            var assignedRoom = accommodationDetails[accommodationDetails.length-1].trim();
            assignedRoomSet.push(assignedRoom);
    
            // Get the payment type.
            var paymentType = await this.VerifyPaymentType(balance, deposit, totalStay);
            paymentTypeSet.push(paymentType);

            var resConfirmationElement = await this.FindSubElementOnElement(list[selectedIndex], this.lbl_ResConfirmation, 
                "Seach tab reservation confirmation");
            var resConfirmation = await this.GetLiveElementText(resConfirmationElement, "Search tab reservation confirmation");
            resConfirmationSet.push(resConfirmation);
    
            var eta = "", checkInDate = "", checkOutDate = "", roomStatus = "", bookingDates;
            // Get the room status.
            if(tableType.toLowerCase().trim()==tblArriving|| tableType.toLowerCase().trim()==tblSearch){
                var elementRoomStatus = await this.FindSubElementOnElement(list[selectedIndex], this.roomStatusXpath, "Room Status");
                roomStatus = await this.GetLiveElementText(elementRoomStatus, "Room Status");
            }
            else{
                roomStatus = "";
            }

            if(tableType.toLowerCase().trim()==tblUpcoming || tableType.toLowerCase().trim()==tblSearch){
                // Get ETA.
                var etaElement = await this.FindSubElementOnElement(list[selectedIndex], this.etaXpath, "ETA");
                eta = await this.GetLiveElementText(etaElement, "ETA");
    
                // Get Booking Dates.
                var bookingDateElement = await this.FindSubElementOnElement(list[selectedIndex], this.bookingDateXpath, "Booking Date");
                bookingDates = await this.GetLiveElementText(bookingDateElement, "Booking Dates");
                checkInDate = bookingDates.split('-')[0];
                checkOutDate = bookingDates.split('-')[1];
                var differenceFromToday = await this.GetDateDifference(bookingDates.split('-')[0].trim());
                arrivalFromTodaySet.push(differenceFromToday);
            }
            else{
                var eta = "";
                var checkInDate = "";
                var checkOutDate = "";
                if(searchType.toLowerCase().trim() == "reservation number"){
                    var api_ReserveDates = await apiHelper.GetReservationDates(searchValue);
                    checkInDate = api_ReserveDates[0];
                    checkOutDate = api_ReserveDates[1];
                }
                else{
                    if(dateInput!=null){
                        checkInDate = dateInput[0];
                        checkOutDate = dateInput[1];
                    }
                }
            }

            

            etaSet.push(eta);
            checkInSet.push(checkInDate);
            checkOutSet.push(checkOutDate);
            roomStatusSet.push(roomStatus);

            // Reservation Details
            var dashboardDetails = [firstNameSet, lastNameSet, reservationSet, depositAmountSet, totalStayCostSet, balanceSet, 
                tierSet, adultSet, childSet, infantSet, accommodationNameSet, assignedRoomSet, etaSet, 
                checkInSet, checkOutSet, nightStaySet, roomStatusSet, resConfirmationSet,
                arrivalFromTodaySet, paymentTypeSet];
            var dashboardData = await this.dataSetup.SetReservationDetailsFromDashboard(dashboardDetails);
    
            // Get the manage booking button.
            var button = await this.FindSubElementOnElement(list[selectedIndex], this.arrowBtnXpath, "Arrow button");
            await this.ClickElement(button, "Arrow button");
    
            return dashboardData;
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

    // This will check what kind of payment was made.
    async VerifyPaymentType(balance:string, deposit:string, totalStay:string){
        try{
            var paymentType = "";
            if(parseFloat(balance) <= 0){
                if(parseFloat(deposit) >= parseFloat(totalStay)){
                    paymentType = typeOfPayment.paid;
                }
                else{
                    throw new Error("Negative or lesser payment should not be included in fully paid reservation.\nDeposit: " 
                    + deposit);
                }
            }
            else if(parseFloat(balance) < parseFloat(totalStay)){
                if(parseFloat(deposit) < parseFloat(totalStay)){
                    paymentType = typeOfPayment.unpaid;
                }
                else{
                    throw new Error("Greater or equal payment should not be included in partially paid reservation.\nDeposit: " 
                    + deposit);
                }
            }
            else if(parseFloat(balance) == parseFloat(totalStay)){
                if(parseFloat(deposit) == 0){
                    paymentType = typeOfPayment.unpaid;
                }
                else if(parseFloat(deposit) > parseFloat(totalStay)){
                    paymentType = typeOfPayment.paid;
                }
                else{
                    throw new Error("Deposit should not have value.\nDeposit: " 
                    + deposit);
                }
            }
            else{
                throw new Error("Error in balance.\nBalance: " 
                    + balance);
            }
            return paymentType;
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

     // Select criteria from dropdown, input value in search field and confirm search CTA
     async SelectCriteria(criteria: string){
        try{
            await this.WaitForElement(this.dropdownXPath, "Search Criteria dropdown");
            switch(criteria.toLowerCase().trim()){
            case "given":
                await this.SelectFromDropdown(this.dropdownXPath, "value", criteria, "Given");
                break;
            case "surname":
                await this.SelectFromDropdown(this.dropdownXPath, "value", criteria, "Lastname");
                break;
            case "mobile":
                await this.SelectFromDropdown(this.dropdownXPath, "value", criteria, "Mobile");
                break;
            case "email":
                await this.SelectFromDropdown(this.dropdownXPath, "value", criteria, "Email");
                break;
            case "reservationids":
                await this.SelectFromDropdown(this.dropdownXPath, "value", criteria, "Reservation Number");
                break;
            case "membershipnumber":
                await this.SelectFromDropdown(this.dropdownXPath, "value", criteria, "Member Number");
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

    // This will input in search field
    async InputSearchField(searchValue: string){
        try{
            await this.enterValue(this.inputFieldXPath, searchValue, "Search Field");
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

    // This will click the confirm button
    async ClickConfirmSearchCTA(){
        try{
            
            await this.Click(this.searchBtnXPath, "Seach CTA");
            await this.waitForElementToBeHidden(this.searchBtnspinnerXPath);
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

    // Find a booking.
    async FindABooking(searchType: string, searchValue: string, tableType: string = "Arrivals", returnResult: boolean = true){
        try{
            // Set variables.
            var tableValue = tbl_Arriving;
            var criteriaType = "";
    
            if(tableType.toLowerCase().trim()!="search"){
                // Enter value in the find a booking field.
                await this.enterValue(this.txt_SearchBooking, searchValue, "Find a booking textbox");
            }
            else{
                // Select criteria based on specific search type input.
                switch(searchType.toLowerCase().trim()){
                    case "reservation number":
                        criteriaType = "reservationIds";
                        break;
                }
                
                // Select specific creteria from the dropdown.
                await this.SelectCriteria(criteriaType);
    
                // Input the specific value based on the criteria.
                await this.InputSearchField(searchValue);
    
                // this will click confirm search CTA
                await this.ClickConfirmSearchCTA();
            }
    
            // Set table type.
            switch(tableType.toLowerCase().trim()){
                case "arrivals":
                    var tableValue = tbl_Arriving;
                    break;
                case "in house":
                    var tableValue = tbl_InHouse;
                    break;
                case "departing":
                    var tableValue = tbl_Departing;
                    break;
                case "upcoming":
                    var tableValue = tbl_Upcoming;
                    break;
                case "search":
                    var tableValue = tbl_Search;
                    break;
            }
    
            // Capture the search reservation.
            await this.ScreenShot("Search Reservation Result");
    
            // Check the reservation number
            switch(searchType.toLowerCase().trim()){
                case "reservation number":
                    var table  = await this.FindElements(this.tableXpath.replace("tblValue",tableValue), "Table");
                    var reservation = await this.FindSubElementOnElement(table[0], this.reservationXpath,"Reservation Number");
                        if(!returnResult){
                            if(await this.SubElementExist(table[0], this.reservationXpath, 5000)){
                                throw new Error("Reservation was still still displayed.");
                            }
                            else{
                                console.log(searchValue + " was NOT displayed in " + tableType);
                            }
                        }
                        else{
                            if(await this.SubElementExist(table[0], this.reservationXpath, 5000)){
                                var reservationNumber = await this.GetLiveElementText(reservation, "Reservation number");
                                if(reservationNumber!=searchValue){
                                    throw new Error("Expected reservation number did not matched.\nExpected: " + searchValue + 
                                    "\nActual: " + reservationNumber);
                                }
                            }
                            else{
                                throw new Error("Reservation was not found using " + searchValue);
                            }
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

    
}