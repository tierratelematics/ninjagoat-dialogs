import * as React from "react";
import {Modal} from "react-bootstrap";
import NinjagoatDialogService from "./NinjagoatDialogService";

class NinjagoatDialogComponent extends React.Component<{ dialogService:NinjagoatDialogService }, any> {

    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Text in a modal</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    componentWillMount():void {
        
    }

    componentWillReceiveProps(nextProps:{ dialogService:NinjagoatDialogService }, nextContext:any):void {

    }
}

export default NinjagoatDialogComponent