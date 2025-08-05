import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => (fieldsState[field.id] = ''));

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);
    const navigate = useNavigate(); // Get the navigate function

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    };

    const authenticateUser = () => {
        const endpoint = "http://localhost:8080/login";
        console.log(loginState); // This logs the state that's being sent
    
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer '+ localStorage.getItem("site") 
            },
            body: JSON.stringify(loginState),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to authenticate');
            }
        })
        .then((data) => {
            localStorage.setItem("site", data.token);
            console.log('Response data:', data); // Log the data from the response
            if (data.message === 'admin') {
                navigate('/admin-page'); // Navigate to admin page
            } else {
                navigate('/homepage'); // Navigate to homepage for other roles
            }
        })
        .catch((error) => console.log('Error:', error)); // Log any errors that occur
    };
    

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {fields.map((field) => (
                    <Input
                        key={field.id}
                        handleChange={handleChange}
                        value={loginState[field.id]}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        isRequired={field.isRequired}
                        placeholder={field.placeholder}
                    />
                ))}
            </div>

            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Login" />
        </form>
    );
}
