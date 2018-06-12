/* globals sap */

sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sapville/sapui-study/mvc-app-simple/model/types',
  'sap/m/MessageToast'
], function (Controller, types, MessageToast) {
  'use strict';
  return Controller.extend('sapville.sapui-study.mvc-app-simple.controller.Edit', {
    types: types,
    onInit: function () {
      this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      this._oRouter.getRoute('edit').attachPatternMatched(this._onEditMatched, this);

      sap.ui.getCore().getMessageManager().registerObject(this.getView().byId('phoneInput'), true);

    },

    _onEditMatched: function (oEvent) {
      const sObjectPath = `/${oEvent.getParameter('arguments').ID}`;
      this.getView().bindElement(sObjectPath);
    },

    onNavPress: function (oEvent) {
      const sPath = oEvent.getSource().getBindingContext().getPath('');
      this._oRouter.navTo('detail', {
        ID: sPath.substr(1)
      });
    },

    onSave: function () {
      const oModel = this.getView().getModel();
      const sPath = this.getView().getElementBinding().getPath();
      const oObject = oModel.getProperty(sPath);

      const oView = this.getView();
      const oInput = oView.byId('phoneInput');
      try {
        oInput.getBinding('value').getType().validateValue(oInput.getValue());
      } catch (e) {
        oInput.setValueState('Error');
        MessageToast.show('Phone validation error');
        return;
      }

      oModel.attachEventOnce('requestCompleted', function () {
        this._oRouter.navTo('master');
        // this.getView().getModel('viewModel').setProperty('/createMode', false);
      }, this);


      oModel.attachEventOnce('requestFailed', function () {
        MessageToast.show(this.getView().getModel('i18n').getResourceBundle().getText('updateFailed'));
      }, this);

      oModel.saveEntry(oObject, '/Suppliers/' + oObject.ID, sPath);
    }
  });
});