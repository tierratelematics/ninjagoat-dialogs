import IDialogService from "../interfaces/IDialogService";
import DialogStatus from "../DialogStatus";
import {DialogConfig, DialogType} from "../DialogConfig";
import {injectable} from "inversify";
import {Observable, Observer, Subject, Subscribable, Subscription} from "rxjs";
import {IDisposable} from "ninjagoat/dist/viewmodels/IDisposable";

@injectable()
class NinjagoatDialogService implements IDialogService, Subscribable<DialogConfig<any>>, IDisposable {

    private subject = new Subject<DialogConfig<any>>();
    private subscription: Subscription = new Subscription();
    private observable: Observable<DialogStatus>;

    observe(observable: Observable<DialogStatus>) {
        this.observable = observable;
    }

    alert(message: string, title?: string): Promise<DialogStatus> {
        return this.setupDialog(DialogType.Alert, message, title);
    }

    confirm(message: string, title?: string): Promise<DialogStatus> {
        return this.setupDialog(DialogType.Confirm, message, title);
    }

    display<TData>(key: string, data: TData, message: string, title?: string): Promise<DialogStatus> {
        return this.setupDialog(DialogType.Custom, message, title, data, key);
    }

    private setupDialog(type: DialogType, message: string, title?: string, data?: any, key?: string): Promise<DialogStatus> {
        let config = new DialogConfig<any>(type, message);
        config.title = title;
        config.open = true;
        config.data = data;
        config.key = key;
        this.subject.next(config);
        return new Promise((resolve, reject) => {
            if (this.observable)
                this.subscription.add(this.observable.subscribe(status => resolve(status)));
            else
                reject(new Error("An observable must be provided in order to listen for dialog actions"));
        });
    }

    dispose(): void {
        this.subscription.unsubscribe();
        this.subscription = new Subscription();
    }

    subscribe(observer: Observer<DialogConfig<any>>): Subscription;
    subscribe(onNext?: (value: DialogConfig<any>) => void, onError?: (exception: any) => void, onCompleted?: () => void): Subscription;
    subscribe(observerOrOnNext?: (Observer<DialogConfig<any>>) | ((value: DialogConfig<any>) => void), onError?: (exception: any) => void, onCompleted?: () => void): Subscription {
        if (isObserver(observerOrOnNext))
            return this.subject.subscribe(observerOrOnNext);
        else
            return this.subject.subscribe(observerOrOnNext, onError, onCompleted);
    }
}

function isObserver<T>(observerOrOnNext: (Observer<T>) | ((value: T) => void)): observerOrOnNext is Observer<T> {
    return (<Observer<T>>observerOrOnNext).next !== undefined;
}

export default NinjagoatDialogService;
