import { useEffect, useState } from 'react';
import API from '../api';
import JobCard from '../components/JobCard';
import ReviewCard from '../components/ReviewCard';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const jobsRes = await API.get('/jobs');
        const revRes = await API.get('/reviews');
        setJobs(jobsRes.data.jobs || []);
        setReviews(revRes.data.reviews || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Recent Job Posts</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {jobs.map(j => <JobCard key={j._id} job={j} />)}
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">Reviews</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {reviews.map(r => <ReviewCard key={r._id} review={r} />)}
      </div>
    </div>
  );
}
