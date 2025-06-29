import { useState, useCallback } from 'react';

export function useApi(apiFunction) {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (params) => {
      setState({ data: null, loading: true, error: null });
      try {
        const data = await apiFunction(params);
        setState({ data, loading: false, error: null });
        return data;
      } catch (error) {
        setState({ data: null, loading: false, error });
        return null;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// For API calls that don't require parameters
export function useApiNoParams(apiFunction) {
  const api = useApi(() => apiFunction());
  const execute = useCallback(async () => {
    return api.execute();
  }, [api]);

  return {
    ...api,
    execute,
  };
}