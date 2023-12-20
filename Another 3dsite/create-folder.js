const fs = require("fs");
fs.mkdirSync("test-folder"), function(err) {
    if (err) {
        console.trow(err);
    }
    console.log("Folder created successfully");
}