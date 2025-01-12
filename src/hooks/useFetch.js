import { useState, useEffect, useRef } from 'react';
import { get } from '../services/api';

/**
 * @typedef {object} FetchResult
 * @property {any} data - The fetched data, or null if no data has been fetched yet.
 * @property {boolean} loading - Indicates if the data is currently being fetched.
 * @property {object|null} error - An error object if the fetch failed, or null if no error has occurred.
 * @property {string} error.message - The error message.
 * @property {number} error.code - The HTTP status code of the error.
 * @property {string} error.statusText - The HTTP status text of the error.
 */

/**
 * A custom React hook that provides reusable data fetching and caching capabilities.
 *
 * @param {string|null|undefined} url - The URL to fetch data from.
 * @returns {FetchResult} An object containing the fetched data, loading state, and error state.
 */
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use a ref to store the cache. This will persist across renders.
  const cache = useRef({});

  useEffect(() => {
    // Reset error state before each new fetch
    setError(null);
    // Check if the URL is valid.
    if (!url || typeof url !== 'string' || url.trim() === '') {
          console.error("Invalid URL provided to useFetch:", url);
          setError({
            message: "Invalid URL provided",
            code: 400,
            statusText: "Bad Request"
          });
      setLoading(false);
      return;
    }
      // Check if the data is available in the cache
    if (cache.current[url]) {
      console.log(`Returning cached data for URL: ${url}`);
      setData(cache.current[url]);
      setLoading(false);
      return;
    }


    const fetchData = async () => {
        setLoading(true);
        try {
        const result = await get(url);
        setData(result);
        // Set data in cache.
        cache.current[url] = result;
        console.log(`Successfully fetched data from URL: ${url}`);

      } catch (fetchError) {
          console.error(`Error fetching data from URL: ${url}`, fetchError);
          setError(fetchError);
      } finally {
         setLoading(false);
      }
    };

    fetchData();

  }, [url]);


  return { data, loading, error };
};

export default useFetch;