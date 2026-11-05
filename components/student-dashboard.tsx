"use client";

import { useMemo, useState } from "react";
import {
  LayoutDashboard, BookOpen, CalendarDays, NotebookPen, FolderOpen, Settings,
  Search, Bell, ChevronDown, ArrowUpRight, Play, Clock3, Flame, Target,
  Plus, Check, Menu, X, GraduationCap, CircleHelp, MoreHorizontal
} from "lucide-react";

type Course = { title: string; category: string; progress: number; color: string; icon: string; lessons: string; next: string };

const courses: Course[] = [
  { title: "Python Programming", category: "Programming", progress: 72, color: "violet", icon: "Py", lessons: "18 of 25 lessons", next: "Functions & modules" },
  { title: "Web Development", category: "Development", progress: 48, color: "blue", icon: "</>", lessons: "12 of 25 lessons", next: "Responsive layouts" },
  { title: "Database Management", category: "Computer Science", progress: 86, color: "orange", icon: "DB", lessons: "21 of 24 lessons", next: "SQL joins" }
];

const initialTasks = [
  { title: "Complete Python practice set", time: "Today · 5:00 PM", done: false },
  { title: "Revise DBMS normalization", time: "Today · 7:00 PM", done: true },
  { title: "Read HTML & CSS notes", time: "Tomorrow · 9:00 AM", done: false }
];

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "My Courses", icon: BookOpen },
  { label: "Study Planner", icon: CalendarDays },
  { label: "My Notes", icon: NotebookPen },
  { label: "Resources", icon: FolderOpen }
];

