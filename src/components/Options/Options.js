import classNames from 'classnames/bind';
import styles from './Options.module.scss';

const cx = classNames.bind(styles);

function Options({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>{data.title}</div>
            <ul className={cx('list')}>
                {data.options.map((option) => {
                    return <li className={cx('item')}>{option}</li>;
                })}
            </ul>
        </div>
    );
}

export default Options;
