"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

const FEATURES: {
  icon: string;
  title: string;
  desc: string;
  accent: string;
  stat: string;
}[] = [
  {
    icon: "📝",
    title: "AI Listing Generator",
    desc: "Type in the basics — bedrooms, area, price. EstateFlow writes a full, professional property listing in under 5 seconds. Ready for portals, social, and WhatsApp.",
    accent: "#F59E0B",
    stat: "5 sec per listing",
  },
  {
    icon: "🎯",
    title: "Smart Lead Assistant",
    desc: "Every enquiry is captured, scored, and ranked by buying intent. The AI tells you exactly who to call first and what to say — no more guessing.",
    accent: "#3B82F6",
    stat: "85% response rate",
  },
  {
    icon: "💬",
    title: "WhatsApp Automation",
    desc: "Broadcast new listings, send follow-ups, and nurture leads — all through WhatsApp automatically. Set it up once, let it run forever.",
    accent: "#10B981",
    stat: "Zero manual sends",
  },
  {
    icon: "📊",
    title: "Market Intelligence",
    desc: "Live pricing trends across Accra, Lagos, and Nairobi. Know what properties are selling for before your client even asks.",
    accent: "#8B5CF6",
    stat: "3 markets live",
  },
];

const STATS: { value: string; label: string }[] = [
  { value: "5s", label: "To generate a listing" },
  { value: "85%", label: "Better response rate" },
  { value: "3×", label: "Faster to close" },
  { value: "0", label: "Manual follow-ups" },
];

const ACTIVITY: { color: string; label: string; sub: string }[] = [
  {
    color: "#F59E0B",
    label: "Listing Auto-Generated",
    sub: "4-bed detached, East Legon • just now",
  },
  {
    color: "#10B981",
    label: "WhatsApp Broadcast Sent",
    sub: "42 clients notified • 2m ago",
  },
  {
    color: "#3B82F6",
    label: "Hot Lead Detected",
    sub: "Kofi A. — ready to view • 5m ago",
  },
  {
    color: "#8B5CF6",
    label: "Follow-up Sent",
    sub: "AI drafted & delivered • 12m ago",
  },
  {
    color: "#F59E0B",
    label: "New Listing Published",
    sub: "3-bed apartment, Ikoyi • 18m ago",
  },
];

const STEPS: { n: string; t: string; d: string }[] = [
  {
    n: "01",
    t: "Add a property in 10 seconds",
    d: "Give EstateFlow the basics — bedrooms, location, price. The AI writes a polished listing instantly.",
  },
  {
    n: "02",
    t: "AI captures and qualifies leads",
    d: "Every enquiry across WhatsApp, email, and social is caught and scored. You always know who's serious.",
  },
  {
    n: "03",
    t: "Follow-ups sent automatically",
    d: "The right message goes to the right lead at the right time. No typing, no forgetting, no losing deals.",
  },
  {
    n: "04",
    t: "You show up and close the deal",
    d: "By the time you meet a client, EstateFlow has already warmed them up. You just close.",
  },
];

const WORKFLOW: {
  icon: string;
  label: string;
  tag: "done" | "ai" | "you";
  tagLabel: string;
}[] = [
  { icon: "🏘️", label: "Property listed", tag: "done", tagLabel: "Auto" },
  {
    icon: "💬",
    label: "Lead enquiry received",
    tag: "ai",
    tagLabel: "AI scored",
  },
  { icon: "📲", label: "Follow-up sent", tag: "done", tagLabel: "Auto" },
  { icon: "📅", label: "Viewing booked", tag: "ai", tagLabel: "Self-service" },
  {
    icon: "🤝",
    label: "Deal ready to close",
    tag: "you",
    tagLabel: "Your turn",
  },
];

