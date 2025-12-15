'use client'

import { useState, useCallback, useEffect } from 'react'
import {
  AvadhanHero,
  ModelUpload,
  DatasetUpload,
  ModelPlayground,
  ChatbotCreator,
  SlotVisualizer,
  TrainingControls,
  MetricsDashboard,
  TrainingConsole,
  MemoryHierarchy,
  OnboardingTutorial,
  TemplatesLibrary,
  ArchitectureComparison,
  HelpTooltips,
} from '@/components/training'
import { useAvadhan } from '@/hooks/use-avadhan'
import { cn } from '@/lib/utils'
import { Wifi, WifiOff, Server } from 'lucide-react'

interface Project {
  id: string
  name: string
  status: string
  modelPath?: string
  trainingEpochs?: number
}

export default function TrainingPage() {
  const [project, setProject] = useState<Project | null>(null)
  const [showTemplates, setShowTemplates] = useState(true)

  // Connect to Python backend
  const {
    isConnected,
    isBackendAvailable,
    status: backendStatus,
    currentEpoch,
    slots: backendSlots,
    metrics: backendMetrics,
    metricsHistory,
    error: backendError,
    startTraining: backendStartTraining,
    stopTraining: backendStopTraining,
    pauseTraining: backendPauseTraining,
    uploadModel: backendUploadModel,
  } = useAvadhan({ projectId: project?.id || null })

  // Training status (prefer backend status when connected)
  const [localStatus, setLocalStatus] = useState<'idle' | 'training' | 'paused' | 'completed'>('idle')
  const trainingStatus = isBackendAvailable
    ? (backendStatus as 'idle' | 'training' | 'paused' | 'completed')
    : localStatus

  const handleProjectCreated = useCallback((newProject: { id: string; name: string }) => {
    setProject({ ...newProject, status: 'idle' })
    setShowTemplates(false)
  }, [])

  const handleUploadComplete = useCallback((data: { filepath: string; format: string }) => {
    console.log('Model uploaded:', data)
  }, [])

  const handleDatasetUploadComplete = useCallback((data: { datasetId: string; stats: any }) => {
    console.log('Dataset uploaded:', data)
  }, [])

  const handleStart = useCallback(async () => {
    if (isBackendAvailable && project) {
      await backendStartTraining()
    } else {
      setLocalStatus('training')
    }
  }, [isBackendAvailable, project, backendStartTraining])

  const handlePause = useCallback(async () => {
    if (isBackendAvailable) {
      await backendPauseTraining()
    } else {
      setLocalStatus('paused')
    }
  }, [isBackendAvailable, backendPauseTraining])

  const handleStop = useCallback(async () => {
    if (isBackendAvailable) {
      await backendStopTraining()
    } else {
      setLocalStatus('completed')
    }
  }, [isBackendAvailable, backendStopTraining])

  const handleTemplateSelect = useCallback((template: any) => {
    console.log('Template selected:', template)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <AvadhanHero />

      <div className="container mx-auto px-4 py-8">
        {/* Top toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <OnboardingTutorial />
            <HelpTooltips />
          </div>

          <div className="flex items-center gap-4">
            {/* Backend status indicator */}
            <div className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm',
              isBackendAvailable
                ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
            )}>
              {isBackendAvailable ? (
                <>
                  <Server className="w-4 h-4" />
                  <span>GPU Backend Connected</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4" />
                  <span>Demo Mode (No GPU)</span>
                </>
              )}
            </div>

            {project && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Project:</span>
                <span className="font-medium text-foreground">{project.name}</span>
                <code className="text-xs bg-secondary px-2 py-1 rounded">
                  {project.id.slice(0, 8)}...
                </code>
              </div>
            )}
          </div>
        </div>

        {/* Backend error */}
        {backendError && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
            {backendError}
          </div>
        )}

        {/* Architecture comparison (collapsible) */}
        <div className="mb-6">
          <ArchitectureComparison />
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Setup */}
          <div className="space-y-6">
            {/* Templates - show when no project */}
            {showTemplates && !project && (
              <TemplatesLibrary onSelectTemplate={handleTemplateSelect} />
            )}

            <ChatbotCreator onProjectCreated={handleProjectCreated} />

            <ModelUpload
              projectId={project?.id}
              onUploadComplete={handleUploadComplete}
            />

            <DatasetUpload
              projectId={project?.id}
              onUploadComplete={handleDatasetUploadComplete}
            />

            <TrainingControls
              projectId={project?.id}
              status={trainingStatus}
              onStart={handleStart}
              onPause={handlePause}
              onStop={handleStop}
            />
          </div>

          {/* Center & Right Columns: Visualization */}
          <div className="lg:col-span-2 space-y-6">
            <SlotVisualizer
              projectId={project?.id}
              isTraining={trainingStatus === 'training'}
            />

            <MemoryHierarchy />

            <TrainingConsole
              projectId={project?.id}
              isTraining={trainingStatus === 'training'}
            />
          </div>
        </div>

        {/* Full-width metrics */}
        <div className="mt-6">
          <MetricsDashboard
            projectId={project?.id}
            isTraining={trainingStatus === 'training'}
          />
        </div>

        {/* Model Playground - Test trained model */}
        {project && (
          <div className="mt-6">
            <ModelPlayground
              projectId={project.id}
              modelPath={project.modelPath}
              isModelReady={trainingStatus === 'completed' || currentEpoch > 0}
              trainingEpochs={currentEpoch}
              trainingStatus={trainingStatus}
            />
          </div>
        )}

        {/* Epoch counter when training */}
        {trainingStatus === 'training' && currentEpoch > 0 && (
          <div className="mt-4 text-center">
            <span className="text-sm text-muted-foreground">Current Epoch: </span>
            <span className="font-mono text-lg text-primary">{currentEpoch}</span>
          </div>
        )}

        {/* Quick tips footer */}
        <div className="mt-8 p-4 bg-secondary/30 border border-border rounded-xl">
          <h4 className="font-medium text-foreground mb-2">💡 Quick Tips</h4>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
            <li>• Start with Ashta regime (8 slots) for most tasks</li>
            <li>• Higher β values reduce interference but slow learning</li>
            <li>• Watch Thread Purity metric - aim for {'>'} 90%</li>
          </ul>
        </div>

        {/* Backend connection help */}
        {!isBackendAvailable && (
          <div className="mt-4 p-4 bg-secondary/30 border border-border rounded-xl">
            <h4 className="font-medium text-foreground mb-2">🚀 Enable GPU Training</h4>
            <p className="text-sm text-muted-foreground mb-2">
              To use real GPU training, start the Python backend:
            </p>
            <code className="block bg-background p-2 rounded text-sm font-mono">
              cd backend && pip install -r requirements.txt && python main.py
            </code>
          </div>
        )}
      </div>
    </main>
  )
}