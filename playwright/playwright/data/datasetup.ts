import { AccommodationDetails, CustomerDetails, DiscountDetails, OfferDetails, PaymentDetails } from "./bookings";
import { DashboardDetails, StayCostDetails } from "./managebookings";

export class DataSetup{

    // This will save the accommodation data from the bookings page.
    async SetBookingsData(data: any[]){
        var bookings = new AccommodationDetails();
        bookings.BookingCount = data[0];
        bookings.AccommodationName = data[1].split('|');
        bookings.CheckInDate = data[2].split('|');
        bookings.CheckOutDate = data[3].split('|');
        bookings.Adult = data[4].split('|');
        bookings.Child = data[5].split('|');
        bookings.Infant = data[6].split('|');
        bookings.Price = data[7].split('|');
        bookings.Night = data[8].split('|');
        return bookings;
    }

    // This will save the updated accommodation data from the bookings page.
    async SetUpdatedBookingsData(data: any[]){
        var bookings = new AccommodationDetails();
        bookings.BookingCount = data[0];
        bookings.AccommodationName = data[1].split('|');
        bookings.CheckInDate = data[2].split('|');
        bookings.CheckOutDate = data[3].split('|');
        bookings.Adult = data[4].split('|');
        bookings.Child = data[5].split('|');
        bookings.Infant = data[6].split('|');
        bookings.Price = data[7].split('|');
        bookings.Night = data[8].split('|');
        bookings.AssignedRoom = data[9].split('|');
        bookings.TotalBalance = data[10];
        bookings.RewardsTier = data[11].split('|');
        return bookings;
    }

    // This will set the guest details
    async SetCustomerData(data: any[]){
        var customer = new CustomerDetails();
        customer.BookingCount = data[0];
        customer.SearchName = data[1].split('|');
        customer.FirstName = data[2].split('|');
        customer.LastName = data[3].split('|');
        customer.Email = data[4].split('|');
        customer.Mobile = data[5].split('|');
        customer.Street = data[6].split('|');
        customer.Town = data[7].split('|');
        customer.State = data[8].split('|');
        customer.Postcode = data[9].split('|');
        customer.Country = data[10].split('|');
        customer.IsMember = data[11];
        customer.IsUpsell = data[12];
        customer.IsVelocity = data[13];
        customer.VelocityNumber = data[14];
        customer.EmailExist = data[15];
        return customer;
    }

    // This will set the guest details
    async SetNewCustomerData(data: any[]){
        var customer = new CustomerDetails();
        customer.BookingCount = data[0];
        customer.SearchName = data[1].split('|');
        customer.FirstName = data[2].split('|');
        customer.LastName = data[3].split('|');
        customer.Email = data[4].split('|');
        customer.Mobile = data[5].split('|');
        customer.Street = data[6].split('|');
        customer.Town = data[7].split('|');
        customer.State = data[8].split('|');
        customer.Postcode = data[9].split('|');
        customer.Country = data[10].split('|');
        customer.IsMember = data[11];
        customer.IsUpsell = data[12];
        return customer;
    }

    // This will set the guest details
    async SetMemberData(data: any[]){
        var customer = new CustomerDetails();
        customer.BookingCount = data[0];
        customer.MemberID = data[1].split('|');
        customer.FirstName = data[2].split('|');
        customer.LastName = data[3].split('|');
        customer.Email = data[4].split('|');
        customer.Mobile = data[5].split('|');
        customer.Street = data[6].split('|');
        customer.Town = data[7].split('|');
        customer.State = data[8].split('|');
        customer.Postcode = data[9].split('|');
        customer.Country = data[10].split('|');
        customer.IsMember = data[11];
        customer.IsUpsell = data[12];
        customer.IsVelocity = data[13];
        customer.VelocityNumber = data[14];
        return customer;
    }

    // This will set the payment details.
    async SetPaymentDetails(data: any[]){
        var pay = new PaymentDetails();
        pay.PaymentType = data[0];
        pay.TotalPayment = data[1];
        pay.Surcharge = data[2];
        pay.TotalBalance = data[3];
        pay.MemberDiscount = data[4];
        pay.PaymentPercentage = data[5];
        return pay;
    }

    // This will set the offer detais.
    async SetOfferDetails(data: any[]){
        var offer = new OfferDetails();
        offer.OfferName = data[0];
        offer.OfferRequirement = data[1];
        offer.OfferDiscountDay = data[2];
        offer.OfferRate = data[3];
        offer.IsOfferLess = data[4];
        offer.ProcessOfferType = data[5];
        return offer;
    }

    // This will save the updated accommodation data after offers were accepted.
    async SetBookingsDataAfterOffersWereMade(data: any[]){
        var bookings = new AccommodationDetails();
        bookings.BookingCount = data[0];
        bookings.AccommodationName = data[1];
        bookings.CheckInDate = data[2];
        bookings.CheckOutDate = data[3];
        bookings.Adult = data[4];
        bookings.Child = data[5];
        bookings.Infant = data[6];
        bookings.Price = data[7];
        bookings.Night = data[8];
        bookings.AssignedRoom = data[9];
        bookings.TotalBalance = data[10];
        bookings.RewardsTier = data[11];
        bookings.OriginalRate = data[12];
        return bookings;
    }

    // This will set the discount detais.
    async SetDiscountDetails(data: any[]){
        var discount = new DiscountDetails();
        discount.Discount = data[0];
        return discount;
    }

    // This will set the guest details
    async SetSpecificCustomerDetailsForGroupBooking(data: any[]){
        var customer = new CustomerDetails();
        customer.BookingCount = data[0];
        customer.SearchName = data[1];
        customer.FirstName = data[2];
        customer.LastName = data[3];
        customer.Email = data[4];
        customer.Mobile = data[5];
        customer.Street = data[6];
        customer.Town = data[7];
        customer.State = data[8];
        customer.Postcode = data[9];
        customer.Country = data[10];
        customer.IsMember = data[11];
        customer.MemberID = data[12];
        customer.IsUpsell = data[13];
        customer.IsVelocity = data[14];
        customer.VelocityNumber = data[15];
        return customer;
    }

    // This will set the reservation details from the dashboard.
    async SetReservationDetailsFromDashboard(data: any[]){
        var res = new DashboardDetails();
        res.CustomerFirstName = data[0];
        res.CustomerLastName = data[1];
        res.ReservationNumber = data[2];
        res.DepositAmount = data[3];
        res.TotalStayCost = data[4];
        res.TotalBalance = data[5];
        res.RewardsTier = data[6];
        res.Adult = data[7];
        res.Child = data[8];
        res.Infant = data[9];
        res.AccommodationName = data[10];
        res.AssignedRoom = data[11];
        res.ETA = data[12];
        res.CheckInDate = data[13];
        res.CheckOutDate = data[14];
        res.Night = data[15];
        res.RoomStatus = data[16];
        res.ReservationConfirmation = data[17];
        res.DateCountFromToday = data[18];
        res.PaymentType = data[19];
        return res;
    }

    // This will set the stay cost details
    async SetStayCostDetails(data: any[]=[]){
        var stay = new StayCostDetails();
        stay.TotalStayCost = data[0];
        stay.GDayMembership = data[1];
        stay.Discounts = data[2];
        stay.TotalPaid = data[3];
        stay.CancellationFee = data[4];
        stay.CardSurcharge = data[5];
        stay.ParkRefundAmount = data[6];
        stay.RefundRequestAmount = data[7];
        stay.AmountDue = data[8];
        stay.RefundRequestDetails = data[9];
        stay.ParkRefundDetails = data[10];
        return stay;
    }
}