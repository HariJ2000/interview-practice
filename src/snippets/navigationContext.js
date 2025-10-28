// NavigationContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const location = useLocation();
  const [pathStack, setPathStack] = useState([]);
  useEffect(() => {
    setPathStack((prev) => {
      // to avoid duplicate paths
      if (prev[prev.length - 1] !== location.pathname) {
        return [...prev, location.pathname];
      }
      return prev;
    });
  }, [location]);
  // to persist path history across session or reloads
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('pathStack') || '[]');
    setPathStack(stored);
  }, []);
  useEffect(() => {
    localStorage.setItem('pathStack', JSON.stringify(pathStack));
  }, [pathStack]);
  {/**
    here setPathStack is a setstate which is most stable fn, so it is fine to
    pass in context provider but if you are passing something else it is better
    to wrap it with useMemo and pass for optimisation
  */}
  return (
    <NavigationContext.Provider value={{ pathStack, setPathStack }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationHistory() {
  return useContext(NavigationContext);
}

// index.js
<BrowserRouter>
  <NavigationProvider>
    <App />
  </NavigationProvider>
</BrowserRouter>

// BackButton.js
import { useNavigate } from 'react-router-dom';
import { useNavigationHistory } from './NavigationContext';

function BackButton() {
  const navigate = useNavigate();
  const { setPathStack } = useNavigationHistory();

  const handleBack = () => {
    setPathStack((prev) => {
      const updatedStack = [...prev];
      updatedStack.pop(); // remove current path
      const previousPath = updatedStack[updatedStack.length - 1];
      if (previousPath) navigate(previousPath);
      else navigate('/'); // fallback
      return updatedStack;
    });
  };

  return <button onClick={handleBack}>Back</button>;
}
