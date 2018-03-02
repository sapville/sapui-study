/*globals sap*/

sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/core/routing/History',
  'sap/ui/layout/VerticalLayout',
  'sapville/sapui-study/mvc-app-simple/model/formatter',
  'sapville/sapui-study/mvc-app-simple/model/types'
], function (Controller, History, VerticalLayout, formatter, types) {
  'use strict';
  return Controller.extend('sapville.sapui-study.mvc-app-simple.controller.Detail', {
    formatter: formatter,
    types: types,
    onInit: function () {
      this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      this._oRouter.getRoute('detail').attachPatternMatched(this._onDetailMatched, this);
    },
    _onDetailMatched: function (oEvent) {
      const sObjectPath = `/Suppliers/${oEvent.getParameter('arguments').ID}`;
      this.getView().bindElement(sObjectPath);
      this._createProductAggregation();
    },
    _createProductAggregation: function () {
      const oTable = this.getView().byId('table');
      oTable.bindAggregation('items', 'Products', function (sId, oContext) {

        const oColumnListItem = new sap.m.ColumnListItem(sId);
        oColumnListItem.addCell(new sap.m.ObjectIdentifier({
          text: '{ID}'
        }));

        if (oContext.getProperty('Allergenics')) {
          oColumnListItem.addCell(new VerticalLayout({
            content: [
              new sap.m.Text({
                text: '{Name}'
              }),
              new sap.m.Text({
                text: '{Allergenics}'
              })
            ]
          }));
        } else {
          oColumnListItem.addCell( new sap.m.ObjectIdentifier({
            text: '{Name}'
          }));
        }

        oColumnListItem.addCell( new sap.m.ObjectNumber({
          number: '{Price}',
          unit: 'USD'
        }));

        return oColumnListItem;
      });
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
