////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Solace Systems Messaging SDK for JavaScript
// Copyright 2015-2016 Solace Systems Inc. All rights reserved.
// http://www.SolaceSystems.com
//
//                              * rest.js *
//
// This JavaScript:
//  - provides functionality to POST messages via REST to Solace.
//  - Receiving message sent status with callbacks
//
// This script is invoked by wrapper methods from GUI based applications, and correspondingly calls them back upon receiving messages
// from its event callbacks
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var xhttp = new XMLHttpRequest();
var xhttp_image = new XMLHttpRequest();
var url = "http://__IP:PORT__/";
var credentials = "Basic aW5zX3VzZXI6cGFzc3dvcmQ=";
var replyTimeout = "10000";

function onLoginResponseReceived() {
    if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
            logUtil("Login reply received" + xhttp.responseText);
            var text = xhttp.responseText;
          	var parser = new DOMParser();
          	var xmlDoc = parser.parseFromString(text,"text/xml");
            try {
                  var loginid = xmlDoc.getElementsByTagName("loginid")[0].childNodes[0].nodeValue;
                  var status = xmlDoc.getElementsByTagName("status")[0].childNodes[0].nodeValue;
                  var token = xmlDoc.getElementsByTagName("token")[0].childNodes[0].nodeValue;
                  onLoginResponse(loginid, status, token);
            } catch (error) {
                alert("In onLoginResponseReceived : Failed to parse login response: " + error.toString());
                logUtil(error.toString());
            }
        }
        else {
            logUtil("Login Request Failed " + xhttp.statusText);
            alert("Login Request Failed " + xhttp.statusText);
        }
        document.getElementById('processing_login').src = "";
    }
}

function createRequest(requestTopic, content_type) {
    try{
      xhttp.open("POST", url + requestTopic, true);
      xhttp.setRequestHeader("Content-Type", content_type);
      xhttp.setRequestHeader("Authorization",credentials);
      xhttp.setRequestHeader("Solace-Reply-Wait-Time-In-ms", replyTimeout);
    }
    catch(err) {
        alert(err.message);
        logUtil(err.message);
    }
}

function sendRequest(requestTopic, requestData, callBackFunction, content_type) {
    try{
          createRequest(requestTopic, content_type);
          xhttp.onreadystatechange = callBackFunction;
          xhttp.send(requestData);
    }
    catch(err) {
        alert(err.message);
        logUtil(err.message);
    }
}

function sendBinaryRequest(requestTopic, requestData) {
    try{
          xhttp_image.open("POST", url + requestTopic, true);
          xhttp_image.setRequestHeader("Content-Type", "application/octet-stream");
          xhttp_image.setRequestHeader("Authorization",credentials);
          //xhttp_image.onreadystatechange = callBackFunction;
          xhttp_image.send(requestData);
    }
    catch(err) {
        alert(err.message);
        logUtil(err.message);
    }
}

function sendLoginRequest() {
  if(document.getElementById("loginid").value == '')
  {
      alert('Please enter UserName!');
      return;
  }

	document.getElementById('processing_login').src = "./img/processing.gif";
	var loginid = document.getElementById("loginid").value;
	var requestData = "<xml>"+
				"<login>" + loginid + "</login>"+
				"<password>" + sha256_digest(document.getElementById("password").value) + "</password>" +
				"<host>" + url + "</host>" +
			  "</xml>";
    sendRequest("solins/req/login", requestData, onLoginResponseReceived, "text/xml");
}

function getXMLDataForSearchApp() {
    var first_name = document.getElementById("txtSearchName").value;
    var search_msg = "";
    try
    {
        search_msg = "<xml>"+
                        "<app_data>" +
                                "<first_name>" + first_name + "</first_name>" +
                        "</app_data>" +
                     "</xml>";
    } catch(error)
    {
        alert(error.message);
        return;
    }

    return search_msg;
}


function searchAppData()
{
    sendRequest("solins/req/app/search", getXMLDataForSearchApp(), onSearchResponseReceived, "text/xml");
}

