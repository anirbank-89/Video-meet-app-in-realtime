import '@elastic/eui/dist/eui_theme_dark.css';
import '@elastic/eui/dist/eui_theme_dark.css';

// Hooks
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';

// Components
import { EuiProvider, EuiThemeColorMode, EuiThemeProvider } from '@elastic/eui';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ThemeSelector from './components/ThemeSelector';
import CreateMeeting from './pages/CreateMeeting';

function App() {
  const dispatch = useAppDispatch();
  const [theme, setTheme] = useState<EuiThemeColorMode>('light');
  const [isIntialTheme, setisIntialTheme] = useState(true);

  // Redux stores
  const { isDarkTheme } = useAppSelector((state) => state.authSlice);

  // Component did mount
  useEffect(() => {
    const theme = localStorage.getItem('zoom-theme');

    if (theme) {
      setTheme(theme as EuiThemeColorMode);
    } else {
      localStorage.setItem('zoom-theme', 'light');
    }
  }, []);

  // Component did update
  useEffect(() => {
    if (isIntialTheme === true) {
      setisIntialTheme(false);
    } else {
      window.location.reload();
    }
  }, [isDarkTheme]);

  const overrides = {
    colors: {
      LIGHT: { primary: '#0b5cff' },
      DARK: { primary: '#0b5cff' },
    },
  };
  return (
    <ThemeSelector>
      <EuiProvider colorMode={theme}>
        <EuiThemeProvider modify={overrides}>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="*" element={<Navigate to="/" />}></Route>
              <Route path="/create-meeting" element={<CreateMeeting />}></Route>
            </Routes>
          </div>
        </EuiThemeProvider>
      </EuiProvider>
    </ThemeSelector>
  );
}

export default App;
