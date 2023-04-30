import { errors, Page } from "@playwright/test";
import { AccommodationDetails, CustomerDetails } from "../data/bookings";
import { DataSetup } from "../data/datasetup";
import { TestDirectory } from "../data/directory";
import { MembershipFee, StaffName, TestingEnvironment, 
    MembershipErrorOnGroupReservation, MembershipErrorOnIndividualReservation } from "../data/users";
import { Common } from "./Common";
import { DiscountModal } from "./DiscountModal";
import { MakePaymentModal } from "./MakePaymentModal";

export class ReserveAndPayModal{
    // Set object variables.
    readonly page: Page;
    readonly dir: TestDirectory;
    public dataSetup = new DataSetup();

    // Set a sub routine that will access the functions from parent and sibling class.
    constructor(page: Page){
        this.page = page;        
    }
    
    // Set XPaths, Element IDs and other attributes.
    //Modal.
    // public modal_ReserveAndPay = "#gr-reserve-modal-container";
    // public modal_ConfirmBooking = "//div[@class='modal-body modal-pending']//h3[contains(.,'Confirming Booking')]";

    // //Button.
    // public btn_ReserveNow = "#reserve-now";
    // public btn_PayNow = "//*[@id='gr-reserve-modal-container']//*[@id='pay-now']";
    // public btn_SkipAndPayLater = "//*[@class='skip-cta secondary-cta']";
    // public btn_ManualPayment = "//*[@id='gr-reserve-modal-container']//button[text()='Manual Payment']";
    // public btn_CancelMembership = "//*[@id='gr-reserve-modal-container']//*[@id='cancel-membership']";
    // public btn_CancelReserve = "//*[@id='gr-reserve-modal-container']//*[@class='gr-cancel-cta']/button";
    // public btn_AddDiscount = "//*[@id='gr-reserve-modal-container']//div[contains(@class, 'booking-entry')]/div[1]/div[2]/button";

    // //Label.
    // public lbl_DateRange = "//*[@id='gr-reserve-modal-container']//*[@class='gr-date-range']";
    // public lbl_GuestCount = "//*[@id='gr-reserve-modal-container']//*[@class='gr-guest']";
    // public lbl_ContactName = "//*[@id='gr-reserve-modal-container']//span[contains(@id, 'reserve-booking-contact-name')]";
    // public lbl_AccommodationName = "//*[@id='gr-reserve-modal-container']//*[@class='payment-booking-details']//div[contains(@class, 'booking-entry')]//label/p[1]";
    // public lbl_AssignedRoom = "//*[@id='gr-reserve-modal-container']//span[contains(@id, 'reserve-booking-contact-name')]/following::span[2]";
    // public lbl_GuestQuotePrice = "//*[@id='gr-reserve-modal-container']//*[@class='payment-booking-details']/div[contains(@class, 'booking-entry')]/div[1]/div[2]/p";
    // public lbl_MemberQuotePrice = "//*[@id='gr-reserve-modal-container']//*[@class='payment-booking-details']//div[contains(@class, 'booking-entry')]/div[1]/div[3]/p";
    // public lbl_StrikedGuestPrice = "//*[@id='gr-reserve-modal-container']//*[@class='payment-booking-details']//div[contains(@class, 'booking-entry')]/div[1]/div[2]/sup";
    // public lbl_BalanceDue = "//*[@id='gr-reserve-modal-container']//*[@class='balance-due']";
    // public lbl_BookingReserved = "//*[@id='gr-reserve-modal-container']//div[contains(@class, 'success-popup gr-status-message-popup')]/span";
    // public lbl_GuestErrorReserved = "//*[@id='gr-reserve-modal-container']//div[contains(@class, 'error-popup gr-status-message-popup')]/p";
    // public lbl_MemberErrorReserved = "//div[contains(@class, 'error-member-popup gr-status-message-popup')]/p[contains(@class, 'error-explanation')]";
    // public lbl_DiscountTag = "//*[@class='booking-discount edit-discount-cta']/span[2]";
    // public lbl_MembershipFee = "//*[@id='gr-reserve-modal-container']//div[contains(text(),'Membership fee')]/following-sibling::div/span";

    // // Temporary Dev elements
    // public lbl_DevBalanceDue = "//*[@id='gr-reserve-modal-container']//*[@class='amount total-booking-price']";

    // //Dropdown.
    // public drp_ReservationType = "#ReservationTypeId";
    // public drp_BookingSource = "#BookingSourceId";

    // // Text area/field.
    // public txt_BookingNote = "//*[@class='gr-booking-notes']/textarea";

    // // Checkbox
    // public chk_TermsAndConditions = "#terms-checkbox";

    // Step: This will verify if the Reserve and Pay modal is displayed.
    async VerifyReserveAndPayModal(){
        await this.page.locator('#ReservationTypeId').selectOption('07. Tourist - Group');
        await this.page.locator('#BookingSourceId').selectOption('1. Walk in');
        await this.page.getByPlaceholder('Start typing a note here...').fill('Just a note by the test bot');
        await this.page.getByRole('checkbox').check();
        
    }

    async ReserveNowButton() {
        await this.page.getByRole('button', {name: 'Reserve Now'}).click();

    }

    
}