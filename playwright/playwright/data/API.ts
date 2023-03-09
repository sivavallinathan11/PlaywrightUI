export const endpoint={
    /**API**/
    /*Authetication*/
    API_Authentication: 'https://login.microsoftonline.com/1400c903-3a54-41dd-a597-241ce11262da/oauth2/token',

    /*Any Reservation Transactions*/
    TEST_API_Reservation: 'https://test-pms-dhp-api.azurewebsites.net/api/reservation',
    DEV_API_Reservation: 'https://dev-pms-dhp-api.azurewebsites.net/api/reservation',

    /* Search Members*/
    TEST_API_SearchMembers: 'https://test-int-dhp-api-membership.azurewebsites.net/api/Member/SearchContacts',
    DEV_API_SearchMembers: 'https://dev-int-dhp-api-membership.azurewebsites.net/api/Member/SearchContacts',

    /*Get Member Number*/ 
    TEST_API_GetMember: 'https://test-int-dhp-api-membership.azurewebsites.net/api/Member',
    DEV_API_GetMember: 'https://dev-int-dhp-api-membership.azurewebsites.net/api/Member',

    /*Membership Details*/
    TEST_API_GetMembershipDetails: 'https://test-int-dhp-api-membership.azurewebsites.net/api/Membership',
    DEV_API_GetMembershipDetails: 'https://dev-int-dhp-api-membership.azurewebsites.net/api/Membership',

    /*TEST ROOMS*/
    TEST_CDN: 'https://test-strategicweb-cdn.azureedge.net/park-data/TEST.json',
    DEV_CDN: 'https://dev-strategicweb-cdn.azureedge.net/park-data/TEST.json',

    /*UPDATE SEARCH CONTACT*/
    TEST_API_UpdateSearchContact: 'https://test-int-dhp-api-membership.azurewebsites.net/api/Member/UpdateSearchContact',
    DEV_API_UpdateSearchContact: 'https://dev-int-dhp-api-membership.azurewebsites.net/api/Member/UpdateSearchContact',

    /* Create Reservation*/
    API_CreateReservation: 'https://test-int-dhp-api-jaguar.azurewebsites.net/api/Booking/v1/Bookings/',
    DEV_API_CreateReservation: 'https://dev-int-dhp-api-jaguar.azurewebsites.net/api/Booking/v1/Bookings/',

    /* Create a Payment*/
    TEST_API_CreatePayment: 'https://test-pms-dhp-api.azurewebsites.net/api/transaction/TEST/receipt',
    DEV_API_CreatePayment: 'https://dev-pms-dhp-api.azurewebsites.net/api/transaction/TEST/receipt',

    /* Create a Charge*/
    TEST_API_CreateCharge: 'https://test-pms-dhp-api.azurewebsites.net/api/transaction/TEST/charge',
    DEV_API_CreateCharge: 'https://dev-pms-dhp-api.azurewebsites.net/api/transaction/TEST/charge',

    /* Search a reservation*/
    TEST_API_SearchReservation: 'https://test-pms-dhp-api.azurewebsites.net/api/Reservation/TEST/',
    DEV_API_SearchReservation: 'https://dev-pms-dhp-api.azurewebsites.net/api/Reservation/TEST/',

    /* Search for transactions*/
    TEST_API_SearchTransactions: 'https://test-pms-dhp-api.azurewebsites.net/api/transaction/TEST/search',
    DEV_API_SearchTransactions: 'https://dev-pms-dhp-api.azurewebsites.net/api/transaction/TEST/search',
}

