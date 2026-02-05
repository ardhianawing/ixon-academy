import * as Tone from 'tone'

let audioInitialized = false

export async function initAudio() {
  if (audioInitialized) return
  await Tone.start()
  audioInitialized = true
}

export function playBumperSFX() {
  // Stage 1: Digital whoosh (rising noise sweep)
  const whooshNoise = new Tone.Noise('white').connect(
    new Tone.Filter({ frequency: 200, type: 'bandpass', Q: 2 }).connect(
      new Tone.Gain(0.15).toDestination()
    )
  )

  const whooshFilter = whooshNoise.connect(
    new Tone.AutoFilter({ frequency: 8, baseFrequency: 200, octaves: 6 }).toDestination()
  )

  // Stage 2: Tech hum (low sine)
  const hum = new Tone.Oscillator({
    frequency: 55,
    type: 'sine',
    volume: -18
  }).toDestination()

  // Stage 3: Impact hit (short bass thump)
  const impact = new Tone.MembraneSynth({
    pitchDecay: 0.05,
    octaves: 4,
    oscillator: { type: 'sine' },
    envelope: {
      attack: 0.001,
      decay: 0.4,
      sustain: 0,
      release: 0.4,
    },
    volume: -8
  }).toDestination()

  // Stage 4: Shimmer (high metallic tone)
  const shimmer = new Tone.MetalSynth({
    frequency: 800,
    envelope: {
      attack: 0.01,
      decay: 0.8,
      release: 0.5,
    },
    harmonicity: 5.1,
    modulationIndex: 16,
    resonance: 4000,
    octaves: 1.5,
    volume: -28
  }).toDestination()

  // Stage 5: Glitch crackle
  const crackle = new Tone.NoiseSynth({
    noise: { type: 'brown' },
    envelope: {
      attack: 0.001,
      decay: 0.08,
      sustain: 0,
      release: 0.02,
    },
    volume: -16
  }).toDestination()

  const reverb = new Tone.Reverb({ decay: 2.5, wet: 0.3 }).toDestination()
  impact.connect(reverb)
  shimmer.connect(reverb)

  const now = Tone.now()

  // Timeline:
  // 0.0s - Whoosh starts (rising sweep)
  whooshNoise.start(now).stop(now + 0.8)

  // 0.3s - Low hum fades in
  hum.start(now + 0.3).stop(now + 1.8)

  // 0.8s - Impact hit (logo fully revealed)
  impact.triggerAttackRelease('C1', '8n', now + 0.8)

  // 0.85s - Shimmer
  shimmer.triggerAttackRelease('16n', now + 0.85)

  // 1.2s - Glitch crackles for text reveal
  crackle.triggerAttackRelease('32n', now + 1.2)
  crackle.triggerAttackRelease('32n', now + 1.35)
  crackle.triggerAttackRelease('32n', now + 1.5)

  // Cleanup
  setTimeout(() => {
    whooshNoise.dispose()
    hum.dispose()
    impact.dispose()
    shimmer.dispose()
    crackle.dispose()
    reverb.dispose()
  }, 4000)
}

// Navigation click sound
export function playClickSFX() {
  const click = new Tone.MembraneSynth({
    pitchDecay: 0.01,
    octaves: 2,
    oscillator: { type: 'sine' },
    envelope: {
      attack: 0.001,
      decay: 0.05,
      sustain: 0,
      release: 0.05,
    },
    volume: -24
  }).toDestination()

  click.triggerAttackRelease('C4', '32n')
  setTimeout(() => click.dispose(), 500)
}

// Hover sound
export function playHoverSFX() {
  const hover = new Tone.Oscillator({
    frequency: 2000,
    type: 'sine',
    volume: -35
  }).toDestination()

  hover.start().stop(Tone.now() + 0.03)
  setTimeout(() => hover.dispose(), 300)
}
