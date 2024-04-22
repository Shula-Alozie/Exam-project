import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Link } from "react-router-dom";
import { format } from "date-fns";


type Repo = {
    id: string,
    name: string,
    default_branch: string,
    created_at: string,
    fork: boolean
}

const pageSize = 3; // Set the number of items per page

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [repos, setRepos] = useState<Repo[]>([]);
    const [filteredRepos, setFilteredRepos] = useState<Repo[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.github.com/users/Shula-Alozie/repos');
                const data = await response.json();
                setRepos(data);
                setFilteredRepos(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        const filtered = repos.filter((person) =>
            person.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredRepos(filtered);
    };

    const handleSearchSubmit = (e: any) => {
        e.preventDefault();
        setCurrentPage(1);
        handleSearch(searchTerm);
    };

    const totalPages = Math.ceil(filteredRepos.length / pageSize);

    const handleClickNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handleClickPrev = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentRepos = filteredRepos.slice(startIndex, endIndex);



    return (
        <div className="p-5">
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </form>
            <ul role="list" className="divide-y divide-gray-100">
                {currentRepos.map((repo) => (
                    <li key={repo.id} className="flex justify-between gap-x-6 py-5">
                        <Link to={`/preview/${repo.name}`}>
                            <div className="flex min-w-0 gap-x-4">
                                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={"https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" />
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{repo.name}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{repo.default_branch}</p>
                                </div>
                            </div>
                        </Link>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">{repo.fork}</p>
                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                Created: <time dateTime={repo.created_at}>{format(new Date(repo.created_at), "dd-MM-yyyy")}</time>
                            </p>
                            <div className="mt-1 flex items-center gap-x-1.5">
                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                </div>
                                <p className="text-xs leading-5 text-gray-500">Active</p>
                            </div>

                        </div>
                    </li>
                ))}
            </ul>
            <div className="hidden sm:flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">{endIndex > repos.length ? repos.length : endIndex}</span> of{' '}
                        <span className="font-medium">{repos.length}</span> results
                    </p>
                </div>
                <div>
                    <nav className="inline-flex -space-x-px" aria-label="Pagination">
                        <button
                            onClick={handleClickPrev}
                            disabled={currentPage === 1}
                            className={`${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                                } relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 bg-white border border-gray-300 hover:bg-gray-50`}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button
                            onClick={handleClickNext}
                            disabled={currentPage === totalPages}
                            className={`${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                                } relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 bg-white border border-gray-300 hover:bg-gray-50`}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>



    );
}
