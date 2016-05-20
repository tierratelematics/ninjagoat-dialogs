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
        return (
            <Modal show={this.state.open} onHide={this.closeDialog.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.message}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.closeDialog.bind(this)}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    private closeDialog() {
        this.setState(_.merge(this.state, {open: false}));
        this.subject.onNext(DialogStatus.Confirmed);
    }

    componentWillMount():void {
        this.props.dialogService.subscribe(config => this.setState(config));
        this.props.dialogService.observe(this.subject);
    }
}

export default NinjagoatDialog