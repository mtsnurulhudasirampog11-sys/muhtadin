import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/mockData';
import { submitContactInquiry } from '../services/firebase';

export const ContactAndLocation: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Pertanyaan PPDB & Pendaftaran',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.message.trim()) return;

    setIsSubmitting(true);
    try {
      await submitContactInquiry(formState);
      setIsSuccess(true);
      setFormState({
        name: '',
        email: '',
        phone: '',
        subject: 'Pertanyaan PPDB & Pendaftaran',
        message: ''
      });
      setTimeout(() => setIsSuccess(false), 6000);
    } catch (err) {
      console.error('Contact inquiry error:', err);
      alert('Gagal mengirim pesan. Silakan coba kembali atau hubungi via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Assalamu'alaikum Warahmatullahi Wabarakatuh, saya ingin menanyakan informasi tentang MTs Nurul Huda Mendala Sirampog.`
    );
    window.open(`https://wa.me/${SCHOOL_INFO.contact.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="kontak" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Layanan & Komunikasi
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hubungi MTs Nurul Huda Mendala
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Panitia PPDB dan pihak madrasah siap melayani pertanyaan seputar pendaftaran, program beasiswa, dan konsultasi santri.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Info & Google Maps (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">Alamat Madrasah</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {SCHOOL_INFO.address.fullAddress}
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-teal-50 text-teal-700 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">WhatsApp & Telepon</h4>
                  <p className="text-xs text-slate-600 mt-1 font-mono">
                    WA: {SCHOOL_INFO.contact.whatsappFormatted}
                  </p>
                  <p className="text-xs text-slate-500 font-mono">
                    Telp: {SCHOOL_INFO.contact.phone}
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-amber-50 text-amber-700 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">Email Resmi</h4>
                  <p className="text-xs text-slate-600 mt-1 font-mono break-all">
                    {SCHOOL_INFO.contact.email}
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-indigo-50 text-indigo-700 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">Jam Layanan Kantor</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Senin - Sabtu: 07.30 - 14.30 WIB
                  </p>
                  <span className="text-[11px] text-slate-400">Jumat: 07.30 - 11.00 WIB</span>
                </div>
              </div>
            </div>

            {/* Embedded Map Representation */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs overflow-hidden space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-xs sm:text-sm text-slate-800">
                    Peta Lokasi MTs Nurul Huda Mendala Sirampog
                  </span>
                </div>
                <a
                  href={`https://maps.google.com/?q=MTs+Nurul+Huda+Mendala+Sirampog+Brebes`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Map Preview Graphic */}
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                <iframe
                  title="Lokasi MTs Nurul Huda Mendala"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15838.083161394435!2d109.0435133!3d-7.1812856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f917578278f35%3A0x6b8f1d4b68e98348!2sMendala%2C%20Sirampog%2C%20Brebes%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
                <span>Rute: Mudah dijangkau dari arah Bumiayu & Tuwel/Guci Tegal</span>
                <button
                  onClick={handleDirectWhatsApp}
                  className="font-bold text-emerald-800 underline hover:text-emerald-950 cursor-pointer"
                >
                  Panduan Rute via WA &rarr;
                </button>
              </div>
            </div>

          </div>

          {/* Right: Contact Form (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
              
              <div className="border-b border-slate-100 pb-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full mb-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Kirim Pesan / Pertanyaan</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Konsultasi Online
                </h3>
                <p className="text-xs text-slate-500">
                  Tinggalkan pesan, sekretariat madrasah akan merespon melalui WhatsApp atau Email Anda.
                </p>
              </div>

              {isSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2.5 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Pesan Anda telah berhasil dikirim ke database madrasah. Terima kasih!</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Lengkap Anda <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bpk. Ahmad / Ibu Siti"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      No. WhatsApp / HP <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0812xxxxxxx"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="email@anda.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Perihal / Topik
                  </label>
                  <select
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Pertanyaan PPDB & Pendaftaran">Pertanyaan PPDB & Pendaftaran</option>
                    <option value="Informasi Beasiswa Tahfidz & KIP">Informasi Beasiswa Tahfidz & KIP</option>
                    <option value="Program Asrama / Pondok Mitra">Program Asrama / Pondok Pesantren Mitra</option>
                    <option value="Mutasi / Pindahan Siswa">Mutasi / Pindahan Siswa</option>
                    <option value="Kerjasama & Lainnya">Kerjasama & Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Isi Pesan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tuliskan pertanyaan atau informasi yang ingin Anda tanyakan..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-md transition transform active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Mengirim...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Kirim Pesan Sekarang</span>
                    </>
                  )}
                </button>
              </form>

              {/* Direct Helpdesk link */}
              <div className="pt-2 text-center border-t border-slate-100">
                <span className="text-[11px] text-slate-500">Respon Cepat Langsung ke Panitia:</span>
                <button
                  onClick={handleDirectWhatsApp}
                  className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span>Chat WhatsApp Resmi ({SCHOOL_INFO.contact.whatsappFormatted}) &rarr;</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
