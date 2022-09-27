const ContactModel = require('../models/contact');
const Repository = require('../models/repository');
module.exports =
    class ContactsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext, new Repository(new ContactModel()));
        }

    }