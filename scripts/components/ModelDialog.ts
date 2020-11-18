import DialogViewModel from "./DialogViewModel";
import CustomDialog from "./CustomDialog";
import ObservableViewModel from "ninjagoat/dist/observable/ObservableViewModel";

export default class ModelDialog<T extends (DialogViewModel | ObservableViewModel<any>)> extends CustomDialog<T> {
    public viewmodel: T = this.props.dialog.data;

    componentWillMount() {
        this.setupPage(this.props);
    }

    componentWillReceiveProps(props: any) {
        // Check if viewmodel changed
        if (props.dialog.data !== this.viewmodel) {
            this.viewmodel.dispose();
            this.setupPage(props);
        }
    }

    componentWillUnmount() {
        if (this.viewmodel) this.viewmodel.dispose();
    }

    setupPage(props: any) {
        this.viewmodel = props.dialog.data;
        this.setState(props.dialog.data);
        this.viewmodel.subscribe(() => this.setState(this.viewmodel));
    }
}
