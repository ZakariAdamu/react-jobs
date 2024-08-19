import React, { useEffect, useState, useCallback } from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinner";

const JobListings = ({ isHome = false }) => {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchJobs = useCallback(async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/jobs`);
			const data = await response.json();

			const sliceLimit = isHome ? 3 : 1000;
			setJobs(data.slice(0, sliceLimit));
		} catch (error) {
			console.error("Error fetching data!", error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchJobs();
	}, []);

	return (
		<section className="bg-blue-50 px-4 py-10">
			<div className="container-xl lg:container m-auto">
				<h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
					{isHome ? "Recent Jobs" : "Browse Jobs"}
				</h2>

				{loading ? (
					<Spinner loading={loading} />
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{jobs.map((job) => (
							<JobListing key={job.id} job={job} />
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default JobListings;
