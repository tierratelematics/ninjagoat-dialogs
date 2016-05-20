import * as React from "react";
import {Modal} from "react-bootstrap";
import NinjagoatDialogService from "./NinjagoatDialogService";
import * as Rx from "rx";
import DialogStatus from "../DialogStatus";
import {DialogConfig, DialogType} from "../DialogConfig";
import {Button} from "react-bootstrap";

class NinjagoatDialog extends React.Component<{ dialogService:NinjagoatDialogService }, DialogConfig> {

    subject = new Rx.Subject<DialogStatus>();

    constructor(props:{ dialogService:NinjagoatDialogService }) {
        super(props);
        this.state = new DialogConfig(DialogType.Alert, "");
    }

    render() {
        let confirmButton = <Button onClick={this.confirmDialog.bind(this)}>Yes</Button>;
        let okButton = <Button onClick={this.confirmDialog.bind(this)}>Ok</Button>;
        let rejectButton = <Button onClick={this.rejectDialog.bind(this)}>No</Button>;
        let footer;
        if (this.state.type === DialogType.Alert)
            footer = <Modal.Footer>
                {okButton}
            </Modal.Footer>;
        else
            footer = <Modal.Footer>
                {confirmButton}
                {rejectButton}
            </Modal.Footer>;
        return (
            <Modal show={this.state.open} onHide={this.closeDialog.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.message}
                </Modal.Body>
                {footer}
            </Modal>
        )
    }

    private confirmDialog() {
        this.closeDialog(DialogStatus.Confirmed);
    }

    private rejectDialog() {
        this.closeDialog(DialogStatus.Rejected);
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