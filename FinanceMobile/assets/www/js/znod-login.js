/**
 * It is all about znod mobile login
 */
$(document).ready(function () {
    $("#pLogin").click(function () {
    	var User = "";
        try {
            var userId = $("#username").val();
            var pass = $("#password").val();
            if (userId != "" && pass != "") {
                var input = "{'userId' : '" + userId + "', 'pass' : '" + pass + "'}";
                var methodName = "userLogin";
                //Calling common method to get data from database
                var result = commonAjaxCall(methodName, input);
                alert("response-->"+result);
                if (result != "") {
                    User = eval("(" + result + ")");
                    window.sessionStorage.setItem('userKey', User.userKey);
                    window.sessionStorage.setItem('userName', User.userName);
                    window.sessionStorage.setItem('userRole', User.userRole);
                    window.sessionStorage.setItem('lastLogin', User.lastLogin);
                    isAuthenticated = true;
                    onReady();
                    //$.mobile.changePage( "#pLnEntry", "flip", true, false);
                    //return true;
                }
                else {
                    alert("Invalid username and password");
                    return false;
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
    });
}); 



var ServiceURL = "http://zn.cloudapp.net/serviceclient.asmx";
var isAuthenticated = false;

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
       return output;
    }
    catch (ex) {
        alert("[commonAjaxCall]" + ex);
    }
}