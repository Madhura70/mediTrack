import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { Mail, Lock, User, CheckCircle2 } from 'lucide-react';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await signup(name, email, password);
        setIsLoading(false);
        navigate('/dashboard'); // Go to dashboard, might normally go to specific onboarding setup
    };

    return (
        <div className="min-h-screen bg-white p-6 flex flex-col justify-center max-w-md mx-auto">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-dark mb-2">Create Account</h1>
                <p className="text-gray-500">Join MediTrack to manage your health</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Full Name"
                    type="text"
                    placeholder="Aditya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    icon={<User className="w-5 h-5" />}
                />

                <Input
                    label="Email Address"
                    type="email"
                    placeholder="hello@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    icon={<Mail className="w-5 h-5" />}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    icon={<Lock className="w-5 h-5" />}
                />

                <Button type="submit" className="w-full" isLoading={isLoading}>
                    Sign Up
                </Button>
            </form>

            <p className="mt-10 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-primary hover:underline">
                    Sign In
                </Link>
            </p>
        </div>
    );
}
