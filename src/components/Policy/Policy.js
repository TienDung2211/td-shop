import classNames from 'classnames/bind';
import styles from './Policy.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Policy() {
    return (
        <div className={cx('other-content')}>
            <div className={cx('free-ship')}>
                <FontAwesomeIcon icon={faTruckFast} className={cx('icon')} />
                <span>Sản phẩm được miễn phí giao hàng</span>
            </div>
            <div className={cx('policy')}>
                <div className={cx('policy-list')}>
                    <div className={cx('policy-lable')}>
                        <span>Chính sách bán hàng</span>
                    </div>
                    <div className={cx('policy-item')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faTruckFast} />
                        </div>
                        <span>Miễn phí giao hàng cho đơn hàng từ 800K</span>
                    </div>
                    <div className={cx('policy-item')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faTruckFast} />
                        </div>
                        <span>Cam kết hàng chính hãng 100%</span>
                    </div>
                    <div className={cx('policy-item')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faTruckFast} />
                        </div>
                        <span>Đổi trả trong vòng 10 ngày</span>
                    </div>
                </div>
                <div className={cx('policy-list')}>
                    <div className={cx('policy-lable')}>
                        <span>Dịch vụ khác</span>
                    </div>
                    <div className={cx('policy-item')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faTruckFast} />
                        </div>
                        <span>Sửa chữa đồng giá 150.000đ.</span>
                    </div>
                    <div className={cx('policy-item')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faTruckFast} />
                        </div>
                        <span>Vệ sinh máy tính, laptop.</span>
                    </div>
                    <div className={cx('policy-item')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faTruckFast} />
                        </div>
                        <span>Bảo hành tại nhà.</span>
                    </div>
                </div>
                <a to="/" href="/" className={cx('view-add')}>
                    Xem chi tiết
                </a>
            </div>
        </div>
    );
}

export default Policy;
