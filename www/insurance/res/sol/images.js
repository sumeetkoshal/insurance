////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Solace Systems Messaging SDK for JavaScript
// Copyright 2015-2016 Solace Systems Inc. All rights reserved.
// http://www.SolaceSystems.com
//
//                              * images.js *
//
// This JavaScript:
//  - provides functionality to upload images in binary format to Solace.
//  - Receiving image upload status with callbacks
//
// This script is invoked by wrapper methods from GUI based applications, and correspondingly calls them back upon receiving messages
// from its event callbacks
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



var id_file_data = null;
var edu_file_data = null;
var arrest_file_data = null;
var car_file_data = null;

var upd_id_file_data = null;
var upd_edu_file_data = null;
var upd_arrest_file_data = null;
var upd_car_file_data = null;

function sendBinaryData(topic, payload) {
	sendBinaryRequest(topic, payload);
}

function sendImageData(app_id)
{
	if(id_file_data != null)
	{
		sendBinaryData("solins/req/attach/new/id_file_data/" + app_id, id_file_data);
	}
	if(edu_file_data != null)
	{
		sendBinaryData("solins/req/attach/new/edu_file_data/" + app_id, edu_file_data);
	}
	if(arrest_file_data != null)
	{
		sendBinaryData("solins/req/attach/new/arrest_file_data/" + app_id, arrest_file_data);
	}
	if(car_file_data != null)
	{
		sendBinaryData("solins/req/attach/new/car_file_data/" + app_id, car_file_data);
	}

	id_file_data = null;
	edu_file_data = null;
	arrest_file_data = null;
	car_file_data = null;

}


function sendUpdatedImageData(app_id)
{
	if(upd_id_file_data != null)
	{
		sendBinaryData("solins/req/attach/update/id_file_data/" + app_id, upd_id_file_data);
	}
	if(upd_edu_file_data != null)
	{
		sendBinaryData("solins/req/attach/update/edu_file_data/" + app_id, upd_edu_file_data);
	}
	if(upd_arrest_file_data != null)
	{
		sendBinaryData("solins/req/attach/update/arrest_file_data/" + app_id, upd_arrest_file_data);
	}
	if(upd_car_file_data != null)
	{
		sendBinaryData("solins/req/attach/update/car_file_data/" + app_id, upd_car_file_data);
	}

	upd_id_file_data = null;
	upd_edu_file_data = null;
	upd_arrest_file_data = null;
	upd_car_file_data = null;

}

function _arrayBufferToBase64( buffer ) {
    var binary = ''
    var bytes = new Uint8Array( buffer )
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] )
    }
    return window.btoa( binary );
}

