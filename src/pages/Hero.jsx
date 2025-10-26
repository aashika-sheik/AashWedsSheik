import { Calendar, Clock, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import config from '@/config/config';
import { formatEventDate, formatTime } from '@/lib/formatEventDate';
import { safeBase64 } from '@/lib/base64';

export default function Hero() {
    const [guestName, setGuestName] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const guestParam = urlParams.get('guest');

        if (guestParam) {
            try {
                const decodedName = safeBase64.decode(guestParam);
                setGuestName(decodedName);
            } catch (error) {
                console.error('Error decoding guest name:', error);
                setGuestName('');
            }
        }
    }, []);

    const CountdownTimer = ({ targetDate }) => {
        const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

        function calculateTimeLeft() {
            const istOffset = 5.5 * 60 * 60 * 1000; // IST = UTC+5:30
            const nowUTC = new Date().getTime();
            const nowIST = nowUTC + istOffset;

            const targetTime = new Date(targetDate).getTime();
            const difference = targetTime - nowIST;

            let timeLeft = {};
            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return timeLeft;
        }

        useEffect(() => {
            const timer = setInterval(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);
            return () => clearInterval(timer);
        }, [targetDate]);

        return (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                {Object.keys(timeLeft).map((interval) => (
                    <motion.div
                        key={interval}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col items-center p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-rose-100"
                    >
                        <span className="text-xl sm:text-2xl font-bold text-rose-600">
                            {timeLeft[interval]}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">{interval}</span>
                    </motion.div>
                ))}
            </div>
        );
    };

    const FloatingHearts = () => (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        opacity: 0,
                        scale: 0,
                        x: Math.random() * window.innerWidth,
                        y: window.innerHeight
                    }}
                    animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1, 1, 0.5],
                        x: Math.random() * window.innerWidth,
                        y: -100
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "easeOut"
                    }}
                    className="absolute"
                >
                    <Heart
                        className={`w-${Math.floor(Math.random() * 2) + 8} h-${Math.floor(Math.random() * 2) + 8} ${i % 3 === 0 ? 'text-rose-400' :
                            i % 3 === 1 ? 'text-pink-400' :
                                'text-red-400'
                            }`}
                        fill="currentColor"
                    />
                </motion.div>
            ))}
        </div>
    );

    return (
        <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:py-20 text-center relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6 relative z-10"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block mx-auto"
                >
                    <span className="px-4 py-1 text-sm bg-rose-50 text-rose-600 rounded-full border border-rose-200">
                        Save The Date
                    </span>
                </motion.div>

                <div className="space-y-4">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-500 font-light italic text-base sm:text-lg"
                    >
                        With God's blessings, we are getting married
                    </motion.p>
                    <motion.h2
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-3xl sm:text-5xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-600"
                    >
                        {config.data.groomName} & {config.data.brideName}
                    </motion.h2>
                </div>

                {/* --- Date & Time Section --- */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col items-center mt-4"
                >
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-rose-400" />
                        <span className="text-gray-700 font-medium text-sm sm:text-base">
                            {formatEventDate(config.data.agenda[0].date, "full")}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                        <Clock className="w-4 h-4 text-rose-400" />
                        <span className="text-gray-700 font-medium text-sm sm:text-base">
                            {formatTime(config.data.agenda[0].startTime, config.data.agenda[0].endTime)} (IST)
                        </span>
                    </div>
                </motion.div>

                <CountdownTimer targetDate={config.data.agenda[0].date} />

                <div className="pt-6 relative">
                    <FloatingHearts />
                </div>
            </motion.div>
        </section>
    );
}
