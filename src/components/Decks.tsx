
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Play, Calendar, FileText, Trash2 } from 'lucide-react';
import { Class, Deck } from '../pages/Index';

interface DecksProps {
  classes: Class[];
  setClasses: React.Dispatch<React.SetStateAction<Class[]>>;
}

const Decks = ({ classes, setClasses }: DecksProps) => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [newDeck, setNewDeck] = useState({
    name: '',
    description: ''
  });

  const currentClass = classes.find(cls => cls.id === classId);

  if (!currentClass) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Class not found</h2>
        <Link to="/classes" className="text-blue-600 hover:text-blue-700">
          Back to Classes
        </Link>
      </div>
    );
  }

  const handleCreateDeck = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDeck.name.trim()) {
      const deck: Deck = {
        id: Date.now().toString(),
        name: newDeck.name,
        description: newDeck.description,
        flashcards: [],
        createdAt: new Date()
      };

      setClasses(classes.map(cls => 
        cls.id === classId 
          ? { ...cls, decks: [...cls.decks, deck] }
          : cls
      ));

      setNewDeck({ name: '', description: '' });
      setIsCreating(false);
    }
  };

  const handleDeleteDeck = (deckId: string) => {
    setClasses(classes.map(cls => 
      cls.id === classId 
        ? { ...cls, decks: cls.decks.filter(deck => deck.id !== deckId) }
        : cls
    ));
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Link to="/classes" className="hover:text-blue-600">Classes</Link>
        <span>/</span>
        <span className="text-gray-900">{currentClass.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/classes')}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <div className="flex items-center mb-2">
              <div className={`w-4 h-4 rounded-full ${currentClass.color} mr-3`}></div>
              <h1 className="text-3xl font-bold text-gray-900">{currentClass.name}</h1>
            </div>
            <p className="text-gray-600">{currentClass.description}</p>
          </div>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          <span>New Deck</span>
        </button>
      </div>

      {/* Create Deck Form */}
      {isCreating && (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Deck</h3>
          <form onSubmit={handleCreateDeck} className="space-y-4">
            <div>
              <label htmlFor="deckName" className="block text-sm font-medium text-gray-700 mb-1">
                Deck Name
              </label>
              <input
                type="text"
                id="deckName"
                value={newDeck.name}
                onChange={(e) => setNewDeck({ ...newDeck, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Basic Vocabulary, Chapter 1"
                required
              />
            </div>
            <div>
              <label htmlFor="deckDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="deckDescription"
                value={newDeck.description}
                onChange={(e) => setNewDeck({ ...newDeck, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What will you learn in this deck?"
                rows={3}
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Deck
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

      {/* Decks Grid */}
      {currentClass.decks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No decks yet</h3>
          <p className="text-gray-600 mb-4">Create your first deck to start adding flashcards!</p>
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} className="mr-2" />
            Create Deck
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentClass.decks.map((deck) => (
            <div key={deck.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow group">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{deck.name}</h3>
                  <button
                    onClick={() => handleDeleteDeck(deck.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{deck.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <FileText size={14} className="mr-1" />
                      {deck.flashcards.length} card{deck.flashcards.length !== 1 ? 's' : ''}
                    </span>
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {deck.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Link
                    to={`/deck/${deck.id}/study`}
                    className="flex items-center justify-center space-x-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Play size={16} />
                    <span>Study ({deck.flashcards.length})</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Decks;
