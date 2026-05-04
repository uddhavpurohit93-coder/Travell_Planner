function TripForm({
  destination,
  setDestination,
  date,
  setDate,
  budget,
  setBudget,
  days,
  setDays,
  onGenerate,
  onSubmit,
  editMode,
  onUpdate
}) {
  return (
    <>
      <input
        placeholder="Destination"
        className="border p-2 w-full mb-2 rounded"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <input
        type="date"
        className="border p-2 w-full mb-2 rounded"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        placeholder="Budget"
        className="border p-2 w-full mb-2 rounded"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />

      <input
        placeholder="Days"
        className="border p-2 w-full mb-2 rounded"
        value={days}
        onChange={(e) => setDays(e.target.value)}
      />

      {editMode ? (
        <button
          onClick={onUpdate}
          className="bg-yellow-500 text-white w-full py-2 rounded mb-2"
        >
          Update Trip
        </button>
      ) : (
        <button
          onClick={onSubmit}
          className="bg-blue-500 text-white w-full py-2 rounded mb-2"
        >
          Add Trip
        </button>
      )}

      <button
        onClick={onGenerate}
        className="bg-purple-600 text-white w-full py-2 rounded"
      >
        Generate Plan 🚀
      </button>
    </>
  );
}

export default TripForm;