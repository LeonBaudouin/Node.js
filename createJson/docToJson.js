let lineReader = require("line-reader");
let fs = require("fs");


let output = [];

lineReader.eachLine('./createJson/doc.txt', "utf8", (line, last) => {
    output.push(line.substring(
        line.lastIndexOf("\{") + 1, 
        line.lastIndexOf("\}")
    ))
    
    if(last) {
        console.log(output.length);
        fs.writeFile('./createJson/docJson.json', JSON.stringify(output), (err) => {
            if (err) throw err;
        })
    }
})