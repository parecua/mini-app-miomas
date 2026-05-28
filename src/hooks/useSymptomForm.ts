import { useState, FormEvent } from 'react';
import { BleedingLog } from '../types';

interface UseSymptomFormProps {
  initialBleed?: 'Moderado' | 'Abundante' | 'Muy Abundante' | 'Crítico';
  initialClots?: 'No' | 'Pequeños' | 'Grandes';
  initialPain?: number;
  initialEmotion?: string;
  onAddLog: (log: BleedingLog) => void;
  onSuccess?: () => void;
}

export function useSymptomForm({
  initialBleed = 'Moderado',
  initialClots = 'No',
  initialPain = 5,
  initialEmotion = 'Calma',
  onAddLog,
  onSuccess
}: UseSymptomFormProps) {
  const [bleed, setBleed] = useState<'Moderado' | 'Abundante' | 'Muy Abundante' | 'Crítico'>(initialBleed);
  const [clots, setClots] = useState<'No' | 'Pequeños' | 'Grandes'>(initialClots);
  const [pain, setPain] = useState<number>(initialPain);
  const [emotion, setEmotion] = useState<string>(initialEmotion);
  const [notes, setNotes] = useState<string>('');

  const resetForm = () => {
    setBleed(initialBleed);
    setClots(initialClots);
    setPain(initialPain);
    setEmotion(initialEmotion);
    setNotes('');
  };

  const handleSubmit = (e: FormEvent, defaultNotesFallback: string) => {
    e.preventDefault();
    const newEntry: BleedingLog = {
      id: String(Date.now()),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      bleedingLevel: bleed,
      clots: clots,
      painLevel: pain,
      emotionalState: emotion,
      notes: notes || defaultNotesFallback
    };
    onAddLog(newEntry);
    resetForm();
    if (onSuccess) {
      onSuccess();
    }
  };

  return {
    bleed,
    setBleed,
    clots,
    setClots,
    pain,
    setPain,
    emotion,
    setEmotion,
    notes,
    setNotes,
    resetForm,
    handleSubmit
  };
}
