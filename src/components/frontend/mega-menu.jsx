"use client"

import {cn} from "@/lib/utils"
import {ChevronDown, ChevronRight} from 'lucide-react'
import Image from "next/image"
import {useEffect, useState} from "react"
import {AnimatePresence, motion} from "framer-motion"

const categories = [
    {
        id           : "dairy",
        name         : "Meat",
        icon         : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIYSRAvtC1vixqC-EvCbnI3Gd8tVxLOh2GSQ&s",
        subcategories: [
            {
                id           : "milk",
                name         : "Chicken",
                icon         : "https://www.shutterstock.com/image-vector/chicken-meat-icon-vector-illustration-600w-1499172344.jpg",
                subcategories: [
                    {id: "whole", name: "Breast", icon: "https://clipart-library.com/8300/1931/fresh-chicken-breast-free-illustration_2623688.png!sw800"},
                    {id: "skim", name: "Drumstick", icon: "https://cdn-icons-png.flaticon.com/512/7312/7312808.png"},
                ]
            },
            {id: "yogurt", name: "Beef", icon: "https://img.freepik.com/premium-vector/meat-steak-icon-flat-style-white-background_96318-17385.jpg"},
            {id: "cheese", name: "Mutton", icon: "https://static.vecteezy.com/system/resources/previews/010/348/849/non_2x/mutton-meat-color-icon-illustration-vector.jpg"},
        ]
    },
    {
        id           : "meat",
        name         : "Frozen Item",
        icon         : "https://cdn-icons-png.flaticon.com/512/5029/5029236.png",
        subcategories: [
            {
                id           : "beef",
                name         : "Chicken Cuts",
                icon         : "https://elements-resized.envatousercontent.com/elements-cover-images/9c912af9-75a1-4f0d-b9b7-398e199ef5da?w=316&cf_fit=scale-down&q=94&format=jpeg&s=f8bbfb4a523ec79c41ff9d77c0a7f78ea185cb718115bcf09678a9c1b5cbafb6",
                subcategories: [
                    {id: "steak", name: "Drumsticks", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgnG0I0QUhpZmcoRtMzBweYto_6zXIcwqHhg&s"},
                    {id: "ground", name: "Wings", icon: "https://cdn-icons-png.flaticon.com/512/2719/2719292.png"},
                ]
            },
            {id: "pork", name: "Whole Chicken", icon: "https://media.istockphoto.com/id/486720472/vector/chicken-hen-waving-hand.jpg?s=612x612&w=0&k=20&c=b8Eb3Qxle7cyS0XUbSFNGtcZLdq8wXaq8N3lvIQx9BU="},
            {id: "fish", name: "Minced/Processed", icon: "/icons/fish.svg"},
        ]
    },
    // Add more categories as needed
]

export function MegaMenu({isMobile = false}) {
    const [activeCategories, setActiveCategories] = useState([])
    const [hoveredCategory, setHoveredCategory] = useState(null)
    const [expandedCategories, setExpandedCategories] = useState([])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.mega-menu')) {
                setActiveCategories([])
                setExpandedCategories([])
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const toggleCategory = (category) => {
        setExpandedCategories(prev =>
            prev.includes(category.id)
            ? prev.filter(id => id !== category.id)
            : [...prev, category.id]
        )
    }

    const renderCategories = (categoryList, depth = 0) => (
        <AnimatePresence>
            {categoryList.map((category) => (
                <motion.div key={category.id} className="w-full">
                    <motion.button className={cn(
                        "flex items-center w-full space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors",
                        activeCategories[depth]?.id === category.id && "bg-gray-100"
                    )} onClick={() => isMobile ? toggleCategory(category) : undefined} onMouseEnter={() => {
                        if (!isMobile) {
                            setHoveredCategory(category.id)
                            setActiveCategories(prev => [...prev.slice(0, depth), category])
                        }
                    }} onMouseLeave={() => !isMobile && setHoveredCategory(null)} initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}} transition={{duration: 0.2}}>
                        <div className="w-8 h-8 relative">
                            <Image src={category.icon} alt={category.name} fill className="object-contain"/>
                        </div>
                        <span className="flex-1 text-left text-sm font-medium">{category.name}</span> {category.subcategories && (
                        isMobile ? (
                            <ChevronDown className={cn(
                                "h-4 w-4 text-gray-400 transition-transform duration-200",
                                expandedCategories.includes(category.id) && "transform rotate-180"
                            )}/>
                        ) : (
                            <ChevronRight className={cn(
                                "h-4 w-4 text-gray-400 transition-transform duration-200",
                                hoveredCategory === category.id && "transform rotate-90"
                            )}/>
                        )
                    )}
                    </motion.button>
                    {isMobile && expandedCategories.includes(category.id) && category.subcategories && (
                        <div className="pl-4">
                            {renderCategories(category.subcategories, depth + 1)}
                        </div>
                    )}
                </motion.div>
            ))}
        </AnimatePresence>
    )

    return (
        <div className={cn(
            "bg-white shadow-lg rounded-lg z-50 mega-menu",
            isMobile
            ? "absolute top-full left-0 right-0 mt-2"
            : "absolute top-full left-0 flex"
        )}>
            {isMobile ? (
                <div className="w-full p-4 max-h-[80vh] overflow-y-auto">
                    {renderCategories(categories)}
                </div>
            ) : (
                 [categories, ...activeCategories.map(cat => cat.subcategories)].map((categoryList, index) => (
                     categoryList && categoryList.length > 0 && (
                         <motion.div key={index} className="w-64 p-4 max-h-[480px] overflow-y-auto border-r" initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -20}} transition={{duration: 0.2, delay: index * 0.1}}>
                             {renderCategories(categoryList, index)}
                         </motion.div>
                     )
                 ))
             )}
        </div>
    )
}

