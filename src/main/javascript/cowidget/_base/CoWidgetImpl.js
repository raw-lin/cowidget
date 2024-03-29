/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License,
 * Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for
 * development.
 */
class CoWidgetImpl {
	
	static get LOG() {
		return cowidget.common.LogFactory.getLog(CoWidgetImpl);
	}
	
	static isWork(){
		CoWidgetImpl.LOG.debug('[CoWidgetImpl.isWork] success');
		return true;
    };
    
    /**
	 * TODO
	 */
    static _init(userConfig, defaultConfig) {
        CoWidgetImpl.LOG.debug('[CoWidgetImpl._init] call');
    };

    /**
	 * TODO
	 */
    static ready(priority, context, callback) {
        return cowidget.common.Util.ready(priority, context, callback);
    };

    /**
	 * TODO
	 */
    static load(url) {
    	CoWidgetImpl.LOG.debug('[CoWidgetImpl.load] url: ', url);
    	
        var retCoWidget = null;

        var xhrOptions = {
            url: url,
            handleAs: 'json',

            preventCache: false,
            sync: false,

            load: (data) => {
                CoWidgetImpl.LOG.debug('[CoWidgetImpl.load] data: ', data);

                if (Array.isArray(data)) {
                    retCoWidget = new CoWidget();
                    data.forEach((item, index, array) => {
                        CoWidgetImpl.LOG.debug('[CoWidgetImpl.load xhrArgs.load] item: ' + index + ', ', item);
                        // if (0 == index) {
                        retCoWidget.push(new CoWidget(item));
                        // };
                    });
                } else {
                    retCoWidget = new CoWidget(data);
                }

                CoWidgetImpl.LOG.debug('[CoWidgetImpl.load xhrArgs.load] retCoWidget ', retCoWidget);
            },

            error: (error) => {
                CoWidgetImpl.LOG.error('[CoWidgetImpl.load xhrArgs.error] error ', error);
            }
        };

        try {
            // Call the asynchronous xhr
            cowidget.common.NetXhr.xhr(xhrOptions);
        } catch (exception) {
            CoWidgetImpl.LOG.error('[CoWidgetImpl.load] exception: ', exception);
        } finally {
            return retCoWidget;
        }
    };
    
    /**
	 * TODO
	 */
    static query() {
    	// return dojo.query(id, doc);
    	return document.getElementById(id);
    }
    
    /**
	 * TODO
	 */
    static byId(id, doc) {
    	// return dojo.byId(id, doc);
    	// CoWidgetImpl.LOG.debug('[DomUtil.byId]
		// cowidget.lang.ClassLoader.container.document: ',
		// cowidget.lang.ClassLoader.container.document);
    	return cowidget.common.DomUtil.byId(id, doc);
    };

    /**
	 * TODO
	 */
    getMetaData() {
        var self = this;
        return self.metaData ? self.metaData:{};
    };

    /**
	 * TODO
	 */
    push(coWidget) {
        var self = this;

        CoWidgetImpl.LOG.debug('[push] coWidget: ', coWidget);
        
        self.components.push(coWidget);
    };
    
    /**
	 * @private
	 */
    constructor(metaData) {
        let self = this;
        metaData = metaData ? metaData:{};
        
        CoWidgetImpl.LOG.debug('[constructor] metaData: ', metaData);
        
        // initial parameter
        self.metaData = metaData ? metaData : {};
        self.metaData.uiType = CoWidget.configure.ui;
        self.components = [];
        
        self.widget = null;
        
        CoWidgetImpl.LOG.debug('[constructor] self: ', self);
    }
    
