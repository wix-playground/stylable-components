import {DriverBase} from "test-drive-react";
import {RadioButton, RadioGroup} from "../../src";

export class RadioGroupDriver extends DriverBase {
    public static ComponentClass = RadioGroup;

    public get items(): HTMLCollection {
        return this.root.children;
    }

    public getRadioButton(idx: number): RadioButtonDriver {
        return new RadioButtonDriver(() => this.select('RADIO_BUTTON_' + idx.toString()));
    }
}

export class RadioButtonDriver extends DriverBase {
    public static ComponentClass = RadioButton;

    public get nativeElement(): HTMLInputElement {
        return this.select('NATIVE_INPUT');
    }

    public isChecked(): boolean {
        return !!this.select('CHECKED_RADIO_ICON');
    }

    public isDisabled(): boolean {
        return this.nativeElement.disabled;
    }

    public isReadOnly(): boolean {
        return this.nativeElement.readOnly;
    }

    public get value(): string {
        return this.nativeElement.value;
    }

    public get name(): string {
        return this.nativeElement.name;
    }

    public get children(): Array<Node | null> {
        return Array.from(
            this.select('CONTENT_CONTAINER').childNodes
        ).filter((e, idx) => e.nodeType !== Node.COMMENT_NODE && idx !== 0);
    }

    public get icon(): SVGElement {
        return this.isChecked() ? this.select('CHECKED_RADIO_ICON') : this.select('UNCHECKED_RADIO_ICON');
    }

    public click(): void {
        (this.root as HTMLDivElement).click();
    }
}
