type ValidatedAttachment = {
  bytes: Uint8Array;
  contentType: string;
};

export async function validateDownloadedAttachment(
  blob: Blob,
  expectedContentType: string,
): Promise<Blob> {
  const normalized = validateAttachmentBytes(
    new Uint8Array(await blob.arrayBuffer()),
    expectedContentType || blob.type || "application/octet-stream",
  );

  return new Blob([normalized.bytes], {
    type: normalized.contentType,
  });
}

function validateAttachmentBytes(bytes: Uint8Array, contentType: string): ValidatedAttachment {
  if (!contentType.toLowerCase().includes("pdf")) {
    return { bytes, contentType };
  }

  const pdfOffset = findByteSequence(bytes, "%PDF");

  if (pdfOffset === -1) {
    if (looksLikeHtml(bytes)) {
      throw new Error(
        "The attachment download returned a webpage instead of a PDF. Please refresh the inbox and try again.",
      );
    }

    if (looksLikeJson(bytes)) {
      throw new Error(
        "The attachment download returned JSON metadata instead of a PDF file. Please refresh the inbox and try again.",
      );
    }

    throw new Error("The downloaded PDF did not contain a valid PDF header.");
  }

  if (pdfOffset === 0) {
    return { bytes, contentType: contentType || "application/pdf" };
  }

  return {
    bytes: bytes.slice(pdfOffset),
    contentType: contentType || "application/pdf",
  };
}

function findByteSequence(bytes: Uint8Array, value: string, startOffset = 0): number {
  if (bytes.length < value.length) {
    return -1;
  }

  for (let offset = startOffset; offset <= bytes.length - value.length; offset += 1) {
    let matches = true;

    for (let index = 0; index < value.length; index += 1) {
      if (bytes[offset + index] !== value.charCodeAt(index)) {
        matches = false;
        break;
      }
    }

    if (matches) {
      return offset;
    }
  }

  return -1;
}

function looksLikeHtml(bytes: Uint8Array): boolean {
  const preview = new TextDecoder()
    .decode(bytes.slice(0, 512))
    .trimStart()
    .toLowerCase();

  return preview.startsWith("<!doctype html") || preview.startsWith("<html");
}

function looksLikeJson(bytes: Uint8Array): boolean {
  const preview = new TextDecoder()
    .decode(bytes.slice(0, 512))
    .trimStart();

  return preview.startsWith("{") || preview.startsWith("[");
}
