import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"

export default class extends Controller {
  static targets = [ "divDragable"]

    clonDrag(){
      let clon = this.divDragableTarget.cloneNode(true);
      clon.style.position = "absolute";
  
      console.log(clon);
  
      var posicion = this.divDragableTarget.getBoundingClientRect();
      clon.style.top = posicion.top + "px";
      clon.style.left = posicion.left + "px";
      clon.style.zIndex = "100";
  
      document.body.appendChild(clon);
      this.dragElement(clon);
      
    }

    dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      elmnt.onmousedown = dragMouseDown;
      
      function dragMouseDown(e) {
        
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }
    
      function elementDrag(e) {
        
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }
    
      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        // var posicion = elmnt.getBoundingClientRect();
        // button.style.position = "absolute";
        // button.style.top = posicion.top + "px";
        // button.style.left = posicion.left + "px";
        
  
      }
    }




}