// Minimal icon set (no external libraries). Add more as needed.
export const Icons = {
  Menu: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  ),
  Phone: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h2l2 5-2 1a16 16 0 008 8l1-2 5 2v2a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V6z" />
    </svg>
  ),
  Mail: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        d="M3 7l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  ),
  MapPin: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        d="M12 11a4 4 0 100-8 4 4 0 000 8zm0 0c-5 0-9 2.239-9 5v2h18v-2c0-2.761-4-5-9-5z"/>
    </svg>
  ),
  ArrowRight: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            d="M5 12h14m-6-6l6 6-6 6"/>
    </svg>
  ),
  Facebook: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M13.5 22v-8h2.7l.3-3.1H13.5V9a1.4 1.4 0 011.6-1.6h1.7V4.6A16 16 0 0014.7 4c-2.5 0-4.2 1.6-4.2 4.6v2.3H8v3.1h2.5V22h3z"/></svg>
  ),
  Instagram: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/></svg>
  ),
  LinkedIn: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M4.98 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3.5 8.98h3V21h-3V8.98zM9 9h2.88v1.64h.04c.4-.76 1.38-1.56 2.85-1.56C18.4 9.08 19 11 19 13.52V21h-3v-6.53c0-1.56-.03-3.57-2.18-3.57-2.18 0-2.51 1.7-2.51 3.46V21H9V9z"/></svg>
  ),
  Twitter: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M22 5.8c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.2 1.7-2.1-.8.5-1.7.8-2.6 1a4 4 0 00-6.9 3.6A11.4 11.4 0 013 5c-.5 1 .1 2.2 1.1 2.8-.6 0-1.1-.2-1.6-.4v.1c0 1.9 1.4 3.6 3.2 4-.4.1-.8.1-1.2 0 .3 1.6 1.8 2.8 3.5 2.9A8.1 8.1 0 012 18.6 11.4 11.4 0 008.2 20c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.5 1.5-1.2 2.1-2z"/></svg>
  ),
};
export type IconKey = keyof typeof Icons;
