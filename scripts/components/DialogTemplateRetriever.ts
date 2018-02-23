import { inject, injectable, interfaces } from "inversify";

import { IDialogTemplateRetriever } from "../interfaces/IDialogTemplateRetriever";
import CustomDialog from "./CustomDialog";

@injectable()
export class DialogTemplateRetriever implements IDialogTemplateRetriever {
    constructor(@inject("Container") private container: interfaces.Container) {
    }

    of(key: string): interfaces.Newable<CustomDialog<any>> {
        return this.container.getNamed<interfaces.Newable<CustomDialog<any>>>("DialogTemplate", key);
    }
}