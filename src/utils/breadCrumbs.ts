import { NavigateFunction } from 'react-router-dom';

export const getCreateMeetingBreadcrumbs = (navigate: NavigateFunction) => [
  {
    text: 'Dashboad',
    href: '#',
    onClick: () => {
      navigate('/');
    },
  },
  { text: 'Create Meeting' },
];
