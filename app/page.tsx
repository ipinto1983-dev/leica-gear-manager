"use client";

import { useState, type CSSProperties } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  ArrowUpRight,
  Bot,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  DatabaseBackup,
  Download,
  Grid2X2,
  MapPin,
  Moon,
  MoreHorizontal,
  Plus,
  Save,
  Search,
  Settings2,
  ShoppingBag,
  Sun,
  Table2,
  TrendingUp,
  X,
} from "lucide-react";

const nav = ["Dashboard", "Collection", "Catalog", "Trips", "Trade", "Vault"];
const gear = [
  {
    name: "Summilux-M 50mm ASPH.",
    code: "11891 · Black Chrome",
    meta: "2014 — Present",
    price: "$3,850",
    tone: "silver",
    tag: "OPTICS",
    serial: "Serial 1892441",
    condition: "A+ · Light brassing",
    mount: "M bayonet",
    acquired: "Mar 2019",
    spec: "50mm f/1.4",
  },
  {
    name: "Leica M11 Monochrom",
    code: "20200 · Black Paint",
    meta: "2022 — Present",
    price: "$6,900",
    tone: "black",
    tag: "BODY",
    serial: "Serial 5118020",
    condition: "A · Clean",
    mount: "M bayonet",
    acquired: "Jun 2022",
    spec: "60MP / Full Frame",
  },
  {
    name: "Noctilux-M 50mm f/0.95",
    code: "11602 · ASPH.",
    meta: "2008 — Present",
    price: "$9,100",
    tone: "brass",
    tag: "OPTICS",
    serial: "Serial 4108559",
    condition: "Mint · Boxed",
    mount: "M bayonet",
    acquired: "Jun 2022",
    spec: "50mm f/0.95",
  },
  {
    name: "Leica Q3",
    code: "19000 · Reporter",
    meta: "2023 — Present",
    price: "$5,950",
    tone: "graphite",
    tag: "BODY",
    serial: "Serial 5200118",
    condition: "A+ · Unmarked",
    mount: "Fixed lens",
    acquired: "Nov 2023",
    spec: "60MP / Full Frame",
  },
  {
    name: "APO-Summicron-M 35mm",
    code: "11699 · ASPH.",
    meta: "2015 — Present",
    price: "$4,800",
    tone: "silver",
    tag: "OPTICS",
    serial: "Serial 4680120",
    condition: "A · Clean glass",
    mount: "M bayonet",
    acquired: "Sep 2021",
    spec: "35mm f/2",
  },
  {
    name: "Leica M-A (Typ 127)",
    code: "10370 · Silver Chrome",
    meta: "2014 — Present",
    price: "$5,450",
    tone: "chrome",
    tag: "BODY",
    serial: "Serial 4811035",
    condition: "A · Hood marks",
    mount: "M bayonet",
    acquired: "Aug 2023",
    spec: "Film / 35mm",
  },
  {
    name: "Leica R-Adapter L",
    code: "18771 · R-to-L Mount Adapter",
    meta: "2015 — Present",
    price: "$850",
    tone: "graphite",
    tag: "ADAPTER",
    serial: "Serial 4920112",
    condition: "Mint",
    mount: "L mount",
    acquired: "Oct 2024",
    spec: "R-to-L Mount Adapter",
  },
  {
    name: "Leica APO-Macro-Elmarit-R 100mm f/2.8",
    code: "11256 · APO-Macro-Elmarit-R",
    meta: "1996 — Present",
    price: "$2,400",
    tone: "brass",
    tag: "OPTICS",
    serial: "Serial 3819204",
    condition: "A+",
    mount: "R bayonet",
    acquired: "Jan 2025",
    spec: "R-Bayonet / 100mm f/2.8",
  },
  {
    name: "Leica SL2",
    code: "10854 · Full Frame Mirrorless",
    meta: "2019 — Present",
    price: "$4,200",
    tone: "black",
    tag: "BODY",
    serial: "Serial 5512049",
    condition: "A · Clean",
    mount: "L mount",
    acquired: "Feb 2025",
    spec: "L-Mount / 47MP / Full Frame",
  },
];

function GearVisual({ tone, category }: { tone: string; category?: string }) {
  const kind =
    category === "BODY" ? "body" : category === "OPTICS" ? "lens" : "accessory";
  return (
    <div
      className={`gear-visual gear-${kind}`}
      aria-hidden="true"
    />
  );
}

