"use client"

import { useEffect, useRef } from "react"

type GlobePoint = {
  lat: number
  lon: number
  pulse: number
}

const LAT_STEPS = 18
const LON_STEPS = 36
const ROTATION_SPEED = 0.000095

function createGlobePoints() {
  const points: GlobePoint[] = []

  for (let latIndex = 1; latIndex < LAT_STEPS; latIndex++) {
    const lat = -Math.PI / 2 + (latIndex / LAT_STEPS) * Math.PI
    const columns = Math.max(10, Math.round(LON_STEPS * Math.cos(lat)))

    for (let lonIndex = 0; lonIndex < columns; lonIndex++) {
      points.push({
        lat,
        lon: (lonIndex / columns) * Math.PI * 2,
        pulse: Math.random() * Math.PI * 2,
      })
    }
  }

  return points
}

export function OrbitGlobeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const points = createGlobePoints()
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    let width = 0
    let height = 0
    let pixelRatio = 1

    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = Math.max(
        window.innerHeight,
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      )
      canvas.width = Math.floor(width * pixelRatio)
      canvas.height = Math.floor(height * pixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    const projectPoint = (point: GlobePoint, rotation: number, radius: number) => {
      const rotatedLon = point.lon + rotation
      const x = Math.cos(point.lat) * Math.cos(rotatedLon)
      const y = Math.sin(point.lat)
      const z = Math.cos(point.lat) * Math.sin(rotatedLon)
      const depth = 1.35 + z * 0.42
      const scale = radius / depth

      return {
        x: width * (width < 768 ? 0.5 : 0.34) + x * scale,
        y: height * 0.44 + y * scale,
        z,
        alpha: Math.max(0, (z + 1) / 2),
        pulse: point.pulse,
      }
    }

    const draw = (time = 0) => {
      const radius = Math.min(width * 1.08, height * 0.56)
      const rotation = mediaQuery.matches ? 0.8 : time * ROTATION_SPEED
      const projected = points.map((point) => projectPoint(point, rotation, radius))

      context.clearRect(0, 0, width, height)

      const haze = context.createRadialGradient(
        width * (width < 768 ? 0.5 : 0.34),
        height * 0.44,
        radius * 0.05,
        width * (width < 768 ? 0.5 : 0.34),
        height * 0.44,
        radius * 0.92,
      )
      haze.addColorStop(0, "rgba(216, 180, 254, 0.1)")
      haze.addColorStop(0.38, "rgba(168, 85, 247, 0.08)")
      haze.addColorStop(0.68, "rgba(124, 58, 237, 0.04)")
      haze.addColorStop(1, "rgba(24, 24, 27, 0)")
      context.fillStyle = haze
      context.fillRect(0, 0, width, height)

      context.lineWidth = width < 768 ? 0.85 : 1
      for (let index = 0; index < projected.length; index++) {
        const point = projected[index]

        for (let nextIndex = index + 1; nextIndex < projected.length; nextIndex++) {
          const nextPoint = projected[nextIndex]
          const dx = point.x - nextPoint.x
          const dy = point.y - nextPoint.y
          const distance = Math.hypot(dx, dy)
          const maxDistance = width < 768 ? 96 : 118

          if (distance < maxDistance && point.z > -0.8 && nextPoint.z > -0.8) {
            const lineAlpha =
              (1 - distance / maxDistance) * 0.28 * Math.min(point.alpha, nextPoint.alpha)

            context.strokeStyle = `rgba(192, 132, 252, ${lineAlpha})`
            context.beginPath()
            context.moveTo(point.x, point.y)
            context.lineTo(nextPoint.x, nextPoint.y)
            context.stroke()
          }
        }
      }

      projected.forEach((point) => {
        if (point.z < -0.86) return

        const glow = mediaQuery.matches
          ? 0.5
          : 0.5 + Math.sin(time * 0.0012 + point.pulse) * 0.5
        const alpha = 0.24 + point.alpha * 0.34
        const size = 1.1 + point.alpha * 1.45 + glow * 0.45

        context.fillStyle = `rgba(216, 180, 254, ${alpha})`
        context.beginPath()
        context.arc(point.x, point.y, size, 0, Math.PI * 2)
        context.fill()
      })

      if (!mediaQuery.matches) {
        frame = window.requestAnimationFrame(draw)
      }
    }

    resize()
    draw()
    window.addEventListener("resize", resize)
    const observer = new ResizeObserver(resize)
    observer.observe(document.body)

    if (!mediaQuery.matches) {
      frame = window.requestAnimationFrame(draw)
    }

    return () => {
      window.removeEventListener("resize", resize)
      observer.disconnect()
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="portfolio-globe-background"
    />
  )
}
