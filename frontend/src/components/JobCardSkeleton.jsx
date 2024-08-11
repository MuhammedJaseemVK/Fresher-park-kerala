import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Skeleton } from '@nextui-org/skeleton';

function JobCardSkeleton() {
    return (
        <Card className='w-full'>
            <CardHeader className="flex gap-3">
                <Skeleton className="rounded-md">
                    <div className="bg-slate-500 p-5 rounded-xl">
                    </div>
                </Skeleton>
                <div className="flex flex-col gap-2 w-1/2">
                    <Skeleton className="rounded-md">
                        <p className="text-mdslate-500 text-base md:text-lg lg:text-xl rounded-lg">title</p>
                    </Skeleton>
                    <Skeleton className="rounded-md">
                        <p className=" text-default-500  text-sm md:text-base lg:text-lg rounded-lg">companyName</p>
                    </Skeleton>
                </div>
            </CardHeader>
            <CardBody>
                <div className="flex flex-col gap-3">
                    <Skeleton className="rounded-md">
                        <p className='text-base md:text-lg lg:text-xl rounded-lg'>closingDate</p>
                    </Skeleton>
                    <Skeleton className="rounded-md">
                        <p className='text-base md:text-lg lg:text-xl rounded-lg'>parkName</p>
                    </Skeleton>
                </div>
            </CardBody>
            <CardFooter>
                <Skeleton className="rounded-md">
                    <div className="h-3 w-2/5 rounded-lg">apply now</div>
                </Skeleton>
            </CardFooter>
        </Card>
    )
}

export default JobCardSkeleton