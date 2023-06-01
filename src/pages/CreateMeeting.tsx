// Hooks
import React from 'react';
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';

// Components
import Header from '../components/Header';
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from '@elastic/eui';

// Assets
import meeting1 from '../assets/meeting1.png';
import meeting2 from '../assets/meeting2.png';

function CreateMeeting() {
  const navigate = useNavigate();

  useAuth();

  return (
    <>
      <div
        style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}
      >
        <Header />
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          style={{ margin: '5vh 10vw' }}
        >
          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage size="100%" alt="icon" src={meeting1} />}
              title={`Create 1 on 1 Meeting`}
              description="Create a personal single person meeting."
              onClick={() => navigate('/create-one-on-one')}
              paddingSize="xl"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage size="100%" alt="icon" src={meeting2} />}
              title={`Create Video Conference`}
              description="Invite multiple persons to the meeting."
              onClick={() => navigate('/video-conference')}
              paddingSize="xl"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </>
  );
}

export default CreateMeeting;
