import {IPromise} from "rx";
import DialogStatus from "../DialogStatus";

interface ICustomDialogService {
    display(key:string, data:any, message:string, title?:string):IPromise<DialogStatus>;
}

export default ICustomDialogService