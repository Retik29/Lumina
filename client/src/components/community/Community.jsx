import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Share2, MoreHorizontal, PenLine, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export default function CommunityComponent() {
    const [posts, setPosts] = useState([
        {
            id: 1,
            author: "Anonymous",
            content: "Just finished my first meditation! Feeling so calm. It's amazing how taking 10 minutes for yourself can shift your entire day.",
            likes: 24,
            comments: 3,
            time: "2h ago"
        },
        {
            id: 2,
            author: "Peer Support",
            content: "Struggled today but remembered I am stronger than my anxiety. Sending love and light to everyone here navigating a tough week.",
            likes: 42,
            comments: 7,
            time: "5h ago"
        },
    ])
    const [newPost, setNewPost] = useState("")
    const [likedPosts, setLikedPosts] = useState(new Set())

    const handlePost = () => {
        if (!newPost.trim()) return
        const post = {
            id: Date.now(),
            author: "You",
            content: newPost,
            likes: 0,
            comments: 0,
            time: "Just now"
        }
        setPosts([post, ...posts])
        setNewPost("")
    }

    const toggleLike = (id) => {
        const newLiked = new Set(likedPosts)
        if (newLiked.has(id)) {
            newLiked.delete(id)
        } else {
            newLiked.add(id)
        }
        setLikedPosts(newLiked)
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        show: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    }

    return (
        <div className="space-y-12 relative z-10 w-full max-w-3xl mx-auto">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Header Area */}
            <div className="text-center space-y-2 shrink-0 relative z-10">
            </div>

            {/* Create Post Section */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="p-2 bg-white/60 backdrop-blur-xl border-white/40 shadow-xl shadow-primary/5 rounded-[2.5rem] relative overflow-hidden group transition-all duration-500 focus-within:bg-white/80 focus-within:shadow-2xl">
                    <div className="p-4 sm:p-6 space-y-4">
                        <Textarea
                            placeholder="Share your thoughts anonymously..."
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            className="min-h-40 resize-none border-none bg-accent/50 focus-visible:ring-0 text-xl font-serif leading-relaxed placeholder:font-sans placeholder:text-lg placeholder:font-light p-2 px-4 shadow-none"
                        />
                        
                        <div className="flex justify-between items-center pt-2 border-t border-black/5">
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-medium">
                                Posted Anonymously
                            </p>
                            <Button
                                onClick={handlePost}
                                disabled={!newPost.trim()}
                                className="rounded-full px-6 bg-primary hover:bg-primary/90 text-primary shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:hover:scale-100 font-medium"
                            >
                                <PenLine className="w-4 h-4 mr-2" />
                                Share
                            </Button>
                        </div>
                    </div>
                </Card>
            </motion.div>

            {/* Feed Section */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-6 relative z-10"
            >
                <AnimatePresence mode="popLayout">
                    {posts.map((post) => (
                        <motion.div key={post.id} variants={itemVariants} layout>
                            <Card className="p-8 bg-white/40 backdrop-blur-xl border border-white/40 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1 rounded-[2.5rem] group">
                                
                                {/* Post Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-serif text-xl italic text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                            {post.author[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground leading-none mb-1">{post.author}</p>
                                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60">{post.time}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground/50 hover:text-foreground hover:bg-black/5 transition-colors">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* Post Content */}
                                <p className="text-xl md:text-2xl font-serif text-foreground/90 leading-relaxed mb-8">
                                    "{post.content}"
                                </p>

                                {/* Post Actions */}
                                <div className="flex gap-2 pt-6 border-t border-black/5">
                                    <button
                                        onClick={() => toggleLike(post.id)}
                                        className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
                                            likedPosts.has(post.id) 
                                            ? "bg-red-50 text-red-500 shadow-sm" 
                                            : "bg-white/50 text-muted-foreground hover:bg-white hover:text-foreground hover:shadow-sm"
                                        }`}
                                    >
                                        <motion.div whileTap={{ scale: 0.8 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                                            <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? "fill-current" : ""}`} />
                                        </motion.div>
                                        {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                                    </button>
                                    
                                    <button className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-white/50 text-muted-foreground hover:bg-white hover:text-foreground hover:shadow-sm transition-all duration-300">
                                        <MessageCircle className="w-4 h-4" />
                                        {post.comments}
                                    </button>
                                    
                                    <button className="flex items-center justify-center w-9 h-9 rounded-full bg-white/50 text-muted-foreground hover:bg-white hover:text-foreground hover:shadow-sm transition-all duration-300 ml-auto">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}