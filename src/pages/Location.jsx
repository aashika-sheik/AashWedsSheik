import { Clock, MapPin, CalendarCheck, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatEventDate } from "@/lib/formatEventDate";

export default function Location() {
    const locations = [
        {
            name: "R K Kalyana Mandapam",
            address: "S F No 276/3, Annur Road, Mettupalayam-641301",
            date: new Date("2025-11-23T10:00:00"),
            time: "10:30 AM onwards",
            maps_embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.631464790473!2d76.9600667!3d11.288478099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8eefcf322fa03%3A0xfe86da7c1d1fe29e!2sR%20K%20Marriage%20Hall!5e0!3m2!1sen!2sin!4v1761043932054!5m2!1sen!2sin",
            maps_url: "https://maps.app.goo.gl/2q8fYoqKui73Sz117"
        },
        {
            name: "CSK Mahal",
            address: "Athangarai, GST Rd, Mamandur, Tamil Nadu 603111",
            date: new Date("2025-11-30T11:00:00"),
            time: "11:00 AM onwards",
            maps_embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.9386529423705!2d79.94013997483566!3d12.652027087634726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52fd45956bb0bb%3A0xc2a1177f9d772431!2sCSK%20Mahal!5e0!3m2!1sen!2sin!4v1761043815669!5m2!1sen!2sin",
            maps_url: "https://maps.app.goo.gl/JoPT5tgx1yEtZEtL7"
        }
    ];

    return (
        <section id="location" className="min-h-screen relative overflow-hidden">
            <div className="container mx-auto px-4 py-20 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center space-y-4 mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="inline-block text-rose-500 font-medium"
                    >
                        Event Locations
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif text-gray-800"
                    >
                        Locations
                    </motion.h2>

                    {/* Decorative Divider */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-4 pt-4"
                    >
                        <div className="h-[1px] w-12 bg-rose-200" />
                        <MapPin className="w-5 h-5 text-rose-400" />
                        <div className="h-[1px] w-12 bg-rose-200" />
                    </motion.div>
                </motion.div>

                {/* Location Cards */}
                <div className="max-w-4xl mx-auto flex flex-col gap-12">
                    {locations.map((loc, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: idx * 0.2 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            {/* Map */}
                            <div className="w-full h-[300px] rounded-2xl overflow-hidden shadow-lg border-8 border-white">
                                <iframe
                                    src={loc.maps_embed}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-full"
                                ></iframe>
                            </div>

                            {/* Venue Details */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
                                <h3 className="text-2xl font-serif text-gray-800">{loc.name}</h3>

                                <div className="flex items-start space-x-4">
                                    <MapPin className="w-5 h-5 text-rose-500 mt-1" />
                                    <p className="text-gray-600 flex-1">{loc.address}</p>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <CalendarCheck className="w-5 h-5 text-rose-500" />
                                    <p className="text-gray-600">{formatEventDate(loc.date)}</p>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <Clock className="w-5 h-5 text-rose-500" />
                                    <p className="text-gray-600">{loc.time}</p>
                                </div>

                                <motion.a
                                    href={loc.maps_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full flex items-center justify-center gap-1.5 bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    <span className="font-semibold">View Map</span>
                                </motion.a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
