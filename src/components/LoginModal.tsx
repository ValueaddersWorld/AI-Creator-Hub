import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { Mail, Lock, User, ArrowRight, X, AlertCircle } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setError('');
    setSuccessMessage('');
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } catch (error) {
      setError('Failed to sign in with Google. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isForgotPassword) {
        await sendPasswordResetEmail(auth, email);
        setSuccessMessage('Password reset email sent. Please check your inbox.');
        setTimeout(() => {
          setIsForgotPassword(false);
          setSuccessMessage('');
        }, 3000);
      } else if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        onClose();
      } else {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
          onClose();
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            {isForgotPassword ? 'Reset Password' : isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
              <AlertCircle size={20} className="mr-2" />
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && !isForgotPassword && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your name"
                    required={!isLogin && !isForgotPassword}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {!isForgotPassword && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your password"
                    required={!isForgotPassword}
                  />
                </div>
              </div>
            )}

            {!isLogin && !isForgotPassword && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Confirm your password"
                    required={!isLogin && !isForgotPassword}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  {isForgotPassword ? 'Send Reset Link' : isLogin ? 'Sign In' : 'Sign Up'}
                  <ArrowRight size={20} className="ml-2" />
                </>
              )}
            </button>

            {!isForgotPassword && (
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full bg-white text-gray-700 p-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center mt-4"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                Continue with Google
              </button>
            )}
          </form>

          <div className="mt-6 text-center text-sm">
            {isForgotPassword ? (
              <button
                onClick={() => {
                  setIsForgotPassword(false);
                  resetForm();
                }}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Back to Sign In
              </button>
            ) : (
              <>
                {isLogin ? (
                  <>
                    <button
                      onClick={() => setIsForgotPassword(true)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Forgot Password?
                    </button>
                    <div className="mt-2">
                      Don't have an account?{' '}
                      <button
                        onClick={() => {
                          setIsLogin(false);
                          resetForm();
                        }}
                        className="text-indigo-600 hover:text-indigo-800 font-semibold"
                      >
                        Sign Up
                      </button>
                    </div>
                  </>
                ) : (
                  <div>
                    Already have an account?{' '}
                    <button
                      onClick={() => {
                        setIsLogin(true);
                        resetForm();
                      }}
                      className="text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;