// screens-mobile.jsx — iOS mobile screens (Italian feed, chat, onboarding)

function MobileFeedItalian() {
  const [tab, setTab] = React.useState('home');
  return (
    <div style={{
      width: '100%', height: '100%', background: 'var(--paper)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      <IOSStatusBar />
      <header style={{ padding: '4px 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <DoseLogo size={22} />
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--white)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ic name="search" size={15} color="var(--ink-2)" />
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--white)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ic name="bell" size={15} color="var(--ink-2)" />
            </div>
            <span style={{ position: 'absolute', top: -2, right: -2, background: 'var(--dose-coral)', color: '#fff', fontSize: 9, fontWeight: 700, minWidth: 14, height: 14, borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px' }}>3</span>
          </div>
        </div>
      </header>

      <div style={{ padding: '0 18px', display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
        <h1 className="dose-display" style={{ margin: 0, fontSize: 24, color: 'var(--ink)' }}>La tua dose</h1>
        <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>· buone notizie verificate</span>
      </div>

      {/* Stories */}
      <div style={{ padding: '0 18px 12px', display: 'flex', gap: 12, overflowX: 'auto', flexShrink: 0 }}>
        {['Tu', 'Maya', 'Lin', 'Priya', 'Noah', 'Sade'].map((s, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 56 }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%', padding: 2,
              background: i === 0 ? 'transparent' : 'conic-gradient(from 0deg, var(--dose-coral), var(--dose-gold), var(--dose-coral))',
              border: i === 0 ? '2px dashed var(--ink-4)' : 'none',
            }}>
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%',
                background: i === 0 ? 'var(--paper-2)' : `oklch(0.72 0.14 ${i * 60})`,
                border: i === 0 ? 'none' : '2px solid var(--paper)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 600, fontSize: 14,
              }}>{i === 0 ? <Ic name="plus" size={16} color="var(--ink-3)" /> : s[0]}</div>
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--ink-2)' }}>{s}</div>
          </div>
        ))}
      </div>

      {/* Filter chips */}
      <div style={{ padding: '0 18px 12px', display: 'flex', gap: 8, overflowX: 'auto', flexShrink: 0 }}>
        {['Tutto', 'Ambiente', 'Salute', 'Tech', 'Diritti'].map((c, i) => (
          <button key={c} className="dose-pill" style={{
            height: 28, padding: '0 12px', flexShrink: 0, fontSize: 11.5,
            background: i === 0 ? 'var(--ink)' : 'var(--white)',
            color: i === 0 ? 'var(--paper)' : 'var(--ink-2)',
            border: i === 0 ? 'none' : '1px solid var(--line)',
            fontWeight: 600,
          }}>{c}</button>
        ))}
      </div>

      {/* Feed */}
      <div style={{ flex: 1, overflow: 'auto', padding: '0 18px 80px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[
          { ...POSTS[0], title: 'Vivai di corallo a Sulawesi: 38% di recupero in tre anni — la comunità guida il programma', body: 'Biologi marini con tre villaggi costieri hanno registrato un rimbalzo misurabile in sei siti di monitoraggio.' },
          { ...POSTS[1], title: 'Vaccino TB supera la Fase III con 54% di efficacia — primo nuovo vaccino in un secolo', body: 'Sperimentazione condotta in 11 siti tra Sudafrica, Zambia e Indonesia. I risultati sono in attesa di revisione tra pari.' },
          { ...POSTS[2], title: 'Mini-reti solari servono ora 14M di nigeriani — il governo raddoppia i fondi per il 2026', body: 'Le installazioni off-grid sono cresciute del 41% anno su anno.' },
        ].map(p => {
          const a = getPerson(p.author);
          return (
            <article key={p.id} className="dose-card" style={{ overflow: 'hidden' }}>
              <div className={`dose-photo dose-photo-${p.photo}`} data-caption={p.caption} style={{ height: 140, borderRadius: 'var(--r-lg) var(--r-lg) 0 0' }}>
                <div style={{ position: 'absolute', top: 8, left: 8 }}>
                  <span className="dose-pill" style={{ background: 'rgba(255,248,238,0.9)', color: 'var(--ink-2)' }}>
                    <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{p.category}</span>
                  </span>
                </div>
                <div style={{ position: 'absolute', top: 8, right: 8 }}>
                  <FactPill score={p.factScore} compact />
                </div>
              </div>
              <div style={{ padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, marginBottom: 6 }}>
                  <Avatar name={a.name} size={20} hue={a.hue} frame={a.frame} />
                  <span style={{ fontWeight: 600 }}>{a.name}</span>
                  {a.verified && <VerifiedBadge size={10} />}
                  <span style={{ color: 'var(--ink-3)' }}>· {p.time === '2h' ? '2 ore' : p.time === '5h' ? '5 ore' : '8 ore'}</span>
                </div>
                <h3 className="dose-display" style={{ margin: 0, fontSize: 15, lineHeight: 1.25, color: 'var(--ink)' }}>{p.title}</h3>
                <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.body}</p>
                <div style={{ display: 'flex', gap: 14, fontSize: 11, color: 'var(--ink-3)', marginTop: 10 }}>
                  <span><Ic name="heart" size={12} stroke={1.6} style={{ display: 'inline', verticalAlign: '-2px' }} /> {(p.likes/1000).toFixed(1)}k</span>
                  <span><Ic name="comment" size={12} stroke={1.6} style={{ display: 'inline', verticalAlign: '-2px' }} /> {p.comments}</span>
                  <span><Ic name="share" size={12} stroke={1.6} style={{ display: 'inline', verticalAlign: '-2px' }} /> {p.shares}</span>
                  <span style={{ marginLeft: 'auto' }}><Ic name="bookmark" size={12} stroke={1.6} /></span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Tab bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 78,
        background: 'rgba(253,249,243,0.92)', backdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--line)', display: 'flex',
        padding: '8px 12px 24px', justifyContent: 'space-around',
      }}>
        {[
          { i: 'home', l: 'Home' }, { i: 'search', l: 'Esplora' },
          { i: 'plus', l: '' }, { i: 'msg', l: 'Chat' }, { i: 'home', l: 'Profilo' },
        ].map((t, i) => i === 2 ? (
          <button key={i} style={{
            width: 44, height: 44, borderRadius: '50%', border: 'none',
            background: 'var(--dose-coral)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(255,107,72,0.4)',
          }}>
            <Ic name="plus" size={20} stroke={2.4} />
          </button>
        ) : (
          <button key={i} style={{ background: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, color: i === 0 ? 'var(--dose-coral)' : 'var(--ink-3)' }}>
            <Ic name={t.i} size={22} stroke={i === 0 ? 2.2 : 1.7} />
            <span style={{ fontSize: 9.5, fontWeight: 600 }}>{t.l}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function MobileChat() {
  return (
    <div style={{ width: '100%', height: '100%', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <IOSStatusBar />
      {/* Nav */}
      <div style={{
        padding: '6px 12px 10px', display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: '1px solid var(--line)',
      }}>
        <button style={{ background: 'transparent', border: 'none', padding: 0, color: 'var(--dose-coral)', fontSize: 14, fontWeight: 500 }}>← Chats</button>
        <Avatar name="Lin Park" size={32} hue={350} frame="rosegold" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 4 }}>
            Lin Park <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--verified)' }} />
          </div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Active now · typing…</div>
        </div>
        <Ic name="more" size={18} color="var(--ink-3)" />
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflow: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ textAlign: 'center', fontSize: 10.5, color: 'var(--ink-3)', margin: '6px 0' }}>Today · 09:41</div>

        {[
          { me: false, t: 'Did you see Maya\'s post on the coral nurseries?' },
          { me: false, t: 'I cried, then donated 🪸' },
          { me: true,  t: 'YES. The 38% number got me. I shared it with my marine biology group.' },
          { me: false, t: 'Forwarding it to the conservation chat now.' },
        ].map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.me ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '76%', padding: '8px 12px',
              background: m.me ? 'var(--dose-coral)' : 'var(--white)',
              color: m.me ? '#fff' : 'var(--ink)',
              borderRadius: m.me ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              border: m.me ? 'none' : '1px solid var(--line)',
              fontSize: 13.5, lineHeight: 1.4,
            }}>{m.t}</div>
          </div>
        ))}

        {/* Shared post card */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div className="dose-card" style={{ width: '76%', padding: 0, overflow: 'hidden' }}>
            <div className="dose-photo dose-photo-warm" data-caption="" style={{ height: 80, borderRadius: 0 }}>
              <div style={{ position: 'absolute', top: 6, right: 6 }}>
                <FactPill score={96} compact />
              </div>
            </div>
            <div style={{ padding: 10 }}>
              <div className="dose-display" style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.25 }}>Coral nurseries off Sulawesi report 38% recovery</div>
              <div style={{ fontSize: 10.5, color: 'var(--ink-3)', marginTop: 4 }}>thedose.app · @mayao</div>
            </div>
          </div>
        </div>

        {/* Typing dots */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{ background: 'var(--white)', border: '1px solid var(--line)', padding: '10px 14px', borderRadius: '16px 16px 16px 4px', display: 'flex', gap: 4 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ink-4)' }} />
            ))}
          </div>
        </div>
      </div>

      {/* Composer */}
      <div style={{ padding: '8px 12px 28px', borderTop: '1px solid var(--line)', display: 'flex', gap: 8, alignItems: 'center' }}>
        <Ic name="plus" size={22} color="var(--ink-3)" />
        <div style={{ flex: 1, height: 36, background: 'var(--white)', border: '1px solid var(--line)', borderRadius: 18, padding: '0 14px', display: 'flex', alignItems: 'center', fontSize: 13, color: 'var(--ink-3)' }}>
          Message Lin…
        </div>
        <button style={{ width: 36, height: 36, borderRadius: 18, background: 'var(--dose-coral)', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Ic name="send" size={14} stroke={2} />
        </button>
      </div>
    </div>
  );
}

