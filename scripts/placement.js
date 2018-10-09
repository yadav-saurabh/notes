"use strict";

import Common from "./common.js";
const common = new Common();

export default class Placement {

  /**
   * 
   * @param {number} margin 
   */
  adjust(margin) {

    /* get the width of the conterNotes */
    let containerWidth = common.notesContainer.getBoundingClientRect().width;
    
    /* get width of first child (note) */
    const firstChildWidth = common.notes[0].getBoundingClientRect().width + margin;
    
    /* calculate total columns needed */
    const cols = Math.max(Math.floor((containerWidth - margin) / firstChildWidth),1);
    
    /* setting container width after adding the margin */
    containerWidth = `${firstChildWidth * cols + margin}px`;
    common.notesContainer.style.width = containerWidth;

    /* for storing itemsMargin and items X-position of a column */
    const itemsMargin = [];
    const itemsPosX = [];
    for (let i = 0; i < cols; i++) {
      itemsPosX.push(i * firstChildWidth + margin);
      itemsMargin.push(margin);
    }

    /* adjusting each items (note) */
    for (let i = 0; i < common.notes.length; i++) {
      
      /* find the index of smallest number in the array  */
      const itemIndex = itemsMargin.indexOf(Math.min(...itemsMargin));

      /* get pos-x and pos-y */
      const posX = parseInt(itemsPosX[itemIndex]);
      const posY = parseInt(itemsMargin[itemIndex]);

      /* translate the note to the empty position */
      common.notes[i].style.transform = `translate(${posX}px,${posY}px)`;

      /* update the margin for the current column */
      itemsMargin[itemIndex] += common.notes[i].getBoundingClientRect().height + margin;
    }

    /* set the height of the container so that its occupies the DOM region and new elements will be added below it */
    const containerHeight = Math.max(...itemsMargin);
    common.notesContainer.style.height = `${containerHeight}px`;

  }
}