    /**
	 * @param option:
	 *            viewName, viewMethod, container, viewMethod is mapping to
	 *            server token.
	 */
    static create(option, container){
    	option = option ? option:{};
    	container = container ? container:document;
    	option.container = option.container ? option.container:container;
    	
    	if('undefined' === typeof option.container) {
    		Object.assign(option, {
    			container: container
    		});
    	}
    	
        let self = this;
    	let retCoWidget = null;
    	
    	CoWidgetImpl.LOG.debug('[create] call with option: ', option);
    	
    	if ('dojo' === CoWidget.configure.ui) {
    		retCoWidget = new cowidget.adapter.DojoAdapter(option);
    	}else if ('openui5' === CoWidget.configure.ui || 'ui5' === CoWidget.configure.ui) {
    		retCoWidget = new cowidget.adapter.UI5Adapter(option);
    	}
    	
    	return retCoWidget;
    }
    
    static createView(option, container){

    	option = option ? option:{};
    	
    	let viewResult;
    	
		if(option.viewMotion) {
			viewResult = CoWidgetImpl.xhrView(option, container);
		}else if(option.viewName) {
			viewResult = option;
		}
		
    	return CoWidgetImpl.create(viewResult, container);
	}

	static xhrView(option, container){
    	option = option ? option:{};
    	
    	let withLogon = true;
    	let viewResult;
    	    	
    	if('mock.view.Shell' === option.viewMotion) {
    		// doRender
    		viewResult = {
    			"viewName" : "view.Shell",
    			"viewModel" : {
    				"withLogon" : withLogon
    			}
    		}
    	}
    	
    	if('mock.view.App' === option.viewMotion) {
    		if(true) {
    			// option.viewMotion = 'mock.view.auth.Logon';
    		}else {
    			// option.viewMotion = 'mock.view.common.Reload';
    		}
    		
    		// option.viewMotion = 'mock.view.App';
    		
    		if(option.viewMethod) {
    			
    		}else {
    			viewResult = {
        				"viewName" : "view.App",
            			"viewModel" : {
            				"withLogon" : withLogon
            			}
        		}
    		}
    	}
    	
    	if('mock.view.SplitApp' === option.viewMotion) {
    		viewResult = {
        			"viewName" : "view.SplitApp",
        			"viewModel" : {
        				"withLogon" : withLogon,
            			"menus" : [
            				{
            					"menuName" : "Item 1",
            					"menuMotion" : "mock.auth.urseProfile"
            				},
            				{
            					"menuName" : "Item 2",
            					"menuMotion" : "mock.auth.urseProfile"
            				},
            				{
            					"menuName" : "Item 3",
            					"menus" : [
            						{
	                					"menuName" : "Item 3.1",
	                					"menuMotion" : "mock.auth.urseProfile"
            						},
            						{
	                					"menuName" : "Item 3.2",
	                					"menuMotion" : "mock.auth.urseProfile"
            						}
            					]
            				},
            				{
            					"menuName" : "Item 4",
            					"menus" : [
            						{
	                					"menuName" : "Item 4.1",
	                					"menuMotion" : "mock.auth.urseProfile"
            						},
            						{
	                					"menuName" : "Item 4.2",
	                					"menus" : [
	                						{
	    	                					"menuName" : "Item 4.2.1",
	    	                					"menuMotion" : "mock.auth.urseProfile"
	                						},
	                						{
	    	                					"menuName" : "Item 4.2.2",
	    	                					"menuMotion" : "mock.auth.urseProfile"
	                						}
	                					]
            						}
            					]
            				}
            				
            			]
        			}
    		}
    	}

    	if('mock.view.auth.Logon' === option.viewMotion) {
    		
    		if(option.viewMethod && 'doLogon' === option.viewMethod) {
    			// chain to mock.common.Reload
        		viewResult = {
            			"viewName" : "view.common.Reload",
                			"viewModel" : {
                				"nextUrl" : './ui5.html'
                			}
        		}
    		}else if(option.viewMethod && 'doLogout' === option.viewMethod) {
    			// chain to mock.common.Reload
        		viewResult = {
            			"viewName" : "view.common.Reload",
                			"viewModel" : {
                				"nextUrl" : './ui5.html'
                			}
        		}
    		}else {
        		viewResult = {
            			"viewName" : "view.auth.Logon",
            			"viewModel" : {
            				"userName" : 'Test...',
            				"password" : ''
            			}
        		}	
    		}
        }
    	
    	if('mock.view.auth.UserProfile' === option.viewMotion) {
    		
    		if(option.viewMethod && 'doAccept' === option.viewMethod) {
    			// chain to mock.common.Reload
    			viewResult = {
            			"viewName" : "view.auth.UserProfile",
            			"viewModel" : {
            				"userName" : 'changed',
            				"email" : ''
            			}
        		}	
    		}else {
        		viewResult = {
            			"viewName" : "view.auth.UserProfile",
            			"viewModel" : {
            				"userName" : 'Test...',
            				"email" : ''
            			}
        		}	
    		}
        }
    	
    	if('mock.view.main.Main' === option.viewMotion) {
    		viewResult = {
        			"viewName" : "view.main.Main"
    		}	
    	}
    	
    	if('mock.view.common.Reload' === option.viewMotion) {
    		viewResult = {
        			"viewName" : "view.common.Reload",
            			"viewModel" : {
            				"nextUrl" : './ui5.html'
            			}
    		}
    	}
    	
    	CoWidgetImpl.LOG.debug('[CoWidgetImpl.xhrView] viewResult: ', viewResult);
    	return viewResult;
    }

