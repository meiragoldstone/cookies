import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RetrieveList = () => {
    const [listData, setListData] = useState([
        { id: 1, name: 'Chocolate Chip Cookies', items: ['Flour', 'Sugar', 'Chocolate Chips', 'Oil'] },
        { id: 2, name: 'Cheesecake Cookie', items: ['Cream Cheese', 'Eggs', 'Sugar'] },
        { id: 3, name: 'Birthday Cookie', items: ['Flour', 'Sugar', 'Oil', 'Sprinkles'] },
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

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Retrieve List from Database</h1>

            <div className="row justify-content-center mb-4">
                <div className="col-md-6">
                    <select
                        className="form-select"
                        value={selectedList ? selectedList.id : ''}
                        onChange={handleDropdownChange}
                    >
                        <option value="">Select a list...</option>
                        {listData.map((list) => (
                            <option key={list.id} value={list.id}>{list.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row justify-content-center mb-3">
                <div className="col-md-6">
                    <p className="text-center">Type a list name to see if it exists:</p>
                </div>
            </div>

            <div className="row justify-content-center mb-4">
                <div className="col-md-6">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter list name..."
                            value={searchedList}
                            onChange={handleInputChange}
                        />
                        <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={() => setSelectedList(null)}
                        >
                            Clear Selection
                        </button>
                    </div>
                    {searchedList.trim() !== '' && listExists &&
                        <p className="text-success mt-2">List with name "{searchedList}" exists.</p>
                    }
                    {searchedList.trim() !== '' && !listExists &&
                        <p className="text-danger mt-2">List with name "{searchedList}" does not exist.</p>
                    }
                </div>
            </div>

            {selectedList && (
                <div className="row justify-content-center mt-4">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{selectedList.name}</h5>
                                <ul className="list-group list-group-flush">
                                    {selectedList.items.map((item, index) => (
                                        <li key={index} className="list-group-item">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RetrieveList;
