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
 
// every compnent gets there values in there own way... we need to tell them to get values for each of its elements in a form to send to saveALl function below.
// or listen to onchange of component if realtime is not false and send the 1 element and value to the crud.save
// boilerplate.save(elements) // will get one or more elements and there values to send to crud.save function
// crud.save((element, value, boilerplateSaved)) 

// components realtime save on change
async function onChange(){
	//components onchange gets element and value and pass to save
	crud.save(elements)
}

// component save form action saveDocument
async function save(elements){
	for (var i = 0; i < elements.length; i++) {
			
		let value = this.getElementValue(elements[i]);
		
	  await self.saveElement(elements[i], value)
	}
}

CoCreate.form.init({
	name: 'codemirror',
	selector: '.codemirror',
	endEvent: 'codemirrorSaved',
	callback:  (elelemts) => {
		boilerplate.save(elements)
	},
});            






// will be loactaed in crud utility
// crud.save(elements)
async function save(elements) {
		for (var i = 0; i < elements.length; i++) {
			
			let value = this.getElementValue(elements[i]);
			
		  await crud.saveElement(elements[i], value)
		}

    document.dispatchEvent(new CustomEvent('{component}Saved', {
  		detail: {}
  	}))
}


// crud.saveElement()
async function saveElement(element, value)
{
  const {collection, document_id, name, namespace, room, broadcast, broadcast_sender, is_save } = crud.getAttr(element)

  if (!is_save || !collection ||!name) { 
    return;
  }
  
  if (!document_id && realtime) {
    CoCreateForm.request({element})
    element.setAttribute('document_id', 'pending');
  }
  
	if (isCRDT) {
			CoCreate.crdt.replaceText({ collection, name, document_id, name, value });
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
}

// end crud utility











async function saveAll(container, getCallback, selector) {
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
			
			let value = getCallback(elements[i]);
			
		  await self.saveElement(elements[i], value)
		}

    document.dispatchEvent(new CustomEvent('{actionEndEventName}', {
  		detail: {}
  	}))
}

