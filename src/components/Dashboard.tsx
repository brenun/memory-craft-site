
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Trophy, TrendingUp } from 'lucide-react';
import { Class } from '../pages/Index';

interface DashboardProps {
  classes: Class[];
}

const Dashboard = ({ classes }: DashboardProps) => {
  const totalDecks = classes.reduce((total, cls) => total + cls.decks.length, 0);
  const totalCards = classes.reduce((total, cls) => 
    total + cls.decks.reduce((deckTotal, deck) => deckTotal + deck.flashcards.length, 0), 0
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to FlashLearn</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Master any subject with our interactive flashcard system. Create classes, build decks, and study smarter.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Classes</p>
              <p className="text-2xl font-semibold text-gray-900">{classes.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Decks</p>
              <p className="text-2xl font-semibold text-gray-900">{totalDecks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Cards</p>
              <p className="text-2xl font-semibold text-gray-900">{totalCards}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Study Streak</p>
              <p className="text-2xl font-semibold text-gray-900">0 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Classes */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Classes</h2>
          <Link
            to="/classes"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View all →
          </Link>
        </div>

        {classes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No classes yet</h3>
            <p className="text-gray-600 mb-4">Get started by creating your first class!</p>
            <Link
              to="/classes"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Class
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.slice(0, 6).map((cls) => (
              <Link
                key={cls.id}
                to={`/class/${cls.id}/decks`}
                className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-4 h-4 rounded-full ${cls.color} mr-3`}></div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {cls.name}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{cls.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{cls.decks.length} deck{cls.decks.length !== 1 ? 's' : ''}</span>
                  <span>
                    {cls.decks.reduce((total, deck) => total + deck.flashcards.length, 0)} cards
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
