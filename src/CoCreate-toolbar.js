     /**
   * returns the absolute position of an element regardless of position/float issues
   * @param {HTMLElement} el - element to return position for 
   * @returns {object} { x: num, y: num }
   */
  function getPosition(el) {

    var x = 0,
        y = 0;

    while (el != null && (el.tagName || '').toLowerCase() != 'html') {
        x += el.offsetLeft || 0; 
        y += el.offsetTop || 0;
        el = el.offsetParent;
    }

    return { left: parseInt(x, 10), top: parseInt(y, 10) };
  }
  
let toolbars = {};
function toolbar({selector, event, frame, elementConfig, configKey}) {
  

  
  let Window, Document, frameElement;
  if (!frame) {
    frameElement = frame.body;
    Document = document;
    Window = window;
  } else {
    frameElement = frame;
    Window = frame.contentWindow;
    Document = Window.document || Window.contentDocument;
  }
  let box = document.querySelector(selector);
  if (box) {
    toolbars[selector] = box;
    let watch = new ResizeObserver(() => element && update(element));
    watch.observe(Document.body);

    let toolbar = box.querySelector(":scope .toolbar");
    let tagName = box.querySelector(":scope [tagName]");
    if (!toolbar) toolbar = { offsetHeight: 0 };
    let element = document.createElement('div'); // any component
    Document.addEventListener(event, (e) => {
      update(e.target);
      element = e.target;
    });


    Window.addEventListener("scroll", () => element && update(element));
    function update(element) {
      // for (let config of window.cc.configMatch(elementConfig, element))
      //   if (event === "click" && config.hoverable === false) return;
      //   else if (event === "mouseover" && config.selectable === false) return;

      CoCreateUtils.configExecuter(
        element,
        configKey,
        (element, config, isSelector) => {
          
          if(isSelector )
          {
            let selector = config[configKey];
            if(!toolbars[selector])
            {
              box = document.querySelector(selector)
              toolbars[selector] = box;
              toolbar = box.querySelector(":scope .toolbar");
              tagName = box.querySelector(":scope [tagName]");
            }

          }
   

          let elPosition = getPosition(element)
          box.style.display = "block";
          box.style.top =
            frameElement.offsetTop +
            elPosition.top -
            Window.scrollY -
            toolbar.offsetHeight +
            "px";
          box.style.left =
            frameElement.offsetLeft +
            elPosition.left +
            Window.scrollX +
            "px";
          box.style.width = element.offsetWidth + "px";
          box.style.height = element.offsetHeight + "px";

          if (element.offsetTop - toolbar.offsetHeight < 0)
            box.setAttribute("toolbar-overflow", "");
          else box.removeAttribute("toolbar-overflow");

          if (tagName && tagName.innerHTML !== element.tagName) {
            tagName.innerHTML = element.tagName;

            // for (let config of elementConfig) {
            //   if (config.tagName && element.matches(config.selector)) {
            //     if (tagName.innerHTML !== config.tagName)
            //       tagName.innerHTML = config.tagName;
            //     break;
            //   }
            // }


              if (config.tagName && config.tagName !== tagName.innerHTML) {
                tagName.innerHTML = config.tagName;
              }
          }
        }
      );

    }
  }
}

window.CoCreateToolbar = { init: toolbar };
// window.addEventListener("load", toolbar);
