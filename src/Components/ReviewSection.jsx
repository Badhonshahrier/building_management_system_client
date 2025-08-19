import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Ayesha Rahman",
    role: "Property Manager",
    review:
      "The BMS dashboard made managing tenant requests so easy and efficient. Highly recommended!",
    image: "https://i.pravatar.cc/100?img=47",
    rating: 5,
  },
  {
    name: "Mehedi Hasan",
    role: "Facility Supervisor",
    review:
      "Maintenance tracking in the BMS is excellent. No more lost requests or delays.",
    image: "https://i.pravatar.cc/100?img=12",
    rating: 4,
  },
  {
    name: "Sadia Akter",
    role: "Resident",
    review:
      "I can now submit complaints, book amenities, and track updates right from my phone. Very convenient!",
    image: "https://i.pravatar.cc/100?img=31",
    rating: 5,
  },
  {
    name: "Rakib Hossain",
    role: "Building Admin",
    review:
      "The BMS reporting feature helps me understand occupancy, payments, and maintenance in one place.",
    image: "https://i.pravatar.cc/100?img=50",
    rating: 5,
  },
  {
    name: "Fariha Tasnim",
    role: "Tenant",
    review:
      "I love the notification system. Every update about my apartment is instant and clear.",
    image: "https://i.pravatar.cc/100?img=65",
    rating: 4,
  },
  {
    name: "Jahidul Islam",
    role: "Property Owner",
    review:
      "Managing multiple buildings was a nightmare before. Now the BMS gives me full control remotely.",
    image: "https://i.pravatar.cc/100?img=22",
    rating: 5,
  },
];
const ReviewSection = () => {
  return (
    <div className=" py-16 px-6">
      <div className="w-11/12 mx-auto text-center">
        <h2 className="md:text-4xl text-2xl font-bold text-center text-gray-600 italic ">
          What Our Community Says
        </h2>
        <p className="mt-3 text-gray-700 max-w-2xl mx-auto">
          Hear from some of our wonderful members who are growing with us!
        </p>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="text-left">
                  <h3 className="text-lg font-bold text-green-900">
                    {review.name}
                  </h3>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-700 text-left">{review.review}</p>
              <div className="flex mt-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-500 fill-yellow-500 w-5 h-5"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
