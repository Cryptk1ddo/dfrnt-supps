'use client'

import { useState } from 'react'
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface Message {
  id: string
  text: string
  sender: 'user' | 'agent'
  timestamp: Date
}

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey there! 👋 How can we help you achieve peak performance today?',
      sender: 'agent',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [unreadCount, setUnreadCount] = useState(0)

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setInputValue('')

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for reaching out! A member of our team will respond shortly. In the meantime, check out our FAQ or browse our science-backed products.',
        sender: 'agent',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, agentResponse])
      
      if (isMinimized) {
        setUnreadCount((prev) => prev + 1)
      }
    }, 1500)
  }

  const handleOpen = () => {
    setIsOpen(true)
    setUnreadCount(0)
  }

  const handleMinimize = () => {
    setIsMinimized(true)
  }

  const handleMaximize = () => {
    setIsMinimized(false)
    setUnreadCount(0)
  }

  if (!isOpen) {
    return (
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-accent text-white shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-110 transition-all group"
        aria-label="Open live chat"
      >
        <MessageCircle className="h-6 w-6 stroke-[2] group-hover:animate-bounce" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 bg-white text-accent text-xs w-6 h-6 rounded-full p-0 flex items-center justify-center border-2 border-black">
            {unreadCount}
          </Badge>
        )}
      </button>
    )
  }

  if (isMinimized) {
    return (
      <button
        onClick={handleMaximize}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-full bg-brand-jet-graphite border border-accent/30 shadow-lg hover:shadow-accent/20 transition-all group"
      >
        <MessageCircle className="h-5 w-5 text-accent stroke-[2]" />
        <span className="text-sm font-bold text-neutral-50">Chat with us</span>
        {unreadCount > 0 && (
          <Badge className="bg-accent text-white text-xs">
            {unreadCount}
          </Badge>
        )}
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] rounded-xl border border-neutral-800 bg-brand-jet-graphite shadow-2xl shadow-black/50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-accent p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-accent stroke-[2]" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-accent"></div>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">DFRNT Support</h3>
            <p className="text-xs text-white/80">Online now</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleMinimize}
            className="p-1.5 hover:bg-white/10 rounded transition-colors"
            aria-label="Minimize chat"
          >
            <Minimize2 className="h-4 w-4 text-white stroke-[2]" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-white/10 rounded transition-colors"
            aria-label="Close chat"
          >
            <X className="h-4 w-4 text-white stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-accent text-white'
                  : 'bg-brand-jet-graphite text-neutral-50 border border-neutral-800'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-neutral-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Replies */}
      <div className="px-4 py-2 bg-brand-jet-graphite border-t border-neutral-800">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['Product Info', 'Shipping', 'Returns'].map((topic) => (
            <button
              key={topic}
              onClick={() => setInputValue(`I need help with ${topic.toLowerCase()}`)}
              className="px-3 py-1.5 rounded-full bg-black text-xs text-neutral-300 hover:text-accent hover:border-accent border border-neutral-700 whitespace-nowrap transition-colors"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-brand-jet-graphite border-t border-neutral-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg bg-black border border-neutral-700 text-neutral-50 text-sm placeholder:text-neutral-500 focus:outline-none focus:border-accent transition-colors"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="px-4"
            aria-label="Send message"
          >
            <Send className="h-4 w-4 stroke-[2]" />
          </Button>
        </div>
        <p className="text-xs text-neutral-500 mt-2 text-center">
          We typically reply within minutes
        </p>
      </div>
    </div>
  )
}