export default function EstateFlow() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "Ghana",
  });
  const [activeActivity, setActiveActivity] = useState(0);
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const t = setInterval(
      () => setActiveActivity((p) => (p + 1) % ACTIVITY.length),
      2400,
    );
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const vid = (e.target as HTMLElement).dataset.vid;
            if (vid) setVisible((v) => ({ ...v, [vid]: true }));
          }
        }),
      { threshold: 0.1 },
    );
    Object.values(refs.current).forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  const vref = (id: string) => (el: HTMLElement | null) => {
    refs.current[id] = el;
    if (el) el.dataset.vid = id;
  };
  const rv = (id: string, extra = "") =>
    `${extra} reveal${visible[id] ? " vis" : ""}`.trim();

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    setLoading(true);

    try {
      // Check if already exists first for better UX
      const { data: existing } = await supabase
        .from("waitlist")
        .select("id")
        .eq("email", form.email)
        .maybeSingle();

      if (existing) {
        alert("You are already on the waitlist! We'll reach out soon.");
        setSubmitted(true);
        return;
      }

      const { error } = await supabase.from("waitlist").insert([
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          country: form.country,
        },
      ]);

      if (error) {
        if (error.code === "23505") {
          alert("This email is already registered on our waitlist.");
          setSubmitted(true);
          return;
        }
        throw error;
      }
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting to waitlist:", err);
      alert(
        "Something went wrong. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --brand: #2563EB; --brand-lt: #F0F7FF; --brand-mid: #DBEAFE;
          --ink: #111110; --ink-2: #1C1B1A; --ink-60: #4A4845; --ink-40: #7A7775;
          --ink-20: #B5B2B0; --ink-10: #E2E0DE; --ink-05: #F5F4F2; --white: #FFFFFF;
          --green: #10B981; --blue: #3B82F6; --purple: #8B5CF6;
          --f: 'Plus Jakarta Sans', system-ui, sans-serif;
          --pad: clamp(16px, 5vw, 64px); --max: 1200px;
          --r: 12px; --r-lg: 18px; --r-xl: 24px;
          --sh: 0 4px 20px rgba(0,0,0,0.07); --sh-lg: 0 12px 48px rgba(0,0,0,0.10);
        }
        html { scroll-behavior: smooth; }
        body { font-family: var(--f); background: var(--white); color: var(--ink); -webkit-font-smoothing: antialiased; overflow-x: hidden; line-height: 1.6; font-size: 16px; }

        /* REVEAL */
        .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1); }
        .reveal.vis { opacity: 1; transform: none; }
        .d1{transition-delay:.07s} .d2{transition-delay:.14s} .d3{transition-delay:.21s} .d4{transition-delay:.28s}
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes slideIn { from { transform: translateY(-12px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        /* AGENT BANNER */
        .ab { background: var(--brand); padding: 10px var(--pad); text-align: center; }
        .ab-in { max-width: var(--max); margin: 0 auto; display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap; }
        .ab p { font-size: 13px; font-weight: 700; color: var(--white); }
        .ab span { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.7); }

        /* NAV */
        .nav { position: sticky; top: 0; z-index: 200; background: rgba(255,255,255,0.93); backdrop-filter: blur(16px); border-bottom: 1px solid var(--ink-10); height: 60px; display: flex; align-items: center; padding: 0 var(--pad); }
        .nav-in { width: 100%; max-width: var(--max); margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .logo { display: flex; align-items: center; gap: 9px; text-decoration: none; flex-shrink: 0; }
        .logo-icon { width: 32px; height: 32px; border-radius: 8px; object-fit: contain; }
        .logo-text { font-size: 16px; font-weight: 500; color: var(--ink); letter-spacing: -0.2px; }
        .logo-text strong { font-weight: 800; color: var(--ink); }
        .logo-text span { color: var(--brand); opacity: 0.8; font-weight: 500; }
        .nav-links { display: flex; gap: 24px; list-style: none; }
        .nav-links a { font-size: 14px; font-weight: 600; color: var(--ink-60); text-decoration: none; transition: color 0.2s; }
        .nav-links a:hover { color: var(--ink); }
        .nav-r { display: flex; align-items: center; gap: 10px; }
        .nav-cta { background: var(--brand); color: var(--white); font-size: 13px; font-weight: 700; padding: 8px 18px; border-radius: 9px; text-decoration: none; transition: background 0.2s, transform 0.15s; white-space: nowrap; }
        .nav-cta:hover { background: #1D4ED8; transform: translateY(-1px); }
        .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 6px; border-radius: 8px; color: var(--ink); font-size: 20px; line-height: 1; font-family: var(--f); }
        .mob-menu { position: fixed; top: 60px; left: 0; right: 0; background: var(--white); border-bottom: 1px solid var(--ink-10); padding: 16px var(--pad); display: flex; flex-direction: column; gap: 0; z-index: 199; box-shadow: var(--sh-lg); animation: slideIn 0.35s cubic-bezier(.22,1,.36,1); }
        .mob-menu a { font-size: 15px; font-weight: 600; color: var(--ink-60); text-decoration: none; padding: 12px 0; border-bottom: 1px solid var(--ink-05); transition: color 0.2s; }
        .mob-menu a:hover { color: var(--brand); }
        .mob-menu .mcta { margin-top: 10px; background: var(--brand); color: var(--white); font-weight: 700; border-radius: 10px; text-align: center; padding: 13px; border-bottom: none; }

        /* HERO */
        .hero-bg { background: linear-gradient(155deg, var(--brand-lt) 0%, var(--white) 55%); padding: clamp(44px, 8vw, 96px) var(--pad) clamp(44px, 6vw, 72px); }
        .hero { max-width: var(--max); margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: clamp(28px, 5vw, 64px); align-items: center; }
        .hero-tag { display: inline-flex; align-items: center; gap: 7px; font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: var(--brand); background: var(--brand-lt); border: 1px solid var(--brand-mid); padding: 5px 13px; border-radius: 100px; margin-bottom: 20px; }
        .tag-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--brand); animation: blink 2s infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .hero-h1 { font-size: clamp(30px, 4.5vw, 58px); font-weight: 800; line-height: 1.1; color: var(--ink); letter-spacing: -1px; margin-bottom: 16px; animation: fadeIn 0.8s cubic-bezier(.22,1,.36,1) both; }
        .hero-h1 .am { color: var(--brand); }
        .hero-p { font-size: clamp(14px, 1.4vw, 17px); color: var(--ink-60); line-height: 1.65; margin-bottom: 28px; font-weight: 400; animation: fadeIn 0.8s cubic-bezier(.22,1,.36,1) 0.1s both; }
        .hero-btns { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 32px; animation: fadeIn 0.8s cubic-bezier(.22,1,.36,1) 0.2s both; }
        .btn-dark { display: inline-flex; align-items: center; gap: 7px; background: var(--ink); color: var(--white); font-size: 14px; font-weight: 700; padding: 13px 24px; border-radius: 11px; text-decoration: none; transition: all 0.2s; white-space: nowrap; font-family: var(--f); }
        .btn-dark:hover { background: var(--ink-2); transform: translateY(-2px); box-shadow: var(--sh-lg); }
        .btn-outline { display: inline-flex; align-items: center; gap: 7px; background: transparent; color: var(--ink); font-size: 14px; font-weight: 600; padding: 13px 24px; border-radius: 11px; text-decoration: none; border: 1.5px solid var(--ink-10); transition: all 0.2s; white-space: nowrap; }
        .btn-outline:hover { border-color: var(--ink-40); background: var(--ink-05); }
        .proof { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; animation: fadeIn 0.8s cubic-bezier(.22,1,.36,1) 0.3s both; }
        .pfaces { display: flex; }
        .pface { width: 30px; height: 30px; border-radius: 50%; border: 2px solid var(--white); background: var(--brand-lt); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; color: var(--ink); margin-left: -7px; }
        .pface:first-child { margin-left: 0; }
        .ptext { font-size: 13px; color: var(--ink-60); }
        .ptext strong { color: var(--ink); font-weight: 700; }

        /* HUB CARD */
        .hub { background: var(--white); border: 1px solid var(--ink-10); border-radius: var(--r-xl); padding: clamp(16px, 3vw, 26px); box-shadow: var(--sh-lg); animation: float 6s ease-in-out infinite; }
        .hub-hdr { display: flex; align-items: center; justify-content: space-between; padding-bottom: 12px; margin-bottom: 12px; border-bottom: 1px solid var(--ink-05); }
        .hub-hdr-t { font-size: 12px; font-weight: 700; color: var(--ink-40); }
        .hub-live { display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; color: var(--green); }
        .hub-live::before { content:''; width:6px; height:6px; border-radius:50%; background:var(--green); animation:blink 1.8s infinite; }
        .act { display:flex; align-items:flex-start; gap:10px; padding:9px 10px; border-radius:10px; margin-bottom:4px; border:1px solid transparent; transition:all 0.45s cubic-bezier(.22,1,.36,1); }
        .act.on { background:var(--ink-05); border-color:var(--ink-10); }
        .act-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; margin-top:4px; transition:transform 0.3s; }
        .act.on .act-dot { transform:scale(1.4); }
        .act-lbl { font-size:13px; font-weight:700; color:var(--ink); }
        .act-sub { font-size:11px; color:var(--ink-40); margin-top:1px; }
        .hub-stats { display:flex; justify-content:space-between; padding-top:12px; margin-top:12px; border-top:1px solid var(--ink-05); }
        .hsv { font-size:20px; font-weight:800; color:var(--ink); }
        .hsl { font-size:10px; font-weight:700; color:var(--ink-40); text-transform:uppercase; letter-spacing:0.5px; margin-top:2px; }

        /* STATS BAR */
        .sbar { background:var(--ink); padding:clamp(24px,4vw,44px) var(--pad); }
        .sbar-row { max-width:var(--max); margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); }
        .scell { text-align:center; padding:10px 14px; border-right:1px solid rgba(255,255,255,0.08); }
        .scell:last-child { border-right:none; }
        .sv { font-size:clamp(28px,4vw,48px); font-weight:800; color:var(--brand); line-height:1; margin-bottom:6px; }
        .sl { font-size:13px; color:rgba(255,255,255,0.45); font-weight:500; }

        /* SECTIONS */
        .sec { padding:clamp(52px,7vw,88px) var(--pad); }
        .sec-in { max-width:var(--max); margin:0 auto; }
        .eyebrow { font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:var(--brand); display:block; margin-bottom:12px; }
        .sh2 { font-size:clamp(26px,3.5vw,44px); font-weight:800; line-height:1.12; color:var(--ink); letter-spacing:-0.5px; margin-bottom:14px; }
        .sh2 .am { color:var(--brand); }
        .sp { font-size:clamp(14px,1.3vw,17px); color:var(--ink-60); line-height:1.65; max-width:520px; font-weight:400; }

        /* FOR AGENTS */
        .for-sec { background:var(--ink-05); border-top:1px solid var(--ink-10); border-bottom:1px solid var(--ink-10); }
        .for-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-top:44px; }
        .for-card { background:var(--white); border:1.5px solid var(--ink-10); border-radius:var(--r-lg); padding:clamp(20px,2.5vw,28px); transition:all 0.25s cubic-bezier(.22,1,.36,1); }
        .for-card:hover { border-color:var(--brand); transform:translateY(-3px); box-shadow:var(--sh-lg); }
        .for-ico { font-size:26px; margin-bottom:12px; }
        .for-title { font-size:16px; font-weight:800; color:var(--ink); margin-bottom:8px; }
        .for-desc { font-size:14px; color:var(--ink-60); line-height:1.6; }
        .for-tag { display:inline-block; margin-top:12px; font-size:11px; font-weight:700; background:var(--brand-lt); color:var(--brand); border:1px solid var(--brand-mid); padding:3px 10px; border-radius:100px; }

        /* FEATURES */
        .feat-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:14px; margin-top:44px; }
        .feat-card { background:var(--white); border:1.5px solid var(--ink-10); border-radius:var(--r-lg); padding:clamp(20px,2.5vw,34px); transition:all 0.25s cubic-bezier(.22,1,.36,1); position:relative; overflow:hidden; }
        .feat-card::after { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:var(--fa,var(--brand)); opacity:0; transition:opacity 0.25s; }
        .feat-card:hover { border-color:var(--ink-20); transform:translateY(-3px); box-shadow:var(--sh-lg); }
        .feat-card:hover::after { opacity:1; }
        .feat-ico { width:42px; height:42px; border-radius:10px; background:var(--ink-05); display:flex; align-items:center; justify-content:center; font-size:19px; margin-bottom:16px; }
        .feat-title { font-size:17px; font-weight:800; color:var(--ink); margin-bottom:8px; }
        .feat-desc { font-size:14px; color:var(--ink-60); line-height:1.65; margin-bottom:16px; }
        .feat-stat { display:inline-block; font-size:12px; font-weight:700; background:var(--brand-lt); color:var(--brand); padding:3px 10px; border-radius:6px; }

        /* HOW IT WORKS */
        .how-sec { background:var(--ink-05); border-top:1px solid var(--ink-10); border-bottom:1px solid var(--ink-10); }
        .how-grid { display:grid; grid-template-columns:1fr 1fr; gap:clamp(28px,5vw,60px); align-items:start; }
        .steps { margin-top:28px; }
        .step { display:flex; gap:16px; padding:16px 0; border-bottom:1px solid var(--ink-10); }
        .step:last-child { border-bottom:none; }
        .step-n { font-size:12px; font-weight:800; color:var(--ink-20); width:22px; flex-shrink:0; padding-top:2px; letter-spacing:0.5px; }
        .step-t { font-size:15px; font-weight:700; color:var(--ink); margin-bottom:3px; }
        .step-d { font-size:14px; color:var(--ink-60); line-height:1.6; }
        .wf-card { background:var(--white); border:1px solid var(--ink-10); border-radius:var(--r-xl); padding:clamp(18px,3vw,26px); box-shadow:var(--sh); }
        .wf-hdr { font-size:11px; font-weight:700; color:var(--ink-40); letter-spacing:0.8px; text-transform:uppercase; margin-bottom:18px; }
        .wf-row { display:flex; align-items:center; justify-content:space-between; padding:11px 13px; border-radius:9px; border:1px solid var(--ink-10); margin-bottom:5px; }
        .wf-l { display:flex; align-items:center; gap:9px; font-size:14px; font-weight:600; color:var(--ink); }
        .wf-tag { font-size:11px; font-weight:700; padding:3px 9px; border-radius:6px; }
        .tg-done { background:#D1FAE5; color:#065F46; }
        .tg-ai { background:var(--brand-lt); color:#92400E; }
        .tg-you { background:#EDE9FE; color:#4C1D95; }
        .wf-arr { text-align:center; color:var(--ink-20); font-size:15px; margin:1px 0; }

        /* WAITLIST */
        .wl-card { max-width:620px; margin:0 auto; background:var(--ink); border-radius:var(--r-xl); padding:clamp(28px,5vw,60px) clamp(22px,5vw,52px); position:relative; overflow:hidden; box-shadow:var(--sh-lg); }
        .wl-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,var(--brand),#FBBF24); }
        .wl-tag { display:inline-block; font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:var(--brand); background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.2); padding:5px 12px; border-radius:100px; margin-bottom:16px; }
        .wl-title { font-size:clamp(20px,3vw,32px); font-weight:800; color:var(--white); line-height:1.2; margin-bottom:8px; letter-spacing:-0.3px; }
        .wl-sub { font-size:14px; color:rgba(255,255,255,0.45); margin-bottom:26px; line-height:1.55; }
        .wl-row { display:grid; grid-template-columns:1fr 1fr; gap:11px; margin-bottom:11px; }
        .wl-field { display:flex; flex-direction:column; gap:5px; }
        .wl-label { font-size:12px; font-weight:700; color:rgba(255,255,255,0.5); }
        .wl-input { height:44px; border-radius:9px; border:1.5px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.07); color:var(--white); font-size:14px; font-weight:500; padding:0 13px; font-family:var(--f); transition:border-color 0.2s; outline:none; }
        .wl-input::placeholder { color:rgba(255,255,255,0.2); }
        .wl-input:focus { border-color:var(--brand); background:rgba(255,255,255,0.1); }
        .wl-sel { height:44px; border-radius:9px; border:1.5px solid rgba(255,255,255,0.1); background:#1C1B1A; color:var(--white); font-size:14px; font-weight:500; padding:0 13px; font-family:var(--f); outline:none; cursor:pointer; width:100%; transition:border-color 0.2s; }
        .wl-sel:focus { border-color:var(--brand); }
        .wl-btn { width:100%; height:50px; border-radius:10px; background:var(--brand); color:var(--white); font-size:15px; font-weight:800; font-family:var(--f); border:none; cursor:pointer; margin-top:6px; transition:all 0.2s; display:flex; align-items:center; justify-content:center; gap:8px; }
        .wl-btn:hover:not(:disabled) { background: #1D4ED8; transform: translateY(-1px); }
        .wl-btn:disabled { opacity:0.6; cursor:not-allowed; }
        .wl-ok { text-align:center; padding:28px 0; }
        .wl-ok-ico { font-size:42px; margin-bottom:12px; }
        .wl-ok-t { font-size:24px; font-weight:800; color:var(--white); margin-bottom:8px; }
        .wl-ok-s { font-size:14px; color:rgba(255,255,255,0.45); line-height:1.5; }

        /* FOOTER */
        footer { background:var(--ink-05); border-top:1px solid var(--ink-10); padding:clamp(24px,3vw,40px) var(--pad); }
        .foot-in { max-width:var(--max); margin:0 auto; display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:12px; }
        .foot-l { font-size:14px; color:var(--ink-40); }
        .foot-l strong { color:var(--ink); font-weight:700; }
        .foot-links { display:flex; gap:20px; }
        .foot-links a { font-size:13px; color:var(--ink-40); text-decoration:none; font-weight:500; transition:color 0.2s; }
        .foot-links a:hover { color: var(--brand); }

        @keyframes spin { to { transform:rotate(360deg); } }
        .spin { width:17px; height:17px; border:2.5px solid transparent; border-top-color:var(--ink); border-radius:50%; animation:spin 0.7s linear infinite; }

        /* RESPONSIVE */
        @media(max-width:768px) {
          .nav-links { display:none; }
          .hamburger { display:flex; align-items:center; justify-content:center; margin-left: auto; }
          .nav { padding: 0 16px; height: 56px; }
          .nav-in { gap: 8px; }
          .nav-cta { display: none; } 
          .logo-text { font-size: 15px; }
          .logo-text span { display: none; }
          .logo-icon { width: 26px; height: 26px; }
          .mob-menu { top: 56px; }
          .hero { grid-template-columns:1fr; }
          .hero-bg { padding: 40px 16px; }
          .hero-h1 { font-size: 30px; letter-spacing: -0.5px; }
          .hero-p { font-size: 15px; margin-bottom: 24px; }
          .hero-visual { order: -1; margin-bottom: 24px; }
          .btn-dark, .btn-outline { width: 100%; justify-content: center; padding: 14px; }
          .proof { flex-direction: column; align-items: center; text-align: center; gap: 10px; }
          .ab-in { flex-direction: column; gap: 4px; padding: 8px 0; }
          .ab p { font-size: 12px; }
          .sbar-row { grid-template-columns:repeat(2,1fr); }
          .scell { border-right:none; border-bottom:1px solid rgba(255,255,255,0.08); }
          .scell:nth-child(odd) { border-right:1px solid rgba(255,255,255,0.08); }
          .scell:nth-last-child(-n+2) { border-bottom:none; }
          .for-grid { grid-template-columns:1fr; }
          .feat-grid { grid-template-columns:1fr; }
          .how-grid { grid-template-columns:1fr; }
          .wl-row { grid-template-columns:1fr; }
          .foot-in { flex-direction:column; align-items:flex-start; gap: 16px; }
        }
      `}</style>

      {/* AGENT BANNER */}
      <div className="ab">
        <div className="ab-in">
          <p>🚀 Built exclusively for real estate agents across Africa</p>
          <span>Ghana · Nigeria · Kenya</span>
        </div>
      </div>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-in">
          <a href="#" className="logo">
            <img src="/logo.png" alt="Logo" className="logo-icon" />
            <span className="logo-text">
              Estate<strong>Flow</strong>
              <span>.co</span>
            </span>
          </a>
          <ul className="nav-links">
            <li>
              <a href="#for-agents">For Agents</a>
            </li>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#how-it-works">How it works</a>
            </li>
          </ul>
          <div className="nav-r">
            <a href="#waitlist" className="nav-cta">
              Get Early Access →
            </a>
            <button
              className="hamburger"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="mob-menu" onClick={() => setMenuOpen(false)}>
          <a href="#for-agents">For Agents</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#waitlist" className="mcta">
            Get Early Access →
          </a>
        </div>
      )}

      {/* HERO */}
      <div className="hero-bg">
        <div className="hero">
          <div>
            <div className="hero-tag">
              <div className="tag-dot"></div>For Real Estate Agents
            </div>
            <h1 className="hero-h1">
              The AI that runs
              <br />
              your agency
              <br />
              <span className="am">while you close.</span>
            </h1>
            <p className="hero-p">
              EstateFlow handles your listings, leads, WhatsApp follow-ups, and
              client communication — automatically. You stay in control. The AI
              does the hard work.
            </p>
            <div className="hero-btns">
              <a href="#waitlist" className="btn-dark">
                Request Early Access →
              </a>
              <a href="#features" className="btn-outline">
                See the platform
              </a>
            </div>
            <div className="proof">
              <div className="pfaces">
                <div className="pface">KA</div>
                <div className="pface">AB</div>
                <div className="pface">NN</div>
                <div className="pface">SO</div>
              </div>
              <div className="ptext">
                <strong>140+ agents</strong> already on the waitlist
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hub">
              <div className="hub-hdr">
                <span className="hub-hdr-t">EstateFlow Hub</span>
                <span className="hub-live">Live</span>
              </div>
              {ACTIVITY.map((a, i) => (
                <div
                  key={i}
                  className={`act${activeActivity === i ? " on" : ""}`}
                >
                  <div
                    className="act-dot"
                    style={{ background: a.color }}
                  ></div>
                  <div>
                    <div className="act-lbl">{a.label}</div>
                    <div className="act-sub">{a.sub}</div>
                  </div>
                </div>
              ))}
              <div className="hub-stats">
                <div>
                  <div className="hsv">142</div>
                  <div className="hsl">Listings/wk</div>
                </div>
                <div>
                  <div className="hsv" style={{ color: "#10B981" }}>
                    38
                  </div>
                  <div className="hsl">Hot leads</div>
                </div>
                <div>
                  <div className="hsv" style={{ color: "#3B82F6" }}>
                    12
                  </div>
                  <div className="hsl">Viewings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="sbar">
        <div className="sbar-row">
          {STATS.map((s, i) => (
            <div key={i} className="scell">
              <div className="sv">{s.value}</div>
              <div className="sl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOR AGENTS */}
      <section id="for-agents" className="sec for-sec">
        <div className="sec-in">
          <div ref={vref("fh")} className={rv("fh")}>
            <span className="eyebrow">Who it's for</span>
            <h2 className="sh2">
              Built for agents. <span className="am">Only agents.</span>
            </h2>
            <p className="sp">
              EstateFlow isn't a generic CRM. It's built from the ground up for
              how African real estate agents actually work — not adapted from
              somewhere else.
            </p>
          </div>
          <div className="for-grid">
            {[
              {
                icon: "👤",
                title: "Solo Agents",
                desc: "Doing everything alone — listings, calls, follow-ups, marketing. EstateFlow gives you the leverage of a full team without the cost.",
                tag: "Most common",
              },
              {
                icon: "🏢",
                title: "Agency Brokers",
                desc: "Managing 5–15 agents and dozens of listings at once. EstateFlow gives you one clean dashboard for your entire operation.",
                tag: "High value",
              },
              {
                icon: "🔑",
                title: "Property Managers",
                desc: "Handling rentals, tenant communication, and maintenance for landlords. Automate the repetitive parts and focus on what grows your book.",
                tag: "Recurring revenue",
              },
            ].map((c, i) => (
              <div
                key={i}
                ref={vref(`fc${i}`)}
                className={`for-card reveal d${i + 1}${visible[`fc${i}`] ? " vis" : ""}`}
              >
                <div className="for-ico">{c.icon}</div>
                <div className="for-title">{c.title}</div>
                <div className="for-desc">{c.desc}</div>
                <span className="for-tag">{c.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="sec">
        <div className="sec-in">
          <div ref={vref("feath")} className={rv("feath")}>
            <span className="eyebrow">Agent Toolkit</span>
            <h2 className="sh2">
              Everything you need.
              <br />
              <span className="am">Nothing you don't.</span>
            </h2>
            <p className="sp">
              Four tools working together in one platform. No switching apps, no
              copy-pasting, no wasted time.
            </p>
          </div>
          <div className="feat-grid">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                ref={vref(`ff${i}`)}
                className={`feat-card reveal d${i + 1}${visible[`ff${i}`] ? " vis" : ""}`}
                style={{ "--fa": f.accent } as React.CSSProperties}
              >
                <div className="feat-ico">{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <p className="feat-desc">{f.desc}</p>
                <span className="feat-stat">{f.stat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="sec how-sec">
        <div className="sec-in">
          <div className="how-grid">
            <div ref={vref("howl")} className={rv("howl")}>
              <span className="eyebrow">How it works</span>
              <h2 className="sh2">
                The AI works.
                <br />
                <span className="am">You close.</span>
              </h2>
              <p className="sp">
                EstateFlow runs your entire agent workflow automatically. You
                review, approve, and show up to the deals that matter.
              </p>
              <div className="steps">
                {STEPS.map((s, i) => (
                  <div key={i} className="step">
                    <span className="step-n">{s.n}</span>
                    <div>
                      <div className="step-t">{s.t}</div>
                      <div className="step-d">{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              ref={vref("howr")}
              className={`reveal d2${visible["howr"] ? " vis" : ""}`}
            >
              <div className="wf-card">
                <div className="wf-hdr">Agent workflow — automated</div>
                {WORKFLOW.map((w, i) => (
                  <div key={i}>
                    <div className="wf-row">
                      <div className="wf-l">
                        <span>{w.icon}</span>
                        {w.label}
                      </div>
                      <span
                        className={`wf-tag ${w.tag === "done" ? "tg-done" : w.tag === "ai" ? "tg-ai" : "tg-you"}`}
                      >
                        {w.tagLabel}
                      </span>
                    </div>
                    {i < WORKFLOW.length - 1 && <div className="wf-arr">↓</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="sec">
        <div className="sec-in">
          <div
            className="wl-card"
            ref={vref("wl")}
            style={
              visible["wl"]
                ? {}
                : {
                    opacity: 0,
                    transform: "translateY(22px)",
                    transition: "all 0.6s cubic-bezier(.22,1,.36,1)",
                  }
            }
          >
            {!submitted ? (
              <>
                <div className="wl-tag">Agent-Only Early Access</div>
                <h2 className="wl-title">Ready to let AI run your workflow?</h2>
                <p className="wl-sub">
                  Join agents across Ghana, Nigeria, and Kenya getting early
                  access before public launch.
                </p>
                <div className="wl-row">
                  <div className="wl-field">
                    <label className="wl-label">Full Name</label>
                    <input
                      className="wl-input"
                      placeholder="Kwame Mensah"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="wl-field">
                    <label className="wl-label">Work Email</label>
                    <input
                      className="wl-input"
                      type="email"
                      placeholder="kwame@agency.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="wl-row">
                  <div className="wl-field">
                    <label className="wl-label">WhatsApp Number</label>
                    <input
                      className="wl-input"
                      type="tel"
                      placeholder="+233 XX XXX XXXX"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="wl-field">
                    <label className="wl-label">Your Market</label>
                    <select
                      className="wl-sel"
                      value={form.country}
                      onChange={(e) =>
                        setForm({ ...form, country: e.target.value })
                      }
                    >
                      <option>Ghana</option>
                      <option>Nigeria</option>
                      <option>Kenya</option>
                    </select>
                  </div>
                </div>
                <button
                  className="wl-btn"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="spin"></div>
                  ) : (
                    <>Secure My Early Access →</>
                  )}
                </button>
              </>
            ) : (
              <div className="wl-ok">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="wl-ok-ico"
                  style={{
                    width: "48px",
                    height: "48px",
                    marginBottom: "16px",
                    objectFit: "contain",
                  }}
                />
                <div className="wl-ok-t">You're on the list.</div>
                <div className="wl-ok-s">
                  We'll reach out on WhatsApp to set up your early access.
                  Welcome to EstateFlow.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="foot-in">
          <div className="foot-l">
            © {new Date().getFullYear()} <strong>EstateFlow</strong> — Built for
            African real estate agents.
          </div>
          <div className="foot-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="mailto:useestateflow@gmail.com">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
