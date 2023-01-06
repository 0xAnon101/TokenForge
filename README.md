
# TokenForge: Quickly Generate ERC20 Tokens
A command line interface (CLI) application that allows users to generate ERC20 token smart contracts by answering a series of prompts in the terminal.

## Requirements
* Node.js

## Installation
1. Clone the repository:

 
``` 
git clone https://github.com/0xAnon101/TokenForge.git
```

2. Install the dependencies:
        

 
```
cd TokenForge
npm install
```

## Usage
1. Run the application:
  

```
chmod +x ./erc20-cli.js
./erc20-cli.js
```

2. Follow the prompts to enter the name, symbol, total supply, and various options for the contract.
3. The generated contract will be written to a file in the contracts directory, which will be created if it doesn't exist.
4. To generate another contract, type y and follow the prompts again. To exit the application, type q.

## Options
* **Mint function**: Adding a mint function allows the contract owner to mint (create and distribute) additional tokens.
* **Pausable function**: Adding a pausable function allows the contract owner to pause and unpause the contract, which can be useful for emergency situations or upgrades.

## Tips
* Make sure you have the required dependencies installed before running the application.
* Use a descriptive name and symbol for your ERC20 token.
* Set a reasonable total supply for your ERC20 token.
* Consider whether or not you need a mint function and/or pausable function for your ERC20 token.
