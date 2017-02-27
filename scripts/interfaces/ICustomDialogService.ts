import DialogStatus from "../DialogStatus";

interface ICustomDialogService {
    display(key:string, data:any, message:string, title?:string):Promise<DialogStatus>;
}

export default ICustomDialogService