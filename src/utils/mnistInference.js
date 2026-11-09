/**
 * MNIST In-Browser ONNX Inference Service
 * 
 * Uses dynamic import of onnxruntime-web to avoid bundle bloat on initial page load.
 * Configures CDN wasm paths, runs single session initialization, and performs
 * numerically stable softmax inference over digits 0-9.
 */

let sessionInstance = null;
let sessionLoadingPromise = null;

/**
 * Numerically stable softmax implementation
 * 
 * @param {Float32Array|number[]} logits - Raw network output logits
 * @returns {number[]} Probabilities summing to 1.0
 */
export function softmax(logits) {
  let maxLogit = -Infinity;
  for (let i = 0; i < logits.length; i++) {
    if (logits[i] > maxLogit) {
      maxLogit = logits[i];
    }
  }

  let sum = 0;
  const exps = new Float32Array(logits.length);
  for (let i = 0; i < logits.length; i++) {
    const val = Math.exp(logits[i] - maxLogit);
    exps[i] = val;
    sum += val;
  }

  const probabilities = new Array(logits.length);
  for (let i = 0; i < logits.length; i++) {
    probabilities[i] = sum === 0 ? 0 : exps[i] / sum;
  }

  return probabilities;
}

/**
 * Lazy loads onnxruntime-web and initializes the MNIST ONNX session.
 * Caches the session promise so subsequent calls reuse the existing session.
 * 
 * @returns {Promise<{session: any, ort: any}>}
 */
export async function getInferenceSession() {
  if (sessionInstance) {
    return sessionInstance;
  }

  if (sessionLoadingPromise) {
    return sessionLoadingPromise;
  }

  sessionLoadingPromise = (async () => {
    // Dynamic import to keep initial bundle size lean
    const ort = await import('onnxruntime-web');

    // Configure CDN wasm binaries path so bundlers don't struggle with local wasm assets
    ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/';

    // Create session pointing to public/mnist-12.onnx
    const session = await ort.InferenceSession.create('/mnist-12.onnx', {
      executionProviders: ['wasm'],
    });

    sessionInstance = { session, ort };
    return sessionInstance;
  })();

  try {
    return await sessionLoadingPromise;
  } catch (err) {
    sessionLoadingPromise = null;
    sessionInstance = null;
    throw err;
  }
}

/**
 * Runs neural inference on a 784-length preprocessed Float32Array
 * 
 * @param {Float32Array} float32Data - Preprocessed 28x28 grayscale image
 * @returns {Promise<{probabilities: number[], topDigit: number, topConfidence: number, latencyMs: number}>}
 */
export async function runDigitInference(float32Data) {
  if (!float32Data || float32Data.length !== 784) {
    throw new Error('Invalid input shape. Expected Float32Array of 784 elements.');
  }

  const { session, ort } = await getInferenceSession();

  // Dynamically resolve input and output layer names (never hardcoded)
  const inputName = session.inputNames[0];
  const outputName = session.outputNames[0];

  const inputTensor = new ort.Tensor('float32', float32Data, [1, 1, 28, 28]);
  const feeds = { [inputName]: inputTensor };

  const startTime = performance.now();
  const results = await session.run(feeds);
  const latencyMs = Math.round((performance.now() - startTime) * 10) / 10;

  const outputTensor = results[outputName];
  const logits = outputTensor.data;
  const probabilities = softmax(logits);

  let topDigit = 0;
  let topConfidence = -1;

  for (let i = 0; i < probabilities.length; i++) {
    if (probabilities[i] > topConfidence) {
      topConfidence = probabilities[i];
      topDigit = i;
    }
  }

  return {
    probabilities,
    topDigit,
    topConfidence,
    latencyMs,
  };
}

