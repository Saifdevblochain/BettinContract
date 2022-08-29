//SPDX-License-Identifier: MIT

pragma solidity >0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OracleListner is ERC20,Ownable{
    

    struct PlayInBet{
         
        uint8 sportId; 
        string betSlug; 
        address bettingToken;
        uint256 betAmount;
    }
     
    PlayInBet[] public activeBets;
    event BetResolved(uint8 sportId , string bestslug );

    constructor()  ERC20 ("RewardToken","RT"){
            _mint(msg.sender,(10**10)*10**18);
     }

    

    function addBet(  uint8 _sportId,string memory _betSlug ,address _bettingToken,uint256 _betAmount) external  {
        
         activeBets.push(PlayInBet({      

            sportId: _sportId, 
            betSlug:_betSlug, 
            bettingToken: _bettingToken,
            betAmount:_betAmount

         }));

          
    }

    function mintYourTokens(uint _amount) public {
        _mint(msg.sender,_amount);
    }

  
    function resolveBets(uint8 _sportId, string memory _slug) external   onlyOwner{

         
       for (uint8 i; i < activeBets.length ; i++ ){

           string memory temp = activeBets[i].betSlug ;

            if ( activeBets[i].sportId == _sportId  && keccak256(abi.encodePacked(temp)) == keccak256(abi.encodePacked(_slug))) {
                emit BetResolved( _sportId, _slug);
            }
       }
    }
    
}
