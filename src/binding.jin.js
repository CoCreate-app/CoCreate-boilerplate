import observer from "@cocreate/observer"
import form from "@cocreate/form"
import action from "@cocreate/action"
import crud from '@cocreate/crud'



/**
 * CoCreate-observer
 * https://ws.cocreate.app/docs/observer
 * Observes dom for new elements of a component and intializes it
 * Components should support init per element and init all on page load
 * flow example: observer.init(selector => callback=> initCroppieElement) // inits new element only
 */

observer.init({ 
  name: 'CoCreateBoilerplateInit',
  observe: ['subtree', 'childList'],
  include: '.boilerplate',
  callback: function(mutation) {
    // console.log(mutation)
    CoCreateBiolerplate.initElement(mutation.target)
  }  
})


/**
 * CoCreate-form
 * https://ws.cocreate.app/docs/form
 * flow example: form.init(selector => callback=> boilerplateSavefunc) /// for each
 */
 
form.init({
	name: 'CoCreateBoilerplate',
	selector: ".boilerplate",
	callback: function(el) {
		CoCreateBoilerplate.saveAll(el); // send 1 or more elements to be proceesd for saving then fires componentSaved event
		// CoCreateBoilerplate.initElement(el);
	}
});



/**
 * CoCreate-action
 * https://ws.cocreate.app/docs/action
 * flow example: action.init(selector => callback=> boilerplateSavefunction => saveCompleteEvent)
 *
 */
 
action.init({
	action: "saveBoilerplate",
	endEvent: "savedBoilerplate",
	callback: (btn, data) => {
		CoCreateBoilerplate.saveAll(btn) // send 1 or more elements to be proceesd for saving then fires componentSaved event
	},
})


/**
 * Example init element function
 *
 */
//. init function
function initElement(container) 
{
		let mainContainer = container || document;
		if (!mainContainer.querySelectorAll) {
			return;
		}
		
		let elements = mainContainer.querySelectorAll(this.selector);
		
		if (elements.length == 0 && mainContainer != document && mainContainer.matches(this.selector)) {
		  elements = [mainContainer];
		}
		
		elements.forEach((el)=> {
			if (observer.getInitialized(el, "cocreate-biolerplate")) {
				return;
			}
			observer.setInitialized(el, "cocreate-biolerplate")
			const { collection, document_id,  } = crud.getAttr(el);

			if (document_id && collection) {
				// crud.readDocument({ collection, document_id })
			}
		})
}

/**
 * Example save function
 * flow example: action.init(selector => callback=> biolerplateSavefunction => saveCompleteEvent)
 *
 */
 
 
async function saveElement(element, value)
{
  const {collection, document_id, name, namespace, room, broadcast, broadcast_sender, is_save } = crud.getAttr(element)
  // const {collection, document_id, name} = crud.getAttr(element)
  
  // const {is_save, is_read, is_update} = crud.getFlagAttr(element) // is_update is for listener, is read is for readDocument
  
  if (!is_save || !collection ||!name) { 
    return;
  }
  
//   const namespace = element.getAttribute('data-namespace') || ''
//   const room = element.getAttribute('data-room') || '';
//   const broadcast = element.getAttribute('data-broadcast') == "false" ? false : true;
//   const broadcast_sender = element.getAttribute('data-broadcast_sender') == 'false' ? false : true;
  
	
	if (isCRDT) {
			crdt.replaceText({ collection, name, document_id, name, value });
	}
	else {
	  var data = await crud.updateDocument({
	    namespace,
	    room,
	    collection,
	    document_id,
	    upsert: true, 
	    broadcast,
	    broadcast_sender,
	    data: {
	      [name]: value
	    },
	  })
	}
  
  if (document_id !== data.document_id) {
    //. created document_id processing
    
  }
}

async function saveAll(container) {
		let mainContainer = container || document;
		if (!mainContainer.querySelectorAll) {
			return;
		}
		
		let elements = mainContainer.querySelectorAll(this.selector);
		
		if (elements.length == 0 && mainContainer != document && mainContainer.matches(this.selector)) {
		  elements = [mainContainer];
		}
		
		let self = this;
		for (var i = 0; i < elements.length; i++) {
		  await self.saveElement(elements[i], value)
		}

    document.dispatchEvent(new CustomEvent('{actionEndEventName}', {
  		detail: {}
  	}))
}

