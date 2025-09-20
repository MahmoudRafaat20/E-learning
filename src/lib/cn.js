export function cn(...args) {
  return args
    .flatMap((a) =>
      typeof a === "string"
        ? a
        : Object.entries(a || {})
            .filter(([, v]) => !!v)
            .map(([k]) => k)
    )
    .join(" ")
    .trim();
}
