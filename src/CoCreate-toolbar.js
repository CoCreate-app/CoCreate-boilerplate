
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

    let box = document.querySelector(selector);
    if (box) {
      let toolbar;
      toolbar = box.querySelector(':scope .toolbar');
      if(!toolbar ) toolbar = {offsetHeight: 0}
      
      Document.addEventListener(event, e => {
        update(e.target)
        let watch = new ResizeObserver(()=> update(e.target))
        watch.observe(e.target)
      });
      
      function update(element){
        
        box.style.display = "block";
        box.style.top =
          frameElement.offsetTop +
          element.offsetTop +
          Window.scrollY -
          toolbar.offsetHeight +
          "px";
        box.style.left =
          frameElement.offsetLeft +
          element.offsetLeft +
          Window.scrollX +
          "px";
        box.style.width = element.offsetWidth + "px";
        box.style.height = element.offsetHeight + "px";

        if ( element.offsetTop - toolbar.offsetHeight < 0 )
          box.setAttribute("toolbar-overflow", "");
        else box.removeAttribute("toolbar-overflow");
      
      }
    }

 
  } catch (error) {
    console.error("toolbar didn't initlize", error);
  }
}

window.CoCreateToolbar = {init: toolbar}
// window.addEventListener("load", toolbar);
