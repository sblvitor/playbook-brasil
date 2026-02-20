// src/components/landing/LandingHero.tsx
import { BallTrail } from "@/components/ball-trail";
import { Field } from "@/components/field";
import { Football } from "@/components/football";
import { Player } from "@/components/player";
import { DEFENSE, OFFENSE, useLandingAnimation } from "@/hooks/use-landing-animation";
import { motion } from "motion/react";

const BALL_PATH = "M 748,267 Q 850,150 940,140";

const offensePlayers = [
  { id: "qb", label: "QB", ...OFFENSE.QB },
  { id: "center", label: "C", ...OFFENSE.C },
  { id: "lg", label: "LG", ...OFFENSE.LG },
  { id: "rg", label: "RG", ...OFFENSE.RG },
  { id: "lt", label: "LT", ...OFFENSE.LT },
  { id: "rt", label: "RT", ...OFFENSE.RT },
  { id: "wr-top", label: "WR", ...OFFENSE.WR_TOP },
  { id: "wr-bot", label: "WR", ...OFFENSE.WR_BOT },
  { id: "slot", label: "SL", ...OFFENSE.SLOT },
  { id: "te", label: "TE", ...OFFENSE.TE },
  { id: "rb", label: "RB", ...OFFENSE.RB },
];

const defensePlayers = [
  { id: "de1", label: "DE", ...DEFENSE.DE1 },
  { id: "dt1", label: "DT", ...DEFENSE.DT1 },
  { id: "dt2", label: "DT", ...DEFENSE.DT2 },
  { id: "de2", label: "DE", ...DEFENSE.DE2 },
  { id: "lb1", label: "LB", ...DEFENSE.LB1 },
  { id: "lb2", label: "LB", ...DEFENSE.LB2 },
  { id: "lb3", label: "LB", ...DEFENSE.LB3 },
  { id: "cb-top", label: "CB", ...DEFENSE.CB_TOP },
  { id: "cb-bot", label: "CB", ...DEFENSE.CB_BOT },
  { id: "ss", label: "SS", ...DEFENSE.SS },
  { id: "fs", label: "FS", ...DEFENSE.FS },
];

export function LandingHero() {
  useLandingAnimation();

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#070f05]">
      {/* ===== Campo de fundo ===== */}
      <div className="absolute inset-0">
        <Field className="h-full w-full object-cover">
          <g id="play-layer">
            {/* Linha de scrimmage */}
            <line
              x1="800"
              y1="0"
              x2="800"
              y2="534"
              stroke="#f59e0b"
              strokeWidth="1.5"
              opacity="0.15"
            />

            {/* Ataque (azul) */}
            {offensePlayers.map((p) => (
              <Player
                key={p.id}
                id={p.id}
                x={p.x}
                y={p.y}
                color="#1d4ed8"
                label={p.label}
              />
            ))}

            {/* Defesa (vermelho) */}
            {defensePlayers.map((p) => (
              <Player
                key={p.id}
                id={p.id}
                x={p.x}
                y={p.y}
                color="#b91c1c"
                label={p.label}
              />
            ))}

            {/* Trail */}
            <BallTrail id="trail" path={BALL_PATH} />

            {/* Bola */}
            <g style={{ opacity: 0 }}>
              <Football id="football" />
            </g>

            {/* Flash do catch */}
            <circle
              id="catch-flash"
              cx="940"
              cy="140"
              r="15"
              fill="#fff"
              opacity="0"
            />
          </g>
        </Field>
      </div>

      {/* ===== Gradiente esquerdo para legibilidade ===== */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to right,
            #070f05 0%,
            #070f05dd 30%,
            #070f0588 50%,
            transparent 70%
          )`,
        }}
      />

      {/* Borda inferior suave */}
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background:
            "linear-gradient(to top, #070f05, transparent)",
        }}
      />

      {/* ===== Conteúdo CTA ===== */}
      <div className="relative z-10 flex h-full items-center">
        <div className="w-full max-w-2xl px-8 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-6 inline-block rounded-full border
                border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5
                text-sm font-medium text-emerald-400"
            >
              🏈 Guia Interativo
            </motion.span>

            {/* Título */}
            <h1
              className="mt-4 text-5xl leading-[1.1] font-extrabold
                tracking-tight text-white md:text-6xl lg:text-7xl"
            >
              Entenda o{" "}
              <span
                className="bg-linear-to-r from-emerald-400 to-green-300
                  bg-clip-text text-transparent"
              >
                Futebol
              </span>
              <br />
              <span
                className="bg-linear-to-r from-emerald-400 to-green-300
                  bg-clip-text text-transparent"
              >
                Americano
              </span>
            </h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-6 max-w-md text-lg leading-relaxed
                text-neutral-400"
            >
              Das regras básicas às jogadas mais complexas.
              Um guia visual e interativo feito para o Brasil.
            </motion.p>

            {/* Botões */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <button
                className="cursor-pointer rounded-xl bg-emerald-500 px-8
                  py-4 text-base font-bold text-white shadow-lg
                  shadow-emerald-500/20 transition-all duration-200
                  hover:bg-emerald-400 hover:shadow-emerald-500/30
                  active:scale-[0.98]"
              >
                Começar a Aprender
              </button>

              <button
                className="cursor-pointer rounded-xl border border-white/10
                  bg-white/5 px-8 py-4 text-base font-bold text-white
                  transition-all duration-200 hover:border-white/20
                  hover:bg-white/10 active:scale-[0.98]"
              >
                Ver Jogadas
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="mt-14 flex gap-10"
            >
              {[
                { value: "11", label: "jogadores por time" },
                { value: "4", label: "quartos de jogo" },
                { value: "100", label: "jardas de campo" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-extrabold text-emerald-400">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-xs text-neutral-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}