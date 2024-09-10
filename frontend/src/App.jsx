import { useState, useEffect } from "react";
import Cards from "./components/Cards";
import axios from 'axios';
import Header from "./components/Header";
import Hero from "./components/Hero";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import useDarkMode from '@fisch0920/use-dark-mode';
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";

function App() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('allParks');
  const [isLoaded, setIsLoaded] = useState(false);

  let filteredJobs = jobs;
  const filters = [
    { value: 'allParks', label: 'All parks' },
    { value: 'technopark', label: 'Technopark' },
    { value: 'infopark', label: 'Infopark' },
    { value: 'cyberpark', label: 'Cyberpark' },
  ];
  const darkMode = useDarkMode(true);

  if (selectedFilter !== 'allParks') {
    filteredJobs = jobs.filter((job) => job.techparkName.toLowerCase() === selectedFilter.toLowerCase());
  }

  filteredJobs = filteredJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm) ||
      job.companyName.toLowerCase().includes(searchTerm));

  const fetchJobs = async () => {
    try {
      const result = await axios.get('/api/v1/jobs/getJobs');
      const fresherJobs = result.data;
      setJobs(fresherJobs);
      setIsLoaded(true);
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleFilterChange = (event) => {
    const selectedKey = Array.from(event)[0];
    if (!selectedKey || selectedFilter === selectedKey) {
      return;
    }
    setSelectedFilter(selectedKey);
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <NextUIProvider>
      <main className={`${darkMode.value ? 'dark' : ''} text-foreground bg-background min-h-screen`}>
        <Header darkMode={darkMode} />
        <Hero />
        <div className="px-4 md:px-6 lg:px-10 xl:px-10 2xl:px-10">
          <form className="w-full flex justify-center items-center">
            <div className="mt-8 mb-6 flex w-full justify-center items-center flex-col gap-4 lg:flex-row">
              <Input type="text" label="Search" size="lg" placeholder="Search by job/company" isDisabled={jobs.length === 0} onChange={handleSearch} className="max-w-md"
              />
              <Select
                label="Filter jobs"
                className="max-w-md"
                size="lg"
                isDisabled={jobs.length === 0}
                selectedKeys={[selectedFilter]}
                onSelectionChange={handleFilterChange}
                defaultSelectedKeys={['allParks']}
              >
                {filters.map((filter, index) => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </form>
        </div>
        <Cards jobs={filteredJobs} isLoaded={isLoaded} />
      </main>
    </NextUIProvider>
  );
}

export default App;
