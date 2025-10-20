// Copyright (C) 2020 John Nesky, distributed under the MIT license.

import { HTML } from "imperative-html/dist/esm/elements-strict";
import { Prompt } from "./Prompt";
import { SongDocument } from "./SongDocument";

//namespace beepbox {
const { button, div, input, h2, /*h3*/ } = HTML;

export class BackDropPrompt implements Prompt {
	public static backdropfilter = "";
	public static backdropopacity = "";
	public static active = false;

	private readonly _backdropopacityInputBox: HTMLInputElement = input({ style: "width: 4em; font-size: 80%", id: "backdropopacityInputBox", type: "number", step: "0.05", min: 0, max: 1, value: "0" });
	private readonly _backdropblurInputBox: HTMLInputElement = input({ style: "width: 4em; font-size: 80%", id: "backdropblurInputBox", type: "number", step: "1", min: 0, max: 20, value: "0" });
	private readonly _backdropbrightnessInputBox: HTMLInputElement = input({ style: "width: 4em; font-size: 80%", id: "backdropbrightnessInputBox", type: "number", step: "0.1", min: 0, max: 1, value: "0" });

	private readonly _cancelButton: HTMLButtonElement = button({ class: "cancelButton" });
	private readonly _okayButton: HTMLButtonElement = button({ class: "okayButton", style: "width:45%;" }, "Okay");

	public readonly container: HTMLDivElement = div({ class: "prompt noSelection", style: "width: 300px;" },
		h2("Customize Backdrop"),
		div({ style: "display: flex; flex-direction: row; align-items: center; height: 2em; justify-content: flex-end;" },
			div({style: "display: flex"},
				div("Blur"),
			div({ class: "selectContainer", style: "width: 100%;" }, this._backdropblurInputBox),
			)
		),
		div({ style: "display: flex; flex-direction: row; align-items: center; height: 2em; justify-content: flex-end;" },
			div({ style: "display: flex" },
				div("Brightness"),
				div({ class: "selectContainer", style: "width: 100%;" }, this._backdropbrightnessInputBox),
			)
		),
		div({ style: "display: flex; flex-direction: row; align-items: center; height: 2em; justify-content: flex-end;" },
			div({ style: "display: flex" },
				div("Opacity"),
				div({ class: "selectContainer", style: "width: 100%;" }, this._backdropopacityInputBox),
			)
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
		BackDropPrompt.backdropfilter = "brightness" + `(${this._backdropbrightnessInputBox.value})` + " " + "blur" + `(${this._backdropblurInputBox.value}px)`;
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
