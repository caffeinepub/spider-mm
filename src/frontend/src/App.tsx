import { useCallback, useEffect, useRef, useState } from "react";

// ─── Social Links ─────────────────────────────────────────────────────────────
const telegramUrl = "https://t.me/fordyplug";
const whatsappUrl = "https://wa.me/15485805487";
const instaUrl = "https://instagram.com/3mk.akshit";

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1 },
    );
    const els = document.querySelectorAll(".reveal");
    for (const el of els) observer.observe(el);
    return () => observer.disconnect();
  }, []);
}

// ─── Count-Up Hook ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - (1 - progress) ** 3;
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function CountUpNumber({ target, suffix }: { target: number; suffix: string }) {
  const { count, ref } = useCountUp(target);
  return (
    <span
      ref={ref}
      style={{
        fontFamily: "'Crimson Text', serif",
        fontWeight: 700,
        fontSize: "1.4em",
      }}
    >
      {count}
      {suffix}
    </span>
  );
}

// ─── Video Background ─────────────────────────────────────────────────────────
function VideoBackground() {
  return (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          pointerEvents: "none",
        }}
        src="/assets/842f100f1c2dae73b6bc248dd3fed955-019d40d1-ac47-74ac-b86e-04829b145b07.mp4"
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.62)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
    </>
  );
}

