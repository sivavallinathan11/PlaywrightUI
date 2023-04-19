export const confirmbooking = {
    body: `
    <form action="/Booking/ReserveBooking" id="reserve-booking-form" method="post"><input data-val="true" data-val-date="The field CheckInDate must be a date." data-val-required="The CheckInDate field is required." hidden="true" id="CheckInDate" name="CheckInDate" type="text" value="2023-07-15" /><input data-val="true" data-val-date="The field CheckOutDate must be a date." data-val-required="The CheckOutDate field is required." hidden="true" id="CheckOutDate" name="CheckOutDate" type="text" value="2023-07-17" /><input hidden="true" id="CheckInDate" name="CheckInDate" type="text" value="2023-07-15" /><input data-val="true" data-val-number="The field GroupReservationId must be a number." id="GroupReservationId" name="GroupReservationId" type="hidden" value="" /><input data-val="true" data-val-required="The IsContactUpdated field is required." id="IsContactUpdated" name="IsContactUpdated" type="hidden" value="False" /><input id="BookingName" name="BookingName" type="hidden" value="Booking" /><input id="GroupReservationAccountId" name="GroupReservationAccountId" type="hidden" value="" />	<div class="modal-dialog modal-lg">
    <div class="modal-content">

        <!-- Albert Payment Device Overlay-->
        <div style="text-align: center; position: absolute; width: 100%; height: 100%;">
            <div id="gr-albert-overlay"></div>
            <div class="loader-dots d-none" id="spinner-overlay"></div>
            <span id="loading-message">Connecting to device</span>
            <input id="gr-albert-close" type="submit" value="Cancel">
            <input id="albert-close-value" name="albert-close-value" type="hidden" value="" />
        </div>
        <div id="gr-opaque-white"></div>

        <div id="gr-reserve-modal-container" class="modal-body">
            <!-- left side modal -->
            <div class="gr-reserve-modal-left-section col-md-6 col-lg-6 u-pl-0 u-pr-0">

                <!-- return cta -->
                <div class="return-cta d-none">
                    <button id="return">Return</button>
                </div>

                <!-- header -->
                <div class="gr-reserve-header-step">
                    <div class="gr-reserve-header">
                        <p class="gr-step blue">Step Two</p>
                        <span class="gr-label">Reserve and Pay</span>
                    </div>
                </div>

                <!-- Status Message Popups -->
                <div class="success-popup gr-status-message-popup u-mb-5 d-none">
                    <span class="title"><i class="fas fa-check-circle"></i> Booking Reserved</span>
                    <p>The booking has been successfully placed. How does the guest wish to proceed?</p>
                    <div>
                        <button class="pay-cta primary-cta" id="pay-now">Pay Now</button>
                    </div>
                </div>

                <div class="error-popup gr-status-message-popup u-mb-5 d-none">
                    <span class="title"><i class="fas fa-times-circle"></i> An error has occurred</span>
                    <p>Book reservation failed, please try again or contact support</p>
                    <div class="error-popup-message small u-mt-10 red bold"></div>
                    <div class="u-mt-10">
                        <button class="secondary-cta" id="dismiss-cta">Go Back</button>
                    </div>
                </div>

                <div class="error-member-popup gr-status-message-popup u-mb-5 d-none">
                    <span class="title"><i class="fas fa-times-circle"></i> An error has occurred</span>
                    <p class="error-message">Your bookings has not been reserved.</p>
                    <p class="error-explanation u-mt-0">
                        <span>Note: </span>The G’Day rewards memberships against the booking have been processed.  To keep the membership please process the payment manually.  Otherwise cancel the memberships.
                    </p>
                    <div>
                        <button class="continue-cta primary-cta" data-dismiss="modal">Manual Payment</button>
                        <button class="retry-cta secondary-cta" id="cancel-membership">Cancel Memberships</button>
                    </div>
                </div>
                <!-- End Status Message Popups -->


                <div class="gr-reserve-content">
                    <div class="gr-summary-modal">
                        <label>Group booking</label>
                        <span>Booking</span>
                        <div class="gr-summary-info">
                            <div class="gr-date-range">
                                <img src="/Content/Images/nr-calendar.svg" />
                                <span>15 Jul 23 - 17 Jul 23</span>
                            </div>
                            <div class="gr-guest">
                                <img src="/Content/Images/icon-users.svg" />
                                <span>4 Adults, 2 Children, 2 Infants</span>
                            </div>
                        </div>
                    </div>
                    

                    <div class="gr-reservation-type">
                        <div class="col-md-6 u-ph-0">
                            <div class="nr-booking-source u-pl-0">
                                <h3>Reservation type <i class="fas fa-asterisk"></i></h3>
                                <div class="gr-select-arrows">
                                    <i class="fas fa-chevron-up"></i>
                                    <i class="fas fa-chevron-down"></i>
                                </div>
                                <select class="form-control" data-val="true" data-val-number="The field ReservationTypeId must be a number." data-val-required="The ReservationTypeId field is required." id="ReservationTypeId" name="ReservationTypeId"><option value="">Select a reservation type</option>
<option value="1">12. Staff</option>
<option value="16">02. Tourist - Young Couple</option>
<option value="28">03. Tourist - Family</option>
<option value="41">04. Tourist - BB (45-65)</option>
<option value="53">05. Tourist - GreyN (66+)</option>
<option value="65">06. Tourist - International</option>
<option value="77">07. Tourist - Group</option>
<option value="89">08. Special Interest Group</option>
<option value="93">08. Working - Contract</option>
<option value="96">09. Working - No Contract</option>
<option value="99">10. Permanent</option>
<option value="102">11. Annual</option>
<option value="103">13. Bushfire Relief</option>
<option value="104">99. Reservation Import</option>
</select>
                            </div>
                        </div>

                        <div class="col-md-6 u-ph-0">
                            <div class="nr-booking-source">
                                <h3>Booking Source <i class="fas fa-asterisk"></i></h3>
                                <div class="gr-select-arrows">
                                    <i class="fas fa-chevron-up"></i>
                                    <i class="fas fa-chevron-down"></i>
                                </div>
                                <select class="form-control" data-val="true" data-val-number="The field BookingSourceId must be a number." data-val-required="The BookingSourceId field is required." id="BookingSourceId" name="BookingSourceId"><option value="">Select a booking source</option>
<option value="85">1. Walk in</option>
<option value="86">2. Phone</option>
<option value="87">3. Email</option>
<option value="88">4. DHP Web</option>
<option value="89">5. OTA</option>
<option value="90">6. GDS</option>
<option value="95">7. G&#39;day web</option>
<option value="92">8. Powered Site Pass</option>
<option value="57">Airlie Beach race week</option>
<option value="50">Airlie Cove Website</option>
<option value="28">ATS pacific </option>
<option value="65">Australian Govt. Directory</option>
<option value="54">Awesome Campers</option>
<option value="67">Ayr Silverlink Big4</option>
<option value="4">Big 4 Book A</option>
<option value="2">Big 4 Guide</option>
<option value="3">Big 4 Internet</option>
<option value="78">Booking.com</option>
<option value="6">Brochures</option>
<option value="76">Camps Australia 6</option>
<option value="63">Caravan parks australia wide</option>
<option value="14">Caravan Pk Other see res notes</option>
<option value="52">Caravanning QLD show brochure special</option>
<option value="84">Classic Holidays</option>
<option value="59">Corporate Traveller</option>
<option value="36">Defence force promotion</option>
<option value="32">Drive by no signs</option>
<option value="13">Drive By signs on Bruce hwy</option>
<option value="31">Drive by signs on Shute</option>
<option value="82">Expedia</option>
<option value="18">Friends &amp; Relations</option>
<option value="23">Group - New</option>
<option value="22">Group - Return</option>
<option value="45">Harvey World Travel Expo</option>
<option value="34">Hb Cruise and Travel</option>
<option value="15">Home Page</option>
<option value="8">Information Centre</option>
<option value="24">Internet</option>
<option value="74">Kev Rebgetz</option>
<option value="44">Local</option>
<option value="51">Love the Whitsundays</option>
<option value="66">Mackay Marine</option>
<option value="35">Mackay tourism</option>
<option value="81">Mackay Visitors guide</option>
<option value="17">Magazine</option>
<option value="69">Maui camper</option>
<option value="60">Moranbah expo specials</option>
<option value="11">Motor Org Other</option>
<option value="12">Motor Racq</option>
<option value="56">Mybookings.com</option>
<option value="27">NETROOMZ</option>
<option value="16">Newspaper</option>
<option value="33">Other website note in res notes</option>
<option value="64">Prize voucher</option>
<option value="10">Q Parks Guide</option>
<option value="62">Qld Weekender</option>
<option value="47">Queensland holidays (TQ) website</option>
<option value="71">Radio mackay</option>
<option value="70">Radio townsville</option>
<option value="9">Returned Guests</option>
<option value="26">RMSOnline Bookings</option>
<option value="19">Schoolies</option>
<option value="80">Season of Sailing</option>
<option value="1">Sensis</option>
<option value="49">Standby Travel</option>
<option value="43">THL</option>
<option value="5">To Be advised</option>
<option value="53">Tourism Whitsundays</option>
<option value="48">Tribal Travel Awesome 4some</option>
<option value="73">TURU</option>
<option value="40">TW 2nd night 1/2 price</option>
<option value="61">Website specials</option>
<option value="41">Whitsunday info cntre,Prossy</option>
<option value="83">Whitsunday Local map stay 4 pay 3 special</option>
<option value="77">Whitsunday&#39;s on sale campaign</option>
<option value="68">Wiki camps app</option>
<option value="7">Word of Mouth</option>
<option value="42">Work for accommodation</option>
<option value="25">Wotif</option>
<option value="55">Wotif special</option>
</select>
                            </div>
                        </div>
                    </div>

                    <div class="gr-booking-notes">
                        <label>Booking notes</label>
                        <textarea cols="20" id="BookingNotes" name="BookingNotes" placeholder="Start typing a note here..." rows="2">
</textarea>
                    </div>
                    <div class="gr-terms-conditions">
                        <label>Terms and conditions</label>
                        <span>The terms and conditions applicable to this booking are located on our website at <a href="https://www.discoveryholidayparks.com.au/" target="_blank">discoveryholidayparks.com.au</a> By proceeding with the booking, you are agreeing to those terms and conditions. Do you wish to proceed? </span>
                        <div class="cta-checkbox">
                            <input type="checkbox" id="terms-checkbox" /> <span>I have read out the above and the guest wishes to proceed</span>
                        </div>
                    </div>
                    <div class="gr-cancel-cta">
                        <button type="button" data-dismiss="modal">Cancel</button>
                    </div>
                </div>

                <div class="payment-selection d-none">
                    
                </div>
            </div>

            <!-- right side modal -->
            <div class="gr-reserve-modal-right-section col-md-6 col-lg-6 u-pl-0 u-pr-0">
                <div class="gr-booking-summary">
                    <div class="gr-reserve-header">
                        <h1>Bookings</h1>
                        <p class="select-bookings d-none">Select booking(s) for payment</p>
                        <div class="gr-booking-count">
                            <div class="icon">
                                <img src="/Content/Images/icon-briefcase-blue.svg" />
                            </div>
                            <span class="booking-count">2 Bookings</span>
                        </div>
                    </div>
                    <div class="row payment-booking-body scroller">
                        <div class="container-fluid confirmed-booking-details">
<div class="payment-booking-details">


<style>
.edit-discount-cta{
    cursor:pointer;
}
</style>

<input type="hidden" name="SelectedAccommodations.index" autocomplete="off" value="5230452e-c680-46c5-b11c-671f4309598a" />
<input data-val="true" data-val-date="The field CheckInDate must be a date." data-val-required="The CheckInDate field is required." hidden="true" id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__CheckInDate" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].CheckInDate" type="text" value="2023-07-15" /><input data-val="true" data-val-date="The field CheckOutDate must be a date." data-val-required="The CheckOutDate field is required." hidden="true" id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__CheckOutDate" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].CheckOutDate" type="text" value="2023-07-16" /><input id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__SelectedAccommodation_Name" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].SelectedAccommodation.Name" type="hidden" value="Powered Site" /><input id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__SelectedAccommodation_Images" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].SelectedAccommodation.Images" type="hidden" value="https://stratweb-gdaygroup.imgix.net/getmedia/90a97eb5-26ea-494b-929a-24b615598e24/17769_007_open2view_id552624-cool_waters_discovery_park.jpg?width=1280&amp;height=853&amp;ext=.jpg" /><input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__SelectedAccommodation_Price" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].SelectedAccommodation.Price" type="hidden" value="32.7" /><input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__SelectedAccommodation_MemberPrice" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].SelectedAccommodation.MemberPrice" type="hidden" value="29.45" /><input id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__SelectedAccommodation_RoomTypeId" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-41-RT" /><input id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__BookingName" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].BookingName" type="hidden" value="" /><input data-val="true" data-val-number="The field AdultCount must be a number." data-val-required="The AdultCount field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__AdultCount" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].AdultCount" type="hidden" value="2" /><input data-val="true" data-val-number="The field ChildCount must be a number." data-val-required="The ChildCount field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__ChildCount" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].ChildCount" type="hidden" value="1" /><input data-val="true" data-val-number="The field InfantCount must be a number." data-val-required="The InfantCount field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__InfantCount" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].InfantCount" type="hidden" value="1" /><input data-val="true" data-val-required="The IsCabins field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__IsCabins" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].IsCabins" type="hidden" value="False" /><input data-val="true" data-val-required="The IsSites field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__IsSites" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].IsSites" type="hidden" value="False" /><input data-val="true" data-val-required="The IsPetFriendly field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__IsPetFriendly" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].IsPetFriendly" type="hidden" value="False" /><input data-val="true" data-val-number="The field AreaId must be a number." data-val-required="The AreaId field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__AreaId" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].AreaId" type="hidden" value="112" /><input id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__AreaName" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].AreaName" type="hidden" value="QAIR-PG68" /><input class="reservation-id-selector" data-val="true" data-val-number="The field ReservationId must be a number." data-val-required="The ReservationId field is required." id="reservation-id-353125" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].ReservationId" type="hidden" value="353125" /><input class="booking-count-text" id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__BookingCountText" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].BookingCountText" type="hidden" value="Booking 1" /><input data-val="true" data-val-number="The field SelectedAccommodationId must be a number." data-val-required="The SelectedAccommodationId field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__SelectedAccommodationId" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].SelectedAccommodationId" type="hidden" value="0" /><input data-val="true" data-val-required="First Name is required" id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__FirstName" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].FirstName" type="hidden" value="RCATSMemberWPhNG483" /><input data-val="true" data-val-required="Surname is required" id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__LastName" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].LastName" type="hidden" value="RCATSMemberTestcfMyk137" /><input data-val="true" data-val-regex="Invalid Email" data-val-regex-pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$" data-val-required="The Email field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__Email" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].Email" type="hidden" value="RCATSMemberdMZgy936@gmail.com" /><input data-val="true" data-val-required="Phone Number is required" data-val-validateauphonenumber="The field Contact Number is invalid." data-val-validateauphonenumber-dependentproperty="CountryCode" id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__Phone" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].Phone" type="hidden" value="+61412345678" /><input data-val="true" data-val-required="Street is required" id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__Street" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].Street" type="hidden" value="Light Square" /><input data-val="true" data-val-required="Town is required" id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__Town" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].Town" type="hidden" value="Adelaide" /><input id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__State" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].State" type="hidden" value="SA" /><input data-val="true" data-val-regex="Valid postcode required" data-val-regex-pattern="^[0-9]*$" data-val-requiredif="Postcode is required" data-val-requiredif-dependentproperty="gr-country" data-val-requiredif-desiredvalue="AU" id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__PostCode" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].PostCode" type="hidden" value="5000" /><input data-val="true" data-val-required="Country is required" id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__Country" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].Country" type="hidden" value="AUS" /><input id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__ETA" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].ETA" type="hidden" value="00:00" /><input data-val="true" data-val-required="The IsGuestContact field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__IsGuestContact" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].IsGuestContact" type="hidden" value="True" /><input id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__SelectedAccommodation_Availability" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].SelectedAccommodation.Availability" type="hidden" value="2023-07-15T00:00:00+00:00@21" /><input id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__SelectedAccommodation_ChargeTypeId" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].SelectedAccommodation.ChargeTypeId" type="hidden" value="42" /><input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__SelectedAccommodation_AdditionalAdultAmount" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].SelectedAccommodation.AdditionalAdultAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__SelectedAccommodation_AdditionalChildAmount" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].SelectedAccommodation.AdditionalChildAmount" type="hidden" value="11.25" /><input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__SelectedAccommodation_AdditionalInfantAmount" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].SelectedAccommodation.AdditionalInfantAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__SelectedAccommodation_BaseRate" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].SelectedAccommodation.BaseRate" type="hidden" value="21.43" /><input data-val="true" data-val-number="The field DiscountId must be a number." data-val-required="The DiscountId field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__SelectedAccommodation_DiscountId" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].SelectedAccommodation.DiscountId" type="hidden" value="0" /><input data-val="true" data-val-number="The field DiscountPrice must be a number." data-val-required="The DiscountPrice field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__SelectedAccommodation_DiscountPrice" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].SelectedAccommodation.DiscountPrice" type="hidden" value="0" /><input data-val="true" data-val-number="The field DiscountAmount must be a number." data-val-required="The DiscountAmount field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__SelectedAccommodation_DiscountAmount" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].SelectedAccommodation.DiscountAmount" type="hidden" value="0" /><input id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__SelectedAccommodation_DiscountName" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].SelectedAccommodation.DiscountName" type="hidden" value="" /><input id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__SelectedAccommodation_DiscountStaffName" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].SelectedAccommodation.DiscountStaffName" type="hidden" value="" /><input id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__SelectedAccommodation_DiscountReason" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].SelectedAccommodation.DiscountReason" type="hidden" value="" /><input id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__MembershipNumber" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].MembershipNumber" type="hidden" value="" /><input data-val="true" data-val-required="The MemberGuid field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__MemberGuid" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].MemberGuid" type="hidden" value="00000000-0000-0000-0000-000000000000" /><input data-val="true" data-val-required="The IsSelectedForPaymentProcessing field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__IsSelectedForPaymentProcessing" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].IsSelectedForPaymentProcessing" type="hidden" value="True" /><input data-val="true" data-val-number="The field AccountId must be a number." data-val-required="The AccountId field is required." id="account-id-353125" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].AccountId" type="hidden" value="0" /><input data-val="true" data-val-required="The IsUpsell field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__IsUpsell" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].IsUpsell" type="hidden" value="True" /><input id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__StaffName" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].StaffName" type="hidden" value="Robot Test" /><input data-val="true" data-val-regex="Invalid Velocity Number" data-val-regex-pattern="\d{10}" id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__VelocityRewardsNumber" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].VelocityRewardsNumber" type="hidden" value="" /><input id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__VelocityRewardsGuid" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].VelocityRewardsGuid" type="hidden" value="" /><input data-val="true" data-val-required="The IsActiveMember field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__IsActiveMember" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].IsActiveMember" type="hidden" value="True" /><input id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__MemberExpirationDate" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].MemberExpirationDate" type="hidden" value="" /><input data-val="true" data-val-number="The field SelectedDealId must be a number." data-val-required="The SelectedDealId field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__SelectedDealId" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].SelectedDealId" type="hidden" value="0" /><input id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__SelectedDealPrice" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].SelectedDealPrice" type="hidden" value="" /><input data-val="true" data-val-required="The FixedRes field is required." id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__FixedRes" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].FixedRes" type="hidden" value="False" /><input id="SelectedAccommodations_5230452e-c680-46c5-b11c-671f4309598a__LoyaltyTier" name="SelectedAccommodations[5230452e-c680-46c5-b11c-671f4309598a].LoyaltyTier" type="hidden" value="Mate" />
<div class="row booking-entry" id="353125">
<div class="container-fluid u-pl-0">
    <div class="col-md-9 u-ph-0">
        <label class="checkbox-inline">
            <input checked="checked" class="selected-for-payment d-none" data-val="true" data-val-required="The IsSelectedForPaymentProcessing field is required." id="IsSelectedForPaymentProcessing" name="IsSelectedForPaymentProcessing" type="checkbox" value="true" /><input name="IsSelectedForPaymentProcessing" type="hidden" value="false" />
            <h3>Booking 1</h3>
            <p>Powered Site</p>
            <p>
                <span class="icon"><img src="/Content/Images/icon-users.svg" /></span>
                <span id="reserve-booking-contact-name-353125">RCATSMemberWPhNG483</span>

                <span class="icon u-ml-10"><img src="/Content/Images/icon-bed.svg" /></span>
                <span>QAIR-PG68</span>
            </p>
        </label>
            <div class="booking-discount">
                <span style="margin-left:0;">
                    <img class="gday-dark" src="/Content/Images/gday-dark.svg">
                </span>
            </div>

    </div>

    <div class="col-md-3 u-ph-0 text-right">
        <sup>$32.70</sup>
        <p>$29.45</p>
        


            <button id="get-discount-modal-353125" class="discount-cta get-discount">Add discount</button>
    </div>

    
 </div>

</div>

<style>
.edit-discount-cta{
    cursor:pointer;
}
</style>

<input type="hidden" name="SelectedAccommodations.index" autocomplete="off" value="22f97f9b-9ed1-4fef-b4d8-8008108fbc35" />
<input data-val="true" data-val-date="The field CheckInDate must be a date." data-val-required="The CheckInDate field is required." hidden="true" id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__CheckInDate" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].CheckInDate" type="text" value="2023-07-16" /><input data-val="true" data-val-date="The field CheckOutDate must be a date." data-val-required="The CheckOutDate field is required." hidden="true" id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__CheckOutDate" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].CheckOutDate" type="text" value="2023-07-17" /><input id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__SelectedAccommodation_Name" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].SelectedAccommodation.Name" type="hidden" value="Unpowered Site" /><input id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__SelectedAccommodation_Images" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].SelectedAccommodation.Images" type="hidden" value="/Content/Images/cabin1.png" /><input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__SelectedAccommodation_Price" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].SelectedAccommodation.Price" type="hidden" value="32.7" /><input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__SelectedAccommodation_MemberPrice" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].SelectedAccommodation.MemberPrice" type="hidden" value="29.45" /><input id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__SelectedAccommodation_RoomTypeId" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-12-RT" /><input id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__BookingName" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].BookingName" type="hidden" value="" /><input data-val="true" data-val-number="The field AdultCount must be a number." data-val-required="The AdultCount field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__AdultCount" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].AdultCount" type="hidden" value="2" /><input data-val="true" data-val-number="The field ChildCount must be a number." data-val-required="The ChildCount field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__ChildCount" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].ChildCount" type="hidden" value="1" /><input data-val="true" data-val-number="The field InfantCount must be a number." data-val-required="The InfantCount field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__InfantCount" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].InfantCount" type="hidden" value="1" /><input data-val="true" data-val-required="The IsCabins field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__IsCabins" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].IsCabins" type="hidden" value="False" /><input data-val="true" data-val-required="The IsSites field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__IsSites" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].IsSites" type="hidden" value="False" /><input data-val="true" data-val-required="The IsPetFriendly field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__IsPetFriendly" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].IsPetFriendly" type="hidden" value="False" /><input data-val="true" data-val-number="The field AreaId must be a number." data-val-required="The AreaId field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__AreaId" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].AreaId" type="hidden" value="125" /><input id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__AreaName" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].AreaName" type="hidden" value="QAIR-CK095" /><input class="reservation-id-selector" data-val="true" data-val-number="The field ReservationId must be a number." data-val-required="The ReservationId field is required." id="reservation-id-353126" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].ReservationId" type="hidden" value="353126" /><input class="booking-count-text" id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__BookingCountText" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].BookingCountText" type="hidden" value="Booking 2" /><input data-val="true" data-val-number="The field SelectedAccommodationId must be a number." data-val-required="The SelectedAccommodationId field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__SelectedAccommodationId" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].SelectedAccommodationId" type="hidden" value="0" /><input data-val="true" data-val-required="First Name is required" id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__FirstName" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].FirstName" type="hidden" value="RCATSMemberXaBvx721" /><input data-val="true" data-val-required="Surname is required" id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__LastName" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].LastName" type="hidden" value="RCATSMemberTestBsTkG500" /><input data-val="true" data-val-regex="Invalid Email" data-val-regex-pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$" data-val-required="The Email field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__Email" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].Email" type="hidden" value="RCATSMemberaZrgb124@gmail.com" /><input data-val="true" data-val-required="Phone Number is required" data-val-validateauphonenumber="The field Contact Number is invalid." data-val-validateauphonenumber-dependentproperty="CountryCode" id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__Phone" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].Phone" type="hidden" value="+61412345678" /><input data-val="true" data-val-required="Street is required" id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__Street" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].Street" type="hidden" value="Light Square" /><input data-val="true" data-val-required="Town is required" id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__Town" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].Town" type="hidden" value="Adelaide" /><input id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__State" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].State" type="hidden" value="SA" /><input data-val="true" data-val-regex="Valid postcode required" data-val-regex-pattern="^[0-9]*$" data-val-requiredif="Postcode is required" data-val-requiredif-dependentproperty="gr-country" data-val-requiredif-desiredvalue="AU" id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__PostCode" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].PostCode" type="hidden" value="5000" /><input data-val="true" data-val-required="Country is required" id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__Country" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].Country" type="hidden" value="AUS" /><input id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__ETA" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].ETA" type="hidden" value="00:00" /><input data-val="true" data-val-required="The IsGuestContact field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__IsGuestContact" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].IsGuestContact" type="hidden" value="False" /><input id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__SelectedAccommodation_Availability" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].SelectedAccommodation.Availability" type="hidden" value="2023-07-16T00:00:00+00:00@21" /><input id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__SelectedAccommodation_ChargeTypeId" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].SelectedAccommodation.ChargeTypeId" type="hidden" value="42" /><input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__SelectedAccommodation_AdditionalAdultAmount" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].SelectedAccommodation.AdditionalAdultAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__SelectedAccommodation_AdditionalChildAmount" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].SelectedAccommodation.AdditionalChildAmount" type="hidden" value="11.25" /><input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__SelectedAccommodation_AdditionalInfantAmount" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].SelectedAccommodation.AdditionalInfantAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__SelectedAccommodation_BaseRate" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].SelectedAccommodation.BaseRate" type="hidden" value="21.43" /><input data-val="true" data-val-number="The field DiscountId must be a number." data-val-required="The DiscountId field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__SelectedAccommodation_DiscountId" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].SelectedAccommodation.DiscountId" type="hidden" value="0" /><input data-val="true" data-val-number="The field DiscountPrice must be a number." data-val-required="The DiscountPrice field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__SelectedAccommodation_DiscountPrice" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].SelectedAccommodation.DiscountPrice" type="hidden" value="0" /><input data-val="true" data-val-number="The field DiscountAmount must be a number." data-val-required="The DiscountAmount field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__SelectedAccommodation_DiscountAmount" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].SelectedAccommodation.DiscountAmount" type="hidden" value="0" /><input id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__SelectedAccommodation_DiscountName" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].SelectedAccommodation.DiscountName" type="hidden" value="" /><input id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__SelectedAccommodation_DiscountStaffName" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].SelectedAccommodation.DiscountStaffName" type="hidden" value="" /><input id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__SelectedAccommodation_DiscountReason" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].SelectedAccommodation.DiscountReason" type="hidden" value="" /><input id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__MembershipNumber" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].MembershipNumber" type="hidden" value="" /><input data-val="true" data-val-required="The MemberGuid field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__MemberGuid" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].MemberGuid" type="hidden" value="00000000-0000-0000-0000-000000000000" /><input data-val="true" data-val-required="The IsSelectedForPaymentProcessing field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__IsSelectedForPaymentProcessing" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].IsSelectedForPaymentProcessing" type="hidden" value="True" /><input data-val="true" data-val-number="The field AccountId must be a number." data-val-required="The AccountId field is required." id="account-id-353126" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].AccountId" type="hidden" value="0" /><input data-val="true" data-val-required="The IsUpsell field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__IsUpsell" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].IsUpsell" type="hidden" value="True" /><input id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__StaffName" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].StaffName" type="hidden" value="Robot Test" /><input data-val="true" data-val-regex="Invalid Velocity Number" data-val-regex-pattern="\d{10}" id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__VelocityRewardsNumber" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].VelocityRewardsNumber" type="hidden" value="" /><input id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__VelocityRewardsGuid" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].VelocityRewardsGuid" type="hidden" value="" /><input data-val="true" data-val-required="The IsActiveMember field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__IsActiveMember" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].IsActiveMember" type="hidden" value="True" /><input id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__MemberExpirationDate" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].MemberExpirationDate" type="hidden" value="" /><input data-val="true" data-val-number="The field SelectedDealId must be a number." data-val-required="The SelectedDealId field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__SelectedDealId" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].SelectedDealId" type="hidden" value="0" /><input id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__SelectedDealPrice" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].SelectedDealPrice" type="hidden" value="" /><input data-val="true" data-val-required="The FixedRes field is required." id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__FixedRes" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].FixedRes" type="hidden" value="False" /><input id="SelectedAccommodations_22f97f9b-9ed1-4fef-b4d8-8008108fbc35__LoyaltyTier" name="SelectedAccommodations[22f97f9b-9ed1-4fef-b4d8-8008108fbc35].LoyaltyTier" type="hidden" value="Mate" />
<div class="row booking-entry" id="353126">
<div class="container-fluid u-pl-0">
    <div class="col-md-9 u-ph-0">
        <label class="checkbox-inline">
            <input checked="checked" class="selected-for-payment d-none" id="IsSelectedForPaymentProcessing" name="IsSelectedForPaymentProcessing" type="checkbox" value="true" /><input name="IsSelectedForPaymentProcessing" type="hidden" value="false" />
            <h3>Booking 2</h3>
            <p>Unpowered Site</p>
            <p>
                <span class="icon"><img src="/Content/Images/icon-users.svg" /></span>
                <span id="reserve-booking-contact-name-353126">RCATSMemberXaBvx721</span>

                <span class="icon u-ml-10"><img src="/Content/Images/icon-bed.svg" /></span>
                <span>QAIR-CK095</span>
            </p>
        </label>
            <div class="booking-discount">
                <span style="margin-left:0;">
                    <img class="gday-dark" src="/Content/Images/gday-dark.svg">
                </span>
            </div>

    </div>

    <div class="col-md-3 u-ph-0 text-right">
        <sup>$32.70</sup>
        <p>$29.45</p>
        


            <button id="get-discount-modal-353126" class="discount-cta get-discount">Add discount</button>
    </div>

    
 </div>

</div>    </div>
<div class="payment-booking-total">
    <div class="row payment-total-entry ">
        <div class="col-md-8 u-ph-0">G’Day Membership fee</div>
        <div class="col-md-4 u-ph-0 text-right">
            
            <span>$100.00</span>
        </div>
    </div>

    <div id="surcharge-lineitem" class="row payment-total-entry payment-total-surcharge d-none">
        <!-- Surcharge card fee line item -->
    </div>

    <div class="row payment-total-entry noborder">
        <div class="col-md-8 u-ph-0 balance">Balance due</div>
        <div class="col-md-4 u-ph-0 text-right">
            <span class="amount total-booking-price" id="total-booking-price">$158.90</span>
        </div>
    </div>
    <button id="reserve-now">
        <span class="reserve-now-cta">Reserve now</span>
        <div class="loader-dots" style="display:none;"></div>
    </button>
</div>

</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</form>
<div id="reserve-booking-customer-detail-modal" class="modal fade" role="dialog" data-backdrop="static"></div>
<div id="group-delete-member-modal" class="modal fade" role="dialog" data-backdrop="static" style=" z-index: 1051;"></div>
<div id="discounts-modal" class="modal fade" role="dialog" data-backdrop="static"></div>
<div id="pending-modal" class="modal fade" role="dialog" data-backdrop="false">
<div class="modal-dialog modal-sm">
    <div class="modal-content">
        <div class="modal-body modal-pending">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12 content u-ph-0">
                        <span class="loading-dots">
                            <img src="/Content/Images/loader-dots.gif" alt="Alternate Text" />
                        </span>
                        <h3 class="message">Confirming Booking…</h3>
                    </div>

                    <div class="col-md-12 content u-ph-0">
                        <p>Hold tight, we are working on confirming the booking now.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>


<style>
.modal-body {
    padding: 24px !important;
    border-radius: 6px;
}
.modal-sm {
    width: 380px !important;
}
</style>

<script>

$('document')
    .mouseup(function (e)
    {
        var container = $("#gr-contact-list")
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            container.hide();
        }
    })
    .ready(function ()
    {
        ToggleReserveCTA();
    });

$("#gr-albert-close").click(function (e)
{
    e.preventDefault();
    closeAlbertDevice();
});   

$("#gr-searchtext-reserve-booking").ready(function ()
{
    setupAutoCompleteTextBox($("#gr-searchtext-reserve-booking"), "#search-text-wrapper-reserve-booking", GetCustomerCardDetailReserveBookingModal, RC3AutoCompleteListTemplate);
});

$("#process-payment").click(function ()
{
    showAlbertDevice();
    setTimeout(function ()
    {
        closeAlbertDevice();
        $('.booking-confirmation').removeClass('d-none');
        $('.payment-selection').addClass('d-none');
        $('.gr-booking-summary').addClass('d-none');
        $('.gr-reserve-header-step').addClass('d-none');
    }, 2000);
});

$("#cancel-membership").click(function (e)
{
    e.preventDefault();

    $.ajax({
        url: '/Membership/GroupCancelMember',
        type: 'GET',
        traditional: true,
        contentType: "application/json; charset=utf-8",
        data: { memberGuid: _errorMembershipGuid },
            beforeSend: function ()
            {
                ButtonLoading("cancel-membership", true, "Cancel Memberships ");
            },
            success: function (data)
            {
                $("#group-delete-member-modal").html(data);
                $("#group-delete-member-modal").modal('show');
                ButtonLoading("cancel-membership", false, "Cancel Memberships ");
            },
            complete: function ()
            {
                ButtonLoading("cancel-membership", false, "Cancel Memberships ");
            }
        });
});
</script>


<style>
.modal-lg {
    max-width: 996px !important;
}

#gr-albert-overlay {
    width: 100%;
    min-height: 50vh;
    background: url(../../Content/Images/AlbertGraphic_WithoutDailyIQ.png) no-repeat center center;
    background-size: 25%;
    position: absolute;
    transform: translate(-50%, -50%);
    display: none;
    z-index: 3;
    -webkit-animation: mover 1s infinite alternate;
    animation: mover 1s infinite alternate;
    top: 10%;
}

#gr-albert-close {
    border: none;
    font-family: 'Inter',sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    background: #cc334a;
    color: #fff;
    position: absolute;
    left: calc(50% - 40px);
    top: 65%;
    display: none;
    z-index: 3;
    border-radius: 6px;
    padding: 4px 32px;
}

@-webkit-keyframes mover {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-20px);
    }
}

@keyframes mover {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-20px);
    }
}

#gr-opaque-white {
    background-color: rgba(255, 255, 255, 0.5);
    display: none;
    width: 100%;
    height: 100%;
    z-index: 2;
    position: absolute;
}

#loading-message {
    font-family: 'brandon-grotesque',sans-serif;
    font-style: normal;
    font-weight: 900;
    font-size: 14px;
    text-transform: uppercase;
    color: #444;
    position: absolute;
    left: 43%;
    top: 60%;
    display: none;
    z-index: 3;
}
</style>

    `
}
