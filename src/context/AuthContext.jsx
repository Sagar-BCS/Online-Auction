import { createContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { authApp, firestoreApp } from '../config/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalMsg, setGlobalMsg] = useState('');

  const register = (email, password) => {
    return createUserWithEmailAndPassword(authApp, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(authApp, email, password);
  };

  const logout = () => {
    return signOut(authApp);
  };
  
  const bidAuction = async (auctionId, newPrice) => {
    if (!currentUser) {
      return setGlobalMsg('Please login first');
    }

    const auctionRef = doc(firestoreApp, 'auctions', auctionId);

    try {
      await updateDoc(auctionRef, {
        curPrice: newPrice,
        curWinner: currentUser.email,
      });
    } catch (error) {
      console.error("Error bidding: ", error);
      setGlobalMsg('Failed to place bid');
    }
  };

  const endAuction = async (auctionId) => {
    const auctionRef = doc(firestoreApp, 'auctions', auctionId);
    try {
      await deleteDoc(auctionRef);
    } catch (error) {
      console.error("Error ending auction: ", error);
    }
  };

  const updateAuctionImage = async (auctionId, newImgUrl) => {
    const auctionRef = doc(firestoreApp, 'auctions', auctionId);
    try {
      await updateDoc(auctionRef, {
        imgUrl: newImgUrl,
      });
    } catch (error) {
      console.error("Error updating image: ", error);
      setGlobalMsg('Failed to update image');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authApp, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (globalMsg) {
      const interval = setTimeout(() => setGlobalMsg(''), 5000);
      return () => clearTimeout(interval);
    }
  }, [globalMsg]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
        bidAuction,
        endAuction,
        updateAuctionImage,
        globalMsg,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
