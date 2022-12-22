import observer from "@cocreate/observer"
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

crud.save(element)
crud.read(element)
crud.listen(action) // readDocument | updateDocument | deleteDocument