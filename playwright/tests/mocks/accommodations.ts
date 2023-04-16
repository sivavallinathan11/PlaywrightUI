export const accom = {
    body: `<div class="nr-header">
    <div class="nr-icon">
        <img src="/Content/Images/icon-search.svg">
    </div>

    <div class="nr-title">
        <div class="col-md-8">
            <h2>Mocked Search Results</h2>
                <p>Showing accommodation between <b>16 May 23 - 17 May 23</b></p>
        </div>
        <div class="col-md-4 u-ph-0">
            <div class="search-sort">
                <div class="dropdown">
                    <button id="sort-text" class="dropdown-toggle" type="button" data-toggle="dropdown">
                        Sort By: <span>Price: Low to High</span> <span class="u-ml-5"><i class="fas fa-chevron-down"></i></span>
                    </button>
                    <ul id="sort-dropdown" class="dropdown-menu">
                        <li data-value="Low to High"><a href="#">Sort By: Price: Low to High</a></li>
                        <li data-value="High to Low"><a href="#">Sort By: Price: High to Low</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="nr-content">
        <div class="nr-search-result-container">
            <table width="100%">
                <thead>
                    <tr>
                        <td width="40%">Accommodation Type</td>
                        <td width="15%">Total Cost</td>
                        <td width="10%">Amount</td>
                        <td width="25%"></td>
                    </tr>
                </thead>
                <tbody id="available-accommodation-result-container">
<tr class="available-accommodation-result">
    <td hidden>
<form action="/Booking/AddBooking" id="add-booking-0" method="post"><input data-val="true" data-val-date="The field CheckInDate must be a date." data-val-required="The CheckInDate field is required." id="CheckInDate" name="CheckInDate" type="hidden" value="16/05/2023 2:00:00 PM" /><input data-val="true" data-val-date="The field CheckOutDate must be a date." data-val-required="The CheckOutDate field is required." id="CheckOutDate" name="CheckOutDate" type="hidden" value="17/05/2023 10:00:00 AM" /><input id="SelectedAccommodation_Images" name="SelectedAccommodation.Images" type="hidden" value="https://stratweb-gdaygroup.imgix.net/getmedia/90a97eb5-26ea-494b-929a-24b615598e24/17769_007_open2view_id552624-cool_waters_discovery_park.jpg?width=1280&amp;height=853&amp;ext=.jpg" /><input id="SelectedAccommodation_Name" name="SelectedAccommodation.Name" type="hidden" value="Powered Site" /><input data-val="true" data-val-number="The field NoOfCabins must be a number." data-val-required="The NoOfCabins field is required." id="SelectedAccommodation_NoOfCabins" name="SelectedAccommodation.NoOfCabins" type="hidden" value="52" /><input id="SelectedAccommodation_RoomTypeId" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-41-RT" /><input data-val="true" data-val-number="The field SelectedAccommodationId must be a number." data-val-required="The SelectedAccommodationId field is required." id="accommodation-id" name="SelectedAccommodationId" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdultCount must be a number." data-val-required="The AdultCount field is required." id="AdultCount" name="AdultCount" type="hidden" value="1" /><input data-val="true" data-val-number="The field ChildCount must be a number." data-val-required="The ChildCount field is required." id="ChildCount" name="ChildCount" type="hidden" value="0" /><input data-val="true" data-val-number="The field InfantCount must be a number." data-val-required="The InfantCount field is required." id="InfantCount" name="InfantCount" type="hidden" value="0" /><input data-val="true" data-val-required="The IsCabins field is required." id="IsCabins" name="IsCabins" type="hidden" value="False" /><input data-val="true" data-val-required="The IsSites field is required." id="IsSites" name="IsSites" type="hidden" value="False" /><input data-val="true" data-val-required="The IsPetFriendly field is required." id="IsPetFriendly" name="IsPetFriendly" type="hidden" value="False" /><input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="accommodation-price" name="SelectedAccommodation.Price" type="hidden" value="21.45" /><input id="SelectedAccommodation_Availability" name="SelectedAccommodation.Availability" type="hidden" value="2023-05-16T00:00:00+00:00@21" /><input id="SelectedAccommodation_ChargeTypeId" name="SelectedAccommodation.ChargeTypeId" type="hidden" value="42" /><input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="SelectedAccommodation_AdditionalAdultAmount" name="SelectedAccommodation.AdditionalAdultAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="SelectedAccommodation_AdditionalChildAmount" name="SelectedAccommodation.AdditionalChildAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="SelectedAccommodation_AdditionalInfantAmount" name="SelectedAccommodation.AdditionalInfantAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="SelectedAccommodation_BaseRate" name="SelectedAccommodation.BaseRate" type="hidden" value="21.43" /><input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="SelectedAccommodation_MemberPrice" name="SelectedAccommodation.MemberPrice" type="hidden" value="19.3" /></form>
    </td>

    <td>
        <div class="col-md-2 u-ph-0 search-result-img">
            <img src="https://stratweb-gdaygroup.imgix.net/getmedia/90a97eb5-26ea-494b-929a-24b615598e24/17769_007_open2view_id552624-cool_waters_discovery_park.jpg?width=1280&amp;height=853&amp;ext=.jpg" />
        </div>
        <div class="col-md-10 search-result-details">
            <input id="room-type-id" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-41-RT" />
            <p class="title">Powered Site</p>
            <div class="accommodation-info">
                <p class="status"><i class="fas fa-circle"></i> <span id="cabins-available">52 Available</span></p><i class="fas fa-info-circle accommInfoIcon"></i>
            </div>
        </div>
    </td>
    <td>
        <div class="col-md-12 u-ph-0 search-result-total">
            <p class="cost">$21.45 <span>total</span></p>
            <p class="nights">1 night/s</p>
        </div>
    </td>
    <td>
        <div class="search-result-amount">
            <div class="form-group">
                <select class="form-control" id="no-of-cabins">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                        <option>19</option>
                        <option>20</option>
                        <option>21</option>
                        <option>22</option>
                        <option>23</option>
                        <option>24</option>
                        <option>25</option>
                        <option>26</option>
                        <option>27</option>
                        <option>28</option>
                        <option>29</option>
                        <option>30</option>
                        <option>31</option>
                        <option>32</option>
                        <option>33</option>
                        <option>34</option>
                        <option>35</option>
                        <option>36</option>
                        <option>37</option>
                        <option>38</option>
                        <option>39</option>
                        <option>40</option>
                        <option>41</option>
                        <option>42</option>
                        <option>43</option>
                        <option>44</option>
                        <option>45</option>
                        <option>46</option>
                        <option>47</option>
                        <option>48</option>
                        <option>49</option>
                        <option>50</option>
                        <option>51</option>
                        <option>52</option>
                </select>
            </div>
        </div>
    </td>
    <td>
        <div class="search-result-add">          
            <button id=0 class="add-booking" type="button"> + Add Booking</button>
        </div>
    </td>
</tr><tr class="available-accommodation-result">
    <td hidden>
<form action="/Booking/AddBooking" id="add-booking-1" method="post"><input data-val="true" data-val-date="The field CheckInDate must be a date." data-val-required="The CheckInDate field is required." id="CheckInDate" name="CheckInDate" type="hidden" value="16/05/2023 2:00:00 PM" /><input data-val="true" data-val-date="The field CheckOutDate must be a date." data-val-required="The CheckOutDate field is required." id="CheckOutDate" name="CheckOutDate" type="hidden" value="17/05/2023 10:00:00 AM" /><input id="SelectedAccommodation_Images" name="SelectedAccommodation.Images" type="hidden" value="https://stratweb-gdaygroup.imgix.net/getmedia/bf784764-3597-4406-afeb-6131e2df3482/5954b408c66525ad932faa693a647e3f.jpg?width=2500&amp;height=1250&amp;ext=.jpg" /><input id="SelectedAccommodation_Name" name="SelectedAccommodation.Name" type="hidden" value="Powered Ensuite Site" /><input data-val="true" data-val-number="The field NoOfCabins must be a number." data-val-required="The NoOfCabins field is required." id="SelectedAccommodation_NoOfCabins" name="SelectedAccommodation.NoOfCabins" type="hidden" value="15" /><input id="SelectedAccommodation_RoomTypeId" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-9-RT" /><input data-val="true" data-val-number="The field SelectedAccommodationId must be a number." data-val-required="The SelectedAccommodationId field is required." id="accommodation-id" name="SelectedAccommodationId" type="hidden" value="1" /><input data-val="true" data-val-number="The field AdultCount must be a number." data-val-required="The AdultCount field is required." id="AdultCount" name="AdultCount" type="hidden" value="1" /><input data-val="true" data-val-number="The field ChildCount must be a number." data-val-required="The ChildCount field is required." id="ChildCount" name="ChildCount" type="hidden" value="0" /><input data-val="true" data-val-number="The field InfantCount must be a number." data-val-required="The InfantCount field is required." id="InfantCount" name="InfantCount" type="hidden" value="0" /><input data-val="true" data-val-required="The IsCabins field is required." id="IsCabins" name="IsCabins" type="hidden" value="False" /><input data-val="true" data-val-required="The IsSites field is required." id="IsSites" name="IsSites" type="hidden" value="False" /><input data-val="true" data-val-required="The IsPetFriendly field is required." id="IsPetFriendly" name="IsPetFriendly" type="hidden" value="False" /><input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="accommodation-price" name="SelectedAccommodation.Price" type="hidden" value="21.45" /><input id="SelectedAccommodation_Availability" name="SelectedAccommodation.Availability" type="hidden" value="2023-05-16T00:00:00+00:00@21" /><input id="SelectedAccommodation_ChargeTypeId" name="SelectedAccommodation.ChargeTypeId" type="hidden" value="42" /><input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="SelectedAccommodation_AdditionalAdultAmount" name="SelectedAccommodation.AdditionalAdultAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="SelectedAccommodation_AdditionalChildAmount" name="SelectedAccommodation.AdditionalChildAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="SelectedAccommodation_AdditionalInfantAmount" name="SelectedAccommodation.AdditionalInfantAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="SelectedAccommodation_BaseRate" name="SelectedAccommodation.BaseRate" type="hidden" value="21.43" /><input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="SelectedAccommodation_MemberPrice" name="SelectedAccommodation.MemberPrice" type="hidden" value="19.3" /></form>
    </td>

    <td>
        <div class="col-md-2 u-ph-0 search-result-img">
            <img src="https://stratweb-gdaygroup.imgix.net/getmedia/bf784764-3597-4406-afeb-6131e2df3482/5954b408c66525ad932faa693a647e3f.jpg?width=2500&amp;height=1250&amp;ext=.jpg" />
        </div>
        <div class="col-md-10 search-result-details">
            <input id="room-type-id" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-9-RT" />
            <p class="title">Powered Ensuite Site</p>
            <div class="accommodation-info">
                <p class="status"><i class="fas fa-circle"></i> <span id="cabins-available">15 Available</span></p><i class="fas fa-info-circle accommInfoIcon"></i>
            </div>
        </div>
    </td>
    <td>
        <div class="col-md-12 u-ph-0 search-result-total">
            <p class="cost">$21.45 <span>total</span></p>
            <p class="nights">1 night/s</p>
        </div>
    </td>
    <td>
        <div class="search-result-amount">
            <div class="form-group">
                <select class="form-control" id="no-of-cabins">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                </select>
            </div>
        </div>
    </td>
    <td>
        <div class="search-result-add">          
            <button id=1 class="add-booking" type="button"> + Add Booking</button>
        </div>
    </td>
</tr><tr class="available-accommodation-result">
    <td hidden>
<form action="/Booking/AddBooking" id="add-booking-2" method="post"><input data-val="true" data-val-date="The field CheckInDate must be a date." data-val-required="The CheckInDate field is required." id="CheckInDate" name="CheckInDate" type="hidden" value="16/05/2023 2:00:00 PM" /><input data-val="true" data-val-date="The field CheckOutDate must be a date." data-val-required="The CheckOutDate field is required." id="CheckOutDate" name="CheckOutDate" type="hidden" value="17/05/2023 10:00:00 AM" /><input id="SelectedAccommodation_Images" name="SelectedAccommodation.Images" type="hidden" value="/Content/Images/cabin1.png" /><input id="SelectedAccommodation_Name" name="SelectedAccommodation.Name" type="hidden" value="Unpowered Site" /><input data-val="true" data-val-number="The field NoOfCabins must be a number." data-val-required="The NoOfCabins field is required." id="SelectedAccommodation_NoOfCabins" name="SelectedAccommodation.NoOfCabins" type="hidden" value="11" /><input id="SelectedAccommodation_RoomTypeId" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-12-RT" /><input data-val="true" data-val-number="The field SelectedAccommodationId must be a number." data-val-required="The SelectedAccommodationId field is required." id="accommodation-id" name="SelectedAccommodationId" type="hidden" value="2" /><input data-val="true" data-val-number="The field AdultCount must be a number." data-val-required="The AdultCount field is required." id="AdultCount" name="AdultCount" type="hidden" value="1" /><input data-val="true" data-val-number="The field ChildCount must be a number." data-val-required="The ChildCount field is required." id="ChildCount" name="ChildCount" type="hidden" value="0" /><input data-val="true" data-val-number="The field InfantCount must be a number." data-val-required="The InfantCount field is required." id="InfantCount" name="InfantCount" type="hidden" value="0" /><input data-val="true" data-val-required="The IsCabins field is required." id="IsCabins" name="IsCabins" type="hidden" value="False" /><input data-val="true" data-val-required="The IsSites field is required." id="IsSites" name="IsSites" type="hidden" value="False" /><input data-val="true" data-val-required="The IsPetFriendly field is required." id="IsPetFriendly" name="IsPetFriendly" type="hidden" value="False" /><input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="accommodation-price" name="SelectedAccommodation.Price" type="hidden" value="21.45" /><input id="SelectedAccommodation_Availability" name="SelectedAccommodation.Availability" type="hidden" value="2023-05-16T00:00:00+00:00@21" /><input id="SelectedAccommodation_ChargeTypeId" name="SelectedAccommodation.ChargeTypeId" type="hidden" value="42" /><input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="SelectedAccommodation_AdditionalAdultAmount" name="SelectedAccommodation.AdditionalAdultAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="SelectedAccommodation_AdditionalChildAmount" name="SelectedAccommodation.AdditionalChildAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="SelectedAccommodation_AdditionalInfantAmount" name="SelectedAccommodation.AdditionalInfantAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="SelectedAccommodation_BaseRate" name="SelectedAccommodation.BaseRate" type="hidden" value="21.43" /><input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="SelectedAccommodation_MemberPrice" name="SelectedAccommodation.MemberPrice" type="hidden" value="19.3" /></form>
    </td>

    <td>
        <div class="col-md-2 u-ph-0 search-result-img">
            <img src="/Content/Images/cabin1.png" />
        </div>
        <div class="col-md-10 search-result-details">
            <input id="room-type-id" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-12-RT" />
            <p class="title">Unpowered Site</p>
            <div class="accommodation-info">
                <p class="status"><i class="fas fa-circle"></i> <span id="cabins-available">11 Available</span></p><i class="fas fa-info-circle accommInfoIcon"></i>
            </div>
        </div>
    </td>
    <td>
        <div class="col-md-12 u-ph-0 search-result-total">
            <p class="cost">$21.45 <span>total</span></p>
            <p class="nights">1 night/s</p>
        </div>
    </td>
    <td>
        <div class="search-result-amount">
            <div class="form-group">
                <select class="form-control" id="no-of-cabins">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                </select>
            </div>
        </div>
    </td>
    <td>
        <div class="search-result-add">          
            <button id=2 class="add-booking" type="button"> + Add Booking</button>
        </div>
    </td>
</tr><tr class="available-accommodation-result">
    <td hidden>
<form action="/Booking/AddBooking" id="add-booking-3" method="post"><input data-val="true" data-val-date="The field CheckInDate must be a date." data-val-required="The CheckInDate field is required." id="CheckInDate" name="CheckInDate" type="hidden" value="16/05/2023 2:00:00 PM" /><input data-val="true" data-val-date="The field CheckOutDate must be a date." data-val-required="The CheckOutDate field is required." id="CheckOutDate" name="CheckOutDate" type="hidden" value="17/05/2023 10:00:00 AM" /><input id="SelectedAccommodation_Images" name="SelectedAccommodation.Images" type="hidden" value="https://stratweb-gdaygroup.imgix.net/getmedia/940778fe-3d70-48c2-98ea-70589a0b3f61/test-1.jpg?width=2000&amp;height=1335&amp;ext=.jpg" /><input id="SelectedAccommodation_Name" name="SelectedAccommodation.Name" type="hidden" value="Standard Studio Ensuite Twin" /><input data-val="true" data-val-number="The field NoOfCabins must be a number." data-val-required="The NoOfCabins field is required." id="SelectedAccommodation_NoOfCabins" name="SelectedAccommodation.NoOfCabins" type="hidden" value="6" /><input id="SelectedAccommodation_RoomTypeId" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-45-RT" /><input data-val="true" data-val-number="The field SelectedAccommodationId must be a number." data-val-required="The SelectedAccommodationId field is required." id="accommodation-id" name="SelectedAccommodationId" type="hidden" value="3" /><input data-val="true" data-val-number="The field AdultCount must be a number." data-val-required="The AdultCount field is required." id="AdultCount" name="AdultCount" type="hidden" value="1" /><input data-val="true" data-val-number="The field ChildCount must be a number." data-val-required="The ChildCount field is required." id="ChildCount" name="ChildCount" type="hidden" value="0" /><input data-val="true" data-val-number="The field InfantCount must be a number." data-val-required="The InfantCount field is required." id="InfantCount" name="InfantCount" type="hidden" value="0" /><input data-val="true" data-val-required="The IsCabins field is required." id="IsCabins" name="IsCabins" type="hidden" value="False" /><input data-val="true" data-val-required="The IsSites field is required." id="IsSites" name="IsSites" type="hidden" value="False" /><input data-val="true" data-val-required="The IsPetFriendly field is required." id="IsPetFriendly" name="IsPetFriendly" type="hidden" value="False" /><input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="accommodation-price" name="SelectedAccommodation.Price" type="hidden" value="120" /><input id="SelectedAccommodation_Availability" name="SelectedAccommodation.Availability" type="hidden" value="2023-05-16T00:00:00+00:00@120" /><input id="SelectedAccommodation_ChargeTypeId" name="SelectedAccommodation.ChargeTypeId" type="hidden" value="42" /><input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="SelectedAccommodation_AdditionalAdultAmount" name="SelectedAccommodation.AdditionalAdultAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="SelectedAccommodation_AdditionalChildAmount" name="SelectedAccommodation.AdditionalChildAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="SelectedAccommodation_AdditionalInfantAmount" name="SelectedAccommodation.AdditionalInfantAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="SelectedAccommodation_BaseRate" name="SelectedAccommodation.BaseRate" type="hidden" value="120" /><input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="SelectedAccommodation_MemberPrice" name="SelectedAccommodation.MemberPrice" type="hidden" value="108" /></form>
    </td>

    <td>
        <div class="col-md-2 u-ph-0 search-result-img">
            <img src="https://stratweb-gdaygroup.imgix.net/getmedia/940778fe-3d70-48c2-98ea-70589a0b3f61/test-1.jpg?width=2000&amp;height=1335&amp;ext=.jpg" />
        </div>
        <div class="col-md-10 search-result-details">
            <input id="room-type-id" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-45-RT" />
            <p class="title">Standard Studio Ensuite Twin</p>
            <div class="accommodation-info">
                <p class="status"><i class="fas fa-circle"></i> <span id="cabins-available">6 Available</span></p><i class="fas fa-info-circle accommInfoIcon"></i>
            </div>
        </div>
    </td>
    <td>
        <div class="col-md-12 u-ph-0 search-result-total">
            <p class="cost">$120 <span>total</span></p>
            <p class="nights">1 night/s</p>
        </div>
    </td>
    <td>
        <div class="search-result-amount">
            <div class="form-group">
                <select class="form-control" id="no-of-cabins">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                </select>
            </div>
        </div>
    </td>
    <td>
        <div class="search-result-add">          
            <button id=3 class="add-booking" type="button"> + Add Booking</button>
        </div>
    </td>
</tr><tr class="available-accommodation-result">
    <td hidden>
<form action="/Booking/AddBooking" id="add-booking-4" method="post"><input data-val="true" data-val-date="The field CheckInDate must be a date." data-val-required="The CheckInDate field is required." id="CheckInDate" name="CheckInDate" type="hidden" value="16/05/2023 2:00:00 PM" /><input data-val="true" data-val-date="The field CheckOutDate must be a date." data-val-required="The CheckOutDate field is required." id="CheckOutDate" name="CheckOutDate" type="hidden" value="17/05/2023 10:00:00 AM" /><input id="SelectedAccommodation_Images" name="SelectedAccommodation.Images" type="hidden" value="/Content/Images/cabin1.png" /><input id="SelectedAccommodation_Name" name="SelectedAccommodation.Name" type="hidden" value="Standard Studio Ensuite" /><input data-val="true" data-val-number="The field NoOfCabins must be a number." data-val-required="The NoOfCabins field is required." id="SelectedAccommodation_NoOfCabins" name="SelectedAccommodation.NoOfCabins" type="hidden" value="16" /><input id="SelectedAccommodation_RoomTypeId" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-15-RT" /><input data-val="true" data-val-number="The field SelectedAccommodationId must be a number." data-val-required="The SelectedAccommodationId field is required." id="accommodation-id" name="SelectedAccommodationId" type="hidden" value="4" /><input data-val="true" data-val-number="The field AdultCount must be a number." data-val-required="The AdultCount field is required." id="AdultCount" name="AdultCount" type="hidden" value="1" /><input data-val="true" data-val-number="The field ChildCount must be a number." data-val-required="The ChildCount field is required." id="ChildCount" name="ChildCount" type="hidden" value="0" /><input data-val="true" data-val-number="The field InfantCount must be a number." data-val-required="The InfantCount field is required." id="InfantCount" name="InfantCount" type="hidden" value="0" /><input data-val="true" data-val-required="The IsCabins field is required." id="IsCabins" name="IsCabins" type="hidden" value="False" /><input data-val="true" data-val-required="The IsSites field is required." id="IsSites" name="IsSites" type="hidden" value="False" /><input data-val="true" data-val-required="The IsPetFriendly field is required." id="IsPetFriendly" name="IsPetFriendly" type="hidden" value="False" /><input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="accommodation-price" name="SelectedAccommodation.Price" type="hidden" value="120" /><input id="SelectedAccommodation_Availability" name="SelectedAccommodation.Availability" type="hidden" value="2023-05-16T00:00:00+00:00@120" /><input id="SelectedAccommodation_ChargeTypeId" name="SelectedAccommodation.ChargeTypeId" type="hidden" value="42" /><input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="SelectedAccommodation_AdditionalAdultAmount" name="SelectedAccommodation.AdditionalAdultAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="SelectedAccommodation_AdditionalChildAmount" name="SelectedAccommodation.AdditionalChildAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="SelectedAccommodation_AdditionalInfantAmount" name="SelectedAccommodation.AdditionalInfantAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="SelectedAccommodation_BaseRate" name="SelectedAccommodation.BaseRate" type="hidden" value="120" /><input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="SelectedAccommodation_MemberPrice" name="SelectedAccommodation.MemberPrice" type="hidden" value="108" /></form>
    </td>

    <td>
        <div class="col-md-2 u-ph-0 search-result-img">
            <img src="/Content/Images/cabin1.png" />
        </div>
        <div class="col-md-10 search-result-details">
            <input id="room-type-id" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-15-RT" />
            <p class="title">Standard Studio Ensuite</p>
            <div class="accommodation-info">
                <p class="status"><i class="fas fa-circle"></i> <span id="cabins-available">16 Available</span></p><i class="fas fa-info-circle accommInfoIcon"></i>
            </div>
        </div>
    </td>
    <td>
        <div class="col-md-12 u-ph-0 search-result-total">
            <p class="cost">$120 <span>total</span></p>
            <p class="nights">1 night/s</p>
        </div>
    </td>
    <td>
        <div class="search-result-amount">
            <div class="form-group">
                <select class="form-control" id="no-of-cabins">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                </select>
            </div>
        </div>
    </td>
    <td>
        <div class="search-result-add">          
            <button id=4 class="add-booking" type="button"> + Add Booking</button>
        </div>
    </td>
</tr><tr class="available-accommodation-result">
    <td hidden>
<form action="/Booking/AddBooking" id="add-booking-5" method="post"><input data-val="true" data-val-date="The field CheckInDate must be a date." data-val-required="The CheckInDate field is required." id="CheckInDate" name="CheckInDate" type="hidden" value="16/05/2023 2:00:00 PM" /><input data-val="true" data-val-date="The field CheckOutDate must be a date." data-val-required="The CheckOutDate field is required." id="CheckOutDate" name="CheckOutDate" type="hidden" value="17/05/2023 10:00:00 AM" /><input id="SelectedAccommodation_Images" name="SelectedAccommodation.Images" type="hidden" value="/Content/Images/cabin1.png" /><input id="SelectedAccommodation_Name" name="SelectedAccommodation.Name" type="hidden" value="Superior One Bedroom Cabin Sleeps 3" /><input data-val="true" data-val-number="The field NoOfCabins must be a number." data-val-required="The NoOfCabins field is required." id="SelectedAccommodation_NoOfCabins" name="SelectedAccommodation.NoOfCabins" type="hidden" value="1" /><input id="SelectedAccommodation_RoomTypeId" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-43-RT" /><input data-val="true" data-val-number="The field SelectedAccommodationId must be a number." data-val-required="The SelectedAccommodationId field is required." id="accommodation-id" name="SelectedAccommodationId" type="hidden" value="5" /><input data-val="true" data-val-number="The field AdultCount must be a number." data-val-required="The AdultCount field is required." id="AdultCount" name="AdultCount" type="hidden" value="1" /><input data-val="true" data-val-number="The field ChildCount must be a number." data-val-required="The ChildCount field is required." id="ChildCount" name="ChildCount" type="hidden" value="0" /><input data-val="true" data-val-number="The field InfantCount must be a number." data-val-required="The InfantCount field is required." id="InfantCount" name="InfantCount" type="hidden" value="0" /><input data-val="true" data-val-required="The IsCabins field is required." id="IsCabins" name="IsCabins" type="hidden" value="False" /><input data-val="true" data-val-required="The IsSites field is required." id="IsSites" name="IsSites" type="hidden" value="False" /><input data-val="true" data-val-required="The IsPetFriendly field is required." id="IsPetFriendly" name="IsPetFriendly" type="hidden" value="False" /><input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="accommodation-price" name="SelectedAccommodation.Price" type="hidden" value="120" /><input id="SelectedAccommodation_Availability" name="SelectedAccommodation.Availability" type="hidden" value="2023-05-16T00:00:00+00:00@120" /><input id="SelectedAccommodation_ChargeTypeId" name="SelectedAccommodation.ChargeTypeId" type="hidden" value="42" /><input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="SelectedAccommodation_AdditionalAdultAmount" name="SelectedAccommodation.AdditionalAdultAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="SelectedAccommodation_AdditionalChildAmount" name="SelectedAccommodation.AdditionalChildAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="SelectedAccommodation_AdditionalInfantAmount" name="SelectedAccommodation.AdditionalInfantAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="SelectedAccommodation_BaseRate" name="SelectedAccommodation.BaseRate" type="hidden" value="120" /><input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="SelectedAccommodation_MemberPrice" name="SelectedAccommodation.MemberPrice" type="hidden" value="108" /></form>
    </td>

    <td>
        <div class="col-md-2 u-ph-0 search-result-img">
            <img src="/Content/Images/cabin1.png" />
        </div>
        <div class="col-md-10 search-result-details">
            <input id="room-type-id" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-43-RT" />
            <p class="title">Superior One Bedroom Cabin Sleeps 3</p>
            <div class="accommodation-info">
                <p class="status"><i class="fas fa-circle"></i> <span id="cabins-available">1 Available</span></p><i class="fas fa-info-circle accommInfoIcon"></i>
            </div>
        </div>
    </td>
    <td>
        <div class="col-md-12 u-ph-0 search-result-total">
            <p class="cost">$120 <span>total</span></p>
            <p class="nights">1 night/s</p>
        </div>
    </td>
    <td>
        <div class="search-result-amount">
            <div class="form-group">
                <select class="form-control" id="no-of-cabins">
                        <option>1</option>
                </select>
            </div>
        </div>
    </td>
    <td>
        <div class="search-result-add">          
            <button id=5 class="add-booking" type="button"> + Add Booking</button>
        </div>
    </td>
</tr><tr class="available-accommodation-result">
    <td hidden>
<form action="/Booking/AddBooking" id="add-booking-6" method="post"><input data-val="true" data-val-date="The field CheckInDate must be a date." data-val-required="The CheckInDate field is required." id="CheckInDate" name="CheckInDate" type="hidden" value="16/05/2023 2:00:00 PM" /><input data-val="true" data-val-date="The field CheckOutDate must be a date." data-val-required="The CheckOutDate field is required." id="CheckOutDate" name="CheckOutDate" type="hidden" value="17/05/2023 10:00:00 AM" /><input id="SelectedAccommodation_Images" name="SelectedAccommodation.Images" type="hidden" value="/Content/Images/cabin1.png" /><input id="SelectedAccommodation_Name" name="SelectedAccommodation.Name" type="hidden" value="Superior One Bedroom Cabin Sleeps 5" /><input data-val="true" data-val-number="The field NoOfCabins must be a number." data-val-required="The NoOfCabins field is required." id="SelectedAccommodation_NoOfCabins" name="SelectedAccommodation.NoOfCabins" type="hidden" value="2" /><input id="SelectedAccommodation_RoomTypeId" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-8-RT" /><input data-val="true" data-val-number="The field SelectedAccommodationId must be a number." data-val-required="The SelectedAccommodationId field is required." id="accommodation-id" name="SelectedAccommodationId" type="hidden" value="6" /><input data-val="true" data-val-number="The field AdultCount must be a number." data-val-required="The AdultCount field is required." id="AdultCount" name="AdultCount" type="hidden" value="1" /><input data-val="true" data-val-number="The field ChildCount must be a number." data-val-required="The ChildCount field is required." id="ChildCount" name="ChildCount" type="hidden" value="0" /><input data-val="true" data-val-number="The field InfantCount must be a number." data-val-required="The InfantCount field is required." id="InfantCount" name="InfantCount" type="hidden" value="0" /><input data-val="true" data-val-required="The IsCabins field is required." id="IsCabins" name="IsCabins" type="hidden" value="False" /><input data-val="true" data-val-required="The IsSites field is required." id="IsSites" name="IsSites" type="hidden" value="False" /><input data-val="true" data-val-required="The IsPetFriendly field is required." id="IsPetFriendly" name="IsPetFriendly" type="hidden" value="False" /><input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="accommodation-price" name="SelectedAccommodation.Price" type="hidden" value="120" /><input id="SelectedAccommodation_Availability" name="SelectedAccommodation.Availability" type="hidden" value="2023-05-16T00:00:00+00:00@120" /><input id="SelectedAccommodation_ChargeTypeId" name="SelectedAccommodation.ChargeTypeId" type="hidden" value="42" /><input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="SelectedAccommodation_AdditionalAdultAmount" name="SelectedAccommodation.AdditionalAdultAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="SelectedAccommodation_AdditionalChildAmount" name="SelectedAccommodation.AdditionalChildAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="SelectedAccommodation_AdditionalInfantAmount" name="SelectedAccommodation.AdditionalInfantAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="SelectedAccommodation_BaseRate" name="SelectedAccommodation.BaseRate" type="hidden" value="120" /><input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="SelectedAccommodation_MemberPrice" name="SelectedAccommodation.MemberPrice" type="hidden" value="108" /></form>
    </td>

    <td>
        <div class="col-md-2 u-ph-0 search-result-img">
            <img src="/Content/Images/cabin1.png" />
        </div>
        <div class="col-md-10 search-result-details">
            <input id="room-type-id" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-8-RT" />
            <p class="title">Superior One Bedroom Cabin Sleeps 5</p>
            <div class="accommodation-info">
                <p class="status"><i class="fas fa-circle"></i> <span id="cabins-available">2 Available</span></p><i class="fas fa-info-circle accommInfoIcon"></i>
            </div>
        </div>
    </td>
    <td>
        <div class="col-md-12 u-ph-0 search-result-total">
            <p class="cost">$120 <span>total</span></p>
            <p class="nights">1 night/s</p>
        </div>
    </td>
    <td>
        <div class="search-result-amount">
            <div class="form-group">
                <select class="form-control" id="no-of-cabins">
                        <option>1</option>
                        <option>2</option>
                </select>
            </div>
        </div>
    </td>
    <td>
        <div class="search-result-add">          
            <button id=6 class="add-booking" type="button"> + Add Booking</button>
        </div>
    </td>
</tr><tr class="available-accommodation-result">
    <td hidden>
<form action="/Booking/AddBooking" id="add-booking-7" method="post"><input data-val="true" data-val-date="The field CheckInDate must be a date." data-val-required="The CheckInDate field is required." id="CheckInDate" name="CheckInDate" type="hidden" value="16/05/2023 2:00:00 PM" /><input data-val="true" data-val-date="The field CheckOutDate must be a date." data-val-required="The CheckOutDate field is required." id="CheckOutDate" name="CheckOutDate" type="hidden" value="17/05/2023 10:00:00 AM" /><input id="SelectedAccommodation_Images" name="SelectedAccommodation.Images" type="hidden" value="/Content/Images/cabin1.png" /><input id="SelectedAccommodation_Name" name="SelectedAccommodation.Name" type="hidden" value="Standard Studio Cabin" /><input data-val="true" data-val-number="The field NoOfCabins must be a number." data-val-required="The NoOfCabins field is required." id="SelectedAccommodation_NoOfCabins" name="SelectedAccommodation.NoOfCabins" type="hidden" value="6" /><input id="SelectedAccommodation_RoomTypeId" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-7-RT" /><input data-val="true" data-val-number="The field SelectedAccommodationId must be a number." data-val-required="The SelectedAccommodationId field is required." id="accommodation-id" name="SelectedAccommodationId" type="hidden" value="7" /><input data-val="true" data-val-number="The field AdultCount must be a number." data-val-required="The AdultCount field is required." id="AdultCount" name="AdultCount" type="hidden" value="1" /><input data-val="true" data-val-number="The field ChildCount must be a number." data-val-required="The ChildCount field is required." id="ChildCount" name="ChildCount" type="hidden" value="0" /><input data-val="true" data-val-number="The field InfantCount must be a number." data-val-required="The InfantCount field is required." id="InfantCount" name="InfantCount" type="hidden" value="0" /><input data-val="true" data-val-required="The IsCabins field is required." id="IsCabins" name="IsCabins" type="hidden" value="False" /><input data-val="true" data-val-required="The IsSites field is required." id="IsSites" name="IsSites" type="hidden" value="False" /><input data-val="true" data-val-required="The IsPetFriendly field is required." id="IsPetFriendly" name="IsPetFriendly" type="hidden" value="False" /><input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="accommodation-price" name="SelectedAccommodation.Price" type="hidden" value="135" /><input id="SelectedAccommodation_Availability" name="SelectedAccommodation.Availability" type="hidden" value="2023-05-16T00:00:00+00:00@135" /><input id="SelectedAccommodation_ChargeTypeId" name="SelectedAccommodation.ChargeTypeId" type="hidden" value="42" /><input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="SelectedAccommodation_AdditionalAdultAmount" name="SelectedAccommodation.AdditionalAdultAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="SelectedAccommodation_AdditionalChildAmount" name="SelectedAccommodation.AdditionalChildAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="SelectedAccommodation_AdditionalInfantAmount" name="SelectedAccommodation.AdditionalInfantAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="SelectedAccommodation_BaseRate" name="SelectedAccommodation.BaseRate" type="hidden" value="135" /><input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="SelectedAccommodation_MemberPrice" name="SelectedAccommodation.MemberPrice" type="hidden" value="121.5" /></form>
    </td>

    <td>
        <div class="col-md-2 u-ph-0 search-result-img">
            <img src="/Content/Images/cabin1.png" />
        </div>
        <div class="col-md-10 search-result-details">
            <input id="room-type-id" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-7-RT" />
            <p class="title">Standard Studio Cabin</p>
            <div class="accommodation-info">
                <p class="status"><i class="fas fa-circle"></i> <span id="cabins-available">6 Available</span></p><i class="fas fa-info-circle accommInfoIcon"></i>
            </div>
        </div>
    </td>
    <td>
        <div class="col-md-12 u-ph-0 search-result-total">
            <p class="cost">$135 <span>total</span></p>
            <p class="nights">1 night/s</p>
        </div>
    </td>
    <td>
        <div class="search-result-amount">
            <div class="form-group">
                <select class="form-control" id="no-of-cabins">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                </select>
            </div>
        </div>
    </td>
    <td>
        <div class="search-result-add">          
            <button id=7 class="add-booking" type="button"> + Add Booking</button>
        </div>
    </td>
</tr><tr class="available-accommodation-result">
    <td hidden>
<form action="/Booking/AddBooking" id="add-booking-8" method="post"><input data-val="true" data-val-date="The field CheckInDate must be a date." data-val-required="The CheckInDate field is required." id="CheckInDate" name="CheckInDate" type="hidden" value="16/05/2023 2:00:00 PM" /><input data-val="true" data-val-date="The field CheckOutDate must be a date." data-val-required="The CheckOutDate field is required." id="CheckOutDate" name="CheckOutDate" type="hidden" value="17/05/2023 10:00:00 AM" /><input id="SelectedAccommodation_Images" name="SelectedAccommodation.Images" type="hidden" value="/Content/Images/cabin1.png" /><input id="SelectedAccommodation_Name" name="SelectedAccommodation.Name" type="hidden" value="Standard One Bedroom Cabin" /><input data-val="true" data-val-number="The field NoOfCabins must be a number." data-val-required="The NoOfCabins field is required." id="SelectedAccommodation_NoOfCabins" name="SelectedAccommodation.NoOfCabins" type="hidden" value="3" /><input id="SelectedAccommodation_RoomTypeId" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-5-RT" /><input data-val="true" data-val-number="The field SelectedAccommodationId must be a number." data-val-required="The SelectedAccommodationId field is required." id="accommodation-id" name="SelectedAccommodationId" type="hidden" value="8" /><input data-val="true" data-val-number="The field AdultCount must be a number." data-val-required="The AdultCount field is required." id="AdultCount" name="AdultCount" type="hidden" value="1" /><input data-val="true" data-val-number="The field ChildCount must be a number." data-val-required="The ChildCount field is required." id="ChildCount" name="ChildCount" type="hidden" value="0" /><input data-val="true" data-val-number="The field InfantCount must be a number." data-val-required="The InfantCount field is required." id="InfantCount" name="InfantCount" type="hidden" value="0" /><input data-val="true" data-val-required="The IsCabins field is required." id="IsCabins" name="IsCabins" type="hidden" value="False" /><input data-val="true" data-val-required="The IsSites field is required." id="IsSites" name="IsSites" type="hidden" value="False" /><input data-val="true" data-val-required="The IsPetFriendly field is required." id="IsPetFriendly" name="IsPetFriendly" type="hidden" value="False" /><input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="accommodation-price" name="SelectedAccommodation.Price" type="hidden" value="140" /><input id="SelectedAccommodation_Availability" name="SelectedAccommodation.Availability" type="hidden" value="2023-05-16T00:00:00+00:00@140" /><input id="SelectedAccommodation_ChargeTypeId" name="SelectedAccommodation.ChargeTypeId" type="hidden" value="42" /><input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="SelectedAccommodation_AdditionalAdultAmount" name="SelectedAccommodation.AdditionalAdultAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="SelectedAccommodation_AdditionalChildAmount" name="SelectedAccommodation.AdditionalChildAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="SelectedAccommodation_AdditionalInfantAmount" name="SelectedAccommodation.AdditionalInfantAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="SelectedAccommodation_BaseRate" name="SelectedAccommodation.BaseRate" type="hidden" value="140" /><input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="SelectedAccommodation_MemberPrice" name="SelectedAccommodation.MemberPrice" type="hidden" value="126" /></form>
    </td>

    <td>
        <div class="col-md-2 u-ph-0 search-result-img">
            <img src="/Content/Images/cabin1.png" />
        </div>
        <div class="col-md-10 search-result-details">
            <input id="room-type-id" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-5-RT" />
            <p class="title">Standard One Bedroom Cabin</p>
            <div class="accommodation-info">
                <p class="status"><i class="fas fa-circle"></i> <span id="cabins-available">3 Available</span></p><i class="fas fa-info-circle accommInfoIcon"></i>
            </div>
        </div>
    </td>
    <td>
        <div class="col-md-12 u-ph-0 search-result-total">
            <p class="cost">$140 <span>total</span></p>
            <p class="nights">1 night/s</p>
        </div>
    </td>
    <td>
        <div class="search-result-amount">
            <div class="form-group">
                <select class="form-control" id="no-of-cabins">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                </select>
            </div>
        </div>
    </td>
    <td>
        <div class="search-result-add">          
            <button id=8 class="add-booking" type="button"> + Add Booking</button>
        </div>
    </td>
</tr><tr class="available-accommodation-result">
    <td hidden>
<form action="/Booking/AddBooking" id="add-booking-9" method="post"><input data-val="true" data-val-date="The field CheckInDate must be a date." data-val-required="The CheckInDate field is required." id="CheckInDate" name="CheckInDate" type="hidden" value="16/05/2023 2:00:00 PM" /><input data-val="true" data-val-date="The field CheckOutDate must be a date." data-val-required="The CheckOutDate field is required." id="CheckOutDate" name="CheckOutDate" type="hidden" value="17/05/2023 10:00:00 AM" /><input id="SelectedAccommodation_Images" name="SelectedAccommodation.Images" type="hidden" value="/Content/Images/cabin1.png" /><input id="SelectedAccommodation_Name" name="SelectedAccommodation.Name" type="hidden" value="Superior Two Bedroom Access Cabin" /><input data-val="true" data-val-number="The field NoOfCabins must be a number." data-val-required="The NoOfCabins field is required." id="SelectedAccommodation_NoOfCabins" name="SelectedAccommodation.NoOfCabins" type="hidden" value="1" /><input id="SelectedAccommodation_RoomTypeId" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-40-RT" /><input data-val="true" data-val-number="The field SelectedAccommodationId must be a number." data-val-required="The SelectedAccommodationId field is required." id="accommodation-id" name="SelectedAccommodationId" type="hidden" value="9" /><input data-val="true" data-val-number="The field AdultCount must be a number." data-val-required="The AdultCount field is required." id="AdultCount" name="AdultCount" type="hidden" value="1" /><input data-val="true" data-val-number="The field ChildCount must be a number." data-val-required="The ChildCount field is required." id="ChildCount" name="ChildCount" type="hidden" value="0" /><input data-val="true" data-val-number="The field InfantCount must be a number." data-val-required="The InfantCount field is required." id="InfantCount" name="InfantCount" type="hidden" value="0" /><input data-val="true" data-val-required="The IsCabins field is required." id="IsCabins" name="IsCabins" type="hidden" value="False" /><input data-val="true" data-val-required="The IsSites field is required." id="IsSites" name="IsSites" type="hidden" value="False" /><input data-val="true" data-val-required="The IsPetFriendly field is required." id="IsPetFriendly" name="IsPetFriendly" type="hidden" value="False" /><input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="accommodation-price" name="SelectedAccommodation.Price" type="hidden" value="180" /><input id="SelectedAccommodation_Availability" name="SelectedAccommodation.Availability" type="hidden" value="2023-05-16T00:00:00+00:00@180" /><input id="SelectedAccommodation_ChargeTypeId" name="SelectedAccommodation.ChargeTypeId" type="hidden" value="42" /><input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="SelectedAccommodation_AdditionalAdultAmount" name="SelectedAccommodation.AdditionalAdultAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="SelectedAccommodation_AdditionalChildAmount" name="SelectedAccommodation.AdditionalChildAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="SelectedAccommodation_AdditionalInfantAmount" name="SelectedAccommodation.AdditionalInfantAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="SelectedAccommodation_BaseRate" name="SelectedAccommodation.BaseRate" type="hidden" value="180" /><input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="SelectedAccommodation_MemberPrice" name="SelectedAccommodation.MemberPrice" type="hidden" value="162" /></form>
    </td>

    <td>
        <div class="col-md-2 u-ph-0 search-result-img">
            <img src="/Content/Images/cabin1.png" />
        </div>
        <div class="col-md-10 search-result-details">
            <input id="room-type-id" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-40-RT" />
            <p class="title">Superior Two Bedroom Access Cabin</p>
            <div class="accommodation-info">
                <p class="status"><i class="fas fa-circle"></i> <span id="cabins-available">1 Available</span></p><i class="fas fa-info-circle accommInfoIcon"></i>
            </div>
        </div>
    </td>
    <td>
        <div class="col-md-12 u-ph-0 search-result-total">
            <p class="cost">$180 <span>total</span></p>
            <p class="nights">1 night/s</p>
        </div>
    </td>
    <td>
        <div class="search-result-amount">
            <div class="form-group">
                <select class="form-control" id="no-of-cabins">
                        <option>1</option>
                </select>
            </div>
        </div>
    </td>
    <td>
        <div class="search-result-add">          
            <button id=9 class="add-booking" type="button"> + Add Booking</button>
        </div>
    </td>
</tr><tr class="available-accommodation-result">
    <td hidden>
<form action="/Booking/AddBooking" id="add-booking-10" method="post"><input data-val="true" data-val-date="The field CheckInDate must be a date." data-val-required="The CheckInDate field is required." id="CheckInDate" name="CheckInDate" type="hidden" value="16/05/2023 2:00:00 PM" /><input data-val="true" data-val-date="The field CheckOutDate must be a date." data-val-required="The CheckOutDate field is required." id="CheckOutDate" name="CheckOutDate" type="hidden" value="17/05/2023 10:00:00 AM" /><input id="SelectedAccommodation_Images" name="SelectedAccommodation.Images" type="hidden" value="https://stratweb-gdaygroup.imgix.net/getmedia/9d0af8ba-0296-4634-9e3c-e28768296cc3/testimage_8.jpg?width=648&amp;height=376&amp;ext=.jpg" /><input id="SelectedAccommodation_Name" name="SelectedAccommodation.Name" type="hidden" value="Deluxe Poolview 2 Bedroom TEST2" /><input data-val="true" data-val-number="The field NoOfCabins must be a number." data-val-required="The NoOfCabins field is required." id="SelectedAccommodation_NoOfCabins" name="SelectedAccommodation.NoOfCabins" type="hidden" value="5" /><input id="SelectedAccommodation_RoomTypeId" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-49-RT" /><input data-val="true" data-val-number="The field SelectedAccommodationId must be a number." data-val-required="The SelectedAccommodationId field is required." id="accommodation-id" name="SelectedAccommodationId" type="hidden" value="10" /><input data-val="true" data-val-number="The field AdultCount must be a number." data-val-required="The AdultCount field is required." id="AdultCount" name="AdultCount" type="hidden" value="1" /><input data-val="true" data-val-number="The field ChildCount must be a number." data-val-required="The ChildCount field is required." id="ChildCount" name="ChildCount" type="hidden" value="0" /><input data-val="true" data-val-number="The field InfantCount must be a number." data-val-required="The InfantCount field is required." id="InfantCount" name="InfantCount" type="hidden" value="0" /><input data-val="true" data-val-required="The IsCabins field is required." id="IsCabins" name="IsCabins" type="hidden" value="False" /><input data-val="true" data-val-required="The IsSites field is required." id="IsSites" name="IsSites" type="hidden" value="False" /><input data-val="true" data-val-required="The IsPetFriendly field is required." id="IsPetFriendly" name="IsPetFriendly" type="hidden" value="False" /><input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="accommodation-price" name="SelectedAccommodation.Price" type="hidden" value="220" /><input id="SelectedAccommodation_Availability" name="SelectedAccommodation.Availability" type="hidden" value="2023-05-16T00:00:00+00:00@220" /><input id="SelectedAccommodation_ChargeTypeId" name="SelectedAccommodation.ChargeTypeId" type="hidden" value="42" /><input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="SelectedAccommodation_AdditionalAdultAmount" name="SelectedAccommodation.AdditionalAdultAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="SelectedAccommodation_AdditionalChildAmount" name="SelectedAccommodation.AdditionalChildAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="SelectedAccommodation_AdditionalInfantAmount" name="SelectedAccommodation.AdditionalInfantAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="SelectedAccommodation_BaseRate" name="SelectedAccommodation.BaseRate" type="hidden" value="220" /><input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="SelectedAccommodation_MemberPrice" name="SelectedAccommodation.MemberPrice" type="hidden" value="198" /></form>
    </td>

    <td>
        <div class="col-md-2 u-ph-0 search-result-img">
            <img src="https://stratweb-gdaygroup.imgix.net/getmedia/9d0af8ba-0296-4634-9e3c-e28768296cc3/testimage_8.jpg?width=648&amp;height=376&amp;ext=.jpg" />
        </div>
        <div class="col-md-10 search-result-details">
            <input id="room-type-id" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-49-RT" />
            <p class="title">Deluxe Poolview 2 Bedroom TEST2</p>
            <div class="accommodation-info">
                <p class="status"><i class="fas fa-circle"></i> <span id="cabins-available">5 Available</span></p><i class="fas fa-info-circle accommInfoIcon"></i>
            </div>
        </div>
    </td>
    <td>
        <div class="col-md-12 u-ph-0 search-result-total">
            <p class="cost">$220 <span>total</span></p>
            <p class="nights">1 night/s</p>
        </div>
    </td>
    <td>
        <div class="search-result-amount">
            <div class="form-group">
                <select class="form-control" id="no-of-cabins">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                </select>
            </div>
        </div>
    </td>
    <td>
        <div class="search-result-add">          
            <button id=10 class="add-booking" type="button"> + Add Booking</button>
        </div>
    </td>
</tr><tr class="available-accommodation-result">
    <td hidden>
<form action="/Booking/AddBooking" id="add-booking-11" method="post"><input data-val="true" data-val-date="The field CheckInDate must be a date." data-val-required="The CheckInDate field is required." id="CheckInDate" name="CheckInDate" type="hidden" value="16/05/2023 2:00:00 PM" /><input data-val="true" data-val-date="The field CheckOutDate must be a date." data-val-required="The CheckOutDate field is required." id="CheckOutDate" name="CheckOutDate" type="hidden" value="17/05/2023 10:00:00 AM" /><input id="SelectedAccommodation_Images" name="SelectedAccommodation.Images" type="hidden" value="/Content/Images/cabin1.png" /><input id="SelectedAccommodation_Name" name="SelectedAccommodation.Name" type="hidden" value="TEST-1-3-RT" /><input data-val="true" data-val-number="The field NoOfCabins must be a number." data-val-required="The NoOfCabins field is required." id="SelectedAccommodation_NoOfCabins" name="SelectedAccommodation.NoOfCabins" type="hidden" value="4" /><input id="SelectedAccommodation_RoomTypeId" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-3-RT" /><input data-val="true" data-val-number="The field SelectedAccommodationId must be a number." data-val-required="The SelectedAccommodationId field is required." id="accommodation-id" name="SelectedAccommodationId" type="hidden" value="11" /><input data-val="true" data-val-number="The field AdultCount must be a number." data-val-required="The AdultCount field is required." id="AdultCount" name="AdultCount" type="hidden" value="1" /><input data-val="true" data-val-number="The field ChildCount must be a number." data-val-required="The ChildCount field is required." id="ChildCount" name="ChildCount" type="hidden" value="0" /><input data-val="true" data-val-number="The field InfantCount must be a number." data-val-required="The InfantCount field is required." id="InfantCount" name="InfantCount" type="hidden" value="0" /><input data-val="true" data-val-required="The IsCabins field is required." id="IsCabins" name="IsCabins" type="hidden" value="False" /><input data-val="true" data-val-required="The IsSites field is required." id="IsSites" name="IsSites" type="hidden" value="False" /><input data-val="true" data-val-required="The IsPetFriendly field is required." id="IsPetFriendly" name="IsPetFriendly" type="hidden" value="False" /><input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="accommodation-price" name="SelectedAccommodation.Price" type="hidden" value="300" /><input id="SelectedAccommodation_Availability" name="SelectedAccommodation.Availability" type="hidden" value="2023-05-16T00:00:00+00:00@300" /><input id="SelectedAccommodation_ChargeTypeId" name="SelectedAccommodation.ChargeTypeId" type="hidden" value="42" /><input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="SelectedAccommodation_AdditionalAdultAmount" name="SelectedAccommodation.AdditionalAdultAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="SelectedAccommodation_AdditionalChildAmount" name="SelectedAccommodation.AdditionalChildAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="SelectedAccommodation_AdditionalInfantAmount" name="SelectedAccommodation.AdditionalInfantAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="SelectedAccommodation_BaseRate" name="SelectedAccommodation.BaseRate" type="hidden" value="300" /><input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="SelectedAccommodation_MemberPrice" name="SelectedAccommodation.MemberPrice" type="hidden" value="270" /></form>
    </td>

    <td>
        <div class="col-md-2 u-ph-0 search-result-img">
            <img src="/Content/Images/cabin1.png" />
        </div>
        <div class="col-md-10 search-result-details">
            <input id="room-type-id" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-3-RT" />
            <p class="title">TEST-1-3-RT</p>
            <div class="accommodation-info">
                <p class="status"><i class="fas fa-circle"></i> <span id="cabins-available">4 Available</span></p><i class="fas fa-info-circle accommInfoIcon"></i>
            </div>
        </div>
    </td>
    <td>
        <div class="col-md-12 u-ph-0 search-result-total">
            <p class="cost">$300 <span>total</span></p>
            <p class="nights">1 night/s</p>
        </div>
    </td>
    <td>
        <div class="search-result-amount">
            <div class="form-group">
                <select class="form-control" id="no-of-cabins">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                </select>
            </div>
        </div>
    </td>
    <td>
        <div class="search-result-add">          
            <button id=11 class="add-booking" type="button"> + Add Booking</button>
        </div>
    </td>
</tr><tr class="available-accommodation-result">
    <td hidden>
<form action="/Booking/AddBooking" id="add-booking-12" method="post"><input data-val="true" data-val-date="The field CheckInDate must be a date." data-val-required="The CheckInDate field is required." id="CheckInDate" name="CheckInDate" type="hidden" value="16/05/2023 2:00:00 PM" /><input data-val="true" data-val-date="The field CheckOutDate must be a date." data-val-required="The CheckOutDate field is required." id="CheckOutDate" name="CheckOutDate" type="hidden" value="17/05/2023 10:00:00 AM" /><input id="SelectedAccommodation_Images" name="SelectedAccommodation.Images" type="hidden" value="https://stratweb-gdaygroup.imgix.net/getmedia/bf784764-3597-4406-afeb-6131e2df3482/5954b408c66525ad932faa693a647e3f.jpg?width=2500&amp;height=1250&amp;ext=.jpg" /><input id="SelectedAccommodation_Name" name="SelectedAccommodation.Name" type="hidden" value="QAIR-Kristy Awesome Room" /><input data-val="true" data-val-number="The field NoOfCabins must be a number." data-val-required="The NoOfCabins field is required." id="SelectedAccommodation_NoOfCabins" name="SelectedAccommodation.NoOfCabins" type="hidden" value="2" /><input id="SelectedAccommodation_RoomTypeId" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-54-RT" /><input data-val="true" data-val-number="The field SelectedAccommodationId must be a number." data-val-required="The SelectedAccommodationId field is required." id="accommodation-id" name="SelectedAccommodationId" type="hidden" value="12" /><input data-val="true" data-val-number="The field AdultCount must be a number." data-val-required="The AdultCount field is required." id="AdultCount" name="AdultCount" type="hidden" value="1" /><input data-val="true" data-val-number="The field ChildCount must be a number." data-val-required="The ChildCount field is required." id="ChildCount" name="ChildCount" type="hidden" value="0" /><input data-val="true" data-val-number="The field InfantCount must be a number." data-val-required="The InfantCount field is required." id="InfantCount" name="InfantCount" type="hidden" value="0" /><input data-val="true" data-val-required="The IsCabins field is required." id="IsCabins" name="IsCabins" type="hidden" value="False" /><input data-val="true" data-val-required="The IsSites field is required." id="IsSites" name="IsSites" type="hidden" value="False" /><input data-val="true" data-val-required="The IsPetFriendly field is required." id="IsPetFriendly" name="IsPetFriendly" type="hidden" value="False" /><input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="accommodation-price" name="SelectedAccommodation.Price" type="hidden" value="300" /><input id="SelectedAccommodation_Availability" name="SelectedAccommodation.Availability" type="hidden" value="2023-05-16T00:00:00+00:00@300" /><input id="SelectedAccommodation_ChargeTypeId" name="SelectedAccommodation.ChargeTypeId" type="hidden" value="42" /><input data-val="true" data-val-number="The field AdditionalAdultAmount must be a number." data-val-required="The AdditionalAdultAmount field is required." id="SelectedAccommodation_AdditionalAdultAmount" name="SelectedAccommodation.AdditionalAdultAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalChildAmount must be a number." data-val-required="The AdditionalChildAmount field is required." id="SelectedAccommodation_AdditionalChildAmount" name="SelectedAccommodation.AdditionalChildAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field AdditionalInfantAmount must be a number." data-val-required="The AdditionalInfantAmount field is required." id="SelectedAccommodation_AdditionalInfantAmount" name="SelectedAccommodation.AdditionalInfantAmount" type="hidden" value="0" /><input data-val="true" data-val-number="The field BaseRate must be a number." data-val-required="The BaseRate field is required." id="SelectedAccommodation_BaseRate" name="SelectedAccommodation.BaseRate" type="hidden" value="300" /><input data-val="true" data-val-number="The field MemberPrice must be a number." data-val-required="The MemberPrice field is required." id="SelectedAccommodation_MemberPrice" name="SelectedAccommodation.MemberPrice" type="hidden" value="270" /></form>
    </td>

    <td>
        <div class="col-md-2 u-ph-0 search-result-img">
            <img src="https://stratweb-gdaygroup.imgix.net/getmedia/bf784764-3597-4406-afeb-6131e2df3482/5954b408c66525ad932faa693a647e3f.jpg?width=2500&amp;height=1250&amp;ext=.jpg" />
        </div>
        <div class="col-md-10 search-result-details">
            <input id="room-type-id" name="SelectedAccommodation.RoomTypeId" type="hidden" value="TEST-1-54-RT" />
            <p class="title">QAIR-Kristy Awesome Room</p>
            <div class="accommodation-info">
                <p class="status"><i class="fas fa-circle"></i> <span id="cabins-available">2 Available</span></p><i class="fas fa-info-circle accommInfoIcon"></i>
            </div>
        </div>
    </td>
    <td>
        <div class="col-md-12 u-ph-0 search-result-total">
            <p class="cost">$300 <span>total</span></p>
            <p class="nights">1 night/s</p>
        </div>
    </td>
    <td>
        <div class="search-result-amount">
            <div class="form-group">
                <select class="form-control" id="no-of-cabins">
                        <option>1</option>
                        <option>2</option>
                </select>
            </div>
        </div>
    </td>
    <td>
        <div class="search-result-add">          
            <button id=12 class="add-booking" type="button"> + Add Booking</button>
        </div>
    </td>
</tr>                </tbody>

            </table>
        </div>
</div>
`
};