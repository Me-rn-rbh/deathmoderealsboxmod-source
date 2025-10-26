// Copyright (C) 2020 John Nesky, distributed under the MIT license.

import { HTML } from "imperative-html/dist/esm/elements-strict";
import { Prompt } from "./Prompt";
import { SongDocument } from "./SongDocument";

//namespace beepbox {
const { button, div, input, h2, h3 } = HTML;

export class BackDropPrompt implements Prompt {
	public static backdropfilter = "";
	public static backdropopacity = "";
	public static active = false;

	private readonly _backdropopacityInputBox: HTMLInputElement = input({ style: "width: 6em; font-size: 80%", id: "backdropInputBox", type: "number", step: "0.05", min: 0, max: 1, value: "1" });
	private readonly _backdropblurInputBox: HTMLInputElement = input({ style: "width: 6em; font-size: 80%", id: "backdropInputBox", type: "number", step: "1", min: 0, max: 20, value: "0" });
	private readonly _backdropbrightnessInputBox: HTMLInputElement = input({ style: "width: 6em; font-size: 80%", id: "backdropInputBox", type: "number", step: "0.1", min: 0, max: 1, value: "1" });
	private readonly _backdropsaturationInputBox: HTMLInputElement = input({ style: "width: 6em; font-size: 80%", id: "backdropInputBox", type: "number", step: "1", min: 0, max: 20, value: "1" });
	private readonly _backdropinvertInputBox: HTMLInputElement = input({ style: "width: 6em; font-size: 80%", id: "backdropInputBox", type: "number", step: "1", min: 0, max: 100, value: "0" });
	private readonly _backdropgrayscaleInputBox: HTMLInputElement = input({ style: "width: 6em; font-size: 80%", id: "backdropInputBox", type: "number", step: "1", min: 0, max: 100, value: "0" });
	private readonly _backdropcontrastInputBox: HTMLInputElement = input({ style: "width: 6em; font-size: 80%", id: "backdropInputBox", type: "number", step: "1", min: 0, max: 200, value: "100" });
	private readonly _backdropsepiaInputBox: HTMLInputElement = input({ style: "width: 6em; font-size: 80%", id: "backdropInputBox", type: "number", step: "1", min: 0, max: 100, value: "0" });
	private readonly _backdrophueInputBox: HTMLInputElement = input({ style: "width: 6em; font-size: 80%", id: "backdropInputBox", type: "number", step: "1", min: 0, max: 360, value: "0" });

	private readonly _cancelButton: HTMLButtonElement = button({ class: "cancelButton" });
	private readonly _okayButton: HTMLButtonElement = button({ class: "okayButton", style: "width:45%;" }, "Okay");

	public readonly container: HTMLDivElement = div({ class: "prompt noSelection", style: "max-height: 400px;" },
		h2("Customize Backdrop"),
		div({ style: "display: flex; flex-direction: row"},
		div({ style: "display: flex; flex-direction: column; align-items: ; gap: 15px; border-size: 2px; border: double var(--ui-widget-background); border-radius: 10px; margin: 0 10px; padding: 5px" },
			h3({style: "width: 100px; overflow-x: wrap;"}, "Frosted Glass"),
			div({style: "display: table"},
				div("Blur (px)"),
			div({ class: "inputContainer", style: "width: 100%;" }, this._backdropblurInputBox),
			),
			div({ style: "display: table" },
				div("Brightness (0.0)"),
				div({ class: "inputContainer", style: "width: 100%;" }, this._backdropbrightnessInputBox),
			),
			div({ style: "display: table" },
				div("Opacity (0.0)"),
				div({ class: "inputContainer", style: "width: 100%;" }, this._backdropopacityInputBox),
			),
		),
		div({ style: "display: flex; flex-direction: column; align-items: center; gap: 15px; border-size: 2px; border: double var(--ui-widget-background); border-radius: 10px; margin: 0 10px; padding: 5px" },
			h3("Color"),
			div({ style: "display: table" },
				div("Saturation (0)"),
				div({ class: "inputContainer", style: "width: 100%;" }, this._backdropsaturationInputBox),
			),
			div({ style: "display: table" },
				div("Contrast (%)"),
				div({ class: "inputContainer", style: "width: 100%;" }, this._backdropcontrastInputBox),
			),
			div({ style: "display: table" },
				div("Hue (deg)"),
				div({ class: "inputContainer", style: "width: 100%;" }, this._backdrophueInputBox),
			),
		),
		div({ style: "display: flex; flex-direction: column; align-items: center; gap: 15px; border-size: 2px; border: double var(--ui-widget-background); border-radius: 10px; margin: 0 10px; padding: 5px" },
			h3("Filter"),
			div({ style: "display: table" },
				div("Color Inversion (%)"),
				div({ class: "inputContainer", style: "width: 100%;" }, this._backdropinvertInputBox),
			),
			div({ style: "display: table" },
				div("Grayscale (%)"),
				div({ class: "inputContainer", style: "width: 100%;" }, this._backdropgrayscaleInputBox),
			),
			div({ style: "display: table" },
				div("Sepia (%)"),
				div({ class: "inputContainer", style: "width: 100%;" }, this._backdropsepiaInputBox),
			),
		),
		),
		div({ style: "display: flex; flex-direction: row-reverse; justify-content: space-between;" },
			this._okayButton,
		),
		this._cancelButton,
	);

	constructor(private _doc: SongDocument) {
		this._okayButton.addEventListener("click", this._saveChanges);
		this._cancelButton.addEventListener("click", this._close);
		this.container.addEventListener("keydown", this._whenKeyPressed);
	}

	private _close = (): void => {
		this._doc.undo();
	}

	public cleanUp = (): void => {
		this._okayButton.removeEventListener("click", this._saveChanges);
		this._cancelButton.removeEventListener("click", this._close);
		this.container.removeEventListener("keydown", this._whenKeyPressed);
	}

	private _whenKeyPressed = (event: KeyboardEvent): void => {
		if ((<Element>event.target).tagName != "BUTTON" && event.keyCode == 13) { // Enter key
			this._saveChanges();
		}
	}

	private _saveChanges = (): void => {
		BackDropPrompt.backdropfilter = "brightness" + `(${this._backdropbrightnessInputBox.value})` + " " + "blur" + `(${this._backdropblurInputBox.value}px)` + " " + "saturate" + `(${this._backdropsaturationInputBox.value})` + " " + "invert" + `(${this._backdropinvertInputBox.value}%)` + " " + "contrast" + `(${this._backdropcontrastInputBox.value}%)` + " " + "grayscale" + `(${this._backdropgrayscaleInputBox.value}%)` + " " + "sepia" + `(${this._backdropsepiaInputBox.value}%)` + " " + "hue-rotate" + `(${this._backdrophueInputBox.value}deg)`;
		BackDropPrompt.backdropopacity = `${this._backdropopacityInputBox.value}`;
		if (this._doc.prefs.frostedopacity != BackDropPrompt.backdropopacity || this._doc.prefs.frostedfilter != BackDropPrompt.backdropfilter) {
			BackDropPrompt.active = true;
		} else if (this._doc.prefs.frostedopacity == BackDropPrompt.backdropopacity && this._doc.prefs.frostedfilter == BackDropPrompt.backdropfilter) {
			BackDropPrompt.active = false;
		}
		this._doc.prefs.frostedactive = BackDropPrompt.active;
		this._doc.prefs.frostedopacity = BackDropPrompt.backdropopacity;
		this._doc.prefs.frostedfilter = BackDropPrompt.backdropfilter;
		this._doc.prompt = null;
		this._doc.undo();
	}

}
//}
