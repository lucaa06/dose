// screens-misc.jsx — Trending, Creator dashboard, Donations, Subscription, Admin, AI chat

// ─── TRENDING ─────────────────────────────────────────────
function Trending() {
  const [tab, setTab] = React.useState('topics');
  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--paper)' }}>
      <Sidebar active="trending" />
      <main style={{ flex: 1, minWidth: 0, overflow: 'auto' }}>
        <TopBar title="Trending" subtitle="What the world is reading right now" />
        <div style={{ padding: '20px 28px 60px', maxWidth: 920 }}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 18 }}>
            {['topics', 'posts', 'leaderboard'].map(t => (
              <button key={t} onClick={() => setTab(t)} className="dose-pill" style={{
                height: 32, padding: '0 14px',
                background: tab === t ? 'var(--ink)' : 'transparent',
                color: tab === t ? 'var(--paper)' : 'var(--ink-2)',
                border: tab === t ? 'none' : '1px solid var(--line)',
                textTransform: 'capitalize', fontSize: 12.5, fontWeight: 600,
              }}>{t}</button>
            ))}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
              {['Today', 'Week', 'Month'].map((p, i) => (
                <button key={p} className="dose-pill" style={{
                  background: i === 1 ? 'var(--paper-2)' : 'transparent',
                  color: i === 1 ? 'var(--ink)' : 'var(--ink-3)',
                  border: 'none', fontSize: 12, fontWeight: 600,
                }}>{p}</button>
              ))}
            </div>
          </div>

          {tab === 'topics' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { tag: '#renewables',     n: '12,442 posts', delta: '+8%',  spark: [3,4,5,4,6,7,9,8,10] },
                { tag: '#mentalhealth',   n: '9,108 posts',  delta: '+22%', spark: [2,3,3,5,6,8,9,11,12] },
                { tag: '#urbanforests',   n: '6,820 posts',  delta: '+4%',  spark: [4,5,5,4,6,5,7,7,8] },
                { tag: '#publictransit',  n: '4,210 posts',  delta: '+14%', spark: [3,3,4,5,6,8,7,9,10] },
                { tag: '#globalhealth',   n: '3,901 posts',  delta: '+31%', spark: [2,2,3,4,5,7,9,11,13] },
                { tag: '#repairlaws',     n: '2,640 posts',  delta: '+12%', spark: [4,4,5,6,5,6,7,8,9] },
              ].map((t, i) => (
                <div key={i} className="dose-card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-4)', width: 18 }}>0{i+1}</span>
                  <div style={{ flex: 1 }}>
                    <div className="dose-display" style={{ fontSize: 16, color: 'var(--ink)' }}>{t.tag}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{t.n}</div>
                  </div>
                  <svg width="60" height="28" viewBox="0 0 60 28">
                    <polyline fill="none" stroke="var(--dose-coral)" strokeWidth="1.5"
                      points={t.spark.map((v, j) => `${j * 7},${28 - v * 1.8}`).join(' ')} />
                  </svg>
                  <span style={{ fontSize: 12, color: 'var(--verified)', fontWeight: 600 }}>{t.delta}</span>
                </div>
              ))}
            </div>
          )}

          {tab === 'leaderboard' && (
            <div className="dose-card" style={{ padding: 0, overflow: 'hidden' }}>
              {PEOPLE.slice(0, 8).map((p, i) => (
                <div key={p.id} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
                  borderTop: i ? '1px solid var(--line)' : 'none',
                }}>
                  <div style={{ width: 28, fontSize: 18, fontFamily: 'var(--font-display)', textAlign: 'center' }}>
                    {['🥇','🥈','🥉'][i] || <span style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{i+1}</span>}
                  </div>
                  <Avatar name={p.name} size={40} hue={p.hue} frame={p.frame} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>
                      {p.name} {p.verified && <VerifiedBadge size={12} />} {p.tier && <TierBadge tier={p.tier} />}
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>@{p.handle}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="dose-display" style={{ fontSize: 16, color: 'var(--ink)' }}>{(34 - i * 3).toFixed(1)}k</div>
                    <div style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>engagement</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'posts' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
              {POSTS.map(p => <PostCard key={p.id} post={p} layout="grid" />)}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ─── CREATOR DASHBOARD ────────────────────────────────────
function CreatorDashboard() {
  const stats = [
    { l: 'Posts',         v: '163', d: '+4 this week',   c: 'var(--ink)' },
    { l: 'Total likes',   v: '48.2k', d: '+12%',         c: 'var(--dose-coral)' },
    { l: 'Comments',      v: '3,210', d: '+8%',          c: 'var(--ink)' },
    { l: 'Shares',        v: '6,140', d: '+22%',         c: 'var(--ink)' },
    { l: 'Avg. engagement',v: '6.4%',  d: '+0.8pp',      c: 'var(--verified)' },
    { l: 'Tips received', v: '€2,402', d: '+€340 wk',    c: 'var(--dose-coral-deep)' },
  ];
  const chartData = [12, 18, 14, 22, 28, 24, 31, 26, 34, 30, 38, 42, 36, 44];
  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--paper)' }}>
      <Sidebar active="creator" />
      <main style={{ flex: 1, minWidth: 0, overflow: 'auto' }}>
        <TopBar title="Creator dashboard" subtitle="Pro · Maya Okafor" />
        <div style={{ padding: '20px 28px 60px', display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
            {stats.map((s, i) => (
              <div key={i} className="dose-card" style={{ padding: 14 }}>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.l}</div>
                <div className="dose-display" style={{ fontSize: 22, color: s.c, marginTop: 4 }}>{s.v}</div>
                <div style={{ fontSize: 11, color: 'var(--verified)', marginTop: 2 }}>{s.d}</div>
              </div>
            ))}
          </div>

          <div className="dose-card" style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 className="dose-display" style={{ margin: 0, fontSize: 17, color: 'var(--ink)' }}>Engagement · last 14 days</h3>
              <div style={{ display: 'flex', gap: 4 }}>
                {['7d','14d','30d'].map((p, i) => (
                  <button key={p} className="dose-pill" style={{
                    background: i === 1 ? 'var(--paper-2)' : 'transparent',
                    color: i === 1 ? 'var(--ink)' : 'var(--ink-3)',
                    border: 'none', fontSize: 11, fontWeight: 600,
                  }}>{p}</button>
                ))}
              </div>
            </div>
            <svg width="100%" height="160" viewBox="0 0 600 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cd-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--dose-coral)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--dose-coral)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[40, 80, 120].map(y => (
                <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="var(--line)" strokeDasharray="2,4" />
              ))}
              <polygon
                fill="url(#cd-grad)"
                points={chartData.map((v, i) => `${i * (600 / 13)},${150 - v * 3}`).join(' ') + ` 600,160 0,160`}
              />
              <polyline
                fill="none" stroke="var(--dose-coral)" strokeWidth="2"
                points={chartData.map((v, i) => `${i * (600 / 13)},${150 - v * 3}`).join(' ')}
              />
              {chartData.map((v, i) => (
                <circle key={i} cx={i * (600 / 13)} cy={150 - v * 3} r="2.5" fill="var(--dose-coral)" />
              ))}
            </svg>
          </div>

          <div className="dose-card" style={{ padding: 18 }}>
            <h3 className="dose-display" style={{ margin: '0 0 12px', fontSize: 17, color: 'var(--ink)' }}>Top posts this week</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {POSTS.slice(0, 4).map((p, i) => (
                <div key={p.id} style={{
                  display: 'grid', gridTemplateColumns: '24px 80px 1fr 70px 70px 70px 90px', gap: 14,
                  alignItems: 'center', padding: '10px 0',
                  borderTop: i ? '1px solid var(--line)' : 'none',
                  fontSize: 12.5,
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-4)' }}>0{i+1}</span>
                  <div className={`dose-photo dose-photo-${p.photo}`} data-caption="" style={{ height: 50, borderRadius: 6 }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{p.category} · {p.time}</div>
                  </div>
                  <div style={{ color: 'var(--ink-2)' }}><Ic name="heart" size={12} stroke={1.6} style={{ display: 'inline', verticalAlign: '-2px' }} /> {p.likes.toLocaleString()}</div>
                  <div style={{ color: 'var(--ink-2)' }}><Ic name="comment" size={12} stroke={1.6} style={{ display: 'inline', verticalAlign: '-2px' }} /> {p.comments}</div>
                  <div style={{ color: 'var(--ink-2)' }}><Ic name="share" size={12} stroke={1.6} style={{ display: 'inline', verticalAlign: '-2px' }} /> {p.shares}</div>
                  <div style={{ color: 'var(--verified)', fontWeight: 600 }}>{(p.likes / 1000).toFixed(1)}% eng</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── DONATIONS ────────────────────────────────────────────
function Donations() {
  const charities = [
    { n: 'WWF',                  c: 'Environment', d: 'Wildlife & habitat', raised: '€41.2k', goal: '€60k', pct: 68, tone: 'green' },
    { n: 'The Ocean Cleanup',    c: 'Environment', d: 'Plastic from rivers', raised: '€18.4k', goal: '€25k', pct: 73, tone: 'cool' },
    { n: "Médecins Sans Frontières", c: 'Health',  d: 'Field clinics',       raised: '€32.8k', goal: '€50k', pct: 65, tone: 'rose' },
    { n: 'Khan Academy',         c: 'Education',   d: 'Free courses',        raised: '€9.8k',  goal: '€20k', pct: 49, tone: 'gold' },
    { n: 'Greenpeace',           c: 'Environment', d: 'Climate action',      raised: '€22.1k', goal: '€40k', pct: 55, tone: 'green' },
    { n: 'Amnesty International',c: 'Human Rights',d: 'Legal & advocacy',    raised: '€14.6k', goal: '€30k', pct: 48, tone: 'rose' },
  ];
  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--paper)' }}>
      <Sidebar active="donate" />
      <main style={{ flex: 1, minWidth: 0, overflow: 'auto' }}>
        <TopBar title="Donate" subtitle="Every share funds a cause · matched 1:1 by D.O.S.E. this month" />
        <div style={{ padding: '20px 28px 60px', maxWidth: 980 }}>
          {/* Hero */}
          <div style={{
            background: 'linear-gradient(120deg, var(--ink) 0%, #4a2818 60%, var(--dose-coral-deep) 100%)',
            borderRadius: 'var(--r-xl)', padding: 28, color: '#fff', marginBottom: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
          }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.6 }}>
                COMMUNITY POOL · APRIL 2026
              </div>
              <h2 className="dose-display" style={{ margin: '6px 0 8px', fontSize: 30, lineHeight: 1.15 }}>
                €128,440 raised this month <br /> across 14 causes
              </h2>
              <div style={{ fontSize: 13.5, opacity: 0.78, maxWidth: 380 }}>
                100% of donations go to the cause. D.O.S.E. covers payment fees and matches every euro this month.
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 200 }}>
              {[5, 10, 25, 50].map(a => (
                <button key={a} style={{
                  height: 36, borderRadius: 99, border: 'none',
                  background: 'rgba(255,255,255,0.95)', color: 'var(--ink)',
                  fontSize: 13, fontWeight: 600, textAlign: 'left', padding: '0 16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span>Quick give</span>
                  <span>€{a}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Categories filter */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {['All', 'Environment', 'Health', 'Education', 'Human Rights', 'Tech', 'Animals'].map((c, i) => (
              <button key={c} className="dose-pill" style={{
                height: 30, padding: '0 14px', fontSize: 12,
                background: i === 0 ? 'var(--ink)' : 'var(--white)',
                color: i === 0 ? 'var(--paper)' : 'var(--ink-2)',
                border: i === 0 ? 'none' : '1px solid var(--line)',
                fontWeight: 600,
              }}>{c}</button>
            ))}
          </div>

          {/* Charity grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            {charities.map((c, i) => (
              <div key={i} className="dose-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className={`dose-photo dose-photo-${c.tone}`} data-caption={c.n} style={{ height: 110, borderRadius: 0 }} />
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.c}</span>
                    <VerifiedBadge size={11} />
                  </div>
                  <h4 className="dose-display" style={{ margin: 0, fontSize: 17, color: 'var(--ink)' }}>{c.n}</h4>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 2 }}>{c.d}</div>
                  <div style={{ height: 6, background: 'var(--paper-2)', borderRadius: 99, marginTop: 12, overflow: 'hidden' }}>
                    <div style={{ width: `${c.pct}%`, height: '100%', background: 'var(--dose-coral)' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11.5 }}>
                    <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{c.raised} raised</span>
                    <span style={{ color: 'var(--ink-3)' }}>of {c.goal}</span>
                  </div>
                  <button style={{
                    width: '100%', height: 34, marginTop: 12, borderRadius: 8,
                    background: 'var(--ink)', color: 'var(--paper)', border: 'none',
                    fontSize: 12.5, fontWeight: 600,
                  }}>Donate</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── SUBSCRIPTION ─────────────────────────────────────────
function Subscription() {
  const plans = [
    {
      n: 'Free',    p: '€0',     pp: 'forever',
      f: ['Read all verified posts', 'Save & share', 'Limited DOSE AI chats', 'Standard profile'],
      cta: 'Current plan', current: true,
    },
    {
      n: 'Premium', p: '€4.99',  pp: 'per month',
      f: ['Publish posts publicly', 'Premium frames (10)', 'Ad-free', 'Premium badge', 'Unlimited AI chats'],
      cta: 'Upgrade',
      highlight: true,
    },
    {
      n: 'Pro',     p: '€9.99',  pp: 'per month',
      f: ['Everything in Premium', 'Receive donations & tips', 'Creator analytics', 'Pro frames (16)', 'Business verification', 'Priority support'],
      cta: 'Go Pro',
    },
  ];
  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--paper)' }}>
      <Sidebar active="settings" />
      <main style={{ flex: 1, minWidth: 0, overflow: 'auto' }}>
        <TopBar title="Membership" subtitle="Support good news. Get more from D.O.S.E." />
        <div style={{ padding: '40px 28px 60px', maxWidth: 1000, margin: '0 auto' }}>
          <h2 className="dose-display" style={{ fontSize: 32, color: 'var(--ink)', textAlign: 'center', margin: '0 0 6px' }}>
            Pick the plan that fits you
          </h2>
          <p style={{ fontSize: 14, color: 'var(--ink-3)', textAlign: 'center', margin: '0 0 32px' }}>
            Cancel anytime. 100% of subscription revenue is reinvested into fact-checking.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {plans.map((pl, i) => (
              <div key={pl.n} style={{
                background: pl.highlight ? 'var(--ink)' : 'var(--white)',
                color: pl.highlight ? 'var(--paper)' : 'var(--ink)',
                border: pl.highlight ? 'none' : '1px solid var(--line)',
                borderRadius: 'var(--r-xl)', padding: 24,
                position: 'relative',
                boxShadow: pl.highlight ? 'var(--sh-lg)' : 'none',
              }}>
                {pl.highlight && (
                  <span style={{
                    position: 'absolute', top: 14, right: 14,
                    background: 'var(--dose-coral)', color: '#fff', fontSize: 10,
                    fontWeight: 700, letterSpacing: '0.06em', padding: '4px 10px', borderRadius: 99,
                  }}>MOST POPULAR</span>
                )}
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.6 }}>{pl.n}</div>
                <div className="dose-display" style={{ fontSize: 38, marginTop: 6, lineHeight: 1 }}>{pl.p}</div>
                <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 18 }}>{pl.pp}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
                  {pl.f.map((feat, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                      <Ic name="check" size={14} stroke={2.2} color={pl.highlight ? 'var(--dose-gold)' : 'var(--verified)'} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
                <button style={{
                  width: '100%', height: 40, borderRadius: 10,
                  background: pl.highlight ? 'var(--dose-coral)' : pl.current ? 'transparent' : 'var(--ink)',
                  color: pl.highlight ? '#fff' : pl.current ? 'var(--ink-3)' : 'var(--paper)',
                  border: pl.current ? '1px solid var(--line)' : 'none',
                  fontSize: 13.5, fontWeight: 600,
                }}>{pl.cta}</button>
              </div>
            ))}
          </div>

          {/* Comparison row */}
          <div style={{ marginTop: 36, fontSize: 12, color: 'var(--ink-3)', textAlign: 'center' }}>
            Trusted by 240,000+ readers across 7 languages · 100% pay-out to verified causes
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── ADMIN PANEL ─────────────────────────────────────────
function AdminPanel() {
  const [tab, setTab] = React.useState('analytics');
  const tabs = ['analytics', 'users', 'posts', 'comments', 'donations', 'raw', 'map'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0c0a08', color: '#e8d8c0' }}>
      {/* Top bar */}
      <header style={{
        height: 48, padding: '0 18px', borderBottom: '1px solid #2a201a',
        display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Ic name="shield" size={16} color="var(--dose-coral)" />
          <span style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.04em' }}>D.O.S.E. ADMIN</span>
          <span style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: '#7a6a58', marginLeft: 8 }}>v4.2.1 · prod</span>
        </div>
        <div style={{ display: 'flex', gap: 2, marginLeft: 24 }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '6px 12px', borderRadius: 6, border: 'none',
              background: tab === t ? '#2a1a10' : 'transparent',
              color: tab === t ? 'var(--dose-coral)' : '#a8927a',
              fontSize: 12, fontWeight: 600, textTransform: 'capitalize',
            }}>{t}</button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 11, color: '#7a6a58', fontFamily: 'var(--font-mono)' }}>
          ● live · 2,148 users online
        </div>
      </header>

      <div style={{ flex: 1, overflow: 'auto', padding: 18 }}>
        {tab === 'analytics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
              {[
                { l: 'DAU',          v: '24,830', d: '+4.2% wow' },
                { l: 'Posts today',  v: '1,420',  d: '+2.1%' },
                { l: 'AI verifies',  v: '3,108',  d: '+18%' },
                { l: 'Donations €',  v: '€12.4k', d: '+€2.1k' },
                { l: 'Reports',      v: '14',     d: '4 pending' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#15110d', border: '1px solid #2a201a', borderRadius: 8, padding: 14 }}>
                  <div style={{ fontSize: 10, color: '#7a6a58', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.l}</div>
                  <div style={{ fontSize: 22, fontWeight: 600, marginTop: 4, color: '#fce8d0' }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: 'var(--dose-coral)' }}>{s.d}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
              <div style={{ background: '#15110d', border: '1px solid #2a201a', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 12, color: '#a8927a', marginBottom: 12 }}>Active users · 24h</div>
                <svg width="100%" height="180" viewBox="0 0 600 180" preserveAspectRatio="none">
                  {[40, 80, 120, 160].map(y => <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="#2a201a" />)}
                  <polyline fill="none" stroke="var(--dose-coral)" strokeWidth="2"
                    points="0,140 50,120 100,90 150,100 200,70 250,80 300,50 350,55 400,40 450,60 500,30 550,35 600,20" />
                  <polyline fill="none" stroke="#7a6a58" strokeWidth="1.2" strokeDasharray="3,3"
                    points="0,160 50,150 100,130 150,135 200,110 250,118 300,95 350,100 400,85 450,100 500,75 550,80 600,65" />
                </svg>
              </div>
              <div style={{ background: '#15110d', border: '1px solid #2a201a', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 12, color: '#a8927a', marginBottom: 12 }}>Top categories</div>
                {['Environment', 'Health', 'Tech', 'Education', 'Human Rights'].map((c, i) => {
                  const w = [82, 64, 58, 41, 38][i];
                  return (
                    <div key={c} style={{ marginBottom: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, marginBottom: 4 }}>
                        <span style={{ color: '#fce8d0' }}>{c}</span>
                        <span style={{ color: '#a8927a' }}>{w}%</span>
                      </div>
                      <div style={{ height: 6, background: '#2a201a', borderRadius: 99 }}>
                        <div style={{ width: `${w}%`, height: '100%', background: 'var(--dose-coral)', borderRadius: 99 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {tab === 'users' && (
          <div style={{ background: '#15110d', border: '1px solid #2a201a', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 100px 100px 90px 90px 90px', padding: '10px 14px', borderBottom: '1px solid #2a201a', fontSize: 10.5, color: '#7a6a58', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              <span></span><span>User</span><span>Tier</span><span>Posts</span><span>Country</span><span>Status</span><span>Action</span>
            </div>
            {PEOPLE.map((p, i) => (
              <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 100px 100px 90px 90px 90px', padding: '10px 14px', borderBottom: '1px solid #2a201a', fontSize: 12, alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#7a6a58' }}>{(i+1).toString().padStart(2, '0')}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar name={p.name} size={26} hue={p.hue} />
                  <div>
                    <div style={{ color: '#fce8d0', fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontSize: 10.5, color: '#7a6a58' }}>@{p.handle}</div>
                  </div>
                </div>
                <span style={{ color: '#fce8d0' }}>{p.tier || 'free'}</span>
                <span style={{ color: '#a8927a' }}>{Math.floor(50 + i * 23)}</span>
                <span style={{ color: '#a8927a' }}>{['ID','KR','DE','IN','CA','GH','JP','MX'][i]}</span>
                <span style={{ color: i === 2 ? '#c46a1a' : '#5fb88c' }}>● {i === 2 ? 'flagged' : 'active'}</span>
                <button style={{ background: 'transparent', border: '1px solid #2a201a', color: '#a8927a', height: 24, padding: '0 8px', borderRadius: 4, fontSize: 10.5 }}>Manage</button>
              </div>
            ))}
          </div>
        )}

        {tab === 'map' && (
          <div style={{
            position: 'relative', borderRadius: 8, overflow: 'hidden',
            background: '#0a0806', border: '1px solid #2a201a', height: 480,
          }}>
            <svg width="100%" height="100%" viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice">
              {/* faux world grid */}
              {[...Array(40)].map((_, i) => (
                <line key={`v${i}`} x1={i*15} y1="0" x2={i*15} y2="320" stroke="#1a1410" strokeWidth="0.5" />
              ))}
              {[...Array(22)].map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i*15} x2="600" y2={i*15} stroke="#1a1410" strokeWidth="0.5" />
              ))}
              {/* dotted continents */}
              {[
                [80, 80, 100, 70], [120, 100, 80, 60], [240, 90, 90, 50],
                [260, 130, 70, 80], [340, 130, 80, 60], [410, 110, 90, 80],
                [480, 200, 60, 50], [180, 220, 70, 50],
              ].map((r, i) => (
                <g key={i}>
                  {[...Array(80)].map((_, j) => (
                    <circle key={j}
                      cx={r[0] + Math.random() * r[2]}
                      cy={r[1] + Math.random() * r[3]}
                      r="0.8" fill="#3a2a1a" />
                  ))}
                </g>
              ))}
              {/* hot spots */}
              {[[180, 150, 12], [320, 140, 18], [410, 130, 9], [260, 200, 8], [430, 190, 7]].map((s, i) => (
                <g key={i}>
                  <circle cx={s[0]} cy={s[1]} r={s[2]} fill="var(--dose-coral)" fillOpacity="0.15" />
                  <circle cx={s[0]} cy={s[1]} r={s[2] * 0.5} fill="var(--dose-coral)" fillOpacity="0.4" />
                  <circle cx={s[0]} cy={s[1]} r="2" fill="var(--dose-coral)" />
                </g>
              ))}
            </svg>
            <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(20,15,10,0.85)', padding: '8px 12px', borderRadius: 6, fontSize: 11 }}>
              <div style={{ color: '#fce8d0', fontWeight: 600, marginBottom: 4 }}>Schema map · users by region</div>
              <div style={{ color: '#a8927a' }}>240,184 users · pan/zoom enabled</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── AI CHAT ─────────────────────────────────────────────
function AIChat() {
  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--paper)' }}>
      <Sidebar active="ai" />
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <TopBar title="DOSE AI" subtitle="Ask about any post, fact-check claims, or get summaries" />

        <div style={{ flex: 1, overflow: 'auto', padding: '24px 28px' }}>
          <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* AI hello */}
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--ink)', color: 'var(--dose-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Ic name="ai" size={16} stroke={2} />
              </div>
              <div style={{ flex: 1, fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)' }}>
                <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>DOSE AI</div>
                Hey Maya — I see you've been reading about coral nurseries. I can summarize today's stories, check
                claims against my sources, or draft a post for you. What's on your mind?
                <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                  {['Summarize today', 'Fact-check a claim', 'Draft a post about my reef trip', 'Find studies on TB vaccines'].map(s => (
                    <button key={s} className="dose-pill" style={{
                      background: 'var(--white)', border: '1px solid var(--line)',
                      color: 'var(--ink-2)', height: 28, padding: '0 12px', fontSize: 12,
                    }}>{s}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* User msg */}
            <div style={{ display: 'flex', gap: 12, alignSelf: 'flex-end', maxWidth: '78%' }}>
              <div style={{
                background: 'var(--ink)', color: 'var(--paper)',
                padding: '10px 14px', borderRadius: '16px 16px 4px 16px',
                fontSize: 14, lineHeight: 1.5,
              }}>
                Can you cross-check the claim that TB vaccine showed 54% efficacy? I want to know about the trial population.
              </div>
              <Avatar name="Maya O" size={32} hue={22} frame="galaxy" />
            </div>

            {/* AI long response */}
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--ink)', color: 'var(--dose-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Ic name="ai" size={16} stroke={2} />
              </div>
              <div style={{ flex: 1, fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)' }}>
                <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>DOSE AI</div>
                The 54% efficacy figure comes from M72/AS01E Phase III, run across 11 sites in South Africa, Zambia,
                and Indonesia. Trial population:
                <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                  <li><b>n = 14,000</b>, ages 18–50, all latent-TB-infection positive at enrolment</li>
                  <li>Even split across the three countries; ~52% female</li>
                  <li>Follow-up: median 36 months</li>
                </ul>
                <div style={{ marginTop: 8 }}>
                  Confidence interval is 27–73%, so the headline number has wide bounds. Worth noting in any post you draft.
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                  <span className="dose-pill" style={{ background: 'var(--verified-bg)', color: 'var(--verified)', border: 'none' }}>
                    <span style={{ fontSize: 11 }}>3 sources</span>
                  </span>
                  <span className="dose-pill" style={{ background: 'var(--paper-2)', color: 'var(--ink-2)', border: 'none' }}>
                    <span style={{ fontSize: 11 }}>Lancet · 2026</span>
                  </span>
                  <span className="dose-pill" style={{ background: 'var(--paper-2)', color: 'var(--ink-2)', border: 'none' }}>
                    <span style={{ fontSize: 11 }}>WHO bulletin · Mar 2026</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Composer */}
        <div style={{ padding: '14px 28px 22px', borderTop: '1px solid var(--line)' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{
              display: 'flex', alignItems: 'flex-end', gap: 10,
              background: 'var(--white)', border: '1px solid var(--line)',
              borderRadius: 16, padding: '10px 12px',
            }}>
              <Ic name="plus" size={18} color="var(--ink-3)" style={{ marginBottom: 6 }} />
              <textarea placeholder="Ask DOSE AI…" style={{
                flex: 1, border: 'none', outline: 'none', resize: 'none',
                fontSize: 14, fontFamily: 'inherit', color: 'var(--ink)',
                minHeight: 22, maxHeight: 80, lineHeight: 1.5, background: 'transparent',
              }} defaultValue="" />
              <button style={{
                width: 32, height: 32, borderRadius: 8, border: 'none',
                background: 'var(--dose-coral)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Ic name="send" size={14} stroke={2} />
              </button>
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', textAlign: 'center', marginTop: 8 }}>
              DOSE AI cites every claim. Always verify before posting.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

Object.assign(window, { Trending, CreatorDashboard, Donations, Subscription, AdminPanel, AIChat });
