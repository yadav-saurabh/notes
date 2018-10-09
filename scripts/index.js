"use strict";
import {
  addNotesBtn,
  notesContainer,
  addNotesHead,
  addNotesBody,
  colorPalette
} from "./consts.js";
import Placement from "./placement.js";
import Services from "./service.js";
import Notes from "./notes.js";

const notes = new Notes();
const placement = new Placement();
const service = new Services();
let tpvar = false;

class App {
  /**
   * constructor initialize the app and ades some events
   */
  constructor() {
    /* adding event to add a note  */
    addNotesBtn.onclick = () => this.addNote();
    this.initColorPalette();
    const colorSelector = document.getElementById("color-selector");


    document.onclick = (e) => {
      // console.log(colorPalette.dataset);
      if (tpvar && e.target !== colorPalette) {
        colorPalette.style.display = "none";
        tpvar = false;
      }
    };
    colorSelector.onclick = () => {
      console.log(colorPalette);
      colorPalette.style.display = "block";
      colorSelector.appendChild(colorPalette);
      setTimeout(() => {
        tpvar = true;
      }, 100);
    };
  }

  /**
   * add a new note
   */
  addNote() {
    const head = addNotesHead.value.trim();
    const body = addNotesBody.value.trim();
    console.log(colorPalette.dataset);
    if (!!head && !!body) {
      const data = {
        id: 1,
        head: head,
        body: body,
        color: colorPalette.dataset.color
      };
      console.log(data);
      notesContainer.insertBefore(
        notes.createNote(data),
        notesContainer.firstChild
      );
      placement.adjust(16);
    } else {
      alert("please provide value of head and body for the note");
    }
  }

  /**
   * init color palette
   */
  initColorPalette() {
    /* adding click event to change the selected color on every color button */
    for (let i = 0; i < colorPalette.childNodes.length; i++) {
      const el = colorPalette.childNodes[i];
      if (el.tagName === "BUTTON") {
        el.onclick = () => {
          tpvar = false;
          colorPalette.dataset.color = el.className;
          document.getElementsByClassName('add-note-wrapper')[0].className = ' add-note-wrapper ' +  el.className ;
        };
      }
    }
  }
}

const app = new App();
