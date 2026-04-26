// web-shell.jsx — D.O.S.E. web app shell (sidebar + topbar) used by feed/profile/etc.

function NavItem({ icon, label, active, badge, sub }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '9px 12px', borderRadius: 10,
      background: active ? 'var(--dose-peach-soft)' : 'transparent',
      color: active ? 'var(--ink)' : 'var(--ink-2)',
      fontSize: 14, fontWeight: active ? 600 : 500,
      cursor: 'pointer', position: 'relative',
    }}>
      <Ic name={icon} size={18} stroke={active ? 2 : 1.7} />
      <span>{label}</span>
      {badge && (
        <span style={{
          marginLeft: 'auto', minWidth: 18, height: 18, padding: '0 6px',
          borderRadius: 999, background: 'var(--dose-coral)', color: '#fff',
          fontSize: 10.5, fontWeight: 700, display: 'inline-flex',
          alignItems: 'center', justifyContent: 'center',
        }}>{badge}</span>
      )}
      {sub && <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--ink-4)' }}>{sub}</span>}
    </div>
  );
}

function Sidebar({ active = 'home', dark = false }) {
  return (
    <aside style={{
      width: 232, borderRight: '1px solid var(--line)',
      background: 'var(--paper)', padding: '20px 14px',
      display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0,
    }}>
      <div style={{ padding: '4px 8px 18px' }}>
        <DoseLogo size={24} />
      </div>
      <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em',
        color: 'var(--ink-4)', textTransform: 'uppercase', padding: '6px 12px 4px' }}>
        Discover
      </div>
      <NavItem icon="home"    label="Feed"      active={active === 'home'} />
      <NavItem icon="trend"   label="Trending"  active={active === 'trending'} />
      <NavItem icon="search"  label="Explore"   active={active === 'explore'} />
      <NavItem icon="globe2"  label="Categories"active={active === 'cats'} />

      <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em',
        color: 'var(--ink-4)', textTransform: 'uppercase', padding: '14px 12px 4px' }}>
        You
      </div>
      <NavItem icon="msg"     label="Messages"  active={active === 'msg'} badge="3" />
      <NavItem icon="bell"    label="Notifications" active={active === 'bell'} badge="12" />
      <NavItem icon="bookmark"label="Saved"     active={active === 'saved'} />
      <NavItem icon="ai"      label="DOSE AI"   active={active === 'ai'} sub="new" />

      <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em',
        color: 'var(--ink-4)', textTransform: 'uppercase', padding: '14px 12px 4px' }}>
        Community
      </div>
      <NavItem icon="groups"  label="Groups"    active={active === 'groups'} />
      <NavItem icon="events"  label="Events"    active={active === 'events'} />
      <NavItem icon="donate"  label="Donations" active={active === 'donate'} />
      <NavItem icon="trophy"  label="Creator"   active={active === 'creator'} />

      <div style={{ marginTop: 'auto', paddingTop: 14 }}>
        <button style={{
          width: '100%', height: 40, borderRadius: 10, border: 'none',
          background: 'var(--ink)', color: 'var(--paper)',
          fontSize: 14, fontWeight: 600, display: 'inline-flex',
          alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <Ic name="plus" size={16} stroke={2.2} /> Share good news
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 8px 4px', marginTop: 8, borderTop: '1px solid var(--line)',
        }}>
          <Avatar name="You Now" size={32} hue={22} frame="rosegold" />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink)' }}>You</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>@younow · Premium</div>
          </div>
          <Ic name="more" size={16} color="var(--ink-3)" />
        </div>
      </div>
    </aside>
  );
}

function TopBar({ title = "Today's dose", subtitle, country = "Global", lang = "EN" }) {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '18px 28px', borderBottom: '1px solid var(--line)',
      background: 'var(--paper)', position: 'sticky', top: 0, zIndex: 10,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 className="dose-display" style={{ margin: 0, fontSize: 22, color: 'var(--ink)' }}>{title}</h1>
        {subtitle && <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 2 }}>{subtitle}</div>}
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, height: 36, padding: '0 12px',
        background: 'var(--white)', border: '1px solid var(--line)', borderRadius: 10,
        width: 280, color: 'var(--ink-3)', fontSize: 13,
      }}>
        <Ic name="search" size={15} />
        <span>Search good news…</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10.5,
          padding: '2px 5px', background: 'var(--paper-2)', borderRadius: 4 }}>⌘K</span>
      </div>
      <button style={{
        height: 36, padding: '0 12px', borderRadius: 10,
        background: 'var(--white)', border: '1px solid var(--line)',
        display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--ink-2)', fontSize: 13,
      }}>
        <Ic name="globe" size={14} /> {country}
      </button>
      <button style={{
        height: 36, padding: '0 12px', borderRadius: 10,
        background: 'var(--white)', border: '1px solid var(--line)', color: 'var(--ink-2)', fontSize: 13,
      }}>{lang}</button>
    </header>
  );
}

