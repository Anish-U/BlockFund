pragma solidity > 0.4.17;

// Contract to store campaigns
contract CampaignFactory {

  address[] public deployedCampaigns;
  
  // Function to create a campaign contract
  function createCampaign(string title, string description, uint goal, uint contribution) public {
    address newCampaign = new Campaign(title, description, goal, contribution, msg.sender);
    deployedCampaigns.push(newCampaign);
  }
  
  // Function to get all the address of the deployed campaign contracts
  function getDeployedCampaigns() public view returns (address[]) {
    return deployedCampaigns;
  }
}

// Contract for Campaign
contract Campaign {
    
  string public campaignTitle;
  string public campaignDescription;
  uint public campaignGoal;
  uint public minimumContribution;
  address public campaignManagerAddress;

  mapping(address => bool) public contributorAddresses;
  uint public contributorsCount;
  
  struct Request{
    string requestDescription;
    uint requestAmount;
    address recipientAddress;
    bool isCompleted;
    mapping(address => bool) approverAddresses;
    uint approvalsCount;
  }
    
  Request[] public campaignRequests;
  
  // Modifier to check manager authorization
  modifier managerAuthorization() {
    require(msg.sender == campaignManagerAddress, "Only campaign manager has this privelige");
    _;
  }
  
  // Campaign contract constructor
  constructor (string title, string description, uint goal, uint contribution, address creator) public {
    campaignTitle = title;
    campaignDescription = description;
    campaignGoal = goal;
    minimumContribution = contribution;
    campaignManagerAddress = creator;
  }
  
  // Function to contribute to the campaign
  function contributeToCampaign() public payable {
    require(msg.value >= minimumContribution, "Minimum contribution not satisfied");
    require(msg.sender != campaignManagerAddress, "Campaign manager cannot contribute in his own campaign");
  
    if(contributorAddresses[msg.sender]!= true){
      contributorAddresses[msg.sender] = true;
      contributorsCount++;
    }
  }

  // Function to get the campaign balance 
  function getCampaignBalance() public view returns(uint) {
      return address(this).balance;
  }
  
  // Function to create a new request by manager
  function createRequest(string description, uint amount, address recipient) public managerAuthorization {
    Request memory newRequest = Request({
      requestDescription : description,
      requestAmount : amount,
      recipientAddress : recipient,
      isCompleted : false,
      approvalsCount : 0
    });
    
    campaignRequests.push(newRequest);
  }
      
  // Function to approve a particular request
  function approveRequest(uint index) public {
    require(msg.sender != campaignManagerAddress, "Campaign manager cannot approve his own request");
  
    Request storage request = campaignRequests[index];
    
    require(contributorAddresses[msg.sender], "The user is not a contributor to the campaign");
    require(!request.approverAddresses[msg.sender], "The user has already approved the request");
    require(!request.isCompleted, "The request is already closed");
    
    request.approverAddresses[msg.sender] = true;
    request.approvalsCount++;
  }
  
  // Function to finalize the request by campaign manager
  function finalizeRequest(uint index) public managerAuthorization {
    Request storage request = campaignRequests[index];
    
    require(request.approvalsCount > (contributorsCount / 2), "Minimum of 50% of the contributors should approve for the request");
    require(!request.isCompleted, "The request is already closed");
    require(request.requestAmount * 1000000000000000000 < address(this).balance, "The campaign balance is not sufficient for the request");  
    
    request.recipientAddress.transfer(request.requestAmount * 1000000000000000000);
    request.isCompleted = true;  
  }    
}