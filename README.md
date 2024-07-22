# Simsim

![alt text](image.png)

SimSim is a versatile proof-of-work (PoW) library designed to validate that a machine has completed a specified unit of work. It supports multiple PoW algorithms, including RandomX, Argon2, and more, making it suitable for a variety of applications requiring computational proof.

## Features

- **Multi-Algorithm Support**: Supports RandomX, Argon2, and other popular PoW algorithms.
- **Easy Integration**: Simple API for integrating PoW validation into your projects.
- **High Performance**: Optimized for speed and efficiency to handle intensive computational tasks.
- **Secure**: Ensures the integrity and authenticity of the work completed.

## Installation

To install Simsim, use the following command:

```bash
pnpm install simsim
```

## Usage

Here's a basic example of how to use Simsim:

```javascript
import SimSim from 'simsim';

// Select the PoW algorithm
const algorithm = 'Argon2'; // or 'sha256', 'randomX', etc.

// Define the difficulty
const difficulty = 5;

// Create an instance of SimSim
const simsim = new SimSim(difficulty, algorithm);

async function runProofOfWork() {
    const challenge = simsim.generateChallenge();
    const solution = await simsim.findValidHash(challenge);
    const isValid = await simsim.validateSolution(challenge, solution);
    console.log(`Proof of work is valid: ${isValid}`);
}

runProofOfWork();
```

## Supported Algorithms

- **RandomX**: A PoW algorithm optimized for general-purpose CPUs.
- **Argon2**: A memory-hard function suitable for PoW and password hashing.
- **Sha256**: Used by bitcoin. Vulnerable to ASICs.

## Contributing

We welcome contributions to Simsim! If you'd like to contribute, please open an issue or submit a pull request on our GitHub repository.
