// screens-profile.jsx — Profile + Frames showcase

function FrameSwatch({ name, label, locked, tier }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <Avatar name={label} size={56} hue={Math.floor(Math.random() * 360)} frame={name} />
        {locked && (
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'rgba(20,12,4,0.55)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <Ic name="shield" size={18} color="#fff" />
          </div>
        )}
      </div>
      <div style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--ink)', textTransform: 'capitalize' }}>{label}</div>
      <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: tier === 'PRO' ? 'var(--pro)' : tier === 'PREMIUM' ? 'var(--premium)' : 'var(--donor)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {tier}
      </div>
    </div>
  );
}

function Profile() {
  const me = PEOPLE[0];
  const [tab, setTab] = React.useState('posts');
  const tabs = ['posts', 'saved', 'tagged', 'liked'];

  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--paper)' }}>
      <Sidebar active="profile" />
      <main style={{ flex: 1, minWidth: 0, overflow: 'auto' }}>
        {/* Banner */}
        <div className="dose-photo dose-photo-warm" data-caption="banner image" style={{ height: 180, borderRadius: 0 }} />

        <div style={{ padding: '0 32px 40px', maxWidth: 980 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, marginTop: -42, marginBottom: 16 }}>
            <Avatar name={me.name} size={120} hue={me.hue} frame={me.frame} ring="var(--paper)" />
            <div style={{ flex: 1, marginBottom: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h1 className="dose-display" style={{ margin: 0, fontSize: 28, color: 'var(--ink)' }}>{me.name}</h1>
                <VerifiedBadge size={18} />
                <TierBadge tier="PRO" size="lg" />
                <TierBadge tier="DONOR" size="lg" />
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--ink-3)', marginTop: 4 }}>@{me.handle} · Marine biologist & writer · Jakarta, Indonesia</div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
              <button style={{ height: 36, padding: '0 16px', borderRadius: 10, background: 'var(--white)', border: '1px solid var(--line)', color: 'var(--ink)', fontSize: 13, fontWeight: 600 }}>Edit profile</button>
              <button style={{ height: 36, padding: '0 16px', borderRadius: 10, background: 'var(--ink)', border: 'none', color: 'var(--paper)', fontSize: 13, fontWeight: 600 }}>Share</button>
            </div>
          </div>

          <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 640, margin: '0 0 16px' }}>
            Coral nurseries, slow journalism, and the occasional rant about marine plastic. I write here so you don't have to read 30 tabs.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 24, padding: '14px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', marginBottom: 24 }}>
            {[
              { n: '14.2k', l: 'Followers' },
              { n: '482',   l: 'Following' },
              { n: '163',   l: 'Posts' },
              { n: '€2.4k', l: 'Tips received' },
              { n: '€480',  l: 'Donated' },
            ].map((s, i) => (
              <div key={i}>
                <div className="dose-display" style={{ fontSize: 19, color: 'var(--ink)' }}>{s.n}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Frames showcase */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: 18, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 className="dose-display" style={{ margin: 0, fontSize: 17, color: 'var(--ink)' }}>Profile frames · 12 of 40 unlocked</h3>
              <span style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>Donate €25 more for Diamond</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 14 }}>
              <FrameSwatch name="rosegold"    label="rosegold"    tier="PREMIUM" />
              <FrameSwatch name="emerald"     label="emerald"     tier="PREMIUM" />
              <FrameSwatch name="coral"       label="coral"       tier="PREMIUM" />
              <FrameSwatch name="mint"        label="mint"        tier="PREMIUM" />
              <FrameSwatch name="galaxy"      label="galaxy"      tier="PRO" />
              <FrameSwatch name="aurora"      label="aurora"      tier="PRO" />
              <FrameSwatch name="holographic" label="holo"        tier="PRO" />
              <FrameSwatch name="rainbow"     label="rainbow"     tier="PRO" />
              <FrameSwatch name="bronze"      label="bronze"      tier="DONOR" />
              <FrameSwatch name="gold-d"      label="gold"        tier="DONOR" />
              <FrameSwatch name="platinum"    label="platinum"    tier="DONOR" />
              <FrameSwatch name="celestial"   label="celestial"   tier="DONOR" locked />
              <FrameSwatch name="diamond"     label="diamond"     tier="PRO" locked />
              <FrameSwatch name="fire"        label="fire"        tier="PRO" locked />
              <FrameSwatch name="cyber"       label="cyber"       tier="PRO" locked />
              <FrameSwatch name="silver"      label="silver"      tier="PREMIUM" locked />
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--line)', marginBottom: 18 }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                height: 38, padding: '0 16px', border: 'none', background: 'transparent',
                fontSize: 13, fontWeight: 600,
                color: tab === t ? 'var(--ink)' : 'var(--ink-3)',
                borderBottom: tab === t ? '2px solid var(--dose-coral)' : '2px solid transparent',
                textTransform: 'capitalize',
              }}>{t}</button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {POSTS.slice(0, 6).map(p => <PostCard key={p.id} post={p} layout="grid" density="compact" />)}
          </div>
        </div>
      </main>
    </div>
  );
}

Object.assign(window, { Profile, FrameSwatch });
