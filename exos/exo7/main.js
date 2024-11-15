import Utils from "./utils.mjs";

Utils.ls1(process.argv[2], process.argv[3])
    .then(f => f.forEach(f => console.log(f)))

let files = await Utils.ls2(process.argv[2], process.argv[3]);
files.forEach(f => console.log(f));