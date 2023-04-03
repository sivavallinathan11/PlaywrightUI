export const TestScriptDirectory={
    Path: './tests-RC2'
}
export const TestingEnvironment = "dev";
export const Slot = "slot4";
export const URL={
    GDayAddress: 'https://test.gdaynetwork.com.au/',
    DEV_GDayAddress: "https://dev-gdaynetwork-webapp-"+Slot+".azurewebsites.net/",
    //DEV_GDayAddress: "https://dev.gdaynetwork.com.au/",

    NewReservation: 'https://test.gdaynetwork.com.au/Booking/NewReservation',
    DEV_NewReservation: "https://dev-gdaynetwork-webapp-"+Slot+".azurewebsites.net/Booking/NewReservation",

    BookingDashboard: 'https://test.gdaynetwork.com.au/Booking',
    DEV_BookingDashboard: "https://dev-gdaynetwork-webapp-"+Slot+".azurewebsites.net/Booking",
}
export const ResultsDirectory = {
    RC2: './test-results-rc2',
    RC3: './test-results-rc3',
    RC4: './test-results-rc4',
    RC5: './test-results-rc5',
    TempRC3: './test-results-temprc3',
}
export const XMLResultDirectory = {
    RC2: 'results-rc2',
    RC3: 'results-rc3',
    RC4: 'results-rc4',
    RC5: 'results-rc5',
    TempRC3: 'results-temprc3',
}

export const LoginType = "BDM";

export const UpdateUser = {
    state: 'SA',
    changingState: 'ACT',
    searchAddress: 'Roseville Bridge',
};

export const CommonAPIData = {
    parkCode: 'TEST',
    callerName: 'bolt'
};

export const OtherName = {
    testLastName: "RCATSKoZDt",
    devLastName: "TestDevRCOther",
};

export const BDMCredentials = {
    email: 'PHDHPAdmin@gmail.com',
    password: 'Discovery123!'
}
export const Accommodation = {
    site: 'Site',
    cabin: 'Cabin',
}
export const GuestDataPayLater = {
    arrival: 0,
    departure: 1,
    adults: 2,
    child: 1,
    infant: 1,
    searchText: 'xyz123',
    firstName: 'RCATSNew',
    lastName: 'RCATSNewTest',
    email: '',
    mobile: '0412345678',
    street: 'Light Square',
    town: 'Adelaide',
    state: 'SA',
    postcode: '5000',
    country: 'Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    isVelocity: false,
    isUpsell: false,
    isMember: false
}

export const UpsellGuestData = {
    arrival: 87,
    departure: 88,
    adults: 2,
    child: 1,
    infant: 1,
    searchText: 'xyz123',
    firstName: 'RCATSMember',
    lastName: 'RCATSMemberTest',
    email: '',
    mobile: '0412345678',
    street: 'Light Square',
    town: 'Adelaide',
    state: 'SA',
    postcode: '5000',
    country: 'Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    isVelocity: false,
    isUpsell: true,
    isMember: false
}

export const UpsellGuestData500 = {
    arrival: 80,
    departure: 90,
    adults: 2,
    child: 1,
    infant: 1,
    searchText: 'xyz123',
    firstName: 'RCATSMember',
    lastName: 'RCATSMemberTest',
    email: '',
    mobile: '0412345678',
    street: 'Light Square',
    town: 'Adelaide',
    state: 'SA',
    postcode: '5000',
    country: 'Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    isVelocity: false,
    isUpsell: true,
    isMember: false
}

export const GuestData = {
    arrival: 73,
    departure: 74,
    adults: 2,
    child: 1,
    infant: 0,
    searchText: 'xyz123',
    firstName: 'RCATSNew',
    lastName: 'RCATSNewTest',
    email: '',
    mobile: '0412345678',
    street: 'Light Square',
    town: 'Adelaide',
    state: 'SA',
    postcode: '5000',
    country: 'Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    isVelocity: false,
    isUpsell: false,
    isMember: false
}

export const MateMember = {
    arrival: 73,
    departure: 74,
    adults: 2,
    child: 1,
    infant: 0,
    membershipNumber: '105031940',
    searchText: 'xyz123',
    firstName: 'Test Ellis',
    lastName: 'Tester26',
    email: 'dhprobot+tester032621@gmail.com',
    mobile: '0412345645',
    street: '60 Light Square',
    town: 'Adelaide',
    state: 'SA',
    postcode: '5000',
    country: 'Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    velocityNumber: '',
    isVelocity: false,
    isUpsell: false,
    isMember: true,
    sameDate: false,
    sameAccommodation: true,
}

