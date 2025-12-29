"use client";

import { useEffect, useRef } from "react";

interface CircuitPath {
  points: { x: number; y: number }[];
  pulsePosition: number;
  pulseSpeed: number;
  opacity: number;
}

export function SciFiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let circuits: CircuitPath[] = [];
    let nodes: { x: number; y: number; size: number; pulse: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initCircuits();
    };

    const initCircuits = () => {
      circuits = [];
      nodes = [];

      // Create circuit paths
      const numCircuits = Math.floor((canvas.width * canvas.height) / 80000);

      for (let i = 0; i < numCircuits; i++) {
        const path = generateCircuitPath();
        circuits.push({
          points: path,
          pulsePosition: Math.random(),
          pulseSpeed: 0.002 + Math.random() * 0.003,
          opacity: 0.03 + Math.random() * 0.04,
        });

        // Add nodes at path endpoints and corners
        path.forEach((point, idx) => {
          if (idx === 0 || idx === path.length - 1 || Math.random() < 0.3) {
            nodes.push({
              x: point.x,
              y: point.y,
              size: 2 + Math.random() * 3,
              pulse: Math.random() * Math.PI * 2,
            });
          }
        });
      }
    };

    const generateCircuitPath = (): { x: number; y: number }[] => {
      const points: { x: number; y: number }[] = [];
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      points.push({ x, y });

      const segments = 3 + Math.floor(Math.random() * 5);

      for (let i = 0; i < segments; i++) {
        // Circuit paths move in straight lines (horizontal or vertical)
        const horizontal = Math.random() > 0.5;
        const distance = 50 + Math.random() * 200;

        if (horizontal) {
          x += (Math.random() > 0.5 ? 1 : -1) * distance;
        } else {
          y += (Math.random() > 0.5 ? 1 : -1) * distance;
        }

        // Keep within bounds
        x = Math.max(0, Math.min(canvas.width, x));
        y = Math.max(0, Math.min(canvas.height, y));

        points.push({ x, y });
      }

      return points;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw circuit paths
      circuits.forEach((circuit) => {
        // Draw the base path
        ctx.strokeStyle = `rgba(0, 212, 255, ${circuit.opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();

        circuit.points.forEach((point, idx) => {
          if (idx === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();

        // Draw flowing electricity pulse
        circuit.pulsePosition += circuit.pulseSpeed;
        if (circuit.pulsePosition > 1) circuit.pulsePosition = 0;

        const totalLength = calculatePathLength(circuit.points);
        const pulseDistance = circuit.pulsePosition * totalLength;
        const pulsePoint = getPointAtDistance(circuit.points, pulseDistance);

        if (pulsePoint) {
          // Glowing pulse
          const gradient = ctx.createRadialGradient(
            pulsePoint.x,
            pulsePoint.y,
            0,
            pulsePoint.x,
            pulsePoint.y,
            20
          );
          gradient.addColorStop(0, "rgba(0, 212, 255, 0.4)");
          gradient.addColorStop(0.5, "rgba(0, 212, 255, 0.1)");
          gradient.addColorStop(1, "rgba(0, 212, 255, 0)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(pulsePoint.x, pulsePoint.y, 20, 0, Math.PI * 2);
          ctx.fill();

          // Bright center
          ctx.fillStyle = "rgba(0, 212, 255, 0.8)";
          ctx.beginPath();
          ctx.arc(pulsePoint.x, pulsePoint.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw nodes with pulsing effect
      nodes.forEach((node) => {
        node.pulse += 0.02;
        const pulseScale = 1 + Math.sin(node.pulse) * 0.3;

        // Outer glow
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.size * 3 * pulseScale
        );
        gradient.addColorStop(0, "rgba(0, 212, 255, 0.15)");
        gradient.addColorStop(1, "rgba(0, 212, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 3 * pulseScale, 0, Math.PI * 2);
        ctx.fill();

        // Inner node
        ctx.fillStyle = `rgba(0, 212, 255, ${0.3 + Math.sin(node.pulse) * 0.2})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * pulseScale, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    const calculatePathLength = (points: { x: number; y: number }[]): number => {
      let length = 0;
      for (let i = 1; i < points.length; i++) {
        const dx = points[i].x - points[i - 1].x;
        const dy = points[i].y - points[i - 1].y;
        length += Math.sqrt(dx * dx + dy * dy);
      }
      return length;
    };

    const getPointAtDistance = (
      points: { x: number; y: number }[],
      distance: number
    ): { x: number; y: number } | null => {
      let accumulated = 0;

      for (let i = 1; i < points.length; i++) {
        const dx = points[i].x - points[i - 1].x;
        const dy = points[i].y - points[i - 1].y;
        const segmentLength = Math.sqrt(dx * dx + dy * dy);

        if (accumulated + segmentLength >= distance) {
          const ratio = (distance - accumulated) / segmentLength;
          return {
            x: points[i - 1].x + dx * ratio,
            y: points[i - 1].y + dy * ratio,
          };
        }

        accumulated += segmentLength;
      }

      return points[points.length - 1];
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Canvas for animated circuit */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(3,8,16,0.5) 100%)",
        }}
      />
    </>
  );
}
