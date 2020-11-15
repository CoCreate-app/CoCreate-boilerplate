
function toolbar(selector, event, frame) {
  try {
    
    let Window,Document, frameElement;
    if(!frame )
    {
      frameElement = frame.body;
      Document = document
      Window = window;
    }
    else
    {
      frameElement = frame;
      Window = frame.contentWindow;
      Document = Window.document || Window.contentDocument;
    }

    let hoverBox = document.querySelector(selector);
    if (hoverBox) {
      let toolbar;
      toolbar = hoverBox.querySelector(':scope .toolbar');
      if(!toolbar ) toolbar = {offsetHeight: 0}

      Document.addEventListener(event, (e) => {
        let element = e.target;
        hoverBox.style.display = "block";
        hoverBox.style.top =
          frameElement.offsetTop +
          element.offsetTop +
          Window.scrollY -
          toolbar.offsetHeight +
          "px";
        hoverBox.style.left =
          frameElement.offsetLeft +
          element.offsetLeft +
          Window.scrollX +
          "px";
        hoverBox.style.width = element.offsetWidth + "px";
        hoverBox.style.height = element.offsetHeight + "px";

        if ( element.offsetTop - toolbar.offsetHeight < 0 )
          hoverBox.setAttribute("toolbar-overflow", "");
        else hoverBox.removeAttribute("toolbar-overflow");
      });
    }

 
  } catch (error) {
    console.error("toolbar didn't initlize", error);
  }
}

window.CoCreateToolbar = {init: toolbar}
// window.addEventListener("load", toolbar);