export const GuestEmailwithExistingMember = {
    arrival: 110,
    departure: 120,
    adults: 2,
    child: 1,
    infant: 0,
    membershipNumber: '105036847',
    searchText: 'xyz123',
    firstName: 'RCATSRobotTest',
    lastName: 'RCATSTestRobotTest',
    email: 'dhprobot+tester041921_7@gmail.com',
    mobile: '0412345675',
    street: 'Adelaide Street',
    town: 'Brisbane City',
    state: 'QLD',
    postcode: '4000',
    country: 'Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    velocityNumber: '',
    isVelocity: false,
    isUpsell: false,
    isMember: true,
    sameDate: false,
    sameAccommodation: true,
}

export const DEV_GuestEmailwithExistingMember = {
    arrival: 110,
    departure: 120,
    adults: 2,
    child: 1,
    infant: 0,
    membershipNumber: '100411353',
    searchText: 'xyz123',
    firstName: 'test',
    lastName: 'test',
    email: 'testa2sda235@gmail.com',
    mobile: '0412345678',
    street: '60 Light Square',
    town: 'Adelaide',
    state: 'ACT',
    postcode: '5000',
    country: 'Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    velocityNumber: '',
    isVelocity: false,
    isUpsell: false,
    isMember: true,
    sameDate: false,
    sameAccommodation: true,
}

export const BestMateMember = {
    arrival: 73,
    departure: 74,
    adults: 2,
    child: 1,
    infant: 0,
    membershipNumber: '105036847',
    searchText: 'xyz123',
    firstName: 'TEST BRYCE',
    lastName: 'TESTER19',
    email: 'dhprobot+tester041921_7@gmail.com',
    mobile: '0412345675',
    street: 'Adelaide Street',
    town: 'Brisbane City',
    state: 'QLD',
    postcode: '4000',
    country: 'Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    velocityNumber: '',
    isVelocity: false,
    isUpsell: false,
    isMember: true,
    sameDate: false,
    sameAccommodation: true,
}

export const DEV_BestMateMember = {
    arrival: 73,
    departure: 74,
    adults: 2,
    child: 1,
    infant: 0,
    membershipNumber: '100398408',
    searchText: 'xyz123',
    firstName: 'Iris Test 7',
    lastName: '7',
    email: 'parkhubtest+17@gmail.com',
    mobile: '0412348541',
    street: '60 Light Square',
    town: 'Adelaide',
    state: 'ACT',
    postcode: '5000',
    country: 'Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    velocityNumber: '',
    isVelocity: false,
    isUpsell: false,
    isMember: true,
    sameDate: false,
    sameAccommodation: true,
}

export const GuestDatawithWhitelistedEmail = {
    arrival: 73,
    departure: 74,
    adults: 2,
    child: 1,
    infant: 0,
    searchText: 'xyz123',
    firstName: 'RCATSKobeBryant',
    lastName: 'RCATSTestKobeBryant',
    email: 'ben.basketbol@gmail.com',
    mobile: '0412345678',
    street: 'Light Square',
    town: 'Adelaide',
    state: 'SA',
    postcode: '5000',
    country: 'Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    isVelocity: false,
    isUpsell: false,
    isMember: true,
    sameAccommodation: false,
}

export const DEV_GuestDatawithWhitelistedEmail = {
    arrival: 73,
    departure: 74,
    adults: 2,
    child: 1,
    infant: 0,
    searchText: 'xyz123',
    firstName: 'RCATSBSOxJ510',
    lastName: 'RCATSTestpECEX325',
    email: 'rcatsfnkps351@gmail.com',
    mobile: '0412345678',
    street: 'Light Square',
    town: 'Adelaide',
    state: 'SA',
    postcode: '5000',
    country: 'Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    isVelocity: false,
    isUpsell: false,
    isMember: true,
    sameAccommodation: false,
}

export const TEST_VelocityMemberData = {
    arrival: 73,
    departure: 74,
    adults: 2,
    child: 1,
    infant: 0,
    searchText: 'xyz123',
    membershipNumber: '105107589',
    firstName: 'Tim',
    lastName: 'Discovery Parks',
    email: 'dhprobot+tester101221_1@gmail.com',
    mobile: '0412556623',
    street: '60 Light Square',
    town: 'Adelaide',
    state: 'SA',
    postcode: '5000',
    country: 'Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    velocityNumber: '1201247433',
    isVelocity: true,
    isUpsell: false,
    isMember: true,
}

