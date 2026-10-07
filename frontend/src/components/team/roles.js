export const INDABAX_ROLE_ORDER = [
  "Community Patron",
  "Club President",
  "Vice President",
  "Speaker",
  "Secretary",
  "Technical Lead",
  "Year Two Representative",
  "Women Lead",
  "Social Media Lead",
  "Graphic Designer",
  "Event Planner",
];

export function sortByRole(list, order = INDABAX_ROLE_ORDER) {
  const rank = (r) => {
    const i = order.indexOf(r);
    return i === -1 ? 999 : i;
  };
  return [...list].sort((a, b) => rank(a.role) - rank(b.role));
}
