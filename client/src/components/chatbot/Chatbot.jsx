import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, Loader, Bot } from "lucide-react"

export default function ChatbotComponent() {
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hello! I'm here to listen and support you. How are you feeling today?" },
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const quickSuggestions = [
        "I'm feeling anxious",
        "How do I manage stress?",
        "I'm having trouble sleeping",
        "Tell me about mindfulness",
    ]

    const handleSendMessage = async (text) => {
        if (!text.trim()) return

        setMessages((prev) => [...prev, { role: "user", content: text }])
        setInput("")
        setIsLoading(true)

        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "I hear you. That sounds challenging. Have you tried any coping techniques?",
                "It's completely normal to feel this way. Would you like to explore some strategies?",
                "Thank you for sharing. Your feelings are valid. What would help you right now?",
                "I appreciate your trust. Let's work through this together.",
            ]
            const randomResponse = responses[Math.floor(Math.random() * responses.length)]
            setMessages((prev) => [...prev, { role: "assistant", content: randomResponse }])
            setIsLoading(false)
        }, 1000)
    }

    return (
        <div className="space-y-6">
            <Card className="h-[500px] flex flex-col p-6 bg-card/50 backdrop-blur border-border shadow-xl">
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`flex items-end gap-2 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                {msg.role === "assistant" && (
                                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                )}
                                <div
                                    className={`px-4 py-3 rounded-2xl ${msg.role === "user"
                                            ? "bg-gradient-primary text-white rounded-br-none"
                                            : "bg-muted text-foreground rounded-bl-none"
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="flex items-end gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-muted text-foreground px-4 py-3 rounded-2xl rounded-bl-none flex gap-2 items-center">
                                    <Loader className="w-4 h-4 animate-spin" />
                                    <span className="text-sm">Thinking...</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Card>

            <div className="grid grid-cols-2 gap-3">
                {quickSuggestions.map((suggestion, i) => (
                    <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendMessage(suggestion)}
                        className="text-left justify-start h-auto py-3 px-4 text-sm hover:border-primary/50 transition-colors"
                    >
                        {suggestion}
                    </Button>
                ))}
            </div>

            <div className="flex gap-3">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage(input)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="h-12 border-border focus-visible:ring-primary/50"
                />
                <Button
                    onClick={() => handleSendMessage(input)}
                    disabled={isLoading}
                    className="h-12 w-12 rounded-xl bg-gradient-primary hover:opacity-90"
                >
                    <Send className="w-5 h-5" />
                </Button>
            </div>
        </div>
    )
}
