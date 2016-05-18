/// <reference path="../typings/index.d.ts" />

import {IPromise} from "rx";
import {IModule} from "ninjagoat";
import {IKernelModule} from "inversify";
import {IViewModelRegistry} from "ninjagoat";
import {IServiceLocator} from "ninjagoat";

declare module NinjagoatDialogs {

    export enum DialogStatus {
        Confirmed,
        Rejected,
        Cancelled
    }

    export interface IDialogService extends IAlertService, IConfirmationService, ICustomDialogService {

    }

    export interface IAlertService {
        alert(message:string, title?:string):IPromise<DialogStatus>;
    }

    export interface IConfirmationService {
        confirm(message:string, title?:string):IPromise<DialogStatus>;
    }

    export interface ICustomDialogService {
        display(key:string, message:string, title?:string):IPromise<DialogStatus>;
    }

    export class SimpleDialogService implements IDialogService {

        alert(message:string, title?:string):Rx.IPromise<DialogStatus>;

        confirm(message:string, title?:string):Rx.IPromise<DialogStatus>;

        display(key:string, message:string, title?:string):Rx.IPromise<DialogStatus>;
    }

    export class DialogsModule implements IModule {

        modules:IKernelModule;

        register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void;
    }
}

export = NinjagoatDialogs;