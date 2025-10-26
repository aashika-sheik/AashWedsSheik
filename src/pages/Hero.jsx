import { useEffect, useState } from "react";
import { Calendar, Clock, Heart } from "lucide-react";
import { motion } from "framer-motion";
import config from "@/config/config";
import { safeBase64 } from "@/lib/base64";

export default function Hero() {
  const [guestName, setGuestName] = useState({});
  const [containerSize, setContainerSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get("guest");
    if (guestParam) {
      try {
        const decodedName = safeBase64.decode(guestParam);
        setGuestName(decodedName);
      } catch {
        setGuestName("");
      }
    }

    const handleResize = () =>
      setContainerSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatDateDDMMYY = (dateStr) => {
    const date = new Date(dateStr);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    return `${dd}/${mm}/${yy}`;
  };

  const formatTimeWithMeridiem = (time) => {
    if (!time) return "";
    let [hour, minute] = time.split(":").map(Number);
    const meridiem = hour >= 12 ? "PM" : "AM";
    if (hour === 0) hour = 12;
    else if (hour > 12) hour -= 12;
    return `${hour}:${String(minute).padStart(2, "0")} ${meridiem}`;
  };

  const formatAgendaTime = (startTime, endTime) => {
    const start = formatTimeWithMeridiem(startTime);
    if (!endTime) return `${start} onwards`;
    return `${start} - ${formatTimeWithMeridiem(endTime)}`;
  };

  const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({});
    useEffect(() => {
      const calculate = () => {
        const diff = new Date(targetDate) - new Date();
        if (diff <= 0) return setTimeLeft({});
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      };
      calculate();
      const interval = setInterval(calculate, 1000);
      return () => clearInterval(interval);
    }, [targetDate]);

    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-3 sm:mt-4">
        {Object.keys(timeLeft).map((k) => (
          <motion.div
            key={k}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-rose-100"
          >
            <span className="text-lg sm:text-2xl font-bold text-rose-600">
              {timeLeft[k]}
            </span>
            <span className="text-xs text-gray-500 capitalize">{k}</span>
          </motion.div>
        ))}
      </div>
    );
  };

  const FloatingHearts = () => {
    // Precompute startX for each heart so it doesn’t jump to left
    const hearts = [...Array(15)].map((_, i) => {
      const size = 30 + Math.random() * 30;
      const startX = Math.random() * containerSize.width; // fixed horizontal position
      const startY = containerSize.height + Math.random() * 100;
      const endY = -150 - Math.random() * 100;
      const duration = 5 + Math.random() * 3;
      const delay = Math.random() * 5;
      const sway = 50 + Math.random() * 50;

      return { size, startX, startY, endY, duration, delay, sway };
    });

    return (
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {hearts.map((heart, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, x: heart.startX, y: heart.startY }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0.5],
              x: [heart.startX, heart.startX + heart.sway, heart.startX - heart.sway, heart.startX],
              y: heart.endY,
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: "easeInOut",
            }}
            className="absolute"
          >
            <Heart
              style={{ width: heart.size, height: heart.size }}
              className={i % 3 === 0 ? "text-rose-400" : i % 3 === 1 ? "text-pink-400" : "text-red-400"}
              fill="currentColor"
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-start px-4 pt-20 sm:pt-24 pb-2 text-center relative overflow-hidden">
      <FloatingHearts />

      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-3 sm:space-y-4 relative z-10"
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

        <div className="space-y-1 sm:space-y-2">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 font-light italic text-base sm:text-lg"
          >
            Our families warmly invite you to join us in celebrating this special union of
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

        {/* Date & Time */}
        <motion.div
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center mt-2 sm:mt-3"
        >
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-rose-400" />
            <span className="text-gray-700 font-medium text-sm sm:text-base">
              {formatDateDDMMYY(config.data.agenda[0].date)}
            </span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <Clock className="w-5 h-5 text-rose-400" />
            <span className="text-gray-700 font-medium text-sm sm:text-base">
              {formatAgendaTime(config.data.agenda[0].startTime, config.data.agenda[0].endTime)}
            </span>
          </div>
        </motion.div>

        <div className="mb-2">
          <CountdownTimer targetDate={config.data.agenda[0].date} />
        </div>
      </motion.div>
    </section>
  );
}
