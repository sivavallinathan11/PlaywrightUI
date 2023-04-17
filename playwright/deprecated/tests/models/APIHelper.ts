import { Page, APIRequestContext, errors, test } from "@playwright/test";
import { TestDirectory } from "../data/directory";
import { Common } from "./Common";
import { bookingStatus, CCSurcharge, CommonAPIData, description, paymentMethod, TestingEnvironment, transactionType } from "../data/users";
import { DataSetup } from "../data/datasetup";
import { Sundry, Payment, CreateGroupReservationWithMember, CreateReservationWithNonMember, 
    DEV_CreateReservationWithMember, endpoint, TransactionType,
    DEV_CreateReservationWithVelocityMember, ReservationWithPastDatedCheckin, CreateDepartingNonMember,
    CreateMultipleDepartingNonMember, CreateMultipleInhouseNonMember, 
    CreateMultipleInhouseNoBalance, CreateMultipleDepartingNoBalance, expiredSingleResDate, CreateReservationUsingPoweredEnsuite, 
    CreateReservationStandardStudioEnsuite, CreateReservationDeluxeBaliVilla,
    CreateReservationSup2BedroomCabin,CreateReservationStudEnsuiteTwin ,CreateReservationQAIRTest,
    MemberGroupDetails, NonMemberGroupDetails, CreateReservationWithStandardStudioCabin, CreateReservationWithVelocityMember, 
    CreateReservationWithMember, GuestReservationMoreThan500BookingCost } from "../data/API";
import { StayCostDetails } from "../data/managebookings";
import { SmokeSteps } from "./SmokeSteps";

export class APIHelper extends SmokeSteps{
    readonly page: Page;
    readonly request: APIRequestContext;
    public testDirectory: TestDirectory;
    public dataSetup = new DataSetup();

    constructor(page: Page, request: APIRequestContext, dir: TestDirectory){
        super(page, dir);
        this.page = page;
        this.request = request;
        this.testDirectory = dir;
    }

