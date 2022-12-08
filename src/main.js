import repl from './pounceEnv.js';

// Add event listener for code-mini-golf input
const myPounceProgramEle = document.getElementById("user-pl");
const exampleSelectEle = document.getElementById("examples");

const initProgram = decodeURI(location.hash.substring(1));
let pounceProgram = initProgram ? initProgram : 't 16 % 16 - y +';
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

exampleSelectEle.addEventListener("change", (e) => {
    pounceProgram = e.target.value;
    myPounceProgramEle.value = pounceProgram;
    myPounceProgramEle.focus();
    repl(pounceProgram, logLevel);
});

myPounceProgramEle.value = pounceProgram;

myPounceProgramEle.focus();

repl(pounceProgram, logLevel);