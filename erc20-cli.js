#!/usr/bin/env node
const readline = require("readline/promises");
const { mkdir, writeFile } = require("node:fs/promises");
const { existsSync } = require("node:fs");
const path = require("path");

const sleep = require("./utilities/sleep");
const loadAPI = require("./utilities/dynamicImport");

async function oraCLI() {
  const { default: Ora } = await loadAPI();
  let spinner = new Ora({
    text: "Loading",
  }).start();
  spinner.color = "yellow";
  await sleep(1000);
  spinner.text = "Loading TokenForge ...";
  spinner.stopAndPersist({
    symbol: "👨🏻‍💻",
    text: "TokenForge: Quickly Generate ERC20 Tokens",
  });

  const generateContract = require("./templates/ERC20Template");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  spinner = new Ora("Type 'y' to proceed. Type'q' to quit.").info();

  const yieldERC20Contract = async () => {
    const solArgs = await getSolArgs();
    const contract = await generateContract(solArgs);
    await writeContract(contract, solArgs.ERC20Name);
    spinner = new Ora("Type 'y' to proceed. Type'q' to quit.").info();
  };

  const getSolArgs = async () => {
    const ERC20Name = await getERC20Name();
    const ERC20Symbol = await getERC20Symbol();
    const totalSupply = await getTotalSupply();
    const addMintFunction = await getAddMintFunction();
    const addPausable = await getAddPausable();
    return {
      ERC20Name,
      ERC20Symbol,
      totalSupply,
      addMintFunction,
      addPausable,
    };
  };

  const getERC20Name = async () => {
    const ERC20Name = await rl.question("Enter the name of your ERC20 token: ");
    spinner = new Ora().succeed("ERC20 Name: " + ERC20Name);
    return ERC20Name;
  };

  const getERC20Symbol = async () => {
    const ERC20Symbol = await rl.question(
      "Enter the symbol of your ERC20 token: "
    );
    spinner = new Ora().succeed("ERC20 Symbol: " + ERC20Symbol);
    return ERC20Symbol;
  };

  const getTotalSupply = async () => {
    const totalSupply = await rl.question(
      "Enter the total supply of your ERC20 token: "
    );
    spinner = new Ora().succeed("Total Supply: " + totalSupply);
    return totalSupply;
  };

  const getAddMintFunction = async () => {
    const addMintFunction = await rl.question(
      "Do you want to add a mint function? (y/n): "
    );
    spinner = new Ora();
    addMintFunction.toLowerCase() === "y"
      ? spinner.succeed("Mint function Added!")
      : spinner.fail("Mint function not added!");

    return addMintFunction;
  };

  const getAddPausable = async () => {
    const addPausable = await rl.question(
      "Do you want to add a pausable function? (y/n): "
    );
    spinner = new Ora();
    addPausable.toLowerCase() === "y"
      ? spinner.succeed("Pausable function Added!")
      : spinner.fail("Pausable function not added!");
    return addPausable;
  };

  const writeContract = async (contract, ERC20Name) => {
    if (!existsSync(path.join(__dirname, "contracts"))) {
      await mkdir(path.join(__dirname, "contracts"), { recursive: true });
    }
    const filePath = path.join(__dirname, "contracts", `${ERC20Name}.sol`);
    await writeFile(filePath, contract);
    console.log("Contract written to: ", filePath);
  };

  rl.on("line", async (line) => {
    switch (line.trim().toLowerCase()) {
      case "y":
        await yieldERC20Contract(line);
        rl.prompt();
        break;
      case "q":
        rl.close();
        break;
      default:
        console.log(`'${line.trim()}' is not a valid command!`);
        rl.prompt();
        break;
    }
  }).on("close", () => {
    console.log("Have a great day!");
    process.exit(0);
  });
}

oraCLI();
