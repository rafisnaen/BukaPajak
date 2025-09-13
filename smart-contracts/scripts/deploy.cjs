const hre = require("hardhat");

async function main() {
    console.log("🚀 Starting TaxFund deployment...");

    // Get the contract factory
    const TaxFund = await hre.ethers.getContractFactory("TaxFund");
    
    // Get deployer account
    const [deployer] = await hre.ethers.getSigners();
    console.log("📝 Deploying contracts with account:", deployer.address);

    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("💰 Account balance:", hre.ethers.formatEther(balance));

    // Set auditor address (change this to your actual auditor address)
    const auditorAddress = deployer.address; // For demo, using deployer as auditor
    console.log("👨‍⚖️ Auditor address:", auditorAddress);

    // Deploy the contract
    console.log("⏳ Deploying TaxFund contract...");
    const taxFund = await TaxFund.deploy(auditorAddress);

    await taxFund.waitForDeployment();

    // FIX 2: Menggunakan taxFund.target untuk mendapatkan alamat di ethers v6
    const contractAddress = taxFund.target;

    console.log("✅ TaxFund deployed successfully!");
    console.log("📍 Contract address:", contractAddress);
    console.log("👨‍⚖️ Auditor:", await taxFund.auditor());
    console.log("👤 Owner:", await taxFund.owner());

    // Set up initial verifier (for AI backend)
    const backendVerifierAddress = deployer.address; // Change this to your backend address
    console.log("🤖 Setting up AI verifier:", backendVerifierAddress);
    await taxFund.setVerifier(backendVerifierAddress, true);
    console.log("✅ AI verifier set successfully!");

    // FIX 1: Mengurangi jumlah deposit agar sesuai dengan saldo Anda
    const initialDeposit = hre.ethers.parseEther("0.05"); // Mengubah dari 10 ETH menjadi 0.05 ETH
    console.log("💰 Depositing initial funds:", hre.ethers.formatEther(initialDeposit), "ETH");
    await taxFund.deposit({ value: initialDeposit });
    console.log("✅ Initial funds deposited!");

    console.log("\n=== Deployment Summary ===");
    console.log("Contract Address:", contractAddress);
    console.log("Network:", hre.network.name);
    console.log("Block Number:", await hre.ethers.provider.getBlockNumber());
    console.log("Contract Balance:", hre.ethers.formatEther(await taxFund.getContractBalance()), "ETH");

    // Verification info
    if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
        console.log("\n📋 Contract Verification:");
        console.log("Run this command to verify:");
        console.log(`npx hardhat verify --network ${hre.network.name} ${contractAddress} "${auditorAddress}"`);
    }

    // Save deployment info
    const deploymentInfo = {
        contractAddress: contractAddress,
        auditor: auditorAddress,
        network: hre.network.name,
        blockNumber: await hre.ethers.provider.getBlockNumber(),
        timestamp: new Date().toISOString(),
        deployer: deployer.address
    };

    // Write deployment info to file
    const fs = require('fs');
    fs.writeFileSync(
        './deployments.json',
        JSON.stringify(deploymentInfo, null, 2)
    );
    console.log("💾 Deployment info saved to deployments.json");
}

main()
    .then(() => {
        console.log("🎉 Deployment completed successfully!");
        process.exit(0);
    })
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });

