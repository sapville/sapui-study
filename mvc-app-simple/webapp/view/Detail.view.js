/*globals sap*/

sap.ui.jsview('sapville.sapui-study.mvc-app-simple.view.Detail', {
  getControllerName: function () {
    return 'sapville.sapui-study.mvc-app-simple.controller.Detail';
  },
  createContent: function (oController) {
    const oObjectHeader = new sap.m.ObjectHeader({
      title: '{Name}',
      number: 'ID: {ID}',
      attributes: [
        new sap.m.ObjectAttribute({
          text: '{Address/Country}'
        })
      ]
    });

    return new sap.m.Page({
      title: 'Supplier Details',
      showNavButton: true,
      navButtonPress: [oController.onNavPress, oController],
      content: [oObjectHeader]
    });
  }
});
