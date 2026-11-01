'use client';

import React, { useEffect, useState } from 'react';
import { PageWidth, useArmoyu, useAuth, useCart } from '@armoyu/ui';
import Link from 'next/link';
import { BackToStore } from '@armoyu/ui';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price);

export default function CheckoutPage() {
  const { ui } = useArmoyu();
  const { user, setIsLoginModalOpen } = useAuth();
  const { cart, clearCart, totalPrice } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    postalCode: ''
  });
  const [order, setOrder] = useState<{ total: number; shippingCost: number } | null>(null);
  const [iframeUrl, setIframeUrl] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [provinces, setProvinces] = useState<any[]>([]);
  const [counties, setCounties] = useState<any[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCityChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, city: e.target.value, district: '' });
    setCounties([]);

    const province = provinces.find((p) => p.name === e.target.value);
    if (!province) return;

    const response = await ui.api.locations.getCounties(1, province.id);
    if (response.durum === 1) setCounties(response.icerik);
  };

  useEffect(() => {
    ui.api.locations.getProvinces(1).then((response: any) => {
      if (response.durum === 1) setProvinces(response.icerik);
    });
  }, [ui.api.locations]);

  // Yalnızca boş alanlar doldurulur: yazılanın üzerine yazılmaz
  useEffect(() => {
    if (!user) return;

    ui.api.auth.me().then((response: any) => {
      if (response.durum !== 1 || !response.icerik) return;
      const { displayName, email, phone } = response.icerik;
      setFormData((current) => ({
        ...current,
        name: current.name || displayName || '',
        email: current.email || email || '',
        phone: current.phone || phone || '',
      }));
    });
  }, [user?.id, ui.api.auth]);

  // Kart bilgisi sitemize girmez: ödeme, ödeme kuruluşunun iframe'inde alınır
  const startPayment = async (orderId: string) => {
    const returnUrl = `${window.location.origin}/magaza/siparislerim`;
    const response = await ui.api.shop.startPayment(orderId, { successUrl: returnUrl, failUrl: returnUrl });

    if (response.durum === 1) {
      setIframeUrl(response.icerik.iframeUrl);
      setStep(2);
    } else {
      setPaymentError(response.aciklama || 'Ödeme başlatılamadı.');
      setStep(3);
    }
  };

  // Siparişlerim'den "Ödemeyi tamamla" ile gelindiğinde
  useEffect(() => {
    const orderId = new URLSearchParams(window.location.search).get('siparis');
    if (orderId && user) startPayment(orderId);
  }, [user]);

  const handleCreateOrder = async () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    setIsBusy(true);
    setError('');
    const response = await ui.api.shop.createOrder(formData);

    if (response.durum === 1) {
      setOrder(response.icerik);
      clearCart();
      await startPayment(response.icerik.id);
    } else {
      setError(response.aciklama || 'Sipariş oluşturulamadı.');
    }
    setIsBusy(false);
  };

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1000px]" />

      <div className="mb-12">
        <BackToStore />
        <h1 className="text-4xl md:text-6xl font-black text-armoyu-text uppercase tracking-tighter italic leading-tight text-center">
          GÜVENLİ <span className="text-blue-600">ÖDEME</span>
        </h1>
        
        {/* Progress Stepper */}
        <div className="flex items-center justify-center gap-4 mt-8">
           <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all ${step >= 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 text-armoyu-text-muted border border-white/10'}`}>1</div>
           <div className={`w-12 h-0.5 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-white/10'}`} />
           <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all ${step >= 2 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 text-armoyu-text-muted border border-white/10'}`}>2</div>
           <div className={`w-12 h-0.5 rounded-full ${step >= 3 ? 'bg-blue-600' : 'bg-white/10'}`} />
           <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all ${step >= 3 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 text-armoyu-text-muted border border-white/10'}`}>3</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Form Area */}
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
           {step === 1 && (
             <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl">
               <h2 className="text-sm font-black text-armoyu-text uppercase tracking-widest mb-8">İLETİŞİM BİLGİLERİ</h2>
               <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1">Ad Soyad</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Adınız ve Soyadınız" className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all shadow-inner" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1">E-Posta</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="ornek@mail.com" className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all shadow-inner" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1">Telefon</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="05XX XXX XX XX" className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all shadow-inner" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1">Adres</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Mahalle, sokak, kapı no" className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all shadow-inner" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1">Şehir</label>
                    {provinces.length > 0 ? (
                       <select name="city" value={formData.city} onChange={handleCityChange} aria-label="Şehir seçin" className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all shadow-inner">
                         <option value="">Şehir seçin</option>
                         {provinces.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
                       </select>
                    ) : (
                       <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="İstanbul" className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all shadow-inner" />
                    )}
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1">İlçe</label>
                    {counties.length > 0 ? (
                       <select name="district" value={formData.district} onChange={handleInputChange} aria-label="İlçe seçin" className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all shadow-inner">
                         <option value="">İlçe seçin</option>
                         {counties.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
                       </select>
                    ) : (
                       <input type="text" name="district" value={formData.district} onChange={handleInputChange} placeholder="Kadıköy" className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all shadow-inner" />
                    )}
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1">Posta Kodu</label>
                    <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} placeholder="34000" className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all shadow-inner" />
                 </div>
                 {error && <p role="alert" className="text-xs font-bold text-red-500">{error}</p>}
                 <button onClick={handleCreateOrder} disabled={isBusy || cart.length === 0} className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-50">
                    {isBusy ? 'SİPARİŞ OLUŞTURULUYOR...' : 'SİPARİŞİ OLUŞTUR VE ÖDEMEYE GEÇ'}
                 </button>
               </div>
             </div>
           )}

           {step === 2 && (
             <div className="glass-panel p-4 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl overflow-hidden">
               <iframe src={iframeUrl} title="Güvenli ödeme" className="w-full min-h-[640px] rounded-3xl border-0 bg-white" />
             </div>
           )}

           {step === 3 && (
             <div className="text-center py-20 glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-8 animate-bounce">
                   <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic mb-4">SİPARİŞİN ALINDI!</h2>
                <p className="text-armoyu-text-muted font-medium mb-12">
                   {paymentError ? `Ödeme alınamadı: ${paymentError} Siparişin "Ödeme Bekliyor" olarak duruyor.` : 'Siparişin başarıyla oluşturuldu.'}
                </p>
                <div className="flex flex-col gap-4">
                   <Link href="/magaza/siparislerim" className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-500/20">SİPARİŞLERİME GİT</Link>
                   <Link href="/magaza" className="w-full py-4 text-armoyu-text-muted hover:text-armoyu-text font-black text-xs uppercase tracking-widest transition-colors tracking-tighter">ALIŞVERİŞE DEVAM ET</Link>
                </div>
             </div>
           )}
        </div>

        {/* Info Sidebar */}
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
           <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
              <h2 className="text-xs font-black text-armoyu-text uppercase tracking-widest mb-6">SİPARİŞ ÖZETİ</h2>
              <div className="space-y-4 mb-6">
                 {cart.map((item: any) => (
                   <div key={item.product.id} className="flex justify-between items-center bg-black/10 dark:bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div className="text-[10px] font-black uppercase text-armoyu-text leading-tight">{item.product.name} (x{item.quantity})</div>
                      <span className="text-xs font-black text-blue-500">{formatPrice(item.getTotalPrice())}</span>
                   </div>
                 ))}
              </div>
              <div className="border-t border-white/5 pt-6 space-y-4">
                 {order && (
                   <div className="flex justify-between text-[11px] font-bold text-armoyu-text-muted uppercase tracking-widest">
                      <span>KARGO</span>
                      <span>{formatPrice(order.shippingCost)}</span>
                   </div>
                 )}
                 <div className="flex justify-between text-xl font-black text-armoyu-text pt-4">
                    <span>{order ? 'TOPLAM' : 'ARA TOPLAM'}</span>
                    <span className="text-blue-500">{formatPrice(order ? order.total : totalPrice)}</span>
                 </div>
                 {!order && <p className="text-[10px] font-bold text-armoyu-text-muted">Kargo ücreti sipariş oluşturulunca eklenir.</p>}
              </div>
           </div>

           {/* Security Badges */}
           <div className="flex flex-col gap-4 text-center">
              <div className="flex items-center justify-center gap-6 opacity-30 invert dark:invert-0 grayscale">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" className="h-6 object-contain" alt="Visa" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-8 object-contain" alt="Mastercard" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" className="h-6 object-contain" alt="PayPal" />
              </div>
              <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest flex items-center justify-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                 TÜM VERİLERİNİZ ŞİFRELENMEKTEDİR
              </p>
           </div>
        </div>

      </div>
    </div>
  );
}
