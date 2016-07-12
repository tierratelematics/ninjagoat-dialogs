import IDialogService from "../interfaces/IDialogService";
import DialogStatus from "../DialogStatus";
import * as Rx from "rx";
import * as Promise from "bluebird";
import {DialogConfig, DialogType} from "../DialogConfig";
import {injectable} from "inversify";

@injectable()
class NinjagoatDialogService implements IDialogService, Rx.IObservable<DialogConfig<any>> {

    private subject = new Rx.Subject<DialogConfig<any>>();
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

    display(key:string, data:any, message:string, title?:string):Rx.IPromise<DialogStatus> {
        return this.setupDialog(DialogType.Custom, message, title, data, key);
    }

    private setupDialog(type:DialogType, message:string, title?:string, data?:any, key?:string):Rx.IPromise<DialogStatus> {
        let config = new DialogConfig<any>(type, message);
        config.title = title;
        config.open = true;
        config.data = data;
        config.key = key;
        this.subject.onNext(config);
        return new Promise((resolve, reject) => {
            if (this.observable)
                this.observable.subscribe(status => resolve(status));
            else
                reject(new Error("An observable must be provided in order to listen for dialog actions"));
        });
    }

    subscribe(observer:Rx.IObserver<DialogConfig<any>>):Rx.IDisposable
    subscribe(onNext?:(value:DialogConfig<any>) => void, onError?:(exception:any) => void, onCompleted?:() => void):Rx.IDisposable
    subscribe(observerOrOnNext?:(Rx.IObserver<DialogConfig<any>>) | ((value:DialogConfig<any>) => void), onError?:(exception:any) => void, onCompleted?:() => void):Rx.IDisposable {
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