/// <reference path="../typings/index.d.ts" />

import {IPromise} from "rx";
import {IModule} from "ninjagoat";
import {IKernelModule} from "inversify";
import {IViewModelRegistry} from "ninjagoat";
import {IServiceLocator} from "ninjagoat";
import * as React from "react";

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

    class DialogConfig {
        open:boolean;
        type:DialogType;
        key:string;
        message:string;
        title:string;

        constructor(type, message);
    }

    enum DialogType {
        Alert,
        Confirm,
        Custom
    }

    export class NinjagoatDialog extends React.Component<{ dialogService:NinjagoatDialogService }, DialogConfig> {
        render();
    }

    export class NinjagoatDialogService implements IDialogService, Rx.IObservable<DialogConfig> {

        observe(observable:Rx.IObservable<DialogStatus>);

        alert(message:string, title?:string):Rx.IPromise<DialogStatus>;

        confirm(message:string, title?:string):Rx.IPromise<DialogStatus>;

        display(key:string, message:string, title?:string):Rx.IPromise<DialogStatus>;

        subscribe(observer:Rx.IObserver<DialogConfig>):Rx.IDisposable
        subscribe(onNext?:(value:DialogConfig) => void, onError?:(exception:any) => void, onCompleted?:() => void):Rx.IDisposable
        subscribe(observerOrOnNext?:(Rx.IObserver<DialogConfig>) | ((value:DialogConfig) => void), onError?:(exception:any) => void, onCompleted?:() => void):Rx.IDisposable;
    }

    interface RegistrationKeysStatic {
        Simple_Dialog:string;
    }

    export var RegistrationKeys:RegistrationKeysStatic;
}

export = NinjagoatDialogs;