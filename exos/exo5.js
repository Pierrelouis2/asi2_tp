import { extname } from "path";
import { readdir } from "fs";
import { argv } from "process";


let ext = argv[3];

readdir(argv[2], (err, files) => {
    if (err) {
        console.error(`err : ${err}`);
        return;
    }
    files.filter(f => !ext || extname(f) === ext)
    .forEach(f => console.log(f));
    });
