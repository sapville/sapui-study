/*globals sap*/

sap.ui.define([
  'sap/ui/core/UIComponent',
  'sapville/sapui-study/mvc-app-simple/model/models'
], function (UIComponent, models) {
  'use strict';

  return UIComponent.extend('sapville.sapui-study.mvc-app-simple.Component', {
    metadata: {
      'manifest': 'json'
    },
    init: function () {
      UIComponent.prototype.init.apply(this, arguments);

      this.setModel(
        models.createDeviceModel(),
        'device'
      );

      this.getRouter().initialize();
    }
  });
});