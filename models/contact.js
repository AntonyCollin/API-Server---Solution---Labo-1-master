const Model = require('./model');
module.exports =
    class Contact extends Model {
        constructor(name, phone, email) {
            super();
            this.Name = name !== undefined ? name : "";
            this.Phone = phone !== undefined ? phone : "";
            this.Email = email !== undefined ? email : "";

            this.setKey("Name");
            this.addValidator('Name', 'string');
            this.addValidator('Phone', 'phone');
            this.addValidator('Email', 'email');
        }
    }