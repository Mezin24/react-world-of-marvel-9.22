import { useCallback, useState } from 'react';

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getResourse = useCallback(
    async (
      url,
      method = 'GET',
      body = null,
      headers = { 'Content-Type': 'application/json' }
    ) => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          method,
          body,
          headers,
        });

        if (!res.ok) {
          throw new Error(`Could't fetch data from ${url}`);
        }

        const data = res.json();
        return data;
      } catch (err) {
        setLoading(false);
        setError(err.message);
        return err;
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    getResourse,
    clearError,
  };
};

export default useHttp;
