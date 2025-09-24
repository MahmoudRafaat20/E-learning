// hooks/useAdminLessons.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';


export const useAdminLessons = (filters = {}) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  
  const { user, isAuthenticated, role } = useAuth();

  useEffect(() => {
    const fetchAdminLessons = async () => {
      // التحقق من أن المستخدم admin
     if (!isAuthenticated || !user?.token || (role !== 'admin' && role !== 'superadmin')) {
       
        setError('Access denied. Admin privileges required.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // بناء params من الفلاتر
        const params = new URLSearchParams();

        // إضافة الفلاتر الإضافية
        Object.keys(filters).forEach(key => {
          if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
            params.append(key, filters[key]);
          }
        });

        console.log('Admin API Request URL:', `https://edu-master-psi.vercel.app/lesson/?${params.toString()}`);

        const response = await axios.get(
          `https://edu-master-psi.vercel.app/lesson/?${params.toString()}`,
          {
            headers: {
              'token': user.token
            }
          }
        );

        console.log('Admin Lessons Response:', response.data);

        if (response.data.success) {
          setLessons(response.data.data || []);
          setPagination(response.data.pagination || {});
        } else {
          setError(response.data.message || 'Failed to fetch admin lessons');
        }
      } catch (error) {
        console.error('Error fetching admin lessons:', error);
        const errorMessage = error.response?.data?.message || 
                            error.response?.data?.error || 
                            'Error fetching admin lessons';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminLessons();
  }, [user, isAuthenticated, role, JSON.stringify(filters)]);

  const refetch = async (newFilters = {}) => {
    if (!isAuthenticated || !user?.token || (role !== 'admin' && role !== 'superadmin')) {
      setError('Access denied. Admin privileges required.');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      
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
      setError(error.response?.data?.message || 'Error refetching admin lessons');
    } finally {
      setLoading(false);
    }
  };

  // دالة لحذف درس
  const deleteLesson = async (lessonId) => {
    if (!isAuthenticated || !user?.token || (role !== 'admin' && role !== 'superadmin')) {
      throw new Error('Access denied. Admin privileges required.');
    }

    try {
      const response = await axios.delete(
        `https://edu-master-psi.vercel.app/lesson/${lessonId}`,
        {
          headers: {
            'token': user.token
          }
        }
      );

      if (response.data.success) {
        // إزالة الدرس المحذوف من ال state
        setLessons(prevLessons => prevLessons.filter(lesson => lesson._id !== lessonId));
        return { success: true, message: 'Lesson deleted successfully' };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Error deleting lesson:', error);
      return { success: false, message: error.response?.data?.message || 'Error deleting lesson' };
    }
  };

 // تعديل الدرس  updateLesson
 const updateLesson = async (lessonId, updatedData) => {
  try {
    console.log('Updating lesson:', lessonId, 'with data:', updatedData);

    // إرسال البيانات المسموحة فقط (title و price)
    const allowedData = {
      title: updatedData.title,
      price: updatedData.price || 0 
    };

    const response = await axios.put(
      `https://edu-master-psi.vercel.app/lesson/${lessonId}`,
      allowedData,
      {
        headers: {
          'token': user.token,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Update response:', response.data);

    if (response.data.success) {
     
      setLessons(prevLessons => 
        prevLessons.map(lesson => 
          lesson._id === lessonId ? { ...lesson, ...response.data.lesson } : lesson
        )
      );
      
      return { 
        success: true, 
        message: 'Lesson updated successfully', 
        lesson: response.data.lesson 
      };
    } else {
      return { success: false, message: response.data.message || 'Update failed' };
    }
  } catch (error) {
    console.error('Error updating lesson:', error);
    const errorMessage = error.response?.data?.message || 
                        'Error updating lesson';
    return { success: false, message: errorMessage };
  }
};
  return { 
    lessons, 
    loading, 
    error, 
    pagination, 
    refetch, 
    deleteLesson, 
    updateLesson,
    isAdmin: role === 'admin' || role === 'superadmin'
  };
};