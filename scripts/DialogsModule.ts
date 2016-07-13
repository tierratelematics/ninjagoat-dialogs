import {IModule} from "ninjagoat";
import {IKernel, IKernelModule} from "inversify";
import IDialogService from "./interfaces/IDialogService";
import {IViewModelRegistry} from "ninjagoat";
import {IServiceLocator} from "ninjagoat";
import NinjagoatDialogService from "./components/NinjagoatDialogService";

class DialogsModule implements IModule {

    modules:IKernelModule = (kernel:IKernel) => {
        kernel.bind<IDialogService>("IDialogService").to(NinjagoatDialogService).inSingletonScope();
    };

    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void {

    }
}

export default DialogsModule;
