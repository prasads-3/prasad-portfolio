import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Send, Sparkles, Volume2, VolumeX, MessageSquare, 
  ChevronRight, ArrowUpRight, Play, Pause, Footprints, Gift, Waves,
  RotateCw, Compass
} from 'lucide-react';
import { CuteRetroRobotVisual, RobotMode, ToyType } from './CuteRetroRobotVisual';
import { robotSounds } from '../services/robotSoundHelper';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  action?: {
    type: 'link' | 'scroll';
    label: string;
    url?: string;
    targetId?: string;
  };
}

export type RobotStateMachineState =
  | 'IDLE_STAND'
  | 'IDLE_ADJUST_ANTENNA'
  | 'IDLE_CHECK_TABLET'
  | 'IDLE_LOOK_AROUND'
  | 'WALKING'
  | 'SPINNING_360'
  | 'SHOWING_TOY';

const TOYS: { type: ToyType; name: string; emoji: string; quote: string }[] = [
  { type: 'duck', name: 'Rubber Duck', emoji: '🐥', quote: "Look what I found in my pocket! A cute rubber ducky! 🐥✨" },
  { type: 'whale', name: 'Docker Whale', emoji: '🐳', quote: "Pocket surprise! It's a miniature Docker whale! 🐳🚢" },
  { type: 'star', name: 'Super Star', emoji: '⭐', quote: "Tada! A sparkling gold star from my pocket! ⭐✨" },
  { type: 'joystick', name: 'Mini Arcade', emoji: '🎮', quote: "Found my retro arcade joystick in my pocket! 🎮🕹️" },
];

const TARGET_WORDS = [
  { id: 'target-word-devops', name: 'DevOps', bubble: "Visiting DevOps! 🚀 Masti time with blue shoes! ✨" },
  { id: 'target-word-automating', name: 'Automating', bubble: "Saying hi to Automation! ⚙️🤖 Masti kicks!" },
  { id: 'target-word-cloud', name: 'Cloud', bubble: "Exploring Cloud! ☁️ Wheee! Swinging my blue sneakers!" },
  { id: 'target-word-name', name: 'Prasad', bubble: "Guarding Prasad's name! 🛡️ Cute robot on duty!" },
  { id: 'target-word-devops-badge', name: 'DevOps Badge', bubble: "DevOps badge cheer! 🌟 Check my big blue shoes!" },
];

const SUGGESTIONS = [
  { label: '🔄 360° Spin', query: 'Turn around 360 degrees!' },
  { label: '🏃 Run Around', query: 'Run around freely on the screen!' },
  { label: '📡 Tune Antenna', query: 'Tune your antenna' },
  { label: '📟 Check Tablet', query: 'Check your virtual data tablet' },
  { label: '📬 Visitor Email Alert', query: 'Visitor aane par email kaise aayega?' },
  { label: '🎓 CCNA Certificate', query: 'Tell me about Prasad\'s CCNA certificate' },
  { label: '🚀 Top DevOps Projects', query: 'What projects has Prasad built?' },
  { label: '💼 Internships', query: 'Where did Prasad do his internships?' },
  { label: '🛠️ Tech Stack & Skills', query: 'What are Prasad\'s main technical skills?' },
  { label: '📬 Contact Prasad', query: 'How can I contact or hire Prasad?' },
];