function MobileOnboarding() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(180deg, #ffd9c2 0%, #fff8ee 50%, #ffe2c0 100%)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      <IOSStatusBar />

      <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column' }}>
        {/* Sun */}
        <div style={{ alignSelf: 'center', position: 'relative', marginTop: 30, marginBottom: 24 }}>
          <div style={{
            width: 140, height: 140, borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #ffd562, #ff7a4e 55%, #e54b2a)',
            boxShadow: '0 12px 60px rgba(255, 122, 78, 0.5)',
          }} />
          {/* rays */}
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute', top: '50%', left: '50%',
              width: 4, height: 30, background: 'var(--dose-coral-deep)',
              borderRadius: 99, opacity: 0.5,
              transform: `rotate(${i * 45}deg) translate(0, -100px)`,
              transformOrigin: 'center center',
            }} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dose-coral-deep)', marginBottom: 8 }}>
            Welcome to the dose
          </div>
          <h1 className="dose-display" style={{ margin: 0, fontSize: 32, lineHeight: 1.15, color: 'var(--ink)' }}>
            Good news,<br /> verified daily.
          </h1>
          <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.55, margin: '14px 24px 0' }}>
            Every story on D.O.S.E. is fact-checked by AI and corroborated against multiple sources.
            Doomscrolling, but the opposite.
          </p>
        </div>

        {/* Mini-feature row */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {[
            { icon: 'verify',   t: 'Every post fact-checked by AI', s: 'See the 0–100% confidence on every story.' },
            { icon: 'donate',   t: 'Reading funds real causes',     s: 'D.O.S.E. matches your impact 1:1 monthly.' },
            { icon: 'globe',    t: '7 languages, 1 community',      s: 'Auto-translate with cultural context.' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 14, background: 'rgba(255,255,255,0.55)', borderRadius: 14, backdropFilter: 'blur(8px)' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--ink)', color: 'var(--dose-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Ic name={f.icon} size={16} stroke={1.9} />
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>{f.t}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-2)', marginTop: 2, lineHeight: 1.4 }}>{f.s}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 24 }}>
          <button style={{
            height: 50, borderRadius: 14, border: 'none',
            background: 'var(--ink)', color: 'var(--paper)',
            fontSize: 15, fontWeight: 600,
          }}>Get started</button>
          <button style={{
            height: 50, borderRadius: 14, border: '1px solid rgba(42,31,23,0.18)',
            background: 'rgba(255,255,255,0.5)', color: 'var(--ink)',
            fontSize: 15, fontWeight: 500,
          }}>Sign in</button>
          <div style={{ fontSize: 11, color: 'var(--ink-2)', textAlign: 'center', marginTop: 4 }}>
            • • <span style={{ color: 'var(--dose-coral-deep)', fontWeight: 700 }}>●</span> • •
          </div>
        </div>
      </div>
    </div>
  );
}

function MobilePostDetail() {
  const post = POSTS[0];
  const author = getPerson(post.author);
  return (
    <div style={{ width: '100%', height: '100%', background: 'var(--paper)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <IOSStatusBar />
      <div style={{ padding: '6px 14px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button style={{ background: 'transparent', border: 'none', padding: 0, color: 'var(--dose-coral)', fontSize: 14, fontWeight: 500 }}>← Feed</button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 14 }}>
          <Ic name="share" size={18} color="var(--ink-2)" />
          <Ic name="more" size={18} color="var(--ink-2)" />
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '0 18px 100px' }}>
        <div className="dose-photo dose-photo-warm" data-caption="reef nursery — wide" style={{ height: 200, borderRadius: 14, marginBottom: 16 }} />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
          <span className="dose-pill" style={{ background: 'var(--paper-2)', color: 'var(--ink-2)' }}>
            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{post.category}</span>
          </span>
          <FactPill score={post.factScore} compact />
        </div>
        <h1 className="dose-display" style={{ margin: '0 0 14px', fontSize: 22, lineHeight: 1.2, color: 'var(--ink)' }}>{post.title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <Avatar name={author.name} size={36} hue={author.hue} frame={author.frame} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600 }}>
              {author.name} <VerifiedBadge size={11} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>14.2k followers · 2h ago</div>
          </div>
          <button style={{ height: 28, padding: '0 14px', borderRadius: 99, background: 'var(--ink)', color: 'var(--paper)', border: 'none', fontSize: 12, fontWeight: 600 }}>Follow</button>
        </div>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', margin: '0 0 14px' }}>
          Marine biologists working with three coastal villages have logged a measurable rebound at six monitoring sites.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: '0 0 14px' }}>
          "We thought we'd lost this reef ten years ago," says Mira Sutanto, lead biologist at the Sulawesi Marine Trust.
          "Now my daughter is planting the same coral I gave up on."
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>
          The trust publishes its monitoring data openly — anyone can pull the CSVs and run their own analysis.
        </p>
      </div>

      {/* Floating action bar */}
      <div style={{
        position: 'absolute', left: 14, right: 14, bottom: 24,
        height: 50, borderRadius: 25, background: 'rgba(42,31,23,0.92)',
        backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', padding: '0 8px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
      }}>
        {[
          { i: 'heart',    n: '4.8k', a: true },
          { i: 'comment',  n: '412' },
          { i: 'bookmark', n: '' },
          { i: 'share',    n: '891' },
        ].map((b, i) => (
          <button key={i} style={{
            flex: 1, height: 38, background: 'transparent', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            color: b.a ? 'var(--dose-coral)' : 'var(--paper)',
          }}>
            <Ic name={b.i} size={17} stroke={b.a ? 2.2 : 1.8} />
            {b.n && <span style={{ fontSize: 12, fontWeight: 600 }}>{b.n}</span>}
          </button>
        ))}
        <button style={{
          height: 38, padding: '0 14px', borderRadius: 19, marginLeft: 4,
          background: 'var(--dose-coral)', color: '#fff', border: 'none',
          fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Ic name="donate" size={13} /> Tip
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { MobileFeedItalian, MobileChat, MobileOnboarding, MobilePostDetail });
