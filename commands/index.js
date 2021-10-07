const Command = require("./commandConstructor");

let test = require("./test");
let day = require("./day");

const commands = [
    new Command("test","Hago una prueba de latencia.", test),
    new Command("day","Te mando el horario, porque no lo recuerdas...", day),
]

module.exports = commands;