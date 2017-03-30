import {IObservable, IObserver, IDisposable} from "rx";
import {IModule} from "ninjagoat";
import {interfaces} from "inversify";
import {IViewModelRegistry} from "ninjagoat";
import {IServiceLocator} from "ninjagoat";
import * as React from "react";
import {Dictionary} from "ninjagoat";

export enum DialogStatus {
    Confirmed,
    Rejected,
    Cancelled
}

export interface IDialogService extends IAlertService, IConfirmationService, ICustomDialogService {

}

export interface IAlertService {
    alert(message: string, title?: string): Promise<DialogStatus>;
}

export interface IConfirmationService {
    confirm(message: string, title?: string): Promise<DialogStatus>;
}

export interface ICustomDialogService {
    display(key: string, data: any, message: string, title?: string): Promise<DialogStatus>;
}

export class SimpleDialogService implements IDialogService {

    alert(message: string, title?: string): Promise<DialogStatus>;

    confirm(message: string, title?: string): Promise<DialogStatus>;

    display(key: string, data: any, message: string, title?: string): Promise<DialogStatus>;
}

export class DialogsModule implements IModule {

    modules: (container: interfaces.Container) => void;

    register(registry: IViewModelRegistry, serviceLocator?: IServiceLocator, overrides?: any): void;
}

export class DialogConfig<T> {
    open: boolean;
    type: DialogType;
    key: string;
    message: string;
    title: string;
    data: T;

    constructor(type: DialogType, message: string);
}

declare enum DialogType {
    Alert,
    Confirm,
    Custom
}

export class NinjagoatDialog extends React.Component<{templates?: Dictionary<interfaces.Newable<CustomDialog<any>>>}, DialogConfig<any>> implements IStatusUpdate {
    confirm()

    reject()

    cancel()

    render();
}

export abstract class CustomDialog<T> extends React.Component<{dialog: DialogConfig<T>, status: IStatusUpdate}, any> {

}

export interface IStatusUpdate {
    confirm();
    reject();
    cancel();
}

export class NinjagoatDialogService implements IDialogService, IObservable<DialogConfig<any>> {

    observe(observable: IObservable<DialogStatus>);

    alert(message: string, title?: string): Promise<DialogStatus>;

    confirm(message: string, title?: string): Promise<DialogStatus>;

    display(key: string, data: any, message: string, title?: string): Promise<DialogStatus>;

    subscribe(observer: IObserver<DialogConfig<any>>): IDisposable
    subscribe(onNext?: (value: DialogConfig<any>) => void, onError?: (exception: any) => void, onCompleted?: () => void): IDisposable
    subscribe(observerOrOnNext?: (IObserver<DialogConfig<any>>) | ((value: DialogConfig<any>) => void), onError?: (exception: any) => void, onCompleted?: () => void): IDisposable;
}