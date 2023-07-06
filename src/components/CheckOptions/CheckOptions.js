import classNames from 'classnames/bind';
import styles from './CheckOptions.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

const cx = classNames.bind(styles);

function CheckOptions({ data, onChangeVariations }) {
    const [searchParams] = useSearchParams();

    const variationsArray = useMemo(() => {
        const variationsString = searchParams.get('variations');
        if (variationsString) {
            return variationsString.split(',').map((str) => parseInt(str));
        }
        return [];
    }, [searchParams]);

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
                                defaultChecked={variationsArray.includes(variationOption.id)}
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
