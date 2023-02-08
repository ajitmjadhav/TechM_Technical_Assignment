import React, { useState, useEffect } from 'react'
import './home.css'

const Home = () => {
    const [dataLoading, setDataLoading] = useState(true);
    const [allData, setAllData] = useState([]);

    const getWhetherReport = async () => {
        const url = `https://course-api.com/react-store-products`;
        const response = await fetch(url);
        const res = await response.json();
        setAllData(res);
        console.log(res);
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            getWhetherReport();
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <div className='wmg-container'>
                <div className='wmg-navbar'>
                    <div className='nav-left'>
                        <h1 className='logo-text'>Shopping Craze</h1>
                        <div className='item-views '>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" act-view w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                            </svg>

                        </div>
                    </div>
                    <div className='nav-mid'>
                        <div className='filters-container'>
                            <input className='name-input' type='text' placeholder='Enter name' />
                            <input className='' type="range" id="vol" name="vol" min="0" max="50" />
                            <button className='submit-filter'>Filter</button>
                        </div>
                    </div>
                    <div className='nav-right'>
                        <button className='cart-btn'>
                            Cart
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className='all-items'>
                    <div className='item-grid'>
                        <div className='item-card'>
                            <div className='card-image'>
                                <img src='https://images2.imgbox.com/cb/69/cQ29pV1x_o.jpeg' alt='random image from web' />
                            </div>
                            <div className='card-detail'>
                                <h2 className='item-name'>Item Name</h2>
                                <div>
                                    <p className='item-cat'>Item Category</p>
                                    <p className='item-company'>Item company</p>
                                </div>
                                <div className='item-desc'>Desc:Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus ante. Nunc euismod risus ut dui interdum ornare. Vestibulum porta ex enim, eget aliquet risus sollicitudin ac.</div>
                                <h3 className='item-price'>200$</h3>
                                <button className='add-to-cart'>Add to Cart</button>
                            </div>
                        </div>
                        <div className='item-card'>
                            <div className='card-image'>
                                <img src='https://images2.imgbox.com/cb/69/cQ29pV1x_o.jpeg' alt='random image from web' />
                            </div>
                            <div className='card-detail'>
                                <h2 className='item-name'>Item Name</h2>
                                <div>
                                    <p className='item-cat'>Item Category</p>
                                    <p className='item-company'>Item company</p>
                                </div>
                                <div className='item-desc'>Desc:Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus ante. Nunc euismod risus ut dui interdum ornare. Vestibulum porta ex enim, eget aliquet risus sollicitudin ac.</div>
                                <h3 className='item-price'>200$</h3>
                                <button className='add-to-cart'>Add to Cart</button>
                            </div>
                        </div>
                        <div className='item-card'>
                            <div className='card-image'>
                                <img src='https://images2.imgbox.com/cb/69/cQ29pV1x_o.jpeg' alt='random image from web' />
                            </div>
                            <div className='card-detail'>
                                <h2 className='item-name'>Item Name</h2>
                                <div>
                                    <p className='item-cat'>Item Category</p>
                                    <p className='item-company'>Item company</p>
                                </div>
                                <div className='item-desc'>Desc:Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus ante. Nunc euismod risus ut dui interdum ornare. Vestibulum porta ex enim, eget aliquet risus sollicitudin ac.</div>
                                <h3 className='item-price'>200$</h3>
                                <button className='add-to-cart'>Add to Cart</button>
                            </div>
                        </div>
                        <div className='item-card'>
                            <div className='card-image'>
                                <img src='https://images2.imgbox.com/cb/69/cQ29pV1x_o.jpeg' alt='random image from web' />
                            </div>
                            <div className='card-detail'>
                                <h2 className='item-name'>Item Name</h2>
                                <div>
                                    <p className='item-cat'>Item Category</p>
                                    <p className='item-company'>Item company</p>
                                </div>
                                <div className='item-desc'>Desc:Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus ante. Nunc euismod risus ut dui interdum ornare. Vestibulum porta ex enim, eget aliquet risus sollicitudin ac.</div>
                                <h3 className='item-price'>200$</h3>
                                <button className='add-to-cart'>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home