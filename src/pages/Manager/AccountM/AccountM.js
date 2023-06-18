import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './AccountM.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect, useContext } from 'react';
import { faLockOpen, faPlus, faUserLock, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Select from 'react-select';
import { Tag, Tooltip } from 'antd';
import Button from '~/components/Button';
import DataContext from '~/context/DataContext';
import userServices from '~/services/userServices';
import { ToastContainer, toast } from 'react-toastify';
import DataTable from '~/components/DataTable/DataTable';
import AddAccountM from './AddAccountM';
import UpdateAccountM from './UpdateAccountM';

const cx = classNames.bind(styles);

function AccountM() {
    const [accounts, setAccounts] = useState([]);
    const [roleId, setRoleId] = useState(0);
    const [accountId, setAccountId] = useState(0);
    const [action, setAction] = useState('view');

    const { render } = useContext(DataContext);
    const [renderPage, setRenderPage] = useState(true);

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: '',
            key: 'user',
            editable: true,
            render: (user) => (
                <p>
                    {user.LastName} {user.FirstName}
                </p>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'email',
            editable: true,
            sorter: (a, b) => a.Email.localeCompare(b.Email),
        },
        {
            title: 'SĐT',
            dataIndex: 'Phone',
            key: 'phone',
        },
        {
            title: 'Tài khoản',
            dataIndex: 'role',
            key: 'role',
            align: 'center',
            editable: true,
            render: (role) => (
                <p>
                    {role.id === 1 && <Tag color={'volcano'}>Admin</Tag>}
                    {role.id === 2 && <Tag color={'green'}>Employee</Tag>}
                    {role.id === 3 && <Tag color={'blue'}>User</Tag>}
                </p>
            ),
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            align: 'center',
            editable: true,
            render: (user) => (
                <div className={cx('icon-button-layout')}>
                    {user.role.id === 2 && (
                        <Button
                            className={cx('button')}
                            transparent
                            rounded
                            iconOnly={<FontAwesomeIcon icon={faPen} />}
                            onClick={() => handleClickUpdate(user.id)}
                        ></Button>
                    )}
                    {user.isActive ? (
                        <Tooltip title="Vô hiệu hóa người dùng">
                            <Button
                                className={cx('button')}
                                transparent
                                rounded
                                iconOnly={<FontAwesomeIcon icon={faUserLock} />}
                                onClick={() => handleBanAccount(user.id)}
                            ></Button>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Mở khóa tài khoản">
                            <Button
                                className={cx('button')}
                                transparent
                                rounded
                                iconOnly={<FontAwesomeIcon icon={faLockOpen} />}
                                onClick={() => handleUnBanAccount(user.id)}
                            ></Button>
                        </Tooltip>
                    )}
                </div>
            ),
        },
    ];

    const getAllAccounts = async () => {
        const api = await userServices.getAllAccounts(roleId);

        if (api?.status === 200) {
            setAccounts(api.data.content);
        } else if (api === undefined) {
            toast.error('Tài khoản của bạn không có quyền truy cập.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setAccounts([]);
        }
    };

    const handleChangeRoleId = (selectedOption) => {
        setRoleId(selectedOption.label);
    };

    const handleCancle = () => {
        setAction('view');
    };

    const handleClickUpdate = (id) => {
        setAccountId(id);
        setAction('update');
    };

    const handleBanAccount = async (id) => {
        let api = await userServices.banAccount(id);

        if (api?.status === 200) {
            toast.success('Tài khoản bị vô hiệu thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderPage(!renderPage);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục hành động.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    const handleUnBanAccount = async (id) => {
        let api = await userServices.unBanAccount(id);

        if (api?.status === 200) {
            toast.success('Tài khoản kích hoạt thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderPage(!renderPage);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục hành động.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    useEffect(() => {
        getAllAccounts();
    }, [render, action, renderPage, roleId]);

    return (
        <div className={cx('container')}>
            {action === 'view' && (
                <div className={cx('row')}>
                    <div className={cx('control')}>
                        <div className={cx('add-layout')}>
                            <Button
                                rounded
                                approach
                                iconOnly={<FontAwesomeIcon icon={faPlus} />}
                                onClick={() => {
                                    setAction('add');
                                }}
                            ></Button>
                            <span className={cx('text')}>Thêm nhân viên</span>
                        </div>
                        <div className={cx('options-layout')}>
                            <Select
                                formatOptionLabel={(option) => `${option.value}`}
                                placeholder="Chọn loại tài khoản"
                                onChange={handleChangeRoleId}
                                options={[
                                    { value: 'Tất cả', label: 0 },
                                    { value: 'Admin', label: 1 },
                                    { value: 'Employee', label: 2 },
                                    { value: 'User', label: 3 },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            )}
            <div className={cx('row')}>
                {action === 'view' && <DataTable data={accounts} columns={columns} showExport={false} />}

                {action === 'add' && <AddAccountM onClickCancle={handleCancle} />}

                {action === 'update' && <UpdateAccountM id={accountId} onClickCancle={handleCancle} />}
            </div>
            <ToastContainer />
        </div>
    );
}

export default AccountM;
