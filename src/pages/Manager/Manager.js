import classNames from 'classnames/bind';
import styles from './Manager.module.scss';

import { Link } from 'react-router-dom';
import DataContext from '~/context/DataContext';
import userServices from '~/services/userServices';
import { useEffect, useState, useContext } from 'react';

const cx = classNames.bind(styles);

const controls = [
    {
        id: 0,
        name: 'Quản lí tài khoản',
        key: 'account',
        role: 'ROLE_ADMIN',
    },
    {
        id: 1,
        name: 'Quản lí sản phẩm',
        key: 'product',
    },
    {
        id: 2,
        name: 'Quản lí đơn hàng',
        key: 'order',
    },
    {
        id: 3,
        name: 'Quản lí khuyến mãi',
        key: 'sale',
    },
    {
        id: 4,
        name: 'Quản lí danh mục',
        key: 'variaton',
    },
    {
        id: 5,
        name: 'Quản lí thể loại',
        key: 'category',
    },
    {
        id: 6,
        name: 'Quản lí bình luận',
        key: 'comment',
    },
];

function Manager() {
    const [user, setUser] = useState(null);

    const { render } = useContext(DataContext);

    const getUserInfo = async () => {
        const access = JSON.parse(localStorage.getItem('access'));

        if (access) {
            let api = await userServices.getUser();

            if (api?.data) {
                setUser(api.data);
            }
        } else {
            setUser(null);
        }
    };
    useEffect(() => {
        getUserInfo();
    }, [render]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid-full-width')}>
                <div className={cx('control-list')}>
                    {controls.map((control) => {
                        if (control?.role) {
                            if (control.role === user?.Role.name) {
                                return (
                                    <Link
                                        to={'/manager/' + control.key}
                                        className={cx('control-item')}
                                        key={control.id}
                                    >
                                        {control.name}
                                    </Link>
                                );
                            } else return;
                        }
                        return (
                            <Link to={'/manager/' + control.key} className={cx('control-item')} key={control.id}>
                                {control.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Manager;
