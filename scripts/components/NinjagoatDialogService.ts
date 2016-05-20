import IDialogService from "../interfaces/IDialogService";
import DialogStatus from "../DialogStatus";
import * as Rx from "rx";
import * as Promise from "bluebird";
import {DialogConfig, DialogType} from "../DialogConfig";

class NinjagoatDialogService implements IDialogService, Rx.IObservable<DialogConfig> {

    private subject = new Rx.Subject<DialogConfig>();
    private observable:Rx.IObservable<DialogStatus>;

    observe(observable:Rx.IObservable<DialogStatus>) {
        this.observable = observable;
    }

    alert(message:string, title?:string):Rx.IPromise<DialogStatus> {
        return this.setupDialog(DialogType.Alert, message, title);
    }

    confirm(message:string, title?:string):Rx.IPromise<DialogStatus> {
        return this.setupDialog(DialogType.Confirm, message, title);
    }

    display(key:string, message:string, title?:string):Rx.IPromise<DialogStatus> {
        throw new Error("Not implemented");
    }

    private setupDialog(type:DialogType, message:string, title?:string):Rx.IPromise<DialogStatus> {
        let config = new DialogConfig(type, message);
        config.title = title;
        config.open = true;
        this.subject.onNext(config);
        return new Promise((resolve, reject) => {
            if (this.observable)
                this.observable.subscribe(status => resolve(status));
            else
                reject(new Error("An observable must be provided in order to listen for dialog actions"));
        });
    }

    subscribe(observer:Rx.IObserver<DialogConfig>):Rx.IDisposable
    subscribe(onNext?:(value:DialogConfig) => void, onError?:(exception:any) => void, onCompleted?:() => void):Rx.IDisposable
    subscribe(observerOrOnNext?:(Rx.IObserver<DialogConfig>) | ((value:DialogConfig) => void), onError?:(exception:any) => void, onCompleted?:() => void):Rx.IDisposable {
        if (isObserver(observerOrOnNext))
            return this.subject.subscribe(observerOrOnNext);
        else
            return this.subject.subscribe(observerOrOnNext, onError, onCompleted);
    }
}

function isObserver<T>(observerOrOnNext:(Rx.IObserver<T>) | ((value:T) => void)):observerOrOnNext is Rx.IObserver<T> {
    return (<Rx.IObserver<T>>observerOrOnNext).onNext !== undefined;
}

export default NinjagoatDialogService