// ─── Stars ────────────────────────────────────────────────────────────────────
const STAR_IDS = ["s1", "s2", "s3", "s4", "s5"] as const;
const STAR_DELAYS: Record<string, number> = {
  s1: 0.4,
  s2: 0.5,
  s3: 0.6,
  s4: 0.7,
  s5: 0.8,
};

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div
      className="flex items-center gap-1 justify-center"
      aria-label={`${count} out of 5 stars`}
    >
      {STAR_IDS.slice(0, count).map((id) => (
        <span
          key={id}
          className="star-animate"
          aria-hidden="true"
          style={{
            animationDelay: `${STAR_DELAYS[id]}s`,
            fontSize: "1.2rem",
            color: "#e8e8e8",
            filter: "drop-shadow(0 0 4px rgba(255,255,255,0.5))",
            display: "inline-block",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
function IconArrow({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
function IconShield({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 2L3 7v8c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
    </svg>
  );
}
function IconTelegram({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}
function IconWhatsApp({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

// ─── Gold Icon SVGs (for stat cards) ─────────────────────────────────────────
function IconCheckGold() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconBoltGold() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13 2L4.09 12.5H11L10 22L20.91 11.5H14L13 2Z" />
    </svg>
  );
}
function IconBoltGold2() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function IconBellGold() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

// ─── Stat Cards Data ──────────────────────────────────────────────────────────
const statCardsData = [
  {
    icon: <IconCheckGold />,
    num: 500,
    suffix: "+",
    label: "Clients",
    desc: "Trusted by hundreds worldwide",
    floatClass: "stat-card-float-1",
  },
  {
    icon: <IconBoltGold />,
    num: 2,
    suffix: "+",
    label: "Years Experience",
    desc: "Professional and reliable service",
    floatClass: "stat-card-float-2",
  },
  {
    icon: <IconBoltGold2 />,
    num: null,
    suffix: "",
    label: "Fast Delivery",
    desc: "Quick turnaround time",
    floatClass: "stat-card-float-3",
  },
  {
    icon: <IconBellGold />,
    num: null,
    suffix: "",
    label: "24/7 Available",
    desc: "Always active on Telegram",
    floatClass: "stat-card-float-4",
  },
];

// ─── Stat Cards Section ───────────────────────────────────────────────────────
function StatCardsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setActiveIndex((prev) => (prev + 1) % statCardsData.length);
      } else {
        setActiveIndex(
          (prev) => (prev - 1 + statCardsData.length) % statCardsData.length,
        );
      }
    }
    touchStartX.current = null;
  }

  return (
    <>
      {/* Desktop: 4-column grid */}
      <div className="hidden md:grid grid-cols-4 gap-5">
        {statCardsData.map((card, i) => (
          <div key={card.label} className={`reveal reveal-delay-${i + 1}`}>
            <div className={`stat-card ${card.floatClass}`}>
              <div className="stat-icon-circle">{card.icon}</div>
              <h3
                style={{
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  color: "#F0F0EE",
                  marginBottom: 10,
                  lineHeight: 1.2,
                }}
              >
                {card.num !== null ? (
                  <>
                    <CountUpNumber target={card.num} suffix={card.suffix} />{" "}
                    {card.label}
                  </>
                ) : (
                  card.label
                )}
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                }}
              >
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: carousel with arrows + swipe */}
      <div
        className="md:hidden"
        style={{ position: "relative" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Arrows row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 20,
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            className="carousel-arrow"
            aria-label="Previous card"
            onClick={() =>
              setActiveIndex(
                (prev) =>
                  (prev - 1 + statCardsData.length) % statCardsData.length,
              )
            }
          >
            &#8249;
          </button>
          {/* Dots */}
          <div style={{ display: "flex", gap: 6 }}>
            {statCardsData.map((card, i) => (
              <button
                key={card.label}
                type="button"
                aria-label={`Go to card ${i + 1}`}
                onClick={() => setActiveIndex(i)}
                style={{
                  width: i === activeIndex ? 22 : 7,
                  height: 7,
                  borderRadius: 999,
                  background:
                    i === activeIndex
                      ? "rgba(212,170,80,0.85)"
                      : "rgba(255,255,255,0.2)",
                  border: "none",
                  cursor: "pointer",
                  transition: "width 0.3s ease, background 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
          <button
            type="button"
            className="carousel-arrow"
            aria-label="Next card"
            onClick={() =>
              setActiveIndex((prev) => (prev + 1) % statCardsData.length)
            }
          >
            &#8250;
          </button>
        </div>

        {/* Active card */}
        <div
          key={activeIndex}
          style={{
            animation: "fadeInScale 0.35s ease-out both",
          }}
        >
          <div
            className={`stat-card ${statCardsData[activeIndex].floatClass}`}
            style={{ maxWidth: 360, margin: "0 auto" }}
          >
            <div className="stat-icon-circle">
              {statCardsData[activeIndex].icon}
            </div>
            <h3
              style={{
                fontWeight: 800,
                fontSize: "1.35rem",
                color: "#F0F0EE",
                marginBottom: 12,
                lineHeight: 1.2,
              }}
            >
              {statCardsData[activeIndex].num !== null ? (
                <>
                  <CountUpNumber
                    target={statCardsData[activeIndex].num as number}
                    suffix={statCardsData[activeIndex].suffix}
                  />{" "}
                  {statCardsData[activeIndex].label}
                </>
              ) : (
                statCardsData[activeIndex].label
              )}
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
              }}
            >
              {statCardsData[activeIndex].desc}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── How-it-works icons ───────────────────────────────────────────────────────
function IconPeople() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(255,255,255,0.85)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconCard() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(255,255,255,0.85)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(255,255,255,0.85)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const steps = [
  {
    num: "01",
    icon: <IconPeople />,
    title: "Share Your Vision",
    desc: "Tell us what you need. Brief us on your brand, goals, and style preferences.",
  },
  {
    num: "02",
    icon: <IconCard />,
    title: "We Create",
    desc: "Our team brings your concept to life with professional tools and creative expertise.",
  },
  {
    num: "03",
    icon: <IconCheck />,
    title: "You Shine",
    desc: "Receive polished, ready-to-use visuals that elevate your brand instantly.",
  },
];

const stats = [
  { num: 500, suffix: "+", label: "Projects Done" },
  { num: 100, suffix: "%", label: "Client Satisfaction" },
  { num: 5, suffix: "★", label: "Rating" },
  { num: 24, suffix: "/7", label: "Available" },
];

const vouches = [
  {
    message: "Fordy delivered fast and clean, highly recommend!",
    username: "@cryptovibes",
  },
  {
    message:
      "Best Telegram graphics designer I've ever worked with. Super professional.",
    username: "@neontrader",
  },
  {
    message: "Insane quality, quick turnaround. Will definitely come back.",
    username: "@alphawave",
  },
  {
    message: "Exactly what I needed. Fordy understood the vision perfectly.",
    username: "@darknode",
  },
  {
    message: "Top tier work, no cap. The designs speak for themselves.",
    username: "@solflare99",
  },
  {
    message: "Fast, clean, professional. 10/10 would recommend to anyone.",
    username: "@phantom_x",
  },
];

// ─── Works Carousel ───────────────────────────────────────────────────────────
const worksItems = [
  {
    src: "/assets/img_2647-019d40eb-157d-771e-8ede-07cf6de1de91.jpg",
    label: "Middleman Banner",
  },
  {
    src: "/assets/img_2648-019d40eb-1617-721a-a4f2-267dc36897f1.jpg",
    label: "Logo Design",
  },
  {
    src: "/assets/img_2646-019d40eb-16b3-75d4-a94e-f2fa6a96f199.jpg",
    label: "Instagram Recovery",
  },
  {
    src: "/assets/img_2645-019d40eb-171c-7193-8210-57357324133e.jpg",
    label: "Social Lookups",
  },
  {
    src: "/assets/img_2643-019d40eb-1827-76f0-afbc-db66b8396e2c.jpg",
    label: "Verifications",
  },
  {
    src: "/assets/img_2644-019d40eb-197b-74ad-ac84-1ccca941f278.jpg",
    label: "Removals",
  },
];

function WorksCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animKey, setAnimKey] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const total = worksItems.length;

  const prev = () => {
    setDirection("prev");
    setAnimKey((k) => k + 1);
    setCurrentIndex((i) => (i - 1 + total) % total);
  };
  const next = useCallback(() => {
    setDirection("next");
    setAnimKey((k) => k + 1);
    setCurrentIndex((i) => (i + 1) % total);
  }, [total]);

  useEffect(() => {
    if (isHovered) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [isHovered, next]);

  const dragHandlers = {
    onMouseDown: (e: React.MouseEvent) => {
      dragStartX.current = e.clientX;
      isDragging.current = false;
    },
    onMouseMove: (e: React.MouseEvent) => {
      if (
        dragStartX.current !== null &&
        Math.abs(e.clientX - dragStartX.current) > 5
      )
        isDragging.current = true;
    },
    onMouseUp: (e: React.MouseEvent) => {
      if (dragStartX.current === null) return;
      const diff = e.clientX - dragStartX.current;
      if (isDragging.current) {
        if (diff < -40) next();
        else if (diff > 40) prev();
      }
      dragStartX.current = null;
      isDragging.current = false;
    },
    onTouchStart: (e: React.TouchEvent) => {
      dragStartX.current = e.touches[0].clientX;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (dragStartX.current === null) return;
      const diff = e.changedTouches[0].clientX - dragStartX.current;
      if (diff < -40) next();
      else if (diff > 40) prev();
      dragStartX.current = null;
    },
  };

  const leftIndex = (currentIndex - 1 + total) % total;
  const rightIndex = (currentIndex + 1) % total;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3-card cinematic layout */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "24px 0 32px",
        }}
      >
        {/* Left arrow */}
        <button
          type="button"
          className="works-nav-arrow"
          onClick={prev}
          aria-label="Previous work"
          data-ocid="portfolio.pagination_prev"
        >
          &#8249;
        </button>

        {/* Cards track — overflow hidden clips the side cards slightly */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            borderRadius: 20,
          }}
        >
          <div
            {...dragHandlers}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              padding: "16px 0",
              cursor: "grab",
            }}
          >
            {/* Left side card — dimmed, smaller */}
            <button
              type="button"
              className={`works-side-card ${direction === "next" ? "works-side-slide-next" : "works-side-slide-prev"}`}
              key={`left-${animKey}`}
              onClick={prev}
              aria-label={`Go to ${worksItems[leftIndex].label}`}
              style={{ padding: 0, background: "none", border: "none" }}
            >
              <img
                src={worksItems[leftIndex].src}
                alt={worksItems[leftIndex].label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </button>

            {/* Center featured card — large, smoky white glow */}
            <div
              className={`works-center-card ${direction === "next" ? "works-slide-next" : "works-slide-prev"}`}
              key={`center-${animKey}`}
            >
              <img
                src={worksItems[currentIndex].src}
                alt={worksItems[currentIndex].label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div className="works-center-label">
                <span
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.6)",
                    background: "rgba(0,0,0,0.55)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 999,
                    padding: "4px 14px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {worksItems[currentIndex].label}
                </span>
              </div>
            </div>

            {/* Right side card — dimmed, smaller */}
            <button
              type="button"
              className={`works-side-card ${direction === "next" ? "works-side-slide-next" : "works-side-slide-prev"}`}
              key={`right-${animKey}`}
              onClick={next}
              aria-label={`Go to ${worksItems[rightIndex].label}`}
              style={{ padding: 0, background: "none", border: "none" }}
            >
              <img
                src={worksItems[rightIndex].src}
                alt={worksItems[rightIndex].label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </button>
          </div>
        </div>

        {/* Right arrow */}
        <button
          type="button"
          className="works-nav-arrow"
          onClick={next}
          aria-label="Next work"
          data-ocid="portfolio.pagination_next"
        >
          &#8250;
        </button>
      </div>

      {/* Dot indicators */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 6,
          marginBottom: 28,
        }}
      >
        {worksItems.map((item, i) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to ${item.label}`}
            style={{
              width: i === currentIndex ? 22 : 7,
              height: 7,
              borderRadius: 999,
              background:
                i === currentIndex
                  ? "rgba(220,220,220,0.75)"
                  : "rgba(255,255,255,0.18)",
              border: "none",
              cursor: "pointer",
              transition: "width 0.3s ease, background 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* View More button */}
      <div style={{ textAlign: "center" }}>
        <a
          href="https://t.me/fordygraphics"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
          style={{
            padding: "11px 30px",
            fontSize: "0.9rem",
            display: "inline-block",
            textDecoration: "none",
          }}
          data-ocid="portfolio.button"
        >
          View More Works &#8594;
        </a>
      </div>
    </div>
  );
}

// ─── Vouch Slider ─────────────────────────────────────────────────────────────
function VouchSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [translateX, setTranslateX] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const total = vouches.length;

  const prev = () => setCurrentIndex((i) => (i - 1 + total) % total);
  const next = useCallback(
    () => setCurrentIndex((i) => (i + 1) % total),
    [total],
  );

  useEffect(() => {
    if (isHovered || isDragging) return;
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, [isHovered, isDragging, next]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
    setIsDragging(false);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartX === null) return;
    const diff = e.clientX - dragStartX;
    if (Math.abs(diff) > 5) {
      setIsDragging(true);
      setTranslateX(diff);
    }
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX === null) return;
    const diff = e.clientX - dragStartX;
    if (isDragging) {
      if (diff < -40) next();
      else if (diff > 40) prev();
    }
    setDragStartX(null);
    setIsDragging(false);
    setTranslateX(0);
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX === null) return;
    setTranslateX(e.touches[0].clientX - dragStartX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX === null) return;
    const diff = e.changedTouches[0].clientX - dragStartX;
    if (diff < -40) next();
    else if (diff > 40) prev();
    setDragStartX(null);
    setTranslateX(0);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTranslateX(0);
        setDragStartX(null);
        setIsDragging(false);
      }}
      data-ocid="vouches.panel"
    >
      {/* Arrow + Track row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Left arrow */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous vouch"
          data-ocid="vouches.pagination_prev"
          style={{
            flexShrink: 0,
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.55)",
            fontSize: "1.3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "opacity 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.1)";
            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.04)";
            (e.currentTarget as HTMLButtonElement).style.color =
              "rgba(255,255,255,0.55)";
          }}
        >
          &#8249;
        </button>

        {/* Slider track — overflow hidden */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div
            ref={trackRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              display: "flex",
              gap: 16,
              transform: `translateX(calc(${-currentIndex * (100 / 1.2)}% + ${translateX}px))`,
              transition: isDragging
                ? "none"
                : "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              cursor: isDragging ? "grabbing" : "grab",
              userSelect: "none",
            }}
          >
            {vouches.map((vouch, i) => (
              <div
                key={vouch.username}
                data-ocid={`vouches.item.${i + 1}`}
                style={{
                  flexShrink: 0,
                  width: "calc(100% / 1.2 - 12px)",
                  borderRadius: 24,
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  padding: "28px 24px",
                  boxSizing: "border-box",
                }}
              >
                {/* Quote mark */}
                <div
                  style={{
                    fontSize: "2.8rem",
                    lineHeight: 1,
                    color: "rgba(255,255,255,0.12)",
                    marginBottom: 10,
                    fontFamily: "Georgia, serif",
                    userSelect: "none",
                  }}
                >
                  &ldquo;
                </div>
                {/* Message */}
                <p
                  style={{
                    color: "#fff",
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    margin: "0 0 18px",
                    fontWeight: 400,
                  }}
                >
                  {vouch.message}
                </p>
                {/* Username + Telegram badge row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {vouch.username}
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      background: "rgba(41,182,246,0.10)",
                      color: "#29B6F6",
                      borderRadius: 999,
                      padding: "3px 10px",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      letterSpacing: "0.03em",
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="#29B6F6"
                      aria-label="Telegram"
                      role="img"
                    >
                      <title>Telegram</title>
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-2.04 9.607c-.153.682-.554.848-1.123.527l-3.1-2.286-1.496 1.44c-.165.165-.304.304-.624.304l.223-3.163 5.75-5.193c.25-.222-.054-.345-.387-.123L7.16 14.264l-3.05-.953c-.663-.207-.676-.663.138-.981l11.918-4.597c.552-.2 1.035.134.856.981-.002.003-.002.003-.002-.001l.002.001-.46-.467z" />
                    </svg>
                    Telegram
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right arrow */}
        <button
          type="button"
          onClick={next}
          aria-label="Next vouch"
          data-ocid="vouches.pagination_next"
          style={{
            flexShrink: 0,
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.55)",
            fontSize: "1.3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "opacity 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.1)";
            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.04)";
            (e.currentTarget as HTMLButtonElement).style.color =
              "rgba(255,255,255,0.55)";
          }}
        >
          &#8250;
        </button>
      </div>

      {/* Dot indicators */}
      <div
        style={{
          display: "flex",
          gap: 6,
          justifyContent: "center",
          marginTop: 22,
        }}
      >
        {vouches.map((v, i) => (
          <button
            key={v.username}
            type="button"
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to vouch ${i + 1}`}
            style={{
              width: i === currentIndex ? 22 : 7,
              height: 7,
              borderRadius: 999,
              background:
                i === currentIndex
                  ? "rgba(220,220,220,0.7)"
                  : "rgba(255,255,255,0.18)",
              border: "none",
              cursor: "pointer",
              transition: "width 0.3s ease, background 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  useScrollReveal();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ background: "#080808", minHeight: "100vh", color: "#fff" }}>
      <VideoBackground />

      {/* ─── NAV ─── */}
      <nav
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          background: "rgba(8,8,8,0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="max-w-6xl mx-auto px-6 flex items-center justify-between"
          style={{ height: 68 }}
        >
          <button
            className="flex items-center gap-2"
            style={{
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 0,
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-ocid="nav.link"
            type="button"
          >
            <div
              style={{
                width: 30,
                height: 30,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 7,
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              <IconShield size={13} />
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: "1.05rem",
                letterSpacing: "-0.01em",
                color: "#F5F5F0",
              }}
            >
              Fordy Graphics
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            <a href="#portfolio" className="nav-link" data-ocid="nav.link">
              Our Work
            </a>
            <a href="#vouches" className="nav-link" data-ocid="nav.link">
              Vouches
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="Telegram"
            >
              <IconTelegram size={15} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="WhatsApp"
            >
              <IconWhatsApp size={15} />
            </a>
            <a
              href={instaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="Instagram"
            >
              <IconInstagram size={15} />
            </a>
            <button
              type="button"
              className="btn-outline"
              style={{
                padding: "9px 20px",
                fontSize: "0.875rem",
                marginLeft: 4,
              }}
              onClick={() => window.open(telegramUrl, "_blank", "noopener")}
              data-ocid="nav.button"
            >
              <IconTelegram size={14} />
              Contact
            </button>
          </div>

          <button
            type="button"
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              style={{
                width: 22,
                height: 2,
                background: "#fff",
                display: "block",
                transition: "transform 0.2s",
                transform: mobileOpen
                  ? "rotate(45deg) translate(4px,4px)"
                  : "none",
              }}
            />
            <span
              style={{
                width: 22,
                height: 2,
                background: "#fff",
                display: "block",
                opacity: mobileOpen ? 0 : 1,
                transition: "opacity 0.2s",
              }}
            />
            <span
              style={{
                width: 22,
                height: 2,
                background: "#fff",
                display: "block",
                transition: "transform 0.2s",
                transform: mobileOpen
                  ? "rotate(-45deg) translate(4px,-4px)"
                  : "none",
              }}
            />
          </button>
        </div>

        {mobileOpen && (
          <div
            className="md:hidden px-6 pb-5 flex flex-col gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <button
              type="button"
              className="nav-link py-2 text-left"
              style={{ background: "none", border: "none", cursor: "pointer" }}
              onClick={() => {
                document
                  .getElementById("portfolio")
                  ?.scrollIntoView({ behavior: "smooth" });
                setMobileOpen(false);
              }}
            >
              Our Work
            </button>
            <button
              type="button"
              className="nav-link py-2 text-left"
              style={{ background: "none", border: "none", cursor: "pointer" }}
              onClick={() => {
                document
                  .getElementById("vouches")
                  ?.scrollIntoView({ behavior: "smooth" });
                setMobileOpen(false);
              }}
            >
              Vouches
            </button>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="Telegram"
              >
                <IconTelegram size={15} />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="WhatsApp"
              >
                <IconWhatsApp size={15} />
              </a>
              <a
                href={instaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="Instagram"
              >
                <IconInstagram size={15} />
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 68,
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 900,
            padding: "0 24px",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(3.8rem, 11vw, 110px)",
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              marginBottom: "1.4rem",
            }}
          >
            <span
              style={{
                display: "block",
                animation: "fadeInFromLeft 0.9s ease-out 0.1s both",
                background:
                  "linear-gradient(135deg, #FFFFFF 0%, #E8E8E8 40%, #C8C8C8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 40px rgba(255,255,255,0.18))",
                letterSpacing: "0.12em",
              }}
            >
              FORDY
            </span>
            <span
              style={{
                display: "block",
                width: "100%",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,0.2) 60%, transparent 90%)",
                margin: "8px auto 10px",
                animation: "fadeInUp 0.7s ease-out 0.25s both",
              }}
            />
            <span
              style={{
                display: "block",
                animation: "fadeInFromRight 0.9s ease-out 0.25s both",
                background:
                  "linear-gradient(135deg, #C0C0C0 0%, #FFFFFF 50%, #D8D8D8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 30px rgba(255,255,255,0.12))",
                letterSpacing: "0.28em",
                fontSize: "clamp(1.8rem, 5.5vw, 52px)",
                fontWeight: 300,
              }}
            >
              GRAPHICS
            </span>
          </h1>

          <p
            style={{
              fontSize: "1.15rem",
              fontWeight: 400,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
              marginBottom: "2.4rem",
              animation: "fadeInUp 0.7s ease-out 0.4s both",
            }}
          >
            Visuals That Hit Different.
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
              animation: "slideUp 0.6s ease-out 0.5s both",
              marginBottom: "2rem",
            }}
          >
            <button
              type="button"
              className="btn-hero"
              onClick={() => window.open(telegramUrl, "_blank", "noopener")}
              data-ocid="hero.primary_button"
            >
              <IconTelegram size={16} /> Get In Touch ↗
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-secondary"
              data-ocid="hero.secondary_button"
            >
              <IconWhatsApp size={16} /> WhatsApp
            </a>
          </div>

          <div style={{ animation: "fadeInUp 0.7s ease-out 0.65s both" }}>
            <p
              style={{
                fontSize: "0.88rem",
                fontWeight: 500,
                color: "rgba(255,255,255,0.45)",
                marginBottom: 8,
              }}
            >
              Premium Visuals · 500+ Projects · 5★ Rated
            </p>
            <StarRating />
          </div>
        </div>
      </section>

      {/* ─── WHY FORDY GRAPHICS (Stat Cards) ─── */}
      <section
        id="why-fordy"
        style={{ padding: "100px 0", position: "relative", zIndex: 2 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <span className="section-badge">Why Choose Me</span>
            <h2
              style={{
                fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#F0F0EE",
                marginTop: 14,
              }}
            >
              Why Choose Me?
            </h2>
          </div>

          <StatCardsSection />
        </div>
      </section>

      {/* ─── PORTFOLIO ─── */}
      <section
        id="portfolio"
        style={{ padding: "100px 0", position: "relative", zIndex: 2 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10 reveal">
            <span className="section-badge">Portfolio</span>
            <h2
              style={{
                fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
                fontWeight: 700,
                color: "#F0F0EE",
                marginTop: 14,
              }}
            >
              Works That Speak
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                marginTop: 12,
                maxWidth: 440,
                margin: "12px auto 0",
              }}
            >
              A glimpse of the visuals we create for brands that want to stand
              out.
            </p>
          </div>
          <WorksCarousel />
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section
        id="how-it-works"
        style={{ padding: "100px 0", position: "relative", zIndex: 2 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <span className="section-badge">Simple Process</span>
            <h2
              style={{
                fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#F0F0EE",
                marginTop: 14,
              }}
            >
              How We Work
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                <div
                  className={`glass-card p-7 h-full reveal reveal-delay-${i + 1}`}
                >
                  <div
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 7,
                      display: "inline-block",
                      padding: "4px 10px",
                      fontSize: "0.875rem",
                      fontWeight: 900,
                      marginBottom: 16,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {step.num}
                  </div>
                  <div className="mb-4">{step.icon}</div>
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      marginBottom: 10,
                      color: "#F0F0EE",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      lineHeight: 1.7,
                      fontSize: "0.93rem",
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:flex absolute top-1/2 -right-4 z-10 items-center justify-center"
                    style={{
                      transform: "translateY(-50%)",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    <IconArrow size={18} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VOUCHES ─── */}
      <section
        id="vouches"
        style={{
          padding: "100px 0",
          position: "relative",
          zIndex: 2,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 -1px 30px rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10 reveal">
            <span className="section-badge">Vouches</span>
            <h2
              style={{
                fontSize: "clamp(1.6rem,3vw,2.4rem)",
                fontWeight: 700,
                color: "#F0F0EE",
                marginTop: 14,
              }}
            >
              Client Vouches
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                marginTop: 10,
                fontSize: "0.93rem",
              }}
            >
              Real clients. Real results.
            </p>
          </div>

          <div className="text-center mb-12 reveal reveal-delay-1">
            <span
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 999,
                padding: "7px 22px",
                fontSize: "0.88rem",
                fontWeight: 700,
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "0.06em",
                animation: "pulse 3s ease-in-out infinite",
              }}
            >
              9 fordy : Gfx ✓
            </span>
          </div>

          {/* Horizontal vouch card slider */}
          <div className="reveal reveal-delay-2">
            <VouchSlider />
          </div>

          {/* View More Vouches button */}
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a
              href="https://t.me/fordyplug"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="vouches.secondary_button"
              style={{
                display: "inline-block",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "transparent",
                color: "#fff",
                borderRadius: 999,
                padding: "12px 32px",
                fontSize: "0.92rem",
                fontWeight: 600,
                letterSpacing: "0.03em",
                textDecoration: "none",
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(255,255,255,0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "transparent";
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(255,255,255,0.2)";
              }}
            >
              View More Vouches
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`reveal reveal-delay-${i + 1} text-center`}
              >
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: "1.8rem",
                    marginBottom: 4,
                    color: "#F0F0EE",
                    textShadow: "0 0 20px rgba(255,255,255,0.2)",
                  }}
                >
                  <CountUpNumber target={stat.num} suffix={stat.suffix} />
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "0.85rem",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        style={{
          padding: "100px 0",
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div className="max-w-2xl mx-auto px-6 text-center reveal">
          <h2
            style={{
              fontWeight: 900,
              fontSize: "clamp(1.8rem,4vw,3rem)",
              lineHeight: 1.1,
              color: "#F0F0EE",
              marginBottom: 16,
            }}
          >
            Ready To Work With Me?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              marginBottom: 36,
              fontSize: "1.02rem",
              lineHeight: 1.7,
            }}
          >
            Get High Quality Telegram Graphics Today
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              className="btn-hero"
              style={{ padding: "15px 36px" }}
              onClick={() =>
                window.open("https://t.me/fordyplug", "_blank", "noopener")
              }
              data-ocid="cta.primary_button"
            >
              <IconTelegram size={16} /> Contact Fordy
            </button>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "48px 0 32px",
          background: "rgba(5,5,5,0.95)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <button
                className="flex items-center gap-2 mb-4"
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: 0,
                }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                type="button"
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 6,
                    border: "1px solid rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  <IconShield size={12} />
                </div>
                <span style={{ fontWeight: 700, color: "#F5F5F0" }}>
                  Fordy Graphics
                </span>
              </button>
              <p
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                }}
              >
                Premium visual content &amp; graphic design. Visuals that hit
                different.
              </p>
            </div>

            <div>
              <h4
                style={{
                  fontWeight: 600,
                  marginBottom: 16,
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Navigation
              </h4>
              <div className="flex flex-col gap-2">
                <a
                  href="#portfolio"
                  className="nav-link"
                  style={{ fontSize: "0.875rem" }}
                >
                  Our Work
                </a>
                <a
                  href="#vouches"
                  className="nav-link"
                  style={{ fontSize: "0.875rem" }}
                >
                  Vouches
                </a>
                <a
                  href="#how-it-works"
                  className="nav-link"
                  style={{ fontSize: "0.875rem" }}
                >
                  How We Work
                </a>
              </div>
            </div>

            <div>
              <h4
                style={{
                  fontWeight: 600,
                  marginBottom: 16,
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Get in Touch
              </h4>
              <div
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: "0.875rem",
                  marginBottom: 16,
                  lineHeight: 1.8,
                }}
              >
                <div>Telegram: @fordyplug</div>
                <div>WhatsApp: +1 548 580 5487</div>
                <div>Instagram: @3mk.akshit</div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ padding: "8px 16px", fontSize: "0.82rem" }}
                >
                  <IconTelegram size={13} /> Telegram
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ padding: "8px 16px", fontSize: "0.82rem" }}
                >
                  <IconWhatsApp size={13} /> WhatsApp
                </a>
                <a
                  href={instaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ padding: "8px 16px", fontSize: "0.82rem" }}
                >
                  <IconInstagram size={13} /> Instagram
                </a>
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
              color: "rgba(255,255,255,0.25)",
              fontSize: "0.8rem",
            }}
          >
            <span>
              © {new Date().getFullYear()} Fordy Graphics. All rights reserved.
            </span>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255,255,255,0.25)",
                textDecoration: "none",
                fontSize: "0.8rem",
                transition: "color 0.2s",
              }}
            >
              Built with ♥ using caffeine.ai
            </a>
          </div>
        </div>
      </footer>

      {/* ─── FLOATING SOCIAL BUTTONS ─── */}
      <div
        style={{
          position: "fixed",
          bottom: "28px",
          right: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "12px",
          zIndex: 9999,
        }}
      >
        {/* WhatsApp */}
        <a
          href="https://wa.me/15485805487"
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
          aria-label="Chat on WhatsApp"
          data-ocid="whatsapp.button"
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: "rgba(10,10,10,0.85)",
            border: "1.5px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.5), 0 0 16px rgba(255,255,255,0.06)",
            transition:
              "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
            cursor: "pointer",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.12)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 6px 28px rgba(0,0,0,0.6), 0 0 24px rgba(255,255,255,0.14)";
            (e.currentTarget as HTMLElement).style.borderColor =
              "rgba(255,255,255,0.4)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 4px 20px rgba(0,0,0,0.5), 0 0 16px rgba(255,255,255,0.06)";
            (e.currentTarget as HTMLElement).style.borderColor =
              "rgba(255,255,255,0.18)";
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
              fill="rgba(255,255,255,0.85)"
            />
            <path
              d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.118 1.522 5.851L.057 23.5l5.797-1.521A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.877 0-3.647-.49-5.186-1.349l-.372-.22-3.44.903.918-3.352-.241-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
              fill="rgba(255,255,255,0.85)"
            />
          </svg>
          <span
            style={{
              position: "absolute",
              width: "1px",
              height: "1px",
              overflow: "hidden",
              clip: "rect(0,0,0,0)",
              whiteSpace: "nowrap",
            }}
          >
            Chat on WhatsApp
          </span>
        </a>

        {/* Telegram */}
        <a
          href="https://t.me/fordyplug"
          target="_blank"
          rel="noopener noreferrer"
          title="Message on Telegram"
          aria-label="Message on Telegram"
          data-ocid="telegram.button"
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: "rgba(10,10,10,0.85)",
            border: "1.5px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.5), 0 0 16px rgba(255,255,255,0.06)",
            transition:
              "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
            cursor: "pointer",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.12)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 6px 28px rgba(0,0,0,0.6), 0 0 24px rgba(255,255,255,0.14)";
            (e.currentTarget as HTMLElement).style.borderColor =
              "rgba(255,255,255,0.4)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 4px 20px rgba(0,0,0,0.5), 0 0 16px rgba(255,255,255,0.06)";
            (e.currentTarget as HTMLElement).style.borderColor =
              "rgba(255,255,255,0.18)";
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.965l-2.946-.918c-.64-.203-.654-.64.136-.954l11.492-4.43c.536-.194 1.006.131.952.558z"
              fill="rgba(255,255,255,0.85)"
            />
          </svg>
          <span
            style={{
              position: "absolute",
              width: "1px",
              height: "1px",
              overflow: "hidden",
              clip: "rect(0,0,0,0)",
              whiteSpace: "nowrap",
            }}
          >
            Message on Telegram
          </span>
        </a>

        {/* Auto-message Telegram CTA */}
        <a
          href="https://t.me/fordyplug?text=Hi%20Fordy!%20I%27m%20interested%20in%20your%20graphics%20services."
          target="_blank"
          rel="noopener noreferrer"
          title="Send auto message to Fordy"
          data-ocid="telegram.open_modal_button"
          style={{
            height: "36px",
            borderRadius: "18px",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "0 14px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
            transition:
              "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
            cursor: "pointer",
            textDecoration: "none",
            fontSize: "0.72rem",
            fontWeight: 600,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
            (e.currentTarget as HTMLElement).style.background =
              "rgba(255,255,255,0.12)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLElement).style.background =
              "rgba(255,255,255,0.07)";
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="rgba(255,255,255,0.7)"
            aria-hidden="true"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.965l-2.946-.918c-.64-.203-.654-.64.136-.954l11.492-4.43c.536-.194 1.006.131.952.558z" />
          </svg>
          Message Fordy
        </a>
      </div>
    </div>
  );
}
