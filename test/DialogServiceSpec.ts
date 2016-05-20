import "reflect-metadata";
import "bluebird";
import expect = require("expect.js");
import sinon = require("sinon");
import Rx = require("rx");
import NinjagoatDialogService from "../scripts/components/NinjagoatDialogService";
import {DialogConfig, DialogType} from "../scripts/DialogConfig";

describe("DialogService, given a dialog", () => {

    let subject:NinjagoatDialogService,
        config:DialogConfig,
        notifications:void[];

    beforeEach(() => {
        notifications = [];
        config = new DialogConfig();
        subject = new NinjagoatDialogService(config);
        subject.subscribe(_ => notifications.push(null));
    });

    context("when an alert box must be displayed", () => {
        it("should display the correct type of dialog", () => {
            subject.alert("Test message");
            expect(config.open).to.be(true);
            expect(config.type).to.be(DialogType.Alert);
            expect(config.message).to.be("Test message");
        });
    });

    context("when a confirmation box must be displayed", () => {
        it("should display the correct type of dialog", () => {
            subject.confirm("Test message", "Title");
            expect(config.open).to.be(true);
            expect(config.type).to.be(DialogType.Confirm);
            expect(config.message).to.be("Test message");
            expect(config.title).to.be("Title");
        });
    });

    context("when a dialog must be displayed", () => {
        it("should notify that the underline config has been changed", () => {
            subject.confirm("Test message", "Title");
            expect(notifications).to.have.length(1);
        });
    });
});