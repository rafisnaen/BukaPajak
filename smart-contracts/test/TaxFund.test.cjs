const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TaxFund", function () {
    let TaxFund, taxFund, owner, auditor, verifier, user1, user2;
    
    const ProjectType = {
        Infrastructure: 0,
        Education: 1,
        Healthcare: 2,
        Defense: 3,
        Other: 4
    };

    const ProposalStatus = {
        PENDING: 0,
        AI_VERIFIED: 1,
        APPROVED: 2,
        REJECTED: 3,
        FUNDED: 4
    };

    beforeEach(async function () {
        [owner, auditor, verifier, user1, user2] = await ethers.getSigners();
        
        TaxFund = await ethers.getContractFactory("TaxFund");
        taxFund = await TaxFund.deploy(auditor.address);
        await taxFund.waitForDeployment();
        
        // Set verifier
        await taxFund.setVerifier(verifier.address, true);
        
        // Deposit some funds
        await taxFund.deposit({ value: ethers.parseEther("100") });
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await taxFund.owner()).to.equal(owner.address);
        });

        it("Should set the right auditor", async function () {
            expect(await taxFund.auditor()).to.equal(auditor.address);
        });

        it("Should have correct initial balance", async function () {
            expect(await taxFund.getContractBalance()).to.equal(ethers.parseEther("100"));
        });
    });

    describe("Admin Functions", function () {
        it("Should allow owner to set auditor", async function () {
            await expect(taxFund.setAuditor(user1.address))
                .to.emit(taxFund, "AuditorUpdated")
                .withArgs(user1.address);
            
            expect(await taxFund.auditor()).to.equal(user1.address);
        });

        it("Should allow owner to set verifier", async function () {
            await expect(taxFund.setVerifier(user2.address, true))
                .to.emit(taxFund, "VerifierUpdated")
                .withArgs(user2.address, true);
            
            expect(await taxFund.verifiers(user2.address)).to.equal(true);
        });

        it("Should not allow non-owner to set auditor", async function () {
            await expect(taxFund.connect(user1).setAuditor(user2.address))
                .to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("Proposal Submission", function () {
        it("Should allow users to submit proposals", async function () {
            await expect(taxFund.connect(user1).submitProposal(
                "QmHash1",
                ethers.parseEther("10"),
                ProjectType.Infrastructure,
                "Bridge construction"
            ))
                .to.emit(taxFund, "ProposalSubmitted")
                .withArgs(1, user1.address, "QmHash1", ethers.parseEther("10"), ProjectType.Infrastructure);
            
            const proposal = await taxFund.getProposal(1);
            expect(proposal.status).to.equal(ProposalStatus.PENDING);
            expect(proposal.aiVerified).to.equal(false);
        });

        it("Should not allow zero amount", async function () {
            await expect(taxFund.connect(user1).submitProposal(
                "QmHash",
                0,
                ProjectType.Other,
                "Test"
            )).to.be.revertedWith("TaxFund: amount must be greater than 0");
        });

        it("Should not allow empty IPFS hash", async function () {
            await expect(taxFund.connect(user1).submitProposal(
                "",
                ethers.parseEther("10"),
                ProjectType.Other,
                "Test"
            )).to.be.revertedWith("TaxFund: IPFS hash is required");
        });

        it("Should not allow duplicate IPFS hash", async function () {
            await taxFund.connect(user1).submitProposal(
                "QmDuplicate",
                ethers.parseEther("10"),
                ProjectType.Other,
                "Test1"
            );

            await expect(taxFund.connect(user2).submitProposal(
                "QmDuplicate",
                ethers.parseEther("10"),
                ProjectType.Other,
                "Test2"
            )).to.be.revertedWith("TaxFund: IPFS hash already used");
        });

        it("Should not allow empty description", async function () {
            await expect(taxFund.connect(user1).submitProposal(
                "QmHash",
                ethers.parseEther("10"),
                ProjectType.Other,
                ""
            )).to.be.revertedWith("TaxFund: description is required");
        });

        it("Should not allow amount larger than balance", async function () {
            await expect(taxFund.connect(user1).submitProposal(
                "QmHash",
                ethers.parseEther("200"),
                ProjectType.Other,
                "Test"
            )).to.be.revertedWith("TaxFund: insufficient contract balance");
        });
    });

    describe("AI Verification", function () {
        beforeEach(async function () {
            await taxFund.connect(user1).submitProposal(
                "QmAIHash",
                ethers.parseEther("20"),
                ProjectType.Healthcare,
                "Hospital 1"
            );
        });

        it("Should allow verifier to verify AI result (pass)", async function () {
            await expect(taxFund.connect(verifier).verifyAI(1, true))
                .to.emit(taxFund, "ProposalVerified")
                .withArgs(1, true);
            
            const proposal = await taxFund.getProposal(1);
            expect(proposal.status).to.equal(ProposalStatus.AI_VERIFIED);
            expect(proposal.aiVerified).to.equal(true);
        });

        it("Should allow verifier to verify AI result (fail)", async function () {
            await expect(taxFund.connect(verifier).verifyAI(1, false))
                .to.emit(taxFund, "ProposalVerified")
                .withArgs(1, false);
            
            const proposal = await taxFund.getProposal(1);
            expect(proposal.status).to.equal(ProposalStatus.REJECTED);
            expect(proposal.aiVerified).to.equal(false);
            expect(proposal.rejectionReason).to.equal("Failed AI fraud detection");
        });

        it("Should not allow non-verifier to verify AI", async function () {
            await expect(taxFund.connect(user1).verifyAI(1, true))
                .to.be.revertedWith("TaxFund: caller is not verifier");
        });

        it("Should not allow verification on non-pending proposal", async function () {
            await taxFund.connect(verifier).verifyAI(1, true);
            
            await expect(taxFund.connect(verifier).verifyAI(1, true))
                .to.be.revertedWith("TaxFund: not pending");
        });
    });

    describe("Proposal Approval", function () {
        beforeEach(async function () {
            await taxFund.connect(user1).submitProposal(
                "QmApproveHash",
                ethers.parseEther("15"),
                ProjectType.Education,
                "School construction"
            );
            await taxFund.connect(verifier).verifyAI(1, true);
        });

        it("Should allow auditor to approve AI-verified proposal", async function () {
            await expect(taxFund.connect(auditor).approveProposal(1))
                .to.emit(taxFund, "ProposalApproved")
                .withArgs(1, auditor.address);
            
            const proposal = await taxFund.getProposal(1);
            expect(proposal.status).to.equal(ProposalStatus.APPROVED);
            expect(proposal.approvedBy).to.equal(auditor.address);
            expect(proposal.approvedAt).to.be.gt(0);
        });

        it("Should not allow approval on non-AI-verified proposal", async function () {
            await taxFund.connect(user2).submitProposal(
                "QmNoAIHash",
                ethers.parseEther("10"),
                ProjectType.Other,
                "Test"
            );
            
            await expect(taxFund.connect(auditor).approveProposal(2))
                .to.be.revertedWith("TaxFund: not AI-verified");
        });

        it("Should not allow non-auditor to approve", async function () {
            await expect(taxFund.connect(user1).approveProposal(1))
                .to.be.revertedWith("TaxFund: caller is not auditor");
        });
    });

    describe("Fund Release", function () {
        beforeEach(async function () {
            await taxFund.connect(user1).submitProposal(
                "QmReleaseHash",
                ethers.parseEther("25"),
                ProjectType.Infrastructure,
                "Road building"
            );
            await taxFund.connect(verifier).verifyAI(1, true);
            await taxFund.connect(auditor).approveProposal(1);
        });

        it("Should allow owner to release funds", async function () {
            const initialRecipientBalance = await ethers.provider.getBalance(user2.address);
            
            await expect(taxFund.releaseFunds(1, user2.address))
                .to.emit(taxFund, "FundsReleased")
                .withArgs(1, user2.address, ethers.parseEther("25"));
            
            const proposal = await taxFund.getProposal(1);
            expect(proposal.status).to.equal(ProposalStatus.FUNDED);
            
            const finalRecipientBalance = await ethers.provider.getBalance(user2.address);
            expect(finalRecipientBalance - initialRecipientBalance).to.equal(ethers.parseEther("25"));
        });

        it("Should not allow release on non-approved proposal", async function () {
            await taxFund.connect(user2).submitProposal(
                "QmNoReleaseHash",
                ethers.parseEther("10"),
                ProjectType.Other,
                "Test"
            );
            await taxFund.connect(verifier).verifyAI(2, true);
            
            await expect(taxFund.releaseFunds(2, user2.address))
                .to.be.revertedWith("TaxFund: not approved");
        });

        it("Should not allow non-owner to release funds", async function () {
            await expect(taxFund.connect(user1).releaseFunds(1, user2.address))
                .to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("View Functions", function () {
        beforeEach(async function () {
            await taxFund.connect(user1).submitProposal(
                "QmView1",
                ethers.parseEther("20"),
                ProjectType.Healthcare,
                "Hospital 1"
            );
            await taxFund.connect(user1).submitProposal(
                "QmView2",
                ethers.parseEther("15"),
                ProjectType.Education,
                "School 1"
            );
            await taxFund.connect(user2).submitProposal(
                "QmView3",
                ethers.parseEther("10"),
                ProjectType.Defense,
                "Security upgrade"
            );

            await taxFund.connect(verifier).verifyAI(1, true);
            await taxFund.connect(verifier).verifyAI(2, false);
        });

        it("Should return user proposals correctly", async function () {
            const user1Proposals = await taxFund.getUserProposals(user1.address);
            const user2Proposals = await taxFund.getUserProposals(user2.address);
            
            expect(user1Proposals.length).to.equal(2);
            expect(user2Proposals.length).to.equal(1);
            expect(user1Proposals[0]).to.equal(1);
            expect(user1Proposals[1]).to.equal(2);
            expect(user2Proposals[0]).to.equal(3);
        });

        it("Should return pending proposals", async function () {
            const pendingProposals = await taxFund.getPendingProposals();
            expect(pendingProposals.length).to.equal(1);
            expect(pendingProposals[0]).to.equal(3);
        });

        it("Should return proposals by status", async function () {
            const aiVerified = await taxFund.getProposalsByStatus(ProposalStatus.AI_VERIFIED);
            const rejected = await taxFund.getProposalsByStatus(ProposalStatus.REJECTED);
            const pending = await taxFund.getProposalsByStatus(ProposalStatus.PENDING);
            
            expect(aiVerified.length).to.equal(1);
            expect(rejected.length).to.equal(1);
            expect(pending.length).to.equal(1);
            
            expect(aiVerified[0]).to.equal(1);
            expect(rejected[0]).to.equal(2);
            expect(pending[0]).to.equal(3);
        });
    });

    // === PERBAIKAN DI SINI ===
    describe("Emergency Functions", function () {
        it("Should allow owner to emergency withdraw", async function () {
            const contractBalance = await taxFund.getContractBalance();

            // Menggunakan matcher 'changeEtherBalance' untuk secara otomatis
            // memverifikasi perubahan saldo owner setelah dikurangi biaya gas.
            await expect(taxFund.emergencyWithdraw()).to.changeEtherBalance(
                owner,
                contractBalance
            );

            // Memastikan saldo kontrak sekarang adalah nol.
            expect(await taxFund.getContractBalance()).to.equal(0n);
        });
    });
});
