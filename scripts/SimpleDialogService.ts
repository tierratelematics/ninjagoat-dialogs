import IDialogService from "./interfaces/IDialogService";
import DialogStatus from "./DialogStatus";
import { injectable } from "inversify";

@injectable()
class SimpleDialogService implements IDialogService {

    alert(message: string, title?: string): Promise<DialogStatus> {
        return new Promise<DialogStatus>(resolve => {
            alert(message);
            resolve(DialogStatus.Confirmed);
        });
    }

    confirm(message: string, title?: string): Promise<DialogStatus> {
        return new Promise<DialogStatus>(resolve => {
            if (confirm(message)) resolve(DialogStatus.Confirmed);
            else resolve(DialogStatus.Rejected);
        });
    }

    display<TData>(key: string, data: TData, message: string, title?: string): Promise<DialogStatus> {
        throw new Error("Not implemented");
    }

}

export default SimpleDialogService;
