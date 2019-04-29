import {IViewModel} from "ninjagoat";
import {injectable} from "inversify";
import {Observer, Subject, Subscription} from "rxjs";

@injectable()
class DialogViewModel implements IViewModel<void> {
    "force nominal type for IViewModel": void;

    private subject = new Subject<void>();

    subscribe(observer: Observer<void>): Subscription;
    subscribe(onNext?: (value: void) => void, onError?: (exception: any) => void, onCompleted?: () => void): Subscription;
    subscribe(observerOrOnNext?: (Observer<void>) | ((value: void) => void), onError?: (exception: any) => void, onCompleted?: () => void): Subscription {
        if (isObserver(observerOrOnNext))
            return this.subject.subscribe(observerOrOnNext);
        else
            return this.subject.subscribe(observerOrOnNext, onError, onCompleted);
    }

    protected onError(error: any) {
        this.subject.error(error);
    }

    dispose(): void {
        this.subject.complete();
    }

    private notifyChanged() {
        this.subject.next(undefined);
    }
}

function isObserver<T>(observerOrOnNext: (Observer<T>) | ((value: T) => void)): observerOrOnNext is Observer<T> {
    return (<Observer<T>>observerOrOnNext).next !== undefined;
}

export default DialogViewModel;
