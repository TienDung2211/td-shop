import classNames from 'classnames/bind';
import styles from './Order.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faImagePortrait, faPhoneSquare } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function OrderItem({ data, onClickViewDetail }) {
    const getTotalPrice = () => {
        let total = 0;

        console.log(data);

        data.OrderDetails.forEach((product) => {
            total = total + Number(product?.FinalPrice) * product?.Quantity;
        });

        total = total + data?.Ship?.price;

        return total;
    };

    return (
        <div className={cx('item')} onClick={onClickViewDetail}>
            <div className={cx('layout-img')}>
                <img src={data.OrderDetails[0].ImageUrl} alt="" className={cx('img')} />
            </div>
            <div className={cx('info')}>
                <div className={cx('receiver-info')}>
                    <h5 className={cx('name')}>
                        <FontAwesomeIcon icon={faImagePortrait} className={cx('icon', 'name-icon')} />
                        <span className={cx('text')}>{data.Address.name}</span>
                    </h5>
                    <h5 className={cx('phone')}>
                        <FontAwesomeIcon icon={faPhoneSquare} className={cx('icon', 'phone-icon')} />
                        <span className={cx('text')}>{data.Address.phone}</span>
                    </h5>
                    <h5 className={cx('address')}>
                        <FontAwesomeIcon icon={faLocationDot} className={cx('icon', 'address-icon')} />
                        <span className={cx('text')}>{data.Address.addressDetail}</span>
                    </h5>
                </div>

                <div className={cx('order-info')}>
                    <div className={cx('desc')}>{data.OrderDetails.length} sản phẩm</div>
                    <div className={cx('product-one')}>+{data.OrderDetails[0].Name}</div>
                    <div className={cx('product-two')}>
                        {data.OrderDetails[1] ? '+' + data.OrderDetails[1].Name + '...' : null}
                    </div>
                    <div className={cx('total')}>
                        <span className={cx('price')}>
                            Tổng giá : {getTotalPrice()}
                            <span> ₫</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className={cx('status')}>{data.OrderStatus.name}</div>
        </div>
    );
}

export default OrderItem;
