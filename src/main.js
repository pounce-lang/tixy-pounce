import repl from './pounceEnv.js';

// Add event listener for code-mini-golf input
const myPounceProgramEle = document.getElementById("user-pl");
// const exampleSelectEle = document.getElementById("example");

const initProgram = decodeURI(location.hash.substr(1));
let pounceProgram = initProgram ? initProgram : '7.5 x - 8 /';
let logLevel = 0;

myPounceProgramEle.addEventListener("keyup", (e) => {
    if (e.target.value !== pounceProgram) {
        pounceProgram = e.target.value;
        repl(pounceProgram, logLevel);
    }
    if (e.key == 'Enter') {
        location.hash = encodeURI(pounceProgram);
    }
}, false);

myPounceProgramEle.value = pounceProgram;

myPounceProgramEle.focus();

repl(pounceProgram, logLevel);