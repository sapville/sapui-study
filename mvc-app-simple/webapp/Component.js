/*globals sap oApp*/

sap.ui.define([
  'sap/ui/core/UIComponent',
  'sap/ui/model/json/JSONModel'
], function (UIComponent, JSONModel) {
  'use strict';

  return UIComponent.extend('sapville.sapui-study.mvc-app-simple.Component', {
    metadata: {
      'rootView': 'sapville.sapui-study.mvc-app-simple.view.App',
      'config': {
        'serviceURL': '../service/data.json'
      }
    },
    createContent: function () {

      this.setModel(new JSONModel(this.getMetadata().getConfig().serviceURL));

      //call a function from the super-class since the original one wae overwritten with this method
      const oRootView = UIComponent.prototype.createContent.apply(this, arguments);
      oApp = oRootView.byId('app');
      return oRootView;
    }
  });
});