import React from 'react';
import HeroSilde from '../components/hero-slide/HeroSilde';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { OutlineButton } from '../components/button/Button';
import MovieList from '../components/movie-list/MovieList';
import { category, movieType, tvType } from '../api/tmdbApi';
const Home = () => {
    return (
        <>
            <HeroSilde></HeroSilde>
            <div className='container'>
                <section className='section mb-3'>
                    <div className='section__header mb-2'>
                        <h2>Trending Movies</h2>
                        <Link to='/movie'>
                            <OutlineButton className='smail'>
                                View more
                            </OutlineButton>
                        </Link>
                    </div>
                    <MovieList
                        category={category.movie}
                        type={movieType.popular}
                    ></MovieList>
                </section>
                <section className='section mb-3'>
                    <div className='section__header mb-2'>
                        <h2>Top Rated Movies</h2>
                        <Link to='/movie'>
                            <OutlineButton className='smail'>
                                View more
                            </OutlineButton>
                        </Link>
                    </div>
                    <MovieList
                        category={category.movie}
                        type={movieType.top_rated}
                    ></MovieList>
                </section>
                <section className='section mb-3'>
                    <div className='section__header mb-2'>
                        <h2>Trending Tv</h2>
                        <Link to='/tv'>
                            <OutlineButton className='smail'>
                                View more
                            </OutlineButton>
                        </Link>
                    </div>
                    <MovieList
                        category={category.movie}
                        type={tvType.popular}
                    ></MovieList>
                </section>
                <section className='section mb-3'>
                    <div className='section__header mb-2'>
                        <h2>Top rated Tv</h2>
                        <Link to='/tv'>
                            <OutlineButton className='smail'>
                                View more
                            </OutlineButton>
                        </Link>
                    </div>
                    <MovieList
                        category={category.movie}
                        type={tvType.top_rated}
                    ></MovieList>
                </section>
            </div>
        </>
    );
};

export default Home;
