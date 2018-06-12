/* globals sap */

sap.ui.define([
  'sap/ui/model/json/JSONModel'
], function (JSONModel) {
  'use strict';

  return JSONModel.extend('sapville.sapui-study.mvc-app-simple', {
    saveEntry: function (oObject, sUrl, sLocalPath) {
      const oData = JSON.stringify(oObject);
      const that = this;
      jQuery.ajax({
        type: 'PUT',
        contentType: 'application/json',
        data: oData,
        url: sUrl,
        dataType: 'json',
        success: function () {
          that._updateModel(sLocalPath, oObject);
          // that.createEntry('/'); //call create Entry to reset the dummy property to empty values
          that.fireRequestCompleted();
        },
        error: function () {
          that.fireRequestFailed();
        }
      });
    },

    _updateModel: function (sLocalPath, data) {
      this.setProperty(sLocalPath, data);
    }
  });
});