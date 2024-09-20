import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddEditCard from '../adminPanel/AddEditCard';
import Card from '../adminPanel/Card';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = () => {
    const [cards, setCards] = useState([]);
    const [editingCard, setEditingCard] = useState(null);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchCards = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}`);
            setCards(response.data);
        } catch (error) {
            console.error('Error details:', error);
            setError('There was an error fetching the cards!');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const handleAddOrEditCard = async (card) => {
        try {
            if (editingCard) {
                await axios.put(`${process.env.REACT_APP_API_URL}/edit/${editingCard._id}`, card);
            } else {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}`, card);
                setCards([...cards, response.data]);
            }
            fetchCards();
            setIsModalOpen(false);
        } catch (error) {
            setError('There was an error saving the card!');
            console.error(error);
        }
    };

    const handleDeleteCard = async (id) => {
        if (window.confirm('Are you sure you want to delete this card?')) {
            try {
                await axios.put(`${process.env.REACT_APP_API_URL}/delete/${id}`);
                await fetchCards();
            } catch (error) {
                setError('There was an error deleting the card!');
                console.error(error);
            }
        }
    };

    const openModalForEdit = (card) => {
        setEditingCard(card);
        setIsModalOpen(true);
    };

    const openModalForAdd = () => {
        setEditingCard(null);
        setIsModalOpen(true);
    };

    return (
        <div className="container py-3">
            <h1>Admin Panel</h1>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            <IconButton
                onClick={openModalForAdd}
                className="position-fixed"
                style={{
                    top: '1rem',
                    right: '1rem',
                    zIndex: 1000,
                    backgroundColor: '#007bff',
                    color: '#fff'
                }}
            >
                <AddIcon />
            </IconButton>

            <div className="row mt-4">
                {cards.length === 0 ? (
                    <p className="text-center w-100">No cards available. Add some!</p>
                ) : (
                    cards.map(card => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center" key={card._id}>
                            <div className="card-container">
                                <Card
                                    card={card}
                                    onEdit={() => openModalForEdit(card)}
                                    onDelete={() => handleDeleteCard(card._id)}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>


            <AddEditCard
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddOrEditCard}
                cardData={editingCard}
            />
        </div>
    );
};

export default Admin;
