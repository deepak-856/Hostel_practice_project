// import React, { useEffect, useContext, useState } from 'react'
// import { Link, useNavigate } from "react-router-dom";
// import noteContext from '../context/noteContext'

// export const Signin = (props) => {

//     const { state, dispatch } = useContext(noteContext);
//     const [count, setCount] = useState(0);
//     const [alertstate, setalertstate] = useState("secondary");
//     const [alertdisplay, setalertdisplay] = useState("displaynone");
//     const [alertText, setalertText] = useState("secondary");
//     const [email_input, setemail_input] = useState("");
//     const [password_input, setpassword_input] = useState("");

//     const navigate = useNavigate();
//     useEffect(() => {
//         if (localStorage.getItem('token')) {
//             navigate("/home")
//         }
//         else {
//             dispatch({ type: 'UPDATE_NAME', payload: "User" });
//             dispatch({ type: 'UPDATE_room', payload: 0 });
//             dispatch({ type: 'UPDATE_photo_url', payload: `vec2.jpg` });
//             dispatch({ type: 'UPDATE_VALUE', payload: false });
//             dispatch({ type: 'UPDATE_AVALUE', payload: false });
//             setCount(100);
//         }
//     }, []);


//     //   function for login
//     const handle = async (e) => {
//         setalertdisplay('displaynone')
//         localStorage.clear()
//         let iemail = email_input
//         let ipassword = password_input
//         e.preventDefault();
//         try {
//             const response = await fetch(`http://${state.backend}:${state.port}/api/auth/login`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ email: iemail, password: ipassword })


//             });

//             if (response.ok) {
//                 alert('Sign-in successful!');

//                 // Remember Me logic
//                 if (formData.rememberMe) {
//                     localStorage.setItem('rememberedEmail', formData.email);
//                     localStorage.setItem('rememberMe', true);
//                 } else {
//                     localStorage.removeItem('rememberedEmail');
//                     localStorage.removeItem('rememberMe');
//                 }
//             } else {
//                 alert(data.error || 'Sign-in failed.');
//             }
//         } catch (error) {
//             console.error('Error during sign-in:', error);
//             alert('An error occurred.');
//         }


//         const json = await response.json();
//         if (json.response) {
//             localStorage.setItem('token', json.jwtData)
//             dispatch({ type: 'UPDATE_VALUE', payload: true });
//             setalertstate('success')
//             setalertText(json.message)
//             setalertdisplay("")
//             navigate("/home")
//         } else {
//             setalertstate('danger')
//             setalertText(json.message)
//             setalertdisplay("")

//         }
//     }




//     const SignIn = () => {
//         const [formData, setFormData] = useState({
//             email: '',
//             password: '',
//             rememberMe: false,
//         });

//         useEffect(() => {
//             // Load email and rememberMe state from localStorage on component mount
//             const savedEmail = localStorage.getItem('rememberedEmail');
//             const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

//             if (savedRememberMe && savedEmail) {
//                 setFormData((prev) => ({
//                     ...prev,
//                     email: savedEmail,
//                     rememberMe: savedRememberMe,
//                 }));
//             }
//         }, []);

//         const handleChange = (e) => {
//             const { name, value, type, checked } = e.target;
//             setFormData((prev) => ({
//                 ...prev,
//                 [name]: type === 'checkbox' ? checked : value,
//             }));
//         };

//     }
//         return (
//             <>
//                 <div className="container signinbox">
//                     <section className="bg-gray-50 dark:bg-gray-900 siginsection">
//                         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 sectonexdiv">
//                             <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
//                                 <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
//                                 DCRUST Boys Hostel
//                             </a>
//                             <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//                                 <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

