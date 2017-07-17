import CustomDialog from "./CustomDialog";
import {interfaces, inject, injectable} from "inversify";
import {IDialogTemplateRetriever} from "../interfaces/IDialogTemplateRetriever";

@injectable()
export class DialogTemplateRetriever implements IDialogTemplateRetriever {
    constructor(@inject("Container") private container: interfaces.Container) {
    }

    of(key: string): interfaces.Newable<CustomDialog<any>> {
        return this.container.getNamed<interfaces.Newable<CustomDialog<any>>>("DialogTemplate", key);
    }
}