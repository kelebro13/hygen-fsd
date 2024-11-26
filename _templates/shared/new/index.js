// eslint-disable-next-line @typescript-eslint/no-require-imports,no-undef
const v = require('voca');

module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'sliceName',
        message: 'Enter the name of the slice (e.g., auth, user-profile):',
        validate: (input) => (input ? true : 'Slice name cannot be empty!'),
      },
      {
        type: 'select',
        name: 'segmentType',
        message: 'Select the type of shared segment:',
        choices: ['api', 'ui', 'lib', 'config', 'routes', 'i18n'],
      },
    ];
    return inquirer.prompt(questions).then((answers) => {
      const { segmentType, sliceName } = answers;
      return {
        segmentType: v.kebabCase(segmentType),
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
