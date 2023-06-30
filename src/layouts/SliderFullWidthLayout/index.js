import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Slider from '~/components/Slider/Slider';
import styles from './SliderFullWidthLayout.module.scss';
import Variations from '~/components/Variations/Variations';

const cx = classNames.bind(styles);

const dataSlider = [
    {
        id: 0,
        url: 'https://lh3.googleusercontent.com/CKZ-vKNDPMU9ZSI6BUDtb4eLuIGf4FJ1l1COFudsEG77dN4S_EWa-Fae9F3M1H7lB9OUxedcgD31HXUALOTsOzi1m6Hnp0Yi=rw-w1090',
        limited: true,
    },
    {
        id: 1,
        url: 'https://theme.hstatic.net/1000026716/1000440777/14/slideshow_1.jpg?v=31811',
        limited: false,
    },
    {
        id: 2,
        url: 'https://theme.hstatic.net/1000026716/1000440777/14/slideshow_2.jpg?v=31811',
        limited: true,
    },
    {
        id: 3,
        url: 'https://theme.hstatic.net/1000026716/1000440777/14/slideshow_8.jpg?v=31811',
        limited: true,
    },
    {
        id: 4,
        url: 'https://theme.hstatic.net/1000026716/1000440777/14/slideshow_5.jpg?v=31811',
        limited: true,
    },
    {
        id: 5,
        url: 'https://theme.hstatic.net/1000026716/1000440777/14/slideshow_9.jpg?v=31811',
        limited: true,
    },
    {
        id: 6,
        url: 'https://theme.hstatic.net/1000026716/1000440777/14/slideshow_13.jpg?v=31811',
        limited: true,
    },
];

function SliderFullWidthLayout({ children }) {
    return (
        <div className={cx('container-fluid', 'p-0', 'm-0', 'wrapper')}>
            <div className={cx('row', 'p-0', 'm-0')}>
                <Header />
            </div>
            <div className={cx('p-0', 'm-0', 'w-100')}>
                <div className={cx('slider')}>
                    <Slider data={dataSlider} />
                    <div className={cx('variations')}>
                        <Variations />
                    </div>
                </div>
            </div>
            <div className={cx('row', 'p-0', 'm-0', 'd-flex', 'justify-content-center')}>
                <div className={cx('container')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default SliderFullWidthLayout;
