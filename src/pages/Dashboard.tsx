// Hooks
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';

// Components
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from '@elastic/eui';
import Header from '../components/Header';

// Assets
import dashboard1 from '../assets/dashboard1.png';
import dashboard2 from '../assets/dashboard2.png';
import dashboard3 from '../assets/dashboard3.png';

const Dashboard = () => {
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
          style={{ margin: '5vh 10vh' }}
        >
          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage size="5rem" alt="icon" src={dashboard1} />}
              title={`Create Meeting`}
              description="Create a new meeting and invite people."
              onClick={() => navigate('/create-meeting')}
              paddingSize="xl"
            />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage size="100%" alt="icon" src={dashboard2} />}
              title={`My Meetings`}
              description="View all created meetings."
              onClick={() => navigate('/my-meetings')}
              paddingSize="xl"
            />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage size="5rem" alt="icon" src={dashboard3} />}
              title={`Meetings`}
              description="View the meetings that you are invited to."
              onClick={() => navigate('/invited-meetings')}
              paddingSize="xl"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </>
  );
};

export default Dashboard;
