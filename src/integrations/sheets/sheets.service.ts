import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SheetsService {
  constructor(
    @Inject(ConfigService)
    private configService: ConfigService,
  ) {}

  // /**
  //  * To safely call sheets API with error handling
  //  * @param callback
  //  * @returns
  //  */
  // async invoke<T>(callback: () => Promise<T>): Promise<T> {
  //   try {
  //     return await callback();
  //   } catch (e) {
  //     if (e.constructor.name === 'GaxiosError') {
  //       const { errors, code } = e;
  //       throw new HttpException(
  //         {
  //           statusCode: code,
  //           errors,
  //         },
  //         code,
  //       );
  //     }
  //     throw e;
  //   }
  // }

  // getSpreadsheetId() {
  //   return this.spreadsheetId;
  // }

  // columnToLetter(column: number) {
  //   let temp,
  //     letter = '';
  //   while (column > 0) {
  //     temp = (column - 1) % 26;
  //     letter = String.fromCharCode(temp + 65) + letter;
  //     column = (column - temp - 1) / 26;
  //   }
  //   return letter;
  // }

  // letterToColumn(letter: string) {
  //   let column = 0;
  //   length = letter.length;
  //   for (let i = 0; i < length; i++) {
  //     column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  //   }
  //   return column;
  // }

  // /**
  //  * Generate google sheets range string from rows and columns
  //  * @param sheetName sheet name
  //  * @param rowStart start row;
  //  * @param colStart start col;
  //  * @param multiple[0] rowCount How many rows; < 1 for infinite rows
  //  * @param multiple[1] colCount How many columns; < 1 for infinite cols
  //  * @returns range string
  //  */
  // generateRange(
  //   sheetName: string,
  //   rowStart: number,
  //   colStart: number,
  //   multiple?: [number, number],
  // ) {
  //   const firstCell = `${this.columnToLetter(colStart)}${rowStart}`;
  //   let range = `${sheetName}!${firstCell}:`;
  //   if (multiple) {
  //     let end_cell = ``;
  //     if (multiple[1] > 0) {
  //       end_cell += `${this.columnToLetter(colStart + multiple[1] - 1)}`;
  //     }
  //     if (multiple[0] > 0) {
  //       end_cell += `${rowStart + multiple[0] - 1}`;
  //     }
  //     range += `${end_cell}`;
  //   } else {
  //     range += `${firstCell}`;
  //   }
  //   return range;
  // }

  // /**
  //  * Convert unix epoch(js) -> sheets epoch
  //  * @param unix_ts
  //  */
  // getSheetsEpoch(unix_ts: number) {
  //   return unix_ts / 1000 / 86400 + 25569;
  // }

  // /**
  //  * Convert sheets epoch -> unix epoch(js)
  //  * @param sheet_ts
  //  */
  // getUnixEpoch(sheet_ts: number) {
  //   return (sheet_ts - 25569) * 86400 * 1000;
  // }

  // async updateCell(args: {
  //   spreadsheetId?: string;
  //   sheetName: string;
  //   row: number;
  //   col: number;
  //   data: string | number;
  // }): Promise<void> {
  //   const { col, data, row, sheetName, spreadsheetId } = args;
  //   await this.sheets.spreadsheets.values.update({
  //     spreadsheetId: spreadsheetId ?? this.spreadsheetId,
  //     range: this.generateRange(sheetName, row, col),
  //     valueInputOption: 'RAW',
  //     requestBody: {
  //       values: [[data]],
  //     },
  //   });
  //   return;
  // }

  // processRowsIntoObjects<T>(rows: any[]) {
  //   const headers = rows[0];

  //   const dataObjects = [];
  //   for (let i = 0; i < rows.length; i++) {
  //     const dataObject: Record<string, any> = {};
  //     for (let j = 0; j < rows[i].length; j++) {
  //       dataObject[headers[i]] = rows[i][j];
  //     }
  //     dataObjects.push(dataObject);
  //   }

  //   return dataObjects as T[];
  // }
}
