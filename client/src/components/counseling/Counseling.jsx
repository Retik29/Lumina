import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, User, CheckCircle2 } from "lucide-react"

export default function CounselingComponent() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        preferredDate: "",
        concerns: "",
        anonymous: false,
    })
    const [submitted, setSubmitted] = useState(false)

    const counselors = [
        { name: "Dr. Sarah", specialty: "Anxiety & Stress", available: "2 slots this week" },
        { name: "Dr. James", specialty: "Depression & Mood", available: "3 slots this week" },
        { name: "Dr. Emily", specialty: "General Wellness", available: "1 slot this week" },
        { name: "Dr. Michael", specialty: "Student Life Challenges", available: "4 slots this week" },
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => {
            setFormData({ name: "", email: "", preferredDate: "", concerns: "", anonymous: false })
            setSubmitted(false)
        }, 3000)
    }

    if (submitted) {
        return (
            <Card className="p-8 text-center bg-card/50 backdrop-blur border-border shadow-xl">
                <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-6 animate-float">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Request Submitted</h2>
                <p className="text-muted-foreground">A counselor will contact you shortly to confirm your session</p>
            </Card>
        )
    }

    return (
        <Tabs defaultValue="counselors" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12 bg-muted/50 p-1 rounded-xl mb-8">
                <TabsTrigger value="counselors" className="rounded-lg data-[state=active]:bg-gradient-primary data-[state=active]:text-white">Our Counselors</TabsTrigger>
                <TabsTrigger value="request" className="rounded-lg data-[state=active]:bg-gradient-primary data-[state=active]:text-white">Request Session</TabsTrigger>
            </TabsList>

            <TabsContent value="counselors" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {counselors.map((counselor, i) => (
                        <Card key={i} className="p-6 border-border bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-1">{counselor.name}</h3>
                                    <p className="text-sm text-primary font-medium mb-2">{counselor.specialty}</p>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
                                        <Clock className="w-3 h-3" />
                                        {counselor.available}
                                    </div>
                                    <Button size="sm" className="bg-primary/10 text-primary hover:bg-primary hover:text-white border-0">
                                        View Profile
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="request">
                <Card className="p-6 md:p-8 bg-card/50 backdrop-blur border-border">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Full Name *</label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Your name"
                                    required
                                    className="bg-background/50 border-primary/20 focus-visible:ring-primary/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Email *</label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="your@email.com"
                                    required
                                    className="bg-background/50 border-primary/20 focus-visible:ring-primary/50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Preferred Date *</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="date"
                                    value={formData.preferredDate}
                                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                                    required
                                    className="pl-10 bg-background/50 border-primary/20 focus-visible:ring-primary/50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">What would you like to discuss?</label>
                            <Textarea
                                value={formData.concerns}
                                onChange={(e) => setFormData({ ...formData, concerns: e.target.value })}
                                placeholder="Share what's on your mind..."
                                className="bg-background/50 border-primary/20 focus-visible:ring-primary/50 min-h-[120px]"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="anonymous"
                                checked={formData.anonymous}
                                onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                                className="w-4 h-4 rounded border-primary/20 text-primary focus:ring-primary"
                            />
                            <label htmlFor="anonymous" className="text-sm text-muted-foreground cursor-pointer select-none">
                                Keep session details private
                            </label>
                        </div>

                        <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 text-white h-12 text-lg">
                            Request Counseling Session
                        </Button>
                    </form>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
