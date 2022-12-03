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
                            <div>
                                <div className={cx('group-item')}>
                                    <div className={cx('label-item')}>Địa chỉ {index + 1}</div>
                                    <div className={cx('value-item')}>{item}</div>
                                </div>
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
                        <div className={cx('label-item')}>*Tỉnh/Thành phố</div>
                        <select className={cx('custom-select')}>
                            <option value="0">Tỉnh/Thành phố</option>
                            <option value="1">Audi</option>
                            <option value="2">BMW</option>
                            <option value="3">Citroen</option>
                            <option value="4">Ford</option>
                            <option value="5">Honda</option>
                            <option value="6">Jaguar</option>
                            <option value="7">Land Rover</option>
                            <option value="8">Mercedes</option>
                            <option value="9">Mini</option>
                            <option value="10">Nissan</option>
                            <option value="11">Toyota</option>
                            <option value="12">Volvo</option>
                        </select>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>*Quận/Huyện</div>
                        <select className={cx('custom-select')}>
                            <option value="0">Quận/Huyện</option>
                            <option value="1">Audi</option>
                            <option value="2">BMW</option>
                            <option value="3">Citroen</option>
                            <option value="4">Ford</option>
                            <option value="5">Honda</option>
                            <option value="6">Jaguar</option>
                            <option value="7">Land Rover</option>
                            <option value="8">Mercedes</option>
                            <option value="9">Mini</option>
                            <option value="10">Nissan</option>
                            <option value="11">Toyota</option>
                            <option value="12">Volvo</option>
                        </select>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>*Phường/Xã</div>
                        <select className={cx('custom-select')}>
                            <option value="0">Phường/Xã</option>
                            <option value="1">Audi</option>
                            <option value="2">BMW</option>
                            <option value="3">Citroen</option>
                            <option value="4">Ford</option>
                            <option value="5">Honda</option>
                            <option value="6">Jaguar</option>
                            <option value="7">Land Rover</option>
                            <option value="8">Mercedes</option>
                            <option value="9">Mini</option>
                            <option value="10">Nissan</option>
                            <option value="11">Toyota</option>
                            <option value="12">Volvo</option>
                        </select>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Địa chỉ cụ thể</div>
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
