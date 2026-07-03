"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { BootSequence } from "@/components/noir/boot-sequence"
import { NoirCursor } from "@/components/noir/cursor-system"
import { TiltCard } from "@/components/noir/tilt-card"
import { GlitchText } from "@/components/noir/glitch-text"
import { CinematicTransition, useTransition, type TransitionType } from "@/components/noir/cinematic-transition"
import { DetectiveDossier, type Character } from "@/components/noir/dossier-system"
import { ParallaxSystem, OptimizedFilmGrain } from "@/components/noir/parallax-system"
import { ProceduralAudio } from "@/components/noir/procedural-audio"
import { InterrogationMinigame } from "@/components/noir/interrogation-minigame"
import { useScrollProgress, useIsMobile, useTouchGestures } from "@/components/noir/performance-hooks"
import {
  InteractiveTitle,
  InteractiveScrollIndicator,
  InteractiveChapterCard,
  InteractiveQuote,
  InteractiveSceneButton,
  InteractiveSkyline,
  InteractiveHeading,
  useReadParagraphs,
  useEscapeDismiss,
} from "@/components/noir/interactions"

// Character data for dossier system
const CHARACTERS: Character[] = [
  {
    id: "marcus",
    name: "MARCUS COLE",
    role: "The Detective",
    description: "Former NCPD detective turned vigilante. They broke him once in the warehouse district. He won't break again. His wife Sarah was the first victim of Crane's expansion into the docks.",
    stats: { strength: 85, intellect: 92, will: 78 },
    quote: "\"Justice isn't blind. It just learned to see in the dark.\"",
    evidence: [
      { title: "Badge", content: "NCPD Badge #4471. Surrendered under duress, 1947. Disciplinary notes: Excessive force, insubordination." },
      { title: "Letter", content: "A water-damaged letter from Sarah. \"Whatever happens, remember why you became a cop. Remember who you are.\"" },
      { title: "Bullet", content: "A single .45 round, kept in his pocket. \"The last one's always for me, if it comes to that.\"" },
    ],
    connections: ["elena", "crane", "razzo"],
    redactedWords: ["warehouse", "sarah", "docks"],
  },
  {
    id: "elena",
    name: "ELENA VANCE",
    role: "The Femme Fatale",
    description: "Singer at the Black Rose nightclub. She knows everyone's secrets, including the location of Crane's ledger. Her brother disappeared investigating the harbor smuggling operation.",
    stats: { strength: 45, intellect: 88, will: 95 },
    quote: "\"Every man has a price. Most just don't know it yet.\"",
    evidence: [
      { title: "Photograph", content: "Elena and her brother Michael, 1945. He was a reporter. He asked too many questions about the harbor." },
      { title: "Key", content: "A safe deposit key, Bank of Noir City. Box 442. Contents: insurance against powerful men." },
      { title: "Recording", content: "A wax cylinder recording of a conversation between Crane and the Commissioner. Leverage for survival." },
    ],
    connections: ["marcus", "crane"],
    redactedWords: ["ledger", "harbor", "commissioner"],
  },
  {
    id: "crane",
    name: "VICTOR CRANE",
    role: "The Kingpin",
    description: "Owns half the city and wants the rest. Bodies are just paperwork to him. Rose from the tenements to control the docks, gambling, and the police. His only weakness is his daughter Isabella.",
    stats: { strength: 60, intellect: 95, will: 99 },
    quote: "\"This city? It's been mine since before you were born.\"",
    evidence: [
      { title: "Ledger Page", content: "A torn page showing payments to judges, councilmen, and the Chief of Police. Monthly. Without fail." },
      { title: "Photograph", content: "Victor with Isabella at her graduation. The only photo where he's smiling. His one vulnerability." },
      { title: "Telegram", content: "\"The shipment arrives Tuesday. Ensure the Harbor Master is cooperative. -V\" Dated one week before Michael Vance disappeared." },
    ],
    connections: ["elena", "razzo", "marcus"],
    redactedWords: ["isabella", "docks", "police"],
  },
  {
    id: "razzo",
    name: "JOHNNY RAZZO",
    role: "The Enforcer",
    description: "Crane's right hand and personal executioner. What he lacks in brains, he makes up for in brutality. Former boxer from the waterfront. Owes Crane everything since the fire that killed his family.",
    stats: { strength: 98, intellect: 35, will: 70 },
    quote: "\"Boss says you gotta go. Nothing personal.\"",
    evidence: [
      { title: "Boxing Gloves", content: "Won the Harbor District Championship, 1942. Undefeated in 23 fights. Then his hands became tools for darker work." },
      { title: "Newspaper", content: "\"WATERFRONT FIRE KILLS FIVE\" - Including Johnny's wife and son. Ruled accidental. Crane paid off the investigators." },
      { title: "List", content: "Names in Johnny's handwriting. Crossed out, one by one. Marcus Cole's name is near the bottom. Not yet crossed." },
    ],
    connections: ["crane", "marcus"],
    redactedWords: ["fire", "waterfront", "family"],
  },
]

