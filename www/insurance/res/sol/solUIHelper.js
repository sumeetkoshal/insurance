////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Solace Systems Messaging SDK for JavaScript
// Copyright 2010-2012 Solace Systems Inc. All rights reserved.
// http://www.SolaceSystems.com
//
//                              * solUIHelper *
//
// This file contains methods help painting the UI, and methods to aapend inputs to the log text area
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//alert("solUIHelper");

var OPERATION_TIMEOUT = 30000;
var REQUEST_TIMEOUT = 5000;
var security_token = null;

function padLeft(str, padChar, length) {
	str = str + "";
	while (str.length < length) {
		str = padChar + str;
	}
	return str;
}

function utils_currentTime() {
	var currentTime = new Date();
	return padLeft(currentTime.getHours(), '0', 2) + ":" +
			padLeft(currentTime.getMinutes(), '0', 2) + ":" +
			padLeft(currentTime.getSeconds(), '0', 2) + "." +
			padLeft(currentTime.getMilliseconds(), '0', 3);
}

function logUtil(line) {

	var message = utils_currentTime() + ":" + line + "\n";
	var txtarea = document.getElementById("txaConsoleLog");
	var newmessage = message + txtarea.value;
	newmessage = newmessage.substring (0, 2000);
	txtarea.value = newmessage;
}

function stringReplaceAll(str, find, replace) {
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
}

function getFullYear()
{
	var d = new Date();
	var year = d.getFullYear();
	return year;
}


function refreshPage()
{
    jQuery.mobile.changePage(window.location.href, {
        allowSamePageTransition: true,
        transition: 'none',
        reloadPage: true
    });
}

function updFormReset()
{
	$('input:radio[name=rdUpdGender]').attr('checked',false);
	$('input:radio[name=rdUpdSmoker]').attr('checked',false);
	$('input:radio[name=rdUpdDrinker]').attr('checked',false);
	$('input:radio[name=rdUpdRCDriver]').attr('checked',false);
	$('input:radio[name=rdUpdBeenArrested]').attr('checked',false);
	$('input:radio[name=rdUpdVolvoDriver]').attr('checked',false);
	$('input:radio[name=rdUpdChessClubMember]').attr('checked',false);
	$('#UpdAppForm')[0].reset();
}

function editApplicationData(record)
{
	updFormReset();
	document.getElementById("txtUpdAppID").value = record[0];
	document.getElementById("txtUpdGivenName").value = record[1];
	document.getElementById("txtUpdFamilyName").value = record[2];
	document.getElementById("txtUpdYOB").value = record[3];
	$('input:radio[name=rdUpdGender][value="' + record[4] +'"]').attr('checked',true);
	document.getElementById("selUpdIndustry").value = record[5];
	document.getElementById("selUpdTitle").value = record[6];
	document.getElementById("selUpdSalary").value = record[7];
	$('input:radio[name=rdUpdSmoker][value="' + record[8] +'"]').attr('checked',true);
	$('input:radio[name=rdUpdDrinker][value="' + record[9] +'"]').attr('checked',true);
	$('input:radio[name=rdUpdRCDriver][value="' + record[10] +'"]').attr('checked',true);
	$('input:radio[name=rdUpdBeenArrested][value="' + record[11] +'"]').attr('checked',true);
	$('input:radio[name=rdUpdVolvoDriver][value="' + record[12] +'"]').attr('checked',true);
	$('input:radio[name=rdUpdChessClubMember][value="' + record[13] +'"]').attr('checked',true);

	var fileUpdLicenseUrl = record[14];
	var fileUpdEducationRecordUrl = record[15];
	var fileUpdCarPhotoUrl = record[16];
	var fileUpdArrestRecordUrl = record[17];
	document.getElementById("fileUpdLicenseEI").innerHTML = '<a href="' + fileUpdLicenseUrl + '" target="_blank">Existing Image</a>';
	document.getElementById("fileUpdEducationRecordEI").innerHTML = '<a href="' + fileUpdEducationRecordUrl + '" target="_blank">Existing Image</a>';
	document.getElementById("fileUpdCarPhotoEI").innerHTML = '<a href="' + fileUpdCarPhotoUrl + '" target="_blank">Existing Image</a>';
	document.getElementById("fileUpdArrestRecordEI").innerHTML = '<a href="' + fileUpdArrestRecordUrl + '" target="_blank">Existing Image</a>';


	window.location="#edit";
}

