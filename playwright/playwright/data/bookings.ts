export class AccommodationDetails{
    // Set variables.
    public bookingCount: number;
    public accommodationName: any[] = [];
    public roomName: any[] = [];
    public checkInDate: any[] = [];
    public checkOutDate: any[] = [];
    public adult: any[] = [];
    public child: any[] = [];
    public infant: any[] = [];
    public price: any[] = [];
    public night: any[] = [];
    public assignedRoom: any[] = [];
    public totalBalance: any;
    public rewardsTier: any[] = [];
    public originalRate: any[] = [];

    // Getter/Setter data.
    get BookingCount(){
        return this.bookingCount;
    }
    set BookingCount(data){
        this.bookingCount = data;
    }
    get AccommodationName(){
        return this.accommodationName;
    }
    set AccommodationName(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.accommodationName.push(data[i]);
        }
    }
    get RoomName(){
        return this.roomName;
    }
    set RoomName(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.roomName.push(data[i]);
        }
    }
    get CheckInDate(){
        return this.checkInDate;
    }
    set CheckInDate(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.checkInDate.push(data[i]);
        }
    }
    get CheckOutDate(){
        return this.checkOutDate;
    }
    set CheckOutDate(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.checkOutDate.push(data[i]);
        }
    }
    get Adult(){
        return this.adult;
    }
    set Adult(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.adult.push(data[i]);
        }
    }
    get Child(){
        return this.child;
    }
    set Child(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.child.push(data[i]);
        }
    }
    get Infant(){
        return this.infant;
    }
    set Infant(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.infant.push(data[i]);
        }
    }
    get Price(){
        return this.price;
    }
    set Price(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.price.push(data[i]);
        }
    }
    get Night(){
        return this.night;
    }
    set Night(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.night.push(data[i]);
        }
    }
    get AssignedRoom(){
        return this.assignedRoom;
    }
    set AssignedRoom(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.assignedRoom.push(data[i]);
        }
    }
    get TotalBalance(){
        return this.totalBalance;
    }
    set TotalBalance(data: string){
        this.totalBalance = data;
    }
    get RewardsTier(){
        return this.rewardsTier;
    }
    set RewardsTier(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.rewardsTier.push(data[i]);
        }
    }
    get OriginalRate(){
        return this.originalRate;
    }
    set OriginalRate(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.originalRate.push(data[i]);
        }
    }
}

export class CustomerDetails{
    // Set variables.
    public bookingCount: number;
    public searchName: any[] = [];
    public firstName: any[] = [];
    public lastName: any[] = [];
    public email: any[] = [];
    public mobile: any[] = [];
    public street: any[] = [];
    public town: any[] = [];
    public state: any[] = [];
    public postcode: any[] = [];
    public country: any[] = [];
    public isMember: any[] = [];
    public isUpsell: any[] = [];
    public memberId: any[] = [];
    public isVelocity: any[] = [];
    public velocityNumber: any[] = [];
    public emailExist: any[] = [];

