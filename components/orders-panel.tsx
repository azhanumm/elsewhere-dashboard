import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  type Order,
  getOrderLifecycle,
  normalizePhone,
  orderStatuses,
  orderWhatsAppTemplates,
  paidAmount,
  paymentLabel,
} from '../lib/commerce';
import { rupiah } from '../lib/pricing';

export default function OrdersPanel({
  tripCode,
  onChange,
}: {
  tripCode: string;
  onChange: () => void;
}) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*,order_items(*),order_payments(*)')
        .eq('trip_code', tripCode)
        .order('created_at', { ascending: false });
      if (!active) return;
      setLoading(false);
      if (error)
        setError(
          'Pesanan belum bisa dimuat. Pastikan pembaruan database sudah diterapkan.',
        );
      else {
        setOrders((data || []) as Order[]);
        setError('');
      }
    };
    void load();
    const timer = setInterval(load, 15000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [tripCode, revision]);
  const selected = orders.find((o) => o.id === selectedId);
  const shown = orders.filter(
    (o) =>
      (filter === 'all' || o.status === filter) &&
      `${o.order_code} ${o.customer_name} ${o.phone}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const changed = () => {
    setRevision((n) => n + 1);
    onChange();
  };
  return (
    <section className="orders-workspace">
      <div className="commerce-heading">
        <div>
          <span className="commerce-eyebrow">{tripCode} · OPERASIONAL</span>
          <h1>Pesanan</h1>
          <p>Konfirmasi, pembayaran, dan pengiriman dalam satu tempat.</p>
        </div>
        <button onClick={changed}>Perbarui</button>
      </div>
      <div className="commerce-filters">
        <input
          aria-label="Cari pesanan"
          placeholder="Cari nomor, nama, atau WhatsApp…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          aria-label="Filter status"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Semua status</option>
          {Object.entries(orderStatuses).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p role="alert" className="commerce-error">
          {error}
        </p>
      )}
      {loading ? (
        <output>Memuat pesanan…</output>
      ) : (
        !error && (
          <div className="orders-layout">
            <div className="order-list">
              {!shown.length && (
                <div className="panel commerce-empty">
                  Belum ada pesanan yang cocok. Pesanan dari katalog akan muncul
                  di sini.
                </div>
              )}
              {shown.map((order) => (
                <button
                  className={`panel order-list-card ${order.id === selectedId ? 'selected' : ''}`}
                  key={order.id}
                  onClick={() => setSelectedId(order.id)}
                >
                  <small className="order-code">{order.order_code}</small>
                  <strong>{order.customer_name}</strong>
                  <span>
                    {order.order_items
                      .map((i) => `${i.product_name} × ${i.quantity}`)
                      .join(', ')}
                  </span>
                  <b>{rupiah(Number(order.total_idr))}</b>
                  <span>
                    {orderStatuses[order.status]} · {paymentLabel(order)}
                  </span>
                  <small>
                    {new Date(order.created_at).toLocaleString('id-ID')}
                  </small>
                </button>
              ))}
            </div>
            {selected ? (
              <OrderDetail
                key={`${selected.id}:${selected.status}:${selected.courier}:${selected.tracking_number}`}
                order={selected}
                onChange={changed}
              />
            ) : (
              <div className="panel commerce-empty">
                Pilih pesanan untuk melihat detail.
              </div>
            )}
          </div>
        )
      )}
    </section>
  );
}
function OrderDetail({
  order,
  onChange,
}: {
  order: Order;
  onChange: () => void;
}) {
  const [status, setStatus] = useState(order.status);
  const [courier, setCourier] = useState(order.courier);
  const [tracking, setTracking] = useState(order.tracking_number);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [confirmCancel, setConfirmCancel] = useState(false);
  const locked = useRef(false);
  const lifecycle = getOrderLifecycle(order);
  const whatsappTemplates = orderWhatsAppTemplates(order);
  const openWhatsApp = (text: string) => {
    window.open(
      `https://wa.me/${normalizePhone(order.phone)}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer',
    );
  };
  const action = async (work: () => Promise<void>) => {
    if (locked.current) return;
    locked.current = true;
    setBusy(true);
    setMessage('');
    try {
      await work();
      setMessage('Perubahan tersimpan.');
      onChange();
    } catch (error) {
      setMessage((error as Error).message || 'Gagal menyimpan. Coba lagi.');
    } finally {
      locked.current = false;
      setBusy(false);
    }
  };
  const rpc = async (name: string, args: Record<string, unknown>) => {
    const { error } = await supabase.rpc(name, args);
    if (error) throw error;
  };
  const paid = paidAmount(order);
  return (
    <article className="panel order-detail">
      <span className="commerce-eyebrow">DETAIL PESANAN</span>
      <h2>{order.customer_name}</h2>
      <small className="order-code">{order.order_code}</small>
      {order.status === 'new' && !order.order_payments.some((payment) => payment.verified_at) && (
        <div className="payment-attention" role="status">
          <strong>Menunggu konfirmasi pembayaran</strong>
          <span>Cek bukti transfer di bawah, lalu klik Konfirmasi bayar setelah dana dan bukti sudah cocok.</span>
        </div>
      )}
      <div className="commerce-summary-box">
        <div>
          <span className="commerce-eyebrow">LIFECYCLE ORDER</span>
          <strong>{lifecycle.current.label}</strong>
        </div>
        <small>{lifecycle.phaseSummary}</small>
        <div className="order-progress" aria-label="Progress order lifecycle">
          {lifecycle.stages.map((stage) => (
            <span
              key={stage.id}
              className={stage.id === lifecycle.current.id ? 'active' : order.status === 'cancelled' ? 'cancelled' : 'done'}
              title={stage.description}
            />
          ))}
        </div>
        <div className="order-lifecycle-meta">
          {lifecycle.stages.map((stage) => (
            <span
              key={stage.id}
              className={stage.id === lifecycle.current.id ? 'current' : ''}
            >
              {stage.label}
            </span>
          ))}
        </div>
      </div>
      <div className="order-whatsapp-actions">
        <button type="button" onClick={() => openWhatsApp(whatsappTemplates.statusUpdate)}>
          Update status WhatsApp
        </button>
        <button type="button" onClick={() => openWhatsApp(whatsappTemplates.trackingUpdate)}>
          Kirim resi / pengiriman
        </button>
        {order.status === 'new' && !paidAmount(order) && (
          <button type="button" onClick={() => openWhatsApp(whatsappTemplates.paymentReminder)}>
            Ingatkan pembayaran
          </button>
        )}
      </div>
      {order.status !== 'cancelled' && order.status !== 'completed' && (
        <div className="order-admin-actions">
          {confirmCancel ? (
            <div className="order-delete-confirm">
              <span>Batalkan order ini?</span>
              <div>
                <button
                  type="button"
                  className="danger-button"
                  disabled={busy}
                  onClick={() =>
                    action(() =>
                      rpc('commerce_update_order', {
                        p_order_id: order.id,
                        p_status: 'cancelled',
                        p_courier: '',
                        p_tracking: '',
                      }),
                    )
                  }
                >
                  Ya, hapus
                </button>
                <button type="button" onClick={() => setConfirmCancel(false)}>
                  Batal
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="mini-delete-button"
              onClick={() => setConfirmCancel(true)}
              aria-label="Hapus order"
            >
              Hapus
            </button>
          )}
        </div>
      )}
      <a
        href={`https://wa.me/${normalizePhone(order.phone)}?text=${encodeURIComponent(`Halo ${order.customer_name}, kami dari Elsewhere ingin mengonfirmasi pesanan ${order.order_code}.`)}`}
        target="_blank"
        rel="noreferrer"
      >
        Hubungi via WhatsApp · {order.phone}
      </a>
      <div className="order-detail-sections">
        <section className="order-detail-section">
          <h3>Detail pemesanan</h3>
          <div className="order-detail-subsection">
            <h4>Customer</h4>
            <dl className="order-detail-grid">
              <div>
                <dt>Nama</dt>
                <dd>{order.customer_name}</dd>
              </div>
              <div>
                <dt>WhatsApp</dt>
                <dd>{order.phone}</dd>
              </div>
              <div className="full-width">
                <dt>Alamat</dt>
                <dd className="preserve-lines">{order.address}</dd>
              </div>
              {order.notes && (
                <div className="full-width">
                  <dt>Catatan</dt>
                  <dd className="preserve-lines">{order.notes}</dd>
                </div>
              )}
            </dl>
          </div>
          <div className="order-detail-subsection">
            <h4>Barang</h4>
            {order.order_items.map((i, index) => (
              <div className="commerce-total" key={index}>
                <span>
                  {i.product_name} · {i.variant_name} × {i.quantity}
                </span>
                <b>{rupiah(Number(i.unit_price_idr) * i.quantity)}</b>
              </div>
            ))}
            <div className="commerce-total">
              <span>Total barang</span>
              <b>{rupiah(Number(order.total_idr))}</b>
            </div>
          </div>
        </section>

        <section className="order-detail-section">
          <h3>Pembayaran</h3>
          <div className="order-detail-subsection compact">
            <dl className="order-detail-grid compact">
              <div>
                <dt>Terbayar</dt>
                <dd>{rupiah(paid)}</dd>
              </div>
              <div>
                <dt>Sisa</dt>
                <dd>{rupiah(Math.max(0, Number(order.total_idr) - paid))}</dd>
              </div>
            </dl>
          </div>
          <div className="payment-history">
            <h4>Riwayat pembayaran</h4>
            <p className="commerce-help payment-record-help">Setiap pembayaran tercatat sebagai riwayat. Cek bukti transfer dan konfirmasi bayar bila nominal sudah cocok.</p>
            {!order.order_payments.length && <p>Belum ada pembayaran.</p>}
            {order.order_payments.map((payment) => (
              <div className="payment-row" key={payment.id}>
                <strong>{rupiah(Number(payment.amount_idr))}</strong>
                <span>{payment.reference}</span>
                <small>
                  {payment.verified_at ? 'Terverifikasi' : 'Menunggu konfirmasi'}
                </small>
                <div className="payment-row-actions">
                  {payment.verified_at ? (
                    <a
                      className="payment-primary-action"
                      href={`https://wa.me/${normalizePhone(order.phone)}?text=${encodeURIComponent(whatsappTemplates.paymentConfirmation)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Kirim ke WhatsApp
                    </a>
                  ) : (
                    <button
                      className="payment-primary-action"
                      disabled={busy}
                      onClick={() =>
                        action(async () => {
                          await rpc('commerce_verify_payment', {
                            p_payment_id: payment.id,
                          });
                          window.open(
                            `https://wa.me/${normalizePhone(order.phone)}?text=${encodeURIComponent(whatsappTemplates.paymentConfirmation)}`,
                            '_blank',
                            'noopener,noreferrer',
                          );
                        })
                      }
                    >
                      Konfirmasi bayar
                    </button>
                  )}
                  {payment.receipt_path && (
                    <button
                      className="payment-secondary-action"
                      disabled={busy}
                      onClick={() =>
                        action(async () => {
                          const { data, error } = await supabase.storage
                            .from('order-receipts')
                            .createSignedUrl(payment.receipt_path!, 60);
                          if (error) throw error;
                          window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
                        })
                      }
                    >
                      Lihat bukti
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="order-detail-section">
          <h3>Pengiriman</h3>
          <p className="commerce-help">
            Ongkir domestik dikonfirmasi dan dicatat terpisah dari tagihan barang.
          </p>
          {message && <output className="commerce-message">{message}</output>}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void action(() =>
                rpc('commerce_update_order', {
                  p_order_id: order.id,
                  p_status: status,
                  p_courier: courier,
                  p_tracking: tracking,
                }),
              );
            }}
          >
            <fieldset
              disabled={busy || ['cancelled', 'completed'].includes(order.status)}
            >
              <label>
                Status
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  {Object.entries(orderStatuses).map(([value, label]) => (
                    <option value={value} key={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Kurir
                <input
                  maxLength={100}
                  value={courier}
                  onChange={(e) => setCourier(e.target.value)}
                  placeholder="JNE / J&T / lainnya"
                />
              </label>
              <label>
                Nomor resi
                <input
                  maxLength={100}
                  value={tracking}
                  onChange={(e) => setTracking(e.target.value)}
                />
              </label>
              <button type="submit" className="commerce-primary">
                Simpan status
              </button>
            </fieldset>
            <p className="commerce-help">
              Status maju berurutan. Pengiriman memerlukan pembayaran lunas dan
              resi. Pembatalan hanya sebelum pembelian, tanpa catatan pembayaran.
            </p>
          </form>
        </section>
      </div>
    </article>
  );
}
