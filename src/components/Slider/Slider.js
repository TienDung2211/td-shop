import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
import { useState, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

const delay = 2500;

function Slider({ data }) {
    const [sliderIndex, setSliderIndex] = useState(0);

    const timeoutRef = useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => setSliderIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1)),
            delay,
        );

        return () => {
            resetTimeout();
        };
    }, [sliderIndex]);

    const nextSlider = () => {
        if (sliderIndex !== data.length - 1) {
            setSliderIndex(sliderIndex + 1);
        } else if (sliderIndex === data.length - 1) {
            setSliderIndex(0);
        }
    };

    const prevSlider = () => {
        if (sliderIndex > 0) {
            setSliderIndex(sliderIndex - 1);
        } else if (sliderIndex === 0) {
            setSliderIndex(data.length - 1);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider-image-layout')} key={data[sliderIndex].id}>
                <img src={data[sliderIndex].linkImage} alt="Ảnh" className={cx('image')} />
                <Button
                    rounded
                    iconOnly={<FontAwesomeIcon icon={faAngleLeft} />}
                    className={cx('left-btn')}
                    onClick={prevSlider}
                />
                <Button
                    rounded
                    iconOnly={<FontAwesomeIcon icon={faAngleRight} />}
                    className={cx('right-btn')}
                    onClick={nextSlider}
                />
                <ul className={cx('dot-list')}>
                    {data.map((slider, index) => {
                        if (index === sliderIndex) {
                            return <li key={slider.id} className={cx('dot-item', 'select')}></li>;
                        } else {
                            return (
                                <li
                                    key={slider.id}
                                    className={cx('dot-item')}
                                    onClick={() => setSliderIndex(index)}
                                ></li>
                            );
                        }
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Slider;
