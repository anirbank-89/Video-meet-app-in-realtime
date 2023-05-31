import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { addDoc, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Utilities
import { firebaseAuth, userRef } from '../utils/firebase.config';

// Redux actions
import { setUser } from '../redux/slices/AuthSlice';

// Components
import {
  EuiProvider,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiSpacer,
  EuiText,
  EuiTextColor,
  EuiButton,
  EuiPanel,
} from '@elastic/eui';

// Assets
import animation from '../assets/animation.gif';
import logo from '../assets/logo.png';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      navigate('/');
    }
  });

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName, email, uid },
    } = await signInWithPopup(firebaseAuth, provider);

    if (email) {
      const firestoreQuery = query(userRef, where('uid', '==', uid));
      const fetchedUsers = await getDocs(firestoreQuery);
      // console.log('fetchedUsers', fetchedUsers);
      if (fetchedUsers.docs.length == 0) {
        await addDoc(userRef, {
          uid,
          name: displayName,
          email,
        });
      }
    }
    dispatch(setUser({ uid, email, name: displayName }));
    navigate('/');
  };

  return (
    <EuiProvider colorMode="dark">
      <EuiFlexGroup
        alignItems="center"
        justifyContent="center"
        style={{ width: '100vw', height: '100vh' }}
      >
        <EuiFlexItem grow={false}>
          <EuiPanel>
            <EuiFlexGroup justifyContent="center" alignItems="center">
              <EuiFlexItem>
                <EuiImage src={animation} alt="logo" />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiImage src={logo} alt="logo" size="230px" />
                <EuiSpacer size="xs" />
                <EuiText textAlign="center" grow={false}>
                  <h3>
                    <EuiTextColor>One Platform To</EuiTextColor>
                    <EuiTextColor color="#0b5cff"> Connect</EuiTextColor>
                  </h3>
                </EuiText>
                <EuiSpacer size="l" />
                <EuiButton fill onClick={handleLogin}>
                  Login with Google
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiProvider>
  );
};

export default Login;