// Hero section with interactive elements
function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center noir-vignette overflow-hidden">
      {/* Background with heavy shadows */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-card" />

      {/* Interactive skyline for building clicks */}
      <InteractiveSkyline className="z-10" />

      {/* Main content */}
      <div className={cn(
        "relative z-20 text-center px-6 max-w-5xl mx-auto transition-all duration-1000",
        loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        {/* Subtitle */}
        <p className="font-mono text-primary text-sm md:text-base tracking-[0.3em] mb-4 uppercase">
          A Graphic Novel Experience
        </p>
        
        {/* Main title with interactive letters */}
        <h1 className="font-sans text-7xl md:text-9xl lg:text-[12rem] leading-none tracking-tight text-shadow-noir mb-6">
          <InteractiveTitle text="NOIR" className="block" />
          <span className="block text-primary">
            <InteractiveTitle text="CITY" />
          </span>
        </h1>
        
        {/* Tagline */}
        <p className="font-serif text-xl md:text-2xl text-muted-foreground italic max-w-2xl mx-auto mb-12">
          {"\"In a city drowning in rain and sin, one man's quest for vengeance becomes everyone's nightmare.\""}
        </p>

        {/* CTA */}
        <button 
          className="group relative inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg tracking-widest transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
          data-clickable
        >
          <span>ENTER THE DARKNESS</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>

      {/* Interactive scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <InteractiveScrollIndicator targetId="story-section" tooltip="Enter the city" />
      </div>
    </section>
  )
}

// Story timeline with interactive chapter cards
function StoryTimeline({ isMobile }: { isMobile: boolean }) {
  const [visiblePanels, setVisiblePanels] = useState<number[]>([])
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const panels = [
    {
      chapter: "01",
      title: "THE FALL",
      description: "Detective Marcus Cole had it all—until they took everything from him.",
      extendedContent: "The night of December 12th changed everything. Rain hammered the warehouse windows as Cole discovered the truth about his wife's murder. The corruption ran deeper than anyone could have imagined.",
      year: "1947",
      tags: ["origin", "tragedy"],
    },
    {
      chapter: "02", 
      title: "THE DESCENT",
      description: "Three years in the bottle. Three years of forgetting. Then the letter arrived.",
      extendedContent: "Living above Sal's Bar, Cole had become a ghost. The letter from Elena Vance pierced through the haze—someone else was asking the same questions. Someone else had lost everything.",
      year: "1950",
      tags: ["redemption", "mystery"],
    },
    {
      chapter: "03",
      title: "THE RETURN",
      description: "Back to the streets that made him. Back to the shadows that know his name.",
      extendedContent: "The city hadn't changed. Neither had its masters. But Cole had. Three years of rage, distilled into something colder. Something more dangerous.",
      year: "1950",
      tags: ["action", "revenge"],
    },
    {
      chapter: "04",
      title: "THE RECKONING",
      description: "Some debts can only be paid in blood. The city would learn to fear the night again.",
      extendedContent: "Victor Crane's empire was built on bodies. It was time to add to the pile. But vengeance has a price, and Cole was about to learn just how much it would cost.",
      year: "1951",
      tags: ["climax", "revenge"],
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisiblePanels((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 }
    )

    document.querySelectorAll("[data-panel]").forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleTagClick = useCallback((tag: string) => {
    setActiveTag(prev => prev === tag ? null : tag)
  }, [])

  const PanelWrapper = isMobile ? "div" : TiltCard

  return (
    <section id="story-section" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-20">
          <p className="font-mono text-primary text-sm tracking-[0.3em] mb-4 uppercase">The Story</p>
          <InteractiveHeading as="h2" className="font-sans text-5xl md:text-7xl tracking-tight">
            FOUR CHAPTERS
          </InteractiveHeading>
          <p className="font-serif text-muted-foreground italic mt-4">{"Every story has a beginning. This one starts in darkness."}</p>
          
          {/* Active filter indicator */}
          {activeTag && (
            <p className="font-mono text-xs text-primary mt-4">
              Filtering: {activeTag.toUpperCase()} 
              <button 
                onClick={() => setActiveTag(null)} 
                className="ml-2 text-muted-foreground hover:text-primary"
                data-clickable
              >
                [clear]
              </button>
            </p>
          )}
        </div>

        {/* Comic panels grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {panels.map((panel, index) => (
            <PanelWrapper
              key={panel.chapter}
              className={cn(
                "transition-all duration-700",
                visiblePanels.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10",
                index % 2 === 1 && "md:translate-y-12"
              )}
            >
              <div
                data-panel
                data-index={index}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <InteractiveChapterCard
                  chapter={panel.chapter}
                  title={panel.title}
                  description={panel.description}
                  extendedContent={panel.extendedContent}
                  year={panel.year}
                  tags={panel.tags}
                  isFiltered={activeTag !== null && !panel.tags.includes(activeTag)}
                  onTagClick={handleTagClick}
                >
                  <GlitchText text={panel.title} />
                </InteractiveChapterCard>
              </div>
            </PanelWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}

// Character profiles section
function CharacterProfiles({ onHoverChange }: { onHoverChange: (hovering: boolean) => void }) {
  return (
    <section 
      className="relative py-32 px-6 bg-gradient-to-b from-background via-card/50 to-background"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-20">
          <p className="font-mono text-primary text-sm tracking-[0.3em] mb-4 uppercase">The Cast</p>
          <InteractiveHeading as="h2" className="font-sans text-5xl md:text-7xl tracking-tight">
            ROGUES GALLERY
          </InteractiveHeading>
          <p className="font-serif text-muted-foreground italic mt-4">
            {"Click a profile to access their classified dossier."}
          </p>
        </div>

        <DetectiveDossier characters={CHARACTERS} />
      </div>
    </section>
  )
}

// Interactive scene transition
function SceneTransitionSection({ isMobile }: { isMobile: boolean }) {
  const [activeScene, setActiveScene] = useState(0)
  const [visitedScenes, setVisitedScenes] = useState<Set<number>>(new Set([0]))
  const [defaultScene, setDefaultScene] = useState(0)
  const { activeTransition, triggerTransition, handleComplete } = useTransition()

  const scenes: Array<{
    id: number
    name: string
    description: string
    atmosphere: string
    hoverDescription: string
    transitionType: TransitionType
    transitionLabel: string
  }> = [
    {
      id: 1,
      name: "THE ALLEY",
      description: "Where it all began. Where it will all end.",
      atmosphere: "Rain-soaked. Blood-stained. Forgotten.",
      hoverDescription: "Dark passage behind the precinct",
      transitionType: "iris",
      transitionLabel: "Flashback",
    },
    {
      id: 2,
      name: "THE BLACK ROSE",
      description: "Every secret has a price. She knows them all.",
      atmosphere: "Smoke-filled. Jazz-soaked. Dangerous.",
      hoverDescription: "Elena's nightclub, downtown",
      transitionType: "blinds",
      transitionLabel: "Location",
    },
    {
      id: 3,
      name: "THE TOWER",
      description: "Crane's fortress. The belly of the beast.",
      atmosphere: "Cold. Clinical. Corrupt.",
      hoverDescription: "Crane Industries HQ, 42nd floor",
      transitionType: "smash",
      transitionLabel: "Reveal",
    },
    {
      id: 4,
      name: "THE DOCKS",
      description: "Where the bodies sink and the money flows.",
      atmosphere: "Fog-bound. Salt-aired. Lawless.",
      hoverDescription: "Harbor District, after midnight",
      transitionType: "burn",
      transitionLabel: "Time Skip",
    },
  ]

  const handleSceneChange = useCallback((index: number) => {
    if (index === activeScene || activeTransition) return
    
    triggerTransition(scenes[index].transitionType, () => {
      setActiveScene(index)
      setVisitedScenes(prev => new Set([...prev, index]))
    })
  }, [activeScene, activeTransition, triggerTransition, scenes])

  // Touch gestures for mobile
  useTouchGestures(
    () => handleSceneChange(Math.min(scenes.length - 1, activeScene + 1)),
    () => handleSceneChange(Math.max(0, activeScene - 1))
  )

  return (
    <section className="relative py-32 px-6">
      {/* Cinematic transition overlay */}
      {activeTransition && (
        <CinematicTransition
          type={activeTransition.type}
          isActive={true}
          onComplete={handleComplete}
        />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-20">
          <p className="font-mono text-primary text-sm tracking-[0.3em] mb-4 uppercase">Locations</p>
          <InteractiveHeading as="h2" className="font-sans text-5xl md:text-7xl tracking-tight">
            SCENES OF THE CRIME
          </InteractiveHeading>
          {isMobile && (
            <p className="font-mono text-xs text-muted-foreground mt-4">Swipe to change scenes</p>
          )}
        </div>

        {/* Scene display */}
        <div className="relative aspect-[21/9] comic-panel bg-card overflow-hidden mb-8">
          {/* Scene background */}
          <div className={cn(
            "absolute inset-0 transition-opacity duration-500",
            activeTransition ? "opacity-0" : "opacity-100"
          )}>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />
            
            {/* Dynamic background based on scene */}
            <div className={cn(
              "absolute inset-0 transition-all duration-700",
              activeScene === 0 && "bg-gradient-to-br from-muted via-card to-background",
              activeScene === 1 && "bg-gradient-to-br from-primary/20 via-card to-background",
              activeScene === 2 && "bg-gradient-to-br from-muted/50 via-secondary to-background",
              activeScene === 3 && "bg-gradient-to-br from-blue-950/30 via-card to-background"
            )} />
          </div>

          {/* Scene content */}
          <div className={cn(
            "relative z-20 h-full flex flex-col justify-end p-8 md:p-12 transition-all duration-500",
            activeTransition ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          )}>
            <p className="font-mono text-primary text-sm tracking-[0.3em] mb-2 uppercase">
              Scene {scenes[activeScene].id}
              {defaultScene === activeScene && (
                <span className="ml-2 text-muted-foreground">[default]</span>
              )}
            </p>
            <h3 className="font-sans text-4xl md:text-6xl mb-4">
              <GlitchText text={scenes[activeScene].name} />
            </h3>
            <p className="font-serif text-xl text-muted-foreground italic max-w-xl">
              {scenes[activeScene].description}
            </p>
            <p className="font-mono text-xs text-muted-foreground/60 tracking-widest uppercase mt-4">
              {scenes[activeScene].atmosphere}
            </p>
          </div>
        </div>

        {/* Scene selector with context menus */}
        <div className="flex flex-wrap justify-center gap-4">
          {scenes.map((scene, index) => (
            <InteractiveSceneButton
              key={scene.id}
              scene={scene}
              isActive={activeScene === index}
              isVisited={visitedScenes.has(index)}
              description={scene.hoverDescription}
              disabled={!!activeTransition}
              onClick={() => handleSceneChange(index)}
              onSetDefault={() => setDefaultScene(index)}
              onMarkVisited={() => setVisitedScenes(prev => new Set([...prev, index]))}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Interrogation wrapper
function InterrogationSection({ onComplete }: { onComplete: (success: boolean, lore: string | null) => void }) {
  const [completed, setCompleted] = useState(false)
  const [result, setResult] = useState<{ success: boolean; lore: string | null } | null>(null)

  const handleComplete = useCallback((success: boolean, lore: string | null) => {
    setResult({ success, lore })
    setCompleted(true)
    onComplete(success, lore)
  }, [onComplete])

  if (completed && result) {
    return (
      <section className="relative py-32 px-6 bg-card/50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-primary text-sm tracking-[0.3em] mb-4 uppercase">
            Interrogation Complete
          </p>
          <h2 className={cn(
            "font-sans text-4xl md:text-6xl mb-6",
            result.success ? "text-green-500" : "text-primary"
          )}>
            {result.success ? "INTEL ACQUIRED" : "DEAD END"}
          </h2>
          {result.lore && (
            <p className="font-serif text-lg text-muted-foreground italic">
              New evidence unlocked: {result.lore}
            </p>
          )}
        </div>
      </section>
    )
  }

  return <InterrogationMinigame onComplete={handleComplete} />
}

// Footer
function Footer() {
  return (
    <footer className="relative py-20 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo */}
          <div>
            <h3 className="font-sans text-4xl mb-4">
              <InteractiveTitle text="NOIR" />
              <span className="text-primary"><InteractiveTitle text="CITY" /></span>
            </h3>
            <p className="font-serif text-muted-foreground italic">
              A descent into darkness.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4">
              Navigate
            </h4>
            <nav className="space-y-2">
              {["Story", "Characters", "Locations", "Gallery"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block font-sans text-lg text-foreground hover:text-primary transition-colors"
                  data-clickable
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Credits */}
          <div>
            <h4 className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4">
              Credits
            </h4>
            <p className="font-mono text-sm text-muted-foreground">
              An interactive experience
              <br />
              Inspired by the classics
              <br />
              <span className="text-primary">2024 Noir City</span>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted-foreground tracking-widest">
            THE NIGHT IS DARKEST JUST BEFORE THE DAWN
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Built with darkness and determination
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main page component
export default function NoirCityPage() {
  const [performanceMode, setPerformanceMode] = useState(false)
  const [isHoveringCharacter, setIsHoveringCharacter] = useState(false)
  const [bootComplete, setBootComplete] = useState(false)
  const scrollProgress = useScrollProgress()
  const isMobile = useIsMobile()

  // Auto-enable performance mode on mobile
  useEffect(() => {
    if (isMobile) {
      setPerformanceMode(true)
    }
  }, [isMobile])

  // Lock scroll while the boot sequence is playing
  useEffect(() => {
    document.body.style.overflow = bootComplete ? "" : "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [bootComplete])

  const handleInterrogationComplete = useCallback((success: boolean, lore: string | null) => {
    // Could save to global state or localStorage
    console.log("Interrogation result:", { success, lore })
  }, [])

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <BootSequence onComplete={() => setBootComplete(true)} />

      {/* Custom cursor system - disabled on mobile */}
      {!isMobile && <NoirCursor />}
      
      {/* Multi-layer parallax with rain and lightning */}
      <ParallaxSystem performanceMode={performanceMode} />
      
      {/* Optimized film grain */}
      <OptimizedFilmGrain performanceMode={performanceMode} />
      
      {/* Procedural audio system */}
      <ProceduralAudio 
        scrollProgress={scrollProgress}
        isHoveringCharacter={isHoveringCharacter}
        performanceMode={performanceMode}
        onPerformanceModeToggle={() => setPerformanceMode(!performanceMode)}
      />

      {/* Page sections */}
      <HeroSection />
      
      <InteractiveQuote 
        quote="The rain never stops in this city. It's like God himself is trying to wash away the sins. He's gonna need a bigger flood."
        author="Marcus Cole"
      />
      
      <StoryTimeline isMobile={isMobile} />
      
      <InteractiveQuote 
        quote="In noir, there are no heroes. Just survivors and corpses."
        author="The Narrator"
      />

      {/* Interrogation minigame between story chapters */}
      <InterrogationSection onComplete={handleInterrogationComplete} />
      
      <CharacterProfiles onHoverChange={setIsHoveringCharacter} />
      
      <SceneTransitionSection isMobile={isMobile} />
      
      <InteractiveQuote 
        quote="Everyone has a breaking point. I found mine three years ago. Now I break other people instead."
        author="Marcus Cole"
      />
      
      <Footer />
    </main>
  )
}
