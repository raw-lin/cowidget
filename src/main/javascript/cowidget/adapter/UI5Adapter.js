/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License,
 * Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for
 * development.
 */

class UI5Adapter extends CoWidget {
	static get LOG() {
		return cowidget.common.LogFactory.getLog(UI5Adapter);
	}
	
	/**
	 * @constructor
	 * @param (string)
	 *            viewName
	 * @param (XMLView)
	 *            container
	 */
	 constructor(options) {
		super(options);
        let that = this;
        
//		options = options ? options:{
//			viewName: null
//		};
//		UI5Adapter.LOG.debug('options: ', options);
//		
		Object.assign(that, options);
		UI5Adapter.LOG.debug('[constructor] that: ', that);
	}
	
	isInstanceOf(target, ViewClass) {
		let that = this;
		
		let withInstanceOf = false;
		if(target) {
			withInstanceOf = (target instanceof ViewClass);
		}
		
		if(!withInstanceOf && target && target.getContent) {
			UI5Adapter.LOG.debug('[UI5Adapter.isInstanceOf] check by getContent');
			withInstanceOf = target.getContent()[0] instanceof ViewClass
		}
		
		return withInstanceOf;
	}
	
	determineTarget(id, container, ViewClass) {
		/* determineTarget */
		let that = this;
		let retView = null;

		UI5Adapter.LOG.debug(`[determineTarget] id: ${id}`);
		if(true) {
			
			if(ViewClass) {
				if(ViewClass === sap.m.Page) {
					UI5Adapter.LOG.debug('[determineTarget] find App or SplitApp');
					
					if(that.isInstanceOf(container, sap.m.App) || that.isInstanceOf(container, sap.m.SplitApp)) {
						if(container instanceof sap.m.App || container instanceof sap.m.SplitApp) {
							retView = container;
						}else if('function' === typeof container.getContent){
							retView = container.getContent()[0];
						}
					}
				}else if(ViewClass === sap.m.App) {
					UI5Adapter.LOG.debug('[determineTarget] find Shell');
					
					if(that.isInstanceOf(container, sap.m.Shell)) {
						if(container instanceof sap.m.Shell) {
							retView = container;
						}else if('function' === typeof container.getContent){
							retView = container.getContent()[0];
						}
					}
				}
			}else {
				if(container && 'function' === typeof container.byId) {
					retView = container.byId(id);
				}else if(false){
					// retView = sap.ui.getCore().byId(id);
					retView = jQuery(document.getElementById(id));
					
					if(retView && 'function' === typeof retView.contents) {
						let retViewTmp = null;
						UI5Adapter.LOG.debug('[determineTarget] retView: ', retView);
						
						if(retView.context.id) {
							retView = retView.context;
						}
					}
				}
			}
			
			if (null == retView) {
				UI5Adapter.LOG.warn('[determineTarget] retView not found');
				if (container && 'function' === typeof container.getParent) {
					UI5Adapter.LOG.debug('[determineTarget] call determineTarget.');
					retView = that.determineTarget(id, container.getParent(), ViewClass);
				}else {
					retView = jQuery(document.getElementById(id));
					
					if(retView && 'function' === typeof retView.contents) {
						let retViewTmp = null;
						UI5Adapter.LOG.debug('[determineTarget] retView: ', retView);
						
						if(retView.context.id) {
							retView = retView.context;
						}
					}
				}
			}
			
			return retView;
		}
		
		
		if(false) {
			let oParent = container;
				while (null == retView && (null != oParent && 'object' === typeof oParent)) {
					
					retView = container.byId(id);
				
				UI5Adapter.LOG.debug('[determineTarget] oParent: ', (typeof oParent));
					// UI5Adapter.LOG.debug('[determineTarget] retView: ',
					// (typeof retView));
					UI5Adapter.LOG.debug('[determineTarget] ViewClass: ', (typeof ViewClass));
					
					if(ViewClass) {
						if(ViewClass === sap.m.Page) {
							UI5Adapter.LOG.debug('[determineTarget] find App');
	 						if(that.isInstanceOf(oParent, sap.m.App)) {
	 							retView = oParent;
	 						}else {
	 							retView = null;
	 						}
						}	
					}
					
					if (oParent && 'function' === typeof oParent.getParent) {
						oParent = oParent.getParent();	
					}else {
						oParent = null;
					}
				
					if(oParent && ViewClass && (ViewClass === sap.m.Page)) {
						UI5Adapter.LOG.debug('[determineTarget] find App');
						if(that.isInstanceOf(oParent, sap.m.App)) {
							retView = oParent;
						}else {
							retView = null;
						}
					}else if(oParent && 'App' === id) {
						UI5Adapter.LOG.debug('[determineTarget] find App');
						if(that.isInstanceOf(oParent, sap.m.App)) {
							retView = oParent;
						}else {
							retView = null;
						}
					}else if(oParent && 'function' === typeof oParent.byId) {
						retView = oParent.byId(id);
					}
				
					UI5Adapter.LOG.debug('[determineTarget] oParent: ', oParent);
				}
			
				return retView;
		}
		
				
	}
	
