import { readFile } from "fs/promises";
import { argv } from 'process';


// ifi instant function invocation
(async () => {
    try {
        const data = await readFile(argv[2],'utf8');
        console.log(data.split(/\r?\n/).length);
    } catch (err) {
        console.error(`err : ${err}`);
    }
})();

readFile(argv[2],'utf8') 
    .then(data => {
        console.log(data.split(/\r?\n/).length);
    })
    .catch(err => {
        console.error(`err : ${err}`);
    });

let file = await readFile(argv[2],'utf8');
console.log(file.split(/\r?\n/).length);