import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="h-screen relative bg-neutral-200">

    <div>
        <nav className="flex items-center justify-between p-4 sticky top-0 z-10 bg-neutral-200 w-full backdrop-blur-sm">
            <h1 className="text-2xl font-bold text-center">AI Chatbot</h1>

            <div>
            </div>
        </nav>
    </div>
    <div className="h-full flex flex-col justify-between overflow-hidden overflow-hidden rounded-t-3xl">
    {children}
    </div>
  </div>;
}