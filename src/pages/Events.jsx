import EventCards from '@/components/EventsCard';
import config from '@/config/config';
import { motion } from 'framer-motion';

const formatDateDDMMYY = (dateStr) => {
  const date = new Date(dateStr);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yy = String(date.getFullYear()).slice(-2);
  return `${dd}/${mm}/${yy}`;
};

const formatTimeWithMeridiem = (time) => {
  if (!time) return '';
  let [hour, minute] = time.split(':').map(Number);
  const meridiem = hour >= 12 ? 'PM' : 'AM';
  if (hour === 0) hour = 12;
  else if (hour > 12) hour -= 12;
  return `${hour}:${String(minute).padStart(2, '0')} ${meridiem}`;
};

const formatAgendaTime = (startTime, endTime) => {
  const start = formatTimeWithMeridiem(startTime);
  if (!endTime) return `${start} onwards`;
  return `${start} - ${formatTimeWithMeridiem(endTime)}`;
};

export default function Events() {
  const adjustedEvents = config.data.agenda.map((event) => ({
    ...event,
    formattedDate: formatDateDDMMYY(event.date),
    formattedTime: formatAgendaTime(event.startTime, event.endTime),
  }));

  return (
    <section id="event" className="min-h-screen relative overflow-hidden">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative z-10 container mx-auto px-4 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center space-y-4 mb-16">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="inline-block text-rose-500 font-medium mb-2">
            Save These Important Dates
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl font-serif text-gray-800 leading-tight">
            Wedding Event Schedule
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-gray-500 max-w-md mx-auto">
            We invite you to celebrate our special day as the beginning of our love journey
          </motion.p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }} className="max-w-2xl mx-auto">
          <EventCards events={adjustedEvents} />
        </motion.div>
      </motion.div>
    </section>
  );
}