export const DEV_VelocityMemberData = {
    arrival: 73,
    departure: 74,
    adults: 2,
    child: 1,
    infant: 0,
    searchText: 'xyz123',
    membershipNumber: '100218203',
    firstName: 'Samantha',
    lastName: 'Discovery Parks',
    email: 'dhprobot+samparksvelocity@testcares.com',
    mobile: '0412345334',
    street: '60 Light Square',
    town: 'Adelaide',
    state: 'SA',
    postcode: '5000',
    country: 'Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    velocityNumber: '1201247411',
    isVelocity: true,
    isUpsell: false,
    isMember: true,
}

export const GuestDatawithOffers = {
    arrival: 73,
    departure: 74,
    adults: 1,
    child: 1,
    infant: 0,
    searchText: 'xyz123',
    firstName: 'RCATSNew',
    lastName: 'RCATSNewTest',
    email: '',
    mobile: '0412345678',
    street: 'Light Square',
    town: 'Adelaide',
    state: 'SA',
    postcode: '5000',
    country: 'Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    isVelocity: false,
    isUpsell: false,
    isMember: false
}

export const GuestDatawithMoreThan28Days = {
    arrival: 1,
    departure: 30,
    adults: 1,
    child: 1,
    infant: 0,
    searchText: 'xyz123',
    firstName: 'RCATSNew',
    lastName: 'RCATSNewTest',
    email: '',
    mobile: '0412345678',
    street: 'Light Square',
    town: 'Adelaide',
    state: 'SA',
    postcode: '5000',
    country: 'Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    isVelocity: false,
    isUpsell: false,
    isMember: false
}

export const GuestGroupBookingData = {
    arrival: 73,
    departure: 74,
    adults: 2,
    child: 1,
    infant: 1,
    searchText: 'xyz123',
    firstName: 'RCATSNew',
    lastName: 'RCATSNewTest',
    email: '',
    mobile: '0412345678',
    street: 'Light Square',
    town: 'Adelaide',
    state: 'SA',
    postcode: '5000',
    country: 'Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    isVelocity: false,
    isUpsell: false,
    isMember: false,
    sameDate: false,
    sameAccommodation: true,
}

export const VelocityGroupMemberData = {
    arrival: 73,
    departure: 74,
    adults: 1,
    child: 1,
    infant: 0,
    searchText: 'xyz123',
    membershipNumber: '105107589|105036847',
    firstName: 'Tim|TEST BRYCE',
    lastName: 'Discovery Parks|TESTER19',
    email: 'dhprobot+tester101221_1@gmail.com|dhprobot+tester041921_7@gmail.com',
    mobile: '0412556623|0412345675',
    street: '60 Light Square|Adelaide Street',
    town: 'Adelaide|Brisbane City',
    state: 'SA|QLD',
    postcode: '5000|4000',
    country: 'Australia|Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    velocityNumber: '1201247433',
    isVelocity: true,
    isUpsell: false,
    isMember: true,
    sameDate: false,
    sameAccommodation: false,
}

export const DEV_VelocityGroupMemberData = {
    arrival: 73,
    departure: 74,
    adults: 1,
    child: 1,
    infant: 0,
    searchText: 'xyz123',
    membershipNumber: '100218203|100220802',
    firstName: 'Samantha|Breanna',
    lastName: 'Discovery Parks|Stewart',
    email: 'dhprobot+samparksvelocity@testcares.com|Stewy@stormtesting.com',
    mobile: '0412345334|0412345678',
    street: '60 Light Square|Stormy',
    town: 'Adelaide|Stormends',
    state: 'SA|ACT',
    postcode: '5000|2312',
    country: 'Australia|Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    velocityNumber: '1201247411',
    isVelocity: true,
    isUpsell: false,
    isMember: true,
    sameDate: true,
    sameAccommodation: false,
}

export const GroupBookingPartial = {
    arrival: 90,
    departure: 100,
    adults: 2,
    child: 1,
    infant: 1,
    searchText: 'xyz123',
    firstName: 'RCATSNew',
    lastName: 'RCATSNewTest',
    email: '',
    mobile: '0412345678',
    street: 'Light Square',
    town: 'Adelaide',
    state: 'SA',
    postcode: '5000',
    country: 'Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    isVelocity: false,
    isUpsell: false,
    isMember: false,
    sameDate: false,
    sameAccommodation: true,
}

export const SameAccommodationAndDatesGroupData = {
    arrival: 73,
    departure: 74,
    adults: 2,
    child: 1,
    infant: 0,
    searchText: 'xyz123',
    firstName: 'RCATSNew',
    lastName: 'RCATSNewTest',
    email: '',
    mobile: '0412345678',
    street: 'Light Square',
    town: 'Adelaide',
    state: 'SA',
    postcode: '5000',
    country: 'Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    isVelocity: false,
    isUpsell: false,
    isMember: false,
    sameDate: true,
    sameAccommodation: true,
}

