const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("MintMyRun", function () {
  let MintMyRun;
  let mintMyRun;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    MintMyRun = await ethers.getContractFactory("MintMyRun");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    mintMyRun = await MintMyRun.deploy();
    await mintMyRun.deployed();
  });

  describe("Deployment", function () {
    it("should deploy with correct initial values", async function () {
      expect(await mintMyRun.totalSupply()).to.equal(0);
      expect(await mintMyRun.name()).to.equal("MintMyRun");
      expect(await mintMyRun.symbol()).to.equal("MMR");
    });
  });

  describe("Minting", function () {
    it("should mint correctly", async function () {
      await mintMyRun.setSaleIsActive(true);
      const ownerMint = ["ownerMint1", "ownerMint2", "ownerMint3"];
      const addr1Mint = ["addr1Mint1", "addr1Mint2"];
      const addr2Mint = ["addr2Mint1"];
      const numTotalMint =
        ownerMint.length + addr1Mint.length + addr2Mint.length;
      await mintMyRun.mint(ownerMint, {
        from: owner.address,
        value: ethers.utils.parseEther("0.03"),
      });
      await mintMyRun.connect(addr1).mint(addr1Mint, {
        value: ethers.utils.parseEther("0.02"),
      });
      await mintMyRun.connect(addr2).mint(addr2Mint, {
        value: ethers.utils.parseEther("0.01"),
      });
      expect(await mintMyRun.totalSupply()).to.equal(numTotalMint);
      expect(await mintMyRun.balanceOf(owner.address)).to.equal(
        ownerMint.length
      );
      expect(await mintMyRun.balanceOf(addr1.address)).to.equal(
        addr1Mint.length
      );
      expect(await mintMyRun.balanceOf(addr2.address)).to.equal(
        addr2Mint.length
      );
      const allMintUris = [...ownerMint, ...addr1Mint, ...addr2Mint];
      for (let i = 0; i < allMintUris; i++) {
        expect(await mintMyRun.tokenURI(i)).to.equal(`${allMintUris[i]}`);
      }
    });
    it("should not mint if sale is not active", async function () {
      await expect(mintMyRun.mint(["a"])).to.be.revertedWith("Sale not active");
    });
    it("should not mint if not enough eth", async function () {
      await mintMyRun.setSaleIsActive(true);
      await expect(mintMyRun.mint(["a"]), {
        value: ethers.utils.parseEther("0.001"),
      }).to.be.revertedWith("Insufficient payment, 0.005 ETH per item");
    });
  });

  describe("Other", function () {
    it("should allow withdraw", async function () {
      await mintMyRun.setSaleIsActive(true);
      const mintUris = ["0", "1", "2", "3"];
      mintMyRun.mint(mintUris, { value: ethers.utils.parseEther("0.5") });
      const initialBal = await waffle.provider.getBalance(mintMyRun.address);
      await mintMyRun.withdraw();
      const finalBal = await waffle.provider.getBalance(mintMyRun.address);
      expect(
        ethers.utils.formatEther((initialBal - finalBal).toString())
      ).equals("0.5");
    });
    it("should only let owner withdraw", async function () {
      await mintMyRun.setSaleIsActive(true);
      await expect(mintMyRun.connect(addr2).withdraw()).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });
});
