// screens-feed.jsx — Feed variants + post detail with fact-check modal

function FactCheckModal({ post, onClose }) {
  if (!post) return null;
  const author = getPerson(post.author);
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, background: 'rgba(28, 18, 8, 0.6)',
      backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 100, padding: 24,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: 460, maxWidth: '100%', background: 'var(--paper)',
        borderRadius: 'var(--r-xl)', padding: 24,
        boxShadow: 'var(--sh-lg)', display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, background: 'var(--ink)',
              color: 'var(--dose-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Ic name="ai" size={18} stroke={2} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>DOSE AI · Fact-check</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>Analyzed in 1.4s · gpt-class model</div>
            </div>
          </div>
          <button onClick={onClose} style={{ width: 30, height: 30, border: 'none', borderRadius: 8, background: 'transparent' }}>
            <Ic name="close" size={16} color="var(--ink-3)" />
          </button>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, var(--verified-bg), var(--paper))',
          borderRadius: 'var(--r-lg)', padding: 16, display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'conic-gradient(var(--verified) 0% 96%, rgba(47,143,94,0.15) 96% 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 50, height: 50, borderRadius: '50%', background: 'var(--paper)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--verified)',
            }}>{post.factScore}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              VERDICT
            </div>
            <div className="dose-display" style={{ fontSize: 19, color: 'var(--verified)', marginTop: 2 }}>
              Largely verified
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 2 }}>
              {post.sources} corroborating sources · 0 contradictions
            </div>
          </div>
        </div>

        <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink-2)' }}>
          The claim is consistent with three independent peer-reviewed reports and a public dataset
          published by the lead institution. The 38% recovery figure is methodologically sound but
          measured at six monitoring sites — extrapolation to the wider region is not supported.
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: 8 }}>
            Sources cited
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { n: 'Marine Biology Reports', d: 'Mar 2026', tone: 'high' },
              { n: 'NOAA Coral Census', d: 'Feb 2026', tone: 'high' },
              { n: 'Univ. of Sulawesi field log', d: 'Jan 2026', tone: 'high' },
              { n: 'Nature — Reef Recovery', d: '2025', tone: 'mid' },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
                background: 'var(--white)', border: '1px solid var(--line)', borderRadius: 8,
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: s.tone === 'high' ? 'var(--verified)' : 'var(--warn)',
                }} />
                <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--ink)' }}>{s.n}</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--ink-3)' }}>{s.d}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
          <button style={{ flex: 1, height: 36, borderRadius: 8, border: '1px solid var(--line)', background: 'var(--white)', color: 'var(--ink)', fontSize: 12.5, fontWeight: 600 }}>
            Disagree with verdict
          </button>
          <button style={{ flex: 1, height: 36, borderRadius: 8, background: 'var(--ink)', color: 'var(--paper)', border: 'none', fontSize: 12.5, fontWeight: 600 }}>
            Read full report
          </button>
        </div>
      </div>
    </div>
  );
}

// FEED — Grid layout (default)
function FeedGrid() {
  const [factPost, setFactPost] = React.useState(null);
  const [filter, setFilter] = React.useState('All');
  return (
    <div style={{ display: 'flex', height: '100%', position: 'relative', background: 'var(--paper)' }}>
      <Sidebar active="home" />
      <main style={{ flex: 1, minWidth: 0, overflow: 'auto', position: 'relative' }}>
        <TopBar title="Today's dose" subtitle="Verified positive news, picked for you" country="Italy" lang="EN" />
        <div style={{ padding: '20px 28px 60px', display: 'flex', flexDirection: 'column', gap: 22 }}>
          <StoriesRow />
          <FilterStrip active={filter} onChange={setFilter} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {POSTS.map(p => <PostCard key={p.id} post={p} layout="grid" onFactCheck={setFactPost} />)}
          </div>
        </div>
        {factPost && <FactCheckModal post={factPost} onClose={() => setFactPost(null)} />}
      </main>
      <RightRail />
    </div>
  );
}

// FEED — List layout
function FeedList() {
  const [factPost, setFactPost] = React.useState(null);
  return (
    <div style={{ display: 'flex', height: '100%', position: 'relative', background: 'var(--paper)' }}>
      <Sidebar active="home" />
      <main style={{ flex: 1, minWidth: 0, overflow: 'auto', position: 'relative' }}>
        <TopBar title="Today's dose" subtitle="Reading mode · text-forward" />
        <div style={{ padding: '20px 28px 60px', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 760 }}>
          <FilterStrip active="All" />
          {POSTS.map(p => <PostCard key={p.id} post={p} layout="list" onFactCheck={setFactPost} />)}
        </div>
        {factPost && <FactCheckModal post={factPost} onClose={() => setFactPost(null)} />}
      </main>
      <RightRail />
    </div>
  );
}

