// src/hooks/useLandingAnimation.ts
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

// ===== FORMAÇÃO =====
// Linha de scrimmage: x = 800 (~linha de 30 jardas, lado direito)
// Centro do campo: y = 267

export const OFFENSE = {
  QB: { x: 748, y: 267 },
  C: { x: 800, y: 267 },
  LG: { x: 800, y: 241 },
  RG: { x: 800, y: 293 },
  LT: { x: 800, y: 215 },
  RT: { x: 800, y: 319 },
  WR_TOP: { x: 820, y: 100 },
  WR_BOT: { x: 820, y: 440 },
  SLOT: { x: 810, y: 180 },
  TE: { x: 800, y: 345 },
  RB: { x: 720, y: 300 },
};

export const DEFENSE = {
  DE1: { x: 818, y: 225 },
  DT1: { x: 818, y: 255 },
  DT2: { x: 818, y: 279 },
  DE2: { x: 818, y: 309 },
  LB1: { x: 850, y: 220 },
  LB2: { x: 855, y: 267 },
  LB3: { x: 850, y: 314 },
  CB_TOP: { x: 870, y: 105 },
  CB_BOT: { x: 870, y: 440 },
  SS: { x: 900, y: 200 },
  FS: { x: 920, y: 300 },
};

// Rota do WR de cima: corre reto ~40px, corta pra dentro (slant)
const WR_TOP_ROUTE = "M 820,100 L 880,100 Q 920,100 940,140";
// Rota do Slot: corre um out route rápido
const SLOT_ROUTE = "M 810,180 L 860,180 L 880,155";
// Trajetória da bola: arco suave do QB ao WR
const BALL_PATH = "M 748,267 Q 850,150 940,140";
// CB reage
const CB_CHASE = "M 870,105 L 910,120";

export function useLandingAnimation() {
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Pequeno delay para garantir DOM pronto
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 2.5,
        delay: 0.8,
      });

      // ===== FASE 1: Jogadores entram =====
      tl.fromTo(
        ".player-offense",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.03,
          ease: "back.out(1.4)",
        },
      );

      tl.fromTo(
        ".player-defense",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.03,
          ease: "back.out(1.4)",
        },
        "-=0.35",
      );

      // ===== FASE 2: Pré-snap (leitura) =====
      tl.to({}, { duration: 1 });

      // ===== FASE 3: Snap — bola aparece no QB =====
      tl.set("#football", { opacity: 1, x: 748, y: 267 });

      // QB dropback
      tl.to(
        "#qb",
        {
          x: "-=35",
          duration: 0.45,
          ease: "power2.out",
        },
      );

      // Mover a bola junto com o QB
      tl.to(
        "#football",
        {
          x: "-=35",
          duration: 0.45,
          ease: "power2.out",
        },
        "<",
      );

      // ===== FASE 4: Rotas dos receivers =====
      tl.to(
        "#wr-top",
        {
          motionPath: {
            path: WR_TOP_ROUTE,
            align: "self",
            alignOrigin: [0.5, 0.5],
          },
          duration: 0.9,
          ease: "power1.inOut",
        },
      );

      tl.to(
        "#slot",
        {
          motionPath: {
            path: SLOT_ROUTE,
            align: "self",
            alignOrigin: [0.5, 0.5],
          },
          duration: 0.7,
          ease: "power1.inOut",
        },
        "<",
      );

      // CB acompanha
      tl.to(
        "#cb-top",
        {
          motionPath: {
            path: CB_CHASE,
            align: "self",
            alignOrigin: [0.5, 0.5],
          },
          duration: 0.85,
          ease: "power1.in",
        },
        "<",
      );

      // RB faz chip block e sai pro flat
      tl.to(
        "#rb",
        { x: "+=60", y: "+=40", duration: 0.8, ease: "power1.inOut" },
        "<",
      );

      // DL rush
      tl.to(
        "#de1",
        { x: "-=25", y: "+=8", duration: 0.8, ease: "power1.in" },
        "<",
      );
      tl.to(
        "#de2",
        { x: "-=25", y: "-=8", duration: 0.8, ease: "power1.in" },
        "<",
      );

      // ===== FASE 5: Lançamento =====
      tl.to("#football", {
        motionPath: {
          path: BALL_PATH,
          align: "self",
          alignOrigin: [0.5, 0.5],
        },
        duration: 0.65,
        ease: "none",
      });

      // Trail aparece com a bola
      tl.to(
        "#trail-glow-path",
        {
          strokeDashoffset: 0,
          opacity: 0.5,
          duration: 0.65,
          ease: "none",
        },
        "<",
      );

      tl.to(
        "#trail-line",
        {
          strokeDashoffset: 0,
          opacity: 0.6,
          duration: 0.65,
          ease: "none",
        },
        "<",
      );

      // ===== FASE 6: Catch flash =====
      tl.to("#catch-flash", {
        opacity: 0.7,
        scale: 2,
        duration: 0.12,
        ease: "power2.out",
      });
      tl.to("#catch-flash", {
        opacity: 0,
        scale: 0,
        duration: 0.35,
        ease: "power2.in",
      });

      // ===== FASE 7: YAC (run after catch) =====
      tl.to("#wr-top", {
        x: "+=70",
        y: "+=25",
        duration: 0.5,
        ease: "power2.in",
      });

      // ===== FASE 8: Segurar e fade out =====
      tl.to({}, { duration: 1.8 });

      tl.to("#play-layer", {
        opacity: 0,
        duration: 0.7,
        ease: "power1.inOut",
      });

      // ===== RESET =====
      tl.call(() => {
        // Reset transforms
        gsap.set(".player-offense, .player-defense", {
          opacity: 0,
          scale: 0,
          clearProps: "x,y",
        });
        gsap.set("#qb", { clearProps: "x,y" });
        gsap.set("#wr-top", { clearProps: "x,y" });
        gsap.set("#slot", { clearProps: "x,y" });
        gsap.set("#cb-top", { clearProps: "x,y" });
        gsap.set("#rb", { clearProps: "x,y" });
        gsap.set("#de1", { clearProps: "x,y" });
        gsap.set("#de2", { clearProps: "x,y" });
        gsap.set("#football", { opacity: 0, clearProps: "x,y" });
        gsap.set("#trail-glow-path", {
          strokeDashoffset: 2000,
          opacity: 0,
        });
        gsap.set("#trail-line", {
          strokeDashoffset: 2000,
          opacity: 0,
        });
        gsap.set("#catch-flash", { opacity: 0, scale: 0 });
        gsap.set("#play-layer", { opacity: 1 });
      });

      tlRef.current = tl;
    });

    return () => ctx.revert();
  }, []);

  return { timeline: tlRef };
}