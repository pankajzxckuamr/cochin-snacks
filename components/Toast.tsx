'use client'

import { useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, X } from 'lucide-react'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
  duration?: number
}

export default function Toast({ message, type, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <m.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3.5 rounded-xl shadow-2xl border backdrop-blur-md max-w-sm sm:max-w-md ${
        type === 'success'
          ? 'bg-green-dark/95 border-green-brand/30 text-off-white'
          : 'bg-flame-red/95 border-flame-orange/30 text-off-white'
      }`}
    >
      {type === 'success' ? (
        <CheckCircle2 className="w-5 h-5 text-yellow shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-yellow shrink-0" />
      )}
      <p className="text-sm font-medium leading-snug">{message}</p>
      <button
        onClick={onClose}
        className="p-1 rounded-full text-off-white/70 hover:text-off-white hover:bg-white/10 transition-colors shrink-0"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </m.div>
  )
}
