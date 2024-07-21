import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const RetrieveRecipe = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await fetch('https://lqtpgzkl41.execute-api.us-east-1.amazonaws.com/default/retrieveRecipe');
            if (!response.ok) {
                return;
            }
            const data = await response.json();
            if (Array.isArray(data)) {
                const sortedRecipes = data.sort((a, b) => a.name.localeCompare(b.name));
                setRecipes(sortedRecipes);
            }
        } catch (error) {
        }
    };

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setSearchResult(null);
            return;
        }

        try {
            const response = await fetch(`https://lqtpgzkl41.execute-api.us-east-1.amazonaws.com/default/retrieveRecipe?recipeId=${encodeURIComponent(searchTerm.trim())}`);
            if (!response.ok) {
                setSearchResult({ name: searchTerm, notFound: true });
                return;
            }
            const data = await response.json();
            if (data && data.pk) {
                setSearchResult({
                    name: data.pk,
                    ingredients: data.list,
                    directions: data.directions,
                });
            } else {
                setSearchResult({ name: searchTerm, notFound: true });
            }
        } catch (error) {
            setSearchResult({ name: searchTerm, notFound: true });
        }
    };

    const clearSelection = () => {
        setSearchTerm('');
        setSearchResult(null);
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Find a Recipe!</h1>

            <Row className="justify-content-center mb-4">
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Search recipe..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button
                            variant="outline-primary"
                            onClick={handleSearch}
                            className="mt-2"
                        >
                            Search
                        </Button>
                        <Button
                            variant="outline-secondary"
                            onClick={clearSelection}
                            className="mt-2 ms-2"
                        >
                            Clear Selection
                        </Button>
                    </Form.Group>
                    {searchResult && searchResult.notFound && (
                        <Card>
                            <Card.Body className="text-center">
                                <Card.Title>{searchResult.name}</Card.Title>
                                <p>Yum, that sounds delicious! Unfortunately, although the Cookie Cookbook team is constantly working to update the website to serve its users the best that it could, that recipe is not yet part of the website. Maybe you can be the first to add it!</p>
                            </Card.Body>
                        </Card>
                    )}

                    {searchResult && !searchResult.notFound && (
                        <Card>
                            <Card.Body>
                                <Card.Title>{searchResult.name}</Card.Title>
                                <h4>Ingredients:</h4>
                                <ul>
                                    {searchResult.ingredients && searchResult.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                                <h4>Directions:</h4>
                                <p>{searchResult.directions}</p>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>

            {recipes.length > 0 && (
                <Row className="justify-content-center mb-4">
                    <Col md={6}>
                        <h2 className="text-center">All Recipes</h2>
                        {recipes.map((recipe, index) => (
                            <Card key={index} className="mb-3">
                                <Card.Body>
                                    <Card.Title>{recipe.name}</Card.Title>
                                    <h4>Ingredients:</h4>
                                    <ul>
                                        {recipe.list && recipe.list.map((ingredient, idx) => (
                                            <li key={idx}>{ingredient}</li>
                                        ))}
                                    </ul>
                                    <h4>Directions:</h4>
                                    <p>{recipe.directions}</p>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default RetrieveRecipe;
