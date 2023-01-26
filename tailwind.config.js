
module.exports = {
  content: [
    "./pages/*.{js,ts,jsx,tsx}",
    "./pages/*/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
    "./components/*/*.{js,ts,jsx,tsx}",
    "./modules/*/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        md: '1024px',
        lg: '1280px',
        xl: '1440px',
        devicehover: { raw: '(hover: hover)' },
      },
      colors: {
        'primary-purple-1': '#1E0C46',
        'primary-purple-2': '#613283',
        'primary-purple-3': '#8663D0',
        'primary-purple-3-10': '#F3EFFA',
        'primary-orange': '#F09D7A',
        'primary-yellow': '#F4E65D',
        'secondary-blue': '#5AACB9',
        'secondary-cream': '#F7F9F4',
        'secondary-black': '#211F42',
        'tertiary-green': '#7AC45E',
        'tertiary-dark-green': '#447F2F',
        'tertiary-light-green': '#EDFFDB',
        'tertiary-red': '#CE3B3B',
        'tertiary-light-red': '#FFBDBD',
        'tertiary-extra-light-red': '#FEF6F6',
        'tertiary-navy': '#273C7B',
        'tertiary-light-navy': '#D6E0FF',
        'tertiary-amber': '#FBBD08',
        'tertiary-light-amber': '#FFF3D1',
        'tertiary-dark-gray': '#707070',
        'tertiary-gray': '#888888',
        'tertiary-light-gray': '#F8F8F9',
        'white': '#FFFFFF',
        'label-error': '#E54242',
        'black': '#000000',
      },
      fontFamily: {
        default: 'Nunito',
      },
      backgroundImage: {
        'primary-purple-gradient': 'linear-gradient(254.83deg, #1E0C46 -49.81%, #8663D0 89.33%)',
      },
      boxShadow: {
        bt: '4px 4px 8px rgba(30, 12, 70, 0.3)',
        bt2: '1px 1px 6px rgba(30, 12, 70, 0.2)',
        box: '2px 2px 8px rgba(30, 12, 70, 0.2)',
        header: '0px 4px 8px rgba(30, 12, 70, 0.1)',
        card: '0 0 11px #eaf0f6'
      },
      spacing: {
        45: '11.25rem',
        185: '46.25rem',
      },
      maxWidth: {
        185: '46.25rem',
      },
      zIndex: {
        60: '60',
        max: '9999',
        min: '-20',
      },
      lineHeight: {
        0: '0',
        5.5: '1.375rem',
      },
      width: {
        46: '11.5rem',
        100: '25rem',
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      },
      transitionDuration: {
        600: '600ms',
      },
      opacity: {
        56: '0.56',
      },
      rotate: {
        9: '9deg',
      },
      borderRadius: {
        xs: '4px',
        sm: '8px',
        lg: '14px',
      },
    },
  },
  corePlugins: { preflight: false },
};
