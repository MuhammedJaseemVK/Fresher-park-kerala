import React,{useState,useEffect} from "react";
import JobCard from "./JobCard";
import { TfiFaceSad } from "react-icons/tfi";
import JobCardSkeleton from "./JobCardSkeleton";

function Cards({ jobs, isLoaded }) {
    const [skeletonCount, setSkeletonCount] = useState(4);

    // Update the number of skeletons based on screen size
    useEffect(() => {
        const updateSkeletonCount = () => {
            if (window.innerWidth >= 1024) {
                setSkeletonCount(4);
            } else if (window.innerWidth >= 768) {
                setSkeletonCount(2);
            } else {
                setSkeletonCount(1);
            }
        };
        updateSkeletonCount();

        // Add event listener for window resize to update skeleton count dynamically
        window.addEventListener("resize", updateSkeletonCount);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener("resize", updateSkeletonCount);
    }, []);
    return (
        <div className="flex justify-center items-center">
            {
                isLoaded ? (
                    jobs.length > 0 ? (<div className='grid grid-cols-1 md:grid-cols-2 gap-5 p-5 justify-items-stretch md:p-10 max-w-6xl'>
                        {jobs.map((job, index) => {
                            return (
                                <JobCard key={index} job={job} />
                            )
                        })}
                    </div>) : (
                        <div className="flex flex-col gap-2 justify-center items-center h-[80%]">
                            <TfiFaceSad size={90} className="text-gray-600" />
                            <p className="text-base md:text-lg lg:text-xl ">No jobs here!</p>
                        </div>
                    )
                )
                    : (
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 p-5 justify-items-stretch md:p-10 max-w-6xl w-full'>
                            {[...Array(skeletonCount)].map((_, index) => (
                                <JobCardSkeleton key={index} />
                            ))}
                        </div>
                    )
            }
        </div>
    );
}


export default Cards;
