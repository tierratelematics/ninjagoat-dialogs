import {IPromise} from "rx";
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
    alert(message: string, title?: string): IPromise<DialogStatus>;
}

export interface IConfirmationService {
    confirm(message: string, title?: string): IPromise<DialogStatus>;
}

export interface ICustomDialogService {
    display(key: string, data: any, message: string, title?: string): IPromise<DialogStatus>;
}

export class SimpleDialogService implements IDialogService {

    alert(message: string, title?: string): Rx.IPromise<DialogStatus>;

    confirm(message: string, title?: string): Rx.IPromise<DialogStatus>;

    display(key: string, data: any, message: string, title?: string): IPromise<DialogStatus>;
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

enum DialogType {
    Alert,
    Confirm,
    Custom
}

export class NinjagoatDialog extends React.Component<{dialogService: NinjagoatDialogService, templates?: Dictionary<new() => CustomDialog<any>>}, DialogConfig<any>> implements IStatusUpdate {
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

export class NinjagoatDialogService implements IDialogService, Rx.IObservable<DialogConfig<any>> {

    observe(observable: Rx.IObservable<DialogStatus>);

    alert(message: string, title?: string): Rx.IPromise<DialogStatus>;

    confirm(message: string, title?: string): Rx.IPromise<DialogStatus>;

    display(key: string, data: any, message: string, title?: string): Rx.IPromise<DialogStatus>;

    subscribe(observer: Rx.IObserver<DialogConfig<any>>): Rx.IDisposable
    subscribe(onNext?: (value: DialogConfig<any>) => void, onError?: (exception: any) => void, onCompleted?: () => void): Rx.IDisposable
    subscribe(observerOrOnNext?: (Rx.IObserver<DialogConfig<any>>) | ((value: DialogConfig<any>) => void), onError?: (exception: any) => void, onCompleted?: () => void): Rx.IDisposable;
}