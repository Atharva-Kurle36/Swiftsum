'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { NikhilamLessonData, NikhilamChapter } from '@/lib/math/nikhilamLesson';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import CometCanvas from './CometCanvas';

interface Nikhilam3DCanvasProps {
  lesson: NikhilamLessonData;
  activeChapter: NikhilamChapter;
}

interface ScreenCoord {
  x: number;
  y: number;
  visible: boolean;
}

export default function Nikhilam3DCanvas({ lesson, activeChapter }: Nikhilam3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [initError, setInitError] = useState<boolean>(false);

  // Keep latest activeChapter in a mutable ref to animate smoothly across chapters
  // without tearing down and rebuilding the WebGL context on every scene change
  const activeChapterRef = useRef<NikhilamChapter>(activeChapter);
  activeChapterRef.current = activeChapter;

  // DOM card refs for direct compositor transform updates (0 React re-renders during 60fps animation)
  const cardARef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);
  const basePillarRef = useRef<HTMLDivElement>(null);
  const badgeDevARef = useRef<HTMLDivElement>(null);
  const badgeDevBRef = useRef<HTMLDivElement>(null);
  const lhsCardRef = useRef<HTMLDivElement>(null);
  const rhsCardRef = useRef<HTMLDivElement>(null);
  const combLhsRef = useRef<HTMLDivElement>(null);
  const combRhsRef = useRef<HTMLDivElement>(null);
  const fusedCardRef = useRef<HTMLDivElement>(null);
  const finalCardRef = useRef<HTMLDivElement>(null);

  // References for scene & objects to smoothly interpolate
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Dynamic 3D groups references (pure spatial coordinate anchors — no misaligned decorative background slabs)
  const meshesRef = useRef<{
    groupA: THREE.Group;
    groupB: THREE.Group;
    basePillar: THREE.Group;
    badgeDevA: THREE.Group;
    badgeDevB: THREE.Group;
    crossGroup: THREE.Group;
    lhsGroup: THREE.Group;
    multGroup: THREE.Group;
    rhsGroup: THREE.Group;
    combineGroup: THREE.Group;
    combLhsGroup: THREE.Group;
    combRhsGroup: THREE.Group;
    fusedGroup: THREE.Group;
    verifyGroup: THREE.Group;
    finalGroup: THREE.Group;
    crossParticles: THREE.Mesh[];
  } | null>(null);

  // Mouse / Pointer drag orbit interaction
  const mouseRef = useRef<{ isDown: boolean; startX: number; startY: number; rotX: number; rotY: number }>({
    isDown: false,
    startX: 0,
    startY: 0,
    rotX: 0,
    rotY: 0
  });

  const { a, b, base, numZeros, devA, devB, lhs, rawRhs, balancedLhs, balancedRhsStr, finalAnswer, groundTruth } = lesson;

  const isSquaring = lesson.operationType === 'squaring';
  const isDuplex = isSquaring && lesson.squaringMethod === 'duplex';
  const isEkadhikena = isSquaring && lesson.squaringMethod === 'ekadhikena';
  const duplex = lesson.duplexData;
  const duplexTens = duplex ? duplex.tens : Math.floor(a / 10);
  const duplexUnits = duplex ? duplex.units : a % 10;
  const duplexDu = duplex ? duplex.du : duplexUnits * duplexUnits;
  const duplexDtu = duplex ? duplex.dtu : 2 * duplexTens * duplexUnits;
  const duplexDt = duplex ? duplex.dt : duplexTens * duplexTens;
  const duplexTensPart = duplex ? duplex.tensPart : duplexDt * 100;
  const duplexCrossPart = duplex ? duplex.crossPart : duplexDtu * 10;
  const duplexUnitsPart = duplex ? duplex.unitsPart : duplexDu;
  const duplexCarry1 = Math.floor(duplexDu / 10);
  const duplexUnitsPlaced = duplexDu % 10;

  const ekadhikena = lesson.ekadhikenaData;
  const ekPrefix = ekadhikena ? ekadhikena.prefix : Math.floor(a / 10);
  const ekSuccessor = ekadhikena ? ekadhikena.successor : ekPrefix + 1;
  const ekLhs = ekadhikena ? ekadhikena.lhs : ekPrefix * ekSuccessor;
  const ekRhs = ekadhikena ? ekadhikena.rhs : 25;

  // Format signed deviations with genuine mathematical minus sign
  const formatDevSign = (val: number) => (val >= 0 ? `+${val}` : `−${Math.abs(val)}`);
  const devAFormatted = useMemo(() => formatDevSign(devA), [devA]);
  const devBFormatted = useMemo(() => formatDevSign(devB), [devB]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 460;

    // Check WebGL availability and create high-performance renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch (err) {
      console.warn('WebGL initialization failed, falling back to 2D view:', err);
      setInitError(true);
      return;
    }

    // Create Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 80);
    camera.position.set(0, 2.2, 11.5);
    cameraRef.current = camera;

    // Controlled, Restrained Lighting (Matching landing page antique gold & charcoal atmosphere)
    const ambientLight = new THREE.AmbientLight(0x2d2417, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffdf78, 2.2);
    dirLight.position.set(6, 12, 8);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0xe5a93c, 0.9);
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0xffa500, 1.2, 20);
    accentLight.position.set(0, 1.2, 3);
    scene.add(accentLight);

    // Subtle Sacred Yantra Ring on Floor (Matching landing page celestial geometry, quiet and restrained)
    const floorGroup = new THREE.Group();
    floorGroup.position.set(0, -2.8, 0);
    floorGroup.rotation.x = -Math.PI / 2;

    const ringMat = new THREE.MeshBasicMaterial({ color: 0xe5a93c, transparent: true, opacity: 0.08 });
    const ring1 = new THREE.Mesh(new THREE.RingGeometry(3.8, 3.84, 64), ringMat);
    const ring2 = new THREE.Mesh(new THREE.RingGeometry(5.4, 5.45, 64), ringMat);
    floorGroup.add(ring1);
    floorGroup.add(ring2);
    scene.add(floorGroup);

    // --- 3D SPATIAL COORDINATE ANCHORS ---
    // Clean invisible spatial anchors ensure 100% precise alignment without redundant, misaligned backing slabs
    const groupA = new THREE.Group();
    groupA.position.set(-3.4, 0.5, 0);
    scene.add(groupA);

    const groupB = new THREE.Group();
    groupB.position.set(3.4, 0.5, 0);
    scene.add(groupB);

    const basePillar = new THREE.Group();
    basePillar.position.set(0, 2.6, 0);
    basePillar.scale.set(0.001, 0.001, 0.001);
    scene.add(basePillar);

    const badgeDevA = new THREE.Group();
    badgeDevA.position.set(-3.4, -1.5, 0);
    badgeDevA.scale.set(0.001, 0.001, 0.001);
    scene.add(badgeDevA);

    const badgeDevB = new THREE.Group();
    badgeDevB.position.set(3.4, -1.5, 0);
    badgeDevB.scale.set(0.001, 0.001, 0.001);
    scene.add(badgeDevB);

    // Cross-Addition 3D Group (Scene 4)
    const crossGroup = new THREE.Group();
    crossGroup.scale.set(0.001, 0.001, 0.001);

    const lhsGroup = new THREE.Group();
    lhsGroup.position.set(0, 0.4, 0.5);
    crossGroup.add(lhsGroup);

    // Photon particles flowing along the cross addition rays
    const crossParticles: THREE.Mesh[] = [];
    const pMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
    for (let p = 0; p < 6; p++) {
      const pMesh = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), pMat);
      crossGroup.add(pMesh);
      crossParticles.push(pMesh);
    }
    scene.add(crossGroup);

    // Deviation Multiplication 3D Group (Scene 5)
    const multGroup = new THREE.Group();
    multGroup.scale.set(0.001, 0.001, 0.001);

    const rhsGroup = new THREE.Group();
    rhsGroup.position.set(0, 0.4, 0.5);
    multGroup.add(rhsGroup);

    // Deviation multiplication unit cubes (e.g. 2×3 = 6 cubes)
    const unitCubesGroup = new THREE.Group();
    const absProduct = Math.min(Math.abs(rawRhs), 18) || 1;
    const cols = Math.min(absProduct, 6) || 1;
    const cubeGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0xe5a93c,
      roughness: 0.25,
      metalness: 0.85,
      emissive: 0x332206,
    });
    for (let i = 0; i < absProduct; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const c = new THREE.Mesh(cubeGeo, cubeMat);
      c.position.set((col - cols / 2 + 0.5) * 0.4, -1.1 + row * 0.4, 0.4);
      unitCubesGroup.add(c);
    }
    multGroup.add(unitCubesGroup);
    scene.add(multGroup);

    // Combine Parts 3D Group (Scene 6)
    const combineGroup = new THREE.Group();
    combineGroup.scale.set(0.001, 0.001, 0.001);

    const combLhsGroup = new THREE.Group();
    combLhsGroup.position.set(-1.8, 0.4, 0.5);
    combineGroup.add(combLhsGroup);

    const combRhsGroup = new THREE.Group();
    combRhsGroup.position.set(1.8, 0.4, 0.5);
    combineGroup.add(combRhsGroup);

    const fusedGroup = new THREE.Group();
    fusedGroup.position.set(0, 0.4, 0.6);
    fusedGroup.scale.set(0.001, 0.001, 0.001);
    combineGroup.add(fusedGroup);

    scene.add(combineGroup);

    // Verification 3D Group (Scene 7)
    const verifyGroup = new THREE.Group();
    verifyGroup.scale.set(0.001, 0.001, 0.001);

    const finalGroup = new THREE.Group();
    finalGroup.position.set(0, 0.4, 0.5);
    verifyGroup.add(finalGroup);

    scene.add(verifyGroup);

    meshesRef.current = {
      groupA,
      groupB,
      basePillar,
      badgeDevA,
      badgeDevB,
      crossGroup,
      lhsGroup,
      multGroup,
      rhsGroup,
      combineGroup,
      combLhsGroup,
      combRhsGroup,
      fusedGroup,
      verifyGroup,
      finalGroup,
      crossParticles,
    };

    // Responsive Canvas Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      if (w > 0 && h > 0) {
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h, false);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Pointer Drag Orbit (Subtle, responsive, no jarring bounces)
    const onPointerDown = (e: PointerEvent) => {
      mouseRef.current.isDown = true;
      mouseRef.current.startX = e.clientX;
      mouseRef.current.startY = e.clientY;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!mouseRef.current.isDown) return;
      const deltaX = (e.clientX - mouseRef.current.startX) * 0.003;
      const deltaY = (e.clientY - mouseRef.current.startY) * 0.003;
      mouseRef.current.rotY = Math.max(-0.35, Math.min(0.35, mouseRef.current.rotY + deltaX));
      mouseRef.current.rotX = Math.max(-0.25, Math.min(0.25, mouseRef.current.rotX + deltaY));
      mouseRef.current.startX = e.clientX;
      mouseRef.current.startY = e.clientY;
    };
    const onPointerUp = () => {
      mouseRef.current.isDown = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Helper: Project 3D object to 2D screen coordinate
    const projectObject = (obj: THREE.Object3D, w: number, h: number): ScreenCoord => {
      const v = new THREE.Vector3();
      obj.getWorldPosition(v);
      v.project(camera);
      return {
        x: (v.x * 0.5 + 0.5) * w,
        y: (-v.y * 0.5 + 0.5) * h,
        visible: v.z < 1.0,
      };
    };

    // Helper: Direct GPU-accelerated transform update without triggering React state re-renders
    const updateCard = (el: HTMLElement | null, coord: ScreenCoord, extraY = 0) => {
      if (!el) return;
      if (!coord.visible) {
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
      } else {
        el.style.opacity = '1';
        el.style.pointerEvents = 'auto';
        el.style.transform = `translate3d(calc(-50% + ${Math.round(coord.x)}px), calc(-50% + ${Math.round(coord.y + extraY)}px), 0)`;
      }
    };

    // Main Animation & Choreography Loop
    const startTime = performance.now();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 460;
      const currentChapterId = activeChapterRef.current.id;

      // Gentle spring return to neutral view when not dragging
      if (!mouseRef.current.isDown) {
        mouseRef.current.rotX += (0 - mouseRef.current.rotX) * 0.08;
        mouseRef.current.rotY += (0 - mouseRef.current.rotY) * 0.08;
      }

      // Clear three-zone vertical layout constants for squaring walkthrough:
      // Zone 1: Source Number Card (NUMBER TO SQUARE) near upper portion of scene
      // Zone 2: Main Calculation Card in central zone with generous visible gap from Zone 1 and Zone 3
      const isNarrow = rendererRef.current ? rendererRef.current.domElement.clientWidth < 640 : false;
      const SQUARING_ZONE1_Y = isNarrow ? 3.3 : 3.2; // Projects to upper screen
      const SQUARING_ZONE2_Y = isNarrow ? 0.9 : 0.8; // Projects to central screen

      // Smooth camera position lerp (accelerated to 0.12 for snappy responsiveness)
      if (cameraRef.current) {
        const cam = cameraRef.current;
        let targetCamX = mouseRef.current.rotY * 4.5;
        let targetCamY = 2.0 + mouseRef.current.rotX * 3.5;
        let targetCamZ = 11.2;

        if (isSquaring) {
          // Stable camera for squaring walkthrough to avoid unexpected vertical jumps or perspective swings
          targetCamX = mouseRef.current.rotY * 4.0;
          targetCamY = (isNarrow ? 1.9 : 1.8) + mouseRef.current.rotX * 3.0;
          targetCamZ = isNarrow ? 11.8 : 10.8;
        } else {
          // Existing multiplication camera choreography
          if (currentChapterId === 1) {
            targetCamZ = 10.8;
          } else if (currentChapterId === 2) {
            targetCamY = 2.4;
            targetCamZ = 12.0;
          } else if (currentChapterId === 3) {
            targetCamY = 1.6;
            targetCamZ = 10.8;
          } else if (currentChapterId === 4) {
            targetCamX = -0.3 + mouseRef.current.rotY * 4.5;
            targetCamY = 1.8;
            targetCamZ = 10.4;
          } else if (currentChapterId === 5) {
            targetCamY = 1.4;
            targetCamZ = 9.8;
          } else if (currentChapterId === 6) {
            targetCamY = 1.6;
            targetCamZ = 10.2;
          } else if (currentChapterId === 7) {
            targetCamY = 1.8;
            targetCamZ = 10.0;
          }
        }

        cam.position.x += (targetCamX - cam.position.x) * 0.12;
        cam.position.y += (targetCamY - cam.position.y) * 0.12;
        cam.position.z += (targetCamZ - cam.position.z) * 0.12;
        cam.lookAt(0, 0.4, 0);
      }

      // Smooth spatial anchor positions & scales per Chapter (lerp speed 0.15 for snappy response)
      const m = meshesRef.current;
      if (m) {
        const lerpSpeed = 0.15;

        // Animate cross particles in Scene 4 along cross addition vectors
        if (m.crossParticles.length > 0 && !isDuplex && !isEkadhikena) {
          m.crossParticles.forEach((p, idx) => {
            const t = (elapsedTime * 1.05 + idx * 0.16) % 1;
            if (idx < 3) {
              p.position.x = -3.4 + 6.8 * t;
              p.position.y = 0.5 - 2.0 * t + Math.sin(t * Math.PI) * 0.6;
              p.position.z = 0.3 + Math.sin(t * Math.PI) * 0.3;
            } else {
              p.position.x = 3.4 - 6.8 * t;
              p.position.y = 0.5 - 2.0 * t + Math.sin(t * Math.PI) * 0.6;
              p.position.z = 0.3 + Math.sin(t * Math.PI) * 0.3;
            }
          });
        }

        // Scene 1: Introduction
        if (currentChapterId === 1) {
          m.groupA.scale.lerp(new THREE.Vector3(1, 1, 1), lerpSpeed);
          m.groupA.position.lerp(new THREE.Vector3(isSquaring ? 0 : -3.0, 0.5, 0), lerpSpeed);
          m.groupB.scale.lerp(new THREE.Vector3(isSquaring ? 0.001 : 1, isSquaring ? 0.001 : 1, isSquaring ? 0.001 : 1), lerpSpeed);
          m.groupB.position.lerp(new THREE.Vector3(3.0, 0.5, 0), lerpSpeed);

          m.basePillar.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.badgeDevA.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.badgeDevB.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.crossGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.multGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.combineGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.verifyGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.lhsGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.rhsGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
        }

        // Scene 2: Identify Base (Multiplication / Yavadunam) or Split / Identify Digits (Ekadhikena / Duplex)
        else if (currentChapterId === 2) {
          if (isSquaring) {
            // Zone 1: Source Number Card
            m.groupA.scale.lerp(new THREE.Vector3(1, 1, 1), lerpSpeed);
            m.groupA.position.lerp(new THREE.Vector3(0, SQUARING_ZONE1_Y, 0), lerpSpeed);
            m.groupB.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);

            // Zone 2: Main Calculation Panel
            if (isDuplex || isEkadhikena) {
              m.basePillar.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
              m.lhsGroup.scale.lerp(new THREE.Vector3(1, 1, 1), lerpSpeed);
              m.lhsGroup.position.lerp(new THREE.Vector3(0, SQUARING_ZONE2_Y, 0), lerpSpeed);
              m.rhsGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            } else {
              m.basePillar.scale.lerp(new THREE.Vector3(1, 1, 1), lerpSpeed);
              m.basePillar.position.lerp(new THREE.Vector3(0, SQUARING_ZONE2_Y, 0), lerpSpeed);
              m.lhsGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
              m.rhsGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            }

            m.badgeDevA.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.badgeDevB.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.crossGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.multGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.combineGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.verifyGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          } else {
            m.groupA.scale.lerp(new THREE.Vector3(0.9, 0.9, 0.9), lerpSpeed);
            m.groupA.position.lerp(new THREE.Vector3(-3.8, 0.2, 0), lerpSpeed);
            m.groupB.scale.lerp(new THREE.Vector3(0.9, 0.9, 0.9), lerpSpeed);
            m.groupB.position.lerp(new THREE.Vector3(3.8, 0.2, 0), lerpSpeed);

            m.basePillar.scale.lerp(new THREE.Vector3(1, 1, 1), lerpSpeed);
            m.basePillar.position.lerp(new THREE.Vector3(0, 2.2, 0), lerpSpeed);
            m.lhsGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.rhsGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.badgeDevA.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.badgeDevB.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.crossGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.multGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.combineGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.verifyGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          }
        }

        // Scene 3: Deviations (Multiplication / Yavadunam), Units Duplex (Duplex), Successor (Ekadhikena)
        else if (currentChapterId === 3) {
          if (isSquaring) {
            // Zone 1: Source Number Card
            m.groupA.scale.lerp(new THREE.Vector3(1, 1, 1), lerpSpeed);
            m.groupA.position.lerp(new THREE.Vector3(0, SQUARING_ZONE1_Y, 0), lerpSpeed);
            m.groupB.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.basePillar.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);

            // Zone 2: Main Calculation Panel
            if (isDuplex || isEkadhikena) {
              m.badgeDevA.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
              m.lhsGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
              m.rhsGroup.scale.lerp(new THREE.Vector3(1, 1, 1), lerpSpeed);
              m.rhsGroup.position.lerp(new THREE.Vector3(0, SQUARING_ZONE2_Y, 0), lerpSpeed);
            } else {
              m.badgeDevA.scale.lerp(new THREE.Vector3(1, 1, 1), lerpSpeed);
              m.badgeDevA.position.lerp(new THREE.Vector3(0, SQUARING_ZONE2_Y, 0), lerpSpeed);
              m.lhsGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
              m.rhsGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            }

            m.badgeDevB.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.crossGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.multGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.combineGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.verifyGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          } else {
            m.groupA.scale.lerp(new THREE.Vector3(0.88, 0.88, 0.88), lerpSpeed);
            m.groupA.position.lerp(new THREE.Vector3(-3.4, 1.1, 0), lerpSpeed);
            m.groupB.scale.lerp(new THREE.Vector3(0.88, 0.88, 0.88), lerpSpeed);
            m.groupB.position.lerp(new THREE.Vector3(3.4, 1.1, 0), lerpSpeed);

            m.basePillar.scale.lerp(new THREE.Vector3(0.75, 0.75, 0.75), lerpSpeed);
            m.basePillar.position.lerp(new THREE.Vector3(0, 3.2, -1.2), lerpSpeed);

            m.badgeDevA.scale.lerp(new THREE.Vector3(1, 1, 1), lerpSpeed);
            m.badgeDevA.position.lerp(new THREE.Vector3(-3.4, -1.2, 0), lerpSpeed);
            m.badgeDevB.scale.lerp(new THREE.Vector3(1, 1, 1), lerpSpeed);
            m.badgeDevB.position.lerp(new THREE.Vector3(3.4, -1.2, 0), lerpSpeed);

            m.lhsGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.rhsGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.crossGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.multGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.combineGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.verifyGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          }
        }

        // Scene 4: Cross-Addition (Multiplication / Yavadunam), Cross Duplex (Duplex), Prefix × Successor (Ekadhikena)
        else if (currentChapterId === 4) {
          if (isSquaring) {
            // Zone 1: Source Number Card
            m.groupA.scale.lerp(new THREE.Vector3(1, 1, 1), lerpSpeed);
            m.groupA.position.lerp(new THREE.Vector3(0, SQUARING_ZONE1_Y, 0), lerpSpeed);
            m.groupB.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.basePillar.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.badgeDevA.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.badgeDevB.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.crossGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);

            // Zone 2: Main Calculation Panel
            m.lhsGroup.scale.lerp(new THREE.Vector3(1, 1, 1), lerpSpeed);
            m.lhsGroup.position.lerp(new THREE.Vector3(0, SQUARING_ZONE2_Y, 0), lerpSpeed);
            m.rhsGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);

            m.multGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.combineGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.verifyGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          } else {
            m.groupA.scale.lerp(new THREE.Vector3(0.78, 0.78, 0.78), lerpSpeed);
            m.groupA.position.lerp(new THREE.Vector3(-4.0, 1.6, 0), lerpSpeed);
            m.groupB.scale.lerp(new THREE.Vector3(0.78, 0.78, 0.78), lerpSpeed);
            m.groupB.position.lerp(new THREE.Vector3(4.0, 1.6, 0), lerpSpeed);

            m.badgeDevA.scale.lerp(new THREE.Vector3(0.85, 0.85, 0.85), lerpSpeed);
            m.badgeDevA.position.lerp(new THREE.Vector3(-4.0, -1.3, 0), lerpSpeed);
            m.badgeDevB.scale.lerp(new THREE.Vector3(0.85, 0.85, 0.85), lerpSpeed);
            m.badgeDevB.position.lerp(new THREE.Vector3(4.0, -1.3, 0), lerpSpeed);

            m.basePillar.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.crossGroup.scale.lerp(new THREE.Vector3(1, 1, 1), lerpSpeed);
            m.lhsGroup.position.lerp(new THREE.Vector3(0, 0.2, 0), lerpSpeed);
            m.rhsGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.multGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.combineGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.verifyGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          }
        }

        // Scene 5: Multiply Deviations (Multiplication / Yavadunam), Tens Duplex (Duplex), Square Terminal 5 (Ekadhikena)
        else if (currentChapterId === 5) {
          if (isSquaring) {
            // Zone 1: Source Number Card
            m.groupA.scale.lerp(new THREE.Vector3(1, 1, 1), lerpSpeed);
            m.groupA.position.lerp(new THREE.Vector3(0, SQUARING_ZONE1_Y, 0), lerpSpeed);
            m.groupB.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.basePillar.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.badgeDevA.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.badgeDevB.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.crossGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.multGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.lhsGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);

            // Zone 2: Main Calculation Panel
            m.rhsGroup.scale.lerp(new THREE.Vector3(1, 1, 1), lerpSpeed);
            m.rhsGroup.position.lerp(new THREE.Vector3(0, SQUARING_ZONE2_Y, 0), lerpSpeed);

            m.combineGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.verifyGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          } else {
            m.groupA.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.groupB.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.basePillar.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.crossGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);

            m.badgeDevA.scale.lerp(new THREE.Vector3(0.9, 0.9, 0.9), lerpSpeed);
            m.badgeDevA.position.lerp(new THREE.Vector3(-3.0, 0.4, 0), lerpSpeed);
            m.badgeDevB.scale.lerp(new THREE.Vector3(0.9, 0.9, 0.9), lerpSpeed);
            m.badgeDevB.position.lerp(new THREE.Vector3(3.0, 0.4, 0), lerpSpeed);

            m.multGroup.scale.lerp(new THREE.Vector3(1, 1, 1), lerpSpeed);
            m.lhsGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.rhsGroup.position.lerp(new THREE.Vector3(0, 0.2, 0), lerpSpeed);

            m.combineGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
            m.verifyGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          }
        }

        // Scene 6: Combine Both Parts / Contributions
        else if (currentChapterId === 6) {
          m.groupA.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.groupB.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.badgeDevA.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.badgeDevB.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.basePillar.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.crossGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.multGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.lhsGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.rhsGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);

          m.combineGroup.scale.lerp(new THREE.Vector3(1, 1, 1), lerpSpeed);

          m.combLhsGroup.position.x += (-1.3 - m.combLhsGroup.position.x) * lerpSpeed;
          m.combRhsGroup.position.x += (1.3 - m.combRhsGroup.position.x) * lerpSpeed;
          m.fusedGroup.scale.lerp(new THREE.Vector3(1, 1, 1), lerpSpeed * 1.5);

          m.verifyGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
        }

        // Scene 7: Verification (Elevated final answer)
        else if (currentChapterId === 7) {
          m.groupA.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.groupB.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.badgeDevA.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.badgeDevB.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.basePillar.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.crossGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.multGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.combineGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.lhsGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);
          m.rhsGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), lerpSpeed);

          m.verifyGroup.scale.lerp(new THREE.Vector3(1, 1, 1), lerpSpeed);
          m.verifyGroup.position.lerp(new THREE.Vector3(0, 0.2, 0), lerpSpeed);
        }

        // Direct hardware-accelerated transform updates to visible DOM cards
        updateCard(cardARef.current, projectObject(m.groupA, w, h));
        updateCard(cardBRef.current, projectObject(m.groupB, w, h));
        updateCard(basePillarRef.current, projectObject(m.basePillar, w, h));
        updateCard(badgeDevARef.current, projectObject(m.badgeDevA, w, h));
        updateCard(badgeDevBRef.current, projectObject(m.badgeDevB, w, h));
        updateCard(lhsCardRef.current, projectObject(m.lhsGroup, w, h));
        updateCard(rhsCardRef.current, projectObject(m.rhsGroup, w, h));
        updateCard(combLhsRef.current, projectObject(m.combLhsGroup, w, h));
        updateCard(combRhsRef.current, projectObject(m.combRhsGroup, w, h));
        updateCard(fusedCardRef.current, projectObject(m.fusedGroup, w, h), 70);
        updateCard(finalCardRef.current, projectObject(m.finalGroup, w, h));
      }

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP ON UNMOUNT
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      resizeObserver.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      scene.traverse(obj => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else if (obj.material) obj.material.dispose();
        }
      });

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [lesson.a, lesson.b, lesson.base]);

  if (initError) {
    return null; // Fallback will be triggered by parent
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[380px] sm:min-h-[460px] relative overflow-hidden cursor-grab active:cursor-grabbing rounded-xl bg-black"
      title="Click and drag to orbit in 3D"
    >
      {/* ── AMBIENT COMET & STARFIELD LAYER (behind Three.js canvas and overlays) ── */}
      <CometCanvas />

      {/* Subtle 3D Orbit Badge */}
      <div className="absolute top-3 right-3 pointer-events-none z-30 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0D0C0A]/85 border border-[#E5A93C]/20 text-[10px] font-mono text-[#A8A090]">
        <span>Drag to rotate</span>
      </div>

      {/* ── CRISP, CAMERA-ANCHORED TYPOGRAPHY OVERLAYS ── */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        
        {/* FACTOR A / NUMBER TO SQUARE CARD */}
        {(activeChapter.id === 1 || activeChapter.id === 2 || activeChapter.id === 3 || activeChapter.id === 4 || (lesson.operationType === 'squaring' && activeChapter.id === 5)) && (
          <div
            id="cardA"
            ref={cardARef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              willChange: 'transform',
            }}
            className={`flex flex-col items-center justify-center rounded-xl bg-[#14120D]/95 border border-[#E5A93C]/40 shadow-xl transition-opacity duration-150 ${
              isSquaring && activeChapter.id !== 1
                ? 'px-3.5 py-1.5 sm:px-5 sm:py-2 min-w-[110px] sm:min-w-[120px]'
                : 'px-5 py-2.5 sm:px-6 sm:py-3 min-w-[120px] sm:min-w-[130px]'
            }`}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A8A090] font-semibold leading-none text-center">
              {lesson.operationType === 'squaring' ? 'Number to Square' : 'Factor 1'}
            </span>
            <span
              className={`font-display font-bold text-[#F5F0E6] tracking-tight leading-none text-center tabular-nums ${
                isSquaring && activeChapter.id !== 1
                  ? 'text-2xl sm:text-4xl my-0.5 sm:my-1'
                  : 'text-3xl sm:text-5xl my-1 sm:my-1.5'
              }`}
            >
              {a}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E5A93C]/80 leading-none text-center">
              {lesson.operationType === 'squaring' ? `${a}² = ?` : 'Factor 1'}
            </span>
          </div>
        )}

        {/* FACTOR B CARD — only displayed for multiplication */}
        {lesson.operationType !== 'squaring' && (activeChapter.id === 1 || activeChapter.id === 2 || activeChapter.id === 3 || activeChapter.id === 4) && (
          <div
            id="cardB"
            ref={cardBRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              willChange: 'transform',
            }}
            className="flex flex-col items-center justify-center px-6 py-3 rounded-xl bg-[#14120D]/95 border border-[#E5A93C]/40 shadow-xl min-w-[130px] transition-opacity duration-150"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A8A090] font-semibold leading-none text-center">
              Factor 2
            </span>
            <span className="font-display text-4xl sm:text-5xl font-bold text-[#F5F0E6] tracking-tight leading-none text-center tabular-nums my-1.5">
              {b}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] invisible select-none leading-none text-center" aria-hidden="true">
              Factor 2
            </span>
          </div>
        )}

        {/* BASE MONOLITH LABEL (Yavadunam / Nikhilam Only — Never in Duplex or Ekadhikena) */}
        {!isDuplex && !isEkadhikena && (activeChapter.id === 2 || activeChapter.id === 3) && (
          <div
            id="basePillar"
            ref={basePillarRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              willChange: 'transform',
            }}
            className="flex flex-col items-center justify-center px-6 py-3.5 rounded-xl bg-[#1A1712]/95 border border-[#E5A93C]/60 shadow-[0_0_25px_rgba(229,169,60,0.2)] min-w-[190px] transition-opacity duration-150"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#E5A93C] font-semibold leading-none text-center mb-1">
              Reference Base
            </span>
            <span className="font-mono text-2xl sm:text-3xl font-bold text-[#FFD700] tracking-wider leading-none text-center tabular-nums my-1">
              BASE = {base}
            </span>
            <span className="font-sans text-[10px] text-[#A8A090] leading-none text-center mt-1">
              {numZeros} zeros allocated
            </span>
          </div>
        )}

        {/* DEVIATION A BADGE (Yavadunam / Nikhilam Only — Never in Duplex or Ekadhikena) */}
        {!isDuplex && !isEkadhikena && (activeChapter.id === 3 || activeChapter.id === 4 || activeChapter.id === 5) && (
          <div
            id="badgeDevA"
            ref={badgeDevARef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              willChange: 'transform',
            }}
            className="flex flex-col items-center justify-center px-4 py-2.5 rounded-lg bg-[#14120D]/95 border border-[#E5A93C]/50 shadow-lg min-w-[105px] transition-opacity duration-150"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#A8A090] font-semibold leading-none text-center">
              {lesson.operationType === 'squaring' ? 'Deviation (d)' : 'Deviation'}
            </span>
            <span className="font-mono text-2xl sm:text-3xl font-bold text-amber-400 tracking-tight leading-none text-center tabular-nums my-1">
              {devAFormatted}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#E5A93C]/70 leading-none text-center">
              {lesson.operationType === 'squaring' ? `d = ${a} − ${base}` : 'Deviation'}
            </span>
          </div>
        )}

        {/* DEVIATION B BADGE — only displayed for multiplication */}
        {lesson.operationType !== 'squaring' && (activeChapter.id === 3 || activeChapter.id === 4 || activeChapter.id === 5) && (
          <div
            id="badgeDevB"
            ref={badgeDevBRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              willChange: 'transform',
            }}
            className="flex flex-col items-center justify-center px-4 py-2.5 rounded-lg bg-[#14120D]/95 border border-[#E5A93C]/50 shadow-lg min-w-[105px] transition-opacity duration-150"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#A8A090] font-semibold leading-none text-center">
              Deviation
            </span>
            <span className="font-mono text-2xl sm:text-3xl font-bold text-amber-400 tracking-tight leading-none text-center tabular-nums my-1">
              {devBFormatted}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] invisible select-none leading-none text-center" aria-hidden="true">
              Deviation
            </span>
          </div>
        )}

        {/* SCENE 2 (DUPLEX OR EKADHIKENA): IDENTIFY DIGITS / SPLIT CARD */}
        {(isDuplex || isEkadhikena) && activeChapter.id === 2 && (
          <div
            id="lhsCard"
            ref={lhsCardRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              willChange: 'transform',
            }}
            className="flex flex-col items-center justify-center px-4 py-2 sm:px-7 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#14120D]/95 border border-[#E5A93C]/50 shadow-[0_10px_35px_rgba(0,0,0,0.85)] min-w-[220px] sm:min-w-[240px] max-w-[92vw] sm:max-w-md transition-opacity duration-150"
          >
            {isEkadhikena ? (
              <>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#A8A090] font-semibold leading-none text-center mb-0.5 sm:mb-1">
                  Split the Number: Prefix &amp; Terminal 5
                </span>
                <div className="font-display text-2xl sm:text-4xl font-bold text-[#FFD700] tracking-tight leading-none text-center tabular-nums my-0.5 sm:my-1">
                  {a} = {ekPrefix} | 5
                </div>
                <div className="flex items-center gap-2 sm:gap-3 my-0.5 sm:my-1">
                  <div className="flex flex-col items-center px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-lg bg-black/40 border border-[#E5A93C]/30">
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-[#A8A090]">Prefix</span>
                    <span className="font-display text-lg sm:text-2xl font-bold text-[#FFD700]">{ekPrefix}</span>
                  </div>
                  <div className="flex flex-col items-center px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-lg bg-black/40 border border-[#E5A93C]/30">
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-[#A8A090]">Last Digit</span>
                    <span className="font-display text-lg sm:text-2xl font-bold text-[#FFD700]">5</span>
                  </div>
                </div>
                <div className="font-mono text-[10px] sm:text-[11px] text-[#E5A93C]/90 leading-none text-center mt-0.5 sm:mt-1">
                  Prefix = {ekPrefix} · Last digit = 5
                </div>
              </>
            ) : (
              <>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#A8A090] font-semibold leading-none text-center mb-0.5 sm:mb-1">
                  Identify Digits &amp; Place Values
                </span>
                <div className="flex items-center gap-2 sm:gap-3 my-0.5 sm:my-1">
                  <div className="flex flex-col items-center px-2.5 py-0.5 sm:px-3.5 sm:py-1.5 rounded-lg bg-black/40 border border-[#E5A93C]/30">
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-[#A8A090]">Tens Digit (a)</span>
                    <span className="font-display text-xl sm:text-3xl font-bold text-[#FFD700]">{duplexTens}</span>
                  </div>
                  <div className="flex flex-col items-center px-2.5 py-0.5 sm:px-3.5 sm:py-1.5 rounded-lg bg-black/40 border border-[#E5A93C]/30">
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-[#A8A090]">Units Digit (b)</span>
                    <span className="font-display text-xl sm:text-3xl font-bold text-[#FFD700]">{duplexUnits}</span>
                  </div>
                </div>
                <div className="font-mono text-[10px] sm:text-[11px] text-[#E5A93C]/90 leading-none text-center mt-0.5 sm:mt-1">
                  Tens digit = {duplexTens} · Units digit = {duplexUnits} ({a} = 10 × {duplexTens} + {duplexUnits})
                </div>
              </>
            )}
          </div>
        )}

        {/* SCENE 3 (DUPLEX OR EKADHIKENA): UNITS DUPLEX / SUCCESSOR CARD */}
        {(isDuplex || isEkadhikena) && activeChapter.id === 3 && (
          <div
            id="rhsCard"
            ref={rhsCardRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              willChange: 'transform',
            }}
            className="flex flex-col items-center justify-center px-6 py-3 sm:px-7 sm:py-3.5 rounded-2xl bg-[#14120D]/95 border border-[#E5A93C]/50 shadow-[0_10px_35px_rgba(0,0,0,0.85)] min-w-[240px] max-w-[92vw] sm:max-w-md transition-opacity duration-150"
          >
            {isEkadhikena ? (
              <>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A8A090] font-semibold leading-none text-center mb-1">
                  Find the Successor (Ekadhika)
                </span>
                <div className="font-display text-3xl sm:text-4xl font-bold text-[#FFD700] tracking-tight leading-none text-center tabular-nums my-1">
                  Successor = {ekPrefix} + 1 = {ekSuccessor}
                </div>
                <div className="font-mono text-[11px] text-[#E5A93C]/90 leading-none text-center mt-1">
                  Prefix = {ekPrefix} ➔ Successor = {ekSuccessor}
                </div>
                <div className="font-sans text-[10px] text-[#A8A090]/80 leading-none text-center mt-1">
                  Ekadhikena means &quot;by one more than the preceding number&quot;
                </div>
              </>
            ) : (
              <>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A8A090] font-semibold leading-none text-center mb-1">
                  Units Duplex: D({duplexUnits}) = {duplexUnits}²
                </span>
                <div className="font-display text-3xl sm:text-4xl font-bold text-[#FFD700] tracking-tight leading-none text-center tabular-nums my-1">
                  D({duplexUnits}) = {duplexDu}
                </div>
                <div className="font-mono text-[11px] text-[#E5A93C]/90 leading-none text-center mt-1">
                  Result: Units contribution = {duplexDu}
                </div>
                {duplexDu >= 10 && (
                  <div className="font-sans text-[10px] text-amber-300 leading-none text-center mt-1">
                    Place {duplexUnitsPlaced} in units column, carry {duplexCarry1} to tens column
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* SCENE 4: CROSS-ADDITION (YAVADUNAM), PREFIX × SUCCESSOR (EKADHIKENA), OR CROSS DUPLEX (DUPLEX) CARD */}
        {activeChapter.id === 4 && (
          <div
            id="lhsCard"
            ref={lhsCardRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              willChange: 'transform',
            }}
            className="flex flex-col items-center justify-center px-6 py-3 sm:px-7 sm:py-3.5 rounded-2xl bg-[#14120D]/95 border border-[#E5A93C]/50 shadow-[0_10px_35px_rgba(0,0,0,0.85)] min-w-[240px] max-w-[92vw] sm:max-w-md transition-opacity duration-150"
          >
            {isDuplex ? (
              <>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A8A090] font-semibold leading-none text-center mb-1">
                  Cross Duplex: D({duplexTens}, {duplexUnits}) = 2 × {duplexTens} × {duplexUnits}
                </span>
                <div className="font-display text-3xl sm:text-4xl font-bold text-[#FFD700] tracking-tight leading-none text-center tabular-nums my-1">
                  D({duplexTens}, {duplexUnits}) = {duplexDtu}
                </div>
                <div className="font-mono text-[11px] text-[#E5A93C]/90 leading-none text-center mt-1">
                  {duplexUnits === 0 || duplexTens === 0
                    ? 'Cross contribution is zero because one of the digits is zero'
                    : `Cross contribution = ${duplexDtu} × 10 = ${duplexCrossPart} (Place Value 10)`}
                </div>
                <div className="font-sans text-[10px] text-[#A8A090]/80 leading-none text-center mt-1">
                  Evaluates the 2ab term in (10a + b)² = 100a² + 20ab + b²
                </div>
              </>
            ) : isEkadhikena ? (
              <>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A8A090] font-semibold leading-none text-center mb-1">
                  Multiply the Prefix and Successor
                </span>
                <div className="font-display text-3xl sm:text-4xl font-bold text-[#FFD700] tracking-tight leading-none text-center tabular-nums my-1">
                  LEFT PART = {ekLhs}
                </div>
                <div className="font-mono text-[12px] text-[#E5A93C] font-bold leading-none text-center mt-1">
                  {ekPrefix} × {ekSuccessor} = {ekLhs}
                </div>
                <div className="font-sans text-[10px] text-[#A8A090]/80 leading-none text-center mt-1">
                  This must be the actual calculation that produces {ekLhs}
                </div>
              </>
            ) : (
              <>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A8A090] font-semibold leading-none text-center mb-1">
                  {lesson.operationType === 'squaring' ? 'Left Component (n + d)' : 'Cross-Add Symmetry'}
                </span>
                <div className="font-display text-3xl sm:text-4xl font-bold text-[#FFD700] tracking-tight leading-none text-center tabular-nums my-1">
                  LEFT PART = {lhs}
                </div>
                <div className="font-mono text-[11px] text-[#E5A93C]/90 leading-none text-center mt-1">
                  {lesson.operationType === 'squaring'
                    ? `left = n + d = ${a} + (${devAFormatted}) = ${lhs}`
                    : `${a} + (${devBFormatted}) = ${b} + (${devAFormatted}) = ${lhs}`}
                </div>
              </>
            )}
          </div>
        )}

        {/* SCENE 5: MULTIPLY DEVIATIONS (YAVADUNAM), SQUARE TERMINAL 5 (EKADHIKENA), OR TENS DUPLEX (DUPLEX) CARD */}
        {activeChapter.id === 5 && (
          <div
            id="rhsCard"
            ref={rhsCardRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              willChange: 'transform',
            }}
            className="flex flex-col items-center justify-center px-6 py-3 sm:px-7 sm:py-3.5 rounded-2xl bg-[#14120D]/95 border border-[#E5A93C]/50 shadow-[0_10px_35px_rgba(0,0,0,0.85)] min-w-[240px] max-w-[92vw] sm:max-w-md transition-opacity duration-150"
          >
            {isDuplex ? (
              <>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A8A090] font-semibold leading-none text-center mb-1">
                  Tens Duplex: D({duplexTens}) = {duplexTens}²
                </span>
                <div className="font-display text-3xl sm:text-4xl font-bold text-[#FFD700] tracking-tight leading-none text-center tabular-nums my-1">
                  D({duplexTens}) = {duplexDt}
                </div>
                <div className="font-mono text-[11px] text-[#E5A93C]/90 leading-none text-center mt-1">
                  Digit {duplexTens} represents {duplexTens} tens ➔ ({duplexTens} × 10)² = {duplexDt} × 100 = {duplexTensPart}
                </div>
                <div className="font-sans text-[10px] text-amber-300 leading-none text-center mt-1">
                  Result: Tens contribution = {duplexTensPart}
                </div>
              </>
            ) : isEkadhikena ? (
              <>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A8A090] font-semibold leading-none text-center mb-1">
                  Square the Final Digit
                </span>
                <div className="font-display text-3xl sm:text-4xl font-bold text-[#FFD700] tracking-tight leading-none text-center tabular-nums my-1">
                  RIGHT PART = 25
                </div>
                <div className="font-mono text-[12px] text-[#E5A93C] font-bold leading-none text-center mt-1">
                  5² = 25
                </div>
                <div className="font-sans text-[10px] text-[#A8A090]/80 leading-none text-center mt-1">
                  The final digit is 5, and its square is 25
                </div>
              </>
            ) : (
              <>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A8A090] font-semibold leading-none text-center mb-1">
                  {lesson.operationType === 'squaring'
                    ? `Square of Deviation (${numZeros} Digit${numZeros > 1 ? 's' : ''} Allocated)`
                    : `Deviation Product (${numZeros} Digits Allocated)`}
                </span>
                <div className="font-display text-3xl sm:text-4xl font-bold text-[#FFD700] tracking-tight leading-none text-center tabular-nums my-1">
                  RIGHT PART = {balancedRhsStr}
                </div>
                <div className="font-mono text-[11px] text-[#E5A93C]/90 leading-none text-center mt-1">
                  {lesson.operationType === 'squaring'
                    ? `right = d² = (${devAFormatted})² = ${rawRhs} ➔ "${balancedRhsStr}"`
                    : `(${devAFormatted}) × (${devBFormatted}) = +${rawRhs} ➔ "${balancedRhsStr}"`}
                </div>
              </>
            )}
          </div>
        )}

        {/* SCENE 6: COMBINE LEFT PART & RIGHT PART */}
        {activeChapter.id === 6 && (
          <div
            id="combLhsCard"
            ref={combLhsRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              willChange: 'transform',
            }}
            className="flex flex-col items-center justify-center px-6 py-4 rounded-2xl bg-[#14120D]/95 border border-[#E5A93C]/40 shadow-xl w-[170px] sm:w-[200px] transition-opacity duration-150"
          >
            {isDuplex ? (
              <>
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#A8A090] font-semibold leading-none text-center whitespace-nowrap mb-1">
                  TENS CONTRIBUTION
                </span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-[#FFD700] tracking-tight leading-none text-center tabular-nums my-1">
                  {duplexTensPart}
                </span>
                <span className="font-mono text-[10px] text-[#E5A93C] leading-none text-center whitespace-nowrap mt-1">
                  {`100 × ${duplexTens}² = ${duplexTensPart}`}
                </span>
              </>
            ) : (
              <>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A8A090] font-semibold leading-none text-center whitespace-nowrap">
                  LEFT PART
                </span>
                <span className="font-display text-3xl sm:text-4xl font-bold text-[#FFD700] tracking-tight leading-none text-center tabular-nums my-1.5">
                  {isEkadhikena ? ekLhs : balancedLhs}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A8A090]/80 leading-none text-center whitespace-nowrap">
                  {isEkadhikena ? `${ekLhs} Hundreds` : 'LEFT PART'}
                </span>
              </>
            )}
          </div>
        )}

        {activeChapter.id === 6 && (
          <div
            id="combRhsCard"
            ref={combRhsRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              willChange: 'transform',
            }}
            className="flex flex-col items-center justify-center px-6 py-4 rounded-2xl bg-[#14120D]/95 border border-[#E5A93C]/40 shadow-xl w-[170px] sm:w-[200px] transition-opacity duration-150"
          >
            {isDuplex ? (
              <>
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#A8A090] font-semibold leading-none text-center whitespace-nowrap mb-1">
                  CROSS &amp; UNITS
                </span>
                <div className="font-mono text-[10px] text-[#FFD700] leading-tight text-center my-0.5">
                  Cross: 10 × (2 × {duplexTens} × {duplexUnits}) = {duplexCrossPart}
                </div>
                <div className="font-mono text-[10px] text-[#FFD700] leading-tight text-center my-0.5">
                  Units: {duplexUnits}² = {duplexUnitsPart}
                </div>
                <span className="font-mono text-[10px] text-[#E5A93C] leading-none text-center whitespace-nowrap mt-1">
                  Sum: {duplexCrossPart} + {duplexUnitsPart} = {duplexCrossPart + duplexUnitsPart}
                </span>
              </>
            ) : (
              <>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A8A090] font-semibold leading-none text-center whitespace-nowrap">
                  RIGHT PART
                </span>
                <span className="font-display text-3xl sm:text-4xl font-bold text-[#FFD700] tracking-tight leading-none text-center tabular-nums my-1.5">
                  {isEkadhikena ? ekRhs : balancedRhsStr}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A8A090]/80 leading-none text-center whitespace-nowrap">
                  {isEkadhikena ? '5² = 25' : 'RIGHT PART'}
                </span>
              </>
            )}
          </div>
        )}

        {/* SCENE 6: FUSED / SYNTHESIZED PRODUCT */}
        {activeChapter.id === 6 && (
          <div
            id="fusedCard"
            ref={fusedCardRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              willChange: 'transform',
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black/90 border border-[#E5A93C]/30 shadow-lg text-xs font-mono text-[#D1C9BE] transition-opacity duration-150"
          >
            {isDuplex ? (
              <div className="flex flex-col items-center gap-1 text-center font-mono py-0.5">
                <div className="text-xs text-[#D1C9BE] flex items-center gap-1.5 flex-wrap justify-center">
                  <span>Then show:</span>
                  <span className="text-[#FFD700] font-bold">{duplexTensPart}</span>
                  <span className="text-[#E5A93C]">+</span>
                  <span className="text-[#FFD700] font-bold">{duplexCrossPart}</span>
                  <span className="text-[#E5A93C]">+</span>
                  <span className="text-[#FFD700] font-bold">{duplexUnitsPart}</span>
                  <span className="text-[#E5A93C]">=</span>
                  <strong className="text-sm sm:text-base text-[#FFD700]">{finalAnswer}</strong>
                </div>
                <div className="text-xs text-amber-400 font-bold">
                  Final result: {a}² = {finalAnswer}
                </div>
              </div>
            ) : isEkadhikena ? (
              <>
                <span>{ekLhs} | 25</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E5A93C]" />
                <span>{ekLhs} × 100 + 25</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E5A93C]" />
                <strong className="text-base text-[#FFD700]">{finalAnswer}</strong>
              </>
            ) : (
              <>
                <span>{balancedLhs} × {base} + {balancedRhsStr}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E5A93C]" />
                <strong className="text-base text-[#FFD700]">{finalAnswer}</strong>
              </>
            )}
          </div>
        )}

        {/* SCENE 7: FINAL VERIFIED CELEBRATION CARD */}
        {activeChapter.id === 7 && (
          <div
            id="vrRing"
            ref={finalCardRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              willChange: 'transform',
            }}
            className="flex flex-col items-center justify-center p-7 sm:p-8 rounded-3xl bg-[#14120D]/95 border border-[#E5A93C]/50 shadow-[0_0_40px_rgba(229,169,60,0.22)] min-w-[260px] sm:min-w-[280px] transition-opacity duration-150"
          >
            {/* Top Verified Badge */}
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-semibold leading-none mb-3 z-10">
              <CheckCircle2 className="w-4 h-4" />
              <span>Arithmetic Verification Passed</span>
            </div>

            {/* Dedicated Answer Container with Shared Center Gold Circle */}
            <div className="relative flex items-center justify-center w-36 h-36 sm:w-40 sm:h-40 my-1">
              {/* Luminous Gold Circular Ring — 100% Mathematically Centered with Answer */}
              <div
                className="absolute inset-0 rounded-full border-2 border-[#FFD700] shadow-[0_0_24px_rgba(255,215,0,0.4),inset_0_0_16px_rgba(229,169,60,0.25)] pointer-events-none"
                style={{ boxSizing: 'border-box' }}
              />
              {/* Subtle Concentric Outer Accent Ring */}
              <div
                className="absolute -inset-2.5 rounded-full border border-[#E5A93C]/35 pointer-events-none"
                style={{ boxSizing: 'border-box' }}
              />

              {/* The Final Answer: Dead Center */}
              <span className="relative z-10 font-display text-5xl sm:text-6xl font-bold text-[#FFD700] tracking-tight leading-none text-center tabular-nums select-none drop-shadow-[0_2px_14px_rgba(255,215,0,0.45)]">
                {finalAnswer}
              </span>
            </div>

            {/* Subtitle Formula */}
            <div className="font-mono text-xs text-[#A8A090] leading-none text-center mt-3 z-10">
              {lesson.operationType === 'squaring' ? `${a}² = ${finalAnswer}` : `${a} × ${b} = ${finalAnswer}`}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
