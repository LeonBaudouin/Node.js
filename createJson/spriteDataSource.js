const fs = require("fs");

let output = {"frames" : []};

const fileHeight = 2176;
const fileWidth = 2176;

const spriteSize = 128;

for (let j = 0; j < fileHeight / spriteSize; j ++) {
    for (let i = 0; i < fileWidth / spriteSize; i ++) {
        output["frames"].push({
            "filename": `inputs_sprite${j%3}.png`,
            "frame": {
                "x": i * spriteSize,
                "y": j * spriteSize,
                "w": spriteSize,
                "h": spriteSize,
            },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": {"x":0,"y":0,"w":spriteSize,"h":spriteSize},
            "sourceSize": {"w":spriteSize,"h":spriteSize},
            "pivot": {"x":0.5,"y":0.5}
        })
    }
}
console.log(output["frames"].length)
fs.writeFile("./createJson/spriteDataSource.json", JSON.stringify(output), (err) => {
    if (err) throw err;
});