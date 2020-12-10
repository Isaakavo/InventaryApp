import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import ExcelJs from 'exceljs/dist/es5/exceljs.browser';
import saveAs from 'file-saver';
import { header } from '../util/header';
import { companies } from '../util/companies';
import dayjs from 'dayjs';
import MyButton from '../util/MyButton';
//Icons
import SaveAlt from '@material-ui/icons/SaveAlt';

//firebase and redux
import { firestore } from '../firebaseConfig';

const styles = (theme) => ({
  ...theme.spreadThis,
});

const CreateExcelFile = () => {
  //Funciton to export excel
  function excelExport() {
    firestore
      .collection('inventario')
      .orderBy('numero')
      .get()
      .then((res) => {
        const elements = [];
        res.forEach((doc) => {
          elements.push({ id: doc.id, ...doc.data() });
        });
        const workbook = new ExcelJs.Workbook();
        companies.forEach((company) => {
          const workSheet = workbook.addWorksheet(company.label);
          workSheet.mergeCells('A1:G1');
          workSheet.getCell('G1').value = company.label;
          workSheet.getCell('G1').font = {
            name: 'Calibri',
            bold: true,
            size: 11,
          };
          workSheet.getCell('A1').alignment = {
            vertical: 'middle',
            horizontal: 'center',
          };
          let headerRow = workSheet.addRow();
          let totalColumns = header.map((head, i) => {
            let cell = headerRow.getCell(i + 1);
            cell.value = head.header;
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
            cell.font = {
              size: 10,
              bold: true,
            };
            cell.alignment = {
              vertical: 'middle',
              horizontal: 'center',
            };
            let column = workSheet.getColumn(i + 1);
            column.width = head.width;
            return head.key;
          });
          elements.forEach((element) => {
            if (element.empresa === company.value) {
              let elementRow = workSheet.addRow();
              for (let i = 0; i < totalColumns.length; i++) {
                let cell = elementRow.getCell(i + 1);
                cell.value = element[totalColumns[i]];
                cell.border = {
                  top: { style: 'thin' },
                  left: { style: 'thin' },
                  bottom: { style: 'thin' },
                  right: { style: 'thin' },
                };
                cell.font = {
                  size: 10,
                };
                cell.alignment = {
                  vertical: 'middle',
                  horizontal: 'center',
                };
              }
              elementRow.height = 30;
            }
          });
        });
        workbook.xlsx.writeBuffer().then((buffer) => {
          const date = new Date().toISOString();
          const actualDate = dayjs(date).format('DD/MM/YYYY');
          saveAs(
            new Blob([buffer], { type: 'application/octet-stream' }),
            `Inventario-${actualDate}.xlsx`
          );
        });
      });
  }
  return (
    <>
      <MyButton
        tip='Descargar Excel'
        color='secondary'
        onClick={() => excelExport()}
      >
        <SaveAlt />
      </MyButton>
    </>
  );
};

export default withStyles(styles)(CreateExcelFile);
