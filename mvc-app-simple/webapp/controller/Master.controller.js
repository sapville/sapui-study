/*globals sap oApp*/

sap.ui.define(['sap/ui/core/mvc/Controller'], function (Controller) {
  'use strict';
  return Controller.extend('sapville.sapui-study.mvc-app-simple.controller.Master', {
    onInit: function () {
    },
    
    onListPress: function (oEvent) {
      const sPageId = oApp.getPages()[1].getId();
      oApp.to(sPageId);
      const oPage = oApp.getPage(sPageId);
      oPage.setBindingContext(oEvent.getSource().getBindingContext());
    }
  });
});