/////////////////////////////////////////////////////////////////////
// This module define the base Controller class of all controllers.
/////////////////////////////////////////////////////////////////////
// Important note about derived controllers class:
// They must respect pluralize convention:
// RessourceNamesController in order to have proper routing
/////////////////////////////////////////////////////////////////////
// Author : Nicolas Chourot
// Lionel-Groulx College
/////////////////////////////////////////////////////////////////////
module.exports =
    class Controller {
        constructor(HttpContext, repository = null) {
            this.HttpContext = HttpContext;
            this.repository = repository;
        }
        head() {
            this.HttpContext.response.notImplemented();
        }
        get(id) {
            if (this.repository != null) {
                if (!isNaN(id)) {
                    let data = this.repository.get(id);
                    if (data != null)
                        this.HttpContext.response.JSON(data);
                    else
                        this.HttpContext.response.notFound();
                }
                else
                    this.HttpContext.response.JSON(this.repository.getAll(this.HttpContext.path.params));
            }
            else
                this.HttpContext.response.notImplemented();
        }
        post(data) {
            if (this.repository != null) {
                data = this.repository.add(data);
                if (data) {
                    if (data.conflict)
                        this.HttpContext.response.conflict();
                    else
                        this.HttpContext.response.created(data);
                } else
                    this.HttpContext.response.unprocessable();
            } else
                this.HttpContext.response.notImplemented();
        }
        put(data) {
            if (this.repository != null) {
                let updateResult = this.repository.update(data);
                if (updateResult == this.repository.updateResult.ok)
                    this.HttpContext.response.ok();
                else
                    if (updateResult == this.repository.updateResult.conflict)
                        this.HttpContext.response.conflict();
                    else
                        if (updateResult == this.repository.updateResult.notfound)
                            this.HttpContext.response.notFound();
                        else // this.repository.updateResult.invalid
                            this.HttpContext.response.unprocessable();
            } else
                this.HttpContext.response.notImplemented();
        }
        remove(id) {
            if (this.repository != null) {
                if (this.repository.remove(id))
                    this.HttpContext.response.accepted();
                else
                    this.HttpContext.response.notFound();
            } else
                this.HttpContext.response.notImplemented();
        }
    }
