import { Page, expect } from "@playwright/test";
import { EditBookingModal } from "../models/EditBookingModalV2";
import { editbooking } from "../mocks/EditBooking";
// export const UpsellGuestData1 = {
//     arrival: 87,
//     departure: 88,
//     adults: 2,
//     child: 1,
//     infant: 1,
//     searchText: 'xyz123',
//     firstName: 'RCATSMember',
//     lastName: 'RCATSMemberTest',
//     email: '',
//     mobile: '0412345678',
//     street: 'Light Square',
//     town: 'Adelaide',
//     state: 'SA',
//     postcode: '5000',
//     country: 'Australia',
//     reserveType: '12. Staff',
//     bookingSource: '1. Walk in',
//     bookingNotes: 'Test Reservation',
//     isVelocity: false,
//     isUpsell: true,
//     isMember: false
// }

export class BookingPageV2{
    // Set object variable.
    readonly page: Page;
    public lbl_AdultCount = "#gr-adultcount";
    public lbl_ChildCount = "#gr-childcount";
    public lbl_InfantCount = "#gr-infantcount";
    public lbl_GuestFieldName = "//label[@for='nr-guests']";
    public btn_AddAdult = "//div[@class='gr-select-guests-section guest-adults']/div/button/i[@class='fas fa-plus']";
    public btn_AddChild = "//div[@class='gr-select-guests-section guest-children']/div/button/i[@class='fas fa-plus']";
    public btn_AddInfant = "//div[@class='gr-select-guests-section guest-infants']/div/button/i[@class='fas fa-plus']";
    public btn_LessAdult = "//div[@class='gr-select-guests-section guest-adults']/div/button/i[@class='fas fa-minus']";
    public btn_LessChild = "//div[@class='gr-select-guests-section guest-children']/div/button/i[@class='fas fa-minus']";
    public btn_LessInfant = "//div[@class='gr-select-guests-section guest-infants']/div/button/i[@class='fas fa-minus']";

    // dumbed down version. 
    public numberOfNights: number;    
    public adults: number;
    public child: number;
    public infant: number;


    // Set a sub routine that will access the functions from parent and sibling class.
    constructor(page: Page){
        this.page = page;     
    }

   // Select the booking dates, guests and click search 
   // checkin day of the month
   // checkout day of the month
   // guests
    async SearchAccommodation(){

        await this.SelectBookingDate();
        await this.SetNumberOfGuests(this.adults, this.child, this.infant);
        await this.ClickSearch()
    }

    // Step: Click Search button.
    async ClickSearch(){
        const submitSearch = this.page.getByRole('button', { name: ' Search' });      
        await submitSearch.click()   
    }

    private randomInt = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;
    // the day of the month for the checkin and checkout
    // randomise checkin checkout
    async SelectBookingDate() {
        // random booking 5-10 days out
        let day = this.randomInt(5, 10);
        let end = day + this.numberOfNights;
        var dateWidget = "#gr-search-date-input";
        var locator = this.page.locator(dateWidget);
        await locator.click();

        // this will get the days from the right calendar which should always be available
        await this.page.locator(".drp-calendar.right").getByRole('cell', {name: day, exact:true}).first().click();
        await this.page.locator(".drp-calendar.right").getByRole('cell', {name: end, exact:true}).first().click();
        await this.page.getByRole('button', { name: 'Confirm', exact: true }).click();

    }

    // slightly simplified RJ algorithm
    async SetNumberOfGuests(adult: number, child: number, infant: number){
        await this.page.locator('#search-guests-text').click();
       
        var adultCount = await this.page.$eval<string, HTMLSelectElement>(this.lbl_AdultCount, ele => ele.value);
        var childCount = await this.page.$eval<string, HTMLSelectElement>(this.lbl_ChildCount, ele => ele.value);
        var infantCount = await this.page.$eval<string, HTMLSelectElement>(this.lbl_InfantCount, ele => ele.value);

        var addAdult = 0, addChild = 0, addInfant = 0;
        var lessAdult = 0, lessChild = 0, lessInfant = 0;
        
        // Add or reduce adult.
        if(parseInt(adultCount) <= adult){
            addAdult = adult - parseInt(adultCount);
            for(var i=1; i<=addAdult; i++){
                await this.page.click(this.btn_AddAdult);
            }
        }
        else{
            if(parseInt(adultCount) > 1){
                lessAdult = parseInt(adultCount) - adult;
                for(var i=1; i<=lessAdult; i++){
                    await this.page.click(this.btn_LessAdult);
                }
            }
        }

        // Add or reduce child.
        if(parseInt(childCount) <= child){
            addChild = child - parseInt(childCount);
            for(var i=1; i<=addChild; i++){
                await this.page.click(this.btn_AddChild);
            }
        }
        else{
            if(parseInt(childCount) > 0){
                lessChild = parseInt(childCount) - child;
                for(var i=1; i<=lessChild; i++){
                    await this.page.click(this.btn_LessChild);
                }
            }
        }

        // Add or reduce infant.
        if(parseInt(infantCount) <= infant){
            var addInfant = infant - parseInt(infantCount);
            for(var i=1; i<=addInfant; i++){
                await this.page.click(this.btn_AddInfant);
            }
        }
        else{
            if(parseInt(infantCount) > 0){
                lessInfant = parseInt(infantCount) - infant;
                for(var i=1; i<=lessInfant; i++){
                    await this.page.click(this.btn_LessInfant);
                }
            }
        }

        await this.page.click(this.lbl_GuestFieldName);
       
    }

