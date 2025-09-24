// pages/superadmin/SuperLessons.js
import React, { useState, useMemo } from 'react';
import { useSuperAdminLessons } from '../../hooks/useSuperAdminLessons';


import { toast } from 'react-toastify';
import LessonEditModal from '../../Components/LessonEditModal';
import LessonViewModal from '../../Components/ui/LessonViewModal';

const SuperLessons = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [classLevelFilter, setClassLevelFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const filters = ['All', 'Free', 'Paid'];
  
  const classLevels = [
    '', // All class levels
    'Grade 1 Primary',
    'Grade 2 Primary', 
    'Grade 3 Primary',
    'Grade 4 Primary',
    'Grade 5 Primary',
    'Grade 6 Primary',
    'Grade 1 Secondary',
    'Grade 2 Secondary',
    'Grade 3 Secondary'
  ];

  const { lessons, loading, error, refetch, deleteLesson, updateLesson } = useSuperAdminLessons();

  // فلترة الدروس حسب البحث
  const filteredLessons = useMemo(() => {
    if (!lessons) return [];
    
    let result = lessons;
    
    // فلترة حسب النوع
    switch (activeFilter) {
      case 'Free':
        result = result.filter(lesson => !lesson.isPaid);
        break;
      case 'Paid':
        result = result.filter(lesson => lesson.isPaid);
        break;
      default:
        break;
    }
    
    // فلترة حسب class level
    if (classLevelFilter) {
      result = result.filter(lesson => lesson.classLevel === classLevelFilter);
    }
    
    // فلترة حسب البحث
    if (searchTerm) {
      result = result.filter(lesson =>
        lesson.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.classLevel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.teacher?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return result;
  }, [lessons, activeFilter, classLevelFilter, searchTerm]);

  const handleViewLesson = (lesson) => {
    setSelectedLesson(lesson);
    setIsViewModalOpen(true);
  };

  const handleEditLesson = (lesson) => {
    setSelectedLesson(lesson);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (lessonId, lessonTitle) => {
    if (window.confirm(`Are you sure you want to delete "${lessonTitle}"?`)) {
      try {
        const result = await deleteLesson(lessonId);
        if (result.success) {
          toast.success('Lesson deleted successfully!');
        } else {
          toast.error(`Error: ${result.message}`);
        }
      } catch (error) {
        toast.error('Error deleting lesson');
      }
    }
  };

  const handleUpdate = async (lessonId, updatedData) => {
    try {
      const result = await updateLesson(lessonId, updatedData);
      if (result.success) {
        toast.success('Lesson updated successfully!');
        return Promise.resolve();
      } else {
        toast.error(`Error: ${result.message}`);
        throw new Error(result.message);
      }
    } catch (error) {
      toast.error(error.message || 'Error updating lesson');
      throw error;
    }
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setClassLevelFilter('');
    setActiveFilter('All');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading super admin lessons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Lessons</h3>
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
          <div>
            <h1 className="text-2xl font-bold text-gray-900">👑 Super Admin - All Lessons</h1>
            <p className="text-gray-600 mt-1">Full access to all lessons across the platform</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                toast.info('Add new lesson functionality coming soon!');
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Lesson
            </button>
            <button
              onClick={refetch}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Lessons</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title, description, or class level..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Class Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class Level</label>
              <select
                value={classLevelFilter}
                onChange={(e) => setClassLevelFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">All Class Levels</option>
                {classLevels.filter(level => level).map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Type</label>
              <div className="flex gap-2">
                {filters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => handleFilterClick(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeFilter === filter
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter}
                    {filter === 'Free' && (
                      <span className="ml-1 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                        {lessons.filter(lesson => !lesson.isPaid).length}
                      </span>
                    )}
                    {filter === 'Paid' && (
                      <span className="ml-1 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                        {lessons.filter(lesson => lesson.isPaid).length}
                      </span>
                    )}
                    {filter === 'All' && (
                      <span className="ml-1 bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                        {lessons.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Filter Summary */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {filteredLessons.length} of {lessons.length} lessons
              {classLevelFilter && ` in ${classLevelFilter}`}
              {activeFilter !== 'All' && ` (${activeFilter.toLowerCase()} only)`}
              {searchTerm && ` matching "${searchTerm}"`}
            </div>
            {(searchTerm || classLevelFilter || activeFilter !== 'All') && (
              <button
                onClick={clearAllFilters}
                className="text-purple-600 hover:text-purple-800 text-sm font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {filteredLessons.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">
              {activeFilter === 'Free' ? '🎓' : activeFilter === 'Paid' ? '💎' : '📚'}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {activeFilter === 'Free' 
                ? 'No Free Lessons Available' 
                : activeFilter === 'Paid'
                ? 'No Paid Lessons Available'
                : 'No Lessons Available'
              }
            </h3>
            <p className="text-gray-600 mb-6">
              {activeFilter === 'Free'
                ? 'There are currently no free lessons available.'
                : activeFilter === 'Paid'
                ? 'There are currently no paid lessons available.'
                : 'There are no lessons available at the moment.'
              }
            </p>
            <button
              onClick={clearAllFilters}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lesson</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class Level</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLessons.map((lesson) => (
                    <tr key={lesson._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 truncate">{lesson.title}</h4>
                          <p className="text-sm text-gray-500 truncate mt-1">{lesson.description || 'No description available'}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{lesson.classLevel || 'Not specified'}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{lesson.teacher?.name || 'Unknown Teacher'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                          lesson.isPaid ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {lesson.isPaid ? `Paid - $${lesson.price || 0}` : 'Free'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {lesson.scheduledDate
                          ? new Date(lesson.scheduledDate).toLocaleDateString()
                          : 'Not scheduled'
                        }
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewLesson(lesson)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded border border-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEditLesson(lesson)}
                            className="text-green-600 hover:text-green-800 text-sm font-medium px-3 py-1 rounded border border-green-600 hover:bg-green-50 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(lesson._id, lesson.title)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 rounded border border-red-600 hover:bg-red-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modals */}
        <LessonViewModal
          lesson={selectedLesson}
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          onEdit={handleEditLesson}
          onDelete={handleDelete}
        />

        <LessonEditModal
          lesson={selectedLesson}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default SuperLessons;