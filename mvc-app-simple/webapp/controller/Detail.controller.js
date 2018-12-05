/*globals sap*/

sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/core/routing/History',
  // 'sap/ui/layout/VerticalLayout',
  'sapville/sapui-study/mvc-app-simple/model/formatter',
  'sapville/sapui-study/mvc-app-simple/model/types',
  'sap/m/MessageToast'
// ], function (Controller, History, VerticalLayout, formatter, types) {
], function (Controller, History, formatter, types, MessageToast) {
  'use strict';
  return Controller.extend('sapville.sapui-study.mvc-app-simple.controller.Detail', {
    formatter: formatter,
    types: types,
    onInit: function () {
      this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      this._oRouter.getRoute('detail').attachPatternMatched(this._onDetailMatched, this);

      const oModel = new sap.ui.model.json.JSONModel({
        buttonPrev: false,
        buttonNext: false
      });
      this.getView().setModel(oModel, 'viewModel');
    },

    _onDetailMatched: function (oEvent) {
      this.sObjectId = oEvent.getParameter('arguments').ID;
      const sObjectPath = `/${this.sObjectId}`;
      this.getView().bindElement(sObjectPath);
      this._updateViewModel();
    },

    _updateViewModel: function () {
      const oModel = this.getView().getModel();
      const nextObjectId = parseInt(this.sObjectId) + 1;
      const prevObjectId = parseInt(this.sObjectId) - 1;
      const bNext = !!oModel.getProperty('/' + nextObjectId);
      const bPrev = !!oModel.getProperty('/' + prevObjectId);
      const oViewModel = this.getView().getModel('viewModel');
      oViewModel.setProperty('/buttonNext', bNext);
      oViewModel.setProperty('/buttonPrev', bPrev);
    },

    onNavPress: function () {
      this._oRouter.navTo('master');
    },

    onPageUp: function (oEvent) {
      let sID = oEvent.getSource().getBindingContext().sPath;
      sID = parseInt(sID.substr(sID.lastIndexOf('/') + 1)) - 1;
      this._oRouter.navTo('detail', {ID: sID});
    },

    onPageDown: function (oEvent) {
      let sID = oEvent.getSource().getBindingContext().sPath;
      sID = parseInt(sID.substr(sID.lastIndexOf('/') + 1)) + 1;
      this._oRouter.navTo('detail', {ID: sID});
    },
    
    onEdit: function () {
      this._oRouter.navTo('edit', {
        ID: this.getView().getElementBinding().getPath().substr(1)
      }, false);
    },

    onDelete: function () {
      const that = this;
      const oView = this.getView();
      const oModel = oView.getModel();
      const sPath = oView.getElementBinding().getPath();
      oModel.attachEventOnce(
        'requestCompleted',
        function () {
          const oCountModel = oView.getModel('count');
          oCountModel.setProperty('/CountSuppliers',oCountModel.getProperty('/CountSuppliers') - 1);
          that._oRouter.navTo('master');
        },
        this);
      oModel.attachEventOnce(
        'requestFailed',
        function () {
          MessageToast.show(that.getView().getModel('i18n').getResourceBundle().getText('deleteFailed'));
        },
        this
      );
      oModel.delete('/Suppliers/'+oModel.getProperty(sPath).ID, sPath);
    }
  });
});
