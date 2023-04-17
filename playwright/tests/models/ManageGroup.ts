import { errors, Page } from "@playwright/test";
import { AccommodationDetails, CustomerDetails } from "../data/bookings";
import { TestDirectory } from "../data/directory";
import { Common } from "./Common";

export class ManageGroup extends Common{
    // Set page object variable.
    readonly page: Page;
    
    // Set a sub routine that will access the functions from parent and sibling class.
    constructor(page: Page, dir: TestDirectory){
        super(page, dir);
        this.page = page;
    }

    // Set XPaths, Element IDs and other attributes.

    // Label.
    public lbl_GroupResNumber = "//span[@class='manage-booking-number'][2]";
    public lbl_reservationNumber = "xpath=child::td[@class='reservation']";
    
    // Table.
    public tbl_GroupMember = "//*[@id='tbl-GroupChildren']/tbody/tr";

    // Button.
    public btn_arrow = "xpath=child::td[@class='cta']/p/button[@class='arrow']";

    // Step: Verify Booked Reservation is displayed in Manage Booking.
    async VerifyBookedReservationInManageGroupBooking(bookingNumber: string){
        try{
            // Wait for selected reservation.
            if(!await this.ElementExist(this.lbl_GroupResNumber)){
                throw new Error("Manage Group Booking page for selected reservation was NOT displayed.");
            }

             // get the reservation number and match values from dashboard.
             var reservationNumber = await this.GetElementText(this.lbl_GroupResNumber, 'Group Reservation Number');

             if(reservationNumber!=bookingNumber){
                throw new Error("Expected reservation number did NOT matched.\nExpected: " + bookingNumber + 
                "\nActual: " + reservationNumber);
            }

            // Capture Manage Booking Page.
            await this.ScreenShot("Manage Group Booking Page");
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

    // This will navigate to group master manage booking.
    async ManageGroupMasterBooking(){
        try{
            // Get the list of reservations.
            var list = await this.FindElements(this.tbl_GroupMember, "List of group members");

            // Get the group master reservation number.
            var selectedResNumber = await this.FindSubElementOnElement(list[0], 
                this.lbl_reservationNumber, "Reservation Numbers");
            var reservationNumber = this.GetLiveElementText(selectedResNumber, "Group Master Reservation Number");
            
            // Click the group master arrow button to navigate to manage booking.
            var selectedArrow = await this.FindSubElementOnElement(list[0], this.btn_arrow, "Group Master arrow button");
            await this.ClickElement(selectedArrow, "Group Master arrow button");

            return reservationNumber;
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