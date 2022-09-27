/*
    Méthodes d'accès aux services Web API BookmarksManager
 */

const apiBaseURL= "http://localhost:5000/api/Bookmarks";

function webAPI_getBookmarks(successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL,
        type: 'GET',
        contentType: 'text/plain',
        data: {},
        success: bookmarks => {
            successCallBack(bookmarks);
            console.log("webAPI_getBookmarks - success");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack("Erreur " + jqXHR.status);
            console.log("webAPI_getBookmark - error");
        }
    });
}

function webAPI_getBookmark(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + id,
        type: 'GET',
        contentType: 'text/plain',
        data: {},
        success: bookmark => { successCallBack(bookmark); console.log("webAPI_getBookmark - success"); },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack("Erreur " + jqXHR.status);
            console.log("webAPI_getBookmark - error");
        }
    });
}

function webAPI_addBookmark(bookmark, successCallBack, errorCallBack) {
    console.log('add', bookmark)
    $.ajax({
        url: apiBaseURL,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(bookmark),
        success: () => { successCallBack(); console.log("webAPI_addBookmark - success"); },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            errorCallBack("Erreur " + jqXHR.status);
            console.log("webAPI_addBookmark - error");
        }
    });
}

function webAPI_modifyBookmark(bookmark, successCallBack, errorCallBack) {
    console.log('modify', bookmark)
    $.ajax({
        url: apiBaseURL + "/" + bookmark.Id,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(bookmark),
        success: () => { successCallBack(); console.log("webAPI_modifyBookmark - success"); },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack("Erreur " + jqXHR.status);
            console.log("webAPI_modifyBookmark - error");
        }
    });
}

function webAPI_deleteBookmark(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + id,
        contentType: 'text/plain',
        type: 'DELETE',
        success: () => { successCallBack(); console.log("webAPI_deleteBookmark - success"); },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack("Erreur " + jqXHR.status);
            console.log("webAPI_deleteBookmark - error");
        }
    });
}
