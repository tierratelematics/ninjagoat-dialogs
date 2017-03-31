import * as React from "react";
import {Modal} from "react-bootstrap";
import NinjagoatDialogService from "./NinjagoatDialogService";
import * as Rx from "rx";
import DialogStatus from "../DialogStatus";
import {DialogConfig, DialogType} from "../DialogConfig";
import {Button} from "react-bootstrap";
import IStatusUpdate from "../interfaces/IStatusUpdate";
import CustomDialog from "./CustomDialog";
import {Dictionary, lazyInject} from "ninjagoat";
import * as _ from "lodash";
import {interfaces} from "inversify";

class NinjagoatDialog extends React.Component<{ templates?:Dictionary<interfaces.Newable<CustomDialog<any>>> }, DialogConfig<any>> implements IStatusUpdate {

    @lazyInject("IDialogService")
    private dialogService:NinjagoatDialogService;
    private subscription:Rx.Disposable;
    private subject = new Rx.Subject<DialogStatus>();

    constructor(props:{ templates?:Dictionary<interfaces.Newable<CustomDialog<any>>> }) {
        super(props);
        this.state = new DialogConfig<any>(DialogType.Alert, "");
    }

    render() {
        let template;
        if (this.state.key) {
            let Dialog = this.props.templates[this.state.key];
            template = <Dialog dialog={this.state} status={this}/>;
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
        this.subscription = this.dialogService.subscribe(config => this.setState(config));
        this.dialogService.observe(this.subject);
    }

    componentWillUnmount():void {
        if (this.subscription) this.subscription.dispose();
        this.dialogService.dispose();
    }
}

export default NinjagoatDialog