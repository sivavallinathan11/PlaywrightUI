import { errors, Page } from "@playwright/test";
import { AccommodationDetails, PaymentDetails } from "../data/bookings";
import { TestDirectory } from "../data/directory";
import { Common } from "./Common";

export class BookingConfirmationModal extends Common{
    // Set page object variable.
    readonly page: Page

    // Set a sub routine that will access the functions from parent and sibling class.
    constructor(page: Page, dir: TestDirectory){
        super(page, dir);
        this.page = page;
    }

    // Set XPaths, Element IDs and other attributes.
    // Modal.
    public modal_BookingConfirmation = "#gr-reserve-modal-container";

    // Icon.
    public icon_BookingComplete = "//*[@id='gr-reserve-modal-container']//div[contains(@class, 'booking-name')]/p/img";

    // Label.
    public lbl_BookingComplete = "//*[@id='gr-reserve-modal-container']//h1[text()='Booking Complete!']";
    public lbl_PaymentFee = "//*[@id='gr-reserve-modal-container']//*[contains(@class,'payment-type')]//span[1]";
    public lbl_PaymentBalance = "//*[@id='gr-reserve-modal-container']//*[contains(@class,'payment-type')]//span[2]";
    public lbl_DueDate = "//*[@id='gr-reserve-modal-container']//*[contains(@class,'payment-type')]//span[2]";
    public lbl_BookingId = "//*[@id='gr-reserve-modal-container']//*[contains(@class,'booking-name')]//sub";
    public lbl_StayDuration = "//*[@id='gr-reserve-modal-container']//*[@class='payment-booking-details']//p[@class='info']";
    public lbl_ReservationDate = "//*[@id='gr-reserve-modal-container']//*[@class='details-info'][1]/div[2]/p[1]";
    public lbl_TotalGuestCount = "//*[@id='gr-reserve-modal-container']//*[@class='details-info'][2]/div[2]/p[1]";
    public lbl_GuestCount = "//*[@id='gr-reserve-modal-container']//*[@class='details-info'][2]/div[2]/p[2]";
    public lbl_AccommodationName = "//*[@id='gr-reserve-modal-container']//*[@class='details-info'][3]/div[2]/p[2]";
    public lbl_PaymentType = "//*[@class='confirmed-booking-total']/div[@class='row payment-total-entry']/div[1]";
    public lbl_ConfirmedPaymentAmount = "//*[@class='confirmed-booking-total']/div[@class='row payment-total-entry']/div[2]/span";
    public lbl_Surcharge = "//*[@class='confirmed-booking-total']/div[@class='row payment-total-entry'][2]/div[2]/span";
    public lbl_AmountDue = "//*[@class='confirmed-booking-total']//span[@class='amount']";
    public lbl_PaidStatus = "//*[@class='confirmed-booking-total']//span[@class='paid']";

    // Button.
    public btn_ManageBooking = "//button[text()='Manage booking']";
    public btn_GoToArrivalsDashboard = "//button[text()='Go to Arrivals dashboard']";

