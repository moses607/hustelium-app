// packages/core/lib/feedbackEngine.ts

export type Feedback = 'success' | 'failure' | 'neutral';

export interface MissionFeedback {
  missionId: string;
  feedback: Feedback;
  timestamp: number;
}

export interface EmotionPattern {
  emotion: string;
  frequency: number;
}

export interface PredictiveProfile {
  userId: string;
  emotionHistory: EmotionPattern[];
  feedbackLog: MissionFeedback[];
  successRate: number;
}

export function updatePredictiveProfile(
  profile: PredictiveProfile,
  newFeedback: MissionFeedback
): PredictiveProfile {
  const updatedLog = [...profile.feedbackLog, newFeedback];
  const total = updatedLog.length;
  const successCount = updatedLog.filter(f => f.feedback === 'success').length;
  const successRate = Math.round((successCount / total) * 100);

  return {
    ...profile,
    feedbackLog: updatedLog,
    successRate,
  };
}