//                                     <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                                         Sign in to your account
//                                     </h1>
//                                     <div className={`${alertdisplay} alert alert-${alertstate}`} id='loginalert' style={{ outline: 'none', border: 'none', borderRadius: '10px' }} role="alert">
//                                         {alertText}
//                                     </div>
//                                     <form className="space-y-4 md:space-y-6" onSubmit={handle}>
//                                         <div>
//                                             <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white dlabel">Your email</label>
//                                             <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@mail.com" required value={email_input} onChange={(e) => { setemail_input(e.target.value) }} />
//                                         </div>
//                                         <div>
//                                             <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white dlabel">Password</label>
//                                             <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={password_input} onChange={(e) => { setpassword_input(e.target.value) }} />
//                                         </div>
//                                         <div className="flex items-center justify-between">
//                                             <div className="flex items-start">
//                                                 <div className="flex items-center h-5">
//                                                     <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
//                                                 </div>
//                                                 <div className="ml-3 text-sm">
//                                                     <label htmlFor="remember" name="rememberMe" type="checkbox" checked={formData.rememberMe} onChange={handleChange} className="text-gray-500 dark:text-gray-300">Remember me</label>
//                                                 </div>
//                                             </div>
//                                             <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
//                                         </div>
//                                         <button type="submit" id='sigin_submit' className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
//                                         <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                                             Don’t have an account yet? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
//                                         </p>
//                                         <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                                             Login to admin <Link to="/adminsignin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Click here</Link>
//                                         </p>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                 </div>
//             </>
//         )
//     }





import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import noteContext from '../context/noteContext';

export const Signin = (props) => {
    const { state, dispatch } = useContext(noteContext);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [alertState, setAlertState] = useState('secondary');
    const [alertDisplay, setAlertDisplay] = useState('displaynone');
    const [alertText, setAlertText] = useState('');
    const navigate = useNavigate();

    // Load Remember Me data
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home');
        } else {
            const savedEmail = localStorage.getItem('rememberedEmail');
            const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

            if (savedRememberMe && savedEmail) {
                setFormData((prev) => ({
                    ...prev,
                    email: savedEmail,
                    rememberMe: savedRememberMe,
                }));
            }
            dispatch({ type: 'UPDATE_NAME', payload: 'User' });
            dispatch({ type: 'UPDATE_room', payload: 0 });
            dispatch({ type: 'UPDATE_photo_url', payload: 'vec2.jpg' });
            dispatch({ type: 'UPDATE_VALUE', payload: false });
            dispatch({ type: 'UPDATE_AVALUE', payload: false });
        }
    }, [dispatch, navigate]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        setAlertDisplay('displaynone');
        localStorage.clear();

        try {
            const response = await fetch(`http://${state.backend}:${state.port}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.jwtData);

                // Handle Remember Me functionality
                if (formData.rememberMe) {
                    localStorage.setItem('rememberedEmail', formData.email);
                    localStorage.setItem('rememberMe', true);
                } else {
                    localStorage.removeItem('rememberedEmail');
                    localStorage.removeItem('rememberMe');
                }

                dispatch({ type: 'UPDATE_VALUE', payload: true });
                setAlertState('success');
                setAlertText('Sign-in successful!');
                setAlertDisplay('');
                navigate('/home');
            } else {
                setAlertState('danger');
                setAlertText(data.error || 'Sign-in failed.');
                setAlertDisplay('');
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
            setAlertState('danger');
            setAlertText('An error occurred.');
            setAlertDisplay('');
        }
    };

    //Forgot Password Handler
    const handleForgotPassword = () => {
        navigate('/forgot-password'); // Assumes you have a route for "/forgot-password"
    };
    // const ForgotPassword = () => {
    //     const [email, setEmail] = useState("");
    //     const [message, setMessage] = useState("");

    //     const handleSubmit = async (e) => {
    //         console.log("hello")
    //         e.preventDefault();
    //         try {
    //             const response = await axios.post("/api/auth/forgot-password", { email });
    //             setMessage(response.data.message);
    //         } catch (error) {
    //             setMessage(error.response?.data?.message || "An error occurred. Please try again.");
    //         }
    //     };

    return (
        <div className="container signinbox">
            <section className="bg-gray-50 dark:bg-gray-900 siginsection">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 sectonexdiv">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img
                            className="w-8 h-8 mr-2"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                            alt="logo"
                        />
                        DCRUST Boys Hostel
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <div
                                className={`${alertDisplay} alert alert-${alertState}`}
                                id="loginalert"
                                style={{ outline: 'none', border: 'none', borderRadius: '10px' }}
                                role="alert"
                            >
                                {alertText}
                            </div>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="name@mail.com"
                                        required
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                name="rememberMe"
                                                type="checkbox"
                                                checked={formData.rememberMe}
                                                onChange={handleChange}
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleForgotPassword}
                                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?{' '}
                                    <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Sign up
                                    </Link>
                                </p>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Login to admin <Link to="/adminsignin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Click here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
