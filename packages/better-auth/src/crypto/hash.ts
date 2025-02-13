import { constantTimeEqual } from "./buffer";
import { createHash } from "@better-auth/utils/hash";

export async function hashToBase64(
	data: string | ArrayBuffer,
): Promise<string> {
	const buffer = await createHash("SHA-256").digest(data);
	return Buffer.from(buffer).toString("base64");
}

export async function compareHash(
	data: string | ArrayBuffer,
	hash: string,
): Promise<boolean> {
	const buffer = await createHash("SHA-256").digest(
		typeof data === "string" ? new TextEncoder().encode(data) : data,
	);
	const hashBuffer = Buffer.from(hash, "base64");
	return constantTimeEqual(buffer, hashBuffer);
}
