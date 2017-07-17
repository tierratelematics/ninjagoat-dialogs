import CustomDialog from "../components/CustomDialog";
import {interfaces} from "inversify";

export interface ITemplateRetriever {
    of(key: string): interfaces.Newable<CustomDialog<any>>;
}