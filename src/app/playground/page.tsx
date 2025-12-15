'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageSquare, Code2, Palette, Layout, Globe,
  Sparkles, Play, Copy, Check, Send, RefreshCw
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/app-store'

const TABS = [
  { id: 'chat', label: 'AI Chat', icon: MessageSquare },
  { id: 'code', label: 'Code Editor', icon: Code2 },
  { id: 'components', label: 'Components', icon: Layout },
  { id: 'theme', label: 'Theme Lab', icon: Palette },
  { id: 'api', label: 'API Tester', icon: Globe },
] as const

type TabId = typeof TABS[number]['id']

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<TabId>('chat')
  const { theme } = useAppStore()

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Playground</h1>
              <p className="text-sm text-muted-foreground">Interactive demos & experiments</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 overflow-x-auto pb-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'chat' && <AIChatDemo />}
            {activeTab === 'code' && <CodePlayground />}
            {activeTab === 'components' && <ComponentGallery />}
            {activeTab === 'theme' && <ThemePlayground />}
            {activeTab === 'api' && <APITester />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}

// ============================================
// AI CHAT DEMO (Gemini Powered)
// ============================================
const GEMINI_MODELS = [
  { id: 'gemini-1.5-flash', name: '1.5 Flash', emoji: '⚡' },
  { id: 'gemini-1.5-pro', name: '1.5 Pro', emoji: '🧠' },
  { id: 'gemini-2.0-flash', name: '2.0 Flash', emoji: '🔥' },
  { id: 'gemini-2.5-flash', name: '2.5 Flash', emoji: '💫' },
  { id: 'gemini-2.5-pro', name: '2.5 Pro', emoji: '🌟' },
  { id: 'gemini-3.0-flash', name: '3.0', emoji: '🚀' },
]

