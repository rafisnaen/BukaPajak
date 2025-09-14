// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TaxFund is Ownable, ReentrancyGuard {
    enum ProposalStatus { PENDING, AI_VERIFIED, APPROVED, REJECTED, FUNDED }
    enum ProjectType { Infrastructure, Education, Healthcare, Defense, Other }

    struct Proposal {
        uint256 id;
        address proposer;
        string ipfsHash;
        uint256 amount; // in wei
        ProjectType projectType;
        string description;
        ProposalStatus status;
        bool aiVerified;
        address approvedBy;
        uint256 createdAt;
        uint256 approvedAt;
        string rejectionReason;
    }
    
    // State variables
    uint256 public proposalCount;
    uint256 public totalFunded;
    
    // Mappings
    mapping(uint256 => Proposal) public proposals;
    mapping(address => uint256[]) public userProposals;
    mapping(string => bool) public usedIPFSHashes;
    
    // Access control
    address public auditor;
    mapping(address => bool) public verifiers; // AI backend verifiers
    
    // Events
    event ProposalSubmitted(uint256 indexed id, address indexed proposer, string ipfsHash, uint256 amount, ProjectType projectType);
    event ProposalVerified(uint256 indexed id, bool aiResult);
    event ProposalApproved(uint256 indexed id, address indexed auditor);
    event ProposalRejected(uint256 indexed id, string reason);
    event FundsReleased(uint256 indexed id, address indexed to, uint256 amount);
    event VerifierUpdated(address indexed verifier, bool allowed);
    event AuditorUpdated(address indexed auditor);
    event TaxFundDeposited(address indexed depositor, uint256 amount);

    // Constructor fix untuk OpenZeppelin v4: No argument to Ownable delegated call
    constructor(address _auditor) Ownable(){
        auditor = _auditor;
    }
    
    // Modifiers
    modifier onlyAuditor() {
        require(msg.sender == auditor, "TaxFund: caller is not auditor");
        _;
    }
    
    modifier onlyVerifier() {
        require(verifiers[msg.sender], "TaxFund: caller is not verifier");
        _;
    }
    
    modifier validProposal(uint256 _id) {
        require(_id > 0 && _id <= proposalCount, "TaxFund: invalid proposal ID");
        require(proposals[_id].id != 0, "TaxFund: proposal does not exist");
        _;
    }

    // Admin functions
    function setAuditor(address _auditor) external onlyOwner {
        require(_auditor != address(0), "TaxFund: invalid auditor address");
        auditor = _auditor;
        emit AuditorUpdated(_auditor);
    }
    
    function setVerifier(address _verifier, bool _allowed) external onlyOwner {
        require(_verifier != address(0), "TaxFund: invalid verifier address");
        verifiers[_verifier] = _allowed;
        emit VerifierUpdated(_verifier, _allowed);
    }
    
    // Receive and deposit functions
    receive() external payable {
        emit TaxFundDeposited(msg.sender, msg.value);
    }
    
    function deposit() external payable onlyOwner {
        require(msg.value > 0, "TaxFund: amount must be greater than 0");
        emit TaxFundDeposited(msg.sender, msg.value);
    }

    // Submit proposal
    function submitProposal(
        string calldata _ipfsHash,
        uint256 _amount,
        ProjectType _projectType,
        string calldata _description
    ) external returns (uint256) {
        require(_amount > 0, "TaxFund: amount must be greater than 0");
        require(_amount <= address(this).balance, "TaxFund: insufficient contract balance");
        require(bytes(_ipfsHash).length > 0, "TaxFund: IPFS hash is required");
        require(!usedIPFSHashes[_ipfsHash], "TaxFund: IPFS hash already used");
        require(bytes(_description).length > 0, "TaxFund: description is required");
        
        proposalCount++;
        
        proposals[proposalCount] = Proposal({
            id: proposalCount,
            proposer: msg.sender,
            ipfsHash: _ipfsHash,
            amount: _amount,
            projectType: _projectType,
            description: _description,
            status: ProposalStatus.PENDING,
            aiVerified: false,
            approvedBy: address(0),
            createdAt: block.timestamp,
            approvedAt: 0,
            rejectionReason: ""
        });
        
        userProposals[msg.sender].push(proposalCount);
        usedIPFSHashes[_ipfsHash] = true;
        
        emit ProposalSubmitted(proposalCount, msg.sender, _ipfsHash, _amount, _projectType);
        
        return proposalCount;
    }
    
    // AI verification
    function verifyAI(uint256 _id, bool _result) external onlyVerifier validProposal(_id) {
        require(proposals[_id].status == ProposalStatus.PENDING, "TaxFund: not pending");
        
        proposals[_id].aiVerified = _result;
        
        if (_result) {
            proposals[_id].status = ProposalStatus.AI_VERIFIED;
        } else {
            proposals[_id].status = ProposalStatus.REJECTED;
            proposals[_id].rejectionReason = "Failed AI fraud detection";
        }
        
        emit ProposalVerified(_id, _result);
    }

    // Approve proposal
    function approveProposal(uint256 _id) external onlyAuditor validProposal(_id) {
        require(proposals[_id].status == ProposalStatus.AI_VERIFIED, "TaxFund: not AI-verified");
        
        proposals[_id].status = ProposalStatus.APPROVED;
        proposals[_id].approvedBy = msg.sender;
        proposals[_id].approvedAt = block.timestamp;
        
        emit ProposalApproved(_id, msg.sender);
    }
    
    // Reject proposal manually
    function rejectProposal(uint256 _id, string calldata _reason) external onlyAuditor validProposal(_id) {
        require(
            proposals[_id].status == ProposalStatus.PENDING || proposals[_id].status == ProposalStatus.AI_VERIFIED,
            "TaxFund: cannot reject proposal in current status"
        );
        require(bytes(_reason).length > 0, "TaxFund: rejection reason is required");
        
        proposals[_id].status = ProposalStatus.REJECTED;
        proposals[_id].rejectionReason = _reason;
        
        emit ProposalRejected(_id, _reason);
    }

    // Release funds
    function releaseFunds(uint256 _id, address payable _to) external onlyOwner validProposal(_id) nonReentrant {
        require(proposals[_id].status == ProposalStatus.APPROVED, "TaxFund: not approved");
        require(_to != address(0), "TaxFund: invalid recipient address");
        
        uint256 amount = proposals[_id].amount;
        require(address(this).balance >= amount, "TaxFund: insufficient contract balance");
        
        proposals[_id].status = ProposalStatus.FUNDED;
        totalFunded += amount;
        
        (bool sent, ) = _to.call{value: amount}("");
        require(sent, "TaxFund: transfer failed");
        
        emit FundsReleased(_id, _to, amount);
    }

    // View functions
    function getProposal(uint256 _id) external view validProposal(_id) returns (Proposal memory) {
        return proposals[_id];
    }
    
    function getUserProposals(address _user) external view returns (uint256[] memory) {
        return userProposals[_user];
    }
    
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    function getAvailableFunds() external view returns (uint256) {
        return address(this).balance;
    }
    
    function getTotalFunded() external view returns (uint256) {
        return totalFunded;
    }
    
    function getPendingProposals() external view returns (uint256[] memory) {
        uint256[] memory pending = new uint256[](proposalCount);
        uint256 count = 0;
        
        for (uint256 i = 1; i <= proposalCount; i++) {
            if (proposals[i].status == ProposalStatus.PENDING) {
                pending[count] = i;
                count++;
            }
        }
        
        // Resize array
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = pending[i];
        }
        
        return result;
    }
    
    function getProposalsByStatus(ProposalStatus _status) external view returns (uint256[] memory) {
        uint256[] memory filtered = new uint256[](proposalCount);
        uint256 count = 0;
        
        for (uint256 i = 1; i <= proposalCount; i++) {
            if (proposals[i].status == _status) {
                filtered[count] = i;
                count++;
            }
        }
        
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = filtered[i];
        }
        
        return result;
    }
    
    // Emergency withdrawal (only owner)
    function emergencyWithdraw() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "TaxFund: no funds to withdraw");
        
        (bool sent, ) = payable(owner()).call{value: balance}("");
        require(sent, "TaxFund: emergency withdrawal failed");
    }
}