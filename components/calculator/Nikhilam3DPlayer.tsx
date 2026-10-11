'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NikhilamLessonData, NikhilamChapter } from '@/lib/math/nikhilamLesson';
import Nikhilam3DCanvas from './Nikhilam3DCanvas';
import Nikhilam2DFallback from './Nikhilam2DFallback';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles,
  Gauge,
  CheckCircle2
} from 'lucide-react';

interface Nikhilam3DPlayerProps {
  lesson: NikhilamLessonData;
  onSelectPreset?: (a: string, b: string) => void;
}

export default function Nikhilam3DPlayer({ lesson, onSelectPreset }: Nikhilam3DPlayerProps) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0); // 0.5x, 1x, 1.5x
  const [isMuted, setIsMuted] = useState<boolean>(true); // start muted by default for friendly web UX
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  const playerContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeChapter = lesson.chapters[currentChapterIndex] || lesson.chapters[0];
  const totalDuration = lesson.totalDurationSeconds;

  // Detect WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // Reset to chapter 0 when inputs/lesson change
  useEffect(() => {
    setCurrentChapterIndex(0);
    setCurrentTimeSec(0);
    setIsPlaying(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [lesson.a, lesson.b]);

  // Web Speech API Narration handler
  const speakChapter = useCallback(
    (chapter: NikhilamChapter) => {
      if (isMuted || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(chapter.narrationText);
      utterance.rate = playbackSpeed;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    },
    [isMuted, playbackSpeed]
  );

  // Jump to specific chapter
  const jumpToChapter = useCallback(
    (chapterIndex: number) => {
      const targetIndex = Math.max(0, Math.min(lesson.chapters.length - 1, chapterIndex));
      setCurrentChapterIndex(targetIndex);
      setCurrentTimeSec(lesson.chapters[targetIndex].startTimeSeconds);
      if (isPlaying) {
        speakChapter(lesson.chapters[targetIndex]);
      }
    },
    [lesson.chapters, isPlaying, speakChapter]
  );

  // Next / Prev Chapter
  const handleNext = useCallback(() => {
    if (currentChapterIndex < lesson.chapters.length - 1) {
      jumpToChapter(currentChapterIndex + 1);
    } else {
      setIsPlaying(false);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  }, [currentChapterIndex, lesson.chapters.length, jumpToChapter]);

  const handlePrev = useCallback(() => {
    if (currentChapterIndex > 0) {
      jumpToChapter(currentChapterIndex - 1);
    }
  }, [currentChapterIndex, jumpToChapter]);

  // Replay
  const handleReplay = useCallback(() => {
    jumpToChapter(0);
    setIsPlaying(true);
    speakChapter(lesson.chapters[0]);
  }, [jumpToChapter, lesson.chapters, speakChapter]);

  // Toggle Play / Pause
  const handleTogglePlay = useCallback(() => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);

    if (nextState) {
      if (currentChapterIndex >= lesson.chapters.length - 1 && currentTimeSec >= totalDuration - 0.5) {
        jumpToChapter(0);
      } else {
        speakChapter(activeChapter);
      }
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }, [isPlaying, currentChapterIndex, lesson.chapters.length, currentTimeSec, totalDuration, jumpToChapter, speakChapter, activeChapter]);

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalMs = 200;
    timerRef.current = setInterval(() => {
      setCurrentTimeSec(prevTime => {
        const nextTime = prevTime + (intervalMs / 1000) * playbackSpeed;
        if (nextTime >= totalDuration) {
          setIsPlaying(false);
          return totalDuration;
        }

        const newChapIndex = lesson.chapters.findIndex(
          c => nextTime >= c.startTimeSeconds && nextTime < c.endTimeSeconds
        );
        if (newChapIndex !== -1 && newChapIndex !== currentChapterIndex) {
          setCurrentChapterIndex(newChapIndex);
          speakChapter(lesson.chapters[newChapIndex]);
        }

        return nextTime;
      });
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, totalDuration, lesson.chapters, currentChapterIndex, speakChapter]);

  // Speed cycle: 0.5x -> 1.0x -> 1.5x
  const cycleSpeed = () => {
    if (playbackSpeed === 1.0) setPlaybackSpeed(1.5);
    else if (playbackSpeed === 1.5) setPlaybackSpeed(0.5);
    else setPlaybackSpeed(1.0);
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.code === 'KeyM') {
        setIsMuted(m => !m);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTogglePlay, handleNext, handlePrev]);

  // Scrub bar click handler
  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetSec = clickRatio * totalDuration;

    const targetChapterIdx = lesson.chapters.findIndex(
      c => targetSec >= c.startTimeSeconds && targetSec <= c.endTimeSeconds
    );
    if (targetChapterIdx !== -1) {
      jumpToChapter(targetChapterIdx);
      setCurrentTimeSec(targetSec);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = Math.min(100, (currentTimeSec / totalDuration) * 100);

  return (
    <div
      ref={playerContainerRef}
      className={`relative rounded-2xl border border-[#E5A93C]/20 bg-black shadow-[0_16px_40px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none w-screen h-screen' : 'w-full'
      }`}
    >
      {/* ── TOP BAR: YOUTUBE-STYLE VIDEO HEADER ── */}
      <div className="px-5 py-3.5 bg-[#0D0C0A] border-b border-[#E5A93C]/15 flex items-center justify-between gap-3 z-20">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-[#E5A93C] shadow-[0_0_8px_#E5A93C] flex-shrink-0 animate-pulse" />
          <div className="truncate">
            <h3 className="font-display font-medium text-sm sm:text-base text-[#F5F0E6] truncate tracking-tight">
              Multiplication Using the Nikhilam Method
            </h3>
            <p className="font-mono text-[11px] text-[#A8A090] truncate">
              {lesson.a} × {lesson.b} · Base {lesson.base} · Sūtra: Nikhilam Navatashcaramam Dashatah
            </p>
          </div>
        </div>

        {/* Current Step / Chapter Badge */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="px-3 py-1 rounded-full border border-[#E5A93C]/30 bg-[#1A1712] text-[#E5A93C] font-mono text-xs font-semibold">
            Scene {activeChapter.id} / {lesson.chapters.length}
          </span>
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            className="p-1.5 rounded-lg border border-[#E5A93C]/15 bg-[#14120D] text-[#A8A090] hover:text-[#E5A93C] hover:border-[#E5A93C]/40 transition-all cursor-pointer hidden sm:block"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ── MAIN 3D VIEWPORT CANVAS ── */}
      <div className="relative w-full h-[360px] sm:h-[440px] md:h-[480px] bg-black flex items-center justify-center overflow-hidden">
        {hasWebGL ? (
          <Nikhilam3DCanvas lesson={lesson} activeChapter={activeChapter} />
        ) : (
          <Nikhilam2DFallback lesson={lesson} activeChapter={activeChapter} onJumpToChapter={jumpToChapter} />
        )}

        {/* Captions / Subtitle Bar (Clean, High-Contrast Editorial Overlay) */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-8 pointer-events-none z-20 flex justify-center">
          <div className="max-w-2xl w-full bg-[#0D0C0A]/95 border border-[#E5A93C]/30 rounded-xl px-5 py-3 shadow-2xl text-center transition-all">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#E5A93C] font-bold block mb-1">
              {activeChapter.title}
            </span>
            <p className="font-sans text-xs sm:text-sm text-[#F5F0E6] leading-relaxed font-normal">
              {activeChapter.captionText}
            </p>
          </div>
        </div>
      </div>

      {/* ── YOUTUBE-STYLE CONTROL DECK ── */}
      <div className="bg-[#0D0C0A] border-t border-[#E5A93C]/15 p-3.5 sm:p-4 space-y-3 z-20">
        
        {/* Progress & Chapter Scrubber Bar */}
        <div className="space-y-1.5">
          <div
            onClick={handleScrub}
            className="group relative w-full h-2 bg-[#1A1712] rounded-full cursor-pointer overflow-hidden border border-[#E5A93C]/15 hover:h-2.5 transition-all"
            title="Click or drag to seek in walkthrough"
          >
            {/* Filled Progress */}
            <div
              className="h-full bg-gradient-to-r from-[#FF9F1C] via-[#FFD700] to-[#E5A93C] shadow-[0_0_8px_rgba(229,169,60,0.5)] transition-all duration-150 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Chapter Ticks & Labels */}
          <div className="grid grid-cols-7 gap-1 pt-1">
            {lesson.chapters.map((chap, idx) => {
              const isCurrent = currentChapterIndex === idx;
              const isPassed = currentChapterIndex > idx;
              return (
                <button
                  key={chap.id}
                  onClick={() => jumpToChapter(idx)}
                  title={`${chap.id}. ${chap.title}`}
                  className={`text-left p-1.5 rounded-lg border text-[10px] font-mono truncate transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#E5A93C] text-black border-[#FFD700] font-bold shadow-[0_0_10px_rgba(229,169,60,0.25)]'
                      : isPassed
                      ? 'bg-[#E5A93C]/10 text-[#E5A93C] border-[#E5A93C]/25 font-medium'
                      : 'bg-[#14120D] text-[#A8A090] border-[#E5A93C]/10 hover:border-[#E5A93C]/35 hover:text-[#E5A93C]'
                  }`}
                >
                  <span className="block truncate">
                    {chap.id}. {chap.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Playback Controls Row */}
        <div className="flex items-center justify-between gap-3 pt-1">
          
          {/* Left Controls: Play/Pause, Replay, Prev/Next, Timestamps */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Primary Play/Pause Button */}
            <button
              onClick={handleTogglePlay}
              title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              className={`p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-[#C84B31] text-[#F5F0E6] border-[#C84B31] shadow-[0_0_12px_rgba(200,75,49,0.3)]'
                  : 'bg-[#E5A93C] hover:bg-[#D4AF37] text-black border-[#FFD700] shadow-[0_0_12px_rgba(229,169,60,0.3)]'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            {/* Replay */}
            <button
              onClick={handleReplay}
              title="Replay From Beginning"
              className="p-2 rounded-xl bg-[#14120D] border border-[#E5A93C]/15 text-[#A8A090] hover:text-[#E5A93C] hover:border-[#E5A93C]/35 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Prev / Next Step */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                disabled={currentChapterIndex === 0}
                title="Previous Scene (Left Arrow)"
                className="p-2 rounded-xl bg-[#14120D] border border-[#E5A93C]/15 text-[#A8A090] hover:text-[#E5A93C] hover:border-[#E5A93C]/35 disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentChapterIndex === lesson.chapters.length - 1}
                title="Next Scene (Right Arrow)"
                className="p-2 rounded-xl bg-[#14120D] border border-[#E5A93C]/15 text-[#A8A090] hover:text-[#E5A93C] hover:border-[#E5A93C]/35 disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Time Indicator */}
            <div className="font-mono text-xs text-[#A8A090] pl-1 sm:pl-2">
              <span className="text-[#F5F0E6] font-medium">{formatTime(currentTimeSec)}</span>
              <span className="mx-1 text-[#6E6759]">/</span>
              <span>{formatTime(totalDuration)}</span>
            </div>

          </div>

          {/* Right Controls: Narration Mute, Speed */}
          <div className="flex items-center gap-2">
            
            {/* Audio Narration Toggle (Web Speech API) */}
            <button
              onClick={() => {
                const nextMute = !isMuted;
                setIsMuted(nextMute);
                if (!nextMute && isPlaying) {
                  speakChapter(activeChapter);
                } else if (nextMute && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                }
              }}
              title={isMuted ? 'Unmute Audio Narration (Press M)' : 'Mute Audio Narration (Press M)'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                !isMuted
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 font-semibold'
                  : 'bg-[#14120D] border-[#E5A93C]/15 text-[#A8A090] hover:text-[#E5A93C]'
              }`}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
              <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Voice On'}</span>
            </button>

            {/* Playback Speed */}
            <button
              onClick={cycleSpeed}
              title="Click to cycle speed: 0.5x, 1x, 1.5x"
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#14120D] border border-[#E5A93C]/15 text-[#E5A93C] hover:border-[#E5A93C]/40 text-xs font-mono font-bold transition-all cursor-pointer"
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>{playbackSpeed}x</span>
            </button>

          </div>

        </div>

      </div>

      {/* ── EXPANDED EDUCATIONAL EXPLANATION & PRESET QUICK BAR ── */}
      <div className="bg-[#0D0C0A] border-t border-[#E5A93C]/15 p-4 sm:p-5 space-y-4">
        
        {/* Quick Presets Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5A93C]/10">
          <span className="text-xs font-mono text-[#A8A090] uppercase tracking-[0.2em] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
            Try Other Multiplications Near Base:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: '98 × 97 (Original)', a: '98', b: '97' },
              { label: '96 × 94', a: '96', b: '94' },
              { label: '99 × 98', a: '99', b: '98' },
              { label: '102 × 103 (Surplus)', a: '102', b: '103' },
              { label: '996 × 992 (Base 1000)', a: '996', b: '992' },
            ].map(p => {
              const isSelected = lesson.aStr === p.a && lesson.bStr === p.b;
              return (
                <button
                  key={p.label}
                  onClick={() => onSelectPreset && onSelectPreset(p.a, p.b)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#E5A93C] text-black font-bold border-[#FFD700]'
                      : 'bg-[#14120D] text-[#A8A090] border-[#E5A93C]/15 hover:text-[#E5A93C] hover:border-[#E5A93C]/35'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mathematical Place-Value Proof Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-[#14120D] border border-[#E5A93C]/15">
            <span className="text-[10px] font-mono text-[#A8A090] uppercase tracking-[0.2em] block mb-1">
              Place-Value Identity
            </span>
            <div className="font-mono text-xs text-[#FFD700]">
              {lesson.a} × {lesson.b} = {lesson.base} × ({lesson.base} + {lesson.devAStr} + {lesson.devBStr}) + ({lesson.devAStr} × {lesson.devBStr})
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#14120D] border border-[#E5A93C]/15">
            <span className="text-[10px] font-mono text-[#A8A090] uppercase tracking-[0.2em] block mb-1">
              Coordinate Alignment
            </span>
            <div className="font-mono text-xs text-[#F5F0E6]">
              {lesson.balancedLhs} × {lesson.base} + {lesson.balancedRhsStr} = <strong className="text-[#FFD700]">{lesson.finalAnswer}</strong>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#14120D] border border-emerald-500/20">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.2em] block mb-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Hardware Verification
            </span>
            <div className="font-mono text-xs text-emerald-300">
              Nikhilam: {lesson.finalAnswer} === Standard: {lesson.groundTruth}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
