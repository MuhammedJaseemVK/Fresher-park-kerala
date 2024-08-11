import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { FaUserGraduate } from "react-icons/fa";
import { Chip } from '@nextui-org/chip';

function JobCard({ job }) {
    const { title, companyName, jobDeadline, techparkName, jobLink } = job;
    function formatDate(dateStr) {
        const [day, month, year] = dateStr.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-IN', options);
    }
    const checkExpiry = () => {
        const options = {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }
        const today = new Date().toLocaleDateString('en-IN', options);
        const deadline = formatDate(jobDeadline)
        if (today===deadline) {
            return true;
        }
        else {
            return false;
        }
    }
    const isExpiringToday = checkExpiry(jobDeadline);

    const jobDeadlineString = formatDate(jobDeadline);
    return (
        <Card>
            <CardHeader className="flex gap-3">
                <div className="bg-slate-500 p-5 rounded-xl">
                    <FaUserGraduate className='text-2xl' />
                </div>
                <div className="flex flex-col">
                    <p className="text-mdslate-500 text-base md:text-lg lg:text-xl">{title}</p>
                    <p className=" text-default-500  text-sm md:text-base lg:text-lg">{companyName}
                    </p>
                    {isExpiringToday && <Chip color="danger" variant="bordered" className='text-lg'>Closes today</Chip>}
                </div>
            </CardHeader>
            <CardBody>
                <p className='text-base md:text-lg lg:text-xl'>Closing date : {jobDeadlineString}</p>
                <p className='text-base md:text-lg lg:text-xl'>Park name : {techparkName}</p>
            </CardBody>
            <CardFooter>
                <Link
                    isExternal
                    showAnchorIcon
                    href={jobLink}
                >
                    Apply job
                </Link>
            </CardFooter>
        </Card>
    )
}

export default JobCard