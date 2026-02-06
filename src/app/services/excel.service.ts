import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  exportToExcel(data: any[], fileName: string): void {
    // 1. Crear una "hoja de trabajo" (worksheet) a partir del JSON
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // 2. Crear un "libro de trabajo" (workbook)
    const workbook: XLSX.WorkBook = { 
      Sheets: { 'Tickets': worksheet }, 
      SheetNames: ['Tickets'] 
    };

    // 3. Generar el archivo y descargarlo
    XLSX.writeFile(workbook, `${fileName}_${new Date().getTime()}.xlsx`);
  }
}