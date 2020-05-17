const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const renderStyle = function (){
    return fs.readFileSync(path.resolve(templatesDir, "style.css"), "utf8")
}



module.exports = renderStyle