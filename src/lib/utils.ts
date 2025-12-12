export const mapRequestBody = (
  name: string,
  version: string,
  packages: string
) =>
  JSON.stringify({
    os: {
      name: name.trim().toLowerCase(),
      version: version.trim(),
    },
    packages: packages
      .trim()
      .split("\n")
      .map((el) => el.split(/\s+/)),
  });
