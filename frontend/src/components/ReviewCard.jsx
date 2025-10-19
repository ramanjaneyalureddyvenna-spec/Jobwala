export default function ReviewCard({ review }) {
  return (
    <div className="border rounded p-3 bg-gray-50">
      <p className="font-semibold">{review.author}</p>
      <p className="text-gray-700">{review.content}</p>
      <p className="text-yellow-500 text-sm">⭐ {review.rating}</p>
    </div>
  );
}

