import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

function DNAHelix() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const helixRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const width = container.clientWidth || 260;
      const height = container.clientHeight || 620;

      // ============================================================
      // THREE.JS SCENE SETUP
      // ============================================================
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera - orthographic for consistent 2D-like appearance
      const camera = new THREE.OrthographicCamera(
        -130,
        130,
        310,
        -310,
        0.1,
        1000
      );
      camera.position.z = 200;

      // Renderer with transparent background
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(window.devicePixelRatio);
      rendererRef.current = renderer;
      container.appendChild(renderer.domElement);

      // ============================================================
      // DNA HELIX GEOMETRY
      // ============================================================
      const helix = new THREE.Group();
      helixRef.current = helix;
      scene.add(helix);

      const dnaConfig = {
        turns: 4.5,
        resolution: 120,
        radius: 42,
        height: 580,
      };

      // Create strand paths
      const strandAPoints = [];
      const strandBPoints = [];
      const basePairLines = [];

      for (let i = 0; i <= dnaConfig.resolution; i++) {
        const progress = i / dnaConfig.resolution;
        const angle = progress * Math.PI * 2 * dnaConfig.turns;
        const y = -progress * dnaConfig.height + dnaConfig.height / 2;

        // Strand A (Cyan) - main phase
        const zA = Math.sin(angle);
        const xA = Math.cos(angle) * dnaConfig.radius;
        strandAPoints.push(new THREE.Vector3(xA, y, zA * 30));

        // Strand B (Violet) - opposite phase
        const angleB = angle + Math.PI;
        const zB = Math.sin(angleB);
        const xB = Math.cos(angleB) * dnaConfig.radius;
        strandBPoints.push(new THREE.Vector3(xB, y, zB * 30));

        // Base pairs at regular intervals
        if (i % 6 === 0 && i > 0) {
          basePairLines.push({
            start: new THREE.Vector3(xA, y, zA * 30),
            end: new THREE.Vector3(xB, y, zB * 30),
          });
        }
      }

      // ============================================================
      // STRANDS - LINE GEOMETRY
      // ============================================================
      const strandAGeometry = new THREE.BufferGeometry().setFromPoints(
        strandAPoints
      );
      const strandAMaterial = new THREE.LineBasicMaterial({
        color: 0x74eeff,
        linewidth: 4,
        transparent: true,
        opacity: 0.95,
      });
      const strandALine = new THREE.Line(strandAGeometry, strandAMaterial);
      helix.add(strandALine);

      const strandBGeometry = new THREE.BufferGeometry().setFromPoints(
        strandBPoints
      );
      const strandBMaterial = new THREE.LineBasicMaterial({
        color: 0xc288ff,
        linewidth: 4,
        transparent: true,
        opacity: 0.95,
      });
      const strandBLine = new THREE.Line(strandBGeometry, strandBMaterial);
      helix.add(strandBLine);

      // ============================================================
      // BASE PAIRS - CONNECTING LINES
      // ============================================================
      const basePairMaterial = new THREE.LineBasicMaterial({
        color: 0x7ef5d8,
        linewidth: 2,
        transparent: true,
        opacity: 0.6,
      });

      basePairLines.forEach((pair) => {
        const pairGeometry = new THREE.BufferGeometry().setFromPoints([
          pair.start,
          pair.end,
        ]);
        const pairLine = new THREE.Line(pairGeometry, basePairMaterial);
        helix.add(pairLine);
      });

      // ============================================================
      // NODES - SPHERE GEOMETRY
      // ============================================================
      const nodeGeometry = new THREE.SphereGeometry(4, 16, 16);
      const nodeAMaterial = new THREE.MeshBasicMaterial({
        color: 0x74eeff,
        transparent: true,
        opacity: 0.85,
      });
      const nodeBMaterial = new THREE.MeshBasicMaterial({
        color: 0xc288ff,
        transparent: true,
        opacity: 0.85,
      });

      // Sample nodes from strands
      const nodeInterval = 8;
      strandAPoints.forEach((point, i) => {
        if (i % nodeInterval === 0) {
          const mesh = new THREE.Mesh(nodeGeometry, nodeAMaterial);
          mesh.position.copy(point);
          helix.add(mesh);
        }
      });

      strandBPoints.forEach((point, i) => {
        if (i % nodeInterval === 0) {
          const mesh = new THREE.Mesh(nodeGeometry, nodeBMaterial);
          mesh.position.copy(point);
          helix.add(mesh);
        }
      });

      // ============================================================
      // ANIMATION - Infinite Rotation via GSAP
      // ============================================================
      gsap.to(helix.rotation, {
        z: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      // ============================================================
      // RENDER LOOP
      // ============================================================
      let animationId;

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      // ============================================================
      // WINDOW RESIZE HANDLER
      // ============================================================
      const onWindowResize = () => {
        if (!container) return;
        const newWidth = container.clientWidth || 260;
        const newHeight = container.clientHeight || 620;
        renderer.setSize(newWidth, newHeight);
        camera.updateProjectionMatrix();
      };

      window.addEventListener("resize", onWindowResize);

      // ============================================================
      // CLEANUP
      // ============================================================
      return () => {
        window.removeEventListener("resize", onWindowResize);
        cancelAnimationFrame(animationId);
        renderer.dispose();
        strandAGeometry.dispose();
        strandBGeometry.dispose();
        nodeGeometry.dispose();
        strandAMaterial.dispose();
        strandBMaterial.dispose();
        basePairMaterial.dispose();
        nodeAMaterial.dispose();
        nodeBMaterial.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      role="presentation"
      aria-hidden="true"
    />
  );
}

export default DNAHelix;
