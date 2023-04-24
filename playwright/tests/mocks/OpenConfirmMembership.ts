export const openconfirmmembership = {
    body: `
<form action="/" id="confirm-membership-form" method="post"><input data-val="true" data-val-number="The field ReservationId must be a number." data-val-required="The ReservationId field is required." id="reservation-id" name="ReservationId" type="hidden" value="353231" /><input data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="SelectedAccommodation_Price" name="SelectedAccommodation.Price" type="hidden" value="32.7" /><input data-val="true" data-val-required="First Name is required" id="FirstName" name="FirstName" type="hidden" value="Just a Test" /><input data-val="true" data-val-required="Surname is required" id="LastName" name="LastName" type="hidden" value="Just a Test" /><input data-val="true" data-val-regex="Invalid Email" data-val-regex-pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$" data-val-required="The Email field is required." id="Email" name="Email" type="hidden" value="just@atest.com" /><input data-val="true" data-val-required="Phone Number is required" data-val-validateauphonenumber="The field Contact Number is invalid." data-val-validateauphonenumber-dependentproperty="CountryCode" id="Phone" name="Phone" type="hidden" value="+61401217010" /><input data-val="true" data-val-required="Street is required" id="Street" name="Street" type="hidden" value="60 Light Square" /><input data-val="true" data-val-required="Town is required" id="Town" name="Town" type="hidden" value="Adelaide" /><input id="State" name="State" type="hidden" value="SA" /><input class="input-validation-error" data-val="true" data-val-regex="Valid postcode required" data-val-regex-pattern="^[0-9]*$" data-val-requiredif="Postcode is required" data-val-requiredif-dependentproperty="gr-country" data-val-requiredif-desiredvalue="AU" id="PostCode" name="PostCode" type="hidden" value="5000" /><input data-val="true" data-val-required="Country is required" id="Country" name="Country" type="hidden" value="AU" /><input data-val="true" data-val-required="The MemberGuid field is required." id="MemberGuid" name="MemberGuid" type="hidden" value="00000000-0000-0000-0000-000000000000" /><input id="ClientId" name="ClientId" type="hidden" value="" /><input id="MemberExpirationDate" name="MemberExpirationDate" type="hidden" value="" /><input id="LoyaltyTier" name="LoyaltyTier" type="hidden" value="" /><input id="MembershipNumber" name="MembershipNumber" type="hidden" value="" />	<div class="modal-dialog modal-sm">
		<div class="modal-content">
			<div class="header">
				<span>Confirm Membership</span>
			</div>
			<div class="modal-body">
				<p>To confirm the membership, please enter your full name.</p>
				<label>Staff Name</label>
				<input class="col-md-10" id="staff-name" name="StaffName" placeholder="Enter your name" type="text" value="" />
			</div>
			<div class="modal-footer">
				<button type="button" class="confirm-membership-cancel-cta">Cancel</button>
				<span class="button-wrapper u-d-inline-block" tabindex="0" data-toggle="tooltip" data-placement="top" title="Please enter name to proceed">
					<button type="button" id="confirm-membership-cta" class="confirm-cta disabled">Confirm</button>
				</span>
			</div>
		</div>
	</div>
</form>
<style>
	.modal-sm {
		width: 544px !important;
		top: calc(100vh - 76vh);
	}
</style>

<script>

	// Initialize tooltip
	$(document).ready(function ()
	{
		$('#membership-join-modal [data-toggle="tooltip"]').tooltip({
			trigger: 'hover'
		});
	});

	// Enables / Disables confirm cta and shows tooltip on membership join modal
	$('body').on("keyup", "#staff-name", function ()
	{
		if ($("#staff-name").val().length > 0)
		{
			$("#confirm-membership-cta").removeClass("disabled");
			$("#membership-join-modal [data-toggle='tooltip']").attr('data-original-title', '');
		}
		else
		{
			$("#membership-join-modal [data-toggle='tooltip']").attr('data-original-title', 'Please enter name to proceed');
			$("#confirm-membership-cta").addClass("disabled");
		}
	});

	//Clears staff name input on modal close
	$("#membership-join-modal").on('hidden.bs.modal', function ()
	{
		$("#staff-name").val('');
		$("#membership-join-modal [data-toggle='tooltip']").attr('data-original-title', 'Please enter name to proceed');
		$("#confirm-membership-cta").addClass("disabled");
	});

	$(".confirm-membership-cancel-cta").on("click", function ()
	{
		$("#membership-join-modal").modal('hide');
	});
</script>
    `,
}