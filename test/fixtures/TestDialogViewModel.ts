import DialogViewModel from "../../scripts/components/DialogViewModel";
import {Refresh} from "ninjagoat";

export default class TestDialogViewModel extends DialogViewModel {
    public state: number;

    public signalError() { 
        this.onError("error!");
    }

    @Refresh
    public changeSomething() {
        this.state = 42;
    }
}