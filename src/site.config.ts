export const SITE = {
  title: 'Tanmen',
  description: '怠惰なプログラマーのサイト',
  author: 'tanmen',
  url: 'https://tanmen.work',
  social: {
    github: 'tanmen',
    twitter: 'dot_tanmen',
    qiita: 'dot_tanmen',
  },
} as const;

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/profile', label: 'Profile' },
  { href: '/services', label: 'Services' },
  { href: '/tools', label: 'Tools' },
  { href: '/posts', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
] as const;
