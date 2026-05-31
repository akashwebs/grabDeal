'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import LogoutButton from '../LogoutButton';

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menus = [
    {
      group: 'Overview',
      items: [{ icon: '🏠', name: 'Dashboard', link: '/dashboard' }],
    },
    {
      group: 'Banner',
      items: [
        { name: 'All Banners', link: '/dashboard/banner', icon: '🖼' },
        { name: 'Add Banner', link: '/dashboard/banner/add', icon: '➕' },
      ],
    },
    {
      group: 'Offers',
      items: [
        { name: 'All Offers', link: '/dashboard/offers/view', icon: '🔥' },
        { name: 'Add Offer', link: '/dashboard/offers', icon: '➕' },
      ],
    },
    {
      group: 'Categories',
      items: [
        { name: 'All Categories', link: '/dashboard/category/view', icon: '📋' },
        { name: 'Add Category', link: '/dashboard/category', icon: '➕' },
      ],
    },
    {
      group: 'Brands',
      items: [
        { name: 'All Brands', link: '/dashboard/brands/view', icon: '🏷️' },
        { name: 'Add Brand', link: '/dashboard/brands', icon: '➕' },
      ],
    },
    {
      group: 'Customers',
      items: [{ name: 'Reviews', link: '/dashboard/reviews', icon: '⭐' }],
    },
  ];

  const SidebarContent = () => (
    <div
      className={`min-h-screen bg-[#16013d] text-white transition-all duration-300 ${
        collapsed ? 'w-20 p-4' : 'w-64 p-6'
      }`}
    >
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" target="_blank">
          {!collapsed ? (
            <Image alt="Logo" width={160} height={80} src="/footer.png" />
          ) : (
            <div className="text-2xl font-black">G</div>
          )}
        </Link>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden rounded-lg bg-purple-800 px-2 py-1 text-sm lg:block"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <div className="space-y-6">
        {menus.map((section) => (
          <div key={section.group}>
            {!collapsed && (
              <p className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-purple-300">
                {section.group}
              </p>
            )}

            <div className="space-y-1">
              {section.items.map((menu) => {
                const active =
                  pathname === menu.link || pathname.startsWith(menu.link + '/');

                return (
                  <Link
                    key={menu.link}
                    href={menu.link}
                    onClick={() => setMobileOpen(false)}
                    title={menu.name}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                      active ? 'bg-purple-600' : 'hover:bg-purple-800'
                    } ${collapsed ? 'justify-center px-2' : ''}`}
                  >
                    <span className="text-xl">{menu.icon}</span>
                    {!collapsed && <span>{menu.name}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        <div className={collapsed ? 'flex justify-center' : ''}>
          <LogoutButton />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-[60] rounded-xl bg-[#16013d] px-4 py-3 text-white shadow-xl lg:hidden"
      >
        ☰
      </button>

      <aside className="hidden lg:block">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/50"
          />

          <div className="relative z-10">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute left-64 top-4 rounded-full bg-white px-3 py-1 font-bold text-[#16013d]"
            >
              ✕
            </button>

            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}