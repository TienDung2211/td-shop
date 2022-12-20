import classNames from 'classnames/bind';
import styles from './OptionsPopper.module.scss';

import { useState, useEffect } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Options from '~/components/Options';
import HeadlessTippy from '@tippyjs/react/headless';
import variationServices from '~/services/variationServices';

const cx = classNames.bind(styles);

function OptionsPopper({ white, lowBlack, manager, className }) {
    const layout = cx('layout', {
        manager,
        [className]: className,
    });
    const button = cx('button', {
        white,
        lowBlack,
        [className]: className,
    });

    const [show, setShow] = useState(false);
    const [varitons, setVaritons] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            let dataAPI = await variationServices.getAllVariations();
            const results = dataAPI.content;
            setVaritons(results);
        };

        fetchAPI();
    }, []);

    return varitons ? (
        <div className={cx('wrapper')}>
            <HeadlessTippy
                interactive
                visible={show}
                placement="bottom-start"
                render={(attrs) => (
                    <div
                        className={cx('layout')}
                        tabIndex="-1"
                        {...attrs}
                        onMouseLeave={() => {
                            setShow(false);
                        }}
                    >
                        <div className={cx('list-variations')}>
                            {varitons.map((variation, index) => {
                                return (
                                    <div key={index} className={cx('grid-column-3')}>
                                        <Options data={variation} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            >
                <div
                    className={cx('button')}
                    onMouseEnter={() => {
                        setShow(true);
                    }}
                >
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </HeadlessTippy>
        </div>
    ) : null;
}

export default OptionsPopper;
