import React, { useEffect, useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import noteContext from '../context/noteContext'
export const Signup = () => {
    const { state, dispatch } = useContext(noteContext);
    const [alertstate, setalertstate] = useState("secondary");
    const [alertdisplay, setalertdisplay] = useState("displaynone");
    const [alertText, setalertText] = useState("secondary");
    const [email_input, setemail_input] = useState("");
    const [name_input, setname_input] = useState("");
    const [rollno_input, setrollno_input] = useState("");
    const [password_input, setpassword_input] = useState("");
    const [mobile_input, setmobile_input] = useState("");

    const navigate = useNavigate();
    useEffect(() => {

        if (localStorage.getItem('token')) { navigate("/home") }

    });

    const handlesubmit = async (e) => {
        setalertdisplay('displaynone');
        e.preventDefault();
    
        // Extract the input values
        const email = email_input.trim();
        const rollno = rollno_input.trim();
        const name = name_input.trim();
        const password = password_input.trim();
        const mobile = mobile_input.trim();
    
        // Make the API request
        try {
            const response = await fetch(`http://${state.backend}:${state.port}/api/auth/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    mobile: mobile,
                    name: name,
                    rollno: rollno, // Add rollno here
                }),
            });
    
            const json = await response.json();
    
            // Check the server response
            if (json.response) {
                setalertstate('success');
                setalertText(json.message);
            } else {
                setalertstate('danger');
                setalertText(json.message);
            }
        } catch (error) {
            // Handle network or unexpected errors
            setalertstate('danger');
            setalertText('An unexpected error occurred. Please try again.');
        } finally {
            setalertdisplay(""); // Ensure the alert is displayed
        }
    };
    

    return (
        <div className='bg-gray-300'>
            <div className="container signinbox ">
                <section className="bg-gray-300 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-4 py-8 mx-auto md:h-screen lg:py-0 sectonexdiv">
                        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                            Hostelify
                        </a>
                        <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-6">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                                    Create an Account
                                </h1>

                                {/* Alert Section */}
                                <div
                                    className={`${alertdisplay} alert alert-${alertstate}`}
                                    id="loginalert"
                                    style={{
                                        outline: 'none',
                                        border: 'none',
                                        borderRadius: '10px',
                                        marginBottom: '15px',
                                        textAlign: 'center',
                                    }}
                                    role="alert"
                                >
                                    {alertText}
                                </div>

                                {/* Form Section */}
                                <form className="space-y-6" onSubmit={handlesubmit}>
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={name_input}
                                            onChange={(e) => setname_input(e.target.value)}
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="rollno" className="block text-sm font-medium text-gray-900 dark:text-white">
                                            Roll Number
                                        </label>
                                        <input
                                            type="text"
                                            name="rollno"
                                            id="rollno"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={rollno_input}
                                            onChange={(e) => setrollno_input(e.target.value)}
                                            placeholder="21001001000"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={email_input}
                                            onChange={(e) => setemail_input(e.target.value)}
                                            placeholder="name@example.com"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-900 dark:text-white">
                                            Mobile Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="mobile"
                                            id="mobile"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={mobile_input}
                                            onChange={(e) => setmobile_input(e.target.value)}
                                            placeholder="9876543210"
                                            pattern="[0-9]{10}"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={password_input}
                                            onChange={(e) => setpassword_input(e.target.value)}
                                            placeholder="••••••••"
                                            minLength="6"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        id="signup_submit"
                                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        Create an Account
                                    </button>

                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account?{' '}
                                        <Link to="/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                            Login here
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    )
}
