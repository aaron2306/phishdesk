import React, { createContext, useContext, useMemo, useState } from 'react';
import { AttemptRecord, EmailScenario, SessionStats, UserVerdict } from '../types';
import { BUILT_IN_SCENARIOS } from '../data/scenarios';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { shuffle, genId } from '../lib/utils';

interface SimulatorContextValue {
  allScenarios: EmailScenario[];
  customScenarios: EmailScenario[];
  queue: EmailScenario[];
  currentIndex: number;
  currentScenario: EmailScenario | null;
  stats: SessionStats;
  isFinished: boolean;
  startNewSession: (count?: number) => void;
  submitVerdict: (verdict: UserVerdict, usedInspector: boolean) => AttemptRecord;
  goToNext: () => void;
  resetProgress: () => void;
  addCustomScenario: (scenario: EmailScenario) => void;
  updateCustomScenario: (scenario: EmailScenario) => void;
  deleteCustomScenario: (id: string) => void;
  exportScenarios: () => string;
  importScenarios: (json: string) => { ok: boolean; message: string };
}

const SimulatorContext = createContext<SimulatorContextValue | null>(null);

const EMPTY_STATS: SessionStats = { attempts: [], streak: 0, bestStreak: 0 };

export function SimulatorProvider({ children }: { children: React.ReactNode }) {
  const [customScenarios, setCustomScenarios] = useLocalStorage<EmailScenario[]>(
    'phishdesk:customScenarios',
    []
  );
  const [stats, setStats] = useLocalStorage<SessionStats>('phishdesk:stats', EMPTY_STATS);
  const [queue, setQueue] = useState<EmailScenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const allScenarios = useMemo(
    () => [...BUILT_IN_SCENARIOS, ...customScenarios],
    [customScenarios]
  );

  const startNewSession = (count?: number) => {
    const pool = shuffle(allScenarios);
    const sliced = count ? pool.slice(0, count) : pool;
    setQueue(sliced);
    setCurrentIndex(0);
  };

  const currentScenario = queue[currentIndex] ?? null;
  const isFinished = queue.length > 0 && currentIndex >= queue.length;

  const submitVerdict = (verdict: UserVerdict, usedInspector: boolean): AttemptRecord => {
    if (!currentScenario) {
      throw new Error('No active scenario');
    }
    const correct =
      (verdict === 'phishing' && currentScenario.isPhishing) ||
      (verdict === 'safe' && !currentScenario.isPhishing);

    const record: AttemptRecord = {
      scenarioId: currentScenario.id,
      verdict,
      correct,
      usedInspector,
      timestamp: Date.now(),
    };

    setStats((prev) => {
      const nextStreak = correct ? prev.streak + 1 : 0;
      return {
        attempts: [...prev.attempts, record],
        streak: nextStreak,
        bestStreak: Math.max(prev.bestStreak, nextStreak),
      };
    });

    return record;
  };

  const goToNext = () => setCurrentIndex((i) => i + 1);

  const resetProgress = () => {
    setStats(EMPTY_STATS);
    setQueue([]);
    setCurrentIndex(0);
  };

  const addCustomScenario = (scenario: EmailScenario) => {
    setCustomScenarios((prev) => [...prev, { ...scenario, id: scenario.id || genId('custom'), isCustom: true }]);
  };

  const updateCustomScenario = (scenario: EmailScenario) => {
    setCustomScenarios((prev) => prev.map((s) => (s.id === scenario.id ? scenario : s)));
  };

  const deleteCustomScenario = (id: string) => {
    setCustomScenarios((prev) => prev.filter((s) => s.id !== id));
  };

  const exportScenarios = () => JSON.stringify(customScenarios, null, 2);

  const importScenarios = (json: string): { ok: boolean; message: string } => {
    try {
      const parsed = JSON.parse(json);
      if (!Array.isArray(parsed)) {
        return { ok: false, message: 'Expected a JSON array of scenarios.' };
      }
      const withIds: EmailScenario[] = parsed.map((s: EmailScenario) => ({
        ...s,
        id: s.id || genId('custom'),
        isCustom: true,
      }));
      setCustomScenarios((prev) => [...prev, ...withIds]);
      return { ok: true, message: `Imported ${withIds.length} scenario(s).` };
    } catch {
      return { ok: false, message: 'Could not parse that file as JSON.' };
    }
  };

  const value: SimulatorContextValue = {
    allScenarios,
    customScenarios,
    queue,
    currentIndex,
    currentScenario,
    stats,
    isFinished,
    startNewSession,
    submitVerdict,
    goToNext,
    resetProgress,
    addCustomScenario,
    updateCustomScenario,
    deleteCustomScenario,
    exportScenarios,
    importScenarios,
  };

  return <SimulatorContext.Provider value={value}>{children}</SimulatorContext.Provider>;
}

export function useSimulator() {
  const ctx = useContext(SimulatorContext);
  if (!ctx) throw new Error('useSimulator must be used within SimulatorProvider');
  return ctx;
}
