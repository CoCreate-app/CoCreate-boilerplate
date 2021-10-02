/********************************************************************************
 * Copyright (C) 2020 CoCreate LLC and others.
 *
 *
 * SPDX-License-Identifier: MIT
 ********************************************************************************/
import observer from "@cocreate/observer"
import crud from '@cocreate/crud'

function init() {
    let elements = document.querySelectorAll(selectors);
    initElements(elements);
}

function initElements(elements) {
    for(let element of elements)
        initElement(element);
}

function initElement(element) {
    const { collection, document_id, name, isRealtime, isCrdt } = crud.getAttr(element);
    // Do something...
}

init();

observer.init({
    name: 'CoCreateBoilerplateAddedNodes',
    observe: ['addedNodes'],
    target: selectors,
    callback (mutation) {
        initElement(mutation.target);
    }
});

export default {initElement};