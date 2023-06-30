
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DisplayOne from './DisplayOne';
import '../App.css';

//Create DisplayAll Component
const DisplayAll = () => {
    const [allPets, setAllPets] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:8000/api')
            .then((res) => {
                setAllPets(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.res);
            });
    }, []);

    return (
        <div className='App'>
            <div className='top-nav'>
                <h1>Pet Shelter</h1>
                <Link to="/pets/new">add a pet to the shelter</Link>
            </div>

            <div className='header'>
                <h2 className='header'>These pets are looking for a good home</h2>

                <table className='table'>
                    <thead>
                        <tr>
                            <th className='th'>Name</th>
                            <th className='th'>Type</th>
                            <th className='th'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allPets.map((pet, index) => {
                            return (
                                <tr key={index}>
                                    <td className='th'>{pet.name}</td>
                                    <td className='th'>{pet.type}</td>
                                    <td className='th'>
                                    <Link to={`/pets/${pet._id}`}>Details</Link>&nbsp;|&nbsp;
                                    <Link to={`/pets/${pet._id}/edit`}>Edit</Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DisplayAll;