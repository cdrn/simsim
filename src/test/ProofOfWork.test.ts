import { ProofOfWork } from "../ProofOfWork";

describe("ProofOfWork", () => {
  let proofOfWork: ProofOfWork;
  const difficulty = 4;

  beforeEach(() => {
    proofOfWork = new ProofOfWork(difficulty);
  });

  test("generateChallenge should return a non-empty string", () => {
    const challenge = proofOfWork.generateChallenge();
    expect(challenge).toBeDefined();
    expect(challenge).not.toBe("");
  });

  test("validateSolution should return true for a valid solution", () => {
    const challenge = proofOfWork.generateChallenge();
    const solution = proofOfWork.findValidHash(challenge);
    const isValid = proofOfWork.validateSolution(challenge, solution);
    expect(isValid).toBe(true);
  });

  test("validateSolution should return false for an invalid solution", () => {
    const challenge = proofOfWork.generateChallenge();
    const invalidSolution = "invalidSolution";
    const isValid = proofOfWork.validateSolution(challenge, invalidSolution);
    expect(isValid).toBe(false);
  });

  test("findValidHash should return a valid solution", () => {
    const challenge = proofOfWork.generateChallenge();
    const solution = proofOfWork.findValidHash(challenge);
    const isValid = proofOfWork.validateSolution(challenge, solution);
    expect(solution).toBeDefined();
    expect(solution).not.toBe("");
    expect(isValid).toBe(true);
  });
});
