// import { Button, Table } from 'antd';
// import { DownloadOutlined } from '@ant-design/icons';

// const columns = [
//     {
//         title: 'Name',
//         dataIndex: 'name',
//         key: 'name',
//     },
//     {
//         title: 'Age',
//         dataIndex: 'age',
//         key: 'age',
//     },
//     {
//         title: 'Address',
//         dataIndex: 'address',
//         key: 'address',
//     },
// ];

// const data = [
//     {
//         key: '1',
//         name: 'John Brown',
//         age: 32,
//         address: 'New York No. 1 Lake Park',
//     },
//     {
//         key: '2',
//         name: 'Jim Green',
//         age: 42,
//         address: 'London No. 1 Lake Park',
//     },
//     {
//         key: '3',
//         name: 'Joe Black',
//         age: 32,
//         address: 'Sidney No. 1 Lake Park',
//     },
// ];

// const MyTable = () => {
//     const handleExportCsv = () => {
//         Table.exportCsv(data, columns);
//     };

//     const handleExportExcel = () => {
//         Table.exportExcel(data, columns);
//     };

//     return (
//         <div>
//             <div style={{ marginBottom: 16 }}>
//                 <Button type="primary" onClick={handleExportCsv} icon={<DownloadOutlined />}>
//                     Export CSV
//                 </Button>
//                 <Button type="primary" onClick={handleExportExcel} icon={<DownloadOutlined />}>
//                     Export Excel
//                 </Button>
//             </div>
//             <Table dataSource={data} columns={columns} />
//         </div>
//     );
// };

// export default MyTable;
