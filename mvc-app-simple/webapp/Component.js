/*globals sap*/

sap.ui.define([
  'sap/ui/core/UIComponent',
  'sapville/sapui-study/mvc-app-simple/model/models',
  'sapville/sapui-study/mvc-app-simple/model/AppModel'
], function (UIComponent, models, AppModel) {
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

      const oAppModel = new AppModel();
      jQuery.ajax({
        contentType: 'application/json',
        url: '/Suppliers',
        dataType: 'json',
        success: function (oData) {
          oAppModel.setData(oData);
        },
        error: function () {
          alert('an error occurred retrieving the data');
        }
      });

      this.setModel(oAppModel);

      this.getRouter().initialize();
    }
  });
});