export type CatalogueVariant = {
  photo_url?: string | null;
  option1_value?: string | null;
  option2_value?: string | null;
  id: string;
  name: string;
  sale_mode: 'stock' | 'preorder';
  available: number | null;
  unit_price_idr: number | null;
};
export type CatalogueProduct = {
  id: string;
  name: string;
  brand: string;
  category: string;
  photo_url: string;
  option1_label?: string | null;
  option2_label?: string | null;
  trip_code: string;
  trip_name: string;
  country: string;
  departure_date: string | null;
  return_date: string | null;
  product_variants: CatalogueVariant[];
};
export type Payment = {
  id: string;
  amount_idr: number;
  reference: string;
  receipt_path: string | null;
  verified_at: string | null;
  created_at: string;
};
export type Order = {
  id: string;
  order_code: string;
  trip_code: string;
  customer_name: string;
  phone: string;
  address: string;
  notes: string;
  total_idr: number;
  status: string;
  courier: string;
  tracking_number: string;
  created_at: string;
  order_items: {
    product_name: string;
    variant_name: string;
    quantity: number;
    unit_price_idr: number;
  }[];
  order_payments: Payment[];
};
export const orderStatuses: Record<string, string> = {
  new: 'Baru',
  confirmed: 'Dikonfirmasi',
  purchased: 'Sudah dibeli',
  arrived: 'Sudah tiba',
  packed: 'Dikemas',
  shipped: 'Dikirim',
  completed: 'Selesai',
  cancelled: 'Dibatalkan',
};
export const orderLifecycleStages = [
  { id: 'new', label: 'Place', phase: 'place', description: 'Pesanan masuk dari katalog atau WhatsApp' },
  { id: 'confirmed', label: 'Bayar', phase: 'pay', description: 'Menunggu / verifikasi pembayaran' },
  { id: 'purchased', label: 'Belanja', phase: 'shopping', description: 'Barang sudah dibeli' },
  { id: 'arrived', label: 'Tiba', phase: 'shopping', description: 'Barang sudah sampai di gudang' },
  { id: 'packed', label: 'Packing', phase: 'packing', description: 'Siap dikirim dan dikemas' },
  { id: 'shipped', label: 'Ngantar', phase: 'delivery', description: 'Dalam proses kirim ke pelanggan' },
  { id: 'completed', label: 'Selesai', phase: 'delivery', description: 'Pesanan selesai' },
] as const;

export const paidAmount = (order: Order) =>
  order.order_payments
    .filter((p) => p.verified_at)
    .reduce((sum, p) => sum + Number(p.amount_idr), 0);
export const paymentLabel = (order: Order) =>
  paidAmount(order) >= Number(order.total_idr)
    ? 'Lunas'
    : 'Belum dibayar';
export function getOrderLifecycle(order: Pick<Order, 'status' | 'courier' | 'tracking_number'>) {
  const stages = [...orderLifecycleStages];
  const current = stages.find((stage) => stage.id === order.status) ?? stages[0];
  const currentIndex = stages.findIndex((stage) => stage.id === current.id);
  const progress = order.status === 'cancelled' ? 0 : Number(((currentIndex + 1) / stages.length).toFixed(2));
  const next = stages[Math.min(currentIndex + 1, stages.length - 1)];
  const phaseSummary = {
    place: 'Pesanan terdaftar dan siap untuk konfirmasi customer.',
    pay: 'Pembayaran harus dikonfirmasi sebelum belanja / pengiriman.',
    shopping: 'Barang sedang diproses, dicek, dan disiapkan di gudang.',
    packing: 'Order sedang dikemas dan siap untuk dikirim.',
    delivery: 'Pengiriman / penjemputan / penerimaan pelanggan sedang berjalan.',
  }[current.phase] ?? 'Order sedang dipantau.';
  return {
    stages,
    current,
    next,
    progress,
    phaseSummary,
    currentLabel: orderStatuses[order.status] ?? current.label,
  };
}
export function orderWhatsAppTemplates(
  order: Pick<Order, 'customer_name' | 'order_code' | 'phone' | 'status' | 'courier' | 'tracking_number' | 'total_idr'> & {
    order_items?: Array<{
      product_name: string;
      variant_name?: string | null;
      quantity?: number | null;
    }>;
  },
) {
  const lifecycle = getOrderLifecycle(order);
  const statusUpdate = `Halo ${order.customer_name}, status pesanan ${order.order_code} saat ini: ${lifecycle.currentLabel}. ${lifecycle.phaseSummary} Jika ada perubahan, kami akan update kembali.`;
  const paymentReminder = `Halo ${order.customer_name}, berikut status pembayaran pesanan ${order.order_code}. Total tagihan ${Number(order.total_idr).toLocaleString('id-ID')} dan pembayaran masih belum terkonfirmasi. Mohon kirim bukti pembayaran agar proses order bisa lanjut.`;
  const proofSubmitted = `Halo Elsewhere, saya ingin konfirmasi pesanan ${order.order_code}. Bukti pembayaran sudah saya kirim dan saya menunggu konfirmasi dari tim.`;
  const productSummary = (order.order_items ?? []).length
    ? (order.order_items ?? [])
        .map((item) => `${item.product_name}${item.variant_name ? ` (${item.variant_name})` : ''} × ${item.quantity ?? 1}`)
        .join(', ')
    : 'Detail produk belum tersedia';
  const paymentConfirmation = `Halo ${order.customer_name}! Pembayaran untuk pesanan ${order.order_code} sudah kami terima. Pesananmu resmi terkonfirmasi yaa\n\n*Detail pesanan*\n• Produk: ${productSummary}\n• Total pembayaran: Rp${Number(order.total_idr).toLocaleString('id-ID')}\n• Estimasi tiba di Indonesia: 17 November 2026\n\nKami kabari lagi saat pesananmu siap dikirim atau kalau ada update lainnya. Thank you sudah titip di Elsewhere & Co. 🛍️`;
  const trackingUpdate = `Halo ${order.customer_name}, pesanan ${order.order_code} sudah masuk tahap pengiriman. Kurir: ${order.courier || 'sedang dipilih'}${order.tracking_number ? `. Resi: ${order.tracking_number}` : ''}. Mohon konfirmasi saat paket sampai.`;
  return {
    statusUpdate,
    paymentReminder,
    proofSubmitted,
    paymentConfirmation,
    trackingUpdate,
  };
}
export function normalizePhone(value: string) {
  const digits = value.replace(/[\s()+-]/g, '');
  return digits.startsWith('0') ? `62${digits.slice(1)}` : digits;
}
