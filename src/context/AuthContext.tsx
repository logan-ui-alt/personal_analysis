import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase.ts';

interface AuthContextType {
  user: User | null;
  idToken: string | null;
  guestUid: string;
  isGuest: boolean;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  getAuthHeaders: () => Record<string, string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [guestUid] = useState<string>(() => {
    const saved = localStorage.getItem('omnilife_guest_uid');
    if (saved) return saved;
    const generated = 'guest_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem('omnilife_guest_uid', generated);
    return generated;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          setIdToken(token);
          // Sync with PostgreSQL
          await fetch('/api/user/sync', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (e) {
          console.error('Failed to get token or sync user:', e);
        }
      } else {
        setIdToken(null);
        // Sync guest user with PostgreSQL
        try {
          await fetch('/api/user/sync', {
            headers: {
              'x-guest-uid': guestUid,
            },
          });
        } catch (e) {
          console.error('Failed to sync guest:', e);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [guestUid]);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (err: any) {
      console.error('Google Sign-in failed:', err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIdToken(null);
    } catch (err: any) {
      console.error('Sign-out failed:', err);
    }
  };

  const getAuthHeaders = (): Record<string, string> => {
    if (idToken) {
      return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      };
    }
    return {
      'Content-Type': 'application/json',
      'x-guest-uid': guestUid,
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        idToken,
        guestUid,
        isGuest: !user,
        loading,
        loginWithGoogle,
        logout,
        getAuthHeaders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
