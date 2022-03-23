import React from 'react';
import "../Login.css";

function Register(){
    return(
        <div>
            <p>You can register down below or if you already have an account <button >sign in</button></p>
            <p>Register</p>
        </div>
            
        )
}

function SignIn(){
    return(
        <div>
            <p>You can sign in below or <button onClick={()=>{changeReg(false)}}>Register</button> a new account</p>
            <form method='post' action='*'>
                <input type={"text"} name="email" placeholder='E-Mail'></input>
                <input type={"password"} name="password" placeholder='********'></input>
            </form>
        </div>
        
    )
}

function changeReg(curr){
    
    //return this.setState({register: curr})
    console.log(curr)
}

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            register:this.props.register
        }
    }
    render(){
        return(
            <div>
                <h3>Welcome</h3>
                {this.props.register ? Register() : SignIn()}
                <button>Google</button>
            </div>
        )
    }
}

export default Login