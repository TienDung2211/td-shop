import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Pagigation({ length = 1, page = 0, onClickPagination }) {
    const pagination = (index) => {
        if (index === page) {
            return (
                <li key={index} className={cx('pagination-item')}>
                    <div className={cx('pagination-link', 'active')}>{index + 1}</div>
                </li>
            );
        } else {
            if (index === '...') {
                return (
                    <li key={index} className={cx('pagination-item')}>
                        <div className={cx('pagination-link')}>{'...'}</div>
                    </li>
                );
            }
            return (
                <li
                    key={index}
                    className={cx('pagination-item')}
                    onClick={() => {
                        onClickPagination(index);
                    }}
                >
                    <div className={cx('pagination-link')}>{index + 1}</div>
                </li>
            );
        }
    };

    const render = (lengthPage) => {
        const html = [];

        if (lengthPage <= 5) {
            for (let i = 0; i <= lengthPage - 1; i++) {
                html.push(pagination(i));
            }
        } else {
            if (page < 3) {
                for (let i = 0; i < 3; i++) {
                    html.push(pagination(i));
                }
                html.push(pagination('...'));
                html.push(pagination(lengthPage - 1));
            } else if (page >= 3) {
                if (lengthPage - page < 4) {
                    html.push(pagination(0));
                    html.push(pagination('...'));
                    for (let i = lengthPage - 3; i <= lengthPage - 1; i++) {
                        html.push(pagination(i));
                    }
                } else {
                    for (let i = page - 2; i <= page; i++) {
                        html.push(pagination(i));
                    }
                    html.push(pagination('...'));
                    html.push(pagination(lengthPage - 1));
                }
            }
        }

        html.map((item) => {
            return item;
        });

        return html;
    };

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('pagination', 'products-list__pagination')}>
                <li
                    className={cx('pagination-item')}
                    onClick={() => {
                        onClickPagination(0);
                    }}
                >
                    <div className={cx('pagination-link')}>
                        <FontAwesomeIcon icon={faAngleLeft} className={cx('pagination-icon')} />
                        <FontAwesomeIcon icon={faAngleLeft} className={cx('pagination-icon')} />
                    </div>
                </li>
                <li className={cx('pagination-item')}>
                    <div className={cx('pagination-link')}>
                        <Button
                            transparent
                            iconOnly={
                                <FontAwesomeIcon
                                    icon={faAngleLeft}
                                    onClick={() => {
                                        if (page > 0) {
                                            onClickPagination(page - 1);
                                        }
                                    }}
                                />
                            }
                        />
                    </div>
                </li>
                {render(length)}
                <li className={cx('pagination-item')}>
                    <div className={cx('pagination-link')}>
                        <Button
                            transparent
                            iconOnly={<FontAwesomeIcon icon={faAngleRight} />}
                            onClick={() => {
                                if (page < length - 1) {
                                    onClickPagination(page + 1);
                                }
                            }}
                        />
                    </div>
                </li>
                <li
                    className={cx('pagination-item')}
                    onClick={() => {
                        onClickPagination(length - 1);
                    }}
                >
                    <div className={cx('pagination-link')}>
                        <FontAwesomeIcon icon={faAngleRight} className={cx('pagination-icon')} />
                        <FontAwesomeIcon icon={faAngleRight} className={cx('pagination-icon')} />
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Pagigation;
