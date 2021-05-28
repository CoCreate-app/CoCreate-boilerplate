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
 * Example save function
 * flow example: action.init(selector => callback=> biolerplateSavefunc => saveCompleteEvent)
 *
 */
init()


/**
 * CoCreate-form
 * https://ws.cocreate.app/docs/form
 * flow example: form.init(selector => callback=> boilerplateSavefunc) /// for each
 */
 
form.init({
	name: 'CoCreateBoilerplate',
	selector: ".boilerplate",
	callback: function(el) {
		CoCreateBoilerplate.save(el); // send 1 or more elements to be proceesd for saving then fires componentSaved event
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
		CoCreateBoilerplate.__saveBoilerplate(btn) // send 1 or more elements to be proceesd for saving then fires componentSaved event
	},
})


/**
 * Example save function
 * flow example: action.init(selector => callback=> biolerplateSavefunction => saveCompleteEvent)
 *
 */

    saveCroppieCrud: async function(elCroppie) {
      let name = elCroppie.getAttribute('name');
      let data = elCroppie.dataset;
      
       if(typeof name === 'undefined' || name === '' || name ==null){
        console.error("you need add attr [name] ");
        return
      }
      
      if(typeof data["collection"] === 'undefined' || data["collection"] === ''){
        console.error("you need add attr [data-collection] ");
        return
      }
      
      let obj = this.croppieObjs.find((obj) => obj.croppie === elCroppie);
      
      let base64 = (elCroppie.tagName == 'IMG') ? await this.getCropResult(obj.resizer) : (obj.fileInput.files.length) ? await this.getCropResult(obj.resizer) : null
      if(base64){
        crud.createDocument({
           collection:data["collection"],
           data: {[name]:base64},
         });
      }else{
        console.error("it is Empty, not save croppie in crud")
      }
      
    },
 
     __croppieSaveAction: function(btn) {
      
      let croppie = btn.closest(this.selector_element);
      let executeMultiple = false;
  	  if(!croppie ){
  	    //btn It is not within the parent tag
  	    executeMultiple = true
  	    let that = this;
  	    let form = btn.closest('form');
  	    let croppies = form.querySelectorAll(this.selector_element);
  	    croppies.forEach(function(croppie) {
          that.saveCroppieCrud(croppie);
        });
  	  }
  	  
  	  if(executeMultiple == false)
  	    this.saveCroppieCrud(croppie)
  	 
  	  document.dispatchEvent(new CustomEvent('CroppieSaveComplete', {
  				detail: {}
  			}))
    },
