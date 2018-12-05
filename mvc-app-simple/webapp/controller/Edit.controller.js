/* globals sap */

sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sapville/sapui-study/mvc-app-simple/model/types',
  'sap/m/MessageToast',
  'sap/ui/model/json/JSONModel'
], function (Controller, types, MessageToast, JSONModel) {
  'use strict';
  return Controller.extend('sapville.sapui-study.mvc-app-simple.controller.Edit', {
    types: types,
    onInit: function () {
      this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      this._oRouter.getRoute('edit').attachPatternMatched(this._onRouteMatched, this);

      sap.ui.getCore().getMessageManager().registerObject(this.getView().byId('phoneInput'), true);

      this.getView().setModel(
        new JSONModel({
          'createMode': false,
          'editTitle': ''//'{i18n>editDetailTitle} - {Name}'
        }),
        'viewModel'
      );

    },

    _onRouteMatched: function (oEvent) {
      const id = oEvent.getParameter('arguments').ID;
      let sObjectPath;
      const oViewModel = this.getView().getModel('viewModel');
      const oModel = this.getView().getModel();
      if (!id) { //Creating a new entry
        const sNewID = oModel.getNewID();
        oViewModel.setProperty('/createMode', true);
        oViewModel.setProperty('/editTitle',
          this.getView().getModel('i18n').getProperty('newDetailTitle')
        );
        oModel.createEntry();
        oModel.setProperty(oModel.getDummyEntry() + '/ID', sNewID);
        sObjectPath = oModel.getDummyEntry();
      } else { //Editing an existing entry
        oViewModel.setProperty('/createMode', false);
        oViewModel.setProperty('/editTitle',
          `${this.getView().getModel('i18n').getProperty('editDetailTitle')} - `
        );
        sObjectPath = `/${id}`;
      }

      this.getView().bindElement(sObjectPath);
    },

    onNavPress: function (oEvent) {
      if (this.getView().getModel('viewModel').getProperty('/createMode')) {
        this._oRouter.navTo('master');
      } else {
        const sPath = oEvent.getSource().getBindingContext().getPath('');
        this._oRouter.navTo('detail', {
          ID: sPath.substr(1)
        });
      }
    },

    onSave: function () {
      const oModel = this.getView().getModel();
      let sPath = this.getView().getElementBinding().getPath();
      const oObject = oModel.getProperty(sPath);
      const oView = this.getView();
      const oInput = oView.byId('phoneInput');
      let sUrl;
      try {
        oInput.getBinding('value').getType().validateValue(oInput.getValue());
      } catch (e) {
        oInput.setValueState('Error');
        MessageToast.show('Phone validation error');
        return;
      }

      oModel.attachEventOnce('requestCompleted', function (oEvent) {
        const oView = this.getView();
        const oCountModel = oView.getModel('count');
        const sPath = oEvent.getParameter('path');
        if (!sPath){
          this._oRouter.navTo('master');
          oCountModel.setProperty('/CountSuppliers',oCountModel.getProperty('/CountSuppliers') + 1);
        } else  {
          this._oRouter.navTo('detail', {ID: sPath.substr(1)});
        }
      }, this);

      oModel.attachEventOnce('requestFailed', function () {
        MessageToast.show(this.getView().getModel('i18n').getResourceBundle().getText('updateFailed'));
      }, this);

      if (!this.getView().getModel('viewModel').getProperty('/createMode')) {
        sUrl = '/Suppliers/' + oObject.ID;
      } else {
        sUrl = '/Suppliers';
        sPath = null;
      }

      oModel.saveEntry(oObject, sUrl, sPath);
    }
  });
});