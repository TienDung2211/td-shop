import classNames from 'classnames/bind';
import styles from './CheckOptions.module.scss';

const cx = classNames.bind(styles);

function CheckOptions({ data, onChangeVariations }) {
    return data ? (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>{data.name}</div>
            <ul className={cx('list')}>
                {data.setOfVariationOptions.map((variationOption) => {
                    return (
                        <li
                            key={variationOption.id}
                            className={cx('item')}
                            onClick={(e) => {
                                const parent = e.currentTarget;
                                const child = parent.firstChild;

                                child.checked = !child.checked;

                                onChangeVariations();
                            }}
                        >
                            <input id={variationOption.id} type="checkbox" className={cx('checkbox')} />
                            <label className={cx('label')}>{variationOption.value}</label>
                        </li>
                    );
                })}
            </ul>
        </div>
    ) : null;
}

export default CheckOptions;
