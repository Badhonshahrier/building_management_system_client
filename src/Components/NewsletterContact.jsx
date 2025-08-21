import { BarChart3, PieChart, FileBarChart, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function ReportsAnalytics() {
  const cards = [
    {
      id: 1,
      icon: <BarChart3 className="w-12 h-12 text-indigo-600" />,
      title: "Financial Reports",
      desc: "Track rent collections, pending dues, and monthly income summaries.",
    },
    {
      id: 2,
      icon: <PieChart className="w-12 h-12 text-indigo-600" />,
      title: "Tenant Insights",
      desc: "Understand occupancy rates, tenant activity, and rental distribution.",
    },
    {
      id: 3,
      icon: <FileBarChart className="w-12 h-12 text-indigo-600" />,
      title: "Maintenance Reports",
      desc: "Get detailed logs of maintenance requests, costs, and resolutions.",
    },
    {
      id: 4,
      icon: <TrendingUp className="w-12 h-12 text-indigo-600" />,
      title: "Growth Analytics",
      desc: "Analyze performance trends and forecast building management growth.",
    },
  ];

  return (
    <section className="relative  py-24 px-6 overflow-hidden">
      {/* Background animated blobs */}
      <div className="absolute top-10 right-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative w-11/12 mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="md:text-4xl text-2xl font-bold text-center text-gray-600 italic md:mb-3"
        >
          Reports & Analytics
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-4 font-medium text-gray-500 mb-10 sm:pt-6 max-w-3xl mx-auto text-sm sm:text-base"
        >
          Gain valuable insights into your buildings, tenants, and finances with 
          real-time reports and analytics. Make data-driven decisions with ease.
        </motion.p>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg hover:shadow-indigo-300 transition transform hover:-translate-y-2 hover:scale-105"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-indigo-100 rounded-2xl group-hover:bg-indigo-200 transition">
                  {card.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{card.title}</h3>
              <p className="text-gray-600">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
