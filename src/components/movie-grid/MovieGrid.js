import React, { useEffect, useState, useCallback } from 'react';
import './MovieGrid.scss';
import { useParams } from 'react-router';
import MovieCard from '../movie-card/MovieCard';
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import { OutlineButton } from '../button/Button';
import Input from '../input/Input';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Button from '../button/Button';
const MovieGrid = (props) => {
    const [items, setItems] = useState([]);

    const [page, setaPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const { keyword } = useParams();
    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = {};
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(
                            movieType.popular,
                            { params }
                        );
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, {
                            params,
                        });
                }
            } else {
                const params = {
                    query: keyword,
                };
                response = await tmdbApi.search(props.category, { params });
            }
            setItems(response.results);
            setTotalPage(response.total_pages);
        };
        getList();
    }, [props.category, keyword]);

    const loadMore = async () => {
        let response = null;
        if (keyword === undefined) {
            const params = {
                page: page + 1,
            };
            switch (props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.popular, {
                        params,
                    });
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, {
                        params,
                    });
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword,
            };
            response = await tmdbApi.search(props.category, { params });
        }
        setItems([...items, ...response.results]);
        setaPage(page + 1);
    };
    return (
        <>
            <div className='section mb-3'>
                <MovieSearch
                    category={props.category}
                    keyword={keyword}
                ></MovieSearch>
            </div>
            <div className='movie-grid'>
                {items.map((item, i) => (
                    <MovieCard
                        category={props.category}
                        item={item}
                        key={i}
                    ></MovieCard>
                ))}
            </div>

            {page < totalPage ? (
                <div className='movie-grid__loadmore'>
                    <OutlineButton className='smaill' onClick={loadMore}>
                        Load more
                    </OutlineButton>
                </div>
            ) : null}
        </>
    );
};
const MovieSearch = (props) => {
    const history = useHistory();
    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');
    const goToSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
            history.push(`/${category[props.category]}/search/${keyword}`);
        }
    }, [keyword, props.category, history]);
    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        };
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch]);
    return (
        <div className='movie-search'>
            <Input
                type='text'
                placeholder='Enter keyword'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            ></Input>
            <Button className='small' onClick={goToSearch}>
                Search
            </Button>
        </div>
    );
};
export default MovieGrid;
