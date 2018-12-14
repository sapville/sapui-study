/*globals sap*/

sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/core/UIComponent'
], function (Controller, Component) {
  'use strict';
  return Controller.extend('sapville.sapui-study.mvc-app-simple.controller.Master', {
    onInit: function () {
      this._oRouter = Component.getRouterFor(this);
      this._IDSorter = new sap.ui.model.Sorter('ID', false);
      this._NameSorter = new sap.ui.model.Sorter('Name', false);
    },

    onListPress: function (oEvent) {
      const oRouter = Component.getRouterFor(this);
      const oItem = oEvent.getSource();
      oRouter.navTo('detail', {
        ID: oItem.getBindingContext().getPath().substr(1)
      });
    },

    onAddSupplier: function () {
      this._oRouter.navTo('edit');
    },
    
    onSortID: function () {
      this._IDSorter.bDescending = !this._IDSorter.bDescending;
      this.byId('table').getBinding('items').sort(this._IDSorter);
    },

    onSortName: function () {
      this._NameSorter.bDescending = !this._NameSorter.bDescending;
      this.byId('table').getBinding('items').sort(this._NameSorter);
    },

  });
});