import { HTML} from "imperative-html/dist/esm/elements-strict";
import { SongDocument } from "./SongDocument";

const { div, input, button, a, h2 } = HTML;

// @TODO:
// - Check for duplicate sample URLs and names.
// - Maybe the Backwards checkbox should be a select as well? Right now though,
//   assuming that false is the same as if it wasn't actually set should work
//   fine.
// - Use constants or an enum for the key-value pairs.

export class AddCoverArtPrompt {

    private _doc: SongDocument;

    private readonly _cancelButton: HTMLButtonElement = button({ class: "cancelButton" });
    private readonly _okayButton: HTMLButtonElement = button({ class: "okayButton", style: "width: 45%;" }, "Okay");
    private readonly _enteredCoverArt: HTMLInputElement = input({ class: "addCoverArt", style: "width: 650%; max-height: 100px; margin: 10px", maxlength: "400", type: "text",})
    private readonly _instructionsLink: HTMLAnchorElement = a({ href: "#" }, "2012 youtube tutorial on how to use this menu");
    private readonly _description: HTMLDivElement = div(
        div({ style: "margin-bottom: 0.5em;" },
            this._instructionsLink,
        )
    );
    private readonly _closeInstructionsButton: HTMLButtonElement = button({ style: "height: auto; min-height: var(--button-size); width: 100%;" }, "Close instructions");
    private readonly _instructionsArea: HTMLDivElement = div(
        { style: "display: none; margin-top: 0; -webkit-user-select: text; -moz-user-select: text; -ms-user-select: text; user-select: text; cursor: text; overflow-y: auto;" },
        h2("Add Cover Art"),
        div({ style: "margin-top: 0.5em; margin-bottom: 0.5em;" },
            "Cover Arts are just images taken from a url, preferabbly file garden.",
        ),
        div({ style: "margin-top: 0.5em; margin-bottom: 0.5em;" },
            "Blah Blah Blah all the same nuances as sample adding",
        ),
        div({ style: "margin-top: 0.5em; margin-bottom: 1em;" },
            "Don't forget- You can only use one cover art per song!",
        ),
        div({ style: "display: flex; flex-direction: row-reverse; justify-content: space-between; margin-top: 0.5em;" }, this._closeInstructionsButton)
    );
    private readonly _addCoverArtArea: HTMLDivElement = div({ style: "overflow-y: auto;" },
        h2("Add Cover Art"),
        div({ style: "display: flex; flex-direction: column; align-items: center; margin-bottom: 0.5em;" },
            this._description,
            div({ style: "width: 100%; max-height: 450px; overflow-y: scroll;" }, this._enteredCoverArt),
        ),
        div({ style: "display: flex; flex-direction: row-reverse; justify-content: space-between;" }, this._okayButton)
    );
    public container: HTMLDivElement = div({ class: "prompt noSelection", style: "width: 450px; max-height: calc(100% - 100px);" },
        this._addCoverArtArea,
        this._instructionsArea,
        this._cancelButton
    );

    constructor(_doc: SongDocument) {
        this._doc = _doc;
        this._okayButton.addEventListener("click", this._saveChanges);
        this._cancelButton.addEventListener("click", this._close);
        this._instructionsLink.addEventListener("click", this._whenInstructionsLinkClicked);
        this._closeInstructionsButton.addEventListener("click", this._whenCloseInstructionsButtonClicked);
    }

    public cleanUp = (): void => {
        this._okayButton.removeEventListener("click", this._saveChanges);
        this._cancelButton.removeEventListener("click", this._close);
        this._instructionsLink.removeEventListener("click", this._whenInstructionsLinkClicked);
        this._closeInstructionsButton.removeEventListener("click", this._whenCloseInstructionsButtonClicked);
    }

    private _close = (): void => {
        this._doc.undo();
        this._doc.prompt = null;
    }

    private _saveChanges = (): void => {
        if (this._enteredCoverArt.value != null) {
            document.getElementById("CoverArtContainer")!.style.backgroundImage = `url(${this._enteredCoverArt.value})`
            document.getElementById("CoverArtContainer")!.innerHTML = "";
        } else {
            document.getElementById("CoverArtContainer")!.innerHTML = "Add Cover Art Here!";
        };
        this._close();
    }

    private _whenInstructionsLinkClicked = (event: Event): void => {
        event.preventDefault();
        this._addCoverArtArea.style.display = "none";
        this._instructionsArea.style.display = "";
    }

    private _whenCloseInstructionsButtonClicked = (event: Event): void => {
        this._addCoverArtArea.style.display = "";
        this._instructionsArea.style.display = "none";
    }
}