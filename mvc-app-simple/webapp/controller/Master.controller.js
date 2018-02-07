/*globals sap*/

sap.ui.define(['sap/ui/core/mvc/Controller'], function (Controller) {
  'use strict';
  return Controller.extend('sapville.sapui-study.mvc-app-simple.controller.Master', {
    onInit: function () {
    },

    onListPress: function (oEvent) {
      const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      const oItem = oEvent.getSource();
      oRouter.navTo('detail', {
        ID: oItem.getBindingContext().getProperty('ID')
      });
    }
  });
});