import * as Rx from "rx";
import {IViewModel} from "ninjagoat";
import {injectable} from "inversify";

@injectable()
class DialogViewModel implements IViewModel<void> {
    "force nominal type for IViewModel": void;

    private subject = new Rx.Subject<void>();

    subscribe(observer: Rx.IObserver<void>): Rx.IDisposable
    subscribe(onNext?: (value: void) => void, onError?: (exception: any) => void, onCompleted?: () => void): Rx.IDisposable
    subscribe(observerOrOnNext?: (Rx.IObserver<void>) | ((value: void) => void), onError?: (exception: any) => void, onCompleted?: () => void): Rx.IDisposable {
        if (isObserver(observerOrOnNext))
            return this.subject.subscribe(observerOrOnNext);
        else
            return this.subject.subscribe(observerOrOnNext, onError, onCompleted);
    }

    protected onError(error: any) {
        this.subject.onError(error);
    }

    dispose(): void {
        this.subject.onCompleted();
    }

    private notifyChanged() {
        this.subject.onNext(undefined);
    }
}

function isObserver<T>(observerOrOnNext: (Rx.IObserver<T>) | ((value: T) => void)): observerOrOnNext is Rx.IObserver<T> {
    return (<Rx.IObserver<T>>observerOrOnNext).onNext !== undefined;
}

export default DialogViewModel;
