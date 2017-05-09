import "reflect-metadata";
import expect = require("expect.js");
import * as Rx from "rx";
import TestDialogViewModel from "./fixtures/TestDialogViewModel";

describe("DialogViewModel, given an instance", () => {

    let subject: TestDialogViewModel;
    let notifications: void[];
    let notificationError: any;
    let notificationsCompleted;
    let subscription: Rx.IDisposable;

    beforeEach(() => {
        notifications = [];
        subject = new TestDialogViewModel();
        subscription = subject.subscribe(_ => notifications.push(null), error => notificationError = error, () => notificationsCompleted = true);
    });

    context("when changing the underlying model", () => {
        it("should notify that a change occurred", () => { 
            subject.changeSomething();

            expect(notifications).to.not.empty();
        });
    });

    context("when triggering an error while changing the underlying model", () => {
        beforeEach(() => {
            subject.signalError();
        });

        it("should notify that an error occurred", () => {
            expect(notificationError).to.be("error!");
        });

        it("should not notify that a change occurred", () => {
            expect(notifications).to.be.empty();
        });
    });

    context("when disposing the model", () => {
        beforeEach(() => {
            subject.dispose();
        });

        it("should notify that a completion occurred", () => {
            expect(notificationsCompleted).to.be.ok();
        });

        it("should not notify that a change occurred", () => {
            expect(notifications).to.be.empty();
        });
    });
});
