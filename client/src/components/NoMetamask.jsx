import React from 'react';

const NoMetamask = () => {
    return (
        <div className="no-metamask-container">
            <h2>Please Install MetaMask</h2>
            <p>
                To interact with decentralized applications (dApps) on the blockchain, you'll need MetaMask or another Web3 wallet extension.
            </p>
            <div className="download-link">
                <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">Download MetaMask</a>
            </div>
        </div>
    );
}

export default NoMetamask;