export const DifferentAccommodationAndDatesGroupData = {
    arrival: 73,
    departure: 74,
    adults: 2,
    child: 1,
    infant: 1,
    searchText: 'xyz123',
    firstName: 'RCATSNew',
    lastName: 'RCATSNewTest',
    email: '',
    mobile: '0412345678',
    street: 'Light Square',
    town: 'Adelaide',
    state: 'SA',
    postcode: '5000',
    country: 'Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    isVelocity: false,
    isUpsell: false,
    isMember: false,
    sameDate: false,
    sameAccommodation: false,
}

export const GroupBookingDataAllMembership = {
    arrival: 73,
    departure: 74,
    adults: 2,
    child: 1,
    infant: 1,
    searchText: 'xyz123',
    firstName: 'RCATSMember',
    lastName: 'RCATSMemberTest',
    email: '',
    mobile: '0412345678',
    street: 'Light Square',
    town: 'Adelaide',
    state: 'SA',
    postcode: '5000',
    country: 'Australia',
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    isVelocity: false,
    isUpsell: true,
    isMember: false,
    sameDate: false,
    sameAccommodation: true,
}

export const IndividualExpiredMemberThenUpsell = {
    arrival: 73,
    departure: 74,
    adults: 2,
    child: 1,
    infant: 1,
    reserveType: '12. Staff',
    bookingSource: '1. Walk in',
    bookingNotes: 'Test Reservation',
    isVelocity: false,
    isUpsell: true,
    isMember: false,
}

export const createGroupReservationWithMember = {
    providerReference: '00000000-0000-0000-0000-000000000000',
    providerGroupReference: null,
    fieldVersion: 0,
    parkIdentifier: 'TEST',
    RoomtypeIdentifier: "TEST-1-41-RT",
    source: 'Bolt',
    bookingSourceName: '4. DHP Web',
    bookingSourceIdentifier: 88,
    reservationTypeName: '12. Staff',
    reservationTypeIdentifier: 1,
    brand: 'DHP',
    paymentId: '00000000-0000-0000-0000-000000000000',
    paymentStatus: 'unpaid',
    arrivalDate: '-4',
    departureDate: '4',
    numberOfNights: '1',
    numberOfAdults: '2',
    numberOfChildren: '1',
    numberOfInfants: '0',
    accommodationPrice : 100,
    discountType: 'Member',
    membershipNumber: '105038275',
    firstName: 'DoNotUseRobotAut',
    lastName: 'TestRC2MemAut',
    email: 'dhprobotTestRC2MemAut@gmail.com',
    phone: '0412345678',
    streetAddress: 'Light Square',
    town: 'Adelaide',
    state: 'SA',
    postcode: '5000',
    countryCode: 'AUS',
    customerIP: '127.0.0.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0',
    Type: 'Base',
    Amount: 140.0,
    Description: 'Base',
    date: '',
    baseAmount: 140.0,
    totalAmount: 140.0,
    tariffReference: '42',
    memberDiscount: 54,
}
export const createGroupReservationWithNonMember = {
    providerReference: '00000000-0000-0000-0000-000000000000',
    providerGroupReference: null,
    fieldVersion: 0,
    parkIdentifier: 'TEST',
    RoomtypeIdentifier: "TEST-1-41-RT",
    source: 'Bolt',
    bookingSourceName: '4. DHP Web',
    bookingSourceIdentifier: 88,
    reservationTypeName: '12. Staff',
    reservationTypeIdentifier: 1,
    brand: 'DHP',
    paymentId: '00000000-0000-0000-0000-000000000000',
    paymentStatus: 'unpaid',
    arrivalDate: '4',
    departureDate: '6',
    numberOfNights: '1',
    numberOfAdults: '2',
    numberOfChildren: '1',
    numberOfInfants: '0',
    accommodationPrice : 100,
    discountType: 'None',
    membershipNumber: '',
    firstName: 'DoNotUseRobotAut',
    lastName: 'TestRC2NonMemAut',
    email: 'dhprobotTestRC2MemAut@gmail.com',
    phone: '0412345678',
    streetAddress: 'Light Square',
    town: 'Adelaide',
    state: 'SA',
    postcode: '5000',
    countryCode: 'AUS',
    customerIP: '127.0.0.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0',
    Type: 'Base',
    Amount: 140.0,
    Description: 'Base',
    date: '',
    baseAmount: 140.0,
    totalAmount: 140.0,
    tariffReference: '42',
    memberDiscount: 54,
}

