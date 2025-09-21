import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';


export const useGetLessons = (filters = {}) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  
  const { user, isAuthenticated, classLevel, fetchUserProfile } = useAuth();

  useEffect(() => {
    const fetchLessons = async () => {
      if (!isAuthenticated || !user?.token) {
        setError('Please login first');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();

        // Always add classLevel to filters if available
        let currentClassLevel = classLevel;
        
        if (!currentClassLevel) {
          const profile = await fetchUserProfile();
          if (profile && profile.classLevel) {
            currentClassLevel = profile.classLevel;
          }
        }

        if (currentClassLevel) {
          params.append('classLevel', currentClassLevel);
          console.log('Adding classLevel filter:', currentClassLevel);
        }

        // Add other filters
        Object.keys(filters).forEach(key => {
          if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
            params.append(key, filters[key]);
          }
        });

        console.log('API Request URL:', `https://edu-master-psi.vercel.app/lesson/?${params.toString()}`);

        const response = await axios.get(
          `https://edu-master-psi.vercel.app/lesson/?${params.toString()}`,
          {
            headers: {
              'token': user.token
            }
          }
        );

        console.log('API Response:', response.data);

        if (response.data.success) {
          setLessons(response.data.data || []);
          setPagination(response.data.pagination || {});
        } else {
          setError(response.data.message || 'Failed to fetch lessons');
        }
      } catch (error) {
        console.error('Error fetching lessons:', error);
        const errorMessage = error.response?.data?.message || 
                            error.response?.data?.error || 
                            'Error fetching lessons';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [user, isAuthenticated, classLevel, JSON.stringify(filters)]);

  const refetch = async (newFilters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      
      if (classLevel) {
        params.append('classLevel', classLevel);
      }
      
      const allFilters = { ...filters, ...newFilters };
      
      Object.keys(allFilters).forEach(key => {
        if (allFilters[key] !== undefined && allFilters[key] !== null && allFilters[key] !== '') {
          params.append(key, allFilters[key]);
        }
      });

      const response = await axios.get(
        `https://edu-master-psi.vercel.app/lesson/?${params.toString()}`,
        {
          headers: {
            'token': user.token
          }
        }
      );

      if (response.data.success) {
        setLessons(response.data.data || []);
        setPagination(response.data.pagination || {});
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error refetching lessons');
    } finally {
      setLoading(false);
    }
  };

  return { lessons, loading, error, pagination, refetch };
};