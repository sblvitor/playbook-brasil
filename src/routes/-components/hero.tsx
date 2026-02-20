import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const Hero = () => {
  return (
    <div className='relative z-10 flex flex-col items-center gap-8 px-6 text-center'>
      <Badge variant={'defaultOutline'} className="px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-gold">
        Entenda o jogo
      </Badge>
      <div className="text-4xl md:text-5xl lg:text-6xl">
        🏈
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-balance text-4xl font-extrabold leading-tight tracking-wide text-foreground md:text-6xl lg:text-7xl">
          Você não entende
          <br />
          futebol americano.
        </h1>
        <p className="font-display text-3xl font-extrabold tracking-tight text-gold md:text-5xl lg:text-6xl">
          Ainda.
        </p>
      </div>
      <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:max-w-lg md:text-lg">
        Aprenda do zero em minutos, com animações interativas.
      </p>
      <Button 
        className="transition-all hover:scale-105 hover:bg-gold/90 hover:shadow-[0_0_30px_rgba(245,166,35,0.3)] font-semibold"
        size={'lg'}
      >
        Começar do zero
        <ArrowRight />
      </Button>
    </div>
  )
}