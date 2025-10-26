import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, CalendarPlus, X, Chrome, Apple, Calendar as CalendarIcon } from "lucide-react";

// Format date as DD/MM/YY
const formatDateDDMMYY = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yy = String(date.getFullYear()).slice(-2);
  return `${dd}/${mm}/${yy}`;
};

// Format time with AM/PM
const formatTimeWithMeridiem = (time) => {
  if (!time) return '';
  let [h, m] = time.split(':').map(Number);
  const meridiem = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m.toString().padStart(2, '0')} ${meridiem}`;
};

// Format time range or "onwards"
const formatAgendaTime = (startTime, endTime) => {
  if (!endTime || endTime === '00:00') return `${formatTimeWithMeridiem(startTime)} onwards`;
  return `${formatTimeWithMeridiem(startTime)} - ${formatTimeWithMeridiem(endTime)}`;
};

const Modal = ({ isOpen, onClose, children }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[90%] max-w-sm"
        >
          <div className="bg-white rounded-2xl p-6 shadow-2xl border border-gray-100">
            {children}
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const CalendarButton = ({ icon: Icon, label, onClick }) => (
  <motion.button
    onClick={onClick}
    className="flex items-center space-x-3 w-full p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Icon className="w-5 h-5" />
    <span className="text-gray-700 font-medium">{label}</span>
  </motion.button>
);

const SingleEventCard = ({ eventData }) => {
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const googleCalendarLink = () => {
    const startDate = new Date(`${eventData.date}T${eventData.startTime}:00`);
    const endDate = eventData.endTime ? new Date(`${eventData.date}T${eventData.endTime}:00`) : null;

    const formatDate = (date) => date.toISOString().replace(/-|:|\.\d+/g, '');
    const endParam = endDate ? `/${formatDate(endDate)}` : '';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.title)}&dates=${formatDate(startDate)}${endParam}&details=${encodeURIComponent(eventData.description || '')}&location=${encodeURIComponent(eventData.location || '')}&ctz=Asia/Kolkata`;
  };

  const generateICSContent = () => {
    const startDate = new Date(`${eventData.date}T${eventData.startTime}:00`);
    const endDate = eventData.endTime ? new Date(`${eventData.date}T${eventData.endTime}:00`) : null;
    const formatICSDate = (date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${window.location.href}
DTSTART:${formatICSDate(startDate)}
${endDate ? `DTEND:${formatICSDate(endDate)}` : ''}
SUMMARY:${eventData.title}
DESCRIPTION:${eventData.description || ''}
LOCATION:${eventData.location || ''}
END:VEVENT
END:VCALENDAR`;
  };

  const downloadICSFile = () => {
    const icsContent = generateICSContent();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${eventData.title?.toLowerCase().replace(/ /g, '-') || 'event'}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative">
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">{eventData.title || ''}</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-rose-500 hover:text-rose-600 transition-colors"
            onClick={() => setShowCalendarModal(true)}
          >
            <CalendarPlus className="w-5 h-5" />
          </motion.button>
        </div>
        <div className="space-y-3 text-gray-600">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-rose-500" />
            <span>{formatDateDDMMYY(eventData.date)}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-rose-500" />
            <span>{formatAgendaTime(eventData.startTime, eventData.endTime)}</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-rose-500" />
            <span>{eventData.location || ''}</span>
          </div>
        </div>
      </motion.div>

      <Modal isOpen={showCalendarModal} onClose={() => setShowCalendarModal(false)}>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">Add to Calendar</h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowCalendarModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
          <div className="space-y-3">
            <CalendarButton icon={(props) => <Chrome {...props} className="w-5 h-5 text-rose-500" />} label="Google Calendar" onClick={() => window.open(googleCalendarLink(), '_blank')} />
            <CalendarButton icon={(props) => <Apple {...props} className="w-5 h-5 text-gray-900" />} label="Apple Calendar" onClick={downloadICSFile} />
            <CalendarButton icon={(props) => <CalendarIcon {...props} className="w-5 h-5 text-blue-600" />} label="Outlook Calendar" onClick={downloadICSFile} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

const EventCards = ({ events }) => (
  <div className="space-y-4">
    {Array.isArray(events) && events.map((event, idx) => <SingleEventCard key={idx} eventData={event} />)}
  </div>
);

export default EventCards;
