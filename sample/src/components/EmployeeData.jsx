import React from "react";
import TextField from '@mui/material/TextField';
import "./style.css";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";






const EmployeeData = () => {
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [gender, setGender] = useState("female");
    const [date, setDate] = useState("");
    const [hobbies, setHobbies] = useState([]);
    const [display, setDisplay] = useState([]);


    useEffect(() => {
        handleDisply()
    }, [])

    const handleClick = (e) => {
        setHobbies({
            ...hobbies,
            [e.target.name]: e.target.checked
        })
    }


    const handleonSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/data', {
            fullname: name,
            email: email,
            phonenumber: phonenumber,
            gender: gender,
            date: date,
            hobbies: hobbies
        })
            .then(function (response) {
                setData(response.data);

                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    const handleDisply = () => {
        axios.get('http://localhost:3001/data').then(res => setDisplay(res.data))
    }


    return (
        <div>
            <h1>Add Employee Details</h1>
            <form onSubmit={handleonSubmit} className="fill">

                <div className="form">

                    <TextField id="fullname" label="FullName" variant="outlined" onChange={(e) => setName(e.target.value)} />
                    <TextField id="email" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                    <TextField id="phonenumber" label="PhoneNumber" variant="outlined" onChange={(e) => setPhonenumber(e.target.value)} />
                </div>

                <div className="gender">
                    <h3>Select Gender</h3>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" onChange={(e) => setGender(e.target.value)} />
                        <FormControlLabel value="male" control={<Radio />} label="Male" onChange={(e) => setGender(e.target.value)} />
                        <FormControlLabel value="other" control={<Radio />} label="Other" onChange={(e) => setGender(e.target.value)} />
                    </RadioGroup>
                </div>

                <div className="date">
                    <h3>Select your Dateofbirth</h3>
                    <input type="date" onChange={(e) => setDate(e.target.value)} />
                </div>

                <div className="hobbies">
                    <h3>Select your hobbies</h3>

                    <div className="hob">
                        <FormControlLabel name="writing_dairy" control={<Checkbox />} label="Writing Dairy" onChange={handleClick} />
                        <FormControlLabel name="reading_books" control={<Checkbox />} label="Reading Books" onChange={handleClick} />
                        <FormControlLabel name="playing" control={<Checkbox />} label="Playing" onChange={handleClick} />
                        <FormControlLabel name="cooking" control={<Checkbox />} label="Cooking" onChange={handleClick} />
                        <FormControlLabel name="long_rides" control={<Checkbox />} label="Long rides" onChange={handleClick} />
                    </div>


                </div>

            </form>
            <button className="subtn" type="submit">Add details</button>
            <div>
                <table className="table">
                    <tr>
                        <th>FullName</th>
                        <th>Email</th>
                        <th>PhoneNumber</th>
                        <th>Gender</th>
                        <th>DateOfBirth</th>
                        <th>Hobbies</th>
                    </tr>

                    {display.map(item => <div>
                        <tr>
                            <td>{item.fullname}</td>
                            <td>{item.email}</td>
                            <td>{item.phonenumber}</td>
                            <td>{item.gender}</td>
                            <td>{item.date}</td>
                            <td>{Object.keys(item.hobbies).join(",")}</td>
                        </tr>
                    </div>)}
                </table>


            </div>
        </div>
    );
}

export default EmployeeData;