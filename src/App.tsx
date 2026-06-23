import { useState } from 'react';
import { SimulatorProvider, useSimulator } from './context/SimulatorContext';
import { TopNav, Screen } from './components/Layout/TopNav';
import { LandingScreen } from './components/Landing/LandingScreen';
import { SimulatorScreen } from './components/Inbox/SimulatorScreen';
import { GlossaryScreen } from './components/Reference/GlossaryScreen';
import { AdminPanel } from './components/Admin/AdminPanel';

function Shell() {
  const [screen, setScreen] = useState<Screen>('landing');
  const { startNewSession } = useSimulator();

  const handleStart = (count?: number) => {
    startNewSession(count);
    setScreen('simulator');
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {screen !== 'landing' && <TopNav screen={screen} onNavigate={setScreen} />}
      <div className={`flex-1 min-h-0 ${screen === 'simulator' ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        {screen === 'landing' && <LandingScreen onStart={handleStart} />}
        {screen === 'simulator' && (
          <SimulatorScreen
            onQuit={() => setScreen('landing')}
            onRestart={handleStart}
            onViewGlossary={() => setScreen('glossary')}
          />
        )}
        {screen === 'glossary' && <GlossaryScreen />}
        {screen === 'admin' && <AdminPanel />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SimulatorProvider>
      <Shell />
    </SimulatorProvider>
  );
}
