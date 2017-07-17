import {IModule} from "ninjagoat";
import {interfaces} from "inversify";
import IDialogService from "./interfaces/IDialogService";
import {IViewModelRegistry} from "ninjagoat";
import {IServiceLocator} from "ninjagoat";
import NinjagoatDialogService from "./components/NinjagoatDialogService";
import {ITemplateRetriever} from "./interfaces/ITemplateRetriever";
import {TemplateRetriever} from "./components/TemplateRetriever";

class DialogsModule implements IModule {

    modules = (container:interfaces.Container) => {
        container.bind<IDialogService>("IDialogService").to(NinjagoatDialogService).inSingletonScope();
        container.bind<ITemplateRetriever>("ITemplateRetriever").to(TemplateRetriever).inSingletonScope();
    };

    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void {

    }
}

export default DialogsModule;
