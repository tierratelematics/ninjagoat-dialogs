import "reflect-metadata";
import expect = require("expect.js");
import NinjagoatDialogService from "../scripts/components/NinjagoatDialogService";
import DialogStatus from "../scripts/DialogStatus";
import {DialogConfig, DialogType} from "../scripts/DialogConfig";
import {of} from "rxjs";

describe("DialogService, given a dialog", () => {

    let subject: NinjagoatDialogService,
        notifications: DialogConfig<any>[];

    beforeEach(() => {
        notifications = [];
        subject = new NinjagoatDialogService();
        subject.subscribe(config => notifications.push(config));
    });

    context("when an alert box must be displayed", () => {
        it("should display the correct type of dialog", () => {
            subject.alert("Test message");
            let config = notifications[0];
            expect(config.open).to.be(true);
            expect(config.type).to.be(DialogType.Alert);
            expect(config.message).to.be("Test message");
        });
    });

    context("when a confirmation box must be displayed", () => {
        it("should display the correct type of dialog", () => {
            subject.confirm("Test message", "Title");
            let config = notifications[0];
            expect(config.open).to.be(true);
            expect(config.type).to.be(DialogType.Confirm);
            expect(config.message).to.be("Test message");
            expect(config.title).to.be("Title");
        });
    });

    context("after an action has been performed on it", () => {
        it("should send back the result", async() => {
            subject.observe(of(DialogStatus.Confirmed));
            let status = await subject.alert("Test message");
            expect(status).to.be(DialogStatus.Confirmed);
        });

        context("but there's no observable registered on the dialog service", () => {
            it("should throw an error", (done) => {
                subject.alert("Test message").catch(error => done());
            });
        });
    });
});
