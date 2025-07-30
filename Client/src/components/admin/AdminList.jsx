import React, { useState } from "react";

export default function AdminEventList({
  events,
  onEventUpdate,
  onEventDelete,
  onBulkDelete,
}) {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");

  // Filter and sort events
  const filteredEvents = events
    .filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedEvents(filteredEvents.map((event) => event._id));
    } else {
      setSelectedEvents([]);
    }
  };

  const handleSelectEvent = (eventId) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleEdit = (event) => {
    setEditingEvent({
      ...event,
      date: new Date(event.date).toISOString().slice(0, 16),
    });
  };

  const handleSaveEdit = async () => {
    try {
      await onEventUpdate(editingEvent._id, editingEvent);
      setEditingEvent(null);
      alert("Event updated successfully!");
    } catch (error) {
      alert("Error updating event. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
  };

  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await onEventDelete(eventId);
        alert("Event deleted successfully!");
      } catch (error) {
        alert("Error deleting event. Please try again.");
      }
    }
  };

  const handleBulkDeleteClick = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedEvents.length} selected events?`
      )
    ) {
      try {
        await onBulkDelete(selectedEvents);
        setSelectedEvents([]);
        alert("Events deleted successfully!");
      } catch (error) {
        alert("Error deleting events. Please try again.");
      }
    }
  };

  return (
    <div>
      {/* Search and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold">
            All Events ({filteredEvents.length})
          </h2>
          {selectedEvents.length > 0 && (
            <button
              onClick={handleBulkDeleteClick}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
            >
              🗑️ Delete Selected ({selectedEvents.length})
            </button>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>

      {/* Events Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 p-3">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedEvents.length === filteredEvents.length &&
                    filteredEvents.length > 0
                  }
                  className="h-4 w-4"
                />
              </th>
              <th className="border border-gray-200 p-3 text-left font-semibold">
                Title
              </th>
              <th className="border border-gray-200 p-3 text-left font-semibold">
                Date & Time
              </th>
              <th className="border border-gray-200 p-3 text-left font-semibold">
                Reminder
              </th>
              <th className="border border-gray-200 p-3 text-left font-semibold">
                Status
              </th>
              <th className="border border-gray-200 p-3 text-left font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="border border-gray-200 p-8 text-center text-gray-500"
                >
                  {searchTerm
                    ? "No events found matching your search."
                    : "No events found. Add your first event!"}
                </td>
              </tr>
            ) : (
              filteredEvents.map((event) => (
                <tr key={event._id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 p-3">
                    <input
                      type="checkbox"
                      checked={selectedEvents.includes(event._id)}
                      onChange={() => handleSelectEvent(event._id)}
                      className="h-4 w-4"
                    />
                  </td>
                  <td className="border border-gray-200 p-3">
                    {editingEvent && editingEvent._id === event._id ? (
                      <input
                        type="text"
                        value={editingEvent.title}
                        onChange={(e) =>
                          setEditingEvent({
                            ...editingEvent,
                            title: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="font-medium">{event.title}</span>
                    )}
                  </td>
                  <td className="border border-gray-200 p-3">
                    {editingEvent && editingEvent._id === event._id ? (
                      <input
                        type="datetime-local"
                        value={editingEvent.date}
                        onChange={(e) =>
                          setEditingEvent({
                            ...editingEvent,
                            date: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span>{new Date(event.date).toLocaleString()}</span>
                    )}
                  </td>
                  <td className="border border-gray-200 p-3">
                    {editingEvent && editingEvent._id === event._id ? (
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={editingEvent.reminder}
                          onChange={(e) =>
                            setEditingEvent({
                              ...editingEvent,
                              reminder: e.target.checked,
                            })
                          }
                          className="h-4 w-4 mr-2"
                        />
                        Enable
                      </label>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          event.reminder
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {event.reminder ? "🔔 Enabled" : "🔕 Disabled"}
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-200 p-3">
                    {new Date(event.date) > new Date() ? (
                      <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                        📅 Upcoming
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                        ⏰ Past
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-200 p-3">
                    {editingEvent && editingEvent._id === event._id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveEdit}
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                        >
                          ✅ Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
                        >
                          ❌ Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      {filteredEvents.length > 0 && (
        <div className="mt-4 text-sm text-gray-600 flex justify-between">
          <span>
            Showing {filteredEvents.length} of {events.length} events
          </span>
          {selectedEvents.length > 0 && (
            <span className="text-blue-600 font-medium">
              {selectedEvents.length} selected
            </span>
          )}
        </div>
      )}
    </div>
  );
}
