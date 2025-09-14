const hre = require("hardhat");

async function main() {
    console.log("👨‍⚖️ Proposal Approval Script");

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

    // Get signer (should be auditor)
    const [signer] = await hre.ethers.getSigners();
    console.log("📝 Using signer:", signer.address);

    // Check if signer is auditor
    const auditor = await taxFund.auditor();
    if (signer.address.toLowerCase() !== auditor.toLowerCase()) {
        console.log("❌ Current signer is not the auditor.");
        console.log("Expected auditor:", auditor);
        console.log("Current signer:", signer.address);
        process.exit(1);
    }

    // Get proposal ID from command line args
    const proposalId = process.argv[2];
    const action = process.argv[3]; // 'approve' or 'reject'
    const rejectionReason = process.argv[4]; // for reject

    if (!proposalId || !action) {
        console.log("❌ Please provide proposal ID and action");
        console.log("Usage for approval: npx hardhat run scripts/approveProposal.js --network <network> <proposalId> approve");
        console.log("Usage for rejection: npx hardhat run scripts/approveProposal.js --network <network> <proposalId> reject 'reason'");
        process.exit(1);
    }

    console.log("🔍 Processing proposal:", proposalId);
    console.log("📋 Action:", action);

    try {
        // Get proposal details
        const proposal = await taxFund.getProposal(proposalId);
        console.log("📊 Proposal Details:");
        console.log("  - Proposer:", proposal.proposer);
        console.log("  - Amount:", hre.ethers.utils.formatEther(proposal.amount), "ETH");
        console.log("  - IPFS Hash:", proposal.ipfsHash);
        console.log("  - Description:", proposal.description);
        console.log("  - Current Status:", proposal.status);
        console.log("  - AI Verified:", proposal.aiVerified);

        let tx;

        if (action === 'approve') {
        // Approve proposal
        console.log("✅ Approving proposal...");
        tx = await taxFund.approveProposal(proposalId);
        
        } else if (action === 'reject') {
        // Reject proposal
        if (!rejectionReason) {
            console.log("❌ Rejection reason is required for rejection");
            process.exit(1);
        }
        console.log("❌ Rejecting proposal with reason:", rejectionReason);
        tx = await taxFund.rejectProposal(proposalId, rejectionReason);
        
        } else {
        console.log("❌ Invalid action. Use 'approve' or 'reject'");
        process.exit(1);
        }

        console.log("⏳ Transaction sent:", tx.hash);

        // Wait for confirmation
        const receipt = await tx.wait();
        console.log("✅ Transaction confirmed in block:", receipt.blockNumber);

        // Get updated proposal
        const updatedProposal = await taxFund.getProposal(proposalId);
        console.log("📊 Updated Status:", updatedProposal.status);

        if (action === 'approve') {
        console.log("👨‍⚖️ Approved by:", updatedProposal.approvedBy);
        console.log("⏰ Approved at:", new Date(updatedProposal.approvedAt * 1000).toLocaleString());
        
        console.log("\n📋 Next Steps:");
        console.log("💰 Proposal is now ready for fund release");
        console.log("Owner can release funds to recipient address");
        
        } else {
        console.log("❌ Rejection Reason:", updatedProposal.rejectionReason);
        console.log("📋 Proposal has been rejected and cannot be processed further");
        }

        // Show contract stats
        console.log("\n📊 Contract Statistics:");
        console.log("💰 Contract Balance:", hre.ethers.utils.formatEther(await taxFund.getContractBalance()), "ETH");
        console.log("📈 Total Funded:", hre.ethers.utils.formatEther(await taxFund.getTotalFunded()), "ETH");

    } catch (error) {
        console.error("❌ Error processing proposal:", error.message);
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