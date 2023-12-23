import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';

export function VerifyEmail() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [message, setMessage] = useState('');

    const handleVerifyEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://order-app-backend-liard.vercel.app/verifyEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, phoneNo }),
            });
            const data = await response.json();
            setMessage(data.message);
            setTimeout(() => {
                navigate("/dashboard");
            }, 3000);
        } catch (error) {
            console.log(error);
            setMessage(data.message);
        }
    };


    return (
        <div className="login-card">
            <Card sx={{ mx: 2, height: 400 }} className="card">
                <form onSubmit={handleVerifyEmail} className="loginfield">
                    <h2><label>To conform your order please verify your email </label></h2>
                    <TextField type="text" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <TextField type="text" label="Phone No" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required />

                    <Button type="submit">Conform Order</Button>
                </form>
                {message && <p>{message}</p>}
            </Card>
        </div>
    );
}