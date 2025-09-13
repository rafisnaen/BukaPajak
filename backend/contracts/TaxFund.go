// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package contracts

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
	_ = abi.ConvertType
)

// TaxFundProposal is an auto generated low-level Go binding around an user-defined struct.
type TaxFundProposal struct {
	Id              *big.Int
	Proposer        common.Address
	IpfsHash        string
	Amount          *big.Int
	ProjectType     uint8
	Description     string
	Status          uint8
	AiVerified      bool
	ApprovedBy      common.Address
	CreatedAt       *big.Int
	ApprovedAt      *big.Int
	RejectionReason string
}

// ContractsMetaData contains all meta data concerning the Contracts contract.
var ContractsMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_auditor\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"auditor\",\"type\":\"address\"}],\"name\":\"AuditorUpdated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"FundsReleased\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"auditor\",\"type\":\"address\"}],\"name\":\"ProposalApproved\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"reason\",\"type\":\"string\"}],\"name\":\"ProposalRejected\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"proposer\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"ipfsHash\",\"type\":\"string\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"enumTaxFund.ProjectType\",\"name\":\"projectType\",\"type\":\"uint8\"}],\"name\":\"ProposalSubmitted\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"aiResult\",\"type\":\"bool\"}],\"name\":\"ProposalVerified\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"depositor\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"TaxFundDeposited\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"verifier\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"allowed\",\"type\":\"bool\"}],\"name\":\"VerifierUpdated\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_id\",\"type\":\"uint256\"}],\"name\":\"approveProposal\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"auditor\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"deposit\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"emergencyWithdraw\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getAvailableFunds\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getContractBalance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getPendingProposals\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_id\",\"type\":\"uint256\"}],\"name\":\"getProposal\",\"outputs\":[{\"components\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"proposer\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"ipfsHash\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"internalType\":\"enumTaxFund.ProjectType\",\"name\":\"projectType\",\"type\":\"uint8\"},{\"internalType\":\"string\",\"name\":\"description\",\"type\":\"string\"},{\"internalType\":\"enumTaxFund.ProposalStatus\",\"name\":\"status\",\"type\":\"uint8\"},{\"internalType\":\"bool\",\"name\":\"aiVerified\",\"type\":\"bool\"},{\"internalType\":\"address\",\"name\":\"approvedBy\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"createdAt\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"approvedAt\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"rejectionReason\",\"type\":\"string\"}],\"internalType\":\"structTaxFund.Proposal\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"enumTaxFund.ProposalStatus\",\"name\":\"_status\",\"type\":\"uint8\"}],\"name\":\"getProposalsByStatus\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getTotalFunded\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_user\",\"type\":\"address\"}],\"name\":\"getUserProposals\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"proposalCount\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"proposals\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"proposer\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"ipfsHash\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"internalType\":\"enumTaxFund.ProjectType\",\"name\":\"projectType\",\"type\":\"uint8\"},{\"internalType\":\"string\",\"name\":\"description\",\"type\":\"string\"},{\"internalType\":\"enumTaxFund.ProposalStatus\",\"name\":\"status\",\"type\":\"uint8\"},{\"internalType\":\"bool\",\"name\":\"aiVerified\",\"type\":\"bool\"},{\"internalType\":\"address\",\"name\":\"approvedBy\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"createdAt\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"approvedAt\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"rejectionReason\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_id\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"_reason\",\"type\":\"string\"}],\"name\":\"rejectProposal\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_id\",\"type\":\"uint256\"},{\"internalType\":\"addresspayable\",\"name\":\"_to\",\"type\":\"address\"}],\"name\":\"releaseFunds\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_auditor\",\"type\":\"address\"}],\"name\":\"setAuditor\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_verifier\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"_allowed\",\"type\":\"bool\"}],\"name\":\"setVerifier\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"_ipfsHash\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"_amount\",\"type\":\"uint256\"},{\"internalType\":\"enumTaxFund.ProjectType\",\"name\":\"_projectType\",\"type\":\"uint8\"},{\"internalType\":\"string\",\"name\":\"_description\",\"type\":\"string\"}],\"name\":\"submitProposal\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"totalFunded\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"name\":\"usedIPFSHashes\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"userProposals\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"verifiers\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_id\",\"type\":\"uint256\"},{\"internalType\":\"bool\",\"name\":\"_result\",\"type\":\"bool\"}],\"name\":\"verifyAI\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}]",
}

// ContractsABI is the input ABI used to generate the binding from.
// Deprecated: Use ContractsMetaData.ABI instead.
var ContractsABI = ContractsMetaData.ABI

// Contracts is an auto generated Go binding around an Ethereum contract.
type Contracts struct {
	ContractsCaller     // Read-only binding to the contract
	ContractsTransactor // Write-only binding to the contract
	ContractsFilterer   // Log filterer for contract events
}

// ContractsCaller is an auto generated read-only Go binding around an Ethereum contract.
type ContractsCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ContractsTransactor is an auto generated write-only Go binding around an Ethereum contract.
type ContractsTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ContractsFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type ContractsFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ContractsSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type ContractsSession struct {
	Contract     *Contracts        // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// ContractsCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type ContractsCallerSession struct {
	Contract *ContractsCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts    // Call options to use throughout this session
}

// ContractsTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type ContractsTransactorSession struct {
	Contract     *ContractsTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts    // Transaction auth options to use throughout this session
}

// ContractsRaw is an auto generated low-level Go binding around an Ethereum contract.
type ContractsRaw struct {
	Contract *Contracts // Generic contract binding to access the raw methods on
}

// ContractsCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type ContractsCallerRaw struct {
	Contract *ContractsCaller // Generic read-only contract binding to access the raw methods on
}

// ContractsTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type ContractsTransactorRaw struct {
	Contract *ContractsTransactor // Generic write-only contract binding to access the raw methods on
}

