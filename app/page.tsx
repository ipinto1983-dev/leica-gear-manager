"use client";

import { useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  ArrowUpRight,
  ChevronRight,
  CircleHelp,
  MapPin,
  Moon,
  Save,
  Search,
  Sun,
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

function GearVisual({ category }: { category?: string }) {
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
        <GearVisual category={item.tag} />
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
      <div className
