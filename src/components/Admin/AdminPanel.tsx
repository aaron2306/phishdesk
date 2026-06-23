import { useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  Pencil,
  Download,
  Upload,
  X,
  Save,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';
import {
  Difficulty,
  EmailAttachment,
  EmailLink,
  EmailScenario,
  RedFlag,
  ScamCategory,
  CATEGORY_LABELS,
} from '../../types';
import { genId, cx } from '../../lib/utils';

const TARGETS: RedFlag['target'][] = ['sender', 'subject', 'greeting', 'body', 'link', 'attachment', 'urgency'];
const CATEGORIES = Object.keys(CATEGORY_LABELS) as ScamCategory[];
const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];

function blankScenario(): EmailScenario {
  return {
    id: '',
    isPhishing: true,
    category: 'credential-harvest',
    difficulty: 'medium',
    senderName: '',
    senderEmail: '',
    subject: '',
    preview: '',
    date: 'Today',
    greeting: 'Hi,',
    bodyParagraphs: [''],
    links: [],
    attachments: [],
    redFlags: [],
    trustSignals: [],
    archetype: 'custom',
  };
}

export function AdminPanel() {
  const {
    customScenarios,
    addCustomScenario,
    updateCustomScenario,
    deleteCustomScenario,
    exportScenarios,
    importScenarios,
  } = useSimulator();

  const [editing, setEditing] = useState<EmailScenario | null>(null);
  const [importMsg, setImportMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openNew = () => setEditing(blankScenario());
  const openEdit = (s: EmailScenario) => setEditing({ ...s });

  const handleSave = () => {
    if (!editing) return;
    if (!editing.senderName || !editing.subject) return;
    const annotations = editing.isPhishing ? editing.redFlags : editing.trustSignals;
    const clean: EmailScenario = {
      ...editing,
      bodyParagraphs: editing.bodyParagraphs.filter((p) => p.trim().length > 0),
      redFlags: editing.isPhishing ? annotations : [],
      trustSignals: editing.isPhishing ? [] : annotations,
    };
    if (editing.id) {
      updateCustomScenario(clean);
    } else {
      addCustomScenario({ ...clean, id: genId('custom') });
    }
    setEditing(null);
  };

  const handleExport = () => {
    const blob = new Blob([exportScenarios()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'phishdesk-custom-scenarios.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = importScenarios(String(reader.result));
      setImportMsg(result.message);
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ash-50">Scenario Admin</h1>
          <p className="text-ash-400 mt-2 max-w-lg">
            Add your own phishing or legitimate email cases. Custom scenarios are saved in this
            browser and mixed into every new session.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleImportFile(e.target.files[0])}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 text-sm border border-ink-border text-ash-200 px-3.5 py-2 rounded-lg hover:bg-ink-raised transition-colors"
          >
            <Upload size={14} /> Import
          </button>
          <button
            onClick={handleExport}
            disabled={customScenarios.length === 0}
            className="inline-flex items-center gap-1.5 text-sm border border-ink-border text-ash-200 px-3.5 py-2 rounded-lg hover:bg-ink-raised transition-colors disabled:opacity-40"
          >
            <Download size={14} /> Export
          </button>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-1.5 text-sm bg-amber text-ink font-semibold px-3.5 py-2 rounded-lg hover:bg-amber-dim transition-colors"
          >
            <Plus size={14} /> New scenario
          </button>
        </div>
      </div>

      {importMsg && (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-ink-border bg-ink-surface px-4 py-2.5 text-sm text-ash-200">
          {importMsg}
          <button onClick={() => setImportMsg(null)} className="text-ash-600 hover:text-ash-50">
            <X size={14} />
          </button>
        </div>
      )}

      <div className="mt-8 space-y-3">
        {customScenarios.length === 0 && (
          <div className="rounded-xl border border-dashed border-ink-border px-5 py-10 text-center text-ash-600">
            No custom scenarios yet. Add one, or import a JSON pack a fellow trainer shared.
          </div>
        )}
        {customScenarios.map((s) => (
          <div
            key={s.id}
            className="rounded-xl border border-ink-border bg-ink-surface px-5 py-4 flex items-center gap-4"
          >
            <span
              className={cx(
                'grid place-items-center w-8 h-8 rounded-md shrink-0',
                s.isPhishing ? 'bg-danger/15 text-danger' : 'bg-safe/15 text-safe'
              )}
            >
              {s.isPhishing ? <ShieldAlert size={15} /> : <ShieldCheck size={15} />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-ash-50 truncate">{s.subject || 'Untitled scenario'}</p>
              <p className="text-xs text-ash-600 truncate mt-0.5">
                {s.senderName} · {CATEGORY_LABELS[s.category]} · {s.difficulty}
              </p>
            </div>
            <button
              onClick={() => openEdit(s)}
              className="text-ash-400 hover:text-ash-50 transition-colors p-1.5"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => deleteCustomScenario(s.id)}
              className="text-ash-400 hover:text-danger transition-colors p-1.5"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {editing && (
          <ScenarioForm
            scenario={editing}
            onChange={setEditing}
            onCancel={() => setEditing(null)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ScenarioForm({
  scenario,
  onChange,
  onCancel,
  onSave,
}: {
  scenario: EmailScenario;
  onChange: (s: EmailScenario) => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  const annotations = scenario.isPhishing ? scenario.redFlags : scenario.trustSignals;
  const setAnnotations = (next: RedFlag[]) =>
    onChange(
      scenario.isPhishing ? { ...scenario, redFlags: next } : { ...scenario, trustSignals: next }
    );

  const updateLink = (id: string, patch: Partial<EmailLink>) =>
    onChange({ ...scenario, links: scenario.links.map((l) => (l.id === id ? { ...l, ...patch } : l)) });

  const updateAttachment = (idx: number, patch: Partial<EmailAttachment>) =>
    onChange({
      ...scenario,
      attachments: scenario.attachments.map((a, i) => (i === idx ? { ...a, ...patch } : a)),
    });

  const updateAnnotation = (id: string, patch: Partial<RedFlag>) =>
    setAnnotations(annotations.map((a) => (a.id === id ? { ...a, ...patch } : a)));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-40 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 12, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-ink-surface border border-ink-border rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-thin"
      >
        <div className="sticky top-0 bg-ink-surface border-b border-ink-border px-5 py-4 flex items-center justify-between">
          <h2 className="font-display font-semibold text-ash-50">
            {scenario.id ? 'Edit scenario' : 'New scenario'}
          </h2>
          <button onClick={onCancel} className="text-ash-400 hover:text-ash-50">
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-5 space-y-5">
          {/* Type toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => onChange({ ...scenario, isPhishing: true })}
              className={cx(
                'flex-1 px-3 py-2.5 rounded-lg text-sm font-medium border',
                scenario.isPhishing ? 'bg-danger/15 border-danger/40 text-danger' : 'border-ink-border text-ash-400'
              )}
            >
              Phishing email
            </button>
            <button
              onClick={() => onChange({ ...scenario, isPhishing: false })}
              className={cx(
                'flex-1 px-3 py-2.5 rounded-lg text-sm font-medium border',
                !scenario.isPhishing ? 'bg-safe/15 border-safe/40 text-safe' : 'border-ink-border text-ash-400'
              )}
            >
              Legitimate email
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Category">
              <select
                value={scenario.category}
                onChange={(e) => onChange({ ...scenario, category: e.target.value as ScamCategory })}
                className="form-input"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {CATEGORY_LABELS[c]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Difficulty">
              <select
                value={scenario.difficulty}
                onChange={(e) => onChange({ ...scenario, difficulty: e.target.value as Difficulty })}
                className="form-input"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Sender name">
              <input
                value={scenario.senderName}
                onChange={(e) => onChange({ ...scenario, senderName: e.target.value })}
                className="form-input"
                placeholder="Meridian Bank Security"
              />
            </Field>
            <Field label="Sender email">
              <input
                value={scenario.senderEmail}
                onChange={(e) => onChange({ ...scenario, senderEmail: e.target.value })}
                className="form-input font-mono"
                placeholder="alerts@example-verify.com"
              />
            </Field>
          </div>

          <Field label="Subject line">
            <input
              value={scenario.subject}
              onChange={(e) => onChange({ ...scenario, subject: e.target.value })}
              className="form-input"
              placeholder="Urgent: verify your account"
            />
          </Field>

          <Field label="Inbox preview text">
            <input
              value={scenario.preview}
              onChange={(e) => onChange({ ...scenario, preview: e.target.value })}
              className="form-input"
            />
          </Field>

          <Field label="Greeting">
            <input
              value={scenario.greeting}
              onChange={(e) => onChange({ ...scenario, greeting: e.target.value })}
              className="form-input"
              placeholder="Dear Valued Customer,"
            />
          </Field>

          <Field label="Body (one paragraph per line)">
            <textarea
              value={scenario.bodyParagraphs.join('\n')}
              onChange={(e) => onChange({ ...scenario, bodyParagraphs: e.target.value.split('\n') })}
              className="form-input min-h-[110px]"
            />
          </Field>

          {/* Links */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-mono uppercase tracking-wider text-ash-600">Links</p>
              <button
                onClick={() =>
                  onChange({
                    ...scenario,
                    links: [
                      ...scenario.links,
                      { id: genId('link'), label: 'Click here', displayUrl: '', actualUrl: '', suspicious: scenario.isPhishing },
                    ],
                  })
                }
                className="text-xs text-amber inline-flex items-center gap-1 hover:underline"
              >
                <Plus size={12} /> Add link
              </button>
            </div>
            <div className="space-y-2">
              {scenario.links.map((link) => (
                <div key={link.id} className="rounded-lg border border-ink-border p-3 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      value={link.label}
                      onChange={(e) => updateLink(link.id, { label: e.target.value })}
                      placeholder="Link text"
                      className="form-input-sm"
                    />
                    <label className="flex items-center gap-1.5 text-xs text-ash-400">
                      <input
                        type="checkbox"
                        checked={link.suspicious}
                        onChange={(e) => updateLink(link.id, { suspicious: e.target.checked })}
                      />
                      Suspicious link
                    </label>
                  </div>
                  <input
                    value={link.displayUrl}
                    onChange={(e) => updateLink(link.id, { displayUrl: e.target.value })}
                    placeholder="Displayed URL (e.g. realsite.com/login)"
                    className="form-input-sm font-mono"
                  />
                  <input
                    value={link.actualUrl}
                    onChange={(e) => updateLink(link.id, { actualUrl: e.target.value })}
                    placeholder="Actual underlying URL"
                    className="form-input-sm font-mono"
                  />
                  <button
                    onClick={() => onChange({ ...scenario, links: scenario.links.filter((l) => l.id !== link.id) })}
                    className="text-xs text-ash-600 hover:text-danger"
                  >
                    Remove link
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Attachments */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-mono uppercase tracking-wider text-ash-600">Attachments</p>
              <button
                onClick={() =>
                  onChange({
                    ...scenario,
                    attachments: [...scenario.attachments, { name: 'document.pdf', size: '120 KB', suspicious: scenario.isPhishing }],
                  })
                }
                className="text-xs text-amber inline-flex items-center gap-1 hover:underline"
              >
                <Plus size={12} /> Add attachment
              </button>
            </div>
            <div className="space-y-2">
              {scenario.attachments.map((att, idx) => (
                <div key={idx} className="rounded-lg border border-ink-border p-3 grid grid-cols-[1fr_auto_auto_auto] gap-2 items-center">
                  <input
                    value={att.name}
                    onChange={(e) => updateAttachment(idx, { name: e.target.value })}
                    className="form-input-sm"
                  />
                  <input
                    value={att.size}
                    onChange={(e) => updateAttachment(idx, { size: e.target.value })}
                    className="form-input-sm w-20"
                  />
                  <label className="flex items-center gap-1 text-xs text-ash-400">
                    <input
                      type="checkbox"
                      checked={att.suspicious}
                      onChange={(e) => updateAttachment(idx, { suspicious: e.target.checked })}
                    />
                    Risky
                  </label>
                  <button
                    onClick={() =>
                      onChange({ ...scenario, attachments: scenario.attachments.filter((_, i) => i !== idx) })
                    }
                    className="text-ash-600 hover:text-danger"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Annotations */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-mono uppercase tracking-wider text-ash-600">
                {scenario.isPhishing ? 'Red flags' : 'Trust signals'}
              </p>
              <button
                onClick={() =>
                  setAnnotations([
                    ...annotations,
                    { id: genId('flag'), label: '', description: '', target: 'body' },
                  ])
                }
                className="text-xs text-amber inline-flex items-center gap-1 hover:underline"
              >
                <Plus size={12} /> Add note
              </button>
            </div>
            <div className="space-y-2">
              {annotations.map((flag) => (
                <div key={flag.id} className="rounded-lg border border-ink-border p-3 space-y-2">
                  <div className="grid grid-cols-[1fr_120px] gap-2">
                    <input
                      value={flag.label}
                      onChange={(e) => updateAnnotation(flag.id, { label: e.target.value })}
                      placeholder="Short label"
                      className="form-input-sm"
                    />
                    <select
                      value={flag.target}
                      onChange={(e) => updateAnnotation(flag.id, { target: e.target.value as RedFlag['target'] })}
                      className="form-input-sm"
                    >
                      {TARGETS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    value={flag.description}
                    onChange={(e) => updateAnnotation(flag.id, { description: e.target.value })}
                    placeholder="Explain why this matters, in plain language"
                    className="form-input-sm min-h-[60px]"
                  />
                  <button
                    onClick={() => setAnnotations(annotations.filter((a) => a.id !== flag.id))}
                    className="text-xs text-ash-600 hover:text-danger"
                  >
                    Remove note
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="sticky bottom-0 bg-ink-surface border-t border-ink-border px-5 py-4 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2.5 rounded-lg text-sm font-medium text-ash-200 hover:bg-ink-raised transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={!scenario.senderName || !scenario.subject}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold bg-amber text-ink hover:bg-amber-dim transition-colors disabled:opacity-40"
          >
            <Save size={14} /> Save scenario
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs text-ash-400 mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}

export function ResetCustomButton() {
  const { customScenarios, deleteCustomScenario } = useSimulator();
  if (customScenarios.length === 0) return null;
  return (
    <button
      onClick={() => customScenarios.forEach((s) => deleteCustomScenario(s.id))}
      className="inline-flex items-center gap-1.5 text-xs text-ash-600 hover:text-danger mt-3"
    >
      <RotateCcw size={12} /> Remove all custom scenarios
    </button>
  );
}
