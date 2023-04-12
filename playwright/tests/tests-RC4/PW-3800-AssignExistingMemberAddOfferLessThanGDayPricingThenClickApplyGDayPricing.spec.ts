import test from "@playwright/test";
import { DEV_BestMateMember, LesserOffer, MateMember, TestingEnvironment } from "../data/users";
import { APIHelper } from "../models/APIHelper";
import { BaseSteps } from "../models/BaseSteps";
import { BookingPage } from "../models/BookingPage";
import { LoginPage } from "../models/LoginPage";
import { OffersModal } from "../models/OffersModal";
import { ReserveAndPayModal } from "../models/ReserveAndPayModal";

test('Assign existing MEMBER to booking THEN add an offer that is LESS THAN GDAY PRICING', async({page, request}) =>{
    // Set base object.
    const baseSteps = new BaseSteps();

    // Initialize directory for test.
    const testDetails = await baseSteps.InitializeTestResultDirectory("PW-3800-AssignExistingMemberAddOfferLessThanGDayPricingThenClickApplyGDayPricing");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const booking = new BookingPage(page, testDetails);
    const offers = new OffersModal(page, testDetails);
    const apiHelper = new APIHelper(page, request, testDetails);
    const reservepay = new ReserveAndPayModal(page, testDetails)
    var customerDetails: any;
    if(TestingEnvironment.toLowerCase().trim()=="test"){
        customerDetails = MateMember;
    }
    else{
        customerDetails = DEV_BestMateMember;
    }

    //#region Start Test.
    // Navigate to Parkweb login page.
    await login.Open();

    // Login to parkweb using valid credentials.
    await login.EnterCredentials();
    await login.ClickLogin();
    
    // Navigate to create new booking page.
    await booking.Open();

    // Verify new reservation page.
    await booking.VerifyNewReservationPage();

    // Get Park Details.
    var parkDetails = await apiHelper.GetParkDetails();

    // Select accommodation based on numbers of booking. 
    var bookingDetails = await booking.CreateBookingReservation(customerDetails, 1, "Random", parkDetails);

    // Verify added accommodation.
    await booking.VerifyAddedAccommodationDetails(bookingDetails);

    // Verify confirm button is disabled as no guest is added.
    await booking.VerifyConfirmButtonIsDisabled();

    // Edit guest booking details.
    var guestDetails = await booking.SetCustomerDetails(customerDetails, bookingDetails);
    var bookingDetails = await booking.EditSelectedBookingReservation(bookingDetails, guestDetails);

    // Click View offers.
    await booking.ClickViewOffers();

    // Verify view offers is displayed.
    await offers.VerifyViewOffersModal();

    // Select an offer in the view offers modal and click on keep on selected offer.
    var afterOfferDetails = await offers.SelectAndProcessOfferFromViewOffersModalAfterGuestIsAssigned(bookingDetails, 
        guestDetails, "Accept Offers", LesserOffer, "Apply");
    bookingDetails = afterOfferDetails[1];
    var offerDetails = afterOfferDetails[0];

    // Verify Updated Booking Overview.
    await booking.VerifyBookingOverviewAfterOfferIsApplied(guestDetails, bookingDetails, offerDetails);

    // Click Confirm Booking button.
    await booking.ClickConfirmBooking();

    // Verify Reserve and Pay Modal.
    await reservepay.VerifyReserveAndPayModal(bookingDetails, guestDetails);

    //#endregion*/
});