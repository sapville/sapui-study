/*globals sap*/

sap.ui.define(['sap/ui/core/mvc/Controller'], function (Controller) {
  'use strict';
  return Controller.extend('sapville.sapui-study.view-types.controller.View', {
    onPress: function () {
      alert('Hello World!');
    }
  });
});