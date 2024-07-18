const lineHeight = "150%";

const p1 = {
  lineHeight,
  fontSize: 16,
};
const p2 = {
  lineHeight,
  fontSize: 14,
};
const p3 = {
  lineHeight,
  fontSize: 12,
};

const body = {
  p1r: {
    ...p1,
    fontWeight: "regular",
  },
  p1b: {
    ...p1,
    fontWeight: "semi-bold",
  },
  p2r: {
    ...p2,
    fontWeight: "regular",
  },
  p2b: {
    ...p2,
    fontWeight: "semi-bold",
  },

  p3r: {
    ...p3,
    fontWeight: "regular",
  },
  p3b: {
    ...p3,
    fontWeight: "semi-bold",
  },
};

export default body;
