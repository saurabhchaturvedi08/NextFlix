import { useState, useCallback, useEffect } from 'react';
import { User } from '../types/Movie';
import { mockUser } from '../data/mockData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check localStorage for user session
      const savedUser = localStorage.getItem('nextflix_user');
      if (savedUser) {
        setAuthState({
          user: JSON.parse(savedUser),
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock successful login
    const user = { ...mockUser, email };
    localStorage.setItem('nextflix_user', JSON.stringify(user));
    
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false
    });
    
    return { success: true };
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock successful signup
    const user = { ...mockUser, name, email };
    localStorage.setItem('nextflix_user', JSON.stringify(user));
    
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false
    });
    
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('nextflix_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  }, []);

  const updateUserPreferences = useCallback((preferences: Partial<User['preferences']>) => {
    if (authState.user) {
      const updatedUser = {
        ...authState.user,
        preferences: { ...authState.user.preferences, ...preferences }
      };
      
      localStorage.setItem('nextflix_user', JSON.stringify(updatedUser));
      setAuthState(prev => ({ ...prev, user: updatedUser }));
    }
  }, [authState.user]);

  return {
    ...authState,
    login,
    signup,
    logout,
    updateUserPreferences
  };
};