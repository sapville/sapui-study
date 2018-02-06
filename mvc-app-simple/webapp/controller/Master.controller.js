/*globals sap oApp*/

sap.ui.define(['sap/ui/core/mvc/Controller'], function (Controller) {
  'use strict';
  return Controller.extend('sapville.sapui-study.mvc-app-simple.controller.Master', {
    onInit: function () {
      const oData = {
        'CountSuppliers': 2,
        'Suppliers': [
          {
            'ID': 0,
            'Name': 'Exotic Liquids',
            'Address': {
              'Street': 'NE 228th',
              'City': 'Sammamish',
              'State': 'WA',
              'ZipCode': '98074',
              'Country': 'USA'
            }
          },
          {
            'ID': 1,
            'Name': 'Tokyo Traders',
            'Address': {
              'Street': 'NE 40th',
              'City': 'Redmond',
              'State': 'WA',
              'ZipCode': '98052',
              'Country': 'USA'
            }
          }
        ]
      };

      const oModel = sap.ui.model.json.JSONModel();
      oModel.setData(oData);
      sap.ui.getCore().setModel(oModel);
    },
    
    onListPress: function (oEvent) {
      const sPageId = oApp.getPages()[1].getId();
      oApp.to(sPageId);
      const oPage = oApp.getPage(sPageId);
      oPage.setBindingContext(oEvent.getSource().getBindingContext());
    }
  });
});