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
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
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
  }, [currentTextIndex, currentCharIndex, isDeleting, texts, delay, loop])

  useEffect(() => {
    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  const currentText = texts[currentTextIndex] || ''
  const displayedText = currentText.slice(0, currentCharIndex)

  return (
    <div className={cn('inline-block', className)}>
      <span className="relative">
        {displayedText}
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: showCursor ? 1 : 0 }}
          transition={{ duration: 0.1 }}
          className="ml-1 inline-block"
        >
          {cursorChar}
        </motion.span>
      </span>
      
      {/* Glow effect for terminal theme */}
      {className?.includes('terminal') && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="absolute inset-0 text-terminal-green terminal-glow pointer-events-none"
          style={{ textShadow: '0 0 10px currentColor' }}
        >
          {displayedText}
        </motion.span>
      )}
    </div>
  )
}