export default function StudentDashboard() {
  const [active, setActive] = useState("Overview");
  const [query, setQuery] = useState("");
  const [tasks, setTasks] = useState(initialTasks);
  const [showAdd, setShowAdd] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredCourses = useMemo(
    () => courses.filter(c => `${c.title} ${c.category}`.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const toggleTask = (index: number) => setTasks(prev => prev.map((task, i) => i === index ? { ...task, done: !task.done } : task));
  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks(prev => [...prev, { title: newTask.trim(), time: "Added just now", done: false }]);
    setNewTask("");
    setShowAdd(false);
  };

  const sidebar = (
    <aside className={`${mobileOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-slate-100 bg-white px-5 py-6 transition-transform duration-300 lg:static lg:translate-x-0`}>
      <div className="mb-10 flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand text-white"><GraduationCap size={22}/></div>
          <div><div className="text-xl font-extrabold tracking-tight text-ink">EduPath<span className="text-brand">.</span></div><div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Student hub</div></div>
        </div>
        <button className="lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={20}/></button>
      </div>
      <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Workspace</div>
      <nav className="space-y-1">
        {navItems.map(item => {
          const Icon = item.icon;
          return <button key={item.label} onClick={() => { setActive(item.label); setMobileOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${active === item.label ? "bg-lavender text-brand" : "text-slate-500 hover:bg-slate-50 hover:text-ink"}`}><Icon size={18}/>{item.label}{item.label === "My Courses" && <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-[10px] text-slate-400">3</span>}</button>;
        })}
      </nav>
      <div className="mb-3 mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Personal</div>
      <button onClick={() => setActive("Settings")} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${active === "Settings" ? "bg-lavender text-brand" : "text-slate-500 hover:bg-slate-50"}`}><Settings size={18}/>Settings</button>
      <div className="mt-auto rounded-2xl bg-[#F4F3FF] p-4">
        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-brand"><CircleHelp size={18}/></div>
        <p className="text-sm font-bold text-ink">Need a hand?</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">Find tips to make your study sessions more productive.</p>
        <button onClick={() => setNotice("Study tips: break big topics into 25-minute sessions and review your notes daily.")} className="mt-3 text-xs font-bold text-brand">Explore study tips <ArrowUpRight className="ml-1 inline" size={13}/></button>
      </div>
      <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">SU</div>
        <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-ink">Student User</p><p className="text-xs text-slate-400">Free account</p></div>
        <MoreHorizontal size={18} className="text-slate-400"/>
      </div>
    </aside>
  );

  return (
    <main className="min-h-screen lg:flex">
      {sidebar}
      {mobileOpen && <button aria-label="Close navigation overlay" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden"/>}
      <section className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-100 bg-white/90 px-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={20}/></button>
            <div><p className="text-xs font-medium text-slate-400">Thursday, November 5, 2026</p><h1 className="text-lg font-extrabold text-ink">{active === "Overview" ? "Good evening, Student!" : active}</h1></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex"><Search size={16} className="text-slate-400"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search courses..." className="w-36 bg-transparent text-xs outline-none placeholder:text-slate-400"/></div>
            <button onClick={() => setNotice("You're all caught up. No new notifications.")} className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50" aria-label="Notifications"><Bell size={17}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white"/></button>
            <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-[#E8E7FF] text-xs font-bold text-brand sm:flex">SU</div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-8 sm:py-9">
          {notice && <div className="mb-5 flex items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-800"><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss"><X size={16}/></button></div>}
          {active === "Overview" ? (
            <>
              <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div><p className="mb-2 text-sm font-medium text-slate-500">Here&apos;s your learning snapshot.</p><h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Keep up the great work <span>✦</span></h2></div>
                <button onClick={() => setActive("Study Planner")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"><Plus size={17}/> Plan your study</button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Stat icon={<BookOpen size={18}/>} label="Enrolled courses" value="03" detail="+1 this month" tone="purple"/>
                <Stat icon={<Clock3 size={18}/>} label="Study time" value="24.5h" detail="This week" tone="blue"/>
                <Stat icon={<Flame size={18}/>} label="Day streak" value="07 days" detail="You are on fire!" tone="orange"/>
                <Stat icon={<Target size={18}/>} label="Tasks completed" value={`${tasks.filter(t => t.done).length}/${tasks.length}`} detail="Keep your momentum" tone="green"/>
              </div>

              <div className="mt-8 grid gap-6 xl:grid-cols-[1.65fr_1fr]">
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft sm:p-6">
                  <div className="mb-5 flex items-center justify-between"><div><h3 className="font-extrabold text-ink">Continue learning</h3><p className="mt-1 text-xs text-slate-400">Pick up where you left off</p></div><button onClick={() => setActive("My Courses")} className="text-xs font-bold text-brand">View all <ArrowUpRight className="ml-1 inline" size={13}/></button></div>
                  <div className="space-y-4">
                    {filteredCourses.map(course => <CourseCard key={course.title} course={course} onOpen={() => setNotice(`Opening ${course.title}: next lesson is ${course.next}.`)}/>)}
                    {filteredCourses.length === 0 && <p className="rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">No courses match “{query}”. Try another search.</p>}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft sm:p-6">
                  <div className="mb-5 flex items-center justify-between"><div><h3 className="font-extrabold text-ink">Today&apos;s tasks</h3><p className="mt-1 text-xs text-slate-400">A little progress every day</p></div><button onClick={() => setShowAdd(!showAdd)} className="rounded-lg bg-lavender p-2 text-brand hover:bg-indigo-100" aria-label="Add task"><Plus size={17}/></button></div>
                  {showAdd && <div className="mb-4 flex gap-2"><input value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask()} placeholder="Add a study task..." className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-brand"/><button onClick={addTask} className="rounded-lg bg-brand px-3 text-xs font-bold text-white">Add</button></div>}
                  <div className="space-y-4">
                    {tasks.map((task, i) => <button key={`${task.title}-${i}`} onClick={() => toggleTask(i)} className="flex w-full items-start gap-3 text-left"><span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${task.done ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 bg-white text-transparent"}`}><Check size={13}/></span><span className="min-w-0 flex-1"><span className={`block text-sm font-semibold ${task.done ? "text-slate-400 line-through" : "text-slate-700"}`}>{task.title}</span><span className="mt-1 block text-[11px] text-slate-400">{task.time}</span></span></button>)}
                  </div>
                  <div className="mt-6 rounded-xl bg-[#F7F7FF] p-4"><div className="flex items-center justify-between text-xs"><span className="font-bold text-slate-600">Daily goal</span><span className="font-extrabold text-brand">2 / 3 hours</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-indigo-100"><div className="h-full w-2/3 rounded-full bg-brand"/></div><p className="mt-2 text-[10px] text-slate-400">You&apos;re doing well. One more hour to go!</p></div>
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                <div className="overflow-hidden rounded-2xl bg-[#22234D] p-6 text-white sm:p-7">
                  <div className="flex items-center justify-between"><span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-100">Your weekly insight</span><span className="text-2xl">✦</span></div>
                  <h3 className="mt-5 max-w-sm text-xl font-extrabold leading-snug">Small steps every day lead to big results.</h3><p className="mt-2 max-w-sm text-xs leading-5 text-indigo-100/70">You studied 24.5 hours this week. Keep your rhythm and make time for revision.</p>
                  <div className="mt-6 flex items-end gap-2">{[35,55,42,78,62,90,48].map((h,i)=><div key={i} className="flex-1"><div style={{height:`${h}px`}} className={`rounded-t-md ${i===5?"bg-white":"bg-indigo-300/40"}`}/><p className="mt-2 text-center text-[9px] text-indigo-100/60">{["M","T","W","T","F","S","S"][i]}</p></div>)}</div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft"><div className="flex items-center justify-between"><div><h3 className="font-extrabold text-ink">Upcoming session</h3><p className="mt-1 text-xs text-slate-400">Your next study slot</p></div><CalendarDays size={19} className="text-brand"/></div><div className="mt-5 flex gap-4 rounded-xl bg-slate-50 p-4"><div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-white text-brand shadow-sm"><span className="text-[10px] font-bold uppercase">Nov</span><span className="text-xl font-extrabold">06</span></div><div><p className="text-sm font-bold text-ink">Web Development revision</p><p className="mt-1 text-xs text-slate-500">10:00 AM – 11:00 AM</p><p className="mt-2 text-[10px] font-semibold text-emerald-600">Tomorrow · Scheduled</p></div></div><button onClick={() => setActive("Study Planner")} className="mt-4 w-full rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 transition hover:border-brand hover:text-brand">Open study planner <ArrowUpRight className="ml-1 inline" size={13}/></button></div>
              </div>
            </>
          ) : (
            <SectionPage active={active} courses={courses} tasks={tasks.length} onBack={() => setActive("Overview")} />
          )}
          <footer className="mt-10 flex flex-col justify-between gap-2 border-t border-slate-200 py-5 text-[11px] text-slate-400 sm:flex-row"><span>© 2026 EduPath. Made for curious minds.</span><span>Learn at your pace · Grow every day</span></footer>
        </div>
      </section>
    </main>
  );
}

function Stat({icon,label,value,detail,tone}:{icon:React.ReactNode;label:string;value:string;detail:string;tone:string}) {
  const tones:Record<string,string> = {purple:"bg-violet-50 text-violet-600",blue:"bg-sky-50 text-sky-600",orange:"bg-orange-50 text-orange-600",green:"bg-emerald-50 text-emerald-600"};
  return <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-slate-500">{label}</span><span className={`flex h-9 w-9 items-center justify-center rounded-xl ${tones[tone]}`}>{icon}</span></div><p className="mt-4 text-2xl font-extrabold tracking-tight text-ink">{value}</p><p className="mt-1 text-[10px] font-medium text-slate-400">{detail}</p></div>;
}

function CourseCard({course,onOpen}:{course:Course;onOpen:()=>void}) {
  const colors:Record<string,string> = {violet:"bg-violet-100 text-violet-700",blue:"bg-sky-100 text-sky-700",orange:"bg-orange-100 text-orange-700"};
  const bars:Record<string,string> = {violet:"bg-violet-500",blue:"bg-sky-500",orange:"bg-orange-500"};
  return <div className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center"><div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold ${colors[course.color]}`}>{course.icon}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><div><p className="text-sm font-bold text-ink">{course.title}</p><p className="mt-1 text-[10px] text-slate-400">{course.category} · {course.lessons}</p></div><span className="text-xs font-extrabold text-slate-600">{course.progress}%</span></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100"><div style={{width:`${course.progress}%`}} className={`h-full rounded-full ${bars[course.color]}`}/></div><p className="mt-2 text-[10px] text-slate-400">Next: {course.next}</p></div><button onClick={onOpen} className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-brand"><Play size={12} fill="currentColor"/> Continue</button></div>;
}

function SectionPage({active,courses,tasks,onBack}:{active:string;courses:Course[];tasks:number;onBack:()=>void}) {
  const [selected,setSelected] = useState("All");
  const [search,setSearch] = useState("");
  const [note,setNote] = useState("");
  const [saved,setSaved] = useState(false);
  const descriptions:Record<string,string> = {
    "My Courses":"All your learning paths in one place.",
    "Study Planner":"Organise your time and stay consistent.",
    "My Notes":"Capture important ideas while you learn.",
    "Resources":"Useful study material, links and references.",
    "Settings":"Manage your student workspace."
  };
  return <div><button onClick={onBack} className="mb-5 text-xs font-bold text-brand">← Back to overview</button><div className="mb-7"><p className="text-sm text-slate-500">Your workspace</p><h2 className="mt-1 text-3xl font-extrabold tracking-tight text-ink">{active}</h2><p className="mt-2 text-sm text-slate-400">{descriptions[active] || "Personalise your learning experience."}</p></div>
    {active === "My Courses" && <div className="space-y-4">{courses.filter(c=>c.title.toLowerCase().includes(search.toLowerCase())).map(c=><CourseCard key={c.title} course={c} onOpen={()=>setSaved(true)}/>)}
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Filter courses..." className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand"/>{saved && <p className="text-sm text-emerald-600">Course selected. Your next lesson is ready.</p>}</div>}
    {active === "Study Planner" && <div className="grid gap-4 md:grid-cols-2"><div className="rounded-2xl bg-white p-6 shadow-soft"><h3 className="font-bold">Friday, 6 November</h3><div className="mt-5 space-y-3">{["09:00 AM · Morning revision","10:00 AM · Web Development","02:00 PM · Python practice","05:00 PM · Quick recap"].map(x=><div key={x} className="rounded-xl bg-slate-50 p-4 text-sm font-medium text-slate-600">{x}</div>)}</div></div><div className="rounded-2xl bg-white p-6 shadow-soft"><h3 className="font-bold">Study planner tips</h3><ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-slate-500"><li>Set one clear goal for each session.</li><li>Take a short break after 25–30 minutes.</li><li>Review what you learned before ending the day.</li><li>Keep your plan realistic and flexible.</li></ul></div></div>}
    {active === "My Notes" && <div className="max-w-2xl rounded-2xl bg-white p-6 shadow-soft"><label className="text-sm font-bold">Quick study note</label><textarea value={note} onChange={e=>{setNote(e.target.value);setSaved(false)}} placeholder="Write your notes here..." className="mt-3 min-h-48 w-full resize-y rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-brand"/><button onClick={()=>setSaved(true)} className="mt-3 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white">Save note</button>{saved && <p className="mt-3 text-xs text-emerald-600">Note saved for this session. Connect a database to store it permanently.</p>}</div>}
    {active === "Resources" && <div className="grid gap-4 md:grid-cols-2">{[{t:"Programming fundamentals",d:"Core concepts and practice topics",tag:"Learning guide"},{t:"Web development roadmap",d:"A structured path from HTML to modern web apps",tag:"Roadmap"},{t:"Exam preparation checklist",d:"A simple checklist for revision planning",tag:"Checklist"},{t:"Study techniques",d:"Practical ways to improve focus and recall",tag:"Article"}].map(r=><div key={r.t} className="rounded-2xl bg-white p-5 shadow-soft"><span className="rounded-full bg-lavender px-3 py-1 text-[10px] font-bold text-brand">{r.tag}</span><h3 className="mt-4 font-bold">{r.t}</h3><p className="mt-2 text-xs text-slate-400">{r.d}</p></div>)}</div>}
    {active === "Settings" && <div className="max-w-xl rounded-2xl bg-white p-6 shadow-soft"><h3 className="font-bold">Student profile</h3><div className="mt-5 space-y-4"><div><p className="text-xs text-slate-400">Display name</p><p className="mt-1 text-sm font-semibold">Student User</p></div><div><p className="text-xs text-slate-400">Account type</p><p className="mt-1 text-sm font-semibold">Free demo account</p></div><div><p className="text-xs text-slate-400">Open tasks</p><p className="mt-1 text-sm font-semibold">{tasks} tasks</p></div></div><p className="mt-6 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">This starter project uses sample data. Add authentication and a database before using real student accounts.</p></div>}
  </div>;
}
