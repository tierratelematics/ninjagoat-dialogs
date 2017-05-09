import DialogViewModel from "./DialogViewModel";
import CustomDialog from "./CustomDialog";

export default class ModelDialog<T extends DialogViewModel> extends CustomDialog<T> {
    public viewmodel: T = this.props.dialog.data;

    componentWillMount() {
        this.setupPage(this.props);
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
