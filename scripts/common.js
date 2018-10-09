"use strict";
let displayColorPalette = false;
export default class Common {
  constructor() {
    /* add note input and button*/
    this.addNotesBtn = document.getElementById("add-note-btn");
    this.addNotesHead = document.getElementById("add-note-head");
    this.addNotesBody = document.getElementById("add-note-body");

    /* note container and all notes */
    this.notesContainer = document.getElementById("notes");
    this.notes = document.getElementsByClassName("note");

    /* color palette */
    this.colorPalette = document.getElementById("color-palette");
    this.addNoteWrapper = document.getElementById("add-note-wrapper");

    /* hide color palette if click ouside */
    document.onclick = (e) => {
      if (displayColorPalette && e.target !== this.colorPalette) {
        this.togglePalette();
      }
    };

    /* model */
    this.modal = document.getElementById("my-modal");
    this.modalClose = document.getElementById("close");

    /* model inputs and button  */
    this.editNoteHead = document.getElementById("edit-note-head");
    this.editNoteBody = document.getElementById("edit-note-body");
    this.updateNote = document.getElementById("update-note-btn");
  }

  /**
   * initialize data for first time run
   */
  initialData() {
    return [
      { id: 1, head: "example 1", body: "I am example 1", color: "red" },
      { id: 2, head: "example 2", body: "I am example 2", color: "pink" },
      { id: 3, head: "example 3", body: "I am example 3", color: "yellow" }
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

  /**
   * show modal
   */
  showModal() {
    this.modal.style.display = "block";
  }

  /**
   * hide modal
   */
  closeModal() {
    this.modal.style.display = "none";
  }
}
