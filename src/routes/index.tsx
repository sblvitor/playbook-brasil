import { FootballField } from '@/components/football-field'
import { createFileRoute } from '@tanstack/react-router'
import { Hero } from './-components/hero'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className='relative flex min-h-svh items-center justify-center overflow-hidden bg-background'>
      <div 
        className='absolute inset-0 z-5'
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)"
        }}
      />
      <FootballField />
      <Hero />
    </main>
  )
}
