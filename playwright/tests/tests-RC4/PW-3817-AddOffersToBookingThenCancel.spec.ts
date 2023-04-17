import test from "@playwright/test";
import { Accommodation, GuestDatawithOffers } from "../data/users";
import { APIHelper } from "../models/APIHelper";
import { BaseSteps } from "../models/BaseSteps";
import { BookingPage } from "../models/BookingPage";
import { LoginPage } from "../models/LoginPage";
import { OffersModal } from "../models/OffersModal";

test('Add offers to booking then cancel the offer', async({page, request}) =>{
    // Set base object.
    const baseSteps = new BaseSteps();

    // Initialize directory for test.
    const testDetails = await baseSteps.InitializeTestResultDirectory("PW-3817-AddOffersToBookingThenCancel");

    // Set page objects.
    const login = new LoginPage(page, testDetails);
    const booking = new BookingPage(page, testDetails);
    const offers = new OffersModal(page, testDetails);
    const apiHelper = new APIHelper(page, request, testDetails);
    const customerDetails = GuestDatawithOffers;

    //#region Start Test.
    // This will get park details.
    var parkDetails = await apiHelper.GetParkDetails();

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

    // Click View offers.
    await booking.ClickViewOffers();

    // Verify view offers is displayed.
    await offers.VerifyViewOffersModal();

    // Select an offer in the view offers modal (Booking Details, Offer Type, Process Type)
    var afterOfferDetails = await offers.SelectAndProcessOfferFromViewOffersModal(bookingDetails, guestDetails,
        "Cancel", "Random");
    bookingDetails = afterOfferDetails[1];
    var offerDetails = afterOfferDetails[0];

    // Verify Updated Booking Overview.
    await booking.VerifyBookingOverviewAfterOfferIsApplied(guestDetails, bookingDetails, offerDetails);

    //#endregion*/
});