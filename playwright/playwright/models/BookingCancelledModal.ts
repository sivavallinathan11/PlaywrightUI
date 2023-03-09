import { errors, Page } from "@playwright/test";
import { TestDirectory } from "../data/directory";
import { Common } from "./Common";
import { BookingStatus, bookingCancelType, emailNote } from "../data/users";
import { DashboardDetails, StayCostDetails } from "../data/managebookings";

export class BookingCancelledModal extends Common{
    // Set object variable.
    readonly page: Page;
    readonly dir: TestDirectory;

    // Set a sub routine that will access the functions from parent and sibling class.
    constructor(page: Page, dir: TestDirectory){
        super(page, dir);
        this.page = page;
        this.dir = dir;
    }    

    // Set XPaths, Element IDs and other attributes.
    // Button
    btn_ReturnToDashboard = "//button[@id='return-dashboard']";

    // Label
    lbl_BookingStatus = "//div[@id='booking-cancelled-modal']//div[@id='booking-modal-container']/div[2]/div/h2";
    lbl_BookingNumberCancelled = "//div[@id='booking-cancelled-modal']//div[@id='booking-modal-container']/div[2]/div/p/b";
    lbl_EmailNote= "//div[@id='booking-cancelled-modal']//div[@id='booking-modal-container']/div[2]/div/p[2]";

    // Modal
    mdl_BookingCancelledModal = "//div[@id='booking-cancelled-modal']//div[@id='booking-modal-container']";

    // **Function Starts Here**

    // Booking Cancelled Modal
    async VerifyBookingCancelledModal(){
        try{
            await this.WaitForElement(this.mdl_BookingCancelledModal, "Booking Cancelled Modal");
            await this.ScreenShot("Cancelled Booking Modal");
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

    // Booking Cancelled Details
    async VerifyBookingCancelledDetails(dashboard: DashboardDetails, stayCostDetails: StayCostDetails){
        try{
            var actualBookingStatus = await this.GetElementText(this.lbl_BookingStatus, "Booking Status");
            var actualBookingCancelled = await this.GetElementText(this.lbl_BookingNumberCancelled, "Booking Cancelled");
            var actualEmailNote = await this.GetElementText(this.lbl_EmailNote, "Email Confirmation");

            if(actualBookingStatus.toLowerCase() != BookingStatus.toLowerCase()){
                throw new Error("Actual and Expected Booking status did NOT matched.\nExpected: " + BookingStatus +
                "\nActual: " + actualBookingStatus);
            }

            if(parseFloat(stayCostDetails.TotalPaid[0]) > 0){
                if(actualBookingCancelled != bookingCancelType.BookingCancelledRefund.replace("@",dashboard.ReservationNumber[0])){
                    throw new Error("Actual and Expected Booking number did NOT matched.\nExpected: " 
                    + bookingCancelType.BookingCancelledRefund.replace("@",dashboard.ReservationNumber[0]) +
                    "\nActual: " + actualBookingCancelled);
                }
            }else{
                if(actualBookingCancelled != bookingCancelType.BookingCancelledNoPayment.replace("@",dashboard.ReservationNumber[0])){
                    throw new Error("Actual and Expected Booking number did NOT matched.\nExpected: " 
                    + bookingCancelType.BookingCancelledNoPayment.replace("@",dashboard.ReservationNumber[0]) +
                    "\nActual: " + actualBookingCancelled);
                }
            }
            
            if(actualEmailNote != emailNote){
                throw new Error("Actual and Expected Booking note did NOT matched.\nExpected: " + emailNote +
                "\nActual: " + actualEmailNote);
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

    // Return To Dashboard
    async ClickReturnToDashboard(){
        try{
            await this.WaitForElement(this.btn_ReturnToDashboard, "Return To Dashboard Button");
            await this.Click(this.btn_ReturnToDashboard, "Return To Dashboard Button");
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