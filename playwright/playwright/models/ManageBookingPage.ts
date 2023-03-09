import { errors, Page } from "@playwright/test";
import { TransactionType } from "../data/API";
import { CustomerDetails } from "../data/bookings";
import { DataSetup } from "../data/datasetup";
import { TestDirectory } from "../data/directory";
import { DashboardDetails } from "../data/managebookings";
import { CCSurcharge, dateInput, paymentMethod, transactionType } from "../data/users";
import { Common } from "./Common";

export class ManageBookingPage extends Common{
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

    // Label (New manage booking page (Edit Booking Page))
    // public lbl_ManageBookingNumber = "//div[not(boolean(@hidden))]/*[@class='manage-booking-number']";
    // public lbl_AccommodationName = "//div[@class='accommodation-details']//h4";
    // public lbl_AssignedRoom = "//div[@class='booking-result-section']/div[@class='summary']//h4";
    // public lbl_ReservationDates = "//div[@class='booking-result-section']/div[@class='summary']//p[1]/span[3]";
    // public lbl_Nights = "//div[@class='booking-result-section']/div[@class='summary']//p[1]/span[2]";
    // public lbl_Guests = "//div[@class='booking-result-section']/div/div[2]/p[2]/span[3]";
    // public lbl_Adult = "#adult_count";
    // public lbl_Child = "#child_count";
    // public lbl_Infant = "#infant_count";
    // public lbl_ReservationNumber = "//span[@class='manage-booking-number']";

    // Button old manage booking page
    public btn_CancelBooking = "#cancel-booking";
    public btn_ManageBookingCheckIn = "//button[text()=' Check in']";

    // Label (Old manage booking page)
    public lbl_Firstname = "//div[@class='user-details user-firstname']";
    public lbl_Lastname = "//div[@class='user-details user-surname']";
    public lbl_ManageBookingNumber = "//div[not(boolean(@hidden))]/*[@class='manage-booking-number']";
    public lbl_AccommodationName = "#accommodation-name";
    public lbl_AssignedRoom = "#room-name";
    public lbl_ReservationDates = "#reservation-dates";
    public lbl_Nights = "#nights";
    public lbl_Adult = "#adult-count";
    public lbl_Child = "#child-count";
    public lbl_Infant = "#infant-count";
    public lbl_ReservationNumber = "//span[@class='manage-booking-number']";
    public lbl_EftType = "//div[@class='manage-booking-container']//span[@class='eft-type']";
    public lbl_PaymentAmount = "//div[@class='manage-booking-container']//span[@class='payment-included']";
    public lbl_CreditCardFee = "//span[@class='red']";

    // Section
    public sec_GuestContactInfo = "//div[not(boolean(@hidden))]/*[@class='manage-booking-number']";

    // Text Field
    public txt_Firstname = "";
    public txt_Lastname = "";
    public txt_Velocity = "#velocityInput";

    // **Function Starts Here**

