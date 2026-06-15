import { useEffect, useState, type MouseEvent } from 'react';

type Spot = {
  id: string;
  tag: string;
  sub: string;
  href: string;
  color: string;
  x: number;
  y: number;
  w: number;
  h: number;
  log: string;
  warn?: boolean;
};

/**
 * 「部屋＝メニュー」全画面コンソール。
 * 部屋は public/room/room-f{1,2,3}.png を ~3.3fps でクロスサイクルして動かす
 * （ドット絵の 3 フレームループ）。各 .spot はアート内オブジェクトに重ねたナビ。
 * 座標(x,y,w,h は画面%)はアートに合わせて調整する。docs/room-sprite-spec.md 参照。
 */
const SPOTS: Spot[] = [
  { id: 'desk', tag: 'DESK', sub: 'profile', href: '/profile', color: '#2ee6ff', x: 78, y: 43, w: 11, h: 16, log: '/dev/desk :: 開発中… compiling reality' },
  { id: 'shelf', tag: 'BOOKSHELF', sub: 'blog', href: '/posts', color: '#7b5cff', x: 27, y: 38, w: 26, h: 44, log: '/var/books :: 読書中… paging memory' },
  { id: 'server', tag: 'SERVER', sub: 'services', href: '/services', color: '#ff2e88', x: 34, y: 64, w: 12, h: 18, log: '/srv :: ERR thermal — venting smoke', warn: true },
  { id: 'toolbox', tag: 'TOOLBOX', sub: 'tools', href: '/tools', color: '#2ee6ff', x: 68, y: 65, w: 13, h: 18, log: '/opt/tools :: spanner.exe ready' },
  { id: 'mail', tag: 'MAIL', sub: 'contact', href: '/contact', color: '#7b5cff', x: 43, y: 33, w: 10, h: 30, log: '/var/mail :: 1 unread — ping' },
];

const FRAMES = [
  '/room/room-f01.png',
  '/room/room-f02.png',
  '/room/room-f03.png',
  '/room/room-f04.png',
  '/room/room-f05.png',
  '/room/room-f06.png',
];

const BOOT: { txt: string; cls?: string }[] = [
  { txt: '> establishing uplink → tanmen.work' },
  { txt: '> bypassing ICE ████████ OK', cls: 'ok' },
  { txt: '> cracking /root/.identity  0x4f2a9c…' },
  { txt: '> ACCESS GRANTED', cls: 'grant' },
  { txt: '> mounting /home/tanmen/room', cls: 'ok' },
  { txt: '怠惰なプログラマーの部屋へようこそ', cls: 'welcome' },
];

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 侵入イントロは初回訪問のみ。2回目以降は localStorage フラグで即・部屋表示にする。
const VISITED_KEY = 'tanmen:room-visited';
const hasVisited = () => {
  try {
    return localStorage.getItem(VISITED_KEY) === '1';
  } catch {
    return false;
  }
};
const markVisited = () => {
  try {
    localStorage.setItem(VISITED_KEY, '1');
  } catch {
    // localStorage 不可（プライベートモード等）— その場合は毎回イントロでよい
  }
};

