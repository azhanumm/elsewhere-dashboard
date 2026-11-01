"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, MapPinned } from "lucide-react";
import { routeConfig, routeDays, mapsUrl, dayStopsFromHotel } from "../lib/trip-route-data";

const rm = (n: number) => `RM ${n}`;
const dayLabel = (d: { day: number; date: string; title: string }) =>
	`HARI ${d.day} (${new Date(`${d.date}T00:00:00`).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "short" })})`;
const waText = () =>
	`KL 4-8 Nov 2026\nHotel: Grid 9 (Maharajalela)\n\n` + routeDays.map(d => `${dayLabel(d)}\n${d.flow}`).join("\n\n");

export default function TripRoute() {
	const [active, setActive] = useState(1);
	const [copied, setCopied] = useState(false);
	const copyWa = async () => {
		try { await navigator.clipboard.writeText(waText()); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { setCopied(false); }
	};
	const day = routeDays.find(d => d.day === active) ?? routeDays[0];
	const totalTransport = routeDays.reduce((s, d) => s + d.transportRm, 0);
	const totalMeals = routeDays.reduce((s, d) => s + d.mealsRm, 0);
	return (
		<section className="content-studio">
			<div className="content-hero">
				<div>
					<span>RUTE TRIP</span>
					<h1>{routeConfig.tripName}</h1>
					<p>Hotel: {routeConfig.hotel.name}, {routeConfig.hotel.address}</p>
				</div>
				<div className="content-plan-badge">
					<span>Mendarat</span><strong>{routeConfig.flight.landing}</strong>
					<span>Pulang</span><strong>{routeConfig.flight.departure}</strong>
				</div>
			</div>
			<div className="content-calendar">
				<div className="route-flow-head">
					<h2>Alur singkat</h2>
					<button className="content-regenerate" onClick={copyWa}>{copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Tersalin" : "Salin untuk WA"}</button>
				</div>
				<ol className="route-flow">
					{routeDays.map(d => (
						<li key={d.day}><strong>{dayLabel(d)}</strong><span>{d.flow}</span></li>
					))}
				</ol>
			</div>
			<div className="content-calendar">
				<div className="route-tabs">
					{routeDays.map(d => (
						<button key={d.day} className={d.day === active ? "active" : ""} onClick={() => setActive(d.day)}>
							Hari {d.day}<small>{new Date(`${d.date}T00:00:00`).toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short" })}</small>
						</button>
					))}
				</div>
				<h2>{day.title}</h2>
				<p className="content-guidance">Transport {rm(day.transportRm)} · makan {rm(day.mealsRm)} (perkiraan untuk 2 orang). Tarif Monorail, Grab dan MRT adalah estimasi.</p>
				<ol className="route-list">
					{day.stops.map((s, i) => (
						<li key={`${day.day}-${i}`}>
							<time>{s.time}</time>
							<div>
								<strong>{s.name}</strong>
								{s.note && <span>{s.note}</span>}
								{s.leg && <em>{s.leg}</em>}
							</div>
						</li>
					))}
				</ol>
				<a className="content-generate route-open" href={mapsUrl(dayStopsFromHotel(day))} target="_blank" rel="noreferrer">
					<MapPinned size={16} /> Buka rute Hari {day.day} di Google Maps <ExternalLink size={14} />
				</a>
				<p className="content-guidance">Total 5 hari: transport {rm(totalTransport)}, makan {rm(totalMeals)}. Belanja tidak termasuk.</p>
			</div>
		</section>
	);
}