    placeAt(place, position) {
        var self = this;
    	place = place ? place:self.place;
    	position = position ? position:'only';
        
        self.placeReference = place;
		self.placePosition = position;
		
		self._placeAt(place, position);
    };
    
    /* Skip */

    constructorX(option) {
        var self = this;
        option = option ? option : {};

        CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] self: ', self);
        CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] option: ', option);;
        
        // self.adapter = new Objecy();
        self.metaData = option ? option : {};
        self.metaData.uiType = CoWidget.configure.ui;
        self.components = [];
        self.widget = null;
        
        // self.model = option.model ? option.model:{};
        self.place = option.place ? option.place : 'coWidget';
        var cowidgetViewName = self.metaData.viewName ? self.metaData.viewName : '';
        
        CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] uiType cowidgetViewName: ' + self.metaData.uiType + ', ', cowidgetViewName);
        if (cowidget.common.StringUtil.isNotEmpty(cowidgetViewName) && 'dojo' === self.metaData.uiType) {
            // dojo.require('dojo/_base/declare');
            // dojo.require(cowidgetViewName);
            
            CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] cowidgetViewName: ', cowidgetViewName);
            
            let cowidgetViewNameUrl = cowidget.common.StringUtil.replaceAll(cowidgetViewName, '.', '/');
            cowidgetViewNameUrl = cowidgetViewName;
            CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] cowidgetViewNameUrl: ' + cowidgetViewNameUrl);
            dojo.require(cowidgetViewNameUrl);
            
            dojo.require([cowidgetViewNameUrl, "dojo/domReady!"], (DojoWidgetAdapter) => {
            	CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] DojoWidgetAdapter: ', DojoWidgetAdapter);
            	
            	self.widget = DojoWidgetAdapter;
            	self.widget['baseHref'] = cowidget.common.UrlUtil.getBaseHref();

            	CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] self.widget: ', self.widget);
            });
            	
        }else if ('' !== cowidgetViewName && 'ui5' === self.metaData.uiType) {
            CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] cowidgetViewName: ' + self.metaData.ui + ',', cowidgetViewName);
        	self.widget = sap.ui.xmlview({
                viewName : "mock.ui5.view.Logon"
             });

			CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] self.widget: ', self.widget);
			sap.ui.require("sap/ui/model/json/JSONModel");
			let oModel = new sap.ui.model.json.JSONModel({
				field01: "[CoWidgetImpl.constructor] Hi, my name is Harry Hawk"
			});
			self.widget.setModel(oModel);
        }
    };
}