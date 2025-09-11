// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TaxFund is Ownable, ReentrancyGuard {
    enum ProposalStatus { PENDING, AI_VERIFIED, APPROVED, REJECTED, FUNDED }

    struct Proposal {
        uint256 id;
        address proposer;
        string ipfsHash;
        uint256 amount; // in wei
        ProposalStatus status;
        bool aiVerified;
        address approvedBy;
        uint256 createdAt;
    }

    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;

    address public auditor;
    mapping(address => bool) public verifiers; // backend verifiers

    event ProposalSubmitted(uint256 indexed id, address indexed proposer, string ipfsHash, uint256 amount);
    event ProposalVerified(uint256 indexed id, bool aiResult);
    event ProposalApproved(uint256 indexed id, address indexed auditor);
    event FundsReleased(uint256 indexed id, address indexed to, uint256 amount);
    event VerifierUpdated(address indexed verifier, bool allowed);
    event AuditorUpdated(address indexed auditor);

    constructor(address _auditor) {
        auditor = _auditor;
    }

    modifier onlyAuditor() {
        require(msg.sender == auditor, "TaxFund: caller is not auditor");
        _;
    }

    modifier onlyVerifier() {
        require(verifiers[msg.sender], "TaxFund: caller is not verifier");
        _;
    }

    function setAuditor(address _auditor) external onlyOwner {
        auditor = _auditor;
        emit AuditorUpdated(_auditor);
    }

    function setVerifier(address _verifier, bool _allowed) external onlyOwner {
        verifiers[_verifier] = _allowed;
        emit VerifierUpdated(_verifier, _allowed);
    }

    receive() external payable {}
    function deposit() external payable onlyOwner {}

    function submitProposal(string calldata _ipfsHash, uint256 _amount) external returns (uint256) {
        proposalCount++;
        proposals[proposalCount] = Proposal({
            id: proposalCount,
            proposer: msg.sender,
            ipfsHash: _ipfsHash,
            amount: _amount,
            status: ProposalStatus.PENDING,
            aiVerified: false,
            approvedBy: address(0),
            createdAt: block.timestamp
        });

        emit ProposalSubmitted(proposalCount, msg.sender, _ipfsHash, _amount);
        return proposalCount;
    }

    function verifyAI(uint256 _id, bool _result) external onlyVerifier {
        require(proposals[_id].id != 0, "Not exist");
        require(proposals[_id].status == ProposalStatus.PENDING, "Invalid status");
        proposals[_id].aiVerified = _result;
        if (_result) {
            proposals[_id].status = ProposalStatus.AI_VERIFIED;
        } else {
            proposals[_id].status = ProposalStatus.REJECTED;
        }
        emit ProposalVerified(_id, _result);
    }

    function approveProposal(uint256 _id) external onlyAuditor {
        require(proposals[_id].id != 0, "Not exist");
        require(proposals[_id].status == ProposalStatus.AI_VERIFIED, "Not AI-verified");
        proposals[_id].status = ProposalStatus.APPROVED;
        proposals[_id].approvedBy = msg.sender;
        emit ProposalApproved(_id, msg.sender);
    }

    function releaseFunds(uint256 _id, address payable _to) external onlyOwner nonReentrant {
        require(proposals[_id].id != 0, "Not exist");
        require(proposals[_id].status == ProposalStatus.APPROVED, "Not approved");
        uint256 amt = proposals[_id].amount;
        require(address(this).balance >= amt, "Insufficient contract balance");

        proposals[_id].status = ProposalStatus.FUNDED;
        (bool sent, ) = _to.call{value: amt}("");
        require(sent, "Transfer failed");

        emit FundsReleased(_id, _to, amt);
    }

    function getProposal(uint256 _id) external view returns (Proposal memory) {
        require(proposals[_id].id != 0, "Not exist");
        return proposals[_id];
    }
}
