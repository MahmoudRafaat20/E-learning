// hooks/useLessonDetails.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';


export const useLessonDetails = (lessonId) => {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState(null);
  
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchLessonDetails = async () => {
      if (!isAuthenticated || !user?.token) {
        setError('Please login first');
        setLoading(false);
        return;
      }

      if (!lessonId) {
        setError('Lesson ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // جلب تفاصيل الدرس
        const response = await axios.get(
          `https://edu-master-psi.vercel.app/lesson/${lessonId}`,
          {
            headers: {
              'token': user.token
            }
          }
        );

        if (response.data.success) {
          const lessonData = response.data.lesson;
          setLesson(lessonData);

          // التحقق من حالة ال enrollment إذا كان الدرس مدفوعاً
          if (lessonData.isPaid) {
            try {
              const enrollmentResponse = await axios.get(
                `https://edu-master-psi.vercel.app/enrollment/check/${lessonId}`,
                {
                  headers: {
                    'token': user.token
                  }
                }
              );
              
              if (enrollmentResponse.data.success) {
                setEnrollmentStatus(enrollmentResponse.data.enrolled);
              }
            } catch (enrollmentError) {
              console.log('Enrollment check failed, assuming not enrolled');
              setEnrollmentStatus(false);
            }
          } else {
            setEnrollmentStatus(true); // الدروس المجانية متاحة دائماً
          }
        } else {
          setError(response.data.message || 'Failed to fetch lesson details');
        }
      } catch (error) {
        console.error('Error fetching lesson details:', error);
        setError(error.response?.data?.message || 'Error fetching lesson details');
      } finally {
        setLoading(false);
      }
    };

    fetchLessonDetails();
  }, [user, isAuthenticated, lessonId]);

  // دالة للاشتراك في الدرس
  const enrollInLesson = async () => {
    if (!lesson?.isPaid) return { success: true }; // الدروس المجانية لا تحتاج enrollment

    try {
      const response = await axios.post(
        `https://edu-master-psi.vercel.app/enrollment/enroll/${lessonId}`,
        {},
        {
          headers: {
            'token': user.token
          }
        }
      );

      if (response.data.success) {
        setEnrollmentStatus(true);
        return { success: true, message: 'Enrollment successful' };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Error enrolling in lesson:', error);
      return { success: false, message: error.response?.data?.message || 'Enrollment failed' };
    }
  };

  return { lesson, loading, error, enrollmentStatus, enrollInLesson };
};