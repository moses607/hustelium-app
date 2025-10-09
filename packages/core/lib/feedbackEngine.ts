// ------------------------ Fragment 3/5 ------------------------
// Fonction et types relatifs au calcul du score émotionnel pondéré.

/**
 * Représente une émotion détectée / fournie par le client.
 * - label : nom de l'émotion (ex: "joy", "frustration", "confusion")
 * - score : valeur numérique (par défaut on accepte 0..1 ou -1..1)
 * - confidence : confiance de la détection 0..1 (facultatif, défaut 1)
 * - intensity : intensité relative 0..+inf (facultatif, défaut 1)
 * - timestamp : epoch ms de la détection (facultatif, permet prise en compte de la récence)
 */
export type Emotion = {
  label: string;
  score: number;
  confidence?: number;
  intensity?: number;
  timestamp?: number;
};

/**
 * Options pour calculateEmotionWeight
 */
export interface EmotionWeightOptions {
  /**
   * Echelle appliquée aux valeurs d'intensité (par défaut 1)
   */
  intensityScale?: number;
  /**
   * Fenêtre (ms) pour le calcul du facteur de décallage temporel (recency).
   * Par défaut 24h.
   */
  recencyDecayMs?: number;
  /**
   * Permet de normaliser des scores fournis en 0..1 vers -1..1 (défaut true).
   * Si false, on considère que les scores sont déjà dans -1..1.
   */
  normalize01ToSigned?: boolean;
  /**
   * Priorités par label d'émotion (poids multiplicatif par émotion).
   * ex: { frustration: 1.5, joy: 0.8 }
   */
  emotionPriorities?: Record<string, number>;
  /**
   * bornes de sortie (par défaut -1..1)
   */
  clampMin?: number;
  clampMax?: number;
  /**
   * timestamp de référence (par défaut Date.now())
   */
  nowTs?: number;
}

/**
 * calculateEmotionWeight
 *
 * Calcule un score émotionnel pondéré à partir d'une liste d'émotions.
 * Chaque émotion peut avoir:
 *  - un score (ex: 0..1 ou -1..1)
 *  - une confidence (facultatif)
 *  - une intensity (facultatif)
 *  - une timestamp (facultatif, pour recency)
 *
 * La fonction applique:
 *  1) Normalisation des scores si nécessaire (0..1 -> -1..1)
 *  2) Pondération par confidence, intensity, priorité d'émotion
 *  3) Facteur de décroissance temporel (recency)
 *  4) Moyenne pondérée finale
 *  5) Clampage dans les bornes demandées
 *
 * @param emotions - Liste des émotions à traiter
 * @param options - Options de calcul
 * @returns Score émotionnel pondéré final (par défaut entre -1 et 1)
 */
export function calculateEmotionWeight(
  emotions: Emotion[],
  options: EmotionWeightOptions = {}
): number {
  if (!emotions || emotions.length === 0) {
    return 0;
  }

  // Valeurs par défaut
  const {
    intensityScale = 1,
    recencyDecayMs = 24 * 60 * 60 * 1000, // 24h
    normalize01ToSigned = true,
    emotionPriorities = {},
    clampMin = -1,
    clampMax = 1,
    nowTs = Date.now(),
  } = options;

  let weightedSum = 0;
  let totalWeight = 0;

  for (const emotion of emotions) {
    let { score, confidence = 1, intensity = 1, timestamp, label } = emotion;

    // 1) Normalisation du score si nécessaire
    if (normalize01ToSigned && score >= 0 && score <= 1) {
      // Convertir [0..1] en [-1..1]
      score = score * 2 - 1;
    }

    // 2) Pondération par confidence
    let emotionWeight = confidence;

    // 3) Pondération par intensity (avec échelle)
    emotionWeight *= intensity * intensityScale;

    // 4) Pondération par priorité d'émotion
    const priority = emotionPriorities[label] ?? 1;
    emotionWeight *= priority;

    // 5) Facteur de récence (décroissance exponentielle)
    if (timestamp !== undefined && recencyDecayMs > 0) {
      const age = nowTs - timestamp;
      // Décroissance exponentielle : e^(-age / decayWindow)
      const recencyFactor = Math.exp(-age / recencyDecayMs);
      emotionWeight *= recencyFactor;
    }

    // Accumuler
    weightedSum += score * emotionWeight;
    totalWeight += emotionWeight;
  }

  // 6) Calcul de la moyenne pondérée
  const result = totalWeight > 0 ? weightedSum / totalWeight : 0;

  // 7) Clampage dans les bornes
  return Math.max(clampMin, Math.min(clampMax, result));
}
