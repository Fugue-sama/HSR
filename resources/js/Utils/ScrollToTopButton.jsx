import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function ScrollToTopButton({ containerRef }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = containerRef.current?.scrollTop ?? 0
            if (scrollTop > 300) setIsVisible(true);
            else setIsVisible(false);
        };

        const el = containerRef.current;
        el.addEventListener('scroll', handleScroll)
        return () => el.removeEventListener('scroll', handleScroll)
    }, [containerRef]);

    const scrollToTop = () => {
        containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (!isVisible) return null;
    return (
        <motion.div
            className='nav-tools-item bg-[#313131] p-4 rounded-2xl shadow-2xl drop-shadow-lg'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            onClick={scrollToTop}
            style={{ cursor: 'pointer', zIndex: 1000 }}
        >
            <svg
                width='36'
                height='36'
                viewBox='0 0 36 36'
                fill='#282828'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M16.5 16.79v12.96a1.5 1.5 0 003 0V16.789l5.925 5.925a1.5 1.5 0 002.121-2.122l-6.364-6.364a4.5 4.5 0 00-6.364 0l-6.364 6.364a1.5 1.5 0 002.122 2.122l5.924-5.925zM7.5 9.5A1.5 1.5 0 019 8h18a1.5 1.5 0 010 3H9a1.5 1.5 0 01-1.5-1.5z'
                    fill='#fff'
                    fillOpacity='.45'
                />
            </svg>
        </motion.div>
    );
}

export default ScrollToTopButton;