export default function NeonRoom() {
  const [shown, setShown] = useState<string[]>(() => BOOT.map(() => ''));
  const [phase, setPhase] = useState<'boot' | 'live'>('boot');
  const [frame, setFrame] = useState(0);
  const [active, setActive] = useState<Spot | null>(null);
  const [entering, setEntering] = useState(false);
  // per-object active overlays load from /room/active/<id>-active-f0N.png when present;
  // if the asset 404s we mark it unavailable and fall back to the glow highlight only.
  const [unavail, setUnavail] = useState<Record<string, boolean>>({});

  // boot / cracking sequence — types each line to completion, cancels cleanly
  useEffect(() => {
    if (reduced() || hasVisited()) {
      setShown(BOOT.map((b) => b.txt));
      setPhase('live');
      markVisited();
      return;
    }
    let cancelled = false;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const t = setTimeout(() => {
          timers.delete(t);
          resolve();
        }, ms);
        timers.add(t);
      });

    (async () => {
      await sleep(350);
      for (let li = 0; li < BOOT.length; li += 1) {
        const line = BOOT[li].txt;
        for (let ci = 1; ci <= line.length; ci += 1) {
          if (cancelled) return;
          setShown((prev) => {
            const next = [...prev];
            next[li] = line.slice(0, ci); // ci runs through line.length → full line
            return next;
          });
          await sleep(18);
        }
        await sleep(260);
      }
      if (cancelled) return;
      await sleep(550);
      if (!cancelled) {
        markVisited();
        setPhase('live');
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      timers.clear();
    };
  }, []);

  // 3-frame pixel-art loop
  useEffect(() => {
    if (phase !== 'live' || reduced()) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), 160);
    return () => clearInterval(id);
  }, [phase]);

  const enter = (s: Spot, e: MouseEvent<HTMLAnchorElement>) => {
    if (reduced()) return;
    e.preventDefault();
    setActive(s);
    setEntering(true);
    setTimeout(() => {
      window.location.href = s.href;
    }, 480);
  };

  return (
    <div className="game game--full" data-enter={entering}>
      <div className="game-bar">
        <span className="game-dot" style={{ background: '#ff3d71' }} />
        <span className="game-dot" style={{ background: '#ffd23f' }} />
        <span className="game-dot" style={{ background: '#2ee6ff' }} />
        <span style={{ marginLeft: '0.4rem' }}>root@tanmen:~# ./enter_room.sh</span>
        <span style={{ marginLeft: 'auto' }}>{phase === 'live' ? 'ROOM ONLINE' : 'BREACHING…'}</span>
      </div>

      <div className="game-screen" data-focus={active ? 'true' : undefined}>
        <div className="room-art" data-on={phase === 'live'}>
          {FRAMES.map((src, i) => (
            <img key={src} src={src} alt="" aria-hidden="true" className="room-frame" style={{ opacity: frame === i ? 1 : 0 }} />
          ))}

          {phase === 'live' &&
            SPOTS.map((s) => (
              <a
                key={s.id}
                href={s.href}
                className="spot"
                style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.w}%`, height: `${s.h}%`, color: s.color }}
                aria-label={`${s.tag} — ${s.sub}`}
                onMouseEnter={() => setActive(s)}
                onFocus={() => setActive(s)}
                onMouseLeave={() => setActive((a) => (a?.id === s.id ? null : a))}
                onBlur={() => setActive((a) => (a?.id === s.id ? null : a))}
                onClick={(e) => enter(s, e)}
              >
                <span className="spot-mark" />
                <span className="spot-reticle" aria-hidden="true" />
                <span className="spot-label">{s.tag} · {s.sub}</span>
                {active?.id === s.id && !unavail[s.id] && (
                  <span className="spot-active" aria-hidden="true">
                    {FRAMES.map((_, i) => (
                      <img
                        key={i}
                        src={`/room/active/${s.id}-active-f0${i + 1}.png`}
                        alt=""
                        className="spot-active-frame"
                        style={{ opacity: frame === i ? 1 : 0 }}
                        onError={() => setUnavail((u) => ({ ...u, [s.id]: true }))}
                      />
                    ))}
                  </span>
                )}
              </a>
            ))}
        </div>

        <span className="game-corner" style={{ top: 8, left: 8, borderTop: '1px solid', borderLeft: '1px solid' }} />
        <span className="game-corner" style={{ top: 8, right: 8, borderTop: '1px solid', borderRight: '1px solid' }} />
        <span className="game-corner" style={{ bottom: 8, left: 8, borderBottom: '1px solid', borderLeft: '1px solid' }} />
        <span className="game-corner" style={{ bottom: 8, right: 8, borderBottom: '1px solid', borderRight: '1px solid' }} />

        <div className="game-boot" data-hide={phase === 'live'} aria-hidden={phase === 'live'}>
          {shown.map((t, i) => (t ? <div key={i} className={BOOT[i].cls}>{t}</div> : null))}
          {phase === 'boot' && <span className="caret" />}
        </div>

        <div className="game-scanlines" />
      </div>

      <div className="game-log" aria-live="polite">
        {active ? (
          <>
            <span className={active.warn ? 'warn' : 'k'}>{active.warn ? '!!' : '▸'}</span> {active.log}
          </>
        ) : (
          <>
            <span className="k">$</span> hover a node to explore the room — click to enter
          </>
        )}
      </div>
    </div>
  );
}
