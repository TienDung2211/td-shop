import classNames from 'classnames/bind';
import styles from './VariationsM.module.scss';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '~/components/Button';
import VariationsMItem from './VariationsMItem';
import variationServices from '~/services/variationServices';

const cx = classNames.bind(styles);

function CategoryM() {
    const [variations, setVariations] = useState([]);
    const [idVariation, setIdVariation] = useState(1);
    const [nameVariation, setNameVariation] = useState('');
    const [options, setOptions] = useState([]);
    const [action, setAction] = useState('add');
    const [numberOptions, setNumberOptions] = useState(5);

    const getAllVariations = async () => {
        let api = await variationServices.getAllVariations();
        setVariations(api.content);
    };

    const getVariationOptions = () => {
        variations.forEach((item) => {
            if (item.id === idVariation) {
                setOptions(item.setOfVariationOptions);
                setNameVariation(item.name);
            }
        });
    };

    const handleRenderInputOptions = () => {
        let array = [];

        for (let i = 0; i < numberOptions; i++) {
            array.push('<input name="option" class=input-variation-option placeholder="Nhập tùy chọn"/>');
        }
        return array.join(' ');
    };

    const handleSubmitAdd = async () => {
        const data = {
            Name: 'Đồ họa',
            MasterCategory: 1,
            VariationOptions: ['A', 'B', 'C'],
        };

        alert('abc');
    };

    const handleSubmitUpdate = async (id) => {
        const data = {
            Name: 'string',
            VariationOptions: ['string'],
        };

        alert('abc');
    };

    useEffect(() => {
        getAllVariations();
        getVariationOptions();
    }, [idVariation, numberOptions]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('control')}>
                <Button rounded approach iconOnly={<FontAwesomeIcon icon={faPlus} />}></Button>
                <form className={cx('control-filt')}>
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
                <div className={cx('variations')}>
                    {variations.map((variation, index) => (
                        <VariationsMItem
                            key={index}
                            data={variation}
                            onClickVariation={() => {
                                setIdVariation(variation.id);
                            }}
                        />
                    ))}
                </div>

                <div className={cx('variation-options')}>
                    {action === 'view' && (
                        <div>
                            <span className={cx('options-title')}>Tùy chọn {nameVariation}</span>
                            <div className={cx('option-list')}>
                                {options.map((item, index) => (
                                    <div key={index} className={cx('option')}>
                                        {item.value}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {action === 'add' && (
                        <form onSubmit={handleSubmitAdd}>
                            <span className={cx('options-title')}>
                                Nhóm tùy chọn{' '}
                                <input name="title" className={cx('input-title')} placeholder="Nhập tiêu đề" />
                            </span>
                            <span className={cx('amount')}>
                                Số lượng tùy chọn{' '}
                                <input
                                    value={numberOptions}
                                    className={cx('input-amount')}
                                    placeholder="Nhập số lượng tùy chọn"
                                    onChange={(e) => setNumberOptions(e.target.value)}
                                />
                            </span>

                            <div
                                className={cx('option-list')}
                                dangerouslySetInnerHTML={{ __html: handleRenderInputOptions() }}
                            ></div>
                            <div className={cx('button-layout')}>
                                <Button outline border transparent>
                                    Hủy
                                </Button>
                                <Button outline border primary type="submit">
                                    Xác nhận
                                </Button>
                            </div>
                        </form>
                    )}

                    {action === 'update' && (
                        <form onSubmit={handleSubmitUpdate}>
                            <span className={cx('options-title')}>
                                Nhóm tùy chọn{' '}
                                <input name="title" className={cx('input-title')} placeholder="Nhập tiêu đề" />
                            </span>
                            <span className={cx('amount')}>
                                Số lượng tùy chọn{' '}
                                <input
                                    value={numberOptions}
                                    className={cx('input-amount')}
                                    placeholder="Nhập số lượng tùy chọn"
                                    onChange={(e) => setNumberOptions(e.target.value)}
                                />
                            </span>

                            <div
                                className={cx('option-list')}
                                dangerouslySetInnerHTML={{ __html: handleRenderInputOptions() }}
                            ></div>
                            <div className={cx('button-layout')}>
                                <Button outline border transparent>
                                    Hủy
                                </Button>
                                <Button outline border primary type="submit">
                                    Xác nhận
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CategoryM;
