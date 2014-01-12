/**
 * It is all about znod mobile login
 */

//$(document).ready(function(){

function loadSelectCompany(){
	CallAppViewModel();
	// Activates knockout.js
	ko.applyBindings(new CallAppViewModel());
}
	function CallAppViewModel() {
		 var getCompany = getYourCompny();
		    availableCountries1 = ko.observableArray(ko.utils.parseJson(getCompany)); 
	}
	
function login() {
	var User = "";
        try {
            var userId = $("#username").val();
            var pass = $("#password").val();

            if (userId != "" && pass != "") {
                var input = "{'userId' : '" + userId + "', 'pass' : '" + pass + "'}";
                var methodName = "userLogin";
                //Calling common method to get data from database
                var result = commonAjaxCall(methodName, input);
                if (result != "") {
                    User = eval("(" + result + ")");
                    window.sessionStorage.setItem('userKey', User.userKey);
                    window.sessionStorage.setItem('userName', User.userName);
                    window.sessionStorage.setItem('userRole', User.userRole);
                    window.sessionStorage.setItem('lastLogin', User.lastLogin);
                    isAuthenticated = true;
                    //onReady();
                    //$.mobile.changePage( "#pLnEntry" , "flip", true, false);
                    loadSelectCompany();
                     // These are the initial options 
                    return true;
                }
                else {
                    alert("Invalid username and password");
                    return true;
                }
            }
            else {
                alert("Enter username and password");
                return false;
            }
        }
        catch (ex) {
            alert("[Login error]" + ex);
            return false;
        }
    }
    var ServiceURL = "http://znod.cloudapp.net/serviceclient.asmx";
    var isAuthenticated = false;

  
function getYourCompny(){
	var User1 = "";
    try {
            var input = "{'userKey' : '1'}";
            var methodName = "getUserCompanyRel";
            //Calling common method to get data from database
            var result1 = commonAjaxCall(methodName, input);
            //alert("response result-->"+result1);
            if (result1 != "") {
            		return result1;
            }
            else {
                alert("empty company");
                return false;
            }
    }
    catch (ex) {
        alert("[get user company error]" + ex);
        return false;
    }
}

function commonAjaxCall(methodName, input) {
	var output = "";
	try {
		jQuery.support.cors = true;
		$.ajax({
			type: "POST",
			data: input,
			contentType: "application/json; charset=utf-8",
			url: ServiceURL + "/" + methodName,
			dataType: "json",
			async: false,
			beforeSend: function (xhr) { xhr.withCredentials = true; },
			crossDomain: true,
			success: function (data) {
				if (data.d != "" && data.d != "null") {
					output = data.d;
					return data.d;
				}
			},
			error: function (xhr, status, err) {
				alert("Error occured in commonAjaxCall" + xhr.responseText);                
			}
		});
		//alert("output-->"+output);
		return output;
	}
	catch (ex) {
		alert("[commonAjaxCall]" + ex);
	}
}