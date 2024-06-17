import React from 'react';
import Navigation from '@/components/common/Navigation';

export default function Header() {
    return (
        <header className="mx-auto max-w-screen-2xl bg-white after:content-[''] after:bg-gray-300 after:block after:w-full after:h-[1px] after:left-0 after-bottom-0  ">
            <Navigation />
        </header>
    );
}


