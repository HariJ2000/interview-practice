// hooks/useNavigationStack.js
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useNavigationStack() {
  const location = useLocation();
  const navigate = useNavigate();
  const [stack, setStack] = useState([]);

  // Push new path if it's not a duplicate
  useEffect(() => {
    setStack((prev) => {
      if (prev[prev.length - 1] !== location.pathname) {
        return [...prev, location.pathname];
      }
      return prev;
    });
  }, [location]);

  // Go back to previous path and update stack
  const goBack = () => {
    setStack((prev) => {
      const updated = [...prev];
      updated.pop(); // remove current path
      const previous = updated[updated.length - 1];
      if (previous) navigate(previous);
      else navigate('/'); // fallback
      return updated;
    });
  };

  const clearStack = () => setStack([]);

  return {
    stack,
    current: location.pathname,
    previous: stack[stack.length - 2] || null,
    goBack,
    clearStack,
    setStack, // exposed for advanced control
  };
}


import { useNavigationStack } from './hooks/useNavigationStack';

function BackButton() {
  const { goBack, previous } = useNavigationStack();

  return (
    <button onClick={goBack} disabled={!previous}>
      ← Back
    </button>
  );
}
