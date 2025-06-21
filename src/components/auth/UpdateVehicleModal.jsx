import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useUpdateVehicle, useGetOneVehicle } from "../../hooks/admin/useAdminVehicle";

export default function UpdateVehicleModal({ vehicleId, showModal, onClose, onSuccess }) {
  const { vehicle, isLoading, error } = useGetOneVehicle(vehicleId);
  const updateVehicle = useUpdateVehicle();

  const validationSchema = Yup.object({
    vehicleName: Yup.string().required("Vehicle name is required"),
    vehicleType: Yup.string().required("Vehicle type is required"),
    fuelCapacityLitres: Yup.number().required("Fuel capacity is required").positive(),
    loadCapacityKg: Yup.number().required("Load capacity is required").positive(),
    passengerCapacity: Yup.string().required("Passenger capacity is required"),
    pricePerTrip: Yup.number().required("Price per trip is required").positive(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      vehicleName: vehicle?.vehicleName || "",
      vehicleType: vehicle?.vehicleType || "",
      fuelCapacityLitres: vehicle?.fuelCapacityLitres || "",
      loadCapacityKg: vehicle?.loadCapacityKg || "",
      passengerCapacity: vehicle?.passengerCapacity || "",
      pricePerTrip: vehicle?.pricePerTrip || "",
      imageFile: null, // for new image upload
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // Prepare FormData for multipart
      const formData = new FormData();
      formData.append("vehicleName", values.vehicleName);
      formData.append("vehicleType", values.vehicleType);
      formData.append("fuelCapacityLitres", values.fuelCapacityLitres);
      formData.append("loadCapacityKg", values.loadCapacityKg);
      formData.append("passengerCapacity", values.passengerCapacity);
      formData.append("pricePerTrip", values.pricePerTrip);
      if (values.imageFile) {
        formData.append("image", values.imageFile);
      }

      updateVehicle.mutate(
        { id: vehicleId, data: formData },
        {
          onSuccess: () => {
            toast.success("Vehicle updated successfully");
            onClose();
            if (onSuccess) onSuccess();
          },
          onError: (err) => {
            toast.error(err?.message || "Failed to update vehicle");
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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-[450px] max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Update Vehicle</h2>

        {isLoading ? (
          <p>Loading vehicle data...</p>
        ) : error ? (
          <p className="text-red-500">Failed to load vehicle data</p>
        ) : (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Vehicle Name */}
            <div>
              <label className="block mb-1">Vehicle Name</label>
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

            {/* Vehicle Type */}
            <div>
              <label className="block mb-1">Vehicle Type</label>
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

            {/* Fuel Capacity */}
            <div>
              <label className="block mb-1">Fuel Capacity (Litres)</label>
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

            {/* Load Capacity */}
            <div>
              <label className="block mb-1">Load Capacity (Kg)</label>
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

            {/* Passenger Capacity */}
            <div>
              <label className="block mb-1">Passenger Capacity</label>
              <input
                name="passengerCapacity"
                type="text"
                className="w-full border p-2 rounded"
                value={formik.values.passengerCapacity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.passengerCapacity && formik.errors.passengerCapacity && (
                <div className="text-red-500 text-sm">{formik.errors.passengerCapacity}</div>
              )}
            </div>

            {/* Price per Trip */}
            <div>
              <label className="block mb-1">Price per Trip</label>
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

            {/* Image Upload */}
            <div>
              <label className="block mb-1">Upload New Image (optional)</label>
              <input
                name="imageFile"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  formik.setFieldValue("imageFile", event.currentTarget.files[0]);
                }}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 px-4 py-2 rounded"
                disabled={updateVehicle.isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formik.isSubmitting || updateVehicle.isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {updateVehicle.isLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
