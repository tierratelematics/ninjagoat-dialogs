export class DialogConfig {
    open:boolean;
    type:DialogType;
    key:string;
    message:string;
    title:string;
}

export enum DialogType {
    Alert,
    Confirm,
    Custom
}