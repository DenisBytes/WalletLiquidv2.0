'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface QuizProps {
  question: string
  answers: string[]
  correctIndex: number
}

export function Quiz({ question, answers, correctIndex }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const answered = selected !== null
  const correct = selected === correctIndex

  return (
    <div className="glass rounded-xl p-6 my-6">
      <div className="flex items-center gap-2 mb-4">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-accent shrink-0">
          <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
          <text x="10" y="14" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600">?</text>
        </svg>
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Quiz</span>
      </div>

      <p className="text-text-primary font-medium mb-4">{question}</p>

      <div className="space-y-2">
        {answers.map((answer, i) => {
          const isSelected = selected === i
          const isCorrect = i === correctIndex

          let borderClass = 'border-border hover:border-accent/50'
          if (answered) {
            if (isCorrect) borderClass = 'border-success'
            else if (isSelected) borderClass = 'border-danger'
            else borderClass = 'border-border opacity-50'
          }

          return (
            <button
              key={i}
              onClick={() => !answered && setSelected(i)}
              disabled={answered}
              className={cn(
                'w-full text-left px-4 py-3 rounded-lg border transition-all text-sm',
                borderClass,
                !answered && 'cursor-pointer',
                answered && 'cursor-default'
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'w-6 h-6 rounded-full border flex items-center justify-center text-xs font-medium shrink-0',
                    answered && isCorrect
                      ? 'bg-success/20 border-success text-success'
                      : answered && isSelected
                        ? 'bg-danger/20 border-danger text-danger'
                        : 'border-border text-text-muted'
                  )}
                >
                  {answered && isCorrect ? '✓' : answered && isSelected ? '✗' : String.fromCharCode(65 + i)}
                </span>
                <span className={cn(
                  'text-text-secondary',
                  answered && isCorrect && 'text-success',
                  answered && isSelected && !isCorrect && 'text-danger'
                )}>
                  {answer}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {answered && (
        <div
          className={cn(
            'mt-4 px-4 py-3 rounded-lg text-sm',
            correct ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
          )}
        >
          {correct ? 'Correct!' : `Incorrect. The correct answer is: ${answers[correctIndex]}`}
        </div>
      )}
    </div>
  )
}
