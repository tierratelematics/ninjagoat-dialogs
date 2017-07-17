# Ninjagoat-dialogs

A module to display different kinds of dialogs inside a ninjagoat application, with the ability to supply custom templates to customize it even more.

## Installation

`
$ npm install ninjagoat-dialogs
`

Add this code to the bootstrapper.ts file:

```typescript
import {DialogsModule} from "ninjagoat-dialogs"

application.register(new DialogsModule());
```

Add a ninjagoat dialog to the Master view.

```typescript
import {NinjagoatDialog} from "ninjagoat-dialogs"

class MasterView extends View<MasterViewModel> {
    
    render() {
        <div>
            {this.props.children}
            <NinjagoatDialog />
        </div>
    }
}
```

## Usage

To use a confirm dialog you can just do something like this.

```typescript
import {IDialogService, DialogStatus} from "ninjagoat-dialogs";

let dialogService:IDialogService; //Inject it in a class

let status = await dialogService.confirm("Are you sure you want to do this?");
if (status === DialogStatus.Confirmed) {
    //Do the action
}
```

### Custom dialogs

To supply a custom dialog to the component write a class that extends CustomDialog.

```typescript
import {CustomDialog} from "ninjagoat-dialogs";
import {Modal} from "react-bootstrap";

class MyDialog extends CustomDialog<MyDialogModel> {

    render() {
        let status = this.props.status;
        let dialog = this.props.dialog;
        return (
            <Modal show={dialog.open} onHide={status.cancel.bind(this.props.status)}>
              //Build your UI here
            </Modal>
        );
    }
}
```

Register it in your module.

```typescript
this.container.bind<interfaces.Newable<CustomDialog<any>>>("DialogTemplate").toConstructor(MyDialog).whenTargetNamed("myDialog")
```

And use it!

```typescript
import {IDialogService, DialogStatus} from "ninjagoat-dialogs";

let dialogService:IDialogService; //Inject it in a class

let status = await dialogService.display("myDialog", customData, "Title");
if (status === DialogStatus.Confirmed) {
    //Do the action
}
```

## ViewModel Dialogs
If your dialog has some interaction that requires changes to be reflected on both the model and the UI you can use the ModelDialog class, which binds to a special kind of ViewModel named DialogViewModel.
In order to use it declare your model as a class extending from DialogViewModel, and use it as a standard ViewModel by applying the @Refresh decorator on it.

```typescript
class MyDialogViewModel extends DialogViewModel {
    public updates: number = 0;
     
    @Refresh
    public increment() {
        this.updates++;
    }
}
```
once defined your ViewModel you can use the ModelDialog class in order to implement your own Dialog view

```typescript
class MyDialog extends ModelDialog<MyDialogViewModel> {

    render() {
        let status = this.props.status;
        let dialog = this.props.dialog;
        return (
            <Modal show={dialog.open} onHide={status.cancel.bind(this.props.status)}>
              <div>{this.viewmodel.updates}</div>
              <button onClick={() => this.viewmodel.increment()}>Increment</button>
            </Modal>
        );
    }
}
```

## License

Copyright 2016 Tierra SpA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
