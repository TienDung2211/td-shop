import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@goongmaps/goong-js/dist/goong-js.css';
import styles from './Address.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import useDebounce from '~/hooks/useDebounce';
import DataContext from '~/context/DataContext';
import { ToastContainer, toast } from 'react-toastify';
import addressServices from '~/services/addressServices';
import ReactMapGL, { Marker } from '@goongmaps/goong-map-react';

const cx = classNames.bind(styles);

function UpdateAddress({ onClickCancle, address }) {
    const [provinces, setProvinces] = useState([]);
    const [idProvince, setIdProvince] = useState(0);
    const [district, setDistrict] = useState([]);
    const [idDistrict, setIdDistrict] = useState(0);
    const [wards, setWards] = useState([]);
    const [idWard, setIdWard] = useState(0);
    const [detailAddress, setDetailAddress] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isDefault, setIsDefault] = useState(true);
    const [errMsg, setErrMsg] = useState('');

    const [isValid, setIsValid] = useState(true);
    const [addresNow, setAddressNow] = useState('Vui lòng chọn địa chỉ');

    const [isModified, setIsModified] = useState(false);

    const keyword = useDebounce(detailAddress, 2000);

    const [marker, setMarker] = useState(null);

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: address?.Lat,
        longitude: address?.Lng,
        zoom: 18,
    });

    const { render, setRender } = useContext(DataContext);

    const onChangeProvince = (e) => {
        setIdProvince(e.target.value);
        setIdDistrict(0);
        setIdWard(0);
    };
    const onChangeDistrict = (e) => {
        setIdDistrict(e.target.value);
        setIdWard(0);
    };
    const onChangeWard = (e) => {
        setIdWard(e.target.value);
    };
    const onMarkerDragEnd = (event) => {
        const newLatitude = event.lngLat[1];
        const newLongitude = event.lngLat[0];

        setMarker({
            latitude: newLatitude,
            longitude: newLongitude,
        });

        setViewport({
            ...viewport,
            latitude: newLatitude,
            longitude: newLongitude,
        });

        setIsModified(true);
    };
    const getCoordinates = async () => {
        const data = {
            wardsId: idWard,
            addressDetail: keyword,
        };

        const api = await addressServices.getCoordinatesByDetailAddress(data);

        if (api?.status === 200) {
            setMarker({
                latitude: parseFloat(api?.data?.lat),
                longitude: parseFloat(api?.data?.lon),
            });
            setViewport({
                ...viewport,
                latitude: parseFloat(api?.data?.lat),
                longitude: parseFloat(api?.data?.lon),
            });
            setIsValid(true);
        }
    };
    const checkCoordinates = async () => {
        const data = {
            wardsId: idWard,
            lat: marker?.latitude.toString(),
            lng: marker?.longitude.toString(),
        };

        const api = await addressServices.checkCoordinatesIsValid(data);

        if (api?.status === 200) {
            if (api.data.result) {
                setIsValid(true);
            } else {
                setIsValid(false);
                setAddressNow(`Vị trí hiện tại ở ${api.data.chosenLocation}`);
            }
        }
    };

    const getDataOriginal = () => {
        setFullName(address?.Name);
        setEmail(address?.Email);
        setPhone(address?.Phone);
        setDetailAddress(address?.AddressDetail);
        setIdProvince(address?.ProvinceId);
        setIdDistrict(address?.DistrictId);
        setIdWard(address?.WardsId);
        setIsDefault(address?.IsDefault);
        if (address?.Lat && address?.Lng) {
            setMarker({
                latitude: parseFloat(address?.Lat),
                longitude: parseFloat(address?.Lng),
            });
            setViewport({
                ...viewport,
                latitude: parseFloat(address?.Lat),
                longitude: parseFloat(address?.Lng),
            });
        } else {
            setIsValid(false);
        }
    };
    const handleUpdateAddress = async () => {
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
            if (isValid) {
                const data = {
                    Name: fullName,
                    Email: email,
                    Phone: phone,
                    AddressDetail: detailAddress,
                    IsDefault: isDefault,
                    WardsId: parseInt(idWard),
                    Lat: parseFloat(marker.latitude),
                    Lng: parseFloat(marker.longitude),
                };

                let dataAPI = await addressServices.updateAddress(address.Id, data);

                if (dataAPI?.status === 200) {
                    toast.success('Cập nhập địa chỉ thành công', {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'toast-message',
                    });
                    setErrMsg('');
                    setRender(!render);
                    onClickCancle();
                } else {
                    setErrMsg('Cập nhập địa chỉ không thành công, vui lòng thử lại');
                }
            } else {
                setErrMsg('Vui lòng nhập thông tin và chọn địa chỉ hợp lệ');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const apiAllProvinces = async () => {
            const api = await addressServices.getAllProvince();
            setProvinces(api.data);
        };
        apiAllProvinces();
        getDataOriginal();
    }, []);

    useEffect(() => {
        if (!keyword.trim() || !isModified) {
            return;
        }
        getCoordinates();
    }, [keyword]);

    useEffect(() => {
        if (!isModified) {
            return;
        }
        checkCoordinates();
    }, [marker]);

    useEffect(() => {
        const apiGetDistricts = async () => {
            const api = await addressServices.getDisTrictByIdProvince(idProvince);
            setDistrict(api.data);
        };
        const apiGetWards = async () => {
            const api = await addressServices.getWardByIdDistrict(idDistrict);
            setWards(api.data);
        };

        apiGetDistricts();
        apiGetWards();
    }, [idProvince, idDistrict, errMsg]);

    return (
        <div className={cx('container')}>
            <div className={cx('group-item')}>
                <span className={cx('error-msg')}>{errMsg}</span>
            </div>
            <div className={cx('row')}>
                <div className={cx('group-item', 'col-xl-6', 'col-md-6', 'col-sm-12', 'mt-2')}>
                    <div className={cx('label-item')}>Họ tên người nhận </div>
                    <input
                        className={cx('input-item')}
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div className={cx('group-item', 'col-xl-6', 'col-md-6', 'col-sm-12', 'mt-2')}>
                    <div className={cx('label-item')}>Email người nhận </div>
                    <input
                        className={cx('input-item')}
                        type="text"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={cx('group-item', 'col-xl-6', 'col-md-6', 'col-sm-12', 'mt-2')}>
                    <div className={cx('label-item')}>Số điện thoại người nhận </div>
                    <input
                        className={cx('input-item')}
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
            </div>
            <div className={cx('row')}>
                <div className={cx('group-item', 'col-xl-6', 'col-md-6', 'col-sm-12', 'mt-2')}>
                    <div className={cx('label-item')}>Tỉnh/Thành phố</div>
                    <select className={cx('custom-select')} onChange={onChangeProvince}>
                        <option value="0">Tỉnh/Thành phố</option>
                        {provinces.map((province) => (
                            <option key={province.id} value={province.id} selected={province.id === idProvince}>
                                {province.Name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={cx('group-item', 'col-xl-6', 'col-md-6', 'col-sm-12', 'mt-2')}>
                    <div className={cx('label-item')}>Quận/Huyện</div>
                    <select className={cx('custom-select')} onChange={onChangeDistrict}>
                        <option value="0">Quận/Huyện</option>
                        {district.map((district) => (
                            <option key={district.id} value={district.id} selected={district.id === idDistrict}>
                                {district.Name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={cx('group-item', 'col-xl-6', 'col-md-6', 'col-sm-12', 'mt-2')}>
                    <div className={cx('label-item')}>Phường/Xã</div>
                    <select className={cx('custom-select')} onChange={onChangeWard}>
                        <option value="0">Phường/Xã</option>
                        {wards.map((ward) => (
                            <option key={ward.id} value={ward.id} selected={ward.id === idWard}>
                                {ward.Name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={cx('group-item', 'col-xl-6', 'col-md-6', 'col-sm-12', 'mt-2')}>
                    <div className={cx('label-item')}>Địa chỉ cụ thể</div>
                    <input
                        className={cx('input-item')}
                        type="text"
                        required
                        value={detailAddress}
                        onChange={(e) => {
                            setDetailAddress(e.target.value);
                            setIsModified(true);
                        }}
                    />
                </div>
            </div>
            <div className={cx('row', 'mt-5')}>
                <div className={cx('col', 'map-layout')}>
                    {isValid ? (
                        <span className={cx('valid')}>Địa chỉ đã được xác nhận</span>
                    ) : (
                        <span className={cx('not-valid')}>{addresNow}</span>
                    )}
                    <div className={cx('map')}>
                        <ReactMapGL
                            {...viewport}
                            onViewportChange={(nextViewport) => setViewport(nextViewport)}
                            goongApiAccessToken={process.env.REACT_APP_GOONG_MAPTILES_KEY}
                        >
                            {marker && (
                                <Marker
                                    latitude={marker.latitude}
                                    longitude={marker.longitude}
                                    draggable
                                    onDragEnd={onMarkerDragEnd}
                                >
                                    <FontAwesomeIcon className={cx('marker-location')} icon={faLocationDot} />
                                </Marker>
                            )}
                        </ReactMapGL>
                    </div>
                </div>
            </div>
            <div className={cx('d-flex', 'flex-row', 'mt-5', 'confirm-layout')}>
                <input
                    className={cx('confirm-checkbox')}
                    type="checkbox"
                    id="confirm"
                    value="confirm"
                    defaultChecked={address?.IsDefault}
                    onChange={(e) => {
                        setIsDefault(e.target.checked);
                    }}
                />
                <label htmlFor="confirm" className={cx('confirm--label')}>
                    Đặt làm địa chỉ mặc định.
                </label>
            </div>
            <div className={cx('row', 'd-lex', 'justify-content-around', 'mt-5')}>
                <Button outline border primary onClick={() => handleUpdateAddress()}>
                    Xác nhận
                </Button>
                <Button
                    outline
                    border
                    onClick={() => {
                        onClickCancle();
                    }}
                >
                    Hủy
                </Button>
            </div>

            <ToastContainer />
        </div>
    );
}

export default UpdateAddress;