// Filter chip strip
function FilterStrip({ active, onChange }) {
  const items = ['All', 'Environment', 'Health', 'Tech', 'Science', 'Education', 'Human Rights', 'Animals'];
  return (
    <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '2px 0' }}>
      {items.map((it) => (
        <button key={it} onClick={() => onChange && onChange(it)}
          className="dose-pill" style={{
          height: 30, padding: '0 14px', fontSize: 12.5, fontWeight: 500,
          background: it === active ? 'var(--ink)' : 'var(--white)',
          color: it === active ? 'var(--paper)' : 'var(--ink-2)',
          border: it === active ? 'none' : '1px solid var(--line)',
        }}>{it}</button>
      ))}
    </div>
  );
}

// Right rail: stories, suggestions, donate cta
function StoriesRow() {
  const stories = ['You', ...PEOPLE.slice(0, 6).map(p => p.name.split(' ')[0])];
  return (
    <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '4px 0' }}>
      {stories.map((s, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 60 }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%',
            padding: 2,
            background: i === 0 ? 'transparent' : 'conic-gradient(from 0deg, var(--dose-coral), var(--dose-gold), var(--dose-coral))',
            border: i === 0 ? '2px dashed var(--ink-4)' : 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%',
              background: i === 0 ? 'var(--paper-2)' : `oklch(0.72 0.14 ${(i * 50) % 360})`,
              border: i === 0 ? 'none' : '2px solid var(--paper)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 600, fontSize: 16,
            }}>{i === 0 ? <Ic name="plus" size={18} color="var(--ink-3)" /> : s[0]}</div>
          </div>
          <div style={{ fontSize: 11, color: 'var(--ink-2)', maxWidth: 60, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s}</div>
        </div>
      ))}
    </div>
  );
}

function RightRail() {
  return (
    <aside style={{
      width: 280, padding: '20px 22px 20px 4px',
      borderLeft: '1px solid var(--line)', background: 'var(--paper)',
      display: 'flex', flexDirection: 'column', gap: 18, flexShrink: 0,
    }}>
      {/* Daily dose card */}
      <div style={{
        background: 'linear-gradient(135deg, #ffe2c0, #ffb59e)',
        borderRadius: 'var(--r-lg)', padding: 16, color: '#3a2308',
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7 }}>
          Daily dose · day 47
        </div>
        <h3 className="dose-display" style={{ margin: '6px 0 8px', fontSize: 19, lineHeight: 1.2 }}>
          You've read 6 verified stories today
        </h3>
        <div style={{ height: 6, background: 'rgba(58, 35, 8, 0.15)', borderRadius: 99, overflow: 'hidden', marginBottom: 8 }}>
          <div style={{ width: '60%', height: '100%', background: '#3a2308', borderRadius: 99 }} />
        </div>
        <div style={{ fontSize: 12, opacity: 0.78 }}>4 more for today's streak</div>
      </div>

      {/* Trending mini */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <h4 className="dose-display" style={{ margin: 0, fontSize: 15, color: 'var(--ink)' }}>Trending now</h4>
          <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>see all</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { tag: '#renewables',     n: '12.4k posts', delta: '+8%' },
            { tag: '#mentalhealth',   n: '9.1k posts',  delta: '+22%' },
            { tag: '#urbanforests',   n: '6.8k posts',  delta: '+4%' },
            { tag: '#publictransit',  n: '4.2k posts',  delta: '+14%' },
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-4)', width: 16 }}>0{i+1}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{t.tag}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{t.n}</div>
              </div>
              <span style={{ fontSize: 11, color: 'var(--verified)', fontWeight: 600 }}>{t.delta}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested follows */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <h4 className="dose-display" style={{ margin: 0, fontSize: 15, color: 'var(--ink)' }}>Voices to follow</h4>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {PEOPLE.slice(2, 5).map((p) => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar name={p.name} size={36} hue={p.hue} frame={p.frame} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12.5, fontWeight: 600, color: 'var(--ink)' }}>
                  {p.name} {p.verified && <VerifiedBadge size={11} />}
                </div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>@{p.handle}</div>
              </div>
              <button style={{
                height: 28, padding: '0 12px', borderRadius: 99,
                background: 'var(--ink)', color: 'var(--paper)',
                border: 'none', fontSize: 12, fontWeight: 600,
              }}>Follow</button>
            </div>
          ))}
        </div>
      </div>

      {/* Donate CTA */}
      <div style={{
        background: 'var(--white)', border: '1px solid var(--line)',
        borderRadius: 'var(--r-lg)', padding: 14,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <Ic name="donate" size={16} color="var(--dose-coral-deep)" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.06em', color: 'var(--ink-3)', textTransform: 'uppercase' }}>
            community fund
          </span>
        </div>
        <div className="dose-display" style={{ fontSize: 16, color: 'var(--ink)', lineHeight: 1.2, marginBottom: 6 }}>
          €18,420 raised this week for Ocean Cleanup
        </div>
        <button style={{
          width: '100%', height: 32, borderRadius: 8, marginTop: 4,
          background: 'var(--dose-coral)', color: '#fff',
          border: 'none', fontSize: 12.5, fontWeight: 600,
        }}>Add €5</button>
      </div>
    </aside>
  );
}

Object.assign(window, { Sidebar, TopBar, FilterStrip, StoriesRow, RightRail, NavItem });