function GearCard({
  item,
  onClick,
}: {
  item: (typeof gear)[number];
  onClick: () => void;
}) {
  return (
    <button className="gear-card" onClick={onClick} type="button">
      <div className="card-visual-wrap">
        <GearVisual tone={item.tone} category={item.tag} />
        <span className="card-category">{item.tag}</span>
        <span className="mount-watermark">{item.mount.charAt(0)}</span>
      </div>
      <div className="gear-card-info">
        <div>
          <div className="card-topline">
            <span>{item.code.split(" · ")[0]}</span>
            <span>{item.acquired}</span>
          </div>
          <h3>{item.name}</h3>
          <p className="card-spec">{item.spec}</p>
        </div>
        <strong>{item.price}</strong>
      </div>
    </button>
  );
}

function CollectionTable({
  items,
  onSelect,
}: {
  items: typeof gear;
  onSelect: (item: (typeof gear)[number]) => void;
}) {
  return (
    <div className="collection-table-wrap">
      <div className="collection-table collection-table-head">
        <span>Instrument</span>
        <span>Catalog</span>
        <span>Category</span>
        <span>Condition</span>
        <span>Valuation</span>
      </div>
      {items.map((item) => (
        <button
          key={item.name}
          className="collection-table collection-table-row"
          onClick={() => onSelect(item)}
          type="button"
        >
          <strong>{item.name}</strong>
          <span>{item.code.split(" · ")[0]}</span>
          <span>{item.tag}</span>
          <span>{item.condition}</span>
          <span>{item.price}</span>
        </button>
      ))}
    </div>
  );
}

function TimelineNode({
  era,
  title,
  detail,
}: {
  era: string;
  title: string;
  detail: string;
}) {
  return (
    <div className="timeline-node">
      <i />
      <span>{era}</span>
      <b>{title}</b>
      <p>{detail}</p>
    </div>
  );
}

function TargetCard({
  name,
  code,
  tone,
  price,
}: {
  name: string;
  code: string;
  tone: string;
  price: string;
}) {
  return (
    <div className="target-item">
      <div className={`target-visual ${tone}`}>
        <span className="target-ref">{code}</span>
        <div className="wireframe" />
        <span className="target-watermark">Wish</span>
      </div>
      <div className="target-meta">
        <strong>{price}</strong>
        <h3>{name}</h3>
        <p>Active watch across verified European dealers.</p>
      </div>
    </div>
  );
}