/** Booking Reservation Details */
export const CreateGroupReservationWithMember = {
    providerReference: '00000000-0000-0000-0000-000000000000',
    providerGroupReference: null,
    fieldVersion: 0,
    parkIdentifier: 'TEST',
    RoomtypeIdentifier: "TEST-1-41-RT",
    source: 'Bolt',
    bookingSourceName: '4. DHP Web',
    bookingSourceIdentifier: 88,
    reservationTypeName: '01. Tourist - Young Single',
    reservationTypeIdentifier: 4,
    brand: 'DHP',
    paymentId: '00000000-0000-0000-0000-000000000000',
    paymentStatus: 'unpaid',
    arrivalDate: '-4',
    departureDate: '4',
    numberOfNights: '1',
    numberOfAdults: '2',
    numberOfChildren: '1',
    numberOfInfants: '0',
    accommodationPrice : 300,
    discountType: 'Member',
    dicountId: 54,
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
    Amount: 300.0,
    Description: 'Base',
    date: '',
    baseAmount: 300.0,
    totalAmount: 300.0,
    tariffReference: '42',
    memberDiscount: 54,
}

export const DEV_CreateReservationWithMember = {
    providerReference: '00000000-0000-0000-0000-000000000000',
    filedVersion: 0,
    parkIdentifier: 'TEST',
    RoomtypeIdentifier: "TEST-1-7-RT",
    source: 'Bolt',
    bookingSourceName: '4. DHP Web',
    bookingSourceIdentifier: 88,
    reservationTypeName: '01. Tourist - Young Single',
    reservationTypeIdentifier: 4,
    brand: 'DHP',
    paymentId: '00000000-0000-0000-0000-000000000000',
    arrivalDate: '0',
    departureDate: '1',
    numberOfNights: '1',
    numberOfAdults: '2',
    numberOfChildren: '1',
    numberOfInfants: '0',
    accommodationPrice : 300,
    discountType: 'Member',
    discount: 54,
    membershipNumber: '100017829',
    firstName: 'Test 1 Update',
    lastName: 'Test 1 match',
    email: 'TEST@poi.com',
    phone: '0499999999',
    streetAddress: '60 Light Square',
    town: 'Adelaide',
    state: 'ACT',
    postcode: '5000',
    countryCode: 'AUS',
    customerIP: '127.0.0.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0',
    Type: 'Base',
    Amount: 300.0,
    Description: 'Base',
    date: '',
    baseAmount: 300.0,
    totalAmount: 300.0,
    tariffReference: '42',
    memberDiscount: 54,
}

export const CreateReservationWithNonMember = {
    providerReference: '00000000-0000-0000-0000-000000000000',
    providerGroupReference: null,
    fieldVersion: 0,
    parkIdentifier: 'TEST',
    RoomtypeIdentifier: "TEST-1-41-RT",
    source: 'Bolt',
    bookingSourceName: '4. DHP Web',
    bookingSourceIdentifier: 88,
    reservationTypeName: '01. Tourist - Young Single',
    reservationTypeIdentifier: 4,
    brand: 'DHP',
    paymentId: '00000000-0000-0000-0000-000000000000',
    paymentStatus: 'unpaid',
    arrivalDate: '83',
    departureDate: '85',
    numberOfNights: '1',
    numberOfAdults: '2',
    numberOfChildren: '1',
    numberOfInfants: '0',
    accommodationPrice : 0,
    discountType: 'None',
    discountId: 0,
    membershipNumber: '',
    firstName: 'RCATSNew',
    lastName: 'RCATSNewTest',
    phone: '0412345678',
    streetAddress: 'Light Square',
    town: 'Adelaide',
    state: 'SA',
    postcode: '5000',
    countryCode: 'AUS',
    customerIP: '127.0.0.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0',
    Type: 'Base',
    Amount: 500,
    Description: 'Base',
    date: '',
    baseAmount: 0,
    totalAmount: 0,
    tariffReference: '42',
}

export const Payment = {
    cash: 'cash',
    cc: 'eftpos',
    mixed: 'mixed',
}

export const Sundry = {
    creditCard: 102,
    gdayRewardPurchase: 119
}

export const TransactionType = {
    receipt: 'Receipt',
    charge: 'Charge'
}