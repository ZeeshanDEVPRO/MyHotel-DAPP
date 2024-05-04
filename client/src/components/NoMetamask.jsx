import block from '../assets/block.jpg';

const NoMetamask = () => {
    return (
        <div className="mt-[18vh] min-h-[640px] sm:min-h-[530px] mb-[5vh] font-sans flex flex-col gap-6 items-center mx-[8vw] px-[3vw] py-[4vh] sm:py-[8vh] bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl min-[470px]:text-2xl sm:text-3xl font-bold text-center">Please Install MetaMask</h2>
            <img src={block} alt='block' className='w-[100vw]' />
            <p className="text-sm sm:text-lg text-gray-700 text-center">
                To interact with decentralized applications (dApps) on the blockchain, you'll need a Web3 wallet extension like MetaMask. These extensions allow you to securely manage your cryptocurrency funds and interact with smart contracts on the blockchain. MetaMask, in particular, is a popular choice among users for its ease of use and compatibility with a wide range of dApps. By installing MetaMask, you gain access to a world of decentralized finance, gaming, and other innovative applications built on blockchain technology.
            </p>

            <div className="download-link mt-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300" onClick={() => window.open("https://metamask.io/download/", "_blank")}>
                    Download MetaMask
                </button>
            </div>


        </div>
    );
}

export default NoMetamask;
