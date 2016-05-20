import {IModule} from "ninjagoat";
import {IKernel, IKernelModule} from "inversify";
import IDialogService from "./interfaces/IDialogService";
import SimpleDialogService from "./SimpleDialogService";
import {IViewModelRegistry} from "ninjagoat";
import {IServiceLocator} from "ninjagoat";

class DialogsModule implements IModule {

    modules:IKernelModule = (kernel:IKernel) => {
        kernel.bind<IDialogService>("IDialogService").to(SimpleDialogService).inSingletonScope();
    };

    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void {

    }
}

export default DialogsModule;
