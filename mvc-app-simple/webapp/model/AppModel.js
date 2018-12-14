/* globals sap */

sap.ui.define([
  'sap/ui/model/json/JSONModel'
], function (JSONModel) {
  'use strict';

  return JSONModel.extend('sapville.sapui-study.mvc-app-simple', {
    delete: function (sUrl, sLocalPath) {
      const that = this;
      jQuery.ajax({
        type: 'DELETE',
        contentType: 'application/json',
        url: sUrl,
        dataType: 'json',
        async: true,
        success: function () {
          that._updateModel(sLocalPath, null, sUrl);
          that.fireRequestCompleted();
        },
        error: function () {
          that.fireRequestFailed();
        }
      });
    },

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
        async: true,
        success: function () {
          that._updateModel(sLocalPath, oObject, sUrl);
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
      if (!data){ //Delete Entry
        const aData = this.getData();
        aData.splice(sLocalPath.substr(1), 1);
        this.setData(aData);
        this.refresh();
      } else if (sLocalPath) {  //Insert entry
        this.setProperty(sLocalPath, data);
      } else {
        this.setData(this.getData().concat(data)); //Update Entry
      }
      /*
      //To make sure that the data model was updated
      jQuery.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: sUrl,
        dataType: 'json',
        success: function (oData) {
          console.log(oData, sUrl, sLocalPath);
        },
        error: function () {
          console.log('Error', sUrl, sLocalPath);
        }
      });
      */
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
      const curNum = aData.length === 0 ? -1 : aData[aData.length - 1].ID;
      return (curNum) + 1;
    }

  });
});