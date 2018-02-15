/*globals sap*/

sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/core/routing/History',
  'sapville/sapui-study/mvc-app-simple/model/formatter'
], function (Controller, History, formatter) {
  'use strict';
  return Controller.extend('sapville.sapui-study.mvc-app-simple.controller.Detail', {
    formatter: formatter,
    onInit: function () {
      this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      this._oRouter.getRoute('detail').attachPatternMatched(this._onDetailMatched, this);
    },
    _onDetailMatched: function (oEvent) {
      const sObjectPath = `/Suppliers/${oEvent.getParameter('arguments').ID}`;
      this.getView().bindElement(sObjectPath);
    },
    onNavPress: function () {
      if (History.getInstance().getPreviousHash()) {
        window.history.go(-1);
      } else {
        this._oRouter.navTo('master');
      }
    }
  });
});
