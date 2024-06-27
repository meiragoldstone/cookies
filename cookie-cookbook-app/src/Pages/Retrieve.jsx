import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const RetrieveList = () => {
    const [listData, setListData] = useState([
        { id: 1, name: 'Chocolate Chip Cookies', items: ['Flour', 'Sugar', 'Chocolate Chips', 'Oil'] },
        { id: 2, name: 'Cheesecake Cookies', items: ['Cream Cheese', 'Eggs', 'Sugar'] },
        { id: 3, name: 'Birthday Cookies', items: ['Flour', 'Sugar', 'Oil', 'Sprinkles'] },
    ]);

    const [selectedList, setSelectedList] = useState(null);
    const [searchedList, setSearchedList] = useState('');
    const [listExists, setListExists] = useState(false);

    const handleDropdownChange = (event) => {
        const selectedId = parseInt(event.target.value);
        const list = listData.find(item => item.id === selectedId);
        setSelectedList(list);
        setSearchedList('');
        setListExists(false);
    };

    const handleInputChange = (event) => {
        setSearchedList(event.target.value);
        setSelectedList(null);
    };

    useEffect(() => {
        if (searchedList.trim() === '') {
            setListExists(false);
            return;
        }
        
        const trimmedListName = searchedList.trim().toLowerCase();
        const exists = listData.some(list => list.name.toLowerCase() === trimmedListName);
        setListExists(exists);
    }, [searchedList, listData]);

    const clearSelection = () => {
        setSelectedList(null);
        setSearchedList('');
        setListExists(false);
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Retrieve List from Database</h1>

            <Row className="justify-content-center mb-4">
                <Col md={6}>
                    <Form.Select
                        value={selectedList ? selectedList.id : ''}
                        onChange={handleDropdownChange}
                    >
                        <option value="">Select a list...</option>
                        {listData.map((list) => (
                            <option key={list.id} value={list.id}>{list.name}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>

            <Row className="justify-content-center mb-3">
                <Col md={6}>
                    <p className="text-center">Type a list name to see if it exists:</p>
                </Col>
            </Row>

            <Row className="justify-content-center mb-4">
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Enter list name..."
                            value={searchedList}
                            onChange={handleInputChange}
                        />
                        <Button
                            variant="outline-primary"
                            onClick={clearSelection}
                        >
                            Clear Selection
                        </Button>
                    </Form.Group>
                    {searchedList.trim() !== '' && listExists &&
                        <p className="text-success mt-2">List with name "{searchedList}" exists.</p>
                    }
                    {searchedList.trim() !== '' && !listExists &&
                        <p className="text-danger mt-2">List with name "{searchedList}" does not exist.</p>
                    }
                </Col>
            </Row>

            {selectedList && (
                <Row className="justify-content-center mt-4">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{selectedList.name}</Card.Title>
                                <ul className="list-group list-group-flush">
                                    {selectedList.items.map((item, index) => (
                                        <li key={index} className="list-group-item">{item}</li>
                                    ))}
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default RetrieveList;
