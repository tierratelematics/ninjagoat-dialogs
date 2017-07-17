import CustomDialog from "./CustomDialog";
import {interfaces, inject, injectable} from "inversify";
import {ITemplateRetriever} from "../interfaces/ITemplateRetriever";

@injectable()
export class TemplateRetriever implements ITemplateRetriever {
    constructor(@inject("Container") private container: interfaces.Container) {
    }

    of(key: string): interfaces.Newable<CustomDialog<any>> {
        return this.container.getNamed<interfaces.Newable<CustomDialog<any>>>("DialogTemplate", key);
    }
}