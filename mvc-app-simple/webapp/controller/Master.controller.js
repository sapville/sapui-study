/*globals sap*/

sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/core/UIComponent'
], function (Controller, Component) {
  'use strict';
  return Controller.extend('sapville.sapui-study.mvc-app-simple.controller.Master', {
    onInit: function () {
      this._oRouter = Component.getRouterFor(this);
    },

    onListPress: function (oEvent) {
      const oRouter = Component.getRouterFor(this);
      const oItem = oEvent.getSource();
      oRouter.navTo('detail', {
        ID: oItem.getBindingContext().getProperty('ID')
      });
    },

    onAddSupplier: function () {
      this._oRouter.navTo('edit');
    }
  });
});