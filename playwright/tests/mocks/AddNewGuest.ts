export const addnewguest = {
    body: `
    <input id="MembershipNumber" name="MembershipNumber" type="hidden" value="" />
<input data-val="true" data-val-required="First Name is required" id="customer-card-firstname" name="FirstName" type="hidden" value="test" />
<input data-val="true" data-val-required="Surname is required" id="LastName" name="LastName" type="hidden" value="test" />
<input data-val="true" data-val-regex="Invalid Email" data-val-regex-pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$" data-val-required="The Email field is required." id="Email" name="Email" type="hidden" value="test2170101@test.com" />
<input data-val="true" data-val-required="Phone Number is required" data-val-validateauphonenumber="The field Contact Number is invalid." data-val-validateauphonenumber-dependentproperty="CountryCode" id="Phone" name="Phone" type="hidden" value="+61401789789" />
<input data-val="true" data-val-required="Street is required" id="Street" name="Street" type="hidden" value="60 Light Square" />
<input data-val="true" data-val-required="Town is required" id="Town" name="Town" type="hidden" value="Adelaide" />
<input id="State" name="State" type="hidden" value="SA" />
<input class="input-validation-error" data-val="true" data-val-regex="Valid postcode required" data-val-regex-pattern="^[0-9]*$" data-val-requiredif="Postcode is required" data-val-requiredif-dependentproperty="gr-country" data-val-requiredif-desiredvalue="AU" id="PostCode" name="PostCode" type="hidden" value="5000" />
<input data-val="true" data-val-required="Country is required" id="Country" name="Country" type="hidden" value="AU" />
<input id="LoyaltyTier" name="LoyaltyTier" type="hidden" value="" />
<input data-val="true" data-val-required="The MemberGuid field is required." id="MemberGuid" name="MemberGuid" type="hidden" value="00000000-0000-0000-0000-000000000000" />
<input id="ClientId" name="ClientId" type="hidden" value="" />
<input id="MemberExpirationDate" name="MemberExpirationDate" type="hidden" value="" />
<input data-val="true" data-val-required="The IsActiveMember field is required." id="is-active-member" name="IsActiveMember" type="hidden" value="False" />
<input data-val="true" data-val-required="The IsUpsell field is required." id="is-upsell" name="IsUpsell" type="hidden" value="False" />
<input id="StaffName" name="StaffName" type="hidden" value="" />
<input data-val="true" data-val-regex="Invalid Velocity Number" data-val-regex-pattern="\d{10}" id="VelocityRewardsNumber" name="VelocityRewardsNumber" type="hidden" value="" />
<input id="VelocityRewardsGuid" name="VelocityRewardsGuid" type="hidden" value="" />

<!-- Group Contact Card -->
<div id="is-guest-contact-wrapper" hidden data-toggle="tooltip" , data-placement="right" data-original-title="Tick box if this contact is the main contact for the group">
	<input data-val="true" data-val-required="The IsGuestContact field is required." id="is-contact" name="IsGuestContact" style="margin:15px 10px; width: 15px;" type="checkbox" value="true" /><input name="IsGuestContact" type="hidden" value="false" />
</div>

<div id="gr-contact-card">
	<div class="gr-guest-details">
		<div class="gr-guest-name">
			<h3>test test</h3>
		</div>
		<span class="gr-guest-email">mockedguest@test.com</span>
		<span class="gr-guest-phone">+61401789789</span>
	</div>
	<div class="gr-gday-rewards">
		<div class="gr-rewards-icon gday-non-member">
			<img />
		</div>
		<div class="gr-gday">
			<span class="gr-rewards-title">G'day Rewards</span>
			<span class="gr-rewards-tier">None</span>
		</div>
	</div>
	<div class="gr-edit-cta col-lg-3 col-md-3">
		<button id="edit-guest">Edit</button>
		<i id="remove-guest" class="fas fa-times"></i>
	</div>
</div>

<script>
	$(document).ready(function ()
	{

        $('[data-toggle=tooltip]').tooltip({
            trigger: 'hover'
        });

		HideShowToolTip();
	})

	$("#is-contact").on("change", function ()
	{
		HideShowToolTip();
	})
	
	// Hide Rewards and Member panels if no guest is assigned yet
	if ($("#selected-contact-container").children().length == 0)
	{
		$(".edit-details-rewards").hide();
		$(".edit-gday-card").addClass('d-none');
	}
	else
	{
		$(".edit-details-rewards").show();

		// Hide Member panel if active member

		if ($("#selected-contact-container").find("#is-upsell").val() == "True")
		{
			$(".edit-gday-card").addClass('d-none');
			$(".success-gday-card").removeClass('d-none');
		}
		else if ($("#selected-contact-container").find("#is-active-member").val() == "True")
		{
			$(".edit-gday-card").addClass('d-none');
			$(".success-gday-card").addClass('d-none');
		}
		else
		{
			$(".edit-gday-card").removeClass('d-none');
			$(".success-gday-card").addClass('d-none');
		}
	}

	//Show or hide tooltip for assigned guest contact
    function HideShowToolTip()
	{
        if ($("#is-contact").is(":checked"))
        {
            $('#selected-contact-container').find('#is-guest-contact-wrapper').tooltip("destroy");
        }
        else
        {
            $('#selected-contact-container').find('#is-guest-contact-wrapper').tooltip({
                trigger: 'hover'
            });
        }
    }
</script>
    `,
}