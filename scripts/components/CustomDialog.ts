import {DialogConfig} from "../DialogConfig";
import * as React from "react";
import IStatusUpdate from "../interfaces/IStatusUpdate";

abstract class CustomDialog<T> extends React.Component<{ dialog:DialogConfig<T>, status:IStatusUpdate }, any> {

}

export default CustomDialog