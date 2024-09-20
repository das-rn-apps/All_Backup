import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PortfolioCard from '../components/PortfolioCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPortfolioItems = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/`);
                console.log(response.data);
                setPortfolioItems(response.data);
            } catch (error) {
                setError('There was an error fetching the portfolio items!');
                console.error(error);
            }
        };

        fetchPortfolioItems();
    }, []);

    return (
        <div>
            <main className="container mt-4">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row">
                    {portfolioItems.length > 0 ? (
                        portfolioItems.map(item => (
                            <PortfolioCard key={item._id} item={item} />
                        ))
                    ) : (
                        <div className="col-12">
                            <p>No portfolio items available.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Home;
