import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from '../components/Dashboard';
import Classes from '../components/Classes';
import Decks from '../components/Decks';
import Study from '../components/Study';
import { AppSidebar } from '../components/AppSidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200/50 px-6 py-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-gray-100 transition-colors duration-200" />
                <div className="flex-1">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Welcome to FlashLearn
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Smart flashcard learning platform
                  </p>
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
