/*globals sap*/

sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/core/UIComponent',
  'sap/ui/model/json/JSONModel'
], function (Controller, Component, JSONModel) {
  'use strict';
  return Controller.extend('sapville.sapui-study.mvc-app-simple.controller.Master', {
    onInit: function () {
      this._oRouter = Component.getRouterFor(this);
      this._IDSorter = new sap.ui.model.Sorter('ID', false);
      this._NameSorter = new sap.ui.model.Sorter('Name', false);
      this._SuppliersFilter = new sap.ui.model.Filter({
        path: 'Products',
        test: function (value) {
          if (value && value.length > 0) {
            return true;
          }
        }
      });
      this._CountryFilter = new sap.ui.model.Filter({
        path: 'Address/Country',
        operator: sap.ui.model.FilterOperator.EQ,
        value1: 'USA'
      });
      this.getView().setModel(
        new JSONModel({
          'filterProduct': false,
          'filterCountry': false
        }),
        'viewModel'
      );

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

    onFilterSuppliers: function () {
      const oViewModel = this.getView().getModel('viewModel');
      let aFilters = [];
      if (oViewModel.getProperty('/filterProduct')) {
        aFilters.push(this._SuppliersFilter);
      }
      if (oViewModel.getProperty('/filterCountry')) {
        aFilters.push(this._CountryFilter);
      }
      this.byId('table').getBinding('items').filter(aFilters);
    }
    
  });
});