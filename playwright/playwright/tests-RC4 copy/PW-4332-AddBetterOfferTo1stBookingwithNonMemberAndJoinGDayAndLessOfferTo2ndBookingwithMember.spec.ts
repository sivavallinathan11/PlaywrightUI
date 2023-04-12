import test from "@playwright/test";
import { BetterOffer, LesserOffer, MateMember, UpsellGuestData } from "../data/users";
import { APIHelper } from "../models/APIHelper";
import { BaseSteps } from "../models/BaseSteps";
import { BookingPage } from "../models/BookingPage";
import { LoginPage } from "../models/LoginPage";
import { OffersModal } from "../models/OffersModal";
import { ReserveAndPayModal } from "../models/ReserveAndPayModal";

test('Add better offer to a non member booking (1st booking) and join gday AND Add less offer to a member booking (2nd booking)', async({page, request}) =>{
    // Set base object.
    const baseSteps = new BaseSteps();

    // Initialize directory for test.
    const testDetails = await baseSteps.InitializeTestResultDirectory("PW-4332-AddBetterOfferTo1stBookingwithNonMemberAndJoinGDayAndLessOfferTo2ndBookingwithMember");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const booking = new BookingPage(page, testDetails);
    const offers = new OffersModal(page, testDetails);
    const reservepay = new ReserveAndPayModal(page, testDetails);
    const apiHelper = new APIHelper(page, request, testDetails);
    var customerDetails = UpsellGuestData;

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
    var bookingDetails = await booking.CreateBookingReservation(customerDetails, 2, "Random", parkDetails);

    // Verify added accommodation.
    await booking.VerifyAddedAccommodationDetails(bookingDetails);

    // Verify confirm button is disabled as no guest is added.
    await booking.VerifyConfirmButtonIsDisabled();

    // Edit guest booking details.
    var newCustomerDetails = [UpsellGuestData, MateMember];
    var guestDetails = await booking.SetSpecificCustomerDetailsForGroupBooking(newCustomerDetails, bookingDetails);

    // Click View offers.
    await booking.ClickViewOffers();

    // Verify view offers is displayed.
    await offers.VerifyViewOffersModal();

    // Select an offer in the view offers modal (Booking Details, Offer Type, Process Type)
    var offerList = BetterOffer + "|" + LesserOffer;
    var offerTypeList = "Better|Lesser";
    var afterOfferDetails = await offers.SelectAndProcessOfferFromViewOffersModal(bookingDetails, guestDetails, 
        "Accept Offers", offerList, offerTypeList);
    bookingDetails = afterOfferDetails[1];
    var offerDetails = afterOfferDetails[0];

    // Edit booking with higher offfer
    var bookingDetails = await booking.EditSelectedBookingReservationAfterOfferWasMade(bookingDetails, guestDetails, offerDetails);

    // Verify Updated Booking Overview.
    await booking.VerifyBookingOverviewAfterOfferIsApplied(guestDetails, bookingDetails, offerDetails);

    // Click Confirm Booking button.
    await booking.ClickConfirmBooking();

    // Verify Reserve and Pay Modal.
    await reservepay.VerifyReserveAndPayModal(bookingDetails, guestDetails);

    //#endregion*/
});