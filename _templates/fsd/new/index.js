// eslint-disable-next-line @typescript-eslint/no-require-imports,no-undef
const v = require('voca');

module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'select',
        name: 'layerName',
        message: 'Select the fsd:',
        choices: ['pages', 'features', 'widgets', 'entities'],
      },
      {
        type: 'input',
        name: 'sliceName',
        message: 'Enter the name of the slice (e.g., auth, user-profile):',
        validate: (input) => (input ? true : 'Slice name cannot be empty!'),
      },
    ];
    return inquirer.prompt(questions).then((answers) => {
      const { layerName, sliceName } = answers;
      return {
        layerName: v.kebabCase(layerName),
        sliceFileName: v.kebabCase(sliceName),
        sliceName: v
          .kebabCase(sliceName)
          .split('-')
          .map((p) => v.capitalize(p))
          .join(''),
      };
    });
  },
};
