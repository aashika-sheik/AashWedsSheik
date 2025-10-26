import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import Marquee from "@/components/ui/marquee";
import { Calendar, Clock, ChevronDown, User, MessageCircle, Send, Smile, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { formatEventDate } from '@/lib/formatEventDate';

export default function Wishes() {
    const [showConfetti, setShowConfetti] = useState(false);
    const [newWish, setNewWish] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [attendance, setAttendance] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const options = [
        { value: 'ATTENDING', label: 'With love, I’ll be there' },
        { value: 'NOT_ATTENDING', label: 'Sending blessings from afar' },
        { value: 'MAYBE', label: 'Hoping to join, will confirm soon' },
    ];




    const [wishes, setWishes] = useState([]); // Start empty

    const handleSubmitWish = async (e) => {
        e.preventDefault();
        if (!newWish.trim()) return;

        setIsSubmitting(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const newWishObj = {
            id: wishes.length + 1,
            name: "Guest",
            message: newWish,
            attending: attendance || "ATTENDING",
            timestamp: new Date().toISOString()
        };

        setWishes(prev => [newWishObj, ...prev]);
        setNewWish('');
        setAttendance('');
        setIsSubmitting(false);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
    };

    const getAttendanceIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'attending':
                return <CheckCircle className="w-4 h-4 text-emerald-500" />;
            case 'not_attending':
                return <XCircle className="w-4 h-4 text-rose-500" />;
            case 'maybe':
                return <HelpCircle className="w-4 h-4 text-amber-500" />;
            default:
                return null;
        }
    };

    return (
        <section id="wishes" className="min-h-screen relative overflow-hidden">
            {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
            <div className="container mx-auto px-4 py-20 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-4 mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block text-rose-500 font-medium"
                    >
                        Send Your Best Wishes
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl font-serif text-gray-800"
                    >
                        Messages & Prayers
                    </motion.h2>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-4 pt-4"
                    >
                        <div className="h-[1px] w-12 bg-rose-200" />
                        <MessageCircle className="w-5 h-5 text-rose-400" />
                        <div className="h-[1px] w-12 bg-rose-200" />
                    </motion.div>
                </motion.div>

                {/* Wishes List */}
                <div className="max-w-2xl mx-auto space-y-6">
                    <AnimatePresence>
                        {wishes.length > 0 && (
                            <Marquee speed={20} gradient={false} className="[--duration:20s] py-2">
                                {wishes.map((wish) => (
                                    <motion.div
                                        key={wish.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="group relative w-[280px]"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 to-pink-100/50 rounded-xl transform transition-transform group-hover:scale-[1.02] duration-300" />
                                        <div className="relative backdrop-blur-sm bg-white/80 p-4 rounded-xl border border-rose-100/50 shadow-md">
                                            <div className="flex items-start space-x-3 mb-2">
                                                <div className="flex-shrink-0">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center text-white text-sm font-medium">
                                                        {wish.name[0].toUpperCase()}
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center space-x-2">
                                                        <h4 className="font-medium text-gray-800 text-sm truncate">{wish.name}</h4>
                                                        {getAttendanceIcon(wish.attending)}
                                                    </div>
                                                    <div className="flex items-center space-x-1 text-gray-500 text-xs">
                                                        <Clock className="w-3 h-3" />
                                                        <time className="truncate">{formatEventDate(wish.timestamp)}</time>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed mb-2 line-clamp-3">{wish.message}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </Marquee>
                        )}
                    </AnimatePresence>
                </div>

                {/* Wishes Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-2xl mx-auto mt-12"
                >
                    <form onSubmit={handleSubmitWish} className="relative">
                        <div className="backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-rose-100/50 shadow-lg space-y-4">
                            {/* Name */}
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                                    <User className="w-4 h-4" />
                                    <span>Your Name</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter your name..."
                                    value={newWish.name}
                                    onChange={(e) => setNewWish(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-gray-700 placeholder-gray-400"
                                    required
                                />
                            </div>

                            {/* Attendance */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-2 relative">
                                <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>Will you be with us with ur blessings?</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-left flex items-center justify-between"
                                >
                                    <span className={attendance ? 'text-gray-700' : 'text-gray-400'}>
                                        {attendance ? options.find(opt => opt.value === attendance)?.label : 'Select attendance...'}
                                    </span>
                                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-rose-100 overflow-hidden"
                                        >
                                            {options.map((option) => (
                                                <motion.button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => {
                                                        setAttendance(option.value);
                                                        setIsOpen(false);
                                                    }}
                                                    whileHover={{ backgroundColor: 'rgb(255, 241, 242)' }}
                                                    className={`w-full px-4 py-2.5 text-left transition-colors
                                                        ${attendance === option.value ? 'bg-rose-50 text-rose-600' : 'text-gray-700 hover:bg-rose-50'}`}
                                                >
                                                    {option.label}
                                                </motion.button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Message */}
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                                    <MessageCircle className="w-4 h-4" />
                                    <span>Your Message</span>
                                </div>
                                <textarea
                                    placeholder="Send your wishes and prayers for the couple..."
                                    value={newWish}
                                    onChange={(e) => setNewWish(e.target.value)}
                                    className="w-full h-32 p-4 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 resize-none transition-all duration-200"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center space-x-2 text-gray-500">
                                    <Smile className="w-5 h-5" />
                                    <span className="text-sm">Send Your Blessing</span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-white font-medium transition-all duration-200
                                        ${isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'bg-rose-500 hover:bg-rose-600'}`}
                                >
                                    <Send className="w-4 h-4" />
                                    <span>{isSubmitting ? 'Sending...' : 'Send Wish'}</span>
                                </motion.button>
                            </div>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
