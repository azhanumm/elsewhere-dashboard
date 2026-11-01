// Rute harian trip Kuala Lumpur, 4-8 Nov 2026. Hotel: OYO 416 Grid 9 Hotel (Agoda: Swing & Pillows @ Grid 9).
// Biaya dalam RM untuk 2 orang. Tarif Monorail/Grab/MRT adalah perkiraan.
export type RouteStop = { time: string; name: string; note: string; lat: number; lng: number; leg?: string };
export type RouteDay = { day: number; date: string; title: string; theme: "konten" | "beli" | "transit"; transportRm: number; mealsRm: number; stops: RouteStop[] };

export const routeConfig = {
	tripName: "Kuala Lumpur 4-8 Nov 2026",
	hotel: { name: "OYO 416 Grid 9 Hotel", address: "9 Jln Maharajalela, Kampung Attap, 50150 KL", lat: 3.1383, lng: 101.6993 },
	flight: { landing: "Rabu 4 Nov, 15:25 (KLIA2)", departure: "Minggu 8 Nov, 17:15 (KLIA2)" },
};

const H = { name: "Hotel Grid 9", lat: 3.1383, lng: 101.6993 };

export const routeDays: RouteDay[] = [
	{ day: 1, date: "2026-11-04", title: "Mendarat, Mitsui Outlet singkat", theme: "beli", transportRm: 113, mealsRm: 74, stops: [
		{ time: "15:25", name: "KLIA2", note: "Imigrasi, bagasi, jamak Zuhur-Asar di surau", lat: 2.7447, lng: 101.6852 },
		{ time: "17:05", name: "Mitsui Outlet Park", note: "Shuttle gratis (verifikasi). Sekitar 95 menit: sepatu dan tas dari pre-order. Buka sampai 22:00", lat: 2.7802, lng: 101.6773, leg: "Shuttle" },
		{ time: "20:10", name: "KL Sentral", note: "Shuttle ke KLIA2, lalu KLIA Ekspres RM55/orang", lat: 3.1343, lng: 101.6862, leg: "KLIA Ekspres" },
		{ time: "21:05", name: H.name, note: "Monorail 2 stop ke Maharajalela, check-in, makan malam", lat: H.lat, lng: H.lng, leg: "Monorail" },
	] },
	{ day: 2, date: "2026-11-05", title: "Konten: KLCC, Masjid India, Chinatown", theme: "konten", transportRm: 14, mealsRm: 136, stops: [
		{ time: "09:30", name: "Petronas Twin Towers + Suria KLCC", note: "Monorail 4 stop ke Raja Chulan, jalan 1,2 km. Twin Towers 45 menit, Suria (Isetan, Garrett) 45 menit", lat: 3.1579, lng: 101.7116, leg: "Monorail" },
		{ time: "11:50", name: "SOGO + Tudungruffle (L3)", note: "35 menit. Monorail 2 stop dari Raja Chulan ke Medan Tuanku", lat: 3.1561, lng: 101.6953, leg: "Monorail" },
		{ time: "12:30", name: "Muaz Textiles", note: "60 menit, lalu Zuhur dan makan siang", lat: 3.1549, lng: 101.6963, leg: "Jalan kaki" },
		{ time: "14:20", name: "Haniffa", note: "50 menit", lat: 3.1541, lng: 101.6975, leg: "Jalan kaki" },
		{ time: "15:15", name: "Mydin Masjid India", note: "40 menit, locker tas ~RM6", lat: 3.1528, lng: 101.6972, leg: "Jalan kaki" },
		{ time: "17:00", name: "Beryl's Jalan Panggong", note: "Monorail ke Maharajalela, Asar di hotel (tanpa taruh belanjaan). 35 menit, tutup 18:30", lat: 3.1416, lng: 101.6971, leg: "Monorail" },
		{ time: "17:40", name: "Petaling Street", note: "50 menit, tawar 50-60%", lat: 3.1444, lng: 101.6976, leg: "Jalan kaki" },
		{ time: "18:35", name: "Pasar Seni (Central Market + Kasturi Walk)", note: "30 menit", lat: 3.1453, lng: 101.6954, leg: "Jalan kaki" },
		{ time: "19:10", name: H.name, note: "Maghrib dan makan malam", lat: H.lat, lng: H.lng, leg: "Jalan kaki" },
	] },
	{ day: 3, date: "2026-11-06", title: "Konten: Bukit Bintang dan Imbi, lalu Pasar Seni", theme: "konten", transportRm: 8, mealsRm: 125, stops: [
		{ time: "10:10", name: "Pavilion KL", note: "90 menit. Monorail 3 stop ke Bukit Bintang", lat: 3.1491, lng: 101.7129, leg: "Monorail" },
		{ time: "11:45", name: "Don Don Donki (Lot 10)", note: "60 menit, konten saja", lat: 3.1468, lng: 101.7118, leg: "Jalan kaki" },
		{ time: "12:50", name: "Kunafa Finger's", note: "30 menit", lat: 3.1458, lng: 101.7113, leg: "Jalan kaki" },
		{ time: "13:25", name: "Sungei Wang Plaza", note: "Zuhur dan makan siang, lalu 75 menit konten", lat: 3.1450, lng: 101.7113, leg: "Jalan kaki" },
		{ time: "15:35", name: "Berjaya Times Square", note: "60 menit", lat: 3.1422, lng: 101.7106, leg: "Jalan kaki" },
		{ time: "17:30", name: H.name, note: "Monorail Imbi ke hotel, Asar, edit dan posting konten", lat: H.lat, lng: H.lng, leg: "Monorail" },
		{ time: "20:00", name: "Pasar Seni + Petaling Street (opsional beli)", note: "Setelah ada pesanan. Pasar Seni 40 menit, Petaling 45 menit", lat: 3.1450, lng: 101.6965, leg: "Jalan kaki" },
	] },
	{ day: 4, date: "2026-11-07", title: "Beli: Masjid India, lalu Imbi dan Bukit Bintang", theme: "beli", transportRm: 19, mealsRm: 116, stops: [
		{ time: "10:00", name: "SOGO + Tudungruffle (L3)", note: "35 menit. Monorail 6 stop ke Medan Tuanku", lat: 3.1561, lng: 101.6953, leg: "Monorail" },
		{ time: "10:40", name: "Muaz Textiles", note: "50 menit, cek struk", lat: 3.1549, lng: 101.6963, leg: "Jalan kaki" },
		{ time: "11:35", name: "Haniffa", note: "45 menit", lat: 3.1541, lng: 101.6975, leg: "Jalan kaki" },
		{ time: "12:25", name: "Mydin Masjid India", note: "40 menit, lalu Zuhur dan makan siang", lat: 3.1528, lng: 101.6972, leg: "Jalan kaki" },
		{ time: "14:35", name: "Berjaya Times Square", note: "Monorail langsung ke Imbi dengan belanjaan. 50 menit", lat: 3.1422, lng: 101.7106, leg: "Monorail" },
		{ time: "15:30", name: "Sungei Wang Plaza", note: "60 menit, Asar di musala", lat: 3.1450, lng: 101.7113, leg: "Jalan kaki" },
		{ time: "16:55", name: "Pavilion KL", note: "90 menit, tutup 22:00", lat: 3.1491, lng: 101.7129, leg: "Jalan kaki" },
		{ time: "18:30", name: "Kunafa Finger's", note: "Camilan sore, lalu Maghrib dan makan malam", lat: 3.1458, lng: 101.7113, leg: "Jalan kaki" },
		{ time: "19:55", name: "Don Don Donki (Lot 10)", note: "95 menit, paling akhir, buka sampai 02:00", lat: 3.1468, lng: 101.7118, leg: "Jalan kaki" },
		{ time: "21:35", name: H.name, note: "Grab ~RM10, QC dan packing, live selling", lat: H.lat, lng: H.lng, leg: "Grab" },
	] },
	{ day: 5, date: "2026-11-08", title: "Kirim paket, top-up Chinatown, pulang", theme: "transit", transportRm: 29, mealsRm: 80, stops: [
		{ time: "08:00", name: H.name, note: "Serahkan paket ke logistik, check-out 09:15, titip koper (konfirmasi)", lat: H.lat, lng: H.lng },
		{ time: "09:35", name: "Beryl's + Pasar Seni + Petaling Street", note: "Top-up opsional, toko buka sekitar 10:00 (Beryl's 09:00 akhir pekan)", lat: 3.1440, lng: 101.6967, leg: "Jalan kaki" },
		{ time: "11:45", name: "KL Sentral", note: "Ambil koper di hotel, Monorail 2 stop", lat: 3.1343, lng: 101.6862, leg: "Monorail" },
		{ time: "13:45", name: "KLIA2", note: "Skybus 12:30, RM13/orang. Zuhur, Beryl's L3, Garrett L2, bag drop 14:30", lat: 2.7447, lng: 101.6852, leg: "Skybus" },
		{ time: "17:15", name: "Penerbangan pulang", note: "", lat: 2.7447, lng: 101.6852 },
	] },
];

export const mapsUrl = (stops: { lat: number; lng: number }[]) =>
	"https://www.google.com/maps/dir/" + stops.map(s => `${s.lat},${s.lng}`).join("/") + "/data=!4m2!4m1!3e3";
export const dayStopsFromHotel = (d: RouteDay) => {
	const pts = [{ lat: routeConfig.hotel.lat, lng: routeConfig.hotel.lng }, ...d.stops];
	return pts;
};
