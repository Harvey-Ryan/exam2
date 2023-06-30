import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../App.css';

const CreatePet = () => {
    // const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState({
        name:'',
        description:'',
        type:'',
    });
    const [errors, setErrors] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post(`http://localhost:8000/api/pets/new`, pet)
        .then((res) => {
            navigate('/');
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
            setErrors(err.response.data.errors.name);
        });
    };

    return (
        <form className='App' onSubmit={handleSubmit}>
            <div className='top-nav'>
                <h1>Pet Shelter</h1>
                <Link to="/">back to home</Link>
            </div>
            <div>
            <h3 className='header'>Know a pet needing a home?</h3>
            </div>
            <div className='form-main'>
                <div className='form-group'>
                    <label htmlFor='name'>Name:</label>
                    {errors.name ? <p className='error'>{"Please set a Unique name greater than 3 characters"}</p> : null}
                    <input
                        type='text'
                        className='form-control'
                        id='name'
                        // value=""
                        onChange={(e) => setPet({ ...pet, name: e.target.value })}
                    />
                    <label htmlFor='type'>Type:</label>
                    {errors.type? <p className='error'>{"Type must contain min of 3 characters."}</p> : null}
                    <input
                    type='text'
                    className='form-control'
                    id='type'
                    // value=''
                    onChange={(e) => setPet({...pet, type: e.target.value })}
                    />
                    <label htmlFor='body'>Description:</label>
                    {errors.description ? <p className='error'>{"Description must contain min of 3 characters."}</p> : null}
                    <input
                        type='text'
                        className='form-control'
                        id='description'
                        // value=''
                        onChange={(e) => setPet({ ...pet, description: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='skill1'>Skill 1:</label>
                    {errors.skill1? <p className='error'>{"Skill must contain min of 3 characters."}</p> : null}
                    <input
                    type='text'
                    className='form-control'
                    id='skill1'
                    // value=''
                    onChange={(e) => setPet({...pet, skill1: e.target.value })}
                    />
                    <label htmlFor='skill2'>Skill 2:</label>
                    {errors.skill2? <p className='error'>{"Skill must contain min of 3 characters."}</p> : null}
                    <input
                    type='text'
                    className='form-control'
                    id='skill2'
                    // value=''
                    onChange={(e) => setPet({...pet, skill2: e.target.value })}
                    />
                    <label htmlFor='skill3'>Skill 3:</label>
                    {errors.skill3? <p className='error'>{"Skill must contain min of 3 characters."}</p> : null}
                    <input
                    type='text'
                    className='form-control'
                    id='skill3'
                    // value=''
                    onChange={(e) => setPet({...pet, skill3: e.target.value })}
                    />
                </div>
                <div>
                <button type='submit' className='btn btn-primary'>Submit</button>
                </div>
            </div>
        </form>
    );
    };
    export default CreatePet;