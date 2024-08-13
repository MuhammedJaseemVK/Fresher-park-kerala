import React from 'react'
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { FaGithub } from "react-icons/fa";

function Hero() {

    return (
        <div className="flex justify-center items-center mx-4">
            <div className="max-w-lg flex flex-col justify-center items-center">
                <h1 className="text-2xl md:text-5xl font-bold">Fresher Jobs for you</h1>
                <p className="py-6 md:text-lg xl:text-xl">Get your dream job in a techpark as a fresher</p>
                <div className='flex gap-2'>
                    <Link
                        isExternal
                        href="https://github.com/MuhammedJaseemVK/Fresher-park-kerala/"
                    >
                        <Button color="secondary" className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6 py-1 sm:py-2 md:py-3 lg:py-4 xl:py-5"
                            endContent={<FaGithub />} >
                            Contribute
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Hero