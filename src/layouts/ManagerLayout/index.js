import Manager from '~/pages/Manager';
import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './ManagerLayout.module.scss';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function ManagerLayout({ children }) {
    const [isExpanded, setExpandState] = useState(true);

    const onToggleClass = () => {
        setExpandState(!isExpanded);
    };

    const containerClasses = cx('page', {
        'margin-nav': isExpanded,
    });

    return (
        <div className={cx('w-100')}>
            <div className={cx('row')}>
                <Manager isExpanded={isExpanded} onToggleClass={onToggleClass} />
                <div className={cx('col')}>
                    <div className={cx(containerClasses)}>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default ManagerLayout;
