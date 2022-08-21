import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary,
    transparent,
    approach,
    outline,
    border,
    rounded,
    disable,
    small,
    large,
    leftIcon,
    rightIcon,
    iconOnly,
    className,
    children,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }
    const classes = cx('wrapper', {
        primary,
        transparent,
        approach,
        outline,
        border,
        rounded,
        disable,
        iconOnly,
        small,
        large,
        [className]: className,
    });
    return (
        <Comp className={classes} {...props}>
            {leftIcon && (
                <div className={cx('icon-layout')}>
                    <span className={cx('icon')}>{leftIcon}</span>
                </div>
            )}
            {iconOnly && <div className={cx('icon-only')}>{iconOnly}</div>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && (
                <div className={cx('icon-layout')}>
                    <span className={cx('icon')}>{rightIcon}</span>
                </div>
            )}
        </Comp>
    );
}

export default Button;
