import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CardComponent = ({ card, onEdit, onDelete }) => {


    const truncatedDescription = card.description.length > 30
        ? `${card.description.substring(0, 30)}...`
        : card.description;

    return (
        <Card className="m-3 shadow-sm" style={{ width: '18rem', height: '25rem' }}>
            <Card.Img variant="top" src={card.image} alt={card.title} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{card.title}</Card.Title>
                <Card.Text className="text-truncate">{truncatedDescription}</Card.Text>
                <div className="mt-auto d-flex justify-content-between">
                    <Button variant="primary" onClick={() => onEdit(card)}>Edit</Button>
                    <Button variant="danger" onClick={() => onDelete(card)}>Delete</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default CardComponent;
