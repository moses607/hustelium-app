// apps/quantum/app/dashboard/feedback.tsx

'use client';

import { useState } from 'react';
import { updatePredictiveProfile } from '@hustelium/core/lib/feedbackEngine';

export default function FeedbackPage() {
  const [profile, setProfile] = useState({
    userId: 'user-607',
    emotionHistory: [{ emotion: 'motivated', frequency: 3 }],
    feedbackLog: [],
    successRate: 0,
  });

  const [missionId, setMissionId] = useState('m1');
  const [feedback, setFeedback] = useState<'success' | 'failure' | 'neutral'>('success');

  const handleSubmit = () => {
    const updated = updatePredictiveProfile(profile, {
      missionId,
      feedback,
      timestamp: Date.now(),
    });
    setProfile(updated);
  };

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">🧠 Feedback IA – boucle d'apprentissage</h1>

      <input
        type="text"
        placeholder="ID de la mission"
        value={missionId}
        onChange={(e) => setMissionId(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <select
        value={feedback}
        onChange={(e) => setFeedback(e.target.value as any)}
        className="p-2 border rounded"
      >
        <option value="success">✅ Succès</option>
        <option value="failure">❌ Échec</option>
        <option value="neutral">🤔 Neutre</option>
      </select>

      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-indigo-600 text-white font-bold rounded"
      >
        Envoyer le feedback
      </button>

      <div className="mt-6 p-4 bg-gray-100 rounded">
        <p><strong>Taux de réussite :</strong> {profile.successRate}%</p>
        <p><strong>Feedbacks enregistrés :</strong> {profile.feedbackLog.length}</p>
      </div>
    </main>
  );
}
