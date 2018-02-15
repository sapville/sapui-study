/*globals sap*/

sap.ui.define([], function () {
  'use strict';

  return {
    /**
     * custom formatter used in Detail view's header
     * @param sName
     * @returns {*|string}
     */
    formatUpperCase: function (sName) {
      return sName && sName.toUpperCase();
    }
  };
});