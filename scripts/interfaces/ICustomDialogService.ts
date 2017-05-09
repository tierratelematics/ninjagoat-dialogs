import DialogStatus from "../DialogStatus";

interface ICustomDialogService {
    display<TData>(key: string, data: TData, message: string, title?: string): Promise<DialogStatus>;
}

export default ICustomDialogService