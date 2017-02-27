import DialogStatus from "../DialogStatus";

interface IConfirmationService {
    confirm(message:string,  title?:string):Promise<DialogStatus>;
}

export default IConfirmationService