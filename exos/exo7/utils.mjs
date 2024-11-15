import {readdir} from 'fs/promises';
import { extname } from 'path';
// ES6 class definition with the export default syntax
export default class Utils{
    static ls1(path,ext) {
        return readdir(path)
            .then(files => files.filter(f => !ext || extname(f) === ext))
            .catch(err => console.error(err));
    }

    static async ls2(path,ext){
        let files = await readdir(path)
        return files.filter(f => !ext || extname(f) === ext);
    }
}