import React, { useState } from "react";

export default function AdminForm({ onEventAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    reminder: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title && formData.date) {
      setIsSubmitting(true);
      try {
        await onEventAdd(formData);
        setFormData({ title: "", date: "", reminder: false });
        alert("Event added successfully!");
      } catch (error) {
        alert("Error adding event. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter event title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date & Time *
          </label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="reminder"
          id="reminder"
          checked={formData.reminder}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="reminder" className="ml-2 block text-sm text-gray-700">
          Set reminder for this event
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full font-medium py-3 px-4 rounded-lg transition-colors ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white`}
      >
        {isSubmitting ? "Adding Event..." : "Add Event"}
      </button>
    </form>
  );
}
