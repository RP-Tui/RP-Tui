import { NextPage } from "next";
import Style from "../styles/Login.module.scss";	
import { useEffect, useState } from "react";

import { VscError } from "react-icons/vsc";
import { FaCheck, FaTimes, FaEye,  FaEyeSlash} from "react-icons/fa";
import Head from "next/head";


const SignIn: NextPage = () => {


    const [validations, setValidations] = useState([false, false, false, false]);
    const [passwScore, setPasswScore] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [isMailValid, setIsMailValid] = useState(false);

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    useEffect(() => {

        // Create a regex email validation
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (emailRegex.test(email)) {
            setIsMailValid(true);
        } else { setIsMailValid(false); }

    }, [email]);

    useEffect(() => {
        
        var score = 0;

        for (const validation of validations) {
            if (validation) {
                score++;
            }
        }

        setPasswScore(score);

    }, [validations]);
    
    const handleEmailChange = (email: string) => {
        setEmail(email);
    }

    const handlePasswordChange = (password: string) => {
        setPassword(password);
    }

    const handleAuth = (e: any) => {

        e.preventDefault()

    }

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
        
            if(regex.test(password)) {


                setValidations(prev => {
                    const newIsValid = [...prev];
                    newIsValid[index] = true;
                    return newIsValid;
                })
            }

        })
    }


    return (
        <>

        <Head>
            <title>RP-Tui : Login</title>
        </Head>


            <div className={Style.login_container}>
                <form className={Style.login_form}>

                    <div className={Style.login_title}>
                        Sign In
                    </div>

                    <br/>

                    <div className={Style.field}>
                        <input type="email" name="email" id="email" className={Style.input} placeholder="Email" onChange={(e) => handleEmailChange(e.target.value)}/>
                        <span className={Style.password}>
                        { isMailValid ? <FaCheck className={Style.green}/> : <FaTimes className={Style.red} />  }
                       </span>
                    </div>  

                    <div className={Style.field}>
                        <input type={showPassword ? "text" : "password"} name="password" id="password" className={Style.input} placeholder="Password" onChange={(e) => {evalPassword(e.target.value); handlePasswordChange(e.target.value)}} />
                        <span className={Style.password}
                        onMouseEnter={() => setShowPassword(true)}
                        onMouseLeave={() => setShowPassword(false)}
                        >
                        { showPassword ? <FaEyeSlash/> : <FaEye/>  }
                       </span>
                    </div>
                    
                    <div className={Style.password_strength}>

                        <span className={`${Style.bar} ${Style.bar_1} ${passwScore > 0 ? `${Style.bar_show}` : ""}`}></span>
                        <span className={`${Style.bar} ${Style.bar_2} ${passwScore > 1 ? `${Style.bar_show}` : ""}`}></span>
                        <span className={`${Style.bar} ${Style.bar_3} ${passwScore > 2 ? `${Style.bar_show}` : ""}`}></span>
                        <span className={`${Style.bar} ${Style.bar_4} ${passwScore > 3 ? `${Style.bar_show}` : ""}`}></span>

                    </div>
                    <div className={Style.list_container}>
                        <ul className={Style.list}>
                            <li> { validations[0] ? <FaCheck/> : <FaTimes/> } must be at least 5 characters </li>
                            <li> { validations[1] ? <FaCheck/> : <FaTimes/> } must contain a capital letter</li>
                            <li> { validations[2] ? <FaCheck/> : <FaTimes/> } must contain a number</li>
                            <li> { validations[3] ? <FaCheck/> : <FaTimes/> } must contain one of $&+,:;=?@#</li>
                        </ul>
                    </div>
                    <div>
                        <button className={Style.submit_btn} onClick={(e) => handleAuth(e)}>Submit</button>
                    </div>
                </form>
            </div>
        </>
    );

}

export default SignIn;