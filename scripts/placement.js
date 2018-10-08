"use strict";

export default class Placement {

  /**
   * initializing note elements and it container(notes)
   */
  constructor() {
    this.containerNotes = document.getElementById("notes");
    this.note = document.getElementsByClassName("note");
  }

  /**
   * 
   * @param {number} margin 
   */
  adjust(margin) {

    /* get the width of the conterNotes */
    let containerWidth = this.containerNotes.getBoundingClientRect().width;
    
    /* get width of first child (note) */
    const firstChildWidth = this.note[0].getBoundingClientRect().width + margin;
    
    /* calculate total columns needed */
    const cols = Math.max(Math.floor((containerWidth - margin) / firstChildWidth),1);
    
    /* setting container width after adding the margin */
    containerWidth = `${firstChildWidth * cols + margin}px`;
    this.containerNotes.style.width = containerWidth;

    /* for storing itemsMargin and items X-position of a column */
    const itemsMargin = [];
    const itemsPosX = [];
    for (let i = 0; i < cols; i++) {
      itemsPosX.push(i * firstChildWidth + margin);
      itemsMargin.push(margin);
    }

    /* adjusting each items (note) */
    for (let i = 0; i < this.note.length; i++) {
      
      /* find the index of smallest number in the array  */
      const itemIndex = itemsMargin.indexOf(Math.min(...itemsMargin));

      /* get pos-x and pos-y */
      const posX = parseInt(itemsPosX[itemIndex]);
      const posY = parseInt(itemsMargin[itemIndex]);

      /* translate the note to the empty position */
      this.note[i].style.transform = `translate(${posX}px,${posY}px)`;

      /* update the margin for the current column */
      itemsMargin[itemIndex] += this.note[i].getBoundingClientRect().height + margin;
    }

    /* set the height of the container so that occupies the DOM region and new elements will be added below it */
    const containerHeight = Math.max(...itemsMargin);
    this.containerNotes.style.height = `${containerHeight}px`;

  }
}
