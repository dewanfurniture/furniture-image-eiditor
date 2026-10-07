import { useState, useEffect } from 'react';
import ImageEditor from './components/ImageEditor';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  const dateString = time.toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="hidden md:flex flex-col items-center justify-center bg-gray-50/80 px-4 py-1.5 rounded-2xl border border-gray-100 shadow-sm">
      <div className="text-sm font-semibold text-gray-800 font-mono tracking-wide">{timeString}</div>
      <div className="text-[10px] text-gray-500 font-medium">{dateString}</div>
    </div>
  );
}

function App() {
  return (
    <div className="h-screen overflow-hidden bg-[#F5F5F7] flex flex-col font-sans selection:bg-blue-200 selection:text-gray-900">
      {/* Header / Hero */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-gray-200/50 py-3 sm:py-4 sticky top-0 z-50 transition-all duration-300 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-1 rounded-[14px] bg-white shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] transition-transform hover:scale-105 border border-gray-100">
              <img src="/logo.jpg" alt="Furniture Editor Logo" className="w-9 h-9 object-cover rounded-[10px]" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl font-semibold text-gray-900 tracking-tight leading-none">
                ফার্নিচার <span className="text-[#0071e3]">এডিটর</span>
              </h1>
              <p className="text-[11px] sm:text-xs text-gray-500 font-medium mt-1">
                লোগো এবং নাম্বার বসানোর সহজ উপায়
              </p>
            </div>
          </div>

          {/* Live Clock */}
          <Clock />

          <a
            href="https://mdalamin.web.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-3 bg-white/50 hover:bg-white p-1.5 pr-4 rounded-full border border-gray-200/60 shadow-sm transition-all hover:shadow hover:-translate-y-0.5 group"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
              <img src="/alamin.png" alt="Muhammad Al-amin" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 font-medium leading-tight">Developer</span>
              <span className="text-xs font-semibold text-gray-800 leading-tight group-hover:text-[#0071e3] transition-colors">Muhammad Al-amin</span>
            </div>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full mx-auto px-2 sm:px-4 lg:px-8 xl:px-12 py-2 sm:py-4 flex flex-col overflow-hidden">
        <ImageEditor />
      </main>

    </div>
  );
}

export default App;
