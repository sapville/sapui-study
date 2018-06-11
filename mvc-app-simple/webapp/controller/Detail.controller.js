/*globals sap*/

sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/core/routing/History',
  // 'sap/ui/layout/VerticalLayout',
  'sapville/sapui-study/mvc-app-simple/model/formatter',
  'sapville/sapui-study/mvc-app-simple/model/types'
// ], function (Controller, History, VerticalLayout, formatter, types) {
], function (Controller, History, formatter, types) {
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
      // this._createProductAggregation();
    },
    /*
        _createProductAggregation: function () {
          const oTable = this.getView().byId('table');
          oTable.bindAggregation('items', 'Products',
            function (sId, oContext) {
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
                oColumnListItem.addCell(new sap.m.ObjectIdentifier({
                  text: '{Name}'
                }));
              }

              oColumnListItem.addCell(new sap.m.ObjectNumber({
                number: '{Price}',
                unit: 'USD'
              }));
              return oColumnListItem;
            }
          )
          ;
        },
    */

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
      /*
            if (History.getInstance().getPreviousHash()) {
              window.history.go(-1);
            } else {
              this._oRouter.navTo('master');
            }
      */
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
    }
  });
});
