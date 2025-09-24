// components/LessonEditModal.js
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const LessonEditModal = ({ lesson, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lesson) {
      setFormData({
        title: lesson.title || '',
        price: lesson.price || 0
      });
    }
  }, [lesson]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }

    setLoading(true);

    try {
      // تنظيف البيانات قبل الإرسال
      const cleanedData = {
        title: formData.title.trim(),
        price: parseFloat(formData.price) || 0
      };

      console.log('Submitting data:', cleanedData);

      await onUpdate(lesson._id, cleanedData);
      toast.success('Lesson updated successfully!');
      onClose();
    } catch (error) {
      toast.error(`Error updating lesson: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen || !lesson) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Edit Lesson</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600"
            disabled={loading}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
                placeholder="Enter lesson title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={loading}
                placeholder="0.00"
              />
            </div>

            {/* معلومات للقراءة فقط */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">Lesson Information (Read-only)</h3>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Description:</span>
                  <span className="text-gray-900 text-right">{lesson.description || 'No description'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Class Level:</span>
                  <span className="text-gray-900">{lesson.classLevel || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="text-gray-900">{lesson.duration || 'N/A'} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    lesson.isPaid ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {lesson.isPaid ? 'Paid' : 'Free'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Scheduled:</span>
                  <span className="text-gray-900">
                    {lesson.scheduledDate 
                      ? new Date(lesson.scheduledDate).toLocaleDateString() 
                      : 'Not scheduled'
                    }
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Only title and price can be modified. 
                Other properties are managed through separate admin functions.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Updating...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update Lesson
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LessonEditModal;