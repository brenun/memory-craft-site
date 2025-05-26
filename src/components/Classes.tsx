
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, BookOpen, Calendar, Trash2 } from 'lucide-react';
import { Class } from '../pages/Index';

interface ClassesProps {
  classes: Class[];
  setClasses: React.Dispatch<React.SetStateAction<Class[]>>;
}

const Classes = ({ classes, setClasses }: ClassesProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    description: '',
    color: 'bg-blue-500'
  });

  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-indigo-500',
    'bg-pink-500',
    'bg-teal-500'
  ];

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (newClass.name.trim()) {
      const class_: Class = {
        id: Date.now().toString(),
        name: newClass.name,
        description: newClass.description,
        color: newClass.color,
        decks: [],
        createdAt: new Date()
      };
      setClasses([...classes, class_]);
      setNewClass({ name: '', description: '', color: 'bg-blue-500' });
      setIsCreating(false);
    }
  };

  const handleDeleteClass = (classId: string) => {
    setClasses(classes.filter(cls => cls.id !== classId));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Classes</h1>
          <p className="text-gray-600 mt-2">Organize your learning into focused classes</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          <span>New Class</span>
        </button>
      </div>

      {/* Create Class Form */}
      {isCreating && (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Class</h3>
          <form onSubmit={handleCreateClass} className="space-y-4">
            <div>
              <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-1">
                Class Name
              </label>
              <input
                type="text"
                id="className"
                value={newClass.name}
                onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Spanish Language, Biology 101"
                required
              />
            </div>
            <div>
              <label htmlFor="classDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="classDescription"
                value={newClass.description}
                onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of what you'll learn in this class"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Theme
              </label>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setNewClass({ ...newClass, color })}
                    className={`w-8 h-8 rounded-full ${color} ${
                      newClass.color === color ? 'ring-2 ring-gray-900 ring-offset-2' : ''
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Class
              </button>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Classes Grid */}
      {classes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No classes yet</h3>
          <p className="text-gray-600 mb-4">Create your first class to get started!</p>
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} className="mr-2" />
            Create Class
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div key={cls.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow group">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${cls.color} mr-3`}></div>
                    <h3 className="text-lg font-semibold text-gray-900">{cls.name}</h3>
                  </div>
                  <button
                    onClick={() => handleDeleteClass(cls.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{cls.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <BookOpen size={14} className="mr-1" />
                      {cls.decks.length} deck{cls.decks.length !== 1 ? 's' : ''}
                    </span>
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {cls.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <Link
                  to={`/class/${cls.id}/decks`}
                  className="block w-full text-center bg-blue-50 text-blue-600 py-2 rounded-md hover:bg-blue-100 transition-colors font-medium"
                >
                  View Decks
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Classes;
