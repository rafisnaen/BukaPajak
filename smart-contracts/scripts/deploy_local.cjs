const hre = require("hardhat");

async function main() {
    console.log("🏠 Local Development Setup");
    console.log("=========================");

    // Get accounts
    const [owner, auditor, verifier, government1, government2, recipient] = await hre.ethers.getSigners();
    
    console.log("👤 Accounts:");
    console.log("  Owner:", owner.address);
    console.log("  Auditor:", auditor.address);
    console.log("  AI Verifier:", verifier.address);
    console.log("  Government 1:", government1.address);
    console.log("  Government 2:", government2.address);
    console.log("  Recipient:", recipient.address);

    // Deploy contract
    const TaxFund = await hre.ethers.getContractFactory("TaxFund");
    const taxFund = await TaxFund.deploy(auditor.address);
    await taxFund.deployed();

    console.log("\n✅ Contract deployed at:", taxFund.address);

    // Setup
    await taxFund.setVerifier(verifier.address, true);
    await taxFund.deposit({ value: hre.ethers.utils.parseEther("100") });

    console.log("🤖 AI Verifier set");
    console.log("💰 Initial deposit: 100 ETH");

    // Demo: Submit proposals
    console.log("\n📋 Submitting demo proposals...");

    // Proposal 1: Infrastructure (e.g., Build highway)
    const tx1 = await taxFund.connect(government1).submitProposal(
        "QmInfrastructure123",
        hre.ethers.utils.parseEther("20"),
        0, // ProjectType.Infrastructure
        "Proposal for building a new highway connecting major cities to improve transportation infrastructure and economic growth."
    );
    await tx1.wait();
    console.log("  ✅ Proposal 1 submitted (Infrastructure - Highway): ID 1");

    // Proposal 2: Education (e.g., Build school)
    const tx2 = await taxFund.connect(government2).submitProposal(
        "QmEducation456",
        hre.ethers.utils.parseEther("15"),
        1, // ProjectType.Education
        "Proposal to construct a new public school in underserved rural area to enhance education access for children."
    );
    await tx2.wait();
    console.log("  ✅ Proposal 2 submitted (Education - School): ID 2");

    // Proposal 3: Healthcare (e.g., Build clinic)
    const tx3 = await taxFund.connect(government1).submitProposal(
        "QmHealthcare789",
        hre.ethers.utils.parseEther("25"),
        2, // ProjectType.Healthcare
        "Proposal for establishing a community healthcare clinic to provide essential medical services to low-income populations."
    );
    await tx3.wait();
    console.log("  ✅ Proposal 3 submitted (Healthcare - Clinic): ID 3");

    console.log("\n🔍 Demo Workflow: AI Verification and Approval");

    // AI Verify Proposal 1 (Pass)
    const verifyTx1 = await taxFund.connect(verifier).verifyAI(1, true);
    await verifyTx1.wait();
    console.log("  ✅ Proposal 1 AI verified: PASS");

    // AI Verify Proposal 2 (Fail - for demo rejection)
    const verifyTx2 = await taxFund.connect(verifier).verifyAI(2, false);
    await verifyTx2.wait();
    console.log("  ❌ Proposal 2 AI verified: FAIL (Rejected)");

    // Leave Proposal 3 pending for manual handling

    // Auditor Approve Proposal 1
    const approveTx = await taxFund.connect(auditor).approveProposal(1);
    await approveTx.wait();
    console.log("  ✅ Proposal 1 approved by auditor");

    // Auditor Reject Proposal 3 (manual rejection example)
    const rejectTx = await taxFund.connect(auditor).rejectProposal(3, "Insufficient environmental impact assessment provided.");
    await rejectTx.wait();
    console.log("  ❌ Proposal 3 manually rejected by auditor");

    console.log("\n💰 Demo: Fund Release");

    // Owner Release Funds for Proposal 1 to recipient
    const initialRecipientBalance = await hre.ethers.provider.getBalance(recipient.address);
    const releaseTx = await taxFund.releaseFunds(1, recipient.address);
    await releaseTx.wait();
    const finalRecipientBalance = await hre.ethers.provider.getBalance(recipient.address);

    console.log("  ✅ Funds released for Proposal 1 (20 ETH) to recipient");
    console.log("  Recipient balance change:", hre.ethers.utils.formatEther(finalRecipientBalance.sub(initialRecipientBalance)), "ETH");

    // Show contract stats
    console.log("\n📊 Final Contract Stats:");
    console.log("  💰 Contract Balance:", hre.ethers.utils.formatEther(await taxFund.getContractBalance()), "ETH");
    console.log("  📈 Total Funded:", hre.ethers.utils.formatEther(await taxFund.getTotalFunded()), "ETH");
    console.log("  📋 Total Proposals:", await taxFund.proposalCount());

    console.log("\n🎉 Local setup and demo completed!");
    console.log("You can now interact with the contract at:", taxFund.address);
    console.log("Use other scripts like verifyAI.js or approveProposal.js for further interactions.");
    }

    main()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.error("❌ Error in local deployment:", error);
        process.exit(1);
    });