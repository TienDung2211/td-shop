import { Button, Table as AntTable } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';
import classNames from 'classnames/bind';
import styles from './Datatable.module.scss';

import DataContext from '~/context/DataContext';
import { useEffect, useContext } from 'react';

const cx = classNames.bind(styles);

const DataTable = ({ data, columns, showExport = true, onClickRow }) => {
    const { render } = useContext(DataContext);

    useEffect(() => {}, [render]);

    const handleRowClick = (record, rowIndex) => {
        if (onClickRow) {
            onClickRow(record, rowIndex);
        }
    };

    const handleExportCsv = () => {
        const exportData = data.map((item) => {
            return {
                ...item,
                // Chỉ lấy các trường dữ liệu cần xuất
                // Nếu không muốn lọc trường dữ liệu, bạn có thể bỏ qua bước này
                // Ví dụ: return item;
            };
        });
        const csv = Papa.unparse(exportData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'data.csv');
    };

    const handleExportExcel = () => {
        const exportData = data.map((item) => {
            return {
                ...item,
                // Chỉ lấy các trường dữ liệu cần xuất
                // Nếu không muốn lọc trường dữ liệu, bạn có thể bỏ qua bước này
                // Ví dụ: return item;
            };
        });
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'data');
        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
        const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
        saveAs(blob, 'data.xlsx');

        function s2ab(s) {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i < s.length; i++) {
                view[i] = s.charCodeAt(i) & 0xff;
            }
            return buf;
        }
    };

    return (
        <div>
            {showExport && (
                <div className={cx('export')}>
                    <Button type="primary" onClick={handleExportCsv} icon={<DownloadOutlined />}>
                        Export CSV
                    </Button>
                    <div className={cx('space')}></div>
                    <Button type="primary" onClick={handleExportExcel} icon={<DownloadOutlined />}>
                        Export Excel
                    </Button>
                </div>
            )}

            <AntTable
                dataSource={data}
                columns={columns}
                onRow={(record, rowIndex) => ({
                    onClick: () => handleRowClick(record, rowIndex),
                })}
            />
        </div>
    );
};

export default DataTable;
