"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import "./App.css"

const App: React.FC = () => {

  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(80)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const audioRef = useRef<HTMLAudioElement>(null)


  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const slides = [
    {
      url: "Foto_01_PageLove.jpeg",
      alt: "Imagem 1",
    }
    ,
    {
      url: "foto_02_PageLove.png",
      alt: "Imagem 2",
    },
    {
      url: "foto_03_PageLove.png",
      alt: "Imagem 3",
    },
  ]


  const togglePlay = (): void => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = (): void => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newVolume = Number.parseInt(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  const handleTimeUpdate = (): void => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = (): void => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const seekTime = Number.parseFloat(e.target.value)
    setCurrentTime(seekTime)
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime
    }
  }


  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="app-container">
      <h1 className="app-title">Para meu amor</h1>

      {/* Player de Música */}
      <div className="card">
        <div className="card-content">
          <h2 className="section-title">Roberta Campos - Mundo Inteiro</h2>

          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="hidden"
            src="Roberta Campos - Mundo Inteiro.mp3"
          />

          <div className="player-controls">
            <button onClick={togglePlay} className="play-button">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <div className="progress-container">
              <input
                type="range"
                value={currentTime}
                min={0}
                max={duration || 100}
                step={0.1}
                onChange={handleSeek}
                className="progress-slider"
              />
              <div className="time-display">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="volume-container">
              <button onClick={toggleMute} className="mute-button">
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                value={volume}
                min={0}
                max={100}
                step={1}
                onChange={handleVolumeChange}
                className="volume-slider"
              />
            </div>
          </div>


        </div>
      </div>

      {/* Slider de Imagens */}
      <div className="slider-container">
        <div className="slider-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className="slide">
              <img src={slide.url} alt={slide.alt} className="slide-image" />
            </div>
          ))}
        </div>

        <div className="slider-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${currentSlide === index ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Texto */}
      <div className="card">
        <div className="card-content">
          <h2 className="section-title">Quando Falo de Amor, Falo de Você</h2>
          <p className="text-content">
         Amor, queria que você soubesse o quanto esse sentimento que tenho por você é verdadeiro. Amar você é leve, é paz, é abrigo. É querer estar perto, mesmo no silêncio. É me importar com cada detalhe seu, com seu sorriso, com seus dias bons e ruins. Eu não amo só o que você me faz sentir, mas tudo o que você é. Com você, tudo ganha mais cor, mais sentido. E eu só quero continuar construindo isso ao seu lado, com carinho, respeito e verdade.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
