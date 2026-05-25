'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ThumbsUp, MessageCircle } from 'lucide-react'

const comments = [
    {
        id: 1,
        author: "Alice Johnson",
        avatar: "/placeholder.svg",
        content: "This article provides a great overview of the challenges and innovations in sustainable meat production. I particularly found the section on lab-grown meat fascinating. It's exciting to see how technology is being used to address environmental and ethical concerns in the food industry.",
        date: "2023-07-02T10:30:00Z",
        likes: 15,
        replies: 2
    },
    {
        id: 2,
        author: "Bob Smith",
        avatar: "/placeholder.svg",
        content: "While I appreciate the focus on sustainability, I think it's important to also consider the economic impact of these changes on traditional farmers. How can we ensure a smooth transition that doesn't leave them behind?",
        date: "2023-07-02T14:45:00Z",
        likes: 8,
        replies: 1
    },
    {
        id: 3,
        author: "Carol White",
        avatar: "/placeholder.svg",
        content: "I've tried some of the plant-based meat alternatives mentioned in the article, and I have to say, they've come a long way in terms of taste and texture. It's great to see these options becoming more mainstream.",
        date: "2023-07-03T09:15:00Z",
        likes: 12,
        replies: 0
    }
]

export default function CommentSection() {
    const [newComment, setNewComment] = useState('')

    const handleSubmitComment = (e) => {
        e.preventDefault()
        // Here you would typically send the comment to your backend
        console.log('New comment:', newComment)
        setNewComment('')
    }

    return (
        <section className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8">Comments</h2>
            <form onSubmit={handleSubmitComment} className="mb-8">
                <Textarea
                    placeholder="Leave a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-4"
                />
                <Button type="submit">Post Comment</Button>
            </form>
            <div className="space-y-8">
                {comments.map((comment, index) => (
                    <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex space-x-4"
                    >
                        <Avatar>
                            <AvatarImage src={comment.avatar} alt={comment.author} />
                            <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center mb-2">
                                <h3 className="font-semibold mr-2">{comment.author}</h3>
                                <span className="text-gray-500 text-sm">
                                    {new Date(comment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                            </div>
                            <p className="text-gray-700 mb-2">{comment.content}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <Button variant="ghost" size="sm" className="flex items-center">
                                    <ThumbsUp className="mr-1 h-4 w-4" />
                                    {comment.likes}
                                </Button>
                                <Button variant="ghost" size="sm" className="flex items-center">
                                    <MessageCircle className="mr-1 h-4 w-4" />
                                    {comment.replies}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