export const RobotBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Position & Movement State
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [autoLoopEnabled, setAutoLoopEnabled] = useState(true);
  const [moveDuration, setMoveDuration] = useState<number>(2.2);

  // 360-Degree Rotation State
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isSelfSpinning, setIsSelfSpinning] = useState<boolean>(false);
  const [showRotationDial, setShowRotationDial] = useState<boolean>(false);
  
  // Current Robot State Mode: 'stand' | 'walk' | 'swim' | 'pocket-toy' | 'sit' | 'jump' | 'adjust-antenna' | 'check-tablet'
  const [mode, setMode] = useState<RobotMode>('stand');
  const [currentToyIndex, setCurrentToyIndex] = useState(0);
  const [isWaving, setIsWaving] = useState(false);
  
  // Idle Activity State Machine state
  const [currentState, setCurrentState] = useState<RobotStateMachineState>('IDLE_STAND');
  const currentStateRef = useRef<RobotStateMachineState>('IDLE_STAND');

  // Facial expressions
  const [eyeExpression, setEyeExpression] = useState<'normal' | 'happy' | 'blink' | 'wink'>('normal');
  const [speechBubble, setSpeechBubble] = useState<string | null>("Hi! Watch me tune my antenna & scan my tablet! 📡✨");
  const [lookOffset, setLookOffset] = useState({ x: 0, y: 0 });

  // Timing tracking
  const lastTouchTimeRef = useRef<number>(Date.now());
  const loopTimeoutRef = useRef<any>(null);
  const targetWordIndexRef = useRef<number>(0);

  // Keep state ref in sync
  useEffect(() => {
    currentStateRef.current = currentState;
  }, [currentState]);

  // Chat conversation state
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Beep-boop! ( ^ ‿ ^ )✨ I'm your 3D retro companion robot with cute big blue shoes!\nI walk around at a calm normal speed, jump right on top of words like 'DevOps' & 'Automating', sit there swinging my blue shoes and doing masti, and pull fun toys from my pocket! Ask me anything about Prasad's CCNA certification, Kubernetes projects, CI/CD pipelines, or internships!",
      timestamp: 'Just now'
    }
  ]);

  // Sync sound settings
  useEffect(() => {
    robotSounds.enabled = soundEnabled;
  }, [soundEnabled]);

  // Initial positioning at bottom-right of viewport
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initX = Math.max(30, window.innerWidth - 220);
      const initY = Math.max(30, window.innerHeight - 230);
      setPos({ x: initX, y: initY });
      setIsInitialized(true);
    }
  }, []);

  // Make eyes & head track cursor smoothly
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const botCenterX = pos.x + 75;
      const botCenterY = pos.y + 95;
      const dx = Math.max(-1, Math.min(1, (e.clientX - botCenterX) / 400));
      const dy = Math.max(-1, Math.min(1, (e.clientY - botCenterY) / 400));
      setLookOffset({ x: dx * 4, y: dy * 3 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [pos]);

  // Helper: Find on-screen coordinates of target word
  const getWordCoordinates = (elementId: string): { x: number; y: number } | null => {
    if (typeof document === 'undefined') return null;
    const el = document.getElementById(elementId);
    if (!el) return null;

    const rect = el.getBoundingClientRect();
    // Center the robot horizontally on the word, place feet/crotch right on top baseline of word
    // Robot width is 150, center is ~75. Pelvis sits around y=148.
    const targetX = Math.max(10, Math.min(window.innerWidth - 160, rect.left + (rect.width / 2) - 75));
    const targetY = Math.max(20, rect.top - 148);

    return { x: targetX, y: targetY };
  };

  // -------------------------------------------------------------
  // STATE MACHINE FOR AUTONOMOUS ROAMING & ACTIVITIES
  // The robot runs around freely ("idhar udhar bhagta hai"):
  // - Runs across the screen with brisk energetic steps
  // - Automatically performs 360° turnaround spins ("turn himself round")
  // - Adjusting antenna with radio sweep sound & signal rings
  // - Checking virtual holographic data tablet
  // - Pulling surprise toys from pocket
  // - No jumping on words and getting stuck at the top!
  // -------------------------------------------------------------
  useEffect(() => {
    if (!autoLoopEnabled || isOpen) return;

    let isCancelled = false;

    const roamToNewLocation = () => {
      if (isCancelled) return;

      const now = Date.now();
      const elapsedSinceTouch = now - lastTouchTimeRef.current;
      if (elapsedSinceTouch < 10000) {
        // Wait remainder of the 10 seconds stability cooldown
        loopTimeoutRef.current = setTimeout(roamToNewLocation, Math.max(1000, 10000 - elapsedSinceTouch));
        return;
      }

      const winW = typeof window !== 'undefined' ? window.innerWidth : 1000;
      const winH = typeof window !== 'undefined' ? window.innerHeight : 800;

      // Safe bounds across viewport (never gets stuck behind edges)
      const minX = 30;
      const maxX = Math.max(minX + 120, winW - 190);
      const minY = 60;
      const maxY = Math.max(minY + 120, winH - 220);

      // Generate a dynamic destination point across the screen (explore everywhere!)
      const zoneRoll = Math.random();
      let targetX = minX;
      let targetY = maxY;

      let attempts = 0;
      do {
        attempts++;
        if (zoneRoll < 0.55) {
          // Lower level roam
          targetX = minX + Math.random() * (maxX - minX);
          targetY = Math.max(minY, maxY - Math.random() * 80);
        } else if (zoneRoll < 0.85) {
          // Mid-level roaming across screen
          targetX = minX + Math.random() * (maxX - minX);
          targetY = minY + (maxY - minY) * (0.35 + Math.random() * 0.35);
        } else {
          // Upper exploratory roam
          targetX = minX + Math.random() * (maxX - minX);
          targetY = minY + (maxY - minY) * (0.15 + Math.random() * 0.25);
        }
      } while (attempts < 6 && Math.hypot(targetX - pos.x, targetY - pos.y) < 180);

      const dx = targetX - pos.x;
      const dy = targetY - pos.y;
      const distance = Math.hypot(dx, dy);

      // Speed ~ 180-220px/s so it runs briskly ("bhagna")
      const travelSec = Math.max(1.4, Math.min(3.5, distance / 200));
      setMoveDuration(travelSec);
      setDirection(targetX > pos.x ? 1 : -1);
      setMode('walk');
      setEyeExpression('happy');
      setIsWaving(false);

      const runQuotes = [
        "Running around! 👟💨",
        "Exploring over here! 🏃✨",
        "Beep-boop zooming! 🤖💨",
        "Running in my blue sneakers! 👟✨",
        "Zooming across the screen! 💨"
      ];
      setSpeechBubble(runQuotes[Math.floor(Math.random() * runQuotes.length)]);
      robotSounds.step();
      setPos({ x: targetX, y: targetY });
      currentStateRef.current = 'WALKING';
      setCurrentState('WALKING');

      // When arrived at target spot:
      loopTimeoutRef.current = setTimeout(() => {
        if (isCancelled) return;

        setMode('stand');
        setSpeechBubble(null);

        // Arrived at destination! Perform a cute idle activity
        // (360° spin, antenna tuning, tablet check, pocket toy, or look-around scan)
        const idleRoll = Math.random();

        if (idleRoll < 0.25) {
          // IDLE 1: 360° Turnaround Pirouette Spin ("turn himself round")!
          currentStateRef.current = 'SPINNING_360';
          setCurrentState('SPINNING_360');
          setIsSelfSpinning(true);
          robotSounds.spinWhoosh();
          setEyeExpression('happy');
          setSpeechBubble("360° Pirouette Spin! 🔄✨");
          setRotationAngle(prev => prev + 360);

          loopTimeoutRef.current = setTimeout(() => {
            if (isCancelled) return;
            setIsSelfSpinning(false);
            setEyeExpression('normal');
            setSpeechBubble(null);
            currentStateRef.current = 'IDLE_STAND';
            setCurrentState('IDLE_STAND');
            // 10 seconds stable resting period before moving again
            loopTimeoutRef.current = setTimeout(roamToNewLocation, 10000);
          }, 1200);

        } else if (idleRoll < 0.48) {
          // IDLE 2: Tune Antenna
          currentStateRef.current = 'IDLE_ADJUST_ANTENNA';
          setCurrentState('IDLE_ADJUST_ANTENNA');
          setMode('adjust-antenna');
          setEyeExpression('happy');
          robotSounds.tuneAntenna();

          const antennaQuotes = [
            "Tuning antenna signals! 📡✨",
            "Beep! Calibrating radio frequency! 📻🎶",
            "Optimal cloud signal acquired! 📶✨"
          ];
          setSpeechBubble(antennaQuotes[Math.floor(Math.random() * antennaQuotes.length)]);

          loopTimeoutRef.current = setTimeout(() => {
            if (isCancelled) return;
            setMode('stand');
            setSpeechBubble(null);
            currentStateRef.current = 'IDLE_STAND';
            setCurrentState('IDLE_STAND');
            // 10 seconds stable resting period before moving again
            loopTimeoutRef.current = setTimeout(roamToNewLocation, 10000);
          }, 3200);

        } else if (idleRoll < 0.70) {
          // IDLE 3: Check Virtual Data Tablet
          currentStateRef.current = 'IDLE_CHECK_TABLET';
          setCurrentState('IDLE_CHECK_TABLET');
          setMode('check-tablet');
          robotSounds.tabletBeep();

          const tabletQuotes = [
            "Scanning SYS-PAD 3000 tablet! 📟✨",
            "Tablet check: All systems 100% nominal! 📊💚",
            "Telemetry: 9/9 Kubernetes Pods healthy! 📟🚀"
          ];
          setSpeechBubble(tabletQuotes[Math.floor(Math.random() * tabletQuotes.length)]);

          loopTimeoutRef.current = setTimeout(() => {
            if (isCancelled) return;
            setMode('stand');
            setSpeechBubble(null);
            currentStateRef.current = 'IDLE_STAND';
            setCurrentState('IDLE_STAND');
            // 10 seconds stable resting period before moving again
            loopTimeoutRef.current = setTimeout(roamToNewLocation, 10000);
          }, 3400);

        } else if (idleRoll < 0.85) {
          // IDLE 4: Surprise Pocket Toy
          currentStateRef.current = 'SHOWING_TOY';
          setCurrentState('SHOWING_TOY');
          setMode('pocket-toy');
          const nextIdx = (currentToyIndex + 1) % TOYS.length;
          setCurrentToyIndex(nextIdx);
          const toy = TOYS[nextIdx];
          robotSounds.toyFanfare();
          setSpeechBubble(toy.quote);

          loopTimeoutRef.current = setTimeout(() => {
            if (isCancelled) return;
            setMode('stand');
            setSpeechBubble(null);
            currentStateRef.current = 'IDLE_STAND';
            setCurrentState('IDLE_STAND');
            // 10 seconds stable resting period before moving again
            loopTimeoutRef.current = setTimeout(roamToNewLocation, 10000);
          }, 3500);

        } else {
          // IDLE 5: Curious Look Around
          currentStateRef.current = 'IDLE_LOOK_AROUND';
          setCurrentState('IDLE_LOOK_AROUND');
          setMode('stand');
          setEyeExpression('normal');
          robotSounds.curiousBeep();
          setLookOffset({ x: -4, y: -2 });
          setSpeechBubble("Scanning this area... 👀✨");

          loopTimeoutRef.current = setTimeout(() => {
            if (isCancelled) return;
            setLookOffset({ x: 4, y: -2 });

            loopTimeoutRef.current = setTimeout(() => {
              if (isCancelled) return;
              setLookOffset({ x: 0, y: 0 });
              setSpeechBubble(null);
              currentStateRef.current = 'IDLE_STAND';
              setCurrentState('IDLE_STAND');
              // 10 seconds stable resting period before moving again
              loopTimeoutRef.current = setTimeout(roamToNewLocation, 10000);
            }, 1200);
          }, 1200);
        }
      }, travelSec * 1000);
    };

    // Kick off autonomous roaming loop (starts in 2s)
    loopTimeoutRef.current = setTimeout(roamToNewLocation, 2000);

    return () => {
      isCancelled = true;
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    };
  }, [autoLoopEnabled, isOpen, currentToyIndex, pos.x, pos.y]);

  // Click on robot handler (Pet / Chat open)
  const handleRobotClick = () => {
    lastTouchTimeRef.current = Date.now();
    if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);

    robotSounds.beep();
    setEyeExpression('happy');
    setIsWaving(true);
    setSpeechBubble("Hello friend! Let's chat! 🐾✨");
    setIsOpen(true);

    setTimeout(() => {
      setSpeechBubble(null);
    }, 2500);
  };

  // Manual Word Jump Trigger
  const handleJumpToWord = (wordId: string, wordName: string) => {
    lastTouchTimeRef.current = Date.now();
    if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);

    const winW = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const winH = typeof window !== 'undefined' ? window.innerHeight : 800;

    let coords = getWordCoordinates(wordId);
    if (!coords || coords.y < 0 || coords.y > winH * 0.8) {
      coords = { x: winW * 0.45, y: winH * 0.3 };
    }

    currentStateRef.current = 'JUMPING_TO_WORD';
    setCurrentState('JUMPING_TO_WORD');

    setDirection(coords.x > pos.x ? 1 : -1);
    setMode('jump');
    setEyeExpression('wink');
    setSpeechBubble(`Jumping to ${wordName}! 🚀`);
    robotSounds.jump();
    setPos({ x: coords.x, y: coords.y });

    setTimeout(() => {
      robotSounds.land();
      setMode('sit');
      setEyeExpression('happy');
      setIsWaving(true);
      setSpeechBubble(`Sitting on ${wordName}! Masti kicks! 👟✨`);
      currentStateRef.current = 'IDLE_SIT_WORD';
      setCurrentState('IDLE_SIT_WORD');
    }, 1400);
  };

  // Manual Trigger helper
  const triggerManualMode = (newMode: RobotMode) => {
    lastTouchTimeRef.current = Date.now();
    if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);

    setMode(newMode);

    if (newMode === 'adjust-antenna') {
      currentStateRef.current = 'IDLE_ADJUST_ANTENNA';
      setCurrentState('IDLE_ADJUST_ANTENNA');
      setEyeExpression('happy');
      robotSounds.tuneAntenna();
      setSpeechBubble("Tuning my retro antenna! 📡✨");

      setTimeout(() => {
        setSpeechBubble(null);
        setMode('stand');
        currentStateRef.current = 'IDLE_STAND';
        setCurrentState('IDLE_STAND');
      }, 3600);
    } else if (newMode === 'check-tablet') {
      currentStateRef.current = 'IDLE_CHECK_TABLET';
      setCurrentState('IDLE_CHECK_TABLET');
      robotSounds.tabletBeep();
      setSpeechBubble("Scanning SYS-PAD 3000 tablet! 📟✨");

      setTimeout(() => {
        setSpeechBubble(null);
        setMode('stand');
        currentStateRef.current = 'IDLE_STAND';
        setCurrentState('IDLE_STAND');
      }, 3800);
    } else if (newMode === 'walk') {
      currentStateRef.current = 'WALKING';
      setCurrentState('WALKING');
      const winW = typeof window !== 'undefined' ? window.innerWidth : 1000;
      const winH = typeof window !== 'undefined' ? window.innerHeight : 800;
      const minX = 30;
      const maxX = Math.max(minX + 120, winW - 190);
      const minY = 60;
      const maxY = Math.max(minY + 120, winH - 220);

      const targetX = minX + Math.random() * (maxX - minX);
      const targetY = Math.random() > 0.4 ? (maxY - Math.random() * 80) : (minY + Math.random() * (maxY - minY));
      const dist = Math.hypot(targetX - pos.x, targetY - pos.y);
      const travelSec = Math.max(1.3, Math.min(3.2, dist / 200));

      setMoveDuration(travelSec);
      setDirection(targetX > pos.x ? 1 : -1);
      robotSounds.step();
      setPos({ x: targetX, y: targetY });
      setSpeechBubble("Bhaag raha hoon! 🏃💨 Zooming around freely! 👟✨");

      setTimeout(() => {
        setMode('stand');
        setSpeechBubble(null);
        currentStateRef.current = 'IDLE_STAND';
        setCurrentState('IDLE_STAND');
      }, travelSec * 1000);
    } else if (newMode === 'pocket-toy') {
      currentStateRef.current = 'SHOWING_TOY';
      setCurrentState('SHOWING_TOY');
      const nextIdx = (currentToyIndex + 1) % TOYS.length;
      setCurrentToyIndex(nextIdx);
      robotSounds.toyFanfare();
      setSpeechBubble(TOYS[nextIdx].quote);
    } else if (newMode === 'swim') {
      robotSounds.beep();
      setSpeechBubble("Zero-G swimming through the cloud! 🌊✨");
    } else if (newMode === 'sit') {
      robotSounds.beep();
      setIsWaving(true);
      setSpeechBubble("Swinging my chunky blue shoes! 👟🎉");
      setTimeout(() => {
        setMode('stand');
        setIsWaving(false);
        setSpeechBubble(null);
      }, 3000);
    }
  };

  // 360-degree turnaround spin handler
  const handleSpin360 = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    lastTouchTimeRef.current = Date.now();
    if (isSelfSpinning) return;

    setIsSelfSpinning(true);
    currentStateRef.current = 'SPINNING_360';
    setCurrentState('SPINNING_360');
    robotSounds.spinWhoosh();
    setEyeExpression('happy');
    setSpeechBubble("360° Turnaround Spin! Wheeeee! 🔄✨");

    // Add full 360 degrees so it rotates completely around
    setRotationAngle(prev => prev + 360);

    setTimeout(() => {
      setIsSelfSpinning(false);
      setEyeExpression('normal');
      setSpeechBubble(null);
      currentStateRef.current = 'IDLE_STAND';
      setCurrentState('IDLE_STAND');
    }, 1100);
  };

  // Manual rotation angle handler
  const handleManualRotate = (deg: number) => {
    lastTouchTimeRef.current = Date.now();
    setRotationAngle(deg);
  };

  // Scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Chat Query Handler
  const generateBotReply = (query: string): { text: string; action?: ChatMessage['action'] } => {
    const q = query.toLowerCase();

    // 360 Degree Turn / Spin / Rotate
    if (q.includes('360') || q.includes('spin') || q.includes('ghuma') || q.includes('round') || q.includes('turn') || q.includes('rotate')) {
      handleSpin360();
      return { text: "Executing a full 360° turnaround spin! 🔄✨ Wheee! Look at my chunky blue sneakers spinning all the way round! 👟💫" };
    }

    // Run / Wander / Roam ("idhar udhar bhagna")
    if (q.includes('run') || q.includes('bhag') || q.includes('walk') || q.includes('ghum') || q.includes('idhar') || q.includes('move')) {
      triggerManualMode('walk');
      return { text: "Bhag raha hoon! 🏃💨 Zooming around freely across the screen! No getting stuck anywhere! 👟✨" };
    }

    // Antenna Adjustment
    if (q.includes('antenna') || q.includes('tune') || q.includes('frequency') || q.includes('signal')) {
      triggerManualMode('adjust-antenna');
      return { text: "Tuning my retro antenna! Calibrating radio frequencies for optimal DevOps telemetry! 📡📻✨" };
    }

    // Visitor Email Alert
    if (q.includes('mail') || q.includes('email') || q.includes('visitor') || q.includes('alert') || q.includes('open') || q.includes('kisi ne')) {
      return { 
        text: "Website par Automatic Email Alert active kar diya gaya hai! 🚀\n\n• Jaise hi koi bhi visitor aapki website open karega, background mein automatic alert trigger hoga aur aapke email (pj344504@gmail.com) par visitor ka Time, Device (Phone/PC), Estimated City/Location aur Referrer URL bhej diya jayega.\n\n• Note: Pehli baar FormSubmit se aapke Gmail par ek confirmation/activation mail aayega ('Activate Form'). Bas uspar ek baar click kar dena, phir aage se har visitor ka automatic alert seedha aapke inbox mein aayega!" 
      };
    }

    // Virtual Data Tablet
    if (q.includes('tablet') || q.includes('telemetry') || q.includes('sys-pad') || q.includes('metric') || q.includes('pad') || q.includes('diagnostic')) {
      triggerManualMode('check-tablet');
      return { text: "Accessing virtual data tablet (SYS-PAD 3000)! Checking cluster telemetry... All 9 pods running, zero restarts! 📟📊💚" };
    }

    // Word Jumps
    if (q.includes('devops') && (q.includes('jump') || q.includes('sit') || q.includes('baith'))) {
      handleJumpToWord('target-word-devops', 'DevOps');
      return { text: "Wheee! Jumping right up to sit on 'DevOps'! Watch my big blue shoes swing! 🚀👟" };
    }

    if (q.includes('automation') || q.includes('automating')) {
      handleJumpToWord('target-word-automating', 'Automating');
      return { text: "Leaping straight on top of 'Automating'! Doing masti with my dangling legs! ⚙️✨" };
    }

    if (q.includes('cloud')) {
      handleJumpToWord('target-word-cloud', 'Cloud');
      return { text: "Landing on 'Cloud'! Chilling with cute blue sneakers! ☁️👟" };
    }

    if (q.includes('prasad') && (q.includes('jump') || q.includes('sit'))) {
      handleJumpToWord('target-word-name', 'Prasad');
      return { text: "Jumping to sit right above Prasad's name! 🛡️" };
    }

    if (q.includes('masti') || q.includes('dance') || q.includes('swing')) {
      triggerManualMode('sit');
      return { text: "Masti time activated! Swinging my chunky blue shoes and waving happily! 🎉👟" };
    }

    if (q.includes('toy') || q.includes('pocket') || q.includes('duck') || q.includes('whale') || q.includes('star')) {
      triggerManualMode('pocket-toy');
      return { text: "Reaching deep into my astronaut suit pocket... Surprise! ✨" };
    }

    if (q.includes('swim') || q.includes('float') || q.includes('fly')) {
      triggerManualMode('swim');
      return { text: "Zero-G zero-gravity mode engaged! Swimming across the viewport! 🌊🚢" };
    }

    // CCNA
    if (q.includes('ccna') || q.includes('cisco') || q.includes('certificat') || q.includes('rst forum')) {
      return {
        text: "🎓 Prasad completed Cisco Certified Network Associate (CCNA 200-301) training at RST Forum, Dadar (Mumbai)!\n\nCore Networking Competencies:\n• IP Routing protocols (OSPF), VLANs, Trunking (802.1Q) & NAT\n• IPv4 / IPv6 Subnetting & Network Diagnostics\n• Access Control Lists (ACLs) & Device Hardening\n• Network Automation & Linux network stack integration\n\nYou can inspect the verified certificate directly in the Certifications section!",
        action: {
          type: 'scroll',
          label: 'Jump to Certifications Section',
          targetId: 'certifications'
        }
      };
    }

    // Projects
    if (q.includes('project') || q.includes('work') || q.includes('wanderlust') || q.includes('easyshop') || q.includes('boutique') || q.includes('flask')) {
      return {
        text: "🚀 Prasad has built 4 production-grade DevOps & Cloud architectures:\n\n1. Wanderlust: 3-Tier travel application on Kubernetes with Jenkins CI/CD, SonarQube, Trivy, and Prometheus/Grafana monitoring.\n2. EasyShop: E-commerce deployed to AWS EKS with Application Load Balancers and Terraform IaC.\n3. Online Boutique: 11-tier microservices platform using gRPC, Redis, Helm, and Istio Service Mesh.\n4. Two-Tier Flask App: Python Flask web app + MySQL database with Docker bridge networking and Kubernetes PVC storage.",
        action: {
          type: 'scroll',
          label: 'Explore Projects Showcase',
          targetId: 'projects'
        }
      };
    }

    // Internships
    if (q.includes('intern') || q.includes('experience') || q.includes('railway') || q.includes('shirke')) {
      return {
        text: "💼 Prasad completed two intensive engineering internships:\n\n1. Central Railway, CSMT Mumbai (Jun - Jul 2025):\n• Network Infrastructure & OFC Support Intern\n• Analyzed railway optical fiber cable (OFC) telecom networks and recommended upgrades that boosted reliability by ~15%.\n\n2. B.G. Shirke Construction Technology (Aug - Dec 2025):\n• Network & Systems Engineering Intern\n• Monitored infrastructure uptime using Zabbix, configured VLANs/routing, and simulated networks in EVE-NG.",
        action: {
          type: 'scroll',
          label: 'View Internship Chronicles',
          targetId: 'internship'
        }
      };
    }

    // Skills
    if (q.includes('skill') || q.includes('tech') || q.includes('tool') || q.includes('stack') || q.includes('docker') || q.includes('kubernetes') || q.includes('aws')) {
      return {
        text: "🛠️ Prasad's Core Technical Skills:\n\n• Orchestration & Containers: Kubernetes, Docker, Helm, Kustomize\n• Cloud Infrastructure: AWS (EC2, S3, VPC, EKS, IAM)\n• CI/CD & DevSecOps: Jenkins, GitHub Actions, ArgoCD, SonarQube, Trivy\n• Monitoring & Metrics: Prometheus, Grafana, Alertmanager, Zabbix\n• Scripting & OS: Linux (Ubuntu) CLI, Bash, Python, JavaScript\n• Networking: CCNA concepts, OSPF, VLANs, TCP/IP, NAT",
        action: {
          type: 'scroll',
          label: 'View Detailed Skills Matrix',
          targetId: 'skills'
        }
      };
    }

    // Contact
    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('resume')) {
      return {
        text: "📬 Here is how you can connect with Prasad Jadhav:\n\n• Email: pj344504@gmail.com\n• Phone: +91 9324676104\n• GitHub: github.com/prasads-3\n• LinkedIn: linkedin.com/in/prasad-jadhav-601957268\n• Location: Navi Mumbai, Maharashtra, India\n\nPrasad is actively seeking Junior DevOps, Cloud, and SRE engineering roles!",
        action: {
          type: 'scroll',
          label: 'Go to Contact Section',
          targetId: 'contact'
        }
      };
    }

    // Jokes
    if (q.includes('joke') || q.includes('funny') || q.includes('laugh')) {
      const jokes = [
        "🤖 Why did the robot wear big blue sneakers?\nSo he could make zero-noise commits to the repository! 👟😄",
        "🐳 Why did the container go to school?\nTo improve its Docker compose-ition!",
        "🚀 Why don't programmers like nature?\nIt has too many bugs and no cloud backup!",
        "☸️ How does Kubernetes greet people?\n'Pod morning to you!' 😄"
      ];
      return { text: jokes[Math.floor(Math.random() * jokes.length)] };
    }

    // Default friendly greeting
    return {
      text: "Beep-boop! Prasad Jadhav is an aspiring DevOps and Cloud engineer specializing in Kubernetes, AWS, CI/CD automation, and Linux administration. Feel free to ask about his CCNA certificate, projects, internships, or contact details!",
      action: {
        type: 'scroll',
        label: 'Explore Projects Showcase',
        targetId: 'projects'
      }
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || inputVal.trim();
    if (!messageText) return;

    robotSounds.beep();

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const reply = generateBotReply(messageText);
      robotSounds.beep();

      const newBotMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: reply.text,
        timestamp: 'Just now',
        action: reply.action
      };

      setMessages(prev => [...prev, newBotMessage]);
    }, 450);
  };

  const handleActionClick = (action: NonNullable<ChatMessage['action']>) => {
    if (action.type === 'scroll' && action.targetId) {
      const el = document.getElementById(action.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setSpeechBubble("Here it is! 🚀");
        setTimeout(() => setSpeechBubble(null), 2500);
      }
    } else if (action.type === 'link' && action.url) {
      window.open(action.url, '_blank', 'noopener,noreferrer');
    }
  };

  if (!isInitialized) return null;

  const currentToy = TOYS[currentToyIndex];

  return (
    <div className="fixed inset-0 pointer-events-none z-[300] overflow-hidden">

      {/* ------------------------------------------------------------- */}
      {/* THE CUTE RETRO 3D ROBOT COMPANION                             */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        animate={{
          x: pos.x,
          y: pos.y
        }}
        transition={{
          duration: mode === 'jump' ? 1.8 : mode === 'walk' ? moveDuration : 1.2,
          ease: mode === 'jump' ? [0.25, 1, 0.5, 1] : "easeInOut"
        }}
        drag
        dragMomentum={false}
        onDragStart={() => {
          lastTouchTimeRef.current = Date.now();
          robotSounds.beep();
        }}
        onDragEnd={(e, info) => {
          lastTouchTimeRef.current = Date.now();
          setPos(prev => ({
            x: Math.max(10, Math.min(window.innerWidth - 180, prev.x + info.offset.x)),
            y: Math.max(10, Math.min(window.innerHeight - 220, prev.y + info.offset.y))
          }));
          robotSounds.land();
          setMode('stand');
          currentStateRef.current = 'IDLE_STAND';
          setCurrentState('IDLE_STAND');
          // Clear current movement timer and stay stable for 10 seconds at this new spot
          if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
          loopTimeoutRef.current = setTimeout(() => {
            // Trigger next roam after 10 seconds stability
            setPos(p => ({ ...p }));
          }, 10000);
        }}
        className="absolute pointer-events-auto cursor-grab active:cursor-grabbing group select-none"
        style={{ width: 160, height: 200 }}
      >
        {/* Speech Bubble above robot */}
        <AnimatePresence>
          {!isOpen && speechBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.85 }}
              className="absolute -top-14 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap"
              onClick={handleRobotClick}
            >
              <div className="relative px-3.5 py-1.5 rounded-2xl bg-neutral-900/95 border border-primary/50 text-white text-[11px] font-bold shadow-2xl backdrop-blur-md flex items-center gap-1.5">
                <span className="text-primary">🤖</span>
                <span>{speechBubble}</span>
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-neutral-900 border-b border-r border-primary/50 rotate-45" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Robot Visual with Cute Big Blue Shoes & 360 Rotation */}
        <div 
          onClick={handleRobotClick}
          className="relative w-full h-full flex items-center justify-center cursor-pointer"
          style={{ perspective: 1000 }}
        >
          <motion.div
            animate={{
              rotateY: rotationAngle
            }}
            transition={{
              duration: isSelfSpinning ? 0.95 : 0.15,
              ease: isSelfSpinning ? [0.34, 1.3, 0.64, 1] : "easeOut"
            }}
            style={{
              transformStyle: 'preserve-3d',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CuteRetroRobotVisual
              mode={mode}
              toyType={currentToy.type}
              eyeExpression={eyeExpression}
              direction={direction}
              lookOffset={lookOffset}
              isWaving={isWaving}
              scale={1}
            />
          </motion.div>

          {/* Quick Action Bar On Hover */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-950/95 border border-white/20 rounded-full px-3 py-1 text-[10px] text-white/90 whitespace-nowrap backdrop-blur-md flex items-center gap-2 shadow-2xl z-40">
            <button 
              onClick={(e) => handleSpin360(e)}
              className="hover:text-blue-400 transition-colors flex items-center gap-1 font-semibold text-blue-300"
              title="360° Turnaround Spin"
            >
              <RotateCw size={11} className={isSelfSpinning ? "animate-spin" : ""} />
              <span>360° Spin</span>
            </button>
            <span className="text-white/25">•</span>
            <button 
              onClick={(e) => { e.stopPropagation(); triggerManualMode('walk'); }}
              className="hover:text-emerald-300 transition-colors flex items-center gap-1"
              title="Run Around Freely (Bhago!)"
            >
              <span>🏃</span>
              <span>Run</span>
            </button>
            <span className="text-white/25">•</span>
            <button 
              onClick={(e) => { e.stopPropagation(); setShowRotationDial(!showRotationDial); }}
              className={`hover:text-cyan-300 transition-colors flex items-center gap-1 ${showRotationDial ? 'text-cyan-300 font-bold' : ''}`}
              title="Interactive 360° Rotation Dial"
            >
              <Compass size={11} />
              <span>Dial</span>
            </button>
            <span className="text-white/25">•</span>
            <button 
              onClick={(e) => { e.stopPropagation(); triggerManualMode('adjust-antenna'); }}
              className="hover:text-amber-300 transition-colors flex items-center gap-1"
              title="Tune Retro Antenna"
            >
              <span>📡</span>
              <span>Antenna</span>
            </button>
            <span className="text-white/25">•</span>
            <button 
              onClick={(e) => { e.stopPropagation(); triggerManualMode('check-tablet'); }}
              className="hover:text-cyan-300 transition-colors flex items-center gap-1"
              title="Check Virtual Data Tablet"
            >
              <span>📟</span>
              <span>Tablet</span>
            </button>
            <span className="text-white/25">•</span>
            <button 
              onClick={(e) => { e.stopPropagation(); triggerManualMode('pocket-toy'); }}
              className="hover:text-pink-400 transition-colors flex items-center gap-1"
              title="Pull Pocket Toy"
            >
              <span>🎁</span>
              <span>Toy</span>
            </button>
          </div>
        </div>

        {/* Interactive 360° Rotation Dial Popup */}
        <AnimatePresence>
          {showRotationDial && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute -bottom-28 left-1/2 -translate-x-1/2 bg-neutral-950/95 border border-blue-500/40 rounded-2xl p-2.5 shadow-2xl backdrop-blur-xl flex flex-col items-center gap-2 text-white z-50 min-w-[220px]"
            >
              <div className="flex items-center justify-between w-full text-[11px] font-semibold text-blue-300">
                <span className="flex items-center gap-1">
                  <RotateCw size={12} className={isSelfSpinning ? "animate-spin" : ""} />
                  360° Turn Robot
                </span>
                <span className="font-mono bg-blue-500/20 px-1.5 py-0.5 rounded text-[10px] text-blue-200">
                  {((rotationAngle % 360) + 360) % 360}°
                </span>
              </div>

              {/* 360 Slider */}
              <input
                type="range"
                min="0"
                max="360"
                value={((rotationAngle % 360) + 360) % 360}
                onChange={(e) => handleManualRotate(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-1 w-full justify-between text-[10px]">
                <button
                  onClick={() => setRotationAngle(prev => prev - 45)}
                  className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 transition-colors"
                >
                  -45°
                </button>
                <button
                  onClick={() => setRotationAngle(0)}
                  className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 transition-colors"
                >
                  0° Reset
                </button>
                <button
                  onClick={() => setRotationAngle(prev => prev + 45)}
                  className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 transition-colors"
                >
                  +45°
                </button>
                <button
                  onClick={(e) => handleSpin360(e)}
                  className="px-2.5 py-1 rounded bg-blue-500/30 hover:bg-blue-500/40 text-blue-300 border border-blue-500/50 font-semibold transition-colors"
                >
                  Spin 360°!
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ------------------------------------------------------------- */}
      {/* EXPANDED CHAT WINDOW                                          */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed bottom-6 right-6 w-[360px] sm:w-[395px] max-w-[calc(100vw-32px)] h-[540px] max-h-[80vh] flex flex-col rounded-3xl bg-neutral-900/95 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl overflow-hidden pointer-events-auto z-[350]"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-neutral-950/90 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  onClick={() => triggerManualMode('sit')}
                  className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                  title="Click for Masti!"
                >
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white tracking-tight">Retro 3D Robot</h3>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider">Companion</span>
                  </div>
                  <p className="text-[11px] text-white/50 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                    <span className="text-white/80 font-medium">
                      {currentState === 'IDLE_ADJUST_ANTENNA' && '📡 Tuning Antenna...'}
                      {currentState === 'IDLE_CHECK_TABLET' && '📟 Scanning Virtual Tablet...'}
                      {currentState === 'IDLE_LOOK_AROUND' && '👀 Scanning Environment...'}
                      {currentState === 'SPINNING_360' && '🔄 360° Pirouette Spin!'}
                      {currentState === 'WALKING' && '👟 Running in Blue Shoes!'}
                      {currentState === 'SHOWING_TOY' && `🎁 Pocket Toy (${currentToy.emoji})`}
                      {currentState === 'IDLE_STAND' && 'Cute Blue Shoes • Roaming Ready'}
                    </span>
                  </p>
                </div>
              </div>

              {/* Header Action Controls */}
              <div className="flex items-center gap-1.5">
                {/* Auto loop toggle */}
                <button
                  onClick={() => {
                    setAutoLoopEnabled(!autoLoopEnabled);
                    robotSounds.beep();
                  }}
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-medium flex items-center gap-1 border transition-all ${
                    autoLoopEnabled 
                      ? 'bg-blue-500/20 border-blue-500/40 text-blue-300' 
                      : 'bg-white/5 border-white/10 text-white/50'
                  }`}
                  title={autoLoopEnabled ? "Auto roaming & idle behavior enabled" : "Auto loop paused"}
                >
                  {autoLoopEnabled ? <Play size={10} /> : <Pause size={10} />}
                  <span>Auto</span>
                </button>

                {/* Sound Toggle */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-all"
                  title={soundEnabled ? "Mute sounds" : "Enable sounds"}
                >
                  {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                </button>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    robotSounds.beep();
                  }}
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-all"
                  title="Close chat"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Quick Interactive Robot Action Bar */}
            <div className="px-4 py-2 bg-white/[0.02] border-b border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar py-2">
              <button
                onClick={(e) => handleSpin360(e)}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 text-[11px] font-semibold transition-all shrink-0 flex items-center gap-1"
                title="Spin 360 degrees round"
              >
                <RotateCw size={11} className={isSelfSpinning ? "animate-spin" : ""} />
                360° Spin
              </button>
              <button
                onClick={() => triggerManualMode('walk')}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-medium transition-all shrink-0 flex items-center gap-1"
                title="Run around freely across screen"
              >
                <span>🏃</span>
                Run Around
              </button>
              <button
                onClick={() => setShowRotationDial(!showRotationDial)}
                className={`whitespace-nowrap px-3 py-1 rounded-full ${showRotationDial ? 'bg-cyan-500/30 text-cyan-200 border-cyan-400 font-semibold' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'} border text-[11px] font-medium transition-all shrink-0 flex items-center gap-1`}
                title="Toggle 360° Rotation Dial"
              >
                <Compass size={11} />
                360° Dial ({((rotationAngle % 360) + 360) % 360}°)
              </button>
              <button
                onClick={() => triggerManualMode('adjust-antenna')}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-medium transition-all shrink-0"
              >
                📡 Tune Antenna
              </button>
              <button
                onClick={() => triggerManualMode('check-tablet')}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[11px] font-medium transition-all shrink-0"
              >
                📟 Check Tablet
              </button>
              <button
                onClick={() => triggerManualMode('pocket-toy')}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/40 text-[11px] font-medium transition-all shrink-0"
              >
                🎁 Pocket Toy ({currentToy.emoji})
              </button>
              <button
                onClick={() => triggerManualMode('sit')}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-600/40 text-[11px] font-medium transition-all shrink-0"
              >
                👟 Masti
              </button>
              <button
                onClick={() => triggerManualMode('swim')}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-white/70 border border-white/10 text-[11px] font-medium transition-all shrink-0"
              >
                🌊 Zero-G Swim
              </button>
            </div>

            {/* Quick Suggestions Chips */}
            <div className="px-4 py-2 bg-white/[0.01] border-b border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar py-2">
              {SUGGESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(item.query)}
                  className="whitespace-nowrap px-3 py-1 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary hover:border-primary/40 border border-white/10 text-[11px] text-white/70 font-medium transition-all shrink-0"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Messages Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-br-none shadow-primary/20'
                      : 'bg-white/10 text-white/90 border border-white/10 rounded-tl-none'
                  }`}>
                    <p className="whitespace-pre-line">{msg.text}</p>
                    
                    {msg.action && (
                      <button
                        onClick={() => handleActionClick(msg.action!)}
                        className="mt-3 w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary font-bold text-[11px] transition-all group"
                      >
                        <span>{msg.action.label}</span>
                        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 border border-white/10 rounded-2xl rounded-tl-none px-4 py-2.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-3 bg-neutral-950/90 border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask anything, or type 'jump to devops', 'masti', 'toy'..."
                  className="flex-1 bg-white/5 border border-white/10 focus:border-primary/60 focus:bg-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-white/40 outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className="w-10 h-10 rounded-2xl bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:hover:bg-primary text-white flex items-center justify-center transition-all shadow-md shadow-primary/30 shrink-0"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