    // Getter/Setter data.
    get BookingCount(){
        return this.bookingCount;
    }
    set BookingCount(data){
        this.bookingCount = data;
    }
    get SearchName(){
        return this.searchName;
    }
    set SearchName(data){
        this.searchName = data;
    }
    get FirstName(){
        return this.firstName;
    }
    set FirstName(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.firstName.push(data[i]);
        }
    }
    get MemberID(){
        return this.memberId;
    }
    set MemberID(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.memberId.push(data[i]);
        }
    }
    get LastName(){
        return this.lastName;
    }
    set LastName(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.lastName.push(data[i]);
        }
    }
    get Email(){
        return this.email;
    }
    set Email(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.email.push(data[i]);
        }
    }
    get Mobile(){
        return this.mobile;
    }
    set Mobile(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.mobile.push(data[i]);
        }
    }
    get Street(){
        return this.street;
    }
    set Street(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.street.push(data[i]);
        }
    }
    get Town(){
        return this.town;
    }
    set Town(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.town.push(data[i]);
        }
    }
    get State(){
        return this.state;
    }
    set State(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.state.push(data[i]);
        }
    }
    get Postcode(){
        return this.postcode;
    }
    set Postcode(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.postcode.push(data[i]);
        }
    }
    get Country(){
        return this.country;
    }
    set Country(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.country.push(data[i]);
        }
    }
    get IsMember(){
        return this.isMember;
    }
    set IsMember(data: boolean[]){
        for(var i = 0; i < data.length; i++){
            this.isMember.push(data[i]);
        }
    }
    get IsUpsell(){
        return this.isUpsell;
    }
    set IsUpsell(data: boolean[]){
        for(var i = 0; i < data.length; i++){
            this.isUpsell.push(data[i]);
        }
    }
    get IsVelocity(){
        return this.isVelocity;
    }
    set IsVelocity(data: boolean[]){
        for(var i = 0; i < data.length; i++){
            this.isVelocity.push(data[i]);
        }
    }
    get VelocityNumber(){
        return this.velocityNumber;
    }
    set VelocityNumber(data: string[]){
        for(var i = 0; i < data.length; i++){
            this.velocityNumber.push(data[i]);
        }
    }
    get EmailExist(){
        return this.emailExist;
    }
    set EmailExist(data: boolean[]){
        for(var i = 0; i < data.length; i++){
            this.emailExist.push(data[i]);
        }
    }
}

export class PaymentDetails{
    // Set variables.
    public paymentType = "";
    public totalPayment = "";
    public surcharge = "";
    public totalBalance = "";
    public memberDiscount = "";
    public paymentPercentage = "";

    // Getter/Setter data.
    get PaymentType(){
        return this.paymentType;
    }
    set PaymentType(data: any){
        this.paymentType = data;
    }
    get TotalPayment(){
        return this.totalPayment;
    }
    set TotalPayment(data: any){
        this.totalPayment = data;
    }
    get TotalBalance(){
        return this.totalBalance;
    }
    set TotalBalance(data: any){
        this.totalBalance = data;
    }
    get Surcharge(){
        return this.surcharge;
    }
    set Surcharge(data: any){
        this.surcharge = data;
    }
    get MemberDiscount(){
        return this.memberDiscount;
    }
    set MemberDiscount(data: any){
        this.memberDiscount = data;
    }
    get PaymentPercentage(){
        return this.paymentPercentage;
    }
    set PaymentPercentage(data: any){
        this.paymentPercentage = data;
    }
}

export class OfferDetails{
    // Set variables.
    public offerName: any[] = [];
    public offerRequirement: any[] = [];
    public offerDiscountDay: any[] = [];
    public offerRate: any[] = [];
    public isOfferLess: any[] = [];
    public processOfferType: any[] = [];

    // Getter/Setter data.
    get OfferName(){
        return this.offerName;
    }
    set OfferName(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.offerName.push(data[i]);
        }
    }
    get OfferRequirement(){
        return this.offerRequirement;
    }
    set OfferRequirement(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.offerRequirement.push(data[i]);
        }
    }
    get OfferDiscountDay(){
        return this.offerDiscountDay;
    }
    set OfferDiscountDay(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.offerDiscountDay.push(data[i]);
        }
    }
    get OfferRate(){
        return this.offerRate;
    }
    set OfferRate(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.offerRate.push(data[i]);
        }
    }
    get IsOfferLess(){
        return this.isOfferLess;
    }
    set IsOfferLess(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.isOfferLess.push(data[i]);
        }
    }
    get ProcessOfferType(){
        return this.processOfferType;
    }
    set ProcessOfferType(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.processOfferType.push(data[i]);
        }
    }
}

export class DiscountDetails{
    // Set variable
    public discount: any[] = [];

    // Getter/Setter data.
    get Discount(){
        return this.discount;
    }
    set Discount(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.discount.push(data[i]);
        }
    }
}