export class DialogConfig<T> {
    open:boolean;
    type:DialogType;
    key:string;
    message:string;
    title:string;
    data:any;

    constructor(type:DialogType, message:string) {
        this.type = type;
        this.message = message;
    }
}

export enum DialogType {
    Alert,
    Confirm,
    Custom
}