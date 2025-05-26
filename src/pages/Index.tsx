
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from '../components/Dashboard';
import Classes from '../components/Classes';
import Decks from '../components/Decks';
import Study from '../components/Study';
import Navigation from '../components/Navigation';

// Mock data structure - ready for backend integration
export interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: number; // 1-5 scale
  lastReviewed?: Date;
  timesCorrect: number;
  timesIncorrect: number;
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  flashcards: Flashcard[];
  createdAt: Date;
  lastStudied?: Date;
}

export interface Class {
  id: string;
  name: string;
  description: string;
  color: string;
  decks: Deck[];
  createdAt: Date;
}

const Index = () => {
  // Mock data - this will be replaced with backend calls
  const [classes, setClasses] = useState<Class[]>([
    {
      id: '1',
      name: 'Spanish Language',
      description: 'Learn Spanish vocabulary and grammar',
      color: 'bg-blue-500',
      createdAt: new Date(),
      decks: [
        {
          id: '1',
          name: 'Basic Vocabulary',
          description: 'Essential Spanish words for beginners',
          createdAt: new Date(),
          flashcards: [
            {
              id: '1',
              front: 'Hello',
              back: 'Hola',
              difficulty: 1,
              timesCorrect: 0,
              timesIncorrect: 0
            },
            {
              id: '2',
              front: 'Goodbye',
              back: 'Adiós',
              difficulty: 1,
              timesCorrect: 0,
              timesIncorrect: 0
            },
            {
              id: '3',
              front: 'Thank you',
              back: 'Gracias',
              difficulty: 1,
              timesCorrect: 0,
              timesIncorrect: 0
            }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Computer Science',
      description: 'Programming concepts and algorithms',
      color: 'bg-green-500',
      createdAt: new Date(),
      decks: [
        {
          id: '2',
          name: 'Data Structures',
          description: 'Essential data structures and their uses',
          createdAt: new Date(),
          flashcards: [
            {
              id: '4',
              front: 'What is an Array?',
              back: 'A collection of elements stored in contiguous memory locations',
              difficulty: 2,
              timesCorrect: 0,
              timesIncorrect: 0
            }
          ]
        }
      ]
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard classes={classes} />} />
          <Route path="/classes" element={<Classes classes={classes} setClasses={setClasses} />} />
          <Route path="/class/:classId/decks" element={<Decks classes={classes} setClasses={setClasses} />} />
          <Route path="/deck/:deckId/study" element={<Study classes={classes} setClasses={setClasses} />} />
        </Routes>
      </main>
    </div>
  );
};

export default Index;
