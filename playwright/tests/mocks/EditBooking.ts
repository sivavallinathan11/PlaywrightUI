export const editbooking = {
    mocked: `
    <h1>Mocked Out</h1>
        <form action="/Booking/Mocked">
        <label for="fname">First name:</label><br>
        <input type="text" id="fname" name="fname" value="John"><br>
        <label for="lname">Last name:</label><br>
        <input type="text" id="lname" name="lname" value="Doe"><br><br>
        <input type="submit" value="Submit" class="mockedsubmit">
    </form> 
    `,
    body: `
    <form action="/Booking/UpdateBooking" id="update-booking-form" method="post"><input data-val="true" data-val-date="The field CheckInDate must be a date." data-val-required="The CheckInDate field is required." hidden="true" id="CheckInDate" name="CheckInDate" type="text" value="2023-07-15" /><input data-val="true" data-val-date="The field CheckOutDate must be a date." data-val-required="The CheckOutDate field is required." hidden="true" id="CheckOutDate" name="CheckOutDate" type="text" value="2023-07-16" /><input id="selected-accommodation-name" name="SelectedAccommodation.Name" type="hidden" value="Unpowered Site" /><input id="selected-accommodation-images" name="SelectedAccommodation.Images" type="hidden" value="/Content/Images/cabin1.png" /><input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="selected-accommodation-price" name="SelectedAccommodation.Price" type="hidden" value="32.7" /><input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="selected-accommodation-member-price" name="SelectedAccommodation.MemberPrice" type="hidden" value="29.4" /><input id="room-type-id" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-12-RT" /><input data-val="true" data-val-number="The field AdultCount must be a number." data-val-required="The AdultCount field is required." id="AdultCount" name="AdultCount" type="hidden" value="2" /><input data-val="true" data-val-number="The field ChildCount must be a number." data-val-required="The ChildCount field is required." id="ChildCount" name="ChildCount" type="hidden" value="1" /><input data-val="true" data-val-number="The field InfantCount must be a number." data-val-required="The InfantCount field is required." id="InfantCount" name="InfantCount" type="hidden" value="1" /><input data-val="true" data-val-number="The field ReservationId must be a number." data-val-required="The ReservationId field is required." id="reservation-id" name="ReservationId" type="hidden" value="353108" /><input id="BookingCountText" name="BookingCountText" type="hidden" value="Booking 1" /><input data-val="true" data-val-number="The field SelectedAccommodationId must be a number." data-val-required="The SelectedAccommodationId field is required." id="selected-accommodation-id" name="SelectedAccommodationId" type="hidden" value="2" /><input id="SelectedAccommodation_Availability" name="SelectedAccommodation.Availability" type="hidden" value="2023-07-15T00:00:00+00:00@21" /><input id="SelectedAccommodation_ChargeTypeId" name="SelectedAccommodation.ChargeTypeId" type="hidden" value="42" /><input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="SelectedAccommodation_AdditionalAdultAmount" name="SelectedAccommodation.AdditionalAdultAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="SelectedAccommodation_AdditionalChildAmount" name="SelectedAccommodation.AdditionalChildAmount" type="hidden" value="11.25" /><input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="SelectedAccommodation_AdditionalInfantAmount" name="SelectedAccommodation.AdditionalInfantAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="SelectedAccommodation_BaseRate" name="SelectedAccommodation.BaseRate" type="hidden" value="21.43" /><input id="velocity-rewards-guid" name="VelocityRewardsGuid" type="hidden" value="" /><input data-val="true" data-val-number="The field DiscountId must be a number." data-val-required="The DiscountId field is required." id="SelectedAccommodation_DiscountId" name="SelectedAccommodation.DiscountId" type="hidden" value="0" /><input id="SelectedAccommodation_DiscountName" name="SelectedAccommodation.DiscountName" type="hidden" value="" /><input data-val="true" data-val-number="The field DiscountPrice must be a number." data-val-required="The DiscountPrice field is required." id="SelectedAccommodation_DiscountPrice" name="SelectedAccommodation.DiscountPrice" type="hidden" value="0" /><input id="SelectedAccommodation_DiscountStaffName" name="SelectedAccommodation.DiscountStaffName" type="hidden" value="" /><input id="SelectedAccommodation_DiscountReason" name="SelectedAccommodation.DiscountReason" type="hidden" value="" /><input data-val="true" data-val-number="The field SelectedDealId must be a number." data-val-required="The SelectedDealId field is required." id="SelectedDealId" name="SelectedDealId" type="hidden" value="0" /><input id="SelectedDealPrice" name="SelectedDealPrice" type="hidden" value="" />    <div class="modal-header">
        <div class="row">
            <div class="col-md-6">
                <span class="modal-title">Edit Booking</span>
            </div>
            <div class="col-md-6">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="opacity: 1;">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    </div>
    <div class="modal-body">
        <div id="edit-booking-container">
            <div class="row edit-booking-header">
                <div class="col-md-3 booking-name">
                    <span>Booking 1</span>
                </div>
                <div class="col-md-6 booking-detail">
                    <div class="row">
                        <div class="col-md-5 u-ph-0">
                            <p class="title">Booking Duration</p>
                            <p>
                                <span><img src="/Content/Images/icon-calendar.svg" /></span>
                                <span>15 Jul 23 - 16 Jul 23</span>
                            </p>
                        </div>
                        <div class="col-md-7 u-ph-0">
                            <p class="title">Booking Guests</p>
                            <p>
                                <span><img src="/Content/Images/icon-users.svg" /></span>
                                <span>2 Adults, 1 Child, 1 Infant</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 booking-delete">
                    <button id="delete-booking">Delete booking</button>
                </div>
            </div>

            <div class="row edit-booking-body">
                <div class="container-fluid">
                    <div class="col-md-12 u-ph-0">
                        <div class="nr-header">
                            <div class="nr-icon">
                                <img src="/Content/Images/icon-briefcase.svg">
                            </div>

                            <div class="nr-title">
                                <h2>Accommodation</h2>
                                <p class="u-pt-0">Edit this bookings room and arrival preferences</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container-fluid edit-booking-dropdown">
                    <div class="col-md-6 u-ph-0 edit-booking-cabin">
                        <dl class="ac" style="margin-top: 5px; margin-bottom: 0;">
                            <dt>
                                <span class="icon">
                                    <i class="fas fa-chevron-down"></i>
                                </span>

                                <a id="select-accommodation-dropdown" href="#">
                                    <span>
                                        <div class="col-md-2 u-ph-0">
                                            <img class="flag" src="/Content/Images/cabin1.png" />
                                        </div>
                                        <div class="col-md-8 u-ph-0">
                                            <p class="cabin-type">Unpowered Site</p>
                                                <p class="available-accommodation-member-pricelist d-none" data-id="Great Mate" data-price="29.45">$29.45 total</p>
                                                <p class="available-accommodation-member-pricelist d-none" data-id="Best Mate" data-price="29.45">$29.45 total</p>
                                                <p class="available-accommodation-member-pricelist d-none" data-id="Mate" data-price="29.45">$29.45 total</p>
                                                <p class="available-accommodation-member-pricelist d-none" data-id="None" data-price="32.7">$32.70 total</p>
                                            <p class="available-accommodation-price">$32.70 total</p>
                                        </div>
                                    </span>
                                </a>
                            </dt>
                            <dd>
                                <ul style="height:400px; width:430px; overflow-y:auto">
                                        <li>
                                            <input id="AvailableAccommodation_0__RoomTypeId" name="AvailableAccommodation[0].RoomTypeId" type="hidden" value="TEST-1-41-RT" />
                                            <input id="AvailableAccommodation_0__Images" name="AvailableAccommodation[0].Images" type="hidden" value="https://stratweb-gdaygroup.imgix.net/getmedia/90a97eb5-26ea-494b-929a-24b615598e24/17769_007_open2view_id552624-cool_waters_discovery_park.jpg?width=1280&amp;height=853&amp;ext=.jpg" />
                                            <input id="AvailableAccommodation_0__Name" name="AvailableAccommodation[0].Name" type="hidden" value="Powered Site" />
                                            <input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="AvailableAccommodation_0__Price" name="AvailableAccommodation[0].Price" type="hidden" value="32.7" />
                                            <input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="AvailableAccommodation_0__BaseRate" name="AvailableAccommodation[0].BaseRate" type="hidden" value="21.43" />
                                            <input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="AvailableAccommodation_0__AdditionalAdultAmount" name="AvailableAccommodation[0].AdditionalAdultAmount" type="hidden" value="0" />
                                            <input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="AvailableAccommodation_0__AdditionalChildAmount" name="AvailableAccommodation[0].AdditionalChildAmount" type="hidden" value="11.25" />
                                            <input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="AvailableAccommodation_0__AdditionalInfantAmount" name="AvailableAccommodation[0].AdditionalInfantAmount" type="hidden" value="0" />
                                            <input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="AvailableAccommodation_0__MemberPrice" name="AvailableAccommodation[0].MemberPrice" type="hidden" value="29.4" />
                                            <input id="AvailableAccommodation_0__Availability" name="AvailableAccommodation[0].Availability" type="hidden" value="2023-07-15T00:00:00+00:00@21" />
                                            <input id="AvailableAccommodation_0__ChargeTypeId" name="AvailableAccommodation[0].ChargeTypeId" type="hidden" value="42" />
                                            <input class="is-selected" data-val="true" data-val-required="The IsSelected field is required." id="AvailableAccommodation_0__IsSelected" name="AvailableAccommodation[0].IsSelected" type="hidden" value="False" />

                                            <a href="#">
                                                <div class="col-md-2 u-ph-0">
                                                    <img class="flag" src="https://stratweb-gdaygroup.imgix.net/getmedia/90a97eb5-26ea-494b-929a-24b615598e24/17769_007_open2view_id552624-cool_waters_discovery_park.jpg?width=1280&amp;height=853&amp;ext=.jpg" />
                                                </div>
                                                <div class="col-md-8 u-ph-0">
                                                    <p class="cabin-type">Powered Site</p>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Great Mate" data-price="29.45">$29.45 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Best Mate" data-price="29.45">$29.45 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Mate" data-price="29.45">$29.45 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="None" data-price="32.7">$32.70 total</span>
                                                    <p class="available-accommodation-price">$32.70 total</p>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <input id="AvailableAccommodation_1__RoomTypeId" name="AvailableAccommodation[1].RoomTypeId" type="hidden" value="TEST-1-9-RT" />
                                            <input id="AvailableAccommodation_1__Images" name="AvailableAccommodation[1].Images" type="hidden" value="https://stratweb-gdaygroup.imgix.net/getmedia/bf784764-3597-4406-afeb-6131e2df3482/5954b408c66525ad932faa693a647e3f.jpg?width=2500&amp;height=1250&amp;ext=.jpg" />
                                            <input id="AvailableAccommodation_1__Name" name="AvailableAccommodation[1].Name" type="hidden" value="Powered Ensuite Site" />
                                            <input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="AvailableAccommodation_1__Price" name="AvailableAccommodation[1].Price" type="hidden" value="32.7" />
                                            <input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="AvailableAccommodation_1__BaseRate" name="AvailableAccommodation[1].BaseRate" type="hidden" value="21.43" />
                                            <input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="AvailableAccommodation_1__AdditionalAdultAmount" name="AvailableAccommodation[1].AdditionalAdultAmount" type="hidden" value="0" />
                                            <input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="AvailableAccommodation_1__AdditionalChildAmount" name="AvailableAccommodation[1].AdditionalChildAmount" type="hidden" value="11.25" />
                                            <input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="AvailableAccommodation_1__AdditionalInfantAmount" name="AvailableAccommodation[1].AdditionalInfantAmount" type="hidden" value="0" />
                                            <input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="AvailableAccommodation_1__MemberPrice" name="AvailableAccommodation[1].MemberPrice" type="hidden" value="29.4" />
                                            <input id="AvailableAccommodation_1__Availability" name="AvailableAccommodation[1].Availability" type="hidden" value="2023-07-15T00:00:00+00:00@21" />
                                            <input id="AvailableAccommodation_1__ChargeTypeId" name="AvailableAccommodation[1].ChargeTypeId" type="hidden" value="42" />
                                            <input class="is-selected" data-val="true" data-val-required="The IsSelected field is required." id="AvailableAccommodation_1__IsSelected" name="AvailableAccommodation[1].IsSelected" type="hidden" value="False" />

                                            <a href="#">
                                                <div class="col-md-2 u-ph-0">
                                                    <img class="flag" src="https://stratweb-gdaygroup.imgix.net/getmedia/bf784764-3597-4406-afeb-6131e2df3482/5954b408c66525ad932faa693a647e3f.jpg?width=2500&amp;height=1250&amp;ext=.jpg" />
                                                </div>
                                                <div class="col-md-8 u-ph-0">
                                                    <p class="cabin-type">Powered Ensuite Site</p>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Great Mate" data-price="29.45">$29.45 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Best Mate" data-price="29.45">$29.45 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Mate" data-price="29.45">$29.45 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="None" data-price="32.7">$32.70 total</span>
                                                    <p class="available-accommodation-price">$32.70 total</p>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <input id="AvailableAccommodation_2__RoomTypeId" name="AvailableAccommodation[2].RoomTypeId" type="hidden" value="TEST-1-38-RT" />
                                            <input id="AvailableAccommodation_2__Images" name="AvailableAccommodation[2].Images" type="hidden" value="https://stratweb-gdaygroup.imgix.net/getmedia/940778fe-3d70-48c2-98ea-70589a0b3f61/test-1.jpg?width=2000&amp;height=1335&amp;ext=.jpg" />
                                            <input id="AvailableAccommodation_2__Name" name="AvailableAccommodation[2].Name" type="hidden" value="Superior Two Bedroom Cabin" />
                                            <input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="AvailableAccommodation_2__Price" name="AvailableAccommodation[2].Price" type="hidden" value="135" />
                                            <input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="AvailableAccommodation_2__BaseRate" name="AvailableAccommodation[2].BaseRate" type="hidden" value="120" />
                                            <input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="AvailableAccommodation_2__AdditionalAdultAmount" name="AvailableAccommodation[2].AdditionalAdultAmount" type="hidden" value="0" />
                                            <input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="AvailableAccommodation_2__AdditionalChildAmount" name="AvailableAccommodation[2].AdditionalChildAmount" type="hidden" value="15" />
                                            <input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="AvailableAccommodation_2__AdditionalInfantAmount" name="AvailableAccommodation[2].AdditionalInfantAmount" type="hidden" value="0" />
                                            <input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="AvailableAccommodation_2__MemberPrice" name="AvailableAccommodation[2].MemberPrice" type="hidden" value="121.5" />
                                            <input id="AvailableAccommodation_2__Availability" name="AvailableAccommodation[2].Availability" type="hidden" value="2023-07-15T00:00:00+00:00@120" />
                                            <input id="AvailableAccommodation_2__ChargeTypeId" name="AvailableAccommodation[2].ChargeTypeId" type="hidden" value="42" />
                                            <input class="is-selected" data-val="true" data-val-required="The IsSelected field is required." id="AvailableAccommodation_2__IsSelected" name="AvailableAccommodation[2].IsSelected" type="hidden" value="False" />

                                            <a href="#">
                                                <div class="col-md-2 u-ph-0">
                                                    <img class="flag" src="https://stratweb-gdaygroup.imgix.net/getmedia/940778fe-3d70-48c2-98ea-70589a0b3f61/test-1.jpg?width=2000&amp;height=1335&amp;ext=.jpg" />
                                                </div>
                                                <div class="col-md-8 u-ph-0">
                                                    <p class="cabin-type">Superior Two Bedroom Cabin</p>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Great Mate" data-price="121.5">$121.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Best Mate" data-price="121.5">$121.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Mate" data-price="121.5">$121.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="None" data-price="135">$135.00 total</span>
                                                    <p class="available-accommodation-price">$135.00 total</p>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <input id="AvailableAccommodation_3__RoomTypeId" name="AvailableAccommodation[3].RoomTypeId" type="hidden" value="TEST-1-43-RT" />
                                            <input id="AvailableAccommodation_3__Images" name="AvailableAccommodation[3].Images" type="hidden" value="/Content/Images/cabin1.png" />
                                            <input id="AvailableAccommodation_3__Name" name="AvailableAccommodation[3].Name" type="hidden" value="Superior One Bedroom Cabin Sleeps 3" />
                                            <input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="AvailableAccommodation_3__Price" name="AvailableAccommodation[3].Price" type="hidden" value="135" />
                                            <input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="AvailableAccommodation_3__BaseRate" name="AvailableAccommodation[3].BaseRate" type="hidden" value="120" />
                                            <input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="AvailableAccommodation_3__AdditionalAdultAmount" name="AvailableAccommodation[3].AdditionalAdultAmount" type="hidden" value="0" />
                                            <input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="AvailableAccommodation_3__AdditionalChildAmount" name="AvailableAccommodation[3].AdditionalChildAmount" type="hidden" value="15" />
                                            <input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="AvailableAccommodation_3__AdditionalInfantAmount" name="AvailableAccommodation[3].AdditionalInfantAmount" type="hidden" value="0" />
                                            <input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="AvailableAccommodation_3__MemberPrice" name="AvailableAccommodation[3].MemberPrice" type="hidden" value="121.5" />
                                            <input id="AvailableAccommodation_3__Availability" name="AvailableAccommodation[3].Availability" type="hidden" value="2023-07-15T00:00:00+00:00@120" />
                                            <input id="AvailableAccommodation_3__ChargeTypeId" name="AvailableAccommodation[3].ChargeTypeId" type="hidden" value="42" />
                                            <input class="is-selected" data-val="true" data-val-required="The IsSelected field is required." id="AvailableAccommodation_3__IsSelected" name="AvailableAccommodation[3].IsSelected" type="hidden" value="False" />

                                            <a href="#">
                                                <div class="col-md-2 u-ph-0">
                                                    <img class="flag" src="/Content/Images/cabin1.png" />
                                                </div>
                                                <div class="col-md-8 u-ph-0">
                                                    <p class="cabin-type">Superior One Bedroom Cabin Sleeps 3</p>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Great Mate" data-price="121.5">$121.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Best Mate" data-price="121.5">$121.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Mate" data-price="121.5">$121.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="None" data-price="135">$135.00 total</span>
                                                    <p class="available-accommodation-price">$135.00 total</p>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <input id="AvailableAccommodation_4__RoomTypeId" name="AvailableAccommodation[4].RoomTypeId" type="hidden" value="TEST-1-8-RT" />
                                            <input id="AvailableAccommodation_4__Images" name="AvailableAccommodation[4].Images" type="hidden" value="/Content/Images/cabin1.png" />
                                            <input id="AvailableAccommodation_4__Name" name="AvailableAccommodation[4].Name" type="hidden" value="Superior One Bedroom Cabin Sleeps 5" />
                                            <input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="AvailableAccommodation_4__Price" name="AvailableAccommodation[4].Price" type="hidden" value="135" />
                                            <input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="AvailableAccommodation_4__BaseRate" name="AvailableAccommodation[4].BaseRate" type="hidden" value="120" />
                                            <input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="AvailableAccommodation_4__AdditionalAdultAmount" name="AvailableAccommodation[4].AdditionalAdultAmount" type="hidden" value="0" />
                                            <input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="AvailableAccommodation_4__AdditionalChildAmount" name="AvailableAccommodation[4].AdditionalChildAmount" type="hidden" value="15" />
                                            <input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="AvailableAccommodation_4__AdditionalInfantAmount" name="AvailableAccommodation[4].AdditionalInfantAmount" type="hidden" value="0" />
                                            <input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="AvailableAccommodation_4__MemberPrice" name="AvailableAccommodation[4].MemberPrice" type="hidden" value="121.5" />
                                            <input id="AvailableAccommodation_4__Availability" name="AvailableAccommodation[4].Availability" type="hidden" value="2023-07-15T00:00:00+00:00@120" />
                                            <input id="AvailableAccommodation_4__ChargeTypeId" name="AvailableAccommodation[4].ChargeTypeId" type="hidden" value="42" />
                                            <input class="is-selected" data-val="true" data-val-required="The IsSelected field is required." id="AvailableAccommodation_4__IsSelected" name="AvailableAccommodation[4].IsSelected" type="hidden" value="False" />

                                            <a href="#">
                                                <div class="col-md-2 u-ph-0">
                                                    <img class="flag" src="/Content/Images/cabin1.png" />
                                                </div>
                                                <div class="col-md-8 u-ph-0">
                                                    <p class="cabin-type">Superior One Bedroom Cabin Sleeps 5</p>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Great Mate" data-price="121.5">$121.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Best Mate" data-price="121.5">$121.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Mate" data-price="121.5">$121.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="None" data-price="135">$135.00 total</span>
                                                    <p class="available-accommodation-price">$135.00 total</p>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <input id="AvailableAccommodation_5__RoomTypeId" name="AvailableAccommodation[5].RoomTypeId" type="hidden" value="TEST-1-7-RT" />
                                            <input id="AvailableAccommodation_5__Images" name="AvailableAccommodation[5].Images" type="hidden" value="/Content/Images/cabin1.png" />
                                            <input id="AvailableAccommodation_5__Name" name="AvailableAccommodation[5].Name" type="hidden" value="Standard Studio Cabin" />
                                            <input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="AvailableAccommodation_5__Price" name="AvailableAccommodation[5].Price" type="hidden" value="150" />
                                            <input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="AvailableAccommodation_5__BaseRate" name="AvailableAccommodation[5].BaseRate" type="hidden" value="135" />
                                            <input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="AvailableAccommodation_5__AdditionalAdultAmount" name="AvailableAccommodation[5].AdditionalAdultAmount" type="hidden" value="0" />
                                            <input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="AvailableAccommodation_5__AdditionalChildAmount" name="AvailableAccommodation[5].AdditionalChildAmount" type="hidden" value="15" />
                                            <input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="AvailableAccommodation_5__AdditionalInfantAmount" name="AvailableAccommodation[5].AdditionalInfantAmount" type="hidden" value="0" />
                                            <input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="AvailableAccommodation_5__MemberPrice" name="AvailableAccommodation[5].MemberPrice" type="hidden" value="135" />
                                            <input id="AvailableAccommodation_5__Availability" name="AvailableAccommodation[5].Availability" type="hidden" value="2023-07-15T00:00:00+00:00@135" />
                                            <input id="AvailableAccommodation_5__ChargeTypeId" name="AvailableAccommodation[5].ChargeTypeId" type="hidden" value="42" />
                                            <input class="is-selected" data-val="true" data-val-required="The IsSelected field is required." id="AvailableAccommodation_5__IsSelected" name="AvailableAccommodation[5].IsSelected" type="hidden" value="False" />

                                            <a href="#">
                                                <div class="col-md-2 u-ph-0">
                                                    <img class="flag" src="/Content/Images/cabin1.png" />
                                                </div>
                                                <div class="col-md-8 u-ph-0">
                                                    <p class="cabin-type">Standard Studio Cabin</p>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Great Mate" data-price="135">$135.00 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Best Mate" data-price="135">$135.00 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Mate" data-price="135">$135.00 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="None" data-price="150">$150.00 total</span>
                                                    <p class="available-accommodation-price">$150.00 total</p>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <input id="AvailableAccommodation_6__RoomTypeId" name="AvailableAccommodation[6].RoomTypeId" type="hidden" value="TEST-1-5-RT" />
                                            <input id="AvailableAccommodation_6__Images" name="AvailableAccommodation[6].Images" type="hidden" value="/Content/Images/cabin1.png" />
                                            <input id="AvailableAccommodation_6__Name" name="AvailableAccommodation[6].Name" type="hidden" value="Standard One Bedroom Cabin" />
                                            <input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="AvailableAccommodation_6__Price" name="AvailableAccommodation[6].Price" type="hidden" value="155" />
                                            <input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="AvailableAccommodation_6__BaseRate" name="AvailableAccommodation[6].BaseRate" type="hidden" value="140" />
                                            <input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="AvailableAccommodation_6__AdditionalAdultAmount" name="AvailableAccommodation[6].AdditionalAdultAmount" type="hidden" value="0" />
                                            <input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="AvailableAccommodation_6__AdditionalChildAmount" name="AvailableAccommodation[6].AdditionalChildAmount" type="hidden" value="15" />
                                            <input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="AvailableAccommodation_6__AdditionalInfantAmount" name="AvailableAccommodation[6].AdditionalInfantAmount" type="hidden" value="0" />
                                            <input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="AvailableAccommodation_6__MemberPrice" name="AvailableAccommodation[6].MemberPrice" type="hidden" value="139.5" />
                                            <input id="AvailableAccommodation_6__Availability" name="AvailableAccommodation[6].Availability" type="hidden" value="2023-07-15T00:00:00+00:00@140" />
                                            <input id="AvailableAccommodation_6__ChargeTypeId" name="AvailableAccommodation[6].ChargeTypeId" type="hidden" value="42" />
                                            <input class="is-selected" data-val="true" data-val-required="The IsSelected field is required." id="AvailableAccommodation_6__IsSelected" name="AvailableAccommodation[6].IsSelected" type="hidden" value="False" />

                                            <a href="#">
                                                <div class="col-md-2 u-ph-0">
                                                    <img class="flag" src="/Content/Images/cabin1.png" />
                                                </div>
                                                <div class="col-md-8 u-ph-0">
                                                    <p class="cabin-type">Standard One Bedroom Cabin</p>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Great Mate" data-price="139.5">$139.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Best Mate" data-price="139.5">$139.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Mate" data-price="139.5">$139.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="None" data-price="155">$155.00 total</span>
                                                    <p class="available-accommodation-price">$155.00 total</p>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <input id="AvailableAccommodation_7__RoomTypeId" name="AvailableAccommodation[7].RoomTypeId" type="hidden" value="TEST-1-40-RT" />
                                            <input id="AvailableAccommodation_7__Images" name="AvailableAccommodation[7].Images" type="hidden" value="/Content/Images/cabin1.png" />
                                            <input id="AvailableAccommodation_7__Name" name="AvailableAccommodation[7].Name" type="hidden" value="Superior Two Bedroom Access Cabin" />
                                            <input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="AvailableAccommodation_7__Price" name="AvailableAccommodation[7].Price" type="hidden" value="195" />
                                            <input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="AvailableAccommodation_7__BaseRate" name="AvailableAccommodation[7].BaseRate" type="hidden" value="180" />
                                            <input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="AvailableAccommodation_7__AdditionalAdultAmount" name="AvailableAccommodation[7].AdditionalAdultAmount" type="hidden" value="0" />
                                            <input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="AvailableAccommodation_7__AdditionalChildAmount" name="AvailableAccommodation[7].AdditionalChildAmount" type="hidden" value="15" />
                                            <input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="AvailableAccommodation_7__AdditionalInfantAmount" name="AvailableAccommodation[7].AdditionalInfantAmount" type="hidden" value="0" />
                                            <input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="AvailableAccommodation_7__MemberPrice" name="AvailableAccommodation[7].MemberPrice" type="hidden" value="175.5" />
                                            <input id="AvailableAccommodation_7__Availability" name="AvailableAccommodation[7].Availability" type="hidden" value="2023-07-15T00:00:00+00:00@180" />
                                            <input id="AvailableAccommodation_7__ChargeTypeId" name="AvailableAccommodation[7].ChargeTypeId" type="hidden" value="42" />
                                            <input class="is-selected" data-val="true" data-val-required="The IsSelected field is required." id="AvailableAccommodation_7__IsSelected" name="AvailableAccommodation[7].IsSelected" type="hidden" value="False" />

                                            <a href="#">
                                                <div class="col-md-2 u-ph-0">
                                                    <img class="flag" src="/Content/Images/cabin1.png" />
                                                </div>
                                                <div class="col-md-8 u-ph-0">
                                                    <p class="cabin-type">Superior Two Bedroom Access Cabin</p>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Great Mate" data-price="175.5">$175.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Best Mate" data-price="175.5">$175.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Mate" data-price="175.5">$175.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="None" data-price="195">$195.00 total</span>
                                                    <p class="available-accommodation-price">$195.00 total</p>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <input id="AvailableAccommodation_8__RoomTypeId" name="AvailableAccommodation[8].RoomTypeId" type="hidden" value="TEST-1-49-RT" />
                                            <input id="AvailableAccommodation_8__Images" name="AvailableAccommodation[8].Images" type="hidden" value="https://stratweb-gdaygroup.imgix.net/getmedia/9d0af8ba-0296-4634-9e3c-e28768296cc3/testimage_8.jpg?width=648&amp;height=376&amp;ext=.jpg" />
                                            <input id="AvailableAccommodation_8__Name" name="AvailableAccommodation[8].Name" type="hidden" value="Deluxe Poolview 2 Bedroom TEST2" />
                                            <input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="AvailableAccommodation_8__Price" name="AvailableAccommodation[8].Price" type="hidden" value="235" />
                                            <input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="AvailableAccommodation_8__BaseRate" name="AvailableAccommodation[8].BaseRate" type="hidden" value="220" />
                                            <input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="AvailableAccommodation_8__AdditionalAdultAmount" name="AvailableAccommodation[8].AdditionalAdultAmount" type="hidden" value="0" />
                                            <input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="AvailableAccommodation_8__AdditionalChildAmount" name="AvailableAccommodation[8].AdditionalChildAmount" type="hidden" value="15" />
                                            <input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="AvailableAccommodation_8__AdditionalInfantAmount" name="AvailableAccommodation[8].AdditionalInfantAmount" type="hidden" value="0" />
                                            <input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="AvailableAccommodation_8__MemberPrice" name="AvailableAccommodation[8].MemberPrice" type="hidden" value="211.5" />
                                            <input id="AvailableAccommodation_8__Availability" name="AvailableAccommodation[8].Availability" type="hidden" value="2023-07-15T00:00:00+00:00@220" />
                                            <input id="AvailableAccommodation_8__ChargeTypeId" name="AvailableAccommodation[8].ChargeTypeId" type="hidden" value="42" />
                                            <input class="is-selected" data-val="true" data-val-required="The IsSelected field is required." id="AvailableAccommodation_8__IsSelected" name="AvailableAccommodation[8].IsSelected" type="hidden" value="False" />

                                            <a href="#">
                                                <div class="col-md-2 u-ph-0">
                                                    <img class="flag" src="https://stratweb-gdaygroup.imgix.net/getmedia/9d0af8ba-0296-4634-9e3c-e28768296cc3/testimage_8.jpg?width=648&amp;height=376&amp;ext=.jpg" />
                                                </div>
                                                <div class="col-md-8 u-ph-0">
                                                    <p class="cabin-type">Deluxe Poolview 2 Bedroom TEST2</p>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Great Mate" data-price="211.5">$211.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Best Mate" data-price="211.5">$211.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Mate" data-price="211.5">$211.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="None" data-price="235">$235.00 total</span>
                                                    <p class="available-accommodation-price">$235.00 total</p>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <input id="AvailableAccommodation_9__RoomTypeId" name="AvailableAccommodation[9].RoomTypeId" type="hidden" value="TEST-1-3-RT" />
                                            <input id="AvailableAccommodation_9__Images" name="AvailableAccommodation[9].Images" type="hidden" value="/Content/Images/cabin1.png" />
                                            <input id="AvailableAccommodation_9__Name" name="AvailableAccommodation[9].Name" type="hidden" value="TEST-1-3-RT" />
                                            <input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="AvailableAccommodation_9__Price" name="AvailableAccommodation[9].Price" type="hidden" value="315" />
                                            <input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="AvailableAccommodation_9__BaseRate" name="AvailableAccommodation[9].BaseRate" type="hidden" value="300" />
                                            <input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="AvailableAccommodation_9__AdditionalAdultAmount" name="AvailableAccommodation[9].AdditionalAdultAmount" type="hidden" value="0" />
                                            <input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="AvailableAccommodation_9__AdditionalChildAmount" name="AvailableAccommodation[9].AdditionalChildAmount" type="hidden" value="15" />
                                            <input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="AvailableAccommodation_9__AdditionalInfantAmount" name="AvailableAccommodation[9].AdditionalInfantAmount" type="hidden" value="0" />
                                            <input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="AvailableAccommodation_9__MemberPrice" name="AvailableAccommodation[9].MemberPrice" type="hidden" value="283.5" />
                                            <input id="AvailableAccommodation_9__Availability" name="AvailableAccommodation[9].Availability" type="hidden" value="2023-07-15T00:00:00+00:00@300" />
                                            <input id="AvailableAccommodation_9__ChargeTypeId" name="AvailableAccommodation[9].ChargeTypeId" type="hidden" value="42" />
                                            <input class="is-selected" data-val="true" data-val-required="The IsSelected field is required." id="AvailableAccommodation_9__IsSelected" name="AvailableAccommodation[9].IsSelected" type="hidden" value="False" />

                                            <a href="#">
                                                <div class="col-md-2 u-ph-0">
                                                    <img class="flag" src="/Content/Images/cabin1.png" />
                                                </div>
                                                <div class="col-md-8 u-ph-0">
                                                    <p class="cabin-type">TEST-1-3-RT</p>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Great Mate" data-price="283.5">$283.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Best Mate" data-price="283.5">$283.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Mate" data-price="283.5">$283.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="None" data-price="315">$315.00 total</span>
                                                    <p class="available-accommodation-price">$315.00 total</p>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <input id="AvailableAccommodation_10__RoomTypeId" name="AvailableAccommodation[10].RoomTypeId" type="hidden" value="TEST-1-54-RT" />
                                            <input id="AvailableAccommodation_10__Images" name="AvailableAccommodation[10].Images" type="hidden" value="https://stratweb-gdaygroup.imgix.net/getmedia/bf784764-3597-4406-afeb-6131e2df3482/5954b408c66525ad932faa693a647e3f.jpg?width=2500&amp;height=1250&amp;ext=.jpg" />
                                            <input id="AvailableAccommodation_10__Name" name="AvailableAccommodation[10].Name" type="hidden" value="QAIR-Kristy Awesome Room" />
                                            <input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="AvailableAccommodation_10__Price" name="AvailableAccommodation[10].Price" type="hidden" value="315" />
                                            <input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="AvailableAccommodation_10__BaseRate" name="AvailableAccommodation[10].BaseRate" type="hidden" value="300" />
                                            <input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="AvailableAccommodation_10__AdditionalAdultAmount" name="AvailableAccommodation[10].AdditionalAdultAmount" type="hidden" value="0" />
                                            <input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="AvailableAccommodation_10__AdditionalChildAmount" name="AvailableAccommodation[10].AdditionalChildAmount" type="hidden" value="15" />
                                            <input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="AvailableAccommodation_10__AdditionalInfantAmount" name="AvailableAccommodation[10].AdditionalInfantAmount" type="hidden" value="0" />
                                            <input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="AvailableAccommodation_10__MemberPrice" name="AvailableAccommodation[10].MemberPrice" type="hidden" value="283.5" />
                                            <input id="AvailableAccommodation_10__Availability" name="AvailableAccommodation[10].Availability" type="hidden" value="2023-07-15T00:00:00+00:00@300" />
                                            <input id="AvailableAccommodation_10__ChargeTypeId" name="AvailableAccommodation[10].ChargeTypeId" type="hidden" value="42" />
                                            <input class="is-selected" data-val="true" data-val-required="The IsSelected field is required." id="AvailableAccommodation_10__IsSelected" name="AvailableAccommodation[10].IsSelected" type="hidden" value="False" />

                                            <a href="#">
                                                <div class="col-md-2 u-ph-0">
                                                    <img class="flag" src="https://stratweb-gdaygroup.imgix.net/getmedia/bf784764-3597-4406-afeb-6131e2df3482/5954b408c66525ad932faa693a647e3f.jpg?width=2500&amp;height=1250&amp;ext=.jpg" />
                                                </div>
                                                <div class="col-md-8 u-ph-0">
                                                    <p class="cabin-type">QAIR-Kristy Awesome Room</p>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Great Mate" data-price="283.5">$283.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Best Mate" data-price="283.5">$283.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="Mate" data-price="283.5">$283.50 total</span>
                                                        <span class="available-accommodation-member-pricelist d-none" data-id="None" data-price="315">$315.00 total</span>
                                                    <p class="available-accommodation-price">$315.00 total</p>
                                                </div>
                                            </a>
                                        </li>
                                </ul>

                            </dd>
                        </dl>
                    </div>

					<div class="col-md-4 u-ph-0 edit-booking-room">
						<div class="col-md-11 fixed-room">
							<label>Room assigned</label>
							<label for="assignFixedRoom" class="assign-label" >
                                <span data-toggle="tooltip" title="Tick this box to fix this booking to this room so it cannot be moved" style="position:inherit">
                                    <input data-val="true" data-val-required="The FixedRes field is required." id="assignFixedRoom" name="FixedRes" type="checkbox" value="true" /><input name="FixedRes" type="hidden" value="false" />
                                </span>
                                <i class="fas fa-lock"></i> Fixed
                            </label>
						</div>
						<span>
							<div class="icon-dual-arrow">
								<i class="fas fa-chevron-up"></i>
								<i class="fas fa-chevron-down"></i>
							</div>
						</span>
						<div id="room-select-result">
							<input id="area-name" name="AreaName" type="hidden" value="" />
<select class="form-select" data-val="true" data-val-number="The field AreaId must be a number." data-val-required="The AreaId field is required." id="room-dropdown" name="AreaId"><option value="125">QAIR-CK095</option>
<option value="126">QAIR-CK096</option>
<option value="124">QAIR-CK097</option>
<option value="180">QAIR-UP103</option>
<option value="207">QAIR-UP104</option>
<option value="208">QAIR-UP105</option>
<option value="209">QAIR-UP106</option>
<option value="210">QAIR-UP107</option>
<option value="211">QAIR-UP108</option>
<option value="238">QAIR-UP109</option>
<option value="244">QAIR-UP110</option>
</select>

<script>
	$("#area-name").val($("#room-dropdown option:selected").text());
</script>
						</div>
					</div>

                    <div class="col-md-2 u-ph-0 edit-booking-time">
                        <label>Arrival time</label>
                        <div class="icon-clock">
                            <img src="/Content/Images/icon-clock.svg" />
                        </div>
                        <div class="form-group">
                            <input class="form-control" id="time" name="ETA" placeholder="00:00" type="text" value="" />
                        </div>
                    </div>
                </div>

                <div class="container-fluid edit-guest-details">
                    <div class="col-md-12 u-ph-0 edit-details-header">
                        <div class="col-md-12 u-ph-0">
                            <div class="nr-header">
                                <div class="nr-icon">
                                    <img src="/Content/Images/icon-user-large.svg">
                                </div>

                                <div class="nr-title">
                                    <h2>Guest details</h2>
                                    <p class="u-pt-0">Assign a booking contact and redeem rewards</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12 u-ph-0 edit-details-body">
                        <div class="col-md-6 u-ph-0 edit-details-search">
                            <div id="search-text-wrapper-edit" class="search" >
                                <label>Assign a contact</label>
                                <span style="position:absolute"><img src="/Content/Images/icon-search-small.svg" /></span>
                                <input id="gr-searchtext" type="text" class="form-control" placeholder="Search or create a customer", autocomplete="new-password">
                            </div>
                            <div id="selected-contact-container" style="display:inline-flex;">
                            </div>
                        </div>
                        <div class="col-md-6 u-ph-0 edit-details-rewards">
                            <div class="row1">
                                <label>Rewards programs</label>
                                <dl class="rw" style="margin: 0 !important">
                                    <dt>
                                        
                                        <a href="#">
                                            <span class="rewards-icon-selected">
                                                <div class="col-md-12 u-ph-0 rewards-icon">
                                                    <img class="flag" src="/Content/Images/icon-velocity.svg" />
                                                </div>
                                            </span>
                                        </a>
                                    </dt>
                                    
                                </dl>
                                <span>
                                    <input class="form-control" data-val="true" data-val-regex="Invalid Velocity Number" data-val-regex-pattern="\d{10}" id="velocity-rewards" name="EditBookingVelocityRewardsNumber" placeholder="Membership no" type="text" value="" />
                                    <span class="field-validation-valid EditingFormErrorLabel" data-valmsg-for="EditBookingVelocityRewardsNumber" data-valmsg-replace="true"></span>
                                </span>
                                <sub>
                                    Rewards can only be redeemed once per booking.
                                </sub>
                            </div>

                            <div class="row edit-gday-card">
                                <div class="col-md-4 u-ph-0">
                                    <img src="/Content/Images/gday-card-sample.png" />
                                    <button id="membership-join-cta" class="nr-cta-blue">Join</button>
                                </div>
                                <div class="col-md-7 u-ph-0">
                                        <h3>
                                            Eligible to receive a G’day Rewards 2-year membership for <span id="membership-value">$46.73
<input id="_selected-accommodation-price" name="SelectedAccommodation.Price" type="hidden" value="32.7" /></span>
                                        </h3>
                                    <p>Valued at $50</p>

                                    <p class="bold">Membership gives you:</p>
                                    <p>
                                        <ul>
                                            <li>Discount on future bookings</li>
                                            <li>Everyday savings on fuel</li>
                                            <li>Access to great partner offers</li>
                                        </ul>
                                    </p>
                                </div>
                                <div class="col-md-1 u-ph-0 text-right">
                                    <a href="#">&times;</a>
                                </div>
                            </div>

                            <!-- Membership join success message -->
                            <div class="row success-gday-card d-none">
                                <div class="loader-dots"></div>
                                <div class="success-state d-none">
                                    <div class="header">
                                        <i class="fas fa-check-circle"></i><span class="title">Successfully Joined</span>
                                    </div>
                                    <p class="bold">Thanks for joining G'Day Rewards.</p>
                                    <p>The guest will receive an email confirming their membership. This booking will automatically receive G'day member pricing.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button class="nr-cta-white" id="cancel-cta">Cancel</button>
        <button class="nr-cta-blue" id="update-booking">Update Booking</button>
    </div>
</form>
<div id="membership-join-modal" class="modal fade" role="dialog" data-backdrop="static"></div>

<div id="delete-booking-modal" class="modal fade" role="dialog" data-backdrop="static" style=" z-index: 1051;">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="container-fluid">
                        <div id="modal-detail-container">
                            <div class="row">
                                <div class="col-md-12 header u-ph-0">
                                    <span>Delete Booking?</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 message u-ph-0">
                                    <p>Are you sure you want to delete <span>this booking</span>? If you delete, it will be permanently lost.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 u-ph-0 cta">
                            <button id="cancel-delete">Cancel</button>
                            <button id="confirm-delete" type="button">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .modal-sm {
        width: 535px !important;
    }

    .modal-footer {
        border-radius: 6px;
    }
</style>
<div id="unsaved-warning-modal" class="modal fade" role="dialog" data-backdrop="static" style="z-index:1051">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="container-fluid">
                        <div id="warning-modal-container">
                            <div class="row">
                                <div class="col-md-12 header u-ph-0">
                                    <span class="icon"><img src="/Content/Images/icon-warning-unsaved.svg" /></span>
                                    <span>Warning</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 message u-ph-0">
                                    <p>There are <span>unsaved changes</span> on this page, are you sure you wish to proceed?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 cta">
                            <button id="proceed-unsaved-modal">Proceed without saving</button>
                            <button id="save-unsaved-modal">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .modal-sm {
        width: 535px !important;
    }

    .modal-footer {
        border-radius: 6px;
    }
</style>

<script type="text/javascript">
    $('document').ready(function ()
    {
        EditBookingModal_Initialize();
    });
</script>

    `,
}