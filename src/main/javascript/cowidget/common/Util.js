/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License, Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 */
class Util extends cowidget.Util {

	static get LOG() {
		return cowidget.common.LogFactory.getLog(Util);
	}
	
    constructor(option) {

    }

    static callTest() {
        console.log('[Util.callTest] callTest');
        return 'success';
    }

    static mixin(desObj, srcObj) {
//    	//Traditional JavaScript Mixins
//    	for (var prop in source) {
//    	    if (source.hasOwnProperty(prop)) {
//    	      target[prop] = source[prop];
//    	    }
//    	  }
    	
        desObj = desObj ? desObj : {};
        Util.LOG.debug('[mixin] srcObj: ' + typeof srcObj);

        let empty = {};

        if (typeof srcObj === 'object') {
            if (true) {
                for (var p in srcObj) {
                    if (!(p in empty)) {
                        desObj[p] = srcObj[p];
                    }
                }
            } else {
                desObj = Object.assign(desObj, srcObj);
            }
        } else if (typeof srcObj === 'function') {
            eval(srcObj);
        }

        return desObj;
    }
    
    // Getter
    get area() {
        return 'area';
    }
}
    