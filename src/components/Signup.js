import React,{useState} from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {
    
    const [credentials, setCredentials] = useState({name:"", email:"", password:"", confirmPassword:""})
    let history = useHistory();

    const userSignup = async (e) => {
        e.preventDefault();
        let url = "http://localhost:5000/api/auth/createuser"
        const {name, email, password}= credentials;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json', 
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            history.push("/")
        }
        else{
            alert("Something wrong!")
        }
    }

    const setValueOnChange=(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className="container d-flex justify-content-center">
           <form className="my-4 col-sm-6" onSubmit={userSignup}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" minLength={3} name="name" id="name" required onChange={setValueOnChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" id="email" required onChange={setValueOnChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" minLength={5} name="password" id="password" required onChange={setValueOnChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Corfirm Password</label>
                    <input type="password" className="form-control" minLength={5} name="confirmPassword" required id="confirmPassword"/>
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )
}

export default Signup
