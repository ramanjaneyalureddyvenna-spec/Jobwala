export default function JobCard({ job }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-md transition bg-white">
      {job.imageUrl && <img src={job.imageUrl} alt="" className="h-40 w-full object-cover rounded mb-2" />}
      <h2 className="text-lg font-bold">{job.title}</h2>
      <p className="text-gray-600">{job.company} – {job.location}</p>
      <p className="text-sm mt-2">{job.description?.slice(0, 120)}...</p>
      {job.applyUrl && (
        <a href={job.applyUrl} target="_blank" rel="noreferrer" className="text-blue-600 font-semibold mt-2 inline-block">
          Apply Here →
        </a>
      )}
    </div>
  );
}
