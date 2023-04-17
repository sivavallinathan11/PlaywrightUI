import { errors, Page } from "@playwright/test";
import { DataSetup } from "../data/datasetup";
import { TransactionType } from "../data/API";
import { TestDirectory } from "../data/directory";
import { DashboardDetails } from "../data/managebookings";
import { Common } from "./Common";
import { bookingStatus, checkIn, dateInput, GuestDatawithWhitelistedEmail, paymentMethod } from "../data/users";
import { AccommodationDetails, CustomerDetails, PaymentDetails } from "../data/bookings";
import { BookingDashboardPage } from "./BookingDashboardPage";
import { EditBookingPage } from "./EditBookingPage";

export class CheckInPage extends Common{
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
    // Label
    public lbl_Firstname = "//div[@class='user-details user-firstname']";
    public lbl_Lastname = "//div[@class='user-details user-surname']";
    public lbl_ReservationNumber = "//span[@class='manage-booking-number']";
    public lbl_AccommodationName = "#accommodation-name";
    public lbl_AssignedRoom = "//div[@id='individual']/div/div/div[1]/div[2]";
    public lbl_Nights = "//div[@id='individual']/div/div/div[2]/div[1]";
    public lbl_ReservationDates = "//div[@id='individual']/div/div/div[2]/div[2]";
    public lbl_Guests = "//div[@id='individual']/div/div/div[3]/div[1]";
    public lbl_GuestsDetails = "//div[@id='individual']/div/div/div[3]/div[2]";
    public lbl_EftType = "xpath=child::div/span[2]";
    public lbl_PaymentAmount = "xpath=child::span";
    public lbl_CreditCardFee = "//span[@class='red']";
    public lbl_NumberOfTransactions = "//div[@class='manage-booking-section payment-section center-sections']/div[contains(@class, 'transaction')]";
    public lbl_CheckInComplete = "#checkin-title";
    public lbl_IsNowCheckedIn = "//span[@class='checkin-text']";
    public lbl_CheckInName = "#checkin-name";

    // Checkbox
    public chk_CovidDeclaration = "#declare";
    public chk_TermsAndConditions = "#terms";

    // Button
    public btn_CancelBooking = "#cancel-booking-checkin";
    public btn_CompleteCheckIn = "#complete-checkin-cta";
    public btn_BookingDashboard = "#booking-dashboard";
    public btn_ReturnBooking = "#manage-booking-href";

    // Link
    public link_Dashboard = "//li//a[@href='/Booking']";

    // Modal
    public mdl_CompleteCheckIn = "//div[@id='complete-checkin-modal']//div[@class='modal-body']";

    // **Function Starts Here**

