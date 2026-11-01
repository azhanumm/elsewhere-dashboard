// Rute harian trip Kuala Lumpur, 4-8 Nov 2026. Hotel: OYO 416 Grid 9 Hotel (Agoda: Swing & Pillows @ Grid 9).
// Biaya dalam RM untuk 2 orang. Tarif Monorail/Grab/MRT adalah perkiraan.
export type StopKind = "konten" | "beli" | "spot" | "lain";
export type RouteStop = { kind: StopKind; time: string; name: string; note: string; lat: number; lng: number; leg?: string };
export type RouteDay = { flow: string; day: number; date: string; title: string; theme: "konten" | "beli" | "transit"; transportRm: number; mealsRm: number; stops: RouteStop[] };

export const routeConfig = {
	tripName: "Kuala Lumpur 4-8 Nov 2026",
	hotel: { name: "OYO 416 Grid 9 Hotel", address: "9 Jln Maharajalela, Kampung Attap, 50150 KL", lat: 3.1383, lng: 101.6993 },
	flight: { landing: "Rabu 4 Nov, 15:25 (KLIA2)", departure: "Minggu 8 Nov, 17:15 (KLIA2)" },
};

const H = { name: "Hotel Grid 9", lat: 3.1383, lng: 101.6993 };

export const routeDays: RouteDay[] = [
	{ flow: "KLIA2 - Mitsui Outlet (±1,5 jam) - KLIA2 - KL Sentral - Hotel (sampai ±21:00)", day: 1, date: "2026-11-04", title: "Mendarat, Mitsui KLIA", theme: "beli", transportRm: 113, mealsRm: 74, stops: [
		{ kind: "lain", time: "15:25", name: "KLIA2", note: "Mendarat, jamak Zuhur-Asar", lat: 2.7447, lng: 101.6852 },
		{ kind: "konten", time: "17:30", name: "Mitsui Outlet KLIA", note: "±95 mnt. Sepatu + tas. Shuttle gratis", lat: 2.7802, lng: 101.6773, leg: "Shuttle" },
		{ kind: "lain", time: "20:10", name: "KL Sentral", note: "KLIA Ekspres RM55/orang", lat: 3.1343, lng: 101.6862, leg: "KLIA Ekspres" },
		{ kind: "lain", time: "21:05", name: H.name, note: "Monorail 2 stop, check-in", lat: H.lat, lng: H.lng, leg: "Monorail" },
	] },
	{ flow: "Hotel - KLCC (Twin Towers, Suria) - Medan Tuanku (SOGO + Tudungruffle, Muaz, Haniffa, Mydin) - Chinatown (Beryl's Panggong, Petaling, Pasar Seni) - Hotel", day: 2, date: "2026-11-05", title: "KONTEN: KLCC, Medan Tuanku, Chinatown", theme: "konten", transportRm: 14, mealsRm: 136, stops: [
		{ kind: "spot", time: "09:30", name: "Twin Towers + KLCC Park", note: "45 mnt", lat: 3.1579, lng: 101.7116, leg: "Monorail" },
		{ kind: "konten", time: "10:15", name: "Suria KLCC", note: "Isetan, Garrett", lat: 3.1579, lng: 101.7116, leg: "Jalan kaki" },
		{ kind: "konten", time: "11:50", name: "SOGO + Tudungruffle (L3)", note: "35 mnt", lat: 3.1561, lng: 101.6953, leg: "Monorail" },
		{ kind: "konten", time: "12:30", name: "Muaz Textiles", note: "60 mnt", lat: 3.1549, lng: 101.6963, leg: "Jalan kaki" },
		{ kind: "konten", time: "14:20", name: "Haniffa", note: "50 mnt", lat: 3.1541, lng: 101.6975, leg: "Jalan kaki" },
		{ kind: "konten", time: "15:15", name: "Mydin Masjid India", note: "40 mnt. Locker RM6", lat: 3.1528, lng: 101.6972, leg: "Jalan kaki" },
		{ kind: "konten", time: "17:00", name: "Beryl's Jalan Panggong", note: "35 mnt. Tutup 18:30", lat: 3.1416, lng: 101.6971, leg: "Monorail" },
		{ kind: "konten", time: "17:40", name: "Petaling Street", note: "50 mnt", lat: 3.1444, lng: 101.6976, leg: "Jalan kaki" },
		{ kind: "konten", time: "18:35", name: "Pasar Seni", note: "30 mnt", lat: 3.1453, lng: 101.6954, leg: "Jalan kaki" },
		{ kind: "lain", time: "19:10", name: H.name, note: "Maghrib + makan malam", lat: H.lat, lng: H.lng, leg: "Jalan kaki" },
	] },
	{ flow: "Hotel - Mitsui BBCC (LaLaport) - Imbi (Berjaya Times Square) - Bukit Bintang (Sungei Wang, Kunafa, Don Don Donki, Fahrenheit88, Pavilion) - Hotel (edit + posting) - Pasar Seni + Petaling (opsional beli)", day: 3, date: "2026-11-06", title: "KONTEN: Imbi + Bukit Bintang", theme: "konten", transportRm: 4, mealsRm: 125, stops: [
		{ kind: "konten", time: "09:45", name: "Mitsui Outlet BBCC (LaLaport L3)", note: "60 mnt. Jalan kaki 900 m", lat: 3.1405, lng: 101.7071, leg: "Jalan kaki" },
		{ kind: "konten", time: "11:05", name: "Berjaya Times Square", note: "60 mnt", lat: 3.1422, lng: 101.7106, leg: "Jalan kaki" },
		{ kind: "konten", time: "12:10", name: "Sungei Wang Plaza", note: "55 mnt", lat: 3.145, lng: 101.7113, leg: "Jalan kaki" },
		{ kind: "konten", time: "14:00", name: "Kunafa Finger's", note: "30 mnt", lat: 3.1458, lng: 101.7113, leg: "Jalan kaki" },
		{ kind: "konten", time: "14:35", name: "Don Don Donki (Lot 10)", note: "60 mnt", lat: 3.1468, lng: 101.7118, leg: "Jalan kaki" },
		{ kind: "konten", time: "15:40", name: "Fahrenheit88", note: "40 mnt. Discover Malaysia G35", lat: 3.1473, lng: 101.713, leg: "Jalan kaki" },
		{ kind: "konten", time: "16:45", name: "Pavilion KL", note: "90 mnt", lat: 3.1491, lng: 101.7129, leg: "Jalan kaki" },
		{ kind: "lain", time: "18:20", name: H.name, note: "Monorail 3 stop, edit + posting", lat: H.lat, lng: H.lng, leg: "Monorail" },
		{ kind: "beli", time: "20:00", name: "Pasar Seni + Petaling Street", note: "Opsional, 85 mnt", lat: 3.145, lng: 101.6965, leg: "Jalan kaki" },
	] },
	{ flow: "Hotel - Medan Tuanku (SOGO + Tudungruffle, Muaz, Haniffa, Mydin) - Imbi (Mitsui BBCC, Berjaya) - Bukit Bintang (Sungei Wang, Fahrenheit88, Pavilion, Kunafa, Don Don Donki) - Hotel (udah dipaketin, tinggal nambah dan lakban kalau ada tambahan besoknya)", day: 4, date: "2026-11-07", title: "BELI: Medan Tuanku, Imbi + Bukit Bintang", theme: "beli", transportRm: 19, mealsRm: 116, stops: [
		{ kind: "beli", time: "10:00", name: "SOGO + Tudungruffle (L3)", note: "35 mnt", lat: 3.1561, lng: 101.6953, leg: "Monorail" },
		{ kind: "beli", time: "10:40", name: "Muaz Textiles", note: "50 mnt. Cek struk", lat: 3.1549, lng: 101.6963, leg: "Jalan kaki" },
		{ kind: "beli", time: "11:35", name: "Haniffa", note: "45 mnt", lat: 3.1541, lng: 101.6975, leg: "Jalan kaki" },
		{ kind: "beli", time: "12:25", name: "Mydin Masjid India", note: "40 mnt", lat: 3.1528, lng: 101.6972, leg: "Jalan kaki" },
		{ kind: "beli", time: "14:35", name: "Mitsui Outlet BBCC (LaLaport L3)", note: "45 mnt. Monorail ke Imbi", lat: 3.1405, lng: 101.7071, leg: "Monorail" },
		{ kind: "beli", time: "15:25", name: "Berjaya Times Square", note: "40 mnt", lat: 3.1422, lng: 101.7106, leg: "Jalan kaki" },
		{ kind: "beli", time: "16:10", name: "Sungei Wang Plaza", note: "50 mnt", lat: 3.145, lng: 101.7113, leg: "Jalan kaki" },
		{ kind: "beli", time: "17:05", name: "Fahrenheit88", note: "35 mnt", lat: 3.1473, lng: 101.713, leg: "Jalan kaki" },
		{ kind: "beli", time: "17:45", name: "Pavilion KL", note: "85 mnt. Tutup 22:00", lat: 3.1491, lng: 101.7129, leg: "Jalan kaki" },
		{ kind: "beli", time: "19:10", name: "Kunafa Finger's", note: "Setelah Maghrib + makan", lat: 3.1458, lng: 101.7113, leg: "Jalan kaki" },
		{ kind: "beli", time: "20:20", name: "Don Don Donki (Lot 10)", note: "90 mnt. Terakhir, buka sampai 02:00", lat: 3.1468, lng: 101.7118, leg: "Jalan kaki" },
		{ kind: "lain", time: "21:55", name: H.name, note: "Grab RM10. QC, packing semua pesanan", lat: H.lat, lng: H.lng, leg: "Grab" },
	] },
	{ flow: "Hotel - Finishing beli yang belum kebeli (Chinatown / Mitsui BBCC / Imbi) - Paketin - KLIA2 (Beryl's, Garrett) - pulang 17:15", day: 5, date: "2026-11-08", title: "Finishing, paket, pulang", theme: "transit", transportRm: 29, mealsRm: 80, stops: [
		{ kind: "beli", time: "09:00", name: "Finishing beli", note: "Chinatown / BBCC / Imbi, maks 2 area", lat: 3.144, lng: 101.6967, leg: "Jalan kaki" },
		{ kind: "lain", time: "11:00", name: H.name, note: "Tambah paket, logistik jemput ±11:15, check-out 11:45", lat: H.lat, lng: H.lng },
		{ kind: "lain", time: "11:55", name: "KL Sentral", note: "Monorail 2 stop", lat: 3.1343, lng: 101.6862, leg: "Monorail" },
		{ kind: "lain", time: "13:50", name: "KLIA2", note: "Skybus 12:35 RM13/orang", lat: 2.7447, lng: 101.6852, leg: "Skybus" },
		{ kind: "beli", time: "14:15", name: "Beryl's (L3) + Garrett (L2)", note: "Bag drop 14:30", lat: 2.7447, lng: 101.6852, leg: "Jalan kaki" },
		{ kind: "lain", time: "17:15", name: "Pesawat pulang", note: "", lat: 2.7447, lng: 101.6852 },
	] },
];

export const mapsUrl = (stops: { lat: number; lng: number }[]) =>
	"https://www.google.com/maps/dir/" + stops.map(s => `${s.lat},${s.lng}`).join("/") + "/data=!4m2!4m1!3e3";
export const dayStopsFromHotel = (d: RouteDay) => {
	const pts = [{ lat: routeConfig.hotel.lat, lng: routeConfig.hotel.lng }, ...d.stops];
	return pts;
};
