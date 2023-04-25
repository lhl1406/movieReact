import React, { useEffect, useRef, useState } from 'react';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Modal, { ModalContent } from '../modal/Modal';
import Button, { OutlineButton } from '../button/Button';
import tmdApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './HeroSlide.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const HerroSilde = () => {
    SwiperCore.use([Autoplay]);
    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 };
            try {
                const respone = await tmdApi.getMoviesList(movieType.popular, {
                    params,
                });
                setMovieItems(respone.results.slice(1, 4));
            } catch {
                console.log('errr');
            }
        };
        getMovies();
    }, []);
    return (
        <div className='hero-slide'>
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                // autoplay={{delay: 3000}}
            >
                {movieItems.map((item, i) => (
                    <SwiperSlide key={i}>
                        {({ isActive }) => (
                            <HeroSlideItem
                                item={item}
                                className={`${isActive ? 'active' : ''}`}
                            />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
            {movieItems.map((item, i) => (
                <TrailerModal key={i} item={item}></TrailerModal>
            ))}
        </div>
    );
};

const HeroSlideItem = (props) => {
    let hisrory = useHistory();

    const item = props.item;

    const background = apiConfig.originalImage(
        item.backdrop_path ? item.backdrop_path : item.poster_path
    );

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);
        const videos = await tmdApi.getVideos(category.movie, item.id);

        if (videos.results.length > 0) {
            const videoSrc =
                'https://www.youtube.com/embed/' + videos.results[0].key;

            modal
                .querySelector('.modal__content > iframe')
                .setAttribute('src', videoSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'no trailer';
        }
        modal.classList.toggle('active');
    };
    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className='hero-slide__item__content container'>
                <div className='hero-slide__item__content__info'>
                    <h2 className='title'>{item.title}</h2>
                    <div className='overview'>{item.overview}</div>
                    <div className='btns'>
                        <Button
                            onClick={() => hisrory.push('/movie/' + item.id)}
                        >
                            Watch now
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className='hero-slide__item__content__poster'>
                    <img src={apiConfig.w500Image(item.poster_path)} alt='' />
                </div>
            </div>
        </div>
    );
};

const TrailerModal = (props) => {
    const item = props.item;
    const iframeRef = useRef(null);
    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe
                    ref={iframeRef}
                    width='100%'
                    height='500px'
                    title='trailer'
                ></iframe>
            </ModalContent>
        </Modal>
    );
};

export default HerroSilde;
