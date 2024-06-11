import React from 'react';
import Navigation from '@/components/common/Navigation';

export default function Header() {
    return (
        <header className="text-black relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-400">
            <Navigation />
        </header>
    );
}


