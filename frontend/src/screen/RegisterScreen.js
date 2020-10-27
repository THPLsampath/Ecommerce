import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../action/useraction';


function SigninScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo) {
            props.history.push("/");
        }
        return () => {
            //
        }
    }, [userInfo])

    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch(register(name, email, password));
    };

    return (
        <div className="from">
            <form onSubmit={handleSubmit}>
                <ul className="from-container">
                    <li>
                        <h2>Create Account</h2>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                    </li>
                    <li>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="repassword">
                            RePassword
                        </label>
                        <input type="rePassword" id="rePassword" name="rePassword" value={rePassword} onChange={(e) => setRePassword(e.target.value)}></input>
                    </li>
                    <li>
                        <button type="submit" className="button primary">Signin</button>
                    </li>
                    <li>
                        Already have an account? <Link to="/signin">Sign-in</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default SigninScreen;
