'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Twitter, Facebook, Linkedin } from 'lucide-react'

export default function ShareButtons({ url, title }) {
    const shareOnTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank')
    }

    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
    }

    const shareOnLinkedIn = () => {
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank')
    }

    return (
        <div className="flex space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button onClick={shareOnTwitter} variant="outline" size="icon">
                    <Twitter className="h-4 w-4" />
                </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button onClick={shareOnFacebook} variant="outline" size="icon">
                    <Facebook className="h-4 w-4" />
                </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button onClick={shareOnLinkedIn} variant="outline" size="icon">
                    <Linkedin className="h-4 w-4" />
                </Button>
            </motion.div>
        </div>
    )
}
