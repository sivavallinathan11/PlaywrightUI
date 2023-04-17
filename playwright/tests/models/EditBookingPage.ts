import { errors, Page } from "@playwright/test";
import { TransactionType } from "../data/API";
import { AccommodationDetails, CustomerDetails, PaymentDetails } from "../data/bookings";
import { DataSetup } from "../data/datasetup";
import { TestDirectory } from "../data/directory";
import { DashboardDetails } from "../data/managebookings";
import { buttonType, CCSurcharge, dateInput, paymentMethod, toastMessage, transactionType, typeOfPayment, bookingStatus, defaultValue } from "../data/users";
import { Common } from "./Common";
import { stat } from "fs";

export class EditBookingPage extends Common{
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
    // Button (New Manage booking page)
    //public btn_CancelBooking = "#cancel-booking-cta";

    // Div
    public div_MembershipCard = "//div[@class='booking-contacts-membership-card']";
    public div_ToastMessage = "//div[@class='toast-message']";

    // Label (New manage booking page (Edit Booking Page))
    // Test Env public lbl_ReservationDates = "//p[1]//span[@class='placeholder']";
    // Test Env public lbl_Nights = "//p[1]//span[@class='bold placeholder']";
    // Test Env public lbl_Guests = "//p[2]//span[@class='placeholder']";
    // Test Env public lbl_GuestsCount = "//p[2]//span[@class='bold placeholder']";
    public lbl_AccommodationDetails = "//div[@class='accommodation-details']//h4";
    public lbl_ReservationDates = "//p[1]//span[@class='bold']//following-sibling::span";
    public lbl_Nights = "//p[1]//span[@class='bold']";
    public lbl_Guests = "//p[2]//span[@class='']";
    public lbl_GuestsCount = "//p[2]//span[@class='bold']";
    public lbl_ReservationNumber = "//span[@class='manage-booking-number']";
    public lbl_TotalStay = "//div[@id='Transactions']/div/div[2]/span";
    public lbl_Balance = "//div[@class='total-section']/div[2]/div[2]//span";

    // Button old manage booking page
    public btn_CancelBooking = "#cancel-booking";
    public btn_ManageBookingCheckIn = "//button[@id='checkin-cta']";
    public btn_SaveChanges = "//div[@class='tab-content']/div[1]//input[@value='Save Changes']";
    public btn_MakePayment = "#make-payment-cta";
    public btn_BookignStatus = "//button[@id='booking-status']";

    // Links
    public link_EnterManualAddress = "//div[@class='tab-content']/div[1]//a[text()='Enter manual address']";

    // span
    public span_NumberOfPayments = "//div[@class='payments-section']/div[2]/div";
    public span_PaymentAmount = "xpath=child::p[2]/span";
    public span_PaymentDate = "xpath=child::p[1]/span";
    public span_PaymentType = "xpath=child::p[2]/span";
    public span_Surcharge = "//div[@class='Charges']/div[1]/div[2]//span";

    // Label (Old manage booking page)
    // public lbl_Firstname = "//div[@class='user-details user-firstname']";
    // public lbl_Lastname = "//div[@class='user-details user-surname']";
    // public lbl_ManageBookingNumber = "//div[not(boolean(@hidden))]/*[@class='manage-booking-number']";
    // public lbl_AccommodationName = "#accommodation-name";
    // public lbl_AssignedRoom = "#room-name";
    // public lbl_ReservationDates = "#reservation-dates";
    // public lbl_Nights = "#nights";
    // public lbl_Adult = "#adult-count";
    // public lbl_Child = "#child-count";
    // public lbl_Infant = "#infant-count";
    // public lbl_ReservationNumber = "//span[@class='manage-booking-number']";
    public lbl_EftType = "//div[@class='manage-booking-container']//span[@class='eft-type']";
    public lbl_PaymentAmount = "//div[@class='manage-booking-container']//span[@class='payment-included']";
    public lbl_CreditCardFee = "//span[@class='red']";

    // Section
    public sec_GuestContactInfo = "//div[not(boolean(@hidden))]/*[@class='manage-booking-number']";

