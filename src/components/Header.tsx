import { signOut } from 'firebase/auth';

// Hooks
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/hooks';

// Components
import {
  EuiAvatar,
  EuiBreadcrumb,
  EuiButton,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderBreadcrumbs,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
  EuiLink,
  EuiPopover,
  EuiPopoverFooter,
  EuiPopoverTitle,
  EuiSelectable,
  EuiSelectableMessage,
  EuiSelectableOption,
  EuiSelectableProps,
  EuiSelectableTemplateSitewide,
  EuiSpacer,
  EuiText,
  EuiTextColor,
  useGeneratedHtmlId,
} from '@elastic/eui';

// Redux actions
import { changeTheme } from '../redux/slices/AuthSlice';

// Utilities
import { firebaseAuth } from '../utils/firebase.config';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [breadcrumbs, setBreadcrumbs] = useState([{ text: 'Dashboard' }]);
  const [isResponsive, setIsResponsive] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 480) {
      setIsResponsive(true);
    }
  }, []);

  // Redux store data
  const { userInfo, isDarkTheme } = useAppSelector((state) => state.authSlice);

  const logout = () => {
    signOut(firebaseAuth);
  };

  const invertTheme = () => {
    const theme = localStorage.getItem('zoom-theme');
    localStorage.setItem('zoom-theme', theme === 'light' ? 'dark' : 'light');
    dispatch(changeTheme({ isDarkTheme: !isDarkTheme }));
  };

  const section = [
    {
      items: [
        <Link to="/">
          <EuiText>
            <h2 style={{ padding: '0 1vw' }}>
              <EuiTextColor color="#0b5cff">Zoom</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
    {
      items: [
        <>
          {userInfo?.name ? (
            <EuiText>
              <h3>
                <EuiTextColor color="white">Hello, </EuiTextColor>
                <EuiTextColor color="#0b5cff">{userInfo?.name}</EuiTextColor>
              </h3>
            </EuiText>
          ) : null}
        </>,
      ],
    },
    {
      items: [
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          direction="row"
          style={{ gap: '2vw' }}
        >
          <EuiFlexItem grow={false} style={{ flexBasis: 'fit-content' }}>
            {isDarkTheme ? (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="sun"
                size="s"
                color="warning"
                aria-label="invert-theme-button"
              />
            ) : (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="moon"
                size="s"
                color="ghost"
                aria-label="invert-theme-button"
              />
            )}
          </EuiFlexItem>

          <EuiFlexItem grow={false} style={{ flexBasis: 'fit-content' }}>
            <EuiButtonIcon
              onClick={logout}
              iconType="lock"
              display="fill"
              size="s"
              aria-label="logout-button"
            />
          </EuiFlexItem>
        </EuiFlexGroup>,
      ],
    },
  ];
  const responsiveSection = [
    {
      items: [
        <Link to="/">
          <EuiText>
            <h2 style={{ padding: '0 1vw' }}>
              <EuiTextColor color="#0b5cff">Zoom</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
  ];

  return (
    <>
      <EuiHeader
        style={{ minHeight: '8vh' }}
        theme="dark"
        sections={isResponsive ? responsiveSection : section}
      />
      <EuiHeader
        style={{ minHeight: '8vh' }}
        sections={[{ breadcrumbs }]}
      ></EuiHeader>
    </>
  );
}

export default Header;
