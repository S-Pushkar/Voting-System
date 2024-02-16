export default function Home({ log, setLog, isCandidate, setIsCandidate }) {
    let candidates = ["bdkbkhwkjv", "bqekke", "vyebkbvku", "beybiwi", "vqenuibi", "vwwuihnuwoh", "vndui", "hiuwuiieuuw", "fby bbidb vhvh buu"];
    return (
        <>
            <section className="flex flex-row flex-wrap justify-around text-center">
                {candidates.map((candidateName, index) => (
                    <div key={index} className='text-center lg:w-1/5 md:w-3/5 w-4/5 bg-opacity-10 text-white bg-white p-4 m-4 rounded-md'>
                        <p className="m-1 lg:text-lg md:text-base text-sm font-bold">{candidateName.toUpperCase()}</p>
                        <p className="m-1">Votes: 0</p>
                        <button className="lg:text-base text-xs md:text-base w-2/5 hover:scale-105 active:scale-100">Vote</button>
                    </div>
                ))}
            </section>
            <section>
                {isCandidate ? (
                    <div>
                        <p className="m-2">Wanna stop being a candidate?</p>
                        <button className="m-2 bg-red-500 hover:scale-105 active:scale-100">Unregister</button>
                    </div>
                ) : (
                    <div>
                        <p className="m-2">Wanna become a candidate?</p>
                        <button className="m-2 bg-red-500 hover:scale-105 active:scale-100">Register</button>
                    </div>
                )}
            </section>
        </>
    );
}