import { createHash } from "crypto";

export class ProofOfWork {
  private difficulty: number;

  constructor(difficulty: number) {
    this.difficulty = difficulty;
  }

  public generateChallenge(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  public validateSolution(challenge: string, solution: string): boolean {
    const hash = this.hash(challenge + solution);
    return hash.startsWith("0".repeat(this.difficulty));
  }

  private hash(input: string): string {
    return createHash("sha256").update(input).digest("hex");
  }

  public findValidHash(challenge: string): string {
    let solution = "";
    let hash = "";
    do {
      solution = Math.random().toString(36).substring(2, 15);
      hash = this.hash(challenge + solution);
    } while (!hash.startsWith("0".repeat(this.difficulty)));
    return solution;
  }
}
