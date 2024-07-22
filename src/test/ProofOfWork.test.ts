import { SimSim } from "../SimSim";

describe("ProofOfWork", () => {
  let proofOfWork: SimSim;
  const difficulty = 1;

  beforeEach(() => {
    proofOfWork = new SimSim(difficulty);
  });

  test("generateChallenge should return a non-empty string", () => {
    const challenge = proofOfWork.generateChallenge();
    expect(challenge).toBeDefined();
    expect(challenge).not.toBe("");
  });

  test("validateSolution should return true for a valid solution", async () => {
    const challenge = proofOfWork.generateChallenge();
    const solution = await proofOfWork.findValidHash(challenge);
    const isValid = await proofOfWork.validateSolution(challenge, solution);
    expect(isValid).toBe(true);
  });

  test("validateSolution should return false for an invalid solution", async () => {
    const challenge = proofOfWork.generateChallenge();
    const invalidSolution = "invalidSolution";
    const isValid = await proofOfWork.validateSolution(
      challenge,
      invalidSolution
    );
    expect(isValid).toBe(false);
  });

  test("findValidHash should return a valid solution", async () => {
    const challenge = proofOfWork.generateChallenge();
    const solution = await proofOfWork.findValidHash(challenge);
    const isValid = await proofOfWork.validateSolution(challenge, solution);
    expect(solution).toBeDefined();
    expect(solution).not.toBe("");
    expect(isValid).toBe(true);
  });

  test("validateSolution should return true for a valid solution with Argon2", async () => {
    proofOfWork = new SimSim(difficulty, "Argon2");
    const challenge = proofOfWork.generateChallenge();
    const solution = await proofOfWork.findValidHash(challenge);
    const isValid = await proofOfWork.validateSolution(challenge, solution);
    expect(isValid).toBe(true);
  });

  test("validateSolution should return false for an invalid solution with Argon2", async () => {
    proofOfWork = new SimSim(difficulty, "Argon2");
    const challenge = proofOfWork.generateChallenge();
    const invalidSolution = "invalidSolution";
    const isValid = await proofOfWork.validateSolution(
      challenge,
      invalidSolution
    );
    expect(isValid).toBe(false);
  });

  test("findValidHash should return a valid solution with Argon2", async () => {
    proofOfWork = new SimSim(difficulty, "Argon2");
    const challenge = proofOfWork.generateChallenge();
    const solution = await proofOfWork.findValidHash(challenge);
    const isValid = await proofOfWork.validateSolution(challenge, solution);
    expect(solution).toBeDefined();
    expect(solution).not.toBe("");
    expect(isValid).toBe(true);
  });

  test("validateSolution should throw error for unsupported RandomX algorithm", async () => {
    proofOfWork = new SimSim(difficulty, "randomX");
    const challenge = proofOfWork.generateChallenge();
    const solution = await proofOfWork.findValidHash(challenge);
    await expect(
      proofOfWork.validateSolution(challenge, solution)
    ).rejects.toThrow("RandomX is not supported yet");
  });
});
