
import { Flashcard } from '../pages/Index';

interface FlashcardProps {
  card: Flashcard;
  isFlipped: boolean;
  onClick: () => void;
}

const FlashcardComponent = ({ card, isFlipped, onClick }: FlashcardProps) => {
  return (
    <div className="perspective-1000 w-full max-w-2xl mx-auto h-80">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={onClick}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="w-full h-full bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8 flex flex-col items-center justify-center hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider">
                Question
              </div>
              <div className="text-xl md:text-2xl font-medium text-gray-900 leading-relaxed max-w-lg">
                {card.front}
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-xs">
              <span className="text-gray-500 font-medium">Click to reveal answer</span>
              <div className="flex items-center space-x-3">
                {card.timesCorrect + card.timesIncorrect > 0 && (
                  <div className="flex items-center space-x-2 text-gray-400">
                    <span className="text-green-600 font-medium">{card.timesCorrect}✓</span>
                    <span className="text-red-500 font-medium">{card.timesIncorrect}✗</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: card.difficulty }, (_, i) => (
                    <div key={i} className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl border border-blue-200/50 p-8 flex flex-col items-center justify-center hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-semibold uppercase tracking-wider">
                Answer
              </div>
              <div className="text-xl md:text-2xl font-medium text-gray-900 leading-relaxed max-w-lg">
                {card.back}
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-xs">
              <span className="text-gray-500 font-medium">Did you get it right?</span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Difficulty:</span>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: card.difficulty }, (_, i) => (
                    <div key={i} className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardComponent;