window.onload = function() {
		id_file_data = null;
		edu_file_data = null;
		arrest_file_data = null;
		car_file_data = null;

		var fileLicenseInput = document.getElementById('fileLicense');
		var fileEducationRecordInput = document.getElementById('fileEducationRecord');
		var fileArrestRecordInput = document.getElementById('fileArrestRecord');
		var fileCarPhotoInput = document.getElementById('fileCarPhoto');

		var fileUpdLicenseInput = document.getElementById('fileUpdLicense');
		var fileUpdEducationRecordInput = document.getElementById('fileUpdEducationRecord');
		var fileUpdArrestRecordInput = document.getElementById('fileUpdArrestRecord');
		var fileUpdCarPhotoInput = document.getElementById('fileUpdCarPhoto');

		fileLicenseInput.addEventListener('change', function(e) {
			document.getElementById('new_ic_image_status').src = "./img/uploading.gif";
			var fileL = fileLicenseInput.files[0];

			if (fileL.type.match(/image.*/)) {
				var readerL = new FileReader();

				readerL.onload = function(e) {
					id_file_data = _arrayBufferToBase64(readerL.result);
					document.getElementById('new_ic_image_status').src = "./img/done.png";
				}

				readerL.readAsArrayBuffer(fileL);
			} else {
				//fileDisplayArea.innerHTML = "File not supported!";
			}
		});

		fileEducationRecordInput.addEventListener('change', function(e) {
			document.getElementById('new_er_image_status').src = "./img/uploading.gif";

			var fileER = fileEducationRecordInput.files[0];

			if (fileER.type.match(/image.*/)) {
				var readerER = new FileReader();

				readerER.onload = function(e) {
					edu_file_data = _arrayBufferToBase64(readerER.result);
					document.getElementById('new_er_image_status').src = "./img/done.png";
				}

				readerER.readAsArrayBuffer(fileER);
			} else {
				//fileDisplayArea.innerHTML = "File not supported!";
			}
		});

		fileArrestRecordInput.addEventListener('change', function(e) {
			document.getElementById('new_ar_image_status').src = "./img/uploading.gif";
			var fileAR = fileArrestRecordInput.files[0];

			if (fileAR.type.match(/image.*/)) {
				var readerAR = new FileReader();

				readerAR.onload = function(e) {
					arrest_file_data = _arrayBufferToBase64(readerAR.result);
					document.getElementById('new_ar_image_status').src = "./img/done.png";
				}

				readerAR.readAsArrayBuffer(fileAR);
			} else {
				//fileDisplayArea.innerHTML = "File not supported!";
			}
		});

		fileCarPhotoInput.addEventListener('change', function(e) {
			document.getElementById('new_cp_image_status').src = "./img/uploading.gif";
			var fileCP = fileCarPhotoInput.files[0];

			if (fileCP.type.match(/image.*/)) {
				var readerCP = new FileReader();

				readerCP.onload = function(e) {
					car_file_data = _arrayBufferToBase64(readerCP.result);
					document.getElementById('new_cp_image_status').src = "./img/done.png";
				}

				readerCP.readAsArrayBuffer(fileCP);
			} else {
				//fileDisplayArea.innerHTML = "File not supported!";
			}
		});

		fileUpdLicenseInput.addEventListener('change', function(e) {
			document.getElementById('upd_ic_image_status').src = "./img/uploading.gif";
			var fileUpdL = fileUpdLicenseInput.files[0];

			if (fileUpdL.type.match(/image.*/)) {
				var readerUpdL = new FileReader();

				readerUpdL.onload = function(e) {
					upd_id_file_data = _arrayBufferToBase64(readerUpdL.result);
					document.getElementById('upd_ic_image_status').src = "./img/done.png";
				}

				readerUpdL.readAsArrayBuffer(fileUpdL);
			} else {
				//fileDisplayArea.innerHTML = "File not supported!";
			}
		});

		fileUpdEducationRecordInput.addEventListener('change', function(e) {
			document.getElementById('upd_er_image_status').src = "./img/uploading.gif";

			var fileUpdER = fileUpdEducationRecordInput.files[0];

			if (fileUpdER.type.match(/image.*/)) {
				var readerUpdER = new FileReader();

				readerUpdER.onload = function(e) {
					upd_edu_file_data = _arrayBufferToBase64(readerUpdER.result);
					document.getElementById('upd_er_image_status').src = "./img/done.png";
				}

				readerUpdER.readAsArrayBuffer(fileUpdER);
			} else {
				//fileDisplayArea.innerHTML = "File not supported!";
			}
		});

		fileUpdArrestRecordInput.addEventListener('change', function(e) {
			document.getElementById('upd_ar_image_status').src = "./img/uploading.gif";
			var fileUpdAR = fileUpdArrestRecordInput.files[0];

			if (fileUpdAR.type.match(/image.*/)) {
				var readerUpdAR = new FileReader();

				readerUpdAR.onload = function(e) {
					upd_arrest_file_data = _arrayBufferToBase64(readerUpdAR.result);
					document.getElementById('upd_ar_image_status').src = "./img/done.png";
				}

				readerUpdAR.readAsArrayBuffer(fileUpdAR);
			} else {
				//fileDisplayArea.innerHTML = "File not supported!";
			}
		});

		fileUpdCarPhotoInput.addEventListener('change', function(e) {
			document.getElementById('upd_cp_image_status').src = "./img/uploading.gif";
			var fileUpdCP = fileUpdCarPhotoInput.files[0];

			if (fileUpdCP.type.match(/image.*/)) {
				var readerUpdCP = new FileReader();

				readerUpdCP.onload = function(e) {
					upd_car_file_data = _arrayBufferToBase64(readerUpdCP.result);
					document.getElementById('upd_cp_image_status').src = "./img/done.png";
				}

				readerUpdCP.readAsArrayBuffer(fileUpdCP);
			} else {
				//fileDisplayArea.innerHTML = "File not supported!";
			}
		});


}

function resetImageLoadingStatus()
{
	document.getElementById('new_ic_image_status').src = "";
	document.getElementById('new_er_image_status').src = "";
	document.getElementById('new_ar_image_status').src = "";
	document.getElementById('new_cp_image_status').src = "";
}

function resetUpdImageLoadingStatus()
{
	document.getElementById('upd_ic_image_status').src = "";
	document.getElementById('upd_er_image_status').src = "";
	document.getElementById('upd_ar_image_status').src = "";
	document.getElementById('upd_cp_image_status').src = "";
}
