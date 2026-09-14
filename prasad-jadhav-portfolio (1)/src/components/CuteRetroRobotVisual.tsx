import React from 'react';
import { motion } from 'motion/react';

export type RobotMode = 'stand' | 'walk' | 'swim' | 'pocket-toy' | 'sit' | 'jump' | 'adjust-antenna' | 'check-tablet' | 'spin';
export type ToyType = 'duck' | 'whale' | 'star' | 'joystick';

interface CuteRetroRobotVisualProps {
  eyeExpression?: 'normal' | 'happy' | 'blink' | 'wink';
  mode?: RobotMode;
  toyType?: ToyType;
  direction?: number; // 1 for right, -1 for left
  lookOffset?: { x: number; y: number };
  isWaving?: boolean;
  scale?: number;
}

export const CuteRetroRobotVisual: React.FC<CuteRetroRobotVisualProps> = ({
  eyeExpression = 'normal',
  mode = 'stand',
  toyType = 'duck',
  direction = 1,
  lookOffset = { x: 0, y: 0 },
  isWaving = false,
  scale = 1
}) => {
  const isWalking = mode === 'walk';
  const isSwimming = mode === 'swim';
  const isToy = mode === 'pocket-toy';
  const isSitting = mode === 'sit';
  const isJumping = mode === 'jump';
  const isAdjustAntenna = mode === 'adjust-antenna';
  const isCheckTablet = mode === 'check-tablet';
  const isSpinning = mode === 'spin';

  return (
    <div 
      className="relative select-none pointer-events-none"
      style={{ 
        width: 150 * scale, 
        height: 190 * scale,
        perspective: 900
      }}
    >
      {/* 3D Motion Wrapper */}
      <motion.div
        animate={
          isSpinning
            ? {
                rotateY: [0, 360],
                rotateZ: [0, 2, -2, 0],
                y: [-4, 0, -4]
              }
            : isSitting
            ? {
                // Calm, cute relaxed posture while sitting
                rotateZ: [-1, 1, -1],
                rotateY: direction === 1 ? 6 : -6,
                y: [0, -1.5, 0]
              }
            : isJumping
            ? {
                rotateZ: direction === 1 ? [0, 4, -2] : [0, -4, 2],
                rotateX: [0, 8, 0],
                rotateY: direction === 1 ? 10 : -10,
                y: [-6, 2, -6]
              }
            : isSwimming
            ? {
                rotateZ: direction === 1 ? [15, 25, 15] : [-15, -25, -15],
                rotateX: [6, -4, 6],
                rotateY: direction === 1 ? 8 : -8,
                y: [-3, 3, -3]
              }
            : isToy
            ? {
                rotateZ: [0, 1.5, -1.5, 0],
                rotateY: direction === 1 ? 6 : -6,
                y: [0, -1.5, 0]
              }
            : isAdjustAntenna
            ? {
                // Curious tilt with hand reaching antenna
                rotateZ: direction === 1 ? [-2, 1, -2] : [2, -1, 2],
                rotateY: direction === 1 ? 8 : -8,
                y: [0, -1, 0]
              }
            : isCheckTablet
            ? {
                // Leaning forward attentively looking down at tablet
                rotateX: [4, 8, 4],
                rotateZ: [0, 0.5, 0],
                rotateY: direction === 1 ? 4 : -4,
                y: [0, 1, 0]
              }
            : isWalking
            ? {
                // Normal, calm, natural walking tilt
                rotateZ: direction === 1 ? [-1, 1, -1] : [1, -1, 1],
                rotateY: direction === 1 ? 6 : -6,
                y: [-1.5, 0.5, -1.5]
              }
            : {
                rotateZ: [0, 0.5, 0],
                rotateY: direction === 1 ? 4 : -4,
                y: [0, -1, 0]
              }
        }
        transition={{
          duration: isSpinning ? 0.9 : isSitting ? 2.5 : isJumping ? 1.2 : isSwimming ? 2.8 : isAdjustAntenna ? 2.2 : isCheckTablet ? 2.4 : isWalking ? 1.3 : 3,
          repeat: isSpinning ? 1 : Infinity,
          ease: isSpinning ? [0.34, 1.3, 0.64, 1] : 'easeInOut'
        }}
        className="w-full h-full relative"
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: isSitting ? '50% 70%' : isSwimming ? '50% 50%' : '50% 85%'
        }}
      >
        <svg
          viewBox="0 0 150 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible drop-shadow-[0_16px_32px_rgba(0,0,0,0.5)]"
          style={{
            transform: `scaleX(${direction})`,
            transition: 'transform 0.35s ease'
          }}
        >
          <defs>
            {/* 3D Helmet Red Gradient */}
            <radialGradient id="helmet3DGrad" cx="45%" cy="30%" r="65%" fx="35%" fy="25%">
              <stop offset="0%" stopColor="#ff8a8a" />
              <stop offset="35%" stopColor="#ef4444" />
              <stop offset="75%" stopColor="#b91c1c" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </radialGradient>

            {/* Helmet Overhang Visor 3D Gradient */}
            <linearGradient id="visorBrim3D" x1="20" y1="20" x2="120" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fca5a5" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="85%" stopColor="#991b1b" />
              <stop offset="100%" stopColor="#450a0a" />
            </linearGradient>

            {/* Dark Visor Cavity Shadow */}
            <radialGradient id="visorCavity" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="80%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            {/* 3D Glowing Screen Cyan Gradient */}
            <radialGradient id="screen3DGrad" cx="50%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="40%" stopColor="#22d3ee" />
              <stop offset="75%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#155e75" />
            </radialGradient>

            {/* 3D Suit White Body Gradient */}
            <radialGradient id="suit3DGrad" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#f1f5f9" />
              <stop offset="85%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </radialGradient>

            {/* 3D Navy Pants Gradient */}
            <linearGradient id="pants3DGrad" x1="45" y1="135" x2="95" y2="175" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#312e81" />
              <stop offset="45%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* CUTE BIG BLUE SHOES GRADIENTS (Requested: "cute blue shoes lagan thoade big size") */}
            <radialGradient id="blueShoes3D" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="35%" stopColor="#3b82f6" />
              <stop offset="70%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </radialGradient>

            <linearGradient id="blueShoesSole" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>

            {/* Duck Toy Gradients */}
            <radialGradient id="duckGrad" cx="40%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="40%" stopColor="#facc15" />
              <stop offset="90%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </radialGradient>

            {/* Whale Toy Gradient */}
            <radialGradient id="whaleGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </radialGradient>

            {/* Star Toy Gradient */}
            <radialGradient id="starGrad" cx="50%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#fde047" />
              <stop offset="80%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#b45309" />
            </radialGradient>

            {/* Glass Highlight Gradient */}
            <linearGradient id="glassShine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="30%" stopColor="#ffffff" stopOpacity="0.15" />
              <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Eye Glow Filter */}
            <filter id="eye3DGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Scanlines Filter */}
            <pattern id="scanlines3D" width="100" height="4" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="100" y2="0" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
              <line x1="0" y1="2" x2="100" y2="2" stroke="#000000" strokeWidth="1" strokeOpacity="0.25" />
            </pattern>

            {/* Virtual Data Tablet Glow Filter */}
            <filter id="tabletGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#06b6d4" floodOpacity="0.75" />
            </filter>

            {/* Holographic Projection Beam Gradient */}
            <linearGradient id="holoBeamGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.45" />
              <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* ------------------------------------------------------------- */}
          {/* DYNAMIC 3D SHADOW ON GROUND (Hides/scales when jumping/sitting) */}
          {/* ------------------------------------------------------------- */}
          <motion.ellipse
            cx="75"
            cy="184"
            rx={isJumping ? 18 : isSitting ? 24 : isSwimming ? 20 : isWalking ? 30 : 38}
            ry={isJumping ? 3 : isSitting ? 5 : isSwimming ? 4 : 7}
            fill="#000000"
            animate={{
              scaleX: isJumping ? [0.6, 0.8, 0.6] : isSitting ? [0.85, 0.95, 0.85] : isSwimming ? [0.7, 0.9, 0.7] : isWalking ? [0.95, 1.05, 0.95] : [1, 1.03, 1],
              opacity: isJumping ? 0.2 : isSitting ? 0.25 : isSwimming ? 0.2 : isWalking ? 0.3 : 0.35,
              y: isJumping ? [6, 12, 6] : isSitting ? 4 : 0
            }}
            transition={{ duration: isSitting ? 2.5 : isJumping ? 1.2 : isSwimming ? 2.8 : isWalking ? 1.3 : 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* ------------------------------------------------------------- */}
          {/* RETRO ANTENNA (Springy with 3D Red Ball)                      */}
          {/* ------------------------------------------------------------- */}
          <motion.g
            animate={
              isAdjustAntenna
                ? {
                    // Playful, springy wiggle as right hand tunes the antenna
                    rotate: [-14, 18, -10, 14, -6, 6, 0]
                  }
                : {
                    rotate: isSitting ? [-2, 3, -2] : isJumping ? [4, -4, 4] : isSwimming ? [-3, 3, -3] : isWalking ? [-2, 2, -2] : [-1, 1, -1]
                  }
            }
            transition={{ 
              duration: isAdjustAntenna ? 1.6 : isSitting ? 2.5 : isJumping ? 1.2 : isSwimming ? 2.5 : isWalking ? 1.3 : 3, 
              repeat: isAdjustAntenna ? 2 : Infinity, 
              ease: 'easeInOut' 
            }}
            style={{ originX: '105px', originY: '48px' }}
          >
            <path d="M 103 46 L 122 24 L 129 28 L 110 50 Z" fill="#991b1b" />
            <path d="M 115 31 L 123 22 L 127 25 L 119 34 Z" fill="#ffffff" />
            <circle cx="126" cy="23" r="6.5" fill="url(#helmet3DGrad)" stroke="#7f1d1d" strokeWidth="0.8" />
            <circle cx="124.5" cy="21" r="2.2" fill="#ffffff" fillOpacity="0.8" />

            {/* Radio frequency signal wave rings when adjusting antenna */}
            {isAdjustAntenna && (
              <motion.g>
                <motion.circle
                  cx="126"
                  cy="23"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="1.5"
                  animate={{ r: [6, 20], opacity: [0.95, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.circle
                  cx="126"
                  cy="23"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                  animate={{ r: [6, 28], opacity: [0.85, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'easeOut', delay: 0.35 }}
                />
                <motion.text
                  x="133"
                  y="18"
                  fontSize="10"
                  fill="#facc15"
                  animate={{ scale: [0.75, 1.3, 0.75], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  ✦
                </motion.text>
              </motion.g>
            )}
          </motion.g>

          {/* ------------------------------------------------------------- */}
          {/* LEGS & CUTE BIG BLUE SHOES                                     */}
          {/* Crucial fix: Legs rise deeply inside torso (y=132 to 146)       */}
          {/* so legs NEVER separate from torso during swings or jumps!      */}
          {/* ------------------------------------------------------------- */}
          <g id="legs">
            {/* Seamless pelvic anchor plate behind suit */}
            <ellipse cx="75" cy="148" rx="24" ry="10" fill="url(#pants3DGrad)" />

            {/* Left Leg (Dark Navy Pants + Big Cute Blue Shoe) */}
            <motion.g
              animate={
                isSitting
                  ? { 
                      // Gentle, cute dangling shoes while sitting
                      rotate: [-5, 6, -5],
                      y: [0, -1, 0]
                    }
                  : isJumping
                  ? { rotate: [-5, 7, -5], y: [-3, -1, -3] }
                  : isSwimming
                  ? { rotate: [-8, 8, -8], y: [-1, 1, -1] }
                  : isWalking
                  ? { rotate: [-7, 7, -7], y: [-1, 1, -1] }
                  : { rotate: 0, y: 0 }
              }
              transition={{ 
                duration: isSitting ? 2.5 : isJumping ? 1.2 : isSwimming ? 2 : isWalking ? 1.3 : 3, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              style={{ originX: '58px', originY: '144px' }}
            >
              {/* Dark Navy Pants (Upper portion extends up to y=134 to guarantee 0 separation) */}
              <path
                d="M 48 134 Q 45 156 42 167 L 62 168 Q 64 154 62 134 Z"
                fill="url(#pants3DGrad)"
              />
              <path d="M 43 158 Q 53 162 61 159" stroke="#1e1b4b" strokeWidth="1.5" fill="none" opacity="0.6" />

              {/* 👟 CUTE BIG BLUE SHOE (Left Shoe - Chunky Sneaker Aesthetic) */}
              <g id="left-blue-shoe">
                {/* Big Blue Sneaker Upper */}
                <path
                  d="M 37 167 C 37 162 42 160 52 160 L 68 163 C 73 164 74 171 70 176 L 43 176 C 38 176 37 172 37 167 Z"
                  fill="url(#blueShoes3D)"
                  stroke="#1e3a8a"
                  strokeWidth="1.2"
                />

                {/* Chunky White Sneaker Sole (Big bumper base) */}
                <path
                  d="M 35 174 L 71 174 C 73 174 74 176 73 179 L 71 182 C 70 183 40 183 36 182 C 34 180 34 174 35 174 Z"
                  fill="url(#blueShoesSole)"
                  stroke="#94a3b8"
                  strokeWidth="0.8"
                />
                {/* Cyan Racing Accent Stripe on Sole */}
                <line x1="38" y1="178" x2="70" y2="178" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />

                {/* White Rounded Toe Cap */}
                <path
                  d="M 64 164 C 69 165 72 168 70 174 L 62 174 Q 63 166 64 164 Z"
                  fill="#f8fafc"
                  stroke="#cbd5e1"
                  strokeWidth="0.8"
                />

                {/* Sneaker White Laces */}
                <line x1="47" y1="164" x2="55" y2="164" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />
                <line x1="48" y1="168" x2="56" y2="168" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />

                {/* Top Gloss Specular Highlight */}
                <ellipse cx="58" cy="164" rx="4" ry="1.8" fill="#ffffff" fillOpacity="0.65" />
              </g>
            </motion.g>

            {/* Right Leg (Dark Navy Pants + Big Cute Blue Shoe) */}
            <motion.g
              animate={
                isSitting
                  ? { 
                      // Gentle dangling opposite
                      rotate: [6, -5, 6],
                      y: [0, -1, 0]
                    }
                  : isJumping
                  ? { rotate: [7, -5, 7], y: [-3, -1, -3] }
                  : isSwimming
                  ? { rotate: [8, -8, 8], y: [1, -1, 1] }
                  : isWalking
                  ? { rotate: [7, -7, 7], y: [1, -1, 1] }
                  : { rotate: 0, y: 0 }
              }
              transition={{ 
                duration: isSitting ? 2.5 : isJumping ? 1.2 : isSwimming ? 2 : isWalking ? 1.3 : 3, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              style={{ originX: '88px', originY: '144px' }}
            >
              {/* Dark Navy Pants (Upper portion extends deep into torso) */}
              <path
                d="M 82 134 Q 85 156 87 167 L 107 168 Q 103 154 98 134 Z"
                fill="url(#pants3DGrad)"
              />
              <path d="M 87 158 Q 97 162 104 159" stroke="#1e1b4b" strokeWidth="1.5" fill="none" opacity="0.6" />

              {/* 👟 CUTE BIG BLUE SHOE (Right Shoe - Chunky Sneaker Aesthetic) */}
              <g id="right-blue-shoe">
                {/* Big Blue Sneaker Upper */}
                <path
                  d="M 82 167 C 82 162 87 160 97 160 L 113 163 C 118 164 119 171 115 176 L 88 176 C 83 176 82 172 82 167 Z"
                  fill="url(#blueShoes3D)"
                  stroke="#1e3a8a"
                  strokeWidth="1.2"
                />

                {/* Chunky White Sneaker Sole */}
                <path
                  d="M 80 174 L 116 174 C 118 174 119 176 118 179 L 116 182 C 115 183 85 183 81 182 C 79 180 79 174 80 174 Z"
                  fill="url(#blueShoesSole)"
                  stroke="#94a3b8"
                  strokeWidth="0.8"
                />
                {/* Cyan Racing Accent Stripe on Sole */}
                <line x1="83" y1="178" x2="115" y2="178" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />

                {/* White Rounded Toe Cap */}
                <path
                  d="M 109 164 C 114 165 117 168 115 174 L 107 174 Q 108 166 109 164 Z"
                  fill="#f8fafc"
                  stroke="#cbd5e1"
                  strokeWidth="0.8"
                />

                {/* Sneaker White Laces */}
                <line x1="92" y1="164" x2="100" y2="164" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />
                <line x1="93" y1="168" x2="101" y2="168" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />

                {/* Top Gloss Specular Highlight */}
                <ellipse cx="103" cy="164" rx="4" ry="1.8" fill="#ffffff" fillOpacity="0.65" />
              </g>
            </motion.g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* BODY & ASTRONAUT SUIT (With 3D shading & Pocket)              */}
          {/* ------------------------------------------------------------- */}
          <motion.g
            animate={{
              y: isSitting ? [0, -1, 0] : isJumping ? [-3, 1, -3] : isSwimming ? [-2, 2, -2] : isWalking ? [-1, 0.5, -1] : [0, -1, 0]
            }}
            transition={{ duration: isSitting ? 2.5 : isJumping ? 1.2 : isSwimming ? 2 : isWalking ? 1.3 : 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Main Suit Torso (3D Pear shape with firm base over legs) */}
            <path
              d="M 52 106 C 42 118 44 142 50 152 C 58 160 90 160 98 152 C 104 142 106 118 96 106 Z"
              fill="url(#suit3DGrad)"
              stroke="#94a3b8"
              strokeWidth="1.5"
            />

            {/* Suit 3D Rim Light Highlight */}
            <path
              d="M 52 112 C 48 122 49 138 53 145"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeOpacity="0.8"
            />

            {/* Red Chest Badge / Mission Patch */}
            <rect x="84" y="122" width="13" height="6.5" rx="2" fill="#ef4444" stroke="#991b1b" strokeWidth="0.5" />
            <line x1="86" y1="125" x2="95" y2="125" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />

            {/* POCKET ON CHEST/BELLY (Where toys come from!) */}
            <g id="astronaut-pocket">
              <path
                d="M 58 132 L 74 132 Q 74 146 66 148 Q 58 146 58 132 Z"
                fill="#e2e8f0"
                stroke="#94a3b8"
                strokeWidth="1.2"
              />
              <line x1="60" y1="133" x2="72" y2="133" stroke="#cbd5e1" strokeWidth="1.5" />
              <rect x="63" y="131" width="6" height="3" rx="1" fill="#ef4444" />
            </g>

            {/* Yellow Neck Collar Ring */}
            <path
              d="M 54 102 Q 74 109 94 102 L 95 108 Q 74 115 53 108 Z"
              fill="#facc15"
              stroke="#ca8a04"
              strokeWidth="1.5"
            />
            {/* Metal Clasp / Tie */}
            <polygon points="72,109 76,109 78,117 74,120 70,117" fill="#334155" stroke="#0f172a" strokeWidth="1" />
          </motion.g>

          {/* ------------------------------------------------------------- */}
          {/* ARMS (Crucial fix: Anchored at shoulder seam x=48/98, y=112) */}
          {/* Hands and arms NEVER separate from body!                       */}
          {/* ------------------------------------------------------------- */}
          {/* Left Arm */}
          <motion.g
            animate={
              isSitting
                ? {
                    // Resting hand comfortably on thigh or gentle sway
                    rotate: [-4, 6, -4],
                    y: [0, 1, 0]
                  }
                : isJumping
                ? {
                    rotate: [-15, -20, -15],
                    y: [-2, -4, -2]
                  }
                : isToy
                ? {
                    rotate: [-8, -25, -40, -40, -8],
                    y: [0, 4, -6, -6, 0]
                  }
                : isCheckTablet
                ? {
                    // Holding the left edge of the virtual data tablet
                    rotate: [-38, -43, -38],
                    y: [-3, -5, -3]
                  }
                : isSwimming
                ? {
                    rotate: [-15, 15, -15],
                    y: [-2, 2, -2]
                  }
                : isWaving
                ? { rotate: [-10, 10, -10] }
                : isWalking
                ? { rotate: [6, -6, 6] }
                : { rotate: [0, 2, 0] }
            }
            transition={{
              duration: isSitting ? 2.5 : isJumping ? 1.2 : isToy ? 3.5 : isCheckTablet ? 1.8 : isSwimming ? 2 : isWalking ? 1.3 : 3,
              repeat: isToy ? 0 : Infinity,
              ease: 'easeInOut'
            }}
            style={{ originX: '48px', originY: '112px' }}
          >
            {/* Rounded Shoulder Joint (anchors inside the white suit) */}
            <circle cx="48" cy="112" r="7" fill="url(#suit3DGrad)" stroke="#94a3b8" strokeWidth="0.8" />
            {/* Sleeve */}
            <path d="M 48 108 Q 38 120 38 132 L 46 132 Q 49 122 52 110 Z" fill="url(#suit3DGrad)" stroke="#cbd5e1" strokeWidth="1" />
            {/* Red Stripe */}
            <path d="M 39 122 L 48 122 L 47 126 L 39 126 Z" fill="#ef4444" />
            {/* Glove */}
            <circle cx="41" cy="135" r="5.5" fill="#1e293b" />
            <circle cx="40" cy="134" r="2" fill="#475569" />

            {/* Toy presentation when in pocket-toy mode */}
            {isToy && (
              <motion.g
                initial={{ opacity: 0, scale: 0.1, y: 15 }}
                animate={{ opacity: 1, scale: [0.2, 1.2, 1], y: [-5, -24, -20] }}
                exit={{ opacity: 0, scale: 0.2 }}
                transition={{ duration: 1.2, times: [0, 0.7, 1], delay: 0.6 }}
                style={{ originX: '41px', originY: '135px' }}
              >
                {/* 1. RUBBER DUCK TOY 🐥 */}
                {toyType === 'duck' && (
                  <g transform="translate(18, 90)">
                    <path
                      d="M 16 28 C 10 28 8 36 12 40 C 16 44 28 44 32 38 C 34 35 32 28 26 28 Z"
                      fill="url(#duckGrad)"
                      stroke="#ca8a04"
                      strokeWidth="1"
                    />
                    <circle cx="27" cy="23" r="6" fill="url(#duckGrad)" stroke="#ca8a04" strokeWidth="0.8" />
                    <path d="M 32 23 L 37 25 L 32 27 Z" fill="#f97316" stroke="#c2410c" strokeWidth="0.5" />
                    <circle cx="28" cy="22" r="1" fill="#0f172a" />
                    <circle cx="26" cy="21" r="1.5" fill="#ffffff" fillOpacity="0.8" />
                  </g>
                )}

                {/* 2. DOCKER BLUE WHALE TOY 🐳 */}
                {toyType === 'whale' && (
                  <g transform="translate(16, 92)">
                    <path
                      d="M 12 28 C 8 28 6 36 12 38 C 18 40 30 39 34 33 C 35 30 33 26 26 26 Z"
                      fill="url(#whaleGrad)"
                      stroke="#1e40af"
                      strokeWidth="1"
                    />
                    <path d="M 12 33 L 6 30 L 7 38 Z" fill="url(#whaleGrad)" />
                    <path d="M 24 25 C 24 20 22 18 20 18 M 24 25 C 26 20 29 18 31 18" stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="28" cy="29" r="1" fill="#ffffff" />
                  </g>
                )}

                {/* 3. GOLDEN STAR TOY ⭐ */}
                {toyType === 'star' && (
                  <g transform="translate(24, 94)">
                    <motion.polygon
                      points="18,16 22,25 31,25 24,31 27,40 18,34 9,40 12,31 5,25 14,25"
                      fill="url(#starGrad)"
                      stroke="#b45309"
                      strokeWidth="1"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                      style={{ originX: '18px', originY: '28px' }}
                    />
                  </g>
                )}

                {/* 4. RETRO JOYSTICK TOY 🎮 */}
                {toyType === 'joystick' && (
                  <g transform="translate(22, 98)">
                    <rect x="10" y="24" width="22" height="14" rx="4" fill="#334155" stroke="#0f172a" strokeWidth="1" />
                    <line x1="16" y1="24" x2="16" y2="18" stroke="#64748b" strokeWidth="2.5" />
                    <circle cx="16" cy="17" r="3.5" fill="#ef4444" stroke="#991b1b" strokeWidth="0.8" />
                    <circle cx="25" cy="28" r="2" fill="#facc15" />
                    <circle cx="29" cy="31" r="2" fill="#22c55e" />
                  </g>
                )}

                {/* Sparkles */}
                <motion.g
                  animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <circle cx="20" cy="115" r="2" fill="#fde047" />
                  <circle cx="58" cy="105" r="2.5" fill="#67e8f9" />
                  <circle cx="48" cy="135" r="1.5" fill="#f43f5e" />
                </motion.g>
              </motion.g>
            )}
          </motion.g>

          {/* Right Arm */}
          <motion.g
            animate={
              isSitting
                ? {
                    // Gentle, cute relaxed hand sway while sitting on the word
                    rotate: [-6, 8, -6],
                    y: [-1, 1, -1]
                  }
                : isJumping
                ? {
                    rotate: [15, 20, 15],
                    y: [-2, -4, -2]
                  }
                : isAdjustAntenna
                ? {
                    // Reaching up over head to tune/touch the antenna!
                    rotate: [-145, -154, -145],
                    y: [-2, -5, -2]
                  }
                : isCheckTablet
                ? {
                    // Holding right side of tablet and tapping the screen
                    rotate: [34, 42, 32, 40],
                    y: [-2, -5, -2]
                  }
                : isSwimming
                ? {
                    rotate: [15, -15, 15],
                    y: [2, -2, 2]
                  }
                : isWalking
                ? { rotate: [-6, 6, -6] }
                : { rotate: [0, -2, 0] }
            }
            transition={{ 
              duration: isSitting ? 2.5 : isJumping ? 1.2 : isAdjustAntenna ? 1.6 : isCheckTablet ? 1.5 : isSwimming ? 2 : isWalking ? 1.3 : 3, 
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{ originX: '98px', originY: '112px' }}
          >
            {/* Rounded Shoulder Joint (anchors seamlessly inside suit) */}
            <circle cx="98" cy="112" r="7" fill="url(#suit3DGrad)" stroke="#94a3b8" strokeWidth="0.8" />
            {/* Sleeve */}
            <path d="M 98 108 Q 107 120 107 132 L 99 132 Q 96 122 93 110 Z" fill="url(#suit3DGrad)" stroke="#cbd5e1" strokeWidth="1" />
            {/* Red Stripe */}
            <path d="M 100 122 L 108 122 L 108 126 L 100 126 Z" fill="#ef4444" />
            {/* Glove */}
            <circle cx="104" cy="135" r="5.5" fill="#1e293b" />
            <circle cx="105" cy="134" r="2" fill="#475569" />
          </motion.g>

          {/* ------------------------------------------------------------- */}
          {/* VIRTUAL DATA TABLET (Glows & scans when checking tablet)     */}
          {/* ------------------------------------------------------------- */}
          {isCheckTablet && (
            <motion.g
              initial={{ opacity: 0, scale: 0.3, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.3, y: 12 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              {/* Holographic Projection Beam emitting upwards towards face */}
              <polygon
                points="52,106 96,106 104,76 44,76"
                fill="url(#holoBeamGrad)"
              />

              {/* Tablet Outer Shell with glowing cyan border */}
              <rect
                x="49"
                y="104"
                width="50"
                height="35"
                rx="6"
                fill="#090d16"
                stroke="#06b6d4"
                strokeWidth="1.2"
                filter="url(#tabletGlow)"
              />

              {/* Inner Screen */}
              <rect
                x="52"
                y="107"
                width="44"
                height="29"
                rx="3.5"
                fill="#02141f"
              />

              {/* Header bar */}
              <rect x="52" y="107" width="44" height="6.5" rx="2" fill="#082f49" />
              <text x="55" y="112" fill="#38bdf8" fontSize="4.2" fontWeight="bold" fontFamily="monospace">
                SYS-PAD 3000
              </text>
              {/* Wi-Fi & Battery */}
              <rect x="86" y="109" width="7" height="3" rx="0.8" fill="#22c55e" />
              <circle cx="82" cy="110.5" r="1.2" fill="#38bdf8" />

              {/* Animated Telemetry Sparkline */}
              <motion.path
                d="M 55 120 Q 61 115 67 120 T 78 116 T 90 120"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="1"
                strokeLinecap="round"
                animate={{
                  d: [
                    "M 55 120 Q 61 115 67 120 T 78 116 T 90 120",
                    "M 55 117 Q 61 122 67 116 T 78 121 T 90 117",
                    "M 55 120 Q 61 115 67 120 T 78 116 T 90 120"
                  ]
                }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Micro Telemetry Metrics */}
              <text x="55" y="126" fill="#a5f3fc" fontSize="3.6" fontFamily="monospace">
                &gt; K8S: 9/9 PODS
              </text>
              <text x="55" y="131" fill="#fef08a" fontSize="3.6" fontFamily="monospace">
                &gt; ALL SYSTEMS ♥
              </text>

              {/* Holographic Laser Scanline sweep */}
              <motion.line
                x1="52" y1="108" x2="96" y2="108"
                stroke="#67e8f9"
                strokeWidth="1.2"
                strokeOpacity="0.85"
                animate={{ y1: [108, 134, 108], y2: [108, 134, 108] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
              />

              {/* Finger Tap Ripple where right hand touches screen */}
              <motion.circle
                cx="88"
                cy="125"
                stroke="#38bdf8"
                strokeWidth="1"
                fill="none"
                animate={{ r: [1.5, 6], opacity: [1, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'easeOut' }}
              />
            </motion.g>
          )}

          {/* ------------------------------------------------------------- */}
          {/* BIG 3D RETRO HELMET & CRT SCREEN                              */}
          {/* ------------------------------------------------------------- */}
          <motion.g
            animate={{
              y: isSitting ? [-1, 1, -1] : isJumping ? [-2, 1, -2] : isSwimming ? [-1.5, 1.5, -1.5] : isWalking ? [-1, 0.5, -1] : [0, -1, 0],
              rotate: isSitting ? [-1, 1, -1] : isJumping ? [-1, 1, -1] : isSwimming ? [-2, 2, -2] : isWalking ? [-0.8, 0.8, -0.8] : [0, 0.3, 0]
            }}
            transition={{ duration: isSitting ? 2.5 : isJumping ? 1.2 : isSwimming ? 2 : isWalking ? 1.3 : 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: '75px', originY: '102px' }}
          >
            {/* Main Red 3D Helmet Shell */}
            <path
              d="M 30 46 C 30 15 120 15 120 46 C 120 82 116 102 100 104 C 85 106 60 106 46 103 C 32 100 30 82 30 46 Z"
              fill="url(#helmet3DGrad)"
            />

            {/* Overhanging 3D Curved Visor Brim */}
            <path
              d="M 26 47 C 26 12 124 12 124 47 C 112 56 95 58 75 58 C 55 58 38 56 26 47 Z"
              fill="url(#visorBrim3D)"
              stroke="#fca5a5"
              strokeWidth="1.5"
            />

            {/* Dark Visor Cavity */}
            <path
              d="M 30 48 C 39 54 55 56 75 56 C 95 56 111 54 120 48 C 112 52 95 54 75 54 C 55 54 39 52 30 48 Z"
              fill="url(#visorCavity)"
            />

            {/* Helmet Specular Highlight Arcs */}
            <path
              d="M 42 22 C 58 16 92 16 108 22"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeOpacity="0.65"
            />
            <path
              d="M 46 27 C 58 22 88 22 102 27"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeOpacity="0.4"
            />

            {/* Purple & Yellow Helmet Side Badges */}
            <path d="M 109 48 Q 121 54 115 76 L 109 72 Z" fill="#818cf8" stroke="#4f46e5" strokeWidth="0.8" />
            <path d="M 105 76 L 113 75 L 111 82 L 105 81 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />

            {/* CRT Screen Outer 3D Bezel */}
            <rect
              x="38"
              y="44"
              width="74"
              height="58"
              rx="18"
              fill="#090d16"
              stroke="#1e293b"
              strokeWidth="3.5"
            />

            {/* CRT Screen Inner (Glowing 3D Cyan Monitor) */}
            <g>
              <rect
                x="41"
                y="47"
                width="68"
                height="52"
                rx="15"
                fill="url(#screen3DGrad)"
              />

              {/* Scanlines Effect */}
              <rect
                x="41"
                y="47"
                width="68"
                height="52"
                rx="15"
                fill="url(#scanlines3D)"
                opacity="0.85"
              />

              {/* Glass Curved Specular Glare */}
              <path
                d="M 46 50 L 86 50 C 62 60 48 74 46 86 Z"
                fill="url(#glassShine)"
              />
            </g>

            {/* ----------------------------------------------------------- */}
            {/* EYES & BLUSH INSIDE MONITOR SCREEN                          */}
            {/* ----------------------------------------------------------- */}
            <g transform={`translate(${lookOffset.x}, ${lookOffset.y})`}>
              {/* CHECKING TABLET SCANNING EYES (Look down towards chest tablet) */}
              {isCheckTablet && (
                <motion.g
                  animate={{ x: [-2, 2, -2] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <rect
                    x="53"
                    y="63"
                    width="11"
                    height="17"
                    rx="5"
                    fill="#ffffff"
                    filter="url(#eye3DGlow)"
                  />
                  <rect
                    x="84"
                    y="63"
                    width="11"
                    height="17"
                    rx="5"
                    fill="#ffffff"
                    filter="url(#eye3DGlow)"
                  />
                  {/* Cyan horizontal scanner beam across pupils */}
                  <line x1="54" y1="71" x2="63" y2="71" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="85" y1="71" x2="94" y2="71" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
                </motion.g>
              )}

              {/* NORMAL CAPSULE EYES */}
              {eyeExpression === 'normal' && !isSitting && !isCheckTablet && !isAdjustAntenna && (
                <>
                  <rect
                    x="53"
                    y="55"
                    width="11"
                    height="24"
                    rx="5.5"
                    fill="#ffffff"
                    filter="url(#eye3DGlow)"
                  />
                  <rect
                    x="84"
                    y="55"
                    width="11"
                    height="24"
                    rx="5.5"
                    fill="#ffffff"
                    filter="url(#eye3DGlow)"
                  />
                </>
              )}

              {/* HAPPY / SMILING EYES (^ ^ Arcs) - When sitting, happy, or adjusting antenna */}
              {((eyeExpression === 'happy' || isSitting || isAdjustAntenna) && !isCheckTablet) && (
                <>
                  <path
                    d="M 50 71 Q 59 53 68 71"
                    stroke="#ffffff"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#eye3DGlow)"
                  />
                  <path
                    d="M 81 71 Q 90 53 99 71"
                    stroke="#ffffff"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#eye3DGlow)"
                  />
                </>
              )}

              {/* BLINK (Thin Line) */}
              {eyeExpression === 'blink' && !isSitting && !isCheckTablet && (
                <>
                  <line x1="52" y1="67" x2="66" y2="67" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="83" y1="67" x2="97" y2="67" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
                </>
              )}

              {/* WINK */}
              {eyeExpression === 'wink' && !isSitting && !isCheckTablet && (
                <>
                  <rect x="53" y="55" width="11" height="24" rx="5.5" fill="#ffffff" filter="url(#eye3DGlow)" />
                  <path d="M 81 71 Q 90 53 99 71" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" fill="none" filter="url(#eye3DGlow)" />
                </>
              )}

              {/* CUTE BLUSH SLASHES (/// ///) */}
              <g opacity={isCheckTablet || isAdjustAntenna ? 1 : 0.95}>
                <line x1="51" y1="85" x2="55" y2="79" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="56" y1="85" x2="60" y2="79" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="61" y1="85" x2="65" y2="79" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
              </g>
              <g opacity="0.95">
                <line x1="83" y1="85" x2="87" y2="79" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="88" y1="85" x2="92" y2="79" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="93" y1="85" x2="97" y2="79" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
              </g>
            </g>
          </motion.g>
        </svg>

        {/* SWIMMING ZERO-G BUBBLES */}
        {isSwimming && (
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            {[1, 2, 3, 4, 5].map((bubble) => (
              <motion.div
                key={bubble}
                initial={{ opacity: 0, scale: 0.2, x: 75, y: 150 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0.2, 1.2, 0.4],
                  x: [75, 75 + (bubble % 2 === 0 ? 30 : -30) * bubble * 0.4],
                  y: [150, 150 - bubble * 28]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: bubble * 0.25,
                  ease: 'easeOut'
                }}
                className="absolute w-4 h-4 rounded-full border border-cyan-300/80 bg-cyan-400/20 backdrop-blur-[1px] shadow-[0_0_8px_rgba(34,211,238,0.5)]"
              >
                <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-white" />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};
