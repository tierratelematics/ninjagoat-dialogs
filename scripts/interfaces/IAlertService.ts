import DialogStatus from "../DialogStatus";

interface IAlertService {
    alert(message:string, title?:string):Promise<DialogStatus>;
}

export default IAlertService