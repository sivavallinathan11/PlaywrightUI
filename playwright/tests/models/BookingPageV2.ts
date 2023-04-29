import { Page, expect, ElementHandle } from "@playwright/test";
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
    public reservationNumber: any[] = [];


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

    async confirmBooking() {
        //save the reservations in case we need them
        this.GetHiddenReservationNumber();
        await this.page.getByRole('button', {name: 'Confirm Booking'}).click();
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


    //This will get the hidden reservation number.
    private async GetHiddenReservationNumber(){
        // Get the reservation based on the number of boookings.
        var locator = "//*[@class='nr-booking-entry']//*[@id='reservation-id']";
        // var reservationNumber: any[] = []
        var reservationElement = await this.page.$$(locator);

        for(var i = 0; i < reservationElement.length; i++){
            var resElement:ElementHandle = reservationElement[i];
            var attribute = await resElement.getAttribute("value");
            this.reservationNumber.push(attribute);
        }
    }

    

}