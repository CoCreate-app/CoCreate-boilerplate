import observer from "@cocreate/observer"
import form from "@cocreate/form"
import action from "@cocreate/action"

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
 * Example init function
 * flow example: 
 *
 */

init()