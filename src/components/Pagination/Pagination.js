import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Pagigation({ length = 1, page = 0 }) {
    const pagination = (index) => {
        if (index === page + 1) {
            return (
                <li key={index} className={cx('pagination-item', 'pagination-item__active')}>
                    <div className={cx('pagination-link')}>
                        <Button transparent iconOnly={index} />
                    </div>
                </li>
            );
        } else {
            return (
                <li key={index} className={cx('pagination-item')}>
                    <div className={cx('pagination-link')}>
                        <Button transparent iconOnly={index} />
                    </div>
                </li>
            );
        }
    };

    const render = (lengthPage) => {
        const html = [];

        if (lengthPage < 5) {
            for (let i = 1; i <= lengthPage; i++) {
                html.push(pagination(i));
            }
        } else {
            for (let i = 1; i <= 4; i++) {
                html.push(pagination(i));
            }

            html.push(pagination('...'));

            html.push(pagination(length));
        }

        html.map((item) => {
            return item;
        });

        return html;
    };

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('pagination', 'products-list__pagination')}>
                <li className={cx('pagination-item')}>
                    <div className={cx('pagination-link')}>
                        <Button transparent iconOnly={<FontAwesomeIcon icon={faAngleLeft} />} />
                    </div>
                </li>
                {render(length)}
                <li className={cx('pagination-item')}>
                    <div className={cx('pagination-link')}>
                        <Button transparent iconOnly={<FontAwesomeIcon icon={faAngleRight} />} />
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Pagigation;
