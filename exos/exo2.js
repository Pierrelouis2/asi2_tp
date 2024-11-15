import {argv} from 'process';

let sum = 0;
argv.forEach((val) => {
    if (val % 1 === 0 ) {
        sum += parseInt(val);
    }
})
console.log(`${sum}`);
