import * as React from "react";
import {Modal} from "react-bootstrap";
import NinjagoatDialogService from "./NinjagoatDialogService";
import * as Rx from "rx";
import DialogStatus from "../DialogStatus";
import {DialogConfig, DialogType} from "../DialogConfig";
import {Button} from "react-bootstrap";
import IStatusUpdate from "../interfaces/IStatusUpdate";
import CustomDialog from "./CustomDialog";
import {Dictionary} from "ninjagoat";

class NinjagoatDialog extends React.Component<{ dialogService:NinjagoatDialogService, templates?:Dictionary<new() => CustomDialog<any>> }, DialogConfig<any>> implements IStatusUpdate {

    subject = new Rx.Subject<DialogStatus>();

    constructor(props:{ dialogService:NinjagoatDialogService }) {
        super(props);
        this.state = new DialogConfig<any>(DialogType.Alert, "");
    }

    render() {
        let template;
        if (this.state.key) {
            let Dialog = this.props.templates[this.state.key];
            template = <Dialog dialog={this.state} status={this} />;
        } else {
            template = <Modal show={this.state.open} onHide={this.cancel.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.message}
                </Modal.Body>
                <Modal.Footer>
                    { this.state.type === DialogType.Alert
                        ?  <Button onClick={this.confirm.bind(this)}>Ok</Button>
                        : <div><Button onClick={this.confirm.bind(this)}>Yes</Button>
                        <Button onClick={this.reject.bind(this)}>No</Button></div>
                    }
                </Modal.Footer>
            </Modal>;
        }
        return <div>{template}</div>;
    }

    confirm() {
        this.closeDialog(DialogStatus.Confirmed);
    }

    reject() {
        this.closeDialog(DialogStatus.Rejected);
    }

    cancel() {
        this.closeDialog(DialogStatus.Cancelled);
    }

    private closeDialog(status:DialogStatus) {
        this.setState(_.merge(this.state, {open: false}));
        this.subject.onNext(status);
    }

    componentWillMount():void {
        this.props.dialogService.subscribe(config => this.setState(config));
        this.props.dialogService.observe(this.subject);
    }
}

export default NinjagoatDialog