function AIChatDemo() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; content: string }>>([
    { role: 'ai', content: 'Hello! I\'m powered by Google Gemini. Ask me anything!' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedModel, setSelectedModel] = useState(GEMINI_MODELS[0])
  const [isDemo, setIsDemo] = useState(true)

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return

    const userMessage = input.trim()
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setInput('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          model: selectedModel.id,
          history: messages.slice(-10) // Send last 10 messages for context
        })
      })

      const data = await response.json()

      if (data.demo) {
        setIsDemo(true)
      } else {
        setIsDemo(false)
      }

      setMessages(prev => [...prev, {
        role: 'ai',
        content: data.response || data.error || 'Sorry, something went wrong.'
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'ai',
        content: 'Failed to connect. Check your internet connection.'
      }])
    }

    setIsTyping(false)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-sm">{selectedModel.emoji}</span>
              </div>
              <div>
                <div className="font-medium text-foreground">{selectedModel.name}</div>
                <div className="text-xs text-muted-foreground">
                  {isDemo ? '🟡 Demo Mode' : '🟢 Connected'}
                </div>
              </div>
            </div>
            <button
              onClick={() => setMessages([{ role: 'ai', content: 'Chat cleared! How can I help?' }])}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Model Selector */}
          <div className="flex gap-2">
            {GEMINI_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  selectedModel.id === model.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                )}
              >
                <span>{model.emoji}</span>
                <span className="hidden sm:inline">{model.name.replace('Gemini ', '')}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="h-[350px] overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'flex',
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div className={cn(
                'max-w-[80%] px-4 py-2 rounded-2xl whitespace-pre-wrap',
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-md'
                  : 'bg-secondary text-secondary-foreground rounded-bl-md'
              )}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex gap-1 px-4 py-2">
              <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          )}
        </div>

        {/* Demo Mode Notice */}
        {isDemo && (
          <div className="px-4 py-2 bg-amber-500/10 border-t border-amber-500/20">
            <p className="text-xs text-amber-600">
              ⚠️ Demo mode - Add GEMINI_API_KEY to .env.local for real AI responses
            </p>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Ask Gemini anything..."
              disabled={isTyping}
              className="flex-1 px-4 py-2 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none text-foreground disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={isTyping || !input.trim()}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// CODE PLAYGROUND
// ============================================
function CodePlayground() {
  const [code, setCode] = useState(`// Welcome to the Code Playground!
function greet(name) {
  return \`Hello, \${name}! 👋\`;
}

console.log(greet('Developer'));

// Try editing this code...
const colors = ['red', 'green', 'blue'];
colors.forEach(color => {
  console.log(\`Color: \${color}\`);
});`)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const runCode = () => {
    try {
      const logs: string[] = []
      const mockConsole = { log: (...args: unknown[]) => logs.push(args.join(' ')) }
      const fn = new Function('console', code)
      fn(mockConsole)
      setOutput(logs.join('\n'))
    } catch (err) {
      setOutput(`Error: ${err}`)
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Editor */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b border-border bg-secondary/50">
          <span className="text-sm font-medium text-foreground">JavaScript</span>
          <div className="flex gap-2">
            <button onClick={copyCode} className="p-2 rounded-lg hover:bg-secondary transition-colors">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
            </button>
            <button onClick={runCode} className="flex items-center gap-2 px-3 py-1 rounded-lg bg-primary text-primary-foreground text-sm">
              <Play className="w-3 h-3" /> Run
            </button>
          </div>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-[400px] p-4 font-mono text-sm bg-card text-foreground resize-none focus:outline-none"
          spellCheck={false}
        />
      </div>

      {/* Output */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-3 border-b border-border bg-secondary/50">
          <span className="text-sm font-medium text-foreground">Output</span>
        </div>
        <pre className="p-4 h-[400px] overflow-auto font-mono text-sm text-muted-foreground whitespace-pre-wrap">
          {output || 'Click "Run" to execute code...'}
        </pre>
      </div>
    </div>
  )
}

// ============================================
// COMPONENT GALLERY
// ============================================
function ComponentGallery() {
  const components = [
    { name: 'Button', description: 'Primary action buttons' },
    { name: 'Card', description: 'Content containers' },
    { name: 'Input', description: 'Form input fields' },
    { name: 'Modal', description: 'Dialog overlays' },
    { name: 'Toast', description: 'Notification popups' },
    { name: 'Dropdown', description: 'Selection menus' },
  ]

  return (
    <div className="space-y-8">
      {/* Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map((comp) => (
          <div key={comp.name} className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-2">{comp.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{comp.description}</p>

            {/* Live Examples */}
            <div className="space-y-3">
              {comp.name === 'Button' && (
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">Primary</button>
                  <button className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm">Secondary</button>
                  <button className="px-4 py-2 rounded-lg border border-border text-foreground text-sm">Outline</button>
                </div>
              )}
              {comp.name === 'Card' && (
                <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                  <p className="text-sm text-muted-foreground">Card content here...</p>
                </div>
              )}
              {comp.name === 'Input' && (
                <input
                  type="text"
                  placeholder="Type something..."
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm"
                />
              )}
              {comp.name === 'Modal' && (
                <button className="px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm">
                  Open Modal
                </button>
              )}
              {comp.name === 'Toast' && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 text-sm">
                  <Check className="w-4 h-4" /> Success toast
                </div>
              )}
              {comp.name === 'Dropdown' && (
                <select className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm">
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// THEME PLAYGROUND
// ============================================
function ThemePlayground() {
  const { theme, customization, setCustomization } = useAppStore()
  const [primaryHue, setPrimaryHue] = useState(190)
  const [accentHue, setAccentHue] = useState(280)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Controls */}
      <div className="space-y-6">
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Color Settings</h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Primary Hue: {primaryHue}°</label>
              <input
                type="range"
                min="0"
                max="360"
                value={primaryHue}
                onChange={(e) => setPrimaryHue(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: `hsl(${primaryHue}, 80%, 50%)` }}
              />
              <div className="h-8 rounded-lg mt-2" style={{ background: `hsl(${primaryHue}, 80%, 50%)` }} />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Accent Hue: {accentHue}°</label>
              <input
                type="range"
                min="0"
                max="360"
                value={accentHue}
                onChange={(e) => setAccentHue(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: `hsl(${accentHue}, 70%, 60%)` }}
              />
              <div className="h-8 rounded-lg mt-2" style={{ background: `hsl(${accentHue}, 70%, 60%)` }} />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Glass Opacity: {customization.glassOpacity}%</label>
              <input
                type="range"
                min="20"
                max="100"
                value={customization.glassOpacity}
                onChange={(e) => setCustomization({ glassOpacity: Number(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Blur Intensity: {customization.blurIntensity}px</label>
              <input
                type="range"
                min="0"
                max="20"
                value={customization.blurIntensity}
                onChange={(e) => setCustomization({ blurIntensity: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Current Theme</h3>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{theme.preview}</span>
            <div>
              <div className="font-medium text-foreground">{theme.name}</div>
              <div className="text-sm text-muted-foreground">{theme.description}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div
        className="bg-card rounded-2xl border border-border p-6"
        style={{
          backdropFilter: `blur(${customization.blurIntensity}px)`,
          background: `rgba(255,255,255,${customization.glassOpacity / 100})`
        }}
      >
        <h3 className="font-semibold text-foreground mb-4">Live Preview</h3>
        <div className="space-y-4">
          <button
            className="px-4 py-2 rounded-lg text-white"
            style={{ background: `hsl(${primaryHue}, 80%, 50%)` }}
          >
            Primary Button
          </button>
          <button
            className="px-4 py-2 rounded-lg text-white ml-2"
            style={{ background: `hsl(${accentHue}, 70%, 60%)` }}
          >
            Accent Button
          </button>
          <div
            className="p-4 rounded-xl border"
            style={{
              borderColor: `hsl(${primaryHue}, 80%, 50%, 0.3)`,
              background: `hsl(${primaryHue}, 80%, 50%, 0.1)`
            }}
          >
            <p className="text-sm text-foreground">This is a themed card</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// API TESTER
// ============================================
function APITester() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1')
  const [method, setMethod] = useState('GET')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const sendRequest = async () => {
    setLoading(true)
    try {
      const res = await fetch(url, { method })
      const data = await res.json()
      setResponse(JSON.stringify(data, null, 2))
    } catch (err) {
      setResponse(`Error: ${err}`)
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Request Builder */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4">Request</h3>
        <div className="flex gap-3 flex-wrap">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="px-4 py-2 rounded-lg bg-secondary border border-border text-foreground"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL..."
            className="flex-1 min-w-[300px] px-4 py-2 rounded-lg bg-secondary border border-border text-foreground"
          />
          <button
            onClick={sendRequest}
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>

      {/* Response */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border bg-secondary/50">
          <span className="text-sm font-medium text-foreground">Response</span>
        </div>
        <pre className="p-4 h-[300px] overflow-auto font-mono text-sm text-muted-foreground">
          {response || 'Response will appear here...'}
        </pre>
      </div>
    </div>
  )
}