// NewContracts creates a new instance of Contracts, bound to a specific deployed contract.
func NewContracts(address common.Address, backend bind.ContractBackend) (*Contracts, error) {
	contract, err := bindContracts(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Contracts{ContractsCaller: ContractsCaller{contract: contract}, ContractsTransactor: ContractsTransactor{contract: contract}, ContractsFilterer: ContractsFilterer{contract: contract}}, nil
}

// NewContractsCaller creates a new read-only instance of Contracts, bound to a specific deployed contract.
func NewContractsCaller(address common.Address, caller bind.ContractCaller) (*ContractsCaller, error) {
	contract, err := bindContracts(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &ContractsCaller{contract: contract}, nil
}

// NewContractsTransactor creates a new write-only instance of Contracts, bound to a specific deployed contract.
func NewContractsTransactor(address common.Address, transactor bind.ContractTransactor) (*ContractsTransactor, error) {
	contract, err := bindContracts(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &ContractsTransactor{contract: contract}, nil
}

// NewContractsFilterer creates a new log filterer instance of Contracts, bound to a specific deployed contract.
func NewContractsFilterer(address common.Address, filterer bind.ContractFilterer) (*ContractsFilterer, error) {
	contract, err := bindContracts(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &ContractsFilterer{contract: contract}, nil
}

// bindContracts binds a generic wrapper to an already deployed contract.
func bindContracts(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := ContractsMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Contracts *ContractsRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Contracts.Contract.ContractsCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Contracts *ContractsRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Contracts.Contract.ContractsTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Contracts *ContractsRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Contracts.Contract.ContractsTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Contracts *ContractsCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Contracts.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Contracts *ContractsTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Contracts.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Contracts *ContractsTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Contracts.Contract.contract.Transact(opts, method, params...)
}

// Auditor is a free data retrieval call binding the contract method 0x3ec045a6.
//
// Solidity: function auditor() view returns(address)
func (_Contracts *ContractsCaller) Auditor(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Contracts.contract.Call(opts, &out, "auditor")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Auditor is a free data retrieval call binding the contract method 0x3ec045a6.
//
// Solidity: function auditor() view returns(address)
func (_Contracts *ContractsSession) Auditor() (common.Address, error) {
	return _Contracts.Contract.Auditor(&_Contracts.CallOpts)
}

// Auditor is a free data retrieval call binding the contract method 0x3ec045a6.
//
// Solidity: function auditor() view returns(address)
func (_Contracts *ContractsCallerSession) Auditor() (common.Address, error) {
	return _Contracts.Contract.Auditor(&_Contracts.CallOpts)
}

// GetAvailableFunds is a free data retrieval call binding the contract method 0x5195bd29.
//
// Solidity: function getAvailableFunds() view returns(uint256)
func (_Contracts *ContractsCaller) GetAvailableFunds(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Contracts.contract.Call(opts, &out, "getAvailableFunds")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// GetAvailableFunds is a free data retrieval call binding the contract method 0x5195bd29.
//
// Solidity: function getAvailableFunds() view returns(uint256)
func (_Contracts *ContractsSession) GetAvailableFunds() (*big.Int, error) {
	return _Contracts.Contract.GetAvailableFunds(&_Contracts.CallOpts)
}

// GetAvailableFunds is a free data retrieval call binding the contract method 0x5195bd29.
//
// Solidity: function getAvailableFunds() view returns(uint256)
func (_Contracts *ContractsCallerSession) GetAvailableFunds() (*big.Int, error) {
	return _Contracts.Contract.GetAvailableFunds(&_Contracts.CallOpts)
}

// GetContractBalance is a free data retrieval call binding the contract method 0x6f9fb98a.
//
// Solidity: function getContractBalance() view returns(uint256)
func (_Contracts *ContractsCaller) GetContractBalance(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Contracts.contract.Call(opts, &out, "getContractBalance")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// GetContractBalance is a free data retrieval call binding the contract method 0x6f9fb98a.
//
// Solidity: function getContractBalance() view returns(uint256)
func (_Contracts *ContractsSession) GetContractBalance() (*big.Int, error) {
	return _Contracts.Contract.GetContractBalance(&_Contracts.CallOpts)
}

// GetContractBalance is a free data retrieval call binding the contract method 0x6f9fb98a.
//
// Solidity: function getContractBalance() view returns(uint256)
func (_Contracts *ContractsCallerSession) GetContractBalance() (*big.Int, error) {
	return _Contracts.Contract.GetContractBalance(&_Contracts.CallOpts)
}

// GetPendingProposals is a free data retrieval call binding the contract method 0xa80db6fc.
//
// Solidity: function getPendingProposals() view returns(uint256[])
func (_Contracts *ContractsCaller) GetPendingProposals(opts *bind.CallOpts) ([]*big.Int, error) {
	var out []interface{}
	err := _Contracts.contract.Call(opts, &out, "getPendingProposals")

	if err != nil {
		return *new([]*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new([]*big.Int)).(*[]*big.Int)

	return out0, err

}

// GetPendingProposals is a free data retrieval call binding the contract method 0xa80db6fc.
//
// Solidity: function getPendingProposals() view returns(uint256[])
func (_Contracts *ContractsSession) GetPendingProposals() ([]*big.Int, error) {
	return _Contracts.Contract.GetPendingProposals(&_Contracts.CallOpts)
}

// GetPendingProposals is a free data retrieval call binding the contract method 0xa80db6fc.
//
// Solidity: function getPendingProposals() view returns(uint256[])
func (_Contracts *ContractsCallerSession) GetPendingProposals() ([]*big.Int, error) {
	return _Contracts.Contract.GetPendingProposals(&_Contracts.CallOpts)
}

// GetProposal is a free data retrieval call binding the contract method 0xc7f758a8.
//
// Solidity: function getProposal(uint256 _id) view returns((uint256,address,string,uint256,uint8,string,uint8,bool,address,uint256,uint256,string))
func (_Contracts *ContractsCaller) GetProposal(opts *bind.CallOpts, _id *big.Int) (TaxFundProposal, error) {
	var out []interface{}
	err := _Contracts.contract.Call(opts, &out, "getProposal", _id)

	if err != nil {
		return *new(TaxFundProposal), err
	}

	out0 := *abi.ConvertType(out[0], new(TaxFundProposal)).(*TaxFundProposal)

	return out0, err

}

// GetProposal is a free data retrieval call binding the contract method 0xc7f758a8.
//
// Solidity: function getProposal(uint256 _id) view returns((uint256,address,string,uint256,uint8,string,uint8,bool,address,uint256,uint256,string))
func (_Contracts *ContractsSession) GetProposal(_id *big.Int) (TaxFundProposal, error) {
	return _Contracts.Contract.GetProposal(&_Contracts.CallOpts, _id)
}

// GetProposal is a free data retrieval call binding the contract method 0xc7f758a8.
//
// Solidity: function getProposal(uint256 _id) view returns((uint256,address,string,uint256,uint8,string,uint8,bool,address,uint256,uint256,string))
func (_Contracts *ContractsCallerSession) GetProposal(_id *big.Int) (TaxFundProposal, error) {
	return _Contracts.Contract.GetProposal(&_Contracts.CallOpts, _id)
}

// GetProposalsByStatus is a free data retrieval call binding the contract method 0xa51388c8.
//
// Solidity: function getProposalsByStatus(uint8 _status) view returns(uint256[])
func (_Contracts *ContractsCaller) GetProposalsByStatus(opts *bind.CallOpts, _status uint8) ([]*big.Int, error) {
	var out []interface{}
	err := _Contracts.contract.Call(opts, &out, "getProposalsByStatus", _status)

	if err != nil {
		return *new([]*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new([]*big.Int)).(*[]*big.Int)

	return out0, err

}

// GetProposalsByStatus is a free data retrieval call binding the contract method 0xa51388c8.
//
// Solidity: function getProposalsByStatus(uint8 _status) view returns(uint256[])
func (_Contracts *ContractsSession) GetProposalsByStatus(_status uint8) ([]*big.Int, error) {
	return _Contracts.Contract.GetProposalsByStatus(&_Contracts.CallOpts, _status)
}

// GetProposalsByStatus is a free data retrieval call binding the contract method 0xa51388c8.
//
// Solidity: function getProposalsByStatus(uint8 _status) view returns(uint256[])
func (_Contracts *ContractsCallerSession) GetProposalsByStatus(_status uint8) ([]*big.Int, error) {
	return _Contracts.Contract.GetProposalsByStatus(&_Contracts.CallOpts, _status)
}

// GetTotalFunded is a free data retrieval call binding the contract method 0xb214c3d9.
//
// Solidity: function getTotalFunded() view returns(uint256)
func (_Contracts *ContractsCaller) GetTotalFunded(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Contracts.contract.Call(opts, &out, "getTotalFunded")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// GetTotalFunded is a free data retrieval call binding the contract method 0xb214c3d9.
//
// Solidity: function getTotalFunded() view returns(uint256)
func (_Contracts *ContractsSession) GetTotalFunded() (*big.Int, error) {
	return _Contracts.Contract.GetTotalFunded(&_Contracts.CallOpts)
}

// GetTotalFunded is a free data retrieval call binding the contract method 0xb214c3d9.
//
// Solidity: function getTotalFunded() view returns(uint256)
func (_Contracts *ContractsCallerSession) GetTotalFunded() (*big.Int, error) {
	return _Contracts.Contract.GetTotalFunded(&_Contracts.CallOpts)
}

// GetUserProposals is a free data retrieval call binding the contract method 0x78ef1138.
//
// Solidity: function getUserProposals(address _user) view returns(uint256[])
func (_Contracts *ContractsCaller) GetUserProposals(opts *bind.CallOpts, _user common.Address) ([]*big.Int, error) {
	var out []interface{}
	err := _Contracts.contract.Call(opts, &out, "getUserProposals", _user)

	if err != nil {
		return *new([]*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new([]*big.Int)).(*[]*big.Int)

	return out0, err

}

// GetUserProposals is a free data retrieval call binding the contract method 0x78ef1138.
//
// Solidity: function getUserProposals(address _user) view returns(uint256[])
func (_Contracts *ContractsSession) GetUserProposals(_user common.Address) ([]*big.Int, error) {
	return _Contracts.Contract.GetUserProposals(&_Contracts.CallOpts, _user)
}

// GetUserProposals is a free data retrieval call binding the contract method 0x78ef1138.
//
// Solidity: function getUserProposals(address _user) view returns(uint256[])
func (_Contracts *ContractsCallerSession) GetUserProposals(_user common.Address) ([]*big.Int, error) {
	return _Contracts.Contract.GetUserProposals(&_Contracts.CallOpts, _user)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Contracts *ContractsCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Contracts.contract.Call(opts, &out, "owner")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Contracts *ContractsSession) Owner() (common.Address, error) {
	return _Contracts.Contract.Owner(&_Contracts.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Contracts *ContractsCallerSession) Owner() (common.Address, error) {
	return _Contracts.Contract.Owner(&_Contracts.CallOpts)
}

// ProposalCount is a free data retrieval call binding the contract method 0xda35c664.
//
// Solidity: function proposalCount() view returns(uint256)
func (_Contracts *ContractsCaller) ProposalCount(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Contracts.contract.Call(opts, &out, "proposalCount")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// ProposalCount is a free data retrieval call binding the contract method 0xda35c664.
//
// Solidity: function proposalCount() view returns(uint256)
func (_Contracts *ContractsSession) ProposalCount() (*big.Int, error) {
	return _Contracts.Contract.ProposalCount(&_Contracts.CallOpts)
}

// ProposalCount is a free data retrieval call binding the contract method 0xda35c664.
//
// Solidity: function proposalCount() view returns(uint256)
func (_Contracts *ContractsCallerSession) ProposalCount() (*big.Int, error) {
	return _Contracts.Contract.ProposalCount(&_Contracts.CallOpts)
}

// Proposals is a free data retrieval call binding the contract method 0x013cf08b.
//
// Solidity: function proposals(uint256 ) view returns(uint256 id, address proposer, string ipfsHash, uint256 amount, uint8 projectType, string description, uint8 status, bool aiVerified, address approvedBy, uint256 createdAt, uint256 approvedAt, string rejectionReason)
func (_Contracts *ContractsCaller) Proposals(opts *bind.CallOpts, arg0 *big.Int) (struct {
	Id              *big.Int
	Proposer        common.Address
	IpfsHash        string
	Amount          *big.Int
	ProjectType     uint8
	Description     string
	Status          uint8
	AiVerified      bool
	ApprovedBy      common.Address
	CreatedAt       *big.Int
	ApprovedAt      *big.Int
	RejectionReason string
}, error) {
	var out []interface{}
	err := _Contracts.contract.Call(opts, &out, "proposals", arg0)

	outstruct := new(struct {
		Id              *big.Int
		Proposer        common.Address
		IpfsHash        string
		Amount          *big.Int
		ProjectType     uint8
		Description     string
		Status          uint8
		AiVerified      bool
		ApprovedBy      common.Address
		CreatedAt       *big.Int
		ApprovedAt      *big.Int
		RejectionReason string
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.Id = *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)
	outstruct.Proposer = *abi.ConvertType(out[1], new(common.Address)).(*common.Address)
	outstruct.IpfsHash = *abi.ConvertType(out[2], new(string)).(*string)
	outstruct.Amount = *abi.ConvertType(out[3], new(*big.Int)).(**big.Int)
	outstruct.ProjectType = *abi.ConvertType(out[4], new(uint8)).(*uint8)
	outstruct.Description = *abi.ConvertType(out[5], new(string)).(*string)
	outstruct.Status = *abi.ConvertType(out[6], new(uint8)).(*uint8)
	outstruct.AiVerified = *abi.ConvertType(out[7], new(bool)).(*bool)
	outstruct.ApprovedBy = *abi.ConvertType(out[8], new(common.Address)).(*common.Address)
	outstruct.CreatedAt = *abi.ConvertType(out[9], new(*big.Int)).(**big.Int)
	outstruct.ApprovedAt = *abi.ConvertType(out[10], new(*big.Int)).(**big.Int)
	outstruct.RejectionReason = *abi.ConvertType(out[11], new(string)).(*string)

	return *outstruct, err

}

// Proposals is a free data retrieval call binding the contract method 0x013cf08b.
//
// Solidity: function proposals(uint256 ) view returns(uint256 id, address proposer, string ipfsHash, uint256 amount, uint8 projectType, string description, uint8 status, bool aiVerified, address approvedBy, uint256 createdAt, uint256 approvedAt, string rejectionReason)
func (_Contracts *ContractsSession) Proposals(arg0 *big.Int) (struct {
	Id              *big.Int
	Proposer        common.Address
	IpfsHash        string
	Amount          *big.Int
	ProjectType     uint8
	Description     string
	Status          uint8
	AiVerified      bool
	ApprovedBy      common.Address
	CreatedAt       *big.Int
	ApprovedAt      *big.Int
	RejectionReason string
}, error) {
	return _Contracts.Contract.Proposals(&_Contracts.CallOpts, arg0)
}

// Proposals is a free data retrieval call binding the contract method 0x013cf08b.
//
// Solidity: function proposals(uint256 ) view returns(uint256 id, address proposer, string ipfsHash, uint256 amount, uint8 projectType, string description, uint8 status, bool aiVerified, address approvedBy, uint256 createdAt, uint256 approvedAt, string rejectionReason)
func (_Contracts *ContractsCallerSession) Proposals(arg0 *big.Int) (struct {
	Id              *big.Int
	Proposer        common.Address
	IpfsHash        string
	Amount          *big.Int
	ProjectType     uint8
	Description     string
	Status          uint8
	AiVerified      bool
	ApprovedBy      common.Address
	CreatedAt       *big.Int
	ApprovedAt      *big.Int
	RejectionReason string
}, error) {
	return _Contracts.Contract.Proposals(&_Contracts.CallOpts, arg0)
}

// TotalFunded is a free data retrieval call binding the contract method 0xad044f49.
//
// Solidity: function totalFunded() view returns(uint256)
func (_Contracts *ContractsCaller) TotalFunded(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Contracts.contract.Call(opts, &out, "totalFunded")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// TotalFunded is a free data retrieval call binding the contract method 0xad044f49.
//
// Solidity: function totalFunded() view returns(uint256)
func (_Contracts *ContractsSession) TotalFunded() (*big.Int, error) {
	return _Contracts.Contract.TotalFunded(&_Contracts.CallOpts)
}

// TotalFunded is a free data retrieval call binding the contract method 0xad044f49.
//
// Solidity: function totalFunded() view returns(uint256)
func (_Contracts *ContractsCallerSession) TotalFunded() (*big.Int, error) {
	return _Contracts.Contract.TotalFunded(&_Contracts.CallOpts)
}

// UsedIPFSHashes is a free data retrieval call binding the contract method 0x462f4a3e.
//
// Solidity: function usedIPFSHashes(string ) view returns(bool)
func (_Contracts *ContractsCaller) UsedIPFSHashes(opts *bind.CallOpts, arg0 string) (bool, error) {
	var out []interface{}
	err := _Contracts.contract.Call(opts, &out, "usedIPFSHashes", arg0)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// UsedIPFSHashes is a free data retrieval call binding the contract method 0x462f4a3e.
//
// Solidity: function usedIPFSHashes(string ) view returns(bool)
func (_Contracts *ContractsSession) UsedIPFSHashes(arg0 string) (bool, error) {
	return _Contracts.Contract.UsedIPFSHashes(&_Contracts.CallOpts, arg0)
}

// UsedIPFSHashes is a free data retrieval call binding the contract method 0x462f4a3e.
//
// Solidity: function usedIPFSHashes(string ) view returns(bool)
func (_Contracts *ContractsCallerSession) UsedIPFSHashes(arg0 string) (bool, error) {
	return _Contracts.Contract.UsedIPFSHashes(&_Contracts.CallOpts, arg0)
}

// UserProposals is a free data retrieval call binding the contract method 0x1b31527f.
//
// Solidity: function userProposals(address , uint256 ) view returns(uint256)
func (_Contracts *ContractsCaller) UserProposals(opts *bind.CallOpts, arg0 common.Address, arg1 *big.Int) (*big.Int, error) {
	var out []interface{}
	err := _Contracts.contract.Call(opts, &out, "userProposals", arg0, arg1)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// UserProposals is a free data retrieval call binding the contract method 0x1b31527f.
//
// Solidity: function userProposals(address , uint256 ) view returns(uint256)
func (_Contracts *ContractsSession) UserProposals(arg0 common.Address, arg1 *big.Int) (*big.Int, error) {
	return _Contracts.Contract.UserProposals(&_Contracts.CallOpts, arg0, arg1)
}

// UserProposals is a free data retrieval call binding the contract method 0x1b31527f.
//
// Solidity: function userProposals(address , uint256 ) view returns(uint256)
func (_Contracts *ContractsCallerSession) UserProposals(arg0 common.Address, arg1 *big.Int) (*big.Int, error) {
	return _Contracts.Contract.UserProposals(&_Contracts.CallOpts, arg0, arg1)
}

// Verifiers is a free data retrieval call binding the contract method 0x6c824487.
//
// Solidity: function verifiers(address ) view returns(bool)
func (_Contracts *ContractsCaller) Verifiers(opts *bind.CallOpts, arg0 common.Address) (bool, error) {
	var out []interface{}
	err := _Contracts.contract.Call(opts, &out, "verifiers", arg0)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// Verifiers is a free data retrieval call binding the contract method 0x6c824487.
//
// Solidity: function verifiers(address ) view returns(bool)
func (_Contracts *ContractsSession) Verifiers(arg0 common.Address) (bool, error) {
	return _Contracts.Contract.Verifiers(&_Contracts.CallOpts, arg0)
}

// Verifiers is a free data retrieval call binding the contract method 0x6c824487.
//
// Solidity: function verifiers(address ) view returns(bool)
func (_Contracts *ContractsCallerSession) Verifiers(arg0 common.Address) (bool, error) {
	return _Contracts.Contract.Verifiers(&_Contracts.CallOpts, arg0)
}

// ApproveProposal is a paid mutator transaction binding the contract method 0x98951b56.
//
// Solidity: function approveProposal(uint256 _id) returns()
func (_Contracts *ContractsTransactor) ApproveProposal(opts *bind.TransactOpts, _id *big.Int) (*types.Transaction, error) {
	return _Contracts.contract.Transact(opts, "approveProposal", _id)
}

// ApproveProposal is a paid mutator transaction binding the contract method 0x98951b56.
//
// Solidity: function approveProposal(uint256 _id) returns()
func (_Contracts *ContractsSession) ApproveProposal(_id *big.Int) (*types.Transaction, error) {
	return _Contracts.Contract.ApproveProposal(&_Contracts.TransactOpts, _id)
}

// ApproveProposal is a paid mutator transaction binding the contract method 0x98951b56.
//
// Solidity: function approveProposal(uint256 _id) returns()
func (_Contracts *ContractsTransactorSession) ApproveProposal(_id *big.Int) (*types.Transaction, error) {
	return _Contracts.Contract.ApproveProposal(&_Contracts.TransactOpts, _id)
}

// Deposit is a paid mutator transaction binding the contract method 0xd0e30db0.
//
// Solidity: function deposit() payable returns()
func (_Contracts *ContractsTransactor) Deposit(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Contracts.contract.Transact(opts, "deposit")
}

// Deposit is a paid mutator transaction binding the contract method 0xd0e30db0.
//
// Solidity: function deposit() payable returns()
func (_Contracts *ContractsSession) Deposit() (*types.Transaction, error) {
	return _Contracts.Contract.Deposit(&_Contracts.TransactOpts)
}

// Deposit is a paid mutator transaction binding the contract method 0xd0e30db0.
//
// Solidity: function deposit() payable returns()
func (_Contracts *ContractsTransactorSession) Deposit() (*types.Transaction, error) {
	return _Contracts.Contract.Deposit(&_Contracts.TransactOpts)
}

// EmergencyWithdraw is a paid mutator transaction binding the contract method 0xdb2e21bc.
//
// Solidity: function emergencyWithdraw() returns()
func (_Contracts *ContractsTransactor) EmergencyWithdraw(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Contracts.contract.Transact(opts, "emergencyWithdraw")
}

// EmergencyWithdraw is a paid mutator transaction binding the contract method 0xdb2e21bc.
//
// Solidity: function emergencyWithdraw() returns()
func (_Contracts *ContractsSession) EmergencyWithdraw() (*types.Transaction, error) {
	return _Contracts.Contract.EmergencyWithdraw(&_Contracts.TransactOpts)
}

// EmergencyWithdraw is a paid mutator transaction binding the contract method 0xdb2e21bc.
//
// Solidity: function emergencyWithdraw() returns()
func (_Contracts *ContractsTransactorSession) EmergencyWithdraw() (*types.Transaction, error) {
	return _Contracts.Contract.EmergencyWithdraw(&_Contracts.TransactOpts)
}

// RejectProposal is a paid mutator transaction binding the contract method 0x952a5be7.
//
// Solidity: function rejectProposal(uint256 _id, string _reason) returns()
func (_Contracts *ContractsTransactor) RejectProposal(opts *bind.TransactOpts, _id *big.Int, _reason string) (*types.Transaction, error) {
	return _Contracts.contract.Transact(opts, "rejectProposal", _id, _reason)
}

// RejectProposal is a paid mutator transaction binding the contract method 0x952a5be7.
//
// Solidity: function rejectProposal(uint256 _id, string _reason) returns()
func (_Contracts *ContractsSession) RejectProposal(_id *big.Int, _reason string) (*types.Transaction, error) {
	return _Contracts.Contract.RejectProposal(&_Contracts.TransactOpts, _id, _reason)
}

// RejectProposal is a paid mutator transaction binding the contract method 0x952a5be7.
//
// Solidity: function rejectProposal(uint256 _id, string _reason) returns()
func (_Contracts *ContractsTransactorSession) RejectProposal(_id *big.Int, _reason string) (*types.Transaction, error) {
	return _Contracts.Contract.RejectProposal(&_Contracts.TransactOpts, _id, _reason)
}

// ReleaseFunds is a paid mutator transaction binding the contract method 0x1af23a59.
//
// Solidity: function releaseFunds(uint256 _id, address _to) returns()
func (_Contracts *ContractsTransactor) ReleaseFunds(opts *bind.TransactOpts, _id *big.Int, _to common.Address) (*types.Transaction, error) {
	return _Contracts.contract.Transact(opts, "releaseFunds", _id, _to)
}

// ReleaseFunds is a paid mutator transaction binding the contract method 0x1af23a59.
//
// Solidity: function releaseFunds(uint256 _id, address _to) returns()
func (_Contracts *ContractsSession) ReleaseFunds(_id *big.Int, _to common.Address) (*types.Transaction, error) {
	return _Contracts.Contract.ReleaseFunds(&_Contracts.TransactOpts, _id, _to)
}

// ReleaseFunds is a paid mutator transaction binding the contract method 0x1af23a59.
//
// Solidity: function releaseFunds(uint256 _id, address _to) returns()
func (_Contracts *ContractsTransactorSession) ReleaseFunds(_id *big.Int, _to common.Address) (*types.Transaction, error) {
	return _Contracts.Contract.ReleaseFunds(&_Contracts.TransactOpts, _id, _to)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_Contracts *ContractsTransactor) RenounceOwnership(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Contracts.contract.Transact(opts, "renounceOwnership")
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_Contracts *ContractsSession) RenounceOwnership() (*types.Transaction, error) {
	return _Contracts.Contract.RenounceOwnership(&_Contracts.TransactOpts)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_Contracts *ContractsTransactorSession) RenounceOwnership() (*types.Transaction, error) {
	return _Contracts.Contract.RenounceOwnership(&_Contracts.TransactOpts)
}

// SetAuditor is a paid mutator transaction binding the contract method 0x9f203255.
//
// Solidity: function setAuditor(address _auditor) returns()
func (_Contracts *ContractsTransactor) SetAuditor(opts *bind.TransactOpts, _auditor common.Address) (*types.Transaction, error) {
	return _Contracts.contract.Transact(opts, "setAuditor", _auditor)
}

// SetAuditor is a paid mutator transaction binding the contract method 0x9f203255.
//
// Solidity: function setAuditor(address _auditor) returns()
func (_Contracts *ContractsSession) SetAuditor(_auditor common.Address) (*types.Transaction, error) {
	return _Contracts.Contract.SetAuditor(&_Contracts.TransactOpts, _auditor)
}

// SetAuditor is a paid mutator transaction binding the contract method 0x9f203255.
//
// Solidity: function setAuditor(address _auditor) returns()
func (_Contracts *ContractsTransactorSession) SetAuditor(_auditor common.Address) (*types.Transaction, error) {
	return _Contracts.Contract.SetAuditor(&_Contracts.TransactOpts, _auditor)
}

// SetVerifier is a paid mutator transaction binding the contract method 0xac9b5671.
//
// Solidity: function setVerifier(address _verifier, bool _allowed) returns()
func (_Contracts *ContractsTransactor) SetVerifier(opts *bind.TransactOpts, _verifier common.Address, _allowed bool) (*types.Transaction, error) {
	return _Contracts.contract.Transact(opts, "setVerifier", _verifier, _allowed)
}

// SetVerifier is a paid mutator transaction binding the contract method 0xac9b5671.
//
// Solidity: function setVerifier(address _verifier, bool _allowed) returns()
func (_Contracts *ContractsSession) SetVerifier(_verifier common.Address, _allowed bool) (*types.Transaction, error) {
	return _Contracts.Contract.SetVerifier(&_Contracts.TransactOpts, _verifier, _allowed)
}

// SetVerifier is a paid mutator transaction binding the contract method 0xac9b5671.
//
// Solidity: function setVerifier(address _verifier, bool _allowed) returns()
func (_Contracts *ContractsTransactorSession) SetVerifier(_verifier common.Address, _allowed bool) (*types.Transaction, error) {
	return _Contracts.Contract.SetVerifier(&_Contracts.TransactOpts, _verifier, _allowed)
}

// SubmitProposal is a paid mutator transaction binding the contract method 0xdd3dbcd4.
//
// Solidity: function submitProposal(string _ipfsHash, uint256 _amount, uint8 _projectType, string _description) returns(uint256)
func (_Contracts *ContractsTransactor) SubmitProposal(opts *bind.TransactOpts, _ipfsHash string, _amount *big.Int, _projectType uint8, _description string) (*types.Transaction, error) {
	return _Contracts.contract.Transact(opts, "submitProposal", _ipfsHash, _amount, _projectType, _description)
}

// SubmitProposal is a paid mutator transaction binding the contract method 0xdd3dbcd4.
//
// Solidity: function submitProposal(string _ipfsHash, uint256 _amount, uint8 _projectType, string _description) returns(uint256)
func (_Contracts *ContractsSession) SubmitProposal(_ipfsHash string, _amount *big.Int, _projectType uint8, _description string) (*types.Transaction, error) {
	return _Contracts.Contract.SubmitProposal(&_Contracts.TransactOpts, _ipfsHash, _amount, _projectType, _description)
}

// SubmitProposal is a paid mutator transaction binding the contract method 0xdd3dbcd4.
//
// Solidity: function submitProposal(string _ipfsHash, uint256 _amount, uint8 _projectType, string _description) returns(uint256)
func (_Contracts *ContractsTransactorSession) SubmitProposal(_ipfsHash string, _amount *big.Int, _projectType uint8, _description string) (*types.Transaction, error) {
	return _Contracts.Contract.SubmitProposal(&_Contracts.TransactOpts, _ipfsHash, _amount, _projectType, _description)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_Contracts *ContractsTransactor) TransferOwnership(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _Contracts.contract.Transact(opts, "transferOwnership", newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_Contracts *ContractsSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _Contracts.Contract.TransferOwnership(&_Contracts.TransactOpts, newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_Contracts *ContractsTransactorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _Contracts.Contract.TransferOwnership(&_Contracts.TransactOpts, newOwner)
}

// VerifyAI is a paid mutator transaction binding the contract method 0xab61b3aa.
//
// Solidity: function verifyAI(uint256 _id, bool _result) returns()
func (_Contracts *ContractsTransactor) VerifyAI(opts *bind.TransactOpts, _id *big.Int, _result bool) (*types.Transaction, error) {
	return _Contracts.contract.Transact(opts, "verifyAI", _id, _result)
}

// VerifyAI is a paid mutator transaction binding the contract method 0xab61b3aa.
//
// Solidity: function verifyAI(uint256 _id, bool _result) returns()
func (_Contracts *ContractsSession) VerifyAI(_id *big.Int, _result bool) (*types.Transaction, error) {
	return _Contracts.Contract.VerifyAI(&_Contracts.TransactOpts, _id, _result)
}

// VerifyAI is a paid mutator transaction binding the contract method 0xab61b3aa.
//
// Solidity: function verifyAI(uint256 _id, bool _result) returns()
func (_Contracts *ContractsTransactorSession) VerifyAI(_id *big.Int, _result bool) (*types.Transaction, error) {
	return _Contracts.Contract.VerifyAI(&_Contracts.TransactOpts, _id, _result)
}

// Receive is a paid mutator transaction binding the contract receive function.
//
// Solidity: receive() payable returns()
func (_Contracts *ContractsTransactor) Receive(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Contracts.contract.RawTransact(opts, nil) // calldata is disallowed for receive function
}

// Receive is a paid mutator transaction binding the contract receive function.
//
// Solidity: receive() payable returns()
func (_Contracts *ContractsSession) Receive() (*types.Transaction, error) {
	return _Contracts.Contract.Receive(&_Contracts.TransactOpts)
}

// Receive is a paid mutator transaction binding the contract receive function.
//
// Solidity: receive() payable returns()
func (_Contracts *ContractsTransactorSession) Receive() (*types.Transaction, error) {
	return _Contracts.Contract.Receive(&_Contracts.TransactOpts)
}

// ContractsAuditorUpdatedIterator is returned from FilterAuditorUpdated and is used to iterate over the raw logs and unpacked data for AuditorUpdated events raised by the Contracts contract.
type ContractsAuditorUpdatedIterator struct {
	Event *ContractsAuditorUpdated // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *ContractsAuditorUpdatedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ContractsAuditorUpdated)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(ContractsAuditorUpdated)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *ContractsAuditorUpdatedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ContractsAuditorUpdatedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ContractsAuditorUpdated represents a AuditorUpdated event raised by the Contracts contract.
type ContractsAuditorUpdated struct {
	Auditor common.Address
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterAuditorUpdated is a free log retrieval operation binding the contract event 0xddfc2a1c727d0df3ba171b075c0432e6e0feb921b26103d70e202390881cec5b.
//
// Solidity: event AuditorUpdated(address indexed auditor)
func (_Contracts *ContractsFilterer) FilterAuditorUpdated(opts *bind.FilterOpts, auditor []common.Address) (*ContractsAuditorUpdatedIterator, error) {

	var auditorRule []interface{}
	for _, auditorItem := range auditor {
		auditorRule = append(auditorRule, auditorItem)
	}

	logs, sub, err := _Contracts.contract.FilterLogs(opts, "AuditorUpdated", auditorRule)
	if err != nil {
		return nil, err
	}
	return &ContractsAuditorUpdatedIterator{contract: _Contracts.contract, event: "AuditorUpdated", logs: logs, sub: sub}, nil
}

// WatchAuditorUpdated is a free log subscription operation binding the contract event 0xddfc2a1c727d0df3ba171b075c0432e6e0feb921b26103d70e202390881cec5b.
//
// Solidity: event AuditorUpdated(address indexed auditor)
func (_Contracts *ContractsFilterer) WatchAuditorUpdated(opts *bind.WatchOpts, sink chan<- *ContractsAuditorUpdated, auditor []common.Address) (event.Subscription, error) {

	var auditorRule []interface{}
	for _, auditorItem := range auditor {
		auditorRule = append(auditorRule, auditorItem)
	}

	logs, sub, err := _Contracts.contract.WatchLogs(opts, "AuditorUpdated", auditorRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ContractsAuditorUpdated)
				if err := _Contracts.contract.UnpackLog(event, "AuditorUpdated", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseAuditorUpdated is a log parse operation binding the contract event 0xddfc2a1c727d0df3ba171b075c0432e6e0feb921b26103d70e202390881cec5b.
//
// Solidity: event AuditorUpdated(address indexed auditor)
func (_Contracts *ContractsFilterer) ParseAuditorUpdated(log types.Log) (*ContractsAuditorUpdated, error) {
	event := new(ContractsAuditorUpdated)
	if err := _Contracts.contract.UnpackLog(event, "AuditorUpdated", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// ContractsFundsReleasedIterator is returned from FilterFundsReleased and is used to iterate over the raw logs and unpacked data for FundsReleased events raised by the Contracts contract.
type ContractsFundsReleasedIterator struct {
	Event *ContractsFundsReleased // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *ContractsFundsReleasedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ContractsFundsReleased)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(ContractsFundsReleased)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *ContractsFundsReleasedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ContractsFundsReleasedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ContractsFundsReleased represents a FundsReleased event raised by the Contracts contract.
type ContractsFundsReleased struct {
	Id     *big.Int
	To     common.Address
	Amount *big.Int
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterFundsReleased is a free log retrieval operation binding the contract event 0x6e3c6096795c8298a218b2cfb8bde42726ff7c9a3d27b4d3ba41ab7f74feb5fb.
//
// Solidity: event FundsReleased(uint256 indexed id, address indexed to, uint256 amount)
func (_Contracts *ContractsFilterer) FilterFundsReleased(opts *bind.FilterOpts, id []*big.Int, to []common.Address) (*ContractsFundsReleasedIterator, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _Contracts.contract.FilterLogs(opts, "FundsReleased", idRule, toRule)
	if err != nil {
		return nil, err
	}
	return &ContractsFundsReleasedIterator{contract: _Contracts.contract, event: "FundsReleased", logs: logs, sub: sub}, nil
}

// WatchFundsReleased is a free log subscription operation binding the contract event 0x6e3c6096795c8298a218b2cfb8bde42726ff7c9a3d27b4d3ba41ab7f74feb5fb.
//
// Solidity: event FundsReleased(uint256 indexed id, address indexed to, uint256 amount)
func (_Contracts *ContractsFilterer) WatchFundsReleased(opts *bind.WatchOpts, sink chan<- *ContractsFundsReleased, id []*big.Int, to []common.Address) (event.Subscription, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _Contracts.contract.WatchLogs(opts, "FundsReleased", idRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ContractsFundsReleased)
				if err := _Contracts.contract.UnpackLog(event, "FundsReleased", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseFundsReleased is a log parse operation binding the contract event 0x6e3c6096795c8298a218b2cfb8bde42726ff7c9a3d27b4d3ba41ab7f74feb5fb.
//
// Solidity: event FundsReleased(uint256 indexed id, address indexed to, uint256 amount)
func (_Contracts *ContractsFilterer) ParseFundsReleased(log types.Log) (*ContractsFundsReleased, error) {
	event := new(ContractsFundsReleased)
	if err := _Contracts.contract.UnpackLog(event, "FundsReleased", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// ContractsOwnershipTransferredIterator is returned from FilterOwnershipTransferred and is used to iterate over the raw logs and unpacked data for OwnershipTransferred events raised by the Contracts contract.
type ContractsOwnershipTransferredIterator struct {
	Event *ContractsOwnershipTransferred // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *ContractsOwnershipTransferredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ContractsOwnershipTransferred)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(ContractsOwnershipTransferred)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *ContractsOwnershipTransferredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ContractsOwnershipTransferredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ContractsOwnershipTransferred represents a OwnershipTransferred event raised by the Contracts contract.
type ContractsOwnershipTransferred struct {
	PreviousOwner common.Address
	NewOwner      common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterOwnershipTransferred is a free log retrieval operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_Contracts *ContractsFilterer) FilterOwnershipTransferred(opts *bind.FilterOpts, previousOwner []common.Address, newOwner []common.Address) (*ContractsOwnershipTransferredIterator, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _Contracts.contract.FilterLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return &ContractsOwnershipTransferredIterator{contract: _Contracts.contract, event: "OwnershipTransferred", logs: logs, sub: sub}, nil
}

// WatchOwnershipTransferred is a free log subscription operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_Contracts *ContractsFilterer) WatchOwnershipTransferred(opts *bind.WatchOpts, sink chan<- *ContractsOwnershipTransferred, previousOwner []common.Address, newOwner []common.Address) (event.Subscription, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _Contracts.contract.WatchLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ContractsOwnershipTransferred)
				if err := _Contracts.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseOwnershipTransferred is a log parse operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_Contracts *ContractsFilterer) ParseOwnershipTransferred(log types.Log) (*ContractsOwnershipTransferred, error) {
	event := new(ContractsOwnershipTransferred)
	if err := _Contracts.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// ContractsProposalApprovedIterator is returned from FilterProposalApproved and is used to iterate over the raw logs and unpacked data for ProposalApproved events raised by the Contracts contract.
type ContractsProposalApprovedIterator struct {
	Event *ContractsProposalApproved // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *ContractsProposalApprovedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ContractsProposalApproved)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(ContractsProposalApproved)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *ContractsProposalApprovedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ContractsProposalApprovedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ContractsProposalApproved represents a ProposalApproved event raised by the Contracts contract.
type ContractsProposalApproved struct {
	Id      *big.Int
	Auditor common.Address
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterProposalApproved is a free log retrieval operation binding the contract event 0x049c28adfe50bcf1b76fd95273b6a24566b9f377e52fddc653c3355248dad07a.
//
// Solidity: event ProposalApproved(uint256 indexed id, address indexed auditor)
func (_Contracts *ContractsFilterer) FilterProposalApproved(opts *bind.FilterOpts, id []*big.Int, auditor []common.Address) (*ContractsProposalApprovedIterator, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}
	var auditorRule []interface{}
	for _, auditorItem := range auditor {
		auditorRule = append(auditorRule, auditorItem)
	}

	logs, sub, err := _Contracts.contract.FilterLogs(opts, "ProposalApproved", idRule, auditorRule)
	if err != nil {
		return nil, err
	}
	return &ContractsProposalApprovedIterator{contract: _Contracts.contract, event: "ProposalApproved", logs: logs, sub: sub}, nil
}

// WatchProposalApproved is a free log subscription operation binding the contract event 0x049c28adfe50bcf1b76fd95273b6a24566b9f377e52fddc653c3355248dad07a.
//
// Solidity: event ProposalApproved(uint256 indexed id, address indexed auditor)
func (_Contracts *ContractsFilterer) WatchProposalApproved(opts *bind.WatchOpts, sink chan<- *ContractsProposalApproved, id []*big.Int, auditor []common.Address) (event.Subscription, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}
	var auditorRule []interface{}
	for _, auditorItem := range auditor {
		auditorRule = append(auditorRule, auditorItem)
	}

	logs, sub, err := _Contracts.contract.WatchLogs(opts, "ProposalApproved", idRule, auditorRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ContractsProposalApproved)
				if err := _Contracts.contract.UnpackLog(event, "ProposalApproved", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseProposalApproved is a log parse operation binding the contract event 0x049c28adfe50bcf1b76fd95273b6a24566b9f377e52fddc653c3355248dad07a.
//
// Solidity: event ProposalApproved(uint256 indexed id, address indexed auditor)
func (_Contracts *ContractsFilterer) ParseProposalApproved(log types.Log) (*ContractsProposalApproved, error) {
	event := new(ContractsProposalApproved)
	if err := _Contracts.contract.UnpackLog(event, "ProposalApproved", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// ContractsProposalRejectedIterator is returned from FilterProposalRejected and is used to iterate over the raw logs and unpacked data for ProposalRejected events raised by the Contracts contract.
type ContractsProposalRejectedIterator struct {
	Event *ContractsProposalRejected // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *ContractsProposalRejectedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ContractsProposalRejected)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(ContractsProposalRejected)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *ContractsProposalRejectedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ContractsProposalRejectedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ContractsProposalRejected represents a ProposalRejected event raised by the Contracts contract.
type ContractsProposalRejected struct {
	Id     *big.Int
	Reason string
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterProposalRejected is a free log retrieval operation binding the contract event 0xe5f9059dc551d2dcf73c3bc69f282e134799b450f062c909d9f7ff45951327bd.
//
// Solidity: event ProposalRejected(uint256 indexed id, string reason)
func (_Contracts *ContractsFilterer) FilterProposalRejected(opts *bind.FilterOpts, id []*big.Int) (*ContractsProposalRejectedIterator, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _Contracts.contract.FilterLogs(opts, "ProposalRejected", idRule)
	if err != nil {
		return nil, err
	}
	return &ContractsProposalRejectedIterator{contract: _Contracts.contract, event: "ProposalRejected", logs: logs, sub: sub}, nil
}

// WatchProposalRejected is a free log subscription operation binding the contract event 0xe5f9059dc551d2dcf73c3bc69f282e134799b450f062c909d9f7ff45951327bd.
//
// Solidity: event ProposalRejected(uint256 indexed id, string reason)
func (_Contracts *ContractsFilterer) WatchProposalRejected(opts *bind.WatchOpts, sink chan<- *ContractsProposalRejected, id []*big.Int) (event.Subscription, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _Contracts.contract.WatchLogs(opts, "ProposalRejected", idRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ContractsProposalRejected)
				if err := _Contracts.contract.UnpackLog(event, "ProposalRejected", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseProposalRejected is a log parse operation binding the contract event 0xe5f9059dc551d2dcf73c3bc69f282e134799b450f062c909d9f7ff45951327bd.
//
// Solidity: event ProposalRejected(uint256 indexed id, string reason)
func (_Contracts *ContractsFilterer) ParseProposalRejected(log types.Log) (*ContractsProposalRejected, error) {
	event := new(ContractsProposalRejected)
	if err := _Contracts.contract.UnpackLog(event, "ProposalRejected", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// ContractsProposalSubmittedIterator is returned from FilterProposalSubmitted and is used to iterate over the raw logs and unpacked data for ProposalSubmitted events raised by the Contracts contract.
type ContractsProposalSubmittedIterator struct {
	Event *ContractsProposalSubmitted // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *ContractsProposalSubmittedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ContractsProposalSubmitted)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(ContractsProposalSubmitted)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *ContractsProposalSubmittedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ContractsProposalSubmittedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ContractsProposalSubmitted represents a ProposalSubmitted event raised by the Contracts contract.
type ContractsProposalSubmitted struct {
	Id          *big.Int
	Proposer    common.Address
	IpfsHash    string
	Amount      *big.Int
	ProjectType uint8
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterProposalSubmitted is a free log retrieval operation binding the contract event 0x50094398b94bd032f2883f60fcf80bc2d2f633c5bcaf147bb1bc23cb6d48ee70.
//
// Solidity: event ProposalSubmitted(uint256 indexed id, address indexed proposer, string ipfsHash, uint256 amount, uint8 projectType)
func (_Contracts *ContractsFilterer) FilterProposalSubmitted(opts *bind.FilterOpts, id []*big.Int, proposer []common.Address) (*ContractsProposalSubmittedIterator, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}
	var proposerRule []interface{}
	for _, proposerItem := range proposer {
		proposerRule = append(proposerRule, proposerItem)
	}

	logs, sub, err := _Contracts.contract.FilterLogs(opts, "ProposalSubmitted", idRule, proposerRule)
	if err != nil {
		return nil, err
	}
	return &ContractsProposalSubmittedIterator{contract: _Contracts.contract, event: "ProposalSubmitted", logs: logs, sub: sub}, nil
}

// WatchProposalSubmitted is a free log subscription operation binding the contract event 0x50094398b94bd032f2883f60fcf80bc2d2f633c5bcaf147bb1bc23cb6d48ee70.
//
// Solidity: event ProposalSubmitted(uint256 indexed id, address indexed proposer, string ipfsHash, uint256 amount, uint8 projectType)
func (_Contracts *ContractsFilterer) WatchProposalSubmitted(opts *bind.WatchOpts, sink chan<- *ContractsProposalSubmitted, id []*big.Int, proposer []common.Address) (event.Subscription, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}
	var proposerRule []interface{}
	for _, proposerItem := range proposer {
		proposerRule = append(proposerRule, proposerItem)
	}

	logs, sub, err := _Contracts.contract.WatchLogs(opts, "ProposalSubmitted", idRule, proposerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ContractsProposalSubmitted)
				if err := _Contracts.contract.UnpackLog(event, "ProposalSubmitted", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseProposalSubmitted is a log parse operation binding the contract event 0x50094398b94bd032f2883f60fcf80bc2d2f633c5bcaf147bb1bc23cb6d48ee70.
//
// Solidity: event ProposalSubmitted(uint256 indexed id, address indexed proposer, string ipfsHash, uint256 amount, uint8 projectType)
func (_Contracts *ContractsFilterer) ParseProposalSubmitted(log types.Log) (*ContractsProposalSubmitted, error) {
	event := new(ContractsProposalSubmitted)
	if err := _Contracts.contract.UnpackLog(event, "ProposalSubmitted", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// ContractsProposalVerifiedIterator is returned from FilterProposalVerified and is used to iterate over the raw logs and unpacked data for ProposalVerified events raised by the Contracts contract.
type ContractsProposalVerifiedIterator struct {
	Event *ContractsProposalVerified // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *ContractsProposalVerifiedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ContractsProposalVerified)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(ContractsProposalVerified)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *ContractsProposalVerifiedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ContractsProposalVerifiedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ContractsProposalVerified represents a ProposalVerified event raised by the Contracts contract.
type ContractsProposalVerified struct {
	Id       *big.Int
	AiResult bool
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterProposalVerified is a free log retrieval operation binding the contract event 0x2754d2ae4f11a0b5c9e48c8391fcae8625b9ba6fb9561f398a84685ba27fb42f.
//
// Solidity: event ProposalVerified(uint256 indexed id, bool aiResult)
func (_Contracts *ContractsFilterer) FilterProposalVerified(opts *bind.FilterOpts, id []*big.Int) (*ContractsProposalVerifiedIterator, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _Contracts.contract.FilterLogs(opts, "ProposalVerified", idRule)
	if err != nil {
		return nil, err
	}
	return &ContractsProposalVerifiedIterator{contract: _Contracts.contract, event: "ProposalVerified", logs: logs, sub: sub}, nil
}

// WatchProposalVerified is a free log subscription operation binding the contract event 0x2754d2ae4f11a0b5c9e48c8391fcae8625b9ba6fb9561f398a84685ba27fb42f.
//
// Solidity: event ProposalVerified(uint256 indexed id, bool aiResult)
func (_Contracts *ContractsFilterer) WatchProposalVerified(opts *bind.WatchOpts, sink chan<- *ContractsProposalVerified, id []*big.Int) (event.Subscription, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _Contracts.contract.WatchLogs(opts, "ProposalVerified", idRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ContractsProposalVerified)
				if err := _Contracts.contract.UnpackLog(event, "ProposalVerified", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseProposalVerified is a log parse operation binding the contract event 0x2754d2ae4f11a0b5c9e48c8391fcae8625b9ba6fb9561f398a84685ba27fb42f.
//
// Solidity: event ProposalVerified(uint256 indexed id, bool aiResult)
func (_Contracts *ContractsFilterer) ParseProposalVerified(log types.Log) (*ContractsProposalVerified, error) {
	event := new(ContractsProposalVerified)
	if err := _Contracts.contract.UnpackLog(event, "ProposalVerified", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// ContractsTaxFundDepositedIterator is returned from FilterTaxFundDeposited and is used to iterate over the raw logs and unpacked data for TaxFundDeposited events raised by the Contracts contract.
type ContractsTaxFundDepositedIterator struct {
	Event *ContractsTaxFundDeposited // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *ContractsTaxFundDepositedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ContractsTaxFundDeposited)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(ContractsTaxFundDeposited)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *ContractsTaxFundDepositedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ContractsTaxFundDepositedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ContractsTaxFundDeposited represents a TaxFundDeposited event raised by the Contracts contract.
type ContractsTaxFundDeposited struct {
	Depositor common.Address
	Amount    *big.Int
	Raw       types.Log // Blockchain specific contextual infos
}

// FilterTaxFundDeposited is a free log retrieval operation binding the contract event 0x4a5cc9b242cb1b4a7dc0a23efe4b92b552572c56fc7c2a938349043f1f2ff23b.
//
// Solidity: event TaxFundDeposited(address indexed depositor, uint256 amount)
func (_Contracts *ContractsFilterer) FilterTaxFundDeposited(opts *bind.FilterOpts, depositor []common.Address) (*ContractsTaxFundDepositedIterator, error) {

	var depositorRule []interface{}
	for _, depositorItem := range depositor {
		depositorRule = append(depositorRule, depositorItem)
	}

	logs, sub, err := _Contracts.contract.FilterLogs(opts, "TaxFundDeposited", depositorRule)
	if err != nil {
		return nil, err
	}
	return &ContractsTaxFundDepositedIterator{contract: _Contracts.contract, event: "TaxFundDeposited", logs: logs, sub: sub}, nil
}

// WatchTaxFundDeposited is a free log subscription operation binding the contract event 0x4a5cc9b242cb1b4a7dc0a23efe4b92b552572c56fc7c2a938349043f1f2ff23b.
//
// Solidity: event TaxFundDeposited(address indexed depositor, uint256 amount)
func (_Contracts *ContractsFilterer) WatchTaxFundDeposited(opts *bind.WatchOpts, sink chan<- *ContractsTaxFundDeposited, depositor []common.Address) (event.Subscription, error) {

	var depositorRule []interface{}
	for _, depositorItem := range depositor {
		depositorRule = append(depositorRule, depositorItem)
	}

	logs, sub, err := _Contracts.contract.WatchLogs(opts, "TaxFundDeposited", depositorRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ContractsTaxFundDeposited)
				if err := _Contracts.contract.UnpackLog(event, "TaxFundDeposited", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseTaxFundDeposited is a log parse operation binding the contract event 0x4a5cc9b242cb1b4a7dc0a23efe4b92b552572c56fc7c2a938349043f1f2ff23b.
//
// Solidity: event TaxFundDeposited(address indexed depositor, uint256 amount)
func (_Contracts *ContractsFilterer) ParseTaxFundDeposited(log types.Log) (*ContractsTaxFundDeposited, error) {
	event := new(ContractsTaxFundDeposited)
	if err := _Contracts.contract.UnpackLog(event, "TaxFundDeposited", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// ContractsVerifierUpdatedIterator is returned from FilterVerifierUpdated and is used to iterate over the raw logs and unpacked data for VerifierUpdated events raised by the Contracts contract.
type ContractsVerifierUpdatedIterator struct {
	Event *ContractsVerifierUpdated // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *ContractsVerifierUpdatedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ContractsVerifierUpdated)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(ContractsVerifierUpdated)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *ContractsVerifierUpdatedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ContractsVerifierUpdatedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ContractsVerifierUpdated represents a VerifierUpdated event raised by the Contracts contract.
type ContractsVerifierUpdated struct {
	Verifier common.Address
	Allowed  bool
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterVerifierUpdated is a free log retrieval operation binding the contract event 0xba5f7031ad83095931ee4b5138591db2dc3cfc56178367622fa4b05c2efad231.
//
// Solidity: event VerifierUpdated(address indexed verifier, bool allowed)
func (_Contracts *ContractsFilterer) FilterVerifierUpdated(opts *bind.FilterOpts, verifier []common.Address) (*ContractsVerifierUpdatedIterator, error) {

	var verifierRule []interface{}
	for _, verifierItem := range verifier {
		verifierRule = append(verifierRule, verifierItem)
	}

	logs, sub, err := _Contracts.contract.FilterLogs(opts, "VerifierUpdated", verifierRule)
	if err != nil {
		return nil, err
	}
	return &ContractsVerifierUpdatedIterator{contract: _Contracts.contract, event: "VerifierUpdated", logs: logs, sub: sub}, nil
}

// WatchVerifierUpdated is a free log subscription operation binding the contract event 0xba5f7031ad83095931ee4b5138591db2dc3cfc56178367622fa4b05c2efad231.
//
// Solidity: event VerifierUpdated(address indexed verifier, bool allowed)
func (_Contracts *ContractsFilterer) WatchVerifierUpdated(opts *bind.WatchOpts, sink chan<- *ContractsVerifierUpdated, verifier []common.Address) (event.Subscription, error) {

	var verifierRule []interface{}
	for _, verifierItem := range verifier {
		verifierRule = append(verifierRule, verifierItem)
	}

	logs, sub, err := _Contracts.contract.WatchLogs(opts, "VerifierUpdated", verifierRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ContractsVerifierUpdated)
				if err := _Contracts.contract.UnpackLog(event, "VerifierUpdated", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseVerifierUpdated is a log parse operation binding the contract event 0xba5f7031ad83095931ee4b5138591db2dc3cfc56178367622fa4b05c2efad231.
//
// Solidity: event VerifierUpdated(address indexed verifier, bool allowed)
func (_Contracts *ContractsFilterer) ParseVerifierUpdated(log types.Log) (*ContractsVerifierUpdated, error) {
	event := new(ContractsVerifierUpdated)
	if err := _Contracts.contract.UnpackLog(event, "VerifierUpdated", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
