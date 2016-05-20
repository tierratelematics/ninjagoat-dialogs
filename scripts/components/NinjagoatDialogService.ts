import IDialogService from "../interfaces/IDialogService";
import DialogStatus from "../DialogStatus";
import {ObservableViewModel} from "ninjagoat";
import {DialogConfig, DialogType} from "../DialogConfig";
import * as Rx from "rx";

class NinjagoatDialogService extends ObservableViewModel<DialogStatus> implements IDialogService {

    private observable:Rx.IObservable<DialogStatus>;

    constructor(private config:DialogConfig) {
        super();
    }

    observe(observable:Rx.IObservable<DialogStatus>) {
        this.observable = observable;
    }

    alert(message:string, title?:string):Rx.IPromise<DialogStatus> {
        this.setupDialog(DialogType.Alert, message, title);
        return undefined;
    }

    confirm(message:string, title?:string):Rx.IPromise<DialogStatus> {
        this.setupDialog(DialogType.Confirm, message, title);
        return undefined;
    }

    display(key:string, message:string, title?:string):Rx.IPromise<DialogStatus> {
        return undefined;
    }

    private setupDialog(type:DialogType, message:string, title?:string) {
        this.config.type = type;
        this.config.message = message;
        this.config.title = title;
        this.config.open = true;
        (<any>this).notifyChanged();
    }
}

export default NinjagoatDialogService