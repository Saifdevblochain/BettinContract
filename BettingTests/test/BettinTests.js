 
 
const { expect } = require("chai");
describe(" Deploy ", function () {

  let owner,contract ,Contract, TOKENADDRESS, AMOUNT
  AMOUNT= ethers.utils.parseEther("1");

  before(async function () {

     [owner] = await ethers.getSigners()
    console.log(`Owner address is ${owner.address}`)

    contract = await ethers.getContractFactory('OracleListner');
    Contract = await contract.deploy();
    await Contract.deployed();beforeEach
    
    console.log("Contract Deployed Address is :",Contract.address)
    TOKENADDRESS= await Contract.address;

  })

it("Should Return Name of ERC20 Token ", async function () {
    const name= await Contract.name()
      
    expect(name).to.equal('RewardToken');
  })

it(" Check Adding Bet in Contract ", async function () {
  let add= await Contract.addBet(   1,  "betSlug" ,  TOKENADDRESS, AMOUNT);
 
  let bet= await Contract.activeBets(0)
    
   expect (bet[0]).to.equal(1);
   expect (bet[1]).to.equal("betSlug");
   expect (bet[2]).to.equal(TOKENADDRESS);
   expect (bet[3]).to.equal(AMOUNT);

  })

  // it("Checking Resolving Bet or not", (done) => {
  //   (async () => {
  //     setTimeout(async () => {
  //       await Contract.resolveBets( 1 ,"betSlug");
        
  //       await Contract.on("BetResolved",(sportId,slug)=>{
  //         console.log(
  //           {
  //             sportId:sportId,
  //             betSlug:slug
  //           }
  //         )
  //       })
  //       await done()
        
  //     }, 6000);


  //   })()

  // })
 
  it("Checking Resolving Bet or not", (done) => {
    (async () => {
     
        await Contract.resolveBets( 1 ,"betSlug");
        
        await Contract.on("BetResolved",(sportId,slug)=>{
          expect(sportId).to.equal(1);
           
          expect(slug).to.equal("betSlug")
           
          done()
        })
      
    })()

  })
  
  

})
 