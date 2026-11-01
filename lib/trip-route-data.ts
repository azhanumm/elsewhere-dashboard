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
	{ day: 1, date: "2026-11-04", title: "Mendarat, Mitsui Outlet sore-malam", theme: "beli", transportRm: 113, mealsRm: 90, stops: [
		{ time: "15:25", name: "KLIA2", note: "Imigrasi, bagasi, jamak Zuhur-Asar di surau", lat: 2.7447, lng: 101.6852 },
		{ time: "17:05", name: "Mitsui Outlet Park", note: "Shuttle gratis (verifikasi). Belanja dan konten 17:30-21:30, titip koper, buka sampai 22:00", lat: 2.7802, lng: 101.6773, leg: "Shuttle" },
		{ time: "22:15", name: "KL Sentral", note: "Shuttle ke KLIA2, lalu KLIA Ekspres RM55/orang. Cek kereta terakhir", lat: 3.1343, lng: 101.6862, leg: "KLIA Ekspres" },
		{ time: "23:10", name: H.name, note: "Monorail 2 stop ke Maharajalela, check-in, Isyak", lat: H.lat, lng: H.lng, leg: "Monorail" },
	] },
	{ day: 2, date: "2026-11-05", title: "Konten: Masjid India, Chinatown, Twin Towers", theme: "konten", transportRm: 20, mealsRm: 120, stops: [
		{ time: "10:15", name: "SOGO + Tudungruffle (L3)", note: "35 menit. Monorail 6 stop ke Medan Tuanku", lat: 3.1561, lng: 101.6953, leg: "Monorail" },
		{ time: "10:55", name: "Muaz Textiles", note: "60 menit", lat: 3.1549, lng: 101.6963, leg: "Jalan kaki" },
		{ time: "12:00", name: "Haniffa", note: "50 menit, lalu Zuhur dan makan siang", lat: 3.1541, lng: 101.6975, leg: "Jalan kaki" },
		{ time: "13:50", name: "Mydin Masjid India", note: "40 menit, locker tas ~RM6", lat: 3.1528, lng: 101.6972, leg: "Jalan kaki" },
		{ time: "14:35", name: H.name, note: "Monorail ke hotel, taruh belanjaan, istirahat", lat: H.lat, lng: H.lng, leg: "Monorail" },
		{ time: "15:35", name: "Beryl's Jalan Panggong", note: "35 menit, tutup 18:30", lat: 3.1416, lng: 101.6971, leg: "Jalan kaki" },
		{ time: "16:55", name: "Pasar Seni (Central Market + Kasturi Walk)", note: "60 menit, Asar di hotel dulu", lat: 3.1453, lng: 101.6954, leg: "Jalan kaki" },
		{ time: "18:00", name: "Petaling Street", note: "55 menit, tawar 50-60%", lat: 3.1444, lng: 101.6976, leg: "Jalan kaki" },
		{ time: "20:30", name: "Petronas Twin Towers + Suria KLCC", note: "Maghrib dan makan di hotel, monorail ke Raja Chulan, jalan 1,2 km. Konten malam ~90 menit, Isyak di surau", lat: 3.1579, lng: 101.7116, leg: "Monorail" },
	] },
	{ day: 3, date: "2026-11-06", title: "Beli: Masjid India, lalu konten Bukit Bintang", theme: "beli", transportRm: 29, mealsRm: 125, stops: [
		{ time: "10:00", name: "SOGO + Tudungruffle (L3)", note: "35 menit. Monorail ke Medan Tuanku", lat: 3.1561, lng: 101.6953, leg: "Monorail" },
		{ time: "10:40", name: "Muaz Textiles", note: "60 menit, cek struk sebelum bayar", lat: 3.1549, lng: 101.6963, leg: "Jalan kaki" },
		{ time: "11:45", name: "Haniffa", note: "50 menit, cek komposisi cokelat", lat: 3.1541, lng: 101.6975, leg: "Jalan kaki" },
		{ time: "12:40", name: "Mydin Masjid India", note: "40 menit, barang berat terakhir, lalu Zuhur", lat: 3.1528, lng: 101.6972, leg: "Jalan kaki" },
		{ time: "14:05", name: H.name, note: "Grab (~RM10), taruh belanjaan", lat: H.lat, lng: H.lng, leg: "Grab" },
		{ time: "15:20", name: "Kunafa Finger's", note: "Monorail ke Bukit Bintang", lat: 3.1458, lng: 101.7113, leg: "Monorail" },
		{ time: "15:55", name: "Pavilion KL", note: "90 menit, Asar di surau", lat: 3.1491, lng: 101.7129, leg: "Jalan kaki" },
		{ time: "17:35", name: "Sungei Wang Plaza", note: "90 menit, Maghrib di musala", lat: 3.1450, lng: 101.7113, leg: "Jalan kaki" },
		{ time: "19:35", name: "Don Don Donki (Lot 10)", note: "65 menit konten, buka sampai 02:00", lat: 3.1468, lng: 101.7118, leg: "Jalan kaki" },
		{ time: "21:30", name: H.name, note: "Makan malam, Grab ~RM10, sortir tas, live selling", lat: H.lat, lng: H.lng, leg: "Grab" },
	] },
	{ day: 4, date: "2026-11-07", title: "Beli: Imbi dan Bukit Bintang", theme: "beli", transportRm: 14, mealsRm: 116, stops: [
		{ time: "10:00", name: "Berjaya Times Square", note: "75 menit, monorail 2 stop ke Imbi", lat: 3.1422, lng: 101.7106, leg: "Monorail" },
		{ time: "11:20", name: "Sungei Wang Plaza", note: "90 menit, lalu makan siang dan Zuhur", lat: 3.1450, lng: 101.7113, leg: "Jalan kaki" },
		{ time: "13:55", name: "Pavilion KL", note: "Sekitar 2 jam 20 menit, Asar di surau", lat: 3.1491, lng: 101.7129, leg: "Jalan kaki" },
		{ time: "16:45", name: "Kunafa Finger's", note: "Camilan sore", lat: 3.1458, lng: 101.7113, leg: "Jalan kaki" },
		{ time: "17:20", name: "Don Don Donki (Lot 10)", note: "105 menit, paling akhir", lat: 3.1468, lng: 101.7118, leg: "Jalan kaki" },
		{ time: "20:00", name: H.name, note: "Maghrib dan makan malam dulu, Grab ~RM10, QC dan live selling", lat: H.lat, lng: H.lng, leg: "Grab" },
	] },
	{ day: 5, date: "2026-11-08", title: "Kirim paket, top-up Pasar Seni, pulang", theme: "transit", transportRm: 29, mealsRm: 80, stops: [
		{ time: "08:00", name: H.name, note: "Serahkan paket ke logistik, check-out 09:15, titip koper (konfirmasi)", lat: H.lat, lng: H.lng },
		{ time: "09:35", name: "Pasar Seni + Petaling Street", note: "Top-up opsional, toko buka sekitar 10:00", lat: 3.1450, lng: 101.6965, leg: "Jalan kaki" },
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
