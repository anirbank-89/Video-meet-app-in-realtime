// Hooks
import React, { useState, useEffect, Suspense } from 'react';

// Components
import { EuiThemeColorMode } from '@elastic/eui';

// Loads
const LightTheme = React.lazy(() => import('./Themes/LightTheme'));
const DarkTheme = React.lazy(() => import('./Themes/DarkTheme'));

function ThemeSelector({ children }: { children: React.ReactNode }) {
  const [theme, settheme] = useState<EuiThemeColorMode>('light');

  useEffect(() => {
    const currentTheme = localStorage.getItem('zoom-theme');

    if (currentTheme) {
      settheme(currentTheme as EuiThemeColorMode);
    }
  }, []);

  return (
    <>
      <Suspense fallback={<></>}>
        {theme === 'dark' ? <DarkTheme /> : <LightTheme />}
      </Suspense>
      {children}
    </>
  );
}

export default ThemeSelector;
