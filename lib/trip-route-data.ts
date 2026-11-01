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
	{ day: 2, date: "2026-11-05", title: "Konten Masjid India + Bukit Bintang", theme: "konten", transportRm: 19, mealsRm: 125, stops: [
		{ time: "10:10", name: "SOGO + Tudungruffle (L3)", note: "Monorail 6 stop ke Medan Tuanku", lat: 3.1561, lng: 101.6953, leg: "Monorail" },
		{ time: "11:20", name: "Muaz Textiles", note: "90 menit untuk menunggu respons pembeli", lat: 3.1549, lng: 101.6963, leg: "Jalan kaki" },
		{ time: "13:55", name: "Haniffa", note: "Zuhur dan makan siang di Masjid India dulu", lat: 3.1541, lng: 101.6975, leg: "Jalan kaki" },
		{ time: "15:05", name: "Mydin Masjid India", note: "Locker tas sekitar RM6", lat: 3.1528, lng: 101.6972, leg: "Jalan kaki" },
		{ time: "16:30", name: "Kunafa Finger's", note: "Monorail ke Bukit Bintang", lat: 3.1458, lng: 101.7113, leg: "Monorail" },
		{ time: "17:05", name: "Sungei Wang Plaza", note: "2 jam, Asar dan Maghrib di musala", lat: 3.1450, lng: 101.7113, leg: "Jalan kaki" },
		{ time: "19:35", name: "Don Don Donki (Lot 10)", note: "Hampir 2 jam, buka sampai 02:00", lat: 3.1468, lng: 101.7118, leg: "Jalan kaki" },
		{ time: "22:05", name: H.name, note: "Makan malam dulu, Grab ~RM10", lat: H.lat, lng: H.lng, leg: "Grab" },
	] },
	{ day: 3, date: "2026-11-06", title: "Beli: Masjid India, Pasar Seni, Petaling", theme: "beli", transportRm: 15, mealsRm: 116, stops: [
		{ time: "10:00", name: "SOGO + Tudungruffle (L3)", note: "Monorail ke Medan Tuanku", lat: 3.1561, lng: 101.6953, leg: "Monorail" },
		{ time: "10:50", name: "Muaz Textiles", note: "80 menit, cek struk sebelum bayar", lat: 3.1549, lng: 101.6963, leg: "Jalan kaki" },
		{ time: "12:15", name: "Haniffa", note: "Cek komposisi cokelat", lat: 3.1541, lng: 101.6975, leg: "Jalan kaki" },
		{ time: "13:55", name: "Mydin Masjid India", note: "Zuhur dulu, barang berat terakhir", lat: 3.1528, lng: 101.6972, leg: "Jalan kaki" },
		{ time: "15:00", name: H.name, note: "Grab dengan belanjaan (~RM10), istirahat", lat: H.lat, lng: H.lng, leg: "Grab" },
		{ time: "15:30", name: "Beryl's Jalan Panggong", note: "Tutup 18:30", lat: 3.1416, lng: 101.6971, leg: "Jalan kaki" },
		{ time: "17:00", name: "Pasar Seni (Central Market + Kasturi Walk)", note: "90 menit, magnet, batik, tas", lat: 3.1453, lng: 101.6954, leg: "Jalan kaki" },
		{ time: "19:50", name: "Petaling Street", note: "2 jam malam, tawar 50-60%", lat: 3.1444, lng: 101.6976, leg: "Jalan kaki" },
		{ time: "21:50", name: H.name, note: "Sortir tas, live selling", lat: H.lat, lng: H.lng, leg: "Jalan kaki" },
	] },
	{ day: 4, date: "2026-11-07", title: "Beli: Imbi dan Bukit Bintang", theme: "beli", transportRm: 14, mealsRm: 116, stops: [
		{ time: "10:00", name: "Berjaya Times Square", note: "90 menit, monorail 2 stop ke Imbi", lat: 3.1422, lng: 101.7106, leg: "Monorail" },
		{ time: "11:35", name: "Sungei Wang Plaza", note: "90 menit, Zuhur di musala", lat: 3.1450, lng: 101.7113, leg: "Jalan kaki" },
		{ time: "14:10", name: "Pavilion KL", note: "Sekitar 3 jam, Asar di surau", lat: 3.1491, lng: 101.7129, leg: "Jalan kaki" },
		{ time: "17:10", name: "Kunafa Finger's", note: "Camilan sore", lat: 3.1458, lng: 101.7113, leg: "Jalan kaki" },
		{ time: "18:00", name: "Don Don Donki (Lot 10)", note: "Sekitar 2,5 jam, paling akhir, istirahat Maghrib dan makan", lat: 3.1468, lng: 101.7118, leg: "Jalan kaki" },
		{ time: "21:35", name: H.name, note: "Grab (~RM10), QC dan packing", lat: H.lat, lng: H.lng, leg: "Grab" },
	] },
	{ day: 5, date: "2026-11-08", title: "Kirim paket, top-up Pasar Seni, pulang", theme: "transit", transportRm: 29, mealsRm: 80, stops: [
		{ time: "08:00", name: H.name, note: "Serahkan paket ke logistik, check-out 09:15, titip koper (konfirmasi)", lat: H.lat, lng: H.lng },
		{ time: "09:35", name: "Pasar Seni + Petaling Street", note: "Top-up pesanan susulan, toko buka sekitar 10:00", lat: 3.1450, lng: 101.6965, leg: "Jalan kaki" },
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
