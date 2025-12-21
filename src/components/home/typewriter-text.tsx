'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TypewriterTextProps {
  texts: string[]
  className?: string
  delay?: number
  loop?: boolean
  cursorChar?: string
}

export function TypewriterText({
  texts,
  className,
  delay = 2000,
  loop = true,
  cursorChar = '|'
}: TypewriterTextProps) {
  // Start with first text fully typed to prevent hydration mismatch
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(texts[0]?.length || 0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Ensure we're on the client before animation
  useEffect(() => {
    setMounted(true)
    // Start deleting after initial delay to begin the animation cycle
    const initialDelay = setTimeout(() => {
      setIsDeleting(true)
    }, delay)
    return () => clearTimeout(initialDelay)
  }, [delay])

  useEffect(() => {
    if (!mounted) return

    const currentText = texts[currentTextIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentCharIndex < currentText.length) {
          setCurrentCharIndex(prev => prev + 1)
        } else {
          // Finished typing, wait before deleting
          setTimeout(() => setIsDeleting(true), delay)
        }
      } else {
        // Deleting
        if (currentCharIndex > 0) {
          setCurrentCharIndex(prev => prev - 1)
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false)
          setCurrentTextIndex(prev => {
            const nextIndex = loop ? (prev + 1) % texts.length : prev
            return nextIndex
          })
        }
      }
    }, isDeleting ? 50 : 100) // Faster deleting than typing

    return () => clearTimeout(timeout)
  }, [currentTextIndex, currentCharIndex, isDeleting, texts, delay, loop, mounted])

  useEffect(() => {
    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  const currentText = texts[currentTextIndex] || texts[0] || ''
  const displayedText = currentText.slice(0, currentCharIndex)

  return (
    <span className={cn('inline-block', className)}>
      {displayedText}
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.1 }}
        className="ml-0.5 inline-block"
        style={{ color: 'inherit' }}
      >
        {cursorChar}
      </motion.span>
    </span>
  )
}