    // this will just work down the list and add bookings
    async SelectAccommodations(count: number) {
        // adding <count> booking by clicking the first 2 CTAs.
        for (let i = 0; i < count; i++) {
            await this.page.getByRole('button', { name: '+ Add Booking' }).nth(i).click();            
        }
    }

    // load the edit booking modal
    async AddGuest(booking: number) {
        //edit the first booking on the mocked page
        const locator = this.page.getByRole('button', { name: 'Edit' }).nth(booking);
        expect(locator).toBeVisible();
        await locator.click();
        let edit = new EditBookingModal(this.page);
        // call the edit modal
        await edit.addGuest();


    }

    async AddGuestUpgradeToMember(booking: number) {
        const locator = this.page.getByRole('button', { name: 'Edit' }).nth(booking);
        expect(locator).toBeVisible();
        await locator.click();
        let edit = new EditBookingModal(this.page);
        // call the edit modal
        await edit.convertToMember();

    }

    async SetGuestDetails(customer: any, upsellType: string= "All"){
        // var firstName="", lastName="", memberId="", email="", searchText="", mobile="", street="";
        // var town="", state="", postcode="", country="";
        // var velocityNumber: any[] = [];
        // var isVelocity: any[] = [];
        // var isMember: any[] = [];
        // var isUpsell: any[] = [];
        // var emailExist: any[] = [];
        // if(!customer.isMember){
        //     for(var i = 0; i < details.BookingCount; i++){
        //         if(i==details.BookingCount-1){
        //             searchText = searchText + customer.searchText;
        //             if(customer.email==""){
        //                 email = email + await this.GenerateRandomEmail(customer.firstName, "@gmail.com", "Alphanumeric", 8);
        //                 firstName = firstName + customer.firstName + await this.GenerateRandomString("Alphanumeric", 8);
        //                 lastName = lastName + customer.lastName + await this.GenerateRandomString("Alphanumeric", 8);
        //                 emailExist.push(false);
        //             }
        //             else{
        //                 if(i > 0){
        //                     email = email + await this.GenerateRandomEmail(customer.firstName, "@gmail.com", "Alphanumeric", 8);
        //                     firstName = firstName + customer.firstName + await this.GenerateRandomString("Alphanumeric", 8);
        //                     lastName = lastName + customer.lastName + await this.GenerateRandomString("Alphanumeric", 8);
        //                     emailExist.push(false);
        //                 }
        //                 else{
        //                     email = email + customer.email;
        //                     firstName = firstName + customer.firstName;
        //                     lastName = lastName + customer.lastName;
        //                     emailExist.push(true);
        //                 }
        //             }
        //             mobile = mobile + customer.mobile;
        //             street = street + customer.street;
        //             town = town + customer.town;
        //             state = state + customer.state;
        //             postcode = postcode + customer.postcode;
        //             country = country + customer.country;
        //             if(customer.isUpsell == false && upsellType.toLowerCase().trim()=="any" && i > 0){
        //                 isUpsell.push(true);
        //             }
        //             else{
        //                 isUpsell.push(customer.isUpsell);
        //             }
        //             isMember.push(customer.isMember);
        //             isVelocity.push(false);
        //             velocityNumber.push('');
        //         }
        //         else{
        //             searchText = searchText + customer.searchText + "|";
        //             if(customer.email==""){
        //                 email = email + await this.GenerateRandomEmail(customer.firstName, "@gmail.com", "Alphanumeric", 8) + "|";
        //                 firstName = firstName + customer.firstName + await this.GenerateRandomString("Alphanumeric", 8) + "|";
        //                 lastName = lastName + customer.lastName + await this.GenerateRandomString("Alphanumeric", 8) + "|";
        //                 emailExist.push(false);
        //             }
        //             else{
        //                 if(i > 0){
        //                     email = email + await this.GenerateRandomEmail(customer.firstName, "@gmail.com", "Alphanumeric", 8) + "|";
        //                     firstName = firstName + customer.firstName + await this.GenerateRandomString("Alphanumeric", 8) + "|";
        //                     lastName = lastName + customer.lastName + await this.GenerateRandomString("Alphanumeric", 8) + "|";
        //                     emailExist.push(false);
        //                 }
        //                 else{
        //                     firstName = firstName + customer.firstName + "|";
        //                     lastName = lastName + customer.lastName + "|";
        //                     email = email + customer.email + "|";
        //                     emailExist.push(true);
        //                 }
        //             }
        //             mobile = mobile + customer.mobile + "|";
        //             street = street + customer.street + "|";
        //             town = town + customer.town + "|";
        //             state = state + customer.state + "|";
        //             postcode = postcode + customer.postcode + "|";
        //             country = country + customer.country + "|";
        //             isMember.push(customer.isMember);
        //             isUpsell.push(customer.isUpsell);
        //             isVelocity.push(false);
        //             velocityNumber.push('');
        //         }
        //     }
        //     var customerDetails = [details.BookingCount, searchText, firstName, lastName, email, mobile, street, 
        //         town, state, postcode, country, isMember, isUpsell, isVelocity, velocityNumber, emailExist];
        //     return await this.dataSetup.SetCustomerData(customerDetails);
        // }
        // else{
        //     for(var i = 0; i < details.BookingCount; i++){
        //         if(i==details.BookingCount-1){
        //             if(!customer.firstName.includes('|')){
        //                 firstName = firstName + customer.firstName;
        //                 lastName = lastName + customer.lastName;
        //                 email = email + customer.email;
        //                 mobile = mobile + customer.mobile;
        //                 street = street + customer.street;
        //                 town = town + customer.town;
        //                 state = state + customer.state;
        //                 postcode = postcode + customer.postcode;
        //                 country = country + customer.country;
        //                 memberId = memberId + customer.membershipNumber;
        //             }
        //             else{
        //                 var fNames = customer.firstName.split('|');
        //                 var lNames = customer.lastName.split('|');
        //                 var emails = customer.email.split('|');
        //                 var mobiles = customer.mobile.split('|');
        //                 var streets = customer.street.split('|');
        //                 var towns = customer.town.split('|');
        //                 var states = customer.state.split('|');
        //                 var postcodes = customer.postcode.split('|');
        //                 var countries = customer.country.split('|');
        //                 var memId = customer.membershipNumber.split('|');

        //                 firstName = firstName + fNames[i];
        //                 lastName = lastName + lNames[i];
        //                 email = email + emails[i];
        //                 mobile = mobile + mobiles[i];
        //                 street = street + streets[i];
        //                 town = town + towns[i];
        //                 state = state + states[i];
        //                 postcode = postcode + postcodes[i];
        //                 country = country + countries[i];
        //                 memberId = memberId + memId[i];
        //             }
        //             if(customer.isVelocity && i==0){
        //                 isVelocity.push(true);
        //                 velocityNumber.push(customer.velocityNumber);
        //             }
        //             else{
        //                 isVelocity.push(false);
        //                 velocityNumber.push('');
        //             }
        //             isMember.push(customer.isMember);
        //             isUpsell.push(customer.isUpsell);
        //         }
        //         else{
        //             if(!customer.firstName.includes('|')){
        //                 firstName = firstName + customer.firstName + "|";
        //                 lastName = lastName + customer.lastName + "|";
        //                 email = email + customer.email + "|";
        //                 mobile = mobile + customer.mobile + "|";
        //                 street = street + customer.street + "|";
        //                 town = town + customer.town + "|";
        //                 state = state + customer.state + "|";
        //                 postcode = postcode + customer.postcode + "|";
        //                 country = country + customer.country + "|";
        //                 memberId = memberId + customer.membershipNumber + "|";
        //             }
        //             else{
        //                 var fNames = customer.firstName.split('|');
        //                 var lNames = customer.lastName.split('|');
        //                 var emails = customer.email.split('|');
        //                 var mobiles = customer.mobile.split('|');
        //                 var streets = customer.street.split('|');
        //                 var towns = customer.town.split('|');
        //                 var states = customer.state.split('|');
        //                 var postcodes = customer.postcode.split('|');
        //                 var countries = customer.country.split('|');
        //                 var memId = customer.membershipNumber.split('|');

        //                 firstName = firstName + fNames[i] + "|";
        //                 lastName = lastName + lNames[i] + "|";
        //                 email = email + emails[i] + "|";
        //                 mobile = mobile + mobiles[i] + "|";
        //                 street = street + streets[i] + "|";
        //                 town = town + towns[i] + "|";
        //                 state = state + states[i] + "|";
        //                 postcode = postcode + postcodes[i] + "|";
        //                 country = country + countries[i] + "|";
        //                 memberId = memberId + memId[i] + "|";
        //             }
        //             if(customer.isVelocity && i==0){
        //                 isVelocity.push(true);
        //                 velocityNumber.push(customer.velocityNumber);
        //             }
        //             else{
        //                 isVelocity.push(false);
        //                 velocityNumber.push('');
        //             }
        //             isMember.push(customer.isMember);
        //             isUpsell.push(customer.isUpsell);
        //         }
        //     }
        //     var memberDetails = [details.BookingCount, memberId, firstName, lastName, email, mobile, street,
        //         town, state, postcode, country, isMember, isUpsell, isVelocity, velocityNumber];
        //     return await this.dataSetup.SetMemberData(memberDetails);
        // }
    }

}