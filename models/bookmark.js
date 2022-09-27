const Model = require('./model');
module.exports =
    class Bookmark extends Model {
        constructor(title, url, category) {
            super();
            this.Title = title !== undefined ? title : "";
            this.Url = url !== undefined ? url : "";
            this.Category = category !== undefined ? category : "";

            this.setKey("Url");
            this.addValidator('Title', 'string');
            this.addValidator('Url', 'url');
            this.addValidator('Category', 'string');
        }
    }