    // Text Field
    public txt_Firstname = "//div[@class='tab-content']//div[@class='tab-pane in active']//input[@name='FirstName' and @type='text']";
    public txt_Lastname = "//div[@class='tab-content']//div[@class='tab-pane in active']//input[@name='LastName']";
    public txt_Email = "//div[@class='tab-content']//div[@class='tab-pane in active']//input[@name='Email']";
    public txt_CNumber = "//div[@class='tab-content']//div[@class='tab-pane in active']//input[@name='Mobile']";
    public txt_Address = "//div[@class='tab-content']//div[@class='tab-pane in active']//input[@name='Address']";
    public txt_Velocity = "#velocityInput";
    public txt_Street = "//div[@class='tab-content']/div[1]//input[@name='Street']";
    public txt_Suburb = "//div[@class='tab-content']/div[1]//input[@name='Suburb']";
    public txt_PostCode = "//div[@class='tab-content']/div[1]//input[@name='PostCode']";

    // Dropdown
    public drp_State = "//div[@class='tab-content']/div[1]//select[@name='State']";
    public drp_Country = "//div[@class='tab-content']/div[1]//select[@name='Country']";
    public drp_DefaultOption = "//div[@role='tabpanel'][1]//select[@name='Country']/option[2]";

    // **Function Starts Here**

