import { readFileSync,readFile } from "fs";
import {argv} from 'process';

console.log(readFileSync(argv[2]).toString()
    .split(/\r?\n/).length
);

readFile(argv[2],'utf8', (err, data) => {
    if (err) {
        console.error(`err : ${err}`);
        return;
    }
    console.log(data.split(/\r?\n/).length);
});

