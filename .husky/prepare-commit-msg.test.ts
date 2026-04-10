/**
 * @jest-environment node
 */

import { spawnSync } from "child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

const SCRIPT_PATH = join(__dirname, "prepare-commit-msg");

function runScript(branch: string, sourceType = ""): string {
  // 가짜 git 바이너리로 브랜치명 mocking
  const fakeBinDir = mkdtempSync(join(tmpdir(), "git-mock-"));
  writeFileSync(join(fakeBinDir, "git"), `#!/bin/sh\necho "${branch}"\n`, {
    mode: 0o755,
  });

  const commitMsgFile = join(fakeBinDir, "COMMIT_EDITMSG");
  writeFileSync(commitMsgFile, "");

  spawnSync("sh", [SCRIPT_PATH, commitMsgFile, sourceType], {
    env: { ...process.env, PATH: `${fakeBinDir}:${process.env.PATH}` },
  });

  const output = readFileSync(commitMsgFile, "utf8");
  rmSync(fakeBinDir, { recursive: true });
  return output;
}

describe("prepare-commit-msg", () => {
  test("main → 템플릿 미생성", () => {
    expect(runScript("main")).toBe("");
  });

  test("develop → 템플릿 미생성", () => {
    expect(runScript("develop")).toBe("");
  });

  test("feat/OAuth/13/yj → [OAuth] feat: 템플릿 생성", () => {
    expect(runScript("feat/OAuth/13/yj")).toBe("[OAuth] feat:\n\n-\n\n# 13\n");
  });
});
