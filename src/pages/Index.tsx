import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from '../components/Dashboard';
import Classes from '../components/Classes';
import Decks from '../components/Decks';
import Study from '../components/Study';
import { AppSidebar } from '../components/AppSidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50/40">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-blue-100/60 px-6 py-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                    Welcome to FlashLearn
                  </h1>
                  <p className="text-sm text-gray-600 mt-1 font-medium">
                    ADHD-optimized learning platform • Enhanced focus & retention
                  </p>
                </div>
                <div className="hidden md:flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-sm"></div>
                  <span className="text-xs text-gray-500 font-medium">Focus Mode Active</span>
                </div>
              </div>
            </header>
            
            <main className="flex-1 p-6">
              <div className="max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<Dashboard classes={classes} />} />
                  <Route path="/classes" element={<Classes classes={classes} setClasses={setClasses} />} />
                  <Route path="/class/:classId/decks" element={<Decks classes={classes} setClasses={setClasses} />} />
                  <Route path="/deck/:deckId/study" element={<Study classes={classes} setClasses={setClasses} />} />
                </Routes>
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
