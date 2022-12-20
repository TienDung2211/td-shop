import classNames from 'classnames/bind';
import styles from './CheckOptions.module.scss';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function CheckOptions({ data, onChangeVariations }) {
    const state = useLocation().state;

    useEffect(() => {}, [state]);

    return data ? (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>{data.name}</div>
            <ul className={cx('list')}>
                {data.setOfVariationOptions.map((variationOption) => {
                    return (
                        <div
                            key={variationOption.id}
                            className={cx('item')}
                            onClick={(e) => {
                                const parent = e.currentTarget;
                                const child = parent.firstChild;

                                child.checked = !child.checked;

                                onChangeVariations();
                            }}
                        >
                            <input
                                id={variationOption.id}
                                type="checkbox"
                                className={cx('checkbox')}
                                onClick={(e) => {
                                    const check = e.currentTarget;

                                    check.checked = !check.checked;

                                    onChangeVariations();
                                }}
                            />
                            <label className={cx('label')}>{variationOption.value}</label>
                        </div>
                    );
                })}
            </ul>
        </div>
    ) : null;
}

export default CheckOptions;
