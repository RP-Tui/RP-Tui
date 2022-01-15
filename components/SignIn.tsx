import { NextPage } from "next";
import Style from "../styles/Login.module.scss";	
import { useEffect, useState } from "react";

import { VscError } from "react-icons/vsc";
import { FaCheck, FaTimes } from "react-icons/fa";


const SignIn: NextPage = () => {


    const [validations, setValidations] = useState([false, false, false, false]);
    const [passwScore, setPasswScore] = useState(0);
    const [showPassword, setShowPassword] = useState(true);

    useEffect(() => {
        
        var score = 0;

        for (const validation of validations) {
            if (validation) {
                score++;
            }
        }

        setPasswScore(score);

    }, [validations]);
    
    
    const evalPassword = (password: string) => {

        if (password.length === 0) {
            setPasswScore(0);
            return;
        }

        const regexes = [
            /^.{8,}$/,
            /^(?=.*[0-9])/,
            /^(?=.*[A-Z])/,
            /^(?=.*[!@#$%^&*])/,
        ]
        
        regexes.forEach((regex, index) => {
            //console.log(index + ": " + regex.test(password));
        
            if(regex.test(password)) {


                setValidations(prev => {
                    const newIsValid = [...prev];
                    newIsValid[index] = true;
                    return newIsValid;
                })
            }

        })
    }

    const chagnePassVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <>
            <div className={Style.login_container}>
                <form className={Style.login_form}>

                    <div className={Style.login_title}>
                        Sign In
                    </div>

                    <br/>

                    <div className={Style.field}>
                        <input type="email" name="email" id="email" className={Style.input} placeholder=" "/>
                        <label htmlFor="email" className={Style.label}>Email</label>
                    </div>

                    <div className={Style.field}>
                        <input type="password" name="email" id="email" className={Style.input} placeholder=" " onChange={(e) => evalPassword(e.target.value)}/>
                        <label htmlFor="password" className={Style.label}>Password</label>
                    </div>
                    
                    <div className={Style.password_strength}>

                        <span className={`${Style.bar} ${Style.bar_1} ${passwScore > 0 ? `${Style.bar_show}` : ""}`}></span>
                        <span className={`${Style.bar} ${Style.bar_2} ${passwScore > 1 ? `${Style.bar_show}` : ""}`}></span>
                        <span className={`${Style.bar} ${Style.bar_3} ${passwScore > 2 ? `${Style.bar_show}` : ""}`}></span>
                        <span className={`${Style.bar} ${Style.bar_4} ${passwScore > 3 ? `${Style.bar_show}` : ""}`}></span>

                    </div>

                    <ul className={Style.list}>
                        <li> { validations[0] ? <FaCheck/> : <FaTimes/> } must be at least 5 characters </li>
                        <li> { validations[1] ? <FaCheck/> : <FaTimes/> } must contain a capital letter</li>
                        <li> { validations[2] ? <FaCheck/> : <FaTimes/> } must contain a number</li>
                        <li> { validations[3] ? <FaCheck/> : <FaTimes/> } must contain one of $&+,:;=?@#</li>
                    </ul>

                </form>
            </div>

        </>
    );

}

export default SignIn;