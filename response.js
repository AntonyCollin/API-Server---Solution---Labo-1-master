/////////////////////////////////////////////////////////////////////
// This module define the http Response class
/////////////////////////////////////////////////////////////////////
// Author : Nicolas Chourot
// Lionel-Groulx College
/////////////////////////////////////////////////////////////////////

module.exports =
    class Response {
        constructor(HttpContext) {
            this.HttpContext = HttpContext;
            this.res = HttpContext.res;
        }
        status(number) {
            this.res.writeHead(number, { 'content-type': 'text/plain' });
            this.end();
        }
        end(content = null) {
            if (content)
                this.res.end(content);
            else
                this.res.end();
        }
        ok() {
            // ok status
            this.status(200);
        }
        accepted() {
            // accepted status
            this.status(202);
        }
        created(jsonObj) {
            this.res.writeHead(201, { 'content-type': 'application/json' });
            this.end(JSON.stringify(jsonObj));
        }
        JSON(jsonObj) {
            this.res.writeHead(200, { 'content-type': 'application/json' });
            if (jsonObj != null) {
                let content = JSON.stringify(jsonObj);
                this.end(content);
            } else {
                this.end();
            }
        }
        HTML(content) {
            this.content('text/html', content);
        }
        content(contentType, content) {
            this.res.writeHead(200, { 'content-type': contentType });
            this.end(content);
        }
        noContent() {
            // no content status
            this.status(204);
            this.clearCache();
        }
        notFound() {
            // not found status
            this.status(404);
        }
        forbidden() {
            // forbidden status
            this.status(403);
        }
        unAuthorized() {
            // forbidden status
            this.status(401);
        }
        notAloud() {
            // Method not aloud status
            this.status(405);
        }
        conflict() {
            // Conflict status
            this.status(409);
        }
        unsupported() {
            // Unsupported Media Type status
            this.status(415);
        }
        unprocessable() {
            // Unprocessable Entity status
            this.status(422);
        }
        badRequest() {
            // bad request status
            this.status(400);
        }
        internalError() {
            // internal error status
            this.status(500);
        }
        notImplemented() {
            //Not implemented
            this.status(501);
        }
    }