    // Step:  This will verify booking confirmation modal.
    async VerifyBookingConfirmationModal(){
        try{
            // Wait for Booking Confirmation modal to be displayed.
            await this.WaitForElement(this.modal_BookingConfirmation, "Booking Confirmation Modal");
            await this.WaitForElement(this.icon_BookingComplete, "Booking Complete icon");

            // Verify expected buttons.
            if(!await this.ElementExist(this.btn_ManageBooking)){
                throw new Error("Manage booking button was NOT displayed.");
            }
            if(!await this.ElementExist(this.btn_GoToArrivalsDashboard)){
                throw new Error("Go to Arrivals dashboard button was NOT displayed.");
            }

            // Capture Booking Confirmation Modal.
            await this.ScreenShot("Booking Confirmation Modal");
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

    // Step:  Verify confirmation message
    async VerifyConfirmationDetails(payment: PaymentDetails, details: any){
        try{

            // Verify successful booking reservation.
            if(!await this.ElementExist(this.lbl_BookingComplete, 5000)){
                throw new Error("Booking reservation was NOT successful");
            }

            // Verify balance details
            if(payment.PaymentType[0].toLowerCase().trim()=="skip"){
                // Check if balance due is matched.
                var initialBalance = await this.GetElementText(this.lbl_PaymentFee, "Outstanding Balance");
                var balance = initialBalance.replace('$','').replace(',','').trim();
                if(balance!=payment.TotalBalance[0]){
                    throw new Error("Expected balance due did NOT matched.\nExpected: " + payment.TotalBalance + 
                    "\nActual: " + balance);
                }

                // Check if due date is matched.
                var initialDueDate: any;
                if(details.arrival <= 0){
                    initialDueDate = await this.ConvertToDate(details.arrival);
                }
                else if(details.arrival == 1){
                    initialDueDate = await this.ConvertToDate(details.arrival - 1);
                }
                else{
                    initialDueDate = await this.ConvertToDate(details.arrival - 2);
                }

                var expectedDueDate = await this.FormatDate(initialDueDate.toISOString(), "dd/mm/yyyy");
                var dueDate = await this.GetElementText(this.lbl_DueDate, "Due Date");
                if(dueDate!=expectedDueDate){
                    throw new Error("Expected due date did NOT matched.\nExpected: " + expectedDueDate +
                    "\nActual: " + dueDate);
                }
            }
            else if(payment.PaymentPercentage[0]=="100"){
                // Check if paid amount matched.
                var expectedTotalPaidAmount = (parseFloat(payment.TotalPayment[0]) + 
                parseFloat(payment.Surcharge[0])).toFixed(2);
                var initialPaidAmount = await this.GetElementText(this.lbl_PaymentFee, "Paid Amount");
                var actualPaidAmount = initialPaidAmount.replace('$','').replace(',','').trim();
                if(actualPaidAmount!=expectedTotalPaidAmount){
                    throw new Error("Expected paid amount did NOT matched.\nExpected: " + expectedTotalPaidAmount + 
                    "\nActual: " + actualPaidAmount);
                }
            }
            else{
                // Check if paid amount matched.
                var expectedPayment = (parseFloat(payment.TotalPayment[0]) + parseFloat(payment.Surcharge[0])).toFixed(2);
                var initialPaidAmount = await this.GetElementText(this.lbl_PaymentFee, "Paid Amount");
                var actualPaidAmount = initialPaidAmount.replace('$','').replace(',','').trim();
                if(actualPaidAmount!=expectedPayment){
                    throw new Error("Expected paid amount did NOT matched.\nExpected: " + expectedPayment + 
                    "\nActual: " + actualPaidAmount);
                }

                // Check if remaining balance matched.
                var expectedBalance = payment.TotalBalance[0];
                var initialBalanceAmount = await this.GetElementText(this.lbl_PaymentBalance, "Confirmed remaining balance");
                var actualBalanceAMount = initialBalanceAmount.replace('$','').replace(',','').trim();
                if(actualBalanceAMount!=expectedBalance){
                    throw new Error("Expected remaining balance did NOT matched.\nExpected: " + expectedBalance + 
                    "\nActual: " + actualBalanceAMount);
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

    // Step:  Verify reservation details.
    async VerifyReservationDetails(details: AccommodationDetails, payment: PaymentDetails){
        try{
            // Verify booking ID.
            if(!await this.ElementExist(this.lbl_BookingId)){
                throw new Error("Booking ID was NOT displayed.");
            }
            var initialBookingID = await this.GetElementText(this.lbl_BookingId, "Booking ID");
            var bookingID = initialBookingID.split(':')[1].trim();

            // Set the total night durations in array.
            var nights: any[] = [];
            var arrivals: any[] = [];
            var departures: any[] = [];
            var expectedTotalGuests = 0;
            var currCheckIn: any, currCheckOut: any, diffCheckInTime: any, diffCheckOutTime: any;
            var checkInDateCount: any, checkOutDateCount: any;
            var dateToday: any;
            for(var i = 0; i < details.BookingCount; i++){
                // Set the date today.
                dateToday = new Date();
                dateToday.setDate(dateToday.getDate() + 0);
                dateToday.setHours(0);
                dateToday.setMinutes(0);
                dateToday.setSeconds(0);
                dateToday.setMilliseconds(0);

                // This will get the checkIn date count from date today.
                currCheckIn = new Date(details.CheckInDate[i]);
                diffCheckInTime = Math.abs(currCheckIn.getTime() - dateToday.getTime());
                checkInDateCount = Math.ceil(diffCheckInTime / (1000 * 60 * 60 * 24)); 
                arrivals.push(checkInDateCount);

                // This will get the checkIn date count from date today.
                currCheckOut = new Date(details.CheckOutDate[i]);
                diffCheckOutTime = Math.abs(currCheckOut.getTime() - dateToday.getTime());
                checkOutDateCount = Math.ceil(diffCheckOutTime / (1000 * 60 * 60 * 24)); 
                departures.push(checkOutDateCount);
                
                nights.push(parseInt(details.Night[i]));
                var guests = parseInt(details.Adult[i]) + parseInt(details.Child[i]) + parseInt(details.Infant[i]);
                var expectedTotalGuests = expectedTotalGuests + guests;
            }
            var leastArrival = Math.min(...arrivals);
            var maxDeparture = Math.max(...departures);
            var expectedTotalNights = maxDeparture - leastArrival;

            // Verify duration of stay.
            var initialStay = await this.GetElementText(this.lbl_StayDuration, "Stay Duration");
            var stayDuration = initialStay.split(' ')[0];
            if(stayDuration!=expectedTotalNights.toString()){
                throw new Error("Expected Stay Duration in Confirmation Modal did NOT matched.\nExpected: " + expectedTotalNights +
                "\nActual: " + stayDuration);
            }

            // Verify Reservation Date.
            var expectedReservationDate = details.CheckInDate[0] + " - " + details.CheckOutDate[details.BookingCount-1];
            var reservationDate = await this.GetElementText(this.lbl_ReservationDate, "Confirmed Reservation Date");
            if(reservationDate!=expectedReservationDate){
                throw new Error("Expected Reservation date in Confirmation Modal did NOT matched.\nExpected: " + 
                expectedReservationDate + "\nActual: " + reservationDate);
            }

            // Verify total number of guest.
            var expectedTotalGuestCount = expectedTotalGuests + " Guests";
            var actualTotalGuestCount = await this.GetElementText(this.lbl_TotalGuestCount, "Confirmed Total Guest Count");
            if(actualTotalGuestCount!=expectedTotalGuestCount){
                throw new Error("Expected Total Guest Count in Confirmation Modal did NOT matched.\nExpected: " + expectedTotalGuestCount +
                "\nActual: " + actualTotalGuestCount);
            }

            // Get the total guest count.
            var totalAdult = 0;
            var totalChild = 0;
            var totalInfant = 0;
            for(var i = 0; i < details.BookingCount; i++){
                totalAdult = totalAdult + parseInt(details.Adult[i]);
                totalChild = totalChild + parseInt(details.Child[i]);
                totalInfant = totalInfant + parseInt(details.Infant[i]);
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
            var actualGuestCount = await this.GetElementText(this.lbl_GuestCount, "Confirmed Guest Count");
            if(actualGuestCount!=expectedGuestCount){
                throw new Error("Expected Guest Count in Confirmation Modal did NOT matched.\nExpected: " + expectedGuestCount +
                "\nActual: " + actualGuestCount);
            }

            // Verify confirmed accommodation.
            /*var initialAccommodation = await this.GetElementText(this.lbl_AccommodationName, "Confirmed Accommodation");
            var confirmedAccommodation = initialAccommodation.split('x')[1].trim();
            if(confirmedAccommodation!=details.AccommodationName){
                throw new Error("Expected Guest Count in Confirmation Modal did NOT matched.\nExpected: " + expectedGuestCount +
                "\nActual: " + confirmedAccommodation);
            }*/

            // Check payment details.
            switch(payment.PaymentType[0].toLowerCase().trim()){
                case "skip":
                    // Verify payment details.
                    var initialBalanceAmount = await this.GetElementText(this.lbl_AmountDue, "Confirmed Amount Due");
                    var balanceAmount = initialBalanceAmount.replace('$','').replace(',','').trim();

                    // Verify payment status.
                    var paymentStatus = await this.GetElementText(this.lbl_PaymentType, "Confirmed Payment Status");
                    if(paymentStatus!="Payment Skipped"){
                        throw new Error("Expected Payment Status in Confirmation Modal did NOT matched.\nExpected: Payment Skipped\nActual: " + 
                        paymentStatus);
                    }

                    // Verify balance amount.
                    if(balanceAmount!=payment.TotalBalance[0]){
                        throw new Error("Expected Amount due in Confirmation Modal did NOT matched.\nExpected: " + payment.TotalBalance +
                        "\nActual: " + balanceAmount);
                    }
                    break;
                case "cash":
                    // Verify payment type.
                    var paymentType = await this.GetElementText(this.lbl_PaymentType, "Confirmed Payment Status");
                    if(paymentType!=payment.PaymentType[0]){
                        throw new Error("Expected Payment Type in Confirmation Modal did NOT matched.\nExpected: " + 
                        payment.PaymentType + "\nActual: " + paymentType);
                    }

                    // Get actual payment amount.
                    var initialPaymentAmount = await this.GetElementText(this.lbl_ConfirmedPaymentAmount, "Confirmed Payment Amount");
                    var actualPaymentAmount = initialPaymentAmount.replace('$','').replace(',','').trim();

                    // Verify payment amount.
                    if(actualPaymentAmount!=payment.TotalPayment[0]){
                        throw new Error("Expected Payment Amount in Confirmation Modal did NOT matched.\nExpected: " + 
                        payment.TotalPayment + "\nActual: " + actualPaymentAmount);
                    }

                    // Verify payment details based on payment percentage.
                    if(payment.PaymentPercentage[0]!="100"){
                        // Get total balance.
                        var initialBalanceAmount = await this.GetElementText(this.lbl_AmountDue, "Confirmed Amount Due");
                        var balanceAmount = initialBalanceAmount.replace('$','').replace(',','').trim();

                        // Verify balance amount.
                        if(balanceAmount!=payment.TotalBalance[0]){
                            throw new Error("Expected Amount due in Confirmation Modal did NOT matched.\nExpected: " + payment.TotalBalance +
                            "\nActual: " + balanceAmount);
                        }

                        // Verify that is remaining balance is set to color red.
                        var color = await this.GetCSSAttribute(this.lbl_AmountDue, "color", "Balance Due");
                        if(color!="rgb(208, 51, 43)"){
                            throw new Error("Balance due color was NOT red.");
                        }
                    }
                    else{
                        // Get the payment status.
                        var paymentStatus = await this.GetElementText(this.lbl_PaidStatus, "Payment Status");

                        // Check if payment status is 'Paid'.
                        if(paymentStatus!="Paid"){
                            throw new Error("Expected Payment Status in Confirmation Modal did NOT matched.\nExpected: Paid\nActual: " + 
                            paymentStatus);
                        }

                        // Verify that is Paid is set to color green.
                        var color = await this.GetCSSAttribute(this.lbl_PaidStatus, "color", "Payment Status");
                        if(color!="rgb(65, 167, 82)"){
                            throw new Error("'Paid' status color was NOT green");
                        }
                    }
                    break;
                case "eftpos":
                    // Verify payment type.
                    var paymentType = await this.GetElementText(this.lbl_PaymentType, "Confirmed Payment Status");
                    if(paymentType.toLowerCase().trim()!="albert device"){
                        throw new Error("Expected Payment Type in Confirmation Modal did NOT matched.\nExpected: Albert Device\nActual: " + 
                        paymentType);
                    }

                    // Get actual payment amount.
                    var initialPaymentAmount = await this.GetElementText(this.lbl_ConfirmedPaymentAmount, "Confirmed Payment Amount");
                    var actualPaymentAmount = initialPaymentAmount.replace('$','').replace(',','').trim();

                    // Verify payment amount.
                    if(actualPaymentAmount!=payment.TotalPayment[0]){
                        throw new Error("Expected Payment Amount in Confirmation Modal did NOT matched.\nExpected: " + 
                        payment.TotalPayment + "\nActual: " + actualPaymentAmount);
                    }

                    if(payment.PaymentPercentage[0]!="100"){
                        // Get total balance.
                        var initialBalanceAmount = await this.GetElementText(this.lbl_AmountDue, "Confirmed Amount Due");
                        var balanceAmount = initialBalanceAmount.replace('$','').replace(',','').trim();

                        // Verify balance amount.
                        if(balanceAmount!=payment.TotalBalance[0]){
                            throw new Error("Expected Amount due in Confirmation Modal did NOT matched.\nExpected: " + payment.TotalBalance +
                            "\nActual: " + balanceAmount);
                        }

                        // Verify that is remaining balance is set to color red.
                        var color = await this.GetCSSAttribute(this.lbl_AmountDue, "color", "Balance Due");
                        if(color!="rgb(208, 51, 43)"){
                            throw new Error("Balance due color was NOT red.");
                        }
                    }
                    else{
                        // Get the payment status.
                        var paymentStatus = await this.GetElementText(this.lbl_PaidStatus, "Payment Status");

                        // Check if payment status is 'Paid'.
                        if(paymentStatus!="Paid"){
                            throw new Error("Expected Payment Status in Confirmation Modal did NOT matched.\nExpected: Paid\nActual: " + 
                            paymentStatus);
                        }

                        // Verify that is Paid is set to color green.
                        var color = await this.GetCSSAttribute(this.lbl_PaidStatus, "color", "Payment Status");
                        if(color!="rgb(65, 167, 82)"){
                            throw new Error("'Paid' status color was NOT green");
                        }
                    }
                    break;
                case "credit card":
                    // Verify payment type.
                    var paymentType = await this.GetElementText(this.lbl_PaymentType, "Confirmed Payment Status");
                    if(paymentType.toLowerCase().trim()!="albert device"){
                        throw new Error("Expected Payment Type in Confirmation Modal did NOT matched.\nExpected: Albert Device\nActual: " + 
                        paymentType);
                    }

                    // Get actual payment amount.
                    var initialPaymentAmount = await this.GetElementText(this.lbl_ConfirmedPaymentAmount, "Confirmed Payment Amount");
                    var actualPaymentAmount = initialPaymentAmount.replace('$','').replace(',','').trim();

                    // Verify payment amount.
                    if(actualPaymentAmount!=payment.TotalPayment[0]){
                        throw new Error("Expected Payment Amount in Confirmation Modal did NOT matched.\nExpected: " + 
                        payment.TotalPayment + "\nActual: " + actualPaymentAmount);
                    }

                    // Get actual surchage.
                    var initialSurcharge = await this.GetElementText(this.lbl_Surcharge, "Card Surcharge");
                    var actualSurcharge = initialSurcharge.replace('$','').trim();

                    // Verify surcharge amount.
                    if(actualSurcharge!=payment.Surcharge[0]){
                        throw new Error("Expected Card Surcharge in Confirmation Modal did NOT matched.\nExpected: " + 
                        payment.Surcharge + "\nActual: " + actualSurcharge);
                    }

                    // Check balance status.
                    if(payment.PaymentPercentage[0]!="100"){
                        // Verify payment details.
                        var initialBalanceAmount = await this.GetElementText(this.lbl_AmountDue, "Confirmed Amount Due");
                        var balanceAmount = initialBalanceAmount.replace('$','').replace(',','').trim();

                        // Verify balance amount.
                        if(balanceAmount!=payment.TotalBalance[0]){
                            throw new Error("Expected Amount due in Confirmation Modal did NOT matched.\nExpected: " + payment.TotalBalance +
                            "\nActual: " + balanceAmount);
                        }

                        // Verify that is remaining balance is set to color red.
                        var color = await this.GetCSSAttribute(this.lbl_AmountDue, "color", "Balance Due");
                        if(color!="rgb(208, 51, 43)"){
                            throw new Error("Balance due color was NOT red.");
                        }
                    }
                    else{
                        // Get the payment status.
                        var paymentStatus = await this.GetElementText(this.lbl_PaidStatus, "Payment Status");

                        // Check if payment status is 'Paid'.
                        if(paymentStatus!="Paid"){
                            throw new Error("Expected Payment Status in Confirmation Modal did NOT matched.\nExpected: Paid\nActual: " + 
                            paymentStatus);
                        }

                        // Verify that is Paid is set to color green.
                        var color = await this.GetCSSAttribute(this.lbl_PaidStatus, "color", "Payment Status");
                        if(color!="rgb(65, 167, 82)"){
                            throw new Error("'Paid' status color was NOT green");
                        }
                    }
                    break;
            }

            // Return booking ID.
            return bookingID;
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

    // This will navigate to Manage Booking Page.
    async ManageReservationBooking(){
        try{
            // Click Manage Booking button.
            await this.Click(this.btn_ManageBooking, "Manage Booking button");
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