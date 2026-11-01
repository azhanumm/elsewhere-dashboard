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
	{ day: 1, date: "2026-11-04", title: "Mendarat, konten Chinatown", theme: "konten", transportRm: 113, mealsRm: 90, stops: [
		{ time: "15:25", name: "KLIA2", note: "Imigrasi, bagasi, jamak Zuhur-Asar di surau", lat: 2.7447, lng: 101.6852 },
		{ time: "17:15", name: "KL Sentral", note: "KLIA Ekspres RM55/orang, 28 menit", lat: 3.1343, lng: 101.6862, leg: "KLIA Ekspres" },
		{ time: "18:10", name: H.name, note: "Monorail 2 stop ke Maharajalela, check-in, Maghrib", lat: H.lat, lng: H.lng, leg: "Monorail" },
		{ time: "19:40", name: "Kasturi Walk + Central Market", note: "Konten souvenir dan batik", lat: 3.1452, lng: 101.6957, leg: "Jalan kaki" },
		{ time: "20:30", name: "Petaling Street", note: "Konten malam, makan malam", lat: 3.1444, lng: 101.6976, leg: "Jalan kaki" },
		{ time: "21:30", name: H.name, note: "Isyak, posting klip, buka order", lat: H.lat, lng: H.lng, leg: "Jalan kaki" },
	] },
	{ day: 2, date: "2026-11-05", title: "Konten Masjid India + Bukit Bintang", theme: "konten", transportRm: 13, mealsRm: 125, stops: [
		{ time: "10:10", name: "SOGO + Tudungruffle (L3)", note: "Monorail 6 stop ke Medan Tuanku", lat: 3.1561, lng: 101.6953, leg: "Monorail" },
		{ time: "11:25", name: "Muaz Textiles", note: "Jalan TAR", lat: 3.1549, lng: 101.6963, leg: "Jalan kaki" },
		{ time: "12:15", name: "Haniffa", note: "Cokelat, snack", lat: 3.1541, lng: 101.6975, leg: "Jalan kaki" },
		{ time: "13:10", name: "Mydin Masjid India", note: "Zuhur di Masjid India, makan siang", lat: 3.1528, lng: 101.6972, leg: "Jalan kaki" },
		{ time: "15:20", name: "Kunafa Finger's", note: "Monorail ke Bukit Bintang", lat: 3.1458, lng: 101.7113, leg: "Monorail" },
		{ time: "15:55", name: "Don Don Donki (Lot 10)", note: "Buka sampai 02:00", lat: 3.1468, lng: 101.7118, leg: "Jalan kaki" },
		{ time: "16:45", name: "Pavilion KL", note: "Asar, Tokyo Milk, kosmetik", lat: 3.1491, lng: 101.7129, leg: "Jalan kaki" },
		{ time: "18:45", name: "Sungei Wang Plaza", note: "Maghrib di musala", lat: 3.1450, lng: 101.7113, leg: "Jalan kaki" },
		{ time: "19:35", name: "Berjaya Times Square", note: "Konten terakhir", lat: 3.1422, lng: 101.7106, leg: "Jalan kaki" },
		{ time: "20:40", name: H.name, note: "Monorail Imbi ke Maharajalela", lat: H.lat, lng: H.lng, leg: "Monorail" },
	] },
	{ day: 3, date: "2026-11-06", title: "Beli: Masjid India + Chinatown", theme: "beli", transportRm: 15, mealsRm: 116, stops: [
		{ time: "10:00", name: "SOGO + Tudungruffle (L3)", note: "Monorail ke Medan Tuanku", lat: 3.1561, lng: 101.6953, leg: "Monorail" },
		{ time: "11:00", name: "Muaz Textiles", note: "Cek struk sebelum bayar", lat: 3.1549, lng: 101.6963, leg: "Jalan kaki" },
		{ time: "12:00", name: "Haniffa", note: "Cek komposisi cokelat", lat: 3.1541, lng: 101.6975, leg: "Jalan kaki" },
		{ time: "13:50", name: "Mydin Masjid India", note: "Barang berat terakhir, Zuhur dulu", lat: 3.1528, lng: 101.6972, leg: "Jalan kaki" },
		{ time: "15:00", name: H.name, note: "Grab dengan belanjaan (~RM10)", lat: H.lat, lng: H.lng, leg: "Grab" },
		{ time: "15:30", name: "Beryl's Jalan Panggong", note: "Tutup 18:30", lat: 3.1416, lng: 101.6971, leg: "Jalan kaki" },
		{ time: "17:00", name: "Petaling Street", note: "Souvenir, aksesori, tawar 50-60%", lat: 3.1444, lng: 101.6976, leg: "Jalan kaki" },
		{ time: "18:00", name: "Central Market + Kasturi Walk", note: "Magnet, batik", lat: 3.1453, lng: 101.6954, leg: "Jalan kaki" },
		{ time: "20:30", name: H.name, note: "Sortir tas, live selling", lat: H.lat, lng: H.lng, leg: "Jalan kaki" },
	] },
	{ day: 4, date: "2026-11-07", title: "Beli: Imbi dan Bukit Bintang", theme: "beli", transportRm: 14, mealsRm: 116, stops: [
		{ time: "10:00", name: "Berjaya Times Square", note: "Monorail 2 stop ke Imbi", lat: 3.1422, lng: 101.7106, leg: "Monorail" },
		{ time: "12:00", name: "Sungei Wang Plaza", note: "Zuhur di musala, makan siang", lat: 3.1450, lng: 101.7113, leg: "Jalan kaki" },
		{ time: "14:15", name: "Pavilion KL", note: "Asar, Tokyo Milk, kosmetik", lat: 3.1491, lng: 101.7129, leg: "Jalan kaki" },
		{ time: "18:15", name: "Kunafa Finger's", note: "Camilan sore", lat: 3.1458, lng: 101.7113, leg: "Jalan kaki" },
		{ time: "19:40", name: "Don Don Donki (Lot 10)", note: "Paling akhir, buka sampai 02:00", lat: 3.1468, lng: 101.7118, leg: "Jalan kaki" },
		{ time: "21:30", name: H.name, note: "Grab (~RM10), QC dan packing", lat: H.lat, lng: H.lng, leg: "Grab" },
	] },
	{ day: 5, date: "2026-11-08", title: "Kirim paket, Mitsui, pulang", theme: "transit", transportRm: 29, mealsRm: 80, stops: [
		{ time: "08:00", name: H.name, note: "Serahkan paket ke logistik, check-out 09:15", lat: H.lat, lng: H.lng },
		{ time: "09:45", name: "KL Sentral", note: "Monorail 2 stop", lat: 3.1343, lng: 101.6862, leg: "Monorail" },
		{ time: "11:15", name: "KLIA2", note: "Skybus RM13/orang, ~75 menit (hemat RM84 vs KLIA Ekspres)", lat: 2.7447, lng: 101.6852, leg: "Skybus" },
		{ time: "11:45", name: "Mitsui Outlet Park", note: "Shuttle gratis (verifikasi), sepatu dan tas, keluar 14:00", lat: 2.7802, lng: 101.6773, leg: "Shuttle" },
		{ time: "14:30", name: "KLIA2", note: "Beryl's L3, Garrett L2, bag drop 15:00", lat: 2.7447, lng: 101.6852, leg: "Shuttle" },
		{ time: "17:15", name: "Penerbangan pulang", note: "", lat: 2.7447, lng: 101.6852 },
	] },
];

export const mapsUrl = (stops: { lat: number; lng: number }[]) =>
	"https://www.google.com/maps/dir/" + stops.map(s => `${s.lat},${s.lng}`).join("/") + "/data=!4m2!4m1!3e3";
export const dayStopsFromHotel = (d: RouteDay) => {
	const pts = [{ lat: routeConfig.hotel.lat, lng: routeConfig.hotel.lng }, ...d.stops];
	return pts;
};
