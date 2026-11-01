// Rute harian trip Kuala Lumpur, 4-8 Nov 2026. Hotel: OYO 416 Grid 9 Hotel (Agoda: Swing & Pillows @ Grid 9).
// Biaya dalam RM untuk 2 orang. Tarif Monorail/Grab/MRT adalah perkiraan.
export type RouteStop = { time: string; name: string; note: string; lat: number; lng: number; leg?: string };
export type RouteDay = { flow: string; day: number; date: string; title: string; theme: "konten" | "beli" | "transit"; transportRm: number; mealsRm: number; stops: RouteStop[] };

export const routeConfig = {
	tripName: "Kuala Lumpur 4-8 Nov 2026",
	hotel: { name: "OYO 416 Grid 9 Hotel", address: "9 Jln Maharajalela, Kampung Attap, 50150 KL", lat: 3.1383, lng: 101.6993 },
	flight: { landing: "Rabu 4 Nov, 15:25 (KLIA2)", departure: "Minggu 8 Nov, 17:15 (KLIA2)" },
};

const H = { name: "Hotel Grid 9", lat: 3.1383, lng: 101.6993 };

export const routeDays: RouteDay[] = [
	{ flow: "KLIA2 - Mitsui Outlet (±1,5 jam) - KLIA2 - KL Sentral - Hotel (sampai ±21:00)", day: 1, date: "2026-11-04", title: "Mendarat, Mitsui Outlet singkat", theme: "beli", transportRm: 113, mealsRm: 74, stops: [
		{ time: "15:25", name: "KLIA2", note: "Imigrasi, bagasi, jamak Zuhur-Asar di surau", lat: 2.7447, lng: 101.6852 },
		{ time: "17:05", name: "Mitsui Outlet Park", note: "Shuttle gratis (verifikasi). Sekitar 95 menit: sepatu dan tas dari pre-order. Buka sampai 22:00", lat: 2.7802, lng: 101.6773, leg: "Shuttle" },
		{ time: "20:10", name: "KL Sentral", note: "Shuttle ke KLIA2, lalu KLIA Ekspres RM55/orang", lat: 3.1343, lng: 101.6862, leg: "KLIA Ekspres" },
		{ time: "21:05", name: H.name, note: "Monorail 2 stop ke Maharajalela, check-in, makan malam", lat: H.lat, lng: H.lng, leg: "Monorail" },
	] },
	{ flow: "Hotel - KLCC (Twin Towers, Suria) - Medan Tuanku (SOGO + Tudungruffle, Muaz, Haniffa, Mydin) - Chinatown (Beryl's Panggong, Petaling, Pasar Seni) - Hotel", day: 2, date: "2026-11-05", title: "Konten: KLCC, Masjid India, Chinatown", theme: "konten", transportRm: 14, mealsRm: 136, stops: [
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
	{ flow: "Hotel - Mitsui BBCC (LaLaport) - Imbi (Berjaya Times Square) - Bukit Bintang (Sungei Wang, Kunafa, Don Don Donki, Fahrenheit88, Pavilion) - Hotel (edit + posting) - Pasar Seni + Petaling (opsional beli)", day: 3, date: "2026-11-06", title: "Konten: Bukit Bintang, Imbi, LaLaport, lalu Pasar Seni", theme: "konten", transportRm: 4, mealsRm: 125, stops: [
		{ time: "09:45", name: "Mitsui Outlet Park BBCC (LaLaport L3)", note: "Jalan kaki 900 m dari hotel. 60 menit, buka 10:00-22:00", lat: 3.1405, lng: 101.7071, leg: "Jalan kaki" },
		{ time: "11:05", name: "Berjaya Times Square", note: "60 menit", lat: 3.1422, lng: 101.7106, leg: "Jalan kaki" },
		{ time: "12:10", name: "Sungei Wang Plaza", note: "55 menit, lalu Zuhur dan makan siang di musala", lat: 3.1450, lng: 101.7113, leg: "Jalan kaki" },
		{ time: "14:00", name: "Kunafa Finger's", note: "30 menit", lat: 3.1458, lng: 101.7113, leg: "Jalan kaki" },
		{ time: "14:35", name: "Don Don Donki (Lot 10)", note: "60 menit, konten saja", lat: 3.1468, lng: 101.7118, leg: "Jalan kaki" },
		{ time: "15:40", name: "Fahrenheit88", note: "40 menit (Discover Malaysia G35), Asar di surau", lat: 3.1473, lng: 101.7130, leg: "Jalan kaki" },
		{ time: "16:45", name: "Pavilion KL", note: "90 menit", lat: 3.1491, lng: 101.7129, leg: "Jalan kaki" },
		{ time: "18:20", name: H.name, note: "Monorail 3 stop ke hotel, Maghrib, makan malam, edit dan posting konten", lat: H.lat, lng: H.lng, leg: "Monorail" },
		{ time: "20:00", name: "Pasar Seni + Petaling Street (opsional beli)", note: "Setelah ada pesanan. Pasar Seni 40 menit, Petaling 45 menit", lat: 3.1450, lng: 101.6965, leg: "Jalan kaki" },
	] },
	{ flow: "Hotel - Medan Tuanku (SOGO + Tudungruffle, Muaz, Haniffa, Mydin) - Imbi (Mitsui BBCC, Berjaya) - Bukit Bintang (Sungei Wang, Fahrenheit88, Pavilion, Kunafa, Don Don Donki) - Hotel (udah dipaketin, tinggal nambah dan lakban kalau ada tambahan besoknya)", day: 4, date: "2026-11-07", title: "Beli: Masjid India, lalu Bukit Bintang dan Imbi", theme: "beli", transportRm: 19, mealsRm: 116, stops: [
		{ time: "10:00", name: "SOGO + Tudungruffle (L3)", note: "35 menit. Monorail 6 stop ke Medan Tuanku", lat: 3.1561, lng: 101.6953, leg: "Monorail" },
		{ time: "10:40", name: "Muaz Textiles", note: "50 menit, cek struk", lat: 3.1549, lng: 101.6963, leg: "Jalan kaki" },
		{ time: "11:35", name: "Haniffa", note: "45 menit", lat: 3.1541, lng: 101.6975, leg: "Jalan kaki" },
		{ time: "12:25", name: "Mydin Masjid India", note: "40 menit, lalu Zuhur dan makan siang", lat: 3.1528, lng: 101.6972, leg: "Jalan kaki" },
		{ time: "14:35", name: "Mitsui Outlet Park BBCC (LaLaport L3)", note: "Monorail langsung ke Imbi dengan belanjaan. 45 menit", lat: 3.1405, lng: 101.7071, leg: "Monorail" },
		{ time: "15:25", name: "Berjaya Times Square", note: "40 menit", lat: 3.1422, lng: 101.7106, leg: "Jalan kaki" },
		{ time: "16:10", name: "Sungei Wang Plaza", note: "50 menit, Asar di musala", lat: 3.1450, lng: 101.7113, leg: "Jalan kaki" },
		{ time: "17:05", name: "Fahrenheit88", note: "35 menit (Discover Malaysia G35)", lat: 3.1473, lng: 101.7130, leg: "Jalan kaki" },
		{ time: "17:45", name: "Pavilion KL", note: "85 menit, tutup 22:00", lat: 3.1491, lng: 101.7129, leg: "Jalan kaki" },
		{ time: "19:10", name: "Kunafa Finger's", note: "Maghrib dan makan malam dulu, lalu Kunafa", lat: 3.1458, lng: 101.7113, leg: "Jalan kaki" },
		{ time: "20:20", name: "Don Don Donki (Lot 10)", note: "90 menit, paling akhir, buka sampai 02:00", lat: 3.1468, lng: 101.7118, leg: "Jalan kaki" },
		{ time: "21:55", name: H.name, note: "Grab ~RM10, QC, packing semua pesanan sampai siap kirim, live selling", lat: H.lat, lng: H.lng, leg: "Grab" },
	] },
	{ flow: "Hotel - Finishing beli yang belum kebeli (Chinatown / Mitsui BBCC / Imbi) - Paketin - KLIA2 (Beryl's, Garrett) - pulang 17:15", day: 5, date: "2026-11-08", title: "Finishing beli, kirim paket, pulang", theme: "transit", transportRm: 29, mealsRm: 80, stops: [
		{ time: "09:00", name: "Finishing beli (Chinatown, LaLaport BBCC, atau Imbi / Bukit Bintang)", note: "Barang yang belum terbeli, maksimal 2 area terdekat. Toko buka sekitar 10:00", lat: 3.1440, lng: 101.6967, leg: "Jalan kaki" },
		{ time: "11:00", name: H.name, note: "Tambah paket dan lakban, serahkan ke logistik (jemput ~11:15), check-out 11:45", lat: H.lat, lng: H.lng },
		{ time: "11:55", name: "KL Sentral", note: "Monorail 2 stop", lat: 3.1343, lng: 101.6862, leg: "Monorail" },
		{ time: "13:50", name: "KLIA2", note: "Skybus ~12:35, RM13/orang. Zuhur, Beryl's L3, Garrett L2, bag drop 14:30", lat: 2.7447, lng: 101.6852, leg: "Skybus" },
		{ time: "17:15", name: "Penerbangan pulang", note: "", lat: 2.7447, lng: 101.6852 },
	] },
];

export const mapsUrl = (stops: { lat: number; lng: number }[]) =>
	"https://www.google.com/maps/dir/" + stops.map(s => `${s.lat},${s.lng}`).join("/") + "/data=!4m2!4m1!3e3";
export const dayStopsFromHotel = (d: RouteDay) => {
	const pts = [{ lat: routeConfig.hotel.lat, lng: routeConfig.hotel.lng }, ...d.stops];
	return pts;
};