// FEED — Masonry layout
function FeedMasonry() {
  const [factPost, setFactPost] = React.useState(null);
  return (
    <div style={{ display: 'flex', height: '100%', position: 'relative', background: 'var(--paper)' }}>
      <Sidebar active="home" />
      <main style={{ flex: 1, minWidth: 0, overflow: 'auto', position: 'relative' }}>
        <TopBar title="Today's dose" subtitle="Pinterest-style discovery" />
        <div style={{ padding: '20px 28px 60px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <FilterStrip active="All" />
          <div style={{ columnCount: 3, columnGap: 16 }}>
            {POSTS.map(p => <PostCard key={p.id} post={p} layout="masonry" onFactCheck={setFactPost} />)}
          </div>
        </div>
        {factPost && <FactCheckModal post={factPost} onClose={() => setFactPost(null)} />}
      </main>
    </div>
  );
}

// POST DETAIL
function PostDetail() {
  const post = POSTS[0];
  const author = getPerson(post.author);
  const [factOpen, setFactOpen] = React.useState(false);
  return (
    <div style={{ display: 'flex', height: '100%', position: 'relative', background: 'var(--paper)' }}>
      <Sidebar active="home" />
      <main style={{ flex: 1, minWidth: 0, overflow: 'auto', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <TopBar title="" subtitle="Story · 4 min read" />
        <div style={{ flex: 1, padding: '24px 40px 40px', maxWidth: 760, margin: '0 auto', width: '100%' }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 10px', borderRadius: 8, background: 'transparent', border: '1px solid var(--line)', color: 'var(--ink-2)', fontSize: 12, marginBottom: 18 }}>
            ← Back to feed
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span className="dose-pill" style={{ background: 'var(--paper-2)', color: 'var(--ink-2)' }}>
              <span style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {post.category}
              </span>
            </span>
            <FactPill score={post.factScore} onClick={() => setFactOpen(true)} />
            <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>· {post.location}</span>
          </div>
          <h1 className="dose-display" style={{ fontSize: 34, lineHeight: 1.15, color: 'var(--ink)', margin: '0 0 16px' }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <Avatar name={author.name} size={42} hue={author.hue} frame={author.frame} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>
                {author.name} {author.verified && <VerifiedBadge size={13} />} <TierBadge tier={author.tier} />
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>@{author.handle} · 14.2k followers · {post.time} ago</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              <button style={{ height: 32, padding: '0 14px', borderRadius: 99, border: 'none', background: 'var(--ink)', color: 'var(--paper)', fontSize: 12.5, fontWeight: 600 }}>Follow</button>
              <button style={{ height: 32, width: 32, borderRadius: 99, border: '1px solid var(--line)', background: 'var(--white)' }}>
                <Ic name="more" size={14} color="var(--ink-2)" />
              </button>
            </div>
          </div>
          <div className="dose-photo dose-photo-warm" data-caption="reef nursery — wide" style={{ height: 280, borderRadius: 'var(--r-lg)', marginBottom: 24 }} />
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, lineHeight: 1.55, color: 'var(--ink-2)', marginBottom: 14 }}>
            Marine biologists working with three coastal villages have logged a measurable rebound at six monitoring sites.
            The program pays fishers a stipend to plant fragments and patrol against blast fishing — a model already
            being studied by neighbouring provinces.
          </div>
          <div style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-2)', marginBottom: 14 }}>
            "We thought we'd lost this reef ten years ago," says Mira Sutanto, lead biologist at the Sulawesi Marine
            Trust. "Now my daughter is planting the same coral I gave up on. It's a daily lesson in stubborn hope."
          </div>
          <div style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-2)' }}>
            The trust publishes its monitoring data openly — anyone can pull the CSVs and run their own analysis.
            That transparency is part of why DOSE AI rated this story 96% verified.
          </div>

          {/* Reaction bar */}
          <div style={{ display: 'flex', gap: 10, marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--line)' }}>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 38, padding: '0 14px', borderRadius: 99, border: '1px solid var(--line)', background: 'var(--white)', color: 'var(--ink-2)', fontSize: 13 }}>
              <Ic name="heart" size={15} stroke={1.8} /> 4,823
            </button>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 38, padding: '0 14px', borderRadius: 99, border: '1px solid var(--line)', background: 'var(--white)', color: 'var(--ink-2)', fontSize: 13 }}>
              <Ic name="comment" size={15} stroke={1.8} /> 412
            </button>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 38, padding: '0 14px', borderRadius: 99, border: '1px solid var(--line)', background: 'var(--white)', color: 'var(--ink-2)', fontSize: 13 }}>
              <Ic name="share" size={15} stroke={1.8} /> 891
            </button>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 38, padding: '0 14px', borderRadius: 99, border: '1px solid var(--line)', background: 'var(--white)', color: 'var(--ink-2)', fontSize: 13 }}>
              <Ic name="bookmark" size={15} stroke={1.8} /> Save
            </button>
            <button style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, height: 38, padding: '0 14px', borderRadius: 99, border: 'none', background: 'var(--dose-coral)', color: '#fff', fontSize: 13, fontWeight: 600 }}>
              <Ic name="donate" size={15} stroke={1.9} /> Tip €5
            </button>
          </div>

          {/* Comments preview */}
          <div style={{ marginTop: 28 }}>
            <h3 className="dose-display" style={{ fontSize: 18, color: 'var(--ink)', marginBottom: 14 }}>412 comments</h3>
            {[
              { p: 'jonas',  t: '"stubborn hope" — going to print this and put it on my wall.' },
              { p: 'lin',    t: 'Are the CSVs Mira mentions actually public? Link?' },
              { p: 'priya',  t: 'I work in coral restoration in the Maldives — happy to share methodology if useful.' },
            ].map((c, i) => {
              const cp = getPerson(c.p);
              return (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                  <Avatar name={cp.name} size={32} hue={cp.hue} frame={cp.frame} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>
                      {cp.name} {cp.verified && <VerifiedBadge size={11} />}
                      <span style={{ color: 'var(--ink-4)', fontWeight: 400 }}>· 1h</span>
                    </div>
                    <div style={{ fontSize: 13.5, color: 'var(--ink-2)', marginTop: 2, lineHeight: 1.5 }}>{c.t}</div>
                    <div style={{ display: 'flex', gap: 14, marginTop: 6, fontSize: 11.5, color: 'var(--ink-3)' }}>
                      <span>♥ 24</span><span>Reply</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {factOpen && <FactCheckModal post={post} onClose={() => setFactOpen(false)} />}
      </main>
    </div>
  );
}

Object.assign(window, { FeedGrid, FeedList, FeedMasonry, PostDetail, FactCheckModal });
