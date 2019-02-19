const fs = require("fs");
const xml2json = require("xml-js")

const XMLwords = fs.readFileSync("./words.json")

const accents = [
    "à",
    "â",
    "é",
    "è",
    "ê",
    "ë",
    "ï",
    "î",
    "ô",
    "û"
]

function wordFilter(word, index) {  
    const firstChar = word.charAt(0)

    const capitalize = firstChar === firstChar.toUpperCase()

    const within = word.length > 3 && word.length < 9

    const choosen = index%60 == 0


    return within && !capitalize && choosen && !hasAccents(word)
}

function hasAccents(word) {

    return accents.reduce((acc, accent) => acc || word.indexOf(accent) > -1, false)
}

const JSONwords = xml2json.xml2js(XMLwords, {compact: true, spaces: 4})

// const wordsArray = JSON.parse(words)
//                         .filter(wordFilter)

// fs.writeFileSync("./processedWords.json", JSON.stringify(wordsArray))
fs.writeFileSync("./processedWords.json", JSON.stringify(JSONwords))
