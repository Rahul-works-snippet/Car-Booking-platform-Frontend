'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface HeaderProps {
  isOpen?: boolean;
  onMenuToggle?: (open: boolean) => void;
}

const navItems = [
  { label: 'Find Cars', path: '/car-search-and-browse', icon: 'MagnifyingGlassIcon' },
  { label: 'My Bookings', path: '/car-details-and-booking', icon: 'CalendarDaysIcon' },
  { label: 'Support', path: '/support', icon: 'ChatBubbleLeftRightIcon' },
];

const Header = ({ isOpen = false, onMenuToggle }: HeaderProps) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(isOpen);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(isOpen);
  }, [isOpen]);

  const toggleMobile = () => {
    const next = !mobileOpen;
    setMobileOpen(next);
    onMenuToggle?.(next);
  };

  const closeMobile = () => {
    setMobileOpen(false);
    onMenuToggle?.(false);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-nav bg-card transition-automotive duration-automotive ${
          scrolled ? 'shadow-automotive-md' : 'shadow-automotive-sm'
        } border-b border-border`}
        style={{ height: '64px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group" onClick={closeMobile}>
            <div className="w-9 h-9 rounded-automotive-sm bg-primary flex items-center justify-center shadow-automotive-sm group-hover:shadow-automotive transition-automotive duration-automotive">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 14.5L5.5 8.5C5.9 7.4 6.9 6.7 8.1 6.7H13.9C15.1 6.7 16.1 7.4 16.5 8.5L19 14.5" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
                <rect x="2" y="14" width="18" height="4" rx="2" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="1.4"/>
                <circle cx="6.5" cy="17.5" r="1.5" fill="white"/>
                <circle cx="15.5" cy="17.5" r="1.5" fill="white"/>
                <path d="M8 10.5H14" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-heading font-700 text-lg text-foreground tracking-tight hidden sm:block">
              Drive<span className="text-primary">Easy</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-automotive text-sm font-caption font-medium transition-automotive duration-automotive focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                <Icon name={item.icon as any} size={16} variant="outline" />
                {item.label}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Sign In / Account */}
            <div className="hidden md:block relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 px-4 py-2 rounded-automotive bg-primary text-primary-foreground text-sm font-caption font-medium shadow-automotive-sm hover:shadow-automotive active:scale-95 transition-automotive duration-automotive focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                <Icon name="UserCircleIcon" size={18} variant="outline" />
                Sign In
                <Icon name="ChevronDownIcon" size={14} variant="outline" className={`transition-automotive duration-automotive ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-automotive shadow-automotive-md z-dropdown overflow-hidden">
                  <div className="py-1">
                    {[
                      { label: 'My Account', icon: 'UserIcon', path: '/account' },
                      { label: 'My Bookings', icon: 'CalendarDaysIcon', path: '/car-details-and-booking' },
                      { label: 'Settings', icon: 'Cog6ToothIcon', path: '/settings' },
                    ].map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-caption text-foreground hover:bg-muted transition-automotive duration-automotive"
                      >
                        <Icon name={item.icon as any} size={16} variant="outline" className="text-muted-foreground" />
                        {item.label}
                      </Link>
                    ))}
                    <div className="border-t border-border my-1" />
                    <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-caption text-error hover:bg-muted transition-automotive duration-automotive">
                      <Icon name="ArrowRightOnRectangleIcon" size={16} variant="outline" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={toggleMobile}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-automotive text-muted-foreground hover:text-foreground hover:bg-muted transition-automotive duration-automotive focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <Icon name={mobileOpen ? 'XMarkIcon' : 'Bars3Icon'} size={22} variant="outline" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-dropdown md:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-foreground/40" />
        </div>
      )}
      <div
        className={`fixed top-16 left-0 right-0 z-dropdown md:hidden bg-card border-b border-border shadow-automotive-lg transition-automotive duration-automotive overflow-hidden ${
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <nav className="px-4 py-3 flex flex-col gap-1" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={closeMobile}
              className={`flex items-center gap-3 px-4 py-3 rounded-automotive text-sm font-caption font-medium transition-automotive duration-automotive ${
                isActive(item.path)
                  ? 'text-primary bg-primary/10' :'text-foreground hover:bg-muted'
              }`}
              aria-current={isActive(item.path) ? 'page' : undefined}
            >
              <Icon name={item.icon as any} size={18} variant="outline" />
              {item.label}
              {isActive(item.path) && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          ))}
          <div className="border-t border-border my-2" />
          <Link
            href="/account"
            onClick={closeMobile}
            className="flex items-center gap-3 px-4 py-3 rounded-automotive text-sm font-caption font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-automotive duration-automotive"
          >
            <Icon name="UserCircleIcon" size={18} variant="outline" />
            Sign In / Account
          </Link>
        </nav>
      </div>

      {/* Spacer */}
      <div style={{ height: '64px' }} aria-hidden="true" />
    </>
  );
};

export default Header;