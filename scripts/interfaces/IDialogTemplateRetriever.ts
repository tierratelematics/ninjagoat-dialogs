import CustomDialog from "../components/CustomDialog";
import {interfaces} from "inversify";

export interface IDialogTemplateRetriever {
    of(key: string): interfaces.Newable<CustomDialog<any>>;
}