function onSearchResponseReceived(message)
{
    logUtil("Login reply received");
    logUtil(xhttp.status);
    var records = null;
    var status = null;

    if (xhttp.readyState == 4 && xhttp.status == 200) {
        logUtil("Search reply received" + xhttp.responseText);
        var text = xhttp.responseText;
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(text,"text/xml");
        var innerHTML = '';
        try{
                var records = xmlDoc.getElementsByTagName("record");
                var status = xmlDoc.getElementsByTagName("status")[0].childNodes[0].nodeValue;
        } catch (error) {
            alert("Failed to parse search response");
            logUtil(error.toString());
        }
        if (records.length > 0)
        {
                document.getElementById("search_status").innerHTML = status;
                for (var rec_ctr = 0; rec_ctr < records.length; rec_ctr++)
                {
                        var recordNodes = records[rec_ctr];
                        if (recordNodes)
                        {
                                var app_id = $(recordNodes).find("app_id").text();
                                var first_name = $(recordNodes).find("first_name").text();
                                var last_name = $(recordNodes).find("last_name").text();
                                var rec = "['" + app_id + "', '" + first_name +
                                                        "', '" + last_name + "', '" + $(recordNodes).find("dob").text() +
                                                        "', '" + $(recordNodes).find("gender").text() + "', '" +
                                                        $(recordNodes).find("industry").text() + "', '" +
                                                        $(recordNodes).find("title").text() + "', '" +
                                                        $(recordNodes).find("salary_band").text() + "', '" +
                                                        $(recordNodes).find("smoker").text() + "', '" +
                                                        $(recordNodes).find("drinker").text() + "', '" +
                                                        $(recordNodes).find("race_driver").text() + "', '" +
                                                        $(recordNodes).find("arrested").text() + "', '" +
                                                        $(recordNodes).find("volvo_driver").text() + "', '" +
                                                        $(recordNodes).find("chess_club_member").text() + "', '" +
                                                        $(recordNodes).find("id_file_data").text() + "', '" +
                                                        $(recordNodes).find("edu_file_data").text() + "', '" +
                                                        $(recordNodes).find("car_file_data").text() + "', '" +
                                                        $(recordNodes).find("arrest_file_data").text() + "']";
                                innerHTML = innerHTML + '<li><a href="#" data-transition="slide" onclick="editApplicationData(' + rec + ');">' + first_name + ' ' + last_name + ' (ID :' + app_id + ')</a></li>';
                        }
                }
        }
        else
        {
                document.getElementById("search_status").innerHTML = "No records found...";
        }

        document.getElementById("addons-list").innerHTML = innerHTML;
        $('#addons-list').listview('refresh');
        //window.location="#addons";
    }
}

function sendAppData()
{
    var payload = getXMLDataForNewApp();
    if (payload != null) {
      sendRequest("solins/req/app/new", payload, onNewAppResponseReceived, "text/xml");
      document.getElementById('processing_new').src = "./img/processing.gif";
    }
}

function onNewAppResponseReceived(message)
{
    var records = null;
    var status = null;

    if (xhttp.readyState == 4 && xhttp.status == 200) {
        logUtil("Search reply received" + xhttp.responseText);
        var text = xhttp.responseText;
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(text,"text/xml");
        var innerHTML = '';
        try{
                var app_id = xmlDoc.getElementsByTagName("app_id")[0].childNodes[0].nodeValue;
                var status = xmlDoc.getElementsByTagName("status")[0].childNodes[0].nodeValue;
                document.getElementById('processing_new').src = "";
                sendImageData(app_id);
                $('#newAppForm')[0].reset();
                resetImageLoadingStatus();
                document.getElementById("uw_status").innerHTML = status;
                window.location="#save_result";
        } catch (error) {
            alert("Failed to parse New App response");
            logUtil(error.toString());
        }
    }

}


function sendUpdateData()
{
    var payload = getXMLDataForUpdateApp();
    if (payload != null) {
      sendRequest("solins/req/app/update", payload, onUpdAppResponseReceived, "text/xml");
      document.getElementById('processing_upd').src = "./img/processing.gif";
    }
}

function onUpdAppResponseReceived(message)
{
    var records = null;
    var status = null;

    if (xhttp.readyState == 4 && xhttp.status == 200) {
        alert("Update App response received");
        logUtil(xhttp.status);
        logUtil("Update App reply received" + xhttp.responseText);
        var text = xhttp.responseText;
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(text,"text/xml");
        var innerHTML = '';
        try{
                var app_id = xmlDoc.getElementsByTagName("app_id")[0].childNodes[0].nodeValue;
                var status = xmlDoc.getElementsByTagName("status")[0].childNodes[0].nodeValue;
                document.getElementById('processing_upd').src = "";
            	sendUpdatedImageData(app_id);
            	resetUpdImageLoadingStatus();
            	document.getElementById("uw_status").innerHTML = status;
            	searchAppData();
            	window.location="#search";
            	window.location="#save_result";
        } catch (error) {
            alert("Failed to parse Upd App response" + error.toString());
            logUtil(error.toString());
        }
    }

}
