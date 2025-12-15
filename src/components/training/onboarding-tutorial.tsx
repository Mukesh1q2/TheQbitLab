'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    BookOpen,
    ChevronRight,
    ChevronLeft,
    X,
    CheckCircle,
    Brain,
    Upload,
    Play,
    BarChart3,
    Layers,
    Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TutorialStep {
    title: string
    description: string
    icon: React.ElementType
    tips: string[]
    highlight?: string
}

const tutorialSteps: TutorialStep[] = [
    {
        title: 'What is Avadhan?',
        description: 'Avadhan is a revolutionary hybrid architecture for training AI models. Unlike Transformers that use quadratic attention, Avadhan uses 8 parallel "slots" that process information independently without interference.',
        icon: Brain,
        tips: [
            'Based on ancient Indian cognitive discipline "Avadhana Vidya"',
            'O(N log N) complexity vs O(N²) for Transformers',
            'Perfect for long-context reasoning tasks'
        ],
    },
    {
        title: 'Create Your AI Agent',
        description: 'Start by creating an AI agent. Give it a name, description, and personality. This creates a training project that will hold your model configuration and training history.',
        icon: Zap,
        tips: [
            'Choose a descriptive name for your agent',
            'Select a personality that matches your use case',
            'You can customize the system prompt for advanced control'
        ],
        highlight: 'chatbot-creator',
    },
    {
        title: 'Upload Your Model',
        description: 'Upload a pre-trained model file to fine-tune with Avadhan architecture. Supported formats include ONNX, PyTorch (.pt, .pth), TensorFlow, and SafeTensors.',
        icon: Upload,
        tips: [
            'Start with smaller models (< 1GB) for faster iteration',
            'ONNX format provides best cross-platform compatibility',
            'You can skip this step to train from scratch'
        ],
        highlight: 'model-upload',
    },
    {
        title: 'Configure Training',
        description: 'Choose your training regime and hyperparameters. Ashta (8 slots) is perfect for beginners. Adjust the orthogonality weight (β) and learning rate (η) for fine control.',
        icon: Layers,
        tips: [
            'Ashta (8 slots): Best for starting, O(N) complexity',
            'Shata (100 slots): For complex multi-task learning',
            'Higher β = stronger interference prevention'
        ],
        highlight: 'training-controls',
    },
    {
        title: 'Start Training',
        description: 'Click "Start Training" to begin. Watch the 8 slots update in real-time as the model learns. Each slot maintains an independent attention thread.',
        icon: Play,
        tips: [
            'Monitor the slot visualizer for activity',
            'Check the console for detailed logs',
            'You can pause and resume anytime'
        ],
        highlight: 'slot-visualizer',
    },
    {
        title: 'Monitor Metrics',
        description: 'Track your training progress through the metrics dashboard. Key metrics include loss, recall accuracy, thread purity, and interference rate.',
        icon: BarChart3,
        tips: [
            'Loss should decrease over epochs',
            'Aim for thread purity > 90%',
            'Interference rate should stay below 5%'
        ],
        highlight: 'metrics-dashboard',
    },
]

interface OnboardingTutorialProps {
    onComplete?: () => void
}

export function OnboardingTutorial({ onComplete }: OnboardingTutorialProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [completedSteps, setCompletedSteps] = useState<number[]>([])

    const step = tutorialSteps[currentStep]
    const progress = ((currentStep + 1) / tutorialSteps.length) * 100

    const nextStep = () => {
        if (!completedSteps.includes(currentStep)) {
            setCompletedSteps([...completedSteps, currentStep])
        }
        if (currentStep < tutorialSteps.length - 1) {
            setCurrentStep(currentStep + 1)
        } else {
            setIsOpen(false)
            onComplete?.()
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    return (
        <>
            {/* Tutorial trigger button */}
            <button
                onClick={() => setIsOpen(true)}
                className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg',
                    'bg-primary text-primary-foreground',
                    'hover:bg-primary/90 transition-colors'
                )}
            >
                <BookOpen className="w-4 h-4" />
                How to Use
            </button>

            {/* Tutorial modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-card border border-border rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-border">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-primary" />
                                    <span className="font-semibold text-foreground">Getting Started</span>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 rounded hover:bg-secondary transition-colors"
                                >
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </button>
                            </div>

                            {/* Progress bar */}
                            <div className="h-1 bg-secondary">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentStep}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {/* Step indicator */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="p-2 rounded-lg bg-primary/10">
                                                <step.icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <span className="text-sm text-muted-foreground">
                                                Step {currentStep + 1} of {tutorialSteps.length}
                                            </span>
                                        </div>

                                        {/* Title & description */}
                                        <h3 className="text-xl font-bold text-foreground mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-muted-foreground mb-6">
                                            {step.description}
                                        </p>

                                        {/* Tips */}
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-medium text-foreground">💡 Tips:</h4>
                                            {step.tips.map((tip, i) => (
                                                <div key={i} className="flex items-start gap-2 text-sm">
                                                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                                    <span className="text-muted-foreground">{tip}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Step indicators */}
                            <div className="flex justify-center gap-2 pb-4">
                                {tutorialSteps.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentStep(i)}
                                        className={cn(
                                            'w-2 h-2 rounded-full transition-colors',
                                            i === currentStep ? 'bg-primary' : 'bg-secondary',
                                            completedSteps.includes(i) && i !== currentStep && 'bg-green-500'
                                        )}
                                    />
                                ))}
                            </div>

                            {/* Footer navigation */}
                            <div className="flex items-center justify-between p-4 border-t border-border bg-secondary/30">
                                <button
                                    onClick={prevStep}
                                    disabled={currentStep === 0}
                                    className={cn(
                                        'flex items-center gap-1 px-4 py-2 rounded-lg transition-colors',
                                        'text-muted-foreground hover:text-foreground',
                                        'disabled:opacity-50 disabled:cursor-not-allowed'
                                    )}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Previous
                                </button>
                                <button
                                    onClick={nextStep}
                                    className={cn(
                                        'flex items-center gap-1 px-4 py-2 rounded-lg',
                                        'bg-primary text-primary-foreground',
                                        'hover:bg-primary/90 transition-colors'
                                    )}
                                >
                                    {currentStep === tutorialSteps.length - 1 ? 'Get Started' : 'Next'}
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
