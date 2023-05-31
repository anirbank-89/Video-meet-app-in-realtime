import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

/** ---------- Utilities ---------- */
import { firebaseAuth } from '../utils/firebase.config';
/** ------------------------------- */

/** -------- Redux actions -------- */
import { setUser } from '../redux/slices/AuthSlice';
/** ------------------------------- */

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      // console.log('useAuth() hook get user info', currentUser);

      if (!currentUser) {
        navigate('/login');
      } else {
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName,
          })
        );
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);
};

export default useAuth;
