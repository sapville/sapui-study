/*globals sap*/

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
      },
      'routing': {
        'config': {
          'routerClass': 'sap.m.routing.Router',
          'viewType': 'XML',
          'viewPath': 'sapville.sapui-study.mvc-app-simple.view',
          'controlId': 'app',
          'controlAggregation': 'pages',
          'transition': 'slide'
          /*
                    'transition': 'flip'
                    'transition': 'fade'
                    'transition': 'show'
          */
        },
        'routes': [
          {
            'pattern': '',
            'name': 'master',
            'target': 'master'
          },
          {
            'pattern': 'detail/{ID}',
            'name': 'detail',
            'target': 'detail'
          }
        ],
        'targets': {
          'master': {
            'viewName': 'Master',
            'viewLevel': 1
          },
          'detail': {
            'viewName': 'Detail',
            'viewLevel': 2
          }
        }
      }
    },
    init: function () {
      UIComponent.prototype.init.apply(this, arguments);
      this.getRouter().initialize();
    },
    createContent: function () {

      this.setModel(new JSONModel(this.getMetadata().getConfig().serviceURL));

      //call a function from the super-class since the original one wae overwritten with this method
      return UIComponent.prototype.createContent.apply(this, arguments);
    }
  });
});