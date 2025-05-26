
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
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={onClick}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="w-full h-full bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8 flex flex-col items-center justify-center hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="text-sm font-medium text-blue-600 mb-4">QUESTION</div>
              <div className="text-xl md:text-2xl font-medium text-gray-900 leading-relaxed">
                {card.front}
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-xs text-gray-400">
              <span>Click to reveal answer</span>
              <span>
                {card.timesCorrect + card.timesIncorrect > 0 && (
                  <span>
                    {card.timesCorrect}✓ {card.timesIncorrect}✗
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full bg-blue-50 rounded-xl shadow-lg border-2 border-blue-200 p-8 flex flex-col items-center justify-center hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="text-sm font-medium text-blue-600 mb-4">ANSWER</div>
              <div className="text-xl md:text-2xl font-medium text-gray-900 leading-relaxed">
                {card.back}
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-xs text-gray-400">
              <span>Did you get it right?</span>
              <span>
                Difficulty: {Array.from({ length: card.difficulty }, (_, i) => '⭐').join('')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardComponent;
