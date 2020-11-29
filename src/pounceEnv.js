import { interpreter, parse, unParse } from '@pounce-lang/core';

// const stackEle = document.querySelector('#canvas');
let interp;
let nextPounceAst = null;
let compositions = [];
let processing = false;
const rows = 64;
const columns = 64;
const layers = 2
const off = 20;
const scale = 5;

// parse the Pounce program
export default function repl(pounceProgram, logLevel = 0) {
    nextPounceAst = parse(pounceProgram, {logLevel});
    if (nextPounceAst) {
        if (!processing) {
            processing = true;
            window.requestAnimationFrame(step);
        }
    }
};

const ctx = document.getElementById("output").getContext("2d");

const step = () => {
    ctx.fillStyle = " #615c57";
    ctx.fillRect(0, 0, 340, 340);
    for (var l = 0; l < layers; l++) {
        for (var x = 0; x < columns; x++) {
            for (var y = 0; y < rows; y++) {
                let dataPlusPounce = [...compositions, l, x, y, ['l', 'x', 'y'], nextPounceAst, 'pounce'];
                interp = interpreter(dataPlusPounce);
                let res = interp?.next?.();
                // responce expected [r g b alpha]
                let v = res?.value?.stack ?? [1, 0, 0, 1];
                // console.log(`rgba(${v[0]},${v[1]},${v[2]},${v[3]})`);
                ctx.fillStyle = `rgba(${v[0]*255},${v[1]*255},${v[2]*255},${v[3]})`;
                ctx.fillRect(x * scale + off, y * scale + off, scale, scale);
            }
        }
    }
    processing = false;
};

