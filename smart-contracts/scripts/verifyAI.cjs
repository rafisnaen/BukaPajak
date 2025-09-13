const hre = require("hardhat");

async function main() {
    console.log("🤖 AI Verification Script");

    // Get deployment info
    const fs = require('fs');
    let contractAddress;
    
    try {
        const deploymentInfo = JSON.parse(fs.readFileSync('./deployments.json', 'utf8'));
        contractAddress = deploymentInfo.contractAddress;
    } catch (error) {
        console.log("❌ No deployment info found. Please deploy first or provide contract address.");
        process.exit(1);
    }

    // Get contract instance
    const TaxFund = await hre.ethers.getContractFactory("TaxFund");
    const taxFund = await TaxFund.attach(contractAddress);

    // Get signer (should be a verifier)
    const [signer] = await hre.ethers.getSigners();
    console.log("📝 Using signer:", signer.address);

    // Check if signer is a verifier
    const isVerifier = await taxFund.verifiers(signer.address);
    if (!isVerifier) {
        console.log("❌ Current signer is not a verifier. Please use a verifier account or set verifier first.");
        process.exit(1);
    }

    // Get proposal ID from command line args
    const proposalId = process.argv[2];
    const aiResult = process.argv[3] === 'true';

    if (!proposalId) {
        console.log("❌ Please provide proposal ID as argument");
        console.log("Usage: npx hardhat run scripts/verifyAI.js --network <network> <proposalId> <true|false>");
        process.exit(1);
    }

    console.log("🔍 Verifying proposal:", proposalId);
    console.log("🤖 AI Result:", aiResult ? "PASS" : "FAIL");

    try {
        // Get proposal details before verification
        const proposalBefore = await taxFund.getProposal(proposalId);
        console.log("📋 Proposal Details:");
        console.log("  - Proposer:", proposalBefore.proposer);
        console.log("  - Amount:", hre.ethers.utils.formatEther(proposalBefore.amount), "ETH");
        console.log("  - IPFS Hash:", proposalBefore.ipfsHash);
        console.log("  - Description:", proposalBefore.description);
        console.log("  - Current Status:", proposalBefore.status);

        // Submit AI verification
        const tx = await taxFund.verifyAI(proposalId, aiResult);
        console.log("⏳ Transaction sent:", tx.hash);

        // Wait for confirmation
        const receipt = await tx.wait();
        console.log("✅ Transaction confirmed in block:", receipt.blockNumber);

        // Get updated proposal
        const proposalAfter = await taxFund.getProposal(proposalId);
        console.log("📊 Updated Status:", proposalAfter.status);
        console.log("🤖 AI Verified:", proposalAfter.aiVerified);

        if (proposalAfter.rejectionReason) {
        console.log("❌ Rejection Reason:", proposalAfter.rejectionReason);
        }

        // Show next steps
        if (aiResult && proposalAfter.status == 1) { // AI_VERIFIED
        console.log("\n📋 Next Steps:");
        console.log("✅ AI verification passed!");
        console.log("👨‍⚖️ Proposal is now ready for auditor approval");
        console.log("Run: npx hardhat run scripts/approveProposal.js --network", hre.network.name, proposalId);
        } else if (!aiResult) {
        console.log("\n❌ AI verification failed - proposal rejected");
        }

    } catch (error) {
        console.error("❌ Error verifying proposal:", error.message);
    }
    }

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    });

    main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });