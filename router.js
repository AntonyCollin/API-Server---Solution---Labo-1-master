/////////////////////////////////////////////////////////////////////
// This module define routers middlewares
/////////////////////////////////////////////////////////////////////
// Author : Nicolas Chourot
// Lionel-Groulx College
/////////////////////////////////////////////////////////////////////
exports.API_EndPoint = function (HttpContext) {
    return new Promise(async (resolve) => {
        if (!HttpContext.path.isAPI) {
            resolve(false);
        } else {
            let controllerName = HttpContext.path.controllerName;
            let id = HttpContext.path.id;
            if (controllerName != undefined) {
                try {
                    // dynamically import the targeted controller
                    // if the controllerName does not exist the catch section will be called
                    const Controller = require('./controllers/' + controllerName);
                    // instanciate the controller       
                    let controller = new Controller(HttpContext);
                    switch (HttpContext.req.method) {
                        case 'HEAD':
                            controller.head();
                            resolve(true);
                            break;
                        case 'GET':
                            controller.get(id);
                            resolve(true);
                            break;
                        case 'POST':
                            if (HttpContext.payload)
                                controller.post(HttpContext.payload);
                            else
                                HttpContext.response.unsupported();
                            resolve(true);
                            break;
                        case 'PUT':
                            if (HttpContext.payload)
                                controller.put(HttpContext.payload);
                            else
                                HttpContext.response.unsupported();
                            resolve(true);
                            break;
                        case 'DELETE':
                            controller.remove(id);
                            resolve(true);
                            break;
                        default:
                            HttpContext.response.notImplemented();
                            resolve(true);
                            break;
                    }
                } catch (error) {
                    log(FgRed, "API_EndPoint Error message: \n", error.message);
                    log(FgRed, "Stack: \n", error.stack);
                    HttpContext.response.notFound();
                    resolve(true);
                }
            } else {
                // not an API endpoint
                // must be handled by another middleware
                resolve(false);
            }
        }
    });
}