module.exports = async () => {
  return {
    transform: {
      '^.+\\.tsx?$': '@swc/jest',
    },
    verbose: true,
  };
};
