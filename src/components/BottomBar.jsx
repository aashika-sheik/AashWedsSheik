import React, { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Home, CalendarHeart, MapPin, MessageCircleHeart } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Home, label: "Home", href: "#home", id: "home" },
  { icon: CalendarHeart, label: "Event", href: "#event", id: "event" },
  { icon: MapPin, label: "Location", href: "#location", id: "location" },
  { icon: MessageCircleHeart, label: "Wishes", href: "#wishes", id: "wishes" },
];

const BottomBar = () => {
  const [active, setActive] = React.useState("home");

  const handleMenuClick = useCallback((e, href, id) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      setActive(id);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: "-20% 0px -80% 0px", threshold: 0 };
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const validSection = menuItems.find((item) => item.id === sectionId);
          if (validSection) setActive(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    menuItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4">
      <motion.div
        className="w-auto"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        <div className="backdrop-blur-md bg-white/90 border border-gray-200/80 rounded-2xl shadow-lg px-3 py-2 flex justify-around">
          {menuItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={(e) => handleMenuClick(e, item.href, item.id)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-rose-50 cursor-pointer",
                active === item.id ? "text-rose-500 bg-rose-50 font-semibold" : "text-gray-600"
              )}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ scale: active === item.id ? 1.15 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 mb-1 transition-all duration-300",
                    active === item.id ? "stroke-rose-500 stroke-2.5" : "stroke-gray-600 stroke-2"
                  )}
                />
              </motion.div>
              <motion.span
                className="text-xs font-medium"
                animate={{ scale: active === item.id ? 1.05 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BottomBar;

