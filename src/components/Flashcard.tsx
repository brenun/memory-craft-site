
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
          <div className="w-full h-full bg-gradient-to-br from-white to-blue-50/50 rounded-2xl shadow-xl border-2 border-blue-200/60 p-8 flex flex-col items-center justify-center hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:border-blue-300">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                Question
              </div>
              <div className="text-xl md:text-2xl font-semibold text-gray-900 leading-relaxed max-w-lg">
                {card.front}
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-xs">
              <span className="text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Click to reveal answer
              </span>
              <div className="flex items-center space-x-3">
                {card.timesCorrect + card.timesIncorrect > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded-full border border-green-200">
                      {card.timesCorrect}✓
                    </span>
                    <span className="text-red-500 font-bold bg-red-50 px-2 py-1 rounded-full border border-red-200">
                      {card.timesIncorrect}✗
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-1 bg-amber-50 px-2 py-1 rounded-full border border-amber-200">
                  {Array.from({ length: card.difficulty }, (_, i) => (
                    <div key={i} className="w-2.5 h-2.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full shadow-sm"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full bg-gradient-to-br from-teal-50 to-green-50 rounded-2xl shadow-xl border-2 border-teal-200/60 p-8 flex flex-col items-center justify-center hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:border-teal-300">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-teal-500 to-green-500 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                Answer
              </div>
              <div className="text-xl md:text-2xl font-semibold text-gray-900 leading-relaxed max-w-lg">
                {card.back}
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-xs">
              <span className="text-teal-600 font-semibold bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                Did you get it right?
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium">Difficulty:</span>
                <div className="flex items-center space-x-1 bg-amber-50 px-2 py-1 rounded-full border border-amber-200">
                  {Array.from({ length: card.difficulty }, (_, i) => (
                    <div key={i} className="w-2.5 h-2.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full shadow-sm"></div>
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
