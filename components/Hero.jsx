"use client"
import { Button } from '@base-ui/react'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const HeroSection = () => {
    const imageRef = useRef()

    useEffect(() => {
        const imageElement = imageRef.current

        const handleScroll = () => {
            const scrollPosition = window.scrollY
            const scrollThreshold = 100

            if (scrollPosition > scrollThreshold) {
                imageElement.classList.add("scrolled")
            } else {
                imageElement.classList.remove("scrolled")
            }
        }

        window.addEventListener("scroll", handleScroll);

        return ()=>{
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])
    return (
        <div className='pb-20 px-4'>
            <div className='container mx-auto text-center'>
                <h1 className='text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title '>
                    Manage Your Finances <br /> with Inteliigence
                </h1>
                <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
                    An AI powerd Finances tracking system that helps you to manage your money and save for your future.
                </p>
                <div className='flex justify-center space-x-4'>
                    <Link href="/dashboard">
                        <Button size="lg" className="px-8">Get Started</Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button size="lg" className="px-8 outline">Watch Demo</Button>
                    </Link>
                </div>
                <div className='hero-image-wrapper'>
                    <div ref={imageRef} className='hero-image'>
                        <Image src="/banner.jpeg" width={1280} height={720} alt="Banner" className="rounded-lg shadow-2xl border mx-auto" priority />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection