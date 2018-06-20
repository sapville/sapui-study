/* globals sap */

sap.ui.define([
  'sap/ui/model/json/JSONModel'
], function (JSONModel) {
  'use strict';

  return JSONModel.extend('sapville.sapui-study.mvc-app-simple', {
    saveEntry: function (oObject, sUrl, sLocalPath) {
      const oData = JSON.stringify(oObject);
      const that = this;
      let sType;
      if (sLocalPath) {
        sType = 'PUT';
      } else {
        sType = 'POST';
      }
      jQuery.ajax({
        type: sType,
        contentType: 'application/json',
        data: oData,
        url: sUrl,
        dataType: 'json',
        success: function () {
          that._updateModel(sLocalPath, oObject);
          that.createEntry(true); //call create Entry to reset the dummy property to empty values
          that.fireRequestCompleted({
            path: sLocalPath
          });
        },
        error: function () {
          that.fireRequestFailed();
        }
      });
    },

    _updateModel: function (sLocalPath, data) {
      if (sLocalPath) {
        this.setProperty(sLocalPath, data);
      } else {
        this.setData(this.getData().concat(data));
      }

    },

    createEntry: function (bClear = false) {
      if (!bClear) {
        this.setProperty(this.getDummyEntry(),
          {
            'ID': '',
            'Name': '',
            'Address': {
              'Street': '',
              'City': '',
              'State': '',
              'ZipCode': '',
              'Country': '',
              'PhoneNumber': ''
            }
          });
      } else {
        this.setProperty(this.getDummyEntry(),{});
      }
    },

    getDummyEntry: function () {
      return '/createEntry';
    },

    getNewID: function () {
      const aData = this.getData();
      return aData[aData.length - 1].ID + 1;
    }

  });
});