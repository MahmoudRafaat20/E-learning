// components/LessonViewModal.js
import React from 'react';
import { toast } from 'react-toastify';

const LessonViewModal = ({ lesson, isOpen, onClose, onEdit, onDelete }) => {
  if (!isOpen || !lesson) return null;

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${lesson.title}"?`)) {
      try {
        await onDelete(lesson._id);
        toast.success('Lesson deleted successfully!');
        onClose();
      } catch (error) {
        toast.error(`Error deleting lesson: ${error.message}`);
      }
    }
  };

  const handleEdit = () => {
    onEdit(lesson);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{lesson.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Basic Info */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Lesson Details</h3>
                <div className="space-y-3">
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
                      {lesson.isPaid ? `Paid - $${lesson.price}` : 'Free'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Schedule</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Scheduled Date:</span>
                    <span className="text-gray-900">
                      {lesson.scheduledDate 
                        ? new Date(lesson.scheduledDate).toLocaleDateString() 
                        : 'Not scheduled'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span className="text-gray-900">
                      {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString() : 'Unknown'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Media & Teacher */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Media</h3>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  {lesson.thumbnail ? (
                    <img
                      src={lesson.thumbnail}
                      alt={lesson.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p>No Thumbnail</p>
                    </div>
                  )}
                </div>
                {lesson.videoUrl && (
                  <div className="mt-2">
                    <a 
                      href={lesson.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Watch on YouTube
                    </a>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Teacher</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-800">
                      {lesson.teacher?.name?.charAt(0) || 'T'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{lesson.teacher?.name || 'Unknown Teacher'}</h4>
                    <p className="text-sm text-gray-600">Instructor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Actions */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            Lesson ID: <span className="font-mono">{lesson._id}</span>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-red-600 hover:text-red-800 font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
            
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewModal;