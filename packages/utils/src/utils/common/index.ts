import { isString, isNil } from 'lodash-es';
import { utils, writeFile, read, type WorkBook } from 'xlsx-js-style';
import dayjs, { type OpUnitType } from 'dayjs';
import { ElMessageBox } from 'element-plus';

export function formatValue(
  value: string | number,
  digits?: number,
  dot?: boolean
): number;

export function formatValue(
  value: string | number,
  digits?: number,
  dot?: boolean
): string;

/**
 * 数字格式转换
 * @param value
 * @param digit
 */
export function formatValue(value: string | number, digits = 2, dot = false) {
  if (!value) {
    return 0;
  }
  let v;
  if (isString(value)) {
    v = parseFloat(value as string);
  } else {
    v = value;
  }
  let result = v;
  if (digits !== null) {
    result = parseFloat(v.toFixed(digits));
  }
  if (!dot) {
    return result;
  }
  return result.toString().replace(/(\d{1,3})(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}

/**
 * 数字格式转换
 * @param value
 * @param digit
 */
export function padValue(value: string | number, digits = 2, dot = false) {
  let v = value;
  if (!v) {
    v = 0;
  }
  if (isString(value)) {
    v = parseFloat(value as string);
  } else {
    v = value;
  }
  let result = v.toString();
  if (digits !== null) {
    result = v.toFixed(digits);
  }
  if (!dot) {
    return result;
  }
  return result.toString().replace(/(\d{1,3})(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}

/**
 * DOM转为excel文件导出
 * @param el
 * @param filename
 * @param sheetName
 */
export function dom2Excel(
  el: HTMLDivElement,
  options: {
    fileName: string;
    sheetName: string;
    rowStyle?: any;
  }
) {
  const wb = utils.book_new();
  const ws = utils.table_to_sheet(el);
  // 设置行样式
  if (options.rowStyle) {
    for (const row in options.rowStyle) {
      for (const key in ws) {
        const m = /(\d+)$/gi.exec(key);
        if (m && m[1] && m[1] == row) {
          ws[key].s = options.rowStyle[row];
        }
      }
    }
  }
  utils.book_append_sheet(wb, ws, options.sheetName);
  writeFile(wb, `${options.fileName}.xlsx`);
}

/**
 * 数据转成excel文件导出
 * @param data
 * @param options
 */
export function data2Excel(
  data: any[][],
  options: {
    fileName: string;
    sheetName: string;
    rowStyle?: any;
    autoWidth?: boolean;
  }
) {
  const wb = utils.book_new();
  const ws = utils.aoa_to_sheet(data);
  // 设置行样式
  if (options.rowStyle) {
    for (const row in options.rowStyle) {
      for (const key in ws) {
        const m = /(\d+)$/gi.exec(key);
        if (m && m[1] && m[1] == row) {
          ws[key].s = options.rowStyle[row];
        }
      }
    }
  }
  // 自动列宽
  if (options.autoWidth) {
    const colWidths: number[][] = [];
    data.forEach(row => {
      let index = 0;
      for (const cell of row) {
        if (isNil(colWidths[index])) {
          colWidths[index] = [];
        }
        colWidths[index].push(getCellWidth(cell));
        index += 1;
      }
    });
    ws['!cols'] = [];
    colWidths.forEach(widths => {
      ws['!cols']?.push({
        wch: Math.max(...widths),
      });
    });
  }
  utils.book_append_sheet(wb, ws, options.sheetName);
  writeFile(wb, `${options.fileName}.xlsx`);
}

function createJSONSheet(
  header: { label: string; prop: string }[],
  data: any[],
  options: {
    sheetName: string;
    rowStyle?: any;
    autoWidth?: boolean;
  }
) {
  const sheetData: any[][] = [];
  const headers = header.map(v => v.label);
  sheetData.push(headers);
  const props = header.map(v => v.prop);
  for (let row of data) {
    const rowData: any = [];
    for (const prop of props) {
      rowData.push(row[prop]);
    }
    sheetData.push(rowData);
  }
  const ws = utils.aoa_to_sheet(sheetData);
  // 设置行样式
  if (options.rowStyle) {
    for (const row in options.rowStyle) {
      for (const key in ws) {
        const m = /(\d+)$/gi.exec(key);
        if (m && m[1] && m[1] == row) {
          ws[key].s = options.rowStyle[row];
        }
      }
    }
  }
  // 自动列宽
  if (options.autoWidth) {
    const colWidths: number[][] = [];
    sheetData.forEach(row => {
      let index = 0;
      for (const key in row) {
        if (isNil(colWidths[index])) {
          colWidths[index] = [];
        }
        colWidths[index].push(getCellWidth(row[key]));
        index += 1;
      }
    });
    ws['!cols'] = [];
    colWidths.forEach(widths => {
      ws['!cols']?.push({
        wch: Math.max(...widths),
      });
    });
  }
  return ws;
}

/**
 * 计算单元格宽宽度
 * TODO 处理不同字体大小
 * @param value
 * @returns
 */
function getCellWidth(value: string) {
  if (isNil(value)) {
    return 10;
  } else if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
    const chineseLength = value.match(/[\u4e00-\u9fa5]/g)?.length!;
    const otherLength = value.length - chineseLength;
    return chineseLength * 2.3 + otherLength * 1.4;
  } else {
    return value.toString().length * 1.4;
  }
}

/**
 * json数据导出为excel文件
 * @param header
 * @param data
 * @param options
 */
export function json2Excel(
  header: { label: string; prop: string }[],
  data: any[],
  options: {
    fileName: string;
    sheetName: string;
    rowStyle?: any;
    autoWidth?: boolean;
  }
) {
  const wb = utils.book_new();
  const ws = createJSONSheet(header, data, options);
  utils.book_append_sheet(wb, ws, options.sheetName);
  writeFile(wb, `${options.fileName}.xlsx`);
}

/**
 * json数据导出为excel文件，多sheet
 * @param configs
 * @param fileName
 */
export function json2ExcelMultipleSheet(
  configs: {
    header: { label: string; prop: string }[];
    data: any[];
    options: {
      sheetName: string;
      rowStyle?: any;
    };
  }[],
  fileName: string
) {
  const wb = utils.book_new();
  for (let config of configs) {
    const ws = createJSONSheet(config.header, config.data, config.options);
    utils.book_append_sheet(wb, ws, config.options.sheetName);
  }
  writeFile(wb, `${fileName}.xlsx`);
}

/**
 * 字符串换行
 * @param str
 * @param count
 * @param line
 * @returns
 */
export function addNewLine(str: string, count = 2, line = '\n') {
  let result = (str || '').replace(
    new RegExp(`.{1,${count}}`, 'g'),
    function (match) {
      return match + line;
    }
  );
  result = result.trim();
  return result;
}

/**
 * 创建时间列表
 * @param start
 * @param end
 * @param interval
 * @param format
 * @returns
 */
export function createDateList(
  start: string | number,
  end: string | number,
  interval: OpUnitType | number = 86400,
  format = 'YYYY-MM-DD'
): string[] {
  let startTime = dayjs(start);
  let endTime = dayjs(end);
  let result: string[] = [];
  while (startTime.valueOf() <= endTime.valueOf()) {
    result.push(startTime.format(format));
    if (isString(interval)) {
      startTime = startTime.add(1, interval as dayjs.ManipulateType);
    } else {
      startTime = startTime.add(interval, 'second');
    }
  }
  return result;
}

/**
 * 文件转excel
 * @param file
 * @returns
 */
export function file2WorkBook(file: File) {
  return new Promise<WorkBook>(resolve => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = e => {
      const bs = e.target?.result;
      const wb = read(bs, {
        type: 'binary',
      });
      wb.Sheets;
      resolve(wb);
    };
  });
}

/**
 * 读excel文件
 * @param file
 * @param sheetIndex
 * @returns
 */
export async function readExcelFile<T = any>(file: File, sheetIndex = 0) {
  const wb = await file2WorkBook(file);
  const sheetName = wb.SheetNames[sheetIndex];
  const ws = wb.Sheets[sheetName];
  return utils.sheet_to_json<T>(ws);
}

/**
 * 获取excel文件表头
 * @param file 
 * @param sheetIndex 
 * @returns 
 */
export async function getExcelFileHeader<T = any>(file: File, sheetIndex = 0) {
  const wb = await file2WorkBook(file);
  const sheetName = wb.SheetNames[sheetIndex];
  const ws = wb.Sheets[sheetName];
  return utils.sheet_to_json<T>(ws, { header: 1 });
}

/**
 * 判空
 * @param {*} obj
 */
export function isEmpty(obj: any) {
  if (obj == null) return true;
  if (obj.length !== undefined) return obj.length === 0;
  if (Object.prototype.toString.call(obj) === '[object Number]') return false;
  return Object.keys(obj).length === 0;
}

/**
 * 拷贝
 * @param obj
 * @returns
 */
export function cloneDeep<T = any>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 信息确认
 * @param {string} msg
 */
export function confirm(msg = '确认执行当前操作吗？', html: boolean = false) {
  return ElMessageBox.confirm(msg, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    dangerouslyUseHTMLString: html,
  });
}