    // This will return a bearer token to use for api requests.
    async GetAuthentication(){
        try{
            if(TestingEnvironment.toLowerCase()=="dev"){
                var client_Id = '64c35ac9-496b-4ffa-9cc1-369bf75e4ace';
                var client_Secret = 'CZ9CAueVi+SEESpGdm4R+0aq5fR0cIJGu6t+iluWHgg=';
                var resource = 'https://discoveryparks.com.au/dev-int-api-v1';
            }
            else{
                var client_Id = '3d943fca-2431-4a91-94c9-94e6d633b789';
                var client_Secret = '=G)nDvo#+}9IJmF^9x{bH';
                var resource = 'https://discoveryparks.com.au/test-int-api-v1';
            }
            const response = await this.request.post(`${endpoint.API_Authentication}`, {
                form: {
                    'grant_type': 'client_credentials',
                    'client_id': client_Id,
                    'client_secret': client_Secret,
                    'resource': resource
                },
                headers:{
                    'Postman-Token': '75a726d3-a10a-4292-9e3e-e564325f784b',
                    'cache-control': 'no-cache',
                    'content-type': 'application/x-www-form-urlencoded',}
            });
    
            // Get the access token.
            const token = await response.json();
            
            return token["access_token"];
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }
    
    // This will cancel reservation.
    async CancelReservation(reservationNumber: string){
        try{
            // Identify endpoint per environment set.
            if(TestingEnvironment.toLowerCase()=="dev"){
                var ep_cancel = endpoint.DEV_API_Reservation + "/" + CommonAPIData.parkCode + "/" + 
                reservationNumber + "/cancel";
                var host = 'dev-pms-dhp-api.azurewebsites.net'
            }
            else{
                var ep_cancel = endpoint.TEST_API_Reservation + "/" + CommonAPIData.parkCode + "/" + 
                reservationNumber + "/cancel";
                var host = 'test-pms-dhp-api.azurewebsites.net';
            }
            // Get response details.
            const response_header = await this.GetAuthentication();
            const response = await this.request.patch(`${ep_cancel}`, {
                timeout: 90000,
                headers: {
                    'content-type': 'application/json',
                    'Host': host,
                    'Authorization': 'Bearer ' + response_header
                    }
            });
    
            // Verify status code.
            var statusCode = response.status();
            if(statusCode!=200){
                throw new Error("Cancel patch request for "+ reservationNumber + "  was not successful.\nMessage: " + 
                response.statusText());
            }
            else{
                console.log(reservationNumber + " was cancelled successfully.");
            }
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }

    // This will cancel multiple reservation.
    async CancelMultipleReservation(reservationNumber: string[]){
        try{
            // This will cancel individual/multiple reservation.
            for(var i = 0; i < reservationNumber.length; i++){
                await this.CancelReservation(reservationNumber[i]);
            }
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }

    /*GET REQUESTS*/
    // This will get reservation details.
    async GetReservationDetails(reservationNumber: string){
        try{
            if(TestingEnvironment.toLowerCase()=="dev"){
                var ep_ReservationDetails = endpoint.DEV_API_Reservation + "/" + CommonAPIData.parkCode + "/" + 
                reservationNumber;
                var host = 'dev-pms-dhp-api.azurewebsites.net'
            }
            else{
                var ep_ReservationDetails = endpoint.TEST_API_Reservation + "/" + CommonAPIData.parkCode + "/" + 
                reservationNumber;
                var host = 'test-pms-dhp-api.azurewebsites.net';
            }
            const response_header = await this.GetAuthentication();
            const response = await this.request.get(`${ep_ReservationDetails}`, {
                headers: {
                    'content-type': 'application/json',
                    'Host': host,
                    'Authorization': 'Bearer ' + response_header
                    }
            });
            
            // Verify status code.
            var statusCode = response.status();
            var result: any;
            if(statusCode!=200){
                throw new Error("API request was not successful.\nMessage: " + response.statusText());
            }
            else{
                result = await response.json();
                console.log(reservationNumber + " details was displayed.");
            }
            return await result;
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }

    // This will Create new pencil booking for newly cancelled reservation
    async CreateNewPencilBookingfromCancelledReservation(reservationNumber: string[]){
        try{
            // This will cancel individual/group reservation.
            var newReservationNumber: string[] = []
            for(var i=0; i<reservationNumber.length; i++){
                // get the reservation number details.
                var resDetails =  await this.GetReservationDetails(reservationNumber[i]);

                // Get the reservation details to be used for creating pencil booking.
                var result: any;
                var arrivalDate = resDetails["arrivalDate"];
                var departureDate = resDetails["departureDate"];
                var categoryId = resDetails["resDetails"]["categoryId"];
                var areaId = resDetails["resDetails"]["areaId"];

                // This will create the pencil booking.
                if(TestingEnvironment.toLowerCase()=="dev"){
                    var ep_ReservationDetails = endpoint.DEV_API_Reservation + "/" + CommonAPIData.parkCode + "/pencil";
                    var host = 'dev-pms-dhp-api.azurewebsites.net'
                }
                else{
                    var ep_ReservationDetails = endpoint.TEST_API_Reservation + "/" + CommonAPIData.parkCode + "/pencil";
                    var host = 'test-pms-dhp-api.azurewebsites.net';
                }
                const response_header = await this.GetAuthentication();
                const response = await this.request.post(`${ep_ReservationDetails}`, {
                    data: {
                        'areaId': parseInt(areaId),
                        'arrivalDate': arrivalDate,
                        'categoryId': parseInt(categoryId),
                        'departureDate': departureDate,
                        'expiryDate': null,
                        "guestId": null,
                        "guestEmail": null,
                        "guestGiven": "TEMP",
                        "guestMobile": "0412345678",
                        "guestSurname": "PENCIL",
                        "notes": null
                    },
                    timeout: 90000,
                    headers: {
                        'content-type': 'application/json',
                        'Host': host,
                        'Authorization': 'Bearer ' + response_header
                    }
                });
                // Verify status code.
                var statusCode = response.status();
                if(statusCode!=200){
                    throw new Error("Pencil booking for child booking number " + i + 1
                    + "was NOT created successfully.\nMessage: " + 
                    response.statusText());
                }
                else{
                    console.log("Pencil booking was created successfully.");
                    result = await response.json();
                }

                // Return new reservation number for pencil booking.
                var newResNumber = result["id"];
                newReservationNumber.push(newResNumber);
            }
            return newReservationNumber; 
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }

    // This will search for existing member based on searched names.
    async SearchMemberContactsThroughName(searchText: string, returnType: string){
        try{
            if(TestingEnvironment.toLocaleLowerCase().trim()=="dev"){
                var ep_SearchContacts = endpoint.DEV_API_SearchMembers;
                var host = 'dev-int-dhp-api-membership.azurewebsites.net';
            }
            else{
                var ep_SearchContacts = endpoint.TEST_API_SearchMembers;
                var host = 'test-int-dhp-api-membership.azurewebsites.net';
            }
            const response_header = await this.GetAuthentication();
            const response = await this.request.post(`${ep_SearchContacts}`, {
                data: {
                    'searchText': searchText,
                },
                headers: {
                    'content-type': 'application/json',
                    'Host': host,
                    'Authorization': 'Bearer ' + response_header
                }
            });
            
            // This will verify status code and get all the member details.
            var statusCode = response.status();
            var result: any;
            var setMemberDetails: any[] = [];
            var memberDetails: any;
            var selectedIndex = 0;
            var memberFetched = false;
            if(statusCode!=200){
                throw new Error("API request was not successful.\nMessage: " + response.statusText());
            }
            else{
                result = await response.json();

                if(returnType.toLowerCase().trim()=="any"){
                    var resultLength = result.length;
                    for(var i = 0; i<resultLength; i++){
                        memberDetails = await result[i];
                        var memberIs = await this.CheckIfMemberExist(memberDetails['memberNumber']);
                        if(memberIs == true){
                            if(memberDetails["memberNumber"] != null){
                                setMemberDetails.push(memberDetails);
                                memberFetched = true;
                            }
                        }
                    }
    
                    selectedIndex = Math.floor(Math.random() * setMemberDetails.length);
                }
                else{
                    var resultLength = result.length;
                    for(var i = 0; i<resultLength; i++){
                        memberDetails = await result[i];
                        if(memberDetails["memberNumber"] != null){
                            setMemberDetails.push(memberDetails);
                            memberFetched = true;
                        }
                    }
                }
            }

            if(!memberFetched){
                throw new Error("No available member for " + searchText);
            }

            return setMemberDetails[selectedIndex];
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }

    // This will expired searched member.
    async ExpireMembership(result: any, expiryType: string, expiryRange: number, 
        details: any, bookingCount: number = 1){
        try{
            // Get the Member details.
            const email = result["email"];
            const firstName = result["firstName"];
            const lastName = result["lastName"];
            const memberNumber = result["memberNumber"];
            console.log("Member Name: " + result["fullName"]);
    
            // Get the member number.
            var result = await this.GetMemberDetailsUsingMemberNumber(memberNumber);
            const memberGuid = result["MemberGuid"];
            const phone = result["MobilePhone"];
            const street = result["Street"];
            const town = result["Suburb"];
            const postcode = result["Postcode"];
            const state = result["State"];
            const country = result["Country"];
    
            // Get the membership ID.
            var result = await this.GetMembershipDetails(memberGuid);
            const MembershipId = result["MembershipId"];
    
            // Expire the member.
            var expiredDate = await this.SetExpiryDate(expiryType, expiryRange);
            var result = await this.ExpireMember(MembershipId, memberGuid, expiredDate.toString());
            console.log("Expiry Date: " + result["ExpiryDate"]);
    
            // Set member information to be used for creating reservation.
            var isMember: any[] = []; 
            var isUpsell: any[] = [];
            var isVelocity: any[] = [];
            isMember.push(details.isMember);
            isUpsell.push(details.isUpsell);
            isVelocity.push(details.isVelocity);
            var customerDetails = [bookingCount, memberNumber, firstName, lastName, email, phone, street, 
                town, state, postcode, country, isMember, isUpsell, isVelocity, ''];
                
            // return customer details.
            return await this.dataSetup.SetMemberData(customerDetails);
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }

    // Get memebershil details using member number.
    async GetMemberDetailsUsingMemberNumber(memberNumber: string){
        try{
            var ep_getMember: any;
            if(TestingEnvironment.toLowerCase()=="dev"){
                ep_getMember = endpoint.DEV_API_GetMember;
                var host = 'dev-int-dhp-api-membership.azurewebsites.net'
            }
            else{
                ep_getMember = endpoint.TEST_API_GetMember;
                var host = 'test-int-dhp-api-membership.azurewebsites.net'
            }
            const response_header = await this.GetAuthentication();
            const response = await this.request.get(`${ep_getMember}`,{
                headers:{
                    'content-type': 'application/json',
                    'Host': host,
                    'Authorization': 'Bearer ' + response_header
                },
                params: {
                    'MemberNumber': memberNumber
                }
            });
            var result: any;
            var statusCode = response.status();
            if(statusCode!=200){
                throw new Error("API request was not successful.\nMessage: (" + statusCode + ") " + response.statusText());
            }
            else{
                result = await response.json();
                console.log("Membership details was displayed.");
            }
            console.log(result);
            return result;
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }

    // Get the membership details using memberId.
    async GetMembershipDetails(memberGuid: string){
        try{
            var ep_memberhip: any;
            if(TestingEnvironment.toLowerCase()=="dev"){
                ep_memberhip = endpoint.DEV_API_GetMembershipDetails;
                var host = 'dev-int-dhp-api-membership.azurewebsites.net'
            }
            else{
                ep_memberhip = endpoint.TEST_API_GetMembershipDetails;
                var host = 'test-int-dhp-api-membership.azurewebsites.net'
            }
            const response_header = await this.GetAuthentication();
            const response = await this.request.get(`${ep_memberhip}`, {
                headers: {
                    'content-type': 'application/json',
                    'Host': host,
                    'Authorization': 'Bearer ' + response_header
                }, 
                params: {
                    'MemberGuid': memberGuid
                }
            });
            var result: any;
            result = await response.json();
            var statusCode = response.status();
            if(statusCode!=200){
                throw new Error("API request was not successful.\nMessage: (" + statusCode + ") " + response.statusText());
            }
            else{
                result = await response.json();
                console.log("Member details was displayed.");
            }
            console.log(result);
            return result;
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }

    // Set expiry dates [Day(s), Month(s), Year(s)].
    async SetExpiryDate(expiryRangeType: string, expiryRange: number){
        try{
            var initialDate = new Date();
            if(expiryRangeType.toLowerCase().trim().includes("day")){
                initialDate.setDate(initialDate.getDate() - expiryRange);
            }
            else if(expiryRangeType.toLowerCase().trim().includes("month")){
                initialDate.setMonth(initialDate.getMonth() - expiryRange);
            }
            else if(expiryRangeType.toLowerCase().trim().includes("year")){
                initialDate.setFullYear(initialDate.getFullYear() - expiryRange);
            }
            return initialDate.toISOString().split('T')[0];
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }

    // Expire selected member.
    async ExpireMember(membershipId: string, memberGuid: string, expiryDate: string){
        try{
            var ep_membership: any;
            if(TestingEnvironment.toLowerCase() == "dev"){
                ep_membership = endpoint.DEV_API_GetMembershipDetails;
                var host = 'dev-int-dhp-api-membership.azurewebsites.net'
            }
            else{
                ep_membership = endpoint.TEST_API_GetMembershipDetails;
                var host = 'test-int-dhp-api-membership.azurewebsites.net'
            }
            const response_header = await this.GetAuthentication();
            const response = await this.request.patch(`${ep_membership}`, {
                data:{
                    'MembershipId': membershipId,
                    'ExpiryDate': expiryDate,
                    'MemberGuid': memberGuid,
                },
                timeout: 90000,
                headers: {
                    'content-type': 'application/json',
                    'Host': host,
                    'Authorization': 'Bearer ' + response_header
                }
            });
            var result: any;
            result = await response.json();
            var statusCode = response.status();
            if(statusCode!=200){
                throw new Error("API request was not successful.\nMessage: (" + statusCode + ") " + response.statusText());
            }
            else{
                result = await response.json();
                console.log("Member was expired.");
            }
            console.log(result);
            return result;
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveStackTrace(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveStackTrace(e.stack);
                throw new Error(e.stack);
            }
        }
    }

    // Get the membership details using memberId.
    async GetParkDetails(){
        try{
            if(TestingEnvironment.toLowerCase()=="dev"){
                var ep_Parks = endpoint.DEV_CDN;
            }
            else{
                var ep_Parks = endpoint.TEST_CDN;
            }
            const response = await this.request.get(`${ep_Parks}`, {
                headers: {
                    'content-type': 'application/json',
                },
            });
            var result: any;
            var parkDetails: any;
            result = await response.json();
            var statusCode = response.status();
            if(statusCode!=200){
                throw new Error("API request was not successful.\nMessage: (" + statusCode + ") " + response.statusText());
            }
            else{
                result = await response.json();
                parkDetails = result["ParkInfo"]["rooms"];
            }
            return parkDetails;
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }

    // This will search for existing member based on specific name search.
    async SearchContactsThroughSpecificName(searchText: string){
        try{
            if(TestingEnvironment.toLocaleLowerCase().trim()=="dev"){
                var ep_SearchContacts = endpoint.DEV_API_SearchMembers;
                var host = 'dev-int-dhp-api-membership.azurewebsites.net';
            }
            else{
                var ep_SearchContacts = endpoint.TEST_API_SearchMembers;
                var host = 'test-int-dhp-api-membership.azurewebsites.net';
            }
            const response_header = await this.GetAuthentication();
            const response = await this.request.post(`${ep_SearchContacts}`, {
                data: {
                    'searchText': searchText,
                },
                headers: {
                    'content-type': 'application/json',
                    'Host': host,
                    'Authorization': 'Bearer ' + response_header
                }
            });

            // Get member details.
            var memberDetails: any;
            var result: any;
            var memberFetched: boolean = false;
            result = await response.json();
            var statusCode = response.status();
            if(statusCode!=200){
                throw new Error("API request was not successful.\nMessage: (" + statusCode + ") " + response.statusText());
            }
            else{
                result = await response.json();
                console.log(result[0]);
                memberDetails = await result[0];
                console.log(memberDetails["fullName"]);
                if(memberDetails["fullName"] != null){
                    memberFetched = true;
                }
            }

            if(!memberFetched){
                throw new Error("No available details for " + searchText);
            }

            return memberDetails;
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }

    // This will search for existing member based on specific name search.
    async UpdateSearchContact(memberDetails: any){
        try{
            if(TestingEnvironment.toLocaleLowerCase().trim()=="dev"){
                var ep_UpdateSearchContacts = endpoint.DEV_API_UpdateSearchContact;
                var host = 'dev-int-dhp-api-membership.azurewebsites.net';
            }
            else{
                var ep_UpdateSearchContacts = endpoint.TEST_API_UpdateSearchContact;
                var host = 'test-int-dhp-api-membership.azurewebsites.net';
            }
            const response_header = await this.GetAuthentication();
            const response = await this.request.post(`${ep_UpdateSearchContacts}`, {
                data: {
                    'contactId': memberDetails["contactId"],
                    "memberGuid": memberDetails["memberGuid"],
                    "firstName": memberDetails["firstName"],
                    "lastName": memberDetails["lastName"],
                    "email": memberDetails["email"],
                    "mobile": memberDetails["mobile"],
                    "postalAddress": memberDetails["postalAddress"],
                    "memberTier": memberDetails["memberTeir"],
                    "memberNumber": memberDetails["memberNumber"],
                },
                headers: {
                    'content-type': 'application/json',
                    'Host': host,
                    'Authorization': 'Bearer ' + response_header
                }
            });

            // Get member details.
            var statusCode = response.status();
            if(statusCode!=200){
                throw new Error("API request was not successful.\nMessage: (" + statusCode + ") " + response.statusText());
            }
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }

    // This will seach contact and update contact search.
    async SearchAndUpdateMemberContact(searchText: string, returnType: string){
        try{
            // This will search existing contacts.
            var result = await this.SearchMemberContactsThroughName(searchText, returnType);

            // This will update the searched contact.
            await this.UpdateSearchContact(result);

            return result;
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }

    // This will create a reservation based on inputs.
    async CreateReservation(bookingType: string){
        try{
            // Get the authorization token.
            const responseToken = await this.GetAuthentication();

            // Get the endpoint and host based on set environment.
            var ep_CreateReservation: any;
            var host: any;
            if(TestingEnvironment.toLowerCase() == "dev"){
                ep_CreateReservation = endpoint.DEV_API_CreateReservation+CommonAPIData.parkCode
                host = 'dev-pms-dhp-api.azurewebsites.net';
            }
            else{
                ep_CreateReservation = endpoint.API_CreateReservation+CommonAPIData.parkCode
                host = 'test-pms-dhp-api.azurewebsites.net';
            }

            // Set global variables.
            var details: any, email: any, firstName: any, lastName: any, discount: any;
    
            // Set customer details.
            if(bookingType.toLowerCase().trim() == "member"){
                if(TestingEnvironment.toLowerCase() == "dev"){
                    details = DEV_CreateReservationWithMember;
                }
                else{
                    details = CreateGroupReservationWithMember;
                }
                firstName = details.firstName;
                lastName = details.lastName;
                email = details.email;
            }
            else{
                details = CreateReservationWithNonMember;
                firstName = details.firstName + await this.GenerateRandomString("Alphanumeric", 8);
                lastName = details.lastName + await this.GenerateRandomString("Alphanumeric", 8);
                email = await this.GenerateRandomEmail(firstName, "@gmail.com", "Alphanumeric", 4);
            }

            // Set customer details based on scenario.
            if(bookingType.toLowerCase().trim()=="velocity"){
                await this.SetRandomSleep();
                if(TestingEnvironment.toLowerCase()=="dev"){
                    details = DEV_CreateReservationWithVelocityMember;
                }
                else{
                    details = CreateReservationWithVelocityMember;
                }
            }
            else if(bookingType.toLowerCase().trim()=="more than 500"){
                await this.SetRandomSleep();
                details = GuestReservationMoreThan500BookingCost;
            }
            else if(bookingType.toLowerCase().trim()=="past dated checkin"){
                await this.SetRandomSleep();
                details = ReservationWithPastDatedCheckin;
            }
            else if(bookingType.toLowerCase().trim()=="departing"){
                await this.SetRandomSleep();
                details = CreateDepartingNonMember;
            }
            else if(bookingType.toLowerCase().trim()=="multiple inhouse"){
                await this.SetRandomSleep();
                details = CreateMultipleInhouseNonMember;
            }
            else if(bookingType.toLowerCase().trim()=="multiple inhouse no balance"){
                await this.SetRandomSleep();
                details = CreateMultipleInhouseNoBalance;
            }
            else if(bookingType.toLowerCase().trim()=="multiple departing"){
                await this.SetRandomSleep();
                details = CreateMultipleDepartingNonMember;
            }
            else if(bookingType.toLowerCase().trim()=="multiple departing no balance"){
                await this.SetRandomSleep();
                details = CreateMultipleDepartingNoBalance;
            }
            else if(bookingType.toLowerCase().trim()=="partial"){
                await this.SetRandomSleep();
                details = CreateReservationUsingPoweredEnsuite;
            }
            else if(bookingType.toLowerCase().trim()=="cancel"){
                await this.SetRandomSleep();
                details = CreateReservationUsingPoweredEnsuite;
            }
            else if(bookingType.toLowerCase().trim()=="buy member"){
                await this.SetRandomSleep();
                details = CreateReservationUsingPoweredEnsuite;
            }
            else if(bookingType.toLowerCase().trim()=="checkin"){
                await this.SetRandomSleep();
                details = CreateReservationStandardStudioEnsuite;
            }
            else if(bookingType.toLowerCase().trim()=="change room"){
                await this.SetRandomSleep();
                details = CreateReservationStandardStudioEnsuite;
            }
            else if(bookingType.toLowerCase().trim()=="edit details"){
                await this.SetRandomSleep();
                details = CreateReservationDeluxeBaliVilla;
            }
            else if(bookingType.toLowerCase().trim()=="clean"){
                await this.SetRandomSleep();
                details = CreateReservationWithStandardStudioCabin;
            }
            else if(bookingType.toLowerCase().trim()=="not clean"){
                await this.SetRandomSleep();
                details = CreateReservationSup2BedroomCabin;
            }
            else if(bookingType.toLowerCase().trim()=="search"){
                await this.SetRandomSleep();
                details = CreateReservationStudEnsuiteTwin;
            }
            // else{
            //     await this.SetRandomSleep();
            //     details = CreateReservationWithNonMember;
            // }



            // Get formatted reservation dates and night stay
            var checkIn = await this.SetBookingDatesForCreateReservationAPI(details.arrivalDate);
            var checkOut = await this.SetBookingDatesForCreateReservationAPI(details.departureDate);
            var nights = (parseInt(details.departureDate) - parseInt(details.arrivalDate)).toString();

            // Create request for booking reservation.
            const response = await this.request.post(`${ep_CreateReservation}`, {
                params: {
                    'parkcode': CommonAPIData.parkCode
                },
                data: {
                    'providerReference': details.providerReference,
                    'fieldVersion': details.filedVersion,
                    'parkIdentifier': details.parkIdentifier,
                    'roomtypeIdentifier': details.RoomtypeIdentifier,
                    'source': details.source,
                    'bookingSource': {
                        'bookingSourceName': details.bookingSourceName,
                        'bookingSourceIdentifier': details.bookingSourceIdentifier
                    },
                    'reservationType': {
                        'reservationTypeName': details.reservationTypeName,
                        'reservationTypeIdentifier': details.reservationTypeIdentifier
                    },
                    'brand': details.brand,
                    'paymentId': details.paymentId,
                    'arrivalDate': checkIn,
                    'departureDate': checkOut,
                    'numberOfNights': nights,
                    'numberofAdults': details.numberOfAdults,
                    'numberOfChildren': details.numberOfChildren,
                    'numberOfInfants': details.numberOfInfants,
                    'discountType': details.discountType,
                    'discountId': details.discount,
                    'membershipNumber': details.membershipNumber,
                    'firstName': firstName,
                    'lastName': lastName,
                    'email': email,
                    'phone': details.phone,
                    'streetAddress': details.streetAddress,
                    'town': details.town,
                    'state': details.state,
                    'postcode': details.postcode,
                    'countryCode': details.countryCode,
                    'customerIP': details.customerIP,
                    'userAgent': details.userAgent,
                    'lineItems': [{
                        'Type': details.Type,
                        'Amount': details.Amount,
                        'Description': details.Description
                    }],
                    'rates': [{
                        'date': checkIn,
                        'baseAmount': details.baseAmount,
                        'totalAmount': details.totalAmount,
                        'tariffReference': details.tariffReference
                    }]
                }, 
                timeout: 90000,
                headers: {
                    'content-type': 'application/json',
                    'Host': host,
                    'Authorization': 'Bearer ' + responseToken
                    }
                });

                // This will get the JSON response.
                const jsonResponse = await response.json();
                console.log(jsonResponse);

                // Get booking number.
                const bookingStatus = jsonResponse["bookingCreated"];
                const bookingMessage = jsonResponse["statusMessageText"];
                const exceptionMessage = jsonResponse["System.Exeption"];
                var bookingNumber: any;
                var createdBooking: any;
                if(bookingStatus){
                    if(TestingEnvironment.toLowerCase() == "dev"){
                        // createdBooking = jsonResponse["TransactionResult.OutputDictionary"]["CreateBooking"][0];
                        bookingNumber = jsonResponse["referenceNumber"];
                    }
                    else{
                        bookingNumber = jsonResponse["referenceNumber"];
                        // if(bookingNumber==undefined){
                        //     createdBooking = jsonResponse["TransactionResult.OutputDictionary"]["CreateBooking"][0];
                        //     bookingNumber = createdBooking["ReferenceNumber"];
                        // }
                    }
                    console.log("Reservation Number: " + bookingNumber);
                }
                else{
                    throw new Error(bookingMessage + "\nException Message: " + exceptionMessage);
                }

                // This will return booking number.
                return bookingNumber;
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this. SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }
    // This will create payment thru cash only
    async CreatePaymentThruCash(transactionAmount: any, accountId: any){
        try{
            // Get the authorization token.
            const responseToken = await this.GetAuthentication();

            // Get the endpoint and host based on set environment.
            var ep_CreatePayment: any, host: any;
            if(TestingEnvironment.toLowerCase() == "dev"){
                ep_CreatePayment = endpoint.DEV_API_CreatePayment;
                host = 'dev-pms-dhp-api.azurewebsites.net';
            }
            else{
                ep_CreatePayment = endpoint.TEST_API_CreatePayment;
                host = 'test-pms-dhp-api.azurewebsites.net';
            }
            const response = await this.request.post(`${ep_CreatePayment}`, {
                data: {
                    'transactionAmount': transactionAmount,
                    'accountId': accountId,   
                    'paymentType': Payment.cash
                },
                timeout: 90000,
                headers: {
                    'content-type': 'application/json',
                    'Host': host,
                    'Authorization': 'Bearer ' + responseToken
                    }
            });
            return response.status();
        }catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }

    // This will create payment thru credit card only
    async CreatePaymentThruCC(transactionAmount: any, accountId: any){
        try{
            // Get the authorization token.
            const responseToken = await this.GetAuthentication();

            // Get the endpoint and host based on set environment.
            var ep_CreatePayment: any, host: any;
            if(TestingEnvironment.toLowerCase() == "dev"){
                ep_CreatePayment = endpoint.DEV_API_CreatePayment;
                host = 'dev-pms-dhp-api.azurewebsites.net';
            }
            else{
                ep_CreatePayment = endpoint.TEST_API_CreatePayment;
                host = 'test-pms-dhp-api.azurewebsites.net';
            }
            const response = await this.request.post(`${ep_CreatePayment}`, {
                data: {
                    'transactionAmount': transactionAmount,
                    'accountId': accountId,   
                    'paymentType': Payment.cc
                },
                timeout: 90000,
                headers: {
                    'content-type': 'application/json',
                    'Host': host,
                    'Authorization': 'Bearer ' + responseToken
                    }
            });

            return response.status();
        }catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }

    // This will create cc fee charge
    async CreateCharge(chargeType: any, accountId: any, transactionAmount: any){
        try{
            var sundryId;
            var newMembership = "false";
            switch(chargeType.toLowerCase().trim()){
                case "ccfee":
                    sundryId = Sundry.creditCard;
                    break;
                case "gday":
                    sundryId = Sundry.gdayRewardPurchase;
                    newMembership = "true";
                    break;
            }

            // Get the authorization token.
            const responseToken = await this.GetAuthentication();

            // Get the endpoint and host based on set environment.
            var ep_CreateCharge: any, host: any;
            if(TestingEnvironment.toLowerCase() == "dev"){
                ep_CreateCharge = endpoint.DEV_API_CreateCharge;
                host = 'dev-pms-dhp-api.azurewebsites.net';
            }
            else{
                ep_CreateCharge = endpoint.TEST_API_CreateCharge;
                host = 'test-pms-dhp-api.azurewebsites.net';
            }
            const response = await this.request.post(`${ep_CreateCharge}`, {
                data: {
                    'transactionAmount': transactionAmount,
                    'accountId': accountId,   
                    'sundryId': sundryId
                },
                timeout: 90000,
                headers: {
                    'content-type': 'application/json',
                    'Host': host,
                    'Authorization': 'Bearer ' + responseToken
                    }
            });
            const status = response.status();
            if(status != 200){
                throw new Error("Charge has NOT been created");
            }else{
                console.log("Charge has been created")
                if(newMembership == "true"){
                    return newMembership;
                }
            }
        }catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }

    // This will create single or multiple payment base on inputs
    async CreateSingleOrMultiplePayments(reservationId: any, paymentType: any, numberOfPayment: any, transactionAmount: any = ""){
        try{
            // Get result
            var result = await this.GetReservationDetails(reservationId);

            // Get Account ID   
            const accountId = result['accountId'];
            var balance = result['accountDetails']['totalAmount'];

            if(transactionAmount == ""){
                transactionAmount = balance;
            }
            
            // Calculate Credit Card Fee
            var creditCardFee = 0, totalAmount = 0, totalPayment = 0;;
            if(paymentType == Payment.cc){
                creditCardFee = transactionAmount * CCSurcharge;
                totalAmount = transactionAmount + creditCardFee;
            }

            for(var i = 0; i<numberOfPayment; i++){
                var status: any;
                if(paymentType.toLowerCase().trim() == Payment.cash){
                    status = await this.CreatePaymentThruCash(transactionAmount, accountId);
                }else if(paymentType.toLowerCase().trim() == Payment.cc){
                    status = await this.CreatePaymentThruCC(totalAmount, accountId);
                    await this.CreateCharge("ccfee",accountId, creditCardFee);
                }else{
                    if(i%2 == 0){
                        status = await this.CreatePaymentThruCash(transactionAmount, accountId);
                    }else{
                        status = await this.CreatePaymentThruCC(totalAmount, accountId);
                        await this.CreateCharge("ccfee",accountId, creditCardFee);
                    }
                }
                if(status != 200){
                    throw new Error("Payment has NOT been created!");
                }else{
                    totalPayment = totalPayment + totalAmount;
                    console.log("Payment "+(i+1)+" has been created!");
                }
            }
            if(totalPayment > balance+creditCardFee){
                throw new Error("Payment SHOULD not exceed the total amount of "+balance);
            }
            console.log(result);
        }catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }

    // This will search a transaction via Account ID and Reservation ID
    async SearchTransactions(reservationId: any, voidTransaction: any = false, transType:any = ""){
        try{

            // Get the authorization token.
            const responseToken = await this.GetAuthentication();

            // Get result
            const result = await this.GetReservationDetails(reservationId);

            // Get Account ID   
            var accountId = result['accountId'];

            // Get the endpoint and host based on set environment.
            var ep_SearchTransactions: any, host: any, paymentDetails: any [] = [];
            if(TestingEnvironment.toLowerCase() == "dev"){
                ep_SearchTransactions = endpoint.DEV_API_SearchTransactions;
                host = 'dev-pms-dhp-api.azurewebsites.net';
            }
            else{
                ep_SearchTransactions = endpoint.TEST_API_SearchTransactions;
                host = 'test-pms-dhp-api.azurewebsites.net';
            }
            const response = await this.request.post(`${ep_SearchTransactions}`, {
                data: {
                    'reservationIds': [
                        reservationId
                    ],
                    'accountIds': [
                        accountId
                    ],
                    'transactionType': transType,
                    'voidTransactions': voidTransaction
                },
                timeout: 90000,
                headers: {
                    'content-type': 'application/json',
                    'Host': host,
                    'Authorization': 'Bearer ' + responseToken
                    }
            });
            var res: any;
            if(response.status() != 200){
                throw new Error("API request was not successful.\nMessage: " + response.statusText());
            }else{
                res = await response.json();
                var resultLength = res.length;
                console.log(res);
                console.log(resultLength)
                for(var i = 1; i<res.length; i++){
                    paymentDetails.push(res[i]);
                }
            }
            return paymentDetails;
        }catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }

    // This will check the booking in PMS
    async CheckBookingInPMS(reservationID:any, stayCostDetails: StayCostDetails, actualEmployeeName:string){
        try{
            var result = await this.GetReservationDetails(reservationID);
            var pmsNotes = result['notes'][0]['content'];
            var employeeName = pmsNotes.split("by")[1];
            if(result['bookingStatus'] != bookingStatus.cancelled){
                throw new Error("Reservation "+reservationID+" was not cancelled")
            }else{
                console.log("Reservation "+reservationID+" has been cancelled");
            }

            if(actualEmployeeName != employeeName.trim()){
                throw new Error("Actual and Expected employee name did not matched.\nExpected: " + employeeName +
                "\nActual: " + actualEmployeeName);
            }else{
                console.log("PMS Notes: "+pmsNotes);
            }

            var voidTransaction = await this.SearchTransactions(result['reservationId'],"true");
            for(var i = 0; i<voidTransaction.length; i++){
                if(voidTransaction[i]['transactionType'] == transactionType.discount){
                    if(!voidTransaction[i]['description'].includes(description.voidAccommodation)){
                        throw new Error("No voided transaction");
                    }
                }else{
                    console.log("Accommodation Transaction has been voided");
                }
            }

            var chargeTransaction = await this.SearchTransactions(result['reservationId'],"false","Charge")
            for(var i = 0; i<chargeTransaction.length; i++){
                if(chargeTransaction[i]['description'] == description.ccFee){
                    if(chargeTransaction[i]['transactionType'] != transactionType.charge &&
                    chargeTransaction[i]['amount'] != stayCostDetails.CancellationFee){
                        throw new Error("Cancellation Fee does NOT turned as a Sundry Charge / Cancellation Fee amount is NOT equal"
                        +"\nTransaction Type: "+chargeTransaction[i]['transactionType']
                        +"\nActual Cancellation Fee "+stayCostDetails.CancellationFee
                        +"\nExpected Cancellation Fee: "+chargeTransaction[i]['amount']);
                    }else{
                        console.log("Cancellation fee turned into Sundry Charge and fee did matched");
                    }
                }
            }

            var refundTransaction = await this.SearchTransactions(result['reservationId'],"false","Refund")
            if(stayCostDetails.parkRefundAmount[0] != 0){
                if(refundTransaction['transactionType'] != transactionType.refund
                && refundTransaction['amount'] != stayCostDetails.parkRefundAmount[0]
                && !(refundTransaction['description'].includes(description.machineRefund))){
                    throw new Error("Transaction is NOT a refund type / Actual and Expected refund amount did NOT matched / description did NOT matched")
                }else{
                    console.log("Refund amount is posted in client's account");
                }
            }

        }catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }

    // This will check if Member exist / could be found
    async CheckIfMemberExist(memberNumber: string){
        try{
            var ep_getMember: any;
            if(TestingEnvironment.toLowerCase()=="dev"){
                ep_getMember = endpoint.DEV_API_GetMember;
                var host = 'dev-int-dhp-api-membership.azurewebsites.net'
            }
            else{
                ep_getMember = endpoint.TEST_API_GetMember;
                var host = 'test-int-dhp-api-membership.azurewebsites.net'
            }
            const response_header = await this.GetAuthentication();
            const response = await this.request.get(`${ep_getMember}`,{
                headers:{
                    'content-type': 'application/json',
                    'Host': host,
                    'Authorization': 'Bearer ' + response_header
                },
                params: {
                    'MemberNumber': memberNumber
                }
            });
            var statusCode = response.status();
            if(statusCode!=200){
                return false;
            }
            else{
                return true;
            }
        }catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }

    // Get reservation dates.
    async GetReservationDates(reservationNumber: string){
        try{
            var results = await this.GetReservationDetails(reservationNumber);
            var initialCheckIn = results["arrivalDate"];
            var initialCheckOut = results["departureDate"];
    
            var checkIn = initialCheckIn.split('T')[0];
            console.log("Check in date: " + checkIn);
            var checkOut = initialCheckOut.split('T')[0];
            console.log("Check out date: " + checkOut);
    
            return [checkIn, checkOut];
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
            else{
                await this.SaveFailedTraceLogs(e.stack);
                throw new Error(e.stack);
            }
        }
    }
}