import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddEditCard = ({ isOpen, onClose, onAdd, cardData }) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('https://picsum.photos/500');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (cardData) {
            setTitle(cardData.title || '');
            setDescription(cardData.description || '');
            setImage(cardData.image || "");
        } else {
            setTitle('');
            setDescription('');
            setImage('https://picsum.photos/500');
        }
    }, [cardData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newCard = { title, description, image };
            await onAdd(newCard);
            onClose();
        } catch (error) {
            console.error('Error adding card:', error);
        }
    };

    return (
        <Modal
            show={isOpen}
            onHide={onClose}
            centered
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>{cardData ? 'Edit Card' : 'Add Card'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formImage">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="Image URL"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {cardData ? 'Edit Card' : 'Add Card'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddEditCard;
