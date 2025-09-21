import React, { useMemo, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useGetLessons } from "../../hooks/useGetLessons";
import LessonModal from "../../Components/ui/LessonModal";

const LessonsList = () => {
  const { classLevel } = useAuth();
  const { lessons, loading, error, refetch } = useGetLessons();
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filters = ["All", "Free", "Paid"];


  // فلترة الدروس بناءً على الفلتر النشط
  const filteredLessons = useMemo(() => {
    if (!lessons) return [];
    
    switch (activeFilter) {
      case 'Free':
        return lessons.filter(lesson => !lesson.isPaid);
      case 'Paid':
        return lessons.filter(lesson => lesson.isPaid);
      case 'All':
      default:
        return lessons;
    }
  }, [lessons, activeFilter]);

 const handleLessonClick = (lessonId) => {
  console.log('Clicked lesson ID:', lessonId);
  
  // Filter lessons to find the one with matching ID
  const selectedLesson = lessons.find(lesson => lesson._id === lessonId);
  console.log('Selected lesson:', selectedLesson);
  
  if (selectedLesson) {
    setSelectedLesson(selectedLesson);
    setIsModalOpen(true);
  } else {
    console.error('Lesson not found with ID:', lessonId);
  }
};

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLesson(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading lessons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Error Loading Lessons
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={refetch}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">My Lessons</h1>
            {classLevel && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Class Level: {classLevel}
              </span>
            )}
          </div>
          <button
            onClick={refetch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter}
                
              </button>
            ))}
          </div>
        </div>

        {lessons.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Lessons Available
            </h3>
            <p className="text-gray-600 mb-6">
              There are no lessons matching your current filters.
            </p>
            <button
              onClick={refetch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Check Again
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-violet-700 md:text-[16px] uppercase tracking-wider">
                      Lesson Title
                    </th>
                    <th className="px-7 py-4 text-left text-xs font-bold col-span-2 text-violet-700 md:text-[16px] uppercase tracking-wider">
                      Class Level
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold text-violet-700 md:text-[16px] uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-violet-700 md:text-[16px] uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-violet-700 md:text-[16px] uppercase tracking-wider">
                      Schedule
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {lessons.map((lesson) => (
                    <tr
                      key={lesson._id}
                      className="hover:bg-gray-200 transition-colors cursor-pointer"
                      onClick={() => handleLessonClick(lesson._id)}
                    >
                      {/* Lesson Title */}
                      <td className="px-6 py-4">
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-cyan-700 truncate">
                            {lesson.title}
                          </h4>
                         
                        </div>
                      </td>

                      {/* Class Level*/}
                      <td className="px-6 py-4 col-span-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          {lesson.classLevel}
                        </div>
                      </td>

                      {/* Duration */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
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
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {lesson.duration || "45"} min
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3.5 py-1 text-xs font-medium rounded-full ${
                            lesson.isPaid
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-green-200 text-green-800"
                          }`}
                        >
                          {lesson.isPaid ? "Paid" : "Free"}
                        </span>
                      </td>

                      {/* Schedule */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {lesson.scheduledDate
                            ? new Date(
                                lesson.scheduledDate
                              ).toLocaleDateString()
                            : "Not scheduled"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Lesson Modal */}
        <LessonModal
          lesson={selectedLesson}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default LessonsList;
