"use strict";

let displayColorPalette = false;
export default class Common {
  constructor() {
    this.addNotesBtn = document.getElementById("add-note-btn");
    this.addNotesHead = document.getElementById("add-note-head");
    this.addNotesBody = document.getElementById("add-note-body");

    this.notesContainer = document.getElementById("notes");
    this.notes = document.getElementsByClassName("note");

    this.colorPalette = document.getElementById("color-palette");
    this.addNoteWrapper = document.getElementById("add-note-wrapper");

    /* hide color palette if click ouside */
    document.onclick = (e) => {
      if (displayColorPalette && e.target !== this.colorPalette) {
        this.togglePalette();
      }
    };
  }

  /**
   * initialize data for first time run 
   */
  initialData() {
    return [
      { id: 1, head: "example 1", body: "I am example 1", color: "red" },
      { id: 2, head: "example 2", body: "I am example 2", color: "pink" },
      { id: 3, head: "example 3", body: "I am example 3", color: "yellow" },
    ];
  }

  /**
   * toggle palette
   */
  togglePalette() {
    displayColorPalette = !displayColorPalette;
    this.colorPalette.style.display = displayColorPalette ? "block" : "none";
  }

  /**
   * set the color palette
   */
  setColorPalette(node) {
    /* adding click event to change the selected color on every color button */
    for (let i = 0; i < this.colorPalette.childNodes.length; i++) {
      const el = this.colorPalette.childNodes[i];
      if (el.tagName === "BUTTON") {
        el.onclick = () => {
          displayColorPalette = false;
          this.colorPalette.dataset.color = el.className;
          node.dataset.color = el.className;
        };
      }
    }
  }
}
