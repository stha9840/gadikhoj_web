import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useGetOneVehicle, useUpdateVehicle } from "../../hooks/admin/useAdminVehicle";

export default function UpdateVehicleModal({ vehicleId, showModal, onClose }) {
  const { vehicle, isLoading, isError, error } = useGetOneVehicle(vehicleId);
  const updateMutation = useUpdateVehicle();

  // Validation schema
  const validationSchema = Yup.object({
    vehicleName: Yup.string().required("Vehicle name is required"),
    vehicleType: Yup.string().required("Vehicle type is required"),
    fuelCapacityLitres: Yup.number()
      .required("Fuel capacity is required")
      .positive("Must be positive")
      .integer("Must be an integer"),
    loadCapacityKg: Yup.number()
      .required("Load capacity is required")
      .positive("Must be positive")
      .integer("Must be an integer"),
    passengerCapacity: Yup.number()
      .required("Passenger capacity is required")
      .positive("Must be positive")
      .integer("Must be an integer"),
    pricePerTrip: Yup.number()
      .required("Price per trip is required")
      .positive("Must be positive"),
    // filepath is handled via file input, no validation here
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      vehicleName: vehicle.vehicleName || "",
      vehicleType: vehicle.vehicleType || "",
      fuelCapacityLitres: vehicle.fuelCapacityLitres || "",
      loadCapacityKg: vehicle.loadCapacityKg || "",
      passengerCapacity: vehicle.passengerCapacity || "",
      pricePerTrip: vehicle.pricePerTrip || "",
      filepath: null, // For new file upload
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // Prepare form data for multipart/form-data
      const formData = new FormData();
      formData.append("vehicleName", values.vehicleName);
      formData.append("vehicleType", values.vehicleType);
      formData.append("fuelCapacityLitres", values.fuelCapacityLitres);
      formData.append("loadCapacityKg", values.loadCapacityKg);
      formData.append("passengerCapacity", values.passengerCapacity);
      formData.append("pricePerTrip", values.pricePerTrip);

      if (values.filepath) {
        formData.append("image", values.filepath); // "image" is the backend multer field name
      }

      updateMutation.mutate(
        { id: vehicleId, data: formData },
        {
          onSuccess: () => {
            toast.success("Vehicle updated successfully");
            onClose();
          },
          onError: (err) => {
            toast.error(err.message || "Failed to update vehicle");
          },
          onSettled: () => {
            setSubmitting(false);
          },
        }
      );
    },
  });

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full overflow-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Update Vehicle</h2>

        {isLoading ? (
          <p>Loading vehicle details...</p>
        ) : isError ? (
          <p className="text-red-500">Error loading vehicle: {error?.message || "Unknown error"}</p>
        ) : (
          <form onSubmit={formik.handleSubmit} className="space-y-4" encType="multipart/form-data">
            <div>
              <label className="block mb-1 font-medium">Vehicle Name</label>
              <input
                name="vehicleName"
                type="text"
                className="w-full border p-2 rounded"
                value={formik.values.vehicleName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.vehicleName && formik.errors.vehicleName && (
                <div className="text-red-500 text-sm">{formik.errors.vehicleName}</div>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Vehicle Type</label>
              <input
                name="vehicleType"
                type="text"
                className="w-full border p-2 rounded"
                value={formik.values.vehicleType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.vehicleType && formik.errors.vehicleType && (
                <div className="text-red-500 text-sm">{formik.errors.vehicleType}</div>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Fuel Capacity (Litres)</label>
              <input
                name="fuelCapacityLitres"
                type="number"
                className="w-full border p-2 rounded"
                value={formik.values.fuelCapacityLitres}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.fuelCapacityLitres && formik.errors.fuelCapacityLitres && (
                <div className="text-red-500 text-sm">{formik.errors.fuelCapacityLitres}</div>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Load Capacity (Kg)</label>
              <input
                name="loadCapacityKg"
                type="number"
                className="w-full border p-2 rounded"
                value={formik.values.loadCapacityKg}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.loadCapacityKg && formik.errors.loadCapacityKg && (
                <div className="text-red-500 text-sm">{formik.errors.loadCapacityKg}</div>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Passenger Capacity</label>
              <input
                name="passengerCapacity"
                type="number"
                className="w-full border p-2 rounded"
                value={formik.values.passengerCapacity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.passengerCapacity && formik.errors.passengerCapacity && (
                <div className="text-red-500 text-sm">{formik.errors.passengerCapacity}</div>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Price per Trip</label>
              <input
                name="pricePerTrip"
                type="number"
                className="w-full border p-2 rounded"
                value={formik.values.pricePerTrip}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.pricePerTrip && formik.errors.pricePerTrip && (
                <div className="text-red-500 text-sm">{formik.errors.pricePerTrip}</div>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Vehicle Image (optional)</label>
              <input
                name="filepath"
                type="file"
                accept="image/*"
                className="w-full"
                onChange={(event) => {
                  formik.setFieldValue("filepath", event.currentTarget.files[0]);
                }}
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 px-4 py-2 rounded"
                disabled={updateMutation.isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formik.isSubmitting || updateMutation.isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {formik.isSubmitting || updateMutation.isLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
