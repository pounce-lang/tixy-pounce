# A Quick Start Project for Pounce Programming
This is a starter kit that will let you start using the Pounce programming language embedded in a web page.
It uses the Pounce parser and interpreter from the npm package @pounce-lang/core.

(: [tl:dr preview this app](https://pounce-lang.github.io/simple-example-app/public/) :)

## Pounce is a Concatenative Language
More information on "What Pounce is?", can be found [here](https://github.com/pounce-lang/core, but in short: Pounce is a "concatenative" languages (as opposed to "applicative"). The term 'Concatenative' referrers to the process of composing (by concatenating) functions (called 'words') together into a program. To make the composition of words as easy as possible, Concatenative languages simply use the space between words as the composition operator. By placing one word after another you are composing functions. This leads to the natural use of post-fix notation. Yes post-fix notation seems backwards at first, but since function composition is the most essential operation, it makes what seemed backwards straight forward again. There are a few other distinguishing properties of this language, such as all values are stored on a stack. Stack-based languages do not have an assignment operator, so they cannot store values in variable, wow that is different! Storing values on a stack gives a nice property to all words: they take one argument (the stack) and return a new stack. Pounce may be the strangest and yet easiest language you will ever learn. The challenge will be letting go of your preconceived notions of what a programming language should look like and how to go about programming. Try the tutorial (sorry coming soon) at pounce-lang.org/tutorials or clone this repo and play with the examples.

## Getting started
First clone this repo.
``` shell
git clone @pounce-lang/simple-example-app
```

``` shell
cd pounce-lang/simple-example-app
```
Install it
``` shell
npm install
```

``` shell
npm run start
```

Next open a browser and try it out.
