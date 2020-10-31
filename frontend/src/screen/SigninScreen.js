import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../action/useraction';

import { set } from '../animationStyle/login';


function SigninScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
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
        dispatch(signin(email, password));
    };



    return (
        <div className="from">
            <form onSubmit={handleSubmit}>
                <ul className="from-container">
                    <li>
                        <h2>Sign-in</h2>
                    </li>
                    <li>
                        {loading &&
                            <div>
                                <div style={set.set1}></div>
                                <div style={set.set2}></div>
                                <div style={set.set3}></div>
                                <div style={set.set4}></div>
                            </div>}
                        {error && <div>{error}</div>}
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
                        <button type="submit" className="button primary">Signin</button>
                    </li>
                    <li>
                        <h3>New to amazona?</h3>
                    </li>
                    <li>
                        <Link to="/register" className="button secondary text-center">Create your amazona account</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default SigninScreen;