function onLoginResponse(loginid, status, token)
{
		document.getElementById('processing_login').src = "";

    if(status == "FAILED")
  	{
     		document.getElementById("loginStatusLine").innerHTML = "Login Failed. Please check username and/or password!";
      	document.getElementById("log_status").innerHTML = "Login Failed. Please check username and/or password!";
      	document.getElementById("ok_link").href="#login";
      	window.location="#login_status";
  	}
  	else
  	{
      	security_token = token;
				document.getElementById("log_status").innerHTML = "Login Successful. You token is :" + security_token;
      	document.getElementById("ok_link").href="#newapp";
      	window.location="#login_status";
      	document.getElementById("authenticated_success").innerHTML = "Welcome " + loginid + "! You are Authenticated!";
  	}
}

function validateBeforeCreate()
{
        if(document.getElementById("txtGivenName").value == '')
        {
                alert('Please enter Given Name!');
                return false;
        }
        if(document.getElementById("txtFamilyName").value == '')
        {
                alert('Please enter Family Name!');
                return false;
        }
        if(document.getElementById("selIndustry").value == 'NONE')
        {
                alert('Please select Industry from the drop down list!');
                return false;
        }
        if(document.getElementById("selTitle").value == 'NONE')
        {
                alert('Please select Title from the drop down list!');
                return false;
        }
        if((document.getElementById("txtYOB").value > getFullYear()) || (document.getElementById("txtYOB").value<1000))
        {
                alert('Please enter correctYear of birth!');
                return false;
        }
        if(document.getElementById("selSalary").value == 'NONE')
        {
                alert('Please select Salary from the drop down list!');
                return false;
        }
        if($('input[name=rdGender]:radio:checked').val() == undefined)
        {
                alert('Please enter Gender!');
                return false;
        }
        if($('input[name=rdSmoker]:radio:checked').val() == undefined)
        {
                alert('Please enter if Smoker!');
                return false;
        }
        if($('input[name=rdDrinker]:radio:checked').val() == undefined)
        {
                alert('Please enter if Drinker!');
                return false;
        }
        if($('input[name=rdRCDriver]:radio:checked').val() == undefined)
        {
                alert('Please enter if Race Car Driver!');
                return false;
        }
        if($('input[name=rdBeenArrested]:radio:checked').val() == undefined)
        {
                alert('Please enter BeenArrested!');
                return false;
        }
        if($('input[name=rdVolvoDriver]:radio:checked').val() == undefined)
        {
                alert('Please enter if Volvo Driver!');
                return false;
        }
        if($('input[name=rdChessClubMember]:radio:checked').val() == undefined)
        {
                alert('Please enter if ChessClubMember!');
                return false;
        }
        return true;
}

function getXMLDataForNewApp() {
        if(validateBeforeCreate()==false)
                return null;
        var last_name = document.getElementById("txtFamilyName").value;
        var first_name = document.getElementById("txtGivenName").value;
        var dob = document.getElementById("txtYOB").value;
        var gender = $('input[name=rdGender]:radio:checked').val();
        var industry = document.getElementById("selIndustry").value;
        var title = document.getElementById("selTitle").value;
        var salary_band = document.getElementById("selSalary").value;
        var salary_band_currency = "USD";//document.getElementById("txtFamilyName").value;
        var smoker = $('input[name=rdSmoker]:radio:checked').val();
        var drinker = $('input[name=rdDrinker]:radio:checked').val();
        var race_driver = $('input[name=rdRCDriver]:radio:checked').val();
        var arrested = $('input[name=rdBeenArrested]:radio:checked').val();
        var volvo_driver = $('input[name=rdVolvoDriver]:radio:checked').val();
        var chess_club_member = $('input[name=rdChessClubMember]:radio:checked').val();
        try{
                var msg = "<xml>"+
                                                "<app_id>-1</app_id>"+

                                                "<app_data>" +
                                                        "<first_name>" + first_name + "</first_name>" +
                                                        "<last_name>" + last_name + "</last_name>" +
                                                        "<dob>" + dob + "</dob>" +
                                                        "<gender>" + gender + "</gender>" +
                                                        "<industry>" + industry + "</industry>" +
                                                        "<title>" + title + "</title>" +
                                                        "<salary_band>" + salary_band + "</salary_band>" +
                                                        "<salary_band_currency>" + salary_band_currency + "</salary_band_currency>" +
                                                        "<smoker>" + smoker + "</smoker>" +
                                                        "<drinker>" + drinker + "</drinker>" +
                                                        "<race_driver>" + race_driver + "</race_driver>" +
                                                        "<arrested>" + arrested + "</arrested>" +
                                                        "<volvo_driver>" + volvo_driver + "</volvo_driver>" +
                                                        "<chess_club_member>" + chess_club_member + "</chess_club_member>" +
                                                "</app_data>" +
                                          "</xml>";
        } catch(error)
        {
                alert(error.message);
                return null;
        }

        return msg;
}

