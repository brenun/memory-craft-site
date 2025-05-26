
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Brain } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600';
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">FlashLearn</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/')}`}
            >
              <Home size={16} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/classes"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/classes')}`}
            >
              <BookOpen size={16} />
              <span>Classes</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
