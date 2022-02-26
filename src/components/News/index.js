import Axios from 'axios';
import { useEffect, useState } from 'react';
import noImage from './../../no-image.jpg';
import ArticlePopup from './../common/ArticlePopup.js';

const News = () => {

    const [articleList, setArticleList] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [popUpDetails, setShowPopupDetails] = useState({});
    const [search, setSearch] = useState('');


    //This will populate the articles on component did mount
    useEffect(() => {
        const headers = { 'Content-Type' : 'application/json' };
        Axios.get(
            'https://newsapi.org/v2/top-headlines?country=us&apiKey=7c94c4bf82af4e18a0ba534482945782',
            { headers },
        ).then((response) => {
            if(response?.data?.status === 'ok') {
                const articles = (!!response?.data?.articles) ? response.data.articles : null;
                setArticleList(articles);
            } else {
                alert("Something went wrong, please refresh & try again");
            }
        }).catch((error) => {
            console.log(error);
        }) 
    }, []);

    //it handle the modal functionality & will be used as method as props
    const handlePopup = (e) => {
        let index = e.target.getAttribute('data-id');
        setShowPopup(true);
        setShowPopupDetails(articleList[index]);
    }

    const handleSearch = () => {
        const headers = { 'Content-Type' : 'application/json' };
        Axios.get(
            `https://newsapi.org/v2/everything?q=${search}&apiKey=7c94c4bf82af4e18a0ba534482945782`,
            { headers },
        ).then((response) => {
            console.log(response);
            if(response?.data?.status === 'ok') {
                const articles = (!!response?.data?.articles) ? response.data.articles : null;
                setArticleList(articles);
            } else {
                alert("Something went wrong, please refresh & try again");
            }
        }).catch((error) => {
            console.log(error);
        }) 
    }

    //This function will populate the article grid
    const showArticleList = () => {

        if(articleList === null) return <p className='text-center'>...isLoading</p>
        
        const articleJSX = articleList.map((obj, index) => {
            return (
                <div key={index} className="col-sm-3">
                    <div className='article-details'>
                        <img src={(!!obj.urlToImage) ? obj.urlToImage : noImage} onClick={handlePopup} data-id={index} alt='Article' width="100%" />
                        <h4><a href={obj.url} target="_blank" rel="noreferrer">{obj.title}</a></h4>
                        <p>{obj.description}</p>
                    </div>
                </div>
            );
        })
        
        return articleJSX;
    }

    return (
        <div className="container-fluid">
            <h2>Global News</h2><br />
            <div className='search-container'>
                <div className='form-group'>
                    <input type="search" className='form-control' name="search" 
                        value={search}
                        onChange= {(e) => { setSearch(e.target.value)}} 
                        placeholder='Search News..' 
                    />
                    &nbsp;&nbsp;
                    <button className='btn btn-info' onClick={handleSearch}>Search</button>
                </div>
            </div>
            <br />
            <div className="row">
                {showArticleList()}
            </div>
            <ArticlePopup {...popUpDetails} isOpenPopup={showPopup} handlePopup={setShowPopup} />
        </div>
    )
}

export default News