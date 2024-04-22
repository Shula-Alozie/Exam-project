import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


const features = [
    {
        name: 'Push to deploy.',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: CloudArrowUpIcon,
    },
    {
        name: 'SSL certificates.',
        description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
        icon: LockClosedIcon,
    },
    {
        name: 'Database backups.',
        description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
        icon: ServerIcon,
    },
]
type Repo = {
    id: string,
    name: string,
    default_branch: string,
    created_at: string,
    fork: boolean,
    description: string
}
export default function Preview() {
    let { name } = useParams();

    const [repo, setRepo] = useState<Repo>({
        name: '',
        id: '',
        default_branch: '',
        created_at: '',
        fork: true,
        description: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.github.com/repos/Shula-Alozie/${name}`);
                const data = await response.json();
                setRepo(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])

    return (
        <div className="overflow-hidden bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-7 text-indigo-600">About repository</h2>

                            <div className="flex items-center gap-x-4 text-xs">
                                <time dateTime={repo.created_at} className="text-gray-500">
                                    {repo.created_at}
                                </time>
                                <a
                                    href='#'
                                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                >
                                    {repo.default_branch}
                                </a>
                            </div>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{repo.name}</p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                {repo.description ?? " No description available"}
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                                            {feature.name}
                                        </dt>
                                        <dd className="inline">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                            <div className='py-5'>
                                <Link to="*">
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                        Show 404
                                    </button>
                                </Link>
                            </div>

                        </div>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Product screenshot"
                        className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                        width={2432}
                        height={1442}
                    />
                </div>
            </div>



        </div>
    )
}
