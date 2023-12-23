import { useState } from 'react';
import { useFormik } from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export function Login() {
    const navigate = useNavigate();
    const [formstate, setformstate] = useState("success");
    // const history = useHistory()
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        // validationSchema: formValidationSchema,
        onSubmit: async (values) => {
            console.log("submit")
            const data = await fetch("https://order-app-backend-liard.vercel.app/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(values)
            });
            if (data.status === 400) {
                console.log("error");
                setformstate("error");
            } else {
                setformstate("success");
                const result = await data.json();
                console.log("success", result);
                localStorage.setItem("token", result.token);
                // history.push("/dashboard");
                navigate("/dashboard");
            }

        }
    });
    return (
        <div className="login-card">

            <Card sx={{ mx: 2, height: 300 }} className="card">
                <CardContent>
                    <form onSubmit={formik.handleSubmit} className='loginform'>
                        <h2>LOGIN</h2>
                        <div className='loginfield'>
                            <TextField
                                name='username'
                                type="email"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                label="Email"
                                variant="outlined" />
                            <TextField
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                label="Password"
                                name="password"
                                type="password"
                                variant="outlined" />
                            <label className="alreadyuser" onClick={() => navigate("/forget-password")} >
                                Forget Password ?
                            </label>
                            <CardActions className="btn">
                                <Button color={formstate} type='submit' variant="contained">{formstate === "success" ? "submit" : "retry"}</Button>
                                <label className="alreadyuser" onClick={() => navigate("/")}>New user</label>

                            </CardActions>

                        </div>

                    </form>
                </CardContent>
            </Card>
        </div >
    );
}


export function Signin() {
    const navigate = useNavigate()
    const [formstate, setformstate] = useState("success")

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            username: '',
            password: '',
            phoneNo: ''
        },
        // validationSchema: formValidationSchema,
        onSubmit: (newdata) => {
            // console.log(values)
            adddata(newdata)
        }
    });

    const adddata = (newdata) => {
        console.log(newdata)

        fetch("https://order-app-backend-liard.vercel.app/signup", {
            method: "POST",
            body: JSON.stringify(newdata),
            headers: {
                "content-type": "application/json"
            }
        })
        navigate("/login")
    };
    return (
        <div className="login-card">
            <Card sx={{ mx: 2, height: 400 }} className="card">
                <form onSubmit={formik.handleSubmit} className='loginform'>
                    <h2>SIGNUP</h2>
                    <div className='loginfield'>
                        <div className="login-flexend">
                            <div className="login-text">
                                <label>First Name : </label>
                                <TextField
                                    placeholder="firstname"
                                    name='firstname'
                                    value={formik.values.firstname}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    label="Firstname"
                                    variant="outlined" required />
                            </div>
                            <div className="login-text">
                                <label>Last Name : </label>
                                <TextField
                                    placeholder="lastname"
                                    name='lastname'
                                    value={formik.values.lastname}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    label="Lastname"
                                    variant="outlined" required />
                            </div>
                            <div className="login-text">
                                <label> Email : </label>
                                <TextField
                                    type="email"
                                    placeholder="username"
                                    name='username'
                                    value={formik.values.username}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    label="Email"
                                    variant="outlined" required />
                            </div>
                            <div className="login-text">
                                <label>Password : </label>
                                <TextField
                                    placeholder="password"
                                    value={formik.values.password}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    label="Password"
                                    name="password"
                                    type="password"
                                    variant="outlined" required />
                            </div>
                            <div className="login-text">
                                <label>Phone Number : </label>
                                <TextField
                                    placeholder="phoneNo"
                                    value={formik.values.phoneNo}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    label="Phone Number"
                                    name="phoneNo"
                                    type="text"
                                    variant="outlined" required />
                            </div>
                        </div>

                        <Button color="success" type='submit' variant="contained">submit</Button>
                        <p className="alreadyuser" onClick={() => navigate("/login")} sx={{ fontSize: 7 }}>
                            Already registered user
                        </p>
                    </div>

                </form>
            </Card>
        </div>

    );
}