    // Verify Manage Booking page is displayed.
    async VerifyManageBookingPage(bookingDetails: DashboardDetails){
        try{
            var firstname = await this.GetElementText(this.lbl_Firstname, "Firstname");
            var lastname = await this.GetElementText(this.lbl_Lastname, "Lastname");
            var reservationNumber = await this.GetElementText(this.lbl_ReservationNumber, "Reservation Number");
            var accommodationName = await this.GetElementText(this.lbl_AccommodationName, "Room Name")
            var assignedRoom = await this.GetElementText(this.lbl_AssignedRoom, "Room Id");
            var reservationDates = await this.GetElementText(this.lbl_ReservationDates, "Reservation Dates");
            var night = await this.GetElementText(this.lbl_Nights, "Night count");
            var adult = await this.GetElementText(this.lbl_Adult, "Adult count");
            var child = await this.GetElementText(this.lbl_Child, "Child count");
            var infant = await this.GetElementText(this.lbl_Infant, "Infant count");

            // Verify guest name
            if(firstname.toLocaleLowerCase()!=bookingDetails.CustomerFirstName[0].toLocaleLowerCase()){
                throw new Error("Expected firstname did not matched.\nExpected: " + bookingDetails.CustomerFirstName[0] + 
                "\nActual: " + firstname);
            }

            if(lastname.toLocaleLowerCase()!=bookingDetails.CustomerLastName[0].toLocaleLowerCase()){
                throw new Error("Expected lastname did not matched.\nExpected: " + bookingDetails.CustomerLastName[0] + 
                "\nActual: " + lastname);
            }

            // Verify Reservation number
            if(reservationNumber!=bookingDetails.ReservationNumber[0]){
                throw new Error("Expected reservation number did NOT matched.\nExpected: " + bookingDetails.ReservationNumber[0] + 
                "\nActual: " + reservationNumber);
            }

            // Verify accommodation name.
            if(accommodationName!=bookingDetails.AccommodationName[0]){
                throw new Error("Expected accommodation did not matched.\nExpected: " + bookingDetails.AccommodationName[0] + 
                "\nActual: " + accommodationName);
            }

            // Verify accommodation ID.
            if(assignedRoom!=bookingDetails.AssignedRoom[0]){
                throw new Error("Expected accommodation ID did not matched.\nExpected: " + bookingDetails.AssignedRoom[0] + 
                "\nActual: " + assignedRoom);
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

            if(reservationDates.split('-')[0].trim()!=expectedCheckinDate){
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
            if(night!=expectedNights){
                throw new Error("Expected night(s) did not matched.\nExpected: " + expectedNights + 
                "\nActual: " + night);
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

            await this.ScreenShot("Manage Booking Page");
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

    // Step: Verify Booked Reservation is displayed in Manage Booking.
    async VerifyBookedReservationInManageBooking(bookingNumber: string){
        try{
            // Wait for selected reservation.
            if(!await this.ElementExist(this.lbl_ReservationNumber)){
                throw new Error("Check In page for selected reservation was NOT displayed.");
            }

            // get the reservation number and match values from dashboard.
            var reservationNumber = await this.GetElementText("//span[@class='manage-booking-number']", 'Reservation Number');
            if(reservationNumber!=bookingNumber){
                throw new Error("Expected reservation number did NOT matched.\nExpected: " + bookingNumber + 
                "\nActual: " + reservationNumber);
            }

            // Capture Manage Booking Page.
            await this.ScreenShot("Manage Booking Page");
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

    // This will verify the payments in manage booking page
    async VerifyPayments(paymentDetails: any){
        try{
            // Get and Verify payment type and amount
            var paymentTypeElement = await this.FindElements(this.lbl_EftType, "Payment Type");
            var paymentAmountElement = await (this.FindElements(this.lbl_PaymentAmount, "Payment Amount"));
            var creditCardFee = 0.00;
            var counter1 = 0;
            var counter2 = 0;
            do{
                if(paymentDetails[counter1]['transactionType'] == TransactionType.receipt){
                    var initialPaymentDate = paymentDetails[counter1]['dateOfTransaction'].split("T")[0];
                    var expectedPaymentDate = (await this.FormatDateToManagePaymentDate(initialPaymentDate)).toString();
                    var expectedPaymentType = paymentDetails[counter1]['paymentMethod']+" "+expectedPaymentDate;
                    var expectedPaymentAmount = paymentDetails[counter1]['amount'].toFixed(2);
                    var actualPaymentType = await this.GetLiveElementText(paymentTypeElement[counter1-counter2], "Payment Type");
                    var initialPaymentAmount = await this.GetLiveElementText(paymentAmountElement[counter1-counter2], "Payment Amount");
                    var actualPaymentAmount = initialPaymentAmount.split("$")[1];
                    if(actualPaymentType.toLowerCase() != expectedPaymentType.toLowerCase()){
                        throw new Error("Payment method and date did NOT matched. \nExpected: " + expectedPaymentType.toLowerCase() +
                        "\nActual: "+actualPaymentType.toLowerCase())
                    }
                    if(actualPaymentAmount != expectedPaymentAmount){
                        throw new Error("Payment amount did NOT matched. \nExpected: " + expectedPaymentAmount +
                        "\nActual: "+actualPaymentAmount)
                    }else{
                        counter1++;
                    }
                }else{
                    creditCardFee = creditCardFee + paymentDetails[counter1]['amount'];
                    counter2++;
                    counter1++;
                }
            }while(counter1 < paymentDetails.length)

            if(creditCardFee != 0.00){
                var actualCreditCardFee = await this.GetElementText(this.lbl_CreditCardFee, "Total Credit Card Fee");
                if(actualCreditCardFee.replace("- $","") != creditCardFee.toFixed(2)){
                    throw new Error("Expected Total credit card fee did NOT matched. \nExpected: " + creditCardFee +
                        "\nActual: "+actualCreditCardFee.replace("- $",""))
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

}