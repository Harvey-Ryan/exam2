import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';

const DisplayOne = () => {
    const { id } = useParams();
    const [petNotFound, setPetNotFound] = useState('');
    const navigate = useNavigate();
    const [pet, setPet] = useState({
        name: '',
        type: '',
        description: '',
        skill1: '',
        skill2: '',
        skill3: '',
        likes: 0,
    });
    const [likeButtonDisabled, setLikeButtonDisabled] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/pets/${id}`)
            .then((res) => {
                setPet(res.data);
                console.log(res.data._id, res.data.name, res.data.description);
            })
            .catch((err) => {
                setPetNotFound('pet not found');
                console.log(err.res);
            });
    }, [id]);

    const handleAdoptClick = () => {
        axios
            .delete(`http://localhost:8000/api/pets/${id}`)
            .then((res) => {
                navigate('/');
                console.log(res);
            })
            .catch((err) => {
                console.log(err.res);
            });
    };

    const handleLikeClick = () => {
        if (!likeButtonDisabled) {
            setLikeButtonDisabled(true); // Disable the button

            // Increment the likes in the database
            axios
                .put(`http://localhost:8000/api/pets/${id}/edit`, { ...pet, likes: pet.likes + 1 })
                .then((res) => {
                    setPet((prevState) => ({ ...prevState, likes: res.data.likes }));
                })
                .catch((error) => {
                    console.error('Failed to increment like:', error);
                })
        }
    };

    return (
        <div className='App'>
            <div className='top-nav'>
                <h1>Pet Shelter</h1>
                <Link to="/">back to home</Link>
            </div>
            <div>
                <div className='top-nav'>
                    <h2 className='header'>Details about: {pet.name}</h2>
                    <button onClick={handleAdoptClick}>Adopt {pet.name}</button>
                </div>
                <table className='table'>
                    <tbody className='header'>
                    <tr>
                        <td><h3>Pet Type:</h3></td>
                        <td>{pet.type}</td>
                    </tr>
                    <tr>
                        <td><h3>Description:</h3></td>
                        <td>{pet.description}</td>
                    </tr>
                    <tr>
                        <td><h3>Pet Skills:</h3></td>
                        <td>{pet.skill1}
                        <p>{pet.skill2}</p>
                        <p>{pet.skill3}</p>
                        </td>
                    </tr>
                    <tr className='likes'>
                        <button onClick={handleLikeClick} disabled={likeButtonDisabled}>
                            Like {pet.name}
                        </button>
                        <p>&nbsp;&nbsp;{pet.likes} Like(s)</p>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DisplayOne;
