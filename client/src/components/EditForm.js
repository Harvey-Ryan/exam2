import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../App.css';

const EditPet = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState({
        name: '',
        description: '',
        type: '',
        skill1: '',
        skill2: '',
        skill3: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/pets/${id}`)
            .then((res) => {
                setPet(res.data);
                console.log(res.data);
                console.log(pet);
                console.log(errors);
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Disable the submit button
        axios
            .put(`http://localhost:8000/api/pets/${id}/edit`, pet)
            .then((res) => {
                navigate('/');
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
                if (err.response && err.response.data.code === 11000 && err.response.data.codeName === 'DuplicateKey') {
                    // Handle duplicate key error
                    setErrors({ name: 'Name must be unique' });
                } else {
                    setErrors(err.response.data.errors);
                }
                setIsSubmitting(false); // Enable the submit button again
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='top-nav'>
                <h1>Pet Shelter</h1>
                <Link to='/api'>back to home</Link>
            </div>
            <h3 className='header'>Edit {pet.name}</h3>
            <div className='form-main'>
                <div className='form-group'>
                    <label htmlFor='name'>Name:</label>
                    {errors.name ? <p className='error'>{"Please set a Unique name greater than 3 characters"}</p> : null}
                    <input
                        type='text'
                        className='form-control'
                        id='name'
                        value={pet.name}
                        onChange={(e) => setPet({ ...pet, name: e.target.value })}
                    />
                    <label htmlFor='type'>Type:</label>
                    {errors.type ? <p className='error'>{errors.type}</p> : null}
                    <input
                        type='text'
                        className='form-control'
                        id='type'
                        value={pet.type}
                        onChange={(e) => setPet({ ...pet, type: e.target.value })}
                    />
                    <label htmlFor='body'>Description:</label>
                    {errors.description ? <p className='error'>{errors.description}</p> : null}
                    <input
                        type='text'
                        className='form-control'
                        id='description'
                        value={pet.description}
                        onChange={(e) => setPet({ ...pet, description: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor='skill1'>Skill 1:</label>
                    {errors.skill1 ? <p className='error'>{errors.skill1}</p> : null}
                    <input
                        type='text'
                        className='form-control'
                        id='skill1'
                        value={pet.skill1}
                        onChange={(e) => setPet({ ...pet, skill1: e.target.value })}
                    />
                    <label htmlFor='skill2'>Skill 2:</label>
                    {errors.skill2 ? <p className='error'>{errors.skill2}</p> : null}
                    <input
                        type='text'
                        className='form-control'
                        id='skill2'
                        value={pet.skill2}
                        onChange={(e) => setPet({ ...pet, skill2: e.target.value })}
                    />
                    <label htmlFor='skill3'>Skill 3:</label>
                    {errors.skill3 ? <p className='error'>{errors.skill3}</p> : null}
                    <input
                        type='text'
                        className='form-control'
                        id='skill3'
                        value={pet.skill3}
                        onChange={(e) => setPet({ ...pet, skill3: e.target.value })}
                    />
                </div>
                <div>
                    <button type='submit' className='btn btn-primary' disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Edit Pet'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default EditPet;