function TripPlanner() {
  return (
    <div className="trip-layout">
      <div className="trip-sidebar">
        <div className="eyebrow">EXPEDITIONS</div>
        <h3>Planned journeys</h3>
        <button className="trip-item trip-selected" type="button">
          <MapPin />
          <div>
            <span>Dolomites High Route</span>
            <small>18 — 24 OCT 2026</small>
          </div>
          <ChevronRight />
        </button>
      </div>
      <div className="panel">
        <div className="report-head">
          <div>
            <div className="eyebrow">EXPEDITION DOSSIER</div>
            <h2>Dolomites High Route</h2>
          </div>
          <Badge variant="outline">Confirmed</Badge>
        </div>
        <div className="trip-visuals">
          <div className="landscape-banner">
            <span>ALPINE REGION · IT</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TradeLedger() {
  return (
    <div className="trade-grid">
      <div className="panel">
        <div className="eyebrow">ACQUISITION QUEUE</div>
        <h3>Active offers</h3>
        <div className="trade-item">
          <div className="trade-thumb">
            <ShoppingBag />
          </div>
          <div>
            <h3>Summicron-M 28mm ASPH.</h3>
            <p>Offer submitted to Leica Store Munich</p>
          </div>
          <strong>$3,200</strong>
        </div>
      </div>
      <div className="panel">
        <div className="eyebrow">DISPOSITION</div>
        <h3>Consignment tracker</h3>
        <div className="trade-item">
          <div className="trade-thumb">
            <ShoppingBag />
          </div>
          <div>
            <h3>Elmarit-M 90mm</h3>
            <p>Listed with Wetzlar vintage registry</p>
          </div>
          <strong>$1,150</strong>
        </div>
      </div>
    </div>
  );
}

function Vault() {
  return (
    <div className="vault-panel panel">
      <div className="eyebrow">LOCAL VAULT STORAGE</div>
      <h3>IndexedDB secure container</h3>
      <p style={{ marginTop: "12px", color: "var(--muted-foreground)" }}>
        All camera serial numbers, custom tags, and service history records remain strictly offline in your browser instance.
      </p>
      <div className="vault-table">
        <div className="eyebrow" style={{ display: "grid", gridTemplateCoding: "45px 1.5fr 1fr 1fr" }}>
          <span>ID</span>
          <span>Record Type</span>
          <span>Checksum</span>
          <span>Status</span>
        </div>
        <div>
          <span>01</span>
          <strong>Metadata Index</strong>
          <em>SHA-256</em>
          <small>Synchronized</small>
        </div>
        <div>
          <span>02</span>
          <strong>Image Assets</strong>
          <em>Local Blob</em>
          <small>Verified</small>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState("Dashboard");
  const [dark, setDark] = useState(true);
  const [assistant, setAssistant] = useState(false);
  const [selected, setSelected] = useState<(typeof gear)[number] | null>(null);
  const [showTimeline, setShowTimeline] = useState(true);
  const [collectionMode, setCollectionMode] = useState<"grid" | "table">("grid");
  const [collectionFilter, setCollectionFilter] = useState<
    "ALL" | "BODY" | "OPTICS" | "ADAPTER" | "ACCESSORY"
  >("ALL");
  const [query, setQuery] = useState("");
  const [scale, setScale] = useState<"S" | "L">("S");
  const [helpOpen, setHelpOpen] = useState(false);
  const [backupOpen, setBackupOpen] = useState(false);

  const filtered = gear.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );
  const collectionItems =
    collectionFilter === "ALL"
      ? gear
      : gear.filter((item) => item.tag === collectionFilter);
  const totalValue = gear.reduce(
    (sum, item) => sum + Number(item.price.replace(/[$,]/g, "")),
    0,
  );
  const totalCount = gear.length;
  const insuredCount = 8;
  const categoryCounts = {
    BODY: gear.filter((item) => item.tag === "BODY").length,
    OPTICS: gear.filter((item) => item.tag === "OPTICS").length,
    ADAPTER: gear.filter((item) => item.tag === "ADAPTER").length,
    ACCESSORY: gear.filter((item) => item.tag === "ACCESSORY").length,
  };
  const collectionSections = [
    {
      key: "BODY",
      label: "Camera Bodies",
      items: collectionItems.filter((item) => item.tag === "BODY"),
    },
    {
      key: "OPTICS",
      label: "Lenses",
      items: collectionItems.filter((item) => item.tag === "OPTICS"),
    },
    {
      key: "ADAPTER",
      label: "Adapters",
      items: collectionItems.filter((item) => item.tag === "ADAPTER"),
    },
    {
      key: "ACCESSORY",
      label: "Accessories",
      items: collectionItems.filter((item) => item.tag === "ACCESSORY"),
    },
  ];

  return (
    <div
      className={`${dark ? "app-shell dark-shell" : "app-shell light-shell"} ${scale === "L" ? "large-text" : ""}`}
      style={{ "--app-scale": scale === "L" ? 1.15 : 1 } as CSSProperties}
    >
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">GM</span>
          <span className="brand-copy">
            <strong>Photo Gear Manager</strong>
            <small>LEICA EDITION</small>
          </span>
        </div>
        <nav className="main-nav">
          {nav.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={active === item ? "nav-active" : ""}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="top-actions">
          <button
            className="utility-button"
            aria-label="Save and backup"
            title="Save / backup"
            onClick={() => setBackupOpen(true)}
          >
            <Save />
          </button>
          <button
            className="icon-button"
            aria-label="Help"
            onClick={() => setHelpOpen(true)}
          >
            <CircleHelp />
          </button>
          <button
            className="icon-button"
            aria-label="Toggle theme"
            onClick={() => setDark(!dark)}
          >
            {dark ? <Sun /> : <Moon />}
          </button>
          <button
            className="text-scale-toggle"
            onClick={() => setScale(scale === "S" ? "L" : "S")}
            aria-label="Toggle text size"
          >
            <span className={scale === "S" ? "scale-current" : ""}>
              A<sup>−</sup>
            </span>
            <span className={scale === "L" ? "scale-current" : ""}>
              A<sup>+</sup>
            </span>
          </button>
          <button className="avatar">IP</button>
        </div>
      </header>

      <main className="content-wrap" style={{ zoom: "var(--app-scale)" }}>
        {active !== "Collection" && (
          <div className="page-intro">
            <div>
              <div className="eyebrow">
                {active === "Dashboard"
                  ? "OVERVIEW / 08 OCT 2026"
                  : `${active.toUpperCase()} / WORKSPACE`}
              </div>
              <h1>
                {active === "Dashboard" ? "The connoisseur’s index." : active}
              </h1>
              <p>
                {active === "Dashboard"
                  ? "A considered view of your photographic instruments."
                  : `Curate, compare and document your ${active.toLowerCase()} with precision.`}
              </p>
            </div>
            <Button
              className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-mono text-xs font-semibold tracking-[0.15em] uppercase px-4 h-10 rounded-xl inline-flex items-center justify-center gap-2 border-0 shadow-xs cursor-pointer transition-colors duration-150 shrink-0"
              onClick={() => setActive("Catalog")}
            >
              <Plus data-icon="inline-start" /> Add gear
            </Button>
          </div>
        )}

        {active === "Dashboard" && (
          <>
            <section className="metric-grid">
              <div className="metric-card">
                <span>COLLECTION VALUE</span>
                <strong>$48,920</strong>
                <small>
                  <TrendingUp /> 12.4% vs last quarter
                </small>
              </div>
              <div className="metric-card">
                <span>INSTRUMENTS</span>
                <strong>24</strong>
                <small>18 lenses · 6 bodies</small>
              </div>
              <div className="metric-card">
                <span>OPEN HUNT</span>
                <strong>07</strong>
                <small>3 high priority targets</small>
              </div>
              <div className="metric-card accent-card">
                <span>NEXT EXPEDITION</span>
                <strong>DOLOMITES</strong>
                <small>
                  18 — 24 OCT 2026 <ArrowUpRight />
                </small>
              </div>
            </section>
            <div className="section-heading">
              <div>
                <div className="eyebrow">RECENTLY ACQUIRED</div>
                <h2>In focus</h2>
              </div>
              <button
                className="text-link"
                onClick={() => setActive("Collection")}
              >
                View collection <ArrowUpRight />
              </button>
            </div>
            <section className="gear-grid">
              {gear.slice(0, 3).map((item) => (
                <GearCard
                  key={item.name}
                  item={item}
                  onClick={() => setSelected(item)}
                />
              ))}
            </section>
            <section className="bottom-grid">
              <div className="panel activity-panel">
                <div className="panel-head">
                  <div>
                    <div className="eyebrow">FIELD NOTES</div>
                    <h3>Latest activity</h3>
                  </div>
                  <MoreHorizontal />
                </div>
                {[
                  ["02 OCT", "Added", "Summilux-M 50mm ASPH.", "11626"],
                  ["28 SEP", "Updated valuation", "M11 Monochrom", "+$320"],
                  [
                    "18 SEP",
                    "Trip complete",
                    "Lisbon / September Light",
                    "ARCHIVE",
                  ],
                ].map((row) => (
                  <div className="activity-row" key={row[0]}>
                    <span>{row[0]}</span>
                    <div>
                      <b>{row[1]}</b>
                      <p>{row[2]}</p>
                    </div>
                    <em>{row[3]}</em>
                  </div>
                ))}
              </div>
              <div className="panel signal-panel">
                <div className="panel-head">
                  <div>
                    <div className="eyebrow">MARKET SIGNAL</div>
                    <h3>Watchlist pulse</h3>
                  </div>
                  <span className="live-dot">LIVE</span>
                </div>
                <div className="signal-chart">
                  <div className="chart-line" />
                  <span className="chart-value">+8.7%</span>
                </div>
                <p>
                  Summilux 50mm ASPH. demand is trending upward across 14
                  tracked listings.
                </p>
                <button
                  className="text-link"
                  onClick={() => setActive("Trade")}
                >
                  Open trade ledger <ArrowUpRight />
                </button>
              </div>
            </section>
          </>
        )}

        {active === "Catalog" && (
          <>
            <div className="toolbar">
              <div className="search-wrap">
                <Search />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, order number or era..."
                />
              </div>
              <Badge variant="outline">24 instruments</Badge>
              <Button variant="outline">
                <Settings2 data-icon="inline-start" /> Filters
              </Button>
            </div>
            <section className="gear-grid catalog-grid">
              {filtered.map((item) => (
                <GearCard
                  key={item.name}
                  item={item}
                  onClick={() => setSelected(item)}
                />
              ))}
            </section>
            <div className="panel timeline-panel">
              <button
                className="timeline-toggle"
                onClick={() => setShowTimeline(!showTimeline)}
              >
                <div>
                  <div className="eyebrow">OPTICAL LINEAGE / 50MM</div>
                  <h3>Summilux family evolution</h3>
                </div>
                {showTimeline ? <ChevronDown /> : <ChevronRight />}
              </button>
              {showTimeline && (
                <div className="timeline">
                  <TimelineNode
                    era="1959"
                    title="v1 Rigid"
                    detail="Universal 11114 · Walter Mandler"
                  />
                  <TimelineNode
                    era="1994"
                    title="v4 Pre-ASPH."
                    detail="11891 · Mandler optical design"
                  />
                  <TimelineNode
                    era="2004"
                    title="v5 ASPH."
                    detail="11891 · Peter Karbe optical design"
                  />
                </div>
              )}
            </div>
          </>
        )}

        {active === "Collection" && (
          <section className="collection-view">
            <div className="collection-hero">
              <div>
                <h2 className="text-6xl sm:text-7xl lg:text-[5.25rem] font-black tracking-tight text-zinc-900 dark:text-zinc-100 leading-[0.92] mb-3">
                  Your Collection
                </h2>
                <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-medium mt-4 sm:mt-5 collection-hero-subtitle">
                  Registered Leica bodies, glass, and optics.
                </p>
              </div>
              <div className="collection-hero-actions lg:col-span-4 flex justify-end items-center w-full">
                <div className="bg-zinc-100 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl py-4 px-5 shadow-xs inline-flex w-fit max-w-full ml-auto transition-all duration-200 overflow-hidden">
                  <div className="flex items-start justify-center gap-4 sm:gap-5">
                    <div className="flex flex-col items-center justify-start text-center shrink-0">
                      <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-zinc-500 dark:text-zinc-400 font-semibold mb-1.5 whitespace-nowrap">
                        TOTAL VALUE
                      </span>
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium tracking-tight tabular-nums text-zinc-900 dark:text-zinc-100 leading-none py-0.5 whitespace-nowrap">
                        ${totalValue.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-8.5 w-[1px] bg-zinc-300/60 dark:bg-zinc-800/80 self-center shrink-0 mt-0.5" />
                    <div className="flex flex-col items-center justify-start text-center shrink-0">
                      <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-zinc-500 dark:text-zinc-400 font-semibold mb-1.5 whitespace-nowrap">
                        COVERAGE
                      </span>
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium tabular-nums leading-none py-0.5 whitespace-nowrap">
                        <span
                          className={
                            insuredCount === totalCount
                              ? "text-zinc-900 dark:text-zinc-100"
                              : "text-red-600 dark:text-red-500"
                          }
                        >
                          {insuredCount}
                        </span>
                        <span className="text-zinc-400 dark:text-zinc-600 font-sans text-xl sm:text-2xl mx-0.5">
                          /
                        </span>
                        <span className="text-zinc-900 dark:text-zinc-100 font-serif">
                          {totalCount}
                        </span>
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-sans text-zinc-500 dark:text-zinc-400 font-medium mt-1.5 whitespace-nowrap">
                        Assets Insured
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex items-center justify-between w-full py-4 border-b border-zinc-200 dark:border-zinc-800 gap-4 collection-anchor-divider"
              role="group"
              aria-label="Filter collection"
            >
              <div className="inline-flex items-center gap-1 p-1 h-10 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shrink-0 w-auto max-w-none overflow-x-visible whitespace-nowrap">
                {[
                  ["ALL", gear.length],
                  ["BODY", categoryCounts.BODY],
                  ["OPTICS", categoryCounts.OPTICS],
                  ["ADAPTER", categoryCounts.ADAPTER],
                  ["ACCESSORY", categoryCounts.ACCESSORY],
                ].map(([key, count]) => {
                  const isActive = collectionFilter === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() =>
                        setCollectionFilter(key as typeof collectionFilter)
                      }
                      className={`h-8 px-3 inline-flex items-center gap-1.5 rounded-lg text-xs font-mono tracking-[0.1em] uppercase transition-all duration-150 cursor-pointer shrink-0 whitespace-nowrap ${
                        isActive
                          ? "!bg-red-600 !text-white font-semibold shadow-xs"
                          : "!text-zinc-600 dark:!text-zinc-400 hover:!text-zinc-900 dark:hover:!text-white hover:!bg-zinc-200/60 dark:hover:!bg-zinc-800/60 font-medium"
                      }`}
                    >
                      <span>
                        {key === "BODY"
                          ? "BODIES"
                          : key === "OPTICS"
                            ? "LENSES"
                            : key === "ADAPTER"
                              ? "ADAPTERS"
                              : key === "ACCESSORY"
                                ? "ACCESSORIES"
                                : "ALL"}
                      </span>
                      <span
                        className={
                          isActive
                            ? "!text-white/80"
                            : "!text-red-600 dark:!text-red-500 font-semibold"
                        }
                      >
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-3 bg-transparent p-0 border-0 shadow-none">
                <Button
                  className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-mono text-xs font-semibold tracking-[0.15em] uppercase px-4 h-10 rounded-xl inline-flex items-center justify-center gap-2 border-0 shadow-xs cursor-pointer transition-colors duration-150 shrink-0"
                  onClick={() => setActive("Catalog")}
                >
                  <Plus data-icon="inline-start" /> Add gear
                </Button>
                <div
                  className="inline-flex items-center gap-1 p-1 h-10 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-
