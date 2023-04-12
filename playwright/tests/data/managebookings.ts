export class DashboardDetails{
    // Set variables.
    public customerFirstName: any[] = [];
    public customerLastName: any[] = [];
    public reservationNumber: any[] = [];
    public depositAmount: any[] = [];
    public totalStayCost: any[] = [];
    public totalBalance: any[] = [];
    public rewardsTier: any[] = [];
    public adult: any[] = [];
    public child: any[] = [];
    public infant: any[] = [];
    public accommodationName: any[] = [];
    public assignedRoom: any[] = [];
    public eta: any[] = [];
    public night: any[] = [];
    public checkInDate: any[] = [];
    public checkOutDate: any[] = [];
    public roomStatus: any[] = [];
    public resConfirmation: any[] = [];
    public dateCountFromToday: any[] = [];
    public paymentType:any[] = [];

    // Getter/Setter data.
    get CustomerFirstName(){
        return this.customerFirstName;
    }
    set CustomerFirstName(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.customerFirstName.push(data[i]);
        }
    }
    get CustomerLastName(){
        return this.customerLastName;
    }
    set CustomerLastName(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.customerLastName.push(data[i]);
        }
    }
    get ReservationNumber(){
        return this.reservationNumber;
    }
    set ReservationNumber(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.reservationNumber.push(data[i]);
        }
    }
    get DepositAmount(){
        return this.depositAmount;
    }
    set DepositAmount(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.depositAmount.push(data[i]);
        }
    }
    get TotalStayCost(){
        return this.totalStayCost;
    }
    set TotalStayCost(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.totalStayCost.push(data[i]);
        }
    }
    get TotalBalance(){
        return this.totalBalance;
    }
    set TotalBalance(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.totalBalance.push(data[i]);
        }
    }
    get RewardsTier(){
        return this.rewardsTier;
    }
    set RewardsTier(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.rewardsTier.push(data[i]);
        }
    }
    get Adult(){
        return this.adult;
    }
    set Adult(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.adult.push(data[i]);
        }
    }
    get Child(){
        return this.child;
    }
    set Child(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.child.push(data[i]);
        }
    }
    get Infant(){
        return this.infant;
    }
    set Infant(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.infant.push(data[i]);
        }
    }
    get AccommodationName(){
        return this.accommodationName;
    }
    set AccommodationName(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.accommodationName.push(data[i]);
        }
    }
    get AssignedRoom(){
        return this.assignedRoom;
    }
    set AssignedRoom(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.assignedRoom.push(data[i]);
        }
    }
    get ETA(){
        return this.eta;
    }
    set ETA(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.eta.push(data[i]);
        }
    }
    get CheckInDate(){
        return this.checkInDate;
    }
    set CheckInDate(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.checkInDate.push(data[i]);
        }
    }
    get CheckOutDate(){
        return this.checkOutDate;
    }
    set CheckOutDate(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.checkOutDate.push(data[i]);
        }
    }
    get Night(){
        return this.night;
    }
    set Night(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.night.push(data[i]);
        }
    }
    get RoomStatus(){
        return this.roomStatus;
    }
    set RoomStatus(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.roomStatus.push(data[i]);
        }
    }
    get ReservationConfirmation(){
        return this.resConfirmation;
    }
    set ReservationConfirmation(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.resConfirmation.push(data[i]);
        }
    }
    get DateCountFromToday(){
        return this.dateCountFromToday;
    }
    set DateCountFromToday(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.dateCountFromToday.push(data[i]);
        }
    }
    get PaymentType(){
        return this.paymentType;
    }
    set PaymentType(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.paymentType.push(data[i]);
        }
    }
}

export class StayCostDetails{
    // Set Variables
    public totalStayCost: any [] = [];
    public gdayMemberShip: any [] = [];
    public discounts: any [] = [];
    public totalPaid: any [] = [];
    public cancellationFee: any [] = [];
    public cardSurcharge: any [] = [];
    public parkRefundAmount: any [] = [];
    public refundRequestAmount: any [] = [];
    public amountDue: any [] = [];
    public refundRequestDetails: any [] = [];
    public parkRefundDetails: any [] = [];

    // Getter/Setter Data
    get TotalStayCost(){
        return this.totalStayCost;
    }
    set TotalStayCost(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.totalStayCost.push(data[i]);
        }
    }
    get GDayMembership(){
        return this.gdayMemberShip;
    }
    set GDayMembership(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.gdayMemberShip.push(data[i]);
        }
    }
    get Discounts(){
        return this.discounts;
    }
    set Discounts(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.discounts.push(data[i]);
        }
    }
    get TotalPaid(){
        return this.totalPaid;
    }
    set TotalPaid(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.totalPaid.push(data[i]);
        }
    }
    get CancellationFee(){
        return this.cancellationFee;
    }
    set CancellationFee(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.cancellationFee.push(data[i]);
        }
    }
    get CardSurcharge(){
        return this.cardSurcharge;
    }
    set CardSurcharge(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.cardSurcharge.push(data[i]);
        }
    }
    get ParkRefundAmount(){
        return this.parkRefundAmount;
    }
    set ParkRefundAmount(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.parkRefundAmount.push(data[i]);
        }
    }
    get RefundRequestAmount(){
        return this.refundRequestAmount;
    }
    set RefundRequestAmount(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.refundRequestAmount.push(data[i]);
        }
    }
    get AmountDue(){
        return this.amountDue;
    }
    set AmountDue(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.amountDue.push(data[i]);
        }
    }
    get RefundRequestDetails(){
        return this.refundRequestDetails;
    }
    set RefundRequestDetails(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.refundRequestDetails.push(data[i]);
        }
    }
    get ParkRefundDetails(){
        return this.parkRefundDetails;
    }
    set ParkRefundDetails(data: any[]){
        for(var i = 0; i < data.length; i++){
            this.parkRefundDetails.push(data[i]);
        }
    }
}