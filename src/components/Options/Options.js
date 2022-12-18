import classNames from 'classnames/bind';
import styles from './Options.module.scss';

const cx = classNames.bind(styles);

function Options({ data }) {
    return data ? (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>{data.name}</div>
            <ul className={cx('list')}>
                {data.setOfVariationOptions.map((variationOption, index) => {
                    return (
                        <li key={index} className={cx('item')}>
                            {variationOption.value}
                        </li>
                    );
                })}
            </ul>
        </div>
    ) : null;
}

export default Options;
