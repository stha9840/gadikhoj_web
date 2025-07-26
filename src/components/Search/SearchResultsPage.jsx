import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaWeightHanging, FaGasPump, FaUserFriends, FaStar, FaRegStar } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { searchVehiclesService } from "../../services/vehicleDetailsPageService";
import BookingModal from "../../components/auth/Booking/BookingModal";
import ReviewListModal from "../../components/Review/ReviewModal";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResultsPage() {
  const query = useQuery().get("query") || "";
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedVehicles, setSavedVehicles] = useState([]); // For favorites (mocked here)
  const [reviewsMap, setReviewsMap] = useState({});
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showReviewListModal, setShowReviewListModal] = useState(false);
  const [reviewListVehicle, setReviewListVehicle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) return;

    const fetchResults = async () => {
      setLoading(true);
      setError("");
      try {
        const results = await searchVehiclesService(query);
        setVehicles(results);

        // Fetch reviews for each vehicle
        results.forEach(async (vehicle) => {
          try {
            const res = await fetch(`http://localhost:5000/api/reviews/${vehicle._id}`);
            const data = await res.json();
            setReviewsMap(prev => ({ ...prev, [vehicle._id]: data }));
          } catch (err) {
            console.error("Failed to fetch reviews", err);
          }
        });
      } catch (err) {
        setError(err.message || "Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  // Favorite toggle functions (you can replace this with real API/hooks)
  const isVehicleSaved = (id) => savedVehicles.includes(id);
  const toggleSaveVehicle = (id) => {
    setSavedVehicles((prev) =>
      prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id]
    );
  };

  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Search results for: <span className="text-blue-600">{query}</span>
      </h2>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && vehicles.length === 0 && (
        <p className="text-center text-gray-600">No vehicles found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {vehicles.map((vehicle) => {
          const isSaved = isVehicleSaved(vehicle._id);
          const reviews = reviewsMap[vehicle._id] || [];
          const avgRating = getAverageRating(reviews);

          return (
            <div
              key={vehicle._id}
              className="relative rounded-xl border border-gray-200 bg-white overflow-hidden flex flex-col transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg"
            >
              {/* Favorite heart */}
              <button
                onClick={() => toggleSaveVehicle(vehicle._id)}
                className="absolute top-3 right-3 z-10 p-1 bg-transparent focus:outline-none"
                title={isSaved ? "Remove from favorites" : "Add to favorites"}
              >
                {isSaved ? (
                  <FaHeart className="text-red-500 text-2xl" />
                ) : (
                  <FaRegHeart className="text-gray-400 hover:text-red-500 text-2xl" />
                )}
              </button>

              {/* Clickable Image & Name */}
              <div
                onClick={() => navigate(`/vehicles/${vehicle._id}`)}
                className="cursor-pointer"
              >
                <div className="h-44 flex items-center justify-center border-b border-gray-200">
                  <img
                    src={
                      vehicle.filepath
                        ? `http://localhost:5000/uploads/${vehicle.filepath}`
                        : "/default-vehicle.png"
                    }
                    alt={vehicle.vehicleName}
                    className="max-h-full max-w-[90%] object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-vehicle.png";
                    }}
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {vehicle.vehicleName}
                    </h3>

                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) =>
                          star <= Math.round(avgRating) ? (
                            <FaStar key={star} className="text-yellow-400" />
                          ) : (
                            <FaRegStar key={star} className="text-yellow-400" />
                          )
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setReviewListVehicle(vehicle);
                          setShowReviewListModal(true);
                        }}
                        className="text-sm text-blue-600 underline mt-1"
                      >
                        View Reviews ({reviews.length})
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mt-1">{vehicle.vehicleType || "Unknown Type"}</p>

                  <div className="flex gap-5 mt-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1" title="Fuel Capacity">
                      <FaGasPump />
                      <span>{vehicle.fuelCapacityLitres}L</span>
                    </div>
                    <div className="flex items-center gap-1" title="Load Capacity">
                      <FaWeightHanging />
                      <span>{vehicle.loadCapacityKg}kg</span>
                    </div>
                    <div className="flex items-center gap-1" title="Passenger Capacity">
                      <FaUserFriends />
                      <span>{vehicle.passengerCapacity} People</span>
                    </div>
                  </div>

                  <p className="mt-4 text-gray-800 font-semibold text-xl">
                    ₹{vehicle.pricePerTrip.toFixed(2)} <span className="text-gray-500 text-base">per trip</span>
                  </p>

                  <p className="mt-3 text-gray-700 text-sm line-clamp-3">
                    {vehicle.vehicleDescription}
                  </p>
                </div>
              </div>

              {/* Rent Now button */}
              <div className="flex justify-between items-center border-t border-gray-200 pt-3 px-4 pb-4 mt-auto">
                <button
                  onClick={() => setSelectedVehicle(vehicle)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2 rounded-md transition"
                >
                  Rent Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Modal */}
      {selectedVehicle && (
        <BookingModal
          showModal={!!selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          vehicle={selectedVehicle}
        />
      )}

      {/* Review List Modal */}
      {reviewListVehicle && (
        <ReviewListModal
          isOpen={showReviewListModal}
          onClose={() => setShowReviewListModal(false)}
          reviews={reviewListVehicle ? reviewsMap[reviewListVehicle._id] || [] : []}
          onAddReview={() => {
            setReviewListModal(false);
            // optionally open add review modal here
          }}
        />
      )}
    </div>
  );
}