export const editGuestDetails = {
    firstname: 'RC2Aut',
    lastname: 'RC2Aut',
    emailAddress: 'RC2Auth',
    contactNumber: '0412',
    address: '60 Lightfoot Street, Cessnock NSW, Australia',
    isVelocity: false,
    isUpsell: false,
    isMember: false
}

export const CancellationPercentage = 0.25;
export const CCSurcharge = 0.009;
export const MembershipFee = "50.00";
export const RewardNonDiscountMessage = "Eligible to receive a G'day Rewards 2-year membership at no extra charge";
export const RewardsDiscountMessage = "Eligible to receive a G'day Rewards 2-year membership for ";
export const RewardsBenefits = ["Discount on future bookings", "Everyday savings on fuel", "Access to great partner offers"];
export const StaffName = "Robot Test";
export const NewMemberTier = "Mate";
export const MembershipDiscount = 0.1;
export const ExistingGuestSearch = "RCATSMember";
export const MoreThan28DaysMessage = "Cannot select more than 28 nights";
export const API_NameSearch = "RCATSMember";
export const DiscountReason = "Test Discounts";
export const HigherOfferTitle = "Promotional rates may change with guest";
export const HigherOfferMessage = "Please revisit 'View Offers' to view available rates";
export const MembershipErrorOnGroupReservation = "Note: The G'Day rewards memberships against the booking have been processed. To keep the membership please process the payment manually. Otherwise cancel the memberships.";
export const MembershipErrorOnIndividualReservation = "Note: The G'Day rewards memberships has been processed. To keep the membership please process the payment manually. Otherwise cancel the membership.";
export const BetterOffer = "Better";
export const LesserOffer = "Not better";
export const BetterDiscount = "25% Uncapped";
export const LesserDiscount = "P-TRADE25 20%";
export const NoPaymentMessage = "No payments made.";
export const BookingStatus = "Booking cancelled.";
export const emailNote = "An email confirmation of cancellation has been sent.";
export const dateInput = 0;
export const hundred = 100;
export const buttonType = "disabled";
export const toastMessage = 
{
    update: "Update Successful",
    payment: "Payment made successfully! Your payment of ${Payment} has been successfully processed."
}
export const checkIn = {
    complete: "CHECK IN COMPLETE",
    isNowCheckIn: "is now checked in"
}

// Table Type
export const tbl_Arriving = "tbl-Arriving";
export const tbl_InHouse = "tbl-InHouse";
export const tbl_Upcoming = "tbl-Upcoming";
export const tbl_Departing = "tbl-Departing";
export const tbl_Search = "tbl-Search";

// Table name
export const tblArriving = "arrivals";
export const tblInHouse = "inhouse";
export const tblUpcoming = "upcoming";
export const tblDeparting = "departing";
export const tblSearch = "search";

// Payment Type
export const typeOfPayment = {
    paid: "paid",
    unpaid: "unpaid"
}

export const bookingCancelType = {
    BookingCancelledRefund: "Booking #@ has been cancelled and the reimbursement has been initiated.",
    BookingCancelledNoPayment: "Booking #@ has been cancelled and payment has been taken."
}

export const loyaltyTier = {
    greatMate: "Great Mate",
    bestmate: "Best Mate",
    mate: "Mate"
}

export const refundMethod = {
    requestRefund: "Request Refund",
    parkRefund: "Park Refund"
}

export const paymentMethod = {
    eftpos: "EFTPOS",
    cash: "Cash"
}

export const transactionType = {
    receipt: "Receipt",
    charge: "Charge",
    discount: "Discount",
    refund: "Refund"
}

export const description = {
    ccFee: "Credit Card Fee",
    voidAccommodation: "Void: Accommodation",
    cancellationFee: "Cancellation Fee",
    machineRefund: "EFTPOS Machine Refund"
}

export const totalAmountPaidIn = {
    cash: "TotalAmountPaidInCash",
    eftpos: "TotalAmountPaidInEFTPOS"
}

export const sectionType = {
    parkRefund: "park refund",
    refundRequest: "refund request"
}

export const bookingStatus = {
    cancelled: "Cancelled",
    arrived: "Arrived",
    unconfirm: "Unconfirmed",
    confirm: "Confirmed"
}

export const Name = {
    testLastName: "RCATSPLMJv",
    devLastName: "TestDevRC",
};
