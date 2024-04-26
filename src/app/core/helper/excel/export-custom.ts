
import * as Excel from "exceljs/dist/exceljs.min.js";
import * as fs from "file-saver";
export class ExportCustom {
    static  workbook = new Excel.Workbook();

    static inputExcel(headerDefault,headerTable,title,listData,isBorder,defaultColumn,defaultNumber){
        let header;
        if(headerDefault !== null){
            header=this.headerDefault(headerDefault.report_name,
                headerDefault.date,headerDefault.merchant_name,
                headerDefault.from,headerDefault.to);
        }
        let data=[];
        for(let i=0;i<listData.length;i++){
            let valuesArray = Object.values(listData[i]);
            let array=[];
            array.push(i+1);
            for (let value of valuesArray) {
                array.push(value);
            }
            data.push(array);
        }
        const worksheet = this.workbook.addWorksheet(title);
        this.exportTemplate(worksheet,headerTable,data,isBorder,defaultColumn,defaultNumber,header);
    }
    static exportTemplate(worksheets,headerTable,listData,isBorder,defaultColumn,defaultNumber,defaultheader=null){

        // const columnStart= defaultColumn !== null ? "A": defaultColumn;
        // const numberStart= defaultNumber !== null ? 10: defaultNumber;

        let obj=headerTable;

        const worksheet = worksheets;
        if(defaultheader !=null){
          for(let i=0;i<defaultheader.length;i++){
            worksheet.getCell(defaultheader[i].cell).value=defaultheader[i].key;
            if(defaultheader[i].mergeCells !== undefined){
              worksheet.mergeCells(defaultheader[i].mergeCells);
            }
            if(defaultheader[i].style !== undefined){
              worksheet.getCell(defaultheader[i].cell).font=defaultheader[i].style.font;
            }
          }
        }
        this.buildHeader(worksheet,obj,10,true);
        for(let i=0;i<listData.length;i++){
            worksheet.addRow(listData[i]);
        }
        if(isBorder){
            worksheet.eachRow(function(row, rowNumber) {
                if(rowNumber > 9){
                  row.eachCell({ includeEmpty: true },function(cell, colNumber) {
                    cell.border ={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                  });
                }
              });
        }
        this.workbook.xlsx.writeBuffer().then(res => {
            const blob = new Blob([res], {
              type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });
            fs.saveAs(
              blob,
              "Hello" + ".xlsx"
            );
          });
          this.workbook.removeWorksheet(worksheet.id);

  }
  static buildHeader(worksheet,obj,bonus,isChild=false,xnew=0,colspanParent=0,isBorder=false){
        let columnExtract= this._buildColumnExcel();
        let isNext=false;
        colspanParent=(colspanParent > 0?(colspanParent-1):0);
        for(let i=0;i<obj.length;i++){
          let x=isChild? xnew + (colspanParent+i): (isNext?i+1:i);
          let colspan=0;
          let rowspan=0;
          let cellCurrent=columnExtract[x].toUpperCase().concat((bonus).toString());
          worksheet.getCell(cellCurrent).value=obj[i].title;
          worksheet.getColumn(i+1).width=obj[i].title.length + 10;
          if(isBorder){
            worksheet.getCell(cellCurrent).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
          }
          isNext=false;
          if(obj[i].colspan !== undefined){
            colspan=obj[i].colspan;
            for(let j=0;j<obj[i].colspan;j++){
              worksheet.mergeCells(cellCurrent+':'+columnExtract[x+1].toUpperCase().concat((bonus).toString()));
              isNext=true;
            }
          }

          if(obj[i].rowspan !== undefined){
            rowspan=obj[i].rowspan;
            for(let j=0;j<obj[i].rowspan;j++){
              worksheet.mergeCells(cellCurrent+':'+columnExtract[x].toUpperCase().concat((bonus+1).toString()));
              isNext=false;
            }
          }
          if(obj[i].child !== undefined){
            this.buildHeader(worksheet,obj[i].child,bonus+1+rowspan,true,x,colspan);
          }
        }
  }
  static _buildColumnExcel(){
    var i3, i4;
    var text3 = [];

    for (i3 = 0; i3 < 26; i3++) {
      text3.push(String.fromCharCode(97 + i3) + ", ");
    }
    for (i3 = 0; i3 < 26; i3++) {
      for (i4 = 0; i4 < 26; i4++) {
        text3.push(String.fromCharCode(97 + i3) + String.fromCharCode(97 + i4) + ", ");
      }
    }
    return text3;
  }
  static headerDefault(report_name,date,merchant_name,from,to){
    let input=[
      {
        key:"Mẫu báo cáo "+report_name,
        cell:"A1",
        mergeCells:"A1:C1",
        style:{
          font:{
            bold: true,
            size: 14,
          }
        }
      },
      {
        key:"ITE",
        cell:"B2",
        mergeCells:"B2:D2",
        style:{
          font:{
            bold: true,
            size: 14,
          }
        }
      },
      {
        key:"Số BC:",
        cell:"B3",
        style:{
          font:{
            bold: true,
            size: 13,
          }
        }
      },
      {
        key:"Ngày lập biểu: ",
        cell:"F3",
        mergeCells:"F3:G3",
        style:{
          font:{
            bold: true,
            size: 13,
          }
        }
      },
      {
        key:"Tên đơn vị:"+merchant_name,
        cell:"B4",
        mergeCells:"B4:C4",
        style:{
          font:{
            bold: true,
            size: 13,
          }
        }
      },
      {
        key:"BÁO CÁO DOANH THU GIAO DỊCH DỊCH VỤ CỔNG THANH TOÁN ĐIỆN TỬ",
        cell:"B6",
        mergeCells:"B6:G6",
        style:{
          font:{
            bold: true,
            size: 17,
          }
        }
      },
      {
        key:"Thời gian từ 00:00:00 ngày "+from + " đến 23:59:59 ngày "+to,
        cell:"B7",
        mergeCells:"B7:G7",
        style:{
          font:{
            italic: true,
            size: 14,
          }
        }
      }
    ];
    return input;
  }


}
