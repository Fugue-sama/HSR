import { useRef, useEffect } from 'react'

const Starfield = () => {
  const canvasRef = useRef(null)
  const numStars = 50
  const stars = []
  const comets = []

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const width = canvas.width = window.innerWidth
    const height = canvas.height = window.innerHeight

    const startTime = performance.now()

    // Gán thêm spawnTime cho từng sao
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: height * (0.8 + Math.random() * 0.2),
        size: Math.random() * 2 + 0.2,
        speed: Math.random() * 0.5 + 0.1,
        spawnTime: startTime + i * 100
      })
    }

    const draw = (now) => {
      const elapsed = now - startTime

      // Gradient nền
      const gradient = ctx.createRadialGradient(
        width / 2, height, 0,
        width / 2, height, height
      )
      gradient.addColorStop(0, '#1b2735')
      gradient.addColorStop(1, '#090a0f')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      const colors = ['#eff2f9', '#f5945c']

      stars.forEach(star => {
        if (now < star.spawnTime) return

        ctx.save()
        ctx.beginPath()
        const glow = Math.random() < 0.03
        if (glow) {
          ctx.shadowBlur = 15
          ctx.shadowColor = colors[Math.floor(Math.random() * colors.length)]
        }

        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        star.y -= star.speed
        if (star.y < 0) {
          star.y = height
          const delta = (Math.random() - 0.5) * 50
          star.x += delta
          star.x = Math.max(0, Math.min(width, star.x))
        }
      })

      // Sao chổi (giới hạn tần suất)
      if (elapsed > 1000 && Math.random() < 0.0003) {
        const startX = width + 50
        const startY = Math.random() * 5
        const endX = 0
        const endY = height / 2

        const dx = endX - startX
        const dy = endY - startY
        const distance = Math.sqrt(dx * dx + dy * dy)

        const speed = 5
        const speedX = (dx / distance) * speed
        const speedY = (dy / distance) * speed

        comets.push({
          x: startX,
          y: startY,
          size: 2 + Math.random() * 2,
          speedX,
          speedY,
          trail: []
        })
      }

      comets.forEach((comet, index) => {
        comet.trail.push({ x: comet.x, y: comet.y })
        if (comet.trail.length > 40) comet.trail.shift()

        for (let i = 0; i < comet.trail.length; i++) {
          const t = comet.trail[i]
          ctx.beginPath()
          const alpha = ((i + 1) / comet.trail.length) * 0.2
          ctx.fillStyle = `rgba(255,255,255,${alpha})`
          const size = comet.size * (1 - (i / comet.trail.length) * 0.5)
          ctx.arc(t.x, t.y, size, 0, Math.PI * 2)
          ctx.fill()
        }

        comet.x += comet.speedX
        comet.y += comet.speedY

        if (comet.y < -50 || comet.x < -50 || comet.x > width + 50) {
          comets.splice(index, 1)
        }
      })

      requestAnimationFrame(draw)
    }

    // Delay khởi động 1.5s rồi bắt đầu animation
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(draw)
    }, 1500)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-[-1]" />
  )
}

export default Starfield
