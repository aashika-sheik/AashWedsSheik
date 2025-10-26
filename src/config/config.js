const config = {
  data: {
    title: "Wedding invitation of Aashika & Sheik",
    description:
      "With great joy, we, Aashika & Sheik, invite you to join and celebrate the special moment of our wedding.",
    groomName: "Aashika",
    brideName: "Sheik",
    parentGroom: "Ajie & Anitha",
    parentBride: "Meeran & Raahman Bee",
    date: "2025-11-23",
    maps_url: "https://maps.app.goo.gl/X1DeKgGWvoGwmfuW6",
    maps_embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.631464941872!2d76.95749177481277!3d11.288478088893116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8eefcf322fa03%3A0xfe86da7c1d1fe29e!2sR%20K%20Marriage%20Hall!5e0!3m2!1sen!2sin!4v1761034303357!5m2!1sen!2sin",
    location: "RK Kalayanamandapam",
    address: "Annur Road, Mettupalayam, Tamil Nadu",
    ogImage: "/images/og-image.jpg",
    favicon: "/images/favicon.ico",
    agenda: [
      {
        title: "Wedding",
        date: "2025-11-23",
        startTime: "10:30", // keep in 24-hour format
        endTime: null, // will show "10:30 AM onwards" in display
        location: "RK Kalayanamandapam",
        address: "Annur Road, Mettupalayam, Tamil Nadu",
      },
      {
        title: "Walima",
        date: "2025-11-30",
        startTime: "11:00",
        endTime: null, // will show "11:00 AM onwards" in display
        location: "CSK Mahal",
        address: "Mamandur, Tamil Nadu",
      },
    ],
    audio: {
      src: "/audio/fulfilling-humming.mp3",
      title: "Fulfilling Humming",
      autoplay: true,
      loop: true,
    },
    banks: [
      {
        bank: "Bank Central Asia",
        accountNumber: "1234567890",
        accountName: "FULAN",
      },
      {
        bank: "Bank Mandiri",
        accountNumber: "0987654321",
        accountName: "FULANA",
      },
    ],
  },
};

export default config;