    // Verify Check in page is displayed
    async VerifyCheckInPage(bookingDetails: DashboardDetails){
        try{
            // Initialize variables
            var firstname = await this.GetElementText(this.lbl_Firstname, "Firstname");
            var lastname = await this.GetElementText(this.lbl_Lastname, "Lastname");
            var reservationNumber = await this.GetElementText(this.lbl_ReservationNumber, "Reservation Number");
            var accommodationName = await this.GetElementText(this.lbl_AccommodationName, "Room Name");
            var assignedRoom = await this.GetElementText(this.lbl_AssignedRoom, "Room Id");
            var reservationDates = await this.GetElementText(this.lbl_ReservationDates, "Reservation Dates");
            var night = await this.GetElementText(this.lbl_Nights, "Night count");
            var guests = await this.GetElementText(this.lbl_Guests, "Guests");
            var detailedGuests = await this.GetElementText(this.lbl_GuestsDetails, "Adults, Child & Infant");
            var initialChild = detailedGuests.split(",")[1];
            var adult = detailedGuests.split(", ")[0];
            var child = initialChild.split(" & ")[0];
            var infant = detailedGuests.split("&")[1];

            // Verify guest name
            if(firstname.toLocaleLowerCase()!=bookingDetails.customerFirstName[0].toLocaleLowerCase()){
                throw new Error("Expected firstname did not matched.\nExpected: " + bookingDetails.customerFirstName[0] + 
                "\nActual: " + firstname);
            }

            if(lastname.toLocaleLowerCase()!=bookingDetails.customerLastName[0].toLocaleLowerCase()){
                throw new Error("Expected lastname did not matched.\nExpected: " + bookingDetails.customerLastName[0] + 
                "\nActual: " + lastname);
            }

            // Verify Reservation number
            if(reservationNumber!=bookingDetails.reservationNumber[0]){
                throw new Error("Expected reservation number did NOT matched.\nExpected: " + bookingDetails.ReservationNumber[0] + 
                "\nActual: " + reservationNumber);
            }

            // Verify accommodation name.
            if(accommodationName.trim().toLowerCase()!=bookingDetails.accommodationName[0].trim().toLowerCase()){
                throw new Error("Expected accommodation did not matched.\nExpected: " + bookingDetails.AccommodationName[0] + 
                "\nActual: " + accommodationName);
            }

            // Verify accommodation ID.
            if(assignedRoom.trim().toLowerCase()!=bookingDetails.assignedRoom[0].trim().toLowerCase()){
                throw new Error("Expected accommodation ID did not matched.\nExpected: " + bookingDetails.AssignedRoom[0] + 
                "\nActual: " + assignedRoom);
            }

            // Verify checkin date.
            if (typeof(bookingDetails.checkInDate[0]) != "undefined"){
                if(bookingDetails.CheckInDate[0] != ""){
                    var expectedCheckinDate = await this.FormatDateToManageBookingDate(bookingDetails.checkInDate[0]);
                }
                else{
                    var expectedCheckinDate = await this.FormatDateToManageBookingDate(dateInput.toString());
                }
            }
            else{
                var expectedCheckinDate = await this.FormatDateToManageBookingDate(dateInput.toString());
            }

            if(reservationDates.split('-')[0].trim()!=expectedCheckinDate){
                throw new Error("Expected check-in date did not matched.\nExpected: " + expectedCheckinDate + 
                "\nActual: " + reservationDates.split('-')[0].trim());
            }

            if(typeof(bookingDetails.checkOutDate[0]) != "undefined"){
                if(bookingDetails.checkOutDate[0]){
                    var expectedCheckOutDate = await this.FormatDateToManageBookingDate(bookingDetails.checkOutDate[0]);
                    if(reservationDates.split('-')[1].trim()!=expectedCheckOutDate){
                        throw new Error("Expected check-out date did not matched.\nExpected: " + expectedCheckOutDate + 
                        "\nActual: " + reservationDates.split('-')[1].trim());
                    }
                }
            }

            // Verify number of nights.
            var expectedNights = await this.GetTotalNights(reservationDates);
            if(night.split(" ")[0]!=expectedNights){
                throw new Error("Expected night(s) did not matched.\nExpected: " + expectedNights + 
                "\nActual: " + night.split(" ")[0]);
            }
            
            // Get the expected guest count from the dashboard.
            var adultCount = bookingDetails.adult[0];
            var childCount = bookingDetails.child[0];
            var infantCount = bookingDetails.infant[0];
            if(adult.split(" ")[0]!=adultCount){
                throw new Error("Expected adult count did not matched.\nExpected: " + adultCount + 
                "\nActual: " + adult);
            }
            if(child.trim().split(" ")[0]!=childCount){
                throw new Error("Expected child count did not matched.\nExpected: " + childCount + 
                "\nActual: " + child);
            }
            if(infant.trim().split(" ")[0]!=infantCount){
                throw new Error("Expected infant count did not matched.\nExpected: " + infantCount + 
                "\nActual: " + infant);
            }

            // Verify total number of guests
            var guestsCount = guests.split(" ")[0];
            var expectedGuestsCount = parseInt(adultCount) + parseInt(childCount) + parseInt(infantCount);
            if(parseInt(guestsCount)!=expectedGuestsCount){
                throw new Error("Expected total number of guests did not matched.\nExpected: " + expectedGuestsCount + 
                "\nActual: " + guestsCount);
            }

            await this.ScreenShot("Check In Page");
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

    // This click cancel booking button
    async ClickCancelBooking(){
        try{
            await this.Click(this.btn_CancelBooking, "Cancel Booking Button");
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

    // This will verify the payments in manage booking page
    async VerifyPayments(paymentDetails: PaymentDetails){
        // try{
        //     // Get and Verify payment type and amount
        //     var paymentTypeElement = await this.FindElements(this.lbl_EftType, "Payment Type");
        //     var paymentAmountElement = await (this.FindElements(this.lbl_PaymentAmount, "Payment Amount"));
        //     var creditCardFee = 0.00;
        //     var counter1 = 0;
        //     var counter2 = 0;
        //     do{
        //         if(paymentDetails[counter1]['transactionType'] == TransactionType.receipt){
        //             var initialPaymentDate = paymentDetails[counter1]['dateOfTransaction'].split("T")[0];
        //             var expectedPaymentDate = (await this.FormatDateToManagePaymentDate(initialPaymentDate)).toString();
        //             var expectedPaymentType = paymentDetails[counter1]['paymentMethod']+" "+expectedPaymentDate;
        //             var expectedPaymentAmount = paymentDetails[counter1]['amount'].toFixed(2);
        //             var actualPaymentType = await this.GetLiveElementText(paymentTypeElement[counter1-counter2], "Payment Type");
        //             var initialPaymentAmount = await this.GetLiveElementText(paymentAmountElement[counter1-counter2], "Payment Amount");
        //             var actualPaymentAmount = initialPaymentAmount.split("$")[1];
        //             if(actualPaymentType.toLowerCase() != expectedPaymentType.toLowerCase()){
        //                 throw new Error("Payment method and date did NOT matched. \nExpected: " + expectedPaymentType.toLowerCase() +
        //                 "\nActual: "+actualPaymentType.toLowerCase())
        //             }
        //             if(actualPaymentAmount != expectedPaymentAmount){
        //                 throw new Error("Payment amount did NOT matched. \nExpected: " + expectedPaymentAmount +
        //                 "\nActual: "+actualPaymentAmount)
        //             }else{
        //                 counter1++;
        //             }
        //         }else{
        //             creditCardFee = creditCardFee + paymentDetails[counter1]['amount'];
        //             counter2++;
        //             counter1++;
        //         }
        //     }while(counter1 < paymentDetails.length)

        //     if(creditCardFee != 0.00){
        //         var actualCreditCardFee = await this.GetElementText(this.lbl_CreditCardFee, "Total Credit Card Fee");
        //         if(actualCreditCardFee.replace("- $","") != creditCardFee.toFixed(2)){
        //             throw new Error("Expected Total credit card fee did NOT matched. \nExpected: " + creditCardFee +
        //                 "\nActual: "+actualCreditCardFee.replace("- $",""))
        //         }
        //     }
        // }catch(e){
        //     await this.ScreenShot("Failed", false, e.stack);
        //     if(e instanceof errors.TimeoutError){
        //         throw new Error(e.stack);
        //     }
        //     else{
        //         throw new Error(e.stack);
        //     }
        // }
        try{
            var paymentDate: any [] = [], paymentType: any [] = [], paymentAmount: any [] = [], ccFee: any [] = [];
            // This function will get all the payment details
            await this.WaitForElement(this.lbl_NumberOfTransactions, "Payments Made");
            var payments = await this.FindElements(this.lbl_NumberOfTransactions, "Number of payments made");
            for(var i = 0; i<payments.length; i++){
                    var paymentTypeAndDateElement = await this.FindSubElementOnElement(payments[i], this.lbl_EftType, "Payment Type and Date");
                    var paymentAmountElement = await this.FindSubElementOnElement(payments[i], this.lbl_PaymentAmount, "Payment Amount");
                    var typedate = await this.GetLiveElementText(paymentTypeAndDateElement, "Payment Date");
                    var type = typedate.split(" ")[0];
                    var date = typedate.split(" ")[1];
                    var amount = await this.GetLiveElementText(paymentAmountElement, "Payment Amount")
                    paymentType.push(type);
                    paymentDate.push(date);
                    paymentAmount.push(amount);
                    if(type.toLowerCase().trim() == paymentMethod.eftpos){
                        var cardSurchargeElement = await this.FindElement(this.lbl_CreditCardFee, "Credit Card Fee");
                        var surcharge = await this.GetLiveElementText(cardSurchargeElement, "Credit Card Fee");
                        ccFee.push(surcharge);
                    }
            }
        
            
            for(var i = 0; i<paymentDetails.paymentType.length; i++){
                // This function will verify each payments
                var day = paymentDetails.paymentDate[i].split("/")[0];
                var month = paymentDetails.paymentDate[i].split("/")[1];
                var year = paymentDetails.paymentDate[i].split("/")[2];
                const expectedDate = day+"/"+month+"/"+year.replace("20","");
                if(expectedDate != paymentDate[0].replace("Payment ", "")){
                    throw new Error ("Payment Date did not matched"
                    +"\n Actual: "+ paymentDate[0]
                    +"\n Expected: "+ expectedDate);
                }

                if(paymentDetails.paymentType[i].toLowerCase().trim() != paymentType[0].toLowerCase().trim()){
                    throw new Error ("Payment Type did not matched"
                    +"\n Actual: "+ paymentType[0]
                    +"\n Expected: "+ paymentDetails.paymentType);
                }

                if(paymentDetails.totalPayment[i] != paymentAmount[0].replace("+ $","")){
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

    // This will verify is Complete check in cta is disabled
    async VerifyCTA(){
        try{
            var completeCheckInCTA = await this.FindElement(this.btn_CompleteCheckIn, "Complete Check In");
            var covidDec = await this.FindElement(this.chk_CovidDeclaration, "Covid Declaration");
            var termsAndCondition = await this.FindElement(this.chk_TermsAndConditions, "Terms and Condition");
            if(!await covidDec.isChecked || !await termsAndCondition.isChecked){
                if(await completeCheckInCTA.isDisabled){
                    console.log("Complete Check In is Disabled");
                }else{
                    throw new Error("Complete Check In Button was not disabled");
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

    // This verify if check in complete
    async VerifyCheckInComplete(accomdDetails: AccommodationDetails, guestDetails: CustomerDetails){
        try{
            var index = Math.round(Math.random())
            if(await this.ElementExist(this.lbl_CheckInComplete)){
                var checkInName = await this.GetElementText(this.lbl_CheckInName, "Check In Name");
                var completeName = guestDetails.firstName+" "+guestDetails.lastName;
                if(await this.elementExist(this.lbl_IsNowCheckedIn) && await this.ElementExist(this.mdl_CompleteCheckIn)){
                    if(completeName != checkInName){
                        throw new Error("Checked in name is incorrect."
                        +"\n Actual: "+checkInName
                        +"\n Expected: "+completeName);
                    }else{
                        console.log(completeName+" "+checkIn.isNowCheckIn);
                        if(await this.ElementExist(this.btn_BookingDashboard) && await this.ElementEnabled(this.btn_ReturnBooking)){
                            if(index == 0){
                                await this.Click(this.btn_BookingDashboard, "Booking Dashboard");
                            }else{
                                await this.Click(this.btn_ReturnBooking, "Return to Booking");
                                var editBooking = new EditBookingPage(this.page, this.dir);
                                await editBooking.VerifyBookingStatus(accomdDetails, bookingStatus.arrived);
                                await this.Click(this.link_Dashboard, "Dashboard");
                            }
                        }
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

    // This will proceed to check in the booking
    async ProceedToCheckIn(accomdDetails: AccommodationDetails, guestDetails: CustomerDetails){
        try{
            var completeCheckInCTA = await this.FindElement(this.btn_CompleteCheckIn, "Complete Check In");
            var covidDec = await this.FindElement(this.chk_CovidDeclaration, "Covid Declaration");
            var termsAndCondition = await this.FindElement(this.chk_TermsAndConditions, "Terms and Condition");
            await this.Sleep(1000);
            await this.ClickElement(covidDec, "Covid Declaration");
            await this.Sleep(1000);
            await this.ClickElement(termsAndCondition, "Terms and Condition");
            await this.Sleep(1000);
            await this.ClickElement(completeCheckInCTA, "Complete Check In");
            await this.VerifyCheckInComplete(accomdDetails, guestDetails);
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