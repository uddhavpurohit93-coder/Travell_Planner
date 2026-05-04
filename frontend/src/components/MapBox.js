function MapBox({ destination }) {
  if (!destination) return null;

  return (
    <iframe
      title="map"
      width="100%"
      height="200"
      className="mt-4 rounded"
      src={`https://maps.google.com/maps?q=${destination}&output=embed`}
    />
  );
}

export default MapBox;