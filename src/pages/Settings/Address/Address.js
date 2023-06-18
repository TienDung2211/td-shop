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

const cx = classNames.bind(styles);

function Address() {
    const [view, setView] = useState(true);
    const [provinces, setProvinces] = useState([]);
    const [idProvince, setIdProvince] = useState(0);
    const [district, setDistrict] = useState([]);
    const [idDistrict, setIdDistrict] = useState(0);
    const [wards, setWards] = useState([]);
    const [idWard, setIdWard] = useState(0);
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isDefault, setIsDefault] = useState(false);
    const [addressUpdate, setAddressUpdate] = useState(null);
    const [errMsg, setErrMsg] = useState('');

    const { render } = useContext(DataContext);
    const [renderPage, setRenderPage] = useState(true);

    const onChangeProvince = (e) => {
        setIdProvince(e.target.value);
    };
    const onChangeDistrict = (e) => {
        setIdDistrict(e.target.value);
    };
    const onChangeWard = (e) => {
        setIdWard(e.target.value);
    };

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
    const handleSubmitAdd = async (e) => {
        e.preventDefault();
        try {
            // eslint-disable-next-line
            var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            // eslint-disable-next-line
            var emailno = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (phone.length < 10) {
                setErrMsg('Số điện thoại phải có 10 chữ số');
                return;
            }
            if (!phone.match(phoneno)) {
                setErrMsg('Vui lòng nhập số điện thoại đúng định dạng');
                return;
            }
            if (!email.match(emailno)) {
                setErrMsg('Vui lòng nhập email đúng định dạng');
                return;
            }
            if (idWard === '0') {
                setErrMsg('Vui lòng chọn địa chỉ.');
                return;
            }

            const data = {
                Name: fullName,
                Email: email,
                Phone: phone,
                AddressDetail: detailAddress,
                IsDefault: isDefault,
                WardsId: Number(idWard),
            };

            let dataAPI = await addressServices.addAddress(data);

            if (dataAPI?.status === 200) {
                toast.success('Thêm địa chỉ mới thành công', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
                setView(!view);
                setErrMsg('');
                setRenderPage(!renderPage);
            } else {
                setErrMsg('Thêm địa chỉ không thành công, vui lòng thử lại');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        try {
            // eslint-disable-next-line
            var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            // eslint-disable-next-line
            var emailno = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (phone.length < 10) {
                setErrMsg('Số điện thoại phải có 10 chữ số');
                return;
            }
            if (!phone.match(phoneno)) {
                setErrMsg('Vui lòng nhập số điện thoại đúng định dạng');
                return;
            }
            if (!email.match(emailno)) {
                setErrMsg('Vui lòng nhập email đúng định dạng');
                return;
            }
            if (idWard === '0') {
                setErrMsg('Vui lòng chọn địa chỉ.');
                return;
            }

            const data = {
                Name: fullName,
                Email: email,
                Phone: phone,
                AddressDetail: detailAddress,
                IsDefault: isDefault,
                WardsId: Number(idWard),
            };

            let dataAPI = await addressServices.updateAddress(addressUpdate.Id, data);

            if (dataAPI?.status === 200) {
                toast.success('Cập nhập địa chỉ thành công', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
                setAddressUpdate(null);
                setView(!view);
                setErrMsg('');
                setRenderPage(!renderPage);
            } else {
                setErrMsg('Cập nhập địa chỉ không thành công, vui lòng thử lại');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handlePassAddress = (item) => {
        setAddressUpdate(item);
        setView(!view);
        setFullName(item?.Name);
        setEmail(item?.Email);
        setPhone(item?.Phone);
        setDetailAddress(item?.AddressDetail);
        setIdProvince(item?.ProvinceId);
        setIdDistrict(item?.DistrictId);
        setIdWard(item?.WardsId);
        setIsDefault(item?.IsDefault);
    };

    useEffect(() => {
        const apiAllProvinces = async () => {
            const api = await addressServices.getAllProvince();
            setProvinces(api.data);
        };
        const apiGetDistricts = async () => {
            const api = await addressServices.getDisTrictByIdProvince(idProvince);
            setDistrict(api.data);
        };
        const apiGetWards = async () => {
            const api = await addressServices.getWardByIdDistrict(idDistrict);
            setWards(api.data);
        };
        const apiGetAddress = async () => {
            const api = await addressServices.getMyAddress();
            setAddress(api.data);
        };

        apiGetAddress();
        apiAllProvinces();
        apiGetDistricts();
        apiGetWards();
    }, [idProvince, idDistrict, errMsg, render, renderPage]);

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
                                            handlePassAddress(item);
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
                                setFullName('');
                                setEmail('');
                                setPhone('');
                                setDetailAddress('');
                                setIdProvince(0);
                                setIdDistrict(0);
                                setIdWard(0);
                                setIsDefault(false);
                            }}
                        >
                            Thêm địa chỉ
                        </Button>
                    </div>
                </div>
            )}
            {!view && !addressUpdate && (
                // <form onSubmit={handleSubmitAdd}>
                //     <div className={cx('group')}>
                //         <span className={cx('error-msg')}>{errMsg}</span>
                //     </div>
                //     <div className={cx('group-item')}>
                //         <div className={cx('label-item')}>Họ tên người nhận </div>
                //         <input
                //             className={cx('input-item')}
                //             type="text"
                //             required
                //             value={fullName}
                //             onChange={(e) => setFullName(e.target.value)}
                //         />
                //     </div>
                //     <div className={cx('group-item')}>
                //         <div className={cx('label-item')}>Email người nhận </div>
                //         <input
                //             className={cx('input-item')}
                //             type="text"
                //             required
                //             value={email}
                //             onChange={(e) => setEmail(e.target.value)}
                //         />
                //     </div>
                //     <div className={cx('group-item')}>
                //         <div className={cx('label-item')}>Số điện thoại người nhận </div>
                //         <input
                //             className={cx('input-item')}
                //             type="text"
                //             required
                //             value={phone}
                //             onChange={(e) => setPhone(e.target.value)}
                //         />
                //     </div>
                //     <div className={cx('group-item')}>
                //         <div className={cx('label-item')}>*Tỉnh/Thành phố</div>
                //         <select className={cx('custom-select')} onChange={onChangeProvince}>
                //             <option value="0">Tỉnh/Thành phố</option>
                //             {provinces.map((province) => (
                //                 <option key={province.id} value={province.id}>
                //                     {province.Name}
                //                 </option>
                //             ))}
                //         </select>
                //     </div>
                //     <div className={cx('group-item')}>
                //         <div className={cx('label-item')}>*Quận/Huyện</div>
                //         <select className={cx('custom-select')} onChange={onChangeDistrict}>
                //             <option value="0">Quận/Huyện</option>
                //             {district.map((district) => (
                //                 <option key={district.id} value={district.id}>
                //                     {district.Name}
                //                 </option>
                //             ))}
                //         </select>
                //     </div>
                //     <div className={cx('group-item')}>
                //         <div className={cx('label-item')}>*Phường/Xã</div>
                //         <select className={cx('custom-select')} onChange={onChangeWard}>
                //             <option value="0">Phường/Xã</option>
                //             {wards.map((ward) => (
                //                 <option key={ward.id} value={ward.id}>
                //                     {ward.Name}
                //                 </option>
                //             ))}
                //         </select>
                //     </div>
                //     <div className={cx('group-item')}>
                //         <div className={cx('label-item')}>Địa chỉ cụ thể</div>
                //         <input
                //             className={cx('input-item')}
                //             type="text"
                //             required
                //             value={detailAddress}
                //             onChange={(e) => setDetailAddress(e.target.value)}
                //         />
                //     </div>
                //     <div className={cx('group-item')}>
                //         <div className={cx('label-item')}></div>
                //         <input
                //             className={cx('input-item', 'confirm')}
                //             type="checkbox"
                //             id="confirm"
                //             value="confirm"
                //             defaultChecked={isDefault}
                //             onChange={(e) => {
                //                 setIsDefault(e.target.checked);
                //             }}
                //         />
                //         <label htmlFor="confirm" className={cx('confirm--label')}>
                //             Đặt làm địa chỉ mặc định.
                //         </label>
                //     </div>
                //     <div className={cx('button-layout-update')}>
                //         <Button outline border primary type="submit">
                //             Xác nhận
                //         </Button>
                //         <Button
                //             outline
                //             border
                //             onClick={() => {
                //                 setView(!view);
                //                 setAddressUpdate(null);
                //             }}
                //         >
                //             Hủy
                //         </Button>
                //     </div>
                // </form>
                <AddAddress onClickCancle={onClickCancle} />
            )}
            {!view && addressUpdate && (
                <form onSubmit={handleSubmitUpdate}>
                    <div className={cx('group')}>
                        <span className={cx('error-msg')}>{errMsg}</span>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Họ tên người nhận </div>
                        <input
                            className={cx('input-item')}
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Email người nhận </div>
                        <input
                            className={cx('input-item')}
                            type="text"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Số điện thoại người nhận </div>
                        <input
                            className={cx('input-item')}
                            type="text"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>*Tỉnh/Thành phố</div>
                        <select className={cx('custom-select')} onChange={onChangeProvince}>
                            <option value="0">Tỉnh/Thành phố</option>
                            {provinces.map((province) => (
                                <option key={province.id} value={province.id} selected={province.id === idProvince}>
                                    {province.Name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>*Quận/Huyện</div>
                        <select className={cx('custom-select')} onChange={onChangeDistrict}>
                            <option value="0">Quận/Huyện</option>
                            {district.map((district) => (
                                <option key={district.id} value={district.id} selected={district.id === idDistrict}>
                                    {district.Name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>*Phường/Xã</div>
                        <select className={cx('custom-select')} onChange={onChangeWard}>
                            <option value="0">Phường/Xã</option>
                            {wards.map((ward) => (
                                <option key={ward.id} value={ward.id} selected={ward.id === idWard}>
                                    {ward.Name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Địa chỉ cụ thể</div>
                        <input
                            className={cx('input-item')}
                            type="text"
                            required
                            value={detailAddress}
                            onChange={(e) => setDetailAddress(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}></div>
                        <input
                            className={cx('input-item', 'confirm')}
                            type="checkbox"
                            id="confirm"
                            value="confirm"
                            defaultChecked={isDefault}
                            onChange={(e) => {
                                setIsDefault(e.target.checked);
                            }}
                        />
                        <label htmlFor="confirm" className={cx('confirm--label')}>
                            Đặt làm địa chỉ mặc định.
                        </label>
                    </div>
                    <div className={cx('button-layout-update')}>
                        <Button outline border primary type="submit">
                            Cập nhập
                        </Button>
                        <Button
                            outline
                            border
                            onClick={() => {
                                setView(!view);
                                setAddressUpdate(null);
                            }}
                        >
                            Hủy
                        </Button>
                    </div>
                </form>
            )}
            <ToastContainer />
        </div>
    ) : null;
}

export default Address;
