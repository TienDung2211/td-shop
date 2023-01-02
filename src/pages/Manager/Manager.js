import classNames from 'classnames/bind';
import styles from './Manager.module.scss';

import { Link } from 'react-router-dom';
import DataContext from '~/context/DataContext';
import userServices from '~/services/userServices';
import { useEffect, useState, useContext } from 'react';
import { MANAGER_OPTIONS } from '~/components/MenuOptions/MenuOptions';

const cx = classNames.bind(styles);

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
                    {MANAGER_OPTIONS.map((control) => {
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
