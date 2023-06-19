import classNames from 'classnames/bind';
import styles from './Address.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen, faMapLocation, faLocationDot, faImagePortrait } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import { ToastContainer, toast } from 'react-toastify';
import addressServices from '~/services/addressServices';
import DataContext from '~/context/DataContext';
import AddAddress from './AddAddress';
import UpdateAddress from './UpdateAddress';

const cx = classNames.bind(styles);

function Address() {
    const [view, setView] = useState(true);
    const [address, setAddress] = useState(null);
    const [addressUpdate, setAddressUpdate] = useState(null);

    const { render } = useContext(DataContext);
    const [renderPage, setRenderPage] = useState(true);

    const handleRemoveAddress = async (id) => {
        let api = await addressServices.removeAddress(id);
        if (api.status === 200) {
            toast.success('Xóa địa chỉ thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderPage(!renderPage);
        } else {
            toast('Lỗi bất ngờ xảy ra, vui lòng thử lại', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };
    const onClickCancle = () => {
        setView(true);
        setAddressUpdate(null);
    };

    useEffect(() => {
        const apiGetAddress = async () => {
            const api = await addressServices.getMyAddress();
            setAddress(api.data);
            console.log(api.data);
        };

        apiGetAddress();
    }, [render, renderPage]);

    return address ? (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <p>Địa chỉ của bạn</p>
            </div>
            {view && !addressUpdate && (
                <div>
                    {address.map((item) => {
                        return (
                            <div key={item.Id} className={cx('item-address')}>
                                <div className={cx('type-address')}>Địa chỉ {item.IsDefault ? 'mặc định' : null}</div>
                                <div className={cx('info')}>
                                    <div className={cx('address')}>
                                        <FontAwesomeIcon icon={faMapLocation} className={cx('icon', 'map')} />
                                        {item.WardsName}, {item.DistrictName}, {item.ProvinceName}
                                    </div>
                                    <div className={cx('detail')}>
                                        <FontAwesomeIcon icon={faLocationDot} className={cx('icon', 'location')} />
                                        {item.AddressDetail}
                                    </div>
                                    <div className={cx('name')}>
                                        <FontAwesomeIcon icon={faImagePortrait} className={cx('icon', 'user')} />
                                        {item.Name}
                                    </div>
                                </div>
                                <div className={cx('button-layout')}>
                                    <Button
                                        className={cx('button')}
                                        transparent
                                        rounded
                                        iconOnly={<FontAwesomeIcon icon={faPen} />}
                                        onClick={() => {
                                            setView(false);
                                            setAddressUpdate(item);
                                        }}
                                    ></Button>
                                    <Button
                                        className={cx('button')}
                                        transparent
                                        rounded
                                        iconOnly={<FontAwesomeIcon icon={faTrashCan} />}
                                        onClick={() => {
                                            handleRemoveAddress(item.Id);
                                        }}
                                    ></Button>
                                </div>
                            </div>
                        );
                    })}

                    <div className={cx('button-layout-view')}>
                        <Button
                            outline
                            border
                            onClick={() => {
                                setView(!view);
                                setAddressUpdate(null);
                            }}
                        >
                            Thêm địa chỉ
                        </Button>
                    </div>
                </div>
            )}
            {!view && !addressUpdate && <AddAddress onClickCancle={onClickCancle} />}
            {!view && addressUpdate && <UpdateAddress onClickCancle={onClickCancle} address={addressUpdate} />}
            <ToastContainer />
        </div>
    ) : null;
}

export default Address;
