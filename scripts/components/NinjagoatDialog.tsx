import * as React from "react";
import NinjagoatDialogService from "./NinjagoatDialogService";
import DialogStatus from "../DialogStatus";
import {DialogConfig, DialogType} from "../DialogConfig";
import IStatusUpdate from "../interfaces/IStatusUpdate";
import {lazyInject} from "ninjagoat";
import * as _ from "lodash";
import {IDialogTemplateRetriever} from "../interfaces/IDialogTemplateRetriever";
import {Subject, Subscription} from "rxjs";

class NinjagoatDialog extends React.Component<{}, DialogConfig<any>> implements IStatusUpdate {

    @lazyInject("IDialogService")
    private dialogService:NinjagoatDialogService;
    @lazyInject("IDialogTemplateRetriever")
    private dialogTemplateRetriever:IDialogTemplateRetriever;
    private subscription: Subscription;
    private subject = new Subject<DialogStatus>();

    constructor(props: {}) {
        super(props);
        this.state = new DialogConfig<any>(DialogType.Alert, "");
    }

    render() {
        if (this.state.key && this.state.open) {
            let Dialog = this.dialogTemplateRetriever.of(this.state.key);
            return <Dialog dialog={this.state} status={this}/>;
        } else {
            return <div></div>;
        }
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
        this.subject.next(status);
    }

    componentWillMount():void {
        this.subscription = this.dialogService.subscribe(config => this.setState(config));
        this.dialogService.observe(this.subject);
    }

    componentWillUnmount():void {
        if (this.subscription) this.subscription.unsubscribe();
        this.dialogService.dispose();
    }
}

export default NinjagoatDialog;
