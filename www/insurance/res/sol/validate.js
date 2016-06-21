$().ready(function() {
	// validate signup form on keyup and submit
	$("#newAppForm").validate({
		rules: {
			txtFamilyName: {
				required: true,
				maxlength: 16
			},
			txtGivenName: {
				required: true,
				maxlength: 24
			},
			txtYOB: {
				required: true,
				minlength: 4,
				maxlength: 4,
				number:true
			},
		},
		messages: {
			txtYOB: "Please enter correct YOB",
			txtFamilyName: "Please enter Family Name",
			txtGivenName: "Please enter Given Name"
		}
	});
	$("#UpdAppForm").validate({
		rules: {
			txtUpdFamilyName: {
				required: true,
				maxlength: 16
			},
			txtUpdGivenName: {
				required: true,
				maxlength: 24
			},
			txtUpdYOB: {
				required: true,
				minlength: 4,
				maxlength: 4,
				number:true
			},
		},
		messages: {
			txtUpdYOB: "Please enter correct YOB",
			txtUpdFamilyName: "Please enter Family Name",
			txtUpdGivenName: "Please enter Given Name"
		}
	});

});
