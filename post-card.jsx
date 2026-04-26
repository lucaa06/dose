// post-card.jsx — D.O.S.E. post card primitive (used in feeds, profiles, search)

function FactPill({ score, onClick, compact = false }) {
  const tone = score >= 90 ? 'high' : score >= 70 ? 'mid' : 'low';
  const colors = {
    high: { bg: 'var(--verified-bg)', fg: 'var(--verified)', dot: 'var(--verified)' },
    mid:  { bg: 'var(--warn-bg)', fg: 'var(--warn)', dot: 'var(--warn)' },
    low:  { bg: 'var(--danger-bg)', fg: 'var(--danger)', dot: 'var(--danger)' },
  }[tone];
  return (
    <button onClick={onClick} className="dose-pill" style={{
      background: colors.bg, color: colors.fg, border: 'none',
      height: compact ? 22 : 24, padding: compact ? '0 8px' : '0 10px',
    }}>
      <svg width="11" height="11" viewBox="0 0 12 12">
        <circle cx="6" cy="6" r="5" fill="none" stroke={colors.dot} strokeWidth="1.4" />
        <path d="M3.5 6.2l1.8 1.8L8.5 4.7" fill="none" stroke={colors.dot} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{score}% verified</span>
    </button>
  );
}

function PostCard({ post, layout = 'grid', onFactCheck, density = 'cozy' }) {
  const author = getPerson(post.author);
  const photoClass = `dose-photo dose-photo-${post.photo}`;
  const pad = density === 'compact' ? 14 : 18;

  if (layout === 'list') {
    return (
      <article className="dose-card" style={{ display: 'flex', gap: 16, padding: pad, alignItems: 'stretch' }}>
        <div className={photoClass} data-caption={post.caption} style={{
          width: 130, minHeight: 130, borderRadius: 'var(--r-md)', flexShrink: 0,
        }} />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
            <Avatar name={author.name} size={22} hue={author.hue} frame={author.frame} />
            <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{author.name}</span>
            {author.verified && <VerifiedBadge size={12} />}
            <span style={{ color: 'var(--ink-3)' }}>· {post.time}</span>
            <span style={{ marginLeft: 'auto', fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {post.category}
            </span>
          </div>
          <h3 className="dose-display" style={{ margin: 0, fontSize: 17, lineHeight: 1.25, color: 'var(--ink)' }}>
            {post.title}
          </h3>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--ink-2)',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {post.body}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 'auto', fontSize: 12, color: 'var(--ink-3)' }}>
            <FactPill score={post.factScore} compact onClick={() => onFactCheck && onFactCheck(post)} />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <Ic name="heart" size={14} stroke={1.6} /> {post.likes.toLocaleString()}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <Ic name="comment" size={14} stroke={1.6} /> {post.comments}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <Ic name="share" size={14} stroke={1.6} /> {post.shares}
            </span>
          </div>
        </div>
      </article>
    );
  }

  // Grid / masonry default
  const isMasonry = layout === 'masonry';
  return (
    <article className="dose-card" style={{
      display: 'flex', flexDirection: 'column',
      breakInside: 'avoid', marginBottom: isMasonry ? 16 : 0,
    }}>
      <div className={photoClass} data-caption={post.caption} style={{
        height: isMasonry ? (140 + (post.id.charCodeAt(1) % 4) * 28) : 160,
        borderRadius: 'var(--r-lg) var(--r-lg) 0 0',
      }}>
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6 }}>
          <span className="dose-pill" style={{ background: 'rgba(255,248,238,0.92)', color: 'var(--ink-2)', backdropFilter: 'blur(6px)' }}>
            <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {post.category}
            </span>
          </span>
        </div>
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <FactPill score={post.factScore} compact onClick={() => onFactCheck && onFactCheck(post)} />
        </div>
      </div>
      <div style={{ padding: pad, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5 }}>
          <Avatar name={author.name} size={20} hue={author.hue} frame={author.frame} />
          <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{author.name}</span>
          {author.verified && <VerifiedBadge size={11} />}
          <span style={{ color: 'var(--ink-3)' }}>· {post.time}</span>
        </div>
        <h3 className="dose-display" style={{ margin: 0, fontSize: 16, lineHeight: 1.25, color: 'var(--ink)' }}>
          {post.title}
        </h3>
        {density !== 'compact' && (
          <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: 'var(--ink-2)',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {post.body}
          </p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 11.5, color: 'var(--ink-3)', marginTop: 4 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Ic name="heart" size={13} stroke={1.6} /> {post.likes > 999 ? `${(post.likes/1000).toFixed(1)}k` : post.likes}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Ic name="comment" size={13} stroke={1.6} /> {post.comments}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Ic name="share" size={13} stroke={1.6} /> {post.shares}
          </span>
          <span style={{ marginLeft: 'auto' }}>
            <Ic name="bookmark" size={13} stroke={1.6} />
          </span>
        </div>
      </div>
    </article>
  );
}

Object.assign(window, { PostCard, FactPill });
