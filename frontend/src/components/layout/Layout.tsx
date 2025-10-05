import React from 'react';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 md:px-8">
        {children}
      </main>
      <Footer />
      <Toaster position="bottom-right" toastOptions={{
      duration: 3000,
      style: {
        background: '#363636',
        color: '#fff'
      },
      success: {
        duration: 3000,
        iconTheme: {
          primary: '#10B981',
          secondary: '#FFFFFF'
        }
      },
      error: {
        duration: 4000,
        iconTheme: {
          primary: '#EF4444',
          secondary: '#FFFFFF'
        }
      }
    }} />
    </div>;
};
export default Layout;