    // Verify Manage Booking page is displayed.
    async VerifyManageBookingPage(bookingDetails: DashboardDetails){
        try{
            var reservationNumber = await this.GetElementText(this.lbl_ReservationNumber, "Reservation Number");
            var actualFirstname = await this.FindElement(this.txt_Firstname, "Firstname");
            var actualLastname = await this.FindElement(this.txt_Lastname, "Lastname");
            var actualEmail = await this.FindElement(this.txt_Email, "Email");
            var actualMobile = await this.FindElement(this.txt_CNumber, "Mobile Number");
            var actualAddress = await this.FindElement(this.txt_Address, "Address")
            var firstname = await this.GetElementValueByAttribute(actualFirstname, "value", "Firstname");
            var lastname = await this.GetElementValueByAttribute(actualLastname, "value", "Lastname");
            var email = await this.GetElementValueByAttribute(actualEmail, "value", "Email");
            var mobile = await this.GetElementValueByAttribute(actualMobile, "value", "Mobile");
            var address = await this.GetElementValueByAttribute(actualAddress, "value", "Address");
            
            var accommodationDetails = await this.GetElementText(this.lbl_AccommodationDetails, "Room Name")
            var accommodationName = accommodationDetails.split(" - ")[1];
            var assignedRoom = accommodationDetails.split(" - ")[0];
            var nights = (await this.GetElementText(this.lbl_Nights, "Nights")).split(" ")[0];
            var reservationDates = await this.GetElementText(this.lbl_ReservationDates, "Reservation Dates");
            var guestsCount = await this.GetElementText(this.lbl_GuestsCount, "Guests Count");
            var guests = await this.GetElementText(this.lbl_Guests, "Guests");
            var totalStay = (await this.GetElementText(this.lbl_TotalStay, "Total Stay Cost")).replace("$","");
            var totalBalance = (await this.GetElementText(this.lbl_Balance, "Total Balance")).replace("$ ","");
            var adult = 0;
            var child = 0;
            var infant = 0;
            if(guests.includes("Adults")){
                var actualCount = guests.split(", ")[0];
                adult = parseInt(actualCount.split(" ")[0]);
            }
            if(guests.includes("Child")){
                var actualCount = guests.split(", ")[1];
                child = parseInt(actualCount.split(" ")[0]);
            }
            if(guests.includes("Infant")){
                var actualCount = guests.split(", ")[2];
                infant = parseInt(actualCount.split(" ")[0]);
            }

            // Verify guest name
            if(firstname.toLocaleLowerCase().trim()!=bookingDetails.CustomerFirstName[0].toLocaleLowerCase().trim()){
                throw new Error("Expected firstname did not matched.\nExpected: " + bookingDetails.CustomerFirstName[0] + 
                "\nActual: " + firstname);
            }

            if(lastname.toLocaleLowerCase().trim()!=bookingDetails.CustomerLastName[0].toLocaleLowerCase().trim()){
                throw new Error("Expected lastname did not matched.\nExpected: " + bookingDetails.CustomerLastName[0] + 
                "\nActual: " + lastname);
            }

            // Verify Reservation number
            if(reservationNumber.trim()!=bookingDetails.ReservationNumber[0].trim()){
                throw new Error("Expected reservation number did NOT matched.\nExpected: " + bookingDetails.ReservationNumber[0] + 
                "\nActual: " + reservationNumber);
            }

            // Verify accommodation name.
            if(accommodationName.toLowerCase().trim()!=bookingDetails.AccommodationName[0].toLowerCase().trim()){
                throw new Error("Expected accommodation did not matched.\nExpected: " + bookingDetails.AccommodationName[0] + 
                "\nActual: " + accommodationName);
            }

            // Verify accommodation ID.
            if(assignedRoom.toLowerCase().trim()!=bookingDetails.AssignedRoom[0].toLowerCase().trim()){
                throw new Error("Expected accommodation ID did not matched.\nExpected: " + bookingDetails.AssignedRoom[0] + 
                "\nActual: " + assignedRoom);
            }

            // Verify Total Stay
            if(totalStay.trim()!=bookingDetails.totalStayCost[0].trim()){
                throw new Error("Expected total stay cost did not matched.\nExpected: " + bookingDetails.totalStayCost[0] + 
                "\nActual: " + totalStay);
            }

            // Verify Total Stay
            if(totalBalance.trim()!=bookingDetails.totalBalance[0].trim()){
                throw new Error("Expected balance did not matched.\nExpected: " + bookingDetails.totalBalance[0] + 
                "\nActual: " + totalBalance);
            }

            // Verify checkin date.
            if (typeof(bookingDetails.CheckInDate[0]) != "undefined"){
                if(bookingDetails.CheckInDate[0] != ""){
                    var expectedCheckinDate = await this.FormatDateToManageBookingDate(bookingDetails.CheckInDate[0]);
                }
                else{
                    var expectedCheckinDate = await this.FormatDateToManageBookingDate(dateInput.toString());
                }
            }
            else{
                var expectedCheckinDate = await this.FormatDateToManageBookingDate(dateInput.toString());
            }

            if(reservationDates.split('-')[0].trim()!=expectedCheckinDate.trim()){
                throw new Error("Expected check-in date did not matched.\nExpected: " + expectedCheckinDate + 
                "\nActual: " + reservationDates.split('-')[0].trim());
            }

            if(typeof(bookingDetails.CheckOutDate[0]) != "undefined"){
                if(bookingDetails.CheckOutDate[0]){
                    var expectedCheckOutDate = await this.FormatDateToManageBookingDate(bookingDetails.CheckOutDate[0]);
                    if(reservationDates.split('-')[1].trim()!=expectedCheckOutDate){
                        throw new Error("Expected check-out date did not matched.\nExpected: " + expectedCheckOutDate + 
                        "\nActual: " + reservationDates.split('-')[1].trim());
                    }
                }
            }

            // Verify number of nights.
            var expectedNights = await this.GetTotalNights(reservationDates);
            if(nights.trim()!=expectedNights.trim()){
                throw new Error("Expected night(s) did not matched.\nExpected: " + expectedNights + 
                "\nActual: " + nights);
            }

            // Get the expected guest count from the dashboard.
            var adultCount = bookingDetails.Adult[0];
            var childCount = bookingDetails.Child[0];
            var infantCount = bookingDetails.Infant[0];
            if(adult!=adultCount){
                throw new Error("Expected adult count did not matched.\nExpected: " + adultCount + 
                "\nActual: " + adult);
            }
            if(child!=childCount){
                throw new Error("Expected child count did not matched.\nExpected: " + childCount + 
                "\nActual: " + child);
            }
            if(infant!=infantCount){
                throw new Error("Expected infant count did not matched.\nExpected: " + infantCount + 
                "\nActual: " + infant);
            }

            var currentDetails = [firstname, lastname, email, mobile, address];
            await this.ScreenShot("Manage Booking Page");

            return currentDetails;
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

    // Click Cancel Booking button.
    async ClickCancelBooking(){
        try{
            await this.Sleep(10000);
            await this.Click(this.btn_CancelBooking, "Cancel Booking button");
            await this.ScreenShot("Cancel Booking Modal");
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

    // Step: This will verify the velocity number displayed in the manage booking.
    async VerifyVelocityNumberInManageBooking(guestDetails: CustomerDetails){
        try{
            // Get the velocity number.
            var actualVelocityNumber = await this.GetElementTextviaHTML(this.txt_Velocity, "Velocity Number field");
            var expectedVelocityNumber = guestDetails.VelocityNumber[0];
            if(actualVelocityNumber!=expectedVelocityNumber){
                throw new Error("Expected velocity numer did NOT matched.\nExpected: " + expectedVelocityNumber +
                "\nActual: " + actualVelocityNumber);
            }

            // Capture Velocity Number.
            await this.ScreenShot("Verified Velocity Number");
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

    // This will click Check In Button in Manage Booking Page
    async ClickManageBookingCheckInButton(){
        try{
            await this.Click(this.btn_ManageBookingCheckIn, "Manage Booking Check In Button");
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

    // This will check if saved changes btn is disabled/enabled
    async VerifySaveChangesCTA(){
        try{
            var element = await this.FindElement(this.btn_SaveChanges, "Save Changes CTA");
            var elementValue = await this.GetElementValueByAttribute(element,"class","Save Changes CTA");
            if(!elementValue.includes("disabled")){
                throw new Error("Save Changes should be disabled");
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

    // This will edit random fields in Guest Details
    async EditGuestDetails(details: any, fieldToEdit: string="All"){
        try{
            var randStr = await this.GenerateRandomString("alphanumeric", 3);
            var randEmail = await this.GenerateRandomEmail(details.emailAddress, "@gmail.com","Alphanumeric", 4);
            var randPhoneNumber = await this.GenerateRandomString("number", 6);
            var randStAddress: any;
            var streetNumber = details.address.split(" ")[0]
            do{
                randStAddress = await this.GenerateRandomString("number", 2);
            }while(randStAddress == streetNumber)
            var address = details.address.replace(streetNumber, randStAddress);
            switch(fieldToEdit.toLowerCase().trim()){
                case "all":
                    await this.EnterValue(this.txt_Firstname, details.firstname+randStr, "Firstname");
                    await this.EnterValue(this.txt_Lastname, details.lastname+randStr, "Lastname");
                    await this.EnterValue(this.txt_Email, randEmail, "Email");
                    await this.EnterValue(this.txt_CNumber, details.contactNumber+randPhoneNumber, "Phone Number");
                    await this.Sleep(1000);
                    await this.PressKey("Enter");
                    await this.EnterValue(this.txt_Address, address, "Address");
                    await this.Sleep(2000);
                    await this.PressKey("ArrowDown");
                    await this.Sleep(1000);
                    await this.PressKey("Enter");
                    break
                case "manual address":
                    await this.PressKey("Enter");
                    var street = details.address.split(",")[0];
                    var town = (details.address.split(",")[1]).trim();
                    var state = (details.address.split(",")[2]).trim();
                    var postcode = (details.address.split(",")[3]).trim();
                    var country = (details.address.split(",")[4]).trim();
                    await this.Click(this.link_EnterManualAddress, "Enter Manual Address");
                    await this.EnterValue(this.txt_Street, street,"Street");
                    await this.EnterValue(this.txt_Suburb, town, "Suburb");
                    await this.SelectFromDropdown(this.drp_State, "value", state, "State");
                    await this.EnterValue(this.txt_PostCode, postcode, "Postcode");
                    var defaultVal = await this.GetElementText(this.drp_DefaultOption, "Default Value");
                    if(defaultVal.toLowerCase().trim() != defaultValue){
                        await this.SelectFromDropdown(this.drp_Country, "value", country, "Country");
                    }
                    break;
                case "search address":
                    await this.EnterValue(this.txt_Address, address, "Address");
                    await this.Sleep(2000);
                    await this.PressKey("ArrowDown");
                    await this.Sleep(1000);
                    await this.PressKey("Enter");
                    break;
            }
            
            await this.Sleep(1000);
            await this.Click(this.btn_SaveChanges, "Save Chanages CTA");
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

    // This will verify the toast message
    async VerifyToastMessage(toastMessageType: string = "update", paymentDetails: any = "none"){
        try{
            if(await this.elementExist(this.div_ToastMessage, 20000)){
                var toastMsg = await this.GetElementText(this.div_ToastMessage, "Toast Message");
                if(toastMsg != toastMessage.update){
                    throw new Error(toastMsg);
                }else{
                    // console.log("Update Successful!");
                }
            }else{
                throw new Error("Toast Message does NOT show");
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

    // This will click make payment
    async ClickMakePayment(){
        try{
            await this.Sleep(5000);
            await this.Click(this.btn_MakePayment, "Make Payment Button");
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

    // Verify edited guest details
    async VerifyEditedGuestDetails(currentDetails: string [] = [], guestDetails: CustomerDetails, bookingDetails: DashboardDetails, edittedDetails: string = "all"){
        try{
            // Get data
            var actualFirstname = await this.FindElement(this.txt_Firstname, "Firstname");
            var actualLastname = await this.FindElement(this.txt_Lastname, "Lastname");
            var actualEmail = await this.FindElement(this.txt_Email, "Email");
            var actualMobile = await this.FindElement(this.txt_CNumber, "Mobile Number");
            var actualAddress = await this.FindElement(this.txt_Address, "Address")
            var firstname = await this.GetElementValueByAttribute(actualFirstname, "value", "Firstname");
            var lastname = await this.GetElementValueByAttribute(actualLastname, "value", "Lastname");
            var email = await this.GetElementValueByAttribute(actualEmail, "value", "Email");
            var mobile = await this.GetElementValueByAttribute(actualMobile, "value", "Mobile");
            var address = await this.GetElementValueByAttribute(actualAddress, "value", "Address");
            var editedDetails = [firstname, lastname, email, mobile, address];

            // This will verify each details
            switch(edittedDetails.toLowerCase().trim()){
                case "all":
                    for(var i = 0; i < currentDetails.length; i++){
                        if(currentDetails[i] == editedDetails[i]){
                            throw new Error("Guest Details did not update. \n"
                            +"Details Before: "+currentDetails[i]+"\n"
                            +"Details After: "+editedDetails[i]);
                        }
                        if(await this.elementExist(this.div_MembershipCard, 3000) && (i==2)){
                            i++
                        }
                    }
                    // This will remove the current details and push the updated one to customer details.
                    guestDetails.firstName.pop();
                    guestDetails.lastName.pop();
                    guestDetails.mobile.pop();
                    guestDetails.firstName.push(firstname);
                    guestDetails.lastName.push(lastname);
                    guestDetails.mobile.push(mobile);

                    // This will remove the current details and push the updated one to dashboard details.
                    bookingDetails.customerFirstName.pop();
                    bookingDetails.customerLastName.pop();
                    bookingDetails.customerFirstName.push(firstname);
                    bookingDetails.customerLastName.push(lastname);
                    if(email != currentDetails[2]){
                        guestDetails.email.pop();
                        guestDetails.email.push(email);
                    }
                    break;
                case "address":
                    if(currentDetails[4] == editedDetails[4]){
                        throw new Error("Address did not update."
                        +"\n Actual: "+currentDetails[4]
                        +"\n Expected: "+editedDetails[4]);
                    }
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

    // Verify Toast message
    async VerifyPaymentToasTMsg(paymentDetails: PaymentDetails){
        try{
            var totalAmount = 0.00;
            for(var i = 0;i<paymentDetails.paymentType.length; i++){
                totalAmount = totalAmount + parseFloat(paymentDetails.totalPayment[i]);
            }
            if(await this.elementExist(this.div_ToastMessage)){
                var toastMsg = await this.GetElementText(this.div_ToastMessage, "Toast Message");
                if(toastMsg != toastMessage.payment.replace("{Payment}",totalAmount.toFixed(2))){
                    throw new Error("Success message is not equal"
                    +"\n Expected: "+toastMessage.payment.replace("{Payment}",totalAmount.toFixed(2))
                    +"\n Actual: "+toastMsg);
                }else{
                    // console.log(toastMsg);
                }
            }else{
            throw new Error("Toast Message does NOT show");
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

    // Verify if payment successful
    async VerifyPayments(paymentDetails: PaymentDetails){
        try{
            var paymentDate: any [] = [], paymentType: any [] = [], paymentAmount: any [] = [], ccFee: any [] = [];
            // This function will get all the payment details
            await this.WaitForElement(this.span_NumberOfPayments, "Payments Made");
            var payments = await this.FindElements(this.span_NumberOfPayments, "Number of payments made");
            for(var i = 0; i<payments.length; i++){
                if( i % 2 == 0){
                    var paymentDateElement = await this.FindSubElementOnElement(payments[i], this.span_PaymentDate, "Payment Date");
                    var paymentTypeElement = await this.FindSubElementOnElement(payments[i], this.span_PaymentType, "Payment Type");
                    var date = await this.GetLiveElementText(paymentDateElement, "Payment Date");
                    var type = await this.GetLiveElementText(paymentTypeElement, "Payment Type");
                    paymentDate.push(date);
                    paymentType.push(type);
                    if(type.toLowerCase().trim() == paymentMethod.eftpos){
                        var cardSurchargeElement = await this.FindElement(this.span_Surcharge, "Credit Card Fee");
                        var surcharge = await this.GetLiveElementText(cardSurchargeElement, "Credit Card Fee");
                        ccFee.push(surcharge);
                    }
                }else{
                    var paymentAmountElement = await this.FindSubElementOnElement(payments[i], this.span_PaymentAmount, "Payment Amount");
                    var amount = await this.GetLiveElementText(paymentAmountElement, "Payment Amount");
                    paymentAmount.push(amount)
                }
            }

            for(var i = 0; i<paymentDetails.paymentType.length; i++){
                // This function will verify each payments
                if(paymentDetails.paymentDate[i] != paymentDate[i].replace("Payment ", "")){
                    throw new Error ("Payment Date did not matched"
                    +"\n Actual: "+ paymentDate[0]
                    +"\n Expected: "+ paymentDetails.paymentDate);
                }

                if(paymentDetails.paymentType[i].toLowerCase().trim() != paymentType[i].toLowerCase().trim()){
                    throw new Error ("Payment Type did not matched"
                    +"\n Actual: "+ paymentType[0]
                    +"\n Expected: "+ paymentDetails.paymentType);
                }

                if(paymentDetails.totalPayment[i] != paymentAmount[i].replace("$","")){
                    throw new Error ("Payment Amount did not matched"
                    +"\n Actual: "+ paymentAmount[0]
                    +"\n Expected: "+ paymentDetails.totalPayment);
                }

                if(paymentDetails.paymentType[i].toLowerCase().trim() == paymentMethod.eftpos){
                    if(paymentDetails.Surcharge != ccFee[0]){
                        throw new Error ("Payment Amount did not matched"
                        +"\n Actual: "+ ccFee[0]
                        +"\n Expected: "+ paymentDetails.Surcharge);
                    }
                }
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

    // Verify if cancel and make payment CTA are disabled
    async VerifyCTA(){
        try{
            var makePaymentElement = await this.FindElement(this.btn_MakePayment, "Make Payment");
            var makePaymentClass = await this.GetElementValueByAttribute(makePaymentElement, "class", "Make Payment");
            if(makePaymentClass.toLowerCase().trim() != buttonType){
                throw new Error("Make payment button is not disabled");
            }else{
                // console.log("Make payment button is disabled");
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

    async VerifyBookingStatus(accomDetails: AccommodationDetails, status: string){
        try{
            var reservationNumber = await this.GetElementText(this.lbl_ReservationNumber, "Reservation Number");
            var actualBookingStatus = await this.GetElementText(this.btn_BookignStatus, "Booking Status");
            if(accomDetails.reservationNumber[0] == reservationNumber){
                if(status.toLowerCase().trim() != actualBookingStatus.toLowerCase().trim()){
                    throw new Error("Booking status was not in "+bookingStatus.arrived
                    +"\n Actual: "+actualBookingStatus
                    +"\n Expected: "+status);
                }else{
                    // console.log("Booking is in "+status);
                }
            }else{
                throw new Error("Navigated to wrong reservation"
                +"\n Actual: "+reservationNumber
                +"\n Expected: "+accomDetails.reservationNumber[0]);
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