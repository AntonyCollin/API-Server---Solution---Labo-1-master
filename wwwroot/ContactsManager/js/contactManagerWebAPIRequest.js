/*
    Méthodes d'accès aux services Web API ContactsManager
 */

//const apiBaseURL= "http://localhost:5000/api/Contacts";
const apiBaseURL = "https://api-server-beta.glitch.me/api/contacts";

function webAPI_getContacts(successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL,
        type: 'GET',
        contentType: 'text/plain',
        data: {},
        success: contacts => {
            successCallBack(contacts);
            console.log("webAPI_getContacts - success");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack("Erreur " + jqXHR.status);
            console.log("webAPI_getContact - error");
        }
    });
}

function webAPI_getContact(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + id,
        type: 'GET',
        contentType: 'text/plain',
        data: {},
        success: contact => { successCallBack(contact); console.log("webAPI_getContact - success"); },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack("Erreur " + jqXHR.status);
            console.log("webAPI_getContact - error");
        }
    });
}

function webAPI_addContact(contact, successCallBack, errorCallBack) {
    console.log('add', contact)
    $.ajax({
        url: apiBaseURL,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(contact),
        success: () => { successCallBack(); console.log("webAPI_addContact - success"); },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            errorCallBack("Erreur " + jqXHR.status);
            console.log("webAPI_addContact - error");
        }
    });
}

function webAPI_modifyContact(contact, successCallBack, errorCallBack) {
    console.log('modify', contact)
    $.ajax({
        url: apiBaseURL + "/" + contact.Id,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(contact),
        success: () => { successCallBack(); console.log("webAPI_modifyContact - success"); },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack("Erreur " + jqXHR.status);
            console.log("webAPI_modifyContact - error");
        }
    });
}

function webAPI_deleteContact(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + id,
        contentType: 'text/plain',
        type: 'DELETE',
        success: () => { successCallBack(); console.log("webAPI_deleteContact - success"); },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack("Erreur " + jqXHR.status);
            console.log("webAPI_deleteContact - error");
        }
    });
}
