/*globals sap oApp*/

sap.ui.define(['sap/ui/core/mvc/Controller'], function (Controller) {
  'use strict';
  return Controller.extend('sapville.sapui-study.mvc-app-simple.controller.Detail', {
    onNavPress: function () {
      oApp.back();
    }
  });
});
