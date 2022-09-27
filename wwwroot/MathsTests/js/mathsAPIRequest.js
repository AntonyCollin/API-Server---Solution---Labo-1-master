const apiBaseURL = "/api/maths";
//const apiBaseURL = "https://kbg-serverapi.glitch.me/api/maths";

function webAPI_getMaths(host, queryString, successCallBack = null, errorCallBack = null) {
    return new Promise(resolve => {
        $.ajax({
            url: host + apiBaseURL + queryString,
            type: 'GET',
            
            success: mathsResult => {
                if (successCallBack != null)
                    successCallBack(mathsResult);
                console.log(mathsResult)
                resolve(true);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (errorCallBack != null)
                    errorCallBack(errorThrown);
                console.log("webAPI_getContacts - error");
                resolve(false);
            }
        });
    });
}