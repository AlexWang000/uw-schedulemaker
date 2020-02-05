import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import serverURL from '../config';
import { useHistory } from "react-router-dom";

function Login({ setUser, setCoursesTaken, }: props) {
    const [action, setAction] = useState("Log In");
    const [username, setUsername] = useState(null);
    const [usernameInvalid, setUsernameInvalid] = useState(false);
    const [helperText, setHelperText] = useState(null);
    const history = useHistory();

    const onToggleAction = () => {
        if (action === "Log In") {
            setAction("Sign Up");
        } else {
            setAction("Log In");
        }
    }

    const onExecuteAction = () => {
        if (action === "Log In") {
            axios.post(`${serverURL}/user`, {
                action: "login",
                username: username
            })
            .then(res => {
                const newUser = res.data.user;
                if (newUser) {
                    setUser(res.data.user);
                    axios.get(`${serverURL}/coursesTaken`, {params: {username}})
                    .then(res => {
                        console.log(res);
                        setCoursesTaken(res.data.courses);
                        history.push('/');
                    })
                } else {
                    setUsernameInvalid(true);
                    setHelperText("The username does not exist")
                }
            })
            .catch(e => console.log(e))
        } else if (!usernameInvalid) {
            axios.post(`${serverURL}/user`, {
                action: "signup",
                username: username
            })
            .catch(e => console.log(e))
        }
    }

    const onUsernameChange = e => {
        const newUsername = e.target.value;
        setUsername(newUsername)
        setUsernameInvalid(false)
        setHelperText(null)
        if (action === "Sign Up"){
            setUsernameInvalid(newUsername.length > 30)
            setHelperText(newUsername.length > 30 ? "At most 30 characters" : null)
        }
    }

    return (
        <div style={{display: "flex", justifyContent: "center", textAlign: "center", marginTop: "20%"}}>
            <Card style={{width: "500px"}} raised>
                <CardContent style={{display: "flex", flexDirection: "column", alignItems: "center", margin: "30px"}}>
                    <Typography variant="h3" color="textPrimary" style={{marginBottom: "20px"}}>
                        {action}
                    </Typography>
                    <Typography variant="h5" color="textSecondary" style={{marginBottom: "20px"}}>
                        Welcome to UWSchedule
                    </Typography>
                    <TextField id="user-name" label="Username" style={{marginBottom: "30px", width: "100%"}} onChange={onUsernameChange}
                    error={usernameInvalid} helperText={helperText}
                    />
                    {/* <TextField id="password" label="Password" style={{marginBottom: "30px", width: "100%"}}/> */}
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={onExecuteAction}>{action}</Button>
                    </CardActions>
                    <Typography variant="h6" color="textSecondary">
                        <Link onClick={onToggleAction} component="button" variant="h6">
                            or {action === "Log In"? "sign up" : "log in"}
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login;