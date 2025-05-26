
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, RotateCcw, Check, X } from 'lucide-react';
import { Class, Deck, Flashcard } from '../pages/Index';
import FlashcardComponent from './Flashcard';

interface StudyProps {
  classes: Class[];
  setClasses: React.Dispatch<React.SetStateAction<Class[]>>;
}

const Study = ({ classes, setClasses }: StudyProps) => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState({ front: '', back: '' });

  // Find the current deck
  let currentDeck: Deck | undefined;
  let currentClass: Class | undefined;
  
  for (const cls of classes) {
    const deck = cls.decks.find(d => d.id === deckId);
    if (deck) {
      currentDeck = deck;
      currentClass = cls;
      break;
    }
  }

  useEffect(() => {
    setIsFlipped(false);
    setShowResult(false);
  }, [currentCardIndex]);

  if (!currentDeck || !currentClass) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Deck not found</h2>
        <button 
          onClick={() => navigate('/classes')} 
          className="text-blue-600 hover:text-blue-700"
        >
          Back to Classes
        </button>
      </div>
    );
  }

  const currentCard = currentDeck.flashcards[currentCardIndex];

  const handleCardClick = () => {
    if (!showResult) {
      setIsFlipped(!isFlipped);
      if (!isFlipped) {
        setTimeout(() => setShowResult(true), 300);
      }
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    // Update card statistics
    const updatedClasses = classes.map(cls => {
      if (cls.id === currentClass!.id) {
        return {
          ...cls,
          decks: cls.decks.map(deck => {
            if (deck.id === deckId) {
              return {
                ...deck,
                flashcards: deck.flashcards.map(card => {
                  if (card.id === currentCard.id) {
                    return {
                      ...card,
                      timesCorrect: isCorrect ? card.timesCorrect + 1 : card.timesCorrect,
                      timesIncorrect: !isCorrect ? card.timesIncorrect + 1 : card.timesIncorrect,
                      lastReviewed: new Date()
                    };
                  }
                  return card;
                })
              };
            }
            return deck;
          })
        };
      }
      return cls;
    });

    setClasses(updatedClasses);

    // Move to next card
    if (currentCardIndex < currentDeck.flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCard.front.trim() && newCard.back.trim()) {
      const flashcard: Flashcard = {
        id: Date.now().toString(),
        front: newCard.front,
        back: newCard.back,
        difficulty: 1,
        timesCorrect: 0,
        timesIncorrect: 0
      };

      setClasses(classes.map(cls => {
        if (cls.id === currentClass!.id) {
          return {
            ...cls,
            decks: cls.decks.map(deck => {
              if (deck.id === deckId) {
                return {
                  ...deck,
                  flashcards: [...deck.flashcards, flashcard]
                };
              }
              return deck;
            })
          };
        }
        return cls;
      }));

      setNewCard({ front: '', back: '' });
      setIsAddingCard(false);
    }
  };

  const resetStudySession = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setShowResult(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(`/class/${currentClass.id}/decks`)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <div className="flex items-center mb-1">
              <div className={`w-3 h-3 rounded-full ${currentClass.color} mr-2`}></div>
              <span className="text-sm text-gray-600">{currentClass.name}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{currentDeck.name}</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsAddingCard(true)}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            <Plus size={16} />
            <span>Add Card</span>
          </button>
          <button
            onClick={resetStudySession}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Add Card Form */}
      {isAddingCard && (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Flashcard</h3>
          <form onSubmit={handleAddCard} className="space-y-4">
            <div>
              <label htmlFor="cardFront" className="block text-sm font-medium text-gray-700 mb-1">
                Front (Question)
              </label>
              <textarea
                id="cardFront"
                value={newCard.front}
                onChange={(e) => setNewCard({ ...newCard, front: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the question or prompt"
                rows={3}
                required
              />
            </div>
            <div>
              <label htmlFor="cardBack" className="block text-sm font-medium text-gray-700 mb-1">
                Back (Answer)
              </label>
              <textarea
                id="cardBack"
                value={newCard.back}
                onChange={(e) => setNewCard({ ...newCard, back: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the answer"
                rows={3}
                required
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Add Card
              </button>
              <button
                type="button"
                onClick={() => setIsAddingCard(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Study Area */}
      {currentDeck.flashcards.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No flashcards yet</h3>
          <p className="text-gray-600 mb-6">Add some flashcards to start studying!</p>
          <button
            onClick={() => setIsAddingCard(true)}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Add Your First Card
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Progress */}
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Card {currentCardIndex + 1} of {currentDeck.flashcards.length}
              </span>
              <span className="text-sm text-gray-500">
                Accuracy: {currentCard.timesCorrect + currentCard.timesIncorrect > 0 
                  ? Math.round((currentCard.timesCorrect / (currentCard.timesCorrect + currentCard.timesIncorrect)) * 100)
                  : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentCardIndex + 1) / currentDeck.flashcards.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Flashcard */}
          <FlashcardComponent
            card={currentCard}
            isFlipped={isFlipped}
            onClick={handleCardClick}
          />

          {/* Controls */}
          {!isFlipped && (
            <div className="text-center">
              <p className="text-gray-600 mb-4">Click the card to reveal the answer</p>
            </div>
          )}

          {showResult && (
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleAnswer(false)}
                className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
              >
                <X size={20} />
                <span>Incorrect</span>
              </button>
              <button
                onClick={() => handleAnswer(true)}
                className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
              >
                <Check size={20} />
                <span>Correct</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Study;
