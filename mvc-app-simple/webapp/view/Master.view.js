/*globals sap*/

sap.ui.jsview('sapville.sapui-study.mvc-app-simple.view.Master', {
  getControllerName: function () {
    return 'sapville.sapui-study.mvc-app-simple.controller.Master';
  },
  createContent: function (oController) {

    const aColumns = [
      new sap.m.Column({
        header: new sap.m.Text({
          text: 'ID'
        })
      }),
      new sap.m.Column({
        header: new sap.m.Text({
          text: 'Name'
        })
      })
    ];

    const oTableHeader = new sap.m.Toolbar({
      content: [
        new sap.m.Title({
          text: 'Number of Suppliers: {/CountSuppliers}'
        })
      ]
    });

    const oTable = new sap.m.Table({
      columns: aColumns,
      headerToolbar: oTableHeader
    });

    const oTemplate = new sap.m.ColumnListItem({
      type: 'Navigation',
      press: [oController.onListPress, oController],
      cells: [
        new sap.m.ObjectIdentifier({
          text: '{ID}'
        }),
        new sap.m.ObjectIdentifier({
          text: '{Name}'
        })
      ]
    });

    oTable.bindItems('/Suppliers', oTemplate);

    return new sap.m.Page({
      title: 'Supplier Overview',
      content: [oTable]
    });
  }
});