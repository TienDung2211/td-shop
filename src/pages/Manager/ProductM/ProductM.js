import classNames from 'classnames/bind';
import styles from './ProductM.module.scss';

import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import OptionsPopper from '~/components/OptionsPopper';
import ProductMItem from './ProductMItem';

const cx = classNames.bind(styles);

const dataCart = [
    {
        id: 0,
        name: 'Laptop Lenovo Ideapad Slim 5 15ITL05 82FG01HPVN (15.6" Intel Core i5-1135G7/16GB/512GB SSD/Windows 11 Home SL/1.7kg)',
        price: 17490000,
        vender: 'SamSung',
        location: 'America',
        image: 'https://lh3.googleusercontent.com/iPsbVuP_Dxz5k5IeS0uwyRzZ4YA2Vw4vDt_OraOmvpKGTVBKFXPNqJthrn-PPTTr1E5BaeYAFdZj_Gfjq-3WJxAx-WtecXiR=w500-rw',
    },
    {
        id: 1,
        name: 'Laptop ACER Spin 5 SP513-52N-556V NX.GR7SV.004 (13.3" Full HD/Intel Core i5-8250U/8GB/256GB SSD/Windows 10 Home SL 64-bit/1.5kg)',
        price: 21499000,
        vender: 'SamSung',
        location: 'America',
        image: 'https://lh3.googleusercontent.com/eSTPgChkodGi0H_f0Qp6bvPGDejkhMJTvpmNR-doH0qdNBrFXGcbft7N_BJxoKcfoZ_r1U8M9CcX-Ms9Yw=w500-rw',
    },
    {
        id: 2,
        name: 'Cáp chuyển đổi Type C sang USB Type B Unitek YC474BK',
        price: 132000,
        vender: 'SamSung',
        location: 'America',
        image: 'https://lh3.googleusercontent.com/eE4-ROdHcNqz3VWepK8O9j9SYNHaN_5zegAFxmSPUhIuno0QqX5-iTA6SMkJSUEu82bHr2L0tAG2kldrWKQ=w500-rw',
    },
    {
        id: 3,
        name: 'Tai nghe Bluetooth True Wireless Soundpeats T2 (Đen)',
        price: 1349000,
        vender: 'SamSung',
        location: 'America',
        image: 'https://lh3.googleusercontent.com/jf9IxHr4omwRVLO_plUvwEZqlCeXuDnKhIZZcepDzu8_OaiPPDI5NGJ_LGFKKEupuCkK6lNqdzahijstSpnmr6VgqOZ6e1o=w500-rw',
    },
    {
        id: 4,
        name: 'Laptop ACER Nitro 5 AN515-45-R9SC NH.QBRSV.001 (15.6" Full HD/ 144Hz/Ryzen 7 5800H/8GB/512GB SSD/NVIDIA GeForce RTX 3070/Windows 10 Home 64-bit/2.2kg)',
        price: 36990000,
        vender: 'SamSung',
        location: 'America',
        image: 'https://lh3.googleusercontent.com/c8lEMABOL3Q8i2NxuiK306ID3gnSts2d7h67L-vOfU92Mv0neVYVDGh36vFfQNM3rMG8AM48hwVCjIGqi-NwO1p8nHJ6vb9w=w500-rw',
    },
];

function ProductM() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('control')}>
                <Button rounded approach iconOnly={<FontAwesomeIcon icon={faPlus} />}></Button>
                <form className={cx('control-filt')}>
                    <OptionsPopper lowBlack manager />

                    <div className={cx('input-layout')}>
                        <input className={cx('input')} type="text" placeholder="Nhập tên tìm kiếm"></input>
                    </div>

                    <div className={cx('button-layout')}>
                        <Button primary border>
                            Áp dụng
                        </Button>
                    </div>
                </form>
            </div>

            <div className={cx('results')}>
                {dataCart.map((data) => {
                    return <ProductMItem data={data} />;
                })}
            </div>
        </div>
    );
}

export default ProductM;