function validateBeforeUpdate()
{
	if(document.getElementById("txtUpdGivenName").value == '')
	{
		alert('Please enter Given Name!');
		return false;
	}
	if(document.getElementById("txtUpdFamilyName").value == '')
	{
		alert('Please enter Family Name!');
		return false;
	}
	if((document.getElementById("txtUpdYOB").value > getFullYear()) || (document.getElementById("txtUpdYOB").value<1000))
	{
		alert('Please enter correctYear of birth!');
		return false;
	}
	if($('input[name=rdUpdGender]:radio:checked').val() == undefined)
	{
		alert('Please enter Gender!');
		return false;
	}
	if($('input[name=rdUpdSmoker]:radio:checked').val() == undefined)
	{
		alert('Please enter if Smoker!');
		return false;
	}
	if($('input[name=rdUpdDrinker]:radio:checked').val() == undefined)
	{
		alert('Please enter if Drinker!');
		return false;
	}
	if($('input[name=rdUpdRCDriver]:radio:checked').val() == undefined)
	{
		alert('Please enter if Race Car Driver!');
		return false;
	}
	if($('input[name=rdUpdBeenArrested]:radio:checked').val() == undefined)
	{
		alert('Please enter BeenArrested!');
		return false;
	}
	if($('input[name=rdUpdVolvoDriver]:radio:checked').val() == undefined)
	{
		alert('Please enter if Volvo Driver!');
		return false;
	}
	if($('input[name=rdUpdChessClubMember]:radio:checked').val() == undefined)
	{
		alert('Please enter if ChessClubMember!');
		return false;
	}
	return true;
}

function getXMLDataForUpdateApp() {
	if(validateBeforeUpdate() == false)
		return null;
	var app_id = document.getElementById("txtUpdAppID").value;
	var first_name = document.getElementById("txtUpdGivenName").value;
	var last_name = document.getElementById("txtUpdFamilyName").value;
	var dob = document.getElementById("txtUpdYOB").value;
	var gender = $('input[name=rdUpdGender]:radio:checked').val();
	var industry = document.getElementById("selUpdIndustry").value;
	var title = document.getElementById("selUpdTitle").value;
	var salary_band = document.getElementById("selUpdSalary").value;
	var salary_band_currency = document.getElementById("txtUpdFamilyName").value;
	var smoker = $('input[name=rdUpdSmoker]:radio:checked').val();
	var drinker = $('input[name=rdUpdDrinker]:radio:checked').val();
	var race_driver = $('input[name=rdUpdRCDriver]:radio:checked').val();
	var arrested = $('input[name=rdUpdBeenArrested]:radio:checked').val();
	var volvo_driver = $('input[name=rdUpdVolvoDriver]:radio:checked').val();
	var chess_club_member = $('input[name=rdUpdChessClubMember]:radio:checked').val();
	try{
		var msg = "<xml>"+
						"<app_id>" + app_id + "</app_id>"+
						"<app_data>" +
							"<first_name>" + first_name + "</first_name>" +
							"<last_name>" + last_name + "</last_name>" +
							"<dob>" + dob + "</dob>" +
							"<gender>" + gender + "</gender>" +
							"<industry>" + industry + "</industry>" +
							"<title>" + title + "</title>" +
							"<salary_band>" + salary_band + "</salary_band>" +
							"<salary_band_currency>" + salary_band_currency + "</salary_band_currency>" +
							"<smoker>" + smoker + "</smoker>" +
							"<drinker>" + drinker + "</drinker>" +
							"<race_driver>" + race_driver + "</race_driver>" +
							"<arrested>" + arrested + "</arrested>" +
							"<volvo_driver>" + volvo_driver + "</volvo_driver>" +
							"<chess_club_member>" + chess_club_member + "</chess_club_member>" +
						"</app_data>" +
					  "</xml>";
	} catch(error)
	{
		alert(error.message);
    return null;
	}
	return msg;
}
