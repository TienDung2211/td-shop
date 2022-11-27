import classNames from 'classnames/bind';
import styles from './Address.module.scss';
import Button from '~/components/Button';
import { useState } from 'react';

const cx = classNames.bind(styles);

const address = ['Thu Duc, TP HCM', 'Go Vap, TP HCM'];

function Address() {
    const [view, setView] = useState(true);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <p>Địa chỉ của bạn</p>
            </div>
            {view ? (
                <div>
                    {address.map((item, index) => {
                        return (
                            <div className={cx('group-item')}>
                                <div className={cx('label-item')}>Địa chỉ {index + 1}</div>
                                <div className={cx('value-item')}>{item}</div>
                            </div>
                        );
                    })}

                    <div className={cx('button-layout-view')}>
                        <Button outline border onClick={() => setView(!view)}>
                            Thêm địa chỉ
                        </Button>
                    </div>
                </div>
            ) : (
                <form>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Địa chỉ</div>
                        <input className={cx('input-item')} type="text" name="address" id="address" />
                    </div>
                    <div className={cx('button-layout-update')}>
                        <Button outline border primary onClick={() => setView(!view)}>
                            Xác nhận
                        </Button>
                        <Button outline border onClick={() => setView(!view)}>
                            Hủy
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Address;
