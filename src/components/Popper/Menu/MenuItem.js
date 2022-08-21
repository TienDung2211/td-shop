import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick, className }) {
    const classes = cx('menu-item', 'item', {
        [className]: className,
        separation: data.separation,
    });
    return (
        <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
            <span className={cx('title')}>{data.title}</span>
        </Button>
    );
}

export default MenuItem;
