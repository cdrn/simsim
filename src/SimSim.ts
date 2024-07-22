import { createHash } from "crypto";
import Argon2 from "argon2";

export type HashingAlgorithm = "sha256" | "randomX" | "Argon2";

export class SimSim {
  private difficulty: number;
  private hashingAlgorithm: HashingAlgorithm;

  constructor(
    difficulty: number,
    hashingAlgorithm: HashingAlgorithm = "sha256"
  ) {
    this.difficulty = difficulty;
    this.hashingAlgorithm = hashingAlgorithm;
  }

  public generateChallenge(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  public async validateSolution(
    challenge: string,
    solution: string
  ): Promise<boolean> {
    const hash = await this.hash(challenge + solution);
    const proof = hash.startsWith("0".repeat(this.difficulty));
    return proof;
  }

  private async hash(input: string): Promise<string> {
    switch (this.hashingAlgorithm) {
      case "sha256":
        return createHash("sha256").update(input).digest("hex");
      case "randomX":
        throw new Error("RandomX is not supported yet");
      case "Argon2":
        return Argon2.hash(input);
      default:
        throw new Error("Invalid hashing algorithm");
    }
  }

  public async findValidHash(challenge: string): Promise<string> {
    let solution = "";
    let hash = "";
    do {
      solution = Math.random().toString(36).substring(2, 15);
      hash = await this.hash(challenge + solution);
    } while (!hash.startsWith("0".repeat(this.difficulty)));
    return solution;
  }
}
