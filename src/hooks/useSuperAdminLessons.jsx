// hooks/useSuperAdminLessons.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

export  const useSuperAdminLessons = (filters = {}) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { user, isAuthenticated, role } = useAuth();

  useEffect(() => {
    const fetchSuperAdminLessons = async () => {
      console.log('🔐 SuperAdmin Auth Check:', { role, isSuperAdmin: role === 'superadmin' });

      // التحقق من أن المستخدم سوبر أدمن فقط
      if (!isAuthenticated || !user?.token || role !== 'superadmin') {
        setError('Access denied. Super Admin privileges required.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        Object.keys(filters).forEach(key => {
          if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
            params.append(key, filters[key]);
          }
        });

        console.log('👑 SuperAdmin API Request');
        
        const response = await axios.get(
          `https://edu-master-psi.vercel.app/lesson/?${params.toString()}`,
          {
            headers: {
              'token': user.token,
              'X-User-Role': 'superadmin'
            }
          }
        );

        console.log('📨 SuperAdmin API Response:', response.data);

        if (response.data.success) {
          setLessons(response.data.data || []);
        } else {
          setError(response.data.message || 'Failed to fetch lessons');
        }
      } catch (error) {
        console.error('💥 SuperAdmin API Error:', error);
        setError(error.response?.data?.message || 'Error fetching lessons');
      } finally {
        setLoading(false);
      }
    };

    fetchSuperAdminLessons();
  }, [user, isAuthenticated, role, JSON.stringify(filters)]);

  return { lessons, loading, error };
};