	_placeAt(rTarget, sPosition) {
		sPosition = sPosition ? sPosition:'only';
		let that = this;
		
		let oXMLView = null;
		
		if(true) {				
			UI5Adapter.LOG.debug('[_placeAt] that: ', that);
			UI5Adapter.LOG.debug('[_placeAt] that.container: ', that.container);
			UI5Adapter.LOG.debug('[_placeAt] rTarget: ', rTarget);
		}
		
		UI5Adapter.LOG.debug('[_placeAt] create oXMLView.');
		jQuery.sap.require('sap.ui.core.mvc.XMLView');
		oXMLView = sap.ui.core.mvc.XMLView.create({
			viewName: that.metaData.viewName,
			customData: {
					Type: 'sap.ui.core.CustomData',
						key:'viewModel',
						value: that.viewModel
					}
		});
		
		{
			if(oXMLView && oXMLView instanceof Promise) {
				UI5Adapter.LOG.debug('[_placeAt] Promise process');
			
				oXMLView.then((oView) => {
					/* check oView and oTarget */
					UI5Adapter.LOG.debug('[_placeAt.then] check oView and oTarget');
					let oTarget = null;
					
					if(true === that.isInstanceOf(oView, sap.m.Page)) {
						UI5Adapter.LOG.debug('[_placeAt.then] oView is sap.m.Page');
						oTarget = that.determineTarget(rTarget, that.container, sap.m.Page);
					}else if(true === that.isInstanceOf(oView, sap.m.App)) {
						UI5Adapter.LOG.debug('[_placeAt.then] oView is sap.m.App');
						oTarget = that.determineTarget(rTarget, that.container, sap.m.App);
						
					}else {
						UI5Adapter.LOG.debug('[_placeAt.then] oView is Panel');
						oTarget = that.determineTarget(rTarget, that.container);
					}
					
					if(oTarget) {
						UI5Adapter.showBusyIndicator(oTarget);
					}
					
					if(null === oTarget) {
						oTarget = rTarget;
					}
					
					/* process viewModel */
					let customData = oView.getCustomData();
					let viewModel;
					customData.forEach((element) => {
						if('viewModel' === element.getKey()) {
							viewModel = element.getValue();
						}
					});
					
					if('function' === typeof oView.getController().setViewModel) {
						oView.getController().setViewModel(viewModel);
					}
					
					return { oView: oView, oTarget: oTarget};
				}).then((result) => {
					/* append oView to oTarget */
					UI5Adapter.LOG.debug('[_placeAt.then] append oView to oTarget: ', result.oTarget);
					
					if(result.oTarget && that.isInstanceOf(result.oTarget, sap.m.Shell)){
						result.oTarget.setApp(result.oView);
						
					}else if(result.oTarget && that.isInstanceOf(result.oTarget, sap.m.App)){
						
						result.oTarget.addPage(result.oView).to(result.oView.sId, 'fade');
						
					}else if(result.oTarget && that.isInstanceOf(result.oTarget, sap.m.SplitApp)){
						result.oTarget.addDetailPage(result.oView).to(result.oView.sId, 'fade');
						
					}else if(result.oTarget && that.isInstanceOf(result.oTarget, sap.m.Page)){
						result.oTarget.removeAllContent();
						result.oTarget.addContent(result.oView);
					}else if(result.oTarget && 'string' === typeof result.oTarget.sId){
						result.oView.placeAt(result.oTarget.sId, sPosition);
						
					}else if(result.oTarget && 'string' === typeof result.oTarget.id){
						result.oView.placeAt(result.oTarget.id, sPosition);
						
					}else if(result.oTarget && 'string' === typeof result.oTarget){
						result.oView.placeAt(result.oTarget, sPosition);
					}else {
						
						UI5Adapter.LOG.error('[placeAt.than] append oView to oTarget failure: ', result.oTarget);
						
						// Promise.reject('append oView to oTarget failure');
						// throw new Error('append oView to oTarget failure');
					}
					
					return result;
				}).then((result) => {
					UI5Adapter.LOG.debug('[_placeAt] oView: ', result.oView);
					UI5Adapter.LOG.debug('[_placeAt] oTarget: ', result.oTarget);
					
					if(result.oTarget) {
						UI5Adapter.hideBusyIndicator(result.oTarget);
					}
				}).catch((error) => {
					// try{
					UI5Adapter.hideBusyIndicator();
					// }catch(exception) {
						
					// }
					UI5Adapter.LOG.error('[_placeAt] error: ', error);
				}).finally(() => {
					UI5Adapter.LOG.debug('[_placeAt] finally');
					
					/* setBusy */
					// if(oTarget && oTarget.setBusy) {
						// oTarget.setBusy(true);
					// }
				});
			}else {
				oXMLView.placeAt(oTarget.sId, sPosition);
			}
		}
		
		return that; 
	}

	
	static showBusyIndicator(oTarget) {
		if(oTarget) {
			if('function' === typeof oTarget.setBusyIndicatorDelay) {
				//oTarget.setBusyIndicatorDelay(1);
			}
			if('function' === typeof oTarget.setBusy) {
				oTarget.setBusy(true);
			}
		}else {
			sap.ui.core.BusyIndicator.show(1);
		}
	}
	
	static hideBusyIndicator(oTarget) {
		let timeoutID = window.setTimeout(function() {
			
			if(oTarget) {
				if('function' === typeof oTarget.setBusyIndicatorDelay) {
					//oTarget.setBusyIndicatorDelay(1);
				}
				if('function' === typeof oTarget.setBusy) {
					oTarget.setBusy(false);
				}
			}else {
				sap.ui.core.BusyIndicator.hide();
			}
		}, 1 * 1000);
	}
}