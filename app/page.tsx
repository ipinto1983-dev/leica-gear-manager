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
  return <div className={`gear-visual gear-${kind}`} aria-hidden="true" />;
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
      </div>
    </div>
  );
}

function Vault() {
  return (
    <div className="vault-panel panel">
      <div className="eyebrow">LOCAL VAULT STORAGE</div>
      <h3>IndexedDB secure container</h3>
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState("Dashboard");
  const [dark, setDark] = useState(true);
  const [assistant, setAssistant] = useState(false);
  const [selected, setSelected] = useState<(typeof gear)[number] | null>(null);
  const [collectionMode] = useState<"grid" | "table">("grid");
  const [collectionFilter] = useState<
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
          <button className="avatar">IP</button>
        </div>
      </header>

      <main className="content-wrap" style={{ zoom: "var(--app-scale)" }}>
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
            </section>
            <section className="gear-grid">
              {gear.slice(0, 3).map((item) => (
                <GearCard
                  key={item.name}
                  item={item}
                  onClick={() => setSelected(item)}
                />
              ))}
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
          </>
        )}

        {active === "Collection" && (
          <section className="collection-view">
            <div className="collection-hero">
              <div>
                <h2 className="text-6xl sm:text-7xl lg:text-[5.25rem] font-black tracking-tight text-zinc-900 dark:text-zinc-100 leading-[0.92] mb-3">
                  Your Collection
                </h2>
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
                  </div>
                </div>
              </div>
            </div>
            {collectionMode === "grid" ? (
              <div className="collection-sections">
                {collectionSections
                  .filter((section) => section.items.length > 0)
                  .map((section) => (
                    <section className="collection-category" key={section.key}>
                      <div className="collection-category-head">
                        <h3>{section.label}</h3>
                        <span>{section.items.length} ITEMS</span>
                      </div>
                      <section className="gear-grid collection-grid">
                        {section.items.map((item) => (
                          <GearCard
                            key={item.name}
                            item={item}
                            onClick={() => setSelected(item)}
                          />
                        ))}
                      </section>
                    </section>
                  ))}
              </div>
            ) : (
              <CollectionTable items={collectionItems} onSelect={setSelected} />
            )}
            <section className="hunting-section">
              <div className="section-heading">
                <div>
                  <div className="eyebrow">
                    OPEN HUNTING LIST <ArrowUpRight />
                  </div>
                  <h2>Hunting list.</h2>
                </div>
                <span className="eyebrow">03 TARGETS</span>
              </div>
              <div className="target-grid">
                <TargetCard
                  name="APO-Summicron-M 50mm f/2 ASPH."
                  code="11141"
                  tone="wire-lens"
                  price="$8,950"
                />
                <TargetCard
                  name="Elmarit-M 28mm f/2.8 ASPH."
                  code="11606"
                  tone="wire-lens"
                  price="$2,150"
                />
                <TargetCard
                  name="Leica MP 0.72"
                  code="10302"
                  tone="wire-body"
                  price="$5,600"
                />
              </div>
            </section>
          </section>
        )}

        {active === "Trips" && <TripPlanner />}
        {active === "Trade" && <TradeLedger />}
        {active === "Vault" && <Vault />}
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-mark">GM</span>
          <span>Photo Gear Manager — Leica Edition</span>
        </div>
        <span className="footer-status">Local Vault · IndexedDB Active</span>
      </footer>

      {helpOpen && (
        <aside
          className="help-drawer"
          role="dialog"
          aria-label="Gear Manager help"
        >
          <div className="drawer-head">
            <div>
              <div className="eyebrow">FIELD MANUAL</div>
              <h3>Help & shortcuts</h3>
            </div>
            <button
              className="icon-button"
              aria-label="Close help"
              onClick={() => setHelpOpen(false)}
            >
              <X />
            </button>
          </div>
        </aside>
      )}

      <Dialog open={backupOpen} onOpenChange={setBackupOpen}>
        <DialogContent className="backup-dialog">
          <DialogTitle>Save / backup</DialogTitle>
          <p>Keep a portable copy of your local vault data.</p>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="gear-dialog">
          {selected && (
            <div className="dialog-top-grid">
              <div className="dialog-visual">
                <div className="dialog-image">
                  <GearVisual tone={selected.tone} category={selected.tag} />
                </div>
                <div className="dialog-summary">
                  <DialogTitle className="dialog-product-name">
                    {selected.name}
                  </DialogTitle>
                  <strong>{selected.price}</strong>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
