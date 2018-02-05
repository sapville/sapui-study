/*globals sap*/

sap.ui.jsview('sapville.sapui-study.view-types.view.View', {
  getControllerName: function () {
    return 'sapville.sapui-study.view-types.controller.View';
  },
  createContent: function (oController) {

    const oButton = new sap.m.Button({
      text: 'Hello World!',
      icon: 'sap-icon://accept',
      width: '200px',
      type: 'Accept',
      press: [oController.onPress, oController]
    });

    const oPanel = new sap.m.Panel({
      content: [oButton]
    });

    return new sap.m.Page({
      title: 'Hello World!',
      content: [oPanel]
    });

  }
});