// components/LessonModal.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LessonModal = ({ lesson, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
console.log(lesson);

  if (!isOpen || !lesson) return null;

  const handleWatchVideo = () => {
    if (lesson.isPaid) {
      // إذا كان مدفوعاً، الانتقال لصفحة الدفع
      navigate(`student/lessons/payment/:${lesson._id}`);
      onClose();
    } else if (!lesson.isPaid) {
      // إذا كان مجانياً وله لينك يوتيوب، يفتحه في tab جديد
      window.open(lesson.video, "_blank");
    } else {
      // إذا كان مجانياً لكن مافيش لينك، يعرض رسالة
      alert("Video link not available for this lesson");
    }
  };

  const handleEnroll = () => {
    navigate(`/student/lessons/payment/:${lesson._id}`);
    console.log(lesson._id);
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{lesson.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4">
            {/* Video Thumbnail or Preview */}
          
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">
                {lesson.description || "No description available."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Duration:</span>
                <p className="font-medium text-gray-900">
                  {lesson.duration || "30"} minutes
                </p>
              </div>
              <div>
                <span className="text-gray-500">Level:</span>
                <p className="font-medium text-gray-900">
                  {lesson?.classLevel || "All Levels"}
                </p>
              </div>

              <div>
                <span className="text-gray-500">Scheduled:</span>
                <p className="font-medium text-gray-900">
                  {lesson?.scheduledDate
                    ? new Date(lesson?.scheduledDate).toLocaleDateString()
                    : "Not scheduled"}
                </p>
              </div>
            </div>

            {lesson.isPaid && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-yellow-800 font-medium">
                    Premium Content
                  </span>
                </div>
                <p className="text-yellow-700 text-sm mt-1">
                  This lesson requires enrollment. You need to purchase access
                  to view the full content.
                </p>
              </div>
            )}

            {!lesson.isPaid && lesson.video && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-green-800 font-medium">
                    Free Video Available
                  </span>
                </div>
                <p className="text-green-700 text-sm mt-1">
                  Click "Watch on YouTube" to view this free lesson.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer - Buttons */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <div>
            <span
              className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                lesson.isPaid
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {lesson.isPaid ? `Paid - $${lesson.price}` : "Free"}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Close
            </button>

            {lesson.isPaid ? (
              <button
                onClick={handleEnroll}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Enroll Now - ${lesson.price}
              </button>
            ) : (
              <button
                onClick={handleWatchVideo}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Watch on YouTube
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;
