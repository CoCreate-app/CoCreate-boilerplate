
function toolbar() {
  try {
    let canvasIframe = document.querySelector("#canvas");
    let canvasWindow = canvasIframe.contentWindow;
    let canvas = canvasIframe.contentDocument || canvasWindow.document;
    let selected;

    let hoverBox = document.getElementById("hoveredElementcoc");
    if (hoverBox) {
      let toolbar;
      toolbar = hoverBox.querySelector(':scope .toolbar');
      if(!toolbar ) toolbar = {offsetHeight: 0}

      canvas.addEventListener("mouseover", (e) => {
        let element = e.target;
        if (element.id === "selectedElememtcoc") return;
        if (element === selected) return;

        hoverBox.style.display = "block";
        hoverBox.style.top =
          canvasIframe.offsetTop +
          element.offsetTop +
          canvasWindow.scrollY -
          toolbar.offsetHeight +
          "px";
        hoverBox.style.left =
          canvasIframe.offsetLeft +
          element.offsetLeft +
          canvasWindow.scrollX +
          "px";
        hoverBox.style.width = element.offsetWidth + "px";
        hoverBox.style.height = element.offsetHeight + "px";

        if ( element.offsetTop - toolbar.offsetHeight < 0 )
          hoverBox.setAttribute("toolbar-overflow", "");
        else hoverBox.removeAttribute("toolbar-overflow");
      });
    }

    let selectBox = document.getElementById("selectedElememtcoc");

    if (selectBox) {
      let toolbar;
      toolbar = selectBox.querySelector(':scope .toolbar');
      if(!toolbar ) toolbar = {offsetHeight: 0}
      selectBox.style.display = "block";
      canvas.addEventListener("click", (e) => {
        let element = e.target;
        if (element.id === "hoveredElementcoc") return;
        selected = element;

        hoverBox.style.display = "none";
        selectBox.style.top =
          canvasIframe.offsetTop +
          element.offsetTop +
          canvasWindow.scrollY -
          toolbar.offsetHeight +
          "px";
        selectBox.style.left =
          canvasIframe.offsetLeft +
          element.offsetLeft +
          canvasWindow.scrollX +
          "px";
        selectBox.style.width = element.offsetWidth + "px";
        selectBox.style.height = element.offsetHeight + "px";
        if (element.offsetTop - toolbar.offsetHeight < 0)
          selectBox.setAttribute("toolbar-overflow", "");
        else selectBox.removeAttribute("toolbar-overflow");
      });
    }
  } catch (error) {
    console.error("toolbar didn't initlize", error);
  }
}

window.CoCreateToolbar = {init: toolbar}
// window.addEventListener("load", toolbar);
