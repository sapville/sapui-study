/* globals sap */

sap.ui.define([
  'sap/ui/Device',
  'sap/ui/model/json/JSONModel'
], function (Device, JSONModel) {
  'use strict';
  return {
    createDeviceModel: function () {
      const oModel = new JSONModel(Device);
      oModel.setDefaultBindingMode('OneWay');
      return oModel;